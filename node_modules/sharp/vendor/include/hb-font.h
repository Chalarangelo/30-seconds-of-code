/*
 * Copyright © 2009  Red Hat, Inc.
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
 * Red Hat Author(s): Behdad Esfahbod
 */

#ifndef HB_H_IN
#error "Include <hb.h> instead."
#endif

#ifndef HB_FONT_H
#define HB_FONT_H

#include "hb-common.h"
#include "hb-face.h"

HB_BEGIN_DECLS


typedef struct hb_font_t hb_font_t;


/*
 * hb_font_funcs_t
 */

typedef struct hb_font_funcs_t hb_font_funcs_t;

HB_EXTERN hb_font_funcs_t *
hb_font_funcs_create (void);

HB_EXTERN hb_font_funcs_t *
hb_font_funcs_get_empty (void);

HB_EXTERN hb_font_funcs_t *
hb_font_funcs_reference (hb_font_funcs_t *ffuncs);

HB_EXTERN void
hb_font_funcs_destroy (hb_font_funcs_t *ffuncs);

HB_EXTERN hb_bool_t
hb_font_funcs_set_user_data (hb_font_funcs_t    *ffuncs,
			     hb_user_data_key_t *key,
			     void *              data,
			     hb_destroy_func_t   destroy,
			     hb_bool_t           replace);


HB_EXTERN void *
hb_font_funcs_get_user_data (hb_font_funcs_t    *ffuncs,
			     hb_user_data_key_t *key);


HB_EXTERN void
hb_font_funcs_make_immutable (hb_font_funcs_t *ffuncs);

HB_EXTERN hb_bool_t
hb_font_funcs_is_immutable (hb_font_funcs_t *ffuncs);


/* font and glyph extents */

/* Note that typically ascender is positive and descender negative in coordinate systems that grow up. */
typedef struct hb_font_extents_t
{
  hb_position_t ascender; /* typographic ascender. */
  hb_position_t descender; /* typographic descender. */
  hb_position_t line_gap; /* suggested line spacing gap. */
  /*< private >*/
  hb_position_t reserved9;
  hb_position_t reserved8;
  hb_position_t reserved7;
  hb_position_t reserved6;
  hb_position_t reserved5;
  hb_position_t reserved4;
  hb_position_t reserved3;
  hb_position_t reserved2;
  hb_position_t reserved1;
} hb_font_extents_t;

/* Note that height is negative in coordinate systems that grow up. */
typedef struct hb_glyph_extents_t
{
  hb_position_t x_bearing; /* left side of glyph from origin. */
  hb_position_t y_bearing; /* top side of glyph from origin. */
  hb_position_t width; /* distance from left to right side. */
  hb_position_t height; /* distance from top to bottom side. */
} hb_glyph_extents_t;

/* func types */

typedef hb_bool_t (*hb_font_get_font_extents_func_t) (hb_font_t *font, void *font_data,
						       hb_font_extents_t *extents,
						       void *user_data);
typedef hb_font_get_font_extents_func_t hb_font_get_font_h_extents_func_t;
typedef hb_font_get_font_extents_func_t hb_font_get_font_v_extents_func_t;


typedef hb_bool_t (*hb_font_get_nominal_glyph_func_t) (hb_font_t *font, void *font_data,
						       hb_codepoint_t unicode,
						       hb_codepoint_t *glyph,
						       void *user_data);
typedef hb_bool_t (*hb_font_get_variation_glyph_func_t) (hb_font_t *font, void *font_data,
							 hb_codepoint_t unicode, hb_codepoint_t variation_selector,
							 hb_codepoint_t *glyph,
							 void *user_data);

typedef unsigned int (*hb_font_get_nominal_glyphs_func_t) (hb_font_t *font, void *font_data,
							   unsigned int count,
							   const hb_codepoint_t *first_unicode,
							   unsigned int unicode_stride,
							   hb_codepoint_t *first_glyph,
							   unsigned int glyph_stride,
							   void *user_data);


typedef hb_position_t (*hb_font_get_glyph_advance_func_t) (hb_font_t *font, void *font_data,
							   hb_codepoint_t glyph,
							   void *user_data);
typedef hb_font_get_glyph_advance_func_t hb_font_get_glyph_h_advance_func_t;
typedef hb_font_get_glyph_advance_func_t hb_font_get_glyph_v_advance_func_t;

typedef void (*hb_font_get_glyph_advances_func_t) (hb_font_t* font, void* font_data,
						   unsigned int count,
						   const hb_codepoint_t *first_glyph,
						   unsigned glyph_stride,
						   hb_position_t *first_advance,
						   unsigned advance_stride,
						   void *user_data);
