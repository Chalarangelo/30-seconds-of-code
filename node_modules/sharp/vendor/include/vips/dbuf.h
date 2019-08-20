/* A dynamic memory buffer that expands as you write.
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

#ifndef VIPS_DBUF_H
#define VIPS_DBUF_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

#include <vips/vips.h>

/* A buffer in the process of being written to.
 */

typedef struct _VipsDbuf {
	/* All fields are private.
	 */
	/*< private >*/

	/* The current base, and the size of the allocated memory area.
	 */
	unsigned char *data;
	size_t allocated_size;

	/* The size of the actual data that's been written. This will usually
	 * be <= allocated_size, but always >= write_point.
	 */
	size_t data_size;

	/* The write point.
	 */
	size_t write_point;

} VipsDbuf; 

void vips_dbuf_destroy( VipsDbuf *dbuf );
void vips_dbuf_init( VipsDbuf *dbuf );
gboolean vips_dbuf_allocate( VipsDbuf *dbuf, size_t size );
size_t vips_dbuf_read( VipsDbuf *dbuf, unsigned char *data, size_t size );
unsigned char *vips_dbuf_get_write( VipsDbuf *dbuf, size_t *size );
gboolean vips_dbuf_write( VipsDbuf *dbuf, 
	const unsigned char *data, size_t size );
gboolean vips_dbuf_writef( VipsDbuf *dbuf, const char *fmt, ... );
void vips_dbuf_reset( VipsDbuf *dbuf );
void vips_dbuf_destroy( VipsDbuf *dbuf );
gboolean vips_dbuf_seek( VipsDbuf *dbuf, off_t offset, int whence );
void vips_dbuf_truncate( VipsDbuf *dbuf );
off_t vips_dbuf_tell( VipsDbuf *dbuf );
unsigned char *vips_dbuf_string( VipsDbuf *dbuf, size_t *size );
unsigned char *vips_dbuf_steal( VipsDbuf *dbuf, size_t *size );

#endif /*VIPS_DBUF_H*/

#ifdef __cplusplus
}
#endif /*__cplusplus*/
