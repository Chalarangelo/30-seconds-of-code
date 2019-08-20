/* Pango
 * pango-types.h:
 *
 * Copyright (C) 1999 Red Hat Software
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

#ifndef __PANGO_TYPES_H__
#define __PANGO_TYPES_H__

#include <glib.h>
#include <glib-object.h>

#include <pango/pango-version-macros.h>

G_BEGIN_DECLS

typedef struct _PangoLogAttr PangoLogAttr;

typedef struct _PangoEngineLang PangoEngineLang;
typedef struct _PangoEngineShape PangoEngineShape;

typedef struct _PangoFont    PangoFont;
typedef struct _PangoFontMap PangoFontMap;

typedef struct _PangoRectangle PangoRectangle;



/* A index of a glyph into a font. Rendering system dependent */
/**
 * PangoGlyph:
 *
 * A #PangoGlyph represents a single glyph in the output form of a string.
 */
typedef guint32 PangoGlyph;



/**
 * PANGO_SCALE:
 *
 * The %PANGO_SCALE macro represents the scale between dimensions used
 * for Pango distances and device units. (The definition of device
 * units is dependent on the output device; it will typically be pixels
 * for a screen, and points for a printer.) %PANGO_SCALE is currently
 * 1024, but this may be changed in the future.
 *
 * When setting font sizes, device units are always considered to be
 * points (as in "12 point font"), rather than pixels.
 */
/**
 * PANGO_PIXELS:
 * @d: a dimension in Pango units.
 *
 * Converts a dimension to device units by rounding.
 *
 * Return value: rounded dimension in device units.
 */
/**
 * PANGO_PIXELS_FLOOR:
 * @d: a dimension in Pango units.
 *
 * Converts a dimension to device units by flooring.
 *
 * Return value: floored dimension in device units.
 * Since: 1.14
 */
/**
 * PANGO_PIXELS_CEIL:
 * @d: a dimension in Pango units.
 *
 * Converts a dimension to device units by ceiling.
 *
 * Return value: ceiled dimension in device units.
 * Since: 1.14
 */
#define PANGO_SCALE 1024
#define PANGO_PIXELS(d) (((int)(d) + 512) >> 10)
#define PANGO_PIXELS_FLOOR(d) (((int)(d)) >> 10)
#define PANGO_PIXELS_CEIL(d) (((int)(d) + 1023) >> 10)
/* The above expressions are just slightly wrong for floating point d;
 * For example we'd expect PANGO_PIXELS(-512.5) => -1 but instead we get 0.
 * That's unlikely to matter for practical use and the expression is much
 * more compact and faster than alternatives that work exactly for both
 * integers and floating point.
 *
 * PANGO_PIXELS also behaves differently for +512 and -512.
 */

/**
 * PANGO_UNITS_ROUND:
 * @d: a dimension in Pango units.
 *
 * Rounds a dimension to whole device units, but does not
 * convert it to device units.
 *
 * Return value: rounded dimension in Pango units.
 * Since: 1.18
 */
#define PANGO_UNITS_ROUND(d)				\
  (((d) + (PANGO_SCALE >> 1)) & ~(PANGO_SCALE - 1))


PANGO_AVAILABLE_IN_1_16
int    pango_units_from_double (double d) G_GNUC_CONST;
PANGO_AVAILABLE_IN_1_16
double pango_units_to_double (int i) G_GNUC_CONST;



/**
 * PangoRectangle:
 * @x: X coordinate of the left side of the rectangle.
 * @y: Y coordinate of the the top side of the rectangle.
 * @width: width of the rectangle.
 * @height: height of the rectangle.
 *
 * The #PangoRectangle structure represents a rectangle. It is frequently
 * used to represent the logical or ink extents of a single glyph or section
 * of text. (See, for instance, pango_font_get_glyph_extents())
 *
 */
struct _PangoRectangle
{
  int x;
  int y;
  int width;
  int height;
};

/* Macros to translate from extents rectangles to ascent/descent/lbearing/rbearing
 */
/**
 * PANGO_ASCENT:
 * @rect: a #PangoRectangle
 *
 * Extracts the <firstterm>ascent</firstterm> from a #PangoRectangle
 * representing glyph extents. The ascent is the distance from the
 * baseline to the highest point of the character. This is positive if the
 * glyph ascends above the baseline.
 */
/**
 * PANGO_DESCENT:
 * @rect: a #PangoRectangle
 *
 * Extracts the <firstterm>descent</firstterm> from a #PangoRectangle
 * representing glyph extents. The descent is the distance from the
 * baseline to the lowest point of the character. This is positive if the
 * glyph descends below the baseline.
 */
/**
 * PANGO_LBEARING:
 * @rect: a #PangoRectangle
 *
 * Extracts the <firstterm>left bearing</firstterm> from a #PangoRectangle
 * representing glyph extents. The left bearing is the distance from the
 * horizontal origin to the farthest left point of the character.
 * This is positive for characters drawn completely to the right of the
 * glyph origin.
 */
/**
 * PANGO_RBEARING:
 * @rect: a #PangoRectangle
 *
 * Extracts the <firstterm>right bearing</firstterm> from a #PangoRectangle
 * representing glyph extents. The right bearing is the distance from the
 * horizontal origin to the farthest right point of the character.
 * This is positive except for characters drawn completely to the left of the
 * horizontal origin.
 */
#define PANGO_ASCENT(rect) (-(rect).y)
#define PANGO_DESCENT(rect) ((rect).y + (rect).height)
#define PANGO_LBEARING(rect) ((rect).x)
#define PANGO_RBEARING(rect) ((rect).x + (rect).width)

PANGO_AVAILABLE_IN_1_16
void pango_extents_to_pixels (PangoRectangle *inclusive,
			      PangoRectangle *nearest);


#include <pango/pango-gravity.h>
#include <pango/pango-language.h>
#include <pango/pango-matrix.h>
#include <pango/pango-script.h>
#include <pango/pango-bidi-type.h>


G_END_DECLS

#endif /* __PANGO_TYPES_H__ */
