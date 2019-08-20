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

#ifndef __G_DBUS_INTERFACE_H__
#define __G_DBUS_INTERFACE_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_INTERFACE         (g_dbus_interface_get_type())
#define G_DBUS_INTERFACE(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_INTERFACE, GDBusInterface))
#define G_IS_DBUS_INTERFACE(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_INTERFACE))
#define G_DBUS_INTERFACE_GET_IFACE(o) (G_TYPE_INSTANCE_GET_INTERFACE((o), G_TYPE_DBUS_INTERFACE, GDBusInterfaceIface))

/**
 * GDBusInterface:
 *
 * Base type for D-Bus interfaces.
 *
 * Since: 2.30
 */

typedef struct _GDBusInterfaceIface GDBusInterfaceIface;

/**
 * GDBusInterfaceIface:
 * @parent_iface: The parent interface.
 * @get_info: Returns a #GDBusInterfaceInfo. See g_dbus_interface_get_info().
 * @get_object: Gets the enclosing #GDBusObject. See g_dbus_interface_get_object().
 * @set_object: Sets the enclosing #GDBusObject. See g_dbus_interface_set_object().
 * @dup_object: Gets a reference to the enclosing #GDBusObject. See g_dbus_interface_dup_object(). Added in 2.32.
 *
 * Base type for D-Bus interfaces.
 *
 * Since: 2.30
 */
struct _GDBusInterfaceIface
{
  GTypeInterface parent_iface;

  /* Virtual Functions */
  GDBusInterfaceInfo   *(*get_info)   (GDBusInterface      *interface_);
  GDBusObject          *(*get_object) (GDBusInterface      *interface_);
  void                  (*set_object) (GDBusInterface      *interface_,
                                       GDBusObject         *object);
  GDBusObject          *(*dup_object) (GDBusInterface      *interface_);
};

GLIB_AVAILABLE_IN_ALL
GType                 g_dbus_interface_get_type         (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GDBusInterfaceInfo   *g_dbus_interface_get_info         (GDBusInterface      *interface_);
GLIB_AVAILABLE_IN_ALL
GDBusObject          *g_dbus_interface_get_object       (GDBusInterface      *interface_);
GLIB_AVAILABLE_IN_ALL
void                  g_dbus_interface_set_object       (GDBusInterface      *interface_,
                                                         GDBusObject         *object);
GLIB_AVAILABLE_IN_2_32
GDBusObject          *g_dbus_interface_dup_object       (GDBusInterface      *interface_);

G_END_DECLS

#endif /* __G_DBUS_INTERFACE_H__ */
