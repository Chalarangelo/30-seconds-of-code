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

#ifndef __G_INITABLE_H__
#define __G_INITABLE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_INITABLE            (g_initable_get_type ())
#define G_INITABLE(obj)            (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_INITABLE, GInitable))
#define G_IS_INITABLE(obj)         (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_INITABLE))
#define G_INITABLE_GET_IFACE(obj)  (G_TYPE_INSTANCE_GET_INTERFACE ((obj), G_TYPE_INITABLE, GInitableIface))
#define G_TYPE_IS_INITABLE(type)   (g_type_is_a ((type), G_TYPE_INITABLE))

/**
 * GInitable:
 *
 * Interface for initializable objects.
 *
 * Since: 2.22
 **/
typedef struct _GInitableIface GInitableIface;

/**
 * GInitableIface:
 * @g_iface: The parent interface.
 * @init: Initializes the object.
 *
 * Provides an interface for initializing object such that initialization
 * may fail.
 *
 * Since: 2.22
 **/
struct _GInitableIface
{
  GTypeInterface g_iface;

  /* Virtual Table */

  gboolean    (* init) (GInitable    *initable,
			GCancellable *cancellable,
			GError      **error);
};


GLIB_AVAILABLE_IN_ALL
GType    g_initable_get_type   (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
gboolean g_initable_init       (GInitable     *initable,
				GCancellable  *cancellable,
				GError       **error);

GLIB_AVAILABLE_IN_ALL
gpointer g_initable_new        (GType          object_type,
				GCancellable  *cancellable,
				GError       **error,
				const gchar   *first_property_name,
				...);

GLIB_DEPRECATED_IN_2_54_FOR(g_object_new_with_properties and g_initable_init)
gpointer g_initable_newv       (GType          object_type,
				guint          n_parameters,
				GParameter    *parameters,
				GCancellable  *cancellable,
				GError       **error);
GLIB_AVAILABLE_IN_ALL
GObject* g_initable_new_valist (GType          object_type,
				const gchar   *first_property_name,
				va_list        var_args,
				GCancellable  *cancellable,
				GError       **error);

G_END_DECLS


#endif /* __G_INITABLE_H__ */
