/* Pango
 * pango-ot.h:
 *
 * Copyright (C) 2000,2007 Red Hat Software
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

#ifndef __PANGO_OT_H__
#define __PANGO_OT_H__

/* Deprecated.  Use HarfBuzz directly! */

#include <pango/pangofc-font.h>
#include <pango/pango-glyph.h>
#include <pango/pango-font.h>
#include <pango/pango-script.h>
#include <pango/pango-language.h>

G_BEGIN_DECLS

#ifdef PANGO_ENABLE_ENGINE

/**
 * PangoOTTag:
 *
 * The #PangoOTTag typedef is used to represent TrueType and OpenType
 * four letter tags inside Pango. Use PANGO_OT_TAG_MAKE()
 * or PANGO_OT_TAG_MAKE_FROM_STRING() macros to create <type>PangoOTTag</type>s manually.
 */
typedef guint32 PangoOTTag;

/**
 * PANGO_OT_TAG_MAKE:
 * @c1: First character.
 * @c2: Second character.
 * @c3: Third character.
 * @c4: Fourth character.
 *
 * Creates a #PangoOTTag from four characters.  This is similar and
 * compatible with the <function>FT_MAKE_TAG()</function> macro from FreeType.
 */
/**
 * PANGO_OT_TAG_MAKE_FROM_STRING:
 * @s: The string representation of the tag.
 *
 * Creates a #PangoOTTag from a string. The string should be at least
 * four characters long (pad with space characters if needed), and need
 * not be nul-terminated.  This is a convenience wrapper around
 * PANGO_OT_TAG_MAKE(), but cannot be used in certain situations, for
 * example, as a switch expression, as it dereferences pointers.
 */
#define PANGO_OT_TAG_MAKE(c1,c2,c3,c4)		((PangoOTTag) FT_MAKE_TAG (c1, c2, c3, c4))
#define PANGO_OT_TAG_MAKE_FROM_STRING(s)	(PANGO_OT_TAG_MAKE(((const char *) s)[0], \
								   ((const char *) s)[1], \
								   ((const char *) s)[2], \
								   ((const char *) s)[3]))

typedef struct _PangoOTInfo       PangoOTInfo;
typedef struct _PangoOTBuffer     PangoOTBuffer;
typedef struct _PangoOTGlyph      PangoOTGlyph;
typedef struct _PangoOTRuleset    PangoOTRuleset;
typedef struct _PangoOTFeatureMap PangoOTFeatureMap;
typedef struct _PangoOTRulesetDescription PangoOTRulesetDescription;

/**
 * PangoOTTableType:
 * @PANGO_OT_TABLE_GSUB: The GSUB table.
 * @PANGO_OT_TABLE_GPOS: The GPOS table.
 *
 * The <type>PangoOTTableType</type> enumeration values are used to
 * identify the various OpenType tables in the
 * <function>pango_ot_info_*</function> functions.
 */
typedef enum
{
  PANGO_OT_TABLE_GSUB,
  PANGO_OT_TABLE_GPOS
} PangoOTTableType;

/**
 * PANGO_OT_ALL_GLYPHS:
 *
 * This is used as the property bit in pango_ot_ruleset_add_feature() when a
 * feature should be applied to all glyphs.
 *
 * Since: 1.16
 */
/**
 * PANGO_OT_NO_FEATURE:
 *
 * This is used as a feature index that represent no feature, that is, should be
 * skipped.  It may be returned as feature index by pango_ot_info_find_feature()
 * if the feature is not found, and pango_ot_ruleset_add_feature() function
 * automatically skips this value, so no special handling is required by the user.
 *
 * Since: 1.18
 */
/**
 * PANGO_OT_NO_SCRIPT:
 *
 * This is used as a script index that represent no script, that is, when the
 * requested script was not found, and a default ('DFLT') script was not found
 * either.  It may be returned as script index by pango_ot_info_find_script()
 * if the script or a default script are not found, all other functions
 * taking a script index essentially return if the input script index is
 * this value, so no special handling is required by the user.
 *
 * Since: 1.18
 */
