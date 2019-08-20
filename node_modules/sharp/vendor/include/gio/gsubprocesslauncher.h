/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2012,2013 Colin Walters <walters@verbum.org>
 * Copyright © 2012,2013 Canonical Limited
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
 * Author: Ryan Lortie <desrt@desrt.ca>
 * Author: Colin Walters <walters@verbum.org>
 */

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#ifndef __G_SUBPROCESS_LAUNCHER_H__
#define __G_SUBPROCESS_LAUNCHER_H__

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SUBPROCESS_LAUNCHER         (g_subprocess_launcher_get_type ())
#define G_SUBPROCESS_LAUNCHER(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_SUBPROCESS_LAUNCHER, GSubprocessLauncher))
#define G_IS_SUBPROCESS_LAUNCHER(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_SUBPROCESS_LAUNCHER))

GLIB_AVAILABLE_IN_2_40
GType                   g_subprocess_launcher_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_40
GSubprocessLauncher *   g_subprocess_launcher_new                       (GSubprocessFlags       flags);

GLIB_AVAILABLE_IN_2_40
GSubprocess *           g_subprocess_launcher_spawn                     (GSubprocessLauncher   *self,
                                                                         GError               **error,
                                                                         const gchar           *argv0,
                                                                         ...) G_GNUC_NULL_TERMINATED;

GLIB_AVAILABLE_IN_2_40
GSubprocess *           g_subprocess_launcher_spawnv                    (GSubprocessLauncher   *self,
                                                                         const gchar * const   *argv,
                                                                         GError               **error);

GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_environ               (GSubprocessLauncher   *self,
                                                                         gchar                **env);

GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_setenv                    (GSubprocessLauncher   *self,
                                                                         const gchar           *variable,
                                                                         const gchar           *value,
                                                                         gboolean               overwrite);

GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_unsetenv                  (GSubprocessLauncher *self,
                                                                         const gchar         *variable);

GLIB_AVAILABLE_IN_2_40
const gchar *           g_subprocess_launcher_getenv                    (GSubprocessLauncher   *self,
                                                                         const gchar           *variable);

GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_cwd                   (GSubprocessLauncher   *self,
                                                                         const gchar           *cwd);
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_flags                 (GSubprocessLauncher   *self,
                                                                         GSubprocessFlags       flags);

/* Extended I/O control, only available on UNIX */
#ifdef G_OS_UNIX
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_stdin_file_path       (GSubprocessLauncher   *self,
                                                                         const gchar           *path);
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_take_stdin_fd             (GSubprocessLauncher   *self,
                                                                         gint                   fd);
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_stdout_file_path      (GSubprocessLauncher   *self,
                                                                         const gchar           *path);
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_take_stdout_fd            (GSubprocessLauncher   *self,
                                                                         gint                   fd);
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_stderr_file_path      (GSubprocessLauncher   *self,
                                                                         const gchar           *path);
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_take_stderr_fd            (GSubprocessLauncher   *self,
                                                                         gint                   fd);

GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_take_fd                   (GSubprocessLauncher   *self,
                                                                         gint                   source_fd,
                                                                         gint                   target_fd);

/* Child setup, only available on UNIX */
GLIB_AVAILABLE_IN_2_40
void                    g_subprocess_launcher_set_child_setup           (GSubprocessLauncher   *self,
                                                                         GSpawnChildSetupFunc   child_setup,
                                                                         gpointer               user_data,
                                                                         GDestroyNotify         destroy_notify);
#endif

G_END_DECLS

#endif /* __G_SUBPROCESS_H__ */
