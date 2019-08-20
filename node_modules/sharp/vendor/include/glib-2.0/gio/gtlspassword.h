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

#ifndef __G_TLS_PASSWORD_H__
#define __G_TLS_PASSWORD_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_TLS_PASSWORD         (g_tls_password_get_type ())
#define G_TLS_PASSWORD(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_TLS_PASSWORD, GTlsPassword))
#define G_TLS_PASSWORD_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_TLS_PASSWORD, GTlsPasswordClass))
#define G_IS_TLS_PASSWORD(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_TLS_PASSWORD))
#define G_IS_TLS_PASSWORD_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_TLS_PASSWORD))
#define G_TLS_PASSWORD_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_TLS_PASSWORD, GTlsPasswordClass))

typedef struct _GTlsPasswordClass   GTlsPasswordClass;
typedef struct _GTlsPasswordPrivate GTlsPasswordPrivate;

struct _GTlsPassword
{
  GObject parent_instance;

  GTlsPasswordPrivate *priv;
};

/**
 * GTlsPasswordClass:
 * @get_value: virtual method for g_tls_password_get_value()
 * @set_value: virtual method for g_tls_password_set_value()
 * @get_default_warning: virtual method for g_tls_password_get_warning() if no
 *  value has been set using g_tls_password_set_warning()
 *
 * Class structure for #GTlsPassword.
 */
struct _GTlsPasswordClass
{
  GObjectClass parent_class;

  /* methods */

  const guchar *    ( *get_value)            (GTlsPassword  *password,
                                              gsize         *length);

  void              ( *set_value)            (GTlsPassword  *password,
                                              guchar        *value,
                                              gssize         length,
                                              GDestroyNotify destroy);

  const gchar*      ( *get_default_warning)  (GTlsPassword  *password);

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[4];
};

GLIB_AVAILABLE_IN_ALL
GType             g_tls_password_get_type            (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GTlsPassword *    g_tls_password_new                 (GTlsPasswordFlags  flags,
                                                      const gchar       *description);

GLIB_AVAILABLE_IN_ALL
const guchar *    g_tls_password_get_value           (GTlsPassword      *password,
                                                      gsize             *length);
GLIB_AVAILABLE_IN_ALL
void              g_tls_password_set_value           (GTlsPassword      *password,
                                                      const guchar      *value,
                                                      gssize             length);
GLIB_AVAILABLE_IN_ALL
void              g_tls_password_set_value_full      (GTlsPassword      *password,
                                                      guchar            *value,
                                                      gssize             length,
                                                      GDestroyNotify     destroy);

GLIB_AVAILABLE_IN_ALL
GTlsPasswordFlags g_tls_password_get_flags           (GTlsPassword      *password);
GLIB_AVAILABLE_IN_ALL
void              g_tls_password_set_flags           (GTlsPassword      *password,
                                                      GTlsPasswordFlags  flags);

GLIB_AVAILABLE_IN_ALL
const gchar*      g_tls_password_get_description     (GTlsPassword      *password);
GLIB_AVAILABLE_IN_ALL
void              g_tls_password_set_description     (GTlsPassword      *password,
                                                      const gchar       *description);

GLIB_AVAILABLE_IN_ALL
const gchar *     g_tls_password_get_warning         (GTlsPassword      *password);
GLIB_AVAILABLE_IN_ALL
void              g_tls_password_set_warning         (GTlsPassword      *password,
                                                      const gchar       *warning);

G_END_DECLS

#endif /* __G_TLS_PASSWORD_H__ */
