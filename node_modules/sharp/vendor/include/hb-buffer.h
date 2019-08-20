/*
 * Copyright © 1998-2004  David Turner and Werner Lemberg
 * Copyright © 2004,2007,2009  Red Hat, Inc.
 * Copyright © 2011,2012  Google, Inc.
 *
 *  This is part of HarfBuzz, a text shaping library.
 *
 * Permission is hereby granted, without written agreement and without
 * license or royalty fees, to use, copy, modify, and distribute this
 * software and its documentation for any purpose, provided that the
 * above copyright notice and the following two paragraphs appear in
 * all copies of this software.
 *
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE TO ANY PARTY FOR
 * DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
 * ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN
 * IF THE COPYRIGHT HOLDER HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
 * THE COPYRIGHT HOLDER SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE.  THE SOFTWARE PROVIDED HEREUNDER IS
 * ON AN "AS IS" BASIS, AND THE COPYRIGHT HOLDER HAS NO OBLIGATION TO
 * PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 *
 * Red Hat Author(s): Owen Taylor, Behdad Esfahbod
 * Google Author(s): Behdad Esfahbod
 */

#ifndef HB_H_IN
#error "Include <hb.h> instead."
#endif

#ifndef HB_BUFFER_H
#define HB_BUFFER_H

#include "hb-common.h"
#include "hb-unicode.h"
#include "hb-font.h"

HB_BEGIN_DECLS

/**
 * hb_glyph_info_t:
 * @codepoint: either a Unicode code point (before shaping) or a glyph index
 *             (after shaping).
 * @cluster: the index of the character in the original text that corresponds
 *           to this #hb_glyph_info_t, or whatever the client passes to
 *           hb_buffer_add(). More than one #hb_glyph_info_t can have the same
 *           @cluster value, if they resulted from the same character (e.g. one
 *           to many glyph substitution), and when more than one character gets
 *           merged in the same glyph (e.g. many to one glyph substitution) the
 *           #hb_glyph_info_t will have the smallest cluster value of them.
 *           By default some characters are merged into the same cluster
 *           (e.g. combining marks have the same cluster as their bases)
 *           even if they are separate glyphs, hb_buffer_set_cluster_level()
 *           allow selecting more fine-grained cluster handling.
 *
 * The #hb_glyph_info_t is the structure that holds information about the
 * glyphs and their relation to input text.
 */
typedef struct hb_glyph_info_t
{
  hb_codepoint_t codepoint;
  /*< private >*/
  hb_mask_t      mask;
  /*< public >*/
  uint32_t       cluster;

  /*< private >*/
  hb_var_int_t   var1;
  hb_var_int_t   var2;
} hb_glyph_info_t;

/**
 * hb_glyph_flags_t:
 * @HB_GLYPH_FLAG_UNSAFE_TO_BREAK: Indicates that if input text is broken at the
 * 				   beginning of the cluster this glyph is part of,
 * 				   then both sides need to be re-shaped, as the
 * 				   result might be different.  On the flip side,
 * 				   it means that when this flag is not present,
 * 				   then it's safe to break the glyph-run at the
 * 				   beginning of this cluster, and the two sides
 * 				   represent the exact same result one would get
 * 				   if breaking input text at the beginning of
 * 				   this cluster and shaping the two sides
 * 				   separately.  This can be used to optimize
 * 				   paragraph layout, by avoiding re-shaping
 * 				   of each line after line-breaking, or limiting
 * 				   the reshaping to a small piece around the
 * 				   breaking point only.
 * @HB_GLYPH_FLAG_DEFINED: All the currently defined flags.
 *
 * Since: 1.5.0
 */
typedef enum { /*< flags >*/
  HB_GLYPH_FLAG_UNSAFE_TO_BREAK		= 0x00000001,

  HB_GLYPH_FLAG_DEFINED			= 0x00000001 /* OR of all defined flags */
} hb_glyph_flags_t;

