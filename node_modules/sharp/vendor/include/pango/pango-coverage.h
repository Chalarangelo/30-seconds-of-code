/* Pango
 * pango-coverage.h: Coverage sets for fonts
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

#ifndef __PANGO_COVERAGE_H__
#define __PANGO_COVERAGE_H__

#include <glib.h>

#include <pango/pango-version-macros.h>

G_BEGIN_DECLS

/**
 * PangoCoverage:
 *
 * The #PangoCoverage structure represents a map from Unicode characters
 * to #PangoCoverageLevel. It is an opaque structure with no public fields.
 */
typedef struct _PangoCoverage PangoCoverage;

/**
 * PangoCoverageLevel:
 * @PANGO_COVERAGE_NONE: The character is not representable with the font.
 * @PANGO_COVERAGE_FALLBACK: The character is represented in a way that may be
 * comprehensible but is not the correct graphical form.
 * For instance, a Hangul character represented as a
 * a sequence of Jamos, or a Latin transliteration of a Cyrillic word.
 * @PANGO_COVERAGE_APPROXIMATE: The character is represented as basically the correct
 * graphical form, but with a stylistic variant inappropriate for
 * the current script.
 * @PANGO_COVERAGE_EXACT: The character is represented as the correct graphical form.
 *
 * Used to indicate how well a font can represent a particular Unicode
 * character point for a particular script.
 */
typedef enum {
  PANGO_COVERAGE_NONE,
  PANGO_COVERAGE_FALLBACK,
  PANGO_COVERAGE_APPROXIMATE,
  PANGO_COVERAGE_EXACT
} PangoCoverageLevel;

PANGO_AVAILABLE_IN_ALL
PangoCoverage *    pango_coverage_new     (void);
PANGO_AVAILABLE_IN_ALL
PangoCoverage *    pango_coverage_ref     (PangoCoverage      *coverage);
PANGO_AVAILABLE_IN_ALL
void               pango_coverage_unref   (PangoCoverage      *coverage);
PANGO_AVAILABLE_IN_ALL
PangoCoverage *    pango_coverage_copy    (PangoCoverage      *coverage);
PANGO_AVAILABLE_IN_ALL
PangoCoverageLevel pango_coverage_get     (PangoCoverage      *coverage,
					   int                 index_);
PANGO_AVAILABLE_IN_ALL
void               pango_coverage_set     (PangoCoverage      *coverage,
					   int                 index_,
					   PangoCoverageLevel  level);
PANGO_AVAILABLE_IN_ALL
void               pango_coverage_max     (PangoCoverage      *coverage,
					   PangoCoverage      *other);

PANGO_AVAILABLE_IN_ALL
void           pango_coverage_to_bytes   (PangoCoverage  *coverage,
					  guchar        **bytes,
					  int            *n_bytes);
PANGO_AVAILABLE_IN_ALL
PangoCoverage *pango_coverage_from_bytes (guchar         *bytes,
					  int             n_bytes);

G_END_DECLS

#endif /* __PANGO_COVERAGE_H__ */
