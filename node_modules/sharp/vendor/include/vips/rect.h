/* Simple rectangle algebra.
 */

/*

    This file is part of VIPS.

    VIPS is free software; you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
    02110-1301  USA

 */

/*

    These files are distributed with VIPS - http://www.vips.ecs.soton.ac.uk

 */

#ifndef VIPS_RECT_H
#define VIPS_RECT_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

typedef struct _VipsRect {
	/*< public >*/
	int left;
	int top;
	int width;
	int height;
} VipsRect;

#define VIPS_RECT_RIGHT(R) ((R)->left + (R)->width)
#define VIPS_RECT_BOTTOM(R) ((R)->top + (R)->height)
#define VIPS_RECT_HCENTRE(R) ((R)->left + (R)->width / 2)
#define VIPS_RECT_VCENTRE(R) ((R)->top + (R)->height / 2)

gboolean vips_rect_isempty( const VipsRect *r );
gboolean vips_rect_includespoint( const VipsRect *r, int x, int y );
gboolean vips_rect_includesrect( const VipsRect *r1, const VipsRect *r2 );
gboolean vips_rect_equalsrect( const VipsRect *r1, const VipsRect *r2 );
void vips_rect_marginadjust( VipsRect *r, int n );
void vips_rect_intersectrect( const VipsRect *r1, const VipsRect *r2, 
	VipsRect *out );
void vips_rect_unionrect( const VipsRect *r1, const VipsRect *r2, 
	VipsRect *out );
VipsRect *vips_rect_dup( const VipsRect *r );
void vips_rect_normalise( VipsRect *r );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_RECT_H*/
