/* -*- Mode: C; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 8 -*- */
/* GdkPixbuf library - Animation support
 *
 * Copyright (C) 1999 The Free Software Foundation
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

#ifndef GDK_PIXBUF_ANIMATION_H
#define GDK_PIXBUF_ANIMATION_H

#if defined(GDK_PIXBUF_DISABLE_SINGLE_INCLUDES) && !defined (GDK_PIXBUF_H_INSIDE) && !defined (GDK_PIXBUF_COMPILATION)
#error "Only <gdk-pixbuf/gdk-pixbuf.h> can be included directly."
#endif

#include <glib-object.h>
#include <gdk-pixbuf/gdk-pixbuf-core.h>

G_BEGIN_DECLS

/* Animation support */

/**
 * GdkPixbufAnimation:
 *
 * An opaque struct representing an animation.
 */
typedef struct _GdkPixbufAnimation GdkPixbufAnimation;


/**
 * GdkPixbufAnimationIter:
 *
 * An opaque struct representing an iterator which points to a
 * certain position in an animation.
 */
typedef struct _GdkPixbufAnimationIter GdkPixbufAnimationIter;

#define GDK_TYPE_PIXBUF_ANIMATION              (gdk_pixbuf_animation_get_type ())
#define GDK_PIXBUF_ANIMATION(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), GDK_TYPE_PIXBUF_ANIMATION, GdkPixbufAnimation))
#define GDK_IS_PIXBUF_ANIMATION(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), GDK_TYPE_PIXBUF_ANIMATION))

#define GDK_TYPE_PIXBUF_ANIMATION_ITER              (gdk_pixbuf_animation_iter_get_type ())
#define GDK_PIXBUF_ANIMATION_ITER(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), GDK_TYPE_PIXBUF_ANIMATION_ITER, GdkPixbufAnimationIter))
#define GDK_IS_PIXBUF_ANIMATION_ITER(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), GDK_TYPE_PIXBUF_ANIMATION_ITER))

GDK_PIXBUF_AVAILABLE_IN_ALL
GType               gdk_pixbuf_animation_get_type        (void) G_GNUC_CONST;

#ifdef G_OS_WIN32
/* API/ABI compat, see gdk-pixbuf-core.h for details */
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbufAnimation *gdk_pixbuf_animation_new_from_file_utf8   (const char         *filename,
                                                               GError            **error);
#endif

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbufAnimation *gdk_pixbuf_animation_new_from_file   (const char         *filename,
                                                          GError            **error);
GDK_PIXBUF_AVAILABLE_IN_2_28
GdkPixbufAnimation *gdk_pixbuf_animation_new_from_stream (GInputStream       *stream,
                                                          GCancellable       *cancellable,
                                                          GError            **error);
GDK_PIXBUF_AVAILABLE_IN_2_28
void                gdk_pixbuf_animation_new_from_stream_async (GInputStream *stream,
                                                          GCancellable       *cancellable,
                                                          GAsyncReadyCallback callback,
                                                          gpointer            user_data);
GDK_PIXBUF_AVAILABLE_IN_2_28
GdkPixbufAnimation *gdk_pixbuf_animation_new_from_stream_finish (GAsyncResult*async_result,
                                                          GError            **error);
GDK_PIXBUF_AVAILABLE_IN_2_28
GdkPixbufAnimation *gdk_pixbuf_animation_new_from_resource(const char        *resource_path,
                                                          GError            **error);

#ifndef GDK_PIXBUF_DISABLE_DEPRECATED

GDK_PIXBUF_DEPRECATED_IN_2_0_FOR(g_object_ref)
GdkPixbufAnimation *gdk_pixbuf_animation_ref             (GdkPixbufAnimation *animation);
GDK_PIXBUF_DEPRECATED_IN_2_0_FOR(g_object_unref)
void                gdk_pixbuf_animation_unref           (GdkPixbufAnimation *animation);
#endif

GDK_PIXBUF_AVAILABLE_IN_ALL
int                 gdk_pixbuf_animation_get_width       (GdkPixbufAnimation *animation);
GDK_PIXBUF_AVAILABLE_IN_ALL
int                 gdk_pixbuf_animation_get_height      (GdkPixbufAnimation *animation);
GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean            gdk_pixbuf_animation_is_static_image  (GdkPixbufAnimation *animation);
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf          *gdk_pixbuf_animation_get_static_image (GdkPixbufAnimation *animation);

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbufAnimationIter *gdk_pixbuf_animation_get_iter                        (GdkPixbufAnimation     *animation,
                                                                              const GTimeVal         *start_time);
