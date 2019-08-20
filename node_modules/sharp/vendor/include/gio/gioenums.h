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

#ifndef __GIO_ENUMS_H__
#define __GIO_ENUMS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <glib-object.h>

G_BEGIN_DECLS


/**
 * GAppInfoCreateFlags:
 * @G_APP_INFO_CREATE_NONE: No flags.
 * @G_APP_INFO_CREATE_NEEDS_TERMINAL: Application opens in a terminal window.
 * @G_APP_INFO_CREATE_SUPPORTS_URIS: Application supports URI arguments.
 * @G_APP_INFO_CREATE_SUPPORTS_STARTUP_NOTIFICATION: Application supports startup notification. Since 2.26
 *
 * Flags used when creating a #GAppInfo.
 */
typedef enum {
  G_APP_INFO_CREATE_NONE                           = 0,         /*< nick=none >*/
  G_APP_INFO_CREATE_NEEDS_TERMINAL                 = (1 << 0),  /*< nick=needs-terminal >*/
  G_APP_INFO_CREATE_SUPPORTS_URIS                  = (1 << 1),  /*< nick=supports-uris >*/
  G_APP_INFO_CREATE_SUPPORTS_STARTUP_NOTIFICATION  = (1 << 2)   /*< nick=supports-startup-notification >*/
} GAppInfoCreateFlags;

/**
 * GConverterFlags:
 * @G_CONVERTER_NO_FLAGS: No flags.
 * @G_CONVERTER_INPUT_AT_END: At end of input data
 * @G_CONVERTER_FLUSH: Flush data
 *
 * Flags used when calling a g_converter_convert().
 *
 * Since: 2.24
 */
typedef enum {
  G_CONVERTER_NO_FLAGS     = 0,         /*< nick=none >*/
  G_CONVERTER_INPUT_AT_END = (1 << 0),  /*< nick=input-at-end >*/
  G_CONVERTER_FLUSH        = (1 << 1)   /*< nick=flush >*/
} GConverterFlags;

/**
 * GConverterResult:
 * @G_CONVERTER_ERROR: There was an error during conversion.
 * @G_CONVERTER_CONVERTED: Some data was consumed or produced
 * @G_CONVERTER_FINISHED: The conversion is finished
 * @G_CONVERTER_FLUSHED: Flushing is finished
 *
 * Results returned from g_converter_convert().
 *
 * Since: 2.24
 */
typedef enum {
  G_CONVERTER_ERROR     = 0,  /*< nick=error >*/
  G_CONVERTER_CONVERTED = 1,  /*< nick=converted >*/
  G_CONVERTER_FINISHED  = 2,  /*< nick=finished >*/
  G_CONVERTER_FLUSHED   = 3   /*< nick=flushed >*/
} GConverterResult;


/**
 * GDataStreamByteOrder:
 * @G_DATA_STREAM_BYTE_ORDER_BIG_ENDIAN: Selects Big Endian byte order.
 * @G_DATA_STREAM_BYTE_ORDER_LITTLE_ENDIAN: Selects Little Endian byte order.
 * @G_DATA_STREAM_BYTE_ORDER_HOST_ENDIAN: Selects endianness based on host machine's architecture.
 *
 * #GDataStreamByteOrder is used to ensure proper endianness of streaming data sources
 * across various machine architectures.
 *
 **/
typedef enum {
  G_DATA_STREAM_BYTE_ORDER_BIG_ENDIAN,
  G_DATA_STREAM_BYTE_ORDER_LITTLE_ENDIAN,
  G_DATA_STREAM_BYTE_ORDER_HOST_ENDIAN
} GDataStreamByteOrder;


/**
 * GDataStreamNewlineType:
 * @G_DATA_STREAM_NEWLINE_TYPE_LF: Selects "LF" line endings, common on most modern UNIX platforms.
 * @G_DATA_STREAM_NEWLINE_TYPE_CR: Selects "CR" line endings.
 * @G_DATA_STREAM_NEWLINE_TYPE_CR_LF: Selects "CR, LF" line ending, common on Microsoft Windows.
 * @G_DATA_STREAM_NEWLINE_TYPE_ANY: Automatically try to handle any line ending type.
 *
 * #GDataStreamNewlineType is used when checking for or setting the line endings for a given file.
 **/
typedef enum {
  G_DATA_STREAM_NEWLINE_TYPE_LF,
  G_DATA_STREAM_NEWLINE_TYPE_CR,
  G_DATA_STREAM_NEWLINE_TYPE_CR_LF,
  G_DATA_STREAM_NEWLINE_TYPE_ANY
} GDataStreamNewlineType;


/**
 * GFileAttributeType:
 * @G_FILE_ATTRIBUTE_TYPE_INVALID: indicates an invalid or uninitalized type.
 * @G_FILE_ATTRIBUTE_TYPE_STRING: a null terminated UTF8 string.
 * @G_FILE_ATTRIBUTE_TYPE_BYTE_STRING: a zero terminated string of non-zero bytes.
 * @G_FILE_ATTRIBUTE_TYPE_BOOLEAN: a boolean value.
 * @G_FILE_ATTRIBUTE_TYPE_UINT32: an unsigned 4-byte/32-bit integer.
 * @G_FILE_ATTRIBUTE_TYPE_INT32: a signed 4-byte/32-bit integer.
 * @G_FILE_ATTRIBUTE_TYPE_UINT64: an unsigned 8-byte/64-bit integer.
 * @G_FILE_ATTRIBUTE_TYPE_INT64: a signed 8-byte/64-bit integer.
 * @G_FILE_ATTRIBUTE_TYPE_OBJECT: a #GObject.
 * @G_FILE_ATTRIBUTE_TYPE_STRINGV: a %NULL terminated char **. Since 2.22
 *
 * The data types for file attributes.
 **/
typedef enum {
  G_FILE_ATTRIBUTE_TYPE_INVALID = 0,
  G_FILE_ATTRIBUTE_TYPE_STRING,
  G_FILE_ATTRIBUTE_TYPE_BYTE_STRING, /* zero terminated string of non-zero bytes */
  G_FILE_ATTRIBUTE_TYPE_BOOLEAN,
  G_FILE_ATTRIBUTE_TYPE_UINT32,
  G_FILE_ATTRIBUTE_TYPE_INT32,
  G_FILE_ATTRIBUTE_TYPE_UINT64,
  G_FILE_ATTRIBUTE_TYPE_INT64,
  G_FILE_ATTRIBUTE_TYPE_OBJECT,
  G_FILE_ATTRIBUTE_TYPE_STRINGV
} GFileAttributeType;


/**
 * GFileAttributeInfoFlags:
 * @G_FILE_ATTRIBUTE_INFO_NONE: no flags set.
 * @G_FILE_ATTRIBUTE_INFO_COPY_WITH_FILE: copy the attribute values when the file is copied.
 * @G_FILE_ATTRIBUTE_INFO_COPY_WHEN_MOVED: copy the attribute values when the file is moved.
 *
 * Flags specifying the behaviour of an attribute.
 **/
typedef enum {
  G_FILE_ATTRIBUTE_INFO_NONE            = 0,
  G_FILE_ATTRIBUTE_INFO_COPY_WITH_FILE  = (1 << 0),
  G_FILE_ATTRIBUTE_INFO_COPY_WHEN_MOVED = (1 << 1)
} GFileAttributeInfoFlags;


/**
 * GFileAttributeStatus:
 * @G_FILE_ATTRIBUTE_STATUS_UNSET: Attribute value is unset (empty).
 * @G_FILE_ATTRIBUTE_STATUS_SET: Attribute value is set.
 * @G_FILE_ATTRIBUTE_STATUS_ERROR_SETTING: Indicates an error in setting the value.
 *
 * Used by g_file_set_attributes_from_info() when setting file attributes.
 **/
typedef enum {
  G_FILE_ATTRIBUTE_STATUS_UNSET = 0,
  G_FILE_ATTRIBUTE_STATUS_SET,
  G_FILE_ATTRIBUTE_STATUS_ERROR_SETTING
} GFileAttributeStatus;


/**
 * GFileQueryInfoFlags:
 * @G_FILE_QUERY_INFO_NONE: No flags set.
 * @G_FILE_QUERY_INFO_NOFOLLOW_SYMLINKS: Don't follow symlinks.
 *
 * Flags used when querying a #GFileInfo.
 */
typedef enum {
  G_FILE_QUERY_INFO_NONE              = 0,
  G_FILE_QUERY_INFO_NOFOLLOW_SYMLINKS = (1 << 0)   /*< nick=nofollow-symlinks >*/
} GFileQueryInfoFlags;


/**
 * GFileCreateFlags:
 * @G_FILE_CREATE_NONE: No flags set.
 * @G_FILE_CREATE_PRIVATE: Create a file that can only be
 *    accessed by the current user.
 * @G_FILE_CREATE_REPLACE_DESTINATION: Replace the destination
 *    as if it didn't exist before. Don't try to keep any old
 *    permissions, replace instead of following links. This
 *    is generally useful if you're doing a "copy over"
 *    rather than a "save new version of" replace operation.
 *    You can think of it as "unlink destination" before
 *    writing to it, although the implementation may not
 *    be exactly like that. Since 2.20
 *
 * Flags used when an operation may create a file.
 */
typedef enum {
  G_FILE_CREATE_NONE    = 0,
  G_FILE_CREATE_PRIVATE = (1 << 0),
  G_FILE_CREATE_REPLACE_DESTINATION = (1 << 1)
} GFileCreateFlags;

/**
 * GFileMeasureFlags:
 * @G_FILE_MEASURE_NONE: No flags set.
 * @G_FILE_MEASURE_REPORT_ANY_ERROR: Report any error encountered
 *   while traversing the directory tree.  Normally errors are only
 *   reported for the toplevel file.
 * @G_FILE_MEASURE_APPARENT_SIZE: Tally usage based on apparent file
 *   sizes.  Normally, the block-size is used, if available, as this is a
 *   more accurate representation of disk space used.
 *   Compare with `du --apparent-size`.
 * @G_FILE_MEASURE_NO_XDEV: Do not cross mount point boundaries.
 *   Compare with `du -x`.
 *
 * Flags that can be used with g_file_measure_disk_usage().
 *
 * Since: 2.38
 **/
typedef enum {
  G_FILE_MEASURE_NONE                 = 0,
  G_FILE_MEASURE_REPORT_ANY_ERROR     = (1 << 1),
  G_FILE_MEASURE_APPARENT_SIZE        = (1 << 2),
  G_FILE_MEASURE_NO_XDEV              = (1 << 3)
} GFileMeasureFlags;

/**
 * GMountMountFlags:
 * @G_MOUNT_MOUNT_NONE: No flags set.
 *
 * Flags used when mounting a mount.
 */
typedef enum /*< flags >*/ {
  G_MOUNT_MOUNT_NONE = 0
} GMountMountFlags;


/**
 * GMountUnmountFlags:
 * @G_MOUNT_UNMOUNT_NONE: No flags set.
 * @G_MOUNT_UNMOUNT_FORCE: Unmount even if there are outstanding
 *  file operations on the mount.
 *
 * Flags used when an unmounting a mount.
 */
typedef enum {
  G_MOUNT_UNMOUNT_NONE  = 0,
  G_MOUNT_UNMOUNT_FORCE = (1 << 0)
} GMountUnmountFlags;

/**
 * GDriveStartFlags:
 * @G_DRIVE_START_NONE: No flags set.
 *
 * Flags used when starting a drive.
 *
 * Since: 2.22
 */
typedef enum /*< flags >*/ {
  G_DRIVE_START_NONE = 0
} GDriveStartFlags;

/**
 * GDriveStartStopType:
 * @G_DRIVE_START_STOP_TYPE_UNKNOWN: Unknown or drive doesn't support
 *    start/stop.
 * @G_DRIVE_START_STOP_TYPE_SHUTDOWN: The stop method will physically
 *    shut down the drive and e.g. power down the port the drive is
 *    attached to.
 * @G_DRIVE_START_STOP_TYPE_NETWORK: The start/stop methods are used
 *    for connecting/disconnect to the drive over the network.
 * @G_DRIVE_START_STOP_TYPE_MULTIDISK: The start/stop methods will
 *    assemble/disassemble a virtual drive from several physical
 *    drives.
 * @G_DRIVE_START_STOP_TYPE_PASSWORD: The start/stop methods will
 *    unlock/lock the disk (for example using the ATA <quote>SECURITY
 *    UNLOCK DEVICE</quote> command)
 *
 * Enumeration describing how a drive can be started/stopped.
 *
 * Since: 2.22
 */
