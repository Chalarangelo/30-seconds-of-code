/* A static string buffer, with overflow protection.
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

#ifndef VIPS_BUF_H
#define VIPS_BUF_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

#include <vips/vips.h>

/* A string in the process of being written to ... multiple calls to 
 * vips_buf_append add to it. On overflow append "..." and block further 
 * writes.
 */

typedef struct _VipsBuf {
	/* All fields are private.
	 */
	/*< private >*/
	char *base;		/* String base */
	int mx;			/* Maximum length */
	int i;			/* Current write point */
	gboolean full;		/* String has filled, block writes */
	int lasti;		/* For read-recent */
	gboolean dynamic;	/* We own the string with malloc() */
} VipsBuf; 

#define VIPS_BUF_STATIC( TEXT ) \
	{ &TEXT[0], sizeof( TEXT ), 0, FALSE, 0, FALSE }

/* Init and append to one of the above.
 */
void vips_buf_rewind( VipsBuf *buf );
void vips_buf_destroy( VipsBuf *buf );
void vips_buf_init( VipsBuf *buf );
void vips_buf_set_static( VipsBuf *buf, char *base, int mx );
void vips_buf_set_dynamic( VipsBuf *buf, int mx );
void vips_buf_init_static( VipsBuf *buf, char *base, int mx );
void vips_buf_init_dynamic( VipsBuf *buf, int mx );
gboolean vips_buf_appendns( VipsBuf *buf, const char *str, int sz );
gboolean vips_buf_appends( VipsBuf *buf, const char *str );
gboolean vips_buf_appendf( VipsBuf *buf, const char *fmt, ... )
	__attribute__((format(printf, 2, 3)));
gboolean vips_buf_vappendf( VipsBuf *buf, const char *fmt, va_list ap );
gboolean vips_buf_appendc( VipsBuf *buf, char ch );
gboolean vips_buf_appendsc( VipsBuf *buf, gboolean quote, const char *str );
gboolean vips_buf_appendgv( VipsBuf *buf, GValue *value );
gboolean vips_buf_append_size( VipsBuf *buf, size_t n );
gboolean vips_buf_removec( VipsBuf *buf, char ch );
gboolean vips_buf_change( VipsBuf *buf, const char *o, const char *n );
gboolean vips_buf_is_empty( VipsBuf *buf );
gboolean vips_buf_is_full( VipsBuf *buf );
const char *vips_buf_all( VipsBuf *buf );
const char *vips_buf_firstline( VipsBuf *buf );
gboolean vips_buf_appendg( VipsBuf *buf, double g );
gboolean vips_buf_appendd( VipsBuf *buf, int d );
int vips_buf_len( VipsBuf *buf );

#endif /*VIPS_BUF_H*/

#ifdef __cplusplus
}
#endif /*__cplusplus*/
