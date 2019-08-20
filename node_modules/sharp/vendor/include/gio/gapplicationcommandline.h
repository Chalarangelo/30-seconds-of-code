/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2010 Codethink Limited
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
 * Authors: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_APPLICATION_COMMAND_LINE_H__
#define __G_APPLICATION_COMMAND_LINE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_APPLICATION_COMMAND_LINE                     (g_application_command_line_get_type ())
#define G_APPLICATION_COMMAND_LINE(inst)                    (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_APPLICATION_COMMAND_LINE,                        \
                                                             GApplicationCommandLine))
#define G_APPLICATION_COMMAND_LINE_CLASS(class)             (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_APPLICATION_COMMAND_LINE,                        \
                                                             GApplicationCommandLineClass))
#define G_IS_APPLICATION_COMMAND_LINE(inst)                 (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_APPLICATION_COMMAND_LINE))
#define G_IS_APPLICATION_COMMAND_LINE_CLASS(class)          (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_APPLICATION_COMMAND_LINE))
#define G_APPLICATION_COMMAND_LINE_GET_CLASS(inst)          (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_APPLICATION_COMMAND_LINE,                        \
                                                             GApplicationCommandLineClass))

typedef struct _GApplicationCommandLinePrivate               GApplicationCommandLinePrivate;
typedef struct _GApplicationCommandLineClass                 GApplicationCommandLineClass;

struct _GApplicationCommandLine
{
  /*< private >*/
  GObject parent_instance;

  GApplicationCommandLinePrivate *priv;
};

struct _GApplicationCommandLineClass
{
  /*< private >*/
  GObjectClass parent_class;

  void                  (* print_literal)       (GApplicationCommandLine *cmdline,
                                                 const gchar             *message);
  void                  (* printerr_literal)    (GApplicationCommandLine *cmdline,
                                                 const gchar             *message);
  GInputStream *        (* get_stdin)           (GApplicationCommandLine *cmdline);

  gpointer padding[11];
};

GLIB_AVAILABLE_IN_ALL
GType                   g_application_command_line_get_type             (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
gchar **                g_application_command_line_get_arguments        (GApplicationCommandLine   *cmdline,
                                                                         int                       *argc);

GLIB_AVAILABLE_IN_2_40
GVariantDict *          g_application_command_line_get_options_dict     (GApplicationCommandLine   *cmdline);

GLIB_AVAILABLE_IN_2_36
GInputStream *          g_application_command_line_get_stdin            (GApplicationCommandLine   *cmdline);

GLIB_AVAILABLE_IN_ALL
const gchar * const *   g_application_command_line_get_environ          (GApplicationCommandLine   *cmdline);

GLIB_AVAILABLE_IN_ALL
const gchar *           g_application_command_line_getenv               (GApplicationCommandLine   *cmdline,
                                                                         const gchar               *name);

GLIB_AVAILABLE_IN_ALL
const gchar *           g_application_command_line_get_cwd              (GApplicationCommandLine   *cmdline);

GLIB_AVAILABLE_IN_ALL
gboolean                g_application_command_line_get_is_remote        (GApplicationCommandLine   *cmdline);

GLIB_AVAILABLE_IN_ALL
void                    g_application_command_line_print                (GApplicationCommandLine   *cmdline,
                                                                         const gchar               *format,
                                                                         ...) G_GNUC_PRINTF(2, 3);
GLIB_AVAILABLE_IN_ALL
void                    g_application_command_line_printerr             (GApplicationCommandLine   *cmdline,
                                                                         const gchar               *format,
                                                                         ...) G_GNUC_PRINTF(2, 3);

GLIB_AVAILABLE_IN_ALL
int                     g_application_command_line_get_exit_status      (GApplicationCommandLine   *cmdline);
GLIB_AVAILABLE_IN_ALL
void                    g_application_command_line_set_exit_status      (GApplicationCommandLine   *cmdline,
                                                                         int                        exit_status);

GLIB_AVAILABLE_IN_ALL
GVariant *              g_application_command_line_get_platform_data    (GApplicationCommandLine   *cmdline);

GLIB_AVAILABLE_IN_2_36
GFile *                 g_application_command_line_create_file_for_arg  (GApplicationCommandLine   *cmdline,
                                                                         const gchar               *arg);

G_END_DECLS

#endif /* __G_APPLICATION_COMMAND_LINE_H__ */
