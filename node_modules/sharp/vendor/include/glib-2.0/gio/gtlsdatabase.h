/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Collabora, Ltd.
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
 * Author: Stef Walter <stefw@collabora.co.uk>
 */

#ifndef __G_TLS_DATABASE_H__
#define __G_TLS_DATABASE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TLS_DATABASE_PURPOSE_AUTHENTICATE_SERVER "1.3.6.1.5.5.7.3.1"
#define G_TLS_DATABASE_PURPOSE_AUTHENTICATE_CLIENT "1.3.6.1.5.5.7.3.2"

#define G_TYPE_TLS_DATABASE            (g_tls_database_get_type ())
#define G_TLS_DATABASE(inst)           (G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_TLS_DATABASE, GTlsDatabase))
#define G_TLS_DATABASE_CLASS(class)    (G_TYPE_CHECK_CLASS_CAST ((class), G_TYPE_TLS_DATABASE, GTlsDatabaseClass))
#define G_IS_TLS_DATABASE(inst)        (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_TLS_DATABASE))
#define G_IS_TLS_DATABASE_CLASS(class) (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_TLS_DATABASE))
#define G_TLS_DATABASE_GET_CLASS(inst) (G_TYPE_INSTANCE_GET_CLASS ((inst), G_TYPE_TLS_DATABASE, GTlsDatabaseClass))

typedef struct _GTlsDatabaseClass   GTlsDatabaseClass;
typedef struct _GTlsDatabasePrivate GTlsDatabasePrivate;

struct _GTlsDatabase
{
  GObject parent_instance;

  GTlsDatabasePrivate *priv;
};

struct _GTlsDatabaseClass
{
  GObjectClass parent_class;

  /* virtual methods */

  GTlsCertificateFlags  (*verify_chain)                         (GTlsDatabase            *self,
                                                                 GTlsCertificate         *chain,
                                                                 const gchar             *purpose,
                                                                 GSocketConnectable      *identity,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseVerifyFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GError                 **error);

  void                  (*verify_chain_async)                   (GTlsDatabase            *self,
                                                                 GTlsCertificate         *chain,
                                                                 const gchar             *purpose,
                                                                 GSocketConnectable      *identity,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseVerifyFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GAsyncReadyCallback      callback,
                                                                 gpointer                 user_data);

  GTlsCertificateFlags  (*verify_chain_finish)                  (GTlsDatabase            *self,
                                                                 GAsyncResult            *result,
                                                                 GError                 **error);

  gchar*                (*create_certificate_handle)            (GTlsDatabase            *self,
                                                                 GTlsCertificate         *certificate);

  GTlsCertificate*      (*lookup_certificate_for_handle)        (GTlsDatabase            *self,
                                                                 const gchar             *handle,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseLookupFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GError                 **error);

  void                  (*lookup_certificate_for_handle_async)  (GTlsDatabase            *self,
                                                                 const gchar             *handle,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseLookupFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GAsyncReadyCallback      callback,
                                                                 gpointer                 user_data);

  GTlsCertificate*      (*lookup_certificate_for_handle_finish) (GTlsDatabase            *self,
                                                                 GAsyncResult            *result,
                                                                 GError                 **error);

  GTlsCertificate*      (*lookup_certificate_issuer)            (GTlsDatabase            *self,
                                                                 GTlsCertificate         *certificate,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseLookupFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GError                 **error);

  void                  (*lookup_certificate_issuer_async)      (GTlsDatabase            *self,
                                                                 GTlsCertificate         *certificate,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseLookupFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GAsyncReadyCallback      callback,
                                                                 gpointer                 user_data);

  GTlsCertificate*      (*lookup_certificate_issuer_finish)     (GTlsDatabase            *self,
                                                                 GAsyncResult            *result,
                                                                 GError                 **error);

