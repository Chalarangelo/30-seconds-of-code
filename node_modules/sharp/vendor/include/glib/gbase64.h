/* gbase64.h - Base64 coding functions
 *
 *  Copyright (C) 2005  Alexander Larsson <alexl@redhat.com>
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

#ifndef __G_BASE64_H__
#define __G_BASE64_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_ALL
gsize   g_base64_encode_step    (const guchar *in,
                                 gsize         len,
                                 gboolean      break_lines,
                                 gchar        *out,
                                 gint         *state,
                                 gint         *save);
GLIB_AVAILABLE_IN_ALL
gsize   g_base64_encode_close   (gboolean      break_lines,
                                 gchar        *out,
                                 gint         *state,
                                 gint         *save);
GLIB_AVAILABLE_IN_ALL
gchar*  g_base64_encode         (const guchar *data,
                                 gsize         len) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
gsize   g_base64_decode_step    (const gchar  *in,
                                 gsize         len,
                                 guchar       *out,
                                 gint         *state,
                                 guint        *save);
GLIB_AVAILABLE_IN_ALL
guchar *g_base64_decode         (const gchar  *text,
                                 gsize        *out_len) G_GNUC_MALLOC;
GLIB_AVAILABLE_IN_ALL
guchar *g_base64_decode_inplace (gchar        *text,
                                 gsize        *out_len);


G_END_DECLS

#endif /* __G_BASE64_H__ */
