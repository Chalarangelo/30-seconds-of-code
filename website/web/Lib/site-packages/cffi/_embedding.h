
/***** Support code for embedding *****/

#ifdef __cplusplus
extern "C" {
#endif


#if defined(_WIN32)
#  define CFFI_DLLEXPORT  __declspec(dllexport)
#elif defined(__GNUC__)
#  define CFFI_DLLEXPORT  __attribute__((visibility("default")))
#else
#  define CFFI_DLLEXPORT  /* nothing */
#endif


/* There are two global variables of type _cffi_call_python_fnptr:

   * _cffi_call_python, which we declare just below, is the one called
     by ``extern "Python"`` implementations.

   * _cffi_call_python_org, which on CPython is actually part of the
     _cffi_exports[] array, is the function pointer copied from
     _cffi_backend.

   After initialization is complete, both are equal.  However, the
   first one remains equal to &_cffi_start_and_call_python until the
   very end of initialization, when we are (or should be) sure that
   concurrent threads also see a completely initialized world, and
   only then is it changed.
*/
#undef _cffi_call_python
typedef void (*_cffi_call_python_fnptr)(struct _cffi_externpy_s *, char *);
static void _cffi_start_and_call_python(struct _cffi_externpy_s *, char *);
static _cffi_call_python_fnptr _cffi_call_python = &_cffi_start_and_call_python;


#ifndef _MSC_VER
   /* --- Assuming a GCC not infinitely old --- */
# define cffi_compare_and_swap(l,o,n)  __sync_bool_compare_and_swap(l,o,n)
# define cffi_write_barrier()          __sync_synchronize()
# if !defined(__amd64__) && !defined(__x86_64__) &&   \
     !defined(__i386__) && !defined(__i386)
#   define cffi_read_barrier()         __sync_synchronize()
# else
#   define cffi_read_barrier()         (void)0
# endif
#else
   /* --- Windows threads version --- */
# include <Windows.h>
# define cffi_compare_and_swap(l,o,n) \
                               (InterlockedCompareExchangePointer(l,n,o) == (o))
# define cffi_write_barrier()       InterlockedCompareExchange(&_cffi_dummy,0,0)
# define cffi_read_barrier()           (void)0
static volatile LONG _cffi_dummy;
#endif

#ifdef WITH_THREAD
# ifndef _MSC_VER
#  include <pthread.h>
   static pthread_mutex_t _cffi_embed_startup_lock;
# else
   static CRITICAL_SECTION _cffi_embed_startup_lock;
# endif
  static char _cffi_embed_startup_lock_ready = 0;
#endif

static void _cffi_acquire_reentrant_mutex(void)
{
    static void *volatile lock = NULL;

    while (!cffi_compare_and_swap(&lock, NULL, (void *)1)) {
        /* should ideally do a spin loop instruction here, but
           hard to do it portably and doesn't really matter I
           think: pthread_mutex_init() should be very fast, and
           this is only run at start-up anyway. */
    }

#ifdef WITH_THREAD
    if (!_cffi_embed_startup_lock_ready) {
# ifndef _MSC_VER
        pthread_mutexattr_t attr;
        pthread_mutexattr_init(&attr);
        pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
        pthread_mutex_init(&_cffi_embed_startup_lock, &attr);
# else
        InitializeCriticalSection(&_cffi_embed_startup_lock);
# endif
        _cffi_embed_startup_lock_ready = 1;
    }
#endif

    while (!cffi_compare_and_swap(&lock, (void *)1, NULL))
        ;

#ifndef _MSC_VER
    pthread_mutex_lock(&_cffi_embed_startup_lock);
#else
    EnterCriticalSection(&_cffi_embed_startup_lock);
#endif
}

static void _cffi_release_reentrant_mutex(void)
{
#ifndef _MSC_VER
    pthread_mutex_unlock(&_cffi_embed_startup_lock);
#else
    LeaveCriticalSection(&_cffi_embed_startup_lock);
#endif
}


/**********  CPython-specific section  **********/
#ifndef PYPY_VERSION

#include "_cffi_errors.h"


#define _cffi_call_python_org  _cffi_exports[_CFFI_CPIDX]

PyMODINIT_FUNC _CFFI_PYTHON_STARTUP_FUNC(void);   /* forward */

static void _cffi_py_initialize(void)
{
    /* XXX use initsigs=0, which "skips initialization registration of
       signal handlers, which might be useful when Python is
       embedded" according to the Python docs.  But review and think
       if it should be a user-controllable setting.

       XXX we should also give a way to write errors to a buffer
       instead of to stderr.

       XXX if importing 'site' fails, CPython (any version) calls
       exit().  Should we try to work around this behavior here?
    */
    Py_InitializeEx(0);
}

static int _cffi_initialize_python(void)
{
    /* This initializes Python, imports _cffi_backend, and then the
       present .dll/.so is set up as a CPython C extension module.
    */
    int result;
    PyGILState_STATE state;
    PyObject *pycode=NULL, *global_dict=NULL, *x;

#if PY_MAJOR_VERSION >= 3
    /* see comments in _cffi_carefully_make_gil() about the
       Python2/Python3 difference 
    */
#else
    /* Acquire the GIL.  We have no threadstate here.  If Python is 
       already initialized, it is possible that there is already one
       existing for this thread, but it is not made current now.
    */
    PyEval_AcquireLock();

    _cffi_py_initialize();

    /* The Py_InitializeEx() sometimes made a threadstate for us, but
       not always.  Indeed Py_InitializeEx() could be called and do
       nothing.  So do we have a threadstate, or not?  We don't know,
       but we can replace it with NULL in all cases.
    */
    (void)PyThreadState_Swap(NULL);

    /* Now we can release the GIL and re-acquire immediately using the
       logic of PyGILState(), which handles making or installing the
       correct threadstate.
    */
    PyEval_ReleaseLock();
#endif
    state = PyGILState_Ensure();

    /* Call the initxxx() function from the present module.  It will
       create and initialize us as a CPython extension module, instead
       of letting the startup Python code do it---it might reimport
       the same .dll/.so and get maybe confused on some platforms.
       It might also have troubles locating the .dll/.so again for all
       I know.
    */
    (void)_CFFI_PYTHON_STARTUP_FUNC();
    if (PyErr_Occurred())
        goto error;

    /* Now run the Python code provided to ffi.embedding_init_code().
     */
    pycode = Py_CompileString(_CFFI_PYTHON_STARTUP_CODE,
                              "<init code for '" _CFFI_MODULE_NAME "'>",
                              Py_file_input);
    if (pycode == NULL)
        goto error;
    global_dict = PyDict_New();
    if (global_dict == NULL)
        goto error;
    if (PyDict_SetItemString(global_dict, "__builtins__",
                             PyThreadState_GET()->interp->builtins) < 0)
        goto error;
    x = PyEval_EvalCode(
#if PY_MAJOR_VERSION < 3
                        (PyCodeObject *)
#endif
                        pycode, global_dict, global_dict);
    if (x == NULL)
        goto error;
    Py_DECREF(x);

    /* Done!  Now if we've been called from
       _cffi_start_and_call_python() in an ``extern "Python"``, we can
       only hope that the Python code did correctly set up the
       corresponding @ffi.def_extern() function.  Otherwise, the
       general logic of ``extern "Python"`` functions (inside the
       _cffi_backend module) will find that the reference is still
       missing and print an error.
     */
    result = 0;
 done:
    Py_XDECREF(pycode);
    Py_XDECREF(global_dict);
    PyGILState_Release(state);
    return result;

 error:;
    {
        /* Print as much information as potentially useful.
           Debugging load-time failures with embedding is not fun
        */
        PyObject *ecap;
        PyObject *exception, *v, *tb, *f, *modules, *mod;
        PyErr_Fetch(&exception, &v, &tb);
        ecap = _cffi_start_error_capture();
        f = PySys_GetObject((char *)"stderr");
        if (f != NULL && f != Py_None) {
            PyFile_WriteString(
                "Failed to initialize the Python-CFFI embedding logic:\n\n", f);
        }

        if (exception != NULL) {
            PyErr_NormalizeException(&exception, &v, &tb);
            PyErr_Display(exception, v, tb);
        }
        Py_XDECREF(exception);
        Py_XDECREF(v);
        Py_XDECREF(tb);

        if (f != NULL && f != Py_None) {
            PyFile_WriteString("\nFrom: " _CFFI_MODULE_NAME
                               "\ncompiled with cffi version: 1.11.4"
                               "\n_cffi_backend module: ", f);
            modules = PyImport_GetModuleDict();
            mod = PyDict_GetItemString(modules, "_cffi_backend");
            if (mod == NULL) {
                PyFile_WriteString("not loaded", f);
            }
            else {
                v = PyObject_GetAttrString(mod, "__file__");
                PyFile_WriteObject(v, f, 0);
                Py_XDECREF(v);
            }
            PyFile_WriteString("\nsys.path: ", f);
            PyFile_WriteObject(PySys_GetObject((char *)"path"), f, 0);
            PyFile_WriteString("\n\n", f);
        }
        _cffi_stop_error_capture(ecap);
    }
    result = -1;
    goto done;
}

PyAPI_DATA(char *) _PyParser_TokenNames[];  /* from CPython */

static int _cffi_carefully_make_gil(void)
{
    /* This does the basic initialization of Python.  It can be called
       completely concurrently from unrelated threads.  It assumes
       that we don't hold the GIL before (if it exists), and we don't
       hold it afterwards.

       What it really does is completely different in Python 2 and 
       Python 3.

    Python 2
    ========

       Initialize the GIL, without initializing the rest of Python,
       by calling PyEval_InitThreads().

       PyEval_InitThreads() must not be called concurrently at all.
       So we use a global variable as a simple spin lock.  This global
       variable must be from 'libpythonX.Y.so', not from this
       cffi-based extension module, because it must be shared from
       different cffi-based extension modules.  We choose
       _PyParser_TokenNames[0] as a completely arbitrary pointer value
       that is never written to.  The default is to point to the
       string "ENDMARKER".  We change it temporarily to point to the
       next character in that string.  (Yes, I know it's REALLY
       obscure.)

    Python 3
    ========

       In Python 3, PyEval_InitThreads() cannot be called before
       Py_InitializeEx() any more.  So this function calls
       Py_InitializeEx() first.  It uses the same obscure logic to
       make sure we never call it concurrently.

       Arguably, this is less good on the spinlock, because
       Py_InitializeEx() takes much longer to run than
       PyEval_InitThreads().  But I didn't find a way around it.
    */

#ifdef WITH_THREAD
    char *volatile *lock = (char *volatile *)_PyParser_TokenNames;
    char *old_value;

    while (1) {    /* spin loop */
        old_value = *lock;
        if (old_value[0] == 'E') {
            assert(old_value[1] == 'N');
            if (cffi_compare_and_swap(lock, old_value, old_value + 1))
                break;
        }
        else {
            assert(old_value[0] == 'N');
            /* should ideally do a spin loop instruction here, but
               hard to do it portably and doesn't really matter I
               think: PyEval_InitThreads() should be very fast, and
               this is only run at start-up anyway. */
        }
    }
#endif

#if PY_MAJOR_VERSION >= 3
    /* Python 3: call Py_InitializeEx() */
    {
        PyGILState_STATE state = PyGILState_UNLOCKED;
        if (!Py_IsInitialized())
            _cffi_py_initialize();
        else
            state = PyGILState_Ensure();

        PyEval_InitThreads();
        PyGILState_Release(state);
    }
#else
    /* Python 2: call PyEval_InitThreads() */
# ifdef WITH_THREAD
    if (!PyEval_ThreadsInitialized()) {
        PyEval_InitThreads();    /* makes the GIL */
        PyEval_ReleaseLock();    /* then release it */
    }
    /* else: there is already a GIL, but we still needed to do the
       spinlock dance to make sure that we see it as fully ready */
# endif
#endif

#ifdef WITH_THREAD
    /* release the lock */
    while (!cffi_compare_and_swap(lock, old_value + 1, old_value))
        ;
#endif

    return 0;
}

/**********  end CPython-specific section  **********/


#else


/**********  PyPy-specific section  **********/

PyMODINIT_FUNC _CFFI_PYTHON_STARTUP_FUNC(const void *[]);   /* forward */

static struct _cffi_pypy_init_s {
    const char *name;
    void (*func)(const void *[]);
    const char *code;
} _cffi_pypy_init = {
    _CFFI_MODULE_NAME,
    (void(*)(const void *[]))_CFFI_PYTHON_STARTUP_FUNC,
    _CFFI_PYTHON_STARTUP_CODE,
};

extern int pypy_carefully_make_gil(const char *);
extern int pypy_init_embedded_cffi_module(int, struct _cffi_pypy_init_s *);

static int _cffi_carefully_make_gil(void)
{
    return pypy_carefully_make_gil(_CFFI_MODULE_NAME);
}

static int _cffi_initialize_python(void)
{
    return pypy_init_embedded_cffi_module(0xB011, &_cffi_pypy_init);
}

/**********  end PyPy-specific section  **********/


#endif


#ifdef __GNUC__
__attribute__((noinline))
#endif
static _cffi_call_python_fnptr _cffi_start_python(void)
{
    /* Delicate logic to initialize Python.  This function can be
       called multiple times concurrently, e.g. when the process calls
       its first ``extern "Python"`` functions in multiple threads at
       once.  It can also be called recursively, in which case we must
       ignore it.  We also have to consider what occurs if several
       different cffi-based extensions reach this code in parallel
       threads---it is a different copy of the code, then, and we
       can't have any shared global variable unless it comes from
       'libpythonX.Y.so'.

       Idea:

       * _cffi_carefully_make_gil(): "carefully" call
         PyEval_InitThreads() (possibly with Py_InitializeEx() first).

       * then we use a (local) custom lock to make sure that a call to this
         cffi-based extension will wait if another call to the *same*
         extension is running the initialization in another thread.
         It is reentrant, so that a recursive call will not block, but
         only one from a different thread.

       * then we grab the GIL and (Python 2) we call Py_InitializeEx().
         At this point, concurrent calls to Py_InitializeEx() are not
         possible: we have the GIL.

       * do the rest of the specific initialization, which may
         temporarily release the GIL but not the custom lock.
         Only release the custom lock when we are done.
    */
    static char called = 0;

    if (_cffi_carefully_make_gil() != 0)
        return NULL;

    _cffi_acquire_reentrant_mutex();

    /* Here the GIL exists, but we don't have it.  We're only protected
       from concurrency by the reentrant mutex. */

    /* This file only initializes the embedded module once, the first
       time this is called, even if there are subinterpreters. */
    if (!called) {
        called = 1;  /* invoke _cffi_initialize_python() only once,
                        but don't set '_cffi_call_python' right now,
                        otherwise concurrent threads won't call
                        this function at all (we need them to wait) */
        if (_cffi_initialize_python() == 0) {
            /* now initialization is finished.  Switch to the fast-path. */

            /* We would like nobody to see the new value of
               '_cffi_call_python' without also seeing the rest of the
               data initialized.  However, this is not possible.  But
               the new value of '_cffi_call_python' is the function
               'cffi_call_python()' from _cffi_backend.  So:  */
            cffi_write_barrier();
            /* ^^^ we put a write barrier here, and a corresponding
               read barrier at the start of cffi_call_python().  This
               ensures that after that read barrier, we see everything
               done here before the write barrier.
            */

            assert(_cffi_call_python_org != NULL);
            _cffi_call_python = (_cffi_call_python_fnptr)_cffi_call_python_org;
        }
        else {
            /* initialization failed.  Reset this to NULL, even if it was
               already set to some other value.  Future calls to
               _cffi_start_python() are still forced to occur, and will
               always return NULL from now on. */
            _cffi_call_python_org = NULL;
        }
    }

    _cffi_release_reentrant_mutex();

    return (_cffi_call_python_fnptr)_cffi_call_python_org;
}

static
void _cffi_start_and_call_python(struct _cffi_externpy_s *externpy, char *args)
{
    _cffi_call_python_fnptr fnptr;
    int current_err = errno;
#ifdef _MSC_VER
    int current_lasterr = GetLastError();
#endif
    fnptr = _cffi_start_python();
    if (fnptr == NULL) {
        fprintf(stderr, "function %s() called, but initialization code "
                        "failed.  Returning 0.\n", externpy->name);
        memset(args, 0, externpy->size_of_result);
    }
#ifdef _MSC_VER
    SetLastError(current_lasterr);
#endif
    errno = current_err;

    if (fnptr != NULL)
        fnptr(externpy, args);
}


/* The cffi_start_python() function makes sure Python is initialized
   and our cffi module is set up.  It can be called manually from the
   user C code.  The same effect is obtained automatically from any
   dll-exported ``extern "Python"`` function.  This function returns
   -1 if initialization failed, 0 if all is OK.  */
_CFFI_UNUSED_FN
static int cffi_start_python(void)
{
    if (_cffi_call_python == &_cffi_start_and_call_python) {
        if (_cffi_start_python() == NULL)
            return -1;
    }
    cffi_read_barrier();
    return 0;
}

#undef cffi_compare_and_swap
#undef cffi_write_barrier
#undef cffi_read_barrier

#ifdef __cplusplus
}
#endif
