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

#ifndef __G_DBUS_OBJECT_SKELETON_H__
#define __G_DBUS_OBJECT_SKELETON_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_OBJECT_SKELETON         (g_dbus_object_skeleton_get_type ())
#define G_DBUS_OBJECT_SKELETON(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_OBJECT_SKELETON, GDBusObjectSkeleton))
#define G_DBUS_OBJECT_SKELETON_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_DBUS_OBJECT_SKELETON, GDBusObjectSkeletonClass))
#define G_DBUS_OBJECT_SKELETON_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_DBUS_OBJECT_SKELETON, GDBusObjectSkeletonClass))
#define G_IS_DBUS_OBJECT_SKELETON(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_OBJECT_SKELETON))
#define G_IS_DBUS_OBJECT_SKELETON_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_DBUS_OBJECT_SKELETON))

typedef struct _GDBusObjectSkeletonClass   GDBusObjectSkeletonClass;
typedef struct _GDBusObjectSkeletonPrivate GDBusObjectSkeletonPrivate;

/**
 * GDBusObjectSkeleton:
 *
 * The #GDBusObjectSkeleton structure contains private data and should only be
 * accessed using the provided API.
 *
 * Since: 2.30
 */
struct _GDBusObjectSkeleton
{
  /*< private >*/
  GObject parent_instance;
  GDBusObjectSkeletonPrivate *priv;
};

/**
 * GDBusObjectSkeletonClass:
 * @parent_class: The parent class.
 * @authorize_method: Signal class handler for the #GDBusObjectSkeleton::authorize-method signal.
 *
 * Class structure for #GDBusObjectSkeleton.
 *
 * Since: 2.30
 */
struct _GDBusObjectSkeletonClass
{
  GObjectClass parent_class;

  /* Signals */
  gboolean (*authorize_method) (GDBusObjectSkeleton       *object,
                                GDBusInterfaceSkeleton    *interface_,
                                GDBusMethodInvocation *invocation);

  /*< private >*/
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                g_dbus_object_skeleton_get_type                  (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GDBusObjectSkeleton *g_dbus_object_skeleton_new                       (const gchar            *object_path);
GLIB_AVAILABLE_IN_ALL
void                 g_dbus_object_skeleton_flush                     (GDBusObjectSkeleton    *object);
GLIB_AVAILABLE_IN_ALL
void                 g_dbus_object_skeleton_add_interface             (GDBusObjectSkeleton    *object,
                                                                       GDBusInterfaceSkeleton *interface_);
GLIB_AVAILABLE_IN_ALL
void                 g_dbus_object_skeleton_remove_interface          (GDBusObjectSkeleton    *object,
                                                                       GDBusInterfaceSkeleton *interface_);
GLIB_AVAILABLE_IN_ALL
void                 g_dbus_object_skeleton_remove_interface_by_name  (GDBusObjectSkeleton    *object,
                                                                       const gchar            *interface_name);
GLIB_AVAILABLE_IN_ALL
void                 g_dbus_object_skeleton_set_object_path           (GDBusObjectSkeleton    *object,
                                                                       const gchar            *object_path);

G_END_DECLS

#endif /* __G_DBUS_OBJECT_SKELETON_H */
