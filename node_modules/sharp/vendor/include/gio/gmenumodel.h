/*
 * Copyright © 2011 Canonical Ltd.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_MENU_MODEL_H__
#define __G_MENU_MODEL_H__

#include <glib-object.h>

#include <gio/giotypes.h>

G_BEGIN_DECLS

/**
 * G_MENU_ATTRIBUTE_ACTION:
 *
 * The menu item attribute which holds the action name of the item.  Action
 * names are namespaced with an identifier for the action group in which the
 * action resides. For example, "win." for window-specific actions and "app."
 * for application-wide actions.
 *
 * See also g_menu_model_get_item_attribute() and g_menu_item_set_attribute().
 *
 * Since: 2.32
 **/
#define G_MENU_ATTRIBUTE_ACTION "action"

/**
 * G_MENU_ATTRIBUTE_ACTION_NAMESPACE:
 *
 * The menu item attribute that holds the namespace for all action names in
 * menus that are linked from this item.
 *
 * Since: 2.36
 **/
#define G_MENU_ATTRIBUTE_ACTION_NAMESPACE "action-namespace"

/**
 * G_MENU_ATTRIBUTE_TARGET:
 *
 * The menu item attribute which holds the target with which the item's action
 * will be activated.
 *
 * See also g_menu_item_set_action_and_target()
 *
 * Since: 2.32
 **/
#define G_MENU_ATTRIBUTE_TARGET "target"

/**
 * G_MENU_ATTRIBUTE_LABEL:
 *
 * The menu item attribute which holds the label of the item.
 *
 * Since: 2.32
 **/
#define G_MENU_ATTRIBUTE_LABEL "label"

/**
 * G_MENU_ATTRIBUTE_ICON:
 *
 * The menu item attribute which holds the icon of the item.
 *
 * The icon is stored in the format returned by g_icon_serialize().
 *
 * This attribute is intended only to represent 'noun' icons such as
 * favicons for a webpage, or application icons.  It should not be used
 * for 'verbs' (ie: stock icons).
 *
 * Since: 2.38
 **/
#define G_MENU_ATTRIBUTE_ICON "icon"

/**
 * G_MENU_LINK_SUBMENU:
 *
 * The name of the link that associates a menu item with a submenu.
 *
 * See also g_menu_item_set_link().
 *
 * Since: 2.32
 **/
#define G_MENU_LINK_SUBMENU "submenu"

/**
 * G_MENU_LINK_SECTION:
 *
 * The name of the link that associates a menu item with a section.  The linked
 * menu will usually be shown in place of the menu item, using the item's label
 * as a header.
 *
 * See also g_menu_item_set_link().
 *
 * Since: 2.32
 **/
#define G_MENU_LINK_SECTION "section"

#define G_TYPE_MENU_MODEL                                   (g_menu_model_get_type ())
#define G_MENU_MODEL(inst)                                  (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_MENU_MODEL, GMenuModel))
#define G_MENU_MODEL_CLASS(class)                           (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_MENU_MODEL, GMenuModelClass))
#define G_IS_MENU_MODEL(inst)                               (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_MENU_MODEL))
#define G_IS_MENU_MODEL_CLASS(class)                        (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_MENU_MODEL))
#define G_MENU_MODEL_GET_CLASS(inst)                        (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_MENU_MODEL, GMenuModelClass))

typedef struct _GMenuModelPrivate                           GMenuModelPrivate;
typedef struct _GMenuModelClass                             GMenuModelClass;

typedef struct _GMenuAttributeIterPrivate                   GMenuAttributeIterPrivate;
typedef struct _GMenuAttributeIterClass                     GMenuAttributeIterClass;
typedef struct _GMenuAttributeIter                          GMenuAttributeIter;

typedef struct _GMenuLinkIterPrivate                        GMenuLinkIterPrivate;
typedef struct _GMenuLinkIterClass                          GMenuLinkIterClass;
typedef struct _GMenuLinkIter                               GMenuLinkIter;

struct _GMenuModel
{
  GObject            parent_instance;
  GMenuModelPrivate *priv;
};

/**
 * GMenuModelClass::get_item_attributes:
 * @model: the #GMenuModel to query
 * @item_index: The #GMenuItem to query
 * @attributes: (out) (element-type utf8 GLib.Variant): Attributes on the item
 *
 * Gets all the attributes associated with the item in the menu model.
 */
/**
 * GMenuModelClass::get_item_links:
 * @model: the #GMenuModel to query
 * @item_index: The #GMenuItem to query
 * @links: (out) (element-type utf8 Gio.MenuModel): Links from the item
 *
 * Gets all the links associated with the item in the menu model.
 */
struct _GMenuModelClass
{
  GObjectClass parent_class;

  gboolean              (*is_mutable)                       (GMenuModel          *model);
  gint                  (*get_n_items)                      (GMenuModel          *model);
  void                  (*get_item_attributes)              (GMenuModel          *model,
                                                             gint                 item_index,
                                                             GHashTable         **attributes);
  GMenuAttributeIter *  (*iterate_item_attributes)          (GMenuModel          *model,
                                                             gint                 item_index);
  GVariant *            (*get_item_attribute_value)         (GMenuModel          *model,
                                                             gint                 item_index,
                                                             const gchar         *attribute,
                                                             const GVariantType  *expected_type);
  void                  (*get_item_links)                   (GMenuModel          *model,
                                                             gint                 item_index,
                                                             GHashTable         **links);
  GMenuLinkIter *       (*iterate_item_links)               (GMenuModel          *model,
                                                             gint                 item_index);
  GMenuModel *          (*get_item_link)                    (GMenuModel          *model,
                                                             gint                 item_index,
                                                             const gchar         *link);
};

