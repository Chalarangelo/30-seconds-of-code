/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2008 Red Hat, Inc.
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
 */

#ifndef __G_SOCKET_CONNECTABLE_H__
#define __G_SOCKET_CONNECTABLE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SOCKET_CONNECTABLE            (g_socket_connectable_get_type ())
#define G_SOCKET_CONNECTABLE(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_SOCKET_CONNECTABLE, GSocketConnectable))
#define G_IS_SOCKET_CONNECTABLE(obj)         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_SOCKET_CONNECTABLE))
#define G_SOCKET_CONNECTABLE_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_SOCKET_CONNECTABLE, GSocketConnectableIface))

/**
 * GSocketConnectable:
 *
 * Interface for objects that contain or generate #GSocketAddresses.
 */
typedef struct _GSocketConnectableIface GSocketConnectableIface;

/**
 * GSocketConnectableIface:
 * @g_iface: The parent interface.
 * @enumerate: Creates a #GSocketAddressEnumerator
 * @proxy_enumerate: Creates a #GProxyAddressEnumerator
 * @to_string: Format the connectable’s address as a string for debugging.
 *    Implementing this is optional. (Since: 2.48)
 *
 * Provides an interface for returning a #GSocketAddressEnumerator
 * and #GProxyAddressEnumerator
 */
struct _GSocketConnectableIface
{
  GTypeInterface g_iface;

  /* Virtual Table */

  GSocketAddressEnumerator * (* enumerate)       (GSocketConnectable *connectable);

  GSocketAddressEnumerator * (* proxy_enumerate) (GSocketConnectable *connectable);

  gchar                    * (* to_string)       (GSocketConnectable *connectable);
};

GLIB_AVAILABLE_IN_ALL
GType                     g_socket_connectable_get_type  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GSocketAddressEnumerator *g_socket_connectable_enumerate (GSocketConnectable *connectable);

GLIB_AVAILABLE_IN_ALL
GSocketAddressEnumerator *g_socket_connectable_proxy_enumerate (GSocketConnectable *connectable);

GLIB_AVAILABLE_IN_2_48
gchar                    *g_socket_connectable_to_string (GSocketConnectable *connectable);

G_END_DECLS


#endif /* __G_SOCKET_CONNECTABLE_H__ */