typedef enum {
  G_DRIVE_START_STOP_TYPE_UNKNOWN,
  G_DRIVE_START_STOP_TYPE_SHUTDOWN,
  G_DRIVE_START_STOP_TYPE_NETWORK,
  G_DRIVE_START_STOP_TYPE_MULTIDISK,
  G_DRIVE_START_STOP_TYPE_PASSWORD
} GDriveStartStopType;

/**
 * GFileCopyFlags:
 * @G_FILE_COPY_NONE: No flags set.
 * @G_FILE_COPY_OVERWRITE: Overwrite any existing files
 * @G_FILE_COPY_BACKUP: Make a backup of any existing files.
 * @G_FILE_COPY_NOFOLLOW_SYMLINKS: Don't follow symlinks.
 * @G_FILE_COPY_ALL_METADATA: Copy all file metadata instead of just default set used for copy (see #GFileInfo).
 * @G_FILE_COPY_NO_FALLBACK_FOR_MOVE: Don't use copy and delete fallback if native move not supported.
 * @G_FILE_COPY_TARGET_DEFAULT_PERMS: Leaves target file with default perms, instead of setting the source file perms.
 *
 * Flags used when copying or moving files.
 */
typedef enum {
  G_FILE_COPY_NONE                 = 0,          /*< nick=none >*/
  G_FILE_COPY_OVERWRITE            = (1 << 0),
  G_FILE_COPY_BACKUP               = (1 << 1),
  G_FILE_COPY_NOFOLLOW_SYMLINKS    = (1 << 2),
  G_FILE_COPY_ALL_METADATA         = (1 << 3),
  G_FILE_COPY_NO_FALLBACK_FOR_MOVE = (1 << 4),
  G_FILE_COPY_TARGET_DEFAULT_PERMS = (1 << 5)
} GFileCopyFlags;


/**
 * GFileMonitorFlags:
 * @G_FILE_MONITOR_NONE: No flags set.
 * @G_FILE_MONITOR_WATCH_MOUNTS: Watch for mount events.
 * @G_FILE_MONITOR_SEND_MOVED: Pair DELETED and CREATED events caused
 *   by file renames (moves) and send a single G_FILE_MONITOR_EVENT_MOVED
 *   event instead (NB: not supported on all backends; the default
 *   behaviour -without specifying this flag- is to send single DELETED
 *   and CREATED events).  Deprecated since 2.46: use
 *   %G_FILE_MONITOR_WATCH_MOVES instead.
 * @G_FILE_MONITOR_WATCH_HARD_LINKS: Watch for changes to the file made
 *   via another hard link. Since 2.36.
 * @G_FILE_MONITOR_WATCH_MOVES: Watch for rename operations on a
 *   monitored directory.  This causes %G_FILE_MONITOR_EVENT_RENAMED,
 *   %G_FILE_MONITOR_EVENT_MOVED_IN and %G_FILE_MONITOR_EVENT_MOVED_OUT
 *   events to be emitted when possible.  Since: 2.46.
 *
 * Flags used to set what a #GFileMonitor will watch for.
 */
typedef enum {
  G_FILE_MONITOR_NONE             = 0,
  G_FILE_MONITOR_WATCH_MOUNTS     = (1 << 0),
  G_FILE_MONITOR_SEND_MOVED       = (1 << 1),
  G_FILE_MONITOR_WATCH_HARD_LINKS = (1 << 2),
  G_FILE_MONITOR_WATCH_MOVES      = (1 << 3)
} GFileMonitorFlags;


/**
 * GFileType:
 * @G_FILE_TYPE_UNKNOWN: File's type is unknown.
 * @G_FILE_TYPE_REGULAR: File handle represents a regular file.
 * @G_FILE_TYPE_DIRECTORY: File handle represents a directory.
 * @G_FILE_TYPE_SYMBOLIC_LINK: File handle represents a symbolic link
 *    (Unix systems).
 * @G_FILE_TYPE_SPECIAL: File is a "special" file, such as a socket, fifo,
 *    block device, or character device.
 * @G_FILE_TYPE_SHORTCUT: File is a shortcut (Windows systems).
 * @G_FILE_TYPE_MOUNTABLE: File is a mountable location.
 *
 * Indicates the file's on-disk type.
 **/
typedef enum {
  G_FILE_TYPE_UNKNOWN = 0,
  G_FILE_TYPE_REGULAR,
  G_FILE_TYPE_DIRECTORY,
  G_FILE_TYPE_SYMBOLIC_LINK,
  G_FILE_TYPE_SPECIAL, /* socket, fifo, blockdev, chardev */
  G_FILE_TYPE_SHORTCUT,
  G_FILE_TYPE_MOUNTABLE
} GFileType;


/**
 * GFilesystemPreviewType:
 * @G_FILESYSTEM_PREVIEW_TYPE_IF_ALWAYS: Only preview files if user has explicitly requested it.
 * @G_FILESYSTEM_PREVIEW_TYPE_IF_LOCAL: Preview files if user has requested preview of "local" files.
 * @G_FILESYSTEM_PREVIEW_TYPE_NEVER: Never preview files.
 *
 * Indicates a hint from the file system whether files should be
 * previewed in a file manager. Returned as the value of the key
 * #G_FILE_ATTRIBUTE_FILESYSTEM_USE_PREVIEW.
 **/
typedef enum {
  G_FILESYSTEM_PREVIEW_TYPE_IF_ALWAYS = 0,
  G_FILESYSTEM_PREVIEW_TYPE_IF_LOCAL,
  G_FILESYSTEM_PREVIEW_TYPE_NEVER
} GFilesystemPreviewType;


/**
 * GFileMonitorEvent:
 * @G_FILE_MONITOR_EVENT_CHANGED: a file changed.
 * @G_FILE_MONITOR_EVENT_CHANGES_DONE_HINT: a hint that this was probably the last change in a set of changes.
 * @G_FILE_MONITOR_EVENT_DELETED: a file was deleted.
 * @G_FILE_MONITOR_EVENT_CREATED: a file was created.
 * @G_FILE_MONITOR_EVENT_ATTRIBUTE_CHANGED: a file attribute was changed.
 * @G_FILE_MONITOR_EVENT_PRE_UNMOUNT: the file location will soon be unmounted.
 * @G_FILE_MONITOR_EVENT_UNMOUNTED: the file location was unmounted.
 * @G_FILE_MONITOR_EVENT_MOVED: the file was moved -- only sent if the
 *   (deprecated) %G_FILE_MONITOR_SEND_MOVED flag is set
 * @G_FILE_MONITOR_EVENT_RENAMED: the file was renamed within the
 *   current directory -- only sent if the %G_FILE_MONITOR_WATCH_MOVES
 *   flag is set.  Since: 2.46.
 * @G_FILE_MONITOR_EVENT_MOVED_IN: the file was moved into the
 *   monitored directory from another location -- only sent if the
 *   %G_FILE_MONITOR_WATCH_MOVES flag is set.  Since: 2.46.
 * @G_FILE_MONITOR_EVENT_MOVED_OUT: the file was moved out of the
 *   monitored directory to another location -- only sent if the
 *   %G_FILE_MONITOR_WATCH_MOVES flag is set.  Since: 2.46
 *
 * Specifies what type of event a monitor event is.
 **/
typedef enum {
  G_FILE_MONITOR_EVENT_CHANGED,
  G_FILE_MONITOR_EVENT_CHANGES_DONE_HINT,
  G_FILE_MONITOR_EVENT_DELETED,
  G_FILE_MONITOR_EVENT_CREATED,
  G_FILE_MONITOR_EVENT_ATTRIBUTE_CHANGED,
  G_FILE_MONITOR_EVENT_PRE_UNMOUNT,
  G_FILE_MONITOR_EVENT_UNMOUNTED,
  G_FILE_MONITOR_EVENT_MOVED,
  G_FILE_MONITOR_EVENT_RENAMED,
  G_FILE_MONITOR_EVENT_MOVED_IN,
  G_FILE_MONITOR_EVENT_MOVED_OUT
} GFileMonitorEvent;


/* This enumeration conflicts with GIOError in giochannel.h. However,
 * that is only used as a return value in some deprecated functions.
 * So, we reuse the same prefix for the enumeration values, but call
 * the actual enumeration (which is rarely used) GIOErrorEnum.
 */
/**
 * GIOErrorEnum:
 * @G_IO_ERROR_FAILED: Generic error condition for when an operation fails
 *     and no more specific #GIOErrorEnum value is defined.
 * @G_IO_ERROR_NOT_FOUND: File not found.
 * @G_IO_ERROR_EXISTS: File already exists.
 * @G_IO_ERROR_IS_DIRECTORY: File is a directory.
 * @G_IO_ERROR_NOT_DIRECTORY: File is not a directory.
 * @G_IO_ERROR_NOT_EMPTY: File is a directory that isn't empty.
 * @G_IO_ERROR_NOT_REGULAR_FILE: File is not a regular file.
 * @G_IO_ERROR_NOT_SYMBOLIC_LINK: File is not a symbolic link.
 * @G_IO_ERROR_NOT_MOUNTABLE_FILE: File cannot be mounted.
 * @G_IO_ERROR_FILENAME_TOO_LONG: Filename is too many characters.
 * @G_IO_ERROR_INVALID_FILENAME: Filename is invalid or contains invalid characters.
 * @G_IO_ERROR_TOO_MANY_LINKS: File contains too many symbolic links.
 * @G_IO_ERROR_NO_SPACE: No space left on drive.
 * @G_IO_ERROR_INVALID_ARGUMENT: Invalid argument.
 * @G_IO_ERROR_PERMISSION_DENIED: Permission denied.
 * @G_IO_ERROR_NOT_SUPPORTED: Operation (or one of its parameters) not supported
 * @G_IO_ERROR_NOT_MOUNTED: File isn't mounted.
 * @G_IO_ERROR_ALREADY_MOUNTED: File is already mounted.
 * @G_IO_ERROR_CLOSED: File was closed.
 * @G_IO_ERROR_CANCELLED: Operation was cancelled. See #GCancellable.
 * @G_IO_ERROR_PENDING: Operations are still pending.
 * @G_IO_ERROR_READ_ONLY: File is read only.
 * @G_IO_ERROR_CANT_CREATE_BACKUP: Backup couldn't be created.
 * @G_IO_ERROR_WRONG_ETAG: File's Entity Tag was incorrect.
 * @G_IO_ERROR_TIMED_OUT: Operation timed out.
 * @G_IO_ERROR_WOULD_RECURSE: Operation would be recursive.
 * @G_IO_ERROR_BUSY: File is busy.
 * @G_IO_ERROR_WOULD_BLOCK: Operation would block.
 * @G_IO_ERROR_HOST_NOT_FOUND: Host couldn't be found (remote operations).
 * @G_IO_ERROR_WOULD_MERGE: Operation would merge files.
 * @G_IO_ERROR_FAILED_HANDLED: Operation failed and a helper program has
 *     already interacted with the user. Do not display any error dialog.
 * @G_IO_ERROR_TOO_MANY_OPEN_FILES: The current process has too many files
 *     open and can't open any more. Duplicate descriptors do count toward
 *     this limit. Since 2.20
 * @G_IO_ERROR_NOT_INITIALIZED: The object has not been initialized. Since 2.22
 * @G_IO_ERROR_ADDRESS_IN_USE: The requested address is already in use. Since 2.22
 * @G_IO_ERROR_PARTIAL_INPUT: Need more input to finish operation. Since 2.24
 * @G_IO_ERROR_INVALID_DATA: The input data was invalid. Since 2.24
 * @G_IO_ERROR_DBUS_ERROR: A remote object generated an error that
 *     doesn't correspond to a locally registered #GError error
 *     domain. Use g_dbus_error_get_remote_error() to extract the D-Bus
 *     error name and g_dbus_error_strip_remote_error() to fix up the
 *     message so it matches what was received on the wire. Since 2.26.
 * @G_IO_ERROR_HOST_UNREACHABLE: Host unreachable. Since 2.26
 * @G_IO_ERROR_NETWORK_UNREACHABLE: Network unreachable. Since 2.26
 * @G_IO_ERROR_CONNECTION_REFUSED: Connection refused. Since 2.26
 * @G_IO_ERROR_PROXY_FAILED: Connection to proxy server failed. Since 2.26
 * @G_IO_ERROR_PROXY_AUTH_FAILED: Proxy authentication failed. Since 2.26
 * @G_IO_ERROR_PROXY_NEED_AUTH: Proxy server needs authentication. Since 2.26
 * @G_IO_ERROR_PROXY_NOT_ALLOWED: Proxy connection is not allowed by ruleset.
 *     Since 2.26
 * @G_IO_ERROR_BROKEN_PIPE: Broken pipe. Since 2.36
 * @G_IO_ERROR_CONNECTION_CLOSED: Connection closed by peer. Note that this
 *     is the same code as %G_IO_ERROR_BROKEN_PIPE; before 2.44 some
 *     "connection closed" errors returned %G_IO_ERROR_BROKEN_PIPE, but others
 *     returned %G_IO_ERROR_FAILED. Now they should all return the same
 *     value, which has this more logical name. Since 2.44.
 * @G_IO_ERROR_NOT_CONNECTED: Transport endpoint is not connected. Since 2.44
 * @G_IO_ERROR_MESSAGE_TOO_LARGE: Message too large. Since 2.48.
 *
 * Error codes returned by GIO functions.
 *
 * Note that this domain may be extended in future GLib releases. In
 * general, new error codes either only apply to new APIs, or else
 * replace %G_IO_ERROR_FAILED in cases that were not explicitly
 * distinguished before. You should therefore avoid writing code like
 * |[<!-- language="C" -->
 * if (g_error_matches (error, G_IO_ERROR, G_IO_ERROR_FAILED))
 *   {
 *     // Assume that this is EPRINTERONFIRE
 *     ...
 *   }
 * ]|
 * but should instead treat all unrecognized error codes the same as
 * #G_IO_ERROR_FAILED.
 *
 * See also #GPollableReturn for a cheaper way of returning
 * %G_IO_ERROR_WOULD_BLOCK to callers without allocating a #GError.
 **/
