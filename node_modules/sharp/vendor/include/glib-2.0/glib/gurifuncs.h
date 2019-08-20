/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_URI_FUNCS_H__
#define __G_URI_FUNCS_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

/**
 * G_URI_RESERVED_CHARS_GENERIC_DELIMITERS:
 * 
 * Generic delimiters characters as defined in RFC 3986. Includes ":/?#[]@".
 **/
#define G_URI_RESERVED_CHARS_GENERIC_DELIMITERS ":/?#[]@"

/**
 * G_URI_RESERVED_CHARS_SUBCOMPONENT_DELIMITERS:
 * 
 * Subcomponent delimiter characters as defined in RFC 3986. Includes "!$&'()*+,;=".
 **/
#define G_URI_RESERVED_CHARS_SUBCOMPONENT_DELIMITERS "!$&'()*+,;="

/**
 * G_URI_RESERVED_CHARS_ALLOWED_IN_PATH_ELEMENT:
 * 
 * Allowed characters in path elements. Includes "!$&'()*+,;=:@".
 **/
#define G_URI_RESERVED_CHARS_ALLOWED_IN_PATH_ELEMENT G_URI_RESERVED_CHARS_SUBCOMPONENT_DELIMITERS ":@"

/**
 * G_URI_RESERVED_CHARS_ALLOWED_IN_PATH:
 * 
 * Allowed characters in a path. Includes "!$&'()*+,;=:@/".
 **/
#define G_URI_RESERVED_CHARS_ALLOWED_IN_PATH G_URI_RESERVED_CHARS_ALLOWED_IN_PATH_ELEMENT "/"

/**
 * G_URI_RESERVED_CHARS_ALLOWED_IN_USERINFO:
 * 
 * Allowed characters in userinfo as defined in RFC 3986. Includes "!$&'()*+,;=:".
 **/
#define G_URI_RESERVED_CHARS_ALLOWED_IN_USERINFO G_URI_RESERVED_CHARS_SUBCOMPONENT_DELIMITERS ":"

GLIB_AVAILABLE_IN_ALL
char *   g_uri_unescape_string       (const char *escaped_string,
				      const char *illegal_characters);
GLIB_AVAILABLE_IN_ALL
char *   g_uri_unescape_segment      (const char *escaped_string,
				      const char *escaped_string_end,
				      const char *illegal_characters);
GLIB_AVAILABLE_IN_ALL
char *   g_uri_parse_scheme          (const char *uri);
GLIB_AVAILABLE_IN_ALL
char *   g_uri_escape_string         (const char *unescaped,
				      const char *reserved_chars_allowed,
				      gboolean    allow_utf8);

G_END_DECLS

#endif /* __G_URI_FUNCS_H__ */
