/* Old and broken stuff we do not enable by default
 *
 * 30/6/09
 * 	- from vips.h
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

#ifndef IM_DEPRECATED_H
#define IM_DEPRECATED_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

/* On win32, need to override the wingdi defs for these. Yuk!
 */
#ifdef HAVE_WINDOWS_H
#ifdef RGB
#undef RGB
#endif
#ifdef CMYK
#undef CMYK
#endif
#endif /*HAVE_WINDOWS_H*/

/* Bits per Band */
#define BBBYTE		8
#define BBSHORT		16
#define BBINT		32
#define BBFLOAT		32
#define BBCOMPLEX	64	/* complex consisting of two floats */
#define BBDOUBLE	64
#define BBDPCOMPLEX	128	/* complex consisting of two doubles */

/* picture Type */
#define MULTIBAND	0
#define B_W		1
#define LUMINACE	2
#define XRAY		3
#define IR		4
#define YUV		5
#define RED_ONLY	6			/* red channel only	*/
#define GREEN_ONLY	7			/* green channel only	*/
#define BLUE_ONLY	8			/* blue channel only	*/
#define POWER_SPECTRUM	9
#define HISTOGRAM	10
#define FOURIER		24

/* Colour spaces.
 */
#define LUT		11
#define XYZ		12
#define LAB		13
#define CMC		14
#define CMYK		15
#define LABQ		16
#define RGB		17
#define UCS		18
#define LCH		19
#define LABS		21
#define sRGB		22
#define YXY		23

/* BandFmt 
 */
#define FMTNOTSET	-1	
#define FMTUCHAR	0	/* pels interpreted as unsigned chars */
#define FMTCHAR		1	/* pels interpreted as signed chars */
#define FMTUSHORT	2	/* pels interpreted as unsigned shorts */
#define FMTSHORT	3	/* pels interpreted as signed shorts */
#define FMTUINT		4	/* pels interpreted as unsigned ints */
#define FMTINT		5	/* pels interpreted as signed ints */
#define FMTFLOAT	6	/* pels interpreted as floats */
#define FMTCOMPLEX	7	/* pels interpreted as complex (2 float each) */
#define FMTDOUBLE	8	/* pels interpreted as unsigned double */
#define FMTDPCOMPLEX	9	/* pels interpreted as complex (2 double each)*/

/* Coding type 
 */
#define NOCODING		0
#define COLQUANT		1
#define LABPACK			2
#define LABPACK_COMPRESSED	3
#define RGB_COMPRESSED		4
#define LUM_COMPRESSED		5

/* Compression type 
 */
#define NO_COMPRESSION		0
#define TCSF_COMPRESSION	1
#define JPEG_COMPRESSION	2

#define esize(I) IM_IMAGE_SIZEOF_ELEMENT(I)
#define psize(I) IM_IMAGE_SIZEOF_PEL(I)
#define lsize(I) IM_IMAGE_SIZEOF_LINE(I)
#define niele(I) IM_IMAGE_N_ELEMENTS(I)

#define lskip(B) IM_REGION_LSKIP(B)
#define nele(B) IM_REGION_N_ELEMENTS(B)
#define rsize(B) IM_REGION_SIZEOF_LINE(B)

#define addr(B,X,Y) IM_REGION_ADDR(B,X,Y) 

#ifndef MAX
#define MAX(A,B) IM_MAX(A, B)
#define MIN(A,B) IM_MIN(A, B)
#endif /*MAX*/

#define CLIP(A,V,B) IM_CLIP(A, V, B)
#define NEW(IM,A) IM_NEW(IM,A)
#define NUMBER(R) IM_NUMBER(R)
#define ARRAY(IM,N,T) IM_ARRAY(IM,N,T)

#define RINT( R ) IM_RINT( R )

#define CLIP_UCHAR( V, SEQ ) IM_CLIP_UCHAR( V, SEQ )
#define CLIP_USHORT( V, SEQ ) IM_CLIP_USHORT( V, SEQ )
#define CLIP_CHAR( V, SEQ ) IM_CLIP_CHAR( V, SEQ )
#define CLIP_SHORT( V, SEQ ) IM_CLIP_SHORT( V, SEQ )
#define CLIP_NONE( V, SEQ ) IM_CLIP_NONE( V, SEQ )

#define right(R) IM_RECT_RIGHT(R)
#define bottom(R) IM_RECT_BOTTOM(R)

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*IM_DEPRECATED_H*/