typedef enum {
  G_IO_ERROR_FAILED,
  G_IO_ERROR_NOT_FOUND,
  G_IO_ERROR_EXISTS,
  G_IO_ERROR_IS_DIRECTORY,
  G_IO_ERROR_NOT_DIRECTORY,
  G_IO_ERROR_NOT_EMPTY,
  G_IO_ERROR_NOT_REGULAR_FILE,
  G_IO_ERROR_NOT_SYMBOLIC_LINK,
  G_IO_ERROR_NOT_MOUNTABLE_FILE,
  G_IO_ERROR_FILENAME_TOO_LONG,
  G_IO_ERROR_INVALID_FILENAME,
  G_IO_ERROR_TOO_MANY_LINKS,
  G_IO_ERROR_NO_SPACE,
  G_IO_ERROR_INVALID_ARGUMENT,
  G_IO_ERROR_PERMISSION_DENIED,
  G_IO_ERROR_NOT_SUPPORTED,
  G_IO_ERROR_NOT_MOUNTED,
  G_IO_ERROR_ALREADY_MOUNTED,
  G_IO_ERROR_CLOSED,
  G_IO_ERROR_CANCELLED,
  G_IO_ERROR_PENDING,
  G_IO_ERROR_READ_ONLY,
  G_IO_ERROR_CANT_CREATE_BACKUP,
  G_IO_ERROR_WRONG_ETAG,
  G_IO_ERROR_TIMED_OUT,
  G_IO_ERROR_WOULD_RECURSE,
  G_IO_ERROR_BUSY,
  G_IO_ERROR_WOULD_BLOCK,
  G_IO_ERROR_HOST_NOT_FOUND,
  G_IO_ERROR_WOULD_MERGE,
  G_IO_ERROR_FAILED_HANDLED,
  G_IO_ERROR_TOO_MANY_OPEN_FILES,
  G_IO_ERROR_NOT_INITIALIZED,
  G_IO_ERROR_ADDRESS_IN_USE,
  G_IO_ERROR_PARTIAL_INPUT,
  G_IO_ERROR_INVALID_DATA,
  G_IO_ERROR_DBUS_ERROR,
  G_IO_ERROR_HOST_UNREACHABLE,
  G_IO_ERROR_NETWORK_UNREACHABLE,
  G_IO_ERROR_CONNECTION_REFUSED,
  G_IO_ERROR_PROXY_FAILED,
  G_IO_ERROR_PROXY_AUTH_FAILED,
  G_IO_ERROR_PROXY_NEED_AUTH,
  G_IO_ERROR_PROXY_NOT_ALLOWED,
  G_IO_ERROR_BROKEN_PIPE,
  G_IO_ERROR_CONNECTION_CLOSED = G_IO_ERROR_BROKEN_PIPE,
  G_IO_ERROR_NOT_CONNECTED,
  G_IO_ERROR_MESSAGE_TOO_LARGE
} GIOErrorEnum;


/**
 * GAskPasswordFlags:
 * @G_ASK_PASSWORD_NEED_PASSWORD: operation requires a password.
 * @G_ASK_PASSWORD_NEED_USERNAME: operation requires a username.
 * @G_ASK_PASSWORD_NEED_DOMAIN: operation requires a domain.
 * @G_ASK_PASSWORD_SAVING_SUPPORTED: operation supports saving settings.
 * @G_ASK_PASSWORD_ANONYMOUS_SUPPORTED: operation supports anonymous users.
 * @G_ASK_PASSWORD_TCRYPT: operation takes TCRYPT parameters (Since: 2.58)
 *
 * #GAskPasswordFlags are used to request specific information from the
 * user, or to notify the user of their choices in an authentication
 * situation.
 **/
typedef enum {
  G_ASK_PASSWORD_NEED_PASSWORD           = (1 << 0),
  G_ASK_PASSWORD_NEED_USERNAME           = (1 << 1),
  G_ASK_PASSWORD_NEED_DOMAIN             = (1 << 2),
  G_ASK_PASSWORD_SAVING_SUPPORTED        = (1 << 3),
  G_ASK_PASSWORD_ANONYMOUS_SUPPORTED     = (1 << 4),
  G_ASK_PASSWORD_TCRYPT                  = (1 << 5),
} GAskPasswordFlags;


/**
 * GPasswordSave:
 * @G_PASSWORD_SAVE_NEVER: never save a password.
 * @G_PASSWORD_SAVE_FOR_SESSION: save a password for the session.
 * @G_PASSWORD_SAVE_PERMANENTLY: save a password permanently.
 *
 * #GPasswordSave is used to indicate the lifespan of a saved password.
 *
 * #Gvfs stores passwords in the Gnome keyring when this flag allows it
 * to, and later retrieves it again from there.
 **/
typedef enum {
  G_PASSWORD_SAVE_NEVER,
  G_PASSWORD_SAVE_FOR_SESSION,
  G_PASSWORD_SAVE_PERMANENTLY
} GPasswordSave;


/**
 * GMountOperationResult:
 * @G_MOUNT_OPERATION_HANDLED: The request was fulfilled and the
 *     user specified data is now available
 * @G_MOUNT_OPERATION_ABORTED: The user requested the mount operation
 *     to be aborted
 * @G_MOUNT_OPERATION_UNHANDLED: The request was unhandled (i.e. not
 *     implemented)
 *
 * #GMountOperationResult is returned as a result when a request for
 * information is send by the mounting operation.
 **/
typedef enum {
  G_MOUNT_OPERATION_HANDLED,
  G_MOUNT_OPERATION_ABORTED,
  G_MOUNT_OPERATION_UNHANDLED
} GMountOperationResult;


/**
 * GOutputStreamSpliceFlags:
 * @G_OUTPUT_STREAM_SPLICE_NONE: Do not close either stream.
 * @G_OUTPUT_STREAM_SPLICE_CLOSE_SOURCE: Close the source stream after
 *     the splice.
 * @G_OUTPUT_STREAM_SPLICE_CLOSE_TARGET: Close the target stream after
 *     the splice.
 *
 * GOutputStreamSpliceFlags determine how streams should be spliced.
 **/
typedef enum {
  G_OUTPUT_STREAM_SPLICE_NONE         = 0,
  G_OUTPUT_STREAM_SPLICE_CLOSE_SOURCE = (1 << 0),
  G_OUTPUT_STREAM_SPLICE_CLOSE_TARGET = (1 << 1)
} GOutputStreamSpliceFlags;


/**
 * GIOStreamSpliceFlags:
 * @G_IO_STREAM_SPLICE_NONE: Do not close either stream.
 * @G_IO_STREAM_SPLICE_CLOSE_STREAM1: Close the first stream after
 *     the splice.
 * @G_IO_STREAM_SPLICE_CLOSE_STREAM2: Close the second stream after
 *     the splice.
 * @G_IO_STREAM_SPLICE_WAIT_FOR_BOTH: Wait for both splice operations to finish
 *     before calling the callback.
 *
 * GIOStreamSpliceFlags determine how streams should be spliced.
 *
 * Since: 2.28
 **/
typedef enum {
  G_IO_STREAM_SPLICE_NONE          = 0,
  G_IO_STREAM_SPLICE_CLOSE_STREAM1 = (1 << 0),
  G_IO_STREAM_SPLICE_CLOSE_STREAM2 = (1 << 1),
  G_IO_STREAM_SPLICE_WAIT_FOR_BOTH = (1 << 2)
} GIOStreamSpliceFlags;

/**
 * GEmblemOrigin:
 * @G_EMBLEM_ORIGIN_UNKNOWN: Emblem of unknown origin
 * @G_EMBLEM_ORIGIN_DEVICE: Emblem adds device-specific information
 * @G_EMBLEM_ORIGIN_LIVEMETADATA: Emblem depicts live metadata, such as "readonly"
 * @G_EMBLEM_ORIGIN_TAG: Emblem comes from a user-defined tag, e.g. set by nautilus (in the future)
 *
 * GEmblemOrigin is used to add information about the origin of the emblem
 * to #GEmblem.
 *
 * Since: 2.18
 */
typedef enum  {
  G_EMBLEM_ORIGIN_UNKNOWN,
  G_EMBLEM_ORIGIN_DEVICE,
  G_EMBLEM_ORIGIN_LIVEMETADATA,
  G_EMBLEM_ORIGIN_TAG
} GEmblemOrigin;

/**
 * GResolverError:
 * @G_RESOLVER_ERROR_NOT_FOUND: the requested name/address/service was not
 *     found
 * @G_RESOLVER_ERROR_TEMPORARY_FAILURE: the requested information could not
 *     be looked up due to a network error or similar problem
 * @G_RESOLVER_ERROR_INTERNAL: unknown error
 *
 * An error code used with %G_RESOLVER_ERROR in a #GError returned
 * from a #GResolver routine.
 *
 * Since: 2.22
 */
typedef enum {
  G_RESOLVER_ERROR_NOT_FOUND,
  G_RESOLVER_ERROR_TEMPORARY_FAILURE,
  G_RESOLVER_ERROR_INTERNAL
} GResolverError;

/**
 * GResolverRecordType:
 * @G_RESOLVER_RECORD_SRV: lookup DNS SRV records for a domain
 * @G_RESOLVER_RECORD_MX: lookup DNS MX records for a domain
 * @G_RESOLVER_RECORD_TXT: lookup DNS TXT records for a name
 * @G_RESOLVER_RECORD_SOA: lookup DNS SOA records for a zone
 * @G_RESOLVER_RECORD_NS: lookup DNS NS records for a domain
 *
 * The type of record that g_resolver_lookup_records() or
 * g_resolver_lookup_records_async() should retrieve. The records are returned
 * as lists of #GVariant tuples. Each record type has different values in
 * the variant tuples returned.
 *
 * %G_RESOLVER_RECORD_SRV records are returned as variants with the signature
 * '(qqqs)', containing a guint16 with the priority, a guint16 with the
 * weight, a guint16 with the port, and a string of the hostname.
 *
 * %G_RESOLVER_RECORD_MX records are returned as variants with the signature
 * '(qs)', representing a guint16 with the preference, and a string containing
 * the mail exchanger hostname.
 *
 * %G_RESOLVER_RECORD_TXT records are returned as variants with the signature
 * '(as)', representing an array of the strings in the text record.
 *
 * %G_RESOLVER_RECORD_SOA records are returned as variants with the signature
 * '(ssuuuuu)', representing a string containing the primary name server, a
 * string containing the administrator, the serial as a guint32, the refresh
 * interval as guint32, the retry interval as a guint32, the expire timeout
 * as a guint32, and the ttl as a guint32.
 *
 * %G_RESOLVER_RECORD_NS records are returned as variants with the signature
 * '(s)', representing a string of the hostname of the name server.
 *
 * Since: 2.34
 */
typedef enum {
  G_RESOLVER_RECORD_SRV = 1,
  G_RESOLVER_RECORD_MX,
  G_RESOLVER_RECORD_TXT,
  G_RESOLVER_RECORD_SOA,
  G_RESOLVER_RECORD_NS
} GResolverRecordType;

