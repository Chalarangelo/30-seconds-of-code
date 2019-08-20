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

#ifndef __G_ARRAY_H__
#define __G_ARRAY_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

typedef struct _GBytes          GBytes;
typedef struct _GArray		GArray;
typedef struct _GByteArray	GByteArray;
typedef struct _GPtrArray	GPtrArray;

struct _GArray
{
  gchar *data;
  guint len;
};

struct _GByteArray
{
  guint8 *data;
  guint	  len;
};

struct _GPtrArray
{
  gpointer *pdata;
  guint	    len;
};

/* Resizable arrays. remove fills any cleared spot and shortens the
 * array, while preserving the order. remove_fast will distort the
 * order by moving the last element to the position of the removed.
 */

#define g_array_append_val(a,v)	  g_array_append_vals (a, &(v), 1)
#define g_array_prepend_val(a,v)  g_array_prepend_vals (a, &(v), 1)
#define g_array_insert_val(a,i,v) g_array_insert_vals (a, i, &(v), 1)
#define g_array_index(a,t,i)      (((t*) (void *) (a)->data) [(i)])

GLIB_AVAILABLE_IN_ALL
GArray* g_array_new               (gboolean          zero_terminated,
				   gboolean          clear_,
				   guint             element_size);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_sized_new         (gboolean          zero_terminated,
				   gboolean          clear_,
				   guint             element_size,
				   guint             reserved_size);
GLIB_AVAILABLE_IN_ALL
gchar*  g_array_free              (GArray           *array,
				   gboolean          free_segment);
GLIB_AVAILABLE_IN_ALL
GArray *g_array_ref               (GArray           *array);
GLIB_AVAILABLE_IN_ALL
void    g_array_unref             (GArray           *array);
GLIB_AVAILABLE_IN_ALL
guint   g_array_get_element_size  (GArray           *array);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_append_vals       (GArray           *array,
				   gconstpointer     data,
				   guint             len);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_prepend_vals      (GArray           *array,
				   gconstpointer     data,
				   guint             len);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_insert_vals       (GArray           *array,
				   guint             index_,
				   gconstpointer     data,
				   guint             len);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_set_size          (GArray           *array,
				   guint             length);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_remove_index      (GArray           *array,
				   guint             index_);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_remove_index_fast (GArray           *array,
				   guint             index_);
GLIB_AVAILABLE_IN_ALL
GArray* g_array_remove_range      (GArray           *array,
				   guint             index_,
				   guint             length);
GLIB_AVAILABLE_IN_ALL
void    g_array_sort              (GArray           *array,
				   GCompareFunc      compare_func);
