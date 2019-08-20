/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Red Hat, Inc.
 * Copyright © 2015 Collabora, Ltd.
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

#ifndef __G_TLS_BACKEND_H__
#define __G_TLS_BACKEND_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

/**
 * G_TLS_BACKEND_EXTENSION_POINT_NAME:
 *
 * Extension point for TLS functionality via #GTlsBackend.
 * See [Extending GIO][extending-gio].
 */
#define G_TLS_BACKEND_EXTENSION_POINT_NAME "gio-tls-backend"

#define G_TYPE_TLS_BACKEND               (g_tls_backend_get_type ())
#define G_TLS_BACKEND(obj)               (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_TLS_BACKEND, GTlsBackend))
#define G_IS_TLS_BACKEND(obj)	         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_TLS_BACKEND))
#define G_TLS_BACKEND_GET_INTERFACE(obj) (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_TLS_BACKEND, GTlsBackendInterface))

typedef struct _GTlsBackend          GTlsBackend;
typedef struct _GTlsBackendInterface GTlsBackendInterface;

/**
 * GTlsBackendInterface:
 * @g_iface: The parent interface.
 * @supports_tls: returns whether the backend supports TLS.
 * @supports_dtls: returns whether the backend supports DTLS
 * @get_default_database: returns a default #GTlsDatabase instance.
 * @get_certificate_type: returns the #GTlsCertificate implementation type
 * @get_client_connection_type: returns the #GTlsClientConnection implementation type
 * @get_server_connection_type: returns the #GTlsServerConnection implementation type
 * @get_file_database_type: returns the #GTlsFileDatabase implementation type.
 * @get_dtls_client_connection_type: returns the #GDtlsClientConnection implementation type
 * @get_dtls_server_connection_type: returns the #GDtlsServerConnection implementation type
 *
 * Provides an interface for describing TLS-related types.
 *
 * Since: 2.28
 */
struct _GTlsBackendInterface
{
  GTypeInterface g_iface;

  /* methods */
  gboolean       ( *supports_tls)               (GTlsBackend *backend);
  GType          ( *get_certificate_type)       (void);
  GType          ( *get_client_connection_type) (void);
  GType          ( *get_server_connection_type) (void);
  GType          ( *get_file_database_type)     (void);
  GTlsDatabase * ( *get_default_database)       (GTlsBackend *backend);
  gboolean       ( *supports_dtls)              (GTlsBackend *backend);
  GType          ( *get_dtls_client_connection_type) (void);
  GType          ( *get_dtls_server_connection_type) (void);
};

GLIB_AVAILABLE_IN_ALL
GType          g_tls_backend_get_type                   (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GTlsBackend *  g_tls_backend_get_default                (void);

GLIB_AVAILABLE_IN_ALL
GTlsDatabase * g_tls_backend_get_default_database       (GTlsBackend *backend);
GLIB_AVAILABLE_IN_2_60
void           g_tls_backend_set_default_database       (GTlsBackend  *backend,
                                                         GTlsDatabase *database);

GLIB_AVAILABLE_IN_ALL
gboolean       g_tls_backend_supports_tls               (GTlsBackend *backend);
GLIB_AVAILABLE_IN_2_48
gboolean       g_tls_backend_supports_dtls              (GTlsBackend *backend);

GLIB_AVAILABLE_IN_ALL
GType          g_tls_backend_get_certificate_type       (GTlsBackend *backend);
GLIB_AVAILABLE_IN_ALL
GType          g_tls_backend_get_client_connection_type (GTlsBackend *backend);
GLIB_AVAILABLE_IN_ALL
GType          g_tls_backend_get_server_connection_type (GTlsBackend *backend);
GLIB_AVAILABLE_IN_ALL
GType          g_tls_backend_get_file_database_type     (GTlsBackend *backend);

GLIB_AVAILABLE_IN_2_48
GType          g_tls_backend_get_dtls_client_connection_type (GTlsBackend *backend);
GLIB_AVAILABLE_IN_2_48
GType          g_tls_backend_get_dtls_server_connection_type (GTlsBackend *backend);

G_END_DECLS

#endif /* __G_TLS_BACKEND_H__ */
