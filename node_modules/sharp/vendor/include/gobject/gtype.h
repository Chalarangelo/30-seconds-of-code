/* GObject - GLib Type, Object, Parameter and Signal Library
 * Copyright (C) 1998-1999, 2000-2001 Tim Janik and Red Hat, Inc.
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
 */
#ifndef __G_TYPE_H__
#define __G_TYPE_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include        <glib.h>

G_BEGIN_DECLS

/* Basic Type Macros
 */
/**
 * G_TYPE_FUNDAMENTAL:
 * @type: A #GType value.
 * 
 * The fundamental type which is the ancestor of @type.
 * Fundamental types are types that serve as ultimate bases for the derived types, 
 * thus they are the roots of distinct inheritance hierarchies.
 */
#define G_TYPE_FUNDAMENTAL(type)	(g_type_fundamental (type))
/**
 * G_TYPE_FUNDAMENTAL_MAX:
 * 
 * An integer constant that represents the number of identifiers reserved
 * for types that are assigned at compile-time.
 */
#define	G_TYPE_FUNDAMENTAL_MAX		(255 << G_TYPE_FUNDAMENTAL_SHIFT)

/* Constant fundamental types,
 */
/**
 * G_TYPE_INVALID:
 * 
 * An invalid #GType used as error return value in some functions which return
 * a #GType. 
 */
#define G_TYPE_INVALID			G_TYPE_MAKE_FUNDAMENTAL (0)
/**
 * G_TYPE_NONE:
 * 
 * A fundamental type which is used as a replacement for the C
 * void return type.
 */
#define G_TYPE_NONE			G_TYPE_MAKE_FUNDAMENTAL (1)
/**
 * G_TYPE_INTERFACE:
 * 
 * The fundamental type from which all interfaces are derived.
 */
#define G_TYPE_INTERFACE		G_TYPE_MAKE_FUNDAMENTAL (2)
/**
 * G_TYPE_CHAR:
 * 
 * The fundamental type corresponding to #gchar.
 * The type designated by G_TYPE_CHAR is unconditionally an 8-bit signed integer.
 * This may or may not be the same type a the C type "gchar".
 */
#define G_TYPE_CHAR			G_TYPE_MAKE_FUNDAMENTAL (3)
/**
 * G_TYPE_UCHAR:
 * 
 * The fundamental type corresponding to #guchar.
 */
#define G_TYPE_UCHAR			G_TYPE_MAKE_FUNDAMENTAL (4)
/**
 * G_TYPE_BOOLEAN:
 * 
 * The fundamental type corresponding to #gboolean.
 */
#define G_TYPE_BOOLEAN			G_TYPE_MAKE_FUNDAMENTAL (5)
/**
 * G_TYPE_INT:
 * 
 * The fundamental type corresponding to #gint.
 */
#define G_TYPE_INT			G_TYPE_MAKE_FUNDAMENTAL (6)
/**
 * G_TYPE_UINT:
 * 
 * The fundamental type corresponding to #guint.
 */
#define G_TYPE_UINT			G_TYPE_MAKE_FUNDAMENTAL (7)
/**
 * G_TYPE_LONG:
 * 
 * The fundamental type corresponding to #glong.
 */
#define G_TYPE_LONG			G_TYPE_MAKE_FUNDAMENTAL (8)
/**
 * G_TYPE_ULONG:
 * 
 * The fundamental type corresponding to #gulong.
 */
#define G_TYPE_ULONG			G_TYPE_MAKE_FUNDAMENTAL (9)
/**
 * G_TYPE_INT64:
 * 
 * The fundamental type corresponding to #gint64.
 */
#define G_TYPE_INT64			G_TYPE_MAKE_FUNDAMENTAL (10)
/**
 * G_TYPE_UINT64:
 * 
 * The fundamental type corresponding to #guint64.
 */
#define G_TYPE_UINT64			G_TYPE_MAKE_FUNDAMENTAL (11)
/**
 * G_TYPE_ENUM:
 * 
 * The fundamental type from which all enumeration types are derived.
 */
#define G_TYPE_ENUM			G_TYPE_MAKE_FUNDAMENTAL (12)
/**
 * G_TYPE_FLAGS:
 * 
 * The fundamental type from which all flags types are derived.
 */
#define G_TYPE_FLAGS			G_TYPE_MAKE_FUNDAMENTAL (13)
/**
 * G_TYPE_FLOAT:
 * 
 * The fundamental type corresponding to #gfloat.
 */
#define G_TYPE_FLOAT			G_TYPE_MAKE_FUNDAMENTAL (14)
/**
 * G_TYPE_DOUBLE:
 * 
 * The fundamental type corresponding to #gdouble.
 */
#define G_TYPE_DOUBLE			G_TYPE_MAKE_FUNDAMENTAL (15)
/**
 * G_TYPE_STRING:
 * 
 * The fundamental type corresponding to nul-terminated C strings.
 */
#define G_TYPE_STRING			G_TYPE_MAKE_FUNDAMENTAL (16)
/**
 * G_TYPE_POINTER:
 * 
 * The fundamental type corresponding to #gpointer.
 */
#define G_TYPE_POINTER			G_TYPE_MAKE_FUNDAMENTAL (17)
/**
 * G_TYPE_BOXED:
 * 
 * The fundamental type from which all boxed types are derived.
 */
#define G_TYPE_BOXED			G_TYPE_MAKE_FUNDAMENTAL (18)
/**
 * G_TYPE_PARAM:
 * 
 * The fundamental type from which all #GParamSpec types are derived.
 */
#define G_TYPE_PARAM			G_TYPE_MAKE_FUNDAMENTAL (19)
/**
 * G_TYPE_OBJECT:
 * 
 * The fundamental type for #GObject.
 */
#define G_TYPE_OBJECT			G_TYPE_MAKE_FUNDAMENTAL (20)
/**
 * G_TYPE_VARIANT:
 *
 * The fundamental type corresponding to #GVariant.
 *
 * All floating #GVariant instances passed through the #GType system are
 * consumed.
 * 
 * Note that callbacks in closures, and signal handlers
 * for signals of return type %G_TYPE_VARIANT, must never return floating
 * variants.
 *
 * Note: GLib 2.24 did include a boxed type with this name. It was replaced
 * with this fundamental type in 2.26.
 *
 * Since: 2.26
 */
#define	G_TYPE_VARIANT                  G_TYPE_MAKE_FUNDAMENTAL (21)


/* Reserved fundamental type numbers to create new fundamental
 * type IDs with G_TYPE_MAKE_FUNDAMENTAL().
 * Send email to gtk-devel-list@gnome.org for reservations.
 */
/**
 * G_TYPE_FUNDAMENTAL_SHIFT:
 *
 * Shift value used in converting numbers to type IDs.
 */
#define	G_TYPE_FUNDAMENTAL_SHIFT	(2)
/**
 * G_TYPE_MAKE_FUNDAMENTAL:
 * @x: the fundamental type number.
 * 
 * Get the type ID for the fundamental type number @x.
 * Use g_type_fundamental_next() instead of this macro to create new fundamental 
 * types.
 *
 * Returns: the GType
 */
#define	G_TYPE_MAKE_FUNDAMENTAL(x)	((GType) ((x) << G_TYPE_FUNDAMENTAL_SHIFT))
/**
 * G_TYPE_RESERVED_GLIB_FIRST:
 * 
 * First fundamental type number to create a new fundamental type id with
 * G_TYPE_MAKE_FUNDAMENTAL() reserved for GLib.
 */
#define G_TYPE_RESERVED_GLIB_FIRST	(22)
/**
 * G_TYPE_RESERVED_GLIB_LAST:
 * 
 * Last fundamental type number reserved for GLib.
 */
#define G_TYPE_RESERVED_GLIB_LAST	(31)
/**
 * G_TYPE_RESERVED_BSE_FIRST:
 * 
 * First fundamental type number to create a new fundamental type id with
 * G_TYPE_MAKE_FUNDAMENTAL() reserved for BSE.
 */
#define G_TYPE_RESERVED_BSE_FIRST	(32)
/**
 * G_TYPE_RESERVED_BSE_LAST:
 * 
 * Last fundamental type number reserved for BSE.
 */
#define G_TYPE_RESERVED_BSE_LAST	(48)
/**
 * G_TYPE_RESERVED_USER_FIRST:
 * 
 * First available fundamental type number to create new fundamental 
 * type id with G_TYPE_MAKE_FUNDAMENTAL().
 */
#define G_TYPE_RESERVED_USER_FIRST	(49)


/* Type Checking Macros
 */
/**
 * G_TYPE_IS_FUNDAMENTAL:
 * @type: A #GType value
 * 
 * Checks if @type is a fundamental type.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_FUNDAMENTAL(type)             ((type) <= G_TYPE_FUNDAMENTAL_MAX)
/**
 * G_TYPE_IS_DERIVED:
 * @type: A #GType value
 * 
 * Checks if @type is derived (or in object-oriented terminology:
 * inherited) from another type (this holds true for all non-fundamental
 * types).
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_DERIVED(type)                 ((type) > G_TYPE_FUNDAMENTAL_MAX)
/**
 * G_TYPE_IS_INTERFACE:
 * @type: A #GType value
 * 
 * Checks if @type is an interface type.
 * An interface type provides a pure API, the implementation
 * of which is provided by another type (which is then said to conform
 * to the interface).  GLib interfaces are somewhat analogous to Java
 * interfaces and C++ classes containing only pure virtual functions, 
 * with the difference that GType interfaces are not derivable (but see
 * g_type_interface_add_prerequisite() for an alternative).
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_INTERFACE(type)               (G_TYPE_FUNDAMENTAL (type) == G_TYPE_INTERFACE)
/**
 * G_TYPE_IS_CLASSED:
 * @type: A #GType value
 * 
 * Checks if @type is a classed type.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_CLASSED(type)                 (g_type_test_flags ((type), G_TYPE_FLAG_CLASSED))
/**
 * G_TYPE_IS_INSTANTIATABLE:
 * @type: A #GType value
 * 
 * Checks if @type can be instantiated.  Instantiation is the
 * process of creating an instance (object) of this type.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_INSTANTIATABLE(type)          (g_type_test_flags ((type), G_TYPE_FLAG_INSTANTIATABLE))
/**
 * G_TYPE_IS_DERIVABLE:
 * @type: A #GType value
 * 
 * Checks if @type is a derivable type.  A derivable type can
 * be used as the base class of a flat (single-level) class hierarchy.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_DERIVABLE(type)               (g_type_test_flags ((type), G_TYPE_FLAG_DERIVABLE))
/**
 * G_TYPE_IS_DEEP_DERIVABLE:
 * @type: A #GType value
 * 
 * Checks if @type is a deep derivable type.  A deep derivable type
 * can be used as the base class of a deep (multi-level) class hierarchy.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_DEEP_DERIVABLE(type)          (g_type_test_flags ((type), G_TYPE_FLAG_DEEP_DERIVABLE))
/**
 * G_TYPE_IS_ABSTRACT:
 * @type: A #GType value
 * 
 * Checks if @type is an abstract type.  An abstract type cannot be
 * instantiated and is normally used as an abstract base class for
 * derived classes.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_ABSTRACT(type)                (g_type_test_flags ((type), G_TYPE_FLAG_ABSTRACT))
/**
 * G_TYPE_IS_VALUE_ABSTRACT:
 * @type: A #GType value
 * 
 * Checks if @type is an abstract value type.  An abstract value type introduces
 * a value table, but can't be used for g_value_init() and is normally used as
 * an abstract base type for derived value types.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_VALUE_ABSTRACT(type)          (g_type_test_flags ((type), G_TYPE_FLAG_VALUE_ABSTRACT))
/**
 * G_TYPE_IS_VALUE_TYPE:
 * @type: A #GType value
 * 
 * Checks if @type is a value type and can be used with g_value_init(). 
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_IS_VALUE_TYPE(type)              (g_type_check_is_value_type (type))
/**
 * G_TYPE_HAS_VALUE_TABLE:
 * @type: A #GType value
 * 
 * Checks if @type has a #GTypeValueTable.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_HAS_VALUE_TABLE(type)            (g_type_value_table_peek (type) != NULL)


/* Typedefs
 */
