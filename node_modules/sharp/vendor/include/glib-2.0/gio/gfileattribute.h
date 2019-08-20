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

#ifndef __G_FILE_ATTRIBUTE_H__
#define __G_FILE_ATTRIBUTE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

/**
 * GFileAttributeInfo:
 * @name: the name of the attribute.
 * @type: the #GFileAttributeType type of the attribute.
 * @flags: a set of #GFileAttributeInfoFlags.
 *
 * Information about a specific attribute.
 **/
struct _GFileAttributeInfo
{
  char                    *name;
  GFileAttributeType       type;
  GFileAttributeInfoFlags  flags;
};

/**
 * GFileAttributeInfoList:
 * @infos: an array of #GFileAttributeInfos.
 * @n_infos: the number of values in the array.
 *
 * Acts as a lightweight registry for possible valid file attributes.
 * The registry stores Key-Value pair formats as #GFileAttributeInfos.
 **/
struct _GFileAttributeInfoList
{
  GFileAttributeInfo *infos;
  int                 n_infos;
};

#define G_TYPE_FILE_ATTRIBUTE_INFO_LIST (g_file_attribute_info_list_get_type ())
GLIB_AVAILABLE_IN_ALL
GType g_file_attribute_info_list_get_type (void);

GLIB_AVAILABLE_IN_ALL
GFileAttributeInfoList *  g_file_attribute_info_list_new    (void);
GLIB_AVAILABLE_IN_ALL
GFileAttributeInfoList *  g_file_attribute_info_list_ref    (GFileAttributeInfoList *list);
GLIB_AVAILABLE_IN_ALL
void                      g_file_attribute_info_list_unref  (GFileAttributeInfoList *list);
GLIB_AVAILABLE_IN_ALL
GFileAttributeInfoList *  g_file_attribute_info_list_dup    (GFileAttributeInfoList *list);
GLIB_AVAILABLE_IN_ALL
const GFileAttributeInfo *g_file_attribute_info_list_lookup (GFileAttributeInfoList *list,
							     const char             *name);
GLIB_AVAILABLE_IN_ALL
void                      g_file_attribute_info_list_add    (GFileAttributeInfoList *list,
							     const char             *name,
							     GFileAttributeType      type,
							     GFileAttributeInfoFlags flags);

G_END_DECLS

#endif /* __G_FILE_INFO_H__ */
