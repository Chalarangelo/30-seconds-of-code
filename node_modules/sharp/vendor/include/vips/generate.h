/* Generate pixels.
 *
 * J.Cupitt, 8/4/93
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

#ifndef VIPS_GENERATE_H
#define VIPS_GENERATE_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

typedef int (*VipsRegionWrite)( VipsRegion *region, VipsRect *area, void *a );
int vips_sink_disc( VipsImage *im, VipsRegionWrite write_fn, void *a );

int vips_sink( VipsImage *im, 
	VipsStartFn start_fn, VipsGenerateFn generate_fn, VipsStopFn stop_fn,
	void *a, void *b );
int vips_sink_tile( VipsImage *im, 
	int tile_width, int tile_height,
	VipsStartFn start_fn, VipsGenerateFn generate_fn, VipsStopFn stop_fn,
	void *a, void *b );

typedef void (*VipsSinkNotify)( VipsImage *im, VipsRect *rect, void *a );
int vips_sink_screen( VipsImage *in, VipsImage *out, VipsImage *mask,
	int tile_width, int tile_height, int max_tiles,
	int priority,
	VipsSinkNotify notify_fn, void *a );

int vips_sink_memory( VipsImage *im );

void *vips_start_one( VipsImage *out, void *a, void *b );
int vips_stop_one( void *seq, void *a, void *b );
void *vips_start_many( VipsImage *out, void *a, void *b );
int vips_stop_many( void *seq, void *a, void *b );
VipsImage **vips_allocate_input_array( VipsImage *out, ... )
	__attribute__((sentinel));

int vips_image_generate( VipsImage *image,
	VipsStartFn start_fn, VipsGenerateFn generate_fn, VipsStopFn stop_fn,
	void *a, void *b
);

int vips_image_pipeline_array( VipsImage *image, 
	VipsDemandStyle hint, VipsImage **in );
int vips_image_pipelinev( VipsImage *image, VipsDemandStyle hint, ... )
	__attribute__((sentinel));

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_GENERATE_H*/