/**
 * GType:
 * 
 * A numerical value which represents the unique identifier of a registered
 * type.
 */
#if     GLIB_SIZEOF_SIZE_T != GLIB_SIZEOF_LONG || !defined __cplusplus
typedef gsize                           GType;
#else   /* for historic reasons, C++ links against gulong GTypes */
typedef gulong                          GType;
#endif
typedef struct _GValue                  GValue;
typedef union  _GTypeCValue             GTypeCValue;
typedef struct _GTypePlugin             GTypePlugin;
typedef struct _GTypeClass              GTypeClass;
typedef struct _GTypeInterface          GTypeInterface;
typedef struct _GTypeInstance           GTypeInstance;
typedef struct _GTypeInfo               GTypeInfo;
typedef struct _GTypeFundamentalInfo    GTypeFundamentalInfo;
typedef struct _GInterfaceInfo          GInterfaceInfo;
typedef struct _GTypeValueTable         GTypeValueTable;
typedef struct _GTypeQuery		GTypeQuery;


/* Basic Type Structures
 */
/**
 * GTypeClass:
 * 
 * An opaque structure used as the base of all classes.
 */
struct _GTypeClass
{
  /*< private >*/
  GType g_type;
};
/**
 * GTypeInstance:
 * 
 * An opaque structure used as the base of all type instances.
 */
struct _GTypeInstance
{
  /*< private >*/
  GTypeClass *g_class;
};
/**
 * GTypeInterface:
 * 
 * An opaque structure used as the base of all interface types.
 */
struct _GTypeInterface
{
  /*< private >*/
  GType g_type;         /* iface type */
  GType g_instance_type;
};
/**
 * GTypeQuery:
 * @type: the #GType value of the type
 * @type_name: the name of the type
 * @class_size: the size of the class structure
 * @instance_size: the size of the instance structure
 * 
 * A structure holding information for a specific type.
 * It is filled in by the g_type_query() function.
 */
struct _GTypeQuery
{
  GType		type;
  const gchar  *type_name;
  guint		class_size;
  guint		instance_size;
};


/* Casts, checks and accessors for structured types
 * usage of these macros is reserved to type implementations only
 */
/*< protected >*/
/**
 * G_TYPE_CHECK_INSTANCE:
 * @instance: Location of a #GTypeInstance structure
 * 
 * Checks if @instance is a valid #GTypeInstance structure,
 * otherwise issues a warning and returns %FALSE. %NULL is not a valid
 * #GTypeInstance.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_CHECK_INSTANCE(instance)				(_G_TYPE_CHI ((GTypeInstance*) (instance)))
/**
 * G_TYPE_CHECK_INSTANCE_CAST:
 * @instance: (nullable): Location of a #GTypeInstance structure
 * @g_type: The type to be returned
 * @c_type: The corresponding C type of @g_type
 * 
 * Checks that @instance is an instance of the type identified by @g_type
 * and issues a warning if this is not the case. Returns @instance casted 
 * to a pointer to @c_type.
 *
 * No warning will be issued if @instance is %NULL, and %NULL will be returned.
 * 
 * This macro should only be used in type implementations.
 */
#define G_TYPE_CHECK_INSTANCE_CAST(instance, g_type, c_type)    (_G_TYPE_CIC ((instance), (g_type), c_type))
/**
 * G_TYPE_CHECK_INSTANCE_TYPE:
 * @instance: (nullable): Location of a #GTypeInstance structure.
 * @g_type: The type to be checked
 * 
 * Checks if @instance is an instance of the type identified by @g_type. If
 * @instance is %NULL, %FALSE will be returned.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_CHECK_INSTANCE_TYPE(instance, g_type)            (_G_TYPE_CIT ((instance), (g_type)))
/**
 * G_TYPE_CHECK_INSTANCE_FUNDAMENTAL_TYPE:
 * @instance: (nullable): Location of a #GTypeInstance structure.
 * @g_type: The fundamental type to be checked
 *
 * Checks if @instance is an instance of the fundamental type identified by @g_type.
 * If @instance is %NULL, %FALSE will be returned.
 *
 * This macro should only be used in type implementations.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_CHECK_INSTANCE_FUNDAMENTAL_TYPE(instance, g_type)            (_G_TYPE_CIFT ((instance), (g_type)))
/**
 * G_TYPE_INSTANCE_GET_CLASS:
 * @instance: Location of the #GTypeInstance structure
 * @g_type: The #GType of the class to be returned
 * @c_type: The C type of the class structure
 * 
 * Get the class structure of a given @instance, casted
 * to a specified ancestor type @g_type of the instance.
 * 
 * Note that while calling a GInstanceInitFunc(), the class pointer
 * gets modified, so it might not always return the expected pointer.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: a pointer to the class structure
 */
#define G_TYPE_INSTANCE_GET_CLASS(instance, g_type, c_type)     (_G_TYPE_IGC ((instance), (g_type), c_type))
/**
 * G_TYPE_INSTANCE_GET_INTERFACE:
 * @instance: Location of the #GTypeInstance structure
 * @g_type: The #GType of the interface to be returned
 * @c_type: The C type of the interface structure
 * 
 * Get the interface structure for interface @g_type of a given @instance.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: a pointer to the interface structure
 */
#define G_TYPE_INSTANCE_GET_INTERFACE(instance, g_type, c_type) (_G_TYPE_IGI ((instance), (g_type), c_type))
/**
 * G_TYPE_CHECK_CLASS_CAST:
 * @g_class: Location of a #GTypeClass structure
 * @g_type: The type to be returned
 * @c_type: The corresponding C type of class structure of @g_type
 * 
 * Checks that @g_class is a class structure of the type identified by @g_type
 * and issues a warning if this is not the case. Returns @g_class casted 
 * to a pointer to @c_type. %NULL is not a valid class structure.
 * 
 * This macro should only be used in type implementations.
 */
#define G_TYPE_CHECK_CLASS_CAST(g_class, g_type, c_type)        (_G_TYPE_CCC ((g_class), (g_type), c_type))
/**
 * G_TYPE_CHECK_CLASS_TYPE:
 * @g_class: (nullable): Location of a #GTypeClass structure
 * @g_type: The type to be checked
 * 
 * Checks if @g_class is a class structure of the type identified by 
 * @g_type. If @g_class is %NULL, %FALSE will be returned.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_CHECK_CLASS_TYPE(g_class, g_type)                (_G_TYPE_CCT ((g_class), (g_type)))
/**
 * G_TYPE_CHECK_VALUE:
 * @value: a #GValue
 * 
 * Checks if @value has been initialized to hold values
 * of a value type.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_CHECK_VALUE(value)				(_G_TYPE_CHV ((value)))
/**
 * G_TYPE_CHECK_VALUE_TYPE:
 * @value: a #GValue
 * @g_type: The type to be checked
 * 
 * Checks if @value has been initialized to hold values
 * of type @g_type. 
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: %TRUE on success
 */
#define G_TYPE_CHECK_VALUE_TYPE(value, g_type)			(_G_TYPE_CVH ((value), (g_type)))
/**
 * G_TYPE_FROM_INSTANCE:
 * @instance: Location of a valid #GTypeInstance structure
 * 
 * Get the type identifier from a given @instance structure. 
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: the #GType
 */
#define G_TYPE_FROM_INSTANCE(instance)                          (G_TYPE_FROM_CLASS (((GTypeInstance*) (instance))->g_class))
/**
 * G_TYPE_FROM_CLASS:
 * @g_class: Location of a valid #GTypeClass structure
 * 
 * Get the type identifier from a given @class structure.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: the #GType
 */
#define G_TYPE_FROM_CLASS(g_class)                              (((GTypeClass*) (g_class))->g_type)
/**
 * G_TYPE_FROM_INTERFACE:
 * @g_iface: Location of a valid #GTypeInterface structure
 * 
 * Get the type identifier from a given @interface structure.
 * 
 * This macro should only be used in type implementations.
 *
 * Returns: the #GType
 */
#define G_TYPE_FROM_INTERFACE(g_iface)                          (((GTypeInterface*) (g_iface))->g_type)

/**
 * G_TYPE_INSTANCE_GET_PRIVATE:
 * @instance: the instance of a type deriving from @private_type
 * @g_type: the type identifying which private data to retrieve
 * @c_type: The C type for the private structure
 * 
 * Gets the private structure for a particular type.
 * The private structure must have been registered in the
 * class_init function with g_type_class_add_private().
 * 
 * This macro should only be used in type implementations.
 * 
 * Since: 2.4
 * Deprecated: 2.58: Use %G_ADD_PRIVATE and the generated
 *   `your_type_get_instance_private()` function instead
 * Returns: (not nullable): a pointer to the private data structure
 */
#define G_TYPE_INSTANCE_GET_PRIVATE(instance, g_type, c_type)   ((c_type*) g_type_instance_get_private ((GTypeInstance*) (instance), (g_type)))

/**
 * G_TYPE_CLASS_GET_PRIVATE:
 * @klass: the class of a type deriving from @private_type
 * @g_type: the type identifying which private data to retrieve
 * @c_type: The C type for the private structure
 * 
 * Gets the private class structure for a particular type.
 * The private structure must have been registered in the
 * get_type() function with g_type_add_class_private().
 * 
 * This macro should only be used in type implementations.
 * 
 * Since: 2.24
 * Returns: (not nullable): a pointer to the private data structure
 */
#define G_TYPE_CLASS_GET_PRIVATE(klass, g_type, c_type)   ((c_type*) g_type_class_get_private ((GTypeClass*) (klass), (g_type)))

/**
 * GTypeDebugFlags:
 * @G_TYPE_DEBUG_NONE: Print no messages
 * @G_TYPE_DEBUG_OBJECTS: Print messages about object bookkeeping
 * @G_TYPE_DEBUG_SIGNALS: Print messages about signal emissions
 * @G_TYPE_DEBUG_MASK: Mask covering all debug flags
 * @G_TYPE_DEBUG_INSTANCE_COUNT: Keep a count of instances of each type
 *
 * These flags used to be passed to g_type_init_with_debug_flags() which
 * is now deprecated.
 *
 * If you need to enable debugging features, use the GOBJECT_DEBUG
 * environment variable.
 *
 * Deprecated: 2.36: g_type_init() is now done automatically
 */
typedef enum	/*< skip >*/
{
  G_TYPE_DEBUG_NONE	= 0,
  G_TYPE_DEBUG_OBJECTS	= 1 << 0,
  G_TYPE_DEBUG_SIGNALS	= 1 << 1,
  G_TYPE_DEBUG_INSTANCE_COUNT = 1 << 2,
  G_TYPE_DEBUG_MASK	= 0x07
} GTypeDebugFlags;


/* --- prototypes --- */
GLIB_DEPRECATED_IN_2_36
void                  g_type_init                    (void);
GLIB_DEPRECATED_IN_2_36
void                  g_type_init_with_debug_flags   (GTypeDebugFlags  debug_flags);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_type_name                    (GType            type);
GLIB_AVAILABLE_IN_ALL
GQuark                g_type_qname                   (GType            type);
GLIB_AVAILABLE_IN_ALL
GType                 g_type_from_name               (const gchar     *name);
GLIB_AVAILABLE_IN_ALL
GType                 g_type_parent                  (GType            type);
GLIB_AVAILABLE_IN_ALL
guint                 g_type_depth                   (GType            type);
GLIB_AVAILABLE_IN_ALL
GType                 g_type_next_base               (GType            leaf_type,
						      GType            root_type);
GLIB_AVAILABLE_IN_ALL
gboolean              g_type_is_a                    (GType            type,
						      GType            is_a_type);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_class_ref               (GType            type);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_class_peek              (GType            type);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_class_peek_static       (GType            type);
GLIB_AVAILABLE_IN_ALL
void                  g_type_class_unref             (gpointer         g_class);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_class_peek_parent       (gpointer         g_class);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_interface_peek          (gpointer         instance_class,
						      GType            iface_type);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_interface_peek_parent   (gpointer         g_iface);

