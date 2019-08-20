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

#ifndef __G_UNIX_OUTPUT_STREAM_H__
#define __G_UNIX_OUTPUT_STREAM_H__

#include <gio/gio.h>

G_BEGIN_DECLS

#define G_TYPE_UNIX_OUTPUT_STREAM         (g_unix_output_stream_get_type ())
#define G_UNIX_OUTPUT_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_UNIX_OUTPUT_STREAM, GUnixOutputStream))
#define G_UNIX_OUTPUT_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_UNIX_OUTPUT_STREAM, GUnixOutputStreamClass))
#define G_IS_UNIX_OUTPUT_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_UNIX_OUTPUT_STREAM))
#define G_IS_UNIX_OUTPUT_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_UNIX_OUTPUT_STREAM))
#define G_UNIX_OUTPUT_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_UNIX_OUTPUT_STREAM, GUnixOutputStreamClass))

/**
 * GUnixOutputStream:
 *
 * Implements #GOutputStream for outputting to selectable unix file descriptors
 **/
typedef struct _GUnixOutputStream         GUnixOutputStream;
typedef struct _GUnixOutputStreamClass    GUnixOutputStreamClass;
typedef struct _GUnixOutputStreamPrivate  GUnixOutputStreamPrivate;

G_DEFINE_AUTOPTR_CLEANUP_FUNC(GUnixOutputStream, g_object_unref)

struct _GUnixOutputStream
{
  GOutputStream parent_instance;

  /*< private >*/
  GUnixOutputStreamPrivate *priv;
};

struct _GUnixOutputStreamClass
{
  GOutputStreamClass parent_class;

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};

GLIB_AVAILABLE_IN_ALL
GType           g_unix_output_stream_get_type     (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GOutputStream * g_unix_output_stream_new          (gint     fd,
                                                   gboolean close_fd);
GLIB_AVAILABLE_IN_ALL
void            g_unix_output_stream_set_close_fd (GUnixOutputStream *stream,
                                                   gboolean           close_fd);
GLIB_AVAILABLE_IN_ALL
gboolean        g_unix_output_stream_get_close_fd (GUnixOutputStream *stream);
GLIB_AVAILABLE_IN_ALL
gint            g_unix_output_stream_get_fd       (GUnixOutputStream *stream);
G_END_DECLS

#endif /* __G_UNIX_OUTPUT_STREAM_H__ */
