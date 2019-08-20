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

#ifndef __G_ACTION_MAP_H__
#define __G_ACTION_MAP_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS


#define G_TYPE_ACTION_MAP                                   (g_action_map_get_type ())
#define G_ACTION_MAP(inst)                                  (G_TYPE_CHECK_INSTANCE_CAST ((inst),                      \
                                                             G_TYPE_ACTION_MAP, GActionMap))
#define G_IS_ACTION_MAP(inst)                               (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                      \
                                                             G_TYPE_ACTION_MAP))
#define G_ACTION_MAP_GET_IFACE(inst)                        (G_TYPE_INSTANCE_GET_INTERFACE ((inst),                   \
                                                             G_TYPE_ACTION_MAP, GActionMapInterface))

typedef struct _GActionMapInterface                         GActionMapInterface;
typedef struct _GActionEntry                                GActionEntry;

struct _GActionMapInterface
{
  GTypeInterface g_iface;

  GAction * (* lookup_action) (GActionMap  *action_map,
                               const gchar *action_name);
  void      (* add_action)    (GActionMap  *action_map,
                               GAction     *action);
  void      (* remove_action) (GActionMap  *action_map,
                               const gchar *action_name);
};

struct _GActionEntry
{
  const gchar *name;

  void (* activate) (GSimpleAction *action,
                     GVariant      *parameter,
                     gpointer       user_data);

  const gchar *parameter_type;

  const gchar *state;

  void (* change_state) (GSimpleAction *action,
                         GVariant      *value,
                         gpointer       user_data);

  /*< private >*/
  gsize padding[3];
};

GLIB_AVAILABLE_IN_2_32
GType                   g_action_map_get_type                           (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
GAction *               g_action_map_lookup_action                      (GActionMap         *action_map,
                                                                         const gchar        *action_name);
GLIB_AVAILABLE_IN_2_32
void                    g_action_map_add_action                         (GActionMap         *action_map,
                                                                         GAction            *action);
GLIB_AVAILABLE_IN_2_32
void                    g_action_map_remove_action                      (GActionMap         *action_map,
                                                                         const gchar        *action_name);
GLIB_AVAILABLE_IN_2_32
void                    g_action_map_add_action_entries                 (GActionMap         *action_map,
                                                                         const GActionEntry *entries,
                                                                         gint                n_entries,
                                                                         gpointer            user_data);

G_END_DECLS

#endif /* __G_ACTION_MAP_H__ */