GLIB_AVAILABLE_IN_ALL
gpointer              g_type_default_interface_ref   (GType            g_type);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_default_interface_peek  (GType            g_type);
GLIB_AVAILABLE_IN_ALL
void                  g_type_default_interface_unref (gpointer         g_iface);

/* g_free() the returned arrays */
GLIB_AVAILABLE_IN_ALL
GType*                g_type_children                (GType            type,
						      guint           *n_children);
GLIB_AVAILABLE_IN_ALL
GType*                g_type_interfaces              (GType            type,
						      guint           *n_interfaces);

/* per-type _static_ data */
GLIB_AVAILABLE_IN_ALL
void                  g_type_set_qdata               (GType            type,
						      GQuark           quark,
						      gpointer         data);
GLIB_AVAILABLE_IN_ALL
gpointer              g_type_get_qdata               (GType            type,
						      GQuark           quark);
GLIB_AVAILABLE_IN_ALL
void		      g_type_query		     (GType	       type,
						      GTypeQuery      *query);

GLIB_AVAILABLE_IN_2_44
int                   g_type_get_instance_count      (GType            type);

/* --- type registration --- */
/**
 * GBaseInitFunc:
 * @g_class: (type GObject.TypeClass): The #GTypeClass structure to initialize
 * 
 * A callback function used by the type system to do base initialization
 * of the class structures of derived types. It is called as part of the
 * initialization process of all derived classes and should reallocate
 * or reset all dynamic class members copied over from the parent class.
 * For example, class members (such as strings) that are not sufficiently
 * handled by a plain memory copy of the parent class into the derived class
 * have to be altered. See GClassInitFunc() for a discussion of the class
 * initialization process.
 */
typedef void   (*GBaseInitFunc)              (gpointer         g_class);
/**
 * GBaseFinalizeFunc:
 * @g_class: (type GObject.TypeClass): The #GTypeClass structure to finalize
 * 
 * A callback function used by the type system to finalize those portions
 * of a derived types class structure that were setup from the corresponding
 * GBaseInitFunc() function. Class finalization basically works the inverse
 * way in which class initialization is performed.
 * See GClassInitFunc() for a discussion of the class initialization process.
 */
typedef void   (*GBaseFinalizeFunc)          (gpointer         g_class);
/**
 * GClassInitFunc:
 * @g_class: (type GObject.TypeClass): The #GTypeClass structure to initialize.
 * @class_data: The @class_data member supplied via the #GTypeInfo structure.
 * 
 * A callback function used by the type system to initialize the class
 * of a specific type. This function should initialize all static class
 * members.
 *
 * The initialization process of a class involves:
 * 
 * - Copying common members from the parent class over to the
 *   derived class structure.
 * - Zero initialization of the remaining members not copied
 *   over from the parent class.
 * - Invocation of the GBaseInitFunc() initializers of all parent
 *   types and the class' type.
 * - Invocation of the class' GClassInitFunc() initializer.
 *
 * Since derived classes are partially initialized through a memory copy
 * of the parent class, the general rule is that GBaseInitFunc() and
 * GBaseFinalizeFunc() should take care of necessary reinitialization
 * and release of those class members that were introduced by the type
 * that specified these GBaseInitFunc()/GBaseFinalizeFunc().
 * GClassInitFunc() should only care about initializing static
 * class members, while dynamic class members (such as allocated strings
 * or reference counted resources) are better handled by a GBaseInitFunc()
 * for this type, so proper initialization of the dynamic class members
 * is performed for class initialization of derived types as well.
 *
 * An example may help to correspond the intend of the different class
 * initializers:
 * 
 * |[<!-- language="C" -->
 * typedef struct {
 *   GObjectClass parent_class;
 *   gint         static_integer;
 *   gchar       *dynamic_string;
 * } TypeAClass;
 * static void
 * type_a_base_class_init (TypeAClass *class)
 * {
 *   class->dynamic_string = g_strdup ("some string");
 * }
 * static void
 * type_a_base_class_finalize (TypeAClass *class)
 * {
 *   g_free (class->dynamic_string);
 * }
 * static void
 * type_a_class_init (TypeAClass *class)
 * {
 *   class->static_integer = 42;
 * }
 * 
 * typedef struct {
 *   TypeAClass   parent_class;
 *   gfloat       static_float;
 *   GString     *dynamic_gstring;
 * } TypeBClass;
 * static void
 * type_b_base_class_init (TypeBClass *class)
 * {
 *   class->dynamic_gstring = g_string_new ("some other string");
 * }
 * static void
 * type_b_base_class_finalize (TypeBClass *class)
 * {
 *   g_string_free (class->dynamic_gstring);
 * }
 * static void
 * type_b_class_init (TypeBClass *class)
 * {
 *   class->static_float = 3.14159265358979323846;
 * }
 * ]|
 * Initialization of TypeBClass will first cause initialization of
 * TypeAClass (derived classes reference their parent classes, see
 * g_type_class_ref() on this).
 *
 * Initialization of TypeAClass roughly involves zero-initializing its fields,
 * then calling its GBaseInitFunc() type_a_base_class_init() to allocate
 * its dynamic members (dynamic_string), and finally calling its GClassInitFunc()
 * type_a_class_init() to initialize its static members (static_integer).
 * The first step in the initialization process of TypeBClass is then
 * a plain memory copy of the contents of TypeAClass into TypeBClass and 
 * zero-initialization of the remaining fields in TypeBClass.
 * The dynamic members of TypeAClass within TypeBClass now need
 * reinitialization which is performed by calling type_a_base_class_init()
 * with an argument of TypeBClass.
 *
 * After that, the GBaseInitFunc() of TypeBClass, type_b_base_class_init()
 * is called to allocate the dynamic members of TypeBClass (dynamic_gstring),
 * and finally the GClassInitFunc() of TypeBClass, type_b_class_init(),
 * is called to complete the initialization process with the static members
 * (static_float).
 *
 * Corresponding finalization counter parts to the GBaseInitFunc() functions
 * have to be provided to release allocated resources at class finalization
 * time.
 */
typedef void   (*GClassInitFunc)             (gpointer         g_class,
					      gpointer         class_data);
/**
 * GClassFinalizeFunc:
 * @g_class: (type GObject.TypeClass): The #GTypeClass structure to finalize
 * @class_data: The @class_data member supplied via the #GTypeInfo structure
 * 
 * A callback function used by the type system to finalize a class.
 * This function is rarely needed, as dynamically allocated class resources
 * should be handled by GBaseInitFunc() and GBaseFinalizeFunc().
 * Also, specification of a GClassFinalizeFunc() in the #GTypeInfo
 * structure of a static type is invalid, because classes of static types
 * will never be finalized (they are artificially kept alive when their
 * reference count drops to zero).
 */
typedef void   (*GClassFinalizeFunc)         (gpointer         g_class,
					      gpointer         class_data);
/**
 * GInstanceInitFunc:
 * @instance: The instance to initialize
 * @g_class: (type GObject.TypeClass): The class of the type the instance is
 *    created for
 * 
 * A callback function used by the type system to initialize a new
 * instance of a type. This function initializes all instance members and
 * allocates any resources required by it.
 *
 * Initialization of a derived instance involves calling all its parent
 * types instance initializers, so the class member of the instance
 * is altered during its initialization to always point to the class that
 * belongs to the type the current initializer was introduced for.
 *
 * The extended members of @instance are guaranteed to have been filled with
 * zeros before this function is called.
 */
typedef void   (*GInstanceInitFunc)          (GTypeInstance   *instance,
					      gpointer         g_class);
/**
 * GInterfaceInitFunc:
 * @g_iface: (type GObject.TypeInterface): The interface structure to initialize
 * @iface_data: The @interface_data supplied via the #GInterfaceInfo structure
 * 
 * A callback function used by the type system to initialize a new
 * interface.  This function should initialize all internal data and
 * allocate any resources required by the interface.
 *
 * The members of @iface_data are guaranteed to have been filled with
 * zeros before this function is called.
 */
typedef void   (*GInterfaceInitFunc)         (gpointer         g_iface,
					      gpointer         iface_data);
/**
 * GInterfaceFinalizeFunc:
 * @g_iface: (type GObject.TypeInterface): The interface structure to finalize
 * @iface_data: The @interface_data supplied via the #GInterfaceInfo structure
 * 
 * A callback function used by the type system to finalize an interface.
 * This function should destroy any internal data and release any resources
 * allocated by the corresponding GInterfaceInitFunc() function.
 */
typedef void   (*GInterfaceFinalizeFunc)     (gpointer         g_iface,
					      gpointer         iface_data);
/**
 * GTypeClassCacheFunc:
 * @cache_data: data that was given to the g_type_add_class_cache_func() call
 * @g_class: (type GObject.TypeClass): The #GTypeClass structure which is
 *    unreferenced
 * 
 * A callback function which is called when the reference count of a class 
 * drops to zero. It may use g_type_class_ref() to prevent the class from
 * being freed. You should not call g_type_class_unref() from a 
 * #GTypeClassCacheFunc function to prevent infinite recursion, use 
 * g_type_class_unref_uncached() instead.
 * 
 * The functions have to check the class id passed in to figure 
 * whether they actually want to cache the class of this type, since all
 * classes are routed through the same #GTypeClassCacheFunc chain.
 * 
 * Returns: %TRUE to stop further #GTypeClassCacheFuncs from being 
 *  called, %FALSE to continue
 */
typedef gboolean (*GTypeClassCacheFunc)	     (gpointer	       cache_data,
					      GTypeClass      *g_class);
/**
 * GTypeInterfaceCheckFunc:
 * @check_data: data passed to g_type_add_interface_check()
 * @g_iface: (type GObject.TypeInterface): the interface that has been
 *    initialized
 * 
 * A callback called after an interface vtable is initialized.
 * See g_type_add_interface_check().
 * 
 * Since: 2.4
 */
typedef void     (*GTypeInterfaceCheckFunc)  (gpointer	       check_data,
					      gpointer         g_iface);
/**
 * GTypeFundamentalFlags:
 * @G_TYPE_FLAG_CLASSED: Indicates a classed type
 * @G_TYPE_FLAG_INSTANTIATABLE: Indicates an instantiable type (implies classed)
 * @G_TYPE_FLAG_DERIVABLE: Indicates a flat derivable type
 * @G_TYPE_FLAG_DEEP_DERIVABLE: Indicates a deep derivable type (implies derivable)
 * 
 * Bit masks used to check or determine specific characteristics of a
 * fundamental type.
 */
typedef enum    /*< skip >*/
{
  G_TYPE_FLAG_CLASSED           = (1 << 0),
  G_TYPE_FLAG_INSTANTIATABLE    = (1 << 1),
  G_TYPE_FLAG_DERIVABLE         = (1 << 2),
  G_TYPE_FLAG_DEEP_DERIVABLE    = (1 << 3)
} GTypeFundamentalFlags;
/**
 * GTypeFlags:
 * @G_TYPE_FLAG_ABSTRACT: Indicates an abstract type. No instances can be
 *  created for an abstract type
 * @G_TYPE_FLAG_VALUE_ABSTRACT: Indicates an abstract value type, i.e. a type
 *  that introduces a value table, but can't be used for
 *  g_value_init()
 * 
 * Bit masks used to check or determine characteristics of a type.
 */
