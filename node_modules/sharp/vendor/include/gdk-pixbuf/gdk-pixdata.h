/* GdkPixbuf library - GdkPixdata - functions for inlined pixbuf handling
 * Copyright (C) 1999, 2001 Tim Janik
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
#ifndef __GDK_PIXDATA_H__
#define __GDK_PIXDATA_H__

#ifndef GDK_PIXBUF_DISABLE_DEPRECATED
#include        <gdk-pixbuf/gdk-pixbuf.h>

G_BEGIN_DECLS

/**
 * GDK_PIXBUF_MAGIC_NUMBER:
 *
 * Magic number for #GdkPixdata structures.
 **/
#define GDK_PIXBUF_MAGIC_NUMBER (0x47646b50)    /* 'GdkP' */

/**
 * GdkPixdataType:
 * @GDK_PIXDATA_COLOR_TYPE_RGB:  each pixel has red, green and blue samples.
 * @GDK_PIXDATA_COLOR_TYPE_RGBA: each pixel has red, green and blue samples 
 *    and an alpha value.
 * @GDK_PIXDATA_COLOR_TYPE_MASK: mask for the colortype flags of the enum.
 * @GDK_PIXDATA_SAMPLE_WIDTH_8: each sample has 8 bits.
 * @GDK_PIXDATA_SAMPLE_WIDTH_MASK: mask for the sample width flags of the enum.
 * @GDK_PIXDATA_ENCODING_RAW: the pixel data is in raw form. 
 * @GDK_PIXDATA_ENCODING_RLE: the pixel data is run-length encoded. Runs may 
 *    be up to 127 bytes long; their length is stored in a single byte 
 *    preceding the pixel data for the run. If a run is constant, its length
 *    byte has the high bit set and the pixel data consists of a single pixel
 *    which must be repeated. 
 * @GDK_PIXDATA_ENCODING_MASK: mask for the encoding flags of the enum.
 *
 * An enumeration containing three sets of flags for a #GdkPixdata struct: 
 * one for the used colorspace, one for the width of the samples and one 
 * for the encoding of the pixel data.  
 **/
typedef enum
{
  /* colorspace + alpha */
  GDK_PIXDATA_COLOR_TYPE_RGB    = 0x01,
  GDK_PIXDATA_COLOR_TYPE_RGBA   = 0x02,
  GDK_PIXDATA_COLOR_TYPE_MASK   = 0xff,
  /* width, support 8bits only currently */
  GDK_PIXDATA_SAMPLE_WIDTH_8    = 0x01 << 16,
  GDK_PIXDATA_SAMPLE_WIDTH_MASK = 0x0f << 16,
  /* encoding */
  GDK_PIXDATA_ENCODING_RAW      = 0x01 << 24,
  GDK_PIXDATA_ENCODING_RLE      = 0x02 << 24,
  GDK_PIXDATA_ENCODING_MASK     = 0x0f << 24
} GdkPixdataType;

/**
 * GdkPixdata:
 * @magic: magic number. A valid #GdkPixdata structure must have 
 *    #GDK_PIXBUF_MAGIC_NUMBER here.
 * @length: less than 1 to disable length checks, otherwise 
 *    #GDK_PIXDATA_HEADER_LENGTH + length of @pixel_data. 
 * @pixdata_type: information about colorspace, sample width and 
 *    encoding, in a #GdkPixdataType. 
 * @rowstride: Distance in bytes between rows.
 * @width: Width of the image in pixels.
 * @height: Height of the image in pixels.
 * @pixel_data: (array) (element-type guint8): @width x @height pixels, encoded according to @pixdata_type
 *   and @rowstride.
 *
 * A #GdkPixdata contains pixbuf information in a form suitable for 
 * serialization and streaming.
 **/
typedef struct _GdkPixdata GdkPixdata;
struct _GdkPixdata
{
  guint32 magic;        /* GDK_PIXBUF_MAGIC_NUMBER */
  gint32  length;       /* <1 to disable length checks, otherwise:
			 * GDK_PIXDATA_HEADER_LENGTH + pixel_data length
			 */
  guint32 pixdata_type; /* GdkPixdataType */
  guint32 rowstride;
  guint32 width;
  guint32 height;
  guint8 *pixel_data;
};

/**
 * GDK_PIXDATA_HEADER_LENGTH:
 *
 * The length of a #GdkPixdata structure without the @pixel_data pointer.
 **/
