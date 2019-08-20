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

#ifndef __G_DRIVE_H__
#define __G_DRIVE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

/**
 * G_DRIVE_IDENTIFIER_KIND_UNIX_DEVICE:
 *
 * The string used to obtain a Unix device path with g_drive_get_identifier().
 *
 * Since: 2.58
 */
#define G_DRIVE_IDENTIFIER_KIND_UNIX_DEVICE "unix-device"

#define G_TYPE_DRIVE           (g_drive_get_type ())
#define G_DRIVE(obj)           (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_DRIVE, GDrive))
#define G_IS_DRIVE(obj)        (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_DRIVE))
#define G_DRIVE_GET_IFACE(obj) (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_DRIVE, GDriveIface))

/**
 * GDriveIface:
 * @g_iface: The parent interface.
 * @changed: Signal emitted when the drive is changed.
 * @disconnected: The removed signal that is emitted when the #GDrive have been disconnected. If the recipient is holding references to the object they should release them so the object can be finalized.
 * @eject_button: Signal emitted when the physical eject button (if any) of a drive have been pressed.
 * @get_name: Returns the name for the given #GDrive.
 * @get_icon: Returns a #GIcon for the given #GDrive.
 * @has_volumes: Returns %TRUE if the #GDrive has mountable volumes.
 * @get_volumes: Returns a list #GList of #GVolume for the #GDrive.
 * @is_removable: Returns %TRUE if the #GDrive and/or its media is considered removable by the user. Since 2.50.
 * @is_media_removable: Returns %TRUE if the #GDrive supports removal and insertion of media.
 * @has_media: Returns %TRUE if the #GDrive has media inserted.
 * @is_media_check_automatic: Returns %TRUE if the #GDrive is capabable of automatically detecting media changes.
 * @can_poll_for_media: Returns %TRUE if the #GDrive is capable of manually polling for media change.
 * @can_eject: Returns %TRUE if the #GDrive can eject media.
 * @eject: Ejects a #GDrive.
 * @eject_finish: Finishes an eject operation.
 * @poll_for_media: Poll for media insertion/removal on a #GDrive.
 * @poll_for_media_finish: Finishes a media poll operation.
 * @get_identifier: Returns the identifier of the given kind, or %NULL if
 *    the #GDrive doesn't have one.
 * @enumerate_identifiers: Returns an array strings listing the kinds
 *    of identifiers which the #GDrive has.
 * @get_start_stop_type: Gets a #GDriveStartStopType with details about starting/stopping the drive. Since 2.22.
 * @can_stop: Returns %TRUE if a #GDrive can be stopped. Since 2.22.
 * @stop: Stops a #GDrive. Since 2.22.
 * @stop_finish: Finishes a stop operation. Since 2.22.
 * @can_start: Returns %TRUE if a #GDrive can be started. Since 2.22.
 * @can_start_degraded: Returns %TRUE if a #GDrive can be started degraded. Since 2.22.
 * @start: Starts a #GDrive. Since 2.22.
 * @start_finish: Finishes a start operation. Since 2.22.
 * @stop_button: Signal emitted when the physical stop button (if any) of a drive have been pressed. Since 2.22.
 * @eject_with_operation: Starts ejecting a #GDrive using a #GMountOperation. Since 2.22.
 * @eject_with_operation_finish: Finishes an eject operation using a #GMountOperation. Since 2.22.
 * @get_sort_key: Gets a key used for sorting #GDrive instances or %NULL if no such key exists. Since 2.32.
 * @get_symbolic_icon: Returns a symbolic #GIcon for the given #GDrive. Since 2.34.
 *
 * Interface for creating #GDrive implementations.
 */
typedef struct _GDriveIface    GDriveIface;

struct _GDriveIface
{
  GTypeInterface g_iface;

  /* signals */
  void     (* changed)                  (GDrive              *drive);
  void     (* disconnected)             (GDrive              *drive);
  void     (* eject_button)             (GDrive              *drive);

  /* Virtual Table */
  char *   (* get_name)                 (GDrive              *drive);
  GIcon *  (* get_icon)                 (GDrive              *drive);
  gboolean (* has_volumes)              (GDrive              *drive);
  GList *  (* get_volumes)              (GDrive              *drive);
  gboolean (* is_media_removable)       (GDrive              *drive);
  gboolean (* has_media)                (GDrive              *drive);
  gboolean (* is_media_check_automatic) (GDrive              *drive);
  gboolean (* can_eject)                (GDrive              *drive);
  gboolean (* can_poll_for_media)       (GDrive              *drive);
  void     (* eject)                    (GDrive              *drive,
                                         GMountUnmountFlags   flags,
                                         GCancellable        *cancellable,
                                         GAsyncReadyCallback  callback,
                                         gpointer             user_data);
  gboolean (* eject_finish)             (GDrive              *drive,
                                         GAsyncResult        *result,
                                         GError             **error);
  void     (* poll_for_media)           (GDrive              *drive,
                                         GCancellable        *cancellable,
                                         GAsyncReadyCallback  callback,
                                         gpointer             user_data);
  gboolean (* poll_for_media_finish)    (GDrive              *drive,
                                         GAsyncResult        *result,
                                         GError             **error);

  char *   (* get_identifier)           (GDrive              *drive,
                                         const char          *kind);
  char **  (* enumerate_identifiers)    (GDrive              *drive);

