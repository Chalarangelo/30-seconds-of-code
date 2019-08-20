/* glib-unix.h - Unix specific integration
 * Copyright (C) 2011 Red Hat, Inc.
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

#ifndef __G_UNIX_H__
#define __G_UNIX_H__

/* We need to include the UNIX headers needed to use the APIs below,
 * but we also take this opportunity to include a wide selection of
 * other UNIX headers.  If one of the headers below is broken on some
 * system, work around it here (or better, fix the system or tell
 * people to use a better one).
 */
#include <unistd.h>
#include <errno.h>
#include <sys/wait.h>
#include <stdlib.h>
#include <fcntl.h>

#include <glib.h>

#ifndef G_OS_UNIX
#error "This header may only be used on UNIX"
#endif

G_BEGIN_DECLS

/**
 * G_UNIX_ERROR:
 *
 * Error domain for API in the g_unix_ namespace. Note that there is no
 * exported enumeration mapping %errno. Instead, all functions ensure that
 * %errno is relevant. The code for all #G_UNIX_ERROR is always 0, and the
 * error message is always generated via g_strerror().
 *
 * It is expected that most code will not look at %errno from these APIs.
 * Important cases where one would want to differentiate between errors are
 * already covered by existing cross-platform GLib API, such as e.g. #GFile
 * wrapping `ENOENT`. However, it is provided for completeness, at least.
 */
#define G_UNIX_ERROR (g_unix_error_quark())

GLIB_AVAILABLE_IN_2_30
GQuark g_unix_error_quark (void);

GLIB_AVAILABLE_IN_2_30
gboolean g_unix_open_pipe (gint    *fds,
                           gint     flags,
                           GError **error);

GLIB_AVAILABLE_IN_2_30
gboolean g_unix_set_fd_nonblocking (gint       fd,
                                    gboolean   nonblock,
                                    GError   **error);

GLIB_AVAILABLE_IN_2_30
GSource *g_unix_signal_source_new  (gint signum);

GLIB_AVAILABLE_IN_2_30
guint    g_unix_signal_add_full    (gint           priority,
                                    gint           signum,
                                    GSourceFunc    handler,
                                    gpointer       user_data,
                                    GDestroyNotify notify);

GLIB_AVAILABLE_IN_2_30
guint    g_unix_signal_add         (gint        signum,
                                    GSourceFunc handler,
                                    gpointer    user_data);

/**
 * GUnixFDSourceFunc:
 * @fd: the fd that triggered the event
 * @condition: the IO conditions reported on @fd
 * @user_data: user data passed to g_unix_fd_add()
 *
 * The type of functions to be called when a UNIX fd watch source
 * triggers.
 *
 * Returns: %FALSE if the source should be removed
 **/
typedef gboolean (*GUnixFDSourceFunc) (gint         fd,
                                       GIOCondition condition,
                                       gpointer     user_data);

GLIB_AVAILABLE_IN_2_36
GSource *g_unix_fd_source_new      (gint         fd,
                                    GIOCondition condition);

GLIB_AVAILABLE_IN_2_36
guint    g_unix_fd_add_full        (gint              priority,
                                    gint              fd,
                                    GIOCondition      condition,
                                    GUnixFDSourceFunc function,
                                    gpointer          user_data,
                                    GDestroyNotify    notify);

GLIB_AVAILABLE_IN_2_36
guint    g_unix_fd_add             (gint              fd,
                                    GIOCondition      condition,
                                    GUnixFDSourceFunc function,
                                    gpointer          user_data);

G_END_DECLS

#endif  /* __G_UNIX_H__ */
