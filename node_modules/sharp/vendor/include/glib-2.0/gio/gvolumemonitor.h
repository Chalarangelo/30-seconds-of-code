/* -*- mode: C; c-file-style: "gnu"; indent-tabs-mode: nil; -*- */

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
 *         David Zeuthen <davidz@redhat.com>
 */

#ifndef __G_VOLUME_MONITOR_H__
#define __G_VOLUME_MONITOR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_VOLUME_MONITOR         (g_volume_monitor_get_type ())
#define G_VOLUME_MONITOR(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_VOLUME_MONITOR, GVolumeMonitor))
#define G_VOLUME_MONITOR_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_VOLUME_MONITOR, GVolumeMonitorClass))
#define G_VOLUME_MONITOR_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_VOLUME_MONITOR, GVolumeMonitorClass))
#define G_IS_VOLUME_MONITOR(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_VOLUME_MONITOR))
#define G_IS_VOLUME_MONITOR_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_VOLUME_MONITOR))

/**
 * G_VOLUME_MONITOR_EXTENSION_POINT_NAME:
 *
 * Extension point for volume monitor functionality.
 * See [Extending GIO][extending-gio].
 */
#define G_VOLUME_MONITOR_EXTENSION_POINT_NAME "gio-volume-monitor"

/**
 * GVolumeMonitor:
 *
 * A Volume Monitor that watches for volume events.
 **/
typedef struct _GVolumeMonitorClass GVolumeMonitorClass;

struct _GVolumeMonitor
{
  GObject parent_instance;

  /*< private >*/
  gpointer priv;
};

struct _GVolumeMonitorClass
{
  GObjectClass parent_class;

  /*< public >*/
  /* signals */
  void      (* volume_added)         (GVolumeMonitor *volume_monitor,
                                      GVolume        *volume);
  void      (* volume_removed)       (GVolumeMonitor *volume_monitor,
                                      GVolume        *volume);
  void      (* volume_changed)       (GVolumeMonitor *volume_monitor,
                                      GVolume        *volume);

  void      (* mount_added)          (GVolumeMonitor *volume_monitor,
                                      GMount         *mount);
  void      (* mount_removed)        (GVolumeMonitor *volume_monitor,
                                      GMount         *mount);
  void      (* mount_pre_unmount)    (GVolumeMonitor *volume_monitor,
                                      GMount         *mount);
  void      (* mount_changed)        (GVolumeMonitor *volume_monitor,
                                      GMount         *mount);

  void      (* drive_connected)      (GVolumeMonitor *volume_monitor,
                                      GDrive	     *drive);
  void      (* drive_disconnected)   (GVolumeMonitor *volume_monitor,
                                      GDrive         *drive);
  void      (* drive_changed)        (GVolumeMonitor *volume_monitor,
                                      GDrive         *drive);

  /* Vtable */

  gboolean  (* is_supported)         (void);

  GList   * (* get_connected_drives) (GVolumeMonitor *volume_monitor);
  GList   * (* get_volumes)          (GVolumeMonitor *volume_monitor);
  GList   * (* get_mounts)           (GVolumeMonitor *volume_monitor);

  GVolume * (* get_volume_for_uuid)  (GVolumeMonitor *volume_monitor,
                                      const char     *uuid);

  GMount  * (* get_mount_for_uuid)   (GVolumeMonitor *volume_monitor,
                                      const char     *uuid);


  /* These arguments are unfortunately backwards by mistake (bug #520169). Deprecated in 2.20. */
  GVolume * (* adopt_orphan_mount)   (GMount         *mount,
                                      GVolumeMonitor *volume_monitor);

  /* signal added in 2.17 */
  void      (* drive_eject_button)   (GVolumeMonitor *volume_monitor,
                                      GDrive         *drive);

  /* signal added in 2.21 */
  void      (* drive_stop_button)   (GVolumeMonitor *volume_monitor,
                                     GDrive         *drive);

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
};

GLIB_AVAILABLE_IN_ALL
GType           g_volume_monitor_get_type             (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GVolumeMonitor *g_volume_monitor_get                  (void);
GLIB_AVAILABLE_IN_ALL
GList *         g_volume_monitor_get_connected_drives (GVolumeMonitor *volume_monitor);
GLIB_AVAILABLE_IN_ALL
GList *         g_volume_monitor_get_volumes          (GVolumeMonitor *volume_monitor);
GLIB_AVAILABLE_IN_ALL
GList *         g_volume_monitor_get_mounts           (GVolumeMonitor *volume_monitor);
GLIB_AVAILABLE_IN_ALL
GVolume *       g_volume_monitor_get_volume_for_uuid  (GVolumeMonitor *volume_monitor,
                                                       const char     *uuid);
GLIB_AVAILABLE_IN_ALL
GMount *        g_volume_monitor_get_mount_for_uuid   (GVolumeMonitor *volume_monitor,
                                                       const char     *uuid);

GLIB_DEPRECATED
GVolume *       g_volume_monitor_adopt_orphan_mount   (GMount         *mount);

G_END_DECLS

#endif /* __G_VOLUME_MONITOR_H__ */