HB_EXTERN hb_glyph_flags_t
hb_glyph_info_get_glyph_flags (const hb_glyph_info_t *info);

#define hb_glyph_info_get_glyph_flags(info) \
	((hb_glyph_flags_t) ((unsigned int) (info)->mask & HB_GLYPH_FLAG_DEFINED))


/**
 * hb_glyph_position_t:
 * @x_advance: how much the line advances after drawing this glyph when setting
 *             text in horizontal direction.
 * @y_advance: how much the line advances after drawing this glyph when setting
 *             text in vertical direction.
 * @x_offset: how much the glyph moves on the X-axis before drawing it, this
 *            should not affect how much the line advances.
 * @y_offset: how much the glyph moves on the Y-axis before drawing it, this
 *            should not affect how much the line advances.
 *
 * The #hb_glyph_position_t is the structure that holds the positions of the
 * glyph in both horizontal and vertical directions. All positions in
 * #hb_glyph_position_t are relative to the current point.
 *
 */
typedef struct hb_glyph_position_t {
  hb_position_t  x_advance;
  hb_position_t  y_advance;
  hb_position_t  x_offset;
  hb_position_t  y_offset;

  /*< private >*/
  hb_var_int_t   var;
} hb_glyph_position_t;

/**
 * hb_segment_properties_t:
 * @direction: the #hb_direction_t of the buffer, see hb_buffer_set_direction().
 * @script: the #hb_script_t of the buffer, see hb_buffer_set_script().
 * @language: the #hb_language_t of the buffer, see hb_buffer_set_language().
 *
 * The structure that holds various text properties of an #hb_buffer_t. Can be
 * set and retrieved using hb_buffer_set_segment_properties() and
 * hb_buffer_get_segment_properties(), respectively.
 */
typedef struct hb_segment_properties_t {
  hb_direction_t  direction;
  hb_script_t     script;
  hb_language_t   language;
  /*< private >*/
  void           *reserved1;
  void           *reserved2;
} hb_segment_properties_t;

#define HB_SEGMENT_PROPERTIES_DEFAULT {HB_DIRECTION_INVALID, \
				       HB_SCRIPT_INVALID, \
				       HB_LANGUAGE_INVALID, \
				       (void *) 0, \
				       (void *) 0}

HB_EXTERN hb_bool_t
hb_segment_properties_equal (const hb_segment_properties_t *a,
			     const hb_segment_properties_t *b);

HB_EXTERN unsigned int
hb_segment_properties_hash (const hb_segment_properties_t *p);



/**
 * hb_buffer_t:
 *
 * The main structure holding the input text and its properties before shaping,
 * and output glyphs and their information after shaping.
 */

typedef struct hb_buffer_t hb_buffer_t;

HB_EXTERN hb_buffer_t *
hb_buffer_create (void);

HB_EXTERN hb_buffer_t *
hb_buffer_get_empty (void);

HB_EXTERN hb_buffer_t *
hb_buffer_reference (hb_buffer_t *buffer);

HB_EXTERN void
hb_buffer_destroy (hb_buffer_t *buffer);

HB_EXTERN hb_bool_t
hb_buffer_set_user_data (hb_buffer_t        *buffer,
			 hb_user_data_key_t *key,
			 void *              data,
			 hb_destroy_func_t   destroy,
			 hb_bool_t           replace);

HB_EXTERN void *
hb_buffer_get_user_data (hb_buffer_t        *buffer,
			 hb_user_data_key_t *key);


/**
 * hb_buffer_content_type_t:
 * @HB_BUFFER_CONTENT_TYPE_INVALID: Initial value for new buffer.
 * @HB_BUFFER_CONTENT_TYPE_UNICODE: The buffer contains input characters (before shaping).
 * @HB_BUFFER_CONTENT_TYPE_GLYPHS: The buffer contains output glyphs (after shaping).
 */
typedef enum {
  HB_BUFFER_CONTENT_TYPE_INVALID = 0,
  HB_BUFFER_CONTENT_TYPE_UNICODE,
  HB_BUFFER_CONTENT_TYPE_GLYPHS
} hb_buffer_content_type_t;

