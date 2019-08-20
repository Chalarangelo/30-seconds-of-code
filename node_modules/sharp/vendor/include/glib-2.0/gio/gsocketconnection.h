/* GIO - GLib Input, Output and Streaming Library
 * Copyright © 2008 Christian Kellner, Samuel Cormier-Iijima
 * Copyright © 2009 Codethink Limited
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
 * Authors: Christian Kellner <gicmo@gnome.org>
 *          Samuel Cormier-Iijima <sciyoshi@gmail.com>
 *          Ryan Lortie <desrt@desrt.ca>
 *          Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_SOCKET_CONNECTION_H__
#define __G_SOCKET_CONNECTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <glib-object.h>
#include <gio/gsocket.h>
#include <gio/giostream.h>

G_BEGIN_DECLS

#define G_TYPE_SOCKET_CONNECTION                            (g_socket_connection_get_type ())
#define G_SOCKET_CONNECTION(inst)                           (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_SOCKET_CONNECTION, GSocketConnection))
#define G_SOCKET_CONNECTION_CLASS(class)                    (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_SOCKET_CONNECTION, GSocketConnectionClass))
#define G_IS_SOCKET_CONNECTION(inst)                        (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_SOCKET_CONNECTION))
#define G_IS_SOCKET_CONNECTION_CLASS(class)                 (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_SOCKET_CONNECTION))
#define G_SOCKET_CONNECTION_GET_CLASS(inst)                 (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_SOCKET_CONNECTION, GSocketConnectionClass))

typedef struct _GSocketConnectionPrivate                    GSocketConnectionPrivate;
typedef struct _GSocketConnectionClass                      GSocketConnectionClass;

struct _GSocketConnectionClass
{
  GIOStreamClass parent_class;

  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
};

struct _GSocketConnection
{
  GIOStream parent_instance;
  GSocketConnectionPrivate *priv;
};

GLIB_AVAILABLE_IN_ALL
GType              g_socket_connection_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
gboolean           g_socket_connection_is_connected              (GSocketConnection  *connection);
GLIB_AVAILABLE_IN_2_32
gboolean           g_socket_connection_connect                   (GSocketConnection  *connection,
								  GSocketAddress     *address,
								  GCancellable       *cancellable,
								  GError            **error);
GLIB_AVAILABLE_IN_2_32
void               g_socket_connection_connect_async             (GSocketConnection  *connection,
								  GSocketAddress     *address,
								  GCancellable       *cancellable,
								  GAsyncReadyCallback callback,
								  gpointer            user_data);
GLIB_AVAILABLE_IN_2_32
gboolean           g_socket_connection_connect_finish            (GSocketConnection  *connection,
								  GAsyncResult       *result,
								  GError            **error);

GLIB_AVAILABLE_IN_ALL
GSocket           *g_socket_connection_get_socket                (GSocketConnection  *connection);
GLIB_AVAILABLE_IN_ALL
GSocketAddress    *g_socket_connection_get_local_address         (GSocketConnection  *connection,
								  GError            **error);
GLIB_AVAILABLE_IN_ALL
GSocketAddress    *g_socket_connection_get_remote_address        (GSocketConnection  *connection,
								  GError            **error);

GLIB_AVAILABLE_IN_ALL
void               g_socket_connection_factory_register_type     (GType               g_type,
								  GSocketFamily       family,
								  GSocketType         type,
								  gint                protocol);
GLIB_AVAILABLE_IN_ALL
GType              g_socket_connection_factory_lookup_type       (GSocketFamily       family,
								  GSocketType         type,
								  gint                protocol_id);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *g_socket_connection_factory_create_connection (GSocket            *socket);

G_END_DECLS

#endif /* __G_SOCKET_CONNECTION_H__ */
