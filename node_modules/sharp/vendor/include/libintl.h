/* Message catalogs for internationalization.
   Copyright (C) 1995-1997, 2000-2016 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Lesser General Public License as published by
   the Free Software Foundation; either version 2.1 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Lesser General Public License for more details.

   You should have received a copy of the GNU Lesser General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

#ifndef _LIBINTL_H
#define _LIBINTL_H 1

#include <locale.h>
#if (defined __APPLE__ && defined __MACH__) && 1
# include <xlocale.h>
#endif

/* The LC_MESSAGES locale category is the category used by the functions
   gettext() and dgettext().  It is specified in POSIX, but not in ANSI C.
   On systems that don't define it, use an arbitrary value instead.
   On Solaris, <locale.h> defines __LOCALE_H (or _LOCALE_H in Solaris 2.5)
   then includes <libintl.h> (i.e. this file!) and then only defines
   LC_MESSAGES.  To avoid a redefinition warning, don't define LC_MESSAGES
   in this case.  */
#if !defined LC_MESSAGES && !(defined __LOCALE_H || (defined _LOCALE_H && defined __sun))
# define LC_MESSAGES 1729
#endif

/* We define an additional symbol to signal that we use the GNU
   implementation of gettext.  */
#define __USE_GNU_GETTEXT 1

/* Provide information about the supported file formats.  Returns the
   maximum minor revision number supported for a given major revision.  */
#define __GNU_GETTEXT_SUPPORTED_REVISION(major) \
  ((major) == 0 || (major) == 1 ? 1 : -1)

/* Resolve a platform specific conflict on DJGPP.  GNU gettext takes
   precedence over _conio_gettext.  */
#ifdef __DJGPP__
# undef gettext
#endif

