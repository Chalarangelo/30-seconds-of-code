/***********************************************************

Copyright 1987, 1998  The Open Group

Permission to use, copy, modify, distribute, and sell this software and its
documentation for any purpose is hereby granted without fee, provided that
the above copyright notice appear in all copies and that both that
copyright notice and this permission notice appear in supporting
documentation.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
OPEN GROUP BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of The Open Group shall not be
used in advertising or otherwise to promote the sale, use or other dealings
in this Software without prior written authorization from The Open Group.

Copyright 1987 by Digital Equipment Corporation, Maynard, Massachusetts.

                        All Rights Reserved

Permission to use, copy, modify, and distribute this software and its
documentation for any purpose and without fee is hereby granted,
provided that the above copyright notice appear in all copies and that
both that copyright notice and this permission notice appear in
supporting documentation, and that the name of Digital not be
used in advertising or publicity pertaining to distribution of the
software without specific, written prior permission.

DIGITAL DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING
ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO EVENT SHALL
DIGITAL BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR
ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
SOFTWARE.

******************************************************************/
/*
 * Copyright © 1998, 2004 Keith Packard
 * Copyright   2007 Red Hat, Inc.
 *
 * Permission to use, copy, modify, distribute, and sell this software and its
 * documentation for any purpose is hereby granted without fee, provided that
 * the above copyright notice appear in all copies and that both that
 * copyright notice and this permission notice appear in supporting
 * documentation, and that the name of Keith Packard not be used in
 * advertising or publicity pertaining to distribution of the software without
 * specific, written prior permission.  Keith Packard makes no
 * representations about the suitability of this software for any purpose.  It
 * is provided "as is" without express or implied warranty.
 *
 * KEITH PACKARD DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE,
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO
 * EVENT SHALL KEITH PACKARD BE LIABLE FOR ANY SPECIAL, INDIRECT OR
 * CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
 * DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 * TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

#ifndef PIXMAN_H__
#define PIXMAN_H__

#include <pixman-version.h>

#ifdef  __cplusplus
#define PIXMAN_BEGIN_DECLS extern "C" {
#define PIXMAN_END_DECLS }
#else
#define PIXMAN_BEGIN_DECLS
#define PIXMAN_END_DECLS
#endif

PIXMAN_BEGIN_DECLS

/*
 * Standard integers
 */

#if !defined (PIXMAN_DONT_DEFINE_STDINT)

#if defined (_SVR4) || defined (SVR4) || defined (__OpenBSD__) || defined (_sgi) || defined (__sun) || defined (sun) || defined (__digital__) || defined (__HP_cc)
#  include <inttypes.h>
/* VS 2010 (_MSC_VER 1600) has stdint.h */
#elif defined (_MSC_VER) && _MSC_VER < 1600
typedef __int8 int8_t;
typedef unsigned __int8 uint8_t;
typedef __int16 int16_t;
typedef unsigned __int16 uint16_t;
typedef __int32 int32_t;
typedef unsigned __int32 uint32_t;
typedef __int64 int64_t;
typedef unsigned __int64 uint64_t;
#elif defined (_AIX)
#  include <sys/inttypes.h>
#else
#  include <stdint.h>
#endif

#endif

/*
 * Boolean
 */
typedef int pixman_bool_t;

/*
 * Fixpoint numbers
 */
typedef int64_t			pixman_fixed_32_32_t;
typedef pixman_fixed_32_32_t	pixman_fixed_48_16_t;
typedef uint32_t		pixman_fixed_1_31_t;
typedef uint32_t		pixman_fixed_1_16_t;
typedef int32_t			pixman_fixed_16_16_t;
typedef pixman_fixed_16_16_t	pixman_fixed_t;

#define pixman_fixed_e			((pixman_fixed_t) 1)
#define pixman_fixed_1			(pixman_int_to_fixed(1))
#define pixman_fixed_1_minus_e		(pixman_fixed_1 - pixman_fixed_e)
#define pixman_fixed_minus_1		(pixman_int_to_fixed(-1))
#define pixman_fixed_to_int(f)		((int) ((f) >> 16))
#define pixman_int_to_fixed(i)		((pixman_fixed_t) ((i) << 16))
#define pixman_fixed_to_double(f)	(double) ((f) / (double) pixman_fixed_1)
#define pixman_double_to_fixed(d)	((pixman_fixed_t) ((d) * 65536.0))
#define pixman_fixed_frac(f)		((f) & pixman_fixed_1_minus_e)
#define pixman_fixed_floor(f)		((f) & ~pixman_fixed_1_minus_e)
#define pixman_fixed_ceil(f)		pixman_fixed_floor ((f) + pixman_fixed_1_minus_e)
#define pixman_fixed_fraction(f)	((f) & pixman_fixed_1_minus_e)
#define pixman_fixed_mod_2(f)		((f) & (pixman_fixed1 | pixman_fixed_1_minus_e))
#define pixman_max_fixed_48_16		((pixman_fixed_48_16_t) 0x7fffffff)
#define pixman_min_fixed_48_16		(-((pixman_fixed_48_16_t) 1 << 31))

/*
 * Misc structs
 */
typedef struct pixman_color pixman_color_t;
typedef struct pixman_point_fixed pixman_point_fixed_t;
typedef struct pixman_line_fixed pixman_line_fixed_t;
typedef struct pixman_vector pixman_vector_t;
typedef struct pixman_transform pixman_transform_t;

struct pixman_color
{
    uint16_t	red;
    uint16_t    green;
    uint16_t    blue;
    uint16_t    alpha;
};

struct pixman_point_fixed
{
    pixman_fixed_t	x;
    pixman_fixed_t	y;
};

struct pixman_line_fixed
{
    pixman_point_fixed_t	p1, p2;
};

/*
 * Fixed point matrices
 */

struct pixman_vector
{
    pixman_fixed_t	vector[3];
};

struct pixman_transform
{
    pixman_fixed_t	matrix[3][3];
};

/* forward declaration (sorry) */
struct pixman_box16;
typedef  union pixman_image		pixman_image_t;

void          pixman_transform_init_identity    (struct pixman_transform       *matrix);
pixman_bool_t pixman_transform_point_3d         (const struct pixman_transform *transform,
						 struct pixman_vector          *vector);