/**
 * PANGO_OT_DEFAULT_LANGUAGE:
 *
 * This is used as the language index in pango_ot_info_find_feature() when
 * the default language system of the script is desired.
 *
 * It is also returned by pango_ot_info_find_language() if the requested language
 * is not found, or the requested language tag was PANGO_OT_TAG_DEFAULT_LANGUAGE.
 * The end result is that one can always call pango_ot_tag_from_language()
 * followed by pango_ot_info_find_language() and pass the result to
 * pango_ot_info_find_feature() without having to worry about falling back to
 * default language system explicitly.
 *
 * Since: 1.16
 */
#define PANGO_OT_ALL_GLYPHS			((guint) 0xFFFF)
#define PANGO_OT_NO_FEATURE			((guint) 0xFFFF)
#define PANGO_OT_NO_SCRIPT			((guint) 0xFFFF)
#define PANGO_OT_DEFAULT_LANGUAGE		((guint) 0xFFFF)

/**
 * PANGO_OT_TAG_DEFAULT_SCRIPT:
 *
 * This is a #PangoOTTag representing the special script tag 'DFLT'.  It is
 * returned as script tag by pango_ot_tag_from_script() if the requested script
 * is not found.
 *
 * Since: 1.18
 */
/**
 * PANGO_OT_TAG_DEFAULT_LANGUAGE:
 *
 * This is a #PangoOTTag representing a special language tag 'dflt'.  It is
 * returned as language tag by pango_ot_tag_from_language() if the requested
 * language is not found.  It is safe to pass this value to
 * pango_ot_info_find_language() as that function falls back to returning default
 * language-system if the requested language tag is not found.
 *
 * Since: 1.18
 */
#define PANGO_OT_TAG_DEFAULT_SCRIPT		PANGO_OT_TAG_MAKE ('D', 'F', 'L', 'T')
#define PANGO_OT_TAG_DEFAULT_LANGUAGE		PANGO_OT_TAG_MAKE ('d', 'f', 'l', 't')

/* Note that this must match hb_glyph_info_t */
/**
 * PangoOTGlyph:
 * @glyph: the glyph itself.
 * @properties: the properties value, identifying which features should be
 * applied on this glyph.  See pango_ot_ruleset_add_feature().
 * @cluster: the cluster that this glyph belongs to.
 * @component: a component value, set by the OpenType layout engine.
 * @ligID: a ligature index value, set by the OpenType layout engine.
 * @internal: for Pango internal use
 *
 * The #PangoOTGlyph structure represents a single glyph together with
 * information used for OpenType layout processing of the glyph.
 * It contains the following fields.
 */
struct _PangoOTGlyph
{
  guint32  glyph;
  guint    properties;
  guint    cluster;
  gushort  component;
  gushort  ligID;

  guint    internal;
};

/**
 * PangoOTFeatureMap:
 * @feature_name: feature tag in represented as four-letter ASCII string.
 * @property_bit: the property bit to use for this feature.  See
 * pango_ot_ruleset_add_feature() for details.
 *
 * The #PangoOTFeatureMap typedef is used to represent an OpenType
 * feature with the property bit associated with it.  The feature tag is
 * represented as a char array instead of a #PangoOTTag for convenience.
 *
 * Since: 1.18
 */
struct _PangoOTFeatureMap
{
  char     feature_name[5];
  gulong   property_bit;
};

