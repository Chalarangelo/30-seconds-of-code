/* GLIB - Library of useful routines for C programming
 * Copyright (C) 2008 Red Hat, Inc.
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

#ifndef __G_HOST_UTILS_H__
#define __G_HOST_UTILS_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_ALL
gboolean  g_hostname_is_non_ascii     (const gchar *hostname);
GLIB_AVAILABLE_IN_ALL
gboolean  g_hostname_is_ascii_encoded (const gchar *hostname);
GLIB_AVAILABLE_IN_ALL
gboolean  g_hostname_is_ip_address    (const gchar *hostname);

GLIB_AVAILABLE_IN_ALL
gchar    *g_hostname_to_ascii         (const gchar *hostname);
GLIB_AVAILABLE_IN_ALL
gchar    *g_hostname_to_unicode       (const gchar *hostname);

G_END_DECLS

#endif /* __G_HOST_UTILS_H__ */
