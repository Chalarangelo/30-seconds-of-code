/*
 * Copyright © 2011 Canonical Ltd.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_DBUS_MENU_MODEL_H__
#define __G_DBUS_MENU_MODEL_H__

#include <gio/gdbusconnection.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_MENU_MODEL          (g_dbus_menu_model_get_type ())
#define G_DBUS_MENU_MODEL(inst)         (G_TYPE_CHECK_INSTANCE_CAST ((inst),   \
                                         G_TYPE_DBUS_MENU_MODEL, GDBusMenuModel))
#define G_IS_DBUS_MENU_MODEL(inst)      (G_TYPE_CHECK_INSTANCE_TYPE ((inst),   \
                                         G_TYPE_DBUS_MENU_MODEL))

typedef struct _GDBusMenuModel GDBusMenuModel;

GLIB_AVAILABLE_IN_ALL
GType                   g_dbus_menu_model_get_type     (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GDBusMenuModel *        g_dbus_menu_model_get          (GDBusConnection *connection,
                                                        const gchar     *bus_name,
                                                        const gchar     *object_path);

G_END_DECLS

#endif /* __G_DBUS_MENU_MODEL_H__ */
