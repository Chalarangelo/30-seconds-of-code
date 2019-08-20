/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2008 Red Hat, Inc.
 * Copyright (C) 2018 Igalia S.L.
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
 */

#ifndef __G_RESOLVER_H__
#define __G_RESOLVER_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_RESOLVER         (g_resolver_get_type ())
#define G_RESOLVER(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_RESOLVER, GResolver))
#define G_RESOLVER_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_RESOLVER, GResolverClass))
#define G_IS_RESOLVER(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_RESOLVER))
#define G_IS_RESOLVER_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_RESOLVER))
#define G_RESOLVER_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_RESOLVER, GResolverClass))

typedef struct _GResolverPrivate GResolverPrivate;
typedef struct _GResolverClass   GResolverClass;

struct _GResolver {
  GObject parent_instance;

  GResolverPrivate *priv;
};

/**
 * GResolverNameLookupFlags:
 * @G_RESOLVER_NAME_LOOKUP_FLAGS_DEFAULT: default behavior (same as g_resolver_lookup_by_name())
 * @G_RESOLVER_NAME_LOOKUP_FLAGS_IPV4_ONLY: only resolve ipv4 addresses
 * @G_RESOLVER_NAME_LOOKUP_FLAGS_IPV6_ONLY: only resolve ipv6 addresses
 *
 * Flags to modify lookup behavior.
 *
 * Since: 2.60
 */
typedef enum {
  G_RESOLVER_NAME_LOOKUP_FLAGS_DEFAULT = 0,
  G_RESOLVER_NAME_LOOKUP_FLAGS_IPV4_ONLY = 1 << 0,
  G_RESOLVER_NAME_LOOKUP_FLAGS_IPV6_ONLY = 1 << 1,
} GResolverNameLookupFlags;

struct _GResolverClass {
  GObjectClass parent_class;

  /* Signals */
  void    ( *reload)                           (GResolver               *resolver);

  /* Virtual methods */
  GList * ( *lookup_by_name)                   (GResolver               *resolver,
                                                const gchar             *hostname,
                                                GCancellable            *cancellable,
                                                GError                 **error);
  void    ( *lookup_by_name_async)             (GResolver               *resolver,
                                                const gchar             *hostname,
                                                GCancellable            *cancellable,
                                                GAsyncReadyCallback      callback,
                                                gpointer                 user_data);
  GList * ( *lookup_by_name_finish)            (GResolver               *resolver,
                                                GAsyncResult            *result,
                                                GError                 **error);

  gchar * ( *lookup_by_address)                (GResolver               *resolver,
                                                GInetAddress            *address,
                                                GCancellable            *cancellable,
                                                GError                 **error);
  void    ( *lookup_by_address_async)          (GResolver               *resolver,
                                                GInetAddress            *address,
                                                GCancellable            *cancellable,
                                                GAsyncReadyCallback      callback,
                                                gpointer                 user_data);
  gchar * ( *lookup_by_address_finish)         (GResolver               *resolver,
                                                GAsyncResult            *result,
                                                GError                 **error);

  GList * ( *lookup_service)                   (GResolver               *resolver,
                                                const gchar              *rrname,
                                                GCancellable             *cancellable,
                                                GError                  **error);
  void    ( *lookup_service_async)             (GResolver                *resolver,
                                                const gchar              *rrname,
                                                GCancellable             *cancellable,
                                                GAsyncReadyCallback       callback,
                                                gpointer                  user_data);
  GList * ( *lookup_service_finish)            (GResolver                *resolver,
                                                GAsyncResult             *result,
                                                GError                  **error);

  GList * ( *lookup_records)                   (GResolver                *resolver,
                                                const gchar              *rrname,
                                                GResolverRecordType       record_type,
                                                GCancellable             *cancellable,
                                                GError                  **error);

  void    ( *lookup_records_async)             (GResolver                *resolver,
                                                const gchar              *rrname,
                                                GResolverRecordType       record_type,
                                                GCancellable             *cancellable,
                                                GAsyncReadyCallback       callback,
                                                gpointer                  user_data);

  GList * ( *lookup_records_finish)            (GResolver                *resolver,
                                                GAsyncResult             *result,
                                                GError                   **error);
  /**
   * GResolverClass::lookup_by_name_with_flags_async:
   * @resolver: a #GResolver
   * @hostname: the hostname to resolve
   * @flags: extra #GResolverNameLookupFlags to modify the lookup
   * @cancellable: (nullable): a #GCancellable
   * @callback: (scope async): a #GAsyncReadyCallback to call when completed
   * @user_data: (closure): data to pass to @callback
   *
   * Asynchronous version of GResolverClass::lookup_by_name_with_flags
   *
   * GResolverClass::lookup_by_name_with_flags_finish will be called to get
   * the result.
   *
   * Since: 2.60
   */
  void    ( *lookup_by_name_with_flags_async)  (GResolver                 *resolver,
                                                const gchar               *hostname,
                                                GResolverNameLookupFlags   flags,
                                                GCancellable              *cancellable,
                                                GAsyncReadyCallback        callback,
                                                gpointer                   user_data);
  /**
   * GResolverClass::lookup_by_name_with_flags_finish:
   * @resolver: a #GResolver
   * @result: a #GAsyncResult
   * @error: (nullable): a pointer to a %NULL #GError
   *
   * Gets the result from GResolverClass::lookup_by_name_with_flags_async
   *
   * Returns: (element-type GInetAddress) (transfer full): List of #GInetAddress.
   * Since: 2.60
   */
  GList * ( *lookup_by_name_with_flags_finish) (GResolver                 *resolver,
                                                GAsyncResult              *result,
                                                GError                   **error);
  /**
   * GResolverClass::lookup_by_name_with_flags:
   * @resolver: a #GResolver
   * @hostname: the hostname to resolve
   * @flags: extra #GResolverNameLookupFlags to modify the lookup
   * @cancellable: (nullable): a #GCancellable
   * @error: (nullable): a pointer to a %NULL #GError
   *
   * This is identical to GResolverClass::lookup_by_name except it takes
   * @flags which modifies the behavior of the lookup. See #GResolverNameLookupFlags
   * for more details.
   *
   * Returns: (element-type GInetAddress) (transfer full): List of #GInetAddress.
   * Since: 2.60
   */
  GList * ( *lookup_by_name_with_flags)        (GResolver                 *resolver,
                                                const gchar               *hostname,
                                                GResolverNameLookupFlags   flags,
                                                GCancellable              *cancellable,
                                                GError                   **error);

};

