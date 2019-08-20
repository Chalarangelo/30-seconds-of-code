/* Pango
 * pango-context.h: Rendering contexts
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

#ifndef __PANGO_CONTEXT_H__
#define __PANGO_CONTEXT_H__

#include <pango/pango-font.h>
#include <pango/pango-fontmap.h>
#include <pango/pango-attributes.h>

G_BEGIN_DECLS

/* Sort of like a GC - application set information about how
 * to handle scripts
 */

/* PangoContext typedefed in pango-fontmap.h */
typedef struct _PangoContextClass PangoContextClass;

#define PANGO_TYPE_CONTEXT              (pango_context_get_type ())
#define PANGO_CONTEXT(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_CONTEXT, PangoContext))
#define PANGO_CONTEXT_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_CONTEXT, PangoContextClass))
#define PANGO_IS_CONTEXT(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_CONTEXT))
#define PANGO_IS_CONTEXT_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_CONTEXT))
#define PANGO_CONTEXT_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_CONTEXT, PangoContextClass))


/* The PangoContext and PangoContextClass structs are private; if you
 * need to create a subclass of these, file a bug.
 */

PANGO_AVAILABLE_IN_ALL
GType         pango_context_get_type      (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_ALL
PangoContext *pango_context_new           (void);
PANGO_AVAILABLE_IN_1_32
void          pango_context_changed       (PangoContext                 *context);
PANGO_AVAILABLE_IN_ALL
void          pango_context_set_font_map  (PangoContext                 *context,
					   PangoFontMap                 *font_map);
PANGO_AVAILABLE_IN_1_6
PangoFontMap *pango_context_get_font_map  (PangoContext                 *context);
PANGO_AVAILABLE_IN_1_32
guint         pango_context_get_serial    (PangoContext                 *context);
PANGO_AVAILABLE_IN_ALL
void          pango_context_list_families (PangoContext                 *context,
					   PangoFontFamily            ***families,
					   int                          *n_families);
PANGO_AVAILABLE_IN_ALL
PangoFont *   pango_context_load_font     (PangoContext                 *context,
					   const PangoFontDescription   *desc);
PANGO_AVAILABLE_IN_ALL
PangoFontset *pango_context_load_fontset  (PangoContext                 *context,
					   const PangoFontDescription   *desc,
					   PangoLanguage                *language);

PANGO_AVAILABLE_IN_ALL
PangoFontMetrics *pango_context_get_metrics   (PangoContext                 *context,
					       const PangoFontDescription   *desc,
					       PangoLanguage                *language);

PANGO_AVAILABLE_IN_ALL
void                      pango_context_set_font_description (PangoContext               *context,
							      const PangoFontDescription *desc);
PANGO_AVAILABLE_IN_ALL
PangoFontDescription *    pango_context_get_font_description (PangoContext               *context);
PANGO_AVAILABLE_IN_ALL
PangoLanguage            *pango_context_get_language         (PangoContext               *context);
PANGO_AVAILABLE_IN_ALL
void                      pango_context_set_language         (PangoContext               *context,
							      PangoLanguage              *language);
PANGO_AVAILABLE_IN_ALL
void                      pango_context_set_base_dir         (PangoContext               *context,
							      PangoDirection              direction);
PANGO_AVAILABLE_IN_ALL
PangoDirection            pango_context_get_base_dir         (PangoContext               *context);
PANGO_AVAILABLE_IN_1_16
void                      pango_context_set_base_gravity     (PangoContext               *context,
							      PangoGravity                gravity);
PANGO_AVAILABLE_IN_1_16
PangoGravity              pango_context_get_base_gravity     (PangoContext               *context);
PANGO_AVAILABLE_IN_1_16
PangoGravity              pango_context_get_gravity          (PangoContext               *context);
PANGO_AVAILABLE_IN_1_16
void                      pango_context_set_gravity_hint     (PangoContext               *context,
							      PangoGravityHint            hint);
PANGO_AVAILABLE_IN_1_16
PangoGravityHint          pango_context_get_gravity_hint     (PangoContext               *context);

PANGO_AVAILABLE_IN_1_6
void                      pango_context_set_matrix           (PangoContext      *context,
						              const PangoMatrix *matrix);
PANGO_AVAILABLE_IN_1_6
const PangoMatrix *       pango_context_get_matrix           (PangoContext      *context);

/* Break a string of Unicode characters into segments with
 * consistent shaping/language engine and bidrectional level.
 * Returns a #GList of #PangoItem's
 */
PANGO_AVAILABLE_IN_ALL
GList *pango_itemize                (PangoContext      *context,
				     const char        *text,
				     int                start_index,
				     int                length,
				     PangoAttrList     *attrs,
				     PangoAttrIterator *cached_iter);
PANGO_AVAILABLE_IN_1_4
GList *pango_itemize_with_base_dir  (PangoContext      *context,
				     PangoDirection     base_dir,
				     const char        *text,
				     int                start_index,
				     int                length,
				     PangoAttrList     *attrs,
				     PangoAttrIterator *cached_iter);

G_END_DECLS

#endif /* __PANGO_CONTEXT_H__ */
