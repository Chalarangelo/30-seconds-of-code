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

#ifndef __G_DBUS_PROXY_H__
#define __G_DBUS_PROXY_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>
#include <gio/gdbusintrospection.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_PROXY         (g_dbus_proxy_get_type ())
#define G_DBUS_PROXY(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_PROXY, GDBusProxy))
#define G_DBUS_PROXY_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_DBUS_PROXY, GDBusProxyClass))
#define G_DBUS_PROXY_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_DBUS_PROXY, GDBusProxyClass))
#define G_IS_DBUS_PROXY(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_PROXY))
#define G_IS_DBUS_PROXY_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_DBUS_PROXY))

typedef struct _GDBusProxyClass   GDBusProxyClass;
typedef struct _GDBusProxyPrivate GDBusProxyPrivate;

/**
 * GDBusProxy:
 *
 * The #GDBusProxy structure contains only private data and
 * should only be accessed using the provided API.
 *
 * Since: 2.26
 */
struct _GDBusProxy
{
  /*< private >*/
  GObject parent_instance;
  GDBusProxyPrivate *priv;
};

/**
 * GDBusProxyClass:
 * @g_properties_changed: Signal class handler for the #GDBusProxy::g-properties-changed signal.
 * @g_signal: Signal class handler for the #GDBusProxy::g-signal signal.
 *
 * Class structure for #GDBusProxy.
 *
 * Since: 2.26
 */
struct _GDBusProxyClass
{
  /*< private >*/
  GObjectClass parent_class;

  /*< public >*/
  /* Signals */
  void (*g_properties_changed) (GDBusProxy          *proxy,
                                GVariant            *changed_properties,
                                const gchar* const  *invalidated_properties);
  void (*g_signal)             (GDBusProxy          *proxy,
                                const gchar         *sender_name,
                                const gchar         *signal_name,
                                GVariant            *parameters);

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[32];
};

GLIB_AVAILABLE_IN_ALL
GType            g_dbus_proxy_get_type                  (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_new                       (GDBusConnection     *connection,
                                                         GDBusProxyFlags      flags,
                                                         GDBusInterfaceInfo *info,
                                                         const gchar         *name,
                                                         const gchar         *object_path,
                                                         const gchar         *interface_name,
                                                         GCancellable        *cancellable,
                                                         GAsyncReadyCallback  callback,
                                                         gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
GDBusProxy      *g_dbus_proxy_new_finish                (GAsyncResult        *res,
                                                         GError             **error);
GLIB_AVAILABLE_IN_ALL
GDBusProxy      *g_dbus_proxy_new_sync                  (GDBusConnection     *connection,
                                                         GDBusProxyFlags      flags,
                                                         GDBusInterfaceInfo *info,
                                                         const gchar         *name,
                                                         const gchar         *object_path,
                                                         const gchar         *interface_name,
                                                         GCancellable        *cancellable,
                                                         GError             **error);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_new_for_bus               (GBusType             bus_type,
                                                         GDBusProxyFlags      flags,
                                                         GDBusInterfaceInfo *info,
                                                         const gchar         *name,
                                                         const gchar         *object_path,
                                                         const gchar         *interface_name,
                                                         GCancellable        *cancellable,
                                                         GAsyncReadyCallback  callback,
                                                         gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
GDBusProxy      *g_dbus_proxy_new_for_bus_finish        (GAsyncResult        *res,
                                                         GError             **error);
GLIB_AVAILABLE_IN_ALL
GDBusProxy      *g_dbus_proxy_new_for_bus_sync          (GBusType             bus_type,
                                                         GDBusProxyFlags      flags,
                                                         GDBusInterfaceInfo *info,
                                                         const gchar         *name,
                                                         const gchar         *object_path,
                                                         const gchar         *interface_name,
                                                         GCancellable        *cancellable,
                                                         GError             **error);
GLIB_AVAILABLE_IN_ALL
GDBusConnection *g_dbus_proxy_get_connection            (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
GDBusProxyFlags  g_dbus_proxy_get_flags                 (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_proxy_get_name                  (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
gchar           *g_dbus_proxy_get_name_owner            (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_proxy_get_object_path           (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_proxy_get_interface_name        (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
gint             g_dbus_proxy_get_default_timeout       (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_set_default_timeout       (GDBusProxy          *proxy,
                                                         gint                 timeout_msec);
GLIB_AVAILABLE_IN_ALL
GDBusInterfaceInfo *g_dbus_proxy_get_interface_info     (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_set_interface_info        (GDBusProxy           *proxy,
                                                         GDBusInterfaceInfo   *info);
GLIB_AVAILABLE_IN_ALL
GVariant        *g_dbus_proxy_get_cached_property       (GDBusProxy          *proxy,
                                                         const gchar         *property_name);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_set_cached_property       (GDBusProxy          *proxy,
                                                         const gchar         *property_name,
                                                         GVariant            *value);
GLIB_AVAILABLE_IN_ALL
gchar          **g_dbus_proxy_get_cached_property_names (GDBusProxy          *proxy);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_call                      (GDBusProxy          *proxy,
                                                         const gchar         *method_name,
                                                         GVariant            *parameters,
                                                         GDBusCallFlags       flags,
                                                         gint                 timeout_msec,
                                                         GCancellable        *cancellable,
                                                         GAsyncReadyCallback  callback,
                                                         gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
GVariant        *g_dbus_proxy_call_finish               (GDBusProxy          *proxy,
                                                         GAsyncResult        *res,
                                                         GError             **error);
GLIB_AVAILABLE_IN_ALL
GVariant        *g_dbus_proxy_call_sync                 (GDBusProxy          *proxy,
                                                         const gchar         *method_name,
                                                         GVariant            *parameters,
                                                         GDBusCallFlags       flags,
                                                         gint                 timeout_msec,
                                                         GCancellable        *cancellable,
                                                         GError             **error);

GLIB_AVAILABLE_IN_ALL
void             g_dbus_proxy_call_with_unix_fd_list        (GDBusProxy          *proxy,
                                                             const gchar         *method_name,
                                                             GVariant            *parameters,
                                                             GDBusCallFlags       flags,
                                                             gint                 timeout_msec,
                                                             GUnixFDList         *fd_list,
                                                             GCancellable        *cancellable,
                                                             GAsyncReadyCallback  callback,
                                                             gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
GVariant        *g_dbus_proxy_call_with_unix_fd_list_finish (GDBusProxy          *proxy,
                                                             GUnixFDList        **out_fd_list,
                                                             GAsyncResult        *res,
                                                             GError             **error);
GLIB_AVAILABLE_IN_ALL
GVariant        *g_dbus_proxy_call_with_unix_fd_list_sync   (GDBusProxy          *proxy,
                                                             const gchar         *method_name,
                                                             GVariant            *parameters,
                                                             GDBusCallFlags       flags,
                                                             gint                 timeout_msec,
                                                             GUnixFDList         *fd_list,
                                                             GUnixFDList        **out_fd_list,
                                                             GCancellable        *cancellable,
                                                             GError             **error);

G_END_DECLS

#endif /* __G_DBUS_PROXY_H__ */
