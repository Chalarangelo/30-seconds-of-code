/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2010 Collabora, Ltd.
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
 * Author: Nicolas Dufresne <nicolas.dufresne@collabora.co.uk>
 */

#ifndef __G_PROXY_ADDRESS_ENUMERATOR_H__
#define __G_PROXY_ADDRESS_ENUMERATOR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gsocketaddressenumerator.h>

G_BEGIN_DECLS

#define G_TYPE_PROXY_ADDRESS_ENUMERATOR         (g_proxy_address_enumerator_get_type ())
#define G_PROXY_ADDRESS_ENUMERATOR(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_PROXY_ADDRESS_ENUMERATOR, GProxyAddressEnumerator))
#define G_PROXY_ADDRESS_ENUMERATOR_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_PROXY_ADDRESS_ENUMERATOR, GProxyAddressEnumeratorClass))
#define G_IS_PROXY_ADDRESS_ENUMERATOR(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_PROXY_ADDRESS_ENUMERATOR))
#define G_IS_PROXY_ADDRESS_ENUMERATOR_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_PROXY_ADDRESS_ENUMERATOR))
#define G_PROXY_ADDRESS_ENUMERATOR_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_PROXY_ADDRESS_ENUMERATOR, GProxyAddressEnumeratorClass))

/**
 * GProxyAddressEnumerator:
 *
 * A subclass of #GSocketAddressEnumerator that takes another address
 * enumerator and wraps its results in #GProxyAddresses as
 * directed by the default #GProxyResolver.
 */

typedef struct _GProxyAddressEnumeratorClass GProxyAddressEnumeratorClass;
typedef struct _GProxyAddressEnumeratorPrivate GProxyAddressEnumeratorPrivate;

struct _GProxyAddressEnumerator
{
  /*< private >*/
  GSocketAddressEnumerator parent_instance;
  GProxyAddressEnumeratorPrivate *priv;
};

/**
 * GProxyAddressEnumeratorClass:
 *
 * Class structure for #GProxyAddressEnumerator.
 */
struct _GProxyAddressEnumeratorClass
{
  /*< private >*/
  GSocketAddressEnumeratorClass parent_class;

  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
  void (*_g_reserved7) (void);
};

GLIB_AVAILABLE_IN_ALL
GType           g_proxy_address_enumerator_get_type    (void) G_GNUC_CONST;

G_END_DECLS

#endif /* __G_PROXY_ADDRESS_ENUMERATOR_H__ */
