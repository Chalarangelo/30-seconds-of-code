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

#ifndef __G_FILE_MONITOR_H__
#define __G_FILE_MONITOR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_FILE_MONITOR         (g_file_monitor_get_type ())
#define G_FILE_MONITOR(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_FILE_MONITOR, GFileMonitor))
#define G_FILE_MONITOR_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_FILE_MONITOR, GFileMonitorClass))
#define G_IS_FILE_MONITOR(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_FILE_MONITOR))
#define G_IS_FILE_MONITOR_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_FILE_MONITOR))
#define G_FILE_MONITOR_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_FILE_MONITOR, GFileMonitorClass))

typedef struct _GFileMonitorClass       GFileMonitorClass;
typedef struct _GFileMonitorPrivate	GFileMonitorPrivate;

/**
 * GFileMonitor:
 *
 * Watches for changes to a file.
 **/
struct _GFileMonitor
{
  GObject parent_instance;

  /*< private >*/
  GFileMonitorPrivate *priv;
};

struct _GFileMonitorClass
{
  GObjectClass parent_class;

  /* Signals */
  void     (* changed) (GFileMonitor      *monitor,
                        GFile             *file,
                        GFile             *other_file,
                        GFileMonitorEvent  event_type);

  /* Virtual Table */
  gboolean (* cancel)  (GFileMonitor      *monitor);

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};

GLIB_AVAILABLE_IN_ALL
GType    g_file_monitor_get_type       (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
gboolean g_file_monitor_cancel         (GFileMonitor      *monitor);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_monitor_is_cancelled   (GFileMonitor      *monitor);
GLIB_AVAILABLE_IN_ALL
void     g_file_monitor_set_rate_limit (GFileMonitor      *monitor,
                                        gint               limit_msecs);


/* For implementations */
GLIB_AVAILABLE_IN_ALL
void     g_file_monitor_emit_event     (GFileMonitor      *monitor,
                                        GFile             *child,
                                        GFile             *other_file,
                                        GFileMonitorEvent  event_type);

G_END_DECLS

#endif /* __G_FILE_MONITOR_H__ */
