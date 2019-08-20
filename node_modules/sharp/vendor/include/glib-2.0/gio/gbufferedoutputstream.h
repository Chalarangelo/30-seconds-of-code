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
 * Author: Christian Kellner <gicmo@gnome.org>
 */

#ifndef __G_BUFFERED_OUTPUT_STREAM_H__
#define __G_BUFFERED_OUTPUT_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gfilteroutputstream.h>

G_BEGIN_DECLS

#define G_TYPE_BUFFERED_OUTPUT_STREAM         (g_buffered_output_stream_get_type ())
#define G_BUFFERED_OUTPUT_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_BUFFERED_OUTPUT_STREAM, GBufferedOutputStream))
#define G_BUFFERED_OUTPUT_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_BUFFERED_OUTPUT_STREAM, GBufferedOutputStreamClass))
#define G_IS_BUFFERED_OUTPUT_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_BUFFERED_OUTPUT_STREAM))
#define G_IS_BUFFERED_OUTPUT_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_BUFFERED_OUTPUT_STREAM))
#define G_BUFFERED_OUTPUT_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_BUFFERED_OUTPUT_STREAM, GBufferedOutputStreamClass))

/**
 * GBufferedOutputStream:
 *
 * An implementation of #GFilterOutputStream with a sized buffer.
 **/
typedef struct _GBufferedOutputStreamClass    GBufferedOutputStreamClass;
typedef struct _GBufferedOutputStreamPrivate  GBufferedOutputStreamPrivate;

struct _GBufferedOutputStream
{
  GFilterOutputStream parent_instance;

  /*< protected >*/
  GBufferedOutputStreamPrivate *priv;
};

struct _GBufferedOutputStreamClass
{
  GFilterOutputStreamClass parent_class;

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
};


GLIB_AVAILABLE_IN_ALL
GType          g_buffered_output_stream_get_type        (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GOutputStream* g_buffered_output_stream_new             (GOutputStream         *base_stream);
GLIB_AVAILABLE_IN_ALL
GOutputStream* g_buffered_output_stream_new_sized       (GOutputStream         *base_stream,
							 gsize                  size);
GLIB_AVAILABLE_IN_ALL
gsize          g_buffered_output_stream_get_buffer_size (GBufferedOutputStream *stream);
GLIB_AVAILABLE_IN_ALL
void           g_buffered_output_stream_set_buffer_size (GBufferedOutputStream *stream,
							 gsize                  size);
GLIB_AVAILABLE_IN_ALL
gboolean       g_buffered_output_stream_get_auto_grow   (GBufferedOutputStream *stream);
GLIB_AVAILABLE_IN_ALL
void           g_buffered_output_stream_set_auto_grow   (GBufferedOutputStream *stream,
							 gboolean               auto_grow);

G_END_DECLS

#endif /* __G_BUFFERED_OUTPUT_STREAM_H__ */
