/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2009 Red Hat, Inc.
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

#ifndef __G_CONVERTER_INPUT_STREAM_H__
#define __G_CONVERTER_INPUT_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gfilterinputstream.h>
#include <gio/gconverter.h>

G_BEGIN_DECLS

#define G_TYPE_CONVERTER_INPUT_STREAM         (g_converter_input_stream_get_type ())
#define G_CONVERTER_INPUT_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_CONVERTER_INPUT_STREAM, GConverterInputStream))
#define G_CONVERTER_INPUT_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_CONVERTER_INPUT_STREAM, GConverterInputStreamClass))
#define G_IS_CONVERTER_INPUT_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_CONVERTER_INPUT_STREAM))
#define G_IS_CONVERTER_INPUT_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_CONVERTER_INPUT_STREAM))
#define G_CONVERTER_INPUT_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_CONVERTER_INPUT_STREAM, GConverterInputStreamClass))

/**
 * GConverterInputStream:
 *
 * An implementation of #GFilterInputStream that allows data
 * conversion.
 **/
typedef struct _GConverterInputStreamClass    GConverterInputStreamClass;
typedef struct _GConverterInputStreamPrivate  GConverterInputStreamPrivate;

struct _GConverterInputStream
{
  GFilterInputStream parent_instance;

  /*< private >*/
  GConverterInputStreamPrivate *priv;
};

struct _GConverterInputStreamClass
{
  GFilterInputStreamClass parent_class;

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};

GLIB_AVAILABLE_IN_ALL
GType                  g_converter_input_stream_get_type      (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GInputStream          *g_converter_input_stream_new           (GInputStream          *base_stream,
                                                               GConverter            *converter);
GLIB_AVAILABLE_IN_ALL
GConverter            *g_converter_input_stream_get_converter (GConverterInputStream *converter_stream);

G_END_DECLS

#endif /* __G_CONVERTER_INPUT_STREAM_H__ */
