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

#ifndef __G_DBUS_MESSAGE_H__
#define __G_DBUS_MESSAGE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_MESSAGE         (g_dbus_message_get_type ())
#define G_DBUS_MESSAGE(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_MESSAGE, GDBusMessage))
#define G_IS_DBUS_MESSAGE(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_MESSAGE))

GLIB_AVAILABLE_IN_ALL
GType                     g_dbus_message_get_type           (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new                (void);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_signal         (const gchar              *path,
                                                             const gchar              *interface_,
                                                             const gchar              *signal);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_method_call    (const gchar              *name,
                                                             const gchar              *path,
                                                             const gchar              *interface_,
                                                             const gchar              *method);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_method_reply   (GDBusMessage             *method_call_message);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_method_error   (GDBusMessage             *method_call_message,
                                                             const gchar              *error_name,
                                                             const gchar              *error_message_format,
                                                             ...) G_GNUC_PRINTF(3, 4);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_method_error_valist (GDBusMessage             *method_call_message,
                                                                  const gchar              *error_name,
                                                                  const gchar              *error_message_format,
                                                                  va_list                   var_args);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_method_error_literal (GDBusMessage             *method_call_message,
                                                                   const gchar              *error_name,
                                                                   const gchar              *error_message);
GLIB_AVAILABLE_IN_ALL
gchar                    *g_dbus_message_print              (GDBusMessage             *message,
                                                             guint                     indent);
GLIB_AVAILABLE_IN_ALL
gboolean                  g_dbus_message_get_locked         (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_lock               (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_copy               (GDBusMessage             *message,
                                                             GError                  **error);
GLIB_AVAILABLE_IN_ALL
GDBusMessageByteOrder     g_dbus_message_get_byte_order     (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_byte_order     (GDBusMessage             *message,
                                                             GDBusMessageByteOrder     byte_order);

GLIB_AVAILABLE_IN_ALL
GDBusMessageType          g_dbus_message_get_message_type   (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_message_type   (GDBusMessage             *message,
                                                             GDBusMessageType          type);
GLIB_AVAILABLE_IN_ALL
GDBusMessageFlags         g_dbus_message_get_flags          (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_flags          (GDBusMessage             *message,
                                                             GDBusMessageFlags         flags);
GLIB_AVAILABLE_IN_ALL
guint32                   g_dbus_message_get_serial         (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_serial         (GDBusMessage             *message,
                                                             guint32                   serial);
GLIB_AVAILABLE_IN_ALL
GVariant                 *g_dbus_message_get_header         (GDBusMessage             *message,
                                                             GDBusMessageHeaderField   header_field);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_header         (GDBusMessage             *message,
                                                             GDBusMessageHeaderField   header_field,
                                                             GVariant                 *value);
GLIB_AVAILABLE_IN_ALL
guchar                   *g_dbus_message_get_header_fields  (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
GVariant                 *g_dbus_message_get_body           (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_body           (GDBusMessage             *message,
                                                             GVariant                 *body);
GLIB_AVAILABLE_IN_ALL
GUnixFDList              *g_dbus_message_get_unix_fd_list   (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_unix_fd_list   (GDBusMessage             *message,
                                                             GUnixFDList              *fd_list);

GLIB_AVAILABLE_IN_ALL
guint32                   g_dbus_message_get_reply_serial   (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_reply_serial   (GDBusMessage             *message,
                                                             guint32                   value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_interface      (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_interface      (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_member         (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_member         (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_path           (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_path           (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_sender         (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_sender         (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_destination    (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_destination    (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_error_name     (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_error_name     (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_signature      (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_signature      (GDBusMessage             *message,
                                                             const gchar              *value);

GLIB_AVAILABLE_IN_ALL
guint32                   g_dbus_message_get_num_unix_fds   (GDBusMessage             *message);
GLIB_AVAILABLE_IN_ALL
void                      g_dbus_message_set_num_unix_fds   (GDBusMessage             *message,
                                                             guint32                   value);

GLIB_AVAILABLE_IN_ALL
const gchar              *g_dbus_message_get_arg0           (GDBusMessage             *message);


GLIB_AVAILABLE_IN_ALL
GDBusMessage             *g_dbus_message_new_from_blob      (guchar                   *blob,
                                                             gsize                     blob_len,
                                                             GDBusCapabilityFlags      capabilities,
                                                             GError                  **error);

GLIB_AVAILABLE_IN_ALL
gssize                    g_dbus_message_bytes_needed       (guchar                   *blob,
                                                             gsize                     blob_len,
                                                             GError                  **error);

GLIB_AVAILABLE_IN_ALL
guchar                   *g_dbus_message_to_blob            (GDBusMessage             *message,
                                                             gsize                    *out_size,
                                                             GDBusCapabilityFlags      capabilities,
                                                             GError                  **error);

GLIB_AVAILABLE_IN_ALL
gboolean                  g_dbus_message_to_gerror          (GDBusMessage             *message,
                                                             GError                  **error);

G_END_DECLS

#endif /* __G_DBUS_MESSAGE_H__ */
