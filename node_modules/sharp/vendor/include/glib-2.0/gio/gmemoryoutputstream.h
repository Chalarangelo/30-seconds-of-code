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

#ifndef __G_MEMORY_OUTPUT_STREAM_H__
#define __G_MEMORY_OUTPUT_STREAM_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/goutputstream.h>

G_BEGIN_DECLS

#define G_TYPE_MEMORY_OUTPUT_STREAM         (g_memory_output_stream_get_type ())
#define G_MEMORY_OUTPUT_STREAM(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_MEMORY_OUTPUT_STREAM, GMemoryOutputStream))
#define G_MEMORY_OUTPUT_STREAM_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_MEMORY_OUTPUT_STREAM, GMemoryOutputStreamClass))
#define G_IS_MEMORY_OUTPUT_STREAM(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_MEMORY_OUTPUT_STREAM))
#define G_IS_MEMORY_OUTPUT_STREAM_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_MEMORY_OUTPUT_STREAM))
#define G_MEMORY_OUTPUT_STREAM_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_MEMORY_OUTPUT_STREAM, GMemoryOutputStreamClass))

/**
 * GMemoryOutputStream:
 *
 * Implements #GOutputStream for arbitrary memory chunks.
 **/
typedef struct _GMemoryOutputStreamClass    GMemoryOutputStreamClass;
typedef struct _GMemoryOutputStreamPrivate  GMemoryOutputStreamPrivate;

struct _GMemoryOutputStream
{
  GOutputStream parent_instance;

  /*< private >*/
  GMemoryOutputStreamPrivate *priv;
};

struct _GMemoryOutputStreamClass
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

/**
 * GReallocFunc:
 * @data: memory block to reallocate
 * @size: size to reallocate @data to
 *
 * Changes the size of the memory block pointed to by @data to
 * @size bytes.
 *
 * The function should have the same semantics as realloc().
 *
 * Returns: a pointer to the reallocated memory
 */
typedef gpointer (* GReallocFunc) (gpointer data,
                                   gsize    size);

GLIB_AVAILABLE_IN_ALL
GType          g_memory_output_stream_get_type      (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GOutputStream *g_memory_output_stream_new           (gpointer             data,
                                                     gsize                size,
                                                     GReallocFunc         realloc_function,
                                                     GDestroyNotify       destroy_function);
GLIB_AVAILABLE_IN_2_36
GOutputStream *g_memory_output_stream_new_resizable (void);
GLIB_AVAILABLE_IN_ALL
gpointer       g_memory_output_stream_get_data      (GMemoryOutputStream *ostream);
GLIB_AVAILABLE_IN_ALL
gsize          g_memory_output_stream_get_size      (GMemoryOutputStream *ostream);
GLIB_AVAILABLE_IN_ALL
gsize          g_memory_output_stream_get_data_size (GMemoryOutputStream *ostream);
GLIB_AVAILABLE_IN_ALL
gpointer       g_memory_output_stream_steal_data    (GMemoryOutputStream *ostream);

GLIB_AVAILABLE_IN_2_34
GBytes *       g_memory_output_stream_steal_as_bytes (GMemoryOutputStream *ostream);

G_END_DECLS

#endif /* __G_MEMORY_OUTPUT_STREAM_H__ */
