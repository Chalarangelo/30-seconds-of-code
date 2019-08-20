/* gerror.h - Error reporting system
 *
 *  Copyright 2000 Red Hat, Inc.
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

#ifndef __G_ERROR_H__
#define __G_ERROR_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <stdarg.h>

#include <glib/gquark.h>

G_BEGIN_DECLS

/**
 * GError:
 * @domain: error domain, e.g. #G_FILE_ERROR
 * @code: error code, e.g. %G_FILE_ERROR_NOENT
 * @message: human-readable informative error message
 *
 * The `GError` structure contains information about
 * an error that has occurred.
 */
typedef struct _GError GError;

struct _GError
{
  GQuark       domain;
  gint         code;
  gchar       *message;
};

GLIB_AVAILABLE_IN_ALL
GError*  g_error_new           (GQuark         domain,
                                gint           code,
                                const gchar   *format,
                                ...) G_GNUC_PRINTF (3, 4);

GLIB_AVAILABLE_IN_ALL
GError*  g_error_new_literal   (GQuark         domain,
                                gint           code,
                                const gchar   *message);
GLIB_AVAILABLE_IN_ALL
GError*  g_error_new_valist    (GQuark         domain,
                                gint           code,
                                const gchar   *format,
                                va_list        args) G_GNUC_PRINTF(3, 0);

GLIB_AVAILABLE_IN_ALL
void     g_error_free          (GError        *error);
GLIB_AVAILABLE_IN_ALL
GError*  g_error_copy          (const GError  *error);

GLIB_AVAILABLE_IN_ALL
gboolean g_error_matches       (const GError  *error,
                                GQuark         domain,
                                gint           code);

/* if (err) *err = g_error_new(domain, code, format, ...), also has
 * some sanity checks.
 */
GLIB_AVAILABLE_IN_ALL
void     g_set_error           (GError       **err,
                                GQuark         domain,
                                gint           code,
                                const gchar   *format,
                                ...) G_GNUC_PRINTF (4, 5);

GLIB_AVAILABLE_IN_ALL
void     g_set_error_literal   (GError       **err,
                                GQuark         domain,
                                gint           code,
                                const gchar   *message);

/* if (dest) *dest = src; also has some sanity checks.
 */
GLIB_AVAILABLE_IN_ALL
void     g_propagate_error     (GError       **dest,
				GError        *src);

/* if (err && *err) { g_error_free(*err); *err = NULL; } */
GLIB_AVAILABLE_IN_ALL
void     g_clear_error         (GError       **err);

/* if (err) prefix the formatted string to the ->message */
GLIB_AVAILABLE_IN_ALL
void     g_prefix_error               (GError       **err,
                                       const gchar   *format,
                                       ...) G_GNUC_PRINTF (2, 3);

/* g_propagate_error then g_error_prefix on dest */
GLIB_AVAILABLE_IN_ALL
void     g_propagate_prefixed_error   (GError       **dest,
                                       GError        *src,
                                       const gchar   *format,
                                       ...) G_GNUC_PRINTF (3, 4);

G_END_DECLS

#endif /* __G_ERROR_H__ */
