/* Pango
 * pango-glyph-item.h: Pair of PangoItem and a glyph string
 *
 * Copyright (C) 2002 Red Hat Software
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

#ifndef __PANGO_GLYPH_ITEM_H__
#define __PANGO_GLYPH_ITEM_H__

#include <pango/pango-attributes.h>
#include <pango/pango-break.h>
#include <pango/pango-item.h>
#include <pango/pango-glyph.h>

G_BEGIN_DECLS

/**
 * PangoGlyphItem:
 * @item: corresponding #PangoItem.
 * @glyphs: corresponding #PangoGlyphString.
 *
 * A #PangoGlyphItem is a pair of a #PangoItem and the glyphs
 * resulting from shaping the text corresponding to an item.
 * As an example of the usage of #PangoGlyphItem, the results
 * of shaping text with #PangoLayout is a list of #PangoLayoutLine,
 * each of which contains a list of #PangoGlyphItem.
 */
typedef struct _PangoGlyphItem PangoGlyphItem;

struct _PangoGlyphItem
{
  PangoItem        *item;
  PangoGlyphString *glyphs;
};

/**
 * PANGO_TYPE_GLYPH_ITEM:
 *
 * The #GObject type for #PangoGlyphItem.
 */
#define PANGO_TYPE_GLYPH_ITEM (pango_glyph_item_get_type ())

PANGO_AVAILABLE_IN_ALL
GType pango_glyph_item_get_type (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_1_2
PangoGlyphItem *pango_glyph_item_split        (PangoGlyphItem *orig,
					       const char     *text,
					       int             split_index);
PANGO_AVAILABLE_IN_1_20
PangoGlyphItem *pango_glyph_item_copy         (PangoGlyphItem *orig);
PANGO_AVAILABLE_IN_1_6
void            pango_glyph_item_free         (PangoGlyphItem *glyph_item);
PANGO_AVAILABLE_IN_1_2
GSList *        pango_glyph_item_apply_attrs  (PangoGlyphItem *glyph_item,
					       const char     *text,
					       PangoAttrList  *list);
PANGO_AVAILABLE_IN_1_6
void            pango_glyph_item_letter_space (PangoGlyphItem *glyph_item,
					       const char     *text,
					       PangoLogAttr   *log_attrs,
					       int             letter_spacing);
PANGO_AVAILABLE_IN_1_26
void 	  pango_glyph_item_get_logical_widths (PangoGlyphItem *glyph_item,
					       const char     *text,
					       int            *logical_widths);


/**
 * PangoGlyphItemIter:
 *
 * A #PangoGlyphItemIter is an iterator over the clusters in a
 * #PangoGlyphItem.  The <firstterm>forward direction</firstterm> of the
 * iterator is the logical direction of text.  That is, with increasing
 * @start_index and @start_char values.  If @glyph_item is right-to-left
 * (that is, if <literal>@glyph_item->item->analysis.level</literal> is odd),
 * then @start_glyph decreases as the iterator moves forward.  Moreover,
 * in right-to-left cases, @start_glyph is greater than @end_glyph.
 *
 * An iterator should be initialized using either of
 * pango_glyph_item_iter_init_start() and
 * pango_glyph_item_iter_init_end(), for forward and backward iteration
 * respectively, and walked over using any desired mixture of
 * pango_glyph_item_iter_next_cluster() and
 * pango_glyph_item_iter_prev_cluster().  A common idiom for doing a
 * forward iteration over the clusters is:
 * <programlisting>
 * PangoGlyphItemIter cluster_iter;
 * gboolean have_cluster;
 *
 * for (have_cluster = pango_glyph_item_iter_init_start (&amp;cluster_iter,
 *                                                       glyph_item, text);
 *      have_cluster;
 *      have_cluster = pango_glyph_item_iter_next_cluster (&amp;cluster_iter))
 * {
 *   ...
 * }
 * </programlisting>
 *
 * Note that @text is the start of the text for layout, which is then
 * indexed by <literal>@glyph_item->item->offset</literal> to get to the
 * text of @glyph_item.  The @start_index and @end_index values can directly
 * index into @text.  The @start_glyph, @end_glyph, @start_char, and @end_char
 * values however are zero-based for the @glyph_item.  For each cluster, the
 * item pointed at by the start variables is included in the cluster while
 * the one pointed at by end variables is not.
 *
 * None of the members of a #PangoGlyphItemIter should be modified manually.
 *
 * Since: 1.22
 */
typedef struct _PangoGlyphItemIter PangoGlyphItemIter;

struct _PangoGlyphItemIter
{
  PangoGlyphItem *glyph_item;
  const gchar *text;

  int start_glyph;
  int start_index;
  int start_char;

  int end_glyph;
  int end_index;
  int end_char;
};

/**
 * PANGO_TYPE_GLYPH_ITEM_ITER:
 *
 * The #GObject type for #PangoGlyphItemIter.
 *
 * Since: 1.22
 */
#define PANGO_TYPE_GLYPH_ITEM_ITER (pango_glyph_item_iter_get_type ())

PANGO_AVAILABLE_IN_1_22
GType               pango_glyph_item_iter_get_type (void) G_GNUC_CONST;
PANGO_AVAILABLE_IN_1_22
PangoGlyphItemIter *pango_glyph_item_iter_copy (PangoGlyphItemIter *orig);
PANGO_AVAILABLE_IN_1_22
void                pango_glyph_item_iter_free (PangoGlyphItemIter *iter);

PANGO_AVAILABLE_IN_1_22
gboolean pango_glyph_item_iter_init_start   (PangoGlyphItemIter *iter,
					     PangoGlyphItem     *glyph_item,
					     const char         *text);
PANGO_AVAILABLE_IN_1_22
gboolean pango_glyph_item_iter_init_end     (PangoGlyphItemIter *iter,
					     PangoGlyphItem     *glyph_item,
					     const char         *text);
PANGO_AVAILABLE_IN_1_22
gboolean pango_glyph_item_iter_next_cluster (PangoGlyphItemIter *iter);
PANGO_AVAILABLE_IN_1_22
gboolean pango_glyph_item_iter_prev_cluster (PangoGlyphItemIter *iter);

G_END_DECLS

#endif /* __PANGO_GLYPH_ITEM_H__ */
