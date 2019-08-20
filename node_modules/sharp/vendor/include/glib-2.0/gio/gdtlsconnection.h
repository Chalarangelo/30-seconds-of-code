/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2010 Red Hat, Inc.
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

#ifndef __G_DTLS_CONNECTION_H__
#define __G_DTLS_CONNECTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gdatagrambased.h>

G_BEGIN_DECLS

#define G_TYPE_DTLS_CONNECTION                (g_dtls_connection_get_type ())
#define G_DTLS_CONNECTION(inst)               (G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_DTLS_CONNECTION, GDtlsConnection))
#define G_IS_DTLS_CONNECTION(inst)            (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_DTLS_CONNECTION))
#define G_DTLS_CONNECTION_GET_INTERFACE(inst) (G_TYPE_INSTANCE_GET_INTERFACE ((inst), G_TYPE_DTLS_CONNECTION, GDtlsConnectionInterface))

typedef struct _GDtlsConnectionInterface GDtlsConnectionInterface;

/**
 * GDtlsConnectionInterface:
 * @g_iface: The parent interface.
 * @accept_certificate: Check whether to accept a certificate.
 * @handshake: Perform a handshake operation.
 * @handshake_async: Start an asynchronous handshake operation.
 * @handshake_finish: Finish an asynchronous handshake operation.
 * @shutdown: Shut down one or both directions of the connection.
 * @shutdown_async: Start an asynchronous shutdown operation.
 * @shutdown_finish: Finish an asynchronous shutdown operation.
 * @set_advertised_protocols: Set APLN protocol list
 * @get_negotiated_protocol: Retrieve ALPN-negotiated protocol
 *
 * Virtual method table for a #GDtlsConnection implementation.
 *
 * Since: 2.48
 */
struct _GDtlsConnectionInterface
{
  GTypeInterface g_iface;

  /* signals */
  gboolean (*accept_certificate) (GDtlsConnection       *connection,
                                  GTlsCertificate       *peer_cert,
                                  GTlsCertificateFlags   errors);

  /* methods */
  gboolean (*handshake)          (GDtlsConnection       *conn,
                                  GCancellable          *cancellable,
                                  GError               **error);

  void     (*handshake_async)    (GDtlsConnection       *conn,
                                  int                    io_priority,
                                  GCancellable          *cancellable,
                                  GAsyncReadyCallback    callback,
                                  gpointer               user_data);
  gboolean (*handshake_finish)   (GDtlsConnection       *conn,
                                  GAsyncResult          *result,
                                  GError               **error);

  gboolean (*shutdown)           (GDtlsConnection       *conn,
                                  gboolean               shutdown_read,
                                  gboolean               shutdown_write,
                                  GCancellable          *cancellable,
                                  GError               **error);

  void     (*shutdown_async)     (GDtlsConnection       *conn,
                                  gboolean               shutdown_read,
                                  gboolean               shutdown_write,
                                  int                    io_priority,
                                  GCancellable          *cancellable,
                                  GAsyncReadyCallback    callback,
                                  gpointer               user_data);
  gboolean (*shutdown_finish)    (GDtlsConnection       *conn,
                                  GAsyncResult          *result,
                                  GError               **error);

  void (*set_advertised_protocols)        (GDtlsConnection     *conn,
                                           const gchar * const *protocols);
  const gchar *(*get_negotiated_protocol) (GDtlsConnection     *conn);
};

GLIB_AVAILABLE_IN_2_48
GType                 g_dtls_connection_get_type                    (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_set_database                (GDtlsConnection       *conn,
                                                                     GTlsDatabase          *database);
GLIB_AVAILABLE_IN_2_48
GTlsDatabase         *g_dtls_connection_get_database                (GDtlsConnection       *conn);

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_set_certificate             (GDtlsConnection       *conn,
                                                                     GTlsCertificate       *certificate);
GLIB_AVAILABLE_IN_2_48
GTlsCertificate      *g_dtls_connection_get_certificate             (GDtlsConnection       *conn);

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_set_interaction             (GDtlsConnection       *conn,
                                                                     GTlsInteraction       *interaction);
GLIB_AVAILABLE_IN_2_48
GTlsInteraction      *g_dtls_connection_get_interaction             (GDtlsConnection       *conn);

GLIB_AVAILABLE_IN_2_48
GTlsCertificate      *g_dtls_connection_get_peer_certificate        (GDtlsConnection       *conn);
GLIB_AVAILABLE_IN_2_48
GTlsCertificateFlags  g_dtls_connection_get_peer_certificate_errors (GDtlsConnection       *conn);

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_set_require_close_notify    (GDtlsConnection       *conn,
                                                                     gboolean               require_close_notify);
GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_get_require_close_notify    (GDtlsConnection       *conn);

GLIB_DEPRECATED_IN_2_60
void                  g_dtls_connection_set_rehandshake_mode        (GDtlsConnection       *conn,
                                                                     GTlsRehandshakeMode    mode);
GLIB_DEPRECATED_IN_2_60
GTlsRehandshakeMode   g_dtls_connection_get_rehandshake_mode        (GDtlsConnection       *conn);

GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_handshake                   (GDtlsConnection       *conn,
                                                                     GCancellable          *cancellable,
                                                                     GError               **error);

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_handshake_async             (GDtlsConnection       *conn,
                                                                     int                    io_priority,
                                                                     GCancellable          *cancellable,
                                                                     GAsyncReadyCallback    callback,
                                                                     gpointer               user_data);
GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_handshake_finish            (GDtlsConnection       *conn,
                                                                     GAsyncResult          *result,
                                                                     GError               **error);

GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_shutdown                    (GDtlsConnection       *conn,
                                                                     gboolean               shutdown_read,
                                                                     gboolean               shutdown_write,
                                                                     GCancellable          *cancellable,
                                                                     GError               **error);

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_shutdown_async              (GDtlsConnection       *conn,
                                                                     gboolean               shutdown_read,
                                                                     gboolean               shutdown_write,
                                                                     int                    io_priority,
                                                                     GCancellable          *cancellable,
                                                                     GAsyncReadyCallback    callback,
                                                                     gpointer               user_data);
GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_shutdown_finish             (GDtlsConnection       *conn,
                                                                     GAsyncResult          *result,
                                                                     GError               **error);

GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_close                       (GDtlsConnection       *conn,
                                                                     GCancellable          *cancellable,
                                                                     GError               **error);

GLIB_AVAILABLE_IN_2_48
void                  g_dtls_connection_close_async                 (GDtlsConnection       *conn,
                                                                     int                    io_priority,
                                                                     GCancellable          *cancellable,
                                                                     GAsyncReadyCallback    callback,
                                                                     gpointer               user_data);
GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_close_finish                (GDtlsConnection       *conn,
                                                                     GAsyncResult          *result,
                                                                     GError               **error);

/*< protected >*/
GLIB_AVAILABLE_IN_2_48
gboolean              g_dtls_connection_emit_accept_certificate     (GDtlsConnection       *conn,
                                                                     GTlsCertificate       *peer_cert,
                                                                     GTlsCertificateFlags   errors);
GLIB_AVAILABLE_IN_2_60
void                  g_dtls_connection_set_advertised_protocols    (GDtlsConnection     *conn,
                                                                     const gchar * const *protocols);

GLIB_AVAILABLE_IN_2_60
const gchar *          g_dtls_connection_get_negotiated_protocol     (GDtlsConnection    *conn);

G_END_DECLS

#endif /* __G_DTLS_CONNECTION_H__ */
