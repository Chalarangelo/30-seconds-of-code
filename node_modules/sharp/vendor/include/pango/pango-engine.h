/* Pango
 * pango-engine.h: Engines for script and language specific processing
 *
 * Copyright (C) 2000,2003 Red Hat Software
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

#ifndef __PANGO_ENGINE_H__
#define __PANGO_ENGINE_H__

#include <pango/pango-types.h>
#include <pango/pango-item.h>
#include <pango/pango-font.h>
#include <pango/pango-glyph.h>
#include <pango/pango-script.h>

G_BEGIN_DECLS

#ifdef PANGO_ENABLE_ENGINE

/**
 * PANGO_RENDER_TYPE_NONE:
 *
 * A string constant defining the render type
 * for engines that are not rendering-system specific.
 *
 * Deprecated: 1.38
 */
#define PANGO_RENDER_TYPE_NONE "PangoRenderNone"

#define PANGO_TYPE_ENGINE              (pango_engine_get_type ())
#define PANGO_ENGINE(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_ENGINE, PangoEngine))
#define PANGO_IS_ENGINE(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_ENGINE))
#define PANGO_ENGINE_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_ENGINE, PangoEngineClass))
#define PANGO_IS_ENGINE_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_ENGINE))
#define PANGO_ENGINE_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_ENGINE, PangoEngineClass))

typedef struct _PangoEngine PangoEngine;
typedef struct _PangoEngineClass PangoEngineClass;

/**
 * PangoEngine:
 *
 * #PangoEngine is the base class for all types of language and
 * script specific engines. It has no functionality by itself.
 *
 * Deprecated: 1.38
 **/
struct _PangoEngine
{
  /*< private >*/
  GObject parent_instance;
};

/**
 * PangoEngineClass:
 *
 * Class structure for #PangoEngine
 *
 * Deprecated: 1.38
 **/
struct _PangoEngineClass
{
  /*< private >*/
  GObjectClass parent_class;
};

PANGO_DEPRECATED_IN_1_38
GType pango_engine_get_type (void) G_GNUC_CONST;

/**
 * PANGO_ENGINE_TYPE_LANG:
 *
 * A string constant defining the engine type for language engines.
 * These engines derive from #PangoEngineLang.
 *
 * Deprecated: 1.38
 */
#define PANGO_ENGINE_TYPE_LANG "PangoEngineLang"

#define PANGO_TYPE_ENGINE_LANG              (pango_engine_lang_get_type ())
#define PANGO_ENGINE_LANG(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_ENGINE_LANG, PangoEngineLang))
#define PANGO_IS_ENGINE_LANG(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_ENGINE_LANG))
#define PANGO_ENGINE_LANG_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_ENGINE_LANG, PangoEngineLangClass))
#define PANGO_IS_ENGINE_LANG_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_ENGINE_LANG))
#define PANGO_ENGINE_LANG_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_ENGINE_LANG, PangoEngineLangClass))

typedef struct _PangoEngineLangClass PangoEngineLangClass;

/**
 * PangoEngineLang:
 *
 * The #PangoEngineLang class is implemented by engines that
 * customize the rendering-system independent part of the
 * Pango pipeline for a particular script or language. For
 * instance, a custom #PangoEngineLang could be provided for
 * Thai to implement the dictionary-based word boundary
 * lookups needed for that language.
 *
 * Deprecated: 1.38
 **/
struct _PangoEngineLang
{
  /*< private >*/
  PangoEngine parent_instance;
};

/**
 * PangoEngineLangClass:
 * @script_break: (nullable): Provides a custom implementation of
 * pango_break().  If %NULL, pango_default_break() is used instead. If
 * not %NULL, for Pango versions before 1.16 (module interface version
 * before 1.6.0), this was called instead of pango_default_break(),
 * but in newer versions, pango_default_break() is always called and
 * this is called after that to allow tailoring the breaking results.
 *
 * Class structure for #PangoEngineLang
 *
 * Deprecated: 1.38
 **/
struct _PangoEngineLangClass
{
  /*< private >*/
  PangoEngineClass parent_class;

