/* Thread eval for VIPS.
 *
 * 29/9/99 JC
 *	- from thread.h
 * 17/3/10
 * 	- from threadgroup
 * 	- rework with a simpler distributed work allocation model
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

#ifndef VIPS_THREADPOOL_H
#define VIPS_THREADPOOL_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

#include <vips/semaphore.h>

/* Per-thread state. Allocate functions can use these members to
 * communicate with work functions.
 */

#define VIPS_TYPE_THREAD_STATE (vips_thread_state_get_type())
#define VIPS_THREAD_STATE( obj ) \
	(G_TYPE_CHECK_INSTANCE_CAST( (obj), \
	VIPS_TYPE_THREAD_STATE, VipsThreadState ))
#define VIPS_THREAD_STATE_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_CAST( (klass), \
	VIPS_TYPE_THREAD_STATE, VipsThreadStateClass))
#define VIPS_IS_THREAD_STATE( obj ) \
	(G_TYPE_CHECK_INSTANCE_TYPE( (obj), VIPS_TYPE_THREAD_STATE ))
#define VIPS_IS_THREAD_STATE_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_TYPE( (klass), VIPS_TYPE_THREAD_STATE ))
#define VIPS_THREAD_STATE_GET_CLASS( obj ) \
	(G_TYPE_INSTANCE_GET_CLASS( (obj), \
	VIPS_TYPE_THREAD_STATE, VipsThreadStateClass ))

typedef struct _VipsThreadState {
	VipsObject parent_object;

	/*< public >*/
	/* Image we run on.
	 */
	VipsImage *im;

	/* This region is created and destroyed by the threadpool for the
	 * use of the worker. 
	 */
	VipsRegion *reg;		

	/* Neither used nor set, do what you like with them.
	 */
	VipsRect pos;
	int x, y;

	/* Set in work to get the allocate to signal stop.
	 */
	gboolean stop;

	/* The client data passed to the enclosing vips_threadpool_run().
	 */
        void *a;

	/* Set in allocate to stall this thread for a moment. Handy for
	 * debugging race conditions.
	 */
	gboolean stall;

} VipsThreadState;

typedef struct _VipsThreadStateClass {
	VipsObjectClass parent_class;
	/*< public >*/

} VipsThreadStateClass;

void *vips_thread_state_set( VipsObject *object, void *a, void *b );

/* Don't put spaces around void here, it breaks gtk-doc.
 */
GType vips_thread_state_get_type(void);

VipsThreadState *vips_thread_state_new( VipsImage *im, void *a );

/* Constructor for per-thread state.
 */
typedef VipsThreadState *(*VipsThreadStartFn)( VipsImage *im, void *a );

/* A work allocate function. This is run single-threaded by a worker to
 * set up a new work unit. 
 * Return non-zero for errors. Set *stop for "no more work to do"
 */
typedef int (*VipsThreadpoolAllocateFn)( VipsThreadState *state,
	void *a, gboolean *stop );

/* A work function. This does a unit of work (eg. processing a tile or
 * whatever). Return non-zero for errors. 
 */
typedef int (*VipsThreadpoolWorkFn)( VipsThreadState *state, void *a );

/* A progress function. This is run by the main thread once for every
 * allocation. Return an error to kill computation early.
 */
typedef int (*VipsThreadpoolProgressFn)( void *a );

int vips_threadpool_run( VipsImage *im, 
	VipsThreadStartFn start, 
	VipsThreadpoolAllocateFn allocate, 
	VipsThreadpoolWorkFn work,
	VipsThreadpoolProgressFn progress,
	void *a );
void vips_get_tile_size( VipsImage *im, 
	int *tile_width, int *tile_height, int *n_lines );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_THREADPOOL_H*/
