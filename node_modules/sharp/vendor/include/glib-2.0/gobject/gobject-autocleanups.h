/*
 * Copyright © 2015 Canonical Limited
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
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

G_DEFINE_AUTOPTR_CLEANUP_FUNC(GClosure, g_closure_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GEnumClass, g_type_class_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GFlagsClass, g_type_class_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GObject, g_object_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GInitiallyUnowned, g_object_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GParamSpec, g_param_spec_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GTypeClass, g_type_class_unref)
G_DEFINE_AUTO_CLEANUP_CLEAR_FUNC(GValue, g_value_unset)
