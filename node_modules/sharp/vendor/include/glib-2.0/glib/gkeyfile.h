/* gkeyfile.h - desktop entry file parser
 *
 *  Copyright 2004 Red Hat, Inc.
 *
 *  Ray Strode <halfline@hawaii.rr.com>
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

#ifndef __G_KEY_FILE_H__
#define __G_KEY_FILE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gbytes.h>
#include <glib/gerror.h>

G_BEGIN_DECLS

typedef enum
{
  G_KEY_FILE_ERROR_UNKNOWN_ENCODING,
  G_KEY_FILE_ERROR_PARSE,
  G_KEY_FILE_ERROR_NOT_FOUND,
  G_KEY_FILE_ERROR_KEY_NOT_FOUND,
  G_KEY_FILE_ERROR_GROUP_NOT_FOUND,
  G_KEY_FILE_ERROR_INVALID_VALUE
} GKeyFileError;

#define G_KEY_FILE_ERROR g_key_file_error_quark()

GLIB_AVAILABLE_IN_ALL
GQuark g_key_file_error_quark (void);

typedef struct _GKeyFile GKeyFile;

typedef enum
{
  G_KEY_FILE_NONE              = 0,
  G_KEY_FILE_KEEP_COMMENTS     = 1 << 0,
  G_KEY_FILE_KEEP_TRANSLATIONS = 1 << 1
} GKeyFileFlags;

GLIB_AVAILABLE_IN_ALL
GKeyFile *g_key_file_new                    (void);
GLIB_AVAILABLE_IN_ALL
GKeyFile *g_key_file_ref                    (GKeyFile             *key_file);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_unref                  (GKeyFile             *key_file);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_free                   (GKeyFile             *key_file);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_list_separator     (GKeyFile             *key_file,
					     gchar                 separator);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_load_from_file         (GKeyFile             *key_file,
					     const gchar          *file,
					     GKeyFileFlags         flags,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_load_from_data         (GKeyFile             *key_file,
					     const gchar          *data,
					     gsize                 length,
					     GKeyFileFlags         flags,
					     GError              **error);
GLIB_AVAILABLE_IN_2_50
gboolean  g_key_file_load_from_bytes        (GKeyFile             *key_file,
                                             GBytes               *bytes,
                                             GKeyFileFlags         flags,
                                             GError              **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_key_file_load_from_dirs          (GKeyFile             *key_file,
					     const gchar	  *file,
					     const gchar	 **search_dirs,
					     gchar		 **full_path,
					     GKeyFileFlags         flags,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_key_file_load_from_data_dirs     (GKeyFile             *key_file,
					     const gchar          *file,
					     gchar               **full_path,
					     GKeyFileFlags         flags,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gchar    *g_key_file_to_data                (GKeyFile             *key_file,
					     gsize                *length,
					     GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_2_40
gboolean  g_key_file_save_to_file           (GKeyFile             *key_file,
                                             const gchar          *filename,
                                             GError              **error);
GLIB_AVAILABLE_IN_ALL
gchar    *g_key_file_get_start_group        (GKeyFile             *key_file) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
gchar   **g_key_file_get_groups             (GKeyFile             *key_file,
					     gsize                *length);
GLIB_AVAILABLE_IN_ALL
gchar   **g_key_file_get_keys               (GKeyFile             *key_file,
					     const gchar          *group_name,
					     gsize                *length,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_has_group              (GKeyFile             *key_file,
					     const gchar          *group_name);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_has_key                (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gchar    *g_key_file_get_value              (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_value              (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar          *value);
GLIB_AVAILABLE_IN_ALL
gchar    *g_key_file_get_string             (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_string             (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar          *string);
GLIB_AVAILABLE_IN_ALL
gchar    *g_key_file_get_locale_string      (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar          *locale,
					     GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_2_56
gchar    *g_key_file_get_locale_for_key     (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             const gchar          *locale) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_locale_string      (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar          *locale,
					     const gchar          *string);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_get_boolean            (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_boolean            (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gboolean              value);
GLIB_AVAILABLE_IN_ALL
gint      g_key_file_get_integer            (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_integer            (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gint                  value);
GLIB_AVAILABLE_IN_ALL
gint64    g_key_file_get_int64              (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_int64              (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gint64                value);
GLIB_AVAILABLE_IN_ALL
guint64   g_key_file_get_uint64             (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_uint64             (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     guint64               value);
GLIB_AVAILABLE_IN_ALL
gdouble   g_key_file_get_double             (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_double             (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             gdouble               value);
GLIB_AVAILABLE_IN_ALL
gchar   **g_key_file_get_string_list        (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gsize                *length,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_string_list        (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar * const   list[],
					     gsize                 length);
GLIB_AVAILABLE_IN_ALL
gchar   **g_key_file_get_locale_string_list (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar          *locale,
					     gsize                *length,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_locale_string_list (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     const gchar          *locale,
					     const gchar * const   list[],
					     gsize                 length);
GLIB_AVAILABLE_IN_ALL
gboolean *g_key_file_get_boolean_list       (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gsize                *length,
					     GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_boolean_list       (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gboolean              list[],
					     gsize                 length);
GLIB_AVAILABLE_IN_ALL
gint     *g_key_file_get_integer_list       (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gsize                *length,
					     GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_double_list        (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             gdouble               list[],
                                             gsize                 length);
GLIB_AVAILABLE_IN_ALL
gdouble  *g_key_file_get_double_list        (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             gsize                *length,
                                             GError              **error) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
void      g_key_file_set_integer_list       (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     gint                  list[],
					     gsize                 length);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_set_comment            (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             const gchar          *comment,
                                             GError              **error);
GLIB_AVAILABLE_IN_ALL
gchar    *g_key_file_get_comment            (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
                                             GError              **error) G_GNUC_MALLOC;

GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_remove_comment         (GKeyFile             *key_file,
                                             const gchar          *group_name,
                                             const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_remove_key             (GKeyFile             *key_file,
					     const gchar          *group_name,
					     const gchar          *key,
					     GError              **error);
GLIB_AVAILABLE_IN_ALL
gboolean  g_key_file_remove_group           (GKeyFile             *key_file,
					     const gchar          *group_name,
					     GError              **error);

/* Defines for handling freedesktop.org Desktop files */
#define G_KEY_FILE_DESKTOP_GROUP                "Desktop Entry"