typedef hb_font_get_glyph_advances_func_t hb_font_get_glyph_h_advances_func_t;
typedef hb_font_get_glyph_advances_func_t hb_font_get_glyph_v_advances_func_t;

typedef hb_bool_t (*hb_font_get_glyph_origin_func_t) (hb_font_t *font, void *font_data,
						      hb_codepoint_t glyph,
						      hb_position_t *x, hb_position_t *y,
						      void *user_data);
typedef hb_font_get_glyph_origin_func_t hb_font_get_glyph_h_origin_func_t;
typedef hb_font_get_glyph_origin_func_t hb_font_get_glyph_v_origin_func_t;


typedef hb_bool_t (*hb_font_get_glyph_extents_func_t) (hb_font_t *font, void *font_data,
						       hb_codepoint_t glyph,
						       hb_glyph_extents_t *extents,
						       void *user_data);
typedef hb_bool_t (*hb_font_get_glyph_contour_point_func_t) (hb_font_t *font, void *font_data,
							     hb_codepoint_t glyph, unsigned int point_index,
							     hb_position_t *x, hb_position_t *y,
							     void *user_data);


typedef hb_bool_t (*hb_font_get_glyph_name_func_t) (hb_font_t *font, void *font_data,
						    hb_codepoint_t glyph,
						    char *name, unsigned int size,
						    void *user_data);
typedef hb_bool_t (*hb_font_get_glyph_from_name_func_t) (hb_font_t *font, void *font_data,
							 const char *name, int len, /* -1 means nul-terminated */
							 hb_codepoint_t *glyph,
							 void *user_data);


/* func setters */

/**
 * hb_font_funcs_set_font_h_extents_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 *
 *
 * Since: 1.1.2
 **/