HB_EXTERN void
hb_buffer_set_content_type (hb_buffer_t              *buffer,
			    hb_buffer_content_type_t  content_type);

HB_EXTERN hb_buffer_content_type_t
hb_buffer_get_content_type (hb_buffer_t *buffer);


HB_EXTERN void
hb_buffer_set_unicode_funcs (hb_buffer_t        *buffer,
			     hb_unicode_funcs_t *unicode_funcs);

HB_EXTERN hb_unicode_funcs_t *
hb_buffer_get_unicode_funcs (hb_buffer_t        *buffer);

HB_EXTERN void
hb_buffer_set_direction (hb_buffer_t    *buffer,
			 hb_direction_t  direction);

HB_EXTERN hb_direction_t
hb_buffer_get_direction (hb_buffer_t *buffer);

HB_EXTERN void
hb_buffer_set_script (hb_buffer_t *buffer,
		      hb_script_t  script);

HB_EXTERN hb_script_t
hb_buffer_get_script (hb_buffer_t *buffer);

HB_EXTERN void
hb_buffer_set_language (hb_buffer_t   *buffer,
			hb_language_t  language);


HB_EXTERN hb_language_t
hb_buffer_get_language (hb_buffer_t *buffer);

HB_EXTERN void
hb_buffer_set_segment_properties (hb_buffer_t *buffer,
				  const hb_segment_properties_t *props);

HB_EXTERN void
hb_buffer_get_segment_properties (hb_buffer_t *buffer,
				  hb_segment_properties_t *props);

HB_EXTERN void
hb_buffer_guess_segment_properties (hb_buffer_t *buffer);


/**
 * hb_buffer_flags_t:
 * @HB_BUFFER_FLAG_DEFAULT: the default buffer flag.
 * @HB_BUFFER_FLAG_BOT: flag indicating that special handling of the beginning
 *                      of text paragraph can be applied to this buffer. Should usually
 *                      be set, unless you are passing to the buffer only part
 *                      of the text without the full context.
 * @HB_BUFFER_FLAG_EOT: flag indicating that special handling of the end of text
 *                      paragraph can be applied to this buffer, similar to
 *                      @HB_BUFFER_FLAG_BOT.
 * @HB_BUFFER_FLAG_PRESERVE_DEFAULT_IGNORABLES:
 *                      flag indication that character with Default_Ignorable
 *                      Unicode property should use the corresponding glyph
 *                      from the font, instead of hiding them (done by
 *                      replacing them with the space glyph and zeroing the
 *                      advance width.)  This flag takes precedence over
 *                      @HB_BUFFER_FLAG_REMOVE_DEFAULT_IGNORABLES.
 * @HB_BUFFER_FLAG_REMOVE_DEFAULT_IGNORABLES:
 *                      flag indication that character with Default_Ignorable
 *                      Unicode property should be removed from glyph string
 *                      instead of hiding them (done by replacing them with the
 *                      space glyph and zeroing the advance width.)
 *                      @HB_BUFFER_FLAG_PRESERVE_DEFAULT_IGNORABLES takes
 *                      precedence over this flag. Since: 1.8.0
 *
 * Since: 0.9.20
 */
typedef enum { /*< flags >*/
  HB_BUFFER_FLAG_DEFAULT			= 0x00000000u,
  HB_BUFFER_FLAG_BOT				= 0x00000001u, /* Beginning-of-text */
  HB_BUFFER_FLAG_EOT				= 0x00000002u, /* End-of-text */
  HB_BUFFER_FLAG_PRESERVE_DEFAULT_IGNORABLES	= 0x00000004u,
  HB_BUFFER_FLAG_REMOVE_DEFAULT_IGNORABLES	= 0x00000008u
} hb_buffer_flags_t;

HB_EXTERN void
hb_buffer_set_flags (hb_buffer_t       *buffer,
		     hb_buffer_flags_t  flags);

