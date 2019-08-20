/* GDBus - GLib D-Bus Library
 *
 * Copyright (C) 2008-2010 Red Hat, Inc.
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
 * Author: David Zeuthen <davidz@redhat.com>
 */

#ifndef __G_DBUS_OBJECT_MANAGER_H__
#define __G_DBUS_OBJECT_MANAGER_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_OBJECT_MANAGER         (g_dbus_object_manager_get_type())
#define G_DBUS_OBJECT_MANAGER(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_OBJECT_MANAGER, GDBusObjectManager))
#define G_IS_DBUS_OBJECT_MANAGER(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_OBJECT_MANAGER))
#define G_DBUS_OBJECT_MANAGER_GET_IFACE(o) (G_TYPE_INSTANCE_GET_INTERFACE((o), G_TYPE_DBUS_OBJECT_MANAGER, GDBusObjectManagerIface))

typedef struct _GDBusObjectManagerIface GDBusObjectManagerIface;

/**
 * GDBusObjectManagerIface:
 * @parent_iface: The parent interface.
 * @get_object_path: Virtual function for g_dbus_object_manager_get_object_path().
 * @get_objects: Virtual function for g_dbus_object_manager_get_objects().
 * @get_object: Virtual function for g_dbus_object_manager_get_object().
 * @get_interface: Virtual function for g_dbus_object_manager_get_interface().
 * @object_added: Signal handler for the #GDBusObjectManager::object-added signal.
 * @object_removed: Signal handler for the #GDBusObjectManager::object-removed signal.
 * @interface_added: Signal handler for the #GDBusObjectManager::interface-added signal.
 * @interface_removed: Signal handler for the #GDBusObjectManager::interface-removed signal.
 *
 * Base type for D-Bus object managers.
 *
 * Since: 2.30
 */
struct _GDBusObjectManagerIface
{
  GTypeInterface parent_iface;

  /* Virtual Functions */
  const gchar     *(*get_object_path) (GDBusObjectManager    *manager);
  GList           *(*get_objects)     (GDBusObjectManager    *manager);
  GDBusObject     *(*get_object)      (GDBusObjectManager    *manager,
                                       const gchar           *object_path);
  GDBusInterface  *(*get_interface)   (GDBusObjectManager    *manager,
                                       const gchar           *object_path,
                                       const gchar           *interface_name);

  /* Signals */
  void    (*object_added)                 (GDBusObjectManager   *manager,
                                           GDBusObject          *object);
  void    (*object_removed)               (GDBusObjectManager   *manager,
                                           GDBusObject          *object);

  void    (*interface_added)              (GDBusObjectManager   *manager,
                                           GDBusObject          *object,
                                           GDBusInterface       *interface_);
  void    (*interface_removed)            (GDBusObjectManager   *manager,
                                           GDBusObject          *object,
                                           GDBusInterface       *interface_);
};

GLIB_AVAILABLE_IN_ALL
GType            g_dbus_object_manager_get_type        (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_object_manager_get_object_path (GDBusObjectManager    *manager);
GLIB_AVAILABLE_IN_ALL
GList           *g_dbus_object_manager_get_objects     (GDBusObjectManager    *manager);
GLIB_AVAILABLE_IN_ALL
GDBusObject     *g_dbus_object_manager_get_object      (GDBusObjectManager    *manager,
                                                        const gchar           *object_path);
GLIB_AVAILABLE_IN_ALL
GDBusInterface  *g_dbus_object_manager_get_interface   (GDBusObjectManager    *manager,
                                                        const gchar           *object_path,
                                                        const gchar           *interface_name);

G_END_DECLS

#endif /* __G_DBUS_OBJECT_MANAGER_H__ */
