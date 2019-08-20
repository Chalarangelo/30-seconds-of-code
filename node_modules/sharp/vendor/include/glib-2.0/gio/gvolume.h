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
 *         David Zeuthen <davidz@redhat.com>
 */

#ifndef __G_VOLUME_H__
#define __G_VOLUME_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#ifndef G_DISABLE_DEPRECATED
/**
 * G_VOLUME_IDENTIFIER_KIND_HAL_UDI:
 *
 * The string used to obtain a Hal UDI with g_volume_get_identifier().
 *
 * Deprecated: 2.58: Do not use, HAL is deprecated.
 */
#define G_VOLUME_IDENTIFIER_KIND_HAL_UDI "hal-udi"
#endif /* G_DISABLE_DEPRECATED */

/**
 * G_VOLUME_IDENTIFIER_KIND_UNIX_DEVICE:
 *
 * The string used to obtain a Unix device path with g_volume_get_identifier().
 */
#define G_VOLUME_IDENTIFIER_KIND_UNIX_DEVICE "unix-device"

/**
 * G_VOLUME_IDENTIFIER_KIND_LABEL:
 *
 * The string used to obtain a filesystem label with g_volume_get_identifier().
 */
#define G_VOLUME_IDENTIFIER_KIND_LABEL "label"

/**
 * G_VOLUME_IDENTIFIER_KIND_UUID:
 *
 * The string used to obtain a UUID with g_volume_get_identifier().
 */
#define G_VOLUME_IDENTIFIER_KIND_UUID "uuid"

/**
 * G_VOLUME_IDENTIFIER_KIND_NFS_MOUNT:
 *
 * The string used to obtain a NFS mount with g_volume_get_identifier().
 */
#define G_VOLUME_IDENTIFIER_KIND_NFS_MOUNT "nfs-mount"

/**
 * G_VOLUME_IDENTIFIER_KIND_CLASS:
 *
 * The string used to obtain the volume class with g_volume_get_identifier().
 *
 * Known volume classes include `device`, `network`, and `loop`. Other
 * classes may be added in the future.
 *
 * This is intended to be used by applications to classify #GVolume
 * instances into different sections - for example a file manager or
 * file chooser can use this information to show `network` volumes under
 * a "Network" heading and `device` volumes under a "Devices" heading.
 */
#define G_VOLUME_IDENTIFIER_KIND_CLASS "class"


#define G_TYPE_VOLUME            (g_volume_get_type ())
#define G_VOLUME(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_VOLUME, GVolume))
#define G_IS_VOLUME(obj)         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_VOLUME))
#define G_VOLUME_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_VOLUME, GVolumeIface))

/**
 * GVolumeIface:
 * @g_iface: The parent interface.
 * @changed: Changed signal that is emitted when the volume's state has changed.
 * @removed: The removed signal that is emitted when the #GVolume have been removed. If the recipient is holding references to the object they should release them so the object can be finalized.
 * @get_name: Gets a string containing the name of the #GVolume.
 * @get_icon: Gets a #GIcon for the #GVolume.
 * @get_uuid: Gets the UUID for the #GVolume. The reference is typically based on the file system UUID for the mount in question and should be considered an opaque string. Returns %NULL if there is no UUID available.
 * @get_drive: Gets a #GDrive the volume is located on. Returns %NULL if the #GVolume is not associated with a #GDrive.
 * @get_mount: Gets a #GMount representing the mounted volume. Returns %NULL if the #GVolume is not mounted.
 * @can_mount: Returns %TRUE if the #GVolume can be mounted.
 * @can_eject: Checks if a #GVolume can be ejected.
 * @mount_fn: Mounts a given #GVolume. 
 *     #GVolume implementations must emit the #GMountOperation::aborted 
 *     signal before completing a mount operation that is aborted while 
 *     awaiting input from the user through a #GMountOperation instance.
 * @mount_finish: Finishes a mount operation.
 * @eject: Ejects a given #GVolume.
 * @eject_finish: Finishes an eject operation.
 * @get_identifier: Returns the [identifier][volume-identifier] of the given kind, or %NULL if
 *    the #GVolume doesn't have one.
 * @enumerate_identifiers: Returns an array strings listing the kinds
 *    of [identifiers][volume-identifier] which the #GVolume has.
 * @should_automount: Returns %TRUE if the #GVolume should be automatically mounted.
 * @get_activation_root: Returns the activation root for the #GVolume if it is known in advance or %NULL if
 *   it is not known.
 * @eject_with_operation: Starts ejecting a #GVolume using a #GMountOperation. Since 2.22.
 * @eject_with_operation_finish: Finishes an eject operation using a #GMountOperation. Since 2.22.
 * @get_sort_key: Gets a key used for sorting #GVolume instance or %NULL if no such key exists. Since 2.32.
 * @get_symbolic_icon: Gets a symbolic #GIcon for the #GVolume. Since 2.34.
 *
 * Interface for implementing operations for mountable volumes.
 **/
