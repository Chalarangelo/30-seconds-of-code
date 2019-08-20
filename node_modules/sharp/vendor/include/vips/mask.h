/* mask.h
 *
 * 20/9/09
 * 	- from proto.h
 */

/* All deprecated.
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

#ifndef IM_MASK_H
#define IM_MASK_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

typedef struct im__INTMASK {
	int xsize;
	int ysize;
	int scale;
	int offset;
	int *coeff;
	char *filename;
} INTMASK;

typedef struct im__DOUBLEMASK {
	int xsize;
	int ysize;
	double scale;
	double offset;
	double *coeff;
	char *filename;
} DOUBLEMASK;

#define IM_MASK( M, X, Y ) ((M)->coeff[(X) + (Y) * (M)->xsize])

INTMASK *im_create_imask( const char *filename, int xsize, int ysize );
INTMASK *im_create_imaskv( const char *filename, int xsize, int ysize, ... );
DOUBLEMASK *im_create_dmask( const char *filename, int xsize, int ysize );
DOUBLEMASK *im_create_dmaskv( const char *filename, int xsize, int ysize, ... );

INTMASK *im_read_imask( const char *filename );
DOUBLEMASK *im_read_dmask( const char *filename );

void im_print_imask( INTMASK *in );
void im_print_dmask( DOUBLEMASK *in );

int im_write_imask( INTMASK *in );
int im_write_dmask( DOUBLEMASK *in );
int im_write_imask_name( INTMASK *in, const char *filename );
int im_write_dmask_name( DOUBLEMASK *in, const char *filename );

int im_free_imask( INTMASK *in );
int im_free_dmask( DOUBLEMASK *in );

INTMASK *im_log_imask( const char *filename, double sigma, double min_ampl );
DOUBLEMASK *im_log_dmask( const char *filename, double sigma, double min_ampl );

INTMASK *im_gauss_imask( const char *filename, double sigma, double min_ampl );
INTMASK *im_gauss_imask_sep( const char *filename, 
	double sigma, double min_ampl );
DOUBLEMASK *im_gauss_dmask( const char *filename, 
	double sigma, double min_ampl );
DOUBLEMASK *im_gauss_dmask_sep( const char *filename, 
	double sigma, double min_ampl );

INTMASK *im_dup_imask( INTMASK *in, const char *filename );
DOUBLEMASK *im_dup_dmask( DOUBLEMASK *in, const char *filename );

INTMASK *im_scale_dmask( DOUBLEMASK *in, const char *filename );
void im_norm_dmask( DOUBLEMASK *mask );
DOUBLEMASK *im_imask2dmask( INTMASK *in, const char *filename );
INTMASK *im_dmask2imask( DOUBLEMASK *in, const char *filename );

INTMASK *im_rotate_imask90( INTMASK *in, const char *filename );
INTMASK *im_rotate_imask45( INTMASK *in, const char *filename );
DOUBLEMASK *im_rotate_dmask90( DOUBLEMASK *in, const char *filename );
DOUBLEMASK *im_rotate_dmask45( DOUBLEMASK *in, const char *filename );

DOUBLEMASK *im_mattrn( DOUBLEMASK *in, const char *filename );
DOUBLEMASK *im_matcat( DOUBLEMASK *top, DOUBLEMASK *bottom, 
	const char *filename );
DOUBLEMASK *im_matmul( DOUBLEMASK *in1, DOUBLEMASK *in2, const char *filename );

DOUBLEMASK *im_lu_decomp( const DOUBLEMASK *mat, const char *filename );
int im_lu_solve( const DOUBLEMASK *lu, double *vec );
DOUBLEMASK *im_matinv( const DOUBLEMASK *mat, const char *filename );
int im_matinv_inplace( DOUBLEMASK *mat );

DOUBLEMASK *im_local_dmask( struct _VipsImage *out, DOUBLEMASK *mask );
INTMASK *im_local_imask( struct _VipsImage *out, INTMASK *mask );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*IM_MASK_H*/
