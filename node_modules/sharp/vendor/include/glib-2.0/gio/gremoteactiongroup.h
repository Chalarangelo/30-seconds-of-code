/*
 * Copyright © 2011 Canonical Limited
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

#ifndef __G_REMOTE_ACTION_GROUP_H__
#define __G_REMOTE_ACTION_GROUP_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS


#define G_TYPE_REMOTE_ACTION_GROUP                          (g_remote_action_group_get_type ())
#define G_REMOTE_ACTION_GROUP(inst)                         (G_TYPE_CHECK_INSTANCE_CAST ((inst),                      \
                                                             G_TYPE_REMOTE_ACTION_GROUP, GRemoteActionGroup))
#define G_IS_REMOTE_ACTION_GROUP(inst)                      (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                      \
                                                             G_TYPE_REMOTE_ACTION_GROUP))
#define G_REMOTE_ACTION_GROUP_GET_IFACE(inst)               (G_TYPE_INSTANCE_GET_INTERFACE ((inst),                   \
                                                             G_TYPE_REMOTE_ACTION_GROUP,                              \
                                                             GRemoteActionGroupInterface))

typedef struct _GRemoteActionGroupInterface                 GRemoteActionGroupInterface;

struct _GRemoteActionGroupInterface
{
  GTypeInterface g_iface;

  void (* activate_action_full)     (GRemoteActionGroup *remote,
                                     const gchar        *action_name,
                                     GVariant           *parameter,
                                     GVariant           *platform_data);

  void (* change_action_state_full) (GRemoteActionGroup *remote,
                                     const gchar        *action_name,
                                     GVariant           *value,
                                     GVariant           *platform_data);
};

GLIB_AVAILABLE_IN_2_32
GType                   g_remote_action_group_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
void                    g_remote_action_group_activate_action_full      (GRemoteActionGroup *remote,
                                                                         const gchar        *action_name,
                                                                         GVariant           *parameter,
                                                                         GVariant           *platform_data);

GLIB_AVAILABLE_IN_2_32
void                    g_remote_action_group_change_action_state_full  (GRemoteActionGroup *remote,
                                                                         const gchar        *action_name,
                                                                         GVariant           *value,
                                                                         GVariant           *platform_data);

G_END_DECLS

#endif /* __G_REMOTE_ACTION_GROUP_H__ */
