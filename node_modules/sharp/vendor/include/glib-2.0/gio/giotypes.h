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

#ifndef __GIO_TYPES_H__
#define __GIO_TYPES_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gioenums.h>

G_BEGIN_DECLS

typedef struct _GAppLaunchContext             GAppLaunchContext;
typedef struct _GAppInfo                      GAppInfo; /* Dummy typedef */
typedef struct _GAsyncResult                  GAsyncResult; /* Dummy typedef */
typedef struct _GAsyncInitable                GAsyncInitable;
typedef struct _GBufferedInputStream          GBufferedInputStream;
typedef struct _GBufferedOutputStream         GBufferedOutputStream;
typedef struct _GCancellable                  GCancellable;
typedef struct _GCharsetConverter             GCharsetConverter;
typedef struct _GConverter                    GConverter;
typedef struct _GConverterInputStream         GConverterInputStream;
typedef struct _GConverterOutputStream        GConverterOutputStream;
typedef struct _GDatagramBased                GDatagramBased;
typedef struct _GDataInputStream              GDataInputStream;
typedef struct _GSimplePermission             GSimplePermission;
typedef struct _GZlibCompressor               GZlibCompressor;
typedef struct _GZlibDecompressor             GZlibDecompressor;

typedef struct _GSimpleActionGroup            GSimpleActionGroup;
typedef struct _GRemoteActionGroup            GRemoteActionGroup;
typedef struct _GDBusActionGroup              GDBusActionGroup;
typedef struct _GActionMap                    GActionMap;
typedef struct _GActionGroup                  GActionGroup;
typedef struct _GPropertyAction               GPropertyAction;
typedef struct _GSimpleAction                 GSimpleAction;
typedef struct _GAction                       GAction;
typedef struct _GApplication                  GApplication;
typedef struct _GApplicationCommandLine       GApplicationCommandLine;
typedef struct _GSettingsBackend              GSettingsBackend;
typedef struct _GSettings                     GSettings;
typedef struct _GPermission                   GPermission;

typedef struct _GMenuModel                    GMenuModel;
typedef struct _GNotification                 GNotification;

/**
 * GDrive:
 *
 * Opaque drive object.
 **/
typedef struct _GDrive                        GDrive; /* Dummy typedef */
typedef struct _GFileEnumerator               GFileEnumerator;
typedef struct _GFileMonitor                  GFileMonitor;
typedef struct _GFilterInputStream            GFilterInputStream;
typedef struct _GFilterOutputStream           GFilterOutputStream;

/**
 * GFile:
 *
 * A handle to an object implementing the #GFileIface interface.
 * Generally stores a location within the file system. Handles do not
 * necessarily represent files or directories that currently exist.
 **/
typedef struct _GFile                         GFile; /* Dummy typedef */
typedef struct _GFileInfo                     GFileInfo;

/**
 * GFileAttributeMatcher:
 *
 * Determines if a string matches a file attribute.
 **/
typedef struct _GFileAttributeMatcher         GFileAttributeMatcher;
typedef struct _GFileAttributeInfo            GFileAttributeInfo;
typedef struct _GFileAttributeInfoList        GFileAttributeInfoList;
typedef struct _GFileDescriptorBased          GFileDescriptorBased;
typedef struct _GFileInputStream              GFileInputStream;
typedef struct _GFileOutputStream             GFileOutputStream;
typedef struct _GFileIOStream                 GFileIOStream;
typedef struct _GFileIcon                     GFileIcon;
typedef struct _GFilenameCompleter            GFilenameCompleter;


typedef struct _GIcon                         GIcon; /* Dummy typedef */
typedef struct _GInetAddress                  GInetAddress;
typedef struct _GInetAddressMask              GInetAddressMask;
typedef struct _GInetSocketAddress            GInetSocketAddress;
typedef struct _GNativeSocketAddress          GNativeSocketAddress;
typedef struct _GInputStream                  GInputStream;
typedef struct _GInitable                     GInitable;
typedef struct _GIOModule                     GIOModule;
typedef struct _GIOExtensionPoint             GIOExtensionPoint;
typedef struct _GIOExtension                  GIOExtension;

