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

#ifndef __G_ASYNCQUEUE_H__
#define __G_ASYNCQUEUE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gthread.h>

G_BEGIN_DECLS

typedef struct _GAsyncQueue GAsyncQueue;

GLIB_AVAILABLE_IN_ALL
GAsyncQueue *g_async_queue_new                  (void);
GLIB_AVAILABLE_IN_ALL
GAsyncQueue *g_async_queue_new_full             (GDestroyNotify item_free_func);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_lock                 (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_unlock               (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
GAsyncQueue *g_async_queue_ref                  (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_unref                (GAsyncQueue      *queue);

GLIB_DEPRECATED_FOR(g_async_queue_ref)
void         g_async_queue_ref_unlocked         (GAsyncQueue      *queue);

GLIB_DEPRECATED_FOR(g_async_queue_unref)
void         g_async_queue_unref_and_unlock     (GAsyncQueue      *queue);

GLIB_AVAILABLE_IN_ALL
void         g_async_queue_push                 (GAsyncQueue      *queue,
                                                 gpointer          data);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_push_unlocked        (GAsyncQueue      *queue,
                                                 gpointer          data);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_push_sorted          (GAsyncQueue      *queue,
                                                 gpointer          data,
                                                 GCompareDataFunc  func,
                                                 gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_push_sorted_unlocked (GAsyncQueue      *queue,
                                                 gpointer          data,
                                                 GCompareDataFunc  func,
                                                 gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
gpointer     g_async_queue_pop                  (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
gpointer     g_async_queue_pop_unlocked         (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
gpointer     g_async_queue_try_pop              (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
gpointer     g_async_queue_try_pop_unlocked     (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
gpointer     g_async_queue_timeout_pop          (GAsyncQueue      *queue,
                                                 guint64           timeout);
GLIB_AVAILABLE_IN_ALL
gpointer     g_async_queue_timeout_pop_unlocked (GAsyncQueue      *queue,
                                                 guint64           timeout);
GLIB_AVAILABLE_IN_ALL
gint         g_async_queue_length               (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
gint         g_async_queue_length_unlocked      (GAsyncQueue      *queue);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_sort                 (GAsyncQueue      *queue,
                                                 GCompareDataFunc  func,
                                                 gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
void         g_async_queue_sort_unlocked        (GAsyncQueue      *queue,
                                                 GCompareDataFunc  func,
                                                 gpointer          user_data);

GLIB_AVAILABLE_IN_2_46
gboolean     g_async_queue_remove               (GAsyncQueue      *queue,
                                                 gpointer          item);
GLIB_AVAILABLE_IN_2_46
gboolean     g_async_queue_remove_unlocked      (GAsyncQueue      *queue,
                                                 gpointer          item);
GLIB_AVAILABLE_IN_2_46
void         g_async_queue_push_front           (GAsyncQueue      *queue,
                                                 gpointer          item);
GLIB_AVAILABLE_IN_2_46
void         g_async_queue_push_front_unlocked  (GAsyncQueue      *queue,
                                                 gpointer          item);

GLIB_DEPRECATED_FOR(g_async_queue_timeout_pop)
gpointer     g_async_queue_timed_pop            (GAsyncQueue      *queue,
                                                 GTimeVal         *end_time);
GLIB_DEPRECATED_FOR(g_async_queue_timeout_pop_unlocked)
gpointer     g_async_queue_timed_pop_unlocked   (GAsyncQueue      *queue,
                                                 GTimeVal         *end_time);

G_END_DECLS

#endif /* __G_ASYNCQUEUE_H__ */
