#ifndef CALLBACK_BRIDGE_H
#define CALLBACK_BRIDGE_H

#include <vector>
#include <nan.h>
#include <algorithm>
#include <uv.h>

#define COMMA ,

template <typename T, typename L = void*>
class CallbackBridge {
  public:
    CallbackBridge(v8::Local<v8::Function>, bool);
    virtual ~CallbackBridge();

    // Executes the callback
    T operator()(std::vector<void*>);

  protected:
    // We will expose a bridge object to the JS callback that wraps this instance so we don't loose context.
    // This is the V8 constructor for such objects.
    static Nan::MaybeLocal<v8::Function> get_wrapper_constructor();
    static void async_gone(uv_handle_t *handle);
    static NAN_METHOD(New);
    static NAN_METHOD(ReturnCallback);
    static Nan::Persistent<v8::Function> wrapper_constructor;
    Nan::Persistent<v8::Object> wrapper;

    // The callback that will get called in the main thread after the worker thread used for the sass
    // compilation step makes a call to uv_async_send()
    static void dispatched_async_uv_callback(uv_async_t*);

    // The V8 values sent to our ReturnCallback must be read on the main thread not the sass worker thread.
    // This gives a chance to specialized subclasses to transform those values into whatever makes sense to
    // sass before we resume the worker thread.
    virtual T post_process_return_value(v8::Local<v8::Value>) const =0;


    virtual std::vector<v8::Local<v8::Value>> pre_process_args(std::vector<L>) const =0;

    Nan::Callback* callback;
    Nan::AsyncResource* async_resource;
    bool is_sync;

    uv_mutex_t cv_mutex;
    uv_cond_t condition_variable;
    uv_async_t *async;
    std::vector<L> argv;
    bool has_returned;
    T return_value;
};

template <typename T, typename L>
Nan::Persistent<v8::Function> CallbackBridge<T, L>::wrapper_constructor;

template <typename T, typename L>
CallbackBridge<T, L>::CallbackBridge(v8::Local<v8::Function> callback, bool is_sync) : callback(new Nan::Callback(callback)), is_sync(is_sync) {
  /*
   * This is invoked from the main JavaScript thread.
   * V8 context is available.
   */
  Nan::HandleScope scope;
  uv_mutex_init(&this->cv_mutex);
  uv_cond_init(&this->condition_variable);
  if (!is_sync) {
    this->async = new uv_async_t;
    this->async->data = (void*) this;
    uv_async_init(uv_default_loop(), this->async, (uv_async_cb) dispatched_async_uv_callback);
    this->async_resource = new Nan::AsyncResource("node-sass:CallbackBridge");
  }

  v8::Local<v8::Function> func = CallbackBridge<T, L>::get_wrapper_constructor().ToLocalChecked();
  wrapper.Reset(Nan::NewInstance(func).ToLocalChecked());
  Nan::SetInternalFieldPointer(Nan::New(wrapper), 0, this);
}

template <typename T, typename L>
CallbackBridge<T, L>::~CallbackBridge() {
  delete this->callback;
  this->wrapper.Reset();
  uv_cond_destroy(&this->condition_variable);
  uv_mutex_destroy(&this->cv_mutex);

  if (!is_sync) {
    uv_close((uv_handle_t*)this->async, &async_gone);
    delete this->async_resource;
  }
}