  GDriveStartStopType (* get_start_stop_type) (GDrive        *drive);

  gboolean (* can_start)                (GDrive              *drive);
  gboolean (* can_start_degraded)       (GDrive              *drive);
  void     (* start)                    (GDrive              *drive,
                                         GDriveStartFlags     flags,
                                         GMountOperation     *mount_operation,
                                         GCancellable        *cancellable,
                                         GAsyncReadyCallback  callback,
                                         gpointer             user_data);
  gboolean (* start_finish)             (GDrive              *drive,
                                         GAsyncResult        *result,
                                         GError             **error);

  gboolean (* can_stop)                 (GDrive              *drive);
  void     (* stop)                     (GDrive              *drive,
                                         GMountUnmountFlags   flags,
                                         GMountOperation     *mount_operation,
                                         GCancellable        *cancellable,
                                         GAsyncReadyCallback  callback,
                                         gpointer             user_data);
  gboolean (* stop_finish)              (GDrive              *drive,
                                         GAsyncResult        *result,
                                         GError             **error);
  /* signal, not VFunc */
  void     (* stop_button)              (GDrive              *drive);

  void        (* eject_with_operation)      (GDrive              *drive,
                                             GMountUnmountFlags   flags,
                                             GMountOperation     *mount_operation,
                                             GCancellable        *cancellable,
                                             GAsyncReadyCallback  callback,
                                             gpointer             user_data);
  gboolean    (* eject_with_operation_finish) (GDrive            *drive,
                                             GAsyncResult        *result,
                                             GError             **error);

  const gchar * (* get_sort_key)        (GDrive              *drive);
  GIcon *       (* get_symbolic_icon)   (GDrive              *drive);
  gboolean      (* is_removable)        (GDrive              *drive);

};

GLIB_AVAILABLE_IN_ALL
GType    g_drive_get_type                 (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
char *   g_drive_get_name                 (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
GIcon *  g_drive_get_icon                 (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
GIcon *  g_drive_get_symbolic_icon        (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_has_volumes              (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
GList *  g_drive_get_volumes              (GDrive               *drive);
GLIB_AVAILABLE_IN_2_50
gboolean g_drive_is_removable             (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_is_media_removable       (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_has_media                (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_is_media_check_automatic (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_can_poll_for_media       (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_can_eject                (GDrive               *drive);
GLIB_DEPRECATED_FOR(g_drive_eject_with_operation)
void     g_drive_eject                    (GDrive               *drive,
                                           GMountUnmountFlags    flags,
                                           GCancellable         *cancellable,
                                           GAsyncReadyCallback   callback,
                                           gpointer              user_data);

GLIB_DEPRECATED_FOR(g_drive_eject_with_operation_finish)
gboolean g_drive_eject_finish             (GDrive               *drive,
                                           GAsyncResult         *result,
                                           GError              **error);
GLIB_AVAILABLE_IN_ALL
void     g_drive_poll_for_media           (GDrive               *drive,
                                           GCancellable         *cancellable,
                                           GAsyncReadyCallback   callback,
                                           gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_poll_for_media_finish    (GDrive               *drive,
                                           GAsyncResult         *result,
                                           GError              **error);
GLIB_AVAILABLE_IN_ALL
char *   g_drive_get_identifier           (GDrive              *drive,
                                           const char          *kind);
GLIB_AVAILABLE_IN_ALL
char **  g_drive_enumerate_identifiers    (GDrive              *drive);

GLIB_AVAILABLE_IN_ALL
GDriveStartStopType g_drive_get_start_stop_type (GDrive        *drive);

GLIB_AVAILABLE_IN_ALL
gboolean g_drive_can_start                (GDrive              *drive);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_can_start_degraded       (GDrive              *drive);
GLIB_AVAILABLE_IN_ALL
void     g_drive_start                    (GDrive              *drive,
                                           GDriveStartFlags     flags,
                                           GMountOperation     *mount_operation,
                                           GCancellable        *cancellable,
                                           GAsyncReadyCallback  callback,
                                           gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_start_finish             (GDrive               *drive,
                                           GAsyncResult         *result,
                                           GError              **error);

GLIB_AVAILABLE_IN_ALL
gboolean g_drive_can_stop                 (GDrive               *drive);
GLIB_AVAILABLE_IN_ALL
void     g_drive_stop                     (GDrive               *drive,
                                           GMountUnmountFlags    flags,
                                           GMountOperation      *mount_operation,
                                           GCancellable         *cancellable,
                                           GAsyncReadyCallback   callback,
                                           gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_drive_stop_finish              (GDrive               *drive,
                                           GAsyncResult         *result,
                                           GError              **error);

GLIB_AVAILABLE_IN_ALL
void        g_drive_eject_with_operation      (GDrive              *drive,
                                               GMountUnmountFlags   flags,
                                               GMountOperation     *mount_operation,
                                               GCancellable        *cancellable,
                                               GAsyncReadyCallback  callback,
                                               gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
gboolean    g_drive_eject_with_operation_finish (GDrive            *drive,
                                               GAsyncResult        *result,
                                               GError             **error);

GLIB_AVAILABLE_IN_2_32
const gchar *g_drive_get_sort_key         (GDrive               *drive);

G_END_DECLS

#endif /* __G_DRIVE_H__ */