pixman_bool_t pixman_transform_point            (const struct pixman_transform *transform,
						 struct pixman_vector          *vector);
pixman_bool_t pixman_transform_multiply         (struct pixman_transform       *dst,
						 const struct pixman_transform *l,
						 const struct pixman_transform *r);
void          pixman_transform_init_scale       (struct pixman_transform       *t,
						 pixman_fixed_t                 sx,
						 pixman_fixed_t                 sy);
pixman_bool_t pixman_transform_scale            (struct pixman_transform       *forward,
						 struct pixman_transform       *reverse,
						 pixman_fixed_t                 sx,
						 pixman_fixed_t                 sy);
void          pixman_transform_init_rotate      (struct pixman_transform       *t,
						 pixman_fixed_t                 cos,
						 pixman_fixed_t                 sin);
pixman_bool_t pixman_transform_rotate           (struct pixman_transform       *forward,
						 struct pixman_transform       *reverse,
						 pixman_fixed_t                 c,
						 pixman_fixed_t                 s);
void          pixman_transform_init_translate   (struct pixman_transform       *t,
						 pixman_fixed_t                 tx,
						 pixman_fixed_t                 ty);
pixman_bool_t pixman_transform_translate        (struct pixman_transform       *forward,
						 struct pixman_transform       *reverse,
						 pixman_fixed_t                 tx,
						 pixman_fixed_t                 ty);
pixman_bool_t pixman_transform_bounds           (const struct pixman_transform *matrix,
						 struct pixman_box16           *b);
pixman_bool_t pixman_transform_invert           (struct pixman_transform       *dst,
						 const struct pixman_transform *src);
pixman_bool_t pixman_transform_is_identity      (const struct pixman_transform *t);
pixman_bool_t pixman_transform_is_scale         (const struct pixman_transform *t);
pixman_bool_t pixman_transform_is_int_translate (const struct pixman_transform *t);
pixman_bool_t pixman_transform_is_inverse       (const struct pixman_transform *a,
						 const struct pixman_transform *b);

/*
 * Floating point matrices
 */
typedef struct pixman_f_transform pixman_f_transform_t;
typedef struct pixman_f_vector pixman_f_vector_t;

struct pixman_f_vector
{
    double  v[3];
};

struct pixman_f_transform
{
    double  m[3][3];
};

pixman_bool_t pixman_transform_from_pixman_f_transform (struct pixman_transform         *t,
							const struct pixman_f_transform *ft);
void          pixman_f_transform_from_pixman_transform (struct pixman_f_transform       *ft,
							const struct pixman_transform   *t);
pixman_bool_t pixman_f_transform_invert                (struct pixman_f_transform       *dst,
							const struct pixman_f_transform *src);
pixman_bool_t pixman_f_transform_point                 (const struct pixman_f_transform *t,
							struct pixman_f_vector          *v);
void          pixman_f_transform_point_3d              (const struct pixman_f_transform *t,
							struct pixman_f_vector          *v);
void          pixman_f_transform_multiply              (struct pixman_f_transform       *dst,
							const struct pixman_f_transform *l,
							const struct pixman_f_transform *r);
void          pixman_f_transform_init_scale            (struct pixman_f_transform       *t,
							double                           sx,
							double                           sy);
pixman_bool_t pixman_f_transform_scale                 (struct pixman_f_transform       *forward,
							struct pixman_f_transform       *reverse,
							double                           sx,
							double                           sy);
void          pixman_f_transform_init_rotate           (struct pixman_f_transform       *t,
							double                           cos,
							double                           sin);
pixman_bool_t pixman_f_transform_rotate                (struct pixman_f_transform       *forward,
							struct pixman_f_transform       *reverse,
							double                           c,
							double                           s);
void          pixman_f_transform_init_translate        (struct pixman_f_transform       *t,
							double                           tx,
							double                           ty);
pixman_bool_t pixman_f_transform_translate             (struct pixman_f_transform       *forward,
							struct pixman_f_transform       *reverse,
							double                           tx,
							double                           ty);
pixman_bool_t pixman_f_transform_bounds                (const struct pixman_f_transform *t,
							struct pixman_box16             *b);
void          pixman_f_transform_init_identity         (struct pixman_f_transform       *t);

typedef enum
{
    PIXMAN_REPEAT_NONE,
    PIXMAN_REPEAT_NORMAL,
    PIXMAN_REPEAT_PAD,
    PIXMAN_REPEAT_REFLECT
} pixman_repeat_t;

typedef enum
{
    PIXMAN_FILTER_FAST,
    PIXMAN_FILTER_GOOD,
    PIXMAN_FILTER_BEST,
    PIXMAN_FILTER_NEAREST,
    PIXMAN_FILTER_BILINEAR,
    PIXMAN_FILTER_CONVOLUTION,

    /* The SEPARABLE_CONVOLUTION filter takes the following parameters:
     *
     *         width:           integer given as 16.16 fixpoint number
     *         height:          integer given as 16.16 fixpoint number
     *         x_phase_bits:	integer given as 16.16 fixpoint
     *         y_phase_bits:	integer given as 16.16 fixpoint
     *         xtables:         (1 << x_phase_bits) tables of size width
     *         ytables:         (1 << y_phase_bits) tables of size height
     *
     * When sampling at (x, y), the location is first rounded to one of
     * n_x_phases * n_y_phases subpixel positions. These subpixel positions
     * determine an xtable and a ytable to use.
     *
     * Conceptually a width x height matrix is then formed in which each entry
     * is the product of the corresponding entries in the x and y tables.
     * This matrix is then aligned with the image pixels such that its center
     * is as close as possible to the subpixel location chosen earlier. Then
     * the image is convolved with the matrix and the resulting pixel returned.
     */
    PIXMAN_FILTER_SEPARABLE_CONVOLUTION
} pixman_filter_t;

