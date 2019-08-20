/* VIPS image class.
 *
 * 7/7/09
 * 	- from vips.h
 * 2/3/11
 * 	- move to GObject
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

#ifndef VIPS_IMAGE_H
#define VIPS_IMAGE_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

/* If you read MSB first, you get these two values.  
 * intel order: byte 0 = b6 
 * SPARC order: byte 0 = 08
 */
#define VIPS_MAGIC_INTEL (0xb6a6f208U)
#define VIPS_MAGIC_SPARC (0x08f2a6b6U)

/* We have a maximum value for a coordinate at various points for sanity
 * checking. For example, vips_black() has a max with and height. We use int
 * for width/height so we could go up to 2bn, but it's good to have a lower
 * value set so we can see crazy numbers early.
 *
 * This was 1m for a while, but someone found a use for a 4m wide image.
 */
#define VIPS_MAX_COORD (10000000)

typedef enum {
	VIPS_DEMAND_STYLE_ERROR = -1,	
	VIPS_DEMAND_STYLE_SMALLTILE,	
	VIPS_DEMAND_STYLE_FATSTRIP,
	VIPS_DEMAND_STYLE_THINSTRIP,
	VIPS_DEMAND_STYLE_ANY			
} VipsDemandStyle;

/* Types of image descriptor we may have. The type field is advisory only: it
 * does not imply that any fields in IMAGE have valid data.
 */
typedef enum {
	VIPS_IMAGE_ERROR = -1,	
	VIPS_IMAGE_NONE,		/* no type set */
	VIPS_IMAGE_SETBUF,		/* malloced memory array */
	VIPS_IMAGE_SETBUF_FOREIGN,	/* memory array, don't free on close */
	VIPS_IMAGE_OPENIN,		/* input from fd with a window */
	VIPS_IMAGE_MMAPIN,		/* memory mapped input file */
	VIPS_IMAGE_MMAPINRW,		/* memory mapped read/write file */
	VIPS_IMAGE_OPENOUT,		/* output to fd */
	VIPS_IMAGE_PARTIAL		/* partial image */
} VipsImageType;

typedef enum {
	VIPS_INTERPRETATION_ERROR = -1,
	VIPS_INTERPRETATION_MULTIBAND = 0,
	VIPS_INTERPRETATION_B_W = 1,
	VIPS_INTERPRETATION_HISTOGRAM = 10,
	VIPS_INTERPRETATION_XYZ = 12,
	VIPS_INTERPRETATION_LAB = 13,
	VIPS_INTERPRETATION_CMYK = 15,
	VIPS_INTERPRETATION_LABQ = 16,
	VIPS_INTERPRETATION_RGB = 17,
	VIPS_INTERPRETATION_CMC = 18,
	VIPS_INTERPRETATION_LCH = 19,
	VIPS_INTERPRETATION_LABS = 21,
	VIPS_INTERPRETATION_sRGB = 22,
	VIPS_INTERPRETATION_YXY = 23,
	VIPS_INTERPRETATION_FOURIER = 24,
	VIPS_INTERPRETATION_RGB16 = 25,
	VIPS_INTERPRETATION_GREY16 = 26,
	VIPS_INTERPRETATION_MATRIX = 27,
	VIPS_INTERPRETATION_scRGB = 28,
	VIPS_INTERPRETATION_HSV = 29,
	VIPS_INTERPRETATION_LAST = 30
} VipsInterpretation;

typedef enum {
	VIPS_FORMAT_NOTSET = -1,
	VIPS_FORMAT_UCHAR = 0,
	VIPS_FORMAT_CHAR = 1,
	VIPS_FORMAT_USHORT = 2,
	VIPS_FORMAT_SHORT = 3,
	VIPS_FORMAT_UINT = 4,
	VIPS_FORMAT_INT = 5,
	VIPS_FORMAT_FLOAT = 6,
	VIPS_FORMAT_COMPLEX = 7,
	VIPS_FORMAT_DOUBLE = 8,
	VIPS_FORMAT_DPCOMPLEX = 9,
	VIPS_FORMAT_LAST = 10
} VipsBandFormat;