typedef enum    /*< skip >*/
{
  G_TYPE_FLAG_ABSTRACT		= (1 << 4),
  G_TYPE_FLAG_VALUE_ABSTRACT	= (1 << 5)
} GTypeFlags;
/**
 * GTypeInfo:
 * @class_size: Size of the class structure (required for interface, classed and instantiatable types)
 * @base_init: Location of the base initialization function (optional)
 * @base_finalize: Location of the base finalization function (optional)
 * @class_init: Location of the class initialization function for
 *  classed and instantiatable types. Location of the default vtable 
 *  inititalization function for interface types. (optional) This function 
 *  is used both to fill in virtual functions in the class or default vtable, 
 *  and to do type-specific setup such as registering signals and object
 *  properties.
 * @class_finalize: Location of the class finalization function for
 *  classed and instantiatable types. Location of the default vtable
 *  finalization function for interface types. (optional)
 * @class_data: User-supplied data passed to the class init/finalize functions
 * @instance_size: Size of the instance (object) structure (required for instantiatable types only)
 * @n_preallocs: Prior to GLib 2.10, it specified the number of pre-allocated (cached) instances to reserve memory for (0 indicates no caching). Since GLib 2.10, it is ignored, since instances are allocated with the [slice allocator][glib-Memory-Slices] now.
 * @instance_init: Location of the instance initialization function (optional, for instantiatable types only)
 * @value_table: A #GTypeValueTable function table for generic handling of GValues
 *  of this type (usually only useful for fundamental types)
 * 
 * This structure is used to provide the type system with the information
 * required to initialize and destruct (finalize) a type's class and
 * its instances.
 *
 * The initialized structure is passed to the g_type_register_static() function
 * (or is copied into the provided #GTypeInfo structure in the
 * g_type_plugin_complete_type_info()). The type system will perform a deep
 * copy of this structure, so its memory does not need to be persistent
 * across invocation of g_type_register_static().
 */
struct _GTypeInfo
{
  /* interface types, classed types, instantiated types */
  guint16                class_size;
  
  GBaseInitFunc          base_init;
  GBaseFinalizeFunc      base_finalize;
  
  /* interface types, classed types, instantiated types */
  GClassInitFunc         class_init;
  GClassFinalizeFunc     class_finalize;
  gconstpointer          class_data;
  
  /* instantiated types */
  guint16                instance_size;
  guint16                n_preallocs;
  GInstanceInitFunc      instance_init;
  
  /* value handling */
  const GTypeValueTable	*value_table;
};
/**
 * GTypeFundamentalInfo:
 * @type_flags: #GTypeFundamentalFlags describing the characteristics of the fundamental type
 * 
 * A structure that provides information to the type system which is
 * used specifically for managing fundamental types.  
 */
struct _GTypeFundamentalInfo
{
  GTypeFundamentalFlags  type_flags;
};
/**
 * GInterfaceInfo:
 * @interface_init: location of the interface initialization function
 * @interface_finalize: location of the interface finalization function
 * @interface_data: user-supplied data passed to the interface init/finalize functions
 * 
 * A structure that provides information to the type system which is
 * used specifically for managing interface types.
 */
struct _GInterfaceInfo
{
  GInterfaceInitFunc     interface_init;
  GInterfaceFinalizeFunc interface_finalize;
  gpointer               interface_data;
};
/**
 * GTypeValueTable:
 * @value_init: Default initialize @values contents by poking values
 *  directly into the value->data array. The data array of
 *  the #GValue passed into this function was zero-filled
 *  with `memset()`, so no care has to be taken to free any
 *  old contents. E.g. for the implementation of a string
 *  value that may never be %NULL, the implementation might
 *  look like:
 *  |[<!-- language="C" -->
 *  value->data[0].v_pointer = g_strdup ("");
 *  ]|
 * @value_free: Free any old contents that might be left in the
 *  data array of the passed in @value. No resources may
 *  remain allocated through the #GValue contents after
 *  this function returns. E.g. for our above string type:
 *  |[<!-- language="C" -->
 *  // only free strings without a specific flag for static storage
 *  if (!(value->data[1].v_uint & G_VALUE_NOCOPY_CONTENTS))
 *    g_free (value->data[0].v_pointer);
 *  ]|
 * @value_copy: @dest_value is a #GValue with zero-filled data section
 *  and @src_value is a properly setup #GValue of same or
 *  derived type.
 *  The purpose of this function is to copy the contents of
 *  @src_value into @dest_value in a way, that even after
 *  @src_value has been freed, the contents of @dest_value
 *  remain valid. String type example:
 *  |[<!-- language="C" -->
 *  dest_value->data[0].v_pointer = g_strdup (src_value->data[0].v_pointer);
 *  ]|
 * @value_peek_pointer: If the value contents fit into a pointer, such as objects
 *  or strings, return this pointer, so the caller can peek at
 *  the current contents. To extend on our above string example:
 *  |[<!-- language="C" -->
 *  return value->data[0].v_pointer;
 *  ]|
 * @collect_format: A string format describing how to collect the contents of
 *  this value bit-by-bit. Each character in the format represents
 *  an argument to be collected, and the characters themselves indicate
 *  the type of the argument. Currently supported arguments are:
 *  - 'i' - Integers. passed as collect_values[].v_int.
 *  - 'l' - Longs. passed as collect_values[].v_long.
 *  - 'd' - Doubles. passed as collect_values[].v_double.
 *  - 'p' - Pointers. passed as collect_values[].v_pointer.
 *  It should be noted that for variable argument list construction,
 *  ANSI C promotes every type smaller than an integer to an int, and
 *  floats to doubles. So for collection of short int or char, 'i'
 *  needs to be used, and for collection of floats 'd'.
 * @collect_value: The collect_value() function is responsible for converting the
 *  values collected from a variable argument list into contents
 *  suitable for storage in a GValue. This function should setup
 *  @value similar to value_init(); e.g. for a string value that
 *  does not allow %NULL pointers, it needs to either spew an error,
 *  or do an implicit conversion by storing an empty string.
 *  The @value passed in to this function has a zero-filled data
 *  array, so just like for value_init() it is guaranteed to not
 *  contain any old contents that might need freeing.
 *  @n_collect_values is exactly the string length of @collect_format,
 *  and @collect_values is an array of unions #GTypeCValue with
 *  length @n_collect_values, containing the collected values
 *  according to @collect_format.
 *  @collect_flags is an argument provided as a hint by the caller.
 *  It may contain the flag %G_VALUE_NOCOPY_CONTENTS indicating,
 *  that the collected value contents may be considered "static"
 *  for the duration of the @value lifetime.
 *  Thus an extra copy of the contents stored in @collect_values is
 *  not required for assignment to @value.
 *  For our above string example, we continue with:
 *  |[<!-- language="C" -->
 *  if (!collect_values[0].v_pointer)
 *    value->data[0].v_pointer = g_strdup ("");
 *  else if (collect_flags & G_VALUE_NOCOPY_CONTENTS)
 *  {
 *    value->data[0].v_pointer = collect_values[0].v_pointer;
 *    // keep a flag for the value_free() implementation to not free this string
 *    value->data[1].v_uint = G_VALUE_NOCOPY_CONTENTS;
 *  }
 *  else
 *    value->data[0].v_pointer = g_strdup (collect_values[0].v_pointer);
 *  return NULL;
 *  ]|
 *  It should be noted, that it is generally a bad idea to follow the
 *  #G_VALUE_NOCOPY_CONTENTS hint for reference counted types. Due to
 *  reentrancy requirements and reference count assertions performed
 *  by the signal emission code, reference counts should always be
 *  incremented for reference counted contents stored in the value->data
 *  array.  To deviate from our string example for a moment, and taking
 *  a look at an exemplary implementation for collect_value() of
 *  #GObject:
 *  |[<!-- language="C" -->
 *  if (collect_values[0].v_pointer)
 *  {
 *    GObject *object = G_OBJECT (collect_values[0].v_pointer);
 *    // never honour G_VALUE_NOCOPY_CONTENTS for ref-counted types
 *    value->data[0].v_pointer = g_object_ref (object);
 *    return NULL;
 *  }
 *  else
 *    return g_strdup_printf ("Object passed as invalid NULL pointer");
 *  }
 *  ]|
 *  The reference count for valid objects is always incremented,
 *  regardless of @collect_flags. For invalid objects, the example
 *  returns a newly allocated string without altering @value.
 *  Upon success, collect_value() needs to return %NULL. If, however,
 *  an error condition occurred, collect_value() may spew an
 *  error by returning a newly allocated non-%NULL string, giving
 *  a suitable description of the error condition.
 *  The calling code makes no assumptions about the @value
 *  contents being valid upon error returns, @value
 *  is simply thrown away without further freeing. As such, it is
 *  a good idea to not allocate #GValue contents, prior to returning
 *  an error, however, collect_values() is not obliged to return
 *  a correctly setup @value for error returns, simply because
 *  any non-%NULL return is considered a fatal condition so further
 *  program behaviour is undefined.
 * @lcopy_format: Format description of the arguments to collect for @lcopy_value,
 *  analogous to @collect_format. Usually, @lcopy_format string consists
 *  only of 'p's to provide lcopy_value() with pointers to storage locations.
 * @lcopy_value: This function is responsible for storing the @value contents into
 *  arguments passed through a variable argument list which got
 *  collected into @collect_values according to @lcopy_format.
 *  @n_collect_values equals the string length of @lcopy_format,
 *  and @collect_flags may contain %G_VALUE_NOCOPY_CONTENTS.
 *  In contrast to collect_value(), lcopy_value() is obliged to
 *  always properly support %G_VALUE_NOCOPY_CONTENTS.
 *  Similar to collect_value() the function may prematurely abort
 *  by returning a newly allocated string describing an error condition.
 *  To complete the string example:
 *  |[<!-- language="C" -->
 *  gchar **string_p = collect_values[0].v_pointer;
 *  if (!string_p)
 *    return g_strdup_printf ("string location passed as NULL");
 *  if (collect_flags & G_VALUE_NOCOPY_CONTENTS)
 *    *string_p = value->data[0].v_pointer;
 *  else
 *    *string_p = g_strdup (value->data[0].v_pointer);
 *  ]|
 *  And an illustrative version of lcopy_value() for
 *  reference-counted types:
 *  |[<!-- language="C" -->
 *  GObject **object_p = collect_values[0].v_pointer;
 *  if (!object_p)
 *    return g_strdup_printf ("object location passed as NULL");
 *  if (!value->data[0].v_pointer)
 *    *object_p = NULL;
 *  else if (collect_flags & G_VALUE_NOCOPY_CONTENTS) // always honour
 *    *object_p = value->data[0].v_pointer;
 *  else
 *    *object_p = g_object_ref (value->data[0].v_pointer);
 *  return NULL;
 *  ]|
 * 
 * The #GTypeValueTable provides the functions required by the #GValue
 * implementation, to serve as a container for values of a type.
 */

struct _GTypeValueTable
{
  void     (*value_init)         (GValue       *value);
  void     (*value_free)         (GValue       *value);
  void     (*value_copy)         (const GValue *src_value,
				  GValue       *dest_value);
  /* varargs functionality (optional) */
  gpointer (*value_peek_pointer) (const GValue *value);
  const gchar *collect_format;
  gchar*   (*collect_value)      (GValue       *value,
				  guint         n_collect_values,
				  GTypeCValue  *collect_values,
				  guint		collect_flags);
  const gchar *lcopy_format;
  gchar*   (*lcopy_value)        (const GValue *value,
				  guint         n_collect_values,
				  GTypeCValue  *collect_values,
				  guint		collect_flags);
};
GLIB_AVAILABLE_IN_ALL
GType g_type_register_static		(GType			     parent_type,
					 const gchar		    *type_name,
					 const GTypeInfo	    *info,
					 GTypeFlags		     flags);
GLIB_AVAILABLE_IN_ALL
GType g_type_register_static_simple     (GType                       parent_type,
					 const gchar                *type_name,
					 guint                       class_size,
					 GClassInitFunc              class_init,
					 guint                       instance_size,
					 GInstanceInitFunc           instance_init,
					 GTypeFlags	             flags);
  
GLIB_AVAILABLE_IN_ALL
GType g_type_register_dynamic		(GType			     parent_type,
					 const gchar		    *type_name,
					 GTypePlugin		    *plugin,
					 GTypeFlags		     flags);
GLIB_AVAILABLE_IN_ALL
GType g_type_register_fundamental	(GType			     type_id,
					 const gchar		    *type_name,
					 const GTypeInfo	    *info,
					 const GTypeFundamentalInfo *finfo,
					 GTypeFlags		     flags);
GLIB_AVAILABLE_IN_ALL
void  g_type_add_interface_static	(GType			     instance_type,
					 GType			     interface_type,
					 const GInterfaceInfo	    *info);
GLIB_AVAILABLE_IN_ALL
void  g_type_add_interface_dynamic	(GType			     instance_type,
					 GType			     interface_type,
					 GTypePlugin		    *plugin);
