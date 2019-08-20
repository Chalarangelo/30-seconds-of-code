/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2008, 2009 Codethink Limited
 * Copyright © 2009 Red Hat, Inc
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
 *          Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_SOCKET_CLIENT_H__
#define __G_SOCKET_CLIENT_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SOCKET_CLIENT                                (g_socket_client_get_type ())
#define G_SOCKET_CLIENT(inst)                               (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_SOCKET_CLIENT, GSocketClient))
#define G_SOCKET_CLIENT_CLASS(class)                        (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_SOCKET_CLIENT, GSocketClientClass))
#define G_IS_SOCKET_CLIENT(inst)                            (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_SOCKET_CLIENT))
#define G_IS_SOCKET_CLIENT_CLASS(class)                     (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_SOCKET_CLIENT))
#define G_SOCKET_CLIENT_GET_CLASS(inst)                     (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_SOCKET_CLIENT, GSocketClientClass))

typedef struct _GSocketClientPrivate                        GSocketClientPrivate;
typedef struct _GSocketClientClass                          GSocketClientClass;

struct _GSocketClientClass
{
  GObjectClass parent_class;

  void (* event) (GSocketClient       *client,
		  GSocketClientEvent  event,
		  GSocketConnectable  *connectable,
		  GIOStream           *connection);

  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
};

struct _GSocketClient
{
  GObject parent_instance;
  GSocketClientPrivate *priv;
};

GLIB_AVAILABLE_IN_ALL
GType                   g_socket_client_get_type                        (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GSocketClient          *g_socket_client_new                             (void);

GLIB_AVAILABLE_IN_ALL
GSocketFamily           g_socket_client_get_family                      (GSocketClient        *client);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_set_family                      (GSocketClient        *client,
									 GSocketFamily         family);
GLIB_AVAILABLE_IN_ALL
GSocketType             g_socket_client_get_socket_type                 (GSocketClient        *client);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_set_socket_type                 (GSocketClient        *client,
									 GSocketType           type);
GLIB_AVAILABLE_IN_ALL
GSocketProtocol         g_socket_client_get_protocol                    (GSocketClient        *client);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_set_protocol                    (GSocketClient        *client,
									 GSocketProtocol       protocol);
GLIB_AVAILABLE_IN_ALL
GSocketAddress         *g_socket_client_get_local_address               (GSocketClient        *client);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_set_local_address               (GSocketClient        *client,
									 GSocketAddress       *address);
GLIB_AVAILABLE_IN_ALL
guint                   g_socket_client_get_timeout                     (GSocketClient        *client);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_set_timeout                     (GSocketClient        *client,
									 guint                 timeout);
GLIB_AVAILABLE_IN_ALL
gboolean                g_socket_client_get_enable_proxy                (GSocketClient        *client);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_set_enable_proxy                (GSocketClient        *client,
    									 gboolean	      enable);

GLIB_AVAILABLE_IN_2_28
gboolean                g_socket_client_get_tls                         (GSocketClient        *client);
GLIB_AVAILABLE_IN_2_28
void                    g_socket_client_set_tls                         (GSocketClient        *client,
									 gboolean              tls);
GLIB_AVAILABLE_IN_2_28
GTlsCertificateFlags    g_socket_client_get_tls_validation_flags        (GSocketClient        *client);
GLIB_AVAILABLE_IN_2_28
void                    g_socket_client_set_tls_validation_flags        (GSocketClient        *client,
									 GTlsCertificateFlags  flags);
GLIB_AVAILABLE_IN_2_36
GProxyResolver         *g_socket_client_get_proxy_resolver              (GSocketClient        *client);
GLIB_AVAILABLE_IN_2_36
void                    g_socket_client_set_proxy_resolver              (GSocketClient        *client,
                                                                         GProxyResolver       *proxy_resolver);

GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect                         (GSocketClient        *client,
                                                                         GSocketConnectable   *connectable,
                                                                         GCancellable         *cancellable,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect_to_host                 (GSocketClient        *client,
									 const gchar          *host_and_port,
									 guint16               default_port,
                                                                         GCancellable         *cancellable,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect_to_service              (GSocketClient        *client,
									 const gchar          *domain,
									 const gchar          *service,
                                                                         GCancellable         *cancellable,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_2_26
GSocketConnection *     g_socket_client_connect_to_uri                  (GSocketClient        *client,
									 const gchar          *uri,
									 guint16               default_port,
                                                                         GCancellable         *cancellable,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_connect_async                   (GSocketClient        *client,
                                                                         GSocketConnectable   *connectable,
                                                                         GCancellable         *cancellable,
                                                                         GAsyncReadyCallback   callback,
                                                                         gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect_finish                  (GSocketClient        *client,
                                                                         GAsyncResult         *result,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_connect_to_host_async           (GSocketClient        *client,
									 const gchar          *host_and_port,
									 guint16               default_port,
                                                                         GCancellable         *cancellable,
                                                                         GAsyncReadyCallback   callback,
                                                                         gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect_to_host_finish          (GSocketClient        *client,
                                                                         GAsyncResult         *result,
                                                                         GError              **error);

GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_connect_to_service_async        (GSocketClient        *client,
									 const gchar          *domain,
									 const gchar          *service,
                                                                         GCancellable         *cancellable,
                                                                         GAsyncReadyCallback   callback,
                                                                         gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect_to_service_finish       (GSocketClient        *client,
                                                                         GAsyncResult         *result,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_client_connect_to_uri_async            (GSocketClient        *client,
									 const gchar          *uri,
									 guint16               default_port,
                                                                         GCancellable         *cancellable,
                                                                         GAsyncReadyCallback   callback,
                                                                         gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_client_connect_to_uri_finish           (GSocketClient        *client,
                                                                         GAsyncResult         *result,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
void			g_socket_client_add_application_proxy		(GSocketClient        *client,
									 const gchar          *protocol);

G_END_DECLS

#endif /* __G_SOCKET_CLIENT_H___ */