/**
 * GResourceError:
 * @G_RESOURCE_ERROR_NOT_FOUND: no file was found at the requested path
 * @G_RESOURCE_ERROR_INTERNAL: unknown error
 *
 * An error code used with %G_RESOURCE_ERROR in a #GError returned
 * from a #GResource routine.
 *
 * Since: 2.32
 */
typedef enum {
  G_RESOURCE_ERROR_NOT_FOUND,
  G_RESOURCE_ERROR_INTERNAL
} GResourceError;

/**
 * GResourceFlags:
 * @G_RESOURCE_FLAGS_NONE: No flags set.
 * @G_RESOURCE_FLAGS_COMPRESSED: The file is compressed.
 *
 * GResourceFlags give information about a particular file inside a resource
 * bundle.
 * 
 * Since: 2.32
 **/
typedef enum {
  G_RESOURCE_FLAGS_NONE       = 0,
  G_RESOURCE_FLAGS_COMPRESSED = (1<<0)
} GResourceFlags;

/**
 * GResourceLookupFlags:
 * @G_RESOURCE_LOOKUP_FLAGS_NONE: No flags set.
 *
 * GResourceLookupFlags determine how resource path lookups are handled.
 * 
 * Since: 2.32
 **/
typedef enum /*< flags >*/ {
  G_RESOURCE_LOOKUP_FLAGS_NONE       = 0
} GResourceLookupFlags;

/**
 * GSocketFamily:
 * @G_SOCKET_FAMILY_INVALID: no address family
 * @G_SOCKET_FAMILY_IPV4: the IPv4 family
 * @G_SOCKET_FAMILY_IPV6: the IPv6 family
 * @G_SOCKET_FAMILY_UNIX: the UNIX domain family
 *
 * The protocol family of a #GSocketAddress. (These values are
 * identical to the system defines %AF_INET, %AF_INET6 and %AF_UNIX,
 * if available.)
 *
 * Since: 2.22
 */
typedef enum {
  G_SOCKET_FAMILY_INVALID,
  G_SOCKET_FAMILY_UNIX = GLIB_SYSDEF_AF_UNIX,
  G_SOCKET_FAMILY_IPV4 = GLIB_SYSDEF_AF_INET,
  G_SOCKET_FAMILY_IPV6 = GLIB_SYSDEF_AF_INET6
} GSocketFamily;

/**
 * GSocketType:
 * @G_SOCKET_TYPE_INVALID: Type unknown or wrong
 * @G_SOCKET_TYPE_STREAM: Reliable connection-based byte streams (e.g. TCP).
 * @G_SOCKET_TYPE_DATAGRAM: Connectionless, unreliable datagram passing.
 *     (e.g. UDP)
 * @G_SOCKET_TYPE_SEQPACKET: Reliable connection-based passing of datagrams
 *     of fixed maximum length (e.g. SCTP).
 *
 * Flags used when creating a #GSocket. Some protocols may not implement
 * all the socket types.
 *
 * Since: 2.22
 */
typedef enum
{
  G_SOCKET_TYPE_INVALID,
  G_SOCKET_TYPE_STREAM,
  G_SOCKET_TYPE_DATAGRAM,
  G_SOCKET_TYPE_SEQPACKET
} GSocketType;

/**
 * GSocketMsgFlags:
 * @G_SOCKET_MSG_NONE: No flags.
 * @G_SOCKET_MSG_OOB: Request to send/receive out of band data.
 * @G_SOCKET_MSG_PEEK: Read data from the socket without removing it from
 *     the queue.
 * @G_SOCKET_MSG_DONTROUTE: Don't use a gateway to send out the packet,
 *     only send to hosts on directly connected networks.
 *
 * Flags used in g_socket_receive_message() and g_socket_send_message().
 * The flags listed in the enum are some commonly available flags, but the
 * values used for them are the same as on the platform, and any other flags
 * are passed in/out as is. So to use a platform specific flag, just include
 * the right system header and pass in the flag.
 *
 * Since: 2.22
 */
typedef enum /*< flags >*/
{
  G_SOCKET_MSG_NONE,
  G_SOCKET_MSG_OOB = GLIB_SYSDEF_MSG_OOB,
  G_SOCKET_MSG_PEEK = GLIB_SYSDEF_MSG_PEEK,
  G_SOCKET_MSG_DONTROUTE = GLIB_SYSDEF_MSG_DONTROUTE
} GSocketMsgFlags;

/**
 * GSocketProtocol:
 * @G_SOCKET_PROTOCOL_UNKNOWN: The protocol type is unknown
 * @G_SOCKET_PROTOCOL_DEFAULT: The default protocol for the family/type
 * @G_SOCKET_PROTOCOL_TCP: TCP over IP
 * @G_SOCKET_PROTOCOL_UDP: UDP over IP
 * @G_SOCKET_PROTOCOL_SCTP: SCTP over IP
 *
 * A protocol identifier is specified when creating a #GSocket, which is a
 * family/type specific identifier, where 0 means the default protocol for
 * the particular family/type.
 *
 * This enum contains a set of commonly available and used protocols. You
 * can also pass any other identifiers handled by the platform in order to
 * use protocols not listed here.
 *
 * Since: 2.22
 */
typedef enum {
  G_SOCKET_PROTOCOL_UNKNOWN = -1,
  G_SOCKET_PROTOCOL_DEFAULT = 0,
  G_SOCKET_PROTOCOL_TCP     = 6,
  G_SOCKET_PROTOCOL_UDP     = 17,
  G_SOCKET_PROTOCOL_SCTP    = 132
} GSocketProtocol;

/**
 * GZlibCompressorFormat:
 * @G_ZLIB_COMPRESSOR_FORMAT_ZLIB: deflate compression with zlib header
 * @G_ZLIB_COMPRESSOR_FORMAT_GZIP: gzip file format
 * @G_ZLIB_COMPRESSOR_FORMAT_RAW: deflate compression with no header
 *
 * Used to select the type of data format to use for #GZlibDecompressor
 * and #GZlibCompressor.
 *
 * Since: 2.24
 */
typedef enum {
  G_ZLIB_COMPRESSOR_FORMAT_ZLIB,
  G_ZLIB_COMPRESSOR_FORMAT_GZIP,
  G_ZLIB_COMPRESSOR_FORMAT_RAW
} GZlibCompressorFormat;

/**
 * GUnixSocketAddressType:
 * @G_UNIX_SOCKET_ADDRESS_INVALID: invalid
 * @G_UNIX_SOCKET_ADDRESS_ANONYMOUS: anonymous
 * @G_UNIX_SOCKET_ADDRESS_PATH: a filesystem path
 * @G_UNIX_SOCKET_ADDRESS_ABSTRACT: an abstract name
 * @G_UNIX_SOCKET_ADDRESS_ABSTRACT_PADDED: an abstract name, 0-padded
 *   to the full length of a unix socket name
 *
 * The type of name used by a #GUnixSocketAddress.
 * %G_UNIX_SOCKET_ADDRESS_PATH indicates a traditional unix domain
 * socket bound to a filesystem path. %G_UNIX_SOCKET_ADDRESS_ANONYMOUS
 * indicates a socket not bound to any name (eg, a client-side socket,
 * or a socket created with socketpair()).
 *
 * For abstract sockets, there are two incompatible ways of naming
 * them; the man pages suggest using the entire `struct sockaddr_un`
 * as the name, padding the unused parts of the %sun_path field with
 * zeroes; this corresponds to %G_UNIX_SOCKET_ADDRESS_ABSTRACT_PADDED.
 * However, many programs instead just use a portion of %sun_path, and
 * pass an appropriate smaller length to bind() or connect(). This is
 * %G_UNIX_SOCKET_ADDRESS_ABSTRACT.
 *
 * Since: 2.26
 */
typedef enum {
  G_UNIX_SOCKET_ADDRESS_INVALID,
  G_UNIX_SOCKET_ADDRESS_ANONYMOUS,
  G_UNIX_SOCKET_ADDRESS_PATH,
  G_UNIX_SOCKET_ADDRESS_ABSTRACT,
  G_UNIX_SOCKET_ADDRESS_ABSTRACT_PADDED
} GUnixSocketAddressType;

/**
 * GBusType:
 * @G_BUS_TYPE_STARTER: An alias for the message bus that activated the process, if any.
 * @G_BUS_TYPE_NONE: Not a message bus.
 * @G_BUS_TYPE_SYSTEM: The system-wide message bus.
 * @G_BUS_TYPE_SESSION: The login session message bus.
 *
 * An enumeration for well-known message buses.
 *
 * Since: 2.26
 */
typedef enum
{
  G_BUS_TYPE_STARTER = -1,
  G_BUS_TYPE_NONE = 0,
  G_BUS_TYPE_SYSTEM  = 1,
  G_BUS_TYPE_SESSION = 2
} GBusType;

/**
 * GBusNameOwnerFlags:
 * @G_BUS_NAME_OWNER_FLAGS_NONE: No flags set.
 * @G_BUS_NAME_OWNER_FLAGS_ALLOW_REPLACEMENT: Allow another message bus connection to claim the name.
 * @G_BUS_NAME_OWNER_FLAGS_REPLACE: If another message bus connection owns the name and have
 * specified #G_BUS_NAME_OWNER_FLAGS_ALLOW_REPLACEMENT, then take the name from the other connection.
 * @G_BUS_NAME_OWNER_FLAGS_DO_NOT_QUEUE: If another message bus connection owns the name, immediately
 * return an error from g_bus_own_name() rather than entering the waiting queue for that name. (Since 2.54)
 *
 * Flags used in g_bus_own_name().
 *
 * Since: 2.26
 */
typedef enum
{
  G_BUS_NAME_OWNER_FLAGS_NONE = 0,                    /*< nick=none >*/
  G_BUS_NAME_OWNER_FLAGS_ALLOW_REPLACEMENT = (1<<0),  /*< nick=allow-replacement >*/
  G_BUS_NAME_OWNER_FLAGS_REPLACE = (1<<1),           /*< nick=replace >*/
  G_BUS_NAME_OWNER_FLAGS_DO_NOT_QUEUE = (1<<2)       /*< nick=do-not-queue >*/
} GBusNameOwnerFlags;
/* When adding new flags, their numeric values must currently match those
 * used in the D-Bus Specification. */

/**
 * GBusNameWatcherFlags:
 * @G_BUS_NAME_WATCHER_FLAGS_NONE: No flags set.
 * @G_BUS_NAME_WATCHER_FLAGS_AUTO_START: If no-one owns the name when
 * beginning to watch the name, ask the bus to launch an owner for the
 * name.
 *
 * Flags used in g_bus_watch_name().
 *
 * Since: 2.26
 */
typedef enum
{
  G_BUS_NAME_WATCHER_FLAGS_NONE = 0,
  G_BUS_NAME_WATCHER_FLAGS_AUTO_START = (1<<0)
} GBusNameWatcherFlags;

/**
 * GDBusProxyFlags:
 * @G_DBUS_PROXY_FLAGS_NONE: No flags set.
 * @G_DBUS_PROXY_FLAGS_DO_NOT_LOAD_PROPERTIES: Don't load properties.
 * @G_DBUS_PROXY_FLAGS_DO_NOT_CONNECT_SIGNALS: Don't connect to signals on the remote object.
 * @G_DBUS_PROXY_FLAGS_DO_NOT_AUTO_START: If the proxy is for a well-known name,
 * do not ask the bus to launch an owner during proxy initialization or a method call.
 * This flag is only meaningful in proxies for well-known names.
 * @G_DBUS_PROXY_FLAGS_GET_INVALIDATED_PROPERTIES: If set, the property value for any __invalidated property__ will be (asynchronously) retrieved upon receiving the [`PropertiesChanged`](http://dbus.freedesktop.org/doc/dbus-specification.html#standard-interfaces-properties) D-Bus signal and the property will not cause emission of the #GDBusProxy::g-properties-changed signal. When the value is received the #GDBusProxy::g-properties-changed signal is emitted for the property along with the retrieved value. Since 2.32.
 * @G_DBUS_PROXY_FLAGS_DO_NOT_AUTO_START_AT_CONSTRUCTION: If the proxy is for a well-known name,
 * do not ask the bus to launch an owner during proxy initialization, but allow it to be
 * autostarted by a method call. This flag is only meaningful in proxies for well-known names,
 * and only if %G_DBUS_PROXY_FLAGS_DO_NOT_AUTO_START is not also specified.
 *
 * Flags used when constructing an instance of a #GDBusProxy derived class.
 *
 * Since: 2.26
 */
