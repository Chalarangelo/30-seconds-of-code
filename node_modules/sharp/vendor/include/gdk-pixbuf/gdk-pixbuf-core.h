/* GdkPixbuf library - GdkPixbuf data structure
 *
 * Copyright (C) 2003 The Free Software Foundation
 *
 * Authors: Mark Crichton <crichton@gimp.org>
 *          Miguel de Icaza <miguel@gnu.org>
 *          Federico Mena-Quintero <federico@gimp.org>
 *          Havoc Pennington <hp@redhat.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef GDK_PIXBUF_CORE_H
#define GDK_PIXBUF_CORE_H

#if defined(GDK_PIXBUF_DISABLE_SINGLE_INCLUDES) && !defined (GDK_PIXBUF_H_INSIDE) && !defined (GDK_PIXBUF_COMPILATION)
#error "Only <gdk-pixbuf/gdk-pixbuf.h> can be included directly."
#endif

#include <glib.h>
#include <glib-object.h>
#include <gio/gio.h>

#include <gdk-pixbuf/gdk-pixbuf-macros.h>

G_BEGIN_DECLS

/**
 * SECTION:gdk-pixbuf
 * @Short_description: Information that describes an image.
 * @Title: The GdkPixbuf Structure
 * 
 * The #GdkPixbuf structure contains
 * information that describes an image in memory.
 * 
 * ## Image Data ## {#image-data}
 *
 * Image data in a pixbuf is stored in memory in uncompressed,
 * packed format.  Rows in the image are stored top to bottom, and
 * in each row pixels are stored from left to right.  There may be
 * padding at the end of a row.  The "rowstride" value of a pixbuf,
 * as returned by gdk_pixbuf_get_rowstride(), indicates the number
 * of bytes between rows.
 * 
 * ## put_pixel() Example ## {#put-pixel}
 * 
 * The following code illustrates a simple put_pixel()
 * function for RGB pixbufs with 8 bits per channel with an alpha
 * channel.  It is not included in the gdk-pixbuf library for
 * performance reasons; rather than making several function calls
 * for each pixel, your own code can take shortcuts.
 * 
 * |[<!-- language="C" -->
 * static void
 * put_pixel (GdkPixbuf *pixbuf, int x, int y, guchar red, guchar green, guchar blue, guchar alpha)
 * {
 *   int width, height, rowstride, n_channels;
 *   guchar *pixels, *p;
 * 
 *   n_channels = gdk_pixbuf_get_n_channels (pixbuf);
 * 
 *   g_assert (gdk_pixbuf_get_colorspace (pixbuf) == GDK_COLORSPACE_RGB);
 *   g_assert (gdk_pixbuf_get_bits_per_sample (pixbuf) == 8);
 *   g_assert (gdk_pixbuf_get_has_alpha (pixbuf));
 *   g_assert (n_channels == 4);
 * 
 *   width = gdk_pixbuf_get_width (pixbuf);
 *   height = gdk_pixbuf_get_height (pixbuf);
 * 
 *   g_assert (x >= 0 && x < width);
 *   g_assert (y >= 0 && y < height);
 * 
 *   rowstride = gdk_pixbuf_get_rowstride (pixbuf);
 *   pixels = gdk_pixbuf_get_pixels (pixbuf);
 * 
 *   p = pixels + y * rowstride + x * n_channels;
 *   p[0] = red;
 *   p[1] = green;
 *   p[2] = blue;
 *   p[3] = alpha;
 * }
 * ]|
 * 
 * This function will not work for pixbufs with images that are
 * other than 8 bits per sample or channel, but it will work for
 * most of the pixbufs that GTK+ uses.
 * 
 * If you are doing memcpy() of raw pixbuf data, note that the last row
 * in the pixbuf may not be as wide as the full rowstride, but rather
 * just as wide as the pixel data needs to be. That is, it is unsafe to
 * do `memcpy (dest, pixels, rowstride * height)` to copy a whole pixbuf.
 * Use gdk_pixbuf_copy() instead, or compute the width in bytes of the
 * last row as `width * ((n_channels * bits_per_sample + 7) / 8)`.
 */


