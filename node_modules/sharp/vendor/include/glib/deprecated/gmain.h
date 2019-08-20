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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the GNU
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

#ifndef __G_DEPRECATED_MAIN_H__
#define __G_DEPRECATED_MAIN_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gmain.h>

G_BEGIN_DECLS

#ifndef G_DISABLE_DEPRECATED

/* ============== Compat main loop stuff ================== */

/**
 * g_main_new:
 * @is_running: set to %TRUE to indicate that the loop is running. This
 *     is not very important since calling g_main_run() will set this
 *     to %TRUE anyway.
 *
 * Creates a new #GMainLoop for th default main context.
 *
 * Returns: a new #GMainLoop
 *
 * Deprecated: 2.2: Use g_main_loop_new() instead
 */
#define         g_main_new(is_running)  g_main_loop_new (NULL, is_running)

/**
 * g_main_run:
 * @loop: a #GMainLoop
 *
 * Runs a main loop until it stops running.
 *
 * Deprecated: 2.2: Use g_main_loop_run() instead
 */
#define         g_main_run(loop)        g_main_loop_run(loop)

/**
 * g_main_quit:
 * @loop: a #GMainLoop
 *
 * Stops the #GMainLoop.
 * If g_main_run() was called to run the #GMainLoop, it will now return.
 *
 * Deprecated: 2.2: Use g_main_loop_quit() instead
 */
#define g_main_quit(loop)       g_main_loop_quit(loop)

/**
 * g_main_destroy:
 * @loop: a #GMainLoop
 *
 * Frees the memory allocated for the #GMainLoop.
 *
 * Deprecated: 2.2: Use g_main_loop_unref() instead
 */
#define g_main_destroy(loop)    g_main_loop_unref(loop)

/**
 * g_main_is_running:
 * @loop: a #GMainLoop
 *
 * Checks if the main loop is running.
 *
 * Returns: %TRUE if the main loop is running
 *
 * Deprecated: 2.2: Use g_main_loop_is_running() instead
 */
#define g_main_is_running(loop) g_main_loop_is_running(loop)

/**
 * g_main_iteration:
 * @may_block: set to %TRUE if it should block (i.e. wait) until an event
 *     source becomes ready. It will return after an event source has been
 *     processed. If set to %FALSE it will return immediately if no event
 *     source is ready to be processed.
 *
 * Runs a single iteration for the default #GMainContext.
 *
 * Returns: %TRUE if more events are pending.
 *
 * Deprecated: 2.2: Use g_main_context_iteration() instead.
 */
#define g_main_iteration(may_block) g_main_context_iteration (NULL, may_block)

/**
 * g_main_pending:
 *
 * Checks if any events are pending for the default #GMainContext
 * (i.e. ready to be processed).
 *
 * Returns: %TRUE if any events are pending.
 *
 * Deprected: 2.2: Use g_main_context_pending() instead.
 */
#define g_main_pending()            g_main_context_pending (NULL)

/**
 * g_main_set_poll_func:
 * @func: the function to call to poll all file descriptors
 *
 * Sets the function to use for the handle polling of file descriptors
 * for the default main context.
 *
 * Deprecated: 2.2: Use g_main_context_set_poll_func() again
 */
#define g_main_set_poll_func(func)  g_main_context_set_poll_func (NULL, func)

#endif

G_END_DECLS

#endif /* __G_DEPRECATED_MAIN_H__ */
