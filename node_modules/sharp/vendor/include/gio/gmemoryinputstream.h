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

#ifndef __G_MEMORY_INPUT_STREAM_H__
#define __G_MEMORY_INPUT_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/ginputstream.h>

G_BEGIN_DECLS

#define G_TYPE_MEMORY_INPUT_STREAM         (g_memory_input_stream_get_type ())
#define G_MEMORY_INPUT_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_MEMORY_INPUT_STREAM, GMemoryInputStream))
#define G_MEMORY_INPUT_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_MEMORY_INPUT_STREAM, GMemoryInputStreamClass))
#define G_IS_MEMORY_INPUT_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_MEMORY_INPUT_STREAM))
#define G_IS_MEMORY_INPUT_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_MEMORY_INPUT_STREAM))
#define G_MEMORY_INPUT_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_MEMORY_INPUT_STREAM, GMemoryInputStreamClass))

/**
 * GMemoryInputStream:
 *
 * Implements #GInputStream for arbitrary memory chunks.
 **/
typedef struct _GMemoryInputStreamClass    GMemoryInputStreamClass;
typedef struct _GMemoryInputStreamPrivate  GMemoryInputStreamPrivate;

struct _GMemoryInputStream
{
  GInputStream parent_instance;

  /*< private >*/
  GMemoryInputStreamPrivate *priv;
};

struct _GMemoryInputStreamClass
{
  GInputStreamClass parent_class;

  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};


GLIB_AVAILABLE_IN_ALL
GType          g_memory_input_stream_get_type      (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GInputStream * g_memory_input_stream_new           (void);
GLIB_AVAILABLE_IN_ALL
GInputStream * g_memory_input_stream_new_from_data (const void         *data,
                                                    gssize              len,
                                                    GDestroyNotify      destroy);
GLIB_AVAILABLE_IN_2_34
GInputStream * g_memory_input_stream_new_from_bytes (GBytes            *bytes);

GLIB_AVAILABLE_IN_ALL
void           g_memory_input_stream_add_data      (GMemoryInputStream *stream,
                                                    const void         *data,
                                                    gssize              len,
                                                    GDestroyNotify      destroy);
GLIB_AVAILABLE_IN_2_34
void           g_memory_input_stream_add_bytes     (GMemoryInputStream     *stream,
						    GBytes                 *bytes);

G_END_DECLS

#endif /* __G_MEMORY_INPUT_STREAM_H__ */
