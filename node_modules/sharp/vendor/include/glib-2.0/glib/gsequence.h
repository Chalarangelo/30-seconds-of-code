/* GLIB - Library of useful routines for C programming
 * Copyright (C) 2002, 2003, 2004, 2005, 2006, 2007
 * Soeren Sandmann (sandmann@daimi.au.dk)
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

#ifndef __G_SEQUENCE_H__
#define __G_SEQUENCE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

typedef struct _GSequence      GSequence;
typedef struct _GSequenceNode  GSequenceIter;

typedef gint (* GSequenceIterCompareFunc) (GSequenceIter *a,
                                           GSequenceIter *b,
                                           gpointer       data);


/* GSequence */
GLIB_AVAILABLE_IN_ALL
GSequence *    g_sequence_new                (GDestroyNotify            data_destroy);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_free               (GSequence                *seq);
GLIB_AVAILABLE_IN_ALL
gint           g_sequence_get_length         (GSequence                *seq);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_foreach            (GSequence                *seq,
                                              GFunc                     func,
                                              gpointer                  user_data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_foreach_range      (GSequenceIter            *begin,
                                              GSequenceIter            *end,
                                              GFunc                     func,
                                              gpointer                  user_data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_sort               (GSequence                *seq,
                                              GCompareDataFunc          cmp_func,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_sort_iter          (GSequence                *seq,
                                              GSequenceIterCompareFunc  cmp_func,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_2_48
gboolean       g_sequence_is_empty           (GSequence                *seq);


/* Getting iters */
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_get_begin_iter     (GSequence                *seq);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_get_end_iter       (GSequence                *seq);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_get_iter_at_pos    (GSequence                *seq,
                                              gint                      pos);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_append             (GSequence                *seq,
                                              gpointer                  data);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_prepend            (GSequence                *seq,
                                              gpointer                  data);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_insert_before      (GSequenceIter            *iter,
                                              gpointer                  data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_move               (GSequenceIter            *src,
                                              GSequenceIter            *dest);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_swap               (GSequenceIter            *a,
                                              GSequenceIter            *b);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_insert_sorted      (GSequence                *seq,
                                              gpointer                  data,
                                              GCompareDataFunc          cmp_func,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_insert_sorted_iter (GSequence                *seq,
                                              gpointer                  data,
                                              GSequenceIterCompareFunc  iter_cmp,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_sort_changed       (GSequenceIter            *iter,
                                              GCompareDataFunc          cmp_func,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_sort_changed_iter  (GSequenceIter            *iter,
                                              GSequenceIterCompareFunc  iter_cmp,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_remove             (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_remove_range       (GSequenceIter            *begin,
                                              GSequenceIter            *end);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_move_range         (GSequenceIter            *dest,
                                              GSequenceIter            *begin,
                                              GSequenceIter            *end);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_search             (GSequence                *seq,
                                              gpointer                  data,
                                              GCompareDataFunc          cmp_func,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_search_iter        (GSequence                *seq,
                                              gpointer                  data,
                                              GSequenceIterCompareFunc  iter_cmp,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_lookup             (GSequence                *seq,
                                              gpointer                  data,
                                              GCompareDataFunc          cmp_func,
                                              gpointer                  cmp_data);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_lookup_iter        (GSequence                *seq,
                                              gpointer                  data,
                                              GSequenceIterCompareFunc  iter_cmp,
                                              gpointer                  cmp_data);


/* Dereferencing */
GLIB_AVAILABLE_IN_ALL
gpointer       g_sequence_get                (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
void           g_sequence_set                (GSequenceIter            *iter,
                                              gpointer                  data);

/* Operations on GSequenceIter * */
GLIB_AVAILABLE_IN_ALL
gboolean       g_sequence_iter_is_begin      (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
gboolean       g_sequence_iter_is_end        (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_iter_next          (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_iter_prev          (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
gint           g_sequence_iter_get_position  (GSequenceIter            *iter);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_iter_move          (GSequenceIter            *iter,
                                              gint                      delta);
GLIB_AVAILABLE_IN_ALL
GSequence *    g_sequence_iter_get_sequence  (GSequenceIter            *iter);


/* Search */
GLIB_AVAILABLE_IN_ALL
gint           g_sequence_iter_compare       (GSequenceIter            *a,
                                              GSequenceIter            *b);
GLIB_AVAILABLE_IN_ALL
GSequenceIter *g_sequence_range_get_midpoint (GSequenceIter            *begin,
                                              GSequenceIter            *end);

G_END_DECLS

#endif /* __G_SEQUENCE_H__ */
