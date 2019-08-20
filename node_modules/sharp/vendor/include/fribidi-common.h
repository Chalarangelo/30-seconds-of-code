/* FriBidi
 * fribidi-common.h - common include for library headers
 *
 * Author:
 *   Behdad Esfahbod, 2004
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc.
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
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library, in a file named COPYING; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA
 * 
 * For licensing issues, contact <fribidi.license@gmail.com>.
 */
#ifndef _FRIBIDI_COMMON_H
#define _FRIBIDI_COMMON_H

#ifdef DONT_HAVE_FRIBIDI_CONFIG_H
# define FRIBIDI "fribidi"
# define FRIBIDI_NAME "fribidi"
# define FRIBIDI_VERSION "unknown"
# define FRIBIDI_BUGREPORT "unknown"
# define FRIBIDI_INTERFACE_VERSION_STRING "unknown"
#else /* !DONT_HAVE_FRIBIDI_CONFIG_H */
# include "fribidi-config.h"
#endif /* !DONT_HAVE_FRIBIDI_CONFIG_H */

#ifdef HAVE_FRIBIDI_CUSTOM_H
# include <fribidi-custom.h>
#endif /* HAVE_FRIBIDI_CUSTOM_H */


/* FRIBIDI_ENTRY is a macro used to declare library entry points. */
#ifndef FRIBIDI_ENTRY
# if (defined(_MSC_VER) || defined(FRIBIDI_BUILT_WITH_MSVC)) && !defined(FRIBIDI_STATIC)
/* if we're building fribidi itself with MSVC, FRIBIDI_ENTRY will be defined,
 * so if we're here then this is an external user including fribidi headers.
 * The dllimport is needed here mostly for the fribidi_version_info variable,
 * for functions it's not required. Probably needs more fine-tuning if
 * someone starts building fribidi as static library with MSVC. We'll cross
 * that brige when we get there. */
#  define FRIBIDI_ENTRY __declspec(dllimport) extern
# else
#  define FRIBIDI_ENTRY extern
# endif
#endif /* !FRIBIDI_ENTRY */

#ifdef __ICC
#define FRIBIDI_BEGIN_IGNORE_DEPRECATIONS               \
  _Pragma ("warning (push)")                            \
  _Pragma ("warning (disable:1478)")
#define FRIBIDI_END_IGNORE_DEPRECATIONS			\
  _Pragma ("warning (pop)")
#elif    __GNUC__ > 4 || (__GNUC__ == 4 && __GNUC_MINOR__ >= 6)
#define FRIBIDI_BEGIN_IGNORE_DEPRECATIONS		\
  _Pragma ("GCC diagnostic push")			\
  _Pragma ("GCC diagnostic ignored \"-Wdeprecated-declarations\"")
#define FRIBIDI_END_IGNORE_DEPRECATIONS			\
  _Pragma ("GCC diagnostic pop")
#elif defined (_MSC_VER) && (_MSC_VER >= 1500)
#define FRIBIDI_BEGIN_IGNORE_DEPRECATIONS		\
  __pragma (warning (push))                             \
  __pragma (warning (disable : 4996))
#define FRIBIDI_END_IGNORE_DEPRECATIONS			\
  __pragma (warning (pop))
#elif defined (__clang__)
#define FRIBIDI_BEGIN_IGNORE_DEPRECATIONS               \
  _Pragma("clang diagnostic push")                      \
  _Pragma("clang diagnostic ignored \"-Wdeprecated-declarations\"")
#define FRIBIDI_END_IGNORE_DEPRECATIONS \
  _Pragma("clang diagnostic pop")
#else
#define FRIBIDI_BEGIN_IGNORE_DEPRECATIONS
#define FRIBIDI_END_IGNORE_DEPRECATIONS
#endif

#if defined(__GNUC__) && (__GNUC__ > 2)
# define FRIBIDI_GNUC_WARN_UNUSED __attribute__((__warn_unused_result__))
# define FRIBIDI_GNUC_MALLOC      __attribute__((__malloc__))
# define FRIBIDI_GNUC_HIDDEN      __attribute__((__visibility__ ("hidden")))
# define FRIBIDI_GNUC_CONST       __attribute__((__const__))
# define FRIBIDI_GNUC_DEPRECATED  __attribute__((__unused__))
#else /* __GNUC__ */
# define FRIBIDI_GNUC_WARN_UNUSED
# define FRIBIDI_GNUC_MALLOC
# define FRIBIDI_GNUC_HIDDEN
# define FRIBIDI_GNUC_CONST
# define FRIBIDI_GNUC_DEPRECATED
#endif	/* __GNUC__ */

/* FRIBIDI_BEGIN_DECLS should be used at the beginning of your declarations,
 * so that C++ compilers don't mangle their names.  Use FRIBIDI_END_DECLS at
 * the end of C declarations. */
#ifndef FRIBIDI_BEGIN_DECLS
# ifdef __cplusplus
#  define FRIBIDI_BEGIN_DECLS extern "C" {
#  define FRIBIDI_END_DECLS }
# else /* !__cplusplus */
#  define FRIBIDI_BEGIN_DECLS	/* empty */
#  define FRIBIDI_END_DECLS	/* empty */
# endif	/* !__cplusplus */
#endif /* !FRIBIDI_BEGIN_DECLS */




/* fribidi_debug_status - get current debug state
 *
 */
FRIBIDI_ENTRY int fribidi_debug_status (
  void
);

/* fribidi_set_debug - set debug state
 *
 */
FRIBIDI_ENTRY int
fribidi_set_debug (
  int state		/* new state to set */
);











#endif /* !_FRIBIDI_COMMON_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