  /*< public >*/
  void (*script_break) (PangoEngineLang *engine,
			const char    *text,
			int            len,
			PangoAnalysis *analysis,
			PangoLogAttr  *attrs,
			int            attrs_len);
};

PANGO_DEPRECATED_IN_1_38
GType pango_engine_lang_get_type (void) G_GNUC_CONST;

/**
 * PANGO_ENGINE_TYPE_SHAPE:
 *
 * A string constant defining the engine type for shaping engines.
 * These engines derive from #PangoEngineShape.
 *
 * Deprecated: 1.38
 */
#define PANGO_ENGINE_TYPE_SHAPE "PangoEngineShape"

#define PANGO_TYPE_ENGINE_SHAPE              (pango_engine_shape_get_type ())
#define PANGO_ENGINE_SHAPE(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), PANGO_TYPE_ENGINE_SHAPE, PangoEngineShape))
#define PANGO_IS_ENGINE_SHAPE(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), PANGO_TYPE_ENGINE_SHAPE))
#define PANGO_ENGINE_SHAPE_CLASS(klass)      (G_TYPE_CHECK_CLASS_CAST ((klass), PANGO_TYPE_ENGINE_SHAPE, PangoEngine_ShapeClass))
#define PANGO_IS_ENGINE_SHAPE_CLASS(klass)   (G_TYPE_CHECK_CLASS_TYPE ((klass), PANGO_TYPE_ENGINE_SHAPE))
#define PANGO_ENGINE_SHAPE_GET_CLASS(obj)    (G_TYPE_INSTANCE_GET_CLASS ((obj), PANGO_TYPE_ENGINE_SHAPE, PangoEngineShapeClass))

typedef struct _PangoEngineShapeClass PangoEngineShapeClass;

/**
 * PangoEngineShape:
 *
 * The #PangoEngineShape class is implemented by engines that
 * customize the rendering-system dependent part of the
 * Pango pipeline for a particular script or language.
 * A #PangoEngineShape implementation is then specific to both
 * a particular rendering system or group of rendering systems
 * and to a particular script. For instance, there is one
 * #PangoEngineShape implementation to handle shaping Arabic
 * for Fontconfig-based backends.
 *
 * Deprecated: 1.38
 **/
struct _PangoEngineShape
{
  PangoEngine parent_instance;
};

/**
 * PangoEngineShapeClass:
 * @script_shape: Given a font, a piece of text, and a #PangoAnalysis
 *   structure, converts characters to glyphs and positions the
 *   resulting glyphs. The results are stored in the #PangoGlyphString
 *   that is passed in. (The implementation should resize it
 *   appropriately using pango_glyph_string_set_size()). All fields
 *   of the @log_clusters and @glyphs array must be filled in, with
 *   the exception that Pango will automatically generate
 *   <literal>glyphs->glyphs[i].attr.is_cluster_start</literal>
 *   using the @log_clusters array. Each input character must occur in one
 *   of the output logical clusters;
 *   if no rendering is desired for a character, this may involve
 *   inserting glyphs with the #PangoGlyph ID #PANGO_GLYPH_EMPTY, which
 *   is guaranteed never to render. If the shaping fails for any reason,
 *   the shaper should return with an empty (zero-size) glyph string.
 *   If the shaper has not set the size on the glyph string yet, simply
 *   returning signals the failure too.
 * @covers: Returns the characters that this engine can cover
 *   with a given font for a given language. If not overridden, the default
 *   implementation simply returns the coverage information for the
 *   font itself unmodified.
 *
 * Class structure for #PangoEngineShape
 *
 * Deprecated: 1.38
 **/
struct _PangoEngineShapeClass
{
  /*< private >*/
  PangoEngineClass parent_class;

  /*< public >*/
  void (*script_shape) (PangoEngineShape    *engine,
			PangoFont           *font,
			const char          *item_text,
			unsigned int         item_length,
			const PangoAnalysis *analysis,
			PangoGlyphString    *glyphs,
			const char          *paragraph_text,
			unsigned int         paragraph_length);
  PangoCoverageLevel (*covers)   (PangoEngineShape *engine,
				  PangoFont        *font,
				  PangoLanguage    *language,
				  gunichar          wc);
};

