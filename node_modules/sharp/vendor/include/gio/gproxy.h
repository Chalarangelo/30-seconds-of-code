/* -*- mode: C; c-file-style: "gnu"; indent-tabs-mode: nil; -*- */

/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Collabora Ltd.
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
 * Author: Nicolas Dufresne <nicolas.dufresne@collabora.co.uk>
 */

#ifndef __G_PROXY_H__
#define __G_PROXY_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_PROXY		(g_proxy_get_type ())
#define G_PROXY(o)		(G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_PROXY, GProxy))
#define G_IS_PROXY(o)		(G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_PROXY))
#define G_PROXY_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_PROXY, GProxyInterface))

/**
 * G_PROXY_EXTENSION_POINT_NAME:
 *
 * Extension point for proxy functionality.
 * See [Extending GIO][extending-gio].
 *
 * Since: 2.26
 */
#define G_PROXY_EXTENSION_POINT_NAME "gio-proxy"

/**
 * GProxy:
 *
 * Interface that handles proxy connection and payload.
 *
 * Since: 2.26
 */
typedef struct _GProxyInterface GProxyInterface;

/**
 * GProxyInterface:
 * @g_iface: The parent interface.
 * @connect: Connect to proxy server and wrap (if required) the #connection
 *           to handle payload.
 * @connect_async: Same as connect() but asynchronous.
 * @connect_finish: Returns the result of connect_async()
 * @supports_hostname: Returns whether the proxy supports hostname lookups.
 *
 * Provides an interface for handling proxy connection and payload.
 *
 * Since: 2.26
 */
struct _GProxyInterface
{
  GTypeInterface g_iface;

  /* Virtual Table */

  GIOStream * (* connect)           (GProxy               *proxy,
				     GIOStream            *connection,
				     GProxyAddress        *proxy_address,
				     GCancellable         *cancellable,
				     GError              **error);

  void        (* connect_async)     (GProxy               *proxy,
				     GIOStream            *connection,
				     GProxyAddress	  *proxy_address,
				     GCancellable         *cancellable,
				     GAsyncReadyCallback   callback,
				     gpointer              user_data);

  GIOStream * (* connect_finish)    (GProxy               *proxy,
				     GAsyncResult         *result,
				     GError              **error);

  gboolean    (* supports_hostname) (GProxy             *proxy);
};

GLIB_AVAILABLE_IN_ALL
GType      g_proxy_get_type                 (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GProxy    *g_proxy_get_default_for_protocol (const gchar *protocol);

GLIB_AVAILABLE_IN_ALL
GIOStream *g_proxy_connect           (GProxy               *proxy,
				      GIOStream            *connection,
				      GProxyAddress        *proxy_address,
				      GCancellable         *cancellable,
				      GError              **error);

GLIB_AVAILABLE_IN_ALL
void       g_proxy_connect_async     (GProxy               *proxy,
				      GIOStream            *connection,
				      GProxyAddress        *proxy_address,
				      GCancellable         *cancellable,
				      GAsyncReadyCallback   callback,
				      gpointer              user_data);

GLIB_AVAILABLE_IN_ALL
GIOStream *g_proxy_connect_finish    (GProxy               *proxy,
				      GAsyncResult         *result,
				      GError              **error);

GLIB_AVAILABLE_IN_ALL
gboolean   g_proxy_supports_hostname (GProxy               *proxy);

G_END_DECLS

#endif /* __G_PROXY_H__ */