/**
 * GIOSchedulerJob:
 *
 * Opaque class for defining and scheduling IO jobs.
 **/
typedef struct _GIOSchedulerJob               GIOSchedulerJob;
typedef struct _GIOStreamAdapter              GIOStreamAdapter;
typedef struct _GLoadableIcon                 GLoadableIcon; /* Dummy typedef */
typedef struct _GBytesIcon                    GBytesIcon;
typedef struct _GMemoryInputStream            GMemoryInputStream;
typedef struct _GMemoryOutputStream           GMemoryOutputStream;

/**
 * GMount:
 *
 * A handle to an object implementing the #GMountIface interface.
 **/
typedef struct _GMount                        GMount; /* Dummy typedef */
typedef struct _GMountOperation               GMountOperation;
typedef struct _GNetworkAddress               GNetworkAddress;
typedef struct _GNetworkMonitor               GNetworkMonitor;
typedef struct _GNetworkService               GNetworkService;
typedef struct _GOutputStream                 GOutputStream;
typedef struct _GIOStream                     GIOStream;
typedef struct _GSimpleIOStream               GSimpleIOStream;
typedef struct _GPollableInputStream          GPollableInputStream; /* Dummy typedef */
typedef struct _GPollableOutputStream         GPollableOutputStream; /* Dummy typedef */
typedef struct _GResolver                     GResolver;

/**
 * GResource:
 *
 * A resource bundle.
 *
 * Since: 2.32
 */
typedef struct _GResource                     GResource;
typedef struct _GSeekable                     GSeekable;
typedef struct _GSimpleAsyncResult            GSimpleAsyncResult;

/**
 * GSocket:
 *
 * A lowlevel network socket object.
 *
 * Since: 2.22
 **/
typedef struct _GSocket                       GSocket;

/**
 * GSocketControlMessage:
 *
 * Base class for socket-type specific control messages that can be sent and
 * received over #GSocket.
 **/
typedef struct _GSocketControlMessage         GSocketControlMessage;
/**
 * GSocketClient:
 *
 * A helper class for network clients to make connections.
 *
 * Since: 2.22
 **/
typedef struct _GSocketClient                               GSocketClient;
/**
 * GSocketConnection:
 *
 * A socket connection GIOStream object for connection-oriented sockets.
 *
 * Since: 2.22
 **/
typedef struct _GSocketConnection                           GSocketConnection;
/**
 * GSocketListener:
 *
 * A helper class for network servers to listen for and accept connections.
 *
 * Since: 2.22
 **/
typedef struct _GSocketListener                             GSocketListener;
/**
 * GSocketService:
 *
 * A helper class for handling accepting incomming connections in the
 * glib mainloop.
 *
 * Since: 2.22
 **/
typedef struct _GSocketService                              GSocketService;
typedef struct _GSocketAddress                GSocketAddress;
typedef struct _GSocketAddressEnumerator      GSocketAddressEnumerator;
typedef struct _GSocketConnectable            GSocketConnectable;
typedef struct _GSrvTarget                    GSrvTarget;
typedef struct _GTask                         GTask;
/**
 * GTcpConnection:
 *
 * A #GSocketConnection for TCP/IP connections.
 *
 * Since: 2.22
 **/
typedef struct _GTcpConnection                              GTcpConnection;
typedef struct _GTcpWrapperConnection                       GTcpWrapperConnection;
/**
 * GThreadedSocketService:
 *
 * A helper class for handling accepting incoming connections in the
 * glib mainloop and handling them in a thread.
 *
 * Since: 2.22
 **/
