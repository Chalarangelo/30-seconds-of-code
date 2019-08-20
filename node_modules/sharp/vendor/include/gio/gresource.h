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

#ifndef __G_RESOURCE_H__
#define __G_RESOURCE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

/**
 * G_TYPE_RESOURCE:
 *
 * The #GType for #GResource.
 */
#define G_TYPE_RESOURCE (g_resource_get_type ())


/**
 * G_RESOURCE_ERROR:
 *
 * Error domain for #GResource. Errors in this domain will be from the
 * #GResourceError enumeration. See #GError for more information on
 * error domains.
 */
#define G_RESOURCE_ERROR (g_resource_error_quark ())
GLIB_AVAILABLE_IN_2_32
GQuark g_resource_error_quark (void);

typedef struct _GStaticResource GStaticResource;

struct _GStaticResource {
  /*< private >*/
  const guint8 *data;
  gsize data_len;
  GResource *resource;
  GStaticResource *next;
  gpointer padding;
};

GLIB_AVAILABLE_IN_2_32
GType         g_resource_get_type            (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_2_32
GResource *   g_resource_new_from_data       (GBytes                *data,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
GResource *   g_resource_ref                 (GResource             *resource);
GLIB_AVAILABLE_IN_2_32
void          g_resource_unref               (GResource             *resource);
GLIB_AVAILABLE_IN_2_32
GResource *   g_resource_load                (const gchar           *filename,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
GInputStream *g_resource_open_stream         (GResource             *resource,
					      const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
GBytes *      g_resource_lookup_data         (GResource             *resource,
					      const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
char **       g_resource_enumerate_children  (GResource             *resource,
					      const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
gboolean      g_resource_get_info            (GResource             *resource,
					      const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      gsize                 *size,
					      guint32               *flags,
					      GError               **error);

GLIB_AVAILABLE_IN_2_32
void          g_resources_register           (GResource             *resource);
GLIB_AVAILABLE_IN_2_32
void          g_resources_unregister         (GResource             *resource);
GLIB_AVAILABLE_IN_2_32
GInputStream *g_resources_open_stream        (const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
GBytes *      g_resources_lookup_data        (const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
char **       g_resources_enumerate_children (const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      GError               **error);
GLIB_AVAILABLE_IN_2_32
gboolean      g_resources_get_info           (const char            *path,
					      GResourceLookupFlags   lookup_flags,
					      gsize                 *size,
					      guint32               *flags,
					      GError               **error);


GLIB_AVAILABLE_IN_2_32
void          g_static_resource_init          (GStaticResource *static_resource);
GLIB_AVAILABLE_IN_2_32
void          g_static_resource_fini          (GStaticResource *static_resource);
GLIB_AVAILABLE_IN_2_32
GResource    *g_static_resource_get_resource  (GStaticResource *static_resource);

G_END_DECLS

#endif /* __G_RESOURCE_H__ */
