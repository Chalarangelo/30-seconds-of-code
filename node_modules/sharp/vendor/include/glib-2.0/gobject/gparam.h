/* GObject - GLib Type, Object, Parameter and Signal Library
 * Copyright (C) 1997-1999, 2000-2001 Tim Janik and Red Hat, Inc.
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
 * gparam.h: GParamSpec base class implementation
 */
#ifndef __G_PARAM_H__
#define __G_PARAM_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include	<gobject/gvalue.h>

G_BEGIN_DECLS

/* --- standard type macros --- */
/**
 * G_TYPE_IS_PARAM:
 * @type: a #GType ID
 * 
 * Checks whether @type "is a" %G_TYPE_PARAM.
 */
#define G_TYPE_IS_PARAM(type)		(G_TYPE_FUNDAMENTAL (type) == G_TYPE_PARAM)
/**
 * G_PARAM_SPEC:
 * @pspec: a valid #GParamSpec
 * 
 * Casts a derived #GParamSpec object (e.g. of type #GParamSpecInt) into
 * a #GParamSpec object.
 */
#define G_PARAM_SPEC(pspec)		(G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM, GParamSpec))
/**
 * G_IS_PARAM_SPEC:
 * @pspec: a #GParamSpec
 * 
 * Checks whether @pspec "is a" valid #GParamSpec structure of type %G_TYPE_PARAM
 * or derived.
 */
#if GLIB_VERSION_MAX_ALLOWED >= GLIB_VERSION_2_42
#define G_IS_PARAM_SPEC(pspec)		(G_TYPE_CHECK_INSTANCE_FUNDAMENTAL_TYPE ((pspec), G_TYPE_PARAM))
#else
#define G_IS_PARAM_SPEC(pspec)		(G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM))
#endif
/**
 * G_PARAM_SPEC_CLASS:
 * @pclass: a valid #GParamSpecClass
 * 
 * Casts a derived #GParamSpecClass structure into a #GParamSpecClass structure.
 */
#define G_PARAM_SPEC_CLASS(pclass)      (G_TYPE_CHECK_CLASS_CAST ((pclass), G_TYPE_PARAM, GParamSpecClass))
/**
 * G_IS_PARAM_SPEC_CLASS:
 * @pclass: a #GParamSpecClass
 * 
 * Checks whether @pclass "is a" valid #GParamSpecClass structure of type 
 * %G_TYPE_PARAM or derived.
 */
#define G_IS_PARAM_SPEC_CLASS(pclass)   (G_TYPE_CHECK_CLASS_TYPE ((pclass), G_TYPE_PARAM))
/**
 * G_PARAM_SPEC_GET_CLASS:
 * @pspec: a valid #GParamSpec
 * 
 * Retrieves the #GParamSpecClass of a #GParamSpec.
 */
#define G_PARAM_SPEC_GET_CLASS(pspec)	(G_TYPE_INSTANCE_GET_CLASS ((pspec), G_TYPE_PARAM, GParamSpecClass))


/* --- convenience macros --- */
/**
 * G_PARAM_SPEC_TYPE:
 * @pspec: a valid #GParamSpec
 * 
 * Retrieves the #GType of this @pspec.
 */
#define G_PARAM_SPEC_TYPE(pspec)	(G_TYPE_FROM_INSTANCE (pspec))
/**
 * G_PARAM_SPEC_TYPE_NAME:
 * @pspec: a valid #GParamSpec
 * 
 * Retrieves the #GType name of this @pspec.
 */
#define G_PARAM_SPEC_TYPE_NAME(pspec)	(g_type_name (G_PARAM_SPEC_TYPE (pspec)))
/**
 * G_PARAM_SPEC_VALUE_TYPE:
 * @pspec: a valid #GParamSpec
 * 
 * Retrieves the #GType to initialize a #GValue for this parameter.
 */
