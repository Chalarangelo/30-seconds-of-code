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

#ifndef __G_NETWORK_SERVICE_H__
#define __G_NETWORK_SERVICE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_NETWORK_SERVICE         (g_network_service_get_type ())
#define G_NETWORK_SERVICE(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_NETWORK_SERVICE, GNetworkService))
#define G_NETWORK_SERVICE_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_NETWORK_SERVICE, GNetworkServiceClass))
#define G_IS_NETWORK_SERVICE(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_NETWORK_SERVICE))
#define G_IS_NETWORK_SERVICE_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_NETWORK_SERVICE))
#define G_NETWORK_SERVICE_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_NETWORK_SERVICE, GNetworkServiceClass))

typedef struct _GNetworkServiceClass   GNetworkServiceClass;
typedef struct _GNetworkServicePrivate GNetworkServicePrivate;

struct _GNetworkService
{
  GObject parent_instance;

  /*< private >*/
  GNetworkServicePrivate *priv;
};

struct _GNetworkServiceClass
{
  GObjectClass parent_class;

};

GLIB_AVAILABLE_IN_ALL
GType                g_network_service_get_type      (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GSocketConnectable  *g_network_service_new           (const gchar     *service,
						      const gchar     *protocol,
						      const gchar     *domain);

GLIB_AVAILABLE_IN_ALL
const gchar         *g_network_service_get_service   (GNetworkService *srv);
GLIB_AVAILABLE_IN_ALL
const gchar         *g_network_service_get_protocol  (GNetworkService *srv);
GLIB_AVAILABLE_IN_ALL
const gchar         *g_network_service_get_domain    (GNetworkService *srv);
GLIB_AVAILABLE_IN_ALL
const gchar         *g_network_service_get_scheme    (GNetworkService *srv);
GLIB_AVAILABLE_IN_ALL
void                 g_network_service_set_scheme    (GNetworkService *srv, const gchar *scheme);

G_END_DECLS

#endif /* __G_NETWORK_SERVICE_H__ */

