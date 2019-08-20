/* -*- Mode: C; indent-tabs-mode: nil; c-basic-offset: 4 -*- */
/* vim: set sw=4 sts=4 expandtab: */
/* 
   rsvg.h: SAX-based renderer for SVG files into a GdkPixbuf.
 
   Copyright (C) 2000 Eazel, Inc.
  
   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU Library General Public License as
   published by the Free Software Foundation; either version 2 of the
   License, or (at your option) any later version.
  
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   Library General Public License for more details.
  
   You should have received a copy of the GNU Library General Public
   License along with this program; if not, write to the
   Free Software Foundation, Inc., 59 Temple Place - Suite 330,
   Boston, MA 02111-1307, USA.
  
   Author: Raph Levien <raph@artofcode.com>
*/

#ifndef RSVG_H
#define RSVG_H

#define __RSVG_RSVG_H_INSIDE__

#include <glib-object.h>
#include <gio/gio.h>

#include <gdk-pixbuf/gdk-pixbuf.h>

G_BEGIN_DECLS

#if defined(RSVG_DISABLE_DEPRECATION_WARNINGS) || !GLIB_CHECK_VERSION (2, 31, 0)
#define RSVG_DEPRECATED
#define RSVG_DEPRECATED_FOR(f)
#else
#define RSVG_DEPRECATED G_DEPRECATED
#define RSVG_DEPRECATED_FOR(f) G_DEPRECATED_FOR(f)
#endif

#define RSVG_TYPE_HANDLE                  (rsvg_handle_get_type ())
#define RSVG_HANDLE(obj)                  (G_TYPE_CHECK_INSTANCE_CAST ((obj), RSVG_TYPE_HANDLE, RsvgHandle))
#define RSVG_HANDLE_CLASS(klass)          (G_TYPE_CHECK_CLASS_CAST ((klass), RSVG_TYPE_HANDLE, RsvgHandleClass))
#define RSVG_IS_HANDLE(obj)               (G_TYPE_CHECK_INSTANCE_TYPE ((obj), RSVG_TYPE_HANDLE))
#define RSVG_IS_HANDLE_CLASS(klass)       (G_TYPE_CHECK_CLASS_TYPE ((klass), RSVG_TYPE_HANDLE))
#define RSVG_HANDLE_GET_CLASS(obj)        (G_TYPE_INSTANCE_GET_CLASS ((obj), RSVG_TYPE_HANDLE, RsvgHandleClass))

GType rsvg_handle_get_type (void);

/**
 * RsvgError:
 * @RSVG_ERROR_FAILED: the request failed
 *
 * An enumeration representing possible errors
 */
typedef enum {
    RSVG_ERROR_FAILED
} RsvgError;

#define RSVG_ERROR (rsvg_error_quark ())
GQuark rsvg_error_quark (void) G_GNUC_CONST;

GType rsvg_error_get_type (void);
#define RSVG_TYPE_ERROR (rsvg_error_get_type())

typedef struct _RsvgHandle RsvgHandle;
typedef struct RsvgHandlePrivate RsvgHandlePrivate;
typedef struct _RsvgHandleClass RsvgHandleClass;
typedef struct _RsvgDimensionData RsvgDimensionData;
typedef struct _RsvgPositionData RsvgPositionData;

/**
 * RsvgHandleClass:
 * @parent: parent class
 *
 * Class structure for #RsvgHandle.
 */
struct _RsvgHandleClass {
    GObjectClass parent;

    /*< private >*/
    gpointer _abi_padding[15];
};

/**
 * RsvgHandle:
 * @parent: parent instance
 *
 * Lets you load SVG data and render it.
 */
struct _RsvgHandle {
    GObject parent;

    /*< private >*/

    RsvgHandlePrivate *priv;

    gpointer _abi_padding[15];
};

/**
 * RsvgDimensionData:
 * @width: SVG's width, in pixels
 * @height: SVG's height, in pixels
 * @em: em
 * @ex: ex
 */
struct _RsvgDimensionData {
    int width;
    int height;
    gdouble em;
    gdouble ex;
};

/**
 * RsvgPositionData:
 * @x: position on the x axis
 * @y: position on the y axis
 *
 * Position of an SVG fragment.
 */
struct _RsvgPositionData {
    int x;
    int y;
};

void rsvg_cleanup (void);

RSVG_DEPRECATED
void rsvg_set_default_dpi	(double dpi);

RSVG_DEPRECATED
void rsvg_set_default_dpi_x_y	(double dpi_x, double dpi_y);

void rsvg_handle_set_dpi	(RsvgHandle * handle, double dpi);
void rsvg_handle_set_dpi_x_y	(RsvgHandle * handle, double dpi_x, double dpi_y);

RsvgHandle  *rsvg_handle_new		(void);
gboolean     rsvg_handle_write		(RsvgHandle * handle, const guchar * buf, 
                                     gsize count, GError ** error);
gboolean     rsvg_handle_close		(RsvgHandle * handle, GError ** error);
GdkPixbuf   *rsvg_handle_get_pixbuf	(RsvgHandle * handle);
GdkPixbuf   *rsvg_handle_get_pixbuf_sub (RsvgHandle * handle, const char *id);

const char  *rsvg_handle_get_base_uri (RsvgHandle * handle);
void         rsvg_handle_set_base_uri (RsvgHandle * handle, const char *base_uri);

