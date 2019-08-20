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

#ifndef __G_THREADPOOL_H__
#define __G_THREADPOOL_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gthread.h>

G_BEGIN_DECLS

typedef struct _GThreadPool GThreadPool;

/* Thread Pools
 */

struct _GThreadPool
{
  GFunc func;
  gpointer user_data;
  gboolean exclusive;
};

GLIB_AVAILABLE_IN_ALL
GThreadPool *   g_thread_pool_new               (GFunc            func,
                                                 gpointer         user_data,
                                                 gint             max_threads,
                                                 gboolean         exclusive,
                                                 GError         **error);
GLIB_AVAILABLE_IN_ALL
void            g_thread_pool_free              (GThreadPool     *pool,
                                                 gboolean         immediate,
                                                 gboolean         wait_);
GLIB_AVAILABLE_IN_ALL
gboolean        g_thread_pool_push              (GThreadPool     *pool,
                                                 gpointer         data,
                                                 GError         **error);
GLIB_AVAILABLE_IN_ALL
guint           g_thread_pool_unprocessed       (GThreadPool     *pool);
GLIB_AVAILABLE_IN_ALL
void            g_thread_pool_set_sort_function (GThreadPool      *pool,
                                                 GCompareDataFunc  func,
                                                 gpointer          user_data);
GLIB_AVAILABLE_IN_2_46
gboolean        g_thread_pool_move_to_front     (GThreadPool      *pool,
                                                 gpointer          data);

GLIB_AVAILABLE_IN_ALL
gboolean        g_thread_pool_set_max_threads   (GThreadPool     *pool,
                                                 gint             max_threads,
                                                 GError         **error);
GLIB_AVAILABLE_IN_ALL
gint            g_thread_pool_get_max_threads   (GThreadPool     *pool);
GLIB_AVAILABLE_IN_ALL
guint           g_thread_pool_get_num_threads   (GThreadPool     *pool);

GLIB_AVAILABLE_IN_ALL
void            g_thread_pool_set_max_unused_threads (gint  max_threads);
GLIB_AVAILABLE_IN_ALL
gint            g_thread_pool_get_max_unused_threads (void);
GLIB_AVAILABLE_IN_ALL
guint           g_thread_pool_get_num_unused_threads (void);
GLIB_AVAILABLE_IN_ALL
void            g_thread_pool_stop_unused_threads    (void);
GLIB_AVAILABLE_IN_ALL
void            g_thread_pool_set_max_idle_time      (guint interval);
GLIB_AVAILABLE_IN_ALL
guint           g_thread_pool_get_max_idle_time      (void);

G_END_DECLS

#endif /* __G_THREADPOOL_H__ */
