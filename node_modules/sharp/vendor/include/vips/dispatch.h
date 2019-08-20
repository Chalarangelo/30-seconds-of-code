/* VIPS function dispatch.
 *
 * J. Cupitt, 8/4/93.
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

#ifndef IM_DISPATCH_H
#define IM_DISPATCH_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

#include <glib-object.h>
#include <vips/vips.h>
#include <vips/util.h>

/* Type names. You may define your own, but if you use one of these, then
 * you should use the built-in VIPS type converters.
 */
#define IM_TYPE_IMAGEVEC "imagevec"	/* im_object is ptr to IMAGE[] */
#define IM_TYPE_DOUBLEVEC "doublevec"	/* im_object is ptr to double[] */
#define IM_TYPE_INTVEC "intvec"		/* im_object is ptr to int[] */
#define IM_TYPE_DOUBLE "double"		/* im_object is ptr to double */
#define IM_TYPE_INT "integer"		/* 32-bit integer */
#define IM_TYPE_COMPLEX "complex"	/* Pair of doubles */
#define IM_TYPE_STRING "string"         /* Zero-terminated char array */
#define IM_TYPE_IMASK "intmask"		/* Integer mask type */
#define IM_TYPE_DMASK "doublemask"	/* Double mask type */
#define IM_TYPE_IMAGE "image"           /* IMAGE descriptor */
#define IM_TYPE_DISPLAY "display"	/* Display descriptor */
#define IM_TYPE_GVALUE "gvalue"		/* GValue wrapper */
#define IM_TYPE_INTERPOLATE "interpolate"/* A subclass of VipsInterpolate */
typedef char *im_arg_type;              /* Type of argument id */

/* Internal representation of an argument to an image processing function.
 */ 
typedef void *im_object;

/* These bits are ored together to make the flags in a type descriptor.
 *
 * IM_TYPE_OUTPUT: set to indicate output, otherwise input. If the IM_TYPE_RW 
 * bit is set and IM_TYPE_OUTPUT is not set, both input and output (ie. the 
 * operation side-effects this argument).
 *
 * IM_TYPE_ARG: Two ways of making an im_object --- with and without a 
 * command-line string to help you along. Arguments with a string are thing 
 * like IMAGE descriptors, which require a filename to initialise. 
 * Arguments without are things like output numbers, where making the object 
 * simply involves allocating storage.
 */
typedef enum {
	IM_TYPE_NONE = 0,		/* No flags */
	IM_TYPE_OUTPUT = 0x1,		/* Output/input object */
	IM_TYPE_ARG = 0x2,		/* Uses a str arg in construction */
	IM_TYPE_RW = 0x4		/* Read-write */
} im_type_flags;

/* Initialise, destroy and write objects. The "str" argument to the
 * init function will not be supplied if this is not an ARG type. The
 * write function writes to the GString.
 */
typedef int (*im_init_obj_fn)( im_object *obj, char *str );
typedef int (*im_dest_obj_fn)( im_object obj );

/* Describe a VIPS type.
 */
typedef struct {
	im_arg_type type;		/* Type of argument */
	int size;			/* sizeof( im_object repres. ) */
	im_type_flags flags;		/* Flags */
	im_init_obj_fn init; 		/* Operation functions */
	im_dest_obj_fn dest;            /* Destroy object */
} im_type_desc;

/* Success on an argument. This is called if the image processing function 
 * succeeds and should be used to (for example) print output.
 */
typedef int (*im_print_obj_fn)( im_object obj );

/* Describe a VIPS command argument.
 */
typedef struct {
	char *name;			/* eg. "width" */
	im_type_desc *desc; 		/* Type description */
	im_print_obj_fn print;		/* Print some output objects */
} im_arg_desc;

/* Type of VIPS dispatch funtion.
 */
typedef int (*im_dispatch_fn)( im_object *argv );

/* Maximum size of arg table.
 */
#define IM_MAX_ARGS (1000)

/* Flags for functions. These are for information only, and more may be
 * added.
 */
typedef enum {
	IM_FN_NONE = 0,		/* No flags set */
	IM_FN_PIO = 0x1,	/* Is a partial function */
	IM_FN_TRANSFORM = 0x2,	/* Performs coordinate transformations */
	IM_FN_PTOP = 0x4,	/* Point-to-point ... can be done with a LUT */
	IM_FN_NOCACHE = 0x8	/* Result should not be cached */
} im_fn_flags;

/* Describe a VIPS function.
 */
typedef struct {
	char *name;		/* eg "im_invert" */
	char *desc;		/* Description - eg "photographic negative" */
	im_fn_flags flags;	/* Flags for this function */
	im_dispatch_fn disp;	/* Dispatch */
	int argc;		/* Number of args */
	im_arg_desc *argv; 	/* Arg table */
} im_function;

/* A set of VIPS functions forming a package.
 */
typedef struct {
	char *name;		/* Package name (eg "arithmetic") */
	int nfuncs;		/* Number of functions in package */
	im_function **table;	/* Array of function descriptors */
} im_package;

/* Externs for dispatch.
 */

/* Struct for mask IO to a file.
 */
typedef struct {
	char *name;		/* Command-line name in */
	void *mask;		/* Mask --- DOUBLE or INT */
} im_mask_object;

/* Struct for doublevec IO
 */