typedef enum
{
    PIXMAN_OP_CLEAR			= 0x00,
    PIXMAN_OP_SRC			= 0x01,
    PIXMAN_OP_DST			= 0x02,
    PIXMAN_OP_OVER			= 0x03,
    PIXMAN_OP_OVER_REVERSE		= 0x04,
    PIXMAN_OP_IN			= 0x05,
    PIXMAN_OP_IN_REVERSE		= 0x06,
    PIXMAN_OP_OUT			= 0x07,
    PIXMAN_OP_OUT_REVERSE		= 0x08,
    PIXMAN_OP_ATOP			= 0x09,
    PIXMAN_OP_ATOP_REVERSE		= 0x0a,
    PIXMAN_OP_XOR			= 0x0b,
    PIXMAN_OP_ADD			= 0x0c,
    PIXMAN_OP_SATURATE			= 0x0d,

    PIXMAN_OP_DISJOINT_CLEAR		= 0x10,
    PIXMAN_OP_DISJOINT_SRC		= 0x11,
    PIXMAN_OP_DISJOINT_DST		= 0x12,
    PIXMAN_OP_DISJOINT_OVER		= 0x13,
    PIXMAN_OP_DISJOINT_OVER_REVERSE	= 0x14,
    PIXMAN_OP_DISJOINT_IN		= 0x15,
    PIXMAN_OP_DISJOINT_IN_REVERSE	= 0x16,
    PIXMAN_OP_DISJOINT_OUT		= 0x17,
    PIXMAN_OP_DISJOINT_OUT_REVERSE	= 0x18,
    PIXMAN_OP_DISJOINT_ATOP		= 0x19,
    PIXMAN_OP_DISJOINT_ATOP_REVERSE	= 0x1a,
    PIXMAN_OP_DISJOINT_XOR		= 0x1b,

    PIXMAN_OP_CONJOINT_CLEAR		= 0x20,
    PIXMAN_OP_CONJOINT_SRC		= 0x21,
    PIXMAN_OP_CONJOINT_DST		= 0x22,
    PIXMAN_OP_CONJOINT_OVER		= 0x23,
    PIXMAN_OP_CONJOINT_OVER_REVERSE	= 0x24,
    PIXMAN_OP_CONJOINT_IN		= 0x25,
    PIXMAN_OP_CONJOINT_IN_REVERSE	= 0x26,
    PIXMAN_OP_CONJOINT_OUT		= 0x27,
    PIXMAN_OP_CONJOINT_OUT_REVERSE	= 0x28,
    PIXMAN_OP_CONJOINT_ATOP		= 0x29,
    PIXMAN_OP_CONJOINT_ATOP_REVERSE	= 0x2a,
    PIXMAN_OP_CONJOINT_XOR		= 0x2b,

    PIXMAN_OP_MULTIPLY                  = 0x30,
    PIXMAN_OP_SCREEN                    = 0x31,
    PIXMAN_OP_OVERLAY                   = 0x32,
    PIXMAN_OP_DARKEN                    = 0x33,
    PIXMAN_OP_LIGHTEN                   = 0x34,
    PIXMAN_OP_COLOR_DODGE               = 0x35,
    PIXMAN_OP_COLOR_BURN                = 0x36,
    PIXMAN_OP_HARD_LIGHT                = 0x37,
    PIXMAN_OP_SOFT_LIGHT                = 0x38,
    PIXMAN_OP_DIFFERENCE                = 0x39,
    PIXMAN_OP_EXCLUSION                 = 0x3a,
    PIXMAN_OP_HSL_HUE			= 0x3b,
    PIXMAN_OP_HSL_SATURATION		= 0x3c,
    PIXMAN_OP_HSL_COLOR			= 0x3d,
    PIXMAN_OP_HSL_LUMINOSITY		= 0x3e

#ifdef PIXMAN_USE_INTERNAL_API
    ,
    PIXMAN_N_OPERATORS,
    PIXMAN_OP_NONE = PIXMAN_N_OPERATORS
#endif
} pixman_op_t;

/*
 * Regions
 */
typedef struct pixman_region16_data	pixman_region16_data_t;
typedef struct pixman_box16		pixman_box16_t;
typedef struct pixman_rectangle16	pixman_rectangle16_t;
typedef struct pixman_region16		pixman_region16_t;

struct pixman_region16_data {
    long		size;
    long		numRects;
/*  pixman_box16_t	rects[size];   in memory but not explicitly declared */
};

struct pixman_rectangle16
{
    int16_t	x, y;
    uint16_t	width, height;
};

struct pixman_box16
{
    int16_t x1, y1, x2, y2;
};

struct pixman_region16
{
    pixman_box16_t          extents;
    pixman_region16_data_t *data;
};

typedef enum
{
    PIXMAN_REGION_OUT,
    PIXMAN_REGION_IN,
    PIXMAN_REGION_PART
} pixman_region_overlap_t;

/* This function exists only to make it possible to preserve
 * the X ABI - it should go away at first opportunity.
 */
void pixman_region_set_static_pointers (pixman_box16_t         *empty_box,
					pixman_region16_data_t *empty_data,
					pixman_region16_data_t *broken_data);

/* creation/destruction */
void                    pixman_region_init               (pixman_region16_t *region);
void                    pixman_region_init_rect          (pixman_region16_t *region,
							  int                x,
							  int                y,
							  unsigned int       width,
							  unsigned int       height);
pixman_bool_t           pixman_region_init_rects         (pixman_region16_t *region,
							  const pixman_box16_t *boxes,
							  int                count);
void                    pixman_region_init_with_extents  (pixman_region16_t *region,
							  pixman_box16_t    *extents);
void                    pixman_region_init_from_image    (pixman_region16_t *region,
							  pixman_image_t    *image);
void                    pixman_region_fini               (pixman_region16_t *region);


/* manipulation */
void                    pixman_region_translate          (pixman_region16_t *region,
							  int                x,
							  int                y);
pixman_bool_t           pixman_region_copy               (pixman_region16_t *dest,
							  pixman_region16_t *source);
pixman_bool_t           pixman_region_intersect          (pixman_region16_t *new_reg,
							  pixman_region16_t *reg1,
							  pixman_region16_t *reg2);
pixman_bool_t           pixman_region_union              (pixman_region16_t *new_reg,
							  pixman_region16_t *reg1,
							  pixman_region16_t *reg2);