HB_EXTERN hb_buffer_flags_t
hb_buffer_get_flags (hb_buffer_t *buffer);

/**
 * hb_buffer_cluster_level_t:
 * @HB_BUFFER_CLUSTER_LEVEL_MONOTONE_GRAPHEMES: Return cluster values grouped by graphemes into
 *   monotone order.
 * @HB_BUFFER_CLUSTER_LEVEL_MONOTONE_CHARACTERS: Return cluster values grouped into monotone order.
 * @HB_BUFFER_CLUSTER_LEVEL_CHARACTERS: Don't group cluster values.
 * @HB_BUFFER_CLUSTER_LEVEL_DEFAULT: Default cluster level,
 *   equal to @HB_BUFFER_CLUSTER_LEVEL_MONOTONE_GRAPHEMES.
 *
 * Since: 0.9.42
 */
typedef enum {
  HB_BUFFER_CLUSTER_LEVEL_MONOTONE_GRAPHEMES	= 0,
  HB_BUFFER_CLUSTER_LEVEL_MONOTONE_CHARACTERS	= 1,
  HB_BUFFER_CLUSTER_LEVEL_CHARACTERS		= 2,
  HB_BUFFER_CLUSTER_LEVEL_DEFAULT = HB_BUFFER_CLUSTER_LEVEL_MONOTONE_GRAPHEMES
} hb_buffer_cluster_level_t;

HB_EXTERN void
hb_buffer_set_cluster_level (hb_buffer_t               *buffer,
			     hb_buffer_cluster_level_t  cluster_level);

HB_EXTERN hb_buffer_cluster_level_t
hb_buffer_get_cluster_level (hb_buffer_t *buffer);

/**
 * HB_BUFFER_REPLACEMENT_CODEPOINT_DEFAULT:
 *
 * The default code point for replacing invalid characters in a given encoding.
 * Set to U+FFFD REPLACEMENT CHARACTER.
 *
 * Since: 0.9.31
 */
#define HB_BUFFER_REPLACEMENT_CODEPOINT_DEFAULT 0xFFFDu

HB_EXTERN void
hb_buffer_set_replacement_codepoint (hb_buffer_t    *buffer,
				     hb_codepoint_t  replacement);

HB_EXTERN hb_codepoint_t
hb_buffer_get_replacement_codepoint (hb_buffer_t    *buffer);

HB_EXTERN void
hb_buffer_set_invisible_glyph (hb_buffer_t    *buffer,
			       hb_codepoint_t  invisible);

HB_EXTERN hb_codepoint_t
hb_buffer_get_invisible_glyph (hb_buffer_t    *buffer);


HB_EXTERN void
hb_buffer_reset (hb_buffer_t *buffer);

HB_EXTERN void
hb_buffer_clear_contents (hb_buffer_t *buffer);

HB_EXTERN hb_bool_t
hb_buffer_pre_allocate (hb_buffer_t  *buffer,
		        unsigned int  size);


HB_EXTERN hb_bool_t
hb_buffer_allocation_successful (hb_buffer_t  *buffer);

HB_EXTERN void
hb_buffer_reverse (hb_buffer_t *buffer);

HB_EXTERN void
hb_buffer_reverse_range (hb_buffer_t *buffer,
			 unsigned int start, unsigned int end);

HB_EXTERN void
hb_buffer_reverse_clusters (hb_buffer_t *buffer);


/* Filling the buffer in */

HB_EXTERN void
hb_buffer_add (hb_buffer_t    *buffer,
	       hb_codepoint_t  codepoint,
	       unsigned int    cluster);

HB_EXTERN void
hb_buffer_add_utf8 (hb_buffer_t  *buffer,
		    const char   *text,
		    int           text_length,
		    unsigned int  item_offset,
		    int           item_length);

HB_EXTERN void
hb_buffer_add_utf16 (hb_buffer_t    *buffer,
		     const uint16_t *text,
		     int             text_length,
		     unsigned int    item_offset,
		     int             item_length);