void rsvg_handle_get_dimensions (RsvgHandle * handle, RsvgDimensionData * dimension_data);

gboolean rsvg_handle_get_dimensions_sub (RsvgHandle * handle, RsvgDimensionData * dimension_data, const char *id);
gboolean rsvg_handle_get_position_sub (RsvgHandle * handle, RsvgPositionData * position_data, const char *id);

gboolean rsvg_handle_has_sub (RsvgHandle * handle, const char *id);

/* GIO APIs */

/**
 * RsvgHandleFlags:
 * @RSVG_HANDLE_FLAGS_NONE: none
 * @RSVG_HANDLE_FLAG_UNLIMITED: Allow any SVG XML without size limitations.
 *   For security reasons, this should only be used for trusted input!
 *   Since: 2.40.3
 * @RSVG_HANDLE_FLAG_KEEP_IMAGE_DATA: Keeps the image data when loading images,
 *  for use by cairo when painting to e.g. a PDF surface. This will make the
 *  resulting PDF file smaller and faster.
 *  Since: 2.40.3
 */
typedef enum /*< flags >*/ 
{
    RSVG_HANDLE_FLAGS_NONE           = 0,
    RSVG_HANDLE_FLAG_UNLIMITED       = 1 << 0,
    RSVG_HANDLE_FLAG_KEEP_IMAGE_DATA = 1 << 1
} RsvgHandleFlags;

GType rsvg_handle_flags_get_type (void);
#define RSVG_TYPE_HANDLE_FLAGS (rsvg_handle_flags_get_type())

RsvgHandle *rsvg_handle_new_with_flags (RsvgHandleFlags flags);

void        rsvg_handle_set_base_gfile (RsvgHandle *handle,
                                        GFile      *base_file);

gboolean    rsvg_handle_read_stream_sync (RsvgHandle   *handle,
                                          GInputStream *stream,
                                          GCancellable *cancellable,
                                          GError      **error);

RsvgHandle *rsvg_handle_new_from_gfile_sync (GFile          *file,
                                             RsvgHandleFlags flags,
                                             GCancellable   *cancellable,
                                             GError        **error);

RsvgHandle *rsvg_handle_new_from_stream_sync (GInputStream   *input_stream,
                                              GFile          *base_file,
                                              RsvgHandleFlags flags,
                                              GCancellable   *cancellable,
                                              GError        **error);

RsvgHandle *rsvg_handle_new_from_data (const guint8 * data, gsize data_len, GError ** error);
RsvgHandle *rsvg_handle_new_from_file (const gchar * file_name, GError ** error);

void rsvg_handle_internal_set_testing (RsvgHandle *handle, gboolean testing);

/* BEGIN deprecated APIs. Do not use! */

#ifndef __GI_SCANNER__

RSVG_DEPRECATED_FOR(g_type_init)
void rsvg_init (void);
RSVG_DEPRECATED
void rsvg_term (void);

RSVG_DEPRECATED_FOR(g_object_unref)
void rsvg_handle_free (RsvgHandle * handle);

/**
 * RsvgSizeFunc:
 * @width: (out): the width of the SVG
 * @height: (out): the height of the SVG
 * @user_data: user data
 *
 * Function to let a user of the library specify the SVG's dimensions
 *
 * Deprecated: Set up a cairo matrix and use rsvg_handle_render_cairo() instead.
 * See the documentation for rsvg_handle_set_size_callback() for an example.
 */
/* RSVG_DEPRECATED */ typedef void (*RsvgSizeFunc) (gint * width, gint * height, gpointer user_data);

RSVG_DEPRECATED
void rsvg_handle_set_size_callback (RsvgHandle * handle,
                                    RsvgSizeFunc size_func,
                                    gpointer user_data, GDestroyNotify user_data_destroy);

/* GdkPixbuf convenience API */

RSVG_DEPRECATED
GdkPixbuf *rsvg_pixbuf_from_file            (const gchar * file_name, GError ** error);
RSVG_DEPRECATED
GdkPixbuf *rsvg_pixbuf_from_file_at_zoom    (const gchar * file_name,
                                             double x_zoom, double y_zoom, GError ** error);
RSVG_DEPRECATED
GdkPixbuf *rsvg_pixbuf_from_file_at_size    (const gchar * file_name, gint width, gint height,
                                             GError ** error);
RSVG_DEPRECATED
GdkPixbuf *rsvg_pixbuf_from_file_at_max_size    (const gchar * file_name,
                                                 gint max_width, gint max_height, GError ** error);
RSVG_DEPRECATED
GdkPixbuf *rsvg_pixbuf_from_file_at_zoom_with_max (const gchar * file_name,
                                                   double x_zoom,
                                                   double y_zoom,
                                                   gint max_width, gint max_height, GError ** error);

RSVG_DEPRECATED
const char *rsvg_handle_get_title       (RsvgHandle * handle);
RSVG_DEPRECATED
const char *rsvg_handle_get_desc        (RsvgHandle * handle);
RSVG_DEPRECATED
const char *rsvg_handle_get_metadata    (RsvgHandle * handle);

#endif /* !__GI_SCANNER__ */

/* END deprecated APIs. */

G_END_DECLS

#include "librsvg-features.h"
#include "rsvg-cairo.h"

#undef __RSVG_RSVG_H_INSIDE__

#endif                          /* RSVG_H */
