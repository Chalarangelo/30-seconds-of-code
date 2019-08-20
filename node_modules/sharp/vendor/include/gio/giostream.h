/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2008, 2009 Codethink Limited
 * Copyright © 2009 Red Hat, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * See the included COPYING file for more information.
 *
 * Authors: Ryan Lortie <desrt@desrt.ca>
 *          Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_IO_STREAM_H__
#define __G_IO_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/ginputstream.h>
#include <gio/goutputstream.h>
#include <gio/gcancellable.h>
#include <gio/gioerror.h>

G_BEGIN_DECLS

#define G_TYPE_IO_STREAM         (g_io_stream_get_type ())
#define G_IO_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_IO_STREAM, GIOStream))
#define G_IO_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_IO_STREAM, GIOStreamClass))
#define G_IS_IO_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_IO_STREAM))
#define G_IS_IO_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_IO_STREAM))
#define G_IO_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_IO_STREAM, GIOStreamClass))

typedef struct _GIOStreamPrivate                            GIOStreamPrivate;
typedef struct _GIOStreamClass                              GIOStreamClass;

/**
 * GIOStream:
 *
 * Base class for read-write streams.
 **/
struct _GIOStream
{
  GObject parent_instance;

  /*< private >*/
  GIOStreamPrivate *priv;
};

struct _GIOStreamClass
{
  GObjectClass parent_class;

  GInputStream *  (*get_input_stream)  (GIOStream *stream);
  GOutputStream * (*get_output_stream) (GIOStream *stream);

  gboolean (* close_fn)	    (GIOStream           *stream,
                             GCancellable        *cancellable,
                             GError             **error);
  void     (* close_async)  (GIOStream           *stream,
                             int                  io_priority,
                             GCancellable        *cancellable,
                             GAsyncReadyCallback  callback,
                             gpointer             user_data);
  gboolean (* close_finish) (GIOStream           *stream,
                             GAsyncResult        *result,
                             GError             **error);
  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
  void (*_g_reserved7) (void);
  void (*_g_reserved8) (void);
  void (*_g_reserved9) (void);
  void (*_g_reserved10) (void);
};

GLIB_AVAILABLE_IN_ALL
GType          g_io_stream_get_type          (void)  G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GInputStream * g_io_stream_get_input_stream  (GIOStream            *stream);
GLIB_AVAILABLE_IN_ALL
GOutputStream *g_io_stream_get_output_stream (GIOStream            *stream);

GLIB_AVAILABLE_IN_ALL
void           g_io_stream_splice_async      (GIOStream            *stream1,
					      GIOStream            *stream2,
					      GIOStreamSpliceFlags  flags,
					      int                   io_priority,
					      GCancellable         *cancellable,
					      GAsyncReadyCallback   callback,
					      gpointer              user_data);

GLIB_AVAILABLE_IN_ALL
gboolean       g_io_stream_splice_finish     (GAsyncResult         *result,
                                              GError              **error);

GLIB_AVAILABLE_IN_ALL
gboolean       g_io_stream_close             (GIOStream            *stream,
					      GCancellable         *cancellable,
					      GError              **error);

GLIB_AVAILABLE_IN_ALL
void           g_io_stream_close_async       (GIOStream            *stream,
					      int                   io_priority,
					      GCancellable         *cancellable,
					      GAsyncReadyCallback   callback,
					      gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean       g_io_stream_close_finish      (GIOStream            *stream,
					      GAsyncResult         *result,
					      GError              **error);

GLIB_AVAILABLE_IN_ALL
gboolean       g_io_stream_is_closed         (GIOStream            *stream);
GLIB_AVAILABLE_IN_ALL
gboolean       g_io_stream_has_pending       (GIOStream            *stream);
GLIB_AVAILABLE_IN_ALL
gboolean       g_io_stream_set_pending       (GIOStream            *stream,
					      GError              **error);
GLIB_AVAILABLE_IN_ALL
void           g_io_stream_clear_pending     (GIOStream            *stream);

G_END_DECLS

#endif /* __G_IO_STREAM_H__ */
