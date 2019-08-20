/*
 * Copyright © 2010 Codethink Limited
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
 * Authors: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_ACTION_H__
#define __G_ACTION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_ACTION                                       (g_action_get_type ())
#define G_ACTION(inst)                                      (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_ACTION, GAction))
#define G_IS_ACTION(inst)                                   (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_ACTION))
#define G_ACTION_GET_IFACE(inst)                            (G_TYPE_INSTANCE_GET_INTERFACE ((inst),                  \
                                                             G_TYPE_ACTION, GActionInterface))

typedef struct _GActionInterface                            GActionInterface;

struct _GActionInterface
{
  GTypeInterface g_iface;

  /* virtual functions */
  const gchar *        (* get_name)             (GAction  *action);
  const GVariantType * (* get_parameter_type)   (GAction  *action);
  const GVariantType * (* get_state_type)       (GAction  *action);
  GVariant *           (* get_state_hint)       (GAction  *action);

  gboolean             (* get_enabled)          (GAction  *action);
  GVariant *           (* get_state)            (GAction  *action);

  void                 (* change_state)         (GAction  *action,
                                                 GVariant *value);
  void                 (* activate)             (GAction  *action,
                                                 GVariant *parameter);
};

GLIB_AVAILABLE_IN_2_30
GType                   g_action_get_type                               (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
const gchar *           g_action_get_name                               (GAction            *action);
GLIB_AVAILABLE_IN_ALL
const GVariantType *    g_action_get_parameter_type                     (GAction            *action);
GLIB_AVAILABLE_IN_ALL
const GVariantType *    g_action_get_state_type                         (GAction            *action);
GLIB_AVAILABLE_IN_ALL
GVariant *              g_action_get_state_hint                         (GAction            *action);

GLIB_AVAILABLE_IN_ALL
gboolean                g_action_get_enabled                            (GAction            *action);
GLIB_AVAILABLE_IN_ALL
GVariant *              g_action_get_state                              (GAction            *action);

GLIB_AVAILABLE_IN_ALL
void                    g_action_change_state                           (GAction            *action,
                                                                         GVariant           *value);
GLIB_AVAILABLE_IN_ALL
void                    g_action_activate                               (GAction            *action,
                                                                         GVariant           *parameter);

GLIB_AVAILABLE_IN_2_28
gboolean                g_action_name_is_valid                          (const gchar        *action_name);

GLIB_AVAILABLE_IN_2_38
gboolean                g_action_parse_detailed_name                    (const gchar        *detailed_name,
                                                                         gchar             **action_name,
                                                                         GVariant          **target_value,
                                                                         GError            **error);

GLIB_AVAILABLE_IN_2_38
gchar *                 g_action_print_detailed_name                    (const gchar        *action_name,
                                                                         GVariant           *target_value);

G_END_DECLS

#endif /* __G_ACTION_H__ */