#ifdef __cplusplus
extern "C" {
#endif


/* Version number: (major<<16) + (minor<<8) + subminor */
#define LIBINTL_VERSION 0x001308
extern int libintl_version;


/* We redirect the functions to those prefixed with "libintl_".  This is
   necessary, because some systems define gettext/textdomain/... in the C
   library (namely, Solaris 2.4 and newer, and GNU libc 2.0 and newer).
   If we used the unprefixed names, there would be cases where the
   definition in the C library would override the one in the libintl.so
   shared library.  Recall that on ELF systems, the symbols are looked
   up in the following order:
     1. in the executable,
     2. in the shared libraries specified on the link command line, in order,
     3. in the dependencies of the shared libraries specified on the link
        command line,
     4. in the dlopen()ed shared libraries, in the order in which they were
        dlopen()ed.
   The definition in the C library would override the one in libintl.so if
   either
     * -lc is given on the link command line and -lintl isn't, or
     * -lc is given on the link command line before -lintl, or
     * libintl.so is a dependency of a dlopen()ed shared library but not
       linked to the executable at link time.
   Since Solaris gettext() behaves differently than GNU gettext(), this
   would be unacceptable.

   The redirection happens by default through macros in C, so that &gettext
   is independent of the compilation unit, but through inline functions in
   C++, in order not to interfere with the name mangling of class fields or
   class methods called 'gettext'.  */

/* The user can define _INTL_REDIRECT_INLINE or _INTL_REDIRECT_MACROS.
   If he doesn't, we choose the method.  A third possible method is
   _INTL_REDIRECT_ASM, supported only by GCC.  */
#if !(defined _INTL_REDIRECT_INLINE || defined _INTL_REDIRECT_MACROS)
# if defined __GNUC__ && __GNUC__ >= 2 && !(defined __APPLE_CC__ && __APPLE_CC__ > 1) && !defined __MINGW32__ && !(__GNUC__ == 2 && defined _AIX) && (defined __STDC__ || defined __cplusplus)
#  define _INTL_REDIRECT_ASM
# else
#  ifdef __cplusplus
#   define _INTL_REDIRECT_INLINE
#  else
#   define _INTL_REDIRECT_MACROS
#  endif
# endif
#endif
/* Auxiliary macros.  */
#ifdef _INTL_REDIRECT_ASM
# define _INTL_ASM(cname) __asm__ (_INTL_ASMNAME (__USER_LABEL_PREFIX__, #cname))
# define _INTL_ASMNAME(prefix,cnamestring) _INTL_STRINGIFY (prefix) cnamestring
# define _INTL_STRINGIFY(prefix) #prefix
#else
# define _INTL_ASM(cname)
#endif

/* _INTL_MAY_RETURN_STRING_ARG(n) declares that the given function may return
   its n-th argument literally.  This enables GCC to warn for example about
   printf (gettext ("foo %y")).  */
#if defined __GNUC__ && __GNUC__ >= 3 && !(defined __APPLE_CC__ && __APPLE_CC__ > 1 && defined __cplusplus)
# define _INTL_MAY_RETURN_STRING_ARG(n) __attribute__ ((__format_arg__ (n)))
#else
# define _INTL_MAY_RETURN_STRING_ARG(n)
#endif

/* Look up MSGID in the current default message catalog for the current
   LC_MESSAGES locale.  If not found, returns MSGID itself (the default
   text).  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_gettext (const char *__msgid)
       _INTL_MAY_RETURN_STRING_ARG (1);
static inline char *gettext (const char *__msgid)
{
  return libintl_gettext (__msgid);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define gettext libintl_gettext
#endif
extern char *gettext (const char *__msgid)
       _INTL_ASM (libintl_gettext)
       _INTL_MAY_RETURN_STRING_ARG (1);
#endif

/* Look up MSGID in the DOMAINNAME message catalog for the current
   LC_MESSAGES locale.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_dgettext (const char *__domainname, const char *__msgid)
       _INTL_MAY_RETURN_STRING_ARG (2);
static inline char *dgettext (const char *__domainname, const char *__msgid)
{
  return libintl_dgettext (__domainname, __msgid);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define dgettext libintl_dgettext
#endif
extern char *dgettext (const char *__domainname, const char *__msgid)
       _INTL_ASM (libintl_dgettext)
       _INTL_MAY_RETURN_STRING_ARG (2);
#endif

/* Look up MSGID in the DOMAINNAME message catalog for the current CATEGORY
   locale.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_dcgettext (const char *__domainname, const char *__msgid,
                                int __category)
       _INTL_MAY_RETURN_STRING_ARG (2);
static inline char *dcgettext (const char *__domainname, const char *__msgid,
                               int __category)
{
  return libintl_dcgettext (__domainname, __msgid, __category);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define dcgettext libintl_dcgettext
#endif
extern char *dcgettext (const char *__domainname, const char *__msgid,
                        int __category)
       _INTL_ASM (libintl_dcgettext)
       _INTL_MAY_RETURN_STRING_ARG (2);
#endif


/* Similar to 'gettext' but select the plural form corresponding to the
   number N.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_ngettext (const char *__msgid1, const char *__msgid2,
                               unsigned long int __n)
       _INTL_MAY_RETURN_STRING_ARG (1) _INTL_MAY_RETURN_STRING_ARG (2);
static inline char *ngettext (const char *__msgid1, const char *__msgid2,
                              unsigned long int __n)
{
  return libintl_ngettext (__msgid1, __msgid2, __n);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define ngettext libintl_ngettext
#endif
extern char *ngettext (const char *__msgid1, const char *__msgid2,
                       unsigned long int __n)
       _INTL_ASM (libintl_ngettext)
       _INTL_MAY_RETURN_STRING_ARG (1) _INTL_MAY_RETURN_STRING_ARG (2);
#endif

/* Similar to 'dgettext' but select the plural form corresponding to the
   number N.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_dngettext (const char *__domainname, const char *__msgid1,
                                const char *__msgid2, unsigned long int __n)
       _INTL_MAY_RETURN_STRING_ARG (2) _INTL_MAY_RETURN_STRING_ARG (3);
static inline char *dngettext (const char *__domainname, const char *__msgid1,
                               const char *__msgid2, unsigned long int __n)
{
  return libintl_dngettext (__domainname, __msgid1, __msgid2, __n);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define dngettext libintl_dngettext
#endif
extern char *dngettext (const char *__domainname,
                        const char *__msgid1, const char *__msgid2,
                        unsigned long int __n)
       _INTL_ASM (libintl_dngettext)
       _INTL_MAY_RETURN_STRING_ARG (2) _INTL_MAY_RETURN_STRING_ARG (3);
#endif

/* Similar to 'dcgettext' but select the plural form corresponding to the
   number N.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_dcngettext (const char *__domainname,
                                 const char *__msgid1, const char *__msgid2,
                                 unsigned long int __n, int __category)
       _INTL_MAY_RETURN_STRING_ARG (2) _INTL_MAY_RETURN_STRING_ARG (3);
static inline char *dcngettext (const char *__domainname,
                                const char *__msgid1, const char *__msgid2,
                                unsigned long int __n, int __category)
{
  return libintl_dcngettext (__domainname, __msgid1, __msgid2, __n, __category);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define dcngettext libintl_dcngettext
#endif
extern char *dcngettext (const char *__domainname,
                         const char *__msgid1, const char *__msgid2,
                         unsigned long int __n, int __category)
       _INTL_ASM (libintl_dcngettext)
       _INTL_MAY_RETURN_STRING_ARG (2) _INTL_MAY_RETURN_STRING_ARG (3);
#endif



/* Set the current default message catalog to DOMAINNAME.
   If DOMAINNAME is null, return the current default.
   If DOMAINNAME is "", reset to the default of "messages".  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_textdomain (const char *__domainname);
static inline char *textdomain (const char *__domainname)
{
  return libintl_textdomain (__domainname);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define textdomain libintl_textdomain
#endif
extern char *textdomain (const char *__domainname)
       _INTL_ASM (libintl_textdomain);
#endif

/* Specify that the DOMAINNAME message catalog will be found
   in DIRNAME rather than in the system locale data base.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_bindtextdomain (const char *__domainname,
                                     const char *__dirname);
static inline char *bindtextdomain (const char *__domainname,
                                    const char *__dirname)
{
  return libintl_bindtextdomain (__domainname, __dirname);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define bindtextdomain libintl_bindtextdomain
#endif
extern char *bindtextdomain (const char *__domainname, const char *__dirname)
       _INTL_ASM (libintl_bindtextdomain);
#endif

/* Specify the character encoding in which the messages from the
   DOMAINNAME message catalog will be returned.  */
#ifdef _INTL_REDIRECT_INLINE
extern char *libintl_bind_textdomain_codeset (const char *__domainname,
                                              const char *__codeset);
static inline char *bind_textdomain_codeset (const char *__domainname,
                                             const char *__codeset)
{
  return libintl_bind_textdomain_codeset (__domainname, __codeset);
}
#else
#ifdef _INTL_REDIRECT_MACROS
# define bind_textdomain_codeset libintl_bind_textdomain_codeset
#endif
extern char *bind_textdomain_codeset (const char *__domainname,
                                      const char *__codeset)
       _INTL_ASM (libintl_bind_textdomain_codeset);
#endif



/* Support for format strings with positions in *printf(), following the
   POSIX/XSI specification.
   Note: These replacements for the *printf() functions are visible only
   in source files that #include <libintl.h> or #include "gettext.h".
   Packages that use *printf() in source files that don't refer to _()
   or gettext() but for which the format string could be the return value
   of _() or gettext() need to add this #include.  Oh well.  */

#if !1

#include <stdio.h>
#include <stddef.h>

/* Get va_list.  */
#if (defined __STDC__ && __STDC__) || defined __cplusplus || defined _MSC_VER
# include <stdarg.h>
#else
# include <varargs.h>
#endif

#if !(defined fprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef fprintf
#define fprintf libintl_fprintf
extern int fprintf (FILE *, const char *, ...);
#endif
#if !(defined vfprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef vfprintf
#define vfprintf libintl_vfprintf
extern int vfprintf (FILE *, const char *, va_list);
#endif

#if !(defined printf && defined _GL_STDIO_H) /* don't override gnulib */
#undef printf
#if defined __NetBSD__ || defined __BEOS__ || defined __CYGWIN__ || defined __MINGW32__
/* Don't break __attribute__((format(printf,M,N))).
   This redefinition is only possible because the libc in NetBSD, Cygwin,
   mingw does not have a function __printf__.
   Alternatively, we could have done this redirection only when compiling with
   __GNUC__, together with a symbol redirection:
       extern int printf (const char *, ...)
              __asm__ (#__USER_LABEL_PREFIX__ "libintl_printf");
   But doing it now would introduce a binary incompatibility with already
   distributed versions of libintl on these systems.  */
# define libintl_printf __printf__
#endif
#define printf libintl_printf
extern int printf (const char *, ...);
#endif
#if !(defined vprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef vprintf
#define vprintf libintl_vprintf
extern int vprintf (const char *, va_list);
#endif

#if !(defined sprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef sprintf
#define sprintf libintl_sprintf
extern int sprintf (char *, const char *, ...);
#endif
#if !(defined vsprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef vsprintf
#define vsprintf libintl_vsprintf
extern int vsprintf (char *, const char *, va_list);
#endif

#if 1

#if !(defined snprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef snprintf
#define snprintf libintl_snprintf
extern int snprintf (char *, size_t, const char *, ...);
#endif
#if !(defined vsnprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef vsnprintf
#define vsnprintf libintl_vsnprintf
extern int vsnprintf (char *, size_t, const char *, va_list);
#endif

#endif

#if 1

#if !(defined asprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef asprintf
#define asprintf libintl_asprintf
extern int asprintf (char **, const char *, ...);
#endif
#if !(defined vasprintf && defined _GL_STDIO_H) /* don't override gnulib */
#undef vasprintf
#define vasprintf libintl_vasprintf
extern int vasprintf (char **, const char *, va_list);
#endif

#endif

#if 0

#undef fwprintf
#define fwprintf libintl_fwprintf
extern int fwprintf (FILE *, const wchar_t *, ...);
#undef vfwprintf
#define vfwprintf libintl_vfwprintf
extern int vfwprintf (FILE *, const wchar_t *, va_list);

#undef wprintf
#define wprintf libintl_wprintf
extern int wprintf (const wchar_t *, ...);
#undef vwprintf
#define vwprintf libintl_vwprintf
extern int vwprintf (const wchar_t *, va_list);

#undef swprintf
#define swprintf libintl_swprintf
extern int swprintf (wchar_t *, size_t, const wchar_t *, ...);
#undef vswprintf
#define vswprintf libintl_vswprintf
extern int vswprintf (wchar_t *, size_t, const wchar_t *, va_list);

#endif

#endif


/* Support for the locale chosen by the user.  */
#if (defined __APPLE__ && defined __MACH__) || defined _WIN32 || defined __WIN32__ || defined __CYGWIN__

#ifndef GNULIB_defined_setlocale /* don't override gnulib */
#undef setlocale
#define setlocale libintl_setlocale
extern char *setlocale (int, const char *);
#endif

#if 1

#undef newlocale
#define newlocale libintl_newlocale
extern locale_t newlocale (int, const char *, locale_t);

#endif

#endif


/* Support for relocatable packages.  */

/* Sets the original and the current installation prefix of the package.
   Relocation simply replaces a pathname starting with the original prefix
   by the corresponding pathname with the current prefix instead.  Both
   prefixes should be directory names without trailing slash (i.e. use ""
   instead of "/").  */
#define libintl_set_relocation_prefix libintl_set_relocation_prefix
extern void
       libintl_set_relocation_prefix (const char *orig_prefix,
                                      const char *curr_prefix);


#ifdef __cplusplus
}
#endif

#endif /* libintl.h */