/**
 * GdkPixbufAlphaMode:
 * @GDK_PIXBUF_ALPHA_BILEVEL: A bilevel clipping mask (black and white)
 *  will be created and used to draw the image.  Pixels below 0.5 opacity
 *  will be considered fully transparent, and all others will be
 *  considered fully opaque.
 * @GDK_PIXBUF_ALPHA_FULL: For now falls back to #GDK_PIXBUF_ALPHA_BILEVEL.
 *  In the future it will do full alpha compositing.
 * 
 * These values can be passed to
 * gdk_pixbuf_xlib_render_to_drawable_alpha() to control how the alpha
 * channel of an image should be handled.  This function can create a
 * bilevel clipping mask (black and white) and use it while painting
 * the image.  In the future, when the X Window System gets an alpha
 * channel extension, it will be possible to do full alpha
 * compositing onto arbitrary drawables.  For now both cases fall
 * back to a bilevel clipping mask.
 */
typedef enum
{
        GDK_PIXBUF_ALPHA_BILEVEL,
        GDK_PIXBUF_ALPHA_FULL
} GdkPixbufAlphaMode;

/**
 * GdkColorspace:
 * @GDK_COLORSPACE_RGB: Indicates a red/green/blue additive color space.
 * 
 * This enumeration defines the color spaces that are supported by
 * the gdk-pixbuf library.  Currently only RGB is supported.
 */
/* Note that these values are encoded in inline pixbufs
 * as ints, so don't reorder them
 */
typedef enum {
	GDK_COLORSPACE_RGB
} GdkColorspace;

/* All of these are opaque structures */

/**
 * GdkPixbuf:
 * 
 * This is the main structure in the gdk-pixbuf library.  It is
 * used to represent images.  It contains information about the
 * image's pixel data, its color space, bits per sample, width and
 * height, and the rowstride (the number of bytes between the start of
 * one row and the start of the next). 
 */
typedef struct _GdkPixbuf GdkPixbuf;

#define GDK_TYPE_PIXBUF              (gdk_pixbuf_get_type ())
#define GDK_PIXBUF(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), GDK_TYPE_PIXBUF, GdkPixbuf))
#define GDK_IS_PIXBUF(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), GDK_TYPE_PIXBUF))


/**
 * GdkPixbufDestroyNotify:
 * @pixels: (array) (element-type guint8): The pixel array of the pixbuf
 *   that is being finalized.
 * @data: (closure): User closure data.
 * 
 * A function of this type is responsible for freeing the pixel array
 * of a pixbuf.  The gdk_pixbuf_new_from_data() function lets you
 * pass in a pre-allocated pixel array so that a pixbuf can be
 * created from it; in this case you will need to pass in a function
 * of #GdkPixbufDestroyNotify so that the pixel data can be freed
 * when the pixbuf is finalized.
 */
typedef void (* GdkPixbufDestroyNotify) (guchar *pixels, gpointer data);

/**
 * GDK_PIXBUF_ERROR:
 * 
 * Error domain used for pixbuf operations. Indicates that the error code
 * will be in the #GdkPixbufError enumeration. See #GError for
 * information on error domains and error codes.
 */
#define GDK_PIXBUF_ERROR gdk_pixbuf_error_quark ()

/**
 * GdkPixbufError:
 * @GDK_PIXBUF_ERROR_CORRUPT_IMAGE: An image file was broken somehow.
 * @GDK_PIXBUF_ERROR_INSUFFICIENT_MEMORY: Not enough memory.
 * @GDK_PIXBUF_ERROR_BAD_OPTION: A bad option was passed to a pixbuf save module.
 * @GDK_PIXBUF_ERROR_UNKNOWN_TYPE: Unknown image type.
 * @GDK_PIXBUF_ERROR_UNSUPPORTED_OPERATION: Don't know how to perform the
 *  given operation on the type of image at hand.
 * @GDK_PIXBUF_ERROR_FAILED: Generic failure code, something went wrong.
 * @GDK_PIXBUF_ERROR_INCOMPLETE_ANIMATION: Only part of the animation was loaded.
 * 
 * An error code in the #GDK_PIXBUF_ERROR domain. Many gdk-pixbuf
 * operations can cause errors in this domain, or in the #G_FILE_ERROR
 * domain.
 */
typedef enum {
        /* image data hosed */
        GDK_PIXBUF_ERROR_CORRUPT_IMAGE,
        /* no mem to load image */
        GDK_PIXBUF_ERROR_INSUFFICIENT_MEMORY,
        /* bad option passed to save routine */
        GDK_PIXBUF_ERROR_BAD_OPTION,
        /* unsupported image type (sort of an ENOSYS) */
        GDK_PIXBUF_ERROR_UNKNOWN_TYPE,
        /* unsupported operation (load, save) for image type */
        GDK_PIXBUF_ERROR_UNSUPPORTED_OPERATION,
        GDK_PIXBUF_ERROR_FAILED,
        GDK_PIXBUF_ERROR_INCOMPLETE_ANIMATION
} GdkPixbufError;

