/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright 2011 Red Hat, Inc.
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
 */

#ifndef __G_INET_ADDRESS_MASK_H__
#define __G_INET_ADDRESS_MASK_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_INET_ADDRESS_MASK         (g_inet_address_mask_get_type ())
#define G_INET_ADDRESS_MASK(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_INET_ADDRESS_MASK, GInetAddressMask))
#define G_INET_ADDRESS_MASK_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_INET_ADDRESS_MASK, GInetAddressMaskClass))
#define G_IS_INET_ADDRESS_MASK(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_INET_ADDRESS_MASK))
#define G_IS_INET_ADDRESS_MASK_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_INET_ADDRESS_MASK))
#define G_INET_ADDRESS_MASK_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_INET_ADDRESS_MASK, GInetAddressMaskClass))

typedef struct _GInetAddressMaskClass   GInetAddressMaskClass;
typedef struct _GInetAddressMaskPrivate GInetAddressMaskPrivate;

struct _GInetAddressMask
{
  GObject parent_instance;

  /*< private >*/
  GInetAddressMaskPrivate *priv;
};

struct _GInetAddressMaskClass
{
  GObjectClass parent_class;

};

GLIB_AVAILABLE_IN_2_32
GType g_inet_address_mask_get_type (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
GInetAddressMask *g_inet_address_mask_new             (GInetAddress      *addr,
						       guint              length,
						       GError           **error);

GLIB_AVAILABLE_IN_2_32
GInetAddressMask *g_inet_address_mask_new_from_string (const gchar       *mask_string,
						       GError           **error);
GLIB_AVAILABLE_IN_2_32
gchar            *g_inet_address_mask_to_string       (GInetAddressMask  *mask);

GLIB_AVAILABLE_IN_2_32
GSocketFamily     g_inet_address_mask_get_family      (GInetAddressMask  *mask);
GLIB_AVAILABLE_IN_2_32
GInetAddress     *g_inet_address_mask_get_address     (GInetAddressMask  *mask);
GLIB_AVAILABLE_IN_2_32
guint             g_inet_address_mask_get_length      (GInetAddressMask  *mask);

GLIB_AVAILABLE_IN_2_32
gboolean          g_inet_address_mask_matches         (GInetAddressMask  *mask,
						       GInetAddress      *address);
GLIB_AVAILABLE_IN_2_32
gboolean          g_inet_address_mask_equal           (GInetAddressMask  *mask,
						       GInetAddressMask  *mask2);

G_END_DECLS

#endif /* __G_INET_ADDRESS_MASK_H__ */

