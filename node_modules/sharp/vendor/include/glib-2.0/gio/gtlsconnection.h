/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Red Hat, Inc.
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

#ifndef __G_TLS_CONNECTION_H__
#define __G_TLS_CONNECTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giostream.h>

G_BEGIN_DECLS

#define G_TYPE_TLS_CONNECTION            (g_tls_connection_get_type ())
#define G_TLS_CONNECTION(inst)           (G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_TLS_CONNECTION, GTlsConnection))
#define G_TLS_CONNECTION_CLASS(class)    (G_TYPE_CHECK_CLASS_CAST ((class), G_TYPE_TLS_CONNECTION, GTlsConnectionClass))
#define G_IS_TLS_CONNECTION(inst)        (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_TLS_CONNECTION))
#define G_IS_TLS_CONNECTION_CLASS(class) (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_TLS_CONNECTION))
#define G_TLS_CONNECTION_GET_CLASS(inst) (G_TYPE_INSTANCE_GET_CLASS ((inst), G_TYPE_TLS_CONNECTION, GTlsConnectionClass))

typedef struct _GTlsConnectionClass   GTlsConnectionClass;
typedef struct _GTlsConnectionPrivate GTlsConnectionPrivate;

struct _GTlsConnection {
  GIOStream parent_instance;

  GTlsConnectionPrivate *priv;
};

struct _GTlsConnectionClass
{
  GIOStreamClass parent_class;

  /* signals */
  gboolean          ( *accept_certificate) (GTlsConnection       *connection,
					    GTlsCertificate      *peer_cert,
					    GTlsCertificateFlags  errors);

  /* methods */
  gboolean ( *handshake )        (GTlsConnection       *conn,
				  GCancellable         *cancellable,
				  GError              **error);

  void     ( *handshake_async )  (GTlsConnection       *conn,
				  int                   io_priority,
				  GCancellable         *cancellable,
				  GAsyncReadyCallback   callback,
				  gpointer              user_data);
  gboolean ( *handshake_finish ) (GTlsConnection       *conn,
				  GAsyncResult         *result,
				  GError              **error);

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                 g_tls_connection_get_type                    (void) G_GNUC_CONST;

GLIB_DEPRECATED
void                  g_tls_connection_set_use_system_certdb       (GTlsConnection       *conn,
                                                                    gboolean              use_system_certdb);
GLIB_DEPRECATED
gboolean              g_tls_connection_get_use_system_certdb       (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_ALL
void                  g_tls_connection_set_database                (GTlsConnection       *conn,
								    GTlsDatabase         *database);
GLIB_AVAILABLE_IN_ALL
GTlsDatabase *        g_tls_connection_get_database                (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_ALL
void                  g_tls_connection_set_certificate             (GTlsConnection       *conn,
                                                                    GTlsCertificate      *certificate);
GLIB_AVAILABLE_IN_ALL
GTlsCertificate      *g_tls_connection_get_certificate             (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_ALL
void                  g_tls_connection_set_interaction             (GTlsConnection       *conn,
                                                                    GTlsInteraction      *interaction);
GLIB_AVAILABLE_IN_ALL
GTlsInteraction *     g_tls_connection_get_interaction             (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate      *g_tls_connection_get_peer_certificate        (GTlsConnection       *conn);
GLIB_AVAILABLE_IN_ALL
GTlsCertificateFlags  g_tls_connection_get_peer_certificate_errors (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_ALL
void                  g_tls_connection_set_require_close_notify    (GTlsConnection       *conn,
								    gboolean              require_close_notify);
GLIB_AVAILABLE_IN_ALL
gboolean              g_tls_connection_get_require_close_notify    (GTlsConnection       *conn);

GLIB_DEPRECATED_IN_2_60
void                  g_tls_connection_set_rehandshake_mode        (GTlsConnection       *conn,
								    GTlsRehandshakeMode   mode);
GLIB_DEPRECATED_IN_2_60
GTlsRehandshakeMode   g_tls_connection_get_rehandshake_mode        (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_2_60
void                  g_tls_connection_set_advertised_protocols    (GTlsConnection       *conn,
                                                                    const gchar * const  *protocols);

GLIB_AVAILABLE_IN_2_60
const gchar *         g_tls_connection_get_negotiated_protocol     (GTlsConnection       *conn);

GLIB_AVAILABLE_IN_ALL
gboolean              g_tls_connection_handshake                   (GTlsConnection       *conn,
								    GCancellable         *cancellable,
								    GError              **error);

GLIB_AVAILABLE_IN_ALL
void                  g_tls_connection_handshake_async             (GTlsConnection       *conn,
								    int                   io_priority,
								    GCancellable         *cancellable,
								    GAsyncReadyCallback   callback,
								    gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean              g_tls_connection_handshake_finish            (GTlsConnection       *conn,
								    GAsyncResult         *result,
								    GError              **error);

/**
 * G_TLS_ERROR:
 *
 * Error domain for TLS. Errors in this domain will be from the
 * #GTlsError enumeration. See #GError for more information on error
 * domains.
 */
#define G_TLS_ERROR (g_tls_error_quark ())
GLIB_AVAILABLE_IN_ALL
GQuark g_tls_error_quark (void);


/*< protected >*/
GLIB_AVAILABLE_IN_ALL
gboolean              g_tls_connection_emit_accept_certificate     (GTlsConnection       *conn,
								    GTlsCertificate      *peer_cert,
								    GTlsCertificateFlags  errors);

G_END_DECLS

#endif /* __G_TLS_CONNECTION_H__ */
