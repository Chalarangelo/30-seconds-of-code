/* Pango
 * pango-glyph.h: Glyph storage
 *
 * Copyright (C) 2000 Red Hat Software
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

#ifndef __PANGO_GLYPH_H__
#define __PANGO_GLYPH_H__

#include <pango/pango-types.h>
#include <pango/pango-item.h>

G_BEGIN_DECLS

typedef struct _PangoGlyphGeometry PangoGlyphGeometry;
typedef struct _PangoGlyphVisAttr PangoGlyphVisAttr;
typedef struct _PangoGlyphInfo PangoGlyphInfo;
typedef struct _PangoGlyphString PangoGlyphString;

/* 1024ths of a device unit */
/**
 * PangoGlyphUnit:
 *
 * The #PangoGlyphUnit type is used to store dimensions within
 * Pango. Dimensions are stored in 1/%PANGO_SCALE of a device unit.
 * (A device unit might be a pixel for screen display, or
 * a point on a printer.) %PANGO_SCALE is currently 1024, and
 * may change in the future (unlikely though), but you should not
 * depend on its exact value. The PANGO_PIXELS() macro can be used
 * to convert from glyph units into device units with correct rounding.
 */
typedef gint32 PangoGlyphUnit;

/* Positioning information about a glyph
 */
/**
 * PangoGlyphGeometry:
 * @width: the logical width to use for the the character.
 * @x_offset: horizontal offset from nominal character position.
 * @y_offset: vertical offset from nominal character position.
 *
 * The #PangoGlyphGeometry structure contains width and positioning
 * information for a single glyph.
 */
struct _PangoGlyphGeometry
{
  PangoGlyphUnit width;
  PangoGlyphUnit x_offset;
  PangoGlyphUnit y_offset;
};

/* Visual attributes of a glyph
 */
/**
 * PangoGlyphVisAttr:
 * @is_cluster_start: set for the first logical glyph in each cluster. (Clusters
 * are stored in visual order, within the cluster, glyphs
 * are always ordered in logical order, since visual
 * order is meaningless; that is, in Arabic text, accent glyphs
 * follow the glyphs for the base character.)
 *
 * The PangoGlyphVisAttr is used to communicate information between
 * the shaping phase and the rendering phase.  More attributes may be
 * added in the future.
 */
struct _PangoGlyphVisAttr
{
  guint is_cluster_start : 1;
};

/* A single glyph
 */
/**
 * PangoGlyphInfo:
 * @glyph: the glyph itself.
 * @geometry: the positional information about the glyph.
 * @attr: the visual attributes of the glyph.
 *
 * The #PangoGlyphInfo structure represents a single glyph together with
 * positioning information and visual attributes.
 * It contains the following fields.
 */
struct _PangoGlyphInfo
{
  PangoGlyph    glyph;
  PangoGlyphGeometry geometry;
  PangoGlyphVisAttr  attr;
};

/* A string of glyphs with positional information and visual attributes -
 * ready for drawing
 */
/**
 * PangoGlyphString:
 * @num_glyphs: number of the glyphs in this glyph string.
 * @glyphs: (array length=num_glyphs): array of glyph information
 *          for the glyph string.
 * @log_clusters: logical cluster info, indexed by the byte index
 *                within the text corresponding to the glyph string.
 *
 * The #PangoGlyphString structure is used to store strings
 * of glyphs with geometry and visual attribute information.
 * The storage for the glyph information is owned
 * by the structure which simplifies memory management.
 */
struct _PangoGlyphString {
  gint num_glyphs;

  PangoGlyphInfo *glyphs;

  /* This is a memory inefficient way of representing the information
   * here - each value gives the byte index within the text
   * corresponding to the glyph string of the start of the cluster to
   * which the glyph belongs.
   */
  gint *log_clusters;

  /*< private >*/
  gint space;
};

/**
 * PANGO_TYPE_GLYPH_STRING:
 *
 * The #GObject type for #PangoGlyphString.
 */
#define PANGO_TYPE_GLYPH_STRING (pango_glyph_string_get_type ())

PANGO_AVAILABLE_IN_ALL
PangoGlyphString *pango_glyph_string_new      (void);
PANGO_AVAILABLE_IN_ALL
void              pango_glyph_string_set_size (PangoGlyphString *string,
					       gint              new_len);
PANGO_AVAILABLE_IN_ALL
GType             pango_glyph_string_get_type (void) G_GNUC_CONST;
PANGO_AVAILABLE_IN_ALL
PangoGlyphString *pango_glyph_string_copy     (PangoGlyphString *string);
PANGO_AVAILABLE_IN_ALL
void              pango_glyph_string_free     (PangoGlyphString *string);
PANGO_AVAILABLE_IN_ALL
void              pango_glyph_string_extents  (PangoGlyphString *glyphs,
					       PangoFont        *font,
					       PangoRectangle   *ink_rect,
					       PangoRectangle   *logical_rect);
PANGO_AVAILABLE_IN_1_14
int               pango_glyph_string_get_width(PangoGlyphString *glyphs);

PANGO_AVAILABLE_IN_ALL
void              pango_glyph_string_extents_range  (PangoGlyphString *glyphs,
						     int               start,
						     int               end,
						     PangoFont        *font,
						     PangoRectangle   *ink_rect,
						     PangoRectangle   *logical_rect);

PANGO_AVAILABLE_IN_ALL
void pango_glyph_string_get_logical_widths (PangoGlyphString *glyphs,
					    const char       *text,
					    int               length,
					    int               embedding_level,
					    int              *logical_widths);

PANGO_AVAILABLE_IN_ALL
void pango_glyph_string_index_to_x (PangoGlyphString *glyphs,
				    char             *text,
				    int               length,
				    PangoAnalysis    *analysis,
				    int               index_,
				    gboolean          trailing,
				    int              *x_pos);
PANGO_AVAILABLE_IN_ALL
void pango_glyph_string_x_to_index (PangoGlyphString *glyphs,
				    char             *text,
				    int               length,
				    PangoAnalysis    *analysis,
				    int               x_pos,
				    int              *index_,
				    int              *trailing);

/* Turn a string of characters into a string of glyphs
 */
PANGO_AVAILABLE_IN_ALL
void pango_shape (const gchar      *text,
		  gint              length,
		  const PangoAnalysis *analysis,
		  PangoGlyphString *glyphs);

PANGO_AVAILABLE_IN_1_32
void pango_shape_full (const gchar      *item_text,
		       gint              item_length,
		       const gchar      *paragraph_text,
		       gint              paragraph_length,
		       const PangoAnalysis *analysis,
		       PangoGlyphString *glyphs);

PANGO_AVAILABLE_IN_ALL
GList *pango_reorder_items (GList *logical_items);

G_END_DECLS

#endif /* __PANGO_GLYPH_H__ */