#define	G_PARAM_SPEC_VALUE_TYPE(pspec)	(G_PARAM_SPEC (pspec)->value_type)
/**
 * G_VALUE_HOLDS_PARAM:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values derived from type %G_TYPE_PARAM.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_PARAM(value)	(G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_PARAM))
       

/* --- flags --- */
/**
 * GParamFlags:
 * @G_PARAM_READABLE: the parameter is readable
 * @G_PARAM_WRITABLE: the parameter is writable
 * @G_PARAM_READWRITE: alias for %G_PARAM_READABLE | %G_PARAM_WRITABLE
 * @G_PARAM_CONSTRUCT: the parameter will be set upon object construction
 * @G_PARAM_CONSTRUCT_ONLY: the parameter can only be set upon object construction
 * @G_PARAM_LAX_VALIDATION: upon parameter conversion (see g_param_value_convert())
 *  strict validation is not required
 * @G_PARAM_STATIC_NAME: the string used as name when constructing the 
 *  parameter is guaranteed to remain valid and
 *  unmodified for the lifetime of the parameter. 
 *  Since 2.8
 * @G_PARAM_STATIC_NICK: the string used as nick when constructing the
 *  parameter is guaranteed to remain valid and
 *  unmmodified for the lifetime of the parameter.
 *  Since 2.8
 * @G_PARAM_STATIC_BLURB: the string used as blurb when constructing the 
 *  parameter is guaranteed to remain valid and 
 *  unmodified for the lifetime of the parameter. 
 *  Since 2.8
 * @G_PARAM_EXPLICIT_NOTIFY: calls to g_object_set_property() for this
 *   property will not automatically result in a "notify" signal being
 *   emitted: the implementation must call g_object_notify() themselves
 *   in case the property actually changes.  Since: 2.42.
 * @G_PARAM_PRIVATE: internal
 * @G_PARAM_DEPRECATED: the parameter is deprecated and will be removed
 *  in a future version. A warning will be generated if it is used
 *  while running with G_ENABLE_DIAGNOSTIC=1.
 *  Since 2.26
 * 
 * Through the #GParamFlags flag values, certain aspects of parameters
 * can be configured. See also #G_PARAM_STATIC_STRINGS.
 */
typedef enum
{
  G_PARAM_READABLE            = 1 << 0,
  G_PARAM_WRITABLE            = 1 << 1,
  G_PARAM_READWRITE           = (G_PARAM_READABLE | G_PARAM_WRITABLE),
  G_PARAM_CONSTRUCT	      = 1 << 2,
  G_PARAM_CONSTRUCT_ONLY      = 1 << 3,
  G_PARAM_LAX_VALIDATION      = 1 << 4,
  G_PARAM_STATIC_NAME	      = 1 << 5,
#ifndef G_DISABLE_DEPRECATED
  G_PARAM_PRIVATE	      = G_PARAM_STATIC_NAME,
#endif
  G_PARAM_STATIC_NICK	      = 1 << 6,
  G_PARAM_STATIC_BLURB	      = 1 << 7,
  /* User defined flags go here */
  G_PARAM_EXPLICIT_NOTIFY     = 1 << 30,
  /* Avoid warning with -Wpedantic for gcc6 */
  G_PARAM_DEPRECATED          = (gint)(1u << 31)
} GParamFlags;

/**
 * G_PARAM_STATIC_STRINGS:
 * 
 * #GParamFlags value alias for %G_PARAM_STATIC_NAME | %G_PARAM_STATIC_NICK | %G_PARAM_STATIC_BLURB.
 * 
 * Since 2.13.0
 */
#define	G_PARAM_STATIC_STRINGS (G_PARAM_STATIC_NAME | G_PARAM_STATIC_NICK | G_PARAM_STATIC_BLURB)
/* bits in the range 0xffffff00 are reserved for 3rd party usage */
/**
 * G_PARAM_MASK:
 * 
 * Mask containing the bits of #GParamSpec.flags which are reserved for GLib.
 */
#define	G_PARAM_MASK		(0x000000ff)
/**
 * G_PARAM_USER_SHIFT:
 * 
 * Minimum shift count to be used for user defined flags, to be stored in
 * #GParamSpec.flags. The maximum allowed is 10.
 */
#define	G_PARAM_USER_SHIFT	(8)

/* --- typedefs & structures --- */
typedef struct _GParamSpec      GParamSpec;
typedef struct _GParamSpecClass GParamSpecClass;
typedef struct _GParameter	GParameter;
typedef struct _GParamSpecPool  GParamSpecPool;
/**
 * GParamSpec: (ref-func g_param_spec_ref_sink) (unref-func g_param_spec_uref) (set-value-func g_value_set_param) (get-value-func g_value_get_param)
 * @g_type_instance: private #GTypeInstance portion
 * @name: name of this parameter: always an interned string
 * @flags: #GParamFlags flags for this parameter
 * @value_type: the #GValue type for this parameter
 * @owner_type: #GType type that uses (introduces) this parameter
 * 
 * All other fields of the GParamSpec struct are private and
 * should not be used directly.
 */
struct _GParamSpec
{
  GTypeInstance  g_type_instance;

  const gchar   *name;          /* interned string */
  GParamFlags    flags;
  GType		 value_type;
  GType		 owner_type;	/* class or interface using this property */

