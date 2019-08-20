/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Red Hat, Inc.
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

#ifndef __G_POLLABLE_INPUT_STREAM_H__
#define __G_POLLABLE_INPUT_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gio.h>

G_BEGIN_DECLS

#define G_TYPE_POLLABLE_INPUT_STREAM               (g_pollable_input_stream_get_type ())
#define G_POLLABLE_INPUT_STREAM(obj)               (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_POLLABLE_INPUT_STREAM, GPollableInputStream))
#define G_IS_POLLABLE_INPUT_STREAM(obj)            (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_POLLABLE_INPUT_STREAM))
#define G_POLLABLE_INPUT_STREAM_GET_INTERFACE(obj) (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_POLLABLE_INPUT_STREAM, GPollableInputStreamInterface))

/**
 * GPollableInputStream:
 *
 * An interface for a #GInputStream that can be polled for readability.
 *
 * Since: 2.28
 */
typedef struct _GPollableInputStreamInterface GPollableInputStreamInterface;

/**
 * GPollableInputStreamInterface:
 * @g_iface: The parent interface.
 * @can_poll: Checks if the #GPollableInputStream instance is actually pollable
 * @is_readable: Checks if the stream is readable
 * @create_source: Creates a #GSource to poll the stream
 * @read_nonblocking: Does a non-blocking read or returns
 *   %G_IO_ERROR_WOULD_BLOCK
 *
 * The interface for pollable input streams.
 *
 * The default implementation of @can_poll always returns %TRUE.
 *
 * The default implementation of @read_nonblocking calls
 * g_pollable_input_stream_is_readable(), and then calls
 * g_input_stream_read() if it returns %TRUE. This means you only need
 * to override it if it is possible that your @is_readable
 * implementation may return %TRUE when the stream is not actually
 * readable.
 *
 * Since: 2.28
 */
struct _GPollableInputStreamInterface
{
  GTypeInterface g_iface;

  /* Virtual Table */
  gboolean     (*can_poll)         (GPollableInputStream  *stream);

  gboolean     (*is_readable)      (GPollableInputStream  *stream);
  GSource *    (*create_source)    (GPollableInputStream  *stream,
				    GCancellable          *cancellable);
  gssize       (*read_nonblocking) (GPollableInputStream  *stream,
				    void                  *buffer,
				    gsize                  count,
				    GError               **error);
};

GLIB_AVAILABLE_IN_ALL
GType    g_pollable_input_stream_get_type         (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
gboolean g_pollable_input_stream_can_poll         (GPollableInputStream  *stream);

GLIB_AVAILABLE_IN_ALL
gboolean g_pollable_input_stream_is_readable      (GPollableInputStream  *stream);
GLIB_AVAILABLE_IN_ALL
GSource *g_pollable_input_stream_create_source    (GPollableInputStream  *stream,
						   GCancellable          *cancellable);

GLIB_AVAILABLE_IN_ALL
gssize   g_pollable_input_stream_read_nonblocking (GPollableInputStream  *stream,
						   void                  *buffer,
						   gsize                  count,
						   GCancellable          *cancellable,
						   GError               **error);

G_END_DECLS


#endif /* __G_POLLABLE_INPUT_STREAM_H__ */