typedef struct _GThreadedSocketService                      GThreadedSocketService;
typedef struct _GDtlsConnection               GDtlsConnection;
typedef struct _GDtlsClientConnection         GDtlsClientConnection; /* Dummy typedef */
typedef struct _GDtlsServerConnection         GDtlsServerConnection; /* Dummy typedef */
typedef struct _GThemedIcon                   GThemedIcon;
typedef struct _GTlsCertificate               GTlsCertificate;
typedef struct _GTlsClientConnection          GTlsClientConnection; /* Dummy typedef */
typedef struct _GTlsConnection                GTlsConnection;
typedef struct _GTlsDatabase                  GTlsDatabase;
typedef struct _GTlsFileDatabase              GTlsFileDatabase;
typedef struct _GTlsInteraction               GTlsInteraction;
typedef struct _GTlsPassword                  GTlsPassword;
typedef struct _GTlsServerConnection          GTlsServerConnection; /* Dummy typedef */
typedef struct _GVfs                          GVfs; /* Dummy typedef */

/**
 * GProxyResolver:
 *
 * A helper class to enumerate proxies base on URI.
 *
 * Since: 2.26
 **/
typedef struct _GProxyResolver                GProxyResolver;
typedef struct _GProxy			      GProxy;
typedef struct _GProxyAddress		      GProxyAddress;
typedef struct _GProxyAddressEnumerator	      GProxyAddressEnumerator;

/**
 * GVolume:
 *
 * Opaque mountable volume object.
 **/
typedef struct _GVolume                       GVolume; /* Dummy typedef */
typedef struct _GVolumeMonitor                GVolumeMonitor;

/**
 * GAsyncReadyCallback:
 * @source_object: (nullable): the object the asynchronous operation was started with.
 * @res: a #GAsyncResult.
 * @user_data: user data passed to the callback.
 *
 * Type definition for a function that will be called back when an asynchronous
 * operation within GIO has been completed. #GAsyncReadyCallback
 * callbacks from #GTask are guaranteed to be invoked in a later
 * iteration of the
 * [thread-default main context][g-main-context-push-thread-default]
 * where the #GTask was created. All other users of
 * #GAsyncReadyCallback must likewise call it asynchronously in a
 * later iteration of the main context.
 **/
typedef void (*GAsyncReadyCallback) (GObject *source_object,
				     GAsyncResult *res,
				     gpointer user_data);

/**
 * GFileProgressCallback:
 * @current_num_bytes: the current number of bytes in the operation.
 * @total_num_bytes: the total number of bytes in the operation.
 * @user_data: user data passed to the callback.
 *
 * When doing file operations that may take a while, such as moving
 * a file or copying a file, a progress callback is used to pass how
 * far along that operation is to the application.
 **/
typedef void (*GFileProgressCallback) (goffset current_num_bytes,
                                       goffset total_num_bytes,
                                       gpointer user_data);

/**
 * GFileReadMoreCallback:
 * @file_contents: the data as currently read.
 * @file_size: the size of the data currently read.
 * @callback_data: (closure): data passed to the callback.
 *
 * When loading the partial contents of a file with g_file_load_partial_contents_async(),
 * it may become necessary to determine if any more data from the file should be loaded.
 * A #GFileReadMoreCallback function facilitates this by returning %TRUE if more data
 * should be read, or %FALSE otherwise.
 *
 * Returns: %TRUE if more data should be read back. %FALSE otherwise.
 **/
typedef gboolean (* GFileReadMoreCallback) (const char *file_contents,
                                            goffset file_size,
                                            gpointer callback_data);

