/* GIO - GLib Input, Output and Streaming Library
 *
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
 * Authors: Ryan Lortie <desrt@desrt.ca>
 *          Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_SOCKET_SERVICE_H__
#define __G_SOCKET_SERVICE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gsocketlistener.h>

G_BEGIN_DECLS

#define G_TYPE_SOCKET_SERVICE                               (g_socket_service_get_type ())
#define G_SOCKET_SERVICE(inst)                              (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_SOCKET_SERVICE, GSocketService))
#define G_SOCKET_SERVICE_CLASS(class)                       (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_SOCKET_SERVICE, GSocketServiceClass))
#define G_IS_SOCKET_SERVICE(inst)                           (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_SOCKET_SERVICE))
#define G_IS_SOCKET_SERVICE_CLASS(class)                    (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_SOCKET_SERVICE))
#define G_SOCKET_SERVICE_GET_CLASS(inst)                    (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_SOCKET_SERVICE, GSocketServiceClass))

typedef struct _GSocketServicePrivate                       GSocketServicePrivate;
typedef struct _GSocketServiceClass                         GSocketServiceClass;

/**
 * GSocketServiceClass:
 * @incomming: signal emitted when new connections are accepted
 *
 * Class structure for #GSocketService.
 */
struct _GSocketServiceClass
{
  GSocketListenerClass parent_class;

  gboolean (* incoming) (GSocketService    *service,
                         GSocketConnection *connection,
			 GObject           *source_object);

  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
};

struct _GSocketService
{
  GSocketListener parent_instance;
  GSocketServicePrivate *priv;
};

GLIB_AVAILABLE_IN_ALL
GType           g_socket_service_get_type  (void);

GLIB_AVAILABLE_IN_ALL
GSocketService *g_socket_service_new       (void);
GLIB_AVAILABLE_IN_ALL
void            g_socket_service_start     (GSocketService *service);
GLIB_AVAILABLE_IN_ALL
void            g_socket_service_stop      (GSocketService *service);
GLIB_AVAILABLE_IN_ALL
gboolean        g_socket_service_is_active (GSocketService *service);


G_END_DECLS

#endif /* __G_SOCKET_SERVICE_H__ */
