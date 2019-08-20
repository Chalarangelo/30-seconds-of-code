/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_NATIVE_VOLUME_MONITOR_H__
#define __G_NATIVE_VOLUME_MONITOR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gvolumemonitor.h>

G_BEGIN_DECLS

#define G_TYPE_NATIVE_VOLUME_MONITOR        (g_native_volume_monitor_get_type ())
#define G_NATIVE_VOLUME_MONITOR(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_NATIVE_VOLUME_MONITOR, GNativeVolumeMonitor))
#define G_NATIVE_VOLUME_MONITOR_CLASS(k)    (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_NATIVE_VOLUME_MONITOR, GNativeVolumeMonitorClass))
#define G_IS_NATIVE_VOLUME_MONITOR(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_NATIVE_VOLUME_MONITOR))
#define G_IS_NATIVE_VOLUME_MONITOR_CLASS(k) (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_NATIVE_VOLUME_MONITOR))

#define G_NATIVE_VOLUME_MONITOR_EXTENSION_POINT_NAME "gio-native-volume-monitor"

typedef struct _GNativeVolumeMonitor      GNativeVolumeMonitor;
typedef struct _GNativeVolumeMonitorClass GNativeVolumeMonitorClass;

struct _GNativeVolumeMonitor
{
  GVolumeMonitor parent_instance;
};

struct _GNativeVolumeMonitorClass
{
  GVolumeMonitorClass parent_class;

  GMount * (* get_mount_for_mount_path) (const char   *mount_path,
                                         GCancellable *cancellable);
};

GLIB_AVAILABLE_IN_ALL
GType g_native_volume_monitor_get_type (void) G_GNUC_CONST;

G_END_DECLS

#endif /* __G_NATIVE_VOLUME_MONITOR_H__ */