/**
 * PangoOTRulesetDescription:
 * @script: a #PangoScript.
 * @language: a #PangoLanguage.
 * @static_gsub_features: (nullable): static map of GSUB features,
 * or %NULL.
 * @n_static_gsub_features: length of @static_gsub_features, or 0.
 * @static_gpos_features: (nullable): static map of GPOS features,
 * or %NULL.
 * @n_static_gpos_features: length of @static_gpos_features, or 0.
 * @other_features: (nullable): map of extra features to add to both
 * GSUB and GPOS, or %NULL.  Unlike the static maps, this pointer
 * need not live beyond the life of function calls taking this
 * struct.
 * @n_other_features: length of @other_features, or 0.
 *
 * The #PangoOTRuleset structure holds all the information needed
 * to build a complete #PangoOTRuleset from an OpenType font.
 * The main use of this struct is to act as the key for a per-font
 * hash of rulesets.  The user populates a ruleset description and
 * gets the ruleset using pango_ot_ruleset_get_for_description()
 * or create a new one using pango_ot_ruleset_new_from_description().
 *
 * Since: 1.18
 */
struct _PangoOTRulesetDescription {
  PangoScript               script;
  PangoLanguage            *language;
  const PangoOTFeatureMap  *static_gsub_features;
  guint                   n_static_gsub_features;
  const PangoOTFeatureMap  *static_gpos_features;
  guint                   n_static_gpos_features;
  const PangoOTFeatureMap  *other_features;
  guint                   n_other_features;
};


#define PANGO_TYPE_OT_INFO              (pango_ot_info_get_type ())
#define PANGO_OT_INFO(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_OT_INFO, PangoOTInfo))
#define PANGO_IS_OT_INFO(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_OT_INFO))
PANGO_DEPRECATED
GType pango_ot_info_get_type (void) G_GNUC_CONST;

#define PANGO_TYPE_OT_RULESET           (pango_ot_ruleset_get_type ())
#define PANGO_OT_RULESET(object)        (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_OT_RULESET, PangoOTRuleset))
#define PANGO_IS_OT_RULESET(object)     (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_OT_RULESET))
PANGO_DEPRECATED
GType pango_ot_ruleset_get_type (void) G_GNUC_CONST;


PANGO_DEPRECATED
PangoOTInfo *pango_ot_info_get (FT_Face face);

PANGO_DEPRECATED
gboolean pango_ot_info_find_script   (PangoOTInfo      *info,
				      PangoOTTableType  table_type,
				      PangoOTTag        script_tag,
				      guint            *script_index);

PANGO_DEPRECATED
gboolean pango_ot_info_find_language (PangoOTInfo      *info,
				      PangoOTTableType  table_type,
				      guint             script_index,
				      PangoOTTag        language_tag,
				      guint            *language_index,
				      guint            *required_feature_index);
PANGO_DEPRECATED
gboolean pango_ot_info_find_feature  (PangoOTInfo      *info,
				      PangoOTTableType  table_type,
				      PangoOTTag        feature_tag,
				      guint             script_index,
				      guint             language_index,
				      guint            *feature_index);

PANGO_DEPRECATED
PangoOTTag *pango_ot_info_list_scripts   (PangoOTInfo      *info,
					  PangoOTTableType  table_type);
PANGO_DEPRECATED
PangoOTTag *pango_ot_info_list_languages (PangoOTInfo      *info,
					  PangoOTTableType  table_type,
					  guint             script_index,
					  PangoOTTag        language_tag);
PANGO_DEPRECATED
PangoOTTag *pango_ot_info_list_features  (PangoOTInfo      *info,
					  PangoOTTableType  table_type,
					  PangoOTTag        tag,
					  guint             script_index,
					  guint             language_index);

PANGO_DEPRECATED
PangoOTBuffer *pango_ot_buffer_new        (PangoFcFont       *font);
PANGO_DEPRECATED
void           pango_ot_buffer_destroy    (PangoOTBuffer     *buffer);
PANGO_DEPRECATED
void           pango_ot_buffer_clear      (PangoOTBuffer     *buffer);
PANGO_DEPRECATED
void           pango_ot_buffer_set_rtl    (PangoOTBuffer     *buffer,
					   gboolean           rtl);
PANGO_DEPRECATED
void           pango_ot_buffer_add_glyph  (PangoOTBuffer     *buffer,
					   guint              glyph,
					   guint              properties,
					   guint              cluster);
