/*
 * Copyright 2015 Lars Uebernickel
 * Copyright 2015 Ryan Lortie
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
 * Authors:
 *     Lars Uebernickel <lars@uebernic.de>
 *     Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_LIST_MODEL_H__
#define __G_LIST_MODEL_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_LIST_MODEL g_list_model_get_type ()
GLIB_AVAILABLE_IN_2_44
G_DECLARE_INTERFACE(GListModel, g_list_model, G, LIST_MODEL, GObject)

struct _GListModelInterface
{
  GTypeInterface g_iface;

  GType     (* get_item_type)   (GListModel *list);

  guint     (* get_n_items)     (GListModel *list);

  gpointer  (* get_item)        (GListModel *list,
                                 guint       position);
};

GLIB_AVAILABLE_IN_2_44
GType                   g_list_model_get_item_type                      (GListModel *list);

GLIB_AVAILABLE_IN_2_44
guint                   g_list_model_get_n_items                        (GListModel *list);

GLIB_AVAILABLE_IN_2_44
gpointer                g_list_model_get_item                           (GListModel *list,
                                                                         guint       position);

GLIB_AVAILABLE_IN_2_44
GObject *               g_list_model_get_object                         (GListModel *list,
                                                                         guint       position);

GLIB_AVAILABLE_IN_2_44
void                    g_list_model_items_changed                      (GListModel *list,
                                                                         guint       position,
                                                                         guint       removed,
                                                                         guint       added);

G_END_DECLS

#endif /* __G_LIST_MODEL_H__ */
