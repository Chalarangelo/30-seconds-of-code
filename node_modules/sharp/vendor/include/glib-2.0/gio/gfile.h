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
 */

#ifndef __G_FILE_H__
#define __G_FILE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_FILE            (g_file_get_type ())
#define G_FILE(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_FILE, GFile))
#define G_IS_FILE(obj)	       (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_FILE))
#define G_FILE_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_FILE, GFileIface))

#if 0
/**
 * GFile:
 *
 * A handle to an object implementing the #GFileIface interface.
 * Generally stores a location within the file system. Handles do not
 * necessarily represent files or directories that currently exist.
 **/
typedef struct _GFile         		GFile; /* Dummy typedef */
#endif
typedef struct _GFileIface    		GFileIface;


/**
 * GFileIface:
 * @g_iface: The parent interface.
 * @dup: Duplicates a #GFile.
 * @hash: Creates a hash of a #GFile.
 * @equal: Checks equality of two given #GFiles.
 * @is_native: Checks to see if a file is native to the system.
 * @has_uri_scheme: Checks to see if a #GFile has a given URI scheme.
 * @get_uri_scheme: Gets the URI scheme for a #GFile.
 * @get_basename: Gets the basename for a given #GFile.
 * @get_path: Gets the current path within a #GFile.
 * @get_uri: Gets a URI for the path within a #GFile.
 * @get_parse_name: Gets the parsed name for the #GFile.
 * @get_parent: Gets the parent directory for the #GFile.
 * @prefix_matches: Checks whether a #GFile contains a specified file.
 * @get_relative_path: Gets the path for a #GFile relative to a given path.
 * @resolve_relative_path: Resolves a relative path for a #GFile to an absolute path.
 * @get_child_for_display_name: Gets the child #GFile for a given display name.
 * @enumerate_children: Gets a #GFileEnumerator with the children of a #GFile.
 * @enumerate_children_async: Asynchronously gets a #GFileEnumerator with the children of a #GFile.
 * @enumerate_children_finish: Finishes asynchronously enumerating the children.
 * @query_info: Gets the #GFileInfo for a #GFile.
 * @query_info_async: Asynchronously gets the #GFileInfo for a #GFile.
 * @query_info_finish: Finishes an asynchronous query info operation.
 * @query_filesystem_info: Gets a #GFileInfo for the file system #GFile is on.
 * @query_filesystem_info_async: Asynchronously gets a #GFileInfo for the file system #GFile is on.
 * @query_filesystem_info_finish: Finishes asynchronously getting the file system info.
 * @find_enclosing_mount: Gets a #GMount for the #GFile.
 * @find_enclosing_mount_async: Asynchronously gets the #GMount for a #GFile.
 * @find_enclosing_mount_finish: Finishes asynchronously getting the volume.
 * @set_display_name: Sets the display name for a #GFile.
 * @set_display_name_async: Asynchronously sets a #GFile's display name.
 * @set_display_name_finish: Finishes asynchronously setting a #GFile's display name.
 * @query_settable_attributes: Returns a list of #GFileAttributes that can be set.
 * @_query_settable_attributes_async: Asynchronously gets a list of #GFileAttributes that can be set.
 * @_query_settable_attributes_finish: Finishes asynchronously querying settable attributes.
 * @query_writable_namespaces: Returns a list of #GFileAttribute namespaces that are writable.
 * @_query_writable_namespaces_async: Asynchronously gets a list of #GFileAttribute namespaces that are writable.
 * @_query_writable_namespaces_finish: Finishes asynchronously querying the writable namespaces.
 * @set_attribute: Sets a #GFileAttribute.
 * @set_attributes_from_info: Sets a #GFileAttribute with information from a #GFileInfo.
 * @set_attributes_async: Asynchronously sets a file's attributes.
 * @set_attributes_finish: Finishes setting a file's attributes asynchronously.
 * @read_fn: Reads a file asynchronously.
 * @read_async: Asynchronously reads a file.
 * @read_finish: Finishes asynchronously reading a file.
 * @append_to: Writes to the end of a file.
 * @append_to_async: Asynchronously writes to the end of a file.
 * @append_to_finish: Finishes an asynchronous file append operation.
 * @create: Creates a new file.
 * @create_async: Asynchronously creates a file.
 * @create_finish: Finishes asynchronously creating a file.
 * @replace: Replaces the contents of a file.
 * @replace_async: Asynchronously replaces the contents of a file.
 * @replace_finish: Finishes asynchronously replacing a file.
 * @delete_file: Deletes a file.
 * @delete_file_async: Asynchronously deletes a file.
 * @delete_file_finish: Finishes an asynchronous delete.
 * @trash: Sends a #GFile to the Trash location.
 * @trash_async: Asynchronously sends a #GFile to the Trash location.
 * @trash_finish: Finishes an asynchronous file trashing operation.
 * @make_directory: Makes a directory.
 * @make_directory_async: Asynchronously makes a directory.
 * @make_directory_finish: Finishes making a directory asynchronously.
 * @make_symbolic_link: Makes a symbolic link.
 * @_make_symbolic_link_async: Asynchronously makes a symbolic link
 * @_make_symbolic_link_finish: Finishes making a symbolic link asynchronously.
 * @copy: Copies a file.
 * @copy_async: Asynchronously copies a file.
 * @copy_finish: Finishes an asynchronous copy operation.
 * @move: Moves a file.
 * @_move_async: Asynchronously moves a file.
 * @_move_finish: Finishes an asynchronous move operation.
 * @mount_mountable: Mounts a mountable object.
 * @mount_mountable_finish: Finishes a mounting operation.
 * @unmount_mountable: Unmounts a mountable object.
 * @unmount_mountable_finish: Finishes an unmount operation.
 * @eject_mountable: Ejects a mountable.
 * @eject_mountable_finish: Finishes an eject operation.
 * @mount_enclosing_volume: Mounts a specified location.
 * @mount_enclosing_volume_finish: Finishes mounting a specified location.
 * @monitor_dir: Creates a #GFileMonitor for the location.
 * @monitor_file: Creates a #GFileMonitor for the location.
 * @open_readwrite: Open file read/write. Since 2.22.
 * @open_readwrite_async: Asynchronously opens file read/write. Since 2.22.
 * @open_readwrite_finish: Finishes an asynchronous open read/write. Since 2.22.
 * @create_readwrite: Creates file read/write. Since 2.22.
 * @create_readwrite_async: Asynchronously creates file read/write. Since 2.22.
 * @create_readwrite_finish: Finishes an asynchronous creates read/write. Since 2.22.
 * @replace_readwrite: Replaces file read/write. Since 2.22.
 * @replace_readwrite_async: Asynchronously replaces file read/write. Since 2.22.
 * @replace_readwrite_finish: Finishes an asynchronous replace read/write. Since 2.22.
 * @start_mountable: Starts a mountable object. Since 2.22.
 * @start_mountable_finish: Finishes an start operation. Since 2.22.
 * @stop_mountable: Stops a mountable. Since 2.22.
 * @stop_mountable_finish: Finishes an stop operation. Since 2.22.
 * @supports_thread_contexts: a boolean that indicates whether the #GFile implementation supports thread-default contexts. Since 2.22.
 * @unmount_mountable_with_operation: Unmounts a mountable object using a #GMountOperation. Since 2.22.
 * @unmount_mountable_with_operation_finish: Finishes an unmount operation using a #GMountOperation. Since 2.22.
 * @eject_mountable_with_operation: Ejects a mountable object using a #GMountOperation. Since 2.22.
 * @eject_mountable_with_operation_finish: Finishes an eject operation using a #GMountOperation. Since 2.22.
 * @poll_mountable: Polls a mountable object for media changes. Since 2.22.
 * @poll_mountable_finish: Finishes an poll operation for media changes. Since 2.22.
 * @measure_disk_usage: Recursively measures the disk usage of @file. Since 2.38
 * @measure_disk_usage_async: Asynchronously recursively measures the disk usage of @file. Since 2.38
 * @measure_disk_usage_finish: Finishes an asynchronous recursive measurement of the disk usage of @file. Since 2.38
 *
 * An interface for writing VFS file handles.
 **/
