/* gshell.h - Shell-related utilities
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

#ifndef __G_SHELL_H__
#define __G_SHELL_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gerror.h>

G_BEGIN_DECLS

#define G_SHELL_ERROR g_shell_error_quark ()

typedef enum
{
  /* mismatched or otherwise mangled quoting */
  G_SHELL_ERROR_BAD_QUOTING,
  /* string to be parsed was empty */
  G_SHELL_ERROR_EMPTY_STRING,
  G_SHELL_ERROR_FAILED
} GShellError;

GLIB_AVAILABLE_IN_ALL
GQuark g_shell_error_quark (void);

GLIB_AVAILABLE_IN_ALL
gchar*   g_shell_quote      (const gchar   *unquoted_string);
GLIB_AVAILABLE_IN_ALL
gchar*   g_shell_unquote    (const gchar   *quoted_string,
                             GError       **error);
GLIB_AVAILABLE_IN_ALL
gboolean g_shell_parse_argv (const gchar   *command_line,
                             gint          *argcp,
                             gchar       ***argvp,
                             GError       **error);

G_END_DECLS

#endif /* __G_SHELL_H__ */
