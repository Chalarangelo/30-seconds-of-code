/* GIO testing utilities
 *
 * Copyright (C) 2008-2010 Red Hat, Inc.
 * Copyright (C) 2012 Collabora Ltd. <http://www.collabora.co.uk/>
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
 * Authors: David Zeuthen <davidz@redhat.com>
 *          Xavier Claessens <xavier.claessens@collabora.co.uk>
 */

#ifndef __G_TEST_DBUS_H__
#define __G_TEST_DBUS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_TEST_DBUS \
    (g_test_dbus_get_type ())
#define G_TEST_DBUS(obj) \
    (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_TEST_DBUS, \
        GTestDBus))
#define G_IS_TEST_DBUS(obj) \
    (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_TEST_DBUS))

GLIB_AVAILABLE_IN_2_34
GType          g_test_dbus_get_type        (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_34
GTestDBus *    g_test_dbus_new             (GTestDBusFlags flags);

GLIB_AVAILABLE_IN_2_34
GTestDBusFlags g_test_dbus_get_flags       (GTestDBus     *self);

GLIB_AVAILABLE_IN_2_34
const gchar *  g_test_dbus_get_bus_address (GTestDBus     *self);

GLIB_AVAILABLE_IN_2_34
void           g_test_dbus_add_service_dir (GTestDBus     *self,
                                            const gchar   *path);

GLIB_AVAILABLE_IN_2_34
void           g_test_dbus_up              (GTestDBus     *self);

GLIB_AVAILABLE_IN_2_34
void           g_test_dbus_stop            (GTestDBus     *self);

GLIB_AVAILABLE_IN_2_34
void           g_test_dbus_down            (GTestDBus     *self);

GLIB_AVAILABLE_IN_2_34
void           g_test_dbus_unset           (void);

G_END_DECLS

#endif /* __G_TEST_DBUS_H__ */
