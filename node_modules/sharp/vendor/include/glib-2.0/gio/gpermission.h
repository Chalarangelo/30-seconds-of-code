/*
 * Copyright © 2010 Codethink Limited
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
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_PERMISSION_H__
#define __G_PERMISSION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_PERMISSION             (g_permission_get_type ())
#define G_PERMISSION(inst)            (G_TYPE_CHECK_INSTANCE_CAST ((inst),   \
                                       G_TYPE_PERMISSION, GPermission))
#define G_PERMISSION_CLASS(class)     (G_TYPE_CHECK_CLASS_CAST ((class),     \
                                       G_TYPE_PERMISSION, GPermissionClass))
#define G_IS_PERMISSION(inst)         (G_TYPE_CHECK_INSTANCE_TYPE ((inst),   \
                                       G_TYPE_PERMISSION))
#define G_IS_PERMISSION_CLASS(class)  (G_TYPE_CHECK_CLASS_TYPE ((class),     \
                                       G_TYPE_PERMISSION))
#define G_PERMISSION_GET_CLASS(inst)  (G_TYPE_INSTANCE_GET_CLASS ((inst),    \
                                       G_TYPE_PERMISSION, GPermissionClass))

typedef struct _GPermissionPrivate    GPermissionPrivate;
typedef struct _GPermissionClass      GPermissionClass;

struct _GPermission
{
  GObject parent_instance;

  /*< private >*/
  GPermissionPrivate *priv;
};

struct _GPermissionClass {
  GObjectClass parent_class;

  gboolean (*acquire)        (GPermission          *permission,
                              GCancellable         *cancellable,
                              GError              **error);
  void     (*acquire_async)  (GPermission          *permission,
                              GCancellable         *cancellable,
                              GAsyncReadyCallback   callback,
                              gpointer              user_data);
  gboolean (*acquire_finish) (GPermission          *permission,
                              GAsyncResult         *result,
                              GError              **error);

  gboolean (*release)        (GPermission          *permission,
                              GCancellable         *cancellable,
                              GError              **error);
  void     (*release_async)  (GPermission          *permission,
                              GCancellable         *cancellable,
                              GAsyncReadyCallback   callback,
                              gpointer              user_data);
  gboolean (*release_finish) (GPermission          *permission,
                              GAsyncResult         *result,
                              GError              **error);

  gpointer reserved[16];
};

GLIB_AVAILABLE_IN_ALL
GType           g_permission_get_type           (void);
GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_acquire            (GPermission          *permission,
                                                 GCancellable         *cancellable,
                                                 GError              **error);
GLIB_AVAILABLE_IN_ALL
void            g_permission_acquire_async      (GPermission          *permission,
                                                 GCancellable         *cancellable,
                                                 GAsyncReadyCallback   callback,
                                                 gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_acquire_finish     (GPermission          *permission,
                                                 GAsyncResult         *result,
                                                 GError              **error);

GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_release            (GPermission          *permission,
                                                 GCancellable         *cancellable,
                                                 GError              **error);
GLIB_AVAILABLE_IN_ALL
void            g_permission_release_async      (GPermission          *permission,
                                                 GCancellable         *cancellable,
                                                 GAsyncReadyCallback   callback,
                                                 gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_release_finish     (GPermission          *permission,
                                                 GAsyncResult         *result,
                                                 GError              **error);

GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_get_allowed        (GPermission   *permission);
GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_get_can_acquire    (GPermission   *permission);
GLIB_AVAILABLE_IN_ALL
gboolean        g_permission_get_can_release    (GPermission   *permission);

GLIB_AVAILABLE_IN_ALL
void            g_permission_impl_update        (GPermission  *permission,
                                                 gboolean      allowed,
                                                 gboolean      can_acquire,
                                                 gboolean      can_release);

G_END_DECLS

#endif /* __G_PERMISSION_H__ */