typedef enum
{
  G_DBUS_PROXY_FLAGS_NONE = 0,
  G_DBUS_PROXY_FLAGS_DO_NOT_LOAD_PROPERTIES = (1<<0),
  G_DBUS_PROXY_FLAGS_DO_NOT_CONNECT_SIGNALS = (1<<1),
  G_DBUS_PROXY_FLAGS_DO_NOT_AUTO_START = (1<<2),
  G_DBUS_PROXY_FLAGS_GET_INVALIDATED_PROPERTIES = (1<<3),
  G_DBUS_PROXY_FLAGS_DO_NOT_AUTO_START_AT_CONSTRUCTION = (1<<4)
} GDBusProxyFlags;

/**
 * GDBusError:
 * @G_DBUS_ERROR_FAILED:
 * A generic error; "something went wrong" - see the error message for
 * more.
 * @G_DBUS_ERROR_NO_MEMORY:
 * There was not enough memory to complete an operation.
 * @G_DBUS_ERROR_SERVICE_UNKNOWN:
 * The bus doesn't know how to launch a service to supply the bus name
 * you wanted.
 * @G_DBUS_ERROR_NAME_HAS_NO_OWNER:
 * The bus name you referenced doesn't exist (i.e. no application owns
 * it).
 * @G_DBUS_ERROR_NO_REPLY:
 * No reply to a message expecting one, usually means a timeout occurred.
 * @G_DBUS_ERROR_IO_ERROR:
 * Something went wrong reading or writing to a socket, for example.
 * @G_DBUS_ERROR_BAD_ADDRESS:
 * A D-Bus bus address was malformed.
 * @G_DBUS_ERROR_NOT_SUPPORTED:
 * Requested operation isn't supported (like ENOSYS on UNIX).
 * @G_DBUS_ERROR_LIMITS_EXCEEDED:
 * Some limited resource is exhausted.
 * @G_DBUS_ERROR_ACCESS_DENIED:
 * Security restrictions don't allow doing what you're trying to do.
 * @G_DBUS_ERROR_AUTH_FAILED:
 * Authentication didn't work.
 * @G_DBUS_ERROR_NO_SERVER:
 * Unable to connect to server (probably caused by ECONNREFUSED on a
 * socket).
 * @G_DBUS_ERROR_TIMEOUT:
 * Certain timeout errors, possibly ETIMEDOUT on a socket.  Note that
 * %G_DBUS_ERROR_NO_REPLY is used for message reply timeouts. Warning:
 * this is confusingly-named given that %G_DBUS_ERROR_TIMED_OUT also
 * exists. We can't fix it for compatibility reasons so just be
 * careful.
 * @G_DBUS_ERROR_NO_NETWORK:
 * No network access (probably ENETUNREACH on a socket).
 * @G_DBUS_ERROR_ADDRESS_IN_USE:
 * Can't bind a socket since its address is in use (i.e. EADDRINUSE).
 * @G_DBUS_ERROR_DISCONNECTED:
 * The connection is disconnected and you're trying to use it.
 * @G_DBUS_ERROR_INVALID_ARGS:
 * Invalid arguments passed to a method call.
 * @G_DBUS_ERROR_FILE_NOT_FOUND:
 * Missing file.
 * @G_DBUS_ERROR_FILE_EXISTS:
 * Existing file and the operation you're using does not silently overwrite.
 * @G_DBUS_ERROR_UNKNOWN_METHOD:
 * Method name you invoked isn't known by the object you invoked it on.
 * @G_DBUS_ERROR_UNKNOWN_OBJECT:
 * Object you invoked a method on isn't known. Since 2.42
 * @G_DBUS_ERROR_UNKNOWN_INTERFACE:
 * Interface you invoked a method on isn't known by the object. Since 2.42
 * @G_DBUS_ERROR_UNKNOWN_PROPERTY:
 * Property you tried to access isn't known by the object. Since 2.42
 * @G_DBUS_ERROR_PROPERTY_READ_ONLY:
 * Property you tried to set is read-only. Since 2.42
 * @G_DBUS_ERROR_TIMED_OUT:
 * Certain timeout errors, e.g. while starting a service. Warning: this is
 * confusingly-named given that %G_DBUS_ERROR_TIMEOUT also exists. We
 * can't fix it for compatibility reasons so just be careful.
 * @G_DBUS_ERROR_MATCH_RULE_NOT_FOUND:
 * Tried to remove or modify a match rule that didn't exist.
 * @G_DBUS_ERROR_MATCH_RULE_INVALID:
 * The match rule isn't syntactically valid.
 * @G_DBUS_ERROR_SPAWN_EXEC_FAILED:
 * While starting a new process, the exec() call failed.
 * @G_DBUS_ERROR_SPAWN_FORK_FAILED:
 * While starting a new process, the fork() call failed.
 * @G_DBUS_ERROR_SPAWN_CHILD_EXITED:
 * While starting a new process, the child exited with a status code.
 * @G_DBUS_ERROR_SPAWN_CHILD_SIGNALED:
 * While starting a new process, the child exited on a signal.
 * @G_DBUS_ERROR_SPAWN_FAILED:
 * While starting a new process, something went wrong.
 * @G_DBUS_ERROR_SPAWN_SETUP_FAILED:
 * We failed to setup the environment correctly.
 * @G_DBUS_ERROR_SPAWN_CONFIG_INVALID:
 * We failed to setup the config parser correctly.
 * @G_DBUS_ERROR_SPAWN_SERVICE_INVALID:
 * Bus name was not valid.
 * @G_DBUS_ERROR_SPAWN_SERVICE_NOT_FOUND:
 * Service file not found in system-services directory.
 * @G_DBUS_ERROR_SPAWN_PERMISSIONS_INVALID:
 * Permissions are incorrect on the setuid helper.
 * @G_DBUS_ERROR_SPAWN_FILE_INVALID:
 * Service file invalid (Name, User or Exec missing).
 * @G_DBUS_ERROR_SPAWN_NO_MEMORY:
 * Tried to get a UNIX process ID and it wasn't available.
 * @G_DBUS_ERROR_UNIX_PROCESS_ID_UNKNOWN:
 * Tried to get a UNIX process ID and it wasn't available.
 * @G_DBUS_ERROR_INVALID_SIGNATURE:
 * A type signature is not valid.
 * @G_DBUS_ERROR_INVALID_FILE_CONTENT:
 * A file contains invalid syntax or is otherwise broken.
 * @G_DBUS_ERROR_SELINUX_SECURITY_CONTEXT_UNKNOWN:
 * Asked for SELinux security context and it wasn't available.
 * @G_DBUS_ERROR_ADT_AUDIT_DATA_UNKNOWN:
 * Asked for ADT audit data and it wasn't available.
 * @G_DBUS_ERROR_OBJECT_PATH_IN_USE:
 * There's already an object with the requested object path.
 *
 * Error codes for the %G_DBUS_ERROR error domain.
 *
 * Since: 2.26
 */
typedef enum
{
  /* Well-known errors in the org.freedesktop.DBus.Error namespace */
  G_DBUS_ERROR_FAILED,                           /* org.freedesktop.DBus.Error.Failed */
  G_DBUS_ERROR_NO_MEMORY,                        /* org.freedesktop.DBus.Error.NoMemory */
  G_DBUS_ERROR_SERVICE_UNKNOWN,                  /* org.freedesktop.DBus.Error.ServiceUnknown */
  G_DBUS_ERROR_NAME_HAS_NO_OWNER,                /* org.freedesktop.DBus.Error.NameHasNoOwner */
  G_DBUS_ERROR_NO_REPLY,                         /* org.freedesktop.DBus.Error.NoReply */
  G_DBUS_ERROR_IO_ERROR,                         /* org.freedesktop.DBus.Error.IOError */
  G_DBUS_ERROR_BAD_ADDRESS,                      /* org.freedesktop.DBus.Error.BadAddress */
  G_DBUS_ERROR_NOT_SUPPORTED,                    /* org.freedesktop.DBus.Error.NotSupported */
  G_DBUS_ERROR_LIMITS_EXCEEDED,                  /* org.freedesktop.DBus.Error.LimitsExceeded */
  G_DBUS_ERROR_ACCESS_DENIED,                    /* org.freedesktop.DBus.Error.AccessDenied */
  G_DBUS_ERROR_AUTH_FAILED,                      /* org.freedesktop.DBus.Error.AuthFailed */
  G_DBUS_ERROR_NO_SERVER,                        /* org.freedesktop.DBus.Error.NoServer */
  G_DBUS_ERROR_TIMEOUT,                          /* org.freedesktop.DBus.Error.Timeout */
  G_DBUS_ERROR_NO_NETWORK,                       /* org.freedesktop.DBus.Error.NoNetwork */
  G_DBUS_ERROR_ADDRESS_IN_USE,                   /* org.freedesktop.DBus.Error.AddressInUse */
  G_DBUS_ERROR_DISCONNECTED,                     /* org.freedesktop.DBus.Error.Disconnected */
  G_DBUS_ERROR_INVALID_ARGS,                     /* org.freedesktop.DBus.Error.InvalidArgs */
  G_DBUS_ERROR_FILE_NOT_FOUND,                   /* org.freedesktop.DBus.Error.FileNotFound */
  G_DBUS_ERROR_FILE_EXISTS,                      /* org.freedesktop.DBus.Error.FileExists */
  G_DBUS_ERROR_UNKNOWN_METHOD,                   /* org.freedesktop.DBus.Error.UnknownMethod */
  G_DBUS_ERROR_TIMED_OUT,                        /* org.freedesktop.DBus.Error.TimedOut */
  G_DBUS_ERROR_MATCH_RULE_NOT_FOUND,             /* org.freedesktop.DBus.Error.MatchRuleNotFound */
  G_DBUS_ERROR_MATCH_RULE_INVALID,               /* org.freedesktop.DBus.Error.MatchRuleInvalid */
  G_DBUS_ERROR_SPAWN_EXEC_FAILED,                /* org.freedesktop.DBus.Error.Spawn.ExecFailed */
  G_DBUS_ERROR_SPAWN_FORK_FAILED,                /* org.freedesktop.DBus.Error.Spawn.ForkFailed */
  G_DBUS_ERROR_SPAWN_CHILD_EXITED,               /* org.freedesktop.DBus.Error.Spawn.ChildExited */
  G_DBUS_ERROR_SPAWN_CHILD_SIGNALED,             /* org.freedesktop.DBus.Error.Spawn.ChildSignaled */
  G_DBUS_ERROR_SPAWN_FAILED,                     /* org.freedesktop.DBus.Error.Spawn.Failed */
  G_DBUS_ERROR_SPAWN_SETUP_FAILED,               /* org.freedesktop.DBus.Error.Spawn.FailedToSetup */
  G_DBUS_ERROR_SPAWN_CONFIG_INVALID,             /* org.freedesktop.DBus.Error.Spawn.ConfigInvalid */
  G_DBUS_ERROR_SPAWN_SERVICE_INVALID,            /* org.freedesktop.DBus.Error.Spawn.ServiceNotValid */
  G_DBUS_ERROR_SPAWN_SERVICE_NOT_FOUND,          /* org.freedesktop.DBus.Error.Spawn.ServiceNotFound */
  G_DBUS_ERROR_SPAWN_PERMISSIONS_INVALID,        /* org.freedesktop.DBus.Error.Spawn.PermissionsInvalid */
  G_DBUS_ERROR_SPAWN_FILE_INVALID,               /* org.freedesktop.DBus.Error.Spawn.FileInvalid */
  G_DBUS_ERROR_SPAWN_NO_MEMORY,                  /* org.freedesktop.DBus.Error.Spawn.NoMemory */
  G_DBUS_ERROR_UNIX_PROCESS_ID_UNKNOWN,          /* org.freedesktop.DBus.Error.UnixProcessIdUnknown */
  G_DBUS_ERROR_INVALID_SIGNATURE,                /* org.freedesktop.DBus.Error.InvalidSignature */
  G_DBUS_ERROR_INVALID_FILE_CONTENT,             /* org.freedesktop.DBus.Error.InvalidFileContent */
  G_DBUS_ERROR_SELINUX_SECURITY_CONTEXT_UNKNOWN, /* org.freedesktop.DBus.Error.SELinuxSecurityContextUnknown */
  G_DBUS_ERROR_ADT_AUDIT_DATA_UNKNOWN,           /* org.freedesktop.DBus.Error.AdtAuditDataUnknown */
  G_DBUS_ERROR_OBJECT_PATH_IN_USE,               /* org.freedesktop.DBus.Error.ObjectPathInUse */
  G_DBUS_ERROR_UNKNOWN_OBJECT,                   /* org.freedesktop.DBus.Error.UnknownObject */
  G_DBUS_ERROR_UNKNOWN_INTERFACE,                /* org.freedesktop.DBus.Error.UnknownInterface */
  G_DBUS_ERROR_UNKNOWN_PROPERTY,                 /* org.freedesktop.DBus.Error.UnknownProperty */
  G_DBUS_ERROR_PROPERTY_READ_ONLY                /* org.freedesktop.DBus.Error.PropertyReadOnly */
} GDBusError;
/* Remember to update g_dbus_error_quark() in gdbuserror.c if you extend this enumeration */

