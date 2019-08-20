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

#ifndef __G_TLS_CERTIFICATE_H__
#define __G_TLS_CERTIFICATE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_TLS_CERTIFICATE            (g_tls_certificate_get_type ())
#define G_TLS_CERTIFICATE(inst)           (G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_TLS_CERTIFICATE, GTlsCertificate))
#define G_TLS_CERTIFICATE_CLASS(class)    (G_TYPE_CHECK_CLASS_CAST ((class), G_TYPE_TLS_CERTIFICATE, GTlsCertificateClass))
#define G_IS_TLS_CERTIFICATE(inst)        (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_TLS_CERTIFICATE))
#define G_IS_TLS_CERTIFICATE_CLASS(class) (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_TLS_CERTIFICATE))
#define G_TLS_CERTIFICATE_GET_CLASS(inst) (G_TYPE_INSTANCE_GET_CLASS ((inst), G_TYPE_TLS_CERTIFICATE, GTlsCertificateClass))

typedef struct _GTlsCertificateClass   GTlsCertificateClass;
typedef struct _GTlsCertificatePrivate GTlsCertificatePrivate;

struct _GTlsCertificate {
  GObject parent_instance;

  GTlsCertificatePrivate *priv;
};

struct _GTlsCertificateClass
{
  GObjectClass parent_class;

  GTlsCertificateFlags  (* verify) (GTlsCertificate     *cert,
				    GSocketConnectable  *identity,
				    GTlsCertificate     *trusted_ca);

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                 g_tls_certificate_get_type           (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GTlsCertificate      *g_tls_certificate_new_from_pem       (const gchar         *data,
							    gssize               length,
							    GError             **error);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate      *g_tls_certificate_new_from_file      (const gchar         *file,
							    GError             **error);
GLIB_AVAILABLE_IN_ALL
GTlsCertificate      *g_tls_certificate_new_from_files     (const gchar         *cert_file,
							    const gchar         *key_file,
							    GError             **error);
GLIB_AVAILABLE_IN_ALL
GList                *g_tls_certificate_list_new_from_file (const gchar         *file,
							    GError             **error);

GLIB_AVAILABLE_IN_ALL
GTlsCertificate      *g_tls_certificate_get_issuer         (GTlsCertificate     *cert);

GLIB_AVAILABLE_IN_ALL
GTlsCertificateFlags  g_tls_certificate_verify             (GTlsCertificate     *cert,
							    GSocketConnectable  *identity,
							    GTlsCertificate     *trusted_ca);

GLIB_AVAILABLE_IN_2_34
gboolean              g_tls_certificate_is_same            (GTlsCertificate     *cert_one,
                                                            GTlsCertificate     *cert_two);

G_END_DECLS

#endif /* __G_TLS_CERTIFICATE_H__ */
