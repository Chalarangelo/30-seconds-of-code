/* Pango
 * pangofc-font.h: Base fontmap type for fontconfig-based backends
 *
 * Copyright (C) 2003 Red Hat Software
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

#ifndef __PANGO_FC_FONT_H__
#define __PANGO_FC_FONT_H__

#include <pango/pango.h>

/* Freetype has undefined macros in its header */
#ifdef PANGO_COMPILATION
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wundef"
#endif

#include <ft2build.h>
#include FT_FREETYPE_H
#include <fontconfig/fontconfig.h>

#ifdef PANGO_COMPILATION
#pragma GCC diagnostic pop
#endif

G_BEGIN_DECLS

#define PANGO_TYPE_FC_FONT              (pango_fc_font_get_type ())
#define PANGO_FC_FONT(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_FC_FONT, PangoFcFont))
#define PANGO_IS_FC_FONT(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_FC_FONT))

typedef struct _PangoFcFont      PangoFcFont;
typedef struct _PangoFcFontClass PangoFcFontClass;

#if defined(PANGO_ENABLE_ENGINE) || defined(PANGO_ENABLE_BACKEND)

/**
 * PANGO_RENDER_TYPE_FC:
 *
 * A string constant used to identify shape engines that work
 * with the fontconfig based backends. See the @engine_type field
 * of #PangoEngineInfo.
 **/
#define PANGO_RENDER_TYPE_FC "PangoRenderFc"

#ifdef PANGO_ENABLE_BACKEND

#define PANGO_FC_FONT_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_FC_FONT, PangoFcFontClass))
#define PANGO_IS_FC_FONT_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_FC_FONT))
#define PANGO_FC_FONT_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_FC_FONT, PangoFcFontClass))

/**
 * PangoFcFont:
 *
 * #PangoFcFont is a base class for font implementations
 * using the Fontconfig and FreeType libraries and is used in
 * conjunction with #PangoFcFontMap. When deriving from this
 * class, you need to implement all of its virtual functions
 * other than shutdown() along with the get_glyph_extents()
 * virtual function from #PangoFont.
 **/
struct _PangoFcFont
{
  PangoFont parent_instance;

  FcPattern *font_pattern;	    /* fully resolved pattern */
  PangoFontMap *fontmap;	    /* associated map */
  gpointer priv;		    /* used internally */
  PangoMatrix matrix;		    /* used internally */
  PangoFontDescription *description;

  GSList *metrics_by_lang;

  guint is_hinted : 1;
  guint is_transformed : 1;
};

/**
 * PangoFcFontClass:
 * @lock_face: Returns the FT_Face of the font and increases
 *  the reference count for the face by one.
 * @unlock_face: Decreases the reference count for the
 *  FT_Face of the font by one. When the count is zero,
 *  the #PangoFcFont subclass is allowed to free the
 *  FT_Face.
 * @has_char: Return %TRUE if the the font contains a glyph
 *   corresponding to the specified character.
 * @get_glyph: Gets the glyph that corresponds to the given
 *   Unicode character.
 * @get_unknown_glyph: (nullable): Gets the glyph that
 *   should be used to display an unknown-glyph indication
 *   for the specified Unicode character.  May be %NULL.
 * @shutdown: (nullable): Performs any font-specific
 *   shutdown code that needs to be done when
 *   pango_fc_font_map_shutdown is called.  May be %NULL.
 *
 * Class structure for #PangoFcFont.
 **/
struct _PangoFcFontClass
{
  /*< private >*/
  PangoFontClass parent_class;

  /*< public >*/
  FT_Face    (*lock_face)         (PangoFcFont      *font);
  void       (*unlock_face)       (PangoFcFont      *font);
  gboolean   (*has_char)          (PangoFcFont      *font,
				   gunichar          wc);
  guint      (*get_glyph)         (PangoFcFont      *font,
				   gunichar          wc);
  PangoGlyph (*get_unknown_glyph) (PangoFcFont      *font,
				   gunichar          wc);
  void       (*shutdown)          (PangoFcFont      *font);
  /*< private >*/

  /* Padding for future expansion */
  void (*_pango_reserved1) (void);
  void (*_pango_reserved2) (void);
  void (*_pango_reserved3) (void);
  void (*_pango_reserved4) (void);
};

#endif /* PANGO_ENABLE_BACKEND */

PANGO_AVAILABLE_IN_1_4
gboolean   pango_fc_font_has_char          (PangoFcFont      *font,
					    gunichar          wc);
PANGO_AVAILABLE_IN_1_4
guint      pango_fc_font_get_glyph         (PangoFcFont      *font,
					    gunichar          wc);
#ifndef PANGO_DISABLE_DEPRECATED
PANGO_DEPRECATED_FOR(PANGO_GET_UNKNOWN_GLYPH)
PangoGlyph pango_fc_font_get_unknown_glyph (PangoFcFont      *font,
					    gunichar          wc);
PANGO_DEPRECATED_IN_1_32
void       pango_fc_font_kern_glyphs       (PangoFcFont      *font,
					    PangoGlyphString *glyphs);
#endif /* PANGO_DISABLE_DEPRECATED */

#endif /* PANGO_ENABLE_ENGINE || PANGO_ENABLE_BACKEND */

PANGO_AVAILABLE_IN_ALL
GType      pango_fc_font_get_type (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_1_4
FT_Face    pango_fc_font_lock_face         (PangoFcFont      *font);
PANGO_AVAILABLE_IN_1_4
void       pango_fc_font_unlock_face       (PangoFcFont      *font);

G_END_DECLS
#endif /* __PANGO_FC_FONT_H__ */