/**
 * GDBusConnectionFlags:
 * @G_DBUS_CONNECTION_FLAGS_NONE: No flags set.
 * @G_DBUS_CONNECTION_FLAGS_AUTHENTICATION_CLIENT: Perform authentication against server.
 * @G_DBUS_CONNECTION_FLAGS_AUTHENTICATION_SERVER: Perform authentication against client.
 * @G_DBUS_CONNECTION_FLAGS_AUTHENTICATION_ALLOW_ANONYMOUS: When
 * authenticating as a server, allow the anonymous authentication
 * method.
 * @G_DBUS_CONNECTION_FLAGS_MESSAGE_BUS_CONNECTION: Pass this flag if connecting to a peer that is a
 * message bus. This means that the Hello() method will be invoked as part of the connection setup.
 * @G_DBUS_CONNECTION_FLAGS_DELAY_MESSAGE_PROCESSING: If set, processing of D-Bus messages is
 * delayed until g_dbus_connection_start_message_processing() is called.
 *
 * Flags used when creating a new #GDBusConnection.
 *
 * Since: 2.26
 */
typedef enum {
  G_DBUS_CONNECTION_FLAGS_NONE = 0,
  G_DBUS_CONNECTION_FLAGS_AUTHENTICATION_CLIENT = (1<<0),
  G_DBUS_CONNECTION_FLAGS_AUTHENTICATION_SERVER = (1<<1),
  G_DBUS_CONNECTION_FLAGS_AUTHENTICATION_ALLOW_ANONYMOUS = (1<<2),
  G_DBUS_CONNECTION_FLAGS_MESSAGE_BUS_CONNECTION = (1<<3),
  G_DBUS_CONNECTION_FLAGS_DELAY_MESSAGE_PROCESSING = (1<<4)
} GDBusConnectionFlags;

/**
 * GDBusCapabilityFlags:
 * @G_DBUS_CAPABILITY_FLAGS_NONE: No flags set.
 * @G_DBUS_CAPABILITY_FLAGS_UNIX_FD_PASSING: The connection
 * supports exchanging UNIX file descriptors with the remote peer.
 *
 * Capabilities negotiated with the remote peer.
 *
 * Since: 2.26
 */
typedef enum {
  G_DBUS_CAPABILITY_FLAGS_NONE = 0,
  G_DBUS_CAPABILITY_FLAGS_UNIX_FD_PASSING = (1<<0)
} GDBusCapabilityFlags;

/**
 * GDBusCallFlags:
 * @G_DBUS_CALL_FLAGS_NONE: No flags set.
 * @G_DBUS_CALL_FLAGS_NO_AUTO_START: The bus must not launch
 * an owner for the destination name in response to this method
 * invocation.
 * @G_DBUS_CALL_FLAGS_ALLOW_INTERACTIVE_AUTHORIZATION: the caller is prepared to
 * wait for interactive authorization. Since 2.46.
 *
 * Flags used in g_dbus_connection_call() and similar APIs.
 *
 * Since: 2.26
 */
typedef enum {
  G_DBUS_CALL_FLAGS_NONE = 0,
  G_DBUS_CALL_FLAGS_NO_AUTO_START = (1<<0),
  G_DBUS_CALL_FLAGS_ALLOW_INTERACTIVE_AUTHORIZATION = (1<<1)
} GDBusCallFlags;
/* (1<<31) is reserved for internal use by GDBusConnection, do not use it. */

/**
 * GDBusMessageType:
 * @G_DBUS_MESSAGE_TYPE_INVALID: Message is of invalid type.
 * @G_DBUS_MESSAGE_TYPE_METHOD_CALL: Method call.
 * @G_DBUS_MESSAGE_TYPE_METHOD_RETURN: Method reply.
 * @G_DBUS_MESSAGE_TYPE_ERROR: Error reply.
 * @G_DBUS_MESSAGE_TYPE_SIGNAL: Signal emission.
 *
 * Message types used in #GDBusMessage.
 *
 * Since: 2.26
 */
typedef enum {
  G_DBUS_MESSAGE_TYPE_INVALID,
  G_DBUS_MESSAGE_TYPE_METHOD_CALL,
  G_DBUS_MESSAGE_TYPE_METHOD_RETURN,
  G_DBUS_MESSAGE_TYPE_ERROR,
  G_DBUS_MESSAGE_TYPE_SIGNAL
} GDBusMessageType;

/**
 * GDBusMessageFlags:
 * @G_DBUS_MESSAGE_FLAGS_NONE: No flags set.
 * @G_DBUS_MESSAGE_FLAGS_NO_REPLY_EXPECTED: A reply is not expected.
 * @G_DBUS_MESSAGE_FLAGS_NO_AUTO_START: The bus must not launch an
 * owner for the destination name in response to this message.
 * @G_DBUS_MESSAGE_FLAGS_ALLOW_INTERACTIVE_AUTHORIZATION: If set on a method
 * call, this flag means that the caller is prepared to wait for interactive
 * authorization. Since 2.46.
 *
 * Message flags used in #GDBusMessage.
 *
 * Since: 2.26
 */
typedef enum {
  G_DBUS_MESSAGE_FLAGS_NONE = 0,
  G_DBUS_MESSAGE_FLAGS_NO_REPLY_EXPECTED = (1<<0),
  G_DBUS_MESSAGE_FLAGS_NO_AUTO_START = (1<<1),
  G_DBUS_MESSAGE_FLAGS_ALLOW_INTERACTIVE_AUTHORIZATION = (1<<2)
} GDBusMessageFlags;

/**
 * GDBusMessageHeaderField:
 * @G_DBUS_MESSAGE_HEADER_FIELD_INVALID: Not a valid header field.
 * @G_DBUS_MESSAGE_HEADER_FIELD_PATH: The object path.
 * @G_DBUS_MESSAGE_HEADER_FIELD_INTERFACE: The interface name.
 * @G_DBUS_MESSAGE_HEADER_FIELD_MEMBER: The method or signal name.
 * @G_DBUS_MESSAGE_HEADER_FIELD_ERROR_NAME: The name of the error that occurred.
 * @G_DBUS_MESSAGE_HEADER_FIELD_REPLY_SERIAL: The serial number the message is a reply to.
 * @G_DBUS_MESSAGE_HEADER_FIELD_DESTINATION: The name the message is intended for.
 * @G_DBUS_MESSAGE_HEADER_FIELD_SENDER: Unique name of the sender of the message (filled in by the bus).
 * @G_DBUS_MESSAGE_HEADER_FIELD_SIGNATURE: The signature of the message body.
 * @G_DBUS_MESSAGE_HEADER_FIELD_NUM_UNIX_FDS: The number of UNIX file descriptors that accompany the message.
 *
 * Header fields used in #GDBusMessage.
 *
 * Since: 2.26
 */
typedef enum {
  G_DBUS_MESSAGE_HEADER_FIELD_INVALID,
  G_DBUS_MESSAGE_HEADER_FIELD_PATH,
  G_DBUS_MESSAGE_HEADER_FIELD_INTERFACE,
  G_DBUS_MESSAGE_HEADER_FIELD_MEMBER,
  G_DBUS_MESSAGE_HEADER_FIELD_ERROR_NAME,
  G_DBUS_MESSAGE_HEADER_FIELD_REPLY_SERIAL,
  G_DBUS_MESSAGE_HEADER_FIELD_DESTINATION,
  G_DBUS_MESSAGE_HEADER_FIELD_SENDER,
  G_DBUS_MESSAGE_HEADER_FIELD_SIGNATURE,
  G_DBUS_MESSAGE_HEADER_FIELD_NUM_UNIX_FDS
} GDBusMessageHeaderField;

/**
 * GDBusPropertyInfoFlags:
 * @G_DBUS_PROPERTY_INFO_FLAGS_NONE: No flags set.
 * @G_DBUS_PROPERTY_INFO_FLAGS_READABLE: Property is readable.
 * @G_DBUS_PROPERTY_INFO_FLAGS_WRITABLE: Property is writable.
 *
 * Flags describing the access control of a D-Bus property.
 *
 * Since: 2.26
 */
typedef enum
{
  G_DBUS_PROPERTY_INFO_FLAGS_NONE = 0,
  G_DBUS_PROPERTY_INFO_FLAGS_READABLE = (1<<0),
  G_DBUS_PROPERTY_INFO_FLAGS_WRITABLE = (1<<1)
} GDBusPropertyInfoFlags;

/**
 * GDBusSubtreeFlags:
 * @G_DBUS_SUBTREE_FLAGS_NONE: No flags set.
 * @G_DBUS_SUBTREE_FLAGS_DISPATCH_TO_UNENUMERATED_NODES: Method calls to objects not in the enumerated range
 *                                                       will still be dispatched. This is useful if you want
 *                                                       to dynamically spawn objects in the subtree.
 *
 * Flags passed to g_dbus_connection_register_subtree().
 *
 * Since: 2.26
 */
typedef enum
{
  G_DBUS_SUBTREE_FLAGS_NONE = 0,
  G_DBUS_SUBTREE_FLAGS_DISPATCH_TO_UNENUMERATED_NODES = (1<<0)
} GDBusSubtreeFlags;

/**
 * GDBusServerFlags:
 * @G_DBUS_SERVER_FLAGS_NONE: No flags set.
 * @G_DBUS_SERVER_FLAGS_RUN_IN_THREAD: All #GDBusServer::new-connection
 * signals will run in separated dedicated threads (see signal for
 * details).
 * @G_DBUS_SERVER_FLAGS_AUTHENTICATION_ALLOW_ANONYMOUS: Allow the anonymous
 * authentication method.
 *
 * Flags used when creating a #GDBusServer.
 *
 * Since: 2.26
 */
typedef enum
{
  G_DBUS_SERVER_FLAGS_NONE = 0,
  G_DBUS_SERVER_FLAGS_RUN_IN_THREAD = (1<<0),
  G_DBUS_SERVER_FLAGS_AUTHENTICATION_ALLOW_ANONYMOUS = (1<<1)
} GDBusServerFlags;

/**
 * GDBusSignalFlags:
 * @G_DBUS_SIGNAL_FLAGS_NONE: No flags set.
 * @G_DBUS_SIGNAL_FLAGS_NO_MATCH_RULE: Don't actually send the AddMatch
 * D-Bus call for this signal subscription.  This gives you more control
 * over which match rules you add (but you must add them manually).
 * @G_DBUS_SIGNAL_FLAGS_MATCH_ARG0_NAMESPACE: Match first arguments that
 * contain a bus or interface name with the given namespace.
 * @G_DBUS_SIGNAL_FLAGS_MATCH_ARG0_PATH: Match first arguments that
 * contain an object path that is either equivalent to the given path,
 * or one of the paths is a subpath of the other.
 *
 * Flags used when subscribing to signals via g_dbus_connection_signal_subscribe().
 *
 * Since: 2.26
 */
typedef enum /*< flags >*/
{
  G_DBUS_SIGNAL_FLAGS_NONE = 0,
  G_DBUS_SIGNAL_FLAGS_NO_MATCH_RULE = (1<<0),
  G_DBUS_SIGNAL_FLAGS_MATCH_ARG0_NAMESPACE = (1<<1),
  G_DBUS_SIGNAL_FLAGS_MATCH_ARG0_PATH = (1<<2)
} GDBusSignalFlags;

/**
 * GDBusSendMessageFlags:
 * @G_DBUS_SEND_MESSAGE_FLAGS_NONE: No flags set.
 * @G_DBUS_SEND_MESSAGE_FLAGS_PRESERVE_SERIAL: Do not automatically
 * assign a serial number from the #GDBusConnection object when
 * sending a message.
 *
 * Flags used when sending #GDBusMessages on a #GDBusConnection.
 *
 * Since: 2.26
 */
typedef enum
{
  G_DBUS_SEND_MESSAGE_FLAGS_NONE = 0,
  G_DBUS_SEND_MESSAGE_FLAGS_PRESERVE_SERIAL = (1<<0)
} GDBusSendMessageFlags;
/* (1<<31) is reserved for internal use by GDBusConnection, do not use it. */

