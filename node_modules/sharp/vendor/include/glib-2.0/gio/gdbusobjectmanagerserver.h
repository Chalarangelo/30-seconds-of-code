/* GDBus - GLib D-Bus Library
 *
 * Copyright (C) 2008-2010 Red Hat, Inc.
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
 * Author: David Zeuthen <davidz@redhat.com>
 */

#ifndef __G_DBUS_OBJECT_MANAGER_SERVER_H__
#define __G_DBUS_OBJECT_MANAGER_SERVER_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_OBJECT_MANAGER_SERVER         (g_dbus_object_manager_server_get_type ())
#define G_DBUS_OBJECT_MANAGER_SERVER(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_OBJECT_MANAGER_SERVER, GDBusObjectManagerServer))
#define G_DBUS_OBJECT_MANAGER_SERVER_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_DBUS_OBJECT_MANAGER_SERVER, GDBusObjectManagerServerClass))
#define G_DBUS_OBJECT_MANAGER_SERVER_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_DBUS_OBJECT_MANAGER_SERVER, GDBusObjectManagerServerClass))
#define G_IS_DBUS_OBJECT_MANAGER_SERVER(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_OBJECT_MANAGER_SERVER))
#define G_IS_DBUS_OBJECT_MANAGER_SERVER_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_DBUS_OBJECT_MANAGER_SERVER))

typedef struct _GDBusObjectManagerServerClass   GDBusObjectManagerServerClass;
typedef struct _GDBusObjectManagerServerPrivate GDBusObjectManagerServerPrivate;

/**
 * GDBusObjectManagerServer:
 *
 * The #GDBusObjectManagerServer structure contains private data and should
 * only be accessed using the provided API.
 *
 * Since: 2.30
 */
struct _GDBusObjectManagerServer
{
  /*< private >*/
  GObject parent_instance;
  GDBusObjectManagerServerPrivate *priv;
};

/**
 * GDBusObjectManagerServerClass:
 * @parent_class: The parent class.
 *
 * Class structure for #GDBusObjectManagerServer.
 *
 * Since: 2.30
 */
struct _GDBusObjectManagerServerClass
{
  GObjectClass parent_class;

  /*< private >*/
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                     g_dbus_object_manager_server_get_type            (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GDBusObjectManagerServer *g_dbus_object_manager_server_new                 (const gchar               *object_path);
GLIB_AVAILABLE_IN_ALL
GDBusConnection          *g_dbus_object_manager_server_get_connection      (GDBusObjectManagerServer  *manager);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_object_manager_server_set_connection      (GDBusObjectManagerServer  *manager,
                                                                            GDBusConnection           *connection);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_object_manager_server_export              (GDBusObjectManagerServer  *manager,
                                                                            GDBusObjectSkeleton       *object);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_object_manager_server_export_uniquely     (GDBusObjectManagerServer  *manager,
                                                                            GDBusObjectSkeleton       *object);
GLIB_AVAILABLE_IN_ALL
gboolean                  g_dbus_object_manager_server_is_exported         (GDBusObjectManagerServer  *manager,
                                                                            GDBusObjectSkeleton       *object);
GLIB_AVAILABLE_IN_ALL
gboolean                  g_dbus_object_manager_server_unexport            (GDBusObjectManagerServer  *manager,
                                                                            const gchar               *object_path);

G_END_DECLS

#endif /* __G_DBUS_OBJECT_MANAGER_SERVER_H */
