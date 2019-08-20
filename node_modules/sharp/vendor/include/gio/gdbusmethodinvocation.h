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

#ifndef __G_DBUS_METHOD_INVOCATION_H__
#define __G_DBUS_METHOD_INVOCATION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_METHOD_INVOCATION         (g_dbus_method_invocation_get_type ())
#define G_DBUS_METHOD_INVOCATION(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_METHOD_INVOCATION, GDBusMethodInvocation))
#define G_IS_DBUS_METHOD_INVOCATION(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_METHOD_INVOCATION))

GLIB_AVAILABLE_IN_ALL
GType                  g_dbus_method_invocation_get_type             (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
const gchar           *g_dbus_method_invocation_get_sender           (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
const gchar           *g_dbus_method_invocation_get_object_path      (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
const gchar           *g_dbus_method_invocation_get_interface_name   (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
const gchar           *g_dbus_method_invocation_get_method_name      (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
const GDBusMethodInfo *g_dbus_method_invocation_get_method_info      (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_2_38
const GDBusPropertyInfo *g_dbus_method_invocation_get_property_info  (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
GDBusConnection       *g_dbus_method_invocation_get_connection       (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
GDBusMessage          *g_dbus_method_invocation_get_message          (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
GVariant              *g_dbus_method_invocation_get_parameters       (GDBusMethodInvocation *invocation);
GLIB_AVAILABLE_IN_ALL
gpointer               g_dbus_method_invocation_get_user_data        (GDBusMethodInvocation *invocation);

GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_value         (GDBusMethodInvocation *invocation,
                                                                      GVariant              *parameters);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_value_with_unix_fd_list (GDBusMethodInvocation *invocation,
                                                                                GVariant              *parameters,
                                                                                GUnixFDList           *fd_list);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_error         (GDBusMethodInvocation *invocation,
                                                                      GQuark                 domain,
                                                                      gint                   code,
                                                                      const gchar           *format,
                                                                      ...) G_GNUC_PRINTF(4, 5);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_error_valist  (GDBusMethodInvocation *invocation,
                                                                      GQuark                 domain,
                                                                      gint                   code,
                                                                      const gchar           *format,
                                                                      va_list                var_args)
                                                                      G_GNUC_PRINTF(4, 0);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_error_literal (GDBusMethodInvocation *invocation,
                                                                      GQuark                 domain,
                                                                      gint                   code,
                                                                      const gchar           *message);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_gerror        (GDBusMethodInvocation *invocation,
                                                                      const GError          *error);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_take_error           (GDBusMethodInvocation *invocation,
                                                                      GError                *error);
GLIB_AVAILABLE_IN_ALL
void                   g_dbus_method_invocation_return_dbus_error    (GDBusMethodInvocation *invocation,
                                                                      const gchar           *error_name,
                                                                      const gchar           *error_message);

G_END_DECLS

#endif /* __G_DBUS_METHOD_INVOCATION_H__ */
