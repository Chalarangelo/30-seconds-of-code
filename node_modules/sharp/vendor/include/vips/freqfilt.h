/* freq_filt.h
 *
 * 2/11/09
 * 	- from proto.h
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

#ifndef VIPS_FREQFILT_H
#define VIPS_FREQFILT_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

int vips_fwfft( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_invfft( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));

int vips_freqmult( VipsImage *in, VipsImage *mask, VipsImage **out, ... )
	__attribute__((sentinel));

int vips_spectrum( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));

int vips_phasecor( VipsImage *in1, VipsImage *in2, VipsImage **out, ... )
	__attribute__((sentinel));

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_FREQFILT_H*/
