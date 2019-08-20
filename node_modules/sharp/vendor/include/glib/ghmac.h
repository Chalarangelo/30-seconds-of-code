/* ghmac.h - secure data hashing
 *
 * Copyright (C) 2011  Stef Walter  <stefw@collabora.co.uk>
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
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef __G_HMAC_H__
#define __G_HMAC_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>
#include "gchecksum.h"

G_BEGIN_DECLS

/**
 * GHmac:
 *
 * An opaque structure representing a HMAC operation.
 * To create a new GHmac, use g_hmac_new(). To free
 * a GHmac, use g_hmac_unref().
 *
 * Since: 2.30
 */
typedef struct _GHmac       GHmac;

GLIB_AVAILABLE_IN_2_30
GHmac *               g_hmac_new                    (GChecksumType  digest_type,
                                                     const guchar  *key,
                                                     gsize          key_len);
GLIB_AVAILABLE_IN_2_30
GHmac *               g_hmac_copy                   (const GHmac   *hmac);
GLIB_AVAILABLE_IN_2_30
GHmac *               g_hmac_ref                    (GHmac         *hmac);
GLIB_AVAILABLE_IN_2_30
void                  g_hmac_unref                  (GHmac         *hmac);
GLIB_AVAILABLE_IN_2_30
void                  g_hmac_update                 (GHmac         *hmac,
                                                     const guchar  *data,
                                                     gssize         length);
GLIB_AVAILABLE_IN_2_30
const gchar *         g_hmac_get_string             (GHmac         *hmac);
GLIB_AVAILABLE_IN_2_30
void                  g_hmac_get_digest             (GHmac         *hmac,
                                                     guint8        *buffer,
                                                     gsize         *digest_len);

GLIB_AVAILABLE_IN_2_30
gchar                *g_compute_hmac_for_data       (GChecksumType  digest_type,
                                                     const guchar  *key,
                                                     gsize          key_len,
                                                     const guchar  *data,
                                                     gsize          length);
GLIB_AVAILABLE_IN_2_30
gchar                *g_compute_hmac_for_string     (GChecksumType  digest_type,
                                                     const guchar  *key,
                                                     gsize          key_len,
                                                     const gchar   *str,
                                                     gssize         length);
GLIB_AVAILABLE_IN_2_50
gchar               *g_compute_hmac_for_bytes       (GChecksumType  digest_type,
                                                     GBytes        *key,
                                                     GBytes        *data);


G_END_DECLS

#endif /* __G_CHECKSUM_H__ */