struct _GFileIface
{
  GTypeInterface g_iface;

  /* Virtual Table */

  GFile *             (* dup)                         (GFile         *file);
  guint               (* hash)                        (GFile         *file);
  gboolean            (* equal)                       (GFile         *file1,
                                                       GFile         *file2);
  gboolean            (* is_native)                   (GFile         *file);
  gboolean            (* has_uri_scheme)              (GFile         *file,
                                                       const char    *uri_scheme);
  char *              (* get_uri_scheme)              (GFile         *file);
  char *              (* get_basename)                (GFile         *file);
  char *              (* get_path)                    (GFile         *file);
  char *              (* get_uri)                     (GFile         *file);
  char *              (* get_parse_name)              (GFile         *file);
  GFile *             (* get_parent)                  (GFile         *file);
  gboolean            (* prefix_matches)              (GFile         *prefix,
                                                       GFile         *file);
  char *              (* get_relative_path)           (GFile         *parent,
                                                       GFile         *descendant);
  GFile *             (* resolve_relative_path)       (GFile        *file,
                                                       const char   *relative_path);
  GFile *             (* get_child_for_display_name)  (GFile        *file,
                                                       const char   *display_name,
                                                       GError      **error);

  GFileEnumerator *   (* enumerate_children)          (GFile                *file,
                                                       const char           *attributes,
                                                       GFileQueryInfoFlags   flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* enumerate_children_async)    (GFile                *file,
                                                       const char           *attributes,
                                                       GFileQueryInfoFlags   flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileEnumerator *   (* enumerate_children_finish)   (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFileInfo *         (* query_info)                  (GFile                *file,
                                                       const char           *attributes,
                                                       GFileQueryInfoFlags   flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* query_info_async)            (GFile                *file,
                                                       const char           *attributes,
                                                       GFileQueryInfoFlags   flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileInfo *         (* query_info_finish)           (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFileInfo *         (* query_filesystem_info)       (GFile                *file,
                                                       const char           *attributes,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* query_filesystem_info_async) (GFile                *file,
                                                       const char           *attributes,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileInfo *         (* query_filesystem_info_finish)(GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GMount *            (* find_enclosing_mount)        (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* find_enclosing_mount_async)  (GFile                *file,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GMount *            (* find_enclosing_mount_finish) (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFile *             (* set_display_name)            (GFile                *file,
                                                       const char           *display_name,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* set_display_name_async)      (GFile                *file,
                                                       const char           *display_name,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFile *             (* set_display_name_finish)     (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFileAttributeInfoList * (* query_settable_attributes)    (GFile          *file,
                                                             GCancellable   *cancellable,
                                                             GError        **error);
  void                (* _query_settable_attributes_async)  (void);
  void                (* _query_settable_attributes_finish) (void);

  GFileAttributeInfoList * (* query_writable_namespaces)    (GFile          *file,
                                                             GCancellable   *cancellable,
                                                             GError        **error);
  void                (* _query_writable_namespaces_async)  (void);
  void                (* _query_writable_namespaces_finish) (void);

  gboolean            (* set_attribute)               (GFile                *file,
                                                       const char           *attribute,
                                                       GFileAttributeType    type,
                                                       gpointer              value_p,
                                                       GFileQueryInfoFlags   flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  gboolean            (* set_attributes_from_info)    (GFile                *file,
                                                       GFileInfo            *info,
                                                       GFileQueryInfoFlags   flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* set_attributes_async)        (GFile                *file,
                                                       GFileInfo            *info,
                                                       GFileQueryInfoFlags   flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* set_attributes_finish)       (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GFileInfo           **info,
                                                       GError              **error);

  GFileInputStream *  (* read_fn)                     (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* read_async)                  (GFile                *file,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileInputStream *  (* read_finish)                 (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFileOutputStream * (* append_to)                   (GFile                *file,
                                                       GFileCreateFlags      flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* append_to_async)             (GFile                *file,
                                                       GFileCreateFlags      flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileOutputStream * (* append_to_finish)            (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFileOutputStream * (* create)                      (GFile                *file,
                                                       GFileCreateFlags      flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* create_async)                (GFile                *file,
                                                       GFileCreateFlags      flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileOutputStream * (* create_finish)               (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  GFileOutputStream * (* replace)                     (GFile                *file,
                                                       const char           *etag,
                                                       gboolean              make_backup,
                                                       GFileCreateFlags      flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* replace_async)               (GFile                *file,
                                                       const char           *etag,
                                                       gboolean              make_backup,
                                                       GFileCreateFlags      flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileOutputStream * (* replace_finish)              (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  gboolean            (* delete_file)                 (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* delete_file_async)           (GFile                *file,
						       int                   io_priority,
						       GCancellable         *cancellable,
						       GAsyncReadyCallback   callback,
						       gpointer              user_data);
  gboolean            (* delete_file_finish)          (GFile                *file,
						       GAsyncResult         *result,
						       GError              **error);

  gboolean            (* trash)                       (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* trash_async)                 (GFile                *file,
						       int                   io_priority,
						       GCancellable         *cancellable,
						       GAsyncReadyCallback   callback,
						       gpointer              user_data);
  gboolean            (* trash_finish)                (GFile                *file,
						       GAsyncResult         *result,
						       GError              **error);

  gboolean            (* make_directory)              (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* make_directory_async)        (GFile                *file,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* make_directory_finish)       (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  gboolean            (* make_symbolic_link)          (GFile                *file,
                                                       const char           *symlink_value,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* _make_symbolic_link_async)   (void);
  void                (* _make_symbolic_link_finish)  (void);

  gboolean            (* copy)                        (GFile                *source,
                                                       GFile                *destination,
                                                       GFileCopyFlags        flags,
                                                       GCancellable         *cancellable,
                                                       GFileProgressCallback progress_callback,
                                                       gpointer              progress_callback_data,
                                                       GError              **error);
  void                (* copy_async)                  (GFile                *source,
                                                       GFile                *destination,
                                                       GFileCopyFlags        flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GFileProgressCallback progress_callback,
                                                       gpointer              progress_callback_data,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* copy_finish)                 (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  gboolean            (* move)                        (GFile                *source,
                                                       GFile                *destination,
                                                       GFileCopyFlags        flags,
                                                       GCancellable         *cancellable,
                                                       GFileProgressCallback progress_callback,
                                                       gpointer              progress_callback_data,
                                                       GError              **error);
  void                (* _move_async)                 (void);
  void                (* _move_finish)                (void);

  void                (* mount_mountable)             (GFile                *file,
                                                       GMountMountFlags      flags,
                                                       GMountOperation      *mount_operation,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFile *             (* mount_mountable_finish)      (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  void                (* unmount_mountable)           (GFile                *file,
                                                       GMountUnmountFlags    flags,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* unmount_mountable_finish)    (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  void                (* eject_mountable)             (GFile                *file,
                                                       GMountUnmountFlags    flags,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* eject_mountable_finish)      (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  void                (* mount_enclosing_volume)      (GFile                *location,
                                                       GMountMountFlags      flags,
                                                       GMountOperation      *mount_operation,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean         (* mount_enclosing_volume_finish)  (GFile                *location,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  GFileMonitor *      (* monitor_dir)                 (GFile                *file,
                                                       GFileMonitorFlags     flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  GFileMonitor *      (* monitor_file)                (GFile                *file,
                                                       GFileMonitorFlags     flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);

  GFileIOStream *     (* open_readwrite)              (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* open_readwrite_async)        (GFile                *file,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileIOStream *     (* open_readwrite_finish)       (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);
  GFileIOStream *     (* create_readwrite)            (GFile                *file,
						       GFileCreateFlags      flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* create_readwrite_async)      (GFile                *file,
						       GFileCreateFlags      flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileIOStream *     (* create_readwrite_finish)      (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);
  GFileIOStream *     (* replace_readwrite)           (GFile                *file,
                                                       const char           *etag,
                                                       gboolean              make_backup,
                                                       GFileCreateFlags      flags,
                                                       GCancellable         *cancellable,
                                                       GError              **error);
  void                (* replace_readwrite_async)     (GFile                *file,
                                                       const char           *etag,
                                                       gboolean              make_backup,
                                                       GFileCreateFlags      flags,
                                                       int                   io_priority,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  GFileIOStream *     (* replace_readwrite_finish)    (GFile                *file,
                                                       GAsyncResult         *res,
                                                       GError              **error);

  void                (* start_mountable)             (GFile                *file,
                                                       GDriveStartFlags      flags,
                                                       GMountOperation      *start_operation,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* start_mountable_finish)      (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  void                (* stop_mountable)              (GFile                *file,
                                                       GMountUnmountFlags    flags,
                                                       GMountOperation      *mount_operation,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* stop_mountable_finish)       (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  gboolean            supports_thread_contexts;

  void                (* unmount_mountable_with_operation) (GFile           *file,
                                                       GMountUnmountFlags    flags,
                                                       GMountOperation      *mount_operation,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* unmount_mountable_with_operation_finish) (GFile    *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  void                (* eject_mountable_with_operation) (GFile             *file,
                                                       GMountUnmountFlags    flags,
                                                       GMountOperation      *mount_operation,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* eject_mountable_with_operation_finish) (GFile      *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  void                (* poll_mountable)              (GFile                *file,
                                                       GCancellable         *cancellable,
                                                       GAsyncReadyCallback   callback,
                                                       gpointer              user_data);
  gboolean            (* poll_mountable_finish)       (GFile                *file,
                                                       GAsyncResult         *result,
                                                       GError              **error);

  gboolean            (* measure_disk_usage)          (GFile                         *file,
                                                       GFileMeasureFlags              flags,
                                                       GCancellable                  *cancellable,
                                                       GFileMeasureProgressCallback   progress_callback,
                                                       gpointer                       progress_data,
                                                       guint64                       *disk_usage,
                                                       guint64                       *num_dirs,
                                                       guint64                       *num_files,
                                                       GError                       **error);
  void                (* measure_disk_usage_async)    (GFile                         *file,
                                                       GFileMeasureFlags              flags,
                                                       gint                           io_priority,
                                                       GCancellable                  *cancellable,
                                                       GFileMeasureProgressCallback   progress_callback,
                                                       gpointer                       progress_data,
                                                       GAsyncReadyCallback            callback,
                                                       gpointer                       user_data);
  gboolean            (* measure_disk_usage_finish)   (GFile                         *file,
                                                       GAsyncResult                  *result,
                                                       guint64                       *disk_usage,
                                                       guint64                       *num_dirs,
                                                       guint64                       *num_files,
                                                       GError                       **error);
};

GLIB_AVAILABLE_IN_ALL
GType                   g_file_get_type                   (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_new_for_path               (const char                 *path);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_new_for_uri                (const char                 *uri);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_new_for_commandline_arg    (const char                 *arg);
GLIB_AVAILABLE_IN_2_36
GFile *                 g_file_new_for_commandline_arg_and_cwd (const gchar           *arg,
                                                                const gchar           *cwd);
GLIB_AVAILABLE_IN_2_32
GFile *                 g_file_new_tmp                    (const char                 *tmpl,
                                                           GFileIOStream             **iostream,
                                                           GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_parse_name                 (const char                 *parse_name);
GLIB_AVAILABLE_IN_2_56
GFile *                 g_file_new_build_filename         (const gchar                *first_element,
                                                           ...) G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_dup                        (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
guint                   g_file_hash                       (gconstpointer               file);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_equal                      (GFile                      *file1,
							   GFile                      *file2);
GLIB_AVAILABLE_IN_ALL
char *                  g_file_get_basename               (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
char *                  g_file_get_path                   (GFile                      *file);
GLIB_AVAILABLE_IN_2_56
const char *            g_file_peek_path                  (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
char *                  g_file_get_uri                    (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
char *                  g_file_get_parse_name             (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_get_parent                 (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_has_parent                 (GFile                      *file,
                                                           GFile                      *parent);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_get_child                  (GFile                      *file,
							   const char                 *name);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_get_child_for_display_name (GFile                      *file,
							   const char                 *display_name,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_has_prefix                 (GFile                      *file,
							   GFile                      *prefix);
GLIB_AVAILABLE_IN_ALL
char *                  g_file_get_relative_path          (GFile                      *parent,
							   GFile                      *descendant);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_resolve_relative_path      (GFile                      *file,
							   const char                 *relative_path);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_is_native                  (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_has_uri_scheme             (GFile                      *file,
							   const char                 *uri_scheme);
GLIB_AVAILABLE_IN_ALL
char *                  g_file_get_uri_scheme             (GFile                      *file);
GLIB_AVAILABLE_IN_ALL
GFileInputStream *      g_file_read                       (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_read_async                 (GFile                      *file,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileInputStream *      g_file_read_finish                (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileOutputStream *     g_file_append_to                  (GFile                      *file,
							   GFileCreateFlags             flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileOutputStream *     g_file_create                     (GFile                      *file,
							   GFileCreateFlags             flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileOutputStream *     g_file_replace                    (GFile                      *file,
							   const char                 *etag,
							   gboolean                    make_backup,
							   GFileCreateFlags            flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_append_to_async            (GFile                      *file,
							   GFileCreateFlags            flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileOutputStream *     g_file_append_to_finish           (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_create_async               (GFile                      *file,
							   GFileCreateFlags            flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileOutputStream *     g_file_create_finish              (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_replace_async              (GFile                      *file,
							   const char                 *etag,
							   gboolean                    make_backup,
							   GFileCreateFlags            flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileOutputStream *     g_file_replace_finish             (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileIOStream *         g_file_open_readwrite             (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_open_readwrite_async       (GFile                      *file,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileIOStream *         g_file_open_readwrite_finish      (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileIOStream *         g_file_create_readwrite           (GFile                      *file,
							   GFileCreateFlags            flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_create_readwrite_async     (GFile                      *file,
							   GFileCreateFlags            flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileIOStream *         g_file_create_readwrite_finish    (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileIOStream *         g_file_replace_readwrite          (GFile                      *file,
							   const char                 *etag,
							   gboolean                    make_backup,
							   GFileCreateFlags            flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_replace_readwrite_async    (GFile                      *file,
							   const char                 *etag,
							   gboolean                    make_backup,
							   GFileCreateFlags            flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileIOStream *         g_file_replace_readwrite_finish   (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_query_exists               (GFile                      *file,
							   GCancellable               *cancellable);
GLIB_AVAILABLE_IN_ALL
GFileType               g_file_query_file_type            (GFile                      *file,
                                                           GFileQueryInfoFlags         flags,
                                                           GCancellable               *cancellable);
GLIB_AVAILABLE_IN_ALL
GFileInfo *             g_file_query_info                 (GFile                      *file,
							   const char                 *attributes,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_query_info_async           (GFile                      *file,
							   const char                 *attributes,
							   GFileQueryInfoFlags         flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileInfo *             g_file_query_info_finish          (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileInfo *             g_file_query_filesystem_info      (GFile                      *file,
							   const char                 *attributes,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_query_filesystem_info_async (GFile                      *file,
							   const char                 *attributes,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileInfo *             g_file_query_filesystem_info_finish (GFile                      *file,
                                                           GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GMount *                g_file_find_enclosing_mount       (GFile                      *file,
                                                           GCancellable               *cancellable,
                                                           GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_find_enclosing_mount_async (GFile                      *file,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GMount *                g_file_find_enclosing_mount_finish (GFile                     *file,
							    GAsyncResult              *res,
							    GError                   **error);
GLIB_AVAILABLE_IN_ALL
GFileEnumerator *       g_file_enumerate_children         (GFile                      *file,
							   const char                 *attributes,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_enumerate_children_async   (GFile                      *file,
							   const char                 *attributes,
							   GFileQueryInfoFlags         flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFileEnumerator *       g_file_enumerate_children_finish  (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_set_display_name           (GFile                      *file,
							   const char                 *display_name,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_set_display_name_async     (GFile                      *file,
							   const char                 *display_name,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_set_display_name_finish    (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_delete                     (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);

GLIB_AVAILABLE_IN_2_34
void                    g_file_delete_async               (GFile                      *file,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);

GLIB_AVAILABLE_IN_2_34
gboolean                g_file_delete_finish              (GFile                      *file,
							   GAsyncResult               *result,
							   GError                    **error);

GLIB_AVAILABLE_IN_ALL
gboolean                g_file_trash                      (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);

GLIB_AVAILABLE_IN_2_38
void                    g_file_trash_async                (GFile                      *file,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);

GLIB_AVAILABLE_IN_2_38
gboolean                g_file_trash_finish               (GFile                      *file,
							   GAsyncResult               *result,
							   GError                    **error);

GLIB_AVAILABLE_IN_ALL
gboolean                g_file_copy                       (GFile                      *source,
							   GFile                      *destination,
							   GFileCopyFlags              flags,
							   GCancellable               *cancellable,
							   GFileProgressCallback       progress_callback,
							   gpointer                    progress_callback_data,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_copy_async                 (GFile                      *source,
							   GFile                      *destination,
							   GFileCopyFlags              flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GFileProgressCallback       progress_callback,
							   gpointer                    progress_callback_data,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_copy_finish                (GFile                      *file,
							   GAsyncResult               *res,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_move                       (GFile                      *source,
							   GFile                      *destination,
							   GFileCopyFlags              flags,
							   GCancellable               *cancellable,
							   GFileProgressCallback       progress_callback,
							   gpointer                    progress_callback_data,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_make_directory             (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_2_38
void                    g_file_make_directory_async       (GFile                      *file,
                                                           int                         io_priority,
                                                           GCancellable               *cancellable,
                                                           GAsyncReadyCallback         callback,
                                                           gpointer                    user_data);
GLIB_AVAILABLE_IN_2_38
gboolean                g_file_make_directory_finish      (GFile                      *file,
                                                           GAsyncResult               *result,
                                                           GError                    **error);

GLIB_AVAILABLE_IN_ALL
gboolean                g_file_make_directory_with_parents (GFile                     *file,
		                                           GCancellable               *cancellable,
		                                           GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_make_symbolic_link         (GFile                      *file,
							   const char                 *symlink_value,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileAttributeInfoList *g_file_query_settable_attributes  (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
GFileAttributeInfoList *g_file_query_writable_namespaces  (GFile                      *file,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute              (GFile                      *file,
							   const char                 *attribute,
							   GFileAttributeType          type,
							   gpointer                    value_p,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attributes_from_info   (GFile                      *file,
							   GFileInfo                  *info,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_set_attributes_async       (GFile                      *file,
							   GFileInfo                  *info,
							   GFileQueryInfoFlags         flags,
							   int                         io_priority,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attributes_finish      (GFile                      *file,
							   GAsyncResult               *result,
							   GFileInfo                 **info,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute_string       (GFile                      *file,
							   const char                 *attribute,
							   const char                 *value,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute_byte_string  (GFile                      *file,
							   const char                 *attribute,
							   const char                 *value,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute_uint32       (GFile                      *file,
							   const char                 *attribute,
							   guint32                     value,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute_int32        (GFile                      *file,
							   const char                 *attribute,
							   gint32                      value,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute_uint64       (GFile                      *file,
							   const char                 *attribute,
							   guint64                     value,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_set_attribute_int64        (GFile                      *file,
							   const char                 *attribute,
							   gint64                      value,
							   GFileQueryInfoFlags         flags,
							   GCancellable               *cancellable,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_mount_enclosing_volume     (GFile                      *location,
							   GMountMountFlags            flags,
							   GMountOperation            *mount_operation,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_mount_enclosing_volume_finish (GFile                      *location,
							   GAsyncResult               *result,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_mount_mountable            (GFile                      *file,
							   GMountMountFlags            flags,
							   GMountOperation            *mount_operation,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
GFile *                 g_file_mount_mountable_finish     (GFile                      *file,
							   GAsyncResult               *result,
							   GError                    **error);
GLIB_DEPRECATED_FOR(g_file_unmount_mountable_with_operation)
void                    g_file_unmount_mountable          (GFile                      *file,
                                                           GMountUnmountFlags          flags,
                                                           GCancellable               *cancellable,
                                                           GAsyncReadyCallback         callback,
                                                           gpointer                    user_data);

GLIB_DEPRECATED_FOR(g_file_unmount_mountable_with_operation_finish)
gboolean                g_file_unmount_mountable_finish   (GFile                      *file,
                                                           GAsyncResult               *result,
                                                           GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_unmount_mountable_with_operation (GFile                *file,
							   GMountUnmountFlags          flags,
							   GMountOperation            *mount_operation,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_unmount_mountable_with_operation_finish (GFile         *file,
							   GAsyncResult               *result,
							   GError                    **error);
GLIB_DEPRECATED_FOR(g_file_eject_mountable_with_operation)
void                    g_file_eject_mountable            (GFile                      *file,
                                                           GMountUnmountFlags          flags,
                                                           GCancellable               *cancellable,
                                                           GAsyncReadyCallback         callback,
                                                           gpointer                    user_data);

GLIB_DEPRECATED_FOR(g_file_eject_mountable_with_operation_finish)
gboolean                g_file_eject_mountable_finish     (GFile                      *file,
                                                           GAsyncResult               *result,
                                                           GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_eject_mountable_with_operation (GFile                  *file,
							   GMountUnmountFlags          flags,
							   GMountOperation            *mount_operation,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_eject_mountable_with_operation_finish (GFile           *file,
							   GAsyncResult               *result,
							   GError                    **error);

GLIB_AVAILABLE_IN_ALL
gboolean                g_file_copy_attributes            (GFile                      *source,
							   GFile                      *destination,
							   GFileCopyFlags              flags,
							   GCancellable               *cancellable,
							   GError                    **error);


GLIB_AVAILABLE_IN_ALL
GFileMonitor*           g_file_monitor_directory          (GFile                  *file,
							   GFileMonitorFlags       flags,
							   GCancellable           *cancellable,
							   GError                **error);
GLIB_AVAILABLE_IN_ALL
GFileMonitor*           g_file_monitor_file               (GFile                  *file,
							   GFileMonitorFlags       flags,
							   GCancellable           *cancellable,
							   GError                **error);
GLIB_AVAILABLE_IN_ALL
GFileMonitor*           g_file_monitor                    (GFile                  *file,
							   GFileMonitorFlags       flags,
							   GCancellable           *cancellable,
							   GError                **error);

GLIB_AVAILABLE_IN_2_38
gboolean                g_file_measure_disk_usage         (GFile                         *file,
                                                           GFileMeasureFlags              flags,
                                                           GCancellable                  *cancellable,
                                                           GFileMeasureProgressCallback   progress_callback,
                                                           gpointer                       progress_data,
                                                           guint64                       *disk_usage,
                                                           guint64                       *num_dirs,
                                                           guint64                       *num_files,
                                                           GError                       **error);

GLIB_AVAILABLE_IN_2_38
void                    g_file_measure_disk_usage_async   (GFile                         *file,
                                                           GFileMeasureFlags              flags,
                                                           gint                           io_priority,
                                                           GCancellable                  *cancellable,
                                                           GFileMeasureProgressCallback   progress_callback,
                                                           gpointer                       progress_data,
                                                           GAsyncReadyCallback            callback,
                                                           gpointer                       user_data);

GLIB_AVAILABLE_IN_2_38
gboolean                g_file_measure_disk_usage_finish  (GFile                         *file,
                                                           GAsyncResult                  *result,
                                                           guint64                       *disk_usage,
                                                           guint64                       *num_dirs,
                                                           guint64                       *num_files,
                                                           GError                       **error);

GLIB_AVAILABLE_IN_ALL
void                    g_file_start_mountable            (GFile                      *file,
							   GDriveStartFlags            flags,
							   GMountOperation            *start_operation,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_start_mountable_finish     (GFile                      *file,
							   GAsyncResult               *result,
							   GError                    **error);
GLIB_AVAILABLE_IN_ALL
void                    g_file_stop_mountable             (GFile                      *file,
							   GMountUnmountFlags          flags,
                                                           GMountOperation            *mount_operation,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_stop_mountable_finish      (GFile                      *file,
							   GAsyncResult               *result,
							   GError                    **error);

GLIB_AVAILABLE_IN_ALL
void                    g_file_poll_mountable             (GFile                      *file,
							   GCancellable               *cancellable,
							   GAsyncReadyCallback         callback,
							   gpointer                    user_data);
GLIB_AVAILABLE_IN_ALL
gboolean                g_file_poll_mountable_finish      (GFile                      *file,
							   GAsyncResult               *result,
							   GError                    **error);

/* Utilities */

GLIB_AVAILABLE_IN_ALL
GAppInfo *g_file_query_default_handler       (GFile                  *file,
					      GCancellable           *cancellable,
					      GError                **error);
GLIB_AVAILABLE_IN_2_60
void      g_file_query_default_handler_async (GFile                  *file,
                                              int                     io_priority,
                                              GCancellable           *cancellable,
                                              GAsyncReadyCallback     callback,
                                              gpointer                user_data);
GLIB_AVAILABLE_IN_2_60
GAppInfo *g_file_query_default_handler_finish (GFile                 *file,
                                               GAsyncResult          *result,
                                               GError               **error);

GLIB_AVAILABLE_IN_ALL
gboolean g_file_load_contents                (GFile                  *file,
					      GCancellable           *cancellable,
					      char                  **contents,
					      gsize                  *length,
					      char                  **etag_out,
					      GError                **error);
GLIB_AVAILABLE_IN_ALL
void     g_file_load_contents_async          (GFile                  *file,
					      GCancellable           *cancellable,
					      GAsyncReadyCallback     callback,
					      gpointer                user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_load_contents_finish         (GFile                  *file,
					      GAsyncResult           *res,
					      char                  **contents,
					      gsize                  *length,
					      char                  **etag_out,
					      GError                **error);
GLIB_AVAILABLE_IN_ALL
void     g_file_load_partial_contents_async  (GFile                  *file,
					      GCancellable           *cancellable,
					      GFileReadMoreCallback   read_more_callback,
					      GAsyncReadyCallback     callback,
					      gpointer                user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_load_partial_contents_finish (GFile                  *file,
					      GAsyncResult           *res,
					      char                  **contents,
					      gsize                  *length,
					      char                  **etag_out,
					      GError                **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_replace_contents             (GFile                  *file,
					      const char             *contents,
					      gsize                   length,
					      const char             *etag,
					      gboolean                make_backup,
					      GFileCreateFlags        flags,
					      char                  **new_etag,
					      GCancellable           *cancellable,
					      GError                **error);
GLIB_AVAILABLE_IN_ALL
void     g_file_replace_contents_async       (GFile                  *file,
					      const char             *contents,
					      gsize                   length,
					      const char             *etag,
					      gboolean                make_backup,
					      GFileCreateFlags        flags,
					      GCancellable           *cancellable,
					      GAsyncReadyCallback     callback,
					      gpointer                user_data);
GLIB_AVAILABLE_IN_2_40
void     g_file_replace_contents_bytes_async (GFile                  *file,
					      GBytes                 *contents,
					      const char             *etag,
					      gboolean                make_backup,
					      GFileCreateFlags        flags,
					      GCancellable           *cancellable,
					      GAsyncReadyCallback     callback,
					      gpointer                user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_file_replace_contents_finish      (GFile                  *file,
					      GAsyncResult           *res,
					      char                  **new_etag,
					      GError                **error);

GLIB_AVAILABLE_IN_ALL
gboolean g_file_supports_thread_contexts     (GFile                  *file);

GLIB_AVAILABLE_IN_2_56
GBytes  *g_file_load_bytes                   (GFile                  *file,
                                              GCancellable           *cancellable,
                                              gchar                 **etag_out,
                                              GError                **error);
GLIB_AVAILABLE_IN_2_56
void     g_file_load_bytes_async             (GFile                  *file,
                                              GCancellable           *cancellable,
                                              GAsyncReadyCallback     callback,
                                              gpointer                user_data);
GLIB_AVAILABLE_IN_2_56
GBytes  *g_file_load_bytes_finish            (GFile                  *file,
                                              GAsyncResult           *result,
                                              gchar                 **etag_out,
                                              GError                **error);

G_END_DECLS

#endif /* __G_FILE_H__ */
