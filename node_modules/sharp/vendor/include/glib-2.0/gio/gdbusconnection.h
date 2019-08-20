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

#ifndef __G_DBUS_CONNECTION_H__
#define __G_DBUS_CONNECTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DBUS_CONNECTION         (g_dbus_connection_get_type ())
#define G_DBUS_CONNECTION(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_DBUS_CONNECTION, GDBusConnection))
#define G_IS_DBUS_CONNECTION(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_DBUS_CONNECTION))

GLIB_AVAILABLE_IN_ALL
GType            g_dbus_connection_get_type                   (void) G_GNUC_CONST;

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
void              g_bus_get                    (GBusType             bus_type,
                                                GCancellable        *cancellable,
                                                GAsyncReadyCallback  callback,
                                                gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
GDBusConnection  *g_bus_get_finish             (GAsyncResult        *res,
                                                GError             **error);
GLIB_AVAILABLE_IN_ALL
GDBusConnection  *g_bus_get_sync               (GBusType            bus_type,
                                                GCancellable       *cancellable,
                                                GError            **error);

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_new                        (GIOStream              *stream,
                                                               const gchar            *guid,
                                                               GDBusConnectionFlags    flags,
                                                               GDBusAuthObserver      *observer,
                                                               GCancellable           *cancellable,
                                                               GAsyncReadyCallback     callback,
                                                               gpointer                user_data);
GLIB_AVAILABLE_IN_ALL
GDBusConnection *g_dbus_connection_new_finish                 (GAsyncResult           *res,
                                                               GError                **error);
GLIB_AVAILABLE_IN_ALL
GDBusConnection *g_dbus_connection_new_sync                   (GIOStream              *stream,
                                                               const gchar            *guid,
                                                               GDBusConnectionFlags    flags,
                                                               GDBusAuthObserver      *observer,
                                                               GCancellable           *cancellable,
                                                               GError                **error);

GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_new_for_address            (const gchar            *address,
                                                               GDBusConnectionFlags    flags,
                                                               GDBusAuthObserver      *observer,
                                                               GCancellable           *cancellable,
                                                               GAsyncReadyCallback     callback,
                                                               gpointer                user_data);
GLIB_AVAILABLE_IN_ALL
GDBusConnection *g_dbus_connection_new_for_address_finish     (GAsyncResult           *res,
                                                               GError                **error);
GLIB_AVAILABLE_IN_ALL
GDBusConnection *g_dbus_connection_new_for_address_sync       (const gchar            *address,
                                                               GDBusConnectionFlags    flags,
                                                               GDBusAuthObserver      *observer,
                                                               GCancellable           *cancellable,
                                                               GError                **error);

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_start_message_processing   (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_is_closed                  (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_ALL
GIOStream       *g_dbus_connection_get_stream                 (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_connection_get_guid                   (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_ALL
const gchar     *g_dbus_connection_get_unique_name            (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_ALL
GCredentials    *g_dbus_connection_get_peer_credentials       (GDBusConnection    *connection);

GLIB_AVAILABLE_IN_2_34
guint32          g_dbus_connection_get_last_serial            (GDBusConnection    *connection);

GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_get_exit_on_close          (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_set_exit_on_close          (GDBusConnection    *connection,
                                                               gboolean            exit_on_close);
GLIB_AVAILABLE_IN_ALL
GDBusCapabilityFlags  g_dbus_connection_get_capabilities      (GDBusConnection    *connection);
GLIB_AVAILABLE_IN_2_60
GDBusConnectionFlags  g_dbus_connection_get_flags             (GDBusConnection    *connection);

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_close                          (GDBusConnection     *connection,
                                                                   GCancellable        *cancellable,
                                                                   GAsyncReadyCallback  callback,
                                                                   gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_close_finish                   (GDBusConnection     *connection,
                                                                   GAsyncResult        *res,
                                                                   GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_close_sync                     (GDBusConnection     *connection,
                                                                   GCancellable        *cancellable,
                                                                   GError             **error);

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_flush                          (GDBusConnection     *connection,
                                                                   GCancellable        *cancellable,
                                                                   GAsyncReadyCallback  callback,
                                                                   gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_flush_finish                   (GDBusConnection     *connection,
                                                                   GAsyncResult        *res,
                                                                   GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_flush_sync                     (GDBusConnection     *connection,
                                                                   GCancellable        *cancellable,
                                                                   GError             **error);

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_send_message                   (GDBusConnection     *connection,
                                                                   GDBusMessage        *message,
                                                                   GDBusSendMessageFlags flags,
                                                                   volatile guint32    *out_serial,
                                                                   GError             **error);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_send_message_with_reply        (GDBusConnection     *connection,
                                                                   GDBusMessage        *message,
                                                                   GDBusSendMessageFlags flags,
                                                                   gint                 timeout_msec,
                                                                   volatile guint32    *out_serial,
                                                                   GCancellable        *cancellable,
                                                                   GAsyncReadyCallback  callback,
                                                                   gpointer             user_data);
GLIB_AVAILABLE_IN_ALL
GDBusMessage    *g_dbus_connection_send_message_with_reply_finish (GDBusConnection     *connection,
                                                                   GAsyncResult        *res,
                                                                   GError             **error);
GLIB_AVAILABLE_IN_ALL
GDBusMessage    *g_dbus_connection_send_message_with_reply_sync   (GDBusConnection     *connection,
                                                                   GDBusMessage        *message,
                                                                   GDBusSendMessageFlags flags,
                                                                   gint                 timeout_msec,
                                                                   volatile guint32    *out_serial,
                                                                   GCancellable        *cancellable,
                                                                   GError             **error);

/* ---------------------------------------------------------------------------------------------------- */

GLIB_AVAILABLE_IN_ALL
gboolean  g_dbus_connection_emit_signal                       (GDBusConnection    *connection,
                                                               const gchar        *destination_bus_name,
                                                               const gchar        *object_path,
                                                               const gchar        *interface_name,
                                                               const gchar        *signal_name,
                                                               GVariant           *parameters,
                                                               GError            **error);
GLIB_AVAILABLE_IN_ALL
void      g_dbus_connection_call                              (GDBusConnection    *connection,
                                                               const gchar        *bus_name,
                                                               const gchar        *object_path,
                                                               const gchar        *interface_name,
                                                               const gchar        *method_name,
                                                               GVariant           *parameters,
                                                               const GVariantType *reply_type,
                                                               GDBusCallFlags      flags,
                                                               gint                timeout_msec,
                                                               GCancellable       *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer            user_data);
GLIB_AVAILABLE_IN_ALL
GVariant *g_dbus_connection_call_finish                       (GDBusConnection    *connection,
                                                               GAsyncResult       *res,
                                                               GError            **error);
GLIB_AVAILABLE_IN_ALL
GVariant *g_dbus_connection_call_sync                         (GDBusConnection    *connection,
                                                               const gchar        *bus_name,
                                                               const gchar        *object_path,
                                                               const gchar        *interface_name,
                                                               const gchar        *method_name,
                                                               GVariant           *parameters,
                                                               const GVariantType *reply_type,
                                                               GDBusCallFlags      flags,
                                                               gint                timeout_msec,
                                                               GCancellable       *cancellable,
                                                               GError            **error);
GLIB_AVAILABLE_IN_2_30
void      g_dbus_connection_call_with_unix_fd_list            (GDBusConnection    *connection,
                                                               const gchar        *bus_name,
                                                               const gchar        *object_path,
                                                               const gchar        *interface_name,
                                                               const gchar        *method_name,
                                                               GVariant           *parameters,
                                                               const GVariantType *reply_type,
                                                               GDBusCallFlags      flags,
                                                               gint                timeout_msec,
                                                               GUnixFDList        *fd_list,
                                                               GCancellable       *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer            user_data);
GLIB_AVAILABLE_IN_2_30
GVariant *g_dbus_connection_call_with_unix_fd_list_finish     (GDBusConnection    *connection,
                                                               GUnixFDList       **out_fd_list,
                                                               GAsyncResult       *res,
                                                               GError            **error);
GLIB_AVAILABLE_IN_2_30
GVariant *g_dbus_connection_call_with_unix_fd_list_sync       (GDBusConnection    *connection,
                                                               const gchar        *bus_name,
                                                               const gchar        *object_path,
                                                               const gchar        *interface_name,
                                                               const gchar        *method_name,
                                                               GVariant           *parameters,
                                                               const GVariantType *reply_type,
                                                               GDBusCallFlags      flags,
                                                               gint                timeout_msec,
                                                               GUnixFDList        *fd_list,
                                                               GUnixFDList       **out_fd_list,
                                                               GCancellable       *cancellable,
                                                               GError            **error);

/* ---------------------------------------------------------------------------------------------------- */


/**
 * GDBusInterfaceMethodCallFunc:
 * @connection: A #GDBusConnection.
 * @sender: The unique bus name of the remote caller.
 * @object_path: The object path that the method was invoked on.
 * @interface_name: The D-Bus interface name the method was invoked on.
 * @method_name: The name of the method that was invoked.
 * @parameters: A #GVariant tuple with parameters.
 * @invocation: (transfer full): A #GDBusMethodInvocation object that must be used to return a value or error.
 * @user_data: The @user_data #gpointer passed to g_dbus_connection_register_object().
 *
 * The type of the @method_call function in #GDBusInterfaceVTable.
 *
 * Since: 2.26
 */
typedef void (*GDBusInterfaceMethodCallFunc) (GDBusConnection       *connection,
                                              const gchar           *sender,
                                              const gchar           *object_path,
                                              const gchar           *interface_name,
                                              const gchar           *method_name,
                                              GVariant              *parameters,
                                              GDBusMethodInvocation *invocation,
                                              gpointer               user_data);

/**
 * GDBusInterfaceGetPropertyFunc:
 * @connection: A #GDBusConnection.
 * @sender: The unique bus name of the remote caller.
 * @object_path: The object path that the method was invoked on.
 * @interface_name: The D-Bus interface name for the property.
 * @property_name: The name of the property to get the value of.
 * @error: Return location for error.
 * @user_data: The @user_data #gpointer passed to g_dbus_connection_register_object().
 *
 * The type of the @get_property function in #GDBusInterfaceVTable.
 *
 * Returns: A #GVariant with the value for @property_name or %NULL if
 *     @error is set. If the returned #GVariant is floating, it is
 *     consumed - otherwise its reference count is decreased by one.
 *
 * Since: 2.26
 */
typedef GVariant *(*GDBusInterfaceGetPropertyFunc) (GDBusConnection       *connection,
                                                    const gchar           *sender,
                                                    const gchar           *object_path,
                                                    const gchar           *interface_name,
                                                    const gchar           *property_name,
                                                    GError               **error,
                                                    gpointer               user_data);

/**
 * GDBusInterfaceSetPropertyFunc:
 * @connection: A #GDBusConnection.
 * @sender: The unique bus name of the remote caller.
 * @object_path: The object path that the method was invoked on.
 * @interface_name: The D-Bus interface name for the property.
 * @property_name: The name of the property to get the value of.
 * @value: The value to set the property to.
 * @error: Return location for error.
 * @user_data: The @user_data #gpointer passed to g_dbus_connection_register_object().
 *
 * The type of the @set_property function in #GDBusInterfaceVTable.
 *
 * Returns: %TRUE if the property was set to @value, %FALSE if @error is set.
 *
 * Since: 2.26
 */
typedef gboolean  (*GDBusInterfaceSetPropertyFunc) (GDBusConnection       *connection,
                                                    const gchar           *sender,
                                                    const gchar           *object_path,
                                                    const gchar           *interface_name,
                                                    const gchar           *property_name,
                                                    GVariant              *value,
                                                    GError               **error,
                                                    gpointer               user_data);

/**
 * GDBusInterfaceVTable:
 * @method_call: Function for handling incoming method calls.
 * @get_property: Function for getting a property.
 * @set_property: Function for setting a property.
 *
 * Virtual table for handling properties and method calls for a D-Bus
 * interface.
 *
 * Since 2.38, if you want to handle getting/setting D-Bus properties
 * asynchronously, give %NULL as your get_property() or set_property()
 * function. The D-Bus call will be directed to your @method_call function,
 * with the provided @interface_name set to "org.freedesktop.DBus.Properties".
 *
 * Ownership of the #GDBusMethodInvocation object passed to the
 * method_call() function is transferred to your handler; you must
 * call one of the methods of #GDBusMethodInvocation to return a reply
 * (possibly empty), or an error. These functions also take ownership
 * of the passed-in invocation object, so unless the invocation
 * object has otherwise been referenced, it will be then be freed.
 * Calling one of these functions may be done within your
 * method_call() implementation but it also can be done at a later
 * point to handle the method asynchronously.
 *
 * The usual checks on the validity of the calls is performed. For
 * `Get` calls, an error is automatically returned if the property does
 * not exist or the permissions do not allow access. The same checks are
 * performed for `Set` calls, and the provided value is also checked for
 * being the correct type.
 *
 * For both `Get` and `Set` calls, the #GDBusMethodInvocation
 * passed to the @method_call handler can be queried with
 * g_dbus_method_invocation_get_property_info() to get a pointer
 * to the #GDBusPropertyInfo of the property.
 *
 * If you have readable properties specified in your interface info,
 * you must ensure that you either provide a non-%NULL @get_property()
 * function or provide implementations of both the `Get` and `GetAll`
 * methods on org.freedesktop.DBus.Properties interface in your @method_call
 * function. Note that the required return type of the `Get` call is
 * `(v)`, not the type of the property. `GetAll` expects a return value
 * of type `a{sv}`.
 *
 * If you have writable properties specified in your interface info,
 * you must ensure that you either provide a non-%NULL @set_property()
 * function or provide an implementation of the `Set` call. If implementing
 * the call, you must return the value of type %G_VARIANT_TYPE_UNIT.
 *
 * Since: 2.26
 */
struct _GDBusInterfaceVTable
{
  GDBusInterfaceMethodCallFunc  method_call;
  GDBusInterfaceGetPropertyFunc get_property;
  GDBusInterfaceSetPropertyFunc set_property;

  /*< private >*/
  /* Padding for future expansion - also remember to update
   * gdbusconnection.c:_g_dbus_interface_vtable_copy() when
   * changing this.
   */
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
guint            g_dbus_connection_register_object            (GDBusConnection            *connection,
                                                               const gchar                *object_path,
                                                               GDBusInterfaceInfo         *interface_info,
                                                               const GDBusInterfaceVTable *vtable,
                                                               gpointer                    user_data,
                                                               GDestroyNotify              user_data_free_func,
                                                               GError                    **error);
GLIB_AVAILABLE_IN_2_46
guint            g_dbus_connection_register_object_with_closures (GDBusConnection         *connection,
                                                                  const gchar             *object_path,
                                                                  GDBusInterfaceInfo      *interface_info,
                                                                  GClosure                *method_call_closure,
                                                                  GClosure                *get_property_closure,
                                                                  GClosure                *set_property_closure,
                                                                  GError                 **error);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_unregister_object          (GDBusConnection            *connection,
                                                               guint                       registration_id);

/* ---------------------------------------------------------------------------------------------------- */

/**
 * GDBusSubtreeEnumerateFunc:
 * @connection: A #GDBusConnection.
 * @sender: The unique bus name of the remote caller.
 * @object_path: The object path that was registered with g_dbus_connection_register_subtree().
 * @user_data: The @user_data #gpointer passed to g_dbus_connection_register_subtree().
 *
 * The type of the @enumerate function in #GDBusSubtreeVTable.
 *
 * This function is called when generating introspection data and also
 * when preparing to dispatch incoming messages in the event that the
 * %G_DBUS_SUBTREE_FLAGS_DISPATCH_TO_UNENUMERATED_NODES flag is not
 * specified (ie: to verify that the object path is valid).
 *
 * Hierarchies are not supported; the items that you return should not
 * contain the '/' character.
 *
 * The return value will be freed with g_strfreev().
 *
 * Returns: A newly allocated array of strings for node names that are children of @object_path.
 *
 * Since: 2.26
 */
typedef gchar** (*GDBusSubtreeEnumerateFunc) (GDBusConnection       *connection,
                                              const gchar           *sender,
                                              const gchar           *object_path,
                                              gpointer               user_data);

/**
 * GDBusSubtreeIntrospectFunc:
 * @connection: A #GDBusConnection.
 * @sender: The unique bus name of the remote caller.
 * @object_path: The object path that was registered with g_dbus_connection_register_subtree().
 * @node: A node that is a child of @object_path (relative to @object_path) or %NULL for the root of the subtree.
 * @user_data: The @user_data #gpointer passed to g_dbus_connection_register_subtree().
 *
 * The type of the @introspect function in #GDBusSubtreeVTable.
 *
 * Subtrees are flat.  @node, if non-%NULL, is always exactly one
 * segment of the object path (ie: it never contains a slash).
 *
 * This function should return %NULL to indicate that there is no object
 * at this node.
 *
 * If this function returns non-%NULL, the return value is expected to
 * be a %NULL-terminated array of pointers to #GDBusInterfaceInfo
 * structures describing the interfaces implemented by @node.  This
 * array will have g_dbus_interface_info_unref() called on each item
 * before being freed with g_free().
 *
 * The difference between returning %NULL and an array containing zero
 * items is that the standard DBus interfaces will returned to the
 * remote introspector in the empty array case, but not in the %NULL
 * case.
 *
 * Returns: A %NULL-terminated array of pointers to #GDBusInterfaceInfo, or %NULL.
 *
 * Since: 2.26
 */
typedef GDBusInterfaceInfo ** (*GDBusSubtreeIntrospectFunc) (GDBusConnection       *connection,
                                                             const gchar           *sender,
                                                             const gchar           *object_path,
                                                             const gchar           *node,
                                                             gpointer               user_data);

/**
 * GDBusSubtreeDispatchFunc:
 * @connection: A #GDBusConnection.
 * @sender: The unique bus name of the remote caller.
 * @object_path: The object path that was registered with g_dbus_connection_register_subtree().
 * @interface_name: The D-Bus interface name that the method call or property access is for.
 * @node: A node that is a child of @object_path (relative to @object_path) or %NULL for the root of the subtree.
 * @out_user_data: (nullable) (not optional): Return location for user data to pass to functions in the returned #GDBusInterfaceVTable (never %NULL).
 * @user_data: The @user_data #gpointer passed to g_dbus_connection_register_subtree().
 *
 * The type of the @dispatch function in #GDBusSubtreeVTable.
 *
 * Subtrees are flat.  @node, if non-%NULL, is always exactly one
 * segment of the object path (ie: it never contains a slash).
 *
 * Returns: A #GDBusInterfaceVTable or %NULL if you don't want to handle the methods.
 *
 * Since: 2.26
 */
typedef const GDBusInterfaceVTable * (*GDBusSubtreeDispatchFunc) (GDBusConnection             *connection,
                                                                  const gchar                 *sender,
                                                                  const gchar                 *object_path,
                                                                  const gchar                 *interface_name,
                                                                  const gchar                 *node,
                                                                  gpointer                    *out_user_data,
                                                                  gpointer                     user_data);

/**
 * GDBusSubtreeVTable:
 * @enumerate: Function for enumerating child nodes.
 * @introspect: Function for introspecting a child node.
 * @dispatch: Function for dispatching a remote call on a child node.
 *
 * Virtual table for handling subtrees registered with g_dbus_connection_register_subtree().
 *
 * Since: 2.26
 */
struct _GDBusSubtreeVTable
{
  GDBusSubtreeEnumerateFunc  enumerate;
  GDBusSubtreeIntrospectFunc introspect;
  GDBusSubtreeDispatchFunc   dispatch;

  /*< private >*/
  /* Padding for future expansion - also remember to update
   * gdbusconnection.c:_g_dbus_subtree_vtable_copy() when
   * changing this.
   */
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
guint            g_dbus_connection_register_subtree           (GDBusConnection            *connection,
                                                               const gchar                *object_path,
                                                               const GDBusSubtreeVTable   *vtable,
                                                               GDBusSubtreeFlags           flags,
                                                               gpointer                    user_data,
                                                               GDestroyNotify              user_data_free_func,
                                                               GError                    **error);
GLIB_AVAILABLE_IN_ALL
gboolean         g_dbus_connection_unregister_subtree         (GDBusConnection            *connection,
                                                               guint                       registration_id);

/* ---------------------------------------------------------------------------------------------------- */

/**
 * GDBusSignalCallback:
 * @connection: A #GDBusConnection.
 * @sender_name: The unique bus name of the sender of the signal.
 * @object_path: The object path that the signal was emitted on.
 * @interface_name: The name of the interface.
 * @signal_name: The name of the signal.
 * @parameters: A #GVariant tuple with parameters for the signal.
 * @user_data: User data passed when subscribing to the signal.
 *
 * Signature for callback function used in g_dbus_connection_signal_subscribe().
 *
 * Since: 2.26
 */
typedef void (*GDBusSignalCallback) (GDBusConnection  *connection,
                                     const gchar      *sender_name,
                                     const gchar      *object_path,
                                     const gchar      *interface_name,
                                     const gchar      *signal_name,
                                     GVariant         *parameters,
                                     gpointer          user_data);

GLIB_AVAILABLE_IN_ALL
guint            g_dbus_connection_signal_subscribe           (GDBusConnection     *connection,
                                                               const gchar         *sender,
                                                               const gchar         *interface_name,
                                                               const gchar         *member,
                                                               const gchar         *object_path,
                                                               const gchar         *arg0,
                                                               GDBusSignalFlags     flags,
                                                               GDBusSignalCallback  callback,
                                                               gpointer             user_data,
                                                               GDestroyNotify       user_data_free_func);
GLIB_AVAILABLE_IN_ALL
void             g_dbus_connection_signal_unsubscribe         (GDBusConnection     *connection,
                                                               guint                subscription_id);

/* ---------------------------------------------------------------------------------------------------- */

/**
 * GDBusMessageFilterFunction:
 * @connection: (transfer none): A #GDBusConnection.
 * @message: (transfer full): A locked #GDBusMessage that the filter function takes ownership of.
 * @incoming: %TRUE if it is a message received from the other peer, %FALSE if it is
 * a message to be sent to the other peer.
 * @user_data: User data passed when adding the filter.
 *
 * Signature for function used in g_dbus_connection_add_filter().
 *
 * A filter function is passed a #GDBusMessage and expected to return
 * a #GDBusMessage too. Passive filter functions that don't modify the
 * message can simply return the @message object:
 * |[
 * static GDBusMessage *
 * passive_filter (GDBusConnection *connection
 *                 GDBusMessage    *message,
 *                 gboolean         incoming,
 *                 gpointer         user_data)
 * {
 *   // inspect @message
 *   return message;
 * }
 * ]|
 * Filter functions that wants to drop a message can simply return %NULL:
 * |[
 * static GDBusMessage *
 * drop_filter (GDBusConnection *connection
 *              GDBusMessage    *message,
 *              gboolean         incoming,
 *              gpointer         user_data)
 * {
 *   if (should_drop_message)
 *     {
 *       g_object_unref (message);
 *       message = NULL;
 *     }
 *   return message;
 * }
 * ]|
 * Finally, a filter function may modify a message by copying it:
 * |[
 * static GDBusMessage *
 * modifying_filter (GDBusConnection *connection
 *                   GDBusMessage    *message,
 *                   gboolean         incoming,
 *                   gpointer         user_data)
 * {
 *   GDBusMessage *copy;
 *   GError *error;
 *
 *   error = NULL;
 *   copy = g_dbus_message_copy (message, &error);
 *   // handle @error being set
 *   g_object_unref (message);
 *
 *   // modify @copy
 *
 *   return copy;
 * }
 * ]|
 * If the returned #GDBusMessage is different from @message and cannot
 * be sent on @connection (it could use features, such as file
 * descriptors, not compatible with @connection), then a warning is
 * logged to standard error. Applications can
 * check this ahead of time using g_dbus_message_to_blob() passing a
 * #GDBusCapabilityFlags value obtained from @connection.
 *
 * Returns: (transfer full) (nullable): A #GDBusMessage that will be freed with
 * g_object_unref() or %NULL to drop the message. Passive filter
 * functions can simply return the passed @message object.
 *
 * Since: 2.26
 */
typedef GDBusMessage *(*GDBusMessageFilterFunction) (GDBusConnection *connection,
                                                     GDBusMessage    *message,
                                                     gboolean         incoming,
                                                     gpointer         user_data);

GLIB_AVAILABLE_IN_ALL
guint g_dbus_connection_add_filter (GDBusConnection            *connection,
                                    GDBusMessageFilterFunction  filter_function,
                                    gpointer                    user_data,
                                    GDestroyNotify              user_data_free_func);

GLIB_AVAILABLE_IN_ALL
void  g_dbus_connection_remove_filter (GDBusConnection    *connection,
                                       guint               filter_id);

/* ---------------------------------------------------------------------------------------------------- */


G_END_DECLS

#endif /* __G_DBUS_CONNECTION_H__ */