typedef enum {
	VIPS_CODING_ERROR = -1,
	VIPS_CODING_NONE = 0,
	VIPS_CODING_LABQ = 2,
	VIPS_CODING_RAD = 6,
	VIPS_CODING_LAST = 7
} VipsCoding;

typedef enum {
	VIPS_ACCESS_RANDOM,
	VIPS_ACCESS_SEQUENTIAL,
	VIPS_ACCESS_SEQUENTIAL_UNBUFFERED,
	VIPS_ACCESS_LAST
} VipsAccess;

struct _VipsImage; 
struct _VipsRegion; 

typedef void *(*VipsStartFn)( struct _VipsImage *out, void *a, void *b );
typedef int (*VipsGenerateFn)( struct _VipsRegion *out, 
	void *seq, void *a, void *b, gboolean *stop );
typedef int (*VipsStopFn)( void *seq, void *a, void *b );

/* Struct we keep a record of execution time in. Passed to eval signal so
 * it can assess progress.
 */
typedef struct _VipsProgress {
	/*< private >*/
	struct _VipsImage *im;	/* Image we are part of */

	/*< public >*/
	int run;		/* Time we have been running */
	int eta;		/* Estimated seconds of computation left */
	gint64 tpels;		/* Number of pels we expect to calculate */
	gint64 npels;		/* Number of pels calculated so far */
	int percent;		/* Percent complete */
	GTimer *start;		/* Start time */
} VipsProgress;

#define VIPS_TYPE_IMAGE (vips_image_get_type())
#define VIPS_IMAGE( obj ) \
	(G_TYPE_CHECK_INSTANCE_CAST( (obj), \
	VIPS_TYPE_IMAGE, VipsImage ))
#define VIPS_IMAGE_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_CAST( (klass), \
	VIPS_TYPE_IMAGE, VipsImageClass))
#define VIPS_IS_IMAGE( obj ) \
	(G_TYPE_CHECK_INSTANCE_TYPE( (obj), VIPS_TYPE_IMAGE ))
#define VIPS_IS_IMAGE_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_TYPE( (klass), VIPS_TYPE_IMAGE ))
#define VIPS_IMAGE_GET_CLASS( obj ) \
	(G_TYPE_INSTANCE_GET_CLASS( (obj), \
	VIPS_TYPE_IMAGE, VipsImageClass ))