/**
 * GFileMeasureProgressCallback:
 * @reporting: %TRUE if more reports will come
 * @current_size: the current cumulative size measurement
 * @num_dirs: the number of directories visited so far
 * @num_files: the number of non-directory files encountered
 * @user_data: the data passed to the original request for this callback
 *
 * This callback type is used by g_file_measure_disk_usage() to make
 * periodic progress reports when measuring the amount of disk spaced
 * used by a directory.
 *
 * These calls are made on a best-effort basis and not all types of
 * #GFile will support them.  At the minimum, however, one call will
 * always be made immediately.
 *
 * In the case that there is no support, @reporting will be set to
 * %FALSE (and the other values undefined) and no further calls will be
 * made.  Otherwise, the @reporting will be %TRUE and the other values
 * all-zeros during the first (immediate) call.  In this way, you can
 * know which type of progress UI to show without a delay.
 *
 * For g_file_measure_disk_usage() the callback is made directly.  For
 * g_file_measure_disk_usage_async() the callback is made via the
 * default main context of the calling thread (ie: the same way that the
 * final async result would be reported).
 *
 * @current_size is in the same units as requested by the operation (see
 * %G_FILE_DISK_USAGE_APPARENT_SIZE).
 *
 * The frequency of the updates is implementation defined, but is
 * ideally about once every 200ms.
 *
 * The last progress callback may or may not be equal to the final
 * result.  Always check the async result to get the final value.
 *
 * Since: 2.38
 **/
typedef void (* GFileMeasureProgressCallback) (gboolean reporting,
                                               guint64  current_size,
                                               guint64  num_dirs,
                                               guint64  num_files,
                                               gpointer user_data);

/**
 * GIOSchedulerJobFunc:
 * @job: a #GIOSchedulerJob.
 * @cancellable: optional #GCancellable object, %NULL to ignore.
 * @user_data: the data to pass to callback function
 *
 * I/O Job function.
 *
 * Long-running jobs should periodically check the @cancellable
 * to see if they have been cancelled.
 *
 * Returns: %TRUE if this function should be called again to
 *    complete the job, %FALSE if the job is complete (or cancelled)
 **/
typedef gboolean (*GIOSchedulerJobFunc) (GIOSchedulerJob *job,
					 GCancellable    *cancellable,
					 gpointer         user_data);

/**
 * GSimpleAsyncThreadFunc:
 * @res: a #GSimpleAsyncResult.
 * @object: a #GObject.
 * @cancellable: optional #GCancellable object, %NULL to ignore.
 *
 * Simple thread function that runs an asynchronous operation and
 * checks for cancellation.
 **/
typedef void (*GSimpleAsyncThreadFunc) (GSimpleAsyncResult *res,
                                        GObject *object,
                                        GCancellable *cancellable);

/**
 * GSocketSourceFunc:
 * @socket: the #GSocket
 * @condition: the current condition at the source fired.
 * @user_data: data passed in by the user.
 *
 * This is the function type of the callback used for the #GSource
 * returned by g_socket_create_source().
 *
 * Returns: it should return %FALSE if the source should be removed.
 *
 * Since: 2.22
 */
typedef gboolean (*GSocketSourceFunc) (GSocket *socket,
				       GIOCondition condition,
				       gpointer user_data);

/**
 * GDatagramBasedSourceFunc:
 * @datagram_based: the #GDatagramBased
 * @condition: the current condition at the source fired
 * @user_data: data passed in by the user
 *
 * This is the function type of the callback used for the #GSource
 * returned by g_datagram_based_create_source().
 *
 * Returns: %G_SOURCE_REMOVE if the source should be removed,
 *   %G_SOURCE_CONTINUE otherwise
 *
 * Since: 2.48
 */
typedef gboolean (*GDatagramBasedSourceFunc) (GDatagramBased *datagram_based,
                                              GIOCondition    condition,
                                              gpointer        user_data);

/**
 * GInputVector:
 * @buffer: Pointer to a buffer where data will be written.
 * @size: the available size in @buffer.
 *
 * Structure used for scatter/gather data input.
 * You generally pass in an array of #GInputVectors
 * and the operation will store the read data starting in the
 * first buffer, switching to the next as needed.
 *
 * Since: 2.22
 */
typedef struct _GInputVector GInputVector;

struct _GInputVector {
  gpointer buffer;
  gsize size;
};

