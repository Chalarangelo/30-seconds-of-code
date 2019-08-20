/* grefstring.h: Reference counted strings
 *
 * Copyright 2018  Emmanuele Bassi
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

#pragma once

#include "gmem.h"
#include "gmacros.h"

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_2_58
char *  g_ref_string_new        (const char *str);
GLIB_AVAILABLE_IN_2_58
char *  g_ref_string_new_len    (const char *str,
                                 gssize      len);
GLIB_AVAILABLE_IN_2_58
char *  g_ref_string_new_intern (const char *str);

GLIB_AVAILABLE_IN_2_58
char *  g_ref_string_acquire    (char       *str);
GLIB_AVAILABLE_IN_2_58
void    g_ref_string_release    (char       *str);

GLIB_AVAILABLE_IN_2_58
gsize   g_ref_string_length     (char       *str);

/**
 * GRefString:
 *
 * A typedef for a reference-counted string. A pointer to a #GRefString can be
 * treated like a standard `char*` array by all code, but can additionally have
 * `g_ref_string_*()` methods called on it. `g_ref_string_*()` methods cannot be
 * called on `char*` arrays not allocated using g_ref_string_new().
 *
 * If using #GRefString with autocleanups, g_autoptr() must be used rather than
 * g_autofree(), so that the reference counting metadata is also freed.
 *
 * Since: 2.58
 */
typedef char GRefString;

G_END_DECLS