template <typename T, typename L>
T CallbackBridge<T, L>::operator()(std::vector<void*> argv) {
  // argv.push_back(wrapper);
  if (this->is_sync) {
    /*
     * This is invoked from the main JavaScript thread.
     * V8 context is available.
     *
     * Establish Local<> scope for all functions
     * from types invoked by pre_process_args() and
     * post_process_args().
     */
    Nan::HandleScope scope;
    Nan::TryCatch try_catch;
    std::vector<v8::Local<v8::Value>> argv_v8 = pre_process_args(argv);
    if (try_catch.HasCaught()) {
      Nan::FatalException(try_catch);
    }

    argv_v8.push_back(Nan::New(wrapper));

    return this->post_process_return_value(
      Nan::Call(*this->callback, argv_v8.size(), &argv_v8[0]).ToLocalChecked()
    );
  } else {
    /*
     * This is invoked from the worker thread.
     * No V8 context and functions available.
     * Just wait for response from asynchronously
     * scheduled JavaScript code
     *
     * XXX Issue #1048: We block here even if the
     *     event loop stops and the callback
     *     would never be executed.
     * XXX Issue #857: By waiting here we occupy
     *     one of the threads taken from the
     *     uv threadpool. Might deadlock if
     *     async I/O executed from JavaScript callbacks.
     */
    this->argv = argv;

    uv_mutex_lock(&this->cv_mutex);
    this->has_returned = false;
    uv_async_send(this->async);
    while (!this->has_returned) {
      uv_cond_wait(&this->condition_variable, &this->cv_mutex);
    }
    uv_mutex_unlock(&this->cv_mutex);
    return this->return_value;
  }
}

template <typename T, typename L>
void CallbackBridge<T, L>::dispatched_async_uv_callback(uv_async_t *req) {
  CallbackBridge* bridge = static_cast<CallbackBridge*>(req->data);

  /*
   * Function scheduled via uv_async mechanism, therefore
   * it is invoked from the main JavaScript thread.
   * V8 context is available.
   *
   * Establish Local<> scope for all functions
   * from types invoked by pre_process_args() and
   * post_process_args().
   */
  Nan::HandleScope scope;
  Nan::TryCatch try_catch;

  std::vector<v8::Local<v8::Value>> argv_v8 = bridge->pre_process_args(bridge->argv);
  if (try_catch.HasCaught()) {
    Nan::FatalException(try_catch);
  }
  argv_v8.push_back(Nan::New(bridge->wrapper));

  bridge->callback->Call(argv_v8.size(), &argv_v8[0], bridge->async_resource);

  if (try_catch.HasCaught()) {
    Nan::FatalException(try_catch);
  }
}

template <typename T, typename L>
NAN_METHOD(CallbackBridge<T COMMA L>::ReturnCallback) {

  /*
   * Callback function invoked by the user code.
   * It is invoked from the main JavaScript thread.
   * V8 context is available.
   *
   * Implicit Local<> handle scope created by NAN_METHOD(.)
   */
  CallbackBridge<T, L>* bridge = static_cast<CallbackBridge<T, L>*>(Nan::GetInternalFieldPointer(info.This(), 0));
  Nan::TryCatch try_catch;

  bridge->return_value = bridge->post_process_return_value(info[0]);

  {
    uv_mutex_lock(&bridge->cv_mutex);
    bridge->has_returned = true;
    uv_mutex_unlock(&bridge->cv_mutex);
  }

  uv_cond_broadcast(&bridge->condition_variable);

  if (try_catch.HasCaught()) {
    Nan::FatalException(try_catch);
  }
}

template <typename T, typename L>
Nan::MaybeLocal<v8::Function> CallbackBridge<T, L>::get_wrapper_constructor() {
  /* Uses handle scope created in the CallbackBridge<T, L> constructor */
  if (wrapper_constructor.IsEmpty()) {
    v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
    tpl->SetClassName(Nan::New("CallbackBridge").ToLocalChecked());
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    Nan::SetPrototypeTemplate(tpl, "success",
      Nan::New<v8::FunctionTemplate>(ReturnCallback)
    );

    wrapper_constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  }

  return Nan::New(wrapper_constructor);
}

template <typename T, typename L>
NAN_METHOD(CallbackBridge<T COMMA L>::New) {
  info.GetReturnValue().Set(info.This());
}

template <typename T, typename L>
void CallbackBridge<T, L>::async_gone(uv_handle_t *handle) {
  delete (uv_async_t *)handle;
}

#endif