PANGO_DEPRECATED_IN_1_38
GType pango_engine_shape_get_type (void) G_GNUC_CONST;

typedef struct _PangoEngineInfo PangoEngineInfo;
typedef struct _PangoEngineScriptInfo PangoEngineScriptInfo;

/**
 * PangoEngineScriptInfo:
 * @script: a #PangoScript. The value %PANGO_SCRIPT_COMMON has
 * the special meaning here of "all scripts"
 * @langs: a semicolon separated list of languages that this
 * engine handles for this script. This may be empty,
 * in which case the engine is saying that it is a
 * fallback choice for all languages for this range,
 * but should not be used if another engine
 * indicates that it is specific for the language for
 * a given code point. An entry in this list of "*"
 * indicates that this engine is specific to all
 * languages for this range.
 *
 * The #PangoEngineScriptInfo structure contains
 * information about how the shaper covers a particular script.
 *
 * Deprecated: 1.38
 */
struct _PangoEngineScriptInfo
{
  PangoScript script;
  const gchar *langs;
};

/**
 * PangoEngineInfo:
 * @id: a unique string ID for the engine.
 * @engine_type: a string identifying the engine type.
 * @render_type: a string identifying the render type.
 * @scripts: array of scripts this engine supports.
 * @n_scripts: number of items in @scripts.
 *
 * The #PangoEngineInfo structure contains information about a particular
 * engine. It contains the following fields:
 *
 * Deprecated: 1.38
 */
struct _PangoEngineInfo
{
  const gchar *id;
  const gchar *engine_type;
  const gchar *render_type;
  PangoEngineScriptInfo *scripts;
  gint n_scripts;
};

/**
 * script_engine_list: (skip)
 * @engines: location to store a pointer to an array of engines.
 * @n_engines: location to store the number of elements in @engines.
 *
 * Do not use.
 *
 * Deprecated: 1.38
 **/
PANGO_DEPRECATED_IN_1_38
void script_engine_list (PangoEngineInfo **engines,
			 int              *n_engines);

/**
 * script_engine_init: (skip)
 * @module: a #GTypeModule structure used to associate any
 *  GObject types created in this module with the module.
 *
 * Do not use.
 *
 * Deprecated: 1.38
 **/
PANGO_DEPRECATED_IN_1_38
void script_engine_init (GTypeModule *module);


/**
 * script_engine_exit: (skip)
 *
 * Do not use.
 *
 * Deprecated: 1.38
 **/
PANGO_DEPRECATED_IN_1_38
void script_engine_exit (void);

/**
 * script_engine_create: (skip)
 * @id: the ID of an engine as reported by script_engine_list.
 *
 * Do not use.
 *
 * Deprecated: 1.38
 **/
PANGO_DEPRECATED_IN_1_38
PangoEngine *script_engine_create (const char *id);

/* Utility macro used by PANGO_ENGINE_LANG_DEFINE_TYPE and
 * PANGO_ENGINE_LANG_DEFINE_TYPE
 */
#define PANGO_ENGINE_DEFINE_TYPE(name, prefix, class_init, instance_init, parent_type) \
static GType prefix ## _type;						  \
static void								  \
prefix ## _register_type (GTypeModule *module)				  \
{									  \
  const GTypeInfo object_info =						  \
    {									  \
      sizeof (name ## Class),						  \
      (GBaseInitFunc) NULL,						  \
      (GBaseFinalizeFunc) NULL,						  \
      (GClassInitFunc) class_init,					  \
      (GClassFinalizeFunc) NULL,					  \
      NULL,          /* class_data */					  \
      sizeof (name),							  \
      0,             /* n_prelocs */					  \
      (GInstanceInitFunc) instance_init,				  \
      NULL           /* value_table */					  \
    };									  \
									  \
  prefix ## _type =  g_type_module_register_type (module, parent_type,	  \
						  # name,		  \
						  &object_info, 0);	  \
}

