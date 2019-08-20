/* abstract base class for all vips objects
 */

/*

    Copyright (C) 1991-2003 The National Gallery

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Lesser General Public
    License as published by the Free Software Foundation; either
    version 2.1 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU 
    Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this library; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
    02110-1301  USA

 */

/*

    These files are distributed with VIPS - http://www.vips.ecs.soton.ac.uk

 */

#ifndef VIPS_OBJECT_H
#define VIPS_OBJECT_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

/* Handy!
 */
#ifdef VIPS_DEBUG
#define VIPS_UNREF( X ) G_STMT_START { \
	if( X ) { \
		g_assert( G_OBJECT( X )->ref_count > 0 ); \
		g_object_unref( X ); \
		(X) = 0; \
	} \
} G_STMT_END
#else /*!VIPS_DEBUG*/
#define VIPS_UNREF( X ) VIPS_FREEF( g_object_unref, (X) )
#endif /*VIPS_DEBUG*/

typedef struct _VipsObject VipsObject;
typedef struct _VipsObjectClass VipsObjectClass;

/* Track extra stuff for arguments to objects
 */

typedef enum /*< flags >*/ {
	VIPS_ARGUMENT_NONE = 0,
	VIPS_ARGUMENT_REQUIRED = 1,
	VIPS_ARGUMENT_CONSTRUCT = 2,
	VIPS_ARGUMENT_SET_ONCE = 4,
	VIPS_ARGUMENT_SET_ALWAYS = 8,
	VIPS_ARGUMENT_INPUT = 16,
	VIPS_ARGUMENT_OUTPUT = 32,
	VIPS_ARGUMENT_DEPRECATED = 64,
	VIPS_ARGUMENT_MODIFY = 128
} VipsArgumentFlags;

/* Useful flag combinations. User-visible ones are:

VIPS_ARGUMENT_REQUIRED_INPUT 	Eg. the "left" argument for an add operation

VIPS_ARGUMENT_OPTIONAL_INPUT 	Eg. the "caption" for an object

VIPS_ARGUMENT_REQUIRED_OUTPUT  	Eg. the "result" of an add operation

VIPS_ARGUMENT_OPTIONAL_OUTPUT   Eg. the x pos of the image minimum

   Other combinations are used internally, eg. supplying the cast-table for an 
   arithmetic operation

 */

#define VIPS_ARGUMENT_REQUIRED_INPUT \
	(VIPS_ARGUMENT_INPUT | \
	 VIPS_ARGUMENT_REQUIRED | \
	 VIPS_ARGUMENT_CONSTRUCT) 

#define VIPS_ARGUMENT_OPTIONAL_INPUT \
	(VIPS_ARGUMENT_INPUT | \
	 VIPS_ARGUMENT_CONSTRUCT)

#define VIPS_ARGUMENT_REQUIRED_OUTPUT \
	(VIPS_ARGUMENT_OUTPUT | \
	 VIPS_ARGUMENT_REQUIRED | \
	 VIPS_ARGUMENT_CONSTRUCT)

#define VIPS_ARGUMENT_OPTIONAL_OUTPUT \
	(VIPS_ARGUMENT_OUTPUT | \
	 VIPS_ARGUMENT_CONSTRUCT)

