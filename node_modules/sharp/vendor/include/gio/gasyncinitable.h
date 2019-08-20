/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2009 Red Hat, Inc.
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

#ifndef __G_ASYNC_INITABLE_H__
#define __G_ASYNC_INITABLE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>
#include <gio/ginitable.h>

G_BEGIN_DECLS

#define G_TYPE_ASYNC_INITABLE            (g_async_initable_get_type ())
#define G_ASYNC_INITABLE(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_ASYNC_INITABLE, GAsyncInitable))
#define G_IS_ASYNC_INITABLE(obj)         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_ASYNC_INITABLE))
#define G_ASYNC_INITABLE_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_ASYNC_INITABLE, GAsyncInitableIface))
#define G_TYPE_IS_ASYNC_INITABLE(type)   (g_type_is_a ((type), G_TYPE_ASYNC_INITABLE))

/**
 * GAsyncInitable:
 *
 * Interface for asynchronously initializable objects.
 *
 * Since: 2.22
 **/
typedef struct _GAsyncInitableIface GAsyncInitableIface;

/**
 * GAsyncInitableIface:
 * @g_iface: The parent interface.
 * @init_async: Starts initialization of the object.
 * @init_finish: Finishes initialization of the object.
 *
 * Provides an interface for asynchronous initializing object such that
 * initialization may fail.
 *
 * Since: 2.22
 **/
struct _GAsyncInitableIface
{
  GTypeInterface g_iface;

  /* Virtual Table */

  void     (* init_async)  (GAsyncInitable      *initable,
			    int                  io_priority,
			    GCancellable        *cancellable,
			    GAsyncReadyCallback  callback,
			    gpointer             user_data);
  gboolean (* init_finish) (GAsyncInitable      *initable,
			    GAsyncResult        *res,
			    GError             **error);
};

GLIB_AVAILABLE_IN_ALL
GType    g_async_initable_get_type    (void) G_GNUC_CONST;


GLIB_AVAILABLE_IN_ALL
void     g_async_initable_init_async       (GAsyncInitable       *initable,
					    int                   io_priority,
					    GCancellable         *cancellable,
					    GAsyncReadyCallback   callback,
					    gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
gboolean g_async_initable_init_finish      (GAsyncInitable       *initable,
					    GAsyncResult         *res,
					    GError              **error);

GLIB_AVAILABLE_IN_ALL
void     g_async_initable_new_async        (GType                 object_type,
					    int                   io_priority,
					    GCancellable         *cancellable,
					    GAsyncReadyCallback   callback,
					    gpointer              user_data,
					    const gchar          *first_property_name,
					    ...);
GLIB_DEPRECATED_IN_2_54_FOR(g_object_new_with_properties and g_async_initable_init_async)
void     g_async_initable_newv_async       (GType                 object_type,
					    guint                 n_parameters,
					    GParameter           *parameters,
					    int                   io_priority,
					    GCancellable         *cancellable,
					    GAsyncReadyCallback   callback,
					    gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
void     g_async_initable_new_valist_async (GType                 object_type,
					    const gchar          *first_property_name,
					    va_list               var_args,
					    int                   io_priority,
					    GCancellable         *cancellable,
					    GAsyncReadyCallback   callback,
					    gpointer              user_data);
GLIB_AVAILABLE_IN_ALL
GObject *g_async_initable_new_finish       (GAsyncInitable       *initable,
					    GAsyncResult         *res,
					    GError              **error);



G_END_DECLS


#endif /* __G_ASYNC_INITABLE_H__ */
