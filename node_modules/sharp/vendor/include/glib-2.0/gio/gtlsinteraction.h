/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2011 Collabora, Ltd.
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

#ifndef __G_TLS_INTERACTION_H__
#define __G_TLS_INTERACTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_TLS_INTERACTION         (g_tls_interaction_get_type ())
#define G_TLS_INTERACTION(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_TLS_INTERACTION, GTlsInteraction))
#define G_TLS_INTERACTION_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_TLS_INTERACTION, GTlsInteractionClass))
#define G_IS_TLS_INTERACTION(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_TLS_INTERACTION))
#define G_IS_TLS_INTERACTION_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_TLS_INTERACTION))
#define G_TLS_INTERACTION_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_TLS_INTERACTION, GTlsInteractionClass))

typedef struct _GTlsInteractionClass   GTlsInteractionClass;
typedef struct _GTlsInteractionPrivate GTlsInteractionPrivate;

struct _GTlsInteraction
{
  /*< private >*/
  GObject parent_instance;
  GTlsInteractionPrivate *priv;
};

struct _GTlsInteractionClass
{
  /*< private >*/
  GObjectClass parent_class;

  /*< public >*/
  GTlsInteractionResult  (* ask_password)        (GTlsInteraction    *interaction,
                                                  GTlsPassword       *password,
                                                  GCancellable       *cancellable,
                                                  GError            **error);

  void                   (* ask_password_async)  (GTlsInteraction    *interaction,
                                                  GTlsPassword       *password,
                                                  GCancellable       *cancellable,
                                                  GAsyncReadyCallback callback,
                                                  gpointer            user_data);

  GTlsInteractionResult  (* ask_password_finish) (GTlsInteraction    *interaction,
                                                  GAsyncResult       *result,
                                                  GError            **error);

  GTlsInteractionResult  (* request_certificate)        (GTlsInteraction              *interaction,
                                                         GTlsConnection               *connection,
                                                         GTlsCertificateRequestFlags   flags,
                                                         GCancellable                 *cancellable,
                                                         GError                      **error);

  void                   (* request_certificate_async)  (GTlsInteraction              *interaction,
                                                         GTlsConnection               *connection,
                                                         GTlsCertificateRequestFlags   flags,
                                                         GCancellable                 *cancellable,
                                                         GAsyncReadyCallback           callback,
                                                         gpointer                      user_data);

  GTlsInteractionResult  (* request_certificate_finish) (GTlsInteraction              *interaction,
                                                         GAsyncResult                 *result,
                                                         GError                      **error);

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[21];
};

GLIB_AVAILABLE_IN_ALL
GType                  g_tls_interaction_get_type            (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GTlsInteractionResult  g_tls_interaction_invoke_ask_password (GTlsInteraction    *interaction,
                                                              GTlsPassword       *password,
                                                              GCancellable       *cancellable,
                                                              GError            **error);

GLIB_AVAILABLE_IN_ALL
GTlsInteractionResult  g_tls_interaction_ask_password        (GTlsInteraction    *interaction,
                                                              GTlsPassword       *password,
                                                              GCancellable       *cancellable,
                                                              GError            **error);

GLIB_AVAILABLE_IN_ALL
void                   g_tls_interaction_ask_password_async  (GTlsInteraction    *interaction,
                                                              GTlsPassword       *password,
                                                              GCancellable       *cancellable,
                                                              GAsyncReadyCallback callback,
                                                              gpointer            user_data);

GLIB_AVAILABLE_IN_ALL
GTlsInteractionResult  g_tls_interaction_ask_password_finish (GTlsInteraction    *interaction,
                                                              GAsyncResult       *result,
                                                              GError            **error);

GLIB_AVAILABLE_IN_2_40
GTlsInteractionResult  g_tls_interaction_invoke_request_certificate (GTlsInteraction              *interaction,
                                                                     GTlsConnection               *connection,
                                                                     GTlsCertificateRequestFlags   flags,
                                                                     GCancellable                 *cancellable,
                                                                     GError                      **error);

GLIB_AVAILABLE_IN_2_40
GTlsInteractionResult  g_tls_interaction_request_certificate        (GTlsInteraction              *interaction,
                                                                     GTlsConnection               *connection,
                                                                     GTlsCertificateRequestFlags   flags,
                                                                     GCancellable                 *cancellable,
                                                                     GError                      **error);

GLIB_AVAILABLE_IN_2_40
void                   g_tls_interaction_request_certificate_async  (GTlsInteraction              *interaction,
                                                                     GTlsConnection               *connection,
                                                                     GTlsCertificateRequestFlags   flags,
                                                                     GCancellable                 *cancellable,
                                                                     GAsyncReadyCallback           callback,
                                                                     gpointer                      user_data);

GLIB_AVAILABLE_IN_2_40
GTlsInteractionResult  g_tls_interaction_request_certificate_finish (GTlsInteraction              *interaction,
                                                                     GAsyncResult                 *result,
                                                                     GError                      **error);

G_END_DECLS

#endif /* __G_TLS_INTERACTION_H__ */
