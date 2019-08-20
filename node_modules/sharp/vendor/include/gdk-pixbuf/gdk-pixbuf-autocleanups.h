/* GdkPixbuf library - Autocleanup definitions
 *
 * Copyright (C) 2015 Kalev Lember <kalevlember@gmail.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef GDK_PIXBUF_AUTOCLEANUPS_H
#define GDK_PIXBUF_AUTOCLEANUPS_H

/* We need all the types, so don't try to include this directly */
#if defined(GDK_PIXBUF_DISABLE_SINGLE_INCLUDES) && !defined (GDK_PIXBUF_H_INSIDE) && !defined (GDK_PIXBUF_COMPILATION)
#error "Only <gdk-pixbuf/gdk-pixbuf.h> can be included directly."
#endif

#ifdef G_DEFINE_AUTOPTR_CLEANUP_FUNC

G_DEFINE_AUTOPTR_CLEANUP_FUNC(GdkPixbuf, g_object_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GdkPixbufAnimation, g_object_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GdkPixbufAnimationIter, g_object_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GdkPixbufLoader, g_object_unref)
G_DEFINE_AUTOPTR_CLEANUP_FUNC(GdkPixbufSimpleAnim, g_object_unref)

#endif

#endif /* GDK_PIXBUF_AUTOCLEANUPS_H */
