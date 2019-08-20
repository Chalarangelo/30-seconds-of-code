/* Pango
 * pango-modules.h:
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

#ifndef __PANGO_MODULES_H__
#define __PANGO_MODULES_H__

#include <pango/pango-engine.h>

G_BEGIN_DECLS

#ifdef PANGO_ENABLE_BACKEND

typedef struct _PangoMap PangoMap;
typedef struct _PangoMapEntry PangoMapEntry;

typedef struct _PangoIncludedModule PangoIncludedModule;

/**
 * PangoIncludedModule:
 * @list: a function that lists the engines defined in this module.
 * @init: a function to initialize the module.
 * @exit: a function to finalize the module.
 * @create: a function to create an engine, given the engine name.
 *
 * The #PangoIncludedModule structure for a statically linked module
 * contains the functions that would otherwise be loaded from a dynamically
 * loaded module.
 *
 * Deprecated: 1.38
 */
struct _PangoIncludedModule
{
  void (*list) (PangoEngineInfo **engines,
		int              *n_engines);
  void (*init) (GTypeModule      *module);
  void (*exit) (void);
  PangoEngine *(*create) (const char       *id);
};

PANGO_DEPRECATED_IN_1_38
PangoMap *     pango_find_map        (PangoLanguage       *language,
				      guint                engine_type_id,
				      guint                render_type_id);
PANGO_DEPRECATED_IN_1_38
PangoEngine *  pango_map_get_engine  (PangoMap            *map,
				      PangoScript          script);
PANGO_DEPRECATED_IN_1_38
void           pango_map_get_engines (PangoMap            *map,
				      PangoScript          script,
				      GSList             **exact_engines,
				      GSList             **fallback_engines);
PANGO_DEPRECATED_IN_1_38
void           pango_module_register (PangoIncludedModule *module);

#endif /* PANGO_ENABLE_BACKEND */

G_END_DECLS

#endif /* __PANGO_MODULES_H__ */
