/* Pango
 * pango-item.h: Structure for storing run information
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

#ifndef __PANGO_ITEM_H__
#define __PANGO_ITEM_H__

#include <pango/pango-types.h>

G_BEGIN_DECLS

typedef struct _PangoAnalysis PangoAnalysis;
typedef struct _PangoItem PangoItem;

/**
 * PANGO_ANALYSIS_FLAG_CENTERED_BASELINE:
 *
 * Whether the segment should be shifted to center around the baseline.
 * Used in vertical writing directions mostly.
 *
 * Since: 1.16
 */
#define PANGO_ANALYSIS_FLAG_CENTERED_BASELINE (1 << 0)

/**
 * PANGO_ANALYSIS_FLAG_IS_ELLIPSIS:
 *
 * This flag is used to mark runs that hold ellipsized text,
 * in an ellipsized layout.
 *
 * Since: 1.36.7
 */
#define PANGO_ANALYSIS_FLAG_IS_ELLIPSIS (1 << 1)

/**
 * PangoAnalysis:
 * @shape_engine: the engine for doing rendering-system-dependent processing.
 * @lang_engine: the engine for doing rendering-system-independent processing.
 * @font: the font for this segment.
 * @level: the bidirectional level for this segment.
 * @gravity: the glyph orientation for this segment (A #PangoGravity).
 * @flags: boolean flags for this segment (currently only one) (Since: 1.16).
 * @script: the detected script for this segment (A #PangoScript) (Since: 1.18).
 * @language: the detected language for this segment.
 * @extra_attrs: extra attributes for this segment.
 *
 * The #PangoAnalysis structure stores information about
 * the properties of a segment of text.
 */
struct _PangoAnalysis
{
  PangoEngineShape *shape_engine;
  PangoEngineLang  *lang_engine;
  PangoFont *font;

  guint8 level;
  guint8 gravity; /* PangoGravity */
  guint8 flags;

  guint8 script; /* PangoScript */
  PangoLanguage *language;

  GSList *extra_attrs;
};

/**
 * PangoItem:
 * @offset: byte offset of the start of this item in text.
 * @length: length of this item in bytes.
 * @num_chars: number of Unicode characters in the item.
 * @analysis: analysis results for the item.
 *
 * The #PangoItem structure stores information about a segment of text.
 */
struct _PangoItem
{
  gint offset;
  gint length;
  gint num_chars;
  PangoAnalysis analysis;
};

#define PANGO_TYPE_ITEM (pango_item_get_type ())

PANGO_AVAILABLE_IN_ALL
GType pango_item_get_type (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_ALL
PangoItem *pango_item_new   (void);
PANGO_AVAILABLE_IN_ALL
PangoItem *pango_item_copy  (PangoItem  *item);
PANGO_AVAILABLE_IN_ALL
void       pango_item_free  (PangoItem  *item);
PANGO_AVAILABLE_IN_ALL
PangoItem *pango_item_split (PangoItem  *orig,
			     int         split_index,
			     int         split_offset);

G_END_DECLS

#endif /* __PANGO_ITEM_H__ */