/**
 * PANGO_ENGINE_LANG_DEFINE_TYPE:
 * @name: Name of the the type to register (for example:, <literal>ArabicEngineFc</literal>
 * @prefix: Prefix for symbols that will be defined (for example:, <literal>arabic_engine_fc</literal>
 * @class_init: (nullable): Class initialization function for the new type, or %NULL
 * @instance_init: (nullable): Instance initialization function for the new type, or %NULL
 *
 * Outputs the necessary code for GObject type registration for a
 * #PangoEngineLang class defined in a module. Two static symbols
 * are defined.
 *
 * <programlisting>
 *  static GType <replaceable>prefix</replaceable>_type;
 *  static void <replaceable>prefix</replaceable>_register_type (GTypeModule module);
 * </programlisting>
 *
 * The <function><replaceable>prefix</replaceable>_register_type()</function>
 * function should be called in your script_engine_init() function for
 * each type that your module implements, and then your script_engine_create()
 * function can create instances of the object as follows:
 *
 * <informalexample><programlisting>
 *  PangoEngine *engine = g_object_new (<replaceable>prefix</replaceable>_type, NULL);
 * </programlisting></informalexample>
 *
 * Deprecated: 1.38
 **/
#define PANGO_ENGINE_LANG_DEFINE_TYPE(name, prefix, class_init, instance_init)	\
  PANGO_ENGINE_DEFINE_TYPE (name, prefix,				\
			    class_init, instance_init,			\
			    PANGO_TYPE_ENGINE_LANG)

/**
 * PANGO_ENGINE_SHAPE_DEFINE_TYPE:
 * @name: Name of the the type to register (for example:, <literal>ArabicEngineFc</literal>
 * @prefix: Prefix for symbols that will be defined (for example:, <literal>arabic_engine_fc</literal>
 * @class_init: (nullable): Class initialization function for the new type, or %NULL
 * @instance_init: (nullable): Instance initialization function for the new type, or %NULL
 *
 * Outputs the necessary code for GObject type registration for a
 * #PangoEngineShape class defined in a module. Two static symbols
 * are defined.
 *
 * <programlisting>
 *  static GType <replaceable>prefix</replaceable>_type;
 *  static void <replaceable>prefix</replaceable>_register_type (GTypeModule module);
 * </programlisting>
 *
 * The <function><replaceable>prefix</replaceable>_register_type()</function>
 * function should be called in your script_engine_init() function for
 * each type that your module implements, and then your script_engine_create()
 * function can create instances of the object as follows:
 *
 * <informalexample><programlisting>
 *  PangoEngine *engine = g_object_new (<replaceable>prefix</replaceable>_type, NULL);
 * </programlisting></informalexample>
 *
 * Deprecated: 1.38
 **/
#define PANGO_ENGINE_SHAPE_DEFINE_TYPE(name, prefix, class_init, instance_init)	\
  PANGO_ENGINE_DEFINE_TYPE (name, prefix,				\
			    class_init, instance_init,			\
			    PANGO_TYPE_ENGINE_SHAPE)

/* Macro used for possibly builtin Pango modules. Not useful
 * for externally build modules. If we are compiling a module standalone,
 * then we name the entry points script_engine_list, etc. But if we
 * are compiling it for inclusion directly in Pango, then we need them to
 * to have distinct names for this module, so we prepend a prefix.
 *
 * The two intermediate macros are to deal with details of the C
 * preprocessor; token pasting tokens must be function arguments,
 * and macro substitution isn't used on function arguments that
 * are used for token pasting.
 */
#ifdef PANGO_MODULE_PREFIX
#define PANGO_MODULE_ENTRY(func) _PANGO_MODULE_ENTRY2(PANGO_MODULE_PREFIX,func)
#define _PANGO_MODULE_ENTRY2(prefix,func) _PANGO_MODULE_ENTRY3(prefix,func)
#define _PANGO_MODULE_ENTRY3(prefix,func) prefix##_script_engine_##func
#else
#define PANGO_MODULE_ENTRY(func) script_engine_##func
#endif

#endif /* PANGO_ENABLE_ENGINE */

G_END_DECLS

#endif /* __PANGO_ENGINE_H__ */
