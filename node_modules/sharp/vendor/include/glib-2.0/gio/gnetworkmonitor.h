/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright 2011 Red Hat, Inc.
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

#ifndef __G_NETWORK_MONITOR_H__
#define __G_NETWORK_MONITOR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

/**
 * G_NETWORK_MONITOR_EXTENSION_POINT_NAME:
 *
 * Extension point for network status monitoring functionality.
 * See [Extending GIO][extending-gio].
 *
 * Since: 2.30
 */
#define G_NETWORK_MONITOR_EXTENSION_POINT_NAME "gio-network-monitor"

#define G_TYPE_NETWORK_MONITOR             (g_network_monitor_get_type ())
#define G_NETWORK_MONITOR(o)               (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_NETWORK_MONITOR, GNetworkMonitor))
#define G_IS_NETWORK_MONITOR(o)            (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_NETWORK_MONITOR))
#define G_NETWORK_MONITOR_GET_INTERFACE(o) (G_TYPE_INSTANCE_GET_INTERFACE ((o), G_TYPE_NETWORK_MONITOR, GNetworkMonitorInterface))

typedef struct _GNetworkMonitorInterface GNetworkMonitorInterface;

struct _GNetworkMonitorInterface {
  GTypeInterface g_iface;

  void     (*network_changed)  (GNetworkMonitor      *monitor,
				gboolean              network_available);

  gboolean (*can_reach)        (GNetworkMonitor      *monitor,
				GSocketConnectable   *connectable,
				GCancellable         *cancellable,
				GError              **error);
  void     (*can_reach_async)  (GNetworkMonitor      *monitor,
				GSocketConnectable   *connectable,
				GCancellable         *cancellable,
				GAsyncReadyCallback   callback,
				gpointer              user_data);
  gboolean (*can_reach_finish) (GNetworkMonitor      *monitor,
				GAsyncResult         *result,
				GError              **error);
};

GLIB_AVAILABLE_IN_2_32
GType                 g_network_monitor_get_type              (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_2_32
GNetworkMonitor      *g_network_monitor_get_default           (void);

GLIB_AVAILABLE_IN_2_32
gboolean              g_network_monitor_get_network_available (GNetworkMonitor     *monitor);

GLIB_AVAILABLE_IN_2_46
gboolean              g_network_monitor_get_network_metered   (GNetworkMonitor     *monitor);

GLIB_AVAILABLE_IN_2_44
GNetworkConnectivity  g_network_monitor_get_connectivity      (GNetworkMonitor     *monitor);

GLIB_AVAILABLE_IN_2_32
gboolean              g_network_monitor_can_reach             (GNetworkMonitor     *monitor,
                                                               GSocketConnectable  *connectable,
                                                               GCancellable        *cancellable,
                                                               GError             **error);
GLIB_AVAILABLE_IN_2_32
void                  g_network_monitor_can_reach_async       (GNetworkMonitor     *monitor,
                                                               GSocketConnectable  *connectable,
                                                               GCancellable        *cancellable,
                                                               GAsyncReadyCallback  callback,
                                                               gpointer             user_data);
GLIB_AVAILABLE_IN_2_32
gboolean              g_network_monitor_can_reach_finish      (GNetworkMonitor     *monitor,
                                                               GAsyncResult        *result,
                                                               GError             **error);

G_END_DECLS

#endif /* __G_NETWORK_MONITOR_H__ */
