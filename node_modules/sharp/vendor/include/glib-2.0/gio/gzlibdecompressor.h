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

#ifndef __G_ZLIB_DECOMPRESSOR_H__
#define __G_ZLIB_DECOMPRESSOR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gconverter.h>
#include <gio/gfileinfo.h>

G_BEGIN_DECLS

#define G_TYPE_ZLIB_DECOMPRESSOR         (g_zlib_decompressor_get_type ())
#define G_ZLIB_DECOMPRESSOR(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_ZLIB_DECOMPRESSOR, GZlibDecompressor))
#define G_ZLIB_DECOMPRESSOR_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_ZLIB_DECOMPRESSOR, GZlibDecompressorClass))
#define G_IS_ZLIB_DECOMPRESSOR(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_ZLIB_DECOMPRESSOR))
#define G_IS_ZLIB_DECOMPRESSOR_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_ZLIB_DECOMPRESSOR))
#define G_ZLIB_DECOMPRESSOR_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_ZLIB_DECOMPRESSOR, GZlibDecompressorClass))

typedef struct _GZlibDecompressorClass   GZlibDecompressorClass;

struct _GZlibDecompressorClass
{
  GObjectClass parent_class;
};

GLIB_AVAILABLE_IN_ALL
GType              g_zlib_decompressor_get_type (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GZlibDecompressor *g_zlib_decompressor_new (GZlibCompressorFormat format);

GLIB_AVAILABLE_IN_ALL
GFileInfo         *g_zlib_decompressor_get_file_info (GZlibDecompressor *decompressor);

G_END_DECLS

#endif /* __G_ZLIB_DECOMPRESSOR_H__ */