GLIB_AVAILABLE_IN_2_32
GType                   g_menu_model_get_type                           (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
gboolean                g_menu_model_is_mutable                         (GMenuModel         *model);
GLIB_AVAILABLE_IN_2_32
gint                    g_menu_model_get_n_items                        (GMenuModel         *model);

GLIB_AVAILABLE_IN_2_32
GMenuAttributeIter *    g_menu_model_iterate_item_attributes            (GMenuModel         *model,
                                                                         gint                item_index);
GLIB_AVAILABLE_IN_2_32
GVariant *              g_menu_model_get_item_attribute_value           (GMenuModel         *model,
                                                                         gint                item_index,
                                                                         const gchar        *attribute,
                                                                         const GVariantType *expected_type);
GLIB_AVAILABLE_IN_2_32
gboolean                g_menu_model_get_item_attribute                 (GMenuModel         *model,
                                                                         gint                item_index,
                                                                         const gchar        *attribute,
                                                                         const gchar        *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_2_32
GMenuLinkIter *         g_menu_model_iterate_item_links                 (GMenuModel         *model,
                                                                         gint                item_index);
GLIB_AVAILABLE_IN_2_32
GMenuModel *            g_menu_model_get_item_link                      (GMenuModel         *model,
                                                                         gint                item_index,
                                                                         const gchar        *link);

GLIB_AVAILABLE_IN_2_32
void                    g_menu_model_items_changed                      (GMenuModel         *model,
                                                                         gint                position,
                                                                         gint                removed,
                                                                         gint                added);


#define G_TYPE_MENU_ATTRIBUTE_ITER                          (g_menu_attribute_iter_get_type ())
#define G_MENU_ATTRIBUTE_ITER(inst)                         (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_MENU_ATTRIBUTE_ITER, GMenuAttributeIter))
#define G_MENU_ATTRIBUTE_ITER_CLASS(class)                  (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_MENU_ATTRIBUTE_ITER, GMenuAttributeIterClass))
#define G_IS_MENU_ATTRIBUTE_ITER(inst)                      (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_MENU_ATTRIBUTE_ITER))
#define G_IS_MENU_ATTRIBUTE_ITER_CLASS(class)               (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_MENU_ATTRIBUTE_ITER))
#define G_MENU_ATTRIBUTE_ITER_GET_CLASS(inst)               (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_MENU_ATTRIBUTE_ITER, GMenuAttributeIterClass))

struct _GMenuAttributeIter
{
  GObject parent_instance;
  GMenuAttributeIterPrivate *priv;
};

struct _GMenuAttributeIterClass
{
  GObjectClass parent_class;

  gboolean      (*get_next) (GMenuAttributeIter  *iter,
                             const gchar        **out_name,
                             GVariant           **value);
};

GLIB_AVAILABLE_IN_2_32
GType                   g_menu_attribute_iter_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
gboolean                g_menu_attribute_iter_get_next                  (GMenuAttributeIter  *iter,
                                                                         const gchar        **out_name,
                                                                         GVariant           **value);
GLIB_AVAILABLE_IN_2_32
gboolean                g_menu_attribute_iter_next                      (GMenuAttributeIter  *iter);
GLIB_AVAILABLE_IN_2_32
const gchar *           g_menu_attribute_iter_get_name                  (GMenuAttributeIter  *iter);
GLIB_AVAILABLE_IN_2_32
GVariant *              g_menu_attribute_iter_get_value                 (GMenuAttributeIter  *iter);


#define G_TYPE_MENU_LINK_ITER                               (g_menu_link_iter_get_type ())
#define G_MENU_LINK_ITER(inst)                              (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_MENU_LINK_ITER, GMenuLinkIter))
#define G_MENU_LINK_ITER_CLASS(class)                       (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_MENU_LINK_ITER, GMenuLinkIterClass))
#define G_IS_MENU_LINK_ITER(inst)                           (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_MENU_LINK_ITER))
#define G_IS_MENU_LINK_ITER_CLASS(class)                    (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_MENU_LINK_ITER))
#define G_MENU_LINK_ITER_GET_CLASS(inst)                    (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_MENU_LINK_ITER, GMenuLinkIterClass))

struct _GMenuLinkIter
{
  GObject parent_instance;
  GMenuLinkIterPrivate *priv;
};

struct _GMenuLinkIterClass
{
  GObjectClass parent_class;

  gboolean      (*get_next) (GMenuLinkIter  *iter,
                             const gchar   **out_link,
                             GMenuModel    **value);
};

GLIB_AVAILABLE_IN_2_32
GType                   g_menu_link_iter_get_type                       (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
gboolean                g_menu_link_iter_get_next                       (GMenuLinkIter  *iter,
                                                                         const gchar   **out_link,
                                                                         GMenuModel    **value);
GLIB_AVAILABLE_IN_2_32
gboolean                g_menu_link_iter_next                           (GMenuLinkIter  *iter);
GLIB_AVAILABLE_IN_2_32
const gchar *           g_menu_link_iter_get_name                       (GMenuLinkIter  *iter);
GLIB_AVAILABLE_IN_2_32
GMenuModel *            g_menu_link_iter_get_value                      (GMenuLinkIter  *iter);

G_END_DECLS

#endif /* __G_MENU_MODEL_H__ */