GLIB_AVAILABLE_IN_ALL
GType      g_resolver_get_type                         (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GResolver *g_resolver_get_default                      (void);
GLIB_AVAILABLE_IN_ALL
void       g_resolver_set_default                      (GResolver                 *resolver);
GLIB_AVAILABLE_IN_ALL
GList     *g_resolver_lookup_by_name                   (GResolver                 *resolver,
                                                        const gchar               *hostname,
                                                        GCancellable              *cancellable,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_ALL
void       g_resolver_lookup_by_name_async             (GResolver                 *resolver,
                                                        const gchar               *hostname,
                                                        GCancellable              *cancellable,
                                                        GAsyncReadyCallback        callback,
                                                        gpointer                   user_data);
GLIB_AVAILABLE_IN_ALL
GList     *g_resolver_lookup_by_name_finish            (GResolver                 *resolver,
                                                        GAsyncResult              *result,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_2_60
void       g_resolver_lookup_by_name_with_flags_async  (GResolver                 *resolver,
                                                        const gchar               *hostname,
                                                        GResolverNameLookupFlags   flags,
                                                        GCancellable              *cancellable,
                                                        GAsyncReadyCallback        callback,
                                                        gpointer                   user_data);
GLIB_AVAILABLE_IN_2_60
GList     *g_resolver_lookup_by_name_with_flags_finish (GResolver                 *resolver,
                                                        GAsyncResult              *result,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_2_60
GList     *g_resolver_lookup_by_name_with_flags        (GResolver                 *resolver,
                                                        const gchar               *hostname,
                                                        GResolverNameLookupFlags   flags,
                                                        GCancellable              *cancellable,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_ALL
void       g_resolver_free_addresses                   (GList                     *addresses);
GLIB_AVAILABLE_IN_ALL
gchar     *g_resolver_lookup_by_address                (GResolver                 *resolver,
                                                        GInetAddress              *address,
                                                        GCancellable              *cancellable,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_ALL
void       g_resolver_lookup_by_address_async          (GResolver                 *resolver,
                                                        GInetAddress              *address,
                                                        GCancellable              *cancellable,
                                                        GAsyncReadyCallback        callback,
                                                        gpointer                   user_data);
GLIB_AVAILABLE_IN_ALL
gchar     *g_resolver_lookup_by_address_finish         (GResolver                 *resolver,
                                                        GAsyncResult              *result,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_ALL
GList     *g_resolver_lookup_service                   (GResolver                 *resolver,
                                                        const gchar               *service,
                                                        const gchar               *protocol,
                                                        const gchar               *domain,
                                                        GCancellable              *cancellable,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_ALL
void       g_resolver_lookup_service_async             (GResolver                 *resolver,
                                                        const gchar               *service,
                                                        const gchar               *protocol,
                                                        const gchar               *domain,
                                                        GCancellable              *cancellable,
                                                        GAsyncReadyCallback        callback,
                                                        gpointer                   user_data);
GLIB_AVAILABLE_IN_ALL
GList     *g_resolver_lookup_service_finish            (GResolver                 *resolver,
                                                        GAsyncResult              *result,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_2_34
GList     *g_resolver_lookup_records                   (GResolver                 *resolver,
                                                        const gchar               *rrname,
                                                        GResolverRecordType        record_type,
                                                        GCancellable              *cancellable,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_2_34
void       g_resolver_lookup_records_async             (GResolver                 *resolver,
                                                        const gchar               *rrname,
                                                        GResolverRecordType        record_type,
                                                        GCancellable              *cancellable,
                                                        GAsyncReadyCallback        callback,
                                                        gpointer                   user_data);
GLIB_AVAILABLE_IN_2_34
GList     *g_resolver_lookup_records_finish            (GResolver                 *resolver,
                                                        GAsyncResult              *result,
                                                        GError                   **error);
GLIB_AVAILABLE_IN_ALL
void       g_resolver_free_targets                     (GList                     *targets);


/**
 * G_RESOLVER_ERROR:
 *
 * Error domain for #GResolver. Errors in this domain will be from the
 * #GResolverError enumeration. See #GError for more information on
 * error domains.
 */
#define G_RESOLVER_ERROR (g_resolver_error_quark ())
GLIB_AVAILABLE_IN_ALL
GQuark g_resolver_error_quark (void);

G_END_DECLS

#endif /* __G_RESOLVER_H__ */
