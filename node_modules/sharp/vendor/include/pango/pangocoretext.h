/* Pango
 * pangocoretext.h:
 *
 * Copyright (C) 2005 Imendio AB
 * Copyright (C) 2010  Kristian Rietveld  <kris@gtk.org>
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

#ifndef __PANGOCORETEXT_H__
#define __PANGOCORETEXT_H__

#include <pango/pango.h>
#include <Carbon/Carbon.h>

G_BEGIN_DECLS

#define PANGO_TYPE_CORE_TEXT_FONT       (pango_core_text_font_get_type ())
#define PANGO_CORE_TEXT_FONT(object)    (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_CORE_TEXT_FONT, PangoCoreTextFont))
#define PANGO_IS_CORE_TEXT_FONT(object) (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_CORE_TEXT_FONT))

typedef struct _PangoCoreTextFont         PangoCoreTextFont;
typedef struct _PangoCoreTextFontClass    PangoCoreTextFontClass;

#if defined(PANGO_ENABLE_ENGINE) || defined(PANGO_ENABLE_BACKEND)

/**
 * PANGO_RENDER_TYPE_CORE_TEXT:
 *
 * A string constant identifying the CoreText renderer. The associated quark (see
 * g_quark_from_string()) is used to identify the renderer in pango_find_map().
 */
#define PANGO_RENDER_TYPE_CORE_TEXT "PangoRenderCoreText"

#ifdef PANGO_ENABLE_BACKEND

#define PANGO_CORE_TEXT_FONT_CLASS(klass)    (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_CORE_TEXT_FONT, PangoCoreTextFontClass))
#define PANGO_IS_CORE_TEXT_FONT_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_CORE_TEXT_FONT))
#define PANGO_CORE_TEXT_FONT_GET_CLASS(obj)  (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_CORE_TEXT_FONT, PangoCoreTextFontClass))

typedef struct _PangoCoreTextFontPrivate  PangoCoreTextFontPrivate;

struct _PangoCoreTextFont
{
  PangoFont parent_instance;
  PangoCoreTextFontPrivate *priv;
};

struct _PangoCoreTextFontClass
{
  PangoFontClass parent_class;

  /*< private >*/

  /* Padding for future expansion */
  void (*_pango_reserved1) (void);
  void (*_pango_reserved2) (void);
  void (*_pango_reserved3) (void);
  void (*_pango_reserved4) (void);
};

#endif /* PANGO_ENABLE_BACKEND */

PANGO_AVAILABLE_IN_1_24
CTFontRef  pango_core_text_font_get_ctfont  (PangoCoreTextFont *font);

#endif /* PANGO_ENABLE_ENGINE || PANGO_ENABLE_BACKEND */

PANGO_AVAILABLE_IN_ALL
GType      pango_core_text_font_get_type         (void) G_GNUC_CONST;

G_END_DECLS

#endif /* __PANGOCORETEXT_H__ */