pixman_bool_t           pixman_region_union_rect         (pixman_region16_t *dest,
							  pixman_region16_t *source,
							  int                x,
							  int                y,
							  unsigned int       width,
							  unsigned int       height);
pixman_bool_t		pixman_region_intersect_rect     (pixman_region16_t *dest,
							  pixman_region16_t *source,
							  int                x,
							  int                y,
							  unsigned int       width,
							  unsigned int       height);
pixman_bool_t           pixman_region_subtract           (pixman_region16_t *reg_d,
							  pixman_region16_t *reg_m,
							  pixman_region16_t *reg_s);
pixman_bool_t           pixman_region_inverse            (pixman_region16_t *new_reg,
							  pixman_region16_t *reg1,
							  pixman_box16_t    *inv_rect);
pixman_bool_t           pixman_region_contains_point     (pixman_region16_t *region,
							  int                x,
							  int                y,
							  pixman_box16_t    *box);
pixman_region_overlap_t pixman_region_contains_rectangle (pixman_region16_t *region,
							  pixman_box16_t    *prect);
pixman_bool_t           pixman_region_not_empty          (pixman_region16_t *region);
pixman_box16_t *        pixman_region_extents            (pixman_region16_t *region);
int                     pixman_region_n_rects            (pixman_region16_t *region);
pixman_box16_t *        pixman_region_rectangles         (pixman_region16_t *region,
							  int               *n_rects);
pixman_bool_t           pixman_region_equal              (pixman_region16_t *region1,
							  pixman_region16_t *region2);
pixman_bool_t           pixman_region_selfcheck          (pixman_region16_t *region);
void                    pixman_region_reset              (pixman_region16_t *region,
							  pixman_box16_t    *box);
void			pixman_region_clear		 (pixman_region16_t *region);
/*
 * 32 bit regions
 */
typedef struct pixman_region32_data	pixman_region32_data_t;
typedef struct pixman_box32		pixman_box32_t;
typedef struct pixman_rectangle32	pixman_rectangle32_t;
typedef struct pixman_region32		pixman_region32_t;

struct pixman_region32_data {
    long		size;
    long		numRects;
/*  pixman_box32_t	rects[size];   in memory but not explicitly declared */
};

struct pixman_rectangle32
{
    int32_t x, y;
    uint32_t width, height;
};

struct pixman_box32
{
    int32_t x1, y1, x2, y2;
};

struct pixman_region32
{
    pixman_box32_t          extents;
    pixman_region32_data_t  *data;
};

/* creation/destruction */
void                    pixman_region32_init               (pixman_region32_t *region);
void                    pixman_region32_init_rect          (pixman_region32_t *region,
							    int                x,
							    int                y,
							    unsigned int       width,
							    unsigned int       height);
pixman_bool_t           pixman_region32_init_rects         (pixman_region32_t *region,
							    const pixman_box32_t *boxes,
							    int                count);
void                    pixman_region32_init_with_extents  (pixman_region32_t *region,
							    pixman_box32_t    *extents);
void                    pixman_region32_init_from_image    (pixman_region32_t *region,
							    pixman_image_t    *image);
void                    pixman_region32_fini               (pixman_region32_t *region);


/* manipulation */
void                    pixman_region32_translate          (pixman_region32_t *region,
							    int                x,
							    int                y);
pixman_bool_t           pixman_region32_copy               (pixman_region32_t *dest,
							    pixman_region32_t *source);
pixman_bool_t           pixman_region32_intersect          (pixman_region32_t *new_reg,
							    pixman_region32_t *reg1,
							    pixman_region32_t *reg2);
pixman_bool_t           pixman_region32_union              (pixman_region32_t *new_reg,
							    pixman_region32_t *reg1,
							    pixman_region32_t *reg2);
pixman_bool_t		pixman_region32_intersect_rect     (pixman_region32_t *dest,
							    pixman_region32_t *source,
							    int                x,
							    int                y,
							    unsigned int       width,
							    unsigned int       height);
pixman_bool_t           pixman_region32_union_rect         (pixman_region32_t *dest,
							    pixman_region32_t *source,
							    int                x,
							    int                y,
							    unsigned int       width,
							    unsigned int       height);
pixman_bool_t           pixman_region32_subtract           (pixman_region32_t *reg_d,
							    pixman_region32_t *reg_m,
							    pixman_region32_t *reg_s);
pixman_bool_t           pixman_region32_inverse            (pixman_region32_t *new_reg,
							    pixman_region32_t *reg1,
							    pixman_box32_t    *inv_rect);
pixman_bool_t           pixman_region32_contains_point     (pixman_region32_t *region,
							    int                x,
							    int                y,
							    pixman_box32_t    *box);
pixman_region_overlap_t pixman_region32_contains_rectangle (pixman_region32_t *region,
							    pixman_box32_t    *prect);
pixman_bool_t           pixman_region32_not_empty          (pixman_region32_t *region);
pixman_box32_t *        pixman_region32_extents            (pixman_region32_t *region);
int                     pixman_region32_n_rects            (pixman_region32_t *region);
pixman_box32_t *        pixman_region32_rectangles         (pixman_region32_t *region,
							    int               *n_rects);
pixman_bool_t           pixman_region32_equal              (pixman_region32_t *region1,
							    pixman_region32_t *region2);
pixman_bool_t           pixman_region32_selfcheck          (pixman_region32_t *region);
void                    pixman_region32_reset              (pixman_region32_t *region,
							    pixman_box32_t    *box);
void			pixman_region32_clear		   (pixman_region32_t *region);


/* Copy / Fill / Misc */
pixman_bool_t pixman_blt                (uint32_t           *src_bits,
					 uint32_t           *dst_bits,
					 int                 src_stride,
					 int                 dst_stride,
					 int                 src_bpp,
					 int                 dst_bpp,
					 int                 src_x,
					 int                 src_y,
					 int                 dest_x,
					 int                 dest_y,
					 int                 width,
					 int                 height);
pixman_bool_t pixman_fill               (uint32_t           *bits,
					 int                 stride,
					 int                 bpp,
					 int                 x,
					 int                 y,
					 int                 width,
					 int                 height,
					 uint32_t            _xor);