HB_EXTERN void
hb_font_funcs_set_font_h_extents_func (hb_font_funcs_t *ffuncs,
				       hb_font_get_font_h_extents_func_t func,
				       void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_font_v_extents_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 *
 *
 * Since: 1.1.2
 **/
HB_EXTERN void
hb_font_funcs_set_font_v_extents_func (hb_font_funcs_t *ffuncs,
				       hb_font_get_font_v_extents_func_t func,
				       void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_nominal_glyph_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 1.2.3
 **/
HB_EXTERN void
hb_font_funcs_set_nominal_glyph_func (hb_font_funcs_t *ffuncs,
				      hb_font_get_nominal_glyph_func_t func,
				      void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_nominal_glyphs_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 *
 *
 * Since: 2.0.0
 **/
HB_EXTERN void
hb_font_funcs_set_nominal_glyphs_func (hb_font_funcs_t *ffuncs,
				       hb_font_get_nominal_glyphs_func_t func,
				       void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_variation_glyph_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 1.2.3
 **/
HB_EXTERN void
hb_font_funcs_set_variation_glyph_func (hb_font_funcs_t *ffuncs,
					hb_font_get_variation_glyph_func_t func,
					void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_h_advance_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_h_advance_func (hb_font_funcs_t *ffuncs,
					hb_font_get_glyph_h_advance_func_t func,
					void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_v_advance_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_v_advance_func (hb_font_funcs_t *ffuncs,
					hb_font_get_glyph_v_advance_func_t func,
					void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_h_advances_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 1.8.6
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_h_advances_func (hb_font_funcs_t *ffuncs,
					hb_font_get_glyph_h_advances_func_t func,
					void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_v_advances_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 1.8.6
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_v_advances_func (hb_font_funcs_t *ffuncs,
					hb_font_get_glyph_v_advances_func_t func,
					void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_h_origin_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_h_origin_func (hb_font_funcs_t *ffuncs,
				       hb_font_get_glyph_h_origin_func_t func,
				       void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_v_origin_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_v_origin_func (hb_font_funcs_t *ffuncs,
				       hb_font_get_glyph_v_origin_func_t func,
				       void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_extents_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_extents_func (hb_font_funcs_t *ffuncs,
				      hb_font_get_glyph_extents_func_t func,
				      void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_contour_point_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_contour_point_func (hb_font_funcs_t *ffuncs,
					    hb_font_get_glyph_contour_point_func_t func,
					    void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_name_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_name_func (hb_font_funcs_t *ffuncs,
				   hb_font_get_glyph_name_func_t func,
				   void *user_data, hb_destroy_func_t destroy);

/**
 * hb_font_funcs_set_glyph_from_name_func:
 * @ffuncs: font functions.
 * @func: (closure user_data) (destroy destroy) (scope notified):
 * @user_data:
 * @destroy:
 *
 * 
 *
 * Since: 0.9.2
 **/
HB_EXTERN void
hb_font_funcs_set_glyph_from_name_func (hb_font_funcs_t *ffuncs,
					hb_font_get_glyph_from_name_func_t func,
					void *user_data, hb_destroy_func_t destroy);

/* func dispatch */

HB_EXTERN hb_bool_t
hb_font_get_h_extents (hb_font_t *font,
		       hb_font_extents_t *extents);
HB_EXTERN hb_bool_t
hb_font_get_v_extents (hb_font_t *font,
		       hb_font_extents_t *extents);

HB_EXTERN hb_bool_t
hb_font_get_nominal_glyph (hb_font_t *font,
			   hb_codepoint_t unicode,
			   hb_codepoint_t *glyph);
HB_EXTERN hb_bool_t
hb_font_get_variation_glyph (hb_font_t *font,
			     hb_codepoint_t unicode, hb_codepoint_t variation_selector,
			     hb_codepoint_t *glyph);

HB_EXTERN hb_position_t
hb_font_get_glyph_h_advance (hb_font_t *font,
			     hb_codepoint_t glyph);
HB_EXTERN hb_position_t
hb_font_get_glyph_v_advance (hb_font_t *font,
			     hb_codepoint_t glyph);

HB_EXTERN void
hb_font_get_glyph_h_advances (hb_font_t* font,
			      unsigned int count,
			      const hb_codepoint_t *first_glyph,
			      unsigned glyph_stride,
			      hb_position_t *first_advance,
			      unsigned advance_stride);
HB_EXTERN void
hb_font_get_glyph_v_advances (hb_font_t* font,
			      unsigned int count,
			      const hb_codepoint_t *first_glyph,
			      unsigned glyph_stride,
			      hb_position_t *first_advance,
			      unsigned advance_stride);

HB_EXTERN hb_bool_t
hb_font_get_glyph_h_origin (hb_font_t *font,
			    hb_codepoint_t glyph,
			    hb_position_t *x, hb_position_t *y);
HB_EXTERN hb_bool_t
hb_font_get_glyph_v_origin (hb_font_t *font,
			    hb_codepoint_t glyph,
			    hb_position_t *x, hb_position_t *y);

HB_EXTERN hb_bool_t
hb_font_get_glyph_extents (hb_font_t *font,
			   hb_codepoint_t glyph,
			   hb_glyph_extents_t *extents);

HB_EXTERN hb_bool_t
hb_font_get_glyph_contour_point (hb_font_t *font,
				 hb_codepoint_t glyph, unsigned int point_index,
				 hb_position_t *x, hb_position_t *y);

HB_EXTERN hb_bool_t
hb_font_get_glyph_name (hb_font_t *font,
			hb_codepoint_t glyph,
			char *name, unsigned int size);
HB_EXTERN hb_bool_t
hb_font_get_glyph_from_name (hb_font_t *font,
			     const char *name, int len, /* -1 means nul-terminated */
			     hb_codepoint_t *glyph);


/* high-level funcs, with fallback */

/* Calls either hb_font_get_nominal_glyph() if variation_selector is 0,
 * otherwise calls hb_font_get_variation_glyph(). */
HB_EXTERN hb_bool_t
hb_font_get_glyph (hb_font_t *font,
		   hb_codepoint_t unicode, hb_codepoint_t variation_selector,
		   hb_codepoint_t *glyph);

HB_EXTERN void
hb_font_get_extents_for_direction (hb_font_t *font,
				   hb_direction_t direction,
				   hb_font_extents_t *extents);
HB_EXTERN void
hb_font_get_glyph_advance_for_direction (hb_font_t *font,
					 hb_codepoint_t glyph,
					 hb_direction_t direction,
					 hb_position_t *x, hb_position_t *y);
HB_EXTERN void
hb_font_get_glyph_advances_for_direction (hb_font_t* font,
					  hb_direction_t direction,
					  unsigned int count,
					  const hb_codepoint_t *first_glyph,
					  unsigned glyph_stride,
					  hb_position_t *first_advance,
					  unsigned advance_stride);
HB_EXTERN void
hb_font_get_glyph_origin_for_direction (hb_font_t *font,
					hb_codepoint_t glyph,
					hb_direction_t direction,
					hb_position_t *x, hb_position_t *y);
HB_EXTERN void
hb_font_add_glyph_origin_for_direction (hb_font_t *font,
					hb_codepoint_t glyph,
					hb_direction_t direction,
					hb_position_t *x, hb_position_t *y);
HB_EXTERN void
hb_font_subtract_glyph_origin_for_direction (hb_font_t *font,
					     hb_codepoint_t glyph,
					     hb_direction_t direction,
					     hb_position_t *x, hb_position_t *y);

HB_EXTERN hb_bool_t
hb_font_get_glyph_extents_for_origin (hb_font_t *font,
				      hb_codepoint_t glyph,
				      hb_direction_t direction,
				      hb_glyph_extents_t *extents);

HB_EXTERN hb_bool_t
hb_font_get_glyph_contour_point_for_origin (hb_font_t *font,
					    hb_codepoint_t glyph, unsigned int point_index,
					    hb_direction_t direction,
					    hb_position_t *x, hb_position_t *y);

/* Generates gidDDD if glyph has no name. */
HB_EXTERN void
hb_font_glyph_to_string (hb_font_t *font,
			 hb_codepoint_t glyph,
			 char *s, unsigned int size);
/* Parses gidDDD and uniUUUU strings automatically. */
HB_EXTERN hb_bool_t
hb_font_glyph_from_string (hb_font_t *font,
			   const char *s, int len, /* -1 means nul-terminated */
			   hb_codepoint_t *glyph);


/*
 * hb_font_t
 */

/* Fonts are very light-weight objects */

HB_EXTERN hb_font_t *
hb_font_create (hb_face_t *face);

HB_EXTERN hb_font_t *
hb_font_create_sub_font (hb_font_t *parent);

HB_EXTERN hb_font_t *
hb_font_get_empty (void);

HB_EXTERN hb_font_t *
hb_font_reference (hb_font_t *font);

HB_EXTERN void
hb_font_destroy (hb_font_t *font);

HB_EXTERN hb_bool_t
hb_font_set_user_data (hb_font_t          *font,
		       hb_user_data_key_t *key,
		       void *              data,
		       hb_destroy_func_t   destroy,
		       hb_bool_t           replace);


HB_EXTERN void *
hb_font_get_user_data (hb_font_t          *font,
		       hb_user_data_key_t *key);

HB_EXTERN void
hb_font_make_immutable (hb_font_t *font);

HB_EXTERN hb_bool_t
hb_font_is_immutable (hb_font_t *font);

HB_EXTERN void
hb_font_set_parent (hb_font_t *font,
		    hb_font_t *parent);

HB_EXTERN hb_font_t *
hb_font_get_parent (hb_font_t *font);

HB_EXTERN void
hb_font_set_face (hb_font_t *font,
		  hb_face_t *face);

HB_EXTERN hb_face_t *
hb_font_get_face (hb_font_t *font);


HB_EXTERN void
hb_font_set_funcs (hb_font_t         *font,
		   hb_font_funcs_t   *klass,
		   void              *font_data,
		   hb_destroy_func_t  destroy);

/* Be *very* careful with this function! */
HB_EXTERN void
hb_font_set_funcs_data (hb_font_t         *font,
		        void              *font_data,
		        hb_destroy_func_t  destroy);


HB_EXTERN void
hb_font_set_scale (hb_font_t *font,
		   int x_scale,
		   int y_scale);

HB_EXTERN void
hb_font_get_scale (hb_font_t *font,
		   int *x_scale,
		   int *y_scale);

/*
 * A zero value means "no hinting in that direction"
 */
HB_EXTERN void
hb_font_set_ppem (hb_font_t *font,
		  unsigned int x_ppem,
		  unsigned int y_ppem);

HB_EXTERN void
hb_font_get_ppem (hb_font_t *font,
		  unsigned int *x_ppem,
		  unsigned int *y_ppem);

/*
 * Point size per EM.  Used for optical-sizing in CoreText.
 * A value of zero means "not set".
 */
HB_EXTERN void
hb_font_set_ptem (hb_font_t *font, float ptem);

HB_EXTERN float
hb_font_get_ptem (hb_font_t *font);

HB_EXTERN void
hb_font_set_variations (hb_font_t *font,
			const hb_variation_t *variations,
			unsigned int variations_length);

HB_EXTERN void
hb_font_set_var_coords_design (hb_font_t *font,
			       const float *coords,
			       unsigned int coords_length);

HB_EXTERN void
hb_font_set_var_coords_normalized (hb_font_t *font,
				   const int *coords, /* 2.14 normalized */
				   unsigned int coords_length);

HB_EXTERN const int *
hb_font_get_var_coords_normalized (hb_font_t *font,
				   unsigned int *length);

HB_END_DECLS

#endif /* HB_FONT_H */
