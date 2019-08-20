/*
 * Copyright © 2010 Codethink Limited
 * Copyright © 2011 Canonical Limited
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
 * Authors: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_DBUS_ACTION_GROUP_H__
#define __G_DBUS_ACTION_GROUP_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include "giotypes.h"

G_BEGIN_DECLS

#define G_TYPE_DBUS_ACTION_GROUP                            (g_dbus_action_group_get_type ())
#define G_DBUS_ACTION_GROUP(inst)                           (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_DBUS_ACTION_GROUP, GDBusActionGroup))
#define G_DBUS_ACTION_GROUP_CLASS(class)                    (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_DBUS_ACTION_GROUP, GDBusActionGroupClass))
#define G_IS_DBUS_ACTION_GROUP(inst)                        (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_DBUS_ACTION_GROUP))
#define G_IS_DBUS_ACTION_GROUP_CLASS(class)                 (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_DBUS_ACTION_GROUP))
#define G_DBUS_ACTION_GROUP_GET_CLASS(inst)                 (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_DBUS_ACTION_GROUP, GDBusActionGroupClass))

GLIB_AVAILABLE_IN_ALL
GType                   g_dbus_action_group_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
GDBusActionGroup *      g_dbus_action_group_get                       (GDBusConnection        *connection,
                                                                       const gchar            *bus_name,
                                                                       const gchar            *object_path);

G_END_DECLS

#endif /* __G_DBUS_ACTION_GROUP_H__ */