int           pixman_version            (void);
const char*   pixman_version_string     (void);

/*
 * Images
 */
typedef struct pixman_indexed		pixman_indexed_t;
typedef struct pixman_gradient_stop	pixman_gradient_stop_t;

typedef uint32_t (* pixman_read_memory_func_t) (const void *src, int size);
typedef void     (* pixman_write_memory_func_t) (void *dst, uint32_t value, int size);

typedef void     (* pixman_image_destroy_func_t) (pixman_image_t *image, void *data);

struct pixman_gradient_stop {
    pixman_fixed_t x;
    pixman_color_t color;
};

#define PIXMAN_MAX_INDEXED  256 /* XXX depth must be <= 8 */

#if PIXMAN_MAX_INDEXED <= 256
typedef uint8_t pixman_index_type;
#endif

struct pixman_indexed
{
    pixman_bool_t       color;
    uint32_t		rgba[PIXMAN_MAX_INDEXED];
    pixman_index_type	ent[32768];
};

/*
 * While the protocol is generous in format support, the
 * sample implementation allows only packed RGB and GBR
 * representations for data to simplify software rendering,
 */
#define PIXMAN_FORMAT(bpp,type,a,r,g,b)	(((bpp) << 24) |  \
					 ((type) << 16) | \
					 ((a) << 12) |	  \
					 ((r) << 8) |	  \
					 ((g) << 4) |	  \
					 ((b)))

#define PIXMAN_FORMAT_BYTE(bpp,type,a,r,g,b) \
	(((bpp >> 3) << 24) | \
	(3 << 22) | ((type) << 16) | \
	((a >> 3) << 12) | \
	((r >> 3) << 8) | \
	((g >> 3) << 4) | \
	((b >> 3)))

#define PIXMAN_FORMAT_RESHIFT(val, ofs, num) \
	(((val >> (ofs)) & ((1 << (num)) - 1)) << ((val >> 22) & 3))

#define PIXMAN_FORMAT_BPP(f)	PIXMAN_FORMAT_RESHIFT(f, 24, 8)
#define PIXMAN_FORMAT_SHIFT(f)	((uint32_t)((f >> 22) & 3))
#define PIXMAN_FORMAT_TYPE(f)	(((f) >> 16) & 0x3f)
#define PIXMAN_FORMAT_A(f)	PIXMAN_FORMAT_RESHIFT(f, 12, 4)
#define PIXMAN_FORMAT_R(f)	PIXMAN_FORMAT_RESHIFT(f, 8, 4)
#define PIXMAN_FORMAT_G(f)	PIXMAN_FORMAT_RESHIFT(f, 4, 4)
#define PIXMAN_FORMAT_B(f)	PIXMAN_FORMAT_RESHIFT(f, 0, 4)
#define PIXMAN_FORMAT_RGB(f)	(((f)      ) & 0xfff)
#define PIXMAN_FORMAT_VIS(f)	(((f)      ) & 0xffff)
#define PIXMAN_FORMAT_DEPTH(f)	(PIXMAN_FORMAT_A(f) +	\
				 PIXMAN_FORMAT_R(f) +	\
				 PIXMAN_FORMAT_G(f) +	\
				 PIXMAN_FORMAT_B(f))

#define PIXMAN_TYPE_OTHER	0
#define PIXMAN_TYPE_A		1
#define PIXMAN_TYPE_ARGB	2
#define PIXMAN_TYPE_ABGR	3
#define PIXMAN_TYPE_COLOR	4
#define PIXMAN_TYPE_GRAY	5
#define PIXMAN_TYPE_YUY2	6
#define PIXMAN_TYPE_YV12	7
#define PIXMAN_TYPE_BGRA	8
#define PIXMAN_TYPE_RGBA	9
#define PIXMAN_TYPE_ARGB_SRGB	10
#define PIXMAN_TYPE_RGBA_FLOAT	11

#define PIXMAN_FORMAT_COLOR(f)				\
	(PIXMAN_FORMAT_TYPE(f) == PIXMAN_TYPE_ARGB ||	\
	 PIXMAN_FORMAT_TYPE(f) == PIXMAN_TYPE_ABGR ||	\
	 PIXMAN_FORMAT_TYPE(f) == PIXMAN_TYPE_BGRA ||	\
	 PIXMAN_FORMAT_TYPE(f) == PIXMAN_TYPE_RGBA ||	\
	 PIXMAN_FORMAT_TYPE(f) == PIXMAN_TYPE_RGBA_FLOAT)

typedef enum {
/* 128bpp formats */
    PIXMAN_rgba_float =	PIXMAN_FORMAT_BYTE(128,PIXMAN_TYPE_RGBA_FLOAT,32,32,32,32),
/* 96bpp formats */
    PIXMAN_rgb_float =	PIXMAN_FORMAT_BYTE(96,PIXMAN_TYPE_RGBA_FLOAT,0,32,32,32),

/* 32bpp formats */
    PIXMAN_a8r8g8b8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_ARGB,8,8,8,8),
    PIXMAN_x8r8g8b8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_ARGB,0,8,8,8),
    PIXMAN_a8b8g8r8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_ABGR,8,8,8,8),
    PIXMAN_x8b8g8r8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_ABGR,0,8,8,8),
    PIXMAN_b8g8r8a8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_BGRA,8,8,8,8),
    PIXMAN_b8g8r8x8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_BGRA,0,8,8,8),
    PIXMAN_r8g8b8a8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_RGBA,8,8,8,8),
    PIXMAN_r8g8b8x8 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_RGBA,0,8,8,8),
    PIXMAN_x14r6g6b6 =	 PIXMAN_FORMAT(32,PIXMAN_TYPE_ARGB,0,6,6,6),
    PIXMAN_x2r10g10b10 = PIXMAN_FORMAT(32,PIXMAN_TYPE_ARGB,0,10,10,10),
    PIXMAN_a2r10g10b10 = PIXMAN_FORMAT(32,PIXMAN_TYPE_ARGB,2,10,10,10),
    PIXMAN_x2b10g10r10 = PIXMAN_FORMAT(32,PIXMAN_TYPE_ABGR,0,10,10,10),
    PIXMAN_a2b10g10r10 = PIXMAN_FORMAT(32,PIXMAN_TYPE_ABGR,2,10,10,10),