/**
 * GCredentialsType:
 * @G_CREDENTIALS_TYPE_INVALID: Indicates an invalid native credential type.
 * @G_CREDENTIALS_TYPE_LINUX_UCRED: The native credentials type is a struct ucred.
 * @G_CREDENTIALS_TYPE_FREEBSD_CMSGCRED: The native credentials type is a struct cmsgcred.
 * @G_CREDENTIALS_TYPE_OPENBSD_SOCKPEERCRED: The native credentials type is a struct sockpeercred. Added in 2.30.
 * @G_CREDENTIALS_TYPE_SOLARIS_UCRED: The native credentials type is a ucred_t. Added in 2.40.
 * @G_CREDENTIALS_TYPE_NETBSD_UNPCBID: The native credentials type is a struct unpcbid.
 *
 * Enumeration describing different kinds of native credential types.
 *
 * Since: 2.26
 */
typedef enum
{
  G_CREDENTIALS_TYPE_INVALID,
  G_CREDENTIALS_TYPE_LINUX_UCRED,
  G_CREDENTIALS_TYPE_FREEBSD_CMSGCRED,
  G_CREDENTIALS_TYPE_OPENBSD_SOCKPEERCRED,
  G_CREDENTIALS_TYPE_SOLARIS_UCRED,
  G_CREDENTIALS_TYPE_NETBSD_UNPCBID
} GCredentialsType;

/**
 * GDBusMessageByteOrder:
 * @G_DBUS_MESSAGE_BYTE_ORDER_BIG_ENDIAN: The byte order is big endian.
 * @G_DBUS_MESSAGE_BYTE_ORDER_LITTLE_ENDIAN: The byte order is little endian.
 *
 * Enumeration used to describe the byte order of a D-Bus message.
 *
 * Since: 2.26
 */
typedef enum
{
  G_DBUS_MESSAGE_BYTE_ORDER_BIG_ENDIAN    = 'B',
  G_DBUS_MESSAGE_BYTE_ORDER_LITTLE_ENDIAN = 'l'
} GDBusMessageByteOrder;

/**
 * GApplicationFlags:
 * @G_APPLICATION_FLAGS_NONE: Default
 * @G_APPLICATION_IS_SERVICE: Run as a service. In this mode, registration
 *      fails if the service is already running, and the application
 *      will initially wait up to 10 seconds for an initial activation
 *      message to arrive.
 * @G_APPLICATION_IS_LAUNCHER: Don't try to become the primary instance.
 * @G_APPLICATION_HANDLES_OPEN: This application handles opening files (in
 *     the primary instance). Note that this flag only affects the default
 *     implementation of local_command_line(), and has no effect if
 *     %G_APPLICATION_HANDLES_COMMAND_LINE is given.
 *     See g_application_run() for details.
 * @G_APPLICATION_HANDLES_COMMAND_LINE: This application handles command line
 *     arguments (in the primary instance). Note that this flag only affect
 *     the default implementation of local_command_line().
 *     See g_application_run() for details.
 * @G_APPLICATION_SEND_ENVIRONMENT: Send the environment of the
 *     launching process to the primary instance. Set this flag if your
 *     application is expected to behave differently depending on certain
 *     environment variables. For instance, an editor might be expected
 *     to use the `GIT_COMMITTER_NAME` environment variable
 *     when editing a git commit message. The environment is available
 *     to the #GApplication::command-line signal handler, via
 *     g_application_command_line_getenv().
 * @G_APPLICATION_NON_UNIQUE: Make no attempts to do any of the typical
 *     single-instance application negotiation, even if the application
 *     ID is given.  The application neither attempts to become the
 *     owner of the application ID nor does it check if an existing
 *     owner already exists.  Everything occurs in the local process.
 *     Since: 2.30.
 * @G_APPLICATION_CAN_OVERRIDE_APP_ID: Allow users to override the
 *     application ID from the command line with `--gapplication-app-id`.
 *     Since: 2.48
 * @G_APPLICATION_ALLOW_REPLACEMENT: Allow another instance to take over
 *     the bus name. Since: 2.60
 * @G_APPLICATION_REPLACE: Take over from another instance. This flag is
 *     usually set by passing `--gapplication-replace` on the commandline.
 *     Since: 2.60
 *
 * Flags used to define the behaviour of a #GApplication.
 *
 * Since: 2.28
 **/
typedef enum
{
  G_APPLICATION_FLAGS_NONE,
  G_APPLICATION_IS_SERVICE  =          (1 << 0),
  G_APPLICATION_IS_LAUNCHER =          (1 << 1),

  G_APPLICATION_HANDLES_OPEN =         (1 << 2),
  G_APPLICATION_HANDLES_COMMAND_LINE = (1 << 3),
  G_APPLICATION_SEND_ENVIRONMENT    =  (1 << 4),

  G_APPLICATION_NON_UNIQUE =           (1 << 5),

  G_APPLICATION_CAN_OVERRIDE_APP_ID =  (1 << 6),
  G_APPLICATION_ALLOW_REPLACEMENT   =  (1 << 7),
  G_APPLICATION_REPLACE             =  (1 << 8)
} GApplicationFlags;

/**
 * GTlsError:
 * @G_TLS_ERROR_UNAVAILABLE: No TLS provider is available
 * @G_TLS_ERROR_MISC: Miscellaneous TLS error
 * @G_TLS_ERROR_BAD_CERTIFICATE: The certificate presented could not
 *   be parsed or failed validation.
 * @G_TLS_ERROR_NOT_TLS: The TLS handshake failed because the
 *   peer does not seem to be a TLS server.
 * @G_TLS_ERROR_HANDSHAKE: The TLS handshake failed because the
 *   peer's certificate was not acceptable.
 * @G_TLS_ERROR_CERTIFICATE_REQUIRED: The TLS handshake failed because
 *   the server requested a client-side certificate, but none was
 *   provided. See g_tls_connection_set_certificate().
 * @G_TLS_ERROR_EOF: The TLS connection was closed without proper
 *   notice, which may indicate an attack. See
 *   g_tls_connection_set_require_close_notify().
 * @G_TLS_ERROR_INAPPROPRIATE_FALLBACK: The TLS handshake failed
 *   because the client sent the fallback SCSV, indicating a protocol
 *   downgrade attack. Since: 2.60
 *
 * An error code used with %G_TLS_ERROR in a #GError returned from a
 * TLS-related routine.
 *
 * Since: 2.28
 */
typedef enum {
  G_TLS_ERROR_UNAVAILABLE,
  G_TLS_ERROR_MISC,
  G_TLS_ERROR_BAD_CERTIFICATE,
  G_TLS_ERROR_NOT_TLS,
  G_TLS_ERROR_HANDSHAKE,
  G_TLS_ERROR_CERTIFICATE_REQUIRED,
  G_TLS_ERROR_EOF,
  G_TLS_ERROR_INAPPROPRIATE_FALLBACK
} GTlsError;

/**
 * GTlsCertificateFlags:
 * @G_TLS_CERTIFICATE_UNKNOWN_CA: The signing certificate authority is
 *   not known.
 * @G_TLS_CERTIFICATE_BAD_IDENTITY: The certificate does not match the
 *   expected identity of the site that it was retrieved from.
 * @G_TLS_CERTIFICATE_NOT_ACTIVATED: The certificate's activation time
 *   is still in the future
 * @G_TLS_CERTIFICATE_EXPIRED: The certificate has expired
 * @G_TLS_CERTIFICATE_REVOKED: The certificate has been revoked
 *   according to the #GTlsConnection's certificate revocation list.
 * @G_TLS_CERTIFICATE_INSECURE: The certificate's algorithm is
 *   considered insecure.
 * @G_TLS_CERTIFICATE_GENERIC_ERROR: Some other error occurred validating
 *   the certificate
 * @G_TLS_CERTIFICATE_VALIDATE_ALL: the combination of all of the above
 *   flags
 *
 * A set of flags describing TLS certification validation. This can be
 * used to set which validation steps to perform (eg, with
 * g_tls_client_connection_set_validation_flags()), or to describe why
 * a particular certificate was rejected (eg, in
 * #GTlsConnection::accept-certificate).
 *
 * Since: 2.28
 */
typedef enum {
  G_TLS_CERTIFICATE_UNKNOWN_CA    = (1 << 0),
  G_TLS_CERTIFICATE_BAD_IDENTITY  = (1 << 1),
  G_TLS_CERTIFICATE_NOT_ACTIVATED = (1 << 2),
  G_TLS_CERTIFICATE_EXPIRED       = (1 << 3),
  G_TLS_CERTIFICATE_REVOKED       = (1 << 4),
  G_TLS_CERTIFICATE_INSECURE      = (1 << 5),
  G_TLS_CERTIFICATE_GENERIC_ERROR = (1 << 6),

  G_TLS_CERTIFICATE_VALIDATE_ALL  = 0x007f
} GTlsCertificateFlags;

/**
 * GTlsAuthenticationMode:
 * @G_TLS_AUTHENTICATION_NONE: client authentication not required
 * @G_TLS_AUTHENTICATION_REQUESTED: client authentication is requested
 * @G_TLS_AUTHENTICATION_REQUIRED: client authentication is required
 *
 * The client authentication mode for a #GTlsServerConnection.
 *
 * Since: 2.28
 */
typedef enum {
  G_TLS_AUTHENTICATION_NONE,
  G_TLS_AUTHENTICATION_REQUESTED,
  G_TLS_AUTHENTICATION_REQUIRED
} GTlsAuthenticationMode;

/**
 * GTlsRehandshakeMode:
 * @G_TLS_REHANDSHAKE_NEVER: Never allow rehandshaking
 * @G_TLS_REHANDSHAKE_SAFELY: Allow safe rehandshaking only
 * @G_TLS_REHANDSHAKE_UNSAFELY: Allow unsafe rehandshaking
 *
 * When to allow rehandshaking. See
 * g_tls_connection_set_rehandshake_mode().
 *
 * Since: 2.28
 *
 * Deprecated: 2.60. Changing the rehandshake mode is no longer
 *   required for compatibility. Also, rehandshaking has been removed
 *   from the TLS protocol in TLS 1.3.
 */
typedef enum {
  G_TLS_REHANDSHAKE_NEVER,
  G_TLS_REHANDSHAKE_SAFELY,
  G_TLS_REHANDSHAKE_UNSAFELY
} GTlsRehandshakeMode;

/**
 * GTlsPasswordFlags:
 * @G_TLS_PASSWORD_NONE: No flags
 * @G_TLS_PASSWORD_RETRY: The password was wrong, and the user should retry.
 * @G_TLS_PASSWORD_MANY_TRIES: Hint to the user that the password has been
 *    wrong many times, and the user may not have many chances left.
 * @G_TLS_PASSWORD_FINAL_TRY: Hint to the user that this is the last try to get
 *    this password right.
 *
 * Various flags for the password.
 *
 * Since: 2.30
 */

typedef enum _GTlsPasswordFlags
{
  G_TLS_PASSWORD_NONE = 0,
  G_TLS_PASSWORD_RETRY = 1 << 1,
  G_TLS_PASSWORD_MANY_TRIES = 1 << 2,
  G_TLS_PASSWORD_FINAL_TRY = 1 << 3
} GTlsPasswordFlags;

/**
 * GTlsInteractionResult:
 * @G_TLS_INTERACTION_UNHANDLED: The interaction was unhandled (i.e. not
 *     implemented).
 * @G_TLS_INTERACTION_HANDLED: The interaction completed, and resulting data
 *     is available.
 * @G_TLS_INTERACTION_FAILED: The interaction has failed, or was cancelled.
 *     and the operation should be aborted.
 *
 * #GTlsInteractionResult is returned by various functions in #GTlsInteraction
 * when finishing an interaction request.
 *
 * Since: 2.30
 */
typedef enum {
  G_TLS_INTERACTION_UNHANDLED,
  G_TLS_INTERACTION_HANDLED,
  G_TLS_INTERACTION_FAILED
} GTlsInteractionResult;

/**
 * GDBusInterfaceSkeletonFlags:
 * @G_DBUS_INTERFACE_SKELETON_FLAGS_NONE: No flags set.
 * @G_DBUS_INTERFACE_SKELETON_FLAGS_HANDLE_METHOD_INVOCATIONS_IN_THREAD: Each method invocation is handled in
 *   a thread dedicated to the invocation. This means that the method implementation can use blocking IO
 *   without blocking any other part of the process. It also means that the method implementation must
 *   use locking to access data structures used by other threads.
 *
 * Flags describing the behavior of a #GDBusInterfaceSkeleton instance.
 *
 * Since: 2.30
 */
