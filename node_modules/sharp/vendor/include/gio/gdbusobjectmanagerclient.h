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

#ifndef __G_DBUS_OBJECT_MANAGER_CLIENT_H__
#define __G_DBUS_OBJECT_MANAGER_CLIENT_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_OBJECT_MANAGER_CLIENT         (g_dbus_object_manager_client_get_type ())
#define G_DBUS_OBJECT_MANAGER_CLIENT(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_OBJECT_MANAGER_CLIENT, GDBusObjectManagerClient))
#define G_DBUS_OBJECT_MANAGER_CLIENT_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_DBUS_OBJECT_MANAGER_CLIENT, GDBusObjectManagerClientClass))
#define G_DBUS_OBJECT_MANAGER_CLIENT_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_DBUS_OBJECT_MANAGER_CLIENT, GDBusObjectManagerClientClass))
#define G_IS_DBUS_OBJECT_MANAGER_CLIENT(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_OBJECT_MANAGER_CLIENT))
#define G_IS_DBUS_OBJECT_MANAGER_CLIENT_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_DBUS_OBJECT_MANAGER_CLIENT))

typedef struct _GDBusObjectManagerClientClass   GDBusObjectManagerClientClass;
typedef struct _GDBusObjectManagerClientPrivate GDBusObjectManagerClientPrivate;

/**
 * GDBusObjectManagerClient:
  *
 * The #GDBusObjectManagerClient structure contains private data and should
 * only be accessed using the provided API.
 *
 * Since: 2.30
 */
struct _GDBusObjectManagerClient
{
  /*< private >*/
  GObject parent_instance;
  GDBusObjectManagerClientPrivate *priv;
};

/**
 * GDBusObjectManagerClientClass:
 * @parent_class: The parent class.
 * @interface_proxy_signal: Signal class handler for the #GDBusObjectManagerClient::interface-proxy-signal signal.
 * @interface_proxy_properties_changed: Signal class handler for the #GDBusObjectManagerClient::interface-proxy-properties-changed signal.
 *
 * Class structure for #GDBusObjectManagerClient.
 *
 * Since: 2.30
 */
struct _GDBusObjectManagerClientClass
{
  GObjectClass parent_class;

  /* signals */
  void    (*interface_proxy_signal)             (GDBusObjectManagerClient *manager,
                                                 GDBusObjectProxy         *object_proxy,
                                                 GDBusProxy               *interface_proxy,
                                                 const gchar              *sender_name,
                                                 const gchar              *signal_name,
                                                 GVariant                 *parameters);

  void    (*interface_proxy_properties_changed) (GDBusObjectManagerClient   *manager,
                                                 GDBusObjectProxy           *object_proxy,
                                                 GDBusProxy                 *interface_proxy,
                                                 GVariant                   *changed_properties,
                                                 const gchar* const         *invalidated_properties);

  /*< private >*/
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                         g_dbus_object_manager_client_get_type           (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
void                          g_dbus_object_manager_client_new                (GDBusConnection               *connection,
                                                                               GDBusObjectManagerClientFlags  flags,
                                                                               const gchar                   *name,
                                                                               const gchar                   *object_path,
                                                                               GDBusProxyTypeFunc             get_proxy_type_func,
                                                                               gpointer                       get_proxy_type_user_data,
                                                                               GDestroyNotify                 get_proxy_type_destroy_notify,
                                                                               GCancellable                  *cancellable,
                                                                               GAsyncReadyCallback            callback,
                                                                               gpointer                       user_data);
GLIB_AVAILABLE_IN_ALL
GDBusObjectManager           *g_dbus_object_manager_client_new_finish         (GAsyncResult                  *res,
                                                                               GError                       **error);
GLIB_AVAILABLE_IN_ALL
GDBusObjectManager           *g_dbus_object_manager_client_new_sync           (GDBusConnection               *connection,
                                                                               GDBusObjectManagerClientFlags  flags,
                                                                               const gchar                   *name,
                                                                               const gchar                   *object_path,
                                                                               GDBusProxyTypeFunc             get_proxy_type_func,
                                                                               gpointer                       get_proxy_type_user_data,
                                                                               GDestroyNotify                 get_proxy_type_destroy_notify,
                                                                               GCancellable                  *cancellable,
                                                                               GError                       **error);
GLIB_AVAILABLE_IN_ALL
void                          g_dbus_object_manager_client_new_for_bus        (GBusType                       bus_type,
                                                                               GDBusObjectManagerClientFlags  flags,
                                                                               const gchar                   *name,
                                                                               const gchar                   *object_path,
                                                                               GDBusProxyTypeFunc             get_proxy_type_func,
                                                                               gpointer                       get_proxy_type_user_data,
                                                                               GDestroyNotify                 get_proxy_type_destroy_notify,
                                                                               GCancellable                  *cancellable,
                                                                               GAsyncReadyCallback            callback,
                                                                               gpointer                       user_data);
GLIB_AVAILABLE_IN_ALL
GDBusObjectManager           *g_dbus_object_manager_client_new_for_bus_finish (GAsyncResult                  *res,
                                                                               GError                       **error);
GLIB_AVAILABLE_IN_ALL
GDBusObjectManager           *g_dbus_object_manager_client_new_for_bus_sync   (GBusType                       bus_type,
                                                                               GDBusObjectManagerClientFlags  flags,
                                                                               const gchar                   *name,
                                                                               const gchar                   *object_path,
                                                                               GDBusProxyTypeFunc             get_proxy_type_func,
                                                                               gpointer                       get_proxy_type_user_data,
                                                                               GDestroyNotify                 get_proxy_type_destroy_notify,
                                                                               GCancellable                  *cancellable,
                                                                               GError                       **error);
GLIB_AVAILABLE_IN_ALL
GDBusConnection              *g_dbus_object_manager_client_get_connection     (GDBusObjectManagerClient      *manager);
GLIB_AVAILABLE_IN_ALL
GDBusObjectManagerClientFlags g_dbus_object_manager_client_get_flags          (GDBusObjectManagerClient      *manager);
GLIB_AVAILABLE_IN_ALL
const gchar                  *g_dbus_object_manager_client_get_name           (GDBusObjectManagerClient      *manager);
GLIB_AVAILABLE_IN_ALL
gchar                        *g_dbus_object_manager_client_get_name_owner     (GDBusObjectManagerClient      *manager);

G_END_DECLS

#endif /* __G_DBUS_OBJECT_MANAGER_CLIENT_H */