/* sRGB formats */
    PIXMAN_a8r8g8b8_sRGB = PIXMAN_FORMAT(32,PIXMAN_TYPE_ARGB_SRGB,8,8,8,8),

/* 24bpp formats */
    PIXMAN_r8g8b8 =	 PIXMAN_FORMAT(24,PIXMAN_TYPE_ARGB,0,8,8,8),
    PIXMAN_b8g8r8 =	 PIXMAN_FORMAT(24,PIXMAN_TYPE_ABGR,0,8,8,8),

/* 16bpp formats */
    PIXMAN_r5g6b5 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ARGB,0,5,6,5),
    PIXMAN_b5g6r5 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ABGR,0,5,6,5),

    PIXMAN_a1r5g5b5 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ARGB,1,5,5,5),
    PIXMAN_x1r5g5b5 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ARGB,0,5,5,5),
    PIXMAN_a1b5g5r5 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ABGR,1,5,5,5),
    PIXMAN_x1b5g5r5 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ABGR,0,5,5,5),
    PIXMAN_a4r4g4b4 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ARGB,4,4,4,4),
    PIXMAN_x4r4g4b4 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ARGB,0,4,4,4),
    PIXMAN_a4b4g4r4 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ABGR,4,4,4,4),
    PIXMAN_x4b4g4r4 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_ABGR,0,4,4,4),

/* 8bpp formats */
    PIXMAN_a8 =		 PIXMAN_FORMAT(8,PIXMAN_TYPE_A,8,0,0,0),
    PIXMAN_r3g3b2 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_ARGB,0,3,3,2),
    PIXMAN_b2g3r3 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_ABGR,0,3,3,2),
    PIXMAN_a2r2g2b2 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_ARGB,2,2,2,2),
    PIXMAN_a2b2g2r2 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_ABGR,2,2,2,2),

    PIXMAN_c8 =		 PIXMAN_FORMAT(8,PIXMAN_TYPE_COLOR,0,0,0,0),
    PIXMAN_g8 =		 PIXMAN_FORMAT(8,PIXMAN_TYPE_GRAY,0,0,0,0),

    PIXMAN_x4a4 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_A,4,0,0,0),

    PIXMAN_x4c4 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_COLOR,0,0,0,0),
    PIXMAN_x4g4 =	 PIXMAN_FORMAT(8,PIXMAN_TYPE_GRAY,0,0,0,0),

/* 4bpp formats */
    PIXMAN_a4 =		 PIXMAN_FORMAT(4,PIXMAN_TYPE_A,4,0,0,0),
    PIXMAN_r1g2b1 =	 PIXMAN_FORMAT(4,PIXMAN_TYPE_ARGB,0,1,2,1),
    PIXMAN_b1g2r1 =	 PIXMAN_FORMAT(4,PIXMAN_TYPE_ABGR,0,1,2,1),
    PIXMAN_a1r1g1b1 =	 PIXMAN_FORMAT(4,PIXMAN_TYPE_ARGB,1,1,1,1),
    PIXMAN_a1b1g1r1 =	 PIXMAN_FORMAT(4,PIXMAN_TYPE_ABGR,1,1,1,1),

    PIXMAN_c4 =		 PIXMAN_FORMAT(4,PIXMAN_TYPE_COLOR,0,0,0,0),
    PIXMAN_g4 =		 PIXMAN_FORMAT(4,PIXMAN_TYPE_GRAY,0,0,0,0),

/* 1bpp formats */
    PIXMAN_a1 =		 PIXMAN_FORMAT(1,PIXMAN_TYPE_A,1,0,0,0),

    PIXMAN_g1 =		 PIXMAN_FORMAT(1,PIXMAN_TYPE_GRAY,0,0,0,0),

/* YUV formats */
    PIXMAN_yuy2 =	 PIXMAN_FORMAT(16,PIXMAN_TYPE_YUY2,0,0,0,0),
    PIXMAN_yv12 =	 PIXMAN_FORMAT(12,PIXMAN_TYPE_YV12,0,0,0,0)
} pixman_format_code_t;

/* Querying supported format values. */
pixman_bool_t pixman_format_supported_destination (pixman_format_code_t format);
pixman_bool_t pixman_format_supported_source      (pixman_format_code_t format);

/* Constructors */
pixman_image_t *pixman_image_create_solid_fill       (const pixman_color_t         *color);
pixman_image_t *pixman_image_create_linear_gradient  (const pixman_point_fixed_t   *p1,
						      const pixman_point_fixed_t   *p2,
						      const pixman_gradient_stop_t *stops,
						      int                           n_stops);
pixman_image_t *pixman_image_create_radial_gradient  (const pixman_point_fixed_t   *inner,
						      const pixman_point_fixed_t   *outer,
						      pixman_fixed_t                inner_radius,
						      pixman_fixed_t                outer_radius,
						      const pixman_gradient_stop_t *stops,
						      int                           n_stops);
pixman_image_t *pixman_image_create_conical_gradient (const pixman_point_fixed_t   *center,
						      pixman_fixed_t                angle,
						      const pixman_gradient_stop_t *stops,
						      int                           n_stops);
pixman_image_t *pixman_image_create_bits             (pixman_format_code_t          format,
						      int                           width,
						      int                           height,
						      uint32_t                     *bits,
						      int                           rowstride_bytes);
pixman_image_t *pixman_image_create_bits_no_clear    (pixman_format_code_t format,
						      int                  width,
						      int                  height,
						      uint32_t *           bits,
						      int                  rowstride_bytes);

/* Destructor */
pixman_image_t *pixman_image_ref                     (pixman_image_t               *image);
pixman_bool_t   pixman_image_unref                   (pixman_image_t               *image);

void		pixman_image_set_destroy_function    (pixman_image_t		   *image,
						      pixman_image_destroy_func_t   function,
						      void			   *data);
void *		pixman_image_get_destroy_data        (pixman_image_t		   *image);

/* Set properties */
pixman_bool_t   pixman_image_set_clip_region         (pixman_image_t               *image,
						      pixman_region16_t            *region);
