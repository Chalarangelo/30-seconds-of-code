/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2008, 2009 Codethink Limited
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
 * Authors: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_TCP_CONNECTION_H__
#define __G_TCP_CONNECTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gsocketconnection.h>

G_BEGIN_DECLS

#define G_TYPE_TCP_CONNECTION                               (g_tcp_connection_get_type ())
#define G_TCP_CONNECTION(inst)                              (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_TCP_CONNECTION, GTcpConnection))
#define G_TCP_CONNECTION_CLASS(class)                       (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_TCP_CONNECTION, GTcpConnectionClass))
#define G_IS_TCP_CONNECTION(inst)                           (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_TCP_CONNECTION))
#define G_IS_TCP_CONNECTION_CLASS(class)                    (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_TCP_CONNECTION))
#define G_TCP_CONNECTION_GET_CLASS(inst)                    (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_TCP_CONNECTION, GTcpConnectionClass))

typedef struct _GTcpConnectionPrivate                       GTcpConnectionPrivate;
typedef struct _GTcpConnectionClass                         GTcpConnectionClass;

struct _GTcpConnectionClass
{
  GSocketConnectionClass parent_class;
};

struct _GTcpConnection
{
  GSocketConnection parent_instance;
  GTcpConnectionPrivate *priv;
};

GLIB_AVAILABLE_IN_ALL
GType    g_tcp_connection_get_type                (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
void     g_tcp_connection_set_graceful_disconnect (GTcpConnection *connection,
						   gboolean        graceful_disconnect);
GLIB_AVAILABLE_IN_ALL
gboolean g_tcp_connection_get_graceful_disconnect (GTcpConnection *connection);

G_END_DECLS

#endif /* __G_TCP_CONNECTION_H__ */
