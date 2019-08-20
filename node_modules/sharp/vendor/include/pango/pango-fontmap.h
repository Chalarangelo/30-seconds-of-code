/* Pango
 * pango-font.h: Font handling
 *
 * Copyright (C) 2000 Red Hat Software
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

#ifndef __PANGO_FONTMAP_H__
#define __PANGO_FONTMAP_H__

#include <pango/pango-font.h>
#include <pango/pango-fontset.h>

G_BEGIN_DECLS

/**
 * PANGO_TYPE_FONT_MAP:
 *
 * The #GObject type for #PangoFontMap.
 */
/**
 * PANGO_FONT_MAP:
 * @object: a #GObject.
 *
 * Casts a #GObject to a #PangoFontMap.
 */
/**
 * PANGO_IS_FONT_MAP:
 * @object: a #GObject.
 *
 * Returns: %TRUE if @object is a #PangoFontMap.
 */
#define PANGO_TYPE_FONT_MAP              (pango_font_map_get_type ())
#define PANGO_FONT_MAP(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_FONT_MAP, PangoFontMap))
#define PANGO_IS_FONT_MAP(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_FONT_MAP))

typedef struct _PangoContext PangoContext;

PANGO_AVAILABLE_IN_ALL
GType         pango_font_map_get_type       (void) G_GNUC_CONST;
PANGO_AVAILABLE_IN_1_22
PangoContext * pango_font_map_create_context (PangoFontMap               *fontmap);
PANGO_AVAILABLE_IN_ALL
PangoFont *   pango_font_map_load_font     (PangoFontMap                 *fontmap,
					    PangoContext                 *context,
					    const PangoFontDescription   *desc);
PANGO_AVAILABLE_IN_ALL
PangoFontset *pango_font_map_load_fontset  (PangoFontMap                 *fontmap,
					    PangoContext                 *context,
					    const PangoFontDescription   *desc,
					    PangoLanguage                *language);
PANGO_AVAILABLE_IN_ALL
void          pango_font_map_list_families (PangoFontMap                 *fontmap,
					    PangoFontFamily            ***families,
					    int                          *n_families);
PANGO_AVAILABLE_IN_1_32
guint         pango_font_map_get_serial    (PangoFontMap                 *fontmap);
PANGO_AVAILABLE_IN_1_34
void          pango_font_map_changed       (PangoFontMap                 *fontmap);

#ifdef PANGO_ENABLE_BACKEND

/**
 * PANGO_FONT_MAP_CLASS:
 * @klass: a #GObject.
 *
 * Casts a #GObject to a #PangoFontMapClass.
 */
/**
 * PANGO_IS_FONT_MAP_CLASS:
 * @klass: a #GObject.
 *
 * Returns: %TRUE if @klass is a subtype of #PangoFontMapClass.
 */
/**
 * PANGO_FONT_MAP_GET_CLASS:
 * @obj: a #PangoFontMap.
 *
 * Returns: class of @obj
 */
#define PANGO_FONT_MAP_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_FONT_MAP, PangoFontMapClass))
#define PANGO_IS_FONT_MAP_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_FONT_MAP))
#define PANGO_FONT_MAP_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_FONT_MAP, PangoFontMapClass))

typedef struct _PangoFontMapClass PangoFontMapClass;

/**
 * PangoFontMap:
 *
 * The #PangoFontMap represents the set of fonts available for a
 * particular rendering system. This is a virtual object with
 * implementations being specific to particular rendering systems.  To
 * create an implementation of a #PangoFontMap, the rendering-system
 * specific code should allocate a larger structure that contains a nested
 * #PangoFontMap, fill in the <structfield>klass</structfield> member of the nested #PangoFontMap with a
 * pointer to a appropriate #PangoFontMapClass, then call
 * pango_font_map_init() on the structure.
 *
 * The #PangoFontMap structure contains one member which the implementation
 * fills in.
 */
struct _PangoFontMap
{
  GObject parent_instance;
};

/**
 * PangoFontMapClass:
 * @parent_class: parent #GObjectClass.
 * @load_font: a function to load a font with a given description. See
 * pango_font_map_load_font().
 * @list_families: A function to list available font families. See
 * pango_font_map_list_families().
 * @load_fontset: a function to load a fontset with a given given description
 * suitable for a particular language. See pango_font_map_load_fontset().
 * @shape_engine_type: the type of rendering-system-dependent engines that
 * can handle fonts of this fonts loaded with this fontmap.
 * @get_serial: a function to get the serial number of the fontmap.
 * See pango_font_map_get_serial().
 * @changed: See pango_font_map_changed()
 *
 * The #PangoFontMapClass structure holds the virtual functions for
 * a particular #PangoFontMap implementation.
 */
struct _PangoFontMapClass
{
  GObjectClass parent_class;

  /*< public >*/

  PangoFont *   (*load_font)     (PangoFontMap               *fontmap,
				  PangoContext               *context,
				  const PangoFontDescription *desc);
  void          (*list_families) (PangoFontMap               *fontmap,
				  PangoFontFamily          ***families,
				  int                        *n_families);
  PangoFontset *(*load_fontset)  (PangoFontMap               *fontmap,
				  PangoContext               *context,
				  const PangoFontDescription *desc,
				  PangoLanguage              *language);

  const char     *shape_engine_type;

  guint         (*get_serial)    (PangoFontMap               *fontmap);
  void          (*changed)       (PangoFontMap               *fontmap);

  /*< private >*/

  /* Padding for future expansion */
  void (*_pango_reserved1) (void);
  void (*_pango_reserved2) (void);
};

PANGO_DEPRECATED_IN_1_38
const char   *pango_font_map_get_shape_engine_type (PangoFontMap *fontmap);

#endif /* PANGO_ENABLE_BACKEND */

G_END_DECLS

#endif /* __PANGO_FONTMAP_H__ */
