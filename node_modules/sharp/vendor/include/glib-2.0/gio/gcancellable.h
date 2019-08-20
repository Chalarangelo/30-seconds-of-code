/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_CANCELLABLE_H__
#define __G_CANCELLABLE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_CANCELLABLE         (g_cancellable_get_type ())
#define G_CANCELLABLE(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_CANCELLABLE, GCancellable))
#define G_CANCELLABLE_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_CANCELLABLE, GCancellableClass))
#define G_IS_CANCELLABLE(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_CANCELLABLE))
#define G_IS_CANCELLABLE_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_CANCELLABLE))
#define G_CANCELLABLE_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_CANCELLABLE, GCancellableClass))

/**
 * GCancellable:
 *
 * Allows actions to be cancelled.
 */
typedef struct _GCancellableClass   GCancellableClass;
typedef struct _GCancellablePrivate GCancellablePrivate;

struct _GCancellable
{
  GObject parent_instance;

  /*< private >*/
  GCancellablePrivate *priv;
};

struct _GCancellableClass
{
  GObjectClass parent_class;

  void (* cancelled) (GCancellable *cancellable);

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};

GLIB_AVAILABLE_IN_ALL
GType         g_cancellable_get_type               (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GCancellable *g_cancellable_new                    (void);

/* These are only safe to call inside a cancellable op */
GLIB_AVAILABLE_IN_ALL
gboolean      g_cancellable_is_cancelled           (GCancellable  *cancellable);
GLIB_AVAILABLE_IN_ALL
gboolean      g_cancellable_set_error_if_cancelled (GCancellable  *cancellable,
						    GError       **error);

GLIB_AVAILABLE_IN_ALL
int           g_cancellable_get_fd                 (GCancellable  *cancellable);
GLIB_AVAILABLE_IN_ALL
gboolean      g_cancellable_make_pollfd            (GCancellable  *cancellable,
						    GPollFD       *pollfd);
GLIB_AVAILABLE_IN_ALL
void          g_cancellable_release_fd             (GCancellable  *cancellable);

GLIB_AVAILABLE_IN_ALL
GSource *     g_cancellable_source_new             (GCancellable  *cancellable);

GLIB_AVAILABLE_IN_ALL
GCancellable *g_cancellable_get_current            (void);
GLIB_AVAILABLE_IN_ALL
void          g_cancellable_push_current           (GCancellable  *cancellable);
GLIB_AVAILABLE_IN_ALL
void          g_cancellable_pop_current            (GCancellable  *cancellable);
GLIB_AVAILABLE_IN_ALL
void          g_cancellable_reset                  (GCancellable  *cancellable);
GLIB_AVAILABLE_IN_ALL
gulong        g_cancellable_connect                (GCancellable  *cancellable,
						    GCallback      callback,
						    gpointer       data,
						    GDestroyNotify data_destroy_func);
GLIB_AVAILABLE_IN_ALL
void          g_cancellable_disconnect             (GCancellable  *cancellable,
						    gulong         handler_id);


/* This is safe to call from another thread */
GLIB_AVAILABLE_IN_ALL
void          g_cancellable_cancel       (GCancellable  *cancellable);

G_END_DECLS

#endif /* __G_CANCELLABLE_H__ */
