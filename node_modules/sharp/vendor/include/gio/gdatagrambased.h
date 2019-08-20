/*
 * Copyright 2015 Collabora Ltd.
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
 * Authors: Philip Withnall <philip.withnall@collabora.co.uk>
 */

#ifndef __G_DATAGRAM_BASED_H__
#define __G_DATAGRAM_BASED_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_DATAGRAM_BASED             (g_datagram_based_get_type ())
#define G_DATAGRAM_BASED(inst)            (G_TYPE_CHECK_INSTANCE_CAST ((inst), \
                                           G_TYPE_DATAGRAM_BASED, GDatagramBased))
#define G_IS_DATAGRAM_BASED(inst)         (G_TYPE_CHECK_INSTANCE_TYPE ((inst), \
                                           G_TYPE_DATAGRAM_BASED))
#define G_DATAGRAM_BASED_GET_IFACE(inst)  (G_TYPE_INSTANCE_GET_INTERFACE ((inst), \
                                           G_TYPE_DATAGRAM_BASED, \
                                           GDatagramBasedInterface))
#define G_TYPE_IS_DATAGRAM_BASED(type)    (g_type_is_a ((type), \
                                           G_TYPE_DATAGRAM_BASED))

/**
 * GDatagramBased:
 *
 * Interface for socket-like objects with datagram semantics.
 *
 * Since: 2.48
 */
typedef struct _GDatagramBasedInterface GDatagramBasedInterface;

/**
 * GDatagramBasedInterface:
 * @g_iface: The parent interface.
 * @receive_messages: Virtual method for g_datagram_based_receive_messages().
 * @send_messages: Virtual method for g_datagram_based_send_messages().
 * @create_source: Virtual method for g_datagram_based_create_source().
 * @condition_check: Virtual method for g_datagram_based_condition_check().
 * @condition_wait: Virtual method for
 *   g_datagram_based_condition_wait().
 *
 * Provides an interface for socket-like objects which have datagram semantics,
 * following the Berkeley sockets API. The interface methods are thin wrappers
 * around the corresponding virtual methods, and no pre-processing of inputs is
 * implemented — so implementations of this API must handle all functionality
 * documented in the interface methods.
 *
 * Since: 2.48
 */
struct _GDatagramBasedInterface
{
  GTypeInterface g_iface;

  /* Virtual table */
  gint          (*receive_messages)     (GDatagramBased       *datagram_based,
                                         GInputMessage        *messages,
                                         guint                 num_messages,
                                         gint                  flags,
                                         gint64                timeout,
                                         GCancellable         *cancellable,
                                         GError              **error);
  gint          (*send_messages)        (GDatagramBased       *datagram_based,
                                         GOutputMessage       *messages,
                                         guint                 num_messages,
                                         gint                  flags,
                                         gint64                timeout,
                                         GCancellable         *cancellable,
                                         GError              **error);

  GSource      *(*create_source)        (GDatagramBased       *datagram_based,
                                         GIOCondition          condition,
                                         GCancellable         *cancellable);
  GIOCondition  (*condition_check)      (GDatagramBased       *datagram_based,
                                         GIOCondition          condition);
  gboolean      (*condition_wait)       (GDatagramBased       *datagram_based,
                                         GIOCondition          condition,
                                         gint64                timeout,
                                         GCancellable         *cancellable,
                                         GError              **error);
};

GLIB_AVAILABLE_IN_2_48
GType
g_datagram_based_get_type             (void);

GLIB_AVAILABLE_IN_2_48
gint
g_datagram_based_receive_messages     (GDatagramBased       *datagram_based,
                                       GInputMessage        *messages,
                                       guint                 num_messages,
                                       gint                  flags,
                                       gint64                timeout,
                                       GCancellable         *cancellable,
                                       GError              **error);

GLIB_AVAILABLE_IN_2_48
gint
g_datagram_based_send_messages        (GDatagramBased       *datagram_based,
                                       GOutputMessage       *messages,
                                       guint                 num_messages,
                                       gint                  flags,
                                       gint64                timeout,
                                       GCancellable         *cancellable,
                                       GError              **error);

GLIB_AVAILABLE_IN_2_48
GSource *
g_datagram_based_create_source        (GDatagramBased       *datagram_based,
                                       GIOCondition          condition,
                                       GCancellable         *cancellable);
GLIB_AVAILABLE_IN_2_48
GIOCondition
g_datagram_based_condition_check      (GDatagramBased       *datagram_based,
                                       GIOCondition          condition);
GLIB_AVAILABLE_IN_2_48
gboolean
g_datagram_based_condition_wait       (GDatagramBased       *datagram_based,
                                       GIOCondition          condition,
                                       gint64                timeout,
                                       GCancellable         *cancellable,
                                       GError              **error);

G_END_DECLS

#endif /* __G_DATAGRAM_BASED_H__ */