PANGO_DEPRECATED
void           pango_ot_buffer_get_glyphs (const PangoOTBuffer  *buffer,
					   PangoOTGlyph        **glyphs,
					   int                  *n_glyphs);
PANGO_DEPRECATED
void           pango_ot_buffer_output     (const PangoOTBuffer  *buffer,
					   PangoGlyphString     *glyphs);

PANGO_DEPRECATED
void           pango_ot_buffer_set_zero_width_marks (PangoOTBuffer     *buffer,
						     gboolean           zero_width_marks);

PANGO_DEPRECATED
const PangoOTRuleset *pango_ot_ruleset_get_for_description (PangoOTInfo                     *info,
							    const PangoOTRulesetDescription *desc);
PANGO_DEPRECATED
PangoOTRuleset *pango_ot_ruleset_new (PangoOTInfo       *info);
PANGO_DEPRECATED
PangoOTRuleset *pango_ot_ruleset_new_for (PangoOTInfo       *info,
					  PangoScript        script,
					  PangoLanguage     *language);
PANGO_DEPRECATED
PangoOTRuleset *pango_ot_ruleset_new_from_description (PangoOTInfo                     *info,
						       const PangoOTRulesetDescription *desc);
PANGO_DEPRECATED
void            pango_ot_ruleset_add_feature (PangoOTRuleset   *ruleset,
					      PangoOTTableType  table_type,
					      guint             feature_index,
					      gulong            property_bit);
PANGO_DEPRECATED
gboolean        pango_ot_ruleset_maybe_add_feature (PangoOTRuleset   *ruleset,
						    PangoOTTableType  table_type,
						    PangoOTTag        feature_tag,
						    gulong            property_bit);
PANGO_DEPRECATED
guint           pango_ot_ruleset_maybe_add_features (PangoOTRuleset          *ruleset,
						     PangoOTTableType         table_type,
						     const PangoOTFeatureMap *features,
						     guint                    n_features);
PANGO_DEPRECATED
guint           pango_ot_ruleset_get_feature_count (const PangoOTRuleset   *ruleset,
						    guint                  *n_gsub_features,
						    guint                  *n_gpos_features);

PANGO_DEPRECATED
void            pango_ot_ruleset_substitute  (const PangoOTRuleset   *ruleset,
					      PangoOTBuffer          *buffer);

PANGO_DEPRECATED
void            pango_ot_ruleset_position    (const PangoOTRuleset   *ruleset,
					      PangoOTBuffer          *buffer);

PANGO_DEPRECATED
PangoScript     pango_ot_tag_to_script     (PangoOTTag     script_tag) G_GNUC_CONST;

PANGO_DEPRECATED
PangoOTTag      pango_ot_tag_from_script   (PangoScript    script) G_GNUC_CONST;

PANGO_DEPRECATED
PangoLanguage  *pango_ot_tag_to_language   (PangoOTTag     language_tag) G_GNUC_CONST;

PANGO_DEPRECATED
PangoOTTag      pango_ot_tag_from_language (PangoLanguage *language) G_GNUC_CONST;

PANGO_DEPRECATED
guint           pango_ot_ruleset_description_hash  (const PangoOTRulesetDescription *desc) G_GNUC_PURE;

PANGO_DEPRECATED
gboolean        pango_ot_ruleset_description_equal (const PangoOTRulesetDescription *desc1,
						    const PangoOTRulesetDescription *desc2) G_GNUC_PURE;

PANGO_DEPRECATED
PangoOTRulesetDescription *pango_ot_ruleset_description_copy  (const PangoOTRulesetDescription *desc);

PANGO_DEPRECATED
void            pango_ot_ruleset_description_free  (PangoOTRulesetDescription       *desc);


#endif /* PANGO_ENABLE_ENGINE */

G_END_DECLS

#endif /* __PANGO_OT_H__ */