typedef struct {
	int n;			/* Vector length */
	double *vec;		/* Vector */
} im_doublevec_object;

/* Struct for intvec IO
 */
typedef struct {
	int n;			/* Vector length */
	int *vec;		/* Vector */
} im_intvec_object;

/* Struct for imagevec IO
 */
typedef struct {
	int n;			/* Vector length */
	IMAGE **vec;		/* Vector */
} im_imagevec_object;

/* Built-in VIPS types.
 */
extern im_type_desc im__input_int;
extern im_type_desc im__input_intvec;
extern im_type_desc im__input_imask;
extern im_type_desc im__output_int;
extern im_type_desc im__output_intvec;
extern im_type_desc im__output_imask;

extern im_type_desc im__input_double;
extern im_type_desc im__input_doublevec;
extern im_type_desc im__input_dmask;
extern im_type_desc im__output_double;
extern im_type_desc im__output_doublevec;
extern im_type_desc im__output_dmask;
extern im_type_desc im__output_dmask_screen;

extern im_type_desc im__output_complex;

extern im_type_desc im__input_string;
extern im_type_desc im__output_string;

extern im_type_desc im__input_imagevec;
extern im_type_desc im__input_image;
extern im_type_desc im__output_image;
extern im_type_desc im__rw_image;

extern im_type_desc im__input_display;
extern im_type_desc im__output_display;

extern im_type_desc im__input_gvalue;
extern im_type_desc im__output_gvalue;

extern im_type_desc im__input_interpolate;

/* VIPS print functions.
 */
int im__iprint( im_object obj );		/* int */
int im__ivprint( im_object obj );		/* intvec */
int im__dprint( im_object obj );		/* double */
int im__dvprint( im_object obj );		/* doublevec */
int im__dmsprint( im_object obj );		/* DOUBLEMASK as stats */
int im__cprint( im_object obj );		/* complex */
int im__sprint( im_object obj );		/* string */
int im__displayprint( im_object obj );		/* im_col_display */
int im__gprint( im_object obj );		/* GValue */

/* Macros for convenient creation.
 */
#define IM_INPUT_INT( S ) { S, &im__input_int, NULL }
#define IM_INPUT_INTVEC( S ) { S, &im__input_intvec, NULL }
#define IM_INPUT_IMASK( S ) { S, &im__input_imask, NULL }
#define IM_OUTPUT_INT( S ) { S, &im__output_int, im__iprint }
#define IM_OUTPUT_INTVEC( S ) { S, &im__output_intvec, im__ivprint }
#define IM_OUTPUT_IMASK( S ) { S, &im__output_imask, NULL }

#define IM_INPUT_DOUBLE( S ) { S, &im__input_double, NULL }
#define IM_INPUT_DOUBLEVEC( S ) { S, &im__input_doublevec, NULL }
#define IM_INPUT_DMASK( S ) { S, &im__input_dmask, NULL }
#define IM_OUTPUT_DOUBLE( S ) { S, &im__output_double, im__dprint }
#define IM_OUTPUT_DOUBLEVEC( S ) { S, &im__output_doublevec, im__dvprint }
#define IM_OUTPUT_DMASK( S ) { S, &im__output_dmask, NULL }
#define IM_OUTPUT_DMASK_STATS( S ) { S, &im__output_dmask_screen, im__dmsprint }

#define IM_OUTPUT_COMPLEX( S ) { S, &im__output_complex, im__cprint }

#define IM_INPUT_STRING( S ) { S, &im__input_string, NULL }
#define IM_OUTPUT_STRING( S ) { S, &im__output_string, im__sprint }

#define IM_INPUT_IMAGE( S ) { S, &im__input_image, NULL }
#define IM_INPUT_IMAGEVEC( S ) { S, &im__input_imagevec, NULL }
#define IM_OUTPUT_IMAGE( S ) { S, &im__output_image, NULL }
#define IM_RW_IMAGE( S ) { S, &im__rw_image, NULL }

#define IM_INPUT_DISPLAY( S ) { S, &im__input_display, NULL }
#define IM_OUTPUT_DISPLAY( S ) { S, &im__output_display, im__displayprint }

#define IM_INPUT_GVALUE( S ) { S, &im__input_gvalue, NULL }
#define IM_OUTPUT_GVALUE( S ) { S, &im__output_gvalue, im__gprint }

#define IM_INPUT_INTERPOLATE( S ) { S, &im__input_interpolate, NULL }

/* Add a plug-in package.
 */
im_package *im_load_plugin( const char *name );
int im_load_plugins( const char *fmt, ... )
	__attribute__((format(printf, 1, 2)));

/* Close all plug-ins.
 */
int im_close_plugins( void );

/* Loop over all loaded packages.
 */
void *im_map_packages( VipsSListMap2Fn fn, void *a );

/* Convenience functions for finding packages, functions, etc.
 */
im_function *im_find_function( const char *name );
im_package *im_find_package( const char *name );
im_package *im_package_of_function( const char *name );

/* Allocate space for, and free im_object argument lists.
 */
int im_free_vargv( im_function *fn, im_object *vargv );
int im_allocate_vargv( im_function *fn, im_object *vargv );

/* Run a VIPS command by name.
 */
int im_run_command( char *name, int argc, char **argv );

int vips__input_interpolate_init( im_object *obj, char *str );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*IM_DISPATCH_H*/