  /*< private >*/
  gchar         *_nick;
  gchar         *_blurb;
  GData		*qdata;
  guint          ref_count;
  guint		 param_id;	/* sort-criteria */
};
/**
 * GParamSpecClass:
 * @g_type_class: the parent class
 * @value_type: the #GValue type for this parameter
 * @finalize: The instance finalization function (optional), should chain 
 *  up to the finalize method of the parent class.
 * @value_set_default: Resets a @value to the default value for this type
 *  (recommended, the default is g_value_reset()), see 
 *  g_param_value_set_default().
 * @value_validate: Ensures that the contents of @value comply with the 
 *  specifications set out by this type (optional), see 
 *  g_param_value_validate().
 * @values_cmp: Compares @value1 with @value2 according to this type
 *  (recommended, the default is memcmp()), see g_param_values_cmp().
 * 
 * The class structure for the GParamSpec type.
 * Normally, GParamSpec classes are filled by
 * g_param_type_register_static().
 */
struct _GParamSpecClass
{
  GTypeClass      g_type_class;

  GType		  value_type;

  void	        (*finalize)		(GParamSpec   *pspec);

  /* GParam methods */
  void          (*value_set_default)    (GParamSpec   *pspec,
					 GValue       *value);
  gboolean      (*value_validate)       (GParamSpec   *pspec,
					 GValue       *value);
  gint          (*values_cmp)           (GParamSpec   *pspec,
					 const GValue *value1,
					 const GValue *value2);
  /*< private >*/
  gpointer	  dummy[4];
};
/**
 * GParameter:
 * @name: the parameter name
 * @value: the parameter value
 * 
 * The GParameter struct is an auxiliary structure used
 * to hand parameter name/value pairs to g_object_newv().
 *
 * Deprecated: 2.54: This type is not introspectable.
 */
struct _GParameter /* auxiliary structure for _setv() variants */
{
  const gchar *name;
  GValue       value;
};