typedef enum
{
  G_DBUS_INTERFACE_SKELETON_FLAGS_NONE = 0,
  G_DBUS_INTERFACE_SKELETON_FLAGS_HANDLE_METHOD_INVOCATIONS_IN_THREAD = (1<<0)
} GDBusInterfaceSkeletonFlags;

/**
 * GDBusObjectManagerClientFlags:
 * @G_DBUS_OBJECT_MANAGER_CLIENT_FLAGS_NONE: No flags set.
 * @G_DBUS_OBJECT_MANAGER_CLIENT_FLAGS_DO_NOT_AUTO_START: If not set and the
 *   manager is for a well-known name, then request the bus to launch
 *   an owner for the name if no-one owns the name. This flag can only
 *   be used in managers for well-known names.
 *
 * Flags used when constructing a #GDBusObjectManagerClient.
 *
 * Since: 2.30
 */
typedef enum
{
  G_DBUS_OBJECT_MANAGER_CLIENT_FLAGS_NONE = 0,
  G_DBUS_OBJECT_MANAGER_CLIENT_FLAGS_DO_NOT_AUTO_START = (1<<0)
} GDBusObjectManagerClientFlags;

/**
 * GTlsDatabaseVerifyFlags:
 * @G_TLS_DATABASE_VERIFY_NONE: No verification flags
 *
 * Flags for g_tls_database_verify_chain().
 *
 * Since: 2.30
 */
typedef enum /*< flags >*/ {
  G_TLS_DATABASE_VERIFY_NONE = 0
} GTlsDatabaseVerifyFlags;

/**
 * GTlsDatabaseLookupFlags:
 * @G_TLS_DATABASE_LOOKUP_NONE: No lookup flags
 * @G_TLS_DATABASE_LOOKUP_KEYPAIR: Restrict lookup to certificates that have
 *     a private key.
 *
 * Flags for g_tls_database_lookup_certificate_for_handle(),
 * g_tls_database_lookup_certificate_issuer(),
 * and g_tls_database_lookup_certificates_issued_by().
 *
 * Since: 2.30
 */
typedef enum {
  G_TLS_DATABASE_LOOKUP_NONE = 0,
  G_TLS_DATABASE_LOOKUP_KEYPAIR = 1
} GTlsDatabaseLookupFlags;

/**
 * GTlsCertificateRequestFlags:
 * @G_TLS_CERTIFICATE_REQUEST_NONE: No flags
 *
 * Flags for g_tls_interaction_request_certificate(),
 * g_tls_interaction_request_certificate_async(), and
 * g_tls_interaction_invoke_request_certificate().
 *
 * Since: 2.40
 */
typedef enum {
  G_TLS_CERTIFICATE_REQUEST_NONE = 0
} GTlsCertificateRequestFlags;

/**
 * GIOModuleScopeFlags:
 * @G_IO_MODULE_SCOPE_NONE: No module scan flags
 * @G_IO_MODULE_SCOPE_BLOCK_DUPLICATES: When using this scope to load or
 *     scan modules, automatically block a modules which has the same base
 *     basename as previously loaded module.
 *
 * Flags for use with g_io_module_scope_new().
 *
 * Since: 2.30
 */
typedef enum {
  G_IO_MODULE_SCOPE_NONE,
  G_IO_MODULE_SCOPE_BLOCK_DUPLICATES
} GIOModuleScopeFlags;

/**
 * GSocketClientEvent:
 * @G_SOCKET_CLIENT_RESOLVING: The client is doing a DNS lookup.
 * @G_SOCKET_CLIENT_RESOLVED: The client has completed a DNS lookup.
 * @G_SOCKET_CLIENT_CONNECTING: The client is connecting to a remote
 *   host (either a proxy or the destination server).
 * @G_SOCKET_CLIENT_CONNECTED: The client has connected to a remote
 *   host.
 * @G_SOCKET_CLIENT_PROXY_NEGOTIATING: The client is negotiating
 *   with a proxy to connect to the destination server.
 * @G_SOCKET_CLIENT_PROXY_NEGOTIATED: The client has negotiated
 *   with the proxy server.
 * @G_SOCKET_CLIENT_TLS_HANDSHAKING: The client is performing a
 *   TLS handshake.
 * @G_SOCKET_CLIENT_TLS_HANDSHAKED: The client has performed a
 *   TLS handshake.
 * @G_SOCKET_CLIENT_COMPLETE: The client is done with a particular
 *   #GSocketConnectable.
 *
 * Describes an event occurring on a #GSocketClient. See the
 * #GSocketClient::event signal for more details.
 *
 * Additional values may be added to this type in the future.
 *
 * Since: 2.32
 */
typedef enum {
  G_SOCKET_CLIENT_RESOLVING,
  G_SOCKET_CLIENT_RESOLVED,
  G_SOCKET_CLIENT_CONNECTING,
  G_SOCKET_CLIENT_CONNECTED,
  G_SOCKET_CLIENT_PROXY_NEGOTIATING,
  G_SOCKET_CLIENT_PROXY_NEGOTIATED,
  G_SOCKET_CLIENT_TLS_HANDSHAKING,
  G_SOCKET_CLIENT_TLS_HANDSHAKED,
  G_SOCKET_CLIENT_COMPLETE
} GSocketClientEvent;

/**
 * GSocketListenerEvent:
 * @G_SOCKET_LISTENER_BINDING: The listener is about to bind a socket.
 * @G_SOCKET_LISTENER_BOUND: The listener has bound a socket.
 * @G_SOCKET_LISTENER_LISTENING: The listener is about to start
 *    listening on this socket.
 * @G_SOCKET_LISTENER_LISTENED: The listener is now listening on
 *   this socket.
 *
 * Describes an event occurring on a #GSocketListener. See the
 * #GSocketListener::event signal for more details.
 *
 * Additional values may be added to this type in the future.
 *
 * Since: 2.46
 */
typedef enum {
  G_SOCKET_LISTENER_BINDING,
  G_SOCKET_LISTENER_BOUND,
  G_SOCKET_LISTENER_LISTENING,
  G_SOCKET_LISTENER_LISTENED
} GSocketListenerEvent;

/**
 * GTestDBusFlags:
 * @G_TEST_DBUS_NONE: No flags.
 *
 * Flags to define future #GTestDBus behaviour.
 *
 * Since: 2.34
 */
typedef enum /*< flags >*/ {
  G_TEST_DBUS_NONE = 0
} GTestDBusFlags;

/**
 * GSubprocessFlags:
 * @G_SUBPROCESS_FLAGS_NONE: No flags.
 * @G_SUBPROCESS_FLAGS_STDIN_PIPE: create a pipe for the stdin of the
 *   spawned process that can be accessed with
 *   g_subprocess_get_stdin_pipe().
 * @G_SUBPROCESS_FLAGS_STDIN_INHERIT: stdin is inherited from the
 *   calling process.
 * @G_SUBPROCESS_FLAGS_STDOUT_PIPE: create a pipe for the stdout of the
 *   spawned process that can be accessed with
 *   g_subprocess_get_stdout_pipe().
 * @G_SUBPROCESS_FLAGS_STDOUT_SILENCE: silence the stdout of the spawned
 *   process (ie: redirect to `/dev/null`).
 * @G_SUBPROCESS_FLAGS_STDERR_PIPE: create a pipe for the stderr of the
 *   spawned process that can be accessed with
 *   g_subprocess_get_stderr_pipe().
 * @G_SUBPROCESS_FLAGS_STDERR_SILENCE: silence the stderr of the spawned
 *   process (ie: redirect to `/dev/null`).
 * @G_SUBPROCESS_FLAGS_STDERR_MERGE: merge the stderr of the spawned
 *   process with whatever the stdout happens to be.  This is a good way
 *   of directing both streams to a common log file, for example.
 * @G_SUBPROCESS_FLAGS_INHERIT_FDS: spawned processes will inherit the
 *   file descriptors of their parent, unless those descriptors have
 *   been explicitly marked as close-on-exec.  This flag has no effect
 *   over the "standard" file descriptors (stdin, stdout, stderr).
 *
 * Flags to define the behaviour of a #GSubprocess.
 *
 * Note that the default for stdin is to redirect from `/dev/null`.  For
 * stdout and stderr the default are for them to inherit the
 * corresponding descriptor from the calling process.
 *
 * Note that it is a programmer error to mix 'incompatible' flags.  For
 * example, you may not request both %G_SUBPROCESS_FLAGS_STDOUT_PIPE and
 * %G_SUBPROCESS_FLAGS_STDOUT_SILENCE.
 *
 * Since: 2.40
 **/
typedef enum {
  G_SUBPROCESS_FLAGS_NONE                  = 0,
  G_SUBPROCESS_FLAGS_STDIN_PIPE            = (1u << 0),
  G_SUBPROCESS_FLAGS_STDIN_INHERIT         = (1u << 1),
  G_SUBPROCESS_FLAGS_STDOUT_PIPE           = (1u << 2),
  G_SUBPROCESS_FLAGS_STDOUT_SILENCE        = (1u << 3),
  G_SUBPROCESS_FLAGS_STDERR_PIPE           = (1u << 4),
  G_SUBPROCESS_FLAGS_STDERR_SILENCE        = (1u << 5),
  G_SUBPROCESS_FLAGS_STDERR_MERGE          = (1u << 6),
  G_SUBPROCESS_FLAGS_INHERIT_FDS           = (1u << 7)
} GSubprocessFlags;

/**
 * GNotificationPriority:
 * @G_NOTIFICATION_PRIORITY_LOW: for notifications that do not require
 *   immediate attention - typically used for contextual background
 *   information, such as contact birthdays or local weather
 * @G_NOTIFICATION_PRIORITY_NORMAL: the default priority, to be used for the
 *   majority of notifications (for example email messages, software updates,
 *   completed download/sync operations)
 * @G_NOTIFICATION_PRIORITY_HIGH: for events that require more attention,
 *   usually because responses are time-sensitive (for example chat and SMS
 *   messages or alarms)
 * @G_NOTIFICATION_PRIORITY_URGENT: for urgent notifications, or notifications
 *   that require a response in a short space of time (for example phone calls
 *   or emergency warnings)
 *
 * Priority levels for #GNotifications.
 *
 * Since: 2.42
 */
typedef enum {
  G_NOTIFICATION_PRIORITY_NORMAL,
  G_NOTIFICATION_PRIORITY_LOW,
  G_NOTIFICATION_PRIORITY_HIGH,
  G_NOTIFICATION_PRIORITY_URGENT
} GNotificationPriority;

/**
 * GNetworkConnectivity:
 * @G_NETWORK_CONNECTIVITY_LOCAL: The host is not configured with a
 *   route to the Internet; it may or may not be connected to a local
 *   network.
 * @G_NETWORK_CONNECTIVITY_LIMITED: The host is connected to a network, but
 *   does not appear to be able to reach the full Internet, perhaps
 *   due to upstream network problems.
 * @G_NETWORK_CONNECTIVITY_PORTAL: The host is behind a captive portal and
 *   cannot reach the full Internet.
 * @G_NETWORK_CONNECTIVITY_FULL: The host is connected to a network, and
 *   appears to be able to reach the full Internet.
 *
 * The host's network connectivity state, as reported by #GNetworkMonitor.
 *
 * Since: 2.44
 */
typedef enum {
  G_NETWORK_CONNECTIVITY_LOCAL       = 1,
  G_NETWORK_CONNECTIVITY_LIMITED     = 2,
  G_NETWORK_CONNECTIVITY_PORTAL      = 3,
  G_NETWORK_CONNECTIVITY_FULL        = 4
} GNetworkConnectivity;

/**
 * GPollableReturn:
 * @G_POLLABLE_RETURN_FAILED: Generic error condition for when an operation fails.
 * @G_POLLABLE_RETURN_OK: The operation was successfully finished.
 * @G_POLLABLE_RETURN_WOULD_BLOCK: The operation would block.
 *
 * Return value for various IO operations that signal errors via the
 * return value and not necessarily via a #GError.
 *
 * This enum exists to be able to return errors to callers without having to
 * allocate a #GError. Allocating #GErrors can be quite expensive for
 * regularly happening errors like %G_IO_ERROR_WOULD_BLOCK.
 *
 * In case of %G_POLLABLE_RETURN_FAILED a #GError should be set for the
 * operation to give details about the error that happened.
 *
 * Since: 2.60
 */
typedef enum {
  G_POLLABLE_RETURN_FAILED       = 0,
  G_POLLABLE_RETURN_OK           = 1,
  G_POLLABLE_RETURN_WOULD_BLOCK  = -G_IO_ERROR_WOULD_BLOCK
} GPollableReturn;

G_END_DECLS

#endif /* __GIO_ENUMS_H__ */
