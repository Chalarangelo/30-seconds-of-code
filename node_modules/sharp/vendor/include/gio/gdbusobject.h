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

#ifndef __G_DBUS_OBJECT_H__
#define __G_DBUS_OBJECT_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_OBJECT         (g_dbus_object_get_type())
#define G_DBUS_OBJECT(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_OBJECT, GDBusObject))
#define G_IS_DBUS_OBJECT(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_OBJECT))
#define G_DBUS_OBJECT_GET_IFACE(o) (G_TYPE_INSTANCE_GET_INTERFACE((o), G_TYPE_DBUS_OBJECT, GDBusObjectIface))

typedef struct _GDBusObjectIface GDBusObjectIface;

/**
 * GDBusObjectIface:
 * @parent_iface: The parent interface.
 * @get_object_path: Returns the object path. See g_dbus_object_get_object_path().
 * @get_interfaces: Returns all interfaces. See g_dbus_object_get_interfaces().
 * @get_interface: Returns an interface by name. See g_dbus_object_get_interface().
 * @interface_added: Signal handler for the #GDBusObject::interface-added signal.
 * @interface_removed: Signal handler for the #GDBusObject::interface-removed signal.
 *
 * Base object type for D-Bus objects.
 *
 * Since: 2.30
 */
struct _GDBusObjectIface
{
  GTypeInterface parent_iface;

  /* Virtual Functions */
  const gchar     *(*get_object_path) (GDBusObject  *object);
  GList           *(*get_interfaces)  (GDBusObject  *object);
  GDBusInterface  *(*get_interface)   (GDBusObject  *object,
                                       const gchar  *interface_name);

  /* Signals */
  void (*interface_added)   (GDBusObject     *object,
                             GDBusInterface  *interface_);
  void (*interface_removed) (GDBusObject     *object,
                             GDBusInterface  *interface_);

};

GLIB_AVAILABLE_IN_ALL
GType            g_dbus_object_get_type        (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_object_get_object_path (GDBusObject  *object);
GLIB_AVAILABLE_IN_ALL
GList           *g_dbus_object_get_interfaces  (GDBusObject  *object);
GLIB_AVAILABLE_IN_ALL
GDBusInterface  *g_dbus_object_get_interface   (GDBusObject  *object,
                                                const gchar  *interface_name);

G_END_DECLS

#endif /* __G_DBUS_OBJECT_H__ */
