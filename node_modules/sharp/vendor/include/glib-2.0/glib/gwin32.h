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

#ifndef __G_WIN32_H__
#define __G_WIN32_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

#ifdef G_PLATFORM_WIN32

G_BEGIN_DECLS

#ifndef MAXPATHLEN
#define MAXPATHLEN 1024
#endif

#ifdef G_OS_WIN32

/*
 * To get prototypes for the following POSIXish functions, you have to
 * include the indicated non-POSIX headers. The functions are defined
 * in OLDNAMES.LIB (MSVC) or -lmoldname-msvc (mingw32). But note that
 * for POSIX functions that take or return file names in the system
 * codepage, in many cases you would want to use the GLib wrappers in
 * gstdio.h and UTF-8 instead.
 *
 * getcwd: <direct.h> (MSVC), <io.h> (mingw32)
 * getpid: <process.h>
 * access: <io.h>
 * unlink: <stdio.h> or <io.h>
 * open, read, write, lseek, close: <io.h>
 * rmdir: <io.h>
 * pipe: <io.h> (actually, _pipe())
 */

/* For some POSIX functions that are not provided by the MS runtime,
 * we provide emulation functions in glib, which are prefixed with
 * g_win32_. Or that was the idea at some time, but there is just one
 * of those:
 */
GLIB_AVAILABLE_IN_ALL
gint		g_win32_ftruncate	(gint		 f,
					 guint		 size);
#endif /* G_OS_WIN32 */

/* The MS setlocale uses locale names of the form "English_United
 * States.1252" etc. We want the Unixish standard form "en", "zh_TW"
 * etc. This function gets the current thread locale from Windows and
 * returns it as a string of the above form for use in forming file
 * names etc. The returned string should be deallocated with g_free().
 */
GLIB_AVAILABLE_IN_ALL
gchar* 		g_win32_getlocale  (void);

/* Translate a Win32 error code (as returned by GetLastError()) into
 * the corresponding message. The returned string should be deallocated
 * with g_free().
 */
GLIB_AVAILABLE_IN_ALL
gchar*          g_win32_error_message (gint error);

GLIB_DEPRECATED
gchar*          g_win32_get_package_installation_directory (const gchar *package,
							    const gchar *dll_name);

GLIB_DEPRECATED
gchar*          g_win32_get_package_installation_subdirectory (const gchar *package,
							       const gchar *dll_name,
							       const gchar *subdir);

GLIB_AVAILABLE_IN_ALL
gchar*          g_win32_get_package_installation_directory_of_module (gpointer hmodule);

GLIB_DEPRECATED_IN_2_44_FOR(g_win32_check_windows_version)
guint		g_win32_get_windows_version (void);

GLIB_AVAILABLE_IN_ALL
gchar*          g_win32_locale_filename_from_utf8 (const gchar *utf8filename);

GLIB_AVAILABLE_IN_2_40
gchar **        g_win32_get_command_line (void);

/* As of GLib 2.14 we only support NT-based Windows */
#define G_WIN32_IS_NT_BASED() TRUE
#define G_WIN32_HAVE_WIDECHAR_API() TRUE

/**
 * GWin32OSType:
 * @G_WIN32_OS_ANY: The running system can be a workstation or a server edition of
 *  Windows.  The type of the running system is therefore not checked.
 * @G_WIN32_OS_WORKSTATION: The running system is a workstation edition of Windows,
 *  such as Windows 7 Professional.
 * @G_WIN32_OS_SERVER: The running system is a server edition of Windows, such as
 *  Windows Server 2008 R2.
 *
 * Type of Windows edition to check for at run-time.
 **/
typedef enum
{
  G_WIN32_OS_ANY,
  G_WIN32_OS_WORKSTATION,
  G_WIN32_OS_SERVER,
} GWin32OSType;

GLIB_AVAILABLE_IN_2_44
gboolean g_win32_check_windows_version (const gint major,
                                        const gint minor,
                                        const gint spver,
                                        const GWin32OSType os_type);

G_END_DECLS

#endif	 /* G_PLATFORM_WIN32 */

#endif /* __G_WIN32_H__ */
