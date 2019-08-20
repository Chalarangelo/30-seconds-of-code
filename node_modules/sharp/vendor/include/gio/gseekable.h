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

#ifndef __G_SEEKABLE_H__
#define __G_SEEKABLE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SEEKABLE            (g_seekable_get_type ())
#define G_SEEKABLE(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_SEEKABLE, GSeekable))
#define G_IS_SEEKABLE(obj)         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_SEEKABLE))
#define G_SEEKABLE_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_SEEKABLE, GSeekableIface))

/**
 * GSeekable:
 *
 * Seek object for streaming operations.
 **/
typedef struct _GSeekableIface   GSeekableIface;

/**
 * GSeekableIface:
 * @g_iface: The parent interface.
 * @tell: Tells the current location within a stream.
 * @can_seek: Checks if seeking is supported by the stream.
 * @seek: Seeks to a location within a stream.
 * @can_truncate: Checks if truncation is supported by the stream.
 * @truncate_fn: Truncates a stream.
 *
 * Provides an interface for implementing seekable functionality on I/O Streams.
 **/
struct _GSeekableIface
{
  GTypeInterface g_iface;

  /* Virtual Table */

  goffset     (* tell)	         (GSeekable    *seekable);

  gboolean    (* can_seek)       (GSeekable    *seekable);
  gboolean    (* seek)	         (GSeekable    *seekable,
				  goffset       offset,
				  GSeekType     type,
				  GCancellable *cancellable,
				  GError      **error);

  gboolean    (* can_truncate)   (GSeekable    *seekable);
  gboolean    (* truncate_fn)    (GSeekable    *seekable,
				  goffset       offset,
				  GCancellable *cancellable,
				  GError       **error);

  /* TODO: Async seek/truncate */
};

GLIB_AVAILABLE_IN_ALL
GType    g_seekable_get_type     (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
goffset  g_seekable_tell         (GSeekable     *seekable);
GLIB_AVAILABLE_IN_ALL
gboolean g_seekable_can_seek     (GSeekable     *seekable);
GLIB_AVAILABLE_IN_ALL
gboolean g_seekable_seek         (GSeekable     *seekable,
				  goffset        offset,
				  GSeekType      type,
				  GCancellable  *cancellable,
				  GError       **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_seekable_can_truncate (GSeekable     *seekable);
GLIB_AVAILABLE_IN_ALL
gboolean g_seekable_truncate     (GSeekable     *seekable,
				  goffset        offset,
				  GCancellable  *cancellable,
				  GError       **error);

G_END_DECLS


#endif /* __G_SEEKABLE_H__ */
