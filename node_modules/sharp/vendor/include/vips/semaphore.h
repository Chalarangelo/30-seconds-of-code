/* Definitions for thread support.
 *
 * JC, 9/5/94
 * 30/7/99 RP, JC
 *	- reworked for posix/solaris threads
 * 28/9/99 JC
 *	- restructured, made part of public API
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

#ifndef VIPS_SEMAPHORE_H
#define VIPS_SEMAPHORE_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

#include <vips/vips.h>
#include <vips/thread.h>

/* Implement our own semaphores.
 */
typedef struct {
	char *name;
	int v;

	GMutex *mutex;
	GCond *cond;
} VipsSemaphore;

int vips_semaphore_up( VipsSemaphore *s );
int vips_semaphore_down( VipsSemaphore *s );
int vips_semaphore_upn( VipsSemaphore *s, int n );
int vips_semaphore_downn( VipsSemaphore *s, int n );
void vips_semaphore_destroy( VipsSemaphore *s );
void vips_semaphore_init( VipsSemaphore *s, int v, char *name );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_SEMAPHORE_H*/
