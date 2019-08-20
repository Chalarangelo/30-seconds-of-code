/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2008 Christian Kellner, Samuel Cormier-Iijima
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
 * Authors: Christian Kellner <gicmo@gnome.org>
 *          Samuel Cormier-Iijima <sciyoshi@gmail.com>
 */

#ifndef __G_SOCKET_ADDRESS_H__
#define __G_SOCKET_ADDRESS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SOCKET_ADDRESS         (g_socket_address_get_type ())
#define G_SOCKET_ADDRESS(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_SOCKET_ADDRESS, GSocketAddress))
#define G_SOCKET_ADDRESS_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_SOCKET_ADDRESS, GSocketAddressClass))
#define G_IS_SOCKET_ADDRESS(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_SOCKET_ADDRESS))
#define G_IS_SOCKET_ADDRESS_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_SOCKET_ADDRESS))
#define G_SOCKET_ADDRESS_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_SOCKET_ADDRESS, GSocketAddressClass))

typedef struct _GSocketAddressClass   GSocketAddressClass;

struct _GSocketAddress
{
  GObject parent_instance;
};

struct _GSocketAddressClass
{
  GObjectClass parent_class;

  GSocketFamily  (*get_family)      (GSocketAddress *address);

  gssize         (*get_native_size) (GSocketAddress *address);

  gboolean       (*to_native)       (GSocketAddress *address,
                                     gpointer        dest,
                                     gsize           destlen,
				     GError        **error);
};

GLIB_AVAILABLE_IN_ALL
GType                 g_socket_address_get_type        (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GSocketFamily         g_socket_address_get_family      (GSocketAddress *address);

GLIB_AVAILABLE_IN_ALL
GSocketAddress *      g_socket_address_new_from_native (gpointer        native,
                                                        gsize           len);

GLIB_AVAILABLE_IN_ALL
gboolean              g_socket_address_to_native       (GSocketAddress *address,
                                                        gpointer        dest,
                                                        gsize           destlen,
							GError        **error);

GLIB_AVAILABLE_IN_ALL
gssize                g_socket_address_get_native_size (GSocketAddress *address);

G_END_DECLS

#endif /* __G_SOCKET_ADDRESS_H__ */