  GList*                (*lookup_certificates_issued_by)        (GTlsDatabase            *self,
                                                                 GByteArray              *issuer_raw_dn,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseLookupFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GError                 **error);

  void                  (*lookup_certificates_issued_by_async)  (GTlsDatabase            *self,
                                                                 GByteArray              *issuer_raw_dn,
                                                                 GTlsInteraction         *interaction,
                                                                 GTlsDatabaseLookupFlags  flags,
                                                                 GCancellable            *cancellable,
                                                                 GAsyncReadyCallback      callback,
                                                                 gpointer                 user_data);

  GList*                (*lookup_certificates_issued_by_finish) (GTlsDatabase            *self,
                                                                 GAsyncResult            *result,
                                                                 GError                 **error);

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[16];
};

GLIB_AVAILABLE_IN_ALL
GType                g_tls_database_get_type                              (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GTlsCertificateFlags g_tls_database_verify_chain                          (GTlsDatabase            *self,
                                                                           GTlsCertificate         *chain,
                                                                           const gchar             *purpose,
                                                                           GSocketConnectable      *identity,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseVerifyFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
void                 g_tls_database_verify_chain_async                    (GTlsDatabase            *self,
                                                                           GTlsCertificate         *chain,
                                                                           const gchar             *purpose,
                                                                           GSocketConnectable      *identity,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseVerifyFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GAsyncReadyCallback      callback,
                                                                           gpointer                 user_data);

GLIB_AVAILABLE_IN_ALL
GTlsCertificateFlags g_tls_database_verify_chain_finish                   (GTlsDatabase            *self,
                                                                           GAsyncResult            *result,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
gchar*               g_tls_database_create_certificate_handle             (GTlsDatabase            *self,
                                                                           GTlsCertificate         *certificate);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate*     g_tls_database_lookup_certificate_for_handle         (GTlsDatabase            *self,
                                                                           const gchar             *handle,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseLookupFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
void                 g_tls_database_lookup_certificate_for_handle_async   (GTlsDatabase            *self,
                                                                           const gchar             *handle,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseLookupFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GAsyncReadyCallback      callback,
                                                                           gpointer                 user_data);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate*     g_tls_database_lookup_certificate_for_handle_finish  (GTlsDatabase            *self,
                                                                           GAsyncResult            *result,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate*     g_tls_database_lookup_certificate_issuer             (GTlsDatabase            *self,
                                                                           GTlsCertificate         *certificate,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseLookupFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
void                 g_tls_database_lookup_certificate_issuer_async       (GTlsDatabase            *self,
                                                                           GTlsCertificate         *certificate,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseLookupFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GAsyncReadyCallback      callback,
                                                                           gpointer                 user_data);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate*     g_tls_database_lookup_certificate_issuer_finish      (GTlsDatabase            *self,
                                                                           GAsyncResult            *result,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
GList*               g_tls_database_lookup_certificates_issued_by         (GTlsDatabase            *self,
                                                                           GByteArray              *issuer_raw_dn,
                                                                           GTlsInteraction         *interaction,
                                                                           GTlsDatabaseLookupFlags  flags,
                                                                           GCancellable            *cancellable,
                                                                           GError                 **error);

GLIB_AVAILABLE_IN_ALL
void                 g_tls_database_lookup_certificates_issued_by_async    (GTlsDatabase            *self,
                                                                            GByteArray              *issuer_raw_dn,
                                                                            GTlsInteraction         *interaction,
                                                                            GTlsDatabaseLookupFlags  flags,
                                                                            GCancellable            *cancellable,
                                                                            GAsyncReadyCallback      callback,
                                                                            gpointer                 user_data);

GLIB_AVAILABLE_IN_ALL
GList*               g_tls_database_lookup_certificates_issued_by_finish   (GTlsDatabase            *self,
                                                                            GAsyncResult            *result,
                                                                            GError                 **error);

G_END_DECLS

#endif /* __G_TLS_DATABASE_H__ */
