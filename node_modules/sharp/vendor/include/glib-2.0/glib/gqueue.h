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

#ifndef __G_QUEUE_H__
#define __G_QUEUE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/glist.h>

G_BEGIN_DECLS

typedef struct _GQueue GQueue;

/**
 * GQueue:
 * @head: a pointer to the first element of the queue
 * @tail: a pointer to the last element of the queue
 * @length: the number of elements in the queue
 *
 * Contains the public fields of a
 * [Queue][glib-Double-ended-Queues].
 */
struct _GQueue
{
  GList *head;
  GList *tail;
  guint  length;
};

/**
 * G_QUEUE_INIT:
 *
 * A statically-allocated #GQueue must be initialized with this
 * macro before it can be used. This macro can be used to initialize
 * a variable, but it cannot be assigned to a variable. In that case
 * you have to use g_queue_init().
 *
 * |[
 * GQueue my_queue = G_QUEUE_INIT;
 * ]|
 *
 * Since: 2.14
 */
#define G_QUEUE_INIT { NULL, NULL, 0 }

/* Queues
 */
GLIB_AVAILABLE_IN_ALL
GQueue*  g_queue_new            (void);
GLIB_AVAILABLE_IN_ALL
void     g_queue_free           (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
void     g_queue_free_full      (GQueue           *queue,
				GDestroyNotify    free_func);
GLIB_AVAILABLE_IN_ALL
void     g_queue_init           (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
void     g_queue_clear          (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
gboolean g_queue_is_empty       (GQueue           *queue);
GLIB_AVAILABLE_IN_2_60
void     g_queue_clear_full     (GQueue           *queue,
                                 GDestroyNotify   free_func);
GLIB_AVAILABLE_IN_ALL
guint    g_queue_get_length     (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
void     g_queue_reverse        (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
GQueue * g_queue_copy           (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
void     g_queue_foreach        (GQueue           *queue,
                                 GFunc             func,
                                 gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
GList *  g_queue_find           (GQueue           *queue,
                                 gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
GList *  g_queue_find_custom    (GQueue           *queue,
                                 gconstpointer     data,
                                 GCompareFunc      func);
GLIB_AVAILABLE_IN_ALL
void     g_queue_sort           (GQueue           *queue,
                                 GCompareDataFunc  compare_func,
                                 gpointer          user_data);

GLIB_AVAILABLE_IN_ALL
void     g_queue_push_head      (GQueue           *queue,
                                 gpointer          data);
GLIB_AVAILABLE_IN_ALL
void     g_queue_push_tail      (GQueue           *queue,
                                 gpointer          data);
GLIB_AVAILABLE_IN_ALL
void     g_queue_push_nth       (GQueue           *queue,
                                 gpointer          data,
                                 gint              n);
GLIB_AVAILABLE_IN_ALL
gpointer g_queue_pop_head       (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
gpointer g_queue_pop_tail       (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
gpointer g_queue_pop_nth        (GQueue           *queue,
                                 guint             n);
GLIB_AVAILABLE_IN_ALL
gpointer g_queue_peek_head      (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
gpointer g_queue_peek_tail      (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
gpointer g_queue_peek_nth       (GQueue           *queue,
                                 guint             n);
GLIB_AVAILABLE_IN_ALL
gint     g_queue_index          (GQueue           *queue,
                                 gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
gboolean g_queue_remove         (GQueue           *queue,
                                 gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
guint    g_queue_remove_all     (GQueue           *queue,
                                 gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
void     g_queue_insert_before  (GQueue           *queue,
                                 GList            *sibling,
                                 gpointer          data);
GLIB_AVAILABLE_IN_ALL
void     g_queue_insert_after   (GQueue           *queue,
                                 GList            *sibling,
                                 gpointer          data);
GLIB_AVAILABLE_IN_ALL
void     g_queue_insert_sorted  (GQueue           *queue,
                                 gpointer          data,
                                 GCompareDataFunc  func,
                                 gpointer          user_data);

GLIB_AVAILABLE_IN_ALL
void     g_queue_push_head_link (GQueue           *queue,
                                 GList            *link_);
GLIB_AVAILABLE_IN_ALL
void     g_queue_push_tail_link (GQueue           *queue,
                                 GList            *link_);
GLIB_AVAILABLE_IN_ALL
void     g_queue_push_nth_link  (GQueue           *queue,
                                 gint              n,
                                 GList            *link_);
GLIB_AVAILABLE_IN_ALL
GList*   g_queue_pop_head_link  (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
GList*   g_queue_pop_tail_link  (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
GList*   g_queue_pop_nth_link   (GQueue           *queue,
                                 guint             n);
GLIB_AVAILABLE_IN_ALL
GList*   g_queue_peek_head_link (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
GList*   g_queue_peek_tail_link (GQueue           *queue);
GLIB_AVAILABLE_IN_ALL
GList*   g_queue_peek_nth_link  (GQueue           *queue,
                                 guint             n);
GLIB_AVAILABLE_IN_ALL
gint     g_queue_link_index     (GQueue           *queue,
                                 GList            *link_);
GLIB_AVAILABLE_IN_ALL
void     g_queue_unlink         (GQueue           *queue,
                                 GList            *link_);
GLIB_AVAILABLE_IN_ALL
void     g_queue_delete_link    (GQueue           *queue,
                                 GList            *link_);

G_END_DECLS

#endif /* __G_QUEUE_H__ */
