/* Pango
 * pango-matrix.h: Matrix manipulation routines
 *
 * Copyright (C) 2002, 2006 Red Hat Software
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

#ifndef __PANGO_MATRIX_H__
#define __PANGO_MATRIX_H__

#include <glib.h>
#include <glib-object.h>

G_BEGIN_DECLS

typedef struct _PangoMatrix    PangoMatrix;

/**
 * PangoMatrix:
 * @xx: 1st component of the transformation matrix
 * @xy: 2nd component of the transformation matrix
 * @yx: 3rd component of the transformation matrix
 * @yy: 4th component of the transformation matrix
 * @x0: x translation
 * @y0: y translation
 *
 * A structure specifying a transformation between user-space
 * coordinates and device coordinates. The transformation
 * is given by
 *
 * <programlisting>
 * x_device = x_user * matrix->xx + y_user * matrix->xy + matrix->x0;
 * y_device = x_user * matrix->yx + y_user * matrix->yy + matrix->y0;
 * </programlisting>
 *
 * Since: 1.6
 **/
struct _PangoMatrix
{
  double xx;
  double xy;
  double yx;
  double yy;
  double x0;
  double y0;
};

/**
 * PANGO_TYPE_MATRIX:
 *
 * The GObject type for #PangoMatrix
 **/
#define PANGO_TYPE_MATRIX (pango_matrix_get_type ())

/**
 * PANGO_MATRIX_INIT:
 *
 * Constant that can be used to initialize a PangoMatrix to
 * the identity transform.
 *
 * <informalexample><programlisting>
 * PangoMatrix matrix = PANGO_MATRIX_INIT;
 * pango_matrix_rotate (&amp;matrix, 45.);
 * </programlisting></informalexample>
 *
 * Since: 1.6
 **/
#define PANGO_MATRIX_INIT { 1., 0., 0., 1., 0., 0. }

/* for PangoRectangle */
#include <pango/pango-types.h>

PANGO_AVAILABLE_IN_1_6
GType pango_matrix_get_type (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_1_6
PangoMatrix *pango_matrix_copy   (const PangoMatrix *matrix);
PANGO_AVAILABLE_IN_1_6
void         pango_matrix_free   (PangoMatrix *matrix);

PANGO_AVAILABLE_IN_1_6
void pango_matrix_translate (PangoMatrix *matrix,
			     double       tx,
			     double       ty);
PANGO_AVAILABLE_IN_1_6
void pango_matrix_scale     (PangoMatrix *matrix,
			     double       scale_x,
			     double       scale_y);
PANGO_AVAILABLE_IN_1_6
void pango_matrix_rotate    (PangoMatrix *matrix,
			     double       degrees);
PANGO_AVAILABLE_IN_1_6
void pango_matrix_concat    (PangoMatrix       *matrix,
			     const PangoMatrix *new_matrix);
PANGO_AVAILABLE_IN_1_16
void pango_matrix_transform_point    (const PangoMatrix *matrix,
				      double            *x,
				      double            *y);
PANGO_AVAILABLE_IN_1_16
void pango_matrix_transform_distance (const PangoMatrix *matrix,
				      double            *dx,
				      double            *dy);
PANGO_AVAILABLE_IN_1_16
void pango_matrix_transform_rectangle (const PangoMatrix *matrix,
				       PangoRectangle    *rect);
PANGO_AVAILABLE_IN_1_16
void pango_matrix_transform_pixel_rectangle (const PangoMatrix *matrix,
					     PangoRectangle    *rect);
PANGO_AVAILABLE_IN_1_12
double pango_matrix_get_font_scale_factor (const PangoMatrix *matrix) G_GNUC_PURE;
PANGO_AVAILABLE_IN_1_38
void pango_matrix_get_font_scale_factors (const PangoMatrix *matrix,
					  double *xscale, double *yscale);


G_END_DECLS

#endif /* __PANGO_MATRIX_H__ */