GLIB_AVAILABLE_IN_ALL
void  g_type_interface_add_prerequisite (GType			     interface_type,
					 GType			     prerequisite_type);
GLIB_AVAILABLE_IN_ALL
GType*g_type_interface_prerequisites    (GType                       interface_type,
					 guint                      *n_prerequisites);
GLIB_DEPRECATED_IN_2_58
void     g_type_class_add_private       (gpointer                    g_class,
                                         gsize                       private_size);
GLIB_AVAILABLE_IN_2_38
gint     g_type_add_instance_private    (GType                       class_type,
                                         gsize                       private_size);
GLIB_AVAILABLE_IN_ALL
gpointer g_type_instance_get_private    (GTypeInstance              *instance,
                                         GType                       private_type);
GLIB_AVAILABLE_IN_2_38
void     g_type_class_adjust_private_offset (gpointer                g_class,
                                             gint                   *private_size_or_offset);

GLIB_AVAILABLE_IN_ALL
void      g_type_add_class_private      (GType    		     class_type,
					 gsize    		     private_size);
GLIB_AVAILABLE_IN_ALL
gpointer  g_type_class_get_private      (GTypeClass 		    *klass,
					 GType			     private_type);
GLIB_AVAILABLE_IN_2_38
gint      g_type_class_get_instance_private_offset (gpointer         g_class);

GLIB_AVAILABLE_IN_2_34
void      g_type_ensure                 (GType                       type);
GLIB_AVAILABLE_IN_2_36
guint     g_type_get_type_registration_serial (void);


/* --- GType boilerplate --- */
/**
 * G_DECLARE_FINAL_TYPE:
 * @ModuleObjName: The name of the new type, in camel case (like GtkWidget)
 * @module_obj_name: The name of the new type in lowercase, with words
 *  separated by '_' (like 'gtk_widget')
 * @MODULE: The name of the module, in all caps (like 'GTK')
 * @OBJ_NAME: The bare name of the type, in all caps (like 'WIDGET')
 * @ParentName: the name of the parent type, in camel case (like GtkWidget)
 *
 * A convenience macro for emitting the usual declarations in the header file for a type which is not (at the
 * present time) intended to be subclassed.
 *
 * You might use it in a header as follows:
 *
 * |[
 * #ifndef _myapp_window_h_
 * #define _myapp_window_h_
 *
 * #include <gtk/gtk.h>
 *
 * #define MY_APP_TYPE_WINDOW my_app_window_get_type ()
 * G_DECLARE_FINAL_TYPE (MyAppWindow, my_app_window, MY_APP, WINDOW, GtkWindow)
 *
 * MyAppWindow *    my_app_window_new    (void);
 *
 * ...
 *
 * #endif
 * ]|
 *
 * This results in the following things happening:
 *
 * - the usual my_app_window_get_type() function is declared with a return type of #GType
 *
 * - the MyAppWindow types is defined as a typedef of struct _MyAppWindow.  The struct itself is not
 *   defined and should be defined from the .c file before G_DEFINE_TYPE() is used.
 *
 * - the MY_APP_WINDOW() cast is emitted as static inline function along with the MY_APP_IS_WINDOW() type
 *   checking function
 *
 * - the MyAppWindowClass type is defined as a struct containing GtkWindowClass.  This is done for the
 *   convenience of the person defining the type and should not be considered to be part of the ABI.  In
 *   particular, without a firm declaration of the instance structure, it is not possible to subclass the type
 *   and therefore the fact that the size of the class structure is exposed is not a concern and it can be
 *   freely changed at any point in the future.
 *
 * - g_autoptr() support being added for your type, based on the type of your parent class
 *
 * You can only use this function if your parent type also supports g_autoptr().
 *
 * Because the type macro (MY_APP_TYPE_WINDOW in the above example) is not a callable, you must continue to
 * manually define this as a macro for yourself.
 *
 * The declaration of the _get_type() function is the first thing emitted by the macro.  This allows this macro
 * to be used in the usual way with export control and API versioning macros.
 *
 * If you want to declare your own class structure, use G_DECLARE_DERIVABLE_TYPE().
 *
 * If you are writing a library, it is important to note that it is possible to convert a type from using
 * G_DECLARE_FINAL_TYPE() to G_DECLARE_DERIVABLE_TYPE() without breaking API or ABI.  As a precaution, you
 * should therefore use G_DECLARE_FINAL_TYPE() until you are sure that it makes sense for your class to be
 * subclassed.  Once a class structure has been exposed it is not possible to change its size or remove or
 * reorder items without breaking the API and/or ABI.
 *
 * Since: 2.44
 **/
