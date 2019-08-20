/*
 * Copyright © 2010 Codethink Limited
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
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_SIMPLE_PERMISSION_H__
#define __G_SIMPLE_PERMISSION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SIMPLE_PERMISSION      (g_simple_permission_get_type ())
#define G_SIMPLE_PERMISSION(inst)     (G_TYPE_CHECK_INSTANCE_CAST ((inst),   \
                                       G_TYPE_SIMPLE_PERMISSION,             \
                                       GSimplePermission))
#define G_IS_SIMPLE_PERMISSION(inst)  (G_TYPE_CHECK_INSTANCE_TYPE ((inst),   \
                                       G_TYPE_SIMPLE_PERMISSION))

GLIB_AVAILABLE_IN_ALL
GType                   g_simple_permission_get_type            (void);
GLIB_AVAILABLE_IN_ALL
GPermission *           g_simple_permission_new                 (gboolean allowed);

G_END_DECLS

#endif /* __G_SIMPLE_PERMISSION_H__ */
