/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_VFS_H__
#define __G_VFS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_VFS         (g_vfs_get_type ())
#define G_VFS(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_VFS, GVfs))
#define G_VFS_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_VFS, GVfsClass))
#define G_VFS_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_VFS, GVfsClass))
#define G_IS_VFS(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_VFS))
#define G_IS_VFS_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_VFS))

/**
 * GVfsFileLookupFunc:
 * @vfs: a #GVfs
 * @identifier: the identifier to lookup a #GFile for. This can either
 *     be an URI or a parse name as returned by g_file_get_parse_name()
 * @user_data: user data passed to the function
 *
 * This function type is used by g_vfs_register_uri_scheme() to make it
 * possible for a client to associate an URI scheme to a different #GFile
 * implementation.
 *
 * The client should return a reference to the new file that has been
 * created for @uri, or %NULL to continue with the default implementation.
 *
 * Returns: (transfer full): a #GFile for @identifier.
 *
 * Since: 2.50
 */
typedef GFile * (* GVfsFileLookupFunc) (GVfs       *vfs,
                                        const char *identifier,
                                        gpointer    user_data);

/**
 * G_VFS_EXTENSION_POINT_NAME:
 *
 * Extension point for #GVfs functionality.
 * See [Extending GIO][extending-gio].
 */
#define G_VFS_EXTENSION_POINT_NAME "gio-vfs"

/**
 * GVfs:
 *
 * Virtual File System object.
 **/
typedef struct _GVfsClass    GVfsClass;

struct _GVfs
{
  GObject parent_instance;
};

struct _GVfsClass
{
  GObjectClass parent_class;

  /* Virtual Table */

  gboolean              (* is_active)                 (GVfs       *vfs);
  GFile               * (* get_file_for_path)         (GVfs       *vfs,
                                                       const char *path);
  GFile               * (* get_file_for_uri)          (GVfs       *vfs,
                                                       const char *uri);
  const gchar * const * (* get_supported_uri_schemes) (GVfs       *vfs);
  GFile               * (* parse_name)                (GVfs       *vfs,
                                                       const char *parse_name);

  /*< private >*/
  void                  (* local_file_add_info)       (GVfs       *vfs,
						       const char *filename,
						       guint64     device,
						       GFileAttributeMatcher *attribute_matcher,
						       GFileInfo  *info,
						       GCancellable *cancellable,
						       gpointer   *extra_data,
						       GDestroyNotify *free_extra_data);
  void                  (* add_writable_namespaces)   (GVfs       *vfs,
						       GFileAttributeInfoList *list);
  gboolean              (* local_file_set_attributes) (GVfs       *vfs,
						       const char *filename,
						       GFileInfo  *info,
                                                       GFileQueryInfoFlags flags,
                                                       GCancellable *cancellable,
						       GError    **error);
  void                  (* local_file_removed)        (GVfs       *vfs,
						       const char *filename);
  void                  (* local_file_moved)          (GVfs       *vfs,
						       const char *source,
						       const char *dest);
  GIcon *               (* deserialize_icon)          (GVfs       *vfs,
                                                       GVariant   *value);
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
};

GLIB_AVAILABLE_IN_ALL
GType                 g_vfs_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
gboolean              g_vfs_is_active                 (GVfs       *vfs);
GLIB_AVAILABLE_IN_ALL
GFile *               g_vfs_get_file_for_path         (GVfs       *vfs,
                                                       const char *path);
GLIB_AVAILABLE_IN_ALL
GFile *               g_vfs_get_file_for_uri          (GVfs       *vfs,
                                                       const char *uri);
GLIB_AVAILABLE_IN_ALL
const gchar* const * g_vfs_get_supported_uri_schemes  (GVfs       *vfs);

GLIB_AVAILABLE_IN_ALL
GFile *               g_vfs_parse_name                (GVfs       *vfs,
                                                       const char *parse_name);

GLIB_AVAILABLE_IN_ALL
GVfs *                g_vfs_get_default               (void);
GLIB_AVAILABLE_IN_ALL
GVfs *                g_vfs_get_local                 (void);

GLIB_AVAILABLE_IN_2_50
gboolean              g_vfs_register_uri_scheme       (GVfs               *vfs,
                                                       const char         *scheme,
                                                       GVfsFileLookupFunc  uri_func,
                                                       gpointer            uri_data,
                                                       GDestroyNotify      uri_destroy,
                                                       GVfsFileLookupFunc  parse_name_func,
                                                       gpointer            parse_name_data,
                                                       GDestroyNotify      parse_name_destroy);
GLIB_AVAILABLE_IN_2_50
gboolean              g_vfs_unregister_uri_scheme     (GVfs               *vfs,
                                                       const char         *scheme);


G_END_DECLS

#endif /* __G_VFS_H__ */
