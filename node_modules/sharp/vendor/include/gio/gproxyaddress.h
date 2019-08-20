/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Collabora, Ltd.
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
 * Authors: Nicolas Dufresne <nicolas.dufresne@collabora.co.uk>
 */

#ifndef __G_PROXY_ADDRESS_H__
#define __G_PROXY_ADDRESS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/ginetsocketaddress.h>

G_BEGIN_DECLS

#define G_TYPE_PROXY_ADDRESS         (g_proxy_address_get_type ())
#define G_PROXY_ADDRESS(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_PROXY_ADDRESS, GProxyAddress))
#define G_PROXY_ADDRESS_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_PROXY_ADDRESS, GProxyAddressClass))
#define G_IS_PROXY_ADDRESS(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_PROXY_ADDRESS))
#define G_IS_PROXY_ADDRESS_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_PROXY_ADDRESS))
#define G_PROXY_ADDRESS_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_PROXY_ADDRESS, GProxyAddressClass))

typedef struct _GProxyAddressClass   GProxyAddressClass;
typedef struct _GProxyAddressPrivate GProxyAddressPrivate;

struct _GProxyAddress
{
  GInetSocketAddress parent_instance;

  /*< private >*/
  GProxyAddressPrivate *priv;
};

struct _GProxyAddressClass
{
  GInetSocketAddressClass parent_class;
};


GLIB_AVAILABLE_IN_ALL
GType           g_proxy_address_get_type    (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GSocketAddress *g_proxy_address_new         (GInetAddress *inetaddr,
					     guint16       port,
					     const gchar  *protocol,
					     const gchar  *dest_hostname,
		                             guint16       dest_port,
					     const gchar  *username,
					     const gchar  *password);

GLIB_AVAILABLE_IN_ALL
const gchar    *g_proxy_address_get_protocol                (GProxyAddress *proxy);
GLIB_AVAILABLE_IN_2_34
const gchar    *g_proxy_address_get_destination_protocol    (GProxyAddress *proxy);
GLIB_AVAILABLE_IN_ALL
const gchar    *g_proxy_address_get_destination_hostname    (GProxyAddress *proxy);
GLIB_AVAILABLE_IN_ALL
guint16         g_proxy_address_get_destination_port        (GProxyAddress *proxy);
GLIB_AVAILABLE_IN_ALL
const gchar    *g_proxy_address_get_username                (GProxyAddress *proxy);
GLIB_AVAILABLE_IN_ALL
const gchar    *g_proxy_address_get_password                (GProxyAddress *proxy);

GLIB_AVAILABLE_IN_2_34
const gchar    *g_proxy_address_get_uri                     (GProxyAddress *proxy);

G_END_DECLS

#endif /* __G_PROXY_ADDRESS_H__ */