#define	GDK_PIXDATA_HEADER_LENGTH	(4 + 4 + 4 + 4 + 4 + 4)

/* the returned stream is plain htonl of GdkPixdata members + pixel_data */
GDK_PIXBUF_DEPRECATED_IN_2_32
guint8*		gdk_pixdata_serialize	(const GdkPixdata	*pixdata,
					 guint			*stream_length_p);
GDK_PIXBUF_DEPRECATED_IN_2_32
gboolean	gdk_pixdata_deserialize	(GdkPixdata		*pixdata,
					 guint			 stream_length,
					 const guint8		*stream,
					 GError		       **error);
GDK_PIXBUF_DEPRECATED_IN_2_32
gpointer	gdk_pixdata_from_pixbuf	(GdkPixdata		*pixdata,
					 const GdkPixbuf	*pixbuf,
					 gboolean		 use_rle);
GDK_PIXBUF_DEPRECATED_IN_2_32
GdkPixbuf*	gdk_pixbuf_from_pixdata	(const GdkPixdata	*pixdata,
					 gboolean		 copy_pixels,
					 GError		       **error);
/** 
 * GdkPixdataDumpType:
 * @GDK_PIXDATA_DUMP_PIXDATA_STREAM: Generate pixbuf data stream (a single 
 *    string containing a serialized #GdkPixdata structure in network byte 
 *    order).
 * @GDK_PIXDATA_DUMP_PIXDATA_STRUCT: Generate #GdkPixdata structure (needs 
 *    the #GdkPixdata structure definition from gdk-pixdata.h).
 * @GDK_PIXDATA_DUMP_MACROS: Generate <function>*_ROWSTRIDE</function>,     
 *    <function>*_WIDTH</function>, <function>*_HEIGHT</function>,
 *    <function>*_BYTES_PER_PIXEL</function> and 
 *    <function>*_RLE_PIXEL_DATA</function> or <function>*_PIXEL_DATA</function>
 *    macro definitions for the image.
 * @GDK_PIXDATA_DUMP_GTYPES: Generate GLib data types instead of 
 *    standard C data types.
 * @GDK_PIXDATA_DUMP_CTYPES: Generate standard C data types instead of 
 *    GLib data types.
 * @GDK_PIXDATA_DUMP_STATIC: Generate static symbols.
 * @GDK_PIXDATA_DUMP_CONST: Generate const symbols.
 * @GDK_PIXDATA_DUMP_RLE_DECODER: Provide a <function>*_RUN_LENGTH_DECODE(image_buf, rle_data, size, bpp)</function> 
 *    macro definition  to  decode  run-length encoded image data.
 *  
 * An enumeration which is used by gdk_pixdata_to_csource() to
 * determine the form of C source to be generated. The three values
 * @GDK_PIXDATA_DUMP_PIXDATA_STREAM, @GDK_PIXDATA_DUMP_PIXDATA_STRUCT
 * and @GDK_PIXDATA_DUMP_MACROS are mutually exclusive, as are
 * @GDK_PIXBUF_DUMP_GTYPES and @GDK_PIXBUF_DUMP_CTYPES. The remaining
 * elements are optional flags that can be freely added. 
 **/
typedef enum
{
  /* type of source to save */
  GDK_PIXDATA_DUMP_PIXDATA_STREAM	= 0,
  GDK_PIXDATA_DUMP_PIXDATA_STRUCT	= 1,
  GDK_PIXDATA_DUMP_MACROS		= 2,
  /* type of variables to use */
  GDK_PIXDATA_DUMP_GTYPES		= 0,
  GDK_PIXDATA_DUMP_CTYPES		= 1 << 8,
  GDK_PIXDATA_DUMP_STATIC		= 1 << 9,
  GDK_PIXDATA_DUMP_CONST		= 1 << 10,
  /* save RLE decoder macro? */
  GDK_PIXDATA_DUMP_RLE_DECODER		= 1 << 16
} GdkPixdataDumpType;
  

GDK_PIXBUF_DEPRECATED_IN_2_32
GString*	gdk_pixdata_to_csource	(GdkPixdata		*pixdata,
					 const gchar		*name,
					 GdkPixdataDumpType	 dump_type);


G_END_DECLS

#endif /* GDK_PIXBUF_DISABLE_DEPRECATED */

#endif /* __GDK_PIXDATA_H__ */
