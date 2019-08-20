/* Gio - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 * Author: Matthias Clasen <mclasen@redhat.com>
 *         Clemens N. Buss <cebuzz@gmail.com>
 */

#ifndef __G_EMBLEMED_ICON_H__
#define __G_EMBLEMED_ICON_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gicon.h>
#include <gio/gemblem.h>

G_BEGIN_DECLS

#define G_TYPE_EMBLEMED_ICON         (g_emblemed_icon_get_type ())
#define G_EMBLEMED_ICON(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_EMBLEMED_ICON, GEmblemedIcon))
#define G_EMBLEMED_ICON_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_EMBLEMED_ICON, GEmblemedIconClass))
#define G_IS_EMBLEMED_ICON(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_EMBLEMED_ICON))
#define G_IS_EMBLEMED_ICON_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_EMBLEMED_ICON))
#define G_EMBLEMED_ICON_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_EMBLEMED_ICON, GEmblemedIconClass))

/**
 * GEmblemedIcon:
 *
 * An implementation of #GIcon for icons with emblems.
 **/
typedef struct _GEmblemedIcon        GEmblemedIcon;
typedef struct _GEmblemedIconClass   GEmblemedIconClass;
typedef struct _GEmblemedIconPrivate GEmblemedIconPrivate;

struct _GEmblemedIcon
{
  GObject parent_instance;

  /*< private >*/
  GEmblemedIconPrivate *priv;
};

struct _GEmblemedIconClass
{
  GObjectClass parent_class;
};

GLIB_AVAILABLE_IN_ALL
GType  g_emblemed_icon_get_type    (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GIcon *g_emblemed_icon_new         (GIcon         *icon,
                                    GEmblem       *emblem);
GLIB_AVAILABLE_IN_ALL
GIcon *g_emblemed_icon_get_icon    (GEmblemedIcon *emblemed);
GLIB_AVAILABLE_IN_ALL
GList *g_emblemed_icon_get_emblems (GEmblemedIcon *emblemed);
GLIB_AVAILABLE_IN_ALL
void   g_emblemed_icon_add_emblem  (GEmblemedIcon *emblemed,
                                    GEmblem       *emblem);
GLIB_AVAILABLE_IN_ALL
void   g_emblemed_icon_clear_emblems  (GEmblemedIcon *emblemed);

G_END_DECLS

#endif /* __G_EMBLEMED_ICON_H__ */
