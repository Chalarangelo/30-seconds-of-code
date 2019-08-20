/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2012 Red Hat, Inc.
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

#ifndef __G_POLLABLE_UTILS_H__
#define __G_POLLABLE_UTILS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gio.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_ALL
GSource *g_pollable_source_new       (GObject        *pollable_stream);

GLIB_AVAILABLE_IN_2_34
GSource *g_pollable_source_new_full  (gpointer        pollable_stream,
				      GSource        *child_source,
				      GCancellable   *cancellable);

GLIB_AVAILABLE_IN_2_34
gssize   g_pollable_stream_read      (GInputStream   *stream,
				      void           *buffer,
				      gsize           count,
				      gboolean        blocking,
				      GCancellable   *cancellable,
				      GError        **error);

GLIB_AVAILABLE_IN_2_34
gssize   g_pollable_stream_write     (GOutputStream  *stream,
				      const void     *buffer,
				      gsize           count,
				      gboolean        blocking,
				      GCancellable   *cancellable,
				      GError        **error);
GLIB_AVAILABLE_IN_2_34
gboolean g_pollable_stream_write_all (GOutputStream  *stream,
				      const void     *buffer,
				      gsize           count,
				      gboolean        blocking,
				      gsize          *bytes_written,
				      GCancellable   *cancellable,
				      GError        **error);

G_END_DECLS

#endif /* _G_POLLABLE_UTILS_H_ */
