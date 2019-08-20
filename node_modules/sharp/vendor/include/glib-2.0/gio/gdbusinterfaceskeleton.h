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

#ifndef __G_DBUS_INTERFACE_SKELETON_H__
#define __G_DBUS_INTERFACE_SKELETON_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_INTERFACE_SKELETON         (g_dbus_interface_skeleton_get_type ())
#define G_DBUS_INTERFACE_SKELETON(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_INTERFACE_SKELETON, GDBusInterfaceSkeleton))
#define G_DBUS_INTERFACE_SKELETON_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_DBUS_INTERFACE_SKELETON, GDBusInterfaceSkeletonClass))
#define G_DBUS_INTERFACE_SKELETON_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_DBUS_INTERFACE_SKELETON, GDBusInterfaceSkeletonClass))
#define G_IS_DBUS_INTERFACE_SKELETON(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_INTERFACE_SKELETON))
#define G_IS_DBUS_INTERFACE_SKELETON_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_DBUS_INTERFACE_SKELETON))

typedef struct _GDBusInterfaceSkeletonClass   GDBusInterfaceSkeletonClass;
typedef struct _GDBusInterfaceSkeletonPrivate GDBusInterfaceSkeletonPrivate;

/**
 * GDBusInterfaceSkeleton:
 *
 * The #GDBusInterfaceSkeleton structure contains private data and should
 * only be accessed using the provided API.
 *
 * Since: 2.30
 */
struct _GDBusInterfaceSkeleton
{
  /*< private >*/
  GObject parent_instance;
  GDBusInterfaceSkeletonPrivate *priv;
};

/**
 * GDBusInterfaceSkeletonClass:
 * @parent_class: The parent class.
 * @get_info: Returns a #GDBusInterfaceInfo. See g_dbus_interface_skeleton_get_info() for details.
 * @get_vtable: Returns a #GDBusInterfaceVTable. See g_dbus_interface_skeleton_get_vtable() for details.
 * @get_properties: Returns a #GVariant with all properties. See g_dbus_interface_skeleton_get_properties().
 * @flush: Emits outstanding changes, if any. See g_dbus_interface_skeleton_flush().
 * @g_authorize_method: Signal class handler for the #GDBusInterfaceSkeleton::g-authorize-method signal.
 *
 * Class structure for #GDBusInterfaceSkeleton.
 *
 * Since: 2.30
 */
struct _GDBusInterfaceSkeletonClass
{
  GObjectClass parent_class;

  /* Virtual Functions */
  GDBusInterfaceInfo   *(*get_info)       (GDBusInterfaceSkeleton  *interface_);
  GDBusInterfaceVTable *(*get_vtable)     (GDBusInterfaceSkeleton  *interface_);
  GVariant             *(*get_properties) (GDBusInterfaceSkeleton  *interface_);
  void                  (*flush)          (GDBusInterfaceSkeleton  *interface_);

  /*< private >*/
  gpointer vfunc_padding[8];
  /*< public >*/

  /* Signals */
  gboolean (*g_authorize_method) (GDBusInterfaceSkeleton  *interface_,
                                  GDBusMethodInvocation   *invocation);

  /*< private >*/
  gpointer signal_padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                        g_dbus_interface_skeleton_get_type        (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GDBusInterfaceSkeletonFlags  g_dbus_interface_skeleton_get_flags       (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
void                         g_dbus_interface_skeleton_set_flags       (GDBusInterfaceSkeleton      *interface_,
                                                                        GDBusInterfaceSkeletonFlags  flags);
GLIB_AVAILABLE_IN_ALL
GDBusInterfaceInfo          *g_dbus_interface_skeleton_get_info        (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
GDBusInterfaceVTable        *g_dbus_interface_skeleton_get_vtable      (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
GVariant                    *g_dbus_interface_skeleton_get_properties  (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
void                         g_dbus_interface_skeleton_flush           (GDBusInterfaceSkeleton      *interface_);

GLIB_AVAILABLE_IN_ALL
gboolean                     g_dbus_interface_skeleton_export          (GDBusInterfaceSkeleton      *interface_,
                                                                        GDBusConnection             *connection,
                                                                        const gchar                 *object_path,
                                                                        GError                     **error);
GLIB_AVAILABLE_IN_ALL
void                         g_dbus_interface_skeleton_unexport        (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
void                g_dbus_interface_skeleton_unexport_from_connection (GDBusInterfaceSkeleton      *interface_,
                                                                        GDBusConnection             *connection);

GLIB_AVAILABLE_IN_ALL
GDBusConnection             *g_dbus_interface_skeleton_get_connection  (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
GList                       *g_dbus_interface_skeleton_get_connections (GDBusInterfaceSkeleton      *interface_);
GLIB_AVAILABLE_IN_ALL
gboolean                     g_dbus_interface_skeleton_has_connection  (GDBusInterfaceSkeleton      *interface_,
                                                                        GDBusConnection             *connection);
GLIB_AVAILABLE_IN_ALL
const gchar                 *g_dbus_interface_skeleton_get_object_path (GDBusInterfaceSkeleton      *interface_);

G_END_DECLS

#endif /* __G_DBUS_INTERFACE_SKELETON_H */
