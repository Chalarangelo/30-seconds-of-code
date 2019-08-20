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


#ifndef __G_ACTION_GROUP_EXPORTER_H__
#define __G_ACTION_GROUP_EXPORTER_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_2_32
guint                   g_dbus_connection_export_action_group           (GDBusConnection  *connection,
                                                                         const gchar      *object_path,
                                                                         GActionGroup     *action_group,
                                                                         GError          **error);

GLIB_AVAILABLE_IN_2_32
void                    g_dbus_connection_unexport_action_group         (GDBusConnection  *connection,
                                                                         guint             export_id);

G_END_DECLS

#endif /* __G_ACTION_GROUP_EXPORTER_H__ */