#define G_DECLARE_FINAL_TYPE(ModuleObjName, module_obj_name, MODULE, OBJ_NAME, ParentName) \
  GType module_obj_name##_get_type (void);                                                               \
  G_GNUC_BEGIN_IGNORE_DEPRECATIONS                                                                       \
  typedef struct _##ModuleObjName ModuleObjName;                                                         \
  typedef struct { ParentName##Class parent_class; } ModuleObjName##Class;                               \
                                                                                                         \
  _GLIB_DEFINE_AUTOPTR_CHAINUP (ModuleObjName, ParentName)                                               \
                                                                                                         \
  static inline ModuleObjName * MODULE##_##OBJ_NAME (gpointer ptr) {                                     \
    return G_TYPE_CHECK_INSTANCE_CAST (ptr, module_obj_name##_get_type (), ModuleObjName); }             \
  static inline gboolean MODULE##_IS_##OBJ_NAME (gpointer ptr) {                                         \
    return G_TYPE_CHECK_INSTANCE_TYPE (ptr, module_obj_name##_get_type ()); }                            \
  G_GNUC_END_IGNORE_DEPRECATIONS

/**
 * G_DECLARE_DERIVABLE_TYPE:
 * @ModuleObjName: The name of the new type, in camel case (like GtkWidget)
 * @module_obj_name: The name of the new type in lowercase, with words
 *  separated by '_' (like 'gtk_widget')
 * @MODULE: The name of the module, in all caps (like 'GTK')
 * @OBJ_NAME: The bare name of the type, in all caps (like 'WIDGET')
 * @ParentName: the name of the parent type, in camel case (like GtkWidget)
 *
 * A convenience macro for emitting the usual declarations in the header file for a type which will is intended
 * to be subclassed.
 *
 * You might use it in a header as follows:
 *
 * |[
 * #ifndef _gtk_frobber_h_
 * #define _gtk_frobber_h_
 *
 * #define GTK_TYPE_FROBBER gtk_frobber_get_type ()
 * GDK_AVAILABLE_IN_3_12
 * G_DECLARE_DERIVABLE_TYPE (GtkFrobber, gtk_frobber, GTK, FROBBER, GtkWidget)
 *
 * struct _GtkFrobberClass
 * {
 *   GtkWidgetClass parent_class;
 *
 *   void (* handle_frob)  (GtkFrobber *frobber,
 *                          guint       n_frobs);
 *
 *   gpointer padding[12];
 * };
 *
 * GtkWidget *    gtk_frobber_new   (void);
 *
 * ...
 *
 * #endif
 * ]|
 *
 * This results in the following things happening:
 *
 * - the usual gtk_frobber_get_type() function is declared with a return type of #GType
 *
 * - the GtkFrobber struct is created with GtkWidget as the first and only item.  You are expected to use
 *   a private structure from your .c file to store your instance variables.
 *
 * - the GtkFrobberClass type is defined as a typedef to struct _GtkFrobberClass, which is left undefined.
 *   You should do this from the header file directly after you use the macro.
 *
 * - the GTK_FROBBER() and GTK_FROBBER_CLASS() casts are emitted as static inline functions along with
 *   the GTK_IS_FROBBER() and GTK_IS_FROBBER_CLASS() type checking functions and GTK_FROBBER_GET_CLASS()
 *   function.
 *
 * - g_autoptr() support being added for your type, based on the type of your parent class
 *
 * You can only use this function if your parent type also supports g_autoptr().
 *
 * Because the type macro (GTK_TYPE_FROBBER in the above example) is not a callable, you must continue to
 * manually define this as a macro for yourself.
 *
 * The declaration of the _get_type() function is the first thing emitted by the macro.  This allows this macro
 * to be used in the usual way with export control and API versioning macros.
 *
 * If you are writing a library, it is important to note that it is possible to convert a type from using
 * G_DECLARE_FINAL_TYPE() to G_DECLARE_DERIVABLE_TYPE() without breaking API or ABI.  As a precaution, you
 * should therefore use G_DECLARE_FINAL_TYPE() until you are sure that it makes sense for your class to be
 * subclassed.  Once a class structure has been exposed it is not possible to change its size or remove or
 * reorder items without breaking the API and/or ABI.  If you want to declare your own class structure, use
 * G_DECLARE_DERIVABLE_TYPE().  If you want to declare a class without exposing the class or instance
 * structures, use G_DECLARE_FINAL_TYPE().
 *
 * If you must use G_DECLARE_DERIVABLE_TYPE() you should be sure to include some padding at the bottom of your
 * class structure to leave space for the addition of future virtual functions.
 *
 * Since: 2.44
 **/
#define G_DECLARE_DERIVABLE_TYPE(ModuleObjName, module_obj_name, MODULE, OBJ_NAME, ParentName) \
  GType module_obj_name##_get_type (void);                                                               \
  G_GNUC_BEGIN_IGNORE_DEPRECATIONS                                                                       \
  typedef struct _##ModuleObjName ModuleObjName;                                                         \
  typedef struct _##ModuleObjName##Class ModuleObjName##Class;                                           \
  struct _##ModuleObjName { ParentName parent_instance; };                                               \
                                                                                                         \
  _GLIB_DEFINE_AUTOPTR_CHAINUP (ModuleObjName, ParentName)                                               \
                                                                                                         \
  static inline ModuleObjName * MODULE##_##OBJ_NAME (gpointer ptr) {                                     \
    return G_TYPE_CHECK_INSTANCE_CAST (ptr, module_obj_name##_get_type (), ModuleObjName); }             \
  static inline ModuleObjName##Class * MODULE##_##OBJ_NAME##_CLASS (gpointer ptr) {                      \
    return G_TYPE_CHECK_CLASS_CAST (ptr, module_obj_name##_get_type (), ModuleObjName##Class); }         \
  static inline gboolean MODULE##_IS_##OBJ_NAME (gpointer ptr) {                                         \
    return G_TYPE_CHECK_INSTANCE_TYPE (ptr, module_obj_name##_get_type ()); }                            \
  static inline gboolean MODULE##_IS_##OBJ_NAME##_CLASS (gpointer ptr) {                                 \
    return G_TYPE_CHECK_CLASS_TYPE (ptr, module_obj_name##_get_type ()); }                               \
  static inline ModuleObjName##Class * MODULE##_##OBJ_NAME##_GET_CLASS (gpointer ptr) {                  \
    return G_TYPE_INSTANCE_GET_CLASS (ptr, module_obj_name##_get_type (), ModuleObjName##Class); }       \
  G_GNUC_END_IGNORE_DEPRECATIONS

/**
 * G_DECLARE_INTERFACE:
 * @ModuleObjName: The name of the new type, in camel case (like GtkWidget)
 * @module_obj_name: The name of the new type in lowercase, with words
 *  separated by '_' (like 'gtk_widget')
 * @MODULE: The name of the module, in all caps (like 'GTK')
 * @OBJ_NAME: The bare name of the type, in all caps (like 'WIDGET')
 * @PrerequisiteName: the name of the prerequisite type, in camel case (like GtkWidget)
 *
 * A convenience macro for emitting the usual declarations in the header file for a GInterface type.
 *
 * You might use it in a header as follows:
 *
 * |[
 * #ifndef _my_model_h_
 * #define _my_model_h_
 *
 * #define MY_TYPE_MODEL my_model_get_type ()
 * GDK_AVAILABLE_IN_3_12
 * G_DECLARE_INTERFACE (MyModel, my_model, MY, MODEL, GObject)
 *
 * struct _MyModelInterface
 * {
 *   GTypeInterface g_iface;
 *
 *   gpointer (* get_item)  (MyModel *model);
 * };
 *
 * gpointer my_model_get_item (MyModel *model);
 *
 * ...
 *
 * #endif
 * ]|
 *
 * This results in the following things happening:
 *
 * - the usual my_model_get_type() function is declared with a return type of #GType
 *
 * - the MyModelInterface type is defined as a typedef to struct _MyModelInterface,
 *   which is left undefined. You should do this from the header file directly after
 *   you use the macro.
 *
 * - the MY_MODEL() cast is emitted as static inline functions along with
 *   the MY_IS_MODEL() type checking function and MY_MODEL_GET_IFACE() function.
 *
 * - g_autoptr() support being added for your type, based on your prerequisite type.
 *
 * You can only use this function if your prerequisite type also supports g_autoptr().
 *
 * Because the type macro (MY_TYPE_MODEL in the above example) is not a callable, you must continue to
 * manually define this as a macro for yourself.
 *
 * The declaration of the _get_type() function is the first thing emitted by the macro.  This allows this macro
 * to be used in the usual way with export control and API versioning macros.
 *
 * Since: 2.44
 **/
#define G_DECLARE_INTERFACE(ModuleObjName, module_obj_name, MODULE, OBJ_NAME, PrerequisiteName) \
  GType module_obj_name##_get_type (void);                                                                 \
  G_GNUC_BEGIN_IGNORE_DEPRECATIONS                                                                         \
  typedef struct _##ModuleObjName ModuleObjName;                                                           \
  typedef struct _##ModuleObjName##Interface ModuleObjName##Interface;                                     \
                                                                                                           \
  _GLIB_DEFINE_AUTOPTR_CHAINUP (ModuleObjName, PrerequisiteName)                                           \
                                                                                                           \
  static inline ModuleObjName * MODULE##_##OBJ_NAME (gpointer ptr) {                                       \
    return G_TYPE_CHECK_INSTANCE_CAST (ptr, module_obj_name##_get_type (), ModuleObjName); }               \
  static inline gboolean MODULE##_IS_##OBJ_NAME (gpointer ptr) {                                           \
    return G_TYPE_CHECK_INSTANCE_TYPE (ptr, module_obj_name##_get_type ()); }                              \
  static inline ModuleObjName##Interface * MODULE##_##OBJ_NAME##_GET_IFACE (gpointer ptr) {                \
    return G_TYPE_INSTANCE_GET_INTERFACE (ptr, module_obj_name##_get_type (), ModuleObjName##Interface); } \
  G_GNUC_END_IGNORE_DEPRECATIONS

/**
 * G_DEFINE_TYPE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words 
 *  separated by '_'.
 * @T_P: The #GType of the parent type.
 * 
 * A convenience macro for type implementations, which declares a class
 * initialization function, an instance initialization function (see #GTypeInfo
 * for information about these) and a static variable named `t_n_parent_class`
 * pointing to the parent class. Furthermore, it defines  a *_get_type() function.
 * See G_DEFINE_TYPE_EXTENDED() for an example.
 * 
 * Since: 2.4
 */
#define G_DEFINE_TYPE(TN, t_n, T_P)			    G_DEFINE_TYPE_EXTENDED (TN, t_n, T_P, 0, {})
/**
 * G_DEFINE_TYPE_WITH_CODE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type in lowercase, with words separated by '_'.
 * @T_P: The #GType of the parent type.
 * @_C_: Custom code that gets inserted in the *_get_type() function.
 * 
 * A convenience macro for type implementations.  
 * Similar to G_DEFINE_TYPE(), but allows you to insert custom code into the 
 * *_get_type() function, e.g. interface implementations via G_IMPLEMENT_INTERFACE().
 * See G_DEFINE_TYPE_EXTENDED() for an example.
 * 
 * Since: 2.4
 */
#define G_DEFINE_TYPE_WITH_CODE(TN, t_n, T_P, _C_)	    _G_DEFINE_TYPE_EXTENDED_BEGIN (TN, t_n, T_P, 0) {_C_;} _G_DEFINE_TYPE_EXTENDED_END()
/**
 * G_DEFINE_TYPE_WITH_PRIVATE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words 
 *  separated by '_'.
 * @T_P: The #GType of the parent type.
 * 
 * A convenience macro for type implementations, which declares a class
 * initialization function, an instance initialization function (see #GTypeInfo
 * for information about these), a static variable named `t_n_parent_class`
 * pointing to the parent class, and adds private instance data to the type.
 * Furthermore, it defines a *_get_type() function. See G_DEFINE_TYPE_EXTENDED()
 * for an example.
 * 
 * Note that private structs added with this macros must have a struct
 * name of the form @TN Private.
 *
 * Since: 2.38
 */
#define G_DEFINE_TYPE_WITH_PRIVATE(TN, t_n, T_P)            G_DEFINE_TYPE_EXTENDED (TN, t_n, T_P, 0, G_ADD_PRIVATE (TN))
/**
 * G_DEFINE_ABSTRACT_TYPE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words 
 *  separated by '_'.
 * @T_P: The #GType of the parent type.
 * 
 * A convenience macro for type implementations. 
 * Similar to G_DEFINE_TYPE(), but defines an abstract type. 
 * See G_DEFINE_TYPE_EXTENDED() for an example.
 * 
 * Since: 2.4
 */
#define G_DEFINE_ABSTRACT_TYPE(TN, t_n, T_P)		    G_DEFINE_TYPE_EXTENDED (TN, t_n, T_P, G_TYPE_FLAG_ABSTRACT, {})
/**
 * G_DEFINE_ABSTRACT_TYPE_WITH_CODE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words 
 *  separated by '_'.
 * @T_P: The #GType of the parent type.
 * @_C_: Custom code that gets inserted in the @type_name_get_type() function.
 * 
 * A convenience macro for type implementations.
 * Similar to G_DEFINE_TYPE_WITH_CODE(), but defines an abstract type and
 * allows you to insert custom code into the *_get_type() function, e.g.
 * interface implementations  via G_IMPLEMENT_INTERFACE().
 * See G_DEFINE_TYPE_EXTENDED() for an example.
 * 
 * Since: 2.4
 */
#define G_DEFINE_ABSTRACT_TYPE_WITH_CODE(TN, t_n, T_P, _C_) _G_DEFINE_TYPE_EXTENDED_BEGIN (TN, t_n, T_P, G_TYPE_FLAG_ABSTRACT) {_C_;} _G_DEFINE_TYPE_EXTENDED_END()
/**
 * G_DEFINE_ABSTRACT_TYPE_WITH_PRIVATE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words 
 *  separated by '_'.
 * @T_P: The #GType of the parent type.
 *
 * Similar to G_DEFINE_TYPE_WITH_PRIVATE(), but defines an abstract type. 
 * See G_DEFINE_TYPE_EXTENDED() for an example.
 * 
 * Since: 2.38
 */
#define G_DEFINE_ABSTRACT_TYPE_WITH_PRIVATE(TN, t_n, T_P)   G_DEFINE_TYPE_EXTENDED (TN, t_n, T_P, G_TYPE_FLAG_ABSTRACT, G_ADD_PRIVATE (TN))
/**
 * G_DEFINE_TYPE_EXTENDED:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words
 *    separated by '_'.
 * @T_P: The #GType of the parent type.
 * @_f_: #GTypeFlags to pass to g_type_register_static()
 * @_C_: Custom code that gets inserted in the *_get_type() function.
 *
 * The most general convenience macro for type implementations, on which
 * G_DEFINE_TYPE(), etc are based.
 *
 * |[<!-- language="C" -->
 * G_DEFINE_TYPE_EXTENDED (GtkGadget,
 *                         gtk_gadget,
 *                         GTK_TYPE_WIDGET,
 *                         0,
 *                         G_IMPLEMENT_INTERFACE (TYPE_GIZMO,
 *                                                gtk_gadget_gizmo_init));
 * ]|
 * expands to
 * |[<!-- language="C" -->
 * static void     gtk_gadget_init       (GtkGadget      *self);
 * static void     gtk_gadget_class_init (GtkGadgetClass *klass);
 * static gpointer gtk_gadget_parent_class = NULL;
 * static void     gtk_gadget_class_intern_init (gpointer klass)
 * {
 *   gtk_gadget_parent_class = g_type_class_peek_parent (klass);
 *   gtk_gadget_class_init ((GtkGadgetClass*) klass);
 * }
 *
 * GType
 * gtk_gadget_get_type (void)
 * {
 *   static volatile gsize g_define_type_id__volatile = 0;
 *   if (g_once_init_enter (&g_define_type_id__volatile))
 *     {
 *       GType g_define_type_id =
 *         g_type_register_static_simple (GTK_TYPE_WIDGET,
 *                                        g_intern_static_string ("GtkGadget"),
 *                                        sizeof (GtkGadgetClass),
 *                                        (GClassInitFunc) gtk_gadget_class_intern_init,
 *                                        sizeof (GtkGadget),
 *                                        (GInstanceInitFunc) gtk_gadget_init,
 *                                        0);
 *       {
 *         const GInterfaceInfo g_implement_interface_info = {
 *           (GInterfaceInitFunc) gtk_gadget_gizmo_init
 *         };
 *         g_type_add_interface_static (g_define_type_id, TYPE_GIZMO, &g_implement_interface_info);
 *       }
 *       g_once_init_leave (&g_define_type_id__volatile, g_define_type_id);
 *     }
 *   return g_define_type_id__volatile;
 * }
 * ]|
 * The only pieces which have to be manually provided are the definitions of
 * the instance and class structure and the definitions of the instance and
 * class init functions.
 *
 * Since: 2.4
 */
#define G_DEFINE_TYPE_EXTENDED(TN, t_n, T_P, _f_, _C_)	    _G_DEFINE_TYPE_EXTENDED_BEGIN (TN, t_n, T_P, _f_) {_C_;} _G_DEFINE_TYPE_EXTENDED_END()

/**
 * G_DEFINE_INTERFACE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words separated by '_'.
 * @T_P: The #GType of the prerequisite type for the interface, or 0
 * (%G_TYPE_INVALID) for no prerequisite type.
 *
 * A convenience macro for #GTypeInterface definitions, which declares
 * a default vtable initialization function and defines a *_get_type()
 * function.
 *
 * The macro expects the interface initialization function to have the
 * name `t_n ## _default_init`, and the interface structure to have the
 * name `TN ## Interface`.
 *
 * The initialization function has signature
 * `static void t_n ## _default_init (TypeName##Interface *klass);`, rather than
 * the full #GInterfaceInitFunc signature, for brevity and convenience. If you
 * need to use an initialization function with an `iface_data` argument, you
 * must write the #GTypeInterface definitions manually.
 *
 * Since: 2.24
 */
#define G_DEFINE_INTERFACE(TN, t_n, T_P)		    G_DEFINE_INTERFACE_WITH_CODE(TN, t_n, T_P, ;)

/**
 * G_DEFINE_INTERFACE_WITH_CODE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words separated by '_'.
 * @T_P: The #GType of the prerequisite type for the interface, or 0
 * (%G_TYPE_INVALID) for no prerequisite type.
 * @_C_: Custom code that gets inserted in the *_get_type() function.
 *
 * A convenience macro for #GTypeInterface definitions. Similar to
 * G_DEFINE_INTERFACE(), but allows you to insert custom code into the
 * *_get_type() function, e.g. additional interface implementations
 * via G_IMPLEMENT_INTERFACE(), or additional prerequisite types. See
 * G_DEFINE_TYPE_EXTENDED() for a similar example using
 * G_DEFINE_TYPE_WITH_CODE().
 *
 * Since: 2.24
 */
#define G_DEFINE_INTERFACE_WITH_CODE(TN, t_n, T_P, _C_)     _G_DEFINE_INTERFACE_EXTENDED_BEGIN(TN, t_n, T_P) {_C_;} _G_DEFINE_INTERFACE_EXTENDED_END()

/**
 * G_IMPLEMENT_INTERFACE:
 * @TYPE_IFACE: The #GType of the interface to add
 * @iface_init: (type GInterfaceInitFunc): The interface init function, of type #GInterfaceInitFunc
 *
 * A convenience macro to ease interface addition in the `_C_` section
 * of G_DEFINE_TYPE_WITH_CODE() or G_DEFINE_ABSTRACT_TYPE_WITH_CODE().
 * See G_DEFINE_TYPE_EXTENDED() for an example.
 *
 * Note that this macro can only be used together with the G_DEFINE_TYPE_*
 * macros, since it depends on variable names from those macros.
 *
 * Since: 2.4
 */
#define G_IMPLEMENT_INTERFACE(TYPE_IFACE, iface_init)       { \
  const GInterfaceInfo g_implement_interface_info = { \
    (GInterfaceInitFunc)(void (*)(void)) iface_init, NULL, NULL \
  }; \
  g_type_add_interface_static (g_define_type_id, TYPE_IFACE, &g_implement_interface_info); \
}

/**
 * G_ADD_PRIVATE:
 * @TypeName: the name of the type in CamelCase
 *
 * A convenience macro to ease adding private data to instances of a new type
 * in the @_C_ section of G_DEFINE_TYPE_WITH_CODE() or
 * G_DEFINE_ABSTRACT_TYPE_WITH_CODE().
 *
 * For instance:
 *
 * |[<!-- language="C" -->
 *   typedef struct _MyObject MyObject;
 *   typedef struct _MyObjectClass MyObjectClass;
 *
 *   typedef struct {
 *     gint foo;
 *     gint bar;
 *   } MyObjectPrivate;
 *
 *   G_DEFINE_TYPE_WITH_CODE (MyObject, my_object, G_TYPE_OBJECT,
 *                            G_ADD_PRIVATE (MyObject))
 * ]|
 *
 * Will add MyObjectPrivate as the private data to any instance of the MyObject
 * type.
 *
 * G_DEFINE_TYPE_* macros will automatically create a private function
 * based on the arguments to this macro, which can be used to safely
 * retrieve the private data from an instance of the type; for instance:
 *
 * |[<!-- language="C" -->
 *   gint
 *   my_object_get_foo (MyObject *obj)
 *   {
 *     MyObjectPrivate *priv = my_object_get_instance_private (obj);
 *
 *     g_return_val_if_fail (MY_IS_OBJECT (obj), 0);
 *
 *     return priv->foo;
 *   }
 *
 *   void
 *   my_object_set_bar (MyObject *obj,
 *                      gint      bar)
 *   {
 *     MyObjectPrivate *priv = my_object_get_instance_private (obj);
 *
 *     g_return_if_fail (MY_IS_OBJECT (obj));
 *
 *     if (priv->bar != bar)
 *       priv->bar = bar;
 *   }
 * ]|
 *
 * Note that this macro can only be used together with the G_DEFINE_TYPE_*
 * macros, since it depends on variable names from those macros.
 *
 * Also note that private structs added with these macros must have a struct
 * name of the form `TypeNamePrivate`.
 *
 * It is safe to call _get_instance_private on %NULL or invalid object since
 * it's only adding an offset to the instance pointer. In that case the returned
 * pointer must not be dereferenced.
 *
 * Since: 2.38
 */
#define G_ADD_PRIVATE(TypeName) { \
  TypeName##_private_offset = \
    g_type_add_instance_private (g_define_type_id, sizeof (TypeName##Private)); \
}

/**
 * G_PRIVATE_OFFSET:
 * @TypeName: the name of the type in CamelCase
 * @field: the name of the field in the private data structure
 *
 * Evaluates to the offset of the @field inside the instance private data
 * structure for @TypeName.
 *
 * Note that this macro can only be used together with the G_DEFINE_TYPE_*
 * and G_ADD_PRIVATE() macros, since it depends on variable names from
 * those macros.
 *
 * Since: 2.38
 */
#define G_PRIVATE_OFFSET(TypeName, field) \
  (TypeName##_private_offset + (G_STRUCT_OFFSET (TypeName##Private, field)))

/**
 * G_PRIVATE_FIELD_P:
 * @TypeName: the name of the type in CamelCase
 * @inst: the instance of @TypeName you wish to access
 * @field_name: the name of the field in the private data structure
 *
 * Evaluates to a pointer to the @field_name inside the @inst private data
 * structure for @TypeName.
 *
 * Note that this macro can only be used together with the G_DEFINE_TYPE_*
 * and G_ADD_PRIVATE() macros, since it depends on variable names from
 * those macros.
 *
 * Since: 2.38
 */
#define G_PRIVATE_FIELD_P(TypeName, inst, field_name) \
  G_STRUCT_MEMBER_P (inst, G_PRIVATE_OFFSET (TypeName, field_name))

/**
 * G_PRIVATE_FIELD:
 * @TypeName: the name of the type in CamelCase
 * @inst: the instance of @TypeName you wish to access
 * @field_type: the type of the field in the private data structure
 * @field_name: the name of the field in the private data structure
 *
 * Evaluates to the @field_name inside the @inst private data
 * structure for @TypeName.
 *
 * Note that this macro can only be used together with the G_DEFINE_TYPE_*
 * and G_ADD_PRIVATE() macros, since it depends on variable names from
 * those macros.
 *
 * Since: 2.38
 */
#define G_PRIVATE_FIELD(TypeName, inst, field_type, field_name) \
  G_STRUCT_MEMBER (field_type, inst, G_PRIVATE_OFFSET (TypeName, field_name))

/* we need to have this macro under conditional expansion, as it references
 * a function that has been added in 2.38. see bug:
 * https://bugzilla.gnome.org/show_bug.cgi?id=703191
 */
#if GLIB_VERSION_MAX_ALLOWED >= GLIB_VERSION_2_38
#define _G_DEFINE_TYPE_EXTENDED_CLASS_INIT(TypeName, type_name) \
static void     type_name##_class_intern_init (gpointer klass) \
{ \
  type_name##_parent_class = g_type_class_peek_parent (klass); \
  if (TypeName##_private_offset != 0) \
    g_type_class_adjust_private_offset (klass, &TypeName##_private_offset); \
  type_name##_class_init ((TypeName##Class*) klass); \
}

#else
#define _G_DEFINE_TYPE_EXTENDED_CLASS_INIT(TypeName, type_name) \
static void     type_name##_class_intern_init (gpointer klass) \
{ \
  type_name##_parent_class = g_type_class_peek_parent (klass); \
  type_name##_class_init ((TypeName##Class*) klass); \
}
#endif /* GLIB_VERSION_MAX_ALLOWED >= GLIB_VERSION_2_38 */

/* Added for _G_DEFINE_TYPE_EXTENDED_WITH_PRELUDE */
#define _G_DEFINE_TYPE_EXTENDED_BEGIN_PRE(TypeName, type_name, TYPE_PARENT) \
\
static void     type_name##_init              (TypeName        *self); \
static void     type_name##_class_init        (TypeName##Class *klass); \
static GType    type_name##_get_type_once     (void); \
static gpointer type_name##_parent_class = NULL; \
static gint     TypeName##_private_offset; \
\
_G_DEFINE_TYPE_EXTENDED_CLASS_INIT(TypeName, type_name) \
\
G_GNUC_UNUSED \
static inline gpointer \
type_name##_get_instance_private (TypeName *self) \
{ \
  return (G_STRUCT_MEMBER_P (self, TypeName##_private_offset)); \
} \
\
GType \
type_name##_get_type (void) \
{ \
  static volatile gsize g_define_type_id__volatile = 0;
  /* Prelude goes here */

/* Added for _G_DEFINE_TYPE_EXTENDED_WITH_PRELUDE */
#define _G_DEFINE_TYPE_EXTENDED_BEGIN_REGISTER(TypeName, type_name, TYPE_PARENT, flags) \
  if (g_once_init_enter (&g_define_type_id__volatile))  \
    { \
      GType g_define_type_id = type_name##_get_type_once (); \
      g_once_init_leave (&g_define_type_id__volatile, g_define_type_id); \
    }					\
  return g_define_type_id__volatile;	\
} /* closes type_name##_get_type() */ \
\
G_GNUC_NO_INLINE \
static GType \
type_name##_get_type_once (void) \
{ \
  GType g_define_type_id = \
        g_type_register_static_simple (TYPE_PARENT, \
                                       g_intern_static_string (#TypeName), \
                                       sizeof (TypeName##Class), \
                                       (GClassInitFunc)(void (*)(void)) type_name##_class_intern_init, \
                                       sizeof (TypeName), \
                                       (GInstanceInitFunc)(void (*)(void)) type_name##_init, \
                                       (GTypeFlags) flags); \
    { /* custom code follows */
#define _G_DEFINE_TYPE_EXTENDED_END()	\
      /* following custom code */	\
    }					\
  return g_define_type_id; \
} /* closes type_name##_get_type_once() */

/* This was defined before we had G_DEFINE_TYPE_WITH_CODE_AND_PRELUDE, it's simplest
 * to keep it.
 */
#define _G_DEFINE_TYPE_EXTENDED_BEGIN(TypeName, type_name, TYPE_PARENT, flags) \
  _G_DEFINE_TYPE_EXTENDED_BEGIN_PRE(TypeName, type_name, TYPE_PARENT) \
  _G_DEFINE_TYPE_EXTENDED_BEGIN_REGISTER(TypeName, type_name, TYPE_PARENT, flags) \

#define _G_DEFINE_INTERFACE_EXTENDED_BEGIN(TypeName, type_name, TYPE_PREREQ) \
\
static void     type_name##_default_init        (TypeName##Interface *klass); \
\
GType \
type_name##_get_type (void) \
{ \
  static volatile gsize g_define_type_id__volatile = 0; \
  if (g_once_init_enter (&g_define_type_id__volatile))  \
    { \
      GType g_define_type_id = \
        g_type_register_static_simple (G_TYPE_INTERFACE, \
                                       g_intern_static_string (#TypeName), \
                                       sizeof (TypeName##Interface), \
                                       (GClassInitFunc)(void (*)(void)) type_name##_default_init, \
                                       0, \
                                       (GInstanceInitFunc)NULL, \
                                       (GTypeFlags) 0); \
      if (TYPE_PREREQ != G_TYPE_INVALID) \
        g_type_interface_add_prerequisite (g_define_type_id, TYPE_PREREQ); \
      { /* custom code follows */
#define _G_DEFINE_INTERFACE_EXTENDED_END()	\
        /* following custom code */		\
      }						\
      g_once_init_leave (&g_define_type_id__volatile, g_define_type_id); \
    }						\
  return g_define_type_id__volatile;			\
} /* closes type_name##_get_type() */

/**
 * G_DEFINE_BOXED_TYPE:
 * @TypeName: The name of the new type, in Camel case
 * @type_name: The name of the new type, in lowercase, with words
 *  separated by '_'
 * @copy_func: the #GBoxedCopyFunc for the new type
 * @free_func: the #GBoxedFreeFunc for the new type
 *
 * A convenience macro for boxed type implementations, which defines a
 * type_name_get_type() function registering the boxed type.
 *
 * Since: 2.26
 */
#define G_DEFINE_BOXED_TYPE(TypeName, type_name, copy_func, free_func) G_DEFINE_BOXED_TYPE_WITH_CODE (TypeName, type_name, copy_func, free_func, {})
/**
 * G_DEFINE_BOXED_TYPE_WITH_CODE:
 * @TypeName: The name of the new type, in Camel case
 * @type_name: The name of the new type, in lowercase, with words
 *  separated by '_'
 * @copy_func: the #GBoxedCopyFunc for the new type
 * @free_func: the #GBoxedFreeFunc for the new type
 * @_C_: Custom code that gets inserted in the *_get_type() function
 *
 * A convenience macro for boxed type implementations.
 * Similar to G_DEFINE_BOXED_TYPE(), but allows to insert custom code into the
 * type_name_get_type() function, e.g. to register value transformations with
 * g_value_register_transform_func(), for instance:
 *
 * |[<!-- language="C" -->
 * G_DEFINE_BOXED_TYPE_WITH_CODE (GdkRectangle, gdk_rectangle,
 *                                gdk_rectangle_copy,
 *                                gdk_rectangle_free,
 *                                register_rectangle_transform_funcs (g_define_type_id))
 * ]|
 *
 * Similarly to the %G_DEFINE_TYPE family of macros, the #GType of the newly
 * defined boxed type is exposed in the `g_define_type_id` variable.
 *
 * Since: 2.26
 */
#define G_DEFINE_BOXED_TYPE_WITH_CODE(TypeName, type_name, copy_func, free_func, _C_) _G_DEFINE_BOXED_TYPE_BEGIN (TypeName, type_name, copy_func, free_func) {_C_;} _G_DEFINE_TYPE_EXTENDED_END()

/* Only use this in non-C++ on GCC >= 2.7, except for Darwin/ppc64.
 * See https://bugzilla.gnome.org/show_bug.cgi?id=647145
 */
#if !defined (__cplusplus) && (__GNUC__ > 2 || (__GNUC__ == 2 && __GNUC_MINOR__ >= 7)) && !(defined (__APPLE__) && defined (__ppc64__))
#define _G_DEFINE_BOXED_TYPE_BEGIN(TypeName, type_name, copy_func, free_func) \
static GType type_name##_get_type_once (void); \
\
GType \
type_name##_get_type (void) \
{ \
  static volatile gsize g_define_type_id__volatile = 0; \
  if (g_once_init_enter (&g_define_type_id__volatile))  \
    { \
      GType g_define_type_id = type_name##_get_type_once (); \
      g_once_init_leave (&g_define_type_id__volatile, g_define_type_id); \
    } \
  return g_define_type_id__volatile; \
} \
\
G_GNUC_NO_INLINE \
static GType \
type_name##_get_type_once (void) \
{ \
  GType (* _g_register_boxed) \
    (const gchar *, \
     union \
       { \
         TypeName * (*do_copy_type) (TypeName *); \
         TypeName * (*do_const_copy_type) (const TypeName *); \
         GBoxedCopyFunc do_copy_boxed; \
       } __attribute__((__transparent_union__)), \
     union \
       { \
         void (* do_free_type) (TypeName *); \
         GBoxedFreeFunc do_free_boxed; \
       } __attribute__((__transparent_union__)) \
    ) = g_boxed_type_register_static; \
  GType g_define_type_id = \
    _g_register_boxed (g_intern_static_string (#TypeName), copy_func, free_func); \
  { /* custom code follows */
#else
#define _G_DEFINE_BOXED_TYPE_BEGIN(TypeName, type_name, copy_func, free_func) \
static GType type_name##_get_type_once (void); \
\
GType \
type_name##_get_type (void) \
{ \
  static volatile gsize g_define_type_id__volatile = 0; \
  if (g_once_init_enter (&g_define_type_id__volatile))  \
    { \
      GType g_define_type_id = type_name##_get_type_once (); \
      g_once_init_leave (&g_define_type_id__volatile, g_define_type_id); \
    } \
  return g_define_type_id__volatile; \
} \
\
G_GNUC_NO_INLINE \
static GType \
type_name##_get_type_once (void) \
{ \
  GType g_define_type_id = \
    g_boxed_type_register_static (g_intern_static_string (#TypeName), \
                                  (GBoxedCopyFunc) copy_func, \
                                  (GBoxedFreeFunc) free_func); \
  { /* custom code follows */
#endif /* __GNUC__ */

/**
 * G_DEFINE_POINTER_TYPE:
 * @TypeName: The name of the new type, in Camel case
 * @type_name: The name of the new type, in lowercase, with words
 *  separated by '_'
 *
 * A convenience macro for pointer type implementations, which defines a
 * type_name_get_type() function registering the pointer type.
 *
 * Since: 2.26
 */
#define G_DEFINE_POINTER_TYPE(TypeName, type_name) G_DEFINE_POINTER_TYPE_WITH_CODE (TypeName, type_name, {})
/**
 * G_DEFINE_POINTER_TYPE_WITH_CODE:
 * @TypeName: The name of the new type, in Camel case
 * @type_name: The name of the new type, in lowercase, with words
 *  separated by '_'
 * @_C_: Custom code that gets inserted in the *_get_type() function
 *
 * A convenience macro for pointer type implementations.
 * Similar to G_DEFINE_POINTER_TYPE(), but allows to insert
 * custom code into the type_name_get_type() function.
 *
 * Since: 2.26
 */
#define G_DEFINE_POINTER_TYPE_WITH_CODE(TypeName, type_name, _C_) _G_DEFINE_POINTER_TYPE_BEGIN (TypeName, type_name) {_C_;} _G_DEFINE_TYPE_EXTENDED_END()

#define _G_DEFINE_POINTER_TYPE_BEGIN(TypeName, type_name) \
static GType type_name##_get_type_once (void); \
\
GType \
type_name##_get_type (void) \
{ \
  static volatile gsize g_define_type_id__volatile = 0; \
  if (g_once_init_enter (&g_define_type_id__volatile))  \
    { \
      GType g_define_type_id = type_name##_get_type_once (); \
      g_once_init_leave (&g_define_type_id__volatile, g_define_type_id); \
    } \
  return g_define_type_id__volatile; \
} \
\
G_GNUC_NO_INLINE \
static GType \
type_name##_get_type_once (void) \
{ \
  GType g_define_type_id = \
    g_pointer_type_register_static (g_intern_static_string (#TypeName)); \
  { /* custom code follows */

/* --- protected (for fundamental type implementations) --- */
GLIB_AVAILABLE_IN_ALL
GTypePlugin*	 g_type_get_plugin		(GType		     type);
GLIB_AVAILABLE_IN_ALL
GTypePlugin*	 g_type_interface_get_plugin	(GType		     instance_type,
						 GType               interface_type);
GLIB_AVAILABLE_IN_ALL
GType		 g_type_fundamental_next	(void);
GLIB_AVAILABLE_IN_ALL
GType		 g_type_fundamental		(GType		     type_id);
GLIB_AVAILABLE_IN_ALL
GTypeInstance*   g_type_create_instance         (GType               type);
GLIB_AVAILABLE_IN_ALL
void             g_type_free_instance           (GTypeInstance      *instance);

GLIB_AVAILABLE_IN_ALL
void		 g_type_add_class_cache_func    (gpointer	     cache_data,
						 GTypeClassCacheFunc cache_func);
GLIB_AVAILABLE_IN_ALL
void		 g_type_remove_class_cache_func (gpointer	     cache_data,
						 GTypeClassCacheFunc cache_func);
GLIB_AVAILABLE_IN_ALL
void             g_type_class_unref_uncached    (gpointer            g_class);

GLIB_AVAILABLE_IN_ALL
void             g_type_add_interface_check     (gpointer	         check_data,
						 GTypeInterfaceCheckFunc check_func);
GLIB_AVAILABLE_IN_ALL
void             g_type_remove_interface_check  (gpointer	         check_data,
						 GTypeInterfaceCheckFunc check_func);

GLIB_AVAILABLE_IN_ALL
GTypeValueTable* g_type_value_table_peek        (GType		     type);


/*< private >*/
GLIB_AVAILABLE_IN_ALL
gboolean	 g_type_check_instance          (GTypeInstance      *instance) G_GNUC_PURE;
GLIB_AVAILABLE_IN_ALL
GTypeInstance*   g_type_check_instance_cast     (GTypeInstance      *instance,
						 GType               iface_type);
GLIB_AVAILABLE_IN_ALL
gboolean         g_type_check_instance_is_a	(GTypeInstance      *instance,
						 GType               iface_type) G_GNUC_PURE;
GLIB_AVAILABLE_IN_2_42
gboolean         g_type_check_instance_is_fundamentally_a (GTypeInstance *instance,
                                                           GType          fundamental_type) G_GNUC_PURE;
GLIB_AVAILABLE_IN_ALL
GTypeClass*      g_type_check_class_cast        (GTypeClass         *g_class,
						 GType               is_a_type);
GLIB_AVAILABLE_IN_ALL
gboolean         g_type_check_class_is_a        (GTypeClass         *g_class,
						 GType               is_a_type) G_GNUC_PURE;
GLIB_AVAILABLE_IN_ALL
gboolean	 g_type_check_is_value_type     (GType		     type) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean	 g_type_check_value             (const GValue       *value) G_GNUC_PURE;
GLIB_AVAILABLE_IN_ALL
gboolean	 g_type_check_value_holds	(const GValue	    *value,
						 GType		     type) G_GNUC_PURE;
GLIB_AVAILABLE_IN_ALL
gboolean         g_type_test_flags              (GType               type,
						 guint               flags) G_GNUC_CONST;


/* --- debugging functions --- */
GLIB_AVAILABLE_IN_ALL
const gchar *    g_type_name_from_instance      (GTypeInstance	*instance);
GLIB_AVAILABLE_IN_ALL
const gchar *    g_type_name_from_class         (GTypeClass	*g_class);


/* --- implementation bits --- */
#ifndef G_DISABLE_CAST_CHECKS
#  define _G_TYPE_CIC(ip, gt, ct) \
    ((ct*) g_type_check_instance_cast ((GTypeInstance*) ip, gt))
#  define _G_TYPE_CCC(cp, gt, ct) \
    ((ct*) g_type_check_class_cast ((GTypeClass*) cp, gt))
#else /* G_DISABLE_CAST_CHECKS */
#  define _G_TYPE_CIC(ip, gt, ct)       ((ct*) ip)
#  define _G_TYPE_CCC(cp, gt, ct)       ((ct*) cp)
#endif /* G_DISABLE_CAST_CHECKS */
#define _G_TYPE_CHI(ip)			(g_type_check_instance ((GTypeInstance*) ip))
#define _G_TYPE_CHV(vl)			(g_type_check_value ((GValue*) vl))
#define _G_TYPE_IGC(ip, gt, ct)         ((ct*) (((GTypeInstance*) ip)->g_class))
#define _G_TYPE_IGI(ip, gt, ct)         ((ct*) g_type_interface_peek (((GTypeInstance*) ip)->g_class, gt))
#define _G_TYPE_CIFT(ip, ft)            (g_type_check_instance_is_fundamentally_a ((GTypeInstance*) ip, ft))
#ifdef	__GNUC__
#  define _G_TYPE_CIT(ip, gt)             (G_GNUC_EXTENSION ({ \
  GTypeInstance *__inst = (GTypeInstance*) ip; GType __t = gt; gboolean __r; \
  if (!__inst) \
    __r = FALSE; \
  else if (__inst->g_class && __inst->g_class->g_type == __t) \
    __r = TRUE; \
  else \
    __r = g_type_check_instance_is_a (__inst, __t); \
  __r; \
}))
#  define _G_TYPE_CCT(cp, gt)             (G_GNUC_EXTENSION ({ \
  GTypeClass *__class = (GTypeClass*) cp; GType __t = gt; gboolean __r; \
  if (!__class) \
    __r = FALSE; \
  else if (__class->g_type == __t) \
    __r = TRUE; \
  else \
    __r = g_type_check_class_is_a (__class, __t); \
  __r; \
}))
#  define _G_TYPE_CVH(vl, gt)             (G_GNUC_EXTENSION ({ \
  const GValue *__val = (const GValue*) vl; GType __t = gt; gboolean __r; \
  if (!__val) \
    __r = FALSE; \
  else if (__val->g_type == __t)		\
    __r = TRUE; \
  else \
    __r = g_type_check_value_holds (__val, __t); \
  __r; \
}))
#else  /* !__GNUC__ */
#  define _G_TYPE_CIT(ip, gt)             (g_type_check_instance_is_a ((GTypeInstance*) ip, gt))
#  define _G_TYPE_CCT(cp, gt)             (g_type_check_class_is_a ((GTypeClass*) cp, gt))
#  define _G_TYPE_CVH(vl, gt)             (g_type_check_value_holds ((const GValue*) vl, gt))
#endif /* !__GNUC__ */
/**
 * G_TYPE_FLAG_RESERVED_ID_BIT:
 * 
 * A bit in the type number that's supposed to be left untouched.
 */
#define	G_TYPE_FLAG_RESERVED_ID_BIT	((GType) (1 << 0))

G_END_DECLS

#endif /* __G_TYPE_H__ */