/**
 * GInputMessage:
 * @address: (optional) (out) (transfer full): return location
 *   for a #GSocketAddress, or %NULL
 * @vectors: (array length=num_vectors) (out): pointer to an
 *   array of input vectors
 * @num_vectors: the number of input vectors pointed to by @vectors
 * @bytes_received: (out): will be set to the number of bytes that have been
 *   received
 * @flags: (out): collection of #GSocketMsgFlags for the received message,
 *   outputted by the call
 * @control_messages: (array length=num_control_messages) (optional)
 *   (out) (transfer full): return location for a
 *   caller-allocated array of #GSocketControlMessages, or %NULL
 * @num_control_messages: (out) (optional): return location for the number of
 *   elements in @control_messages
 *
 * Structure used for scatter/gather data input when receiving multiple
 * messages or packets in one go. You generally pass in an array of empty
 * #GInputVectors and the operation will use all the buffers as if they
 * were one buffer, and will set @bytes_received to the total number of bytes
 * received across all #GInputVectors.
 *
 * This structure closely mirrors `struct mmsghdr` and `struct msghdr` from
 * the POSIX sockets API (see `man 2 recvmmsg`).
 *
 * If @address is non-%NULL then it is set to the source address the message
 * was received from, and the caller must free it afterwards.
 *
 * If @control_messages is non-%NULL then it is set to an array of control
 * messages received with the message (if any), and the caller must free it
 * afterwards. @num_control_messages is set to the number of elements in
 * this array, which may be zero.
 *
 * Flags relevant to this message will be returned in @flags. For example,
 * `MSG_EOR` or `MSG_TRUNC`.
 *
 * Since: 2.48
 */
typedef struct _GInputMessage GInputMessage;

struct _GInputMessage {
  GSocketAddress         **address;

  GInputVector            *vectors;
  guint                    num_vectors;

  gsize                    bytes_received;
  gint                     flags;

  GSocketControlMessage ***control_messages;
  guint                   *num_control_messages;
};

/**
 * GOutputVector:
 * @buffer: Pointer to a buffer of data to read.
 * @size: the size of @buffer.
 *
 * Structure used for scatter/gather data output.
 * You generally pass in an array of #GOutputVectors
 * and the operation will use all the buffers as if they were
 * one buffer.
 *
 * Since: 2.22
 */
typedef struct _GOutputVector GOutputVector;

struct _GOutputVector {
  gconstpointer buffer;
  gsize size;
};

/**
 * GOutputMessage:
 * @address: (nullable): a #GSocketAddress, or %NULL
 * @vectors: pointer to an array of output vectors
 * @num_vectors: the number of output vectors pointed to by @vectors.
 * @bytes_sent: initialize to 0. Will be set to the number of bytes
 *     that have been sent
 * @control_messages: (array length=num_control_messages) (nullable): a pointer
 *   to an array of #GSocketControlMessages, or %NULL.
 * @num_control_messages: number of elements in @control_messages.
 *
 * Structure used for scatter/gather data output when sending multiple
 * messages or packets in one go. You generally pass in an array of
 * #GOutputVectors and the operation will use all the buffers as if they
 * were one buffer.
 *
 * If @address is %NULL then the message is sent to the default receiver
 * (as previously set by g_socket_connect()).
 *
 * Since: 2.44
 */
typedef struct _GOutputMessage GOutputMessage;

struct _GOutputMessage {
  GSocketAddress         *address;

  GOutputVector          *vectors;
  guint                   num_vectors;

  guint                   bytes_sent;

  GSocketControlMessage **control_messages;
  guint                   num_control_messages;
};

