/* GLIB - Library of useful routines for C programming
 * Copyright (C) 1995-1997  Peter Mattis, Spencer Kimball and Josh MacDonald
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Modified by the GLib Team and others 1997-2000.  See the AUTHORS
 * file for a list of people on the GLib Team.  See the ChangeLog
 * files for a list of changes.  These files are distributed with
 * GLib at ftp://ftp.gtk.org/pub/gtk/.
 */

#ifndef __G_UTILS_H__
#define __G_UTILS_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>
#include <stdarg.h>

G_BEGIN_DECLS

/* Define G_VA_COPY() to do the right thing for copying va_list variables.
 * glibconfig.h may have already defined G_VA_COPY as va_copy or __va_copy.
 */
#if !defined (G_VA_COPY)
#  if defined (__GNUC__) && defined (__PPC__) && (defined (_CALL_SYSV) || defined (_WIN32))
#    define G_VA_COPY(ap1, ap2)	  (*(ap1) = *(ap2))
#  elif defined (G_VA_COPY_AS_ARRAY)
#    define G_VA_COPY(ap1, ap2)	  memmove ((ap1), (ap2), sizeof (va_list))
#  else /* va_list is a pointer */
#    define G_VA_COPY(ap1, ap2)	  ((ap1) = (ap2))
#  endif /* va_list is a pointer */
#endif /* !G_VA_COPY */

GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_user_name        (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_real_name        (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_home_dir         (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_tmp_dir          (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_host_name	     (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_prgname          (void);
GLIB_AVAILABLE_IN_ALL
void                  g_set_prgname          (const gchar *prgname);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_application_name (void);
GLIB_AVAILABLE_IN_ALL
void                  g_set_application_name (const gchar *application_name);

GLIB_AVAILABLE_IN_ALL
void      g_reload_user_special_dirs_cache     (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_user_data_dir      (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_user_config_dir    (void);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_get_user_cache_dir     (void);
GLIB_AVAILABLE_IN_ALL
const gchar * const * g_get_system_data_dirs   (void);

#ifdef G_OS_WIN32
/* This function is not part of the public GLib API */
GLIB_AVAILABLE_IN_ALL
const gchar * const * g_win32_get_system_data_dirs_for_module (void (*address_of_function)(void));
#endif

#if defined (G_OS_WIN32) && defined (G_CAN_INLINE)
/* This function is not part of the public GLib API either. Just call
 * g_get_system_data_dirs() in your code, never mind that that is
 * actually a macro and you will in fact call this inline function.
 */
static inline const gchar * const *
_g_win32_get_system_data_dirs (void)
{
  return g_win32_get_system_data_dirs_for_module ((void (*)(void)) &_g_win32_get_system_data_dirs);
}
#define g_get_system_data_dirs _g_win32_get_system_data_dirs
#endif

GLIB_AVAILABLE_IN_ALL
const gchar * const * g_get_system_config_dirs (void);

GLIB_AVAILABLE_IN_ALL
const gchar * g_get_user_runtime_dir (void);

/**
 * GUserDirectory:
 * @G_USER_DIRECTORY_DESKTOP: the user's Desktop directory
 * @G_USER_DIRECTORY_DOCUMENTS: the user's Documents directory
 * @G_USER_DIRECTORY_DOWNLOAD: the user's Downloads directory
 * @G_USER_DIRECTORY_MUSIC: the user's Music directory
 * @G_USER_DIRECTORY_PICTURES: the user's Pictures directory
 * @G_USER_DIRECTORY_PUBLIC_SHARE: the user's shared directory
 * @G_USER_DIRECTORY_TEMPLATES: the user's Templates directory
 * @G_USER_DIRECTORY_VIDEOS: the user's Movies directory
 * @G_USER_N_DIRECTORIES: the number of enum values
 *
 * These are logical ids for special directories which are defined
 * depending on the platform used. You should use g_get_user_special_dir()
 * to retrieve the full path associated to the logical id.
 *
 * The #GUserDirectory enumeration can be extended at later date. Not
 * every platform has a directory for every logical id in this
 * enumeration.
 *
 * Since: 2.14
 */
typedef enum {
  G_USER_DIRECTORY_DESKTOP,
  G_USER_DIRECTORY_DOCUMENTS,
  G_USER_DIRECTORY_DOWNLOAD,
  G_USER_DIRECTORY_MUSIC,
  G_USER_DIRECTORY_PICTURES,
  G_USER_DIRECTORY_PUBLIC_SHARE,
  G_USER_DIRECTORY_TEMPLATES,
  G_USER_DIRECTORY_VIDEOS,

  G_USER_N_DIRECTORIES
} GUserDirectory;

GLIB_AVAILABLE_IN_ALL
const gchar * g_get_user_special_dir (GUserDirectory directory);

/**
 * GDebugKey:
 * @key: the string
 * @value: the flag
 *
 * Associates a string with a bit flag.
 * Used in g_parse_debug_string().
 */
typedef struct _GDebugKey GDebugKey;
struct _GDebugKey
{
  const gchar *key;
  guint	       value;
};

/* Miscellaneous utility functions
 */
GLIB_AVAILABLE_IN_ALL
guint                 g_parse_debug_string (const gchar     *string,
					    const GDebugKey *keys,
					    guint            nkeys);

GLIB_AVAILABLE_IN_ALL
gint                  g_snprintf           (gchar       *string,
					    gulong       n,
					    gchar const *format,
					    ...) G_GNUC_PRINTF (3, 4);
GLIB_AVAILABLE_IN_ALL
gint                  g_vsnprintf          (gchar       *string,
					    gulong       n,
					    gchar const *format,
					    va_list      args)
					    G_GNUC_PRINTF(3, 0);

GLIB_AVAILABLE_IN_ALL
void                  g_nullify_pointer    (gpointer    *nullify_location);

typedef enum
{
  G_FORMAT_SIZE_DEFAULT     = 0,
  G_FORMAT_SIZE_LONG_FORMAT = 1 << 0,
  G_FORMAT_SIZE_IEC_UNITS   = 1 << 1,
  G_FORMAT_SIZE_BITS        = 1 << 2
} GFormatSizeFlags;

GLIB_AVAILABLE_IN_2_30
gchar *g_format_size_full   (guint64          size,
                             GFormatSizeFlags flags);
GLIB_AVAILABLE_IN_2_30
gchar *g_format_size        (guint64          size);

GLIB_DEPRECATED_IN_2_30_FOR(g_format_size)
gchar *g_format_size_for_display (goffset size);

#ifndef G_DISABLE_DEPRECATED
/**
 * GVoidFunc:
 *
 * Declares a type of function which takes no arguments
 * and has no return value. It is used to specify the type
 * function passed to g_atexit().
 */
typedef void (*GVoidFunc) (void);
#define ATEXIT(proc) g_ATEXIT(proc)
GLIB_DEPRECATED
void	g_atexit		(GVoidFunc    func);

#ifdef G_OS_WIN32
/* It's a bad idea to wrap atexit() on Windows. If the GLib DLL calls
 * atexit(), the function will be called when the GLib DLL is detached
 * from the program, which is not what the caller wants. The caller
 * wants the function to be called when it *itself* exits (or is
 * detached, in case the caller, too, is a DLL).
 */
#if (defined(__MINGW_H) && !defined(_STDLIB_H_)) || (defined(_MSC_VER) && !defined(_INC_STDLIB))
int atexit (void (*)(void));
#endif
#define g_atexit(func) atexit(func)
#endif

#endif


/* Look for an executable in PATH, following execvp() rules */
GLIB_AVAILABLE_IN_ALL
gchar*  g_find_program_in_path  (const gchar *program);

/* Bit tests
 *
 * These are defined in a convoluted way because we want the compiler to
 * be able to inline the code for performance reasons, but for
 * historical reasons, we must continue to provide non-inline versions
 * on our ABI.
 *
 * We define these as functions in gutils.c which are just implemented
 * as calls to the _impl() versions in order to preserve the ABI.
 */

#define g_bit_nth_lsf(mask, nth_bit) g_bit_nth_lsf_impl(mask, nth_bit)
#define g_bit_nth_msf(mask, nth_bit) g_bit_nth_msf_impl(mask, nth_bit)
#define g_bit_storage(number)        g_bit_storage_impl(number)

GLIB_AVAILABLE_IN_ALL
gint    (g_bit_nth_lsf)         (gulong mask,
                                 gint   nth_bit);
GLIB_AVAILABLE_IN_ALL
gint    (g_bit_nth_msf)         (gulong mask,
                                 gint   nth_bit);
GLIB_AVAILABLE_IN_ALL
guint   (g_bit_storage)         (gulong number);

static inline gint
g_bit_nth_lsf_impl (gulong mask,
                    gint   nth_bit)
{
  if (G_UNLIKELY (nth_bit < -1))
    nth_bit = -1;
  while (nth_bit < ((GLIB_SIZEOF_LONG * 8) - 1))
    {
      nth_bit++;
      if (mask & (1UL << nth_bit))
        return nth_bit;
    }
  return -1;
}

static inline gint
g_bit_nth_msf_impl (gulong mask,
                    gint   nth_bit)
{
  if (nth_bit < 0 || G_UNLIKELY (nth_bit > GLIB_SIZEOF_LONG * 8))
    nth_bit = GLIB_SIZEOF_LONG * 8;
  while (nth_bit > 0)
    {
      nth_bit--;
      if (mask & (1UL << nth_bit))
        return nth_bit;
    }
  return -1;
}

static inline guint
g_bit_storage_impl (gulong number)
{
#if defined(__GNUC__) && (__GNUC__ >= 4) && defined(__OPTIMIZE__)
  return G_LIKELY (number) ?
           ((GLIB_SIZEOF_LONG * 8U - 1) ^ (guint) __builtin_clzl(number)) + 1 : 1;
#else
  guint n_bits = 0;

  do
    {
      n_bits++;
      number >>= 1;
    }
  while (number);
  return n_bits;
#endif
}

/* Crashes the program. */
#if GLIB_VERSION_MAX_ALLOWED >= GLIB_VERSION_2_50
#ifndef G_OS_WIN32
#  include <stdlib.h>
#  define g_abort() abort ()
#else
GLIB_AVAILABLE_IN_2_50
void g_abort (void) G_GNUC_NORETURN G_ANALYZER_NORETURN;
#endif
#endif

#ifndef G_DISABLE_DEPRECATED

/*
 * This macro is deprecated. This DllMain() is too complex. It is
 * recommended to write an explicit minimal DLlMain() that just saves
 * the handle to the DLL and then use that handle instead, for
 * instance passing it to
 * g_win32_get_package_installation_directory_of_module().
 *
 * On Windows, this macro defines a DllMain function that stores the
 * actual DLL name that the code being compiled will be included in.
 * STATIC should be empty or 'static'. DLL_NAME is the name of the
 * (pointer to the) char array where the DLL name will be stored. If
 * this is used, you must also include <windows.h>. If you need a more complex
 * DLL entry point function, you cannot use this.
 *
 * On non-Windows platforms, expands to nothing.
 */

#ifndef G_PLATFORM_WIN32
# define G_WIN32_DLLMAIN_FOR_DLL_NAME(static, dll_name)
#else
# define G_WIN32_DLLMAIN_FOR_DLL_NAME(static, dll_name)			\
static char *dll_name;							\
									\
BOOL WINAPI								\
DllMain (HINSTANCE hinstDLL,						\
	 DWORD     fdwReason,						\
	 LPVOID    lpvReserved)						\
{									\
  wchar_t wcbfr[1000];							\
  char *tem;								\
  switch (fdwReason)							\
    {									\
    case DLL_PROCESS_ATTACH:						\
      GetModuleFileNameW ((HMODULE) hinstDLL, wcbfr, G_N_ELEMENTS (wcbfr)); \
      tem = g_utf16_to_utf8 (wcbfr, -1, NULL, NULL, NULL);		\
      dll_name = g_path_get_basename (tem);				\
      g_free (tem);							\
      break;								\
    }									\
									\
  return TRUE;								\
}

#endif	/* !G_DISABLE_DEPRECATED */

#endif /* G_PLATFORM_WIN32 */

G_END_DECLS

#endif /* __G_UTILS_H__ */
