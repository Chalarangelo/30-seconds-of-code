/*
 * Copyright © 2013 Lars Uebernickel
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
 * Authors: Lars Uebernickel <lars@uebernic.de>
 */

#ifndef __G_NOTIFICATION_H__
#define __G_NOTIFICATION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>
#include <gio/gioenums.h>

G_BEGIN_DECLS

#define G_TYPE_NOTIFICATION         (g_notification_get_type ())
#define G_NOTIFICATION(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_NOTIFICATION, GNotification))
#define G_IS_NOTIFICATION(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_NOTIFICATION))

GLIB_AVAILABLE_IN_2_40
GType                   g_notification_get_type                         (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_40
GNotification *         g_notification_new                              (const gchar *title);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_set_title                        (GNotification *notification,
                                                                         const gchar   *title);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_set_body                         (GNotification *notification,
                                                                         const gchar   *body);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_set_icon                         (GNotification *notification,
                                                                         GIcon         *icon);

GLIB_DEPRECATED_IN_2_42_FOR(g_notification_set_priority)
void                    g_notification_set_urgent                       (GNotification *notification,
                                                                         gboolean       urgent);

GLIB_AVAILABLE_IN_2_42
void                    g_notification_set_priority                     (GNotification         *notification,
                                                                         GNotificationPriority  priority);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_add_button                       (GNotification *notification,
                                                                         const gchar   *label,
                                                                         const gchar   *detailed_action);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_add_button_with_target           (GNotification *notification,
                                                                         const gchar   *label,
                                                                         const gchar   *action,
                                                                         const gchar   *target_format,
                                                                         ...);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_add_button_with_target_value     (GNotification *notification,
                                                                         const gchar   *label,
                                                                         const gchar   *action,
                                                                         GVariant      *target);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_set_default_action               (GNotification *notification,
                                                                         const gchar   *detailed_action);

GLIB_AVAILABLE_IN_2_40
void                    g_notification_set_default_action_and_target    (GNotification *notification,
                                                                         const gchar   *action,
                                                                         const gchar   *target_format,
                                                                         ...);

GLIB_AVAILABLE_IN_2_40
void                 g_notification_set_default_action_and_target_value (GNotification *notification,
                                                                         const gchar   *action,
                                                                         GVariant      *target);

G_END_DECLS

#endif