HB_EXTERN void
hb_buffer_add_utf32 (hb_buffer_t    *buffer,
		     const uint32_t *text,
		     int             text_length,
		     unsigned int    item_offset,
		     int             item_length);

HB_EXTERN void
hb_buffer_add_latin1 (hb_buffer_t   *buffer,
		      const uint8_t *text,
		      int            text_length,
		      unsigned int   item_offset,
		      int            item_length);

HB_EXTERN void
hb_buffer_add_codepoints (hb_buffer_t          *buffer,
			  const hb_codepoint_t *text,
			  int                   text_length,
			  unsigned int          item_offset,
			  int                   item_length);

HB_EXTERN void
hb_buffer_append (hb_buffer_t *buffer,
		  hb_buffer_t *source,
		  unsigned int start,
		  unsigned int end);

HB_EXTERN hb_bool_t
hb_buffer_set_length (hb_buffer_t  *buffer,
		      unsigned int  length);

HB_EXTERN unsigned int
hb_buffer_get_length (hb_buffer_t *buffer);

/* Getting glyphs out of the buffer */

HB_EXTERN hb_glyph_info_t *
hb_buffer_get_glyph_infos (hb_buffer_t  *buffer,
                           unsigned int *length);

HB_EXTERN hb_glyph_position_t *
hb_buffer_get_glyph_positions (hb_buffer_t  *buffer,
                               unsigned int *length);


HB_EXTERN void
hb_buffer_normalize_glyphs (hb_buffer_t *buffer);


/*
 * Serialize
 */

/**
 * hb_buffer_serialize_flags_t:
 * @HB_BUFFER_SERIALIZE_FLAG_DEFAULT: serialize glyph names, clusters and positions.
 * @HB_BUFFER_SERIALIZE_FLAG_NO_CLUSTERS: do not serialize glyph cluster.
 * @HB_BUFFER_SERIALIZE_FLAG_NO_POSITIONS: do not serialize glyph position information.
 * @HB_BUFFER_SERIALIZE_FLAG_NO_GLYPH_NAMES: do no serialize glyph name.
 * @HB_BUFFER_SERIALIZE_FLAG_GLYPH_EXTENTS: serialize glyph extents.
 * @HB_BUFFER_SERIALIZE_FLAG_GLYPH_FLAGS: serialize glyph flags. Since: 1.5.0
 * @HB_BUFFER_SERIALIZE_FLAG_NO_ADVANCES: do not serialize glyph advances,
 *  glyph offsets will reflect absolute glyph positions. Since: 1.8.0
 *
 * Flags that control what glyph information are serialized in hb_buffer_serialize_glyphs().
 *
 * Since: 0.9.20
 */
typedef enum { /*< flags >*/
  HB_BUFFER_SERIALIZE_FLAG_DEFAULT		= 0x00000000u,
  HB_BUFFER_SERIALIZE_FLAG_NO_CLUSTERS		= 0x00000001u,
  HB_BUFFER_SERIALIZE_FLAG_NO_POSITIONS		= 0x00000002u,
  HB_BUFFER_SERIALIZE_FLAG_NO_GLYPH_NAMES	= 0x00000004u,
  HB_BUFFER_SERIALIZE_FLAG_GLYPH_EXTENTS	= 0x00000008u,
  HB_BUFFER_SERIALIZE_FLAG_GLYPH_FLAGS		= 0x00000010u,
  HB_BUFFER_SERIALIZE_FLAG_NO_ADVANCES		= 0x00000020u
} hb_buffer_serialize_flags_t;

/**
 * hb_buffer_serialize_format_t:
 * @HB_BUFFER_SERIALIZE_FORMAT_TEXT: a human-readable, plain text format.
 * @HB_BUFFER_SERIALIZE_FORMAT_JSON: a machine-readable JSON format.
 * @HB_BUFFER_SERIALIZE_FORMAT_INVALID: invalid format.
 *
 * The buffer serialization and de-serialization format used in
 * hb_buffer_serialize_glyphs() and hb_buffer_deserialize_glyphs().
 *
 * Since: 0.9.2
 */
