/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Red Hat, Inc.
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

#ifndef __G_TLS_SERVER_CONNECTION_H__
#define __G_TLS_SERVER_CONNECTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gtlsconnection.h>

G_BEGIN_DECLS

#define G_TYPE_TLS_SERVER_CONNECTION                (g_tls_server_connection_get_type ())
#define G_TLS_SERVER_CONNECTION(inst)               (G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_TLS_SERVER_CONNECTION, GTlsServerConnection))
#define G_IS_TLS_SERVER_CONNECTION(inst)            (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_TLS_SERVER_CONNECTION))
#define G_TLS_SERVER_CONNECTION_GET_INTERFACE(inst) (G_TYPE_INSTANCE_GET_INTERFACE ((inst), G_TYPE_TLS_SERVER_CONNECTION, GTlsServerConnectionInterface))

/**
 * GTlsServerConnection:
 *
 * TLS server-side connection. This is the server-side implementation
 * of a #GTlsConnection.
 *
 * Since: 2.28
 */
typedef struct _GTlsServerConnectionInterface GTlsServerConnectionInterface;

/**
 * GTlsServerConnectionInterface:
 * @g_iface: The parent interface.
 *
 * vtable for a #GTlsServerConnection implementation.
 *
 * Since: 2.26
 */
struct _GTlsServerConnectionInterface
{
  GTypeInterface g_iface;

};

GLIB_AVAILABLE_IN_ALL
GType                 g_tls_server_connection_get_type                 (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GIOStream *           g_tls_server_connection_new                      (GIOStream        *base_io_stream,
									GTlsCertificate  *certificate,
									GError          **error);

G_END_DECLS

#endif /* __G_TLS_SERVER_CONNECTION_H__ */