typedef struct _VipsImage {
	VipsObject parent_instance;

	/*< private >*/

	/* We have to keep these names for compatibility with the old API.
	 * Don't use them though, use vips_image_get_width() and friends.
	 */

	int Xsize;		/* image width, in pixels */
	int Ysize;		/* image height, in pixels */
	int Bands;		/* number of image bands */

	VipsBandFormat BandFmt;	/* pixel format */
	VipsCoding Coding;	/* pixel coding */
	VipsInterpretation Type;/* pixel interpretation */
	double Xres;		/* horizontal pixels per millimetre */
	double Yres;		/* vertical pixels per millimetre */

	int Xoffset;		/* image origin hint */
	int Yoffset;		/* image origin hint */

	/* No longer used, the names are here for compat with very, very old 
	 * code.
	 */
	int Length;
	short Compression;
	short Level;
	int Bbits;		/* was number of bits in this format */

	/* Old code expects to see this member, newer code has a param on
	 * eval().
	 */
	VipsProgress *time;

	/* Derived fields that some code can fiddle with. New code should use
	 * vips_image_get_history() and friends.
	 */
	char *Hist;		/* don't use, see vips_image_get_history() */
	char *filename;		/* pointer to copy of filename */
	VipsPel *data;		/* start of image data for WIO */
	int kill;		/* set to non-zero to block eval */

	/* Everything below this private and only used internally by
	 * VipsImage.
	 */

	/* During vips image read and write we need temporary float-sized
	 * fields in the struct for staging xres/yres. Don't use these any
	 * other time.
	 */
	float Xres_float;
	float Yres_float;

	char *mode;		/* mode string passed to _new() */
	VipsImageType dtype;	/* descriptor type */
	int fd;         	/* file descriptor */
	void *baseaddr;     	/* pointer to the start of an mmap file */
	size_t length;		/* size of mmap area */
	guint32 magic;		/* magic from header, endian-ness of image */

	/* Partial image stuff. All these fields are initialised 
	 * to NULL and ignored unless set by vips_image_generate() etc.
	 */
	VipsStartFn start_fn;
	VipsGenerateFn generate_fn;
	VipsStopFn stop_fn;
	void *client1;		/* user arguments */
	void *client2;
	GMutex *sslock;		/* start-stop lock */
	GSList *regions; 	/* list of regions current for this image */
	VipsDemandStyle dhint;	/* demand style hint */

	/* Extra user-defined fields ... see vips_image_get() etc.
	 */
	GHashTable *meta;	/* GhashTable of GValue */
	GSList *meta_traverse;	/* traverse order for Meta */

	/* Part of mmap() read ... the sizeof() the header we skip from the
	 * file start. Usually VIPS_SIZEOF_HEADER, but can be something else
	 * for binary file read.
	 *
	 * guint64 so that we can guarantee to work even on systems with
	 * strange ideas about large files.
	 */
	gint64 sizeof_header;

	/* If this is a large disc image, don't map the whole thing, instead
	 * have a set of windows shared between the regions active on the
	 * image. List of VipsWindow.
	 */
	GSList *windows;

	/* Upstream/downstream relationships, built from args to 
	 * vips_demand_hint().
	 *
	 * We use these to invalidate downstream pixel buffers.
	 * Use 'serial' to spot circular dependencies.
	 *
	 * See also hint_set below.
	 */
	GSList *upstream;
	GSList *downstream;
	int serial;

	/* Keep a list of recounted GValue strings so we can share hist
	 * efficiently.
	 */
	GSList *history_list;

	/* The VipsImage (if any) we should signal eval progress on.
	 */
	struct _VipsImage *progress_signal;

	/* Record the file length here. We use this to stop ourselves mapping
	 * things beyond the end of the file in the case that the file has
	 * been truncated.
	 *
	 * gint64 so that we can guarantee to work even on systems with
	 * strange ideas about large files.
	 */
	gint64 file_length;

	/* Set this when vips_demand_hint_array() is called, and check in any
	 * operation that will demand pixels from the image.
	 *
	 * We use vips_demand_hint_array() to build the tree of
	 * upstream/downstream relationships, so it's a mandatory thing.
	 */
	gboolean hint_set;

	/* Delete-on-close is hard to do with signals and callbacks since we
	 * really need to do this in finalize after the fd has been closed,
	 * but you can't emit signals then.
	 *
	 * Also keep a private copy of the filename string to be deleted,
	 * since image->filename will be freed in _dispose().
	 */
	gboolean delete_on_close;
	char *delete_on_close_filename;
} VipsImage;

typedef struct _VipsImageClass {
	VipsObjectClass parent_class;

	/* Signals we emit.
	 */

	/* Evaluation is starting.
	 */
	void (*preeval)( VipsImage *image, VipsProgress *progress );

	/* Evaluation progress.
	 */
	void (*eval)( VipsImage *image, VipsProgress *progress );

	/* Evaluation is ending.
	 */
	void (*posteval)( VipsImage *image, VipsProgress *progress );

	/* An image has been written to. 
	 * Used by eg. vips_image_new_mode("x.jpg", "w") to do the 
	 * final write to jpeg.
	 * Set *result to non-zero to indicate an error on write.
	 */
	void (*written)( VipsImage *image, int *result );

	/* An image has been modified in some way and all caches 
	 * need dropping. 
	 */
	void (*invalidate)( VipsImage *image );

	/* Minimise this pipeline. 
	 *
	 * This is triggered (sometimes) at the end of eval to signal that
	 * we're probably done and that operations involved should try to
	 * minimise memory use by, for example, dropping caches. 
	 *
	 * See vips_tilecache().
	 */
	void (*minimise)( VipsImage *image );

} VipsImageClass;