typedef struct _GCredentials                  GCredentials;
typedef struct _GUnixCredentialsMessage       GUnixCredentialsMessage;
typedef struct _GUnixFDList                   GUnixFDList;
typedef struct _GDBusMessage                  GDBusMessage;
typedef struct _GDBusConnection               GDBusConnection;
typedef struct _GDBusProxy                    GDBusProxy;
typedef struct _GDBusMethodInvocation         GDBusMethodInvocation;
typedef struct _GDBusServer                   GDBusServer;
typedef struct _GDBusAuthObserver             GDBusAuthObserver;
typedef struct _GDBusErrorEntry               GDBusErrorEntry;
typedef struct _GDBusInterfaceVTable          GDBusInterfaceVTable;
typedef struct _GDBusSubtreeVTable            GDBusSubtreeVTable;
typedef struct _GDBusAnnotationInfo           GDBusAnnotationInfo;
typedef struct _GDBusArgInfo                  GDBusArgInfo;
typedef struct _GDBusMethodInfo               GDBusMethodInfo;
typedef struct _GDBusSignalInfo               GDBusSignalInfo;
typedef struct _GDBusPropertyInfo             GDBusPropertyInfo;
typedef struct _GDBusInterfaceInfo            GDBusInterfaceInfo;
typedef struct _GDBusNodeInfo                 GDBusNodeInfo;

/**
 * GCancellableSourceFunc:
 * @cancellable: the #GCancellable
 * @user_data: data passed in by the user.
 *
 * This is the function type of the callback used for the #GSource
 * returned by g_cancellable_source_new().
 *
 * Returns: it should return %FALSE if the source should be removed.
 *
 * Since: 2.28
 */
typedef gboolean (*GCancellableSourceFunc) (GCancellable *cancellable,
					    gpointer      user_data);

/**
 * GPollableSourceFunc:
 * @pollable_stream: the #GPollableInputStream or #GPollableOutputStream
 * @user_data: data passed in by the user.
 *
 * This is the function type of the callback used for the #GSource
 * returned by g_pollable_input_stream_create_source() and
 * g_pollable_output_stream_create_source().
 *
 * Returns: it should return %FALSE if the source should be removed.
 *
 * Since: 2.28
 */
typedef gboolean (*GPollableSourceFunc) (GObject  *pollable_stream,
					 gpointer  user_data);

typedef struct _GDBusInterface              GDBusInterface; /* Dummy typedef */
typedef struct _GDBusInterfaceSkeleton      GDBusInterfaceSkeleton;
typedef struct _GDBusObject                 GDBusObject;  /* Dummy typedef */
typedef struct _GDBusObjectSkeleton         GDBusObjectSkeleton;
typedef struct _GDBusObjectProxy            GDBusObjectProxy;
typedef struct _GDBusObjectManager          GDBusObjectManager;  /* Dummy typedef */
typedef struct _GDBusObjectManagerClient    GDBusObjectManagerClient;
typedef struct _GDBusObjectManagerServer    GDBusObjectManagerServer;

/**
 * GDBusProxyTypeFunc:
 * @manager: A #GDBusObjectManagerClient.
 * @object_path: The object path of the remote object.
 * @interface_name: (nullable): The interface name of the remote object or %NULL if a #GDBusObjectProxy #GType is requested.
 * @user_data: User data.
 *
 * Function signature for a function used to determine the #GType to
 * use for an interface proxy (if @interface_name is not %NULL) or
 * object proxy (if @interface_name is %NULL).
 *
 * This function is called in the
 * [thread-default main loop][g-main-context-push-thread-default]
 * that @manager was constructed in.
 *
 * Returns: A #GType to use for the remote object. The returned type
 *   must be a #GDBusProxy or #GDBusObjectProxy -derived
 *   type.
 *
 * Since: 2.30
 */
typedef GType (*GDBusProxyTypeFunc) (GDBusObjectManagerClient   *manager,
                                     const gchar                *object_path,
                                     const gchar                *interface_name,
                                     gpointer                    user_data);

typedef struct _GTestDBus GTestDBus;

/**
 * GSubprocess:
 *
 * A child process.
 *
 * Since: 2.40
 */
typedef struct _GSubprocess                   GSubprocess;
/**
 * GSubprocessLauncher:
 *
 * Options for launching a child process.
 *
 * Since: 2.40
 */
typedef struct _GSubprocessLauncher           GSubprocessLauncher;

G_END_DECLS

#endif /* __GIO_TYPES_H__ */