#define G_KEY_FILE_DESKTOP_KEY_TYPE             "Type"
#define G_KEY_FILE_DESKTOP_KEY_VERSION          "Version"
#define G_KEY_FILE_DESKTOP_KEY_NAME             "Name"
#define G_KEY_FILE_DESKTOP_KEY_GENERIC_NAME     "GenericName"
#define G_KEY_FILE_DESKTOP_KEY_NO_DISPLAY       "NoDisplay"
#define G_KEY_FILE_DESKTOP_KEY_COMMENT          "Comment"
#define G_KEY_FILE_DESKTOP_KEY_ICON             "Icon"
#define G_KEY_FILE_DESKTOP_KEY_HIDDEN           "Hidden"
#define G_KEY_FILE_DESKTOP_KEY_ONLY_SHOW_IN     "OnlyShowIn"
#define G_KEY_FILE_DESKTOP_KEY_NOT_SHOW_IN      "NotShowIn"
#define G_KEY_FILE_DESKTOP_KEY_TRY_EXEC         "TryExec"
#define G_KEY_FILE_DESKTOP_KEY_EXEC             "Exec"
#define G_KEY_FILE_DESKTOP_KEY_PATH             "Path"
#define G_KEY_FILE_DESKTOP_KEY_TERMINAL         "Terminal"
#define G_KEY_FILE_DESKTOP_KEY_MIME_TYPE        "MimeType"
#define G_KEY_FILE_DESKTOP_KEY_CATEGORIES       "Categories"
#define G_KEY_FILE_DESKTOP_KEY_STARTUP_NOTIFY   "StartupNotify"
#define G_KEY_FILE_DESKTOP_KEY_STARTUP_WM_CLASS "StartupWMClass"
#define G_KEY_FILE_DESKTOP_KEY_URL              "URL"
#define G_KEY_FILE_DESKTOP_KEY_DBUS_ACTIVATABLE "DBusActivatable"
#define G_KEY_FILE_DESKTOP_KEY_ACTIONS          "Actions"

#define G_KEY_FILE_DESKTOP_TYPE_APPLICATION     "Application"
#define G_KEY_FILE_DESKTOP_TYPE_LINK            "Link"
#define G_KEY_FILE_DESKTOP_TYPE_DIRECTORY       "Directory"

G_END_DECLS

#endif /* __G_KEY_FILE_H__ */