pixman_bool_t   pixman_image_set_clip_region32       (pixman_image_t               *image,
						      pixman_region32_t            *region);
void		pixman_image_set_has_client_clip     (pixman_image_t               *image,
						      pixman_bool_t		    clien_clip);
pixman_bool_t   pixman_image_set_transform           (pixman_image_t               *image,
						      const pixman_transform_t     *transform);
void            pixman_image_set_repeat              (pixman_image_t               *image,
						      pixman_repeat_t               repeat);
pixman_bool_t   pixman_image_set_filter              (pixman_image_t               *image,
						      pixman_filter_t               filter,
						      const pixman_fixed_t         *filter_params,
						      int                           n_filter_params);
void		pixman_image_set_source_clipping     (pixman_image_t		   *image,
						      pixman_bool_t                 source_clipping);
void            pixman_image_set_alpha_map           (pixman_image_t               *image,
						      pixman_image_t               *alpha_map,
						      int16_t                       x,
						      int16_t                       y);
void            pixman_image_set_component_alpha     (pixman_image_t               *image,
						      pixman_bool_t                 component_alpha);
pixman_bool_t   pixman_image_get_component_alpha     (pixman_image_t               *image);
void		pixman_image_set_accessors	     (pixman_image_t		   *image,
						      pixman_read_memory_func_t	    read_func,
						      pixman_write_memory_func_t    write_func);
void		pixman_image_set_indexed	     (pixman_image_t		   *image,
						      const pixman_indexed_t	   *indexed);
uint32_t       *pixman_image_get_data                (pixman_image_t               *image);
int		pixman_image_get_width               (pixman_image_t               *image);
int             pixman_image_get_height              (pixman_image_t               *image);
int		pixman_image_get_stride              (pixman_image_t               *image); /* in bytes */
int		pixman_image_get_depth               (pixman_image_t		   *image);
pixman_format_code_t pixman_image_get_format	     (pixman_image_t		   *image);

typedef enum
{
    PIXMAN_KERNEL_IMPULSE,
    PIXMAN_KERNEL_BOX,
    PIXMAN_KERNEL_LINEAR,
    PIXMAN_KERNEL_CUBIC,
    PIXMAN_KERNEL_GAUSSIAN,
    PIXMAN_KERNEL_LANCZOS2,
    PIXMAN_KERNEL_LANCZOS3,
    PIXMAN_KERNEL_LANCZOS3_STRETCHED       /* Jim Blinn's 'nice' filter */
} pixman_kernel_t;

/* Create the parameter list for a SEPARABLE_CONVOLUTION filter
 * with the given kernels and scale parameters.
 */
pixman_fixed_t *
pixman_filter_create_separable_convolution (int             *n_values,
					    pixman_fixed_t   scale_x,
					    pixman_fixed_t   scale_y,
					    pixman_kernel_t  reconstruct_x,
					    pixman_kernel_t  reconstruct_y,
					    pixman_kernel_t  sample_x,
					    pixman_kernel_t  sample_y,
					    int              subsample_bits_x,
					    int              subsample_bits_y);

pixman_bool_t	pixman_image_fill_rectangles	     (pixman_op_t		    op,
						      pixman_image_t		   *image,
						      const pixman_color_t	   *color,
						      int			    n_rects,
						      const pixman_rectangle16_t   *rects);
pixman_bool_t   pixman_image_fill_boxes              (pixman_op_t                   op,
                                                      pixman_image_t               *dest,
                                                      const pixman_color_t         *color,
                                                      int                           n_boxes,
                                                      const pixman_box32_t         *boxes);

/* Composite */
pixman_bool_t pixman_compute_composite_region (pixman_region16_t *region,
					       pixman_image_t    *src_image,
					       pixman_image_t    *mask_image,
					       pixman_image_t    *dest_image,
					       int16_t            src_x,
					       int16_t            src_y,
					       int16_t            mask_x,
					       int16_t            mask_y,
					       int16_t            dest_x,
					       int16_t            dest_y,
					       uint16_t           width,
					       uint16_t           height);
void          pixman_image_composite          (pixman_op_t        op,
					       pixman_image_t    *src,
					       pixman_image_t    *mask,
					       pixman_image_t    *dest,
					       int16_t            src_x,
					       int16_t            src_y,
					       int16_t            mask_x,
					       int16_t            mask_y,
					       int16_t            dest_x,
					       int16_t            dest_y,
					       uint16_t           width,
					       uint16_t           height);
void          pixman_image_composite32        (pixman_op_t        op,
					       pixman_image_t    *src,
					       pixman_image_t    *mask,
					       pixman_image_t    *dest,
					       int32_t            src_x,
					       int32_t            src_y,
					       int32_t            mask_x,
					       int32_t            mask_y,
					       int32_t            dest_x,
					       int32_t            dest_y,
					       int32_t            width,
					       int32_t            height);

/* Executive Summary: This function is a no-op that only exists
 * for historical reasons.
 *
 * There used to be a bug in the X server where it would rely on
 * out-of-bounds accesses when it was asked to composite with a
 * window as the source. It would create a pixman image pointing
 * to some bogus position in memory, but then set a clip region
 * to the position where the actual bits were.
 *
 * Due to a bug in old versions of pixman, where it would not clip
 * against the image bounds when a clip region was set, this would
 * actually work. So when the pixman bug was fixed, a workaround was
 * added to allow certain out-of-bound accesses. This function disabled
 * those workarounds.
 *
 * Since 0.21.2, pixman doesn't do these workarounds anymore, so now this
 * function is a no-op.
 */
void pixman_disable_out_of_bounds_workaround (void);

/*
 * Glyphs
 */
typedef struct pixman_glyph_cache_t pixman_glyph_cache_t;
typedef struct
{
    int		x, y;
    const void *glyph;
} pixman_glyph_t;

pixman_glyph_cache_t *pixman_glyph_cache_create       (void);
void                  pixman_glyph_cache_destroy      (pixman_glyph_cache_t *cache);
void                  pixman_glyph_cache_freeze       (pixman_glyph_cache_t *cache);
void                  pixman_glyph_cache_thaw         (pixman_glyph_cache_t *cache);
const void *          pixman_glyph_cache_lookup       (pixman_glyph_cache_t *cache,
						       void                 *font_key,
						       void                 *glyph_key);
