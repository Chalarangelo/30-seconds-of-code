/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright 2010, 2013 Red Hat, Inc.
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

#ifndef __G_SIMPLE_PROXY_RESOLVER_H__
#define __G_SIMPLE_PROXY_RESOLVER_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gproxyresolver.h>

G_BEGIN_DECLS

#define G_TYPE_SIMPLE_PROXY_RESOLVER         (g_simple_proxy_resolver_get_type ())
#define G_SIMPLE_PROXY_RESOLVER(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_SIMPLE_PROXY_RESOLVER, GSimpleProxyResolver))
#define G_SIMPLE_PROXY_RESOLVER_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_SIMPLE_PROXY_RESOLVER, GSimpleProxyResolverClass))
#define G_IS_SIMPLE_PROXY_RESOLVER(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_SIMPLE_PROXY_RESOLVER))
#define G_IS_SIMPLE_PROXY_RESOLVER_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_SIMPLE_PROXY_RESOLVER))
#define G_SIMPLE_PROXY_RESOLVER_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_SIMPLE_PROXY_RESOLVER, GSimpleProxyResolverClass))

/**
 * GSimpleProxyResolver:
 *
 * A #GProxyResolver implementation for using a fixed set of proxies.
 **/
typedef struct _GSimpleProxyResolver GSimpleProxyResolver;
typedef struct _GSimpleProxyResolverPrivate GSimpleProxyResolverPrivate;
typedef struct _GSimpleProxyResolverClass GSimpleProxyResolverClass;

struct _GSimpleProxyResolver
{
  GObject parent_instance;

  /*< private >*/
  GSimpleProxyResolverPrivate *priv;
};

struct _GSimpleProxyResolverClass
{
  GObjectClass parent_class;

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
};

GLIB_AVAILABLE_IN_2_36
GType           g_simple_proxy_resolver_get_type          (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_36
GProxyResolver *g_simple_proxy_resolver_new               (const gchar           *default_proxy,
                                                           gchar                **ignore_hosts);

GLIB_AVAILABLE_IN_2_36
void            g_simple_proxy_resolver_set_default_proxy (GSimpleProxyResolver  *resolver,
                                                           const gchar           *default_proxy);

GLIB_AVAILABLE_IN_2_36
void            g_simple_proxy_resolver_set_ignore_hosts  (GSimpleProxyResolver  *resolver,
                                                           gchar                **ignore_hosts);

GLIB_AVAILABLE_IN_2_36
void            g_simple_proxy_resolver_set_uri_proxy     (GSimpleProxyResolver  *resolver,
                                                           const gchar           *uri_scheme,
                                                           const gchar           *proxy);

G_END_DECLS

#endif /* __G_SIMPLE_PROXY_RESOLVER_H__ */
