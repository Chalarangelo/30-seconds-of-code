/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Christian Kellner
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

#ifndef __G_FILE_DESCRIPTOR_BASED_H__
#define __G_FILE_DESCRIPTOR_BASED_H__

#include <gio/gio.h>

G_BEGIN_DECLS

#define G_TYPE_FILE_DESCRIPTOR_BASED            (g_file_descriptor_based_get_type ())
#define G_FILE_DESCRIPTOR_BASED(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_FILE_DESCRIPTOR_BASED, GFileDescriptorBased))
#define G_IS_FILE_DESCRIPTOR_BASED(obj)         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_FILE_DESCRIPTOR_BASED))
#define G_FILE_DESCRIPTOR_BASED_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_FILE_DESCRIPTOR_BASED, GFileDescriptorBasedIface))
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GFileDescriptorBased, g_object_unref)

/**
 * GFileDescriptorBased:
 *
 * An interface for file descriptor based io objects.
 **/
typedef struct _GFileDescriptorBasedIface   GFileDescriptorBasedIface;

/**
 * GFileDescriptorBasedIface:
 * @g_iface: The parent interface.
 * @get_fd: Gets the underlying file descriptor.
 *
 * An interface for file descriptor based io objects.
 **/
struct _GFileDescriptorBasedIface
{
  GTypeInterface g_iface;

  /* Virtual Table */
  int (*get_fd) (GFileDescriptorBased *fd_based);
};

GLIB_AVAILABLE_IN_ALL
GType    g_file_descriptor_based_get_type     (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
int      g_file_descriptor_based_get_fd       (GFileDescriptorBased *fd_based);

G_END_DECLS


#endif /* __G_FILE_DESCRIPTOR_BASED_H__ */

