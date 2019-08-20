/* gchecksum.h - data hashing functions
 *
 * Copyright (C) 2007  Emmanuele Bassi  <ebassi@gnome.org>
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

#ifndef __G_CHECKSUM_H__
#define __G_CHECKSUM_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>
#include <glib/gbytes.h>

G_BEGIN_DECLS

/**
 * GChecksumType:
 * @G_CHECKSUM_MD5: Use the MD5 hashing algorithm
 * @G_CHECKSUM_SHA1: Use the SHA-1 hashing algorithm
 * @G_CHECKSUM_SHA256: Use the SHA-256 hashing algorithm
 * @G_CHECKSUM_SHA384: Use the SHA-384 hashing algorithm (Since: 2.51)
 * @G_CHECKSUM_SHA512: Use the SHA-512 hashing algorithm (Since: 2.36)
 *
 * The hashing algorithm to be used by #GChecksum when performing the
 * digest of some data.
 *
 * Note that the #GChecksumType enumeration may be extended at a later
 * date to include new hashing algorithm types.
 *
 * Since: 2.16
 */
typedef enum {
  G_CHECKSUM_MD5,
  G_CHECKSUM_SHA1,
  G_CHECKSUM_SHA256,
  G_CHECKSUM_SHA512,
  G_CHECKSUM_SHA384
} GChecksumType;

/**
 * GChecksum:
 *
 * An opaque structure representing a checksumming operation.
 * To create a new GChecksum, use g_checksum_new(). To free
 * a GChecksum, use g_checksum_free().
 *
 * Since: 2.16
 */
typedef struct _GChecksum       GChecksum;

GLIB_AVAILABLE_IN_ALL
gssize                g_checksum_type_get_length    (GChecksumType    checksum_type);

GLIB_AVAILABLE_IN_ALL
GChecksum *           g_checksum_new                (GChecksumType    checksum_type);
GLIB_AVAILABLE_IN_ALL
void                  g_checksum_reset              (GChecksum       *checksum);
GLIB_AVAILABLE_IN_ALL
GChecksum *           g_checksum_copy               (const GChecksum *checksum);
GLIB_AVAILABLE_IN_ALL
void                  g_checksum_free               (GChecksum       *checksum);
GLIB_AVAILABLE_IN_ALL
void                  g_checksum_update             (GChecksum       *checksum,
                                                     const guchar    *data,
                                                     gssize           length);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_checksum_get_string         (GChecksum       *checksum);
GLIB_AVAILABLE_IN_ALL
void                  g_checksum_get_digest         (GChecksum       *checksum,
                                                     guint8          *buffer,
                                                     gsize           *digest_len);

GLIB_AVAILABLE_IN_ALL
gchar                *g_compute_checksum_for_data   (GChecksumType    checksum_type,
                                                     const guchar    *data,
                                                     gsize            length);
GLIB_AVAILABLE_IN_ALL
gchar                *g_compute_checksum_for_string (GChecksumType    checksum_type,
                                                     const gchar     *str,
                                                     gssize           length);

GLIB_AVAILABLE_IN_2_34
gchar                *g_compute_checksum_for_bytes  (GChecksumType    checksum_type,
                                                     GBytes          *data);

G_END_DECLS

#endif /* __G_CHECKSUM_H__ */
