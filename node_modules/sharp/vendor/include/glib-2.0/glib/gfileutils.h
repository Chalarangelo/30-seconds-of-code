/* gfileutils.h - File utility functions
 *
 *  Copyright 2000 Red Hat, Inc.
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
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef __G_FILEUTILS_H__
#define __G_FILEUTILS_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glibconfig.h>
#include <glib/gerror.h>

G_BEGIN_DECLS

#define G_FILE_ERROR g_file_error_quark ()

typedef enum
{
  G_FILE_ERROR_EXIST,
  G_FILE_ERROR_ISDIR,
  G_FILE_ERROR_ACCES,
  G_FILE_ERROR_NAMETOOLONG,
  G_FILE_ERROR_NOENT,
  G_FILE_ERROR_NOTDIR,
  G_FILE_ERROR_NXIO,
  G_FILE_ERROR_NODEV,
  G_FILE_ERROR_ROFS,
  G_FILE_ERROR_TXTBSY,
  G_FILE_ERROR_FAULT,
  G_FILE_ERROR_LOOP,
  G_FILE_ERROR_NOSPC,
  G_FILE_ERROR_NOMEM,
  G_FILE_ERROR_MFILE,
  G_FILE_ERROR_NFILE,
  G_FILE_ERROR_BADF,
  G_FILE_ERROR_INVAL,
  G_FILE_ERROR_PIPE,
  G_FILE_ERROR_AGAIN,
  G_FILE_ERROR_INTR,
  G_FILE_ERROR_IO,
  G_FILE_ERROR_PERM,
  G_FILE_ERROR_NOSYS,
  G_FILE_ERROR_FAILED
} GFileError;

/* For backward-compat reasons, these are synced to an old
 * anonymous enum in libgnome. But don't use that enum
 * in new code.
 */
typedef enum
{
  G_FILE_TEST_IS_REGULAR    = 1 << 0,
  G_FILE_TEST_IS_SYMLINK    = 1 << 1,
  G_FILE_TEST_IS_DIR        = 1 << 2,
  G_FILE_TEST_IS_EXECUTABLE = 1 << 3,
  G_FILE_TEST_EXISTS        = 1 << 4
} GFileTest;

GLIB_AVAILABLE_IN_ALL
GQuark     g_file_error_quark      (void);
/* So other code can generate a GFileError */
GLIB_AVAILABLE_IN_ALL
GFileError g_file_error_from_errno (gint err_no);

GLIB_AVAILABLE_IN_ALL
gboolean g_file_test         (const gchar  *filename,
                              GFileTest     test);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_get_contents (const gchar  *filename,
                              gchar       **contents,
                              gsize        *length,
                              GError      **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_set_contents (const gchar *filename,
                              const gchar *contents,
                              gssize         length,
                              GError       **error);
GLIB_AVAILABLE_IN_ALL
gchar   *g_file_read_link    (const gchar  *filename,
                              GError      **error);

/* Wrapper / workalike for mkdtemp() */
GLIB_AVAILABLE_IN_2_30
gchar   *g_mkdtemp            (gchar        *tmpl);
GLIB_AVAILABLE_IN_2_30
gchar   *g_mkdtemp_full       (gchar        *tmpl,
                               gint          mode);

/* Wrapper / workalike for mkstemp() */
GLIB_AVAILABLE_IN_ALL
gint     g_mkstemp            (gchar        *tmpl);
GLIB_AVAILABLE_IN_ALL
gint     g_mkstemp_full       (gchar        *tmpl,
                               gint          flags,
                               gint          mode);

/* Wrappers for g_mkstemp and g_mkdtemp() */
GLIB_AVAILABLE_IN_ALL
gint     g_file_open_tmp      (const gchar  *tmpl,
                               gchar       **name_used,
                               GError      **error);
GLIB_AVAILABLE_IN_2_30
gchar   *g_dir_make_tmp       (const gchar  *tmpl,
                               GError      **error);

GLIB_AVAILABLE_IN_ALL
gchar   *g_build_path         (const gchar *separator,
                               const gchar *first_element,
                               ...) G_GNUC_MALLOC G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_ALL
gchar   *g_build_pathv        (const gchar  *separator,
                               gchar       **args) G_GNUC_MALLOC;

GLIB_AVAILABLE_IN_ALL
gchar   *g_build_filename     (const gchar *first_element,
                               ...) G_GNUC_MALLOC G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_ALL
gchar   *g_build_filenamev    (gchar      **args) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_2_56
gchar   *g_build_filename_valist (const gchar  *first_element,
                                  va_list      *args) G_GNUC_MALLOC;

GLIB_AVAILABLE_IN_ALL
gint     g_mkdir_with_parents (const gchar *pathname,
                               gint         mode);

#ifdef G_OS_WIN32

/* On Win32, the canonical directory separator is the backslash, and
 * the search path separator is the semicolon. Note that also the
 * (forward) slash works as directory separator.
 */
#define G_IS_DIR_SEPARATOR(c) ((c) == G_DIR_SEPARATOR || (c) == '/')

#else  /* !G_OS_WIN32 */

#define G_IS_DIR_SEPARATOR(c) ((c) == G_DIR_SEPARATOR)

#endif /* !G_OS_WIN32 */

GLIB_AVAILABLE_IN_ALL
gboolean     g_path_is_absolute (const gchar *file_name);
GLIB_AVAILABLE_IN_ALL
const gchar *g_path_skip_root   (const gchar *file_name);

GLIB_DEPRECATED_FOR(g_path_get_basename)
const gchar *g_basename         (const gchar *file_name);
#ifndef G_DISABLE_DEPRECATED
#define g_dirname g_path_get_dirname
#endif

GLIB_AVAILABLE_IN_ALL
gchar *g_get_current_dir   (void);
GLIB_AVAILABLE_IN_ALL
gchar *g_path_get_basename (const gchar *file_name) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
gchar *g_path_get_dirname  (const gchar *file_name) G_GNUC_MALLOC;

GLIB_AVAILABLE_IN_2_58
gchar *g_canonicalize_filename (const gchar *filename,
                                const gchar *relative_to) G_GNUC_MALLOC;

G_END_DECLS

#endif /* __G_FILEUTILS_H__ */
