/* GLIB - Library of useful routines for C programming
 * Copyright (C) 1995-1997  Peter Mattis, Spencer Kimball and Josh MacDonald
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
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Modified by the GLib Team and others 1997-2000.  See the AUTHORS
 * file for a list of people on the GLib Team.  See the ChangeLog
 * files for a list of changes.  These files are distributed with
 * GLib at ftp://ftp.gtk.org/pub/gtk/.
 */

#ifndef __G_STRING_H__
#define __G_STRING_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>
#include <glib/gunicode.h>
#include <glib/gbytes.h>
#include <glib/gutils.h>  /* for G_CAN_INLINE */

G_BEGIN_DECLS

typedef struct _GString         GString;

struct _GString
{
  gchar  *str;
  gsize len;
  gsize allocated_len;
};

GLIB_AVAILABLE_IN_ALL
GString*     g_string_new               (const gchar     *init);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_new_len           (const gchar     *init,
                                         gssize           len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_sized_new         (gsize            dfl_size);
GLIB_AVAILABLE_IN_ALL
gchar*       g_string_free              (GString         *string,
                                         gboolean         free_segment);
GLIB_AVAILABLE_IN_2_34
GBytes*      g_string_free_to_bytes     (GString         *string);
GLIB_AVAILABLE_IN_ALL
gboolean     g_string_equal             (const GString   *v,
                                         const GString   *v2);
GLIB_AVAILABLE_IN_ALL
guint        g_string_hash              (const GString   *str);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_assign            (GString         *string,
                                         const gchar     *rval);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_truncate          (GString         *string,
                                         gsize            len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_set_size          (GString         *string,
                                         gsize            len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_insert_len        (GString         *string,
                                         gssize           pos,
                                         const gchar     *val,
                                         gssize           len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_append            (GString         *string,
                                         const gchar     *val);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_append_len        (GString         *string,
                                         const gchar     *val,
                                         gssize           len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_append_c          (GString         *string,
                                         gchar            c);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_append_unichar    (GString         *string,
                                         gunichar         wc);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_prepend           (GString         *string,
                                         const gchar     *val);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_prepend_c         (GString         *string,
                                         gchar            c);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_prepend_unichar   (GString         *string,
                                         gunichar         wc);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_prepend_len       (GString         *string,
                                         const gchar     *val,
                                         gssize           len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_insert            (GString         *string,
                                         gssize           pos,
                                         const gchar     *val);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_insert_c          (GString         *string,
                                         gssize           pos,
                                         gchar            c);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_insert_unichar    (GString         *string,
                                         gssize           pos,
                                         gunichar         wc);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_overwrite         (GString         *string,
                                         gsize            pos,
                                         const gchar     *val);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_overwrite_len     (GString         *string,
                                         gsize            pos,
                                         const gchar     *val,
                                         gssize           len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_erase             (GString         *string,
                                         gssize           pos,
                                         gssize           len);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_ascii_down        (GString         *string);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_ascii_up          (GString         *string);
GLIB_AVAILABLE_IN_ALL
void         g_string_vprintf           (GString         *string,
                                         const gchar     *format,
                                         va_list          args)
                                         G_GNUC_PRINTF(2, 0);
GLIB_AVAILABLE_IN_ALL
void         g_string_printf            (GString         *string,
                                         const gchar     *format,
                                         ...) G_GNUC_PRINTF (2, 3);
GLIB_AVAILABLE_IN_ALL
void         g_string_append_vprintf    (GString         *string,
                                         const gchar     *format,
                                         va_list          args)
                                         G_GNUC_PRINTF(2, 0);
GLIB_AVAILABLE_IN_ALL
void         g_string_append_printf     (GString         *string,
                                         const gchar     *format,
                                         ...) G_GNUC_PRINTF (2, 3);
GLIB_AVAILABLE_IN_ALL
GString*     g_string_append_uri_escaped (GString         *string,
                                          const gchar     *unescaped,
                                          const gchar     *reserved_chars_allowed,
                                          gboolean         allow_utf8);

/* -- optimize g_strig_append_c --- */
#ifdef G_CAN_INLINE
static inline GString*
g_string_append_c_inline (GString *gstring,
                          gchar    c)
{
  if (gstring->len + 1 < gstring->allocated_len)
    {
      gstring->str[gstring->len++] = c;
      gstring->str[gstring->len] = 0;
    }
  else
    g_string_insert_c (gstring, -1, c);
  return gstring;
}
#define g_string_append_c(gstr,c)       g_string_append_c_inline (gstr, c)
#endif /* G_CAN_INLINE */


GLIB_DEPRECATED
GString *g_string_down (GString *string);
GLIB_DEPRECATED
GString *g_string_up   (GString *string);

#ifndef G_DISABLE_DEPRECATED
#define  g_string_sprintf  g_string_printf
#define  g_string_sprintfa g_string_append_printf
#endif

G_END_DECLS

#endif /* __G_STRING_H__ */