/* Don't put spaces around void here, it breaks gtk-doc.
 */
GType vips_image_get_type(void);

/* Has to be guint64 and not size_t/off_t since we have to be able to address
 * huge images on platforms with 32-bit files.
 */

/* Pixel address calculation macros.
 */
#define VIPS_IMAGE_SIZEOF_ELEMENT( I ) \
	(vips_format_sizeof_unsafe((I)->BandFmt))
#define VIPS_IMAGE_SIZEOF_PEL( I ) \
	(VIPS_IMAGE_SIZEOF_ELEMENT( I ) * (I)->Bands)
#define VIPS_IMAGE_SIZEOF_LINE( I ) \
	(VIPS_IMAGE_SIZEOF_PEL( I ) * (I)->Xsize)
#define VIPS_IMAGE_SIZEOF_IMAGE( I ) \
	(VIPS_IMAGE_SIZEOF_LINE( I ) * (I)->Ysize)
#define VIPS_IMAGE_N_ELEMENTS( I ) \
	((I)->Bands * (I)->Xsize)
#define VIPS_IMAGE_N_PELS( I ) \
	((guint64) (I)->Xsize * (I)->Ysize)

/* If VIPS_DEBUG is defined, add bounds checking.
 */
#ifdef VIPS_DEBUG
#define VIPS_IMAGE_ADDR( I, X, Y ) \
	( ((X) >= 0 && (X) < VIPS_IMAGE( I )->Xsize && \
	   (Y) >= 0 && (Y) < VIPS_IMAGE( I )->Ysize && \
	   VIPS_IMAGE( I )->data) ? \
	     (VIPS_IMAGE( I )->data + \
	       (Y) * VIPS_IMAGE_SIZEOF_LINE( I ) + \
	       (X) * VIPS_IMAGE_SIZEOF_PEL( I )) : \
	     (fprintf( stderr, \
		"VIPS_IMAGE_ADDR: point out of bounds, " \
		"file \"%s\", line %d\n" \
		"(point x=%d, y=%d\n" \
		" should have been within VipsRect left=%d, top=%d, " \
		"width=%d, height=%d)\n", \
		__FILE__, __LINE__, \
		(X), (Y), \
		0, 0, \
		VIPS_IMAGE( I )->Xsize, \
		VIPS_IMAGE( I )->Ysize ), (VipsPel *) NULL) \
	)
#else /*!VIPS_DEBUG*/
#define VIPS_IMAGE_ADDR( I, X, Y ) \
	((I)->data + \
	 (Y) * VIPS_IMAGE_SIZEOF_LINE( I ) + \
	 (X) * VIPS_IMAGE_SIZEOF_PEL( I ))
#endif /*VIPS_DEBUG*/

#ifdef VIPS_DEBUG
#define VIPS_MATRIX( I, X, Y ) \
	((VIPS_IMAGE( I )->BandFmt == VIPS_FORMAT_DOUBLE && \
	  VIPS_IMAGE( I )->Bands == 1) ? \
	 ((double *) VIPS_IMAGE_ADDR( I, X, Y )) : \
	 (fprintf( stderr, "VIPS_MATRIX: not a matrix image\n" ), \
	  	(double *) NULL)) 
#else /*!VIPS_DEBUG*/
#define VIPS_MATRIX( I, X, Y ) \
	((double *) VIPS_IMAGE_ADDR( I, X, Y ))
#endif /*VIPS_DEBUG*/

void vips_progress_set( gboolean progress );

void vips_image_invalidate_all( VipsImage *image );

void vips_image_minimise_all( VipsImage *image );

void vips_image_set_progress( VipsImage *image, gboolean progress );

char *vips_filename_get_filename( const char *vips_filename );
char *vips_filename_get_options( const char *vips_filename );

VipsImage *vips_image_new( void );
VipsImage *vips_image_new_memory( void );
VipsImage *vips_image_memory( void );
VipsImage *vips_image_new_from_file( const char *name, ... )
	__attribute__((sentinel));
