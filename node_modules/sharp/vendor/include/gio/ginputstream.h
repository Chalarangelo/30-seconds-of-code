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

#ifndef __G_INPUT_STREAM_H__
#define __G_INPUT_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_INPUT_STREAM         (g_input_stream_get_type ())
#define G_INPUT_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_INPUT_STREAM, GInputStream))
#define G_INPUT_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_INPUT_STREAM, GInputStreamClass))
#define G_IS_INPUT_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_INPUT_STREAM))
#define G_IS_INPUT_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_INPUT_STREAM))
#define G_INPUT_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_INPUT_STREAM, GInputStreamClass))

/**
 * GInputStream:
 *
 * Base class for streaming input operations.
 **/
typedef struct _GInputStreamClass    GInputStreamClass;
typedef struct _GInputStreamPrivate  GInputStreamPrivate;

struct _GInputStream
{
  GObject parent_instance;

  /*< private >*/
  GInputStreamPrivate *priv;
};

struct _GInputStreamClass
{
  GObjectClass parent_class;

  /* Sync ops: */

  gssize   (* read_fn)      (GInputStream        *stream,
                             void                *buffer,
                             gsize                count,
                             GCancellable        *cancellable,
                             GError             **error);
  gssize   (* skip)         (GInputStream        *stream,
                             gsize                count,
                             GCancellable        *cancellable,
                             GError             **error);
  gboolean (* close_fn)	    (GInputStream        *stream,
                             GCancellable        *cancellable,
                             GError             **error);

  /* Async ops: (optional in derived classes) */
  void     (* read_async)   (GInputStream        *stream,
                             void                *buffer,
                             gsize                count,
                             int                  io_priority,
                             GCancellable        *cancellable,
                             GAsyncReadyCallback  callback,
                             gpointer             user_data);
  gssize   (* read_finish)  (GInputStream        *stream,
                             GAsyncResult        *result,
                             GError             **error);
  void     (* skip_async)   (GInputStream        *stream,
                             gsize                count,
                             int                  io_priority,
                             GCancellable        *cancellable,
                             GAsyncReadyCallback  callback,
                             gpointer             user_data);
  gssize   (* skip_finish)  (GInputStream        *stream,
                             GAsyncResult        *result,
                             GError             **error);
  void     (* close_async)  (GInputStream        *stream,
                             int                  io_priority,
                             GCancellable        *cancellable,
                             GAsyncReadyCallback  callback,
                             gpointer             user_data);
  gboolean (* close_finish) (GInputStream        *stream,
                             GAsyncResult        *result,
                             GError             **error);

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};

GLIB_AVAILABLE_IN_ALL
GType    g_input_stream_get_type      (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
gssize   g_input_stream_read          (GInputStream          *stream,
				       void                  *buffer,
				       gsize                  count,
				       GCancellable          *cancellable,
				       GError               **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_input_stream_read_all      (GInputStream          *stream,
				       void                  *buffer,
				       gsize                  count,
				       gsize                 *bytes_read,
				       GCancellable          *cancellable,
				       GError               **error);
GLIB_AVAILABLE_IN_2_34
GBytes  *g_input_stream_read_bytes    (GInputStream          *stream,
				       gsize                  count,
				       GCancellable          *cancellable,
				       GError               **error);
GLIB_AVAILABLE_IN_ALL
gssize   g_input_stream_skip          (GInputStream          *stream,
				       gsize                  count,
				       GCancellable          *cancellable,
				       GError               **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_input_stream_close         (GInputStream          *stream,
				       GCancellable          *cancellable,
				       GError               **error);
GLIB_AVAILABLE_IN_ALL
void     g_input_stream_read_async    (GInputStream          *stream,
				       void                  *buffer,
				       gsize                  count,
				       int                    io_priority,
				       GCancellable          *cancellable,
				       GAsyncReadyCallback    callback,
				       gpointer               user_data);
GLIB_AVAILABLE_IN_ALL
gssize   g_input_stream_read_finish   (GInputStream          *stream,
				       GAsyncResult          *result,
				       GError               **error);

GLIB_AVAILABLE_IN_2_44
void     g_input_stream_read_all_async    (GInputStream          *stream,
                                           void                  *buffer,
                                           gsize                  count,
                                           int                    io_priority,
                                           GCancellable          *cancellable,
                                           GAsyncReadyCallback    callback,
                                           gpointer               user_data);
GLIB_AVAILABLE_IN_2_44
gboolean g_input_stream_read_all_finish   (GInputStream          *stream,
                                           GAsyncResult          *result,
                                           gsize                 *bytes_read,
                                           GError               **error);

GLIB_AVAILABLE_IN_2_34
void     g_input_stream_read_bytes_async  (GInputStream          *stream,
					   gsize                  count,
					   int                    io_priority,
					   GCancellable          *cancellable,
					   GAsyncReadyCallback    callback,
					   gpointer               user_data);
GLIB_AVAILABLE_IN_2_34
GBytes  *g_input_stream_read_bytes_finish (GInputStream          *stream,
					   GAsyncResult          *result,
					   GError               **error);
GLIB_AVAILABLE_IN_ALL
void     g_input_stream_skip_async    (GInputStream          *stream,
				       gsize                  count,
				       int                    io_priority,
				       GCancellable          *cancellable,
				       GAsyncReadyCallback    callback,
				       gpointer               user_data);
GLIB_AVAILABLE_IN_ALL
gssize   g_input_stream_skip_finish   (GInputStream          *stream,
				       GAsyncResult          *result,
				       GError               **error);
GLIB_AVAILABLE_IN_ALL
void     g_input_stream_close_async   (GInputStream          *stream,
				       int                    io_priority,
				       GCancellable          *cancellable,
				       GAsyncReadyCallback    callback,
				       gpointer               user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_input_stream_close_finish  (GInputStream          *stream,
				       GAsyncResult          *result,
				       GError               **error);

/* For implementations: */

GLIB_AVAILABLE_IN_ALL
gboolean g_input_stream_is_closed     (GInputStream          *stream);
GLIB_AVAILABLE_IN_ALL
gboolean g_input_stream_has_pending   (GInputStream          *stream);
GLIB_AVAILABLE_IN_ALL
gboolean g_input_stream_set_pending   (GInputStream          *stream,
				       GError               **error);
GLIB_AVAILABLE_IN_ALL
void     g_input_stream_clear_pending (GInputStream          *stream);

G_END_DECLS

#endif /* __G_INPUT_STREAM_H__ */
