/* Pango
 * pango-language.h: Language handling routines
 *
 * Copyright (C) 1999 Red Hat Software
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

#ifndef __PANGO_LANGUAGE_H__
#define __PANGO_LANGUAGE_H__

#include <glib.h>
#include <glib-object.h>

#include <pango/pango-version-macros.h>

G_BEGIN_DECLS

typedef struct _PangoLanguage PangoLanguage;

/**
 * PANGO_TYPE_LANGUAGE:
 *
 * The #GObject type for #PangoLanguage.
 */
#define PANGO_TYPE_LANGUAGE (pango_language_get_type ())

PANGO_AVAILABLE_IN_ALL
GType          pango_language_get_type    (void) G_GNUC_CONST;
PANGO_AVAILABLE_IN_ALL
PangoLanguage *pango_language_from_string (const char *language);

PANGO_AVAILABLE_IN_ALL
const char    *pango_language_to_string   (PangoLanguage *language) G_GNUC_CONST;
/* For back compat.  Will have to keep indefinitely. */
#define pango_language_to_string(language) ((const char *)language)

PANGO_AVAILABLE_IN_ALL
const char    *pango_language_get_sample_string (PangoLanguage *language) G_GNUC_CONST;
PANGO_AVAILABLE_IN_1_16
PangoLanguage *pango_language_get_default (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_ALL
gboolean      pango_language_matches  (PangoLanguage *language,
				       const char *range_list) G_GNUC_PURE;

#include <pango/pango-script.h>

PANGO_AVAILABLE_IN_1_4
gboolean		    pango_language_includes_script (PangoLanguage *language,
							    PangoScript    script) G_GNUC_PURE;
PANGO_AVAILABLE_IN_1_22
const PangoScript          *pango_language_get_scripts	   (PangoLanguage *language,
							    int           *num_scripts);

G_END_DECLS

#endif /* __PANGO_LANGUAGE_H__ */