typedef enum {
  HB_BUFFER_SERIALIZE_FORMAT_TEXT	= HB_TAG('T','E','X','T'),
  HB_BUFFER_SERIALIZE_FORMAT_JSON	= HB_TAG('J','S','O','N'),
  HB_BUFFER_SERIALIZE_FORMAT_INVALID	= HB_TAG_NONE
} hb_buffer_serialize_format_t;

HB_EXTERN hb_buffer_serialize_format_t
hb_buffer_serialize_format_from_string (const char *str, int len);

HB_EXTERN const char *
hb_buffer_serialize_format_to_string (hb_buffer_serialize_format_t format);

HB_EXTERN const char **
hb_buffer_serialize_list_formats (void);

HB_EXTERN unsigned int
hb_buffer_serialize_glyphs (hb_buffer_t *buffer,
			    unsigned int start,
			    unsigned int end,
			    char *buf,
			    unsigned int buf_size,
			    unsigned int *buf_consumed,
			    hb_font_t *font,
			    hb_buffer_serialize_format_t format,
			    hb_buffer_serialize_flags_t flags);

HB_EXTERN hb_bool_t
hb_buffer_deserialize_glyphs (hb_buffer_t *buffer,
			      const char *buf,
			      int buf_len,
			      const char **end_ptr,
			      hb_font_t *font,
			      hb_buffer_serialize_format_t format);


/*
 * Compare buffers
 */

typedef enum { /*< flags >*/
  HB_BUFFER_DIFF_FLAG_EQUAL			= 0x0000,

  /* Buffers with different content_type cannot be meaningfully compared
   * in any further detail. */
  HB_BUFFER_DIFF_FLAG_CONTENT_TYPE_MISMATCH	= 0x0001,

  /* For buffers with differing length, the per-glyph comparison is not
   * attempted, though we do still scan reference for dottedcircle / .notdef
   * glyphs. */
  HB_BUFFER_DIFF_FLAG_LENGTH_MISMATCH		= 0x0002,

  /* We want to know if dottedcircle / .notdef glyphs are present in the
   * reference, as we may not care so much about other differences in this
   * case. */
  HB_BUFFER_DIFF_FLAG_NOTDEF_PRESENT		= 0x0004,
  HB_BUFFER_DIFF_FLAG_DOTTED_CIRCLE_PRESENT	= 0x0008,

  /* If the buffers have the same length, we compare them glyph-by-glyph
   * and report which aspect(s) of the glyph info/position are different. */
  HB_BUFFER_DIFF_FLAG_CODEPOINT_MISMATCH	= 0x0010,
  HB_BUFFER_DIFF_FLAG_CLUSTER_MISMATCH		= 0x0020,
  HB_BUFFER_DIFF_FLAG_GLYPH_FLAGS_MISMATCH	= 0x0040,
  HB_BUFFER_DIFF_FLAG_POSITION_MISMATCH		= 0x0080

} hb_buffer_diff_flags_t;

/* Compare the contents of two buffers, report types of differences. */
HB_EXTERN hb_buffer_diff_flags_t
hb_buffer_diff (hb_buffer_t *buffer,
		hb_buffer_t *reference,
		hb_codepoint_t dottedcircle_glyph,
		unsigned int position_fuzz);


/*
 * Debugging.
 */

typedef hb_bool_t	(*hb_buffer_message_func_t)	(hb_buffer_t *buffer,
							 hb_font_t   *font,
							 const char  *message,
							 void        *user_data);

HB_EXTERN void
hb_buffer_set_message_func (hb_buffer_t *buffer,
			    hb_buffer_message_func_t func,
			    void *user_data, hb_destroy_func_t destroy);


HB_END_DECLS

#endif /* HB_BUFFER_H */