const void *          pixman_glyph_cache_insert       (pixman_glyph_cache_t *cache,
						       void                 *font_key,
						       void                 *glyph_key,
						       int		     origin_x,
						       int                   origin_y,
						       pixman_image_t       *glyph_image);
void                  pixman_glyph_cache_remove       (pixman_glyph_cache_t *cache,
						       void                 *font_key,
						       void                 *glyph_key);
void                  pixman_glyph_get_extents        (pixman_glyph_cache_t *cache,
						       int                   n_glyphs,
						       pixman_glyph_t       *glyphs,
						       pixman_box32_t       *extents);
pixman_format_code_t  pixman_glyph_get_mask_format    (pixman_glyph_cache_t *cache,
						       int		     n_glyphs,
						       const pixman_glyph_t *glyphs);
void                  pixman_composite_glyphs         (pixman_op_t           op,
						       pixman_image_t       *src,
						       pixman_image_t       *dest,
						       pixman_format_code_t  mask_format,
						       int32_t               src_x,
						       int32_t               src_y,
						       int32_t		     mask_x,
						       int32_t		     mask_y,
						       int32_t               dest_x,
						       int32_t               dest_y,
						       int32_t		     width,
						       int32_t		     height,
						       pixman_glyph_cache_t *cache,
						       int		     n_glyphs,
						       const pixman_glyph_t *glyphs);
void                  pixman_composite_glyphs_no_mask (pixman_op_t           op,
						       pixman_image_t       *src,
						       pixman_image_t       *dest,
						       int32_t               src_x,
						       int32_t               src_y,
						       int32_t               dest_x,
						       int32_t               dest_y,
						       pixman_glyph_cache_t *cache,
						       int		     n_glyphs,
						       const pixman_glyph_t *glyphs);

/*
 * Trapezoids
 */
typedef struct pixman_edge pixman_edge_t;
typedef struct pixman_trapezoid pixman_trapezoid_t;
typedef struct pixman_trap pixman_trap_t;
typedef struct pixman_span_fix pixman_span_fix_t;
typedef struct pixman_triangle pixman_triangle_t;

/*
 * An edge structure.  This represents a single polygon edge
 * and can be quickly stepped across small or large gaps in the
 * sample grid
 */
struct pixman_edge
{
    pixman_fixed_t	x;
    pixman_fixed_t	e;
    pixman_fixed_t	stepx;
    pixman_fixed_t	signdx;
    pixman_fixed_t	dy;
    pixman_fixed_t	dx;

    pixman_fixed_t	stepx_small;
    pixman_fixed_t	stepx_big;
    pixman_fixed_t	dx_small;
    pixman_fixed_t	dx_big;
};

struct pixman_trapezoid
{
    pixman_fixed_t	top, bottom;
    pixman_line_fixed_t	left, right;
};

struct pixman_triangle
{
    pixman_point_fixed_t p1, p2, p3;
};

/* whether 't' is a well defined not obviously empty trapezoid */
#define pixman_trapezoid_valid(t)				   \
    ((t)->left.p1.y != (t)->left.p2.y &&			   \
     (t)->right.p1.y != (t)->right.p2.y &&			   \
     ((t)->bottom > (t)->top))

struct pixman_span_fix
{
    pixman_fixed_t	l, r, y;
};

struct pixman_trap
{
    pixman_span_fix_t	top, bot;
};

pixman_fixed_t pixman_sample_ceil_y        (pixman_fixed_t             y,
					    int                        bpp);
pixman_fixed_t pixman_sample_floor_y       (pixman_fixed_t             y,
					    int                        bpp);
void           pixman_edge_step            (pixman_edge_t             *e,
					    int                        n);
void           pixman_edge_init            (pixman_edge_t             *e,
					    int                        bpp,
					    pixman_fixed_t             y_start,
					    pixman_fixed_t             x_top,
					    pixman_fixed_t             y_top,
					    pixman_fixed_t             x_bot,
					    pixman_fixed_t             y_bot);
void           pixman_line_fixed_edge_init (pixman_edge_t             *e,
					    int                        bpp,
					    pixman_fixed_t             y,
					    const pixman_line_fixed_t *line,
					    int                        x_off,
					    int                        y_off);
void           pixman_rasterize_edges      (pixman_image_t            *image,
					    pixman_edge_t             *l,
					    pixman_edge_t             *r,
					    pixman_fixed_t             t,
					    pixman_fixed_t             b);
void           pixman_add_traps            (pixman_image_t            *image,
					    int16_t                    x_off,
					    int16_t                    y_off,
					    int                        ntrap,
					    const pixman_trap_t       *traps);
void           pixman_add_trapezoids       (pixman_image_t            *image,
					    int16_t                    x_off,
					    int                        y_off,
					    int                        ntraps,
					    const pixman_trapezoid_t  *traps);
void           pixman_rasterize_trapezoid  (pixman_image_t            *image,
					    const pixman_trapezoid_t  *trap,
					    int                        x_off,
					    int                        y_off);
void          pixman_composite_trapezoids (pixman_op_t		       op,
					   pixman_image_t *	       src,
					   pixman_image_t *	       dst,
					   pixman_format_code_t	       mask_format,
					   int			       x_src,
					   int			       y_src,
					   int			       x_dst,
					   int			       y_dst,
					   int			       n_traps,
					   const pixman_trapezoid_t *  traps);
void          pixman_composite_triangles (pixman_op_t		       op,
					  pixman_image_t *	       src,
					  pixman_image_t *	       dst,
					  pixman_format_code_t	       mask_format,
					  int			       x_src,
					  int			       y_src,
					  int			       x_dst,
					  int			       y_dst,
					  int			       n_tris,
					  const pixman_triangle_t *    tris);
void	      pixman_add_triangles       (pixman_image_t              *image,
					  int32_t	               x_off,
					  int32_t	               y_off,
					  int	                       n_tris,
					  const pixman_triangle_t     *tris);

PIXMAN_END_DECLS

#endif /* PIXMAN_H__ */
