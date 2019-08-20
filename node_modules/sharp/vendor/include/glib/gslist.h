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

#ifndef __G_SLIST_H__
#define __G_SLIST_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gmem.h>
#include <glib/gnode.h>

G_BEGIN_DECLS

typedef struct _GSList GSList;

struct _GSList
{
  gpointer data;
  GSList *next;
};

/* Singly linked lists
 */
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_alloc                   (void) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
void     g_slist_free                    (GSList           *list);
GLIB_AVAILABLE_IN_ALL
void     g_slist_free_1                  (GSList           *list);
#define	 g_slist_free1		         g_slist_free_1
GLIB_AVAILABLE_IN_ALL
void     g_slist_free_full               (GSList           *list,
					  GDestroyNotify    free_func);
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_append                  (GSList           *list,
					  gpointer          data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_prepend                 (GSList           *list,
					  gpointer          data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_insert                  (GSList           *list,
					  gpointer          data,
					  gint              position) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_insert_sorted           (GSList           *list,
					  gpointer          data,
					  GCompareFunc      func) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_insert_sorted_with_data (GSList           *list,
					  gpointer          data,
					  GCompareDataFunc  func,
					  gpointer          user_data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_insert_before           (GSList           *slist,
					  GSList           *sibling,
					  gpointer          data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_concat                  (GSList           *list1,
					  GSList           *list2) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_remove                  (GSList           *list,
					  gconstpointer     data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_remove_all              (GSList           *list,
					  gconstpointer     data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_remove_link             (GSList           *list,
					  GSList           *link_) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_delete_link             (GSList           *list,
					  GSList           *link_) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_reverse                 (GSList           *list) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_copy                    (GSList           *list) G_GNUC_WARN_UNUSED_RESULT;

GLIB_AVAILABLE_IN_2_34
GSList*  g_slist_copy_deep               (GSList            *list,
					  GCopyFunc         func,
					  gpointer          user_data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_nth                     (GSList           *list,
					  guint             n);
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_find                    (GSList           *list,
					  gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_find_custom             (GSList           *list,
					  gconstpointer     data,
					  GCompareFunc      func);
GLIB_AVAILABLE_IN_ALL
gint     g_slist_position                (GSList           *list,
					  GSList           *llink);
GLIB_AVAILABLE_IN_ALL
gint     g_slist_index                   (GSList           *list,
					  gconstpointer     data);
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_last                    (GSList           *list);
GLIB_AVAILABLE_IN_ALL
guint    g_slist_length                  (GSList           *list);
GLIB_AVAILABLE_IN_ALL
void     g_slist_foreach                 (GSList           *list,
					  GFunc             func,
					  gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_sort                    (GSList           *list,
					  GCompareFunc      compare_func) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
GSList*  g_slist_sort_with_data          (GSList           *list,
					  GCompareDataFunc  compare_func,
					  gpointer          user_data) G_GNUC_WARN_UNUSED_RESULT;
GLIB_AVAILABLE_IN_ALL
gpointer g_slist_nth_data                (GSList           *list,
					  guint             n);

#define  g_slist_next(slist)	         ((slist) ? (((GSList *)(slist))->next) : NULL)

G_END_DECLS

#endif /* __G_SLIST_H__ */
