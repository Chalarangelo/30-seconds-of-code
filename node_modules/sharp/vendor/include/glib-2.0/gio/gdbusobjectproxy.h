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

#ifndef __G_DBUS_OBJECT_PROXY_H__
#define __G_DBUS_OBJECT_PROXY_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_OBJECT_PROXY         (g_dbus_object_proxy_get_type ())
#define G_DBUS_OBJECT_PROXY(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_OBJECT_PROXY, GDBusObjectProxy))
#define G_DBUS_OBJECT_PROXY_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_DBUS_OBJECT_PROXY, GDBusObjectProxyClass))
#define G_DBUS_OBJECT_PROXY_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_DBUS_OBJECT_PROXY, GDBusObjectProxyClass))
#define G_IS_DBUS_OBJECT_PROXY(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_OBJECT_PROXY))
#define G_IS_DBUS_OBJECT_PROXY_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_DBUS_OBJECT_PROXY))

typedef struct _GDBusObjectProxyClass   GDBusObjectProxyClass;
typedef struct _GDBusObjectProxyPrivate GDBusObjectProxyPrivate;

/**
 * GDBusObjectProxy:
 *
 * The #GDBusObjectProxy structure contains private data and should
 * only be accessed using the provided API.
 *
 * Since: 2.30
 */
struct _GDBusObjectProxy
{
  /*< private >*/
  GObject parent_instance;
  GDBusObjectProxyPrivate *priv;
};

/**
 * GDBusObjectProxyClass:
 * @parent_class: The parent class.
 *
 * Class structure for #GDBusObjectProxy.
 *
 * Since: 2.30
 */
struct _GDBusObjectProxyClass
{
  GObjectClass parent_class;

  /*< private >*/
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType             g_dbus_object_proxy_get_type       (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GDBusObjectProxy *g_dbus_object_proxy_new            (GDBusConnection   *connection,
                                                      const gchar       *object_path);
GLIB_AVAILABLE_IN_ALL
GDBusConnection  *g_dbus_object_proxy_get_connection (GDBusObjectProxy  *proxy);

G_END_DECLS

#endif /* __G_DBUS_OBJECT_PROXY_H */
