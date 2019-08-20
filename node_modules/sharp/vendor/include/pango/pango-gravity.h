/* Pango
 * pango-gravity.h: Gravity routines
 *
 * Copyright (C) 2006, 2007 Red Hat Software
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

#ifndef __PANGO_GRAVITY_H__
#define __PANGO_GRAVITY_H__

#include <glib.h>

G_BEGIN_DECLS

/**
 * PangoGravity:
 * @PANGO_GRAVITY_SOUTH: Glyphs stand upright (default)
 * @PANGO_GRAVITY_EAST: Glyphs are rotated 90 degrees clockwise
 * @PANGO_GRAVITY_NORTH: Glyphs are upside-down
 * @PANGO_GRAVITY_WEST: Glyphs are rotated 90 degrees counter-clockwise
 * @PANGO_GRAVITY_AUTO: Gravity is resolved from the context matrix
 *
 * The #PangoGravity type represents the orientation of glyphs in a segment
 * of text.  This is useful when rendering vertical text layouts.  In
 * those situations, the layout is rotated using a non-identity PangoMatrix,
 * and then glyph orientation is controlled using #PangoGravity.
 * Not every value in this enumeration makes sense for every usage of
 * #PangoGravity; for example, %PANGO_GRAVITY_AUTO only can be passed to
 * pango_context_set_base_gravity() and can only be returned by
 * pango_context_get_base_gravity().
 *
 * See also: #PangoGravityHint
 *
 * Since: 1.16
 **/
typedef enum {
  PANGO_GRAVITY_SOUTH,
  PANGO_GRAVITY_EAST,
  PANGO_GRAVITY_NORTH,
  PANGO_GRAVITY_WEST,
  PANGO_GRAVITY_AUTO
} PangoGravity;

/**
 * PangoGravityHint:
 * @PANGO_GRAVITY_HINT_NATURAL: scripts will take their natural gravity based
 * on the base gravity and the script.  This is the default.
 * @PANGO_GRAVITY_HINT_STRONG: always use the base gravity set, regardless of
 * the script.
 * @PANGO_GRAVITY_HINT_LINE: for scripts not in their natural direction (eg.
 * Latin in East gravity), choose per-script gravity such that every script
 * respects the line progression.  This means, Latin and Arabic will take
 * opposite gravities and both flow top-to-bottom for example.
 *
 * The #PangoGravityHint defines how horizontal scripts should behave in a
 * vertical context.  That is, English excerpt in a vertical paragraph for
 * example.
 *
 * See #PangoGravity.
 *
 * Since: 1.16
 **/
typedef enum {
  PANGO_GRAVITY_HINT_NATURAL,
  PANGO_GRAVITY_HINT_STRONG,
  PANGO_GRAVITY_HINT_LINE
} PangoGravityHint;

/**
 * PANGO_GRAVITY_IS_VERTICAL:
 * @gravity: the #PangoGravity to check
 *
 * Whether a #PangoGravity represents vertical writing directions.
 *
 * Returns: %TRUE if @gravity is %PANGO_GRAVITY_EAST or %PANGO_GRAVITY_WEST,
 *          %FALSE otherwise.
 *
 * Since: 1.16
 **/
#define PANGO_GRAVITY_IS_VERTICAL(gravity) \
	((gravity) == PANGO_GRAVITY_EAST || (gravity) == PANGO_GRAVITY_WEST)

/**
 * PANGO_GRAVITY_IS_IMPROPER:
 * @gravity: the #PangoGravity to check
 *
 * Whether a #PangoGravity represents a gravity that results in reversal of text direction.
 *
 * Returns: %TRUE if @gravity is %PANGO_GRAVITY_WEST or %PANGO_GRAVITY_NORTH,
 *          %FALSE otherwise.
 *
 * Since: 1.32
 **/
#define PANGO_GRAVITY_IS_IMPROPER(gravity) \
	((gravity) == PANGO_GRAVITY_WEST || (gravity) == PANGO_GRAVITY_NORTH)

#include <pango/pango-matrix.h>
#include <pango/pango-script.h>

PANGO_AVAILABLE_IN_1_16
double       pango_gravity_to_rotation    (PangoGravity       gravity) G_GNUC_CONST;
PANGO_AVAILABLE_IN_1_16
PangoGravity pango_gravity_get_for_matrix (const PangoMatrix *matrix) G_GNUC_PURE;
PANGO_AVAILABLE_IN_1_16
PangoGravity pango_gravity_get_for_script (PangoScript        script,
					   PangoGravity       base_gravity,
					   PangoGravityHint   hint) G_GNUC_CONST;
PANGO_AVAILABLE_IN_1_26
PangoGravity pango_gravity_get_for_script_and_width
					  (PangoScript        script,
					   gboolean           wide,
					   PangoGravity       base_gravity,
					   PangoGravityHint   hint) G_GNUC_CONST;


G_END_DECLS

#endif /* __PANGO_GRAVITY_H__ */