GDK_PIXBUF_AVAILABLE_IN_ALL
GQuark gdk_pixbuf_error_quark (void);



GDK_PIXBUF_AVAILABLE_IN_ALL
GType gdk_pixbuf_get_type (void) G_GNUC_CONST;

/* Reference counting */

#ifndef GDK_PIXBUF_DISABLE_DEPRECATED
GDK_PIXBUF_DEPRECATED_IN_2_0_FOR(g_object_ref)
GdkPixbuf *gdk_pixbuf_ref      (GdkPixbuf *pixbuf);
GDK_PIXBUF_DEPRECATED_IN_2_0_FOR(g_object_unref)
void       gdk_pixbuf_unref    (GdkPixbuf *pixbuf);
#endif

/* GdkPixbuf accessors */

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkColorspace gdk_pixbuf_get_colorspace      (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
int           gdk_pixbuf_get_n_channels      (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean      gdk_pixbuf_get_has_alpha       (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
int           gdk_pixbuf_get_bits_per_sample (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
guchar       *gdk_pixbuf_get_pixels          (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
int           gdk_pixbuf_get_width           (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
int           gdk_pixbuf_get_height          (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_ALL
int           gdk_pixbuf_get_rowstride       (const GdkPixbuf *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_2_26
gsize         gdk_pixbuf_get_byte_length     (const GdkPixbuf *pixbuf);

GDK_PIXBUF_AVAILABLE_IN_2_26
guchar       *gdk_pixbuf_get_pixels_with_length (const GdkPixbuf *pixbuf,
                                                 guint           *length);

GDK_PIXBUF_AVAILABLE_IN_2_32
const guint8* gdk_pixbuf_read_pixels         (const GdkPixbuf  *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_2_32
GBytes *      gdk_pixbuf_read_pixel_bytes    (const GdkPixbuf  *pixbuf);



/* Create a blank pixbuf with an optimal rowstride and a new buffer */

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new (GdkColorspace colorspace, gboolean has_alpha, int bits_per_sample,
			   int width, int height);

GDK_PIXBUF_AVAILABLE_IN_2_36
gint gdk_pixbuf_calculate_rowstride (GdkColorspace colorspace,
				     gboolean      has_alpha,
				     int           bits_per_sample,
				     int           width,
				     int           height);

/* Copy a pixbuf */
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_copy (const GdkPixbuf *pixbuf);

/* Create a pixbuf which points to the pixels of another pixbuf */
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new_subpixbuf (GdkPixbuf *src_pixbuf,
                                     int        src_x,
                                     int        src_y,
                                     int        width,
                                     int        height);

/* Simple loading */

#ifdef G_OS_WIN32
/* In previous versions these _utf8 variants where exported and linked to
 * by default. Export them here for ABI (and gi API) compat.
 */

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new_from_file_utf8 (const char *filename,
                                          GError    **error);
GDK_PIXBUF_AVAILABLE_IN_2_4
GdkPixbuf *gdk_pixbuf_new_from_file_at_size_utf8 (const char *filename,
                                                  int         width,
                                                  int         height,
                                                  GError    **error);
GDK_PIXBUF_AVAILABLE_IN_2_6
GdkPixbuf *gdk_pixbuf_new_from_file_at_scale_utf8 (const char *filename,
                                                   int         width,
                                                   int         height,
                                                   gboolean    preserve_aspect_ratio,
                                                   GError    **error);
#endif

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new_from_file (const char *filename,
                                     GError    **error);
GDK_PIXBUF_AVAILABLE_IN_2_4
GdkPixbuf *gdk_pixbuf_new_from_file_at_size (const char *filename,
					     int         width, 
					     int         height,
					     GError    **error);
GDK_PIXBUF_AVAILABLE_IN_2_6
GdkPixbuf *gdk_pixbuf_new_from_file_at_scale (const char *filename,
					      int         width, 
					      int         height,
					      gboolean    preserve_aspect_ratio,
					      GError    **error);
GDK_PIXBUF_AVAILABLE_IN_2_26
GdkPixbuf *gdk_pixbuf_new_from_resource (const char *resource_path,
					 GError    **error);
GDK_PIXBUF_AVAILABLE_IN_2_26
GdkPixbuf *gdk_pixbuf_new_from_resource_at_scale (const char *resource_path,
						  int         width,
						  int         height,
						  gboolean    preserve_aspect_ratio,
						  GError    **error);

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new_from_data (const guchar *data,
				     GdkColorspace colorspace,
				     gboolean has_alpha,
				     int bits_per_sample,
				     int width, int height,
				     int rowstride,
				     GdkPixbufDestroyNotify destroy_fn,
				     gpointer destroy_fn_data);

GDK_PIXBUF_AVAILABLE_IN_2_32
GdkPixbuf *gdk_pixbuf_new_from_bytes (GBytes *data,
				      GdkColorspace colorspace,
				      gboolean has_alpha,
				      int bits_per_sample,
				      int width, int height,
				      int rowstride);

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new_from_xpm_data (const char **data);

#ifndef GDK_PIXBUF_DISABLE_DEPRECATED
GDK_PIXBUF_DEPRECATED_IN_2_32
GdkPixbuf* gdk_pixbuf_new_from_inline	(gint          data_length,
					 const guint8 *data,
					 gboolean      copy_pixels,
					 GError      **error);
#endif

/* Mutations */
GDK_PIXBUF_AVAILABLE_IN_ALL
void       gdk_pixbuf_fill              (GdkPixbuf    *pixbuf,
                                         guint32       pixel);

/* Saving */

#ifndef __GTK_DOC_IGNORE__
#ifdef G_OS_WIN32
/* DLL ABI stability hack. */
#define gdk_pixbuf_save gdk_pixbuf_save_utf8
#endif
#endif

GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean gdk_pixbuf_save           (GdkPixbuf  *pixbuf, 
                                    const char *filename, 
                                    const char *type, 
                                    GError    **error,
                                    ...) G_GNUC_NULL_TERMINATED;

GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean gdk_pixbuf_savev          (GdkPixbuf  *pixbuf, 
                                    const char *filename, 
                                    const char *type,
                                    char      **option_keys,
                                    char      **option_values,
                                    GError    **error);

#ifdef G_OS_WIN32
GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean gdk_pixbuf_savev_utf8     (GdkPixbuf  *pixbuf,
                                    const char *filename,
                                    const char *type,
                                    char      **option_keys,
                                    char      **option_values,
                                    GError    **error);
#endif

/* Saving to a callback function */


/**
 * GdkPixbufSaveFunc:
 * @buf: (array length=count) (element-type guint8): bytes to be written.
 * @count: number of bytes in @buf. 
 * @error: (out): A location to return an error.
 * @data: (closure): user data passed to gdk_pixbuf_save_to_callback(). 
 * 
 * Specifies the type of the function passed to
 * gdk_pixbuf_save_to_callback().  It is called once for each block of
 * bytes that is "written" by gdk_pixbuf_save_to_callback().  If
 * successful it should return %TRUE.  If an error occurs it should set
 * @error and return %FALSE, in which case gdk_pixbuf_save_to_callback()
 * will fail with the same error.
 * 
 * Since: 2.4
 * Returns: %TRUE if successful, %FALSE (with @error set) if failed.
 */

typedef gboolean (*GdkPixbufSaveFunc)   (const gchar *buf,
					 gsize count,
					 GError **error,
					 gpointer data);

GDK_PIXBUF_AVAILABLE_IN_2_4
gboolean gdk_pixbuf_save_to_callback    (GdkPixbuf  *pixbuf,
					 GdkPixbufSaveFunc save_func,
					 gpointer user_data,
					 const char *type, 
					 GError    **error,
					 ...) G_GNUC_NULL_TERMINATED;

GDK_PIXBUF_AVAILABLE_IN_2_4
gboolean gdk_pixbuf_save_to_callbackv   (GdkPixbuf  *pixbuf, 
					 GdkPixbufSaveFunc save_func,
					 gpointer user_data,
					 const char *type,
					 char      **option_keys,
					 char      **option_values,
					 GError    **error);

/* Saving into a newly allocated char array */

GDK_PIXBUF_AVAILABLE_IN_2_4
gboolean gdk_pixbuf_save_to_buffer      (GdkPixbuf  *pixbuf,
					 gchar     **buffer,
					 gsize      *buffer_size,
					 const char *type, 
					 GError    **error,
					 ...) G_GNUC_NULL_TERMINATED;

GDK_PIXBUF_AVAILABLE_IN_2_4
gboolean gdk_pixbuf_save_to_bufferv     (GdkPixbuf  *pixbuf,
					 gchar     **buffer,
					 gsize      *buffer_size,
					 const char *type, 
					 char      **option_keys,
					 char      **option_values,
					 GError    **error);

GDK_PIXBUF_AVAILABLE_IN_2_14
GdkPixbuf *gdk_pixbuf_new_from_stream   (GInputStream   *stream,
					 GCancellable   *cancellable,
                                         GError        **error);

GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_new_from_stream_async (GInputStream        *stream,
				       GCancellable        *cancellable,
				       GAsyncReadyCallback  callback,
				       gpointer             user_data);

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_new_from_stream_finish (GAsyncResult  *async_result,
					      GError       **error);

GDK_PIXBUF_AVAILABLE_IN_2_14
GdkPixbuf *gdk_pixbuf_new_from_stream_at_scale   (GInputStream   *stream,
                                                  gint            width,
                                                  gint            height,
                                                  gboolean        preserve_aspect_ratio,
						  GCancellable   *cancellable,
                                                  GError        **error);

GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_new_from_stream_at_scale_async (GInputStream        *stream,
						gint                 width,
						gint                 height,
						gboolean             preserve_aspect_ratio,
						GCancellable        *cancellable,
						GAsyncReadyCallback  callback,
						gpointer             user_data);

GDK_PIXBUF_AVAILABLE_IN_2_14
gboolean   gdk_pixbuf_save_to_stream    (GdkPixbuf      *pixbuf,
                                         GOutputStream  *stream,
                                         const char     *type,
					 GCancellable   *cancellable,
                                         GError        **error,
                                         ...);

GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_save_to_stream_async (GdkPixbuf           *pixbuf,
				      GOutputStream       *stream,
				      const gchar         *type,
				      GCancellable        *cancellable,
				      GAsyncReadyCallback  callback,
				      gpointer             user_data,
				      ...);

GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean gdk_pixbuf_save_to_stream_finish (GAsyncResult  *async_result,
					   GError       **error);

GDK_PIXBUF_AVAILABLE_IN_2_36
void gdk_pixbuf_save_to_streamv_async (GdkPixbuf           *pixbuf,
                                       GOutputStream       *stream,
                                       const gchar         *type,
                                       gchar              **option_keys,
                                       gchar              **option_values,
                                       GCancellable        *cancellable,
                                       GAsyncReadyCallback  callback,
                                       gpointer             user_data);

GDK_PIXBUF_AVAILABLE_IN_2_36
gboolean gdk_pixbuf_save_to_streamv (GdkPixbuf      *pixbuf,
                                     GOutputStream  *stream,
                                     const char     *type,
                                     char          **option_keys,
                                     char          **option_values,
                                     GCancellable   *cancellable,
                                     GError        **error);

/* Adding an alpha channel */
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_add_alpha (const GdkPixbuf *pixbuf, gboolean substitute_color,
				 guchar r, guchar g, guchar b);

/* Copy an area of a pixbuf onto another one */
GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_copy_area (const GdkPixbuf *src_pixbuf,
			   int src_x, int src_y,
			   int width, int height,
			   GdkPixbuf *dest_pixbuf,
			   int dest_x, int dest_y);

/* Brighten/darken and optionally make it pixelated-looking */
GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_saturate_and_pixelate (const GdkPixbuf *src,
                                       GdkPixbuf       *dest,
                                       gfloat           saturation,
                                       gboolean         pixelate);

/* Transform an image to agree with its embedded orientation option / tag */
GDK_PIXBUF_AVAILABLE_IN_2_12
GdkPixbuf *gdk_pixbuf_apply_embedded_orientation (GdkPixbuf *src);

/*  key/value pairs that can be attached by the pixbuf loader  */
GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean gdk_pixbuf_set_option  (GdkPixbuf   *pixbuf,
                                 const gchar *key,
                                 const gchar *value);
GDK_PIXBUF_AVAILABLE_IN_ALL
const gchar * gdk_pixbuf_get_option (GdkPixbuf   *pixbuf,
                                              const gchar *key);
GDK_PIXBUF_AVAILABLE_IN_2_36
gboolean gdk_pixbuf_remove_option (GdkPixbuf   *pixbuf,
                                   const gchar *key);
GDK_PIXBUF_AVAILABLE_IN_2_32
GHashTable * gdk_pixbuf_get_options (GdkPixbuf   *pixbuf);
GDK_PIXBUF_AVAILABLE_IN_2_36
gboolean gdk_pixbuf_copy_options (GdkPixbuf *src_pixbuf,
                                  GdkPixbuf *dest_pixbuf);


G_END_DECLS


#endif /* GDK_PIXBUF_CORE_H */