GDK_PIXBUF_AVAILABLE_IN_ALL
GType                   gdk_pixbuf_animation_iter_get_type                   (void) G_GNUC_CONST;
GDK_PIXBUF_AVAILABLE_IN_ALL
int                     gdk_pixbuf_animation_iter_get_delay_time             (GdkPixbufAnimationIter *iter);
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf              *gdk_pixbuf_animation_iter_get_pixbuf                 (GdkPixbufAnimationIter *iter);
GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean                gdk_pixbuf_animation_iter_on_currently_loading_frame (GdkPixbufAnimationIter *iter);
GDK_PIXBUF_AVAILABLE_IN_ALL
gboolean                gdk_pixbuf_animation_iter_advance                    (GdkPixbufAnimationIter *iter,
                                                                              const GTimeVal         *current_time);


#ifdef GDK_PIXBUF_ENABLE_BACKEND



/**
 * GdkPixbufAnimationClass:
 * @parent_class: the parent class
 * @is_static_image: returns whether the given animation is just a static image.
 * @get_static_image: returns a static image representing the given animation.
 * @get_size: fills @width and @height with the frame size of the animation.
 * @get_iter: returns an iterator for the given animation.
 * 
 * Modules supporting animations must derive a type from 
 * #GdkPixbufAnimation, providing suitable implementations of the 
 * virtual functions.
 */
typedef struct _GdkPixbufAnimationClass GdkPixbufAnimationClass;

#define GDK_PIXBUF_ANIMATION_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), GDK_TYPE_PIXBUF_ANIMATION, GdkPixbufAnimationClass))
#define GDK_IS_PIXBUF_ANIMATION_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), GDK_TYPE_PIXBUF_ANIMATION))
#define GDK_PIXBUF_ANIMATION_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), GDK_TYPE_PIXBUF_ANIMATION, GdkPixbufAnimationClass))

/* Private part of the GdkPixbufAnimation structure */
struct _GdkPixbufAnimation {
        GObject parent_instance;

};

struct _GdkPixbufAnimationClass {
        GObjectClass parent_class;

        /*< public >*/

        gboolean                (*is_static_image)  (GdkPixbufAnimation *anim);

        GdkPixbuf*              (*get_static_image) (GdkPixbufAnimation *anim);
        
        void                    (*get_size) (GdkPixbufAnimation *anim,
                                             int                 *width,
                                             int                 *height);
        
        GdkPixbufAnimationIter* (*get_iter) (GdkPixbufAnimation *anim,
                                             const GTimeVal     *start_time);

};



/**
 * GdkPixbufAnimationIterClass:
 * @parent_class: the parent class
 * @get_delay_time: returns the time in milliseconds that the current frame 
 *  should be shown.
 * @get_pixbuf: returns the current frame.
 * @on_currently_loading_frame: returns whether the current frame of @iter is 
 *  being loaded.
 * @advance: advances the iterator to @current_time, possibly changing the 
 *  current frame.
 * 
 * Modules supporting animations must derive a type from 
 * #GdkPixbufAnimationIter, providing suitable implementations of the 
 * virtual functions.
 */
typedef struct _GdkPixbufAnimationIterClass GdkPixbufAnimationIterClass;

#define GDK_PIXBUF_ANIMATION_ITER_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), GDK_TYPE_PIXBUF_ANIMATION_ITER, GdkPixbufAnimationIterClass))
#define GDK_IS_PIXBUF_ANIMATION_ITER_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), GDK_TYPE_PIXBUF_ANIMATION_ITER))
#define GDK_PIXBUF_ANIMATION_ITER_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), GDK_TYPE_PIXBUF_ANIMATION_ITER, GdkPixbufAnimationIterClass))

struct _GdkPixbufAnimationIter {
        GObject parent_instance;

};

struct _GdkPixbufAnimationIterClass {
        GObjectClass parent_class;

        /*< public >*/

        int        (*get_delay_time)   (GdkPixbufAnimationIter *iter);

        GdkPixbuf* (*get_pixbuf)       (GdkPixbufAnimationIter *iter);

        gboolean   (*on_currently_loading_frame) (GdkPixbufAnimationIter *iter);

        gboolean   (*advance)          (GdkPixbufAnimationIter *iter,
                                        const GTimeVal         *current_time);
};
      

GDK_PIXBUF_AVAILABLE_IN_ALL
GType               gdk_pixbuf_non_anim_get_type (void) G_GNUC_CONST;
GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbufAnimation* gdk_pixbuf_non_anim_new (GdkPixbuf *pixbuf);

#endif /* GDK_PIXBUF_ENABLE_BACKEND */

G_END_DECLS

#endif /* GDK_PIXBUF_ANIMATION_H */