VipsImage *vips_image_new_from_file_RW( const char *filename );
VipsImage *vips_image_new_from_file_raw( const char *filename, 
	int xsize, int ysize, int bands, guint64 offset );
VipsImage *vips_image_new_from_memory( const void *data, size_t size,
	int width, int height, int bands, VipsBandFormat format );
VipsImage *vips_image_new_from_memory_copy( const void *data, size_t size,
	int width, int height, int bands, VipsBandFormat format );
VipsImage *vips_image_new_from_buffer( const void *buf, size_t len, 
	const char *option_string, ... )
	__attribute__((sentinel));
VipsImage *vips_image_new_matrix( int width, int height );
VipsImage *vips_image_new_matrixv( int width, int height, ... );
VipsImage *vips_image_new_matrix_from_array( int width, int height, 
	const double *array, int size );
VipsImage *vips_image_matrix_from_array( int width, int height, 
	const double *array, int size );
VipsImage *vips_image_new_from_image( VipsImage *image, const double *c, int n );
VipsImage *vips_image_new_from_image1( VipsImage *image, double c );

void vips_image_set_delete_on_close( VipsImage *image, 
	gboolean delete_on_close );
guint64 vips_get_disc_threshold( void );
VipsImage *vips_image_new_temp_file( const char *format );

int vips_image_write( VipsImage *image, VipsImage *out );
int vips_image_write_to_file( VipsImage *image, const char *name, ... )
	__attribute__((sentinel));
int vips_image_write_to_buffer( VipsImage *in, 
	const char *suffix, void **buf, size_t *size, ... )
	__attribute__((sentinel));
void *vips_image_write_to_memory( VipsImage *in, size_t *size );

int vips_image_decode_predict( VipsImage *in, 
	int *bands, VipsBandFormat *format );
int vips_image_decode( VipsImage *in, VipsImage **out );
int vips_image_encode( VipsImage *in, VipsImage **out, VipsCoding coding );

gboolean vips_image_isMSBfirst( VipsImage *image );
gboolean vips_image_isfile( VipsImage *image );
gboolean vips_image_ispartial( VipsImage *image );
gboolean vips_image_hasalpha( VipsImage *image );

VipsImage *vips_image_copy_memory( VipsImage *image );
int vips_image_wio_input( VipsImage *image );
int vips_image_pio_input( VipsImage *image );
int vips_image_pio_output( VipsImage *image );
int vips_image_inplace( VipsImage *image );
int vips_image_write_prepare( VipsImage *image );

int vips_image_write_line( VipsImage *image, int ypos, VipsPel *linebuffer );

gboolean vips_band_format_isint( VipsBandFormat format );
gboolean vips_band_format_isuint( VipsBandFormat format );
gboolean vips_band_format_is8bit( VipsBandFormat format );
gboolean vips_band_format_isfloat( VipsBandFormat format );
gboolean vips_band_format_iscomplex( VipsBandFormat format );

int vips_system( const char *cmd_format, ... )
	__attribute__((sentinel));

/* Defined in type.c but declared here, since they use VipsImage.
 */
VipsArrayImage *vips_array_image_new( VipsImage **array, int n );
VipsArrayImage *vips_array_image_newv( int n, ... );
VipsArrayImage *vips_array_image_new_from_string( const char *string, 
	VipsAccess flags );
VipsArrayImage *vips_array_image_empty( void );
VipsArrayImage *vips_array_image_append( VipsArrayImage *array, 
	VipsImage *image );
VipsImage **vips_array_image_get( VipsArrayImage *array, int *n );
VipsImage **vips_value_get_array_image( const GValue *value, int *n );
void vips_value_set_array_image( GValue *value, int n );

/* Defined in reorder.c, but really a function on image.
 */
int vips_reorder_prepare_many( VipsImage *image, 
	struct _VipsRegion **regions, VipsRect *r );
void vips_reorder_margin_hint( VipsImage *image, int margin );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_IMAGE_H*/
