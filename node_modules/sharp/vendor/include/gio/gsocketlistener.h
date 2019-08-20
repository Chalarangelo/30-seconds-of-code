/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2008 Christian Kellner, Samuel Cormier-Iijima
 * Copyright © 2009 Codethink Limited
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
 * Authors: Christian Kellner <gicmo@gnome.org>
 *          Samuel Cormier-Iijima <sciyoshi@gmail.com>
 *          Ryan Lortie <desrt@desrt.ca>
 *          Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_SOCKET_LISTENER_H__
#define __G_SOCKET_LISTENER_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SOCKET_LISTENER                              (g_socket_listener_get_type ())
#define G_SOCKET_LISTENER(inst)                             (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_SOCKET_LISTENER, GSocketListener))
#define G_SOCKET_LISTENER_CLASS(class)                      (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_SOCKET_LISTENER, GSocketListenerClass))
#define G_IS_SOCKET_LISTENER(inst)                          (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_SOCKET_LISTENER))
#define G_IS_SOCKET_LISTENER_CLASS(class)                   (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_SOCKET_LISTENER))
#define G_SOCKET_LISTENER_GET_CLASS(inst)                   (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_SOCKET_LISTENER, GSocketListenerClass))

typedef struct _GSocketListenerPrivate                      GSocketListenerPrivate;
typedef struct _GSocketListenerClass                        GSocketListenerClass;

/**
 * GSocketListenerClass:
 * @changed: virtual method called when the set of socket listened to changes
 *
 * Class structure for #GSocketListener.
 **/
struct _GSocketListenerClass
{
  GObjectClass parent_class;

  void (* changed) (GSocketListener *listener);

  void (* event) (GSocketListener      *listener,
                  GSocketListenerEvent  event,
                  GSocket              *socket);

  /* Padding for future expansion */
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
};

struct _GSocketListener
{
  GObject parent_instance;
  GSocketListenerPrivate *priv;
};

GLIB_AVAILABLE_IN_ALL
GType                   g_socket_listener_get_type                      (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GSocketListener *       g_socket_listener_new                           (void);

GLIB_AVAILABLE_IN_ALL
void                    g_socket_listener_set_backlog                   (GSocketListener     *listener,
									 int                  listen_backlog);

GLIB_AVAILABLE_IN_ALL
gboolean                g_socket_listener_add_socket                    (GSocketListener     *listener,
                                                                         GSocket             *socket,
									 GObject             *source_object,
									 GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_socket_listener_add_address                   (GSocketListener     *listener,
                                                                         GSocketAddress      *address,
									 GSocketType          type,
									 GSocketProtocol      protocol,
									 GObject             *source_object,
                                                                         GSocketAddress     **effective_address,
									 GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_socket_listener_add_inet_port                 (GSocketListener     *listener,
                                                                         guint16              port,
									 GObject             *source_object,
									 GError             **error);
GLIB_AVAILABLE_IN_ALL
guint16                 g_socket_listener_add_any_inet_port             (GSocketListener     *listener,
									 GObject             *source_object,
									 GError             **error);

GLIB_AVAILABLE_IN_ALL
GSocket *               g_socket_listener_accept_socket                 (GSocketListener      *listener,
									 GObject             **source_object,
                                                                         GCancellable         *cancellable,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
void                    g_socket_listener_accept_socket_async           (GSocketListener      *listener,
                                                                         GCancellable         *cancellable,
                                                                         GAsyncReadyCallback   callback,
                                                                         gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
GSocket *               g_socket_listener_accept_socket_finish          (GSocketListener      *listener,
                                                                         GAsyncResult         *result,
									 GObject             **source_object,
                                                                         GError              **error);


GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_listener_accept                        (GSocketListener      *listener,
									 GObject             **source_object,
                                                                         GCancellable         *cancellable,
                                                                         GError              **error);

GLIB_AVAILABLE_IN_ALL
void                    g_socket_listener_accept_async                  (GSocketListener      *listener,
                                                                         GCancellable         *cancellable,
                                                                         GAsyncReadyCallback   callback,
                                                                         gpointer              user_data);

GLIB_AVAILABLE_IN_ALL
GSocketConnection *     g_socket_listener_accept_finish                 (GSocketListener      *listener,
                                                                         GAsyncResult         *result,
									 GObject             **source_object,
                                                                         GError              **error);

GLIB_AVAILABLE_IN_ALL
void                    g_socket_listener_close                         (GSocketListener      *listener);

G_END_DECLS

#endif /* __G_SOCKET_LISTENER_H__ */