typedef struct _GVolumeIface    GVolumeIface;

struct _GVolumeIface
{
  GTypeInterface g_iface;

  /* signals */

  void        (* changed)               (GVolume             *volume);
  void        (* removed)               (GVolume             *volume);

  /* Virtual Table */

  char      * (* get_name)              (GVolume             *volume);
  GIcon     * (* get_icon)              (GVolume             *volume);
  char      * (* get_uuid)              (GVolume             *volume);
  GDrive    * (* get_drive)             (GVolume             *volume);
  GMount    * (* get_mount)             (GVolume             *volume);
  gboolean    (* can_mount)             (GVolume             *volume);
  gboolean    (* can_eject)             (GVolume             *volume);
  void        (* mount_fn)              (GVolume             *volume,
                                         GMountMountFlags     flags,
                                         GMountOperation     *mount_operation,
                                         GCancellable        *cancellable,
                                         GAsyncReadyCallback  callback,
                                         gpointer             user_data);
  gboolean    (* mount_finish)          (GVolume             *volume,
                                         GAsyncResult        *result,
                                         GError             **error);
  void        (* eject)                 (GVolume             *volume,
                                         GMountUnmountFlags   flags,
                                         GCancellable        *cancellable,
                                         GAsyncReadyCallback  callback,
                                         gpointer             user_data);
  gboolean    (* eject_finish)          (GVolume             *volume,
                                         GAsyncResult        *result,
                                         GError             **error);

  char      * (* get_identifier)        (GVolume             *volume,
                                         const char          *kind);
  char     ** (* enumerate_identifiers) (GVolume             *volume);

  gboolean    (* should_automount)      (GVolume             *volume);

  GFile     * (* get_activation_root)   (GVolume             *volume);

  void        (* eject_with_operation)      (GVolume             *volume,
                                             GMountUnmountFlags   flags,
                                             GMountOperation     *mount_operation,
                                             GCancellable        *cancellable,
                                             GAsyncReadyCallback  callback,
                                             gpointer             user_data);
  gboolean    (* eject_with_operation_finish) (GVolume           *volume,
                                             GAsyncResult        *result,
                                             GError             **error);

  const gchar * (* get_sort_key)        (GVolume             *volume);
  GIcon       * (* get_symbolic_icon)   (GVolume             *volume);
};

GLIB_AVAILABLE_IN_ALL
GType    g_volume_get_type              (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
char *   g_volume_get_name              (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
GIcon *  g_volume_get_icon              (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
GIcon *  g_volume_get_symbolic_icon     (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
char *   g_volume_get_uuid              (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
GDrive * g_volume_get_drive             (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
GMount * g_volume_get_mount             (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
gboolean g_volume_can_mount             (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
gboolean g_volume_can_eject             (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
gboolean g_volume_should_automount      (GVolume              *volume);
GLIB_AVAILABLE_IN_ALL
void     g_volume_mount                 (GVolume              *volume,
					 GMountMountFlags      flags,
					 GMountOperation      *mount_operation,
					 GCancellable         *cancellable,
					 GAsyncReadyCallback   callback,
					 gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_volume_mount_finish          (GVolume              *volume,
					 GAsyncResult         *result,
					 GError              **error);
GLIB_DEPRECATED_FOR(g_volume_eject_with_operation)
void     g_volume_eject                 (GVolume              *volume,
                                         GMountUnmountFlags    flags,
                                         GCancellable         *cancellable,
                                         GAsyncReadyCallback   callback,
                                         gpointer              user_data);

GLIB_DEPRECATED_FOR(g_volume_eject_with_operation_finish)
gboolean g_volume_eject_finish          (GVolume              *volume,
                                         GAsyncResult         *result,
                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
char *   g_volume_get_identifier        (GVolume              *volume,
					 const char           *kind);
GLIB_AVAILABLE_IN_ALL
char **  g_volume_enumerate_identifiers (GVolume              *volume);

GLIB_AVAILABLE_IN_ALL
GFile *  g_volume_get_activation_root   (GVolume              *volume);

GLIB_AVAILABLE_IN_ALL
void        g_volume_eject_with_operation     (GVolume             *volume,
                                               GMountUnmountFlags   flags,
                                               GMountOperation     *mount_operation,
                                               GCancellable        *cancellable,
                                               GAsyncReadyCallback  callback,
                                               gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
gboolean    g_volume_eject_with_operation_finish (GVolume          *volume,
                                               GAsyncResult        *result,
                                               GError             **error);

GLIB_AVAILABLE_IN_2_32
const gchar *g_volume_get_sort_key            (GVolume              *volume);

G_END_DECLS

#endif /* __G_VOLUME_H__ */