GLIB_AVAILABLE_IN_ALL
void    g_array_sort_with_data    (GArray           *array,
				   GCompareDataFunc  compare_func,
				   gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
void    g_array_set_clear_func    (GArray           *array,
                                   GDestroyNotify    clear_func);

/* Resizable pointer array.  This interface is much less complicated
 * than the above.  Add appends a pointer.  Remove fills any cleared 
 * spot and shortens the array. remove_fast will again distort order.  
 */
#define    g_ptr_array_index(array,index_) ((array)->pdata)[index_]
GLIB_AVAILABLE_IN_ALL
GPtrArray* g_ptr_array_new                (void);
GLIB_AVAILABLE_IN_ALL
GPtrArray* g_ptr_array_new_with_free_func (GDestroyNotify    element_free_func);
GLIB_AVAILABLE_IN_ALL
GPtrArray* g_ptr_array_sized_new          (guint             reserved_size);
GLIB_AVAILABLE_IN_ALL
GPtrArray* g_ptr_array_new_full           (guint             reserved_size,
					   GDestroyNotify    element_free_func);
GLIB_AVAILABLE_IN_ALL
gpointer*  g_ptr_array_free               (GPtrArray        *array,
					   gboolean          free_seg);
GLIB_AVAILABLE_IN_ALL
GPtrArray* g_ptr_array_ref                (GPtrArray        *array);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_unref              (GPtrArray        *array);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_set_free_func      (GPtrArray        *array,
                                           GDestroyNotify    element_free_func);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_set_size           (GPtrArray        *array,
					   gint              length);
GLIB_AVAILABLE_IN_ALL
gpointer   g_ptr_array_remove_index       (GPtrArray        *array,
					   guint             index_);
GLIB_AVAILABLE_IN_ALL
gpointer   g_ptr_array_remove_index_fast  (GPtrArray        *array,
					   guint             index_);
GLIB_AVAILABLE_IN_2_58
gpointer   g_ptr_array_steal_index        (GPtrArray        *array,
                                           guint             index_);
GLIB_AVAILABLE_IN_2_58
gpointer   g_ptr_array_steal_index_fast   (GPtrArray        *array,
                                           guint             index_);
GLIB_AVAILABLE_IN_ALL
gboolean   g_ptr_array_remove             (GPtrArray        *array,
					   gpointer          data);
GLIB_AVAILABLE_IN_ALL
gboolean   g_ptr_array_remove_fast        (GPtrArray        *array,
					   gpointer          data);
GLIB_AVAILABLE_IN_ALL
GPtrArray *g_ptr_array_remove_range       (GPtrArray        *array,
					   guint             index_,
					   guint             length);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_add                (GPtrArray        *array,
					   gpointer          data);
GLIB_AVAILABLE_IN_2_40
void       g_ptr_array_insert             (GPtrArray        *array,
                                           gint              index_,
                                           gpointer          data);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_sort               (GPtrArray        *array,
					   GCompareFunc      compare_func);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_sort_with_data     (GPtrArray        *array,
					   GCompareDataFunc  compare_func,
					   gpointer          user_data);
GLIB_AVAILABLE_IN_ALL
void       g_ptr_array_foreach            (GPtrArray        *array,
					   GFunc             func,
					   gpointer          user_data);
GLIB_AVAILABLE_IN_2_54
gboolean   g_ptr_array_find               (GPtrArray        *haystack,
                                           gconstpointer     needle,
                                           guint            *index_);
GLIB_AVAILABLE_IN_2_54
gboolean   g_ptr_array_find_with_equal_func (GPtrArray     *haystack,
                                             gconstpointer  needle,
                                             GEqualFunc     equal_func,
                                             guint         *index_);


/* Byte arrays, an array of guint8.  Implemented as a GArray,
 * but type-safe.
 */

GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_new               (void);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_new_take          (guint8           *data,
                                            gsize             len);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_sized_new         (guint             reserved_size);
GLIB_AVAILABLE_IN_ALL
guint8*     g_byte_array_free              (GByteArray       *array,
					    gboolean          free_segment);
GLIB_AVAILABLE_IN_ALL
GBytes*     g_byte_array_free_to_bytes     (GByteArray       *array);
GLIB_AVAILABLE_IN_ALL
GByteArray *g_byte_array_ref               (GByteArray       *array);
GLIB_AVAILABLE_IN_ALL
void        g_byte_array_unref             (GByteArray       *array);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_append            (GByteArray       *array,
					    const guint8     *data,
					    guint             len);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_prepend           (GByteArray       *array,
					    const guint8     *data,
					    guint             len);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_set_size          (GByteArray       *array,
					    guint             length);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_remove_index      (GByteArray       *array,
					    guint             index_);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_remove_index_fast (GByteArray       *array,
					    guint             index_);
GLIB_AVAILABLE_IN_ALL
GByteArray* g_byte_array_remove_range      (GByteArray       *array,
					    guint             index_,
					    guint             length);
GLIB_AVAILABLE_IN_ALL
void        g_byte_array_sort              (GByteArray       *array,
					    GCompareFunc      compare_func);
GLIB_AVAILABLE_IN_ALL
void        g_byte_array_sort_with_data    (GByteArray       *array,
					    GCompareDataFunc  compare_func,
					    gpointer          user_data);

G_END_DECLS

#endif /* __G_ARRAY_H__ */