/* --- prototypes --- */
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_ref		(GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
void		g_param_spec_unref		(GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
void		g_param_spec_sink		(GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_ref_sink   	(GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
gpointer        g_param_spec_get_qdata		(GParamSpec    *pspec,
						 GQuark         quark);
GLIB_AVAILABLE_IN_ALL
void            g_param_spec_set_qdata		(GParamSpec    *pspec,
						 GQuark         quark,
						 gpointer       data);
GLIB_AVAILABLE_IN_ALL
void            g_param_spec_set_qdata_full	(GParamSpec    *pspec,
						 GQuark         quark,
						 gpointer       data,
						 GDestroyNotify destroy);
GLIB_AVAILABLE_IN_ALL
gpointer        g_param_spec_steal_qdata	(GParamSpec    *pspec,
						 GQuark         quark);
GLIB_AVAILABLE_IN_ALL
GParamSpec*     g_param_spec_get_redirect_target (GParamSpec   *pspec);

GLIB_AVAILABLE_IN_ALL
void		g_param_value_set_default	(GParamSpec    *pspec,
						 GValue	       *value);
GLIB_AVAILABLE_IN_ALL
gboolean	g_param_value_defaults		(GParamSpec    *pspec,
						 GValue	       *value);
GLIB_AVAILABLE_IN_ALL
gboolean	g_param_value_validate		(GParamSpec    *pspec,
						 GValue	       *value);
GLIB_AVAILABLE_IN_ALL
gboolean	g_param_value_convert		(GParamSpec    *pspec,
						 const GValue  *src_value,
						 GValue	       *dest_value,
						 gboolean	strict_validation);
GLIB_AVAILABLE_IN_ALL
gint		g_param_values_cmp		(GParamSpec    *pspec,
						 const GValue  *value1,
						 const GValue  *value2);
GLIB_AVAILABLE_IN_ALL
const gchar *   g_param_spec_get_name           (GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
const gchar *   g_param_spec_get_nick           (GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
const gchar *   g_param_spec_get_blurb          (GParamSpec    *pspec);
GLIB_AVAILABLE_IN_ALL
void            g_value_set_param               (GValue	       *value,
						 GParamSpec    *param);
GLIB_AVAILABLE_IN_ALL
GParamSpec*     g_value_get_param               (const GValue  *value);
GLIB_AVAILABLE_IN_ALL
GParamSpec*     g_value_dup_param               (const GValue  *value);


GLIB_AVAILABLE_IN_ALL
void           g_value_take_param               (GValue        *value,
					         GParamSpec    *param);
GLIB_DEPRECATED_FOR(g_value_take_param)
void           g_value_set_param_take_ownership (GValue        *value,
                                                 GParamSpec    *param);
GLIB_AVAILABLE_IN_2_36
const GValue *  g_param_spec_get_default_value  (GParamSpec    *pspec);

GLIB_AVAILABLE_IN_2_46
GQuark          g_param_spec_get_name_quark     (GParamSpec    *pspec);

/* --- convenience functions --- */
typedef struct _GParamSpecTypeInfo GParamSpecTypeInfo;
/**
 * GParamSpecTypeInfo:
 * @instance_size: Size of the instance (object) structure.
 * @n_preallocs: Prior to GLib 2.10, it specified the number of pre-allocated (cached) instances to reserve memory for (0 indicates no caching). Since GLib 2.10, it is ignored, since instances are allocated with the [slice allocator][glib-Memory-Slices] now.
 * @instance_init: Location of the instance initialization function (optional).
 * @value_type: The #GType of values conforming to this #GParamSpec
 * @finalize: The instance finalization function (optional).
 * @value_set_default: Resets a @value to the default value for @pspec 
 *  (recommended, the default is g_value_reset()), see 
 *  g_param_value_set_default().
 * @value_validate: Ensures that the contents of @value comply with the 
 *  specifications set out by @pspec (optional), see 
 *  g_param_value_validate().
 * @values_cmp: Compares @value1 with @value2 according to @pspec 
 *  (recommended, the default is memcmp()), see g_param_values_cmp().
 * 
 * This structure is used to provide the type system with the information
 * required to initialize and destruct (finalize) a parameter's class and
 * instances thereof.
 * The initialized structure is passed to the g_param_type_register_static() 
 * The type system will perform a deep copy of this structure, so its memory 
 * does not need to be persistent across invocation of 
 * g_param_type_register_static().
 */
struct _GParamSpecTypeInfo
{
  /* type system portion */
  guint16         instance_size;                               /* obligatory */
  guint16         n_preallocs;                                 /* optional */
  void		(*instance_init)	(GParamSpec   *pspec); /* optional */

  /* class portion */
  GType           value_type;				       /* obligatory */
  void          (*finalize)             (GParamSpec   *pspec); /* optional */
  void          (*value_set_default)    (GParamSpec   *pspec,  /* recommended */
					 GValue       *value);
  gboolean      (*value_validate)       (GParamSpec   *pspec,  /* optional */
					 GValue       *value);
  gint          (*values_cmp)           (GParamSpec   *pspec,  /* recommended */
					 const GValue *value1,
					 const GValue *value2);
};
GLIB_AVAILABLE_IN_ALL
GType	g_param_type_register_static	(const gchar		  *name,
					 const GParamSpecTypeInfo *pspec_info);

/* For registering builting types */
GType  _g_param_type_register_static_constant (const gchar              *name,
					       const GParamSpecTypeInfo *pspec_info,
					       GType                     opt_type);


/* --- protected --- */
GLIB_AVAILABLE_IN_ALL
gpointer	g_param_spec_internal		(GType	        param_type,
						 const gchar   *name,
						 const gchar   *nick,
						 const gchar   *blurb,
						 GParamFlags    flags);
GLIB_AVAILABLE_IN_ALL
GParamSpecPool* g_param_spec_pool_new		(gboolean	type_prefixing);
GLIB_AVAILABLE_IN_ALL
void		g_param_spec_pool_insert	(GParamSpecPool	*pool,
						 GParamSpec	*pspec,
						 GType		 owner_type);
GLIB_AVAILABLE_IN_ALL
void		g_param_spec_pool_remove	(GParamSpecPool	*pool,
						 GParamSpec	*pspec);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_pool_lookup	(GParamSpecPool	*pool,
						 const gchar	*param_name,
						 GType		 owner_type,
						 gboolean	 walk_ancestors);
GLIB_AVAILABLE_IN_ALL
GList*		g_param_spec_pool_list_owned	(GParamSpecPool	*pool,
						 GType		 owner_type);
GLIB_AVAILABLE_IN_ALL
GParamSpec**	g_param_spec_pool_list		(GParamSpecPool	*pool,
						 GType		 owner_type,
						 guint		*n_pspecs_p);


/* contracts:
 *
 * gboolean value_validate (GParamSpec *pspec,
 *                          GValue     *value):
 *	modify value contents in the least destructive way, so
 *	that it complies with pspec's requirements (i.e.
 *	according to minimum/maximum ranges etc...). return
 *	whether modification was necessary.
 *
 * gint values_cmp (GParamSpec   *pspec,
 *                  const GValue *value1,
 *                  const GValue *value2):
 *	return value1 - value2, i.e. (-1) if value1 < value2,
 *	(+1) if value1 > value2, and (0) otherwise (equality)
 */

G_END_DECLS

#endif /* __G_PARAM_H__ */