#define VIPS_ARG_IMAGE( CLASS, NAME, PRIORITY, LONG, DESC, FLAGS, OFFSET ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_object( (NAME), (LONG), (DESC),  \
		VIPS_TYPE_IMAGE, \
		(GParamFlags) (G_PARAM_READWRITE) ); \
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_INTERPOLATE( CLASS, NAME, PRIORITY, LONG, DESC, FLAGS, OFFSET ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_object( (NAME), (LONG), (DESC),  \
		VIPS_TYPE_INTERPOLATE, \
		(GParamFlags) (G_PARAM_READWRITE) ); \
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_BOOL( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_boolean( (NAME), (LONG), (DESC), \
		(VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) ); \
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_DOUBLE( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, MIN, MAX, VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_double( (NAME), (LONG), (DESC), \
		(MIN), (MAX), (VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) );\
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_BOXED( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, TYPE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_boxed( (NAME), (LONG), (DESC), \
		(TYPE), \
		(GParamFlags) (G_PARAM_READWRITE) );\
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_INT( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, MIN, MAX, VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_int( (NAME), (LONG), (DESC), \
		(MIN), (MAX), (VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) );\
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_UINT64( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, MIN, MAX, VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_uint64( (NAME), (LONG), (DESC), \
		(MIN), (MAX), (VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) );\
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_ENUM( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, TYPE, VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_enum( (NAME), (LONG), (DESC), \
		(TYPE), (VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) );\
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_FLAGS( CLASS, NAME, PRIORITY, LONG, DESC, \
	FLAGS, OFFSET, TYPE, VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_flags( (NAME), (LONG), (DESC), \
		(TYPE), (VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) );\
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_STRING( CLASS, NAME, PRIORITY, LONG, DESC, FLAGS, OFFSET, \
	VALUE ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_string( (NAME), (LONG), (DESC), \
		(VALUE), \
		(GParamFlags) (G_PARAM_READWRITE) ); \
	g_object_class_install_property( G_OBJECT_CLASS( CLASS ), \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

#define VIPS_ARG_POINTER( CLASS, NAME, PRIORITY, LONG, DESC, FLAGS, OFFSET ) { \
	GParamSpec *pspec; \
	\
	pspec = g_param_spec_pointer( (NAME), (LONG), (DESC), \
		(GParamFlags) (G_PARAM_READWRITE) ); \
	g_object_class_install_property( gobject_class,  \
		vips_argument_get_id(), pspec ); \
	vips_object_class_install_argument( VIPS_OBJECT_CLASS( CLASS ), \
		pspec, (VipsArgumentFlags) (FLAGS), (PRIORITY), (OFFSET) ); \
}

/* Keep one of these for every argument.
 */
typedef struct _VipsArgument {
	GParamSpec *pspec;	/* pspec for this argument */

	/* More stuff, see below */
} VipsArgument;

/* Keep one of these in the class struct for every argument.
 */
typedef struct _VipsArgumentClass {
	VipsArgument parent;

	/* The class of the object we are an arg for.
	 */
	VipsObjectClass *object_class;

	VipsArgumentFlags flags;
	int priority;		/* Order args by this */
	guint offset;		/* G_STRUCT_OFFSET of member in object */
} VipsArgumentClass;

/* Keep one of these in the object struct for every argument instance.
 */
typedef struct _VipsArgumentInstance {
	VipsArgument parent;

	/* The class we are part of.
	 */
	VipsArgumentClass *argument_class;

	/* The object we are attached to.
	 */
	VipsObject *object;

	/* Has been set.
	 */
	gboolean assigned;

	/* If this is an output argument, keep the id of our "close" handler
	 * here.
	 */
	gulong close_id;	

	/* We need to listen for "invalidate" on input images and send our own
	 * "invalidate" out. If we go, we need to disconnect.
	 */
	gulong invalidate_id;
} VipsArgumentInstance;

/* Need to look up our VipsArgument structs from a pspec. Just hash the
 * pointer (ie. we assume pspecs are never shared, is this correct?)
 */
typedef GHashTable VipsArgumentTable;

int vips_argument_get_id( void );
void vips__object_set_member( VipsObject *object, GParamSpec *pspec,
	GObject **member, GObject *argument );
typedef void *(*VipsArgumentMapFn)( VipsObject *object, GParamSpec *pspec,
	VipsArgumentClass *argument_class, 
	VipsArgumentInstance *argument_instance, void *a, void *b );
void *vips_argument_map( VipsObject *object, 
	VipsArgumentMapFn fn, void *a, void *b );
int vips_object_get_args( VipsObject *object, 
	const char ***names, int **flags, int *n_args );
typedef void *(*VipsArgumentClassMapFn)( VipsObjectClass *object_class, 
	GParamSpec *pspec,
	VipsArgumentClass *argument_class, void *a, void *b );
void *vips_argument_class_map( VipsObjectClass *object_class, 
	VipsArgumentClassMapFn fn, void *a, void *b );
gboolean vips_argument_class_needsstring( VipsArgumentClass *argument_class );
int vips_object_get_argument( VipsObject *object, const char *name,
	GParamSpec **pspec,
	VipsArgumentClass **argument_class,
	VipsArgumentInstance **argument_instance );
gboolean vips_object_argument_isset( VipsObject *object, const char *name );
VipsArgumentFlags vips_object_get_argument_flags( VipsObject *object, 
	const char *name );
int vips_object_get_argument_priority( VipsObject *object, const char *name );

/* We have to loop over an objects args in several places, and we can't always
 * use vips_argument_map(), the preferred looper. Have the loop code as a
 * macro as well for these odd cases.
 */
#define VIPS_ARGUMENT_FOR_ALL( OBJECT, PSPEC, ARG_CLASS, ARG_INSTANCE ) { \
	VipsObjectClass *object_class = VIPS_OBJECT_GET_CLASS( OBJECT ); \
	GSList *p; \
 	\
	for( p = object_class->argument_table_traverse; p; p = p->next ) { \
		VipsArgumentClass *ARG_CLASS = \
			(VipsArgumentClass *) p->data; \
		VipsArgument *argument = (VipsArgument *) argument_class; \
		GParamSpec *PSPEC = argument->pspec; \
		VipsArgumentInstance *ARG_INSTANCE __attribute__ ((unused)) = \
			vips__argument_get_instance( argument_class, \
			VIPS_OBJECT( OBJECT ) ); \

#define VIPS_ARGUMENT_FOR_ALL_END } }

/* And some macros to collect args from a va list. 
 *
 * Use something like this:

	GParamSpec *pspec;
	VipsArgumentClass *argument_class;
	VipsArgumentInstance *argument_instance;

	if( vips_object_get_argument( VIPS_OBJECT( operation ), name,
		&pspec, &argument_class, &argument_instance ) )
		return( -1 );

	VIPS_ARGUMENT_COLLECT_SET( pspec, argument_class, ap );

		GValue value holds the value of an input argument, do 
		something with it

	VIPS_ARGUMENT_COLLECT_GET( pspec, argument_class, ap );

		void **arg points to where to write an output argument

	VIPS_ARGUMENT_COLLECT_END
 
 */
#define VIPS_ARGUMENT_COLLECT_SET( PSPEC, ARG_CLASS, AP ) \
	if( (ARG_CLASS->flags & VIPS_ARGUMENT_INPUT) ) { \
		GValue value = { 0, }; \
		gchar *error = NULL; \
 		\
		/* Input args are given inline, eg. ("factor", 12.0)  \
		 * and must be collected. \
		 */ \
		g_value_init( &value, G_PARAM_SPEC_VALUE_TYPE( PSPEC ) ); \
		G_VALUE_COLLECT( &value, AP, 0, &error ); \
		\
		/* Don't bother with the error message. \
		 */ \
		if( error ) { \
			VIPS_DEBUG_MSG( "VIPS_OBJECT_COLLECT_SET: err\n" ); \
			g_free( error ); \
		}

#define VIPS_ARGUMENT_COLLECT_GET( PSPEC, ARG_CLASS, AP ) \
		g_value_unset( &value ); \
	} \
	else if( (ARG_CLASS->flags & VIPS_ARGUMENT_OUTPUT) ) { \
		void **arg __attribute__ ((unused)); \
 		\
		/* Output args are a pointer to where to send the \
		 * result. \
		 */ \
		arg = va_arg( AP, void ** ); 

#define VIPS_ARGUMENT_COLLECT_END \
	} 

#define VIPS_TYPE_OBJECT (vips_object_get_type())
#define VIPS_OBJECT( obj ) \
	(G_TYPE_CHECK_INSTANCE_CAST( (obj), VIPS_TYPE_OBJECT, VipsObject ))
#define VIPS_OBJECT_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_CAST( (klass), VIPS_TYPE_OBJECT, VipsObjectClass))
#define VIPS_IS_OBJECT( obj ) \
	(G_TYPE_CHECK_INSTANCE_TYPE( (obj), VIPS_TYPE_OBJECT ))
#define VIPS_IS_OBJECT_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_TYPE( (klass), VIPS_TYPE_OBJECT ))
#define VIPS_OBJECT_GET_CLASS( obj ) \
	(G_TYPE_INSTANCE_GET_CLASS( (obj), VIPS_TYPE_OBJECT, VipsObjectClass ))

struct _VipsObject {
	GObject parent_instance;

	/* Set after ->build() has run succesfully: construct is fully done
	 * and checked.
	 */
	gboolean constructed;

	/* Set for static objects which are allocated at startup and never
	 * freed. These objects are ommitted from leak reports.
	 */
	gboolean static_object;

	/* Table of argument instances for this class and any derived classes.
	 */
	VipsArgumentTable *argument_table;

	/* Class properties (see below), duplicated in the instance so we can
	 * get at them easily via the property system.
	 */
	char *nickname;
	char *description;

	/* The pre/post/close callbacks are all fire-once. 
	 */
	gboolean preclose;
	gboolean close;
	gboolean postclose;

	/* Total memory allocated relative to this object, handy for
	 * profiling.
	 */
	size_t local_memory;

};

struct _VipsObjectClass {
	GObjectClass parent_class;

	/* Build the object ... all argument properties have been set,
	 * now build the thing.
	 */
	int (*build)( VipsObject *object );

	/* Just after build ... the object is fully ready for work. 
	 */
	int (*postbuild)( VipsObject *object );

	/* Try to print something about the class, handy for help displays.
	 * Keep to one line.
	 */
	void (*summary_class)( struct _VipsObjectClass *cls, VipsBuf *buf );

	/* Try to print a one-line summary for the object, the user can see
	 * this output via things like "header fred.tif", --vips-cache-trace,
	 * etc. 
	 */
	void (*summary)( VipsObject *object, VipsBuf *buf );

	/* Try to print everything about the object, handy for debugging.
	 */
	void (*dump)( VipsObject *object, VipsBuf *buf );

	/* Sanity-check the object. Print messages and stuff. 
	 * Handy for debugging.
	 */
	void (*sanity)( VipsObject *object, VipsBuf *buf );

	/* Rewind. Save and restore any stuff that needs to survive a
	 * dispose().
	 */
	void (*rewind)( VipsObject *object );

	/* Just before close, everything is still alive.
	 */
	void (*preclose)( VipsObject *object );

	/* Close, time to free stuff.
	 */
	void (*close)( VipsObject *object );

	/* Post-close, everything is dead, except the VipsObject pointer.
	 * Useful for eg. deleting the file associated with a temp image.
	 */
	void (*postclose)( VipsObject *object );

	/* The CLI interface. Implement these four to get CLI input and output
	 * for your object.
	 */

	/* Given a command-line arg (eg. a filename), make an instance of the
	 * object. Just do the g_object_new(), don't call _build().
	 *
	 * Don't call this directly, see vips_object_new_from_string().
	 */
	VipsObject *(*new_from_string)( const char *string );

	/* The inverse of ^^. Given an object, output what ->new_from_string()
	 * would have been given to make that object. 
	 */
	void (*to_string)( VipsObject *object, VipsBuf *buf ); 

	/* Does this output arg need an arg from the command line? Image
	 * output, for example, needs a filename to write to.
	 */
	gboolean output_needs_arg;

	/* Write the object to the string. Return 0 for success, or -1 on
	 * error, setting vips_error(). string is NULL if output_needs_arg()
	 * was FALSE.
	 */
	int (*output_to_arg)( VipsObject *object, const char *string );

	/* Class nickname, eg. "VipsInterpolateBicubic" has "bicubic" as a
	 * nickname. Not internationalised. 
	 */
	const char *nickname;

	/* Class description. Used for help messages, so internationalised.
	 */
	const char *description;

	/* Hash from pspec to VipsArgumentClass.
	 *
	 * This records the VipsArgumentClass for every pspec used in 
	 * VipsObject and any subclass (ie. everywhere), so it's huge. Don't
	 * loop over this hash! Fine for lookups though.
	 */
	VipsArgumentTable *argument_table;

	/* A sorted (by priority) list of the VipsArgumentClass for this class 
	 * and any superclasses. This is small and specific to this class.
	 *
	 * Use the stored GType to work out when to restart the list for a
	 * subclass.
	 */
	GSList *argument_table_traverse;
	GType argument_table_traverse_gtype;

	/* This class is deprecated and therefore hidden from various UI bits.
	 *
	 * VipsOperation has a deprecated flag, use that in preference to this
	 * if you can. 
	 */
	gboolean deprecated;

	/* Reserved for future expansion.
	 */
	void (*_vips_reserved1)( void ); 
	void (*_vips_reserved2)( void ); 
	void (*_vips_reserved3)( void ); 
	void (*_vips_reserved4)( void ); 
};

gboolean vips_value_is_null( GParamSpec *psoec, const GValue *value );
void vips_object_set_property( GObject *gobject, 
	guint property_id, const GValue *value, GParamSpec *pspec );
void vips_object_get_property( GObject *gobject, 
	guint property_id, GValue *value, GParamSpec *pspec );

void vips_object_preclose( VipsObject *object );
int vips_object_build( VipsObject *object );

void vips_object_summary_class( VipsObjectClass *klass, VipsBuf *buf );
void vips_object_summary( VipsObject *object, VipsBuf *buf );
void vips_object_dump( VipsObject *object, VipsBuf *buf );

void vips_object_print_summary_class( VipsObjectClass *klass );
void vips_object_print_summary( VipsObject *object );
void vips_object_print_dump( VipsObject *object );
void vips_object_print_name( VipsObject *object );

gboolean vips_object_sanity( VipsObject *object );

/* Don't put spaces around void here, it breaks gtk-doc.
 */
GType vips_object_get_type(void);

void vips_object_class_install_argument( VipsObjectClass *cls, 
	GParamSpec *pspec, VipsArgumentFlags flags, 
	int priority, guint offset );
int vips_object_set_argument_from_string( VipsObject *object, 
	const char *name, const char *value );
gboolean vips_object_argument_needsstring( VipsObject *object, 
	const char *name );
int vips_object_get_argument_to_string( VipsObject *object, 
	const char *name, const char *arg );
int vips_object_set_required( VipsObject *object, const char *value );

typedef void *(*VipsObjectSetArguments)( VipsObject *object, void *a, void *b );
VipsObject *vips_object_new( GType type, 
	VipsObjectSetArguments set, void *a, void *b );

int vips_object_set_valist( VipsObject *object, va_list ap );
int vips_object_set( VipsObject *object, ... )
	__attribute__((sentinel));
int vips_object_set_from_string( VipsObject *object, const char *string );

VipsObject *vips_object_new_from_string( VipsObjectClass *object_class, 
	const char *p );
void vips_object_to_string( VipsObject *object, VipsBuf *buf );

void *vips_object_map( VipsSListMap2Fn fn, void *a, void *b );

typedef void *(*VipsTypeMapFn)( GType type, void *a );
typedef void *(*VipsTypeMap2Fn)( GType type, void *a, void *b );
typedef void *(*VipsClassMapFn)( VipsObjectClass *cls, void *a );
void *vips_type_map( GType base, VipsTypeMap2Fn fn, void *a, void *b );
void *vips_type_map_all( GType base, VipsTypeMapFn fn, void *a );
int vips_type_depth( GType type );
GType vips_type_find( const char *basename, const char *nickname );
const char *vips_nickname_find( GType type );

void *vips_class_map_all( GType type, VipsClassMapFn fn, void *a );
const VipsObjectClass *vips_class_find( const char *basename, 
	const char *nickname );

VipsObject **vips_object_local_array( VipsObject *parent, int n );

void vips_object_local_cb( VipsObject *vobject, GObject *gobject );
#define vips_object_local( V, G ) \
	(g_signal_connect( V, "close", G_CALLBACK( vips_object_local_cb ), G ))

void vips_object_set_static( VipsObject *object, gboolean static_object );
void vips_object_print_all( void );
void vips_object_sanity_all( void );

void vips_object_rewind( VipsObject *object );

void vips_object_unref_outputs( VipsObject *object );

const char *vips_object_get_description( VipsObject *object );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_OBJECT_H*/


