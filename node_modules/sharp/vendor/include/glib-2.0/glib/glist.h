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

#ifndef __G_LIST_H__
#define __G_LIST_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gmem.h>
#include <glib/gnode.h>

G_BEGIN_DECLS

typedef struct _GList GList;

struct _GList
{
  gpointer data;
  GList *next;
  GList *prev;
};

/* Doubly linked lists
 */
GLIB_AVAILABLE_IN_ALL
GList*   g_list_alloc                   (void) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
void     g_list_free                    (GList            *list);
GLIB_AVAILABLE_IN_ALL
void     g_list_free_1                  (GList            *list);
#define  g_list_free1                   g_list_free_1
GLIB_AVAILABLE_IN_ALL
void     g_list_free_full               (GList            *list,
					 GDestroyNotify    free_func);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_append                  (GList            *list,
					 gpointer          data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_prepend                 (GList            *list,
					 gpointer          data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_insert                  (GList            *list,
					 gpointer          data,
					 gint              position) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_insert_sorted           (GList            *list,
					 gpointer          data,
					 GCompareFunc      func) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_insert_sorted_with_data (GList            *list,
					 gpointer          data,
					 GCompareDataFunc  func,
					 gpointer          user_data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_insert_before           (GList            *list,
					 GList            *sibling,
					 gpointer          data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_concat                  (GList            *list1,
					 GList            *list2) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_remove                  (GList            *list,
					 gconstpointer     data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_remove_all              (GList            *list,
					 gconstpointer     data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_remove_link             (GList            *list,
					 GList            *llink) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_delete_link             (GList            *list,
					 GList            *link_) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_reverse                 (GList            *list) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_copy                    (GList            *list) G_GNUC_WARN_UNUSED_RESULT;

GLIB_AVAILABLE_IN_2_34
GList*   g_list_copy_deep               (GList            *list,
					 GCopyFunc         func,
					 gpointer          user_data) G_GNUC_WARN_UNUSED_RESULT;

GLIB_AVAILABLE_IN_ALL
GList*   g_list_nth                     (GList            *list,
					 guint             n);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_nth_prev                (GList            *list,
					 guint             n);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_find                    (GList            *list,
					 gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_find_custom             (GList            *list,
					 gconstpointer     data,
					 GCompareFunc      func);
GLIB_AVAILABLE_IN_ALL
gint     g_list_position                (GList            *list,
					 GList            *llink);
GLIB_AVAILABLE_IN_ALL
gint     g_list_index                   (GList            *list,
					 gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_last                    (GList            *list);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_first                   (GList            *list);
GLIB_AVAILABLE_IN_ALL
guint    g_list_length                  (GList            *list);
GLIB_AVAILABLE_IN_ALL
void     g_list_foreach                 (GList            *list,
					 GFunc             func,
					 gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
GList*   g_list_sort                    (GList            *list,
					 GCompareFunc      compare_func) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GList*   g_list_sort_with_data          (GList            *list,
					 GCompareDataFunc  compare_func,
					 gpointer          user_data)  G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
gpointer g_list_nth_data                (GList            *list,
					 guint             n);


#define g_list_previous(list)	        ((list) ? (((GList *)(list))->prev) : NULL)
#define g_list_next(list)	        ((list) ? (((GList *)(list))->next) : NULL)

G_END_DECLS

#endif /* __G_LIST_H__ */
