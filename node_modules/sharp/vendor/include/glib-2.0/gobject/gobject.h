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
#ifndef __G_OBJECT_H__
#define __G_OBJECT_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include        <gobject/gtype.h>
#include        <gobject/gvalue.h>
#include        <gobject/gparam.h>
#include        <gobject/gclosure.h>
#include        <gobject/gsignal.h>
#include        <gobject/gboxed.h>

G_BEGIN_DECLS

/* --- type macros --- */
/**
 * G_TYPE_IS_OBJECT:
 * @type: Type id to check
 * 
 * Check if the passed in type id is a %G_TYPE_OBJECT or derived from it.
 * 
 * Returns: %FALSE or %TRUE, indicating whether @type is a %G_TYPE_OBJECT.
 */
#define G_TYPE_IS_OBJECT(type)      (G_TYPE_FUNDAMENTAL (type) == G_TYPE_OBJECT)
/**
 * G_OBJECT:
 * @object: Object which is subject to casting.
 * 
 * Casts a #GObject or derived pointer into a (GObject*) pointer.
 * Depending on the current debugging level, this function may invoke
 * certain runtime checks to identify invalid casts.
 */
#define G_OBJECT(object)            (G_TYPE_CHECK_INSTANCE_CAST ((object), G_TYPE_OBJECT, GObject))
/**
 * G_OBJECT_CLASS:
 * @class: a valid #GObjectClass
 * 
 * Casts a derived #GObjectClass structure into a #GObjectClass structure.
 */
#define G_OBJECT_CLASS(class)       (G_TYPE_CHECK_CLASS_CAST ((class), G_TYPE_OBJECT, GObjectClass))
/**
 * G_IS_OBJECT:
 * @object: Instance to check for being a %G_TYPE_OBJECT.
 * 
 * Checks whether a valid #GTypeInstance pointer is of type %G_TYPE_OBJECT.
 */
#if GLIB_VERSION_MAX_ALLOWED >= GLIB_VERSION_2_42
#define G_IS_OBJECT(object)         (G_TYPE_CHECK_INSTANCE_FUNDAMENTAL_TYPE ((object), G_TYPE_OBJECT))
#else
#define G_IS_OBJECT(object)         (G_TYPE_CHECK_INSTANCE_TYPE ((object), G_TYPE_OBJECT))
#endif
/**
 * G_IS_OBJECT_CLASS:
 * @class: a #GObjectClass
 * 
 * Checks whether @class "is a" valid #GObjectClass structure of type
 * %G_TYPE_OBJECT or derived.
 */
#define G_IS_OBJECT_CLASS(class)    (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_OBJECT))
/**
 * G_OBJECT_GET_CLASS:
 * @object: a #GObject instance.
 * 
 * Get the class structure associated to a #GObject instance.
 *
 * Returns: pointer to object class structure.
 */
#define G_OBJECT_GET_CLASS(object)  (G_TYPE_INSTANCE_GET_CLASS ((object), G_TYPE_OBJECT, GObjectClass))
/**
 * G_OBJECT_TYPE:
 * @object: Object to return the type id for.
 * 
 * Get the type id of an object.
 * 
 * Returns: Type id of @object.
 */
#define G_OBJECT_TYPE(object)       (G_TYPE_FROM_INSTANCE (object))
/**
 * G_OBJECT_TYPE_NAME:
 * @object: Object to return the type name for.
 * 
 * Get the name of an object's type.
 * 
 * Returns: Type name of @object. The string is owned by the type system and 
 *  should not be freed.
 */
#define G_OBJECT_TYPE_NAME(object)  (g_type_name (G_OBJECT_TYPE (object)))
/**
 * G_OBJECT_CLASS_TYPE:
 * @class: a valid #GObjectClass
 * 
 * Get the type id of a class structure.
 * 
 * Returns: Type id of @class.
 */
#define G_OBJECT_CLASS_TYPE(class)  (G_TYPE_FROM_CLASS (class))
/**
 * G_OBJECT_CLASS_NAME:
 * @class: a valid #GObjectClass
 * 
 * Return the name of a class structure's type.
 * 
 * Returns: Type name of @class. The string is owned by the type system and 
 *  should not be freed.
 */
#define G_OBJECT_CLASS_NAME(class)  (g_type_name (G_OBJECT_CLASS_TYPE (class)))
/**
 * G_VALUE_HOLDS_OBJECT:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values derived from type %G_TYPE_OBJECT.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_OBJECT(value) (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_OBJECT))

/* --- type macros --- */
/**
 * G_TYPE_INITIALLY_UNOWNED:
 * 
 * The type for #GInitiallyUnowned.
 */
#define G_TYPE_INITIALLY_UNOWNED	      (g_initially_unowned_get_type())
/**
 * G_INITIALLY_UNOWNED:
 * @object: Object which is subject to casting.
 * 
 * Casts a #GInitiallyUnowned or derived pointer into a (GInitiallyUnowned*) 
 * pointer. Depending on the current debugging level, this function may invoke
 * certain runtime checks to identify invalid casts.
 */
#define G_INITIALLY_UNOWNED(object)           (G_TYPE_CHECK_INSTANCE_CAST ((object), G_TYPE_INITIALLY_UNOWNED, GInitiallyUnowned))
/**
 * G_INITIALLY_UNOWNED_CLASS:
 * @class: a valid #GInitiallyUnownedClass
 * 
 * Casts a derived #GInitiallyUnownedClass structure into a
 * #GInitiallyUnownedClass structure.
 */
#define G_INITIALLY_UNOWNED_CLASS(class)      (G_TYPE_CHECK_CLASS_CAST ((class), G_TYPE_INITIALLY_UNOWNED, GInitiallyUnownedClass))
/**
 * G_IS_INITIALLY_UNOWNED:
 * @object: Instance to check for being a %G_TYPE_INITIALLY_UNOWNED.
 * 
 * Checks whether a valid #GTypeInstance pointer is of type %G_TYPE_INITIALLY_UNOWNED.
 */
#define G_IS_INITIALLY_UNOWNED(object)        (G_TYPE_CHECK_INSTANCE_TYPE ((object), G_TYPE_INITIALLY_UNOWNED))
/**
 * G_IS_INITIALLY_UNOWNED_CLASS:
 * @class: a #GInitiallyUnownedClass
 * 
 * Checks whether @class "is a" valid #GInitiallyUnownedClass structure of type
 * %G_TYPE_INITIALLY_UNOWNED or derived.
 */
#define G_IS_INITIALLY_UNOWNED_CLASS(class)   (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_INITIALLY_UNOWNED))
/**
 * G_INITIALLY_UNOWNED_GET_CLASS:
 * @object: a #GInitiallyUnowned instance.
 * 
 * Get the class structure associated to a #GInitiallyUnowned instance.
 *
 * Returns: pointer to object class structure.
 */
#define G_INITIALLY_UNOWNED_GET_CLASS(object) (G_TYPE_INSTANCE_GET_CLASS ((object), G_TYPE_INITIALLY_UNOWNED, GInitiallyUnownedClass))
/* GInitiallyUnowned ia a GObject with initially floating reference count */


/* --- typedefs & structures --- */
typedef struct _GObject                  GObject;
typedef struct _GObjectClass             GObjectClass;
typedef struct _GObject                  GInitiallyUnowned;
typedef struct _GObjectClass             GInitiallyUnownedClass;
typedef struct _GObjectConstructParam    GObjectConstructParam;
/**
 * GObjectGetPropertyFunc:
 * @object: a #GObject
 * @property_id: the numeric id under which the property was registered with
 *  g_object_class_install_property().
 * @value: a #GValue to return the property value in
 * @pspec: the #GParamSpec describing the property
 * 
 * The type of the @get_property function of #GObjectClass. 
 */
typedef void (*GObjectGetPropertyFunc)  (GObject      *object,
                                         guint         property_id,
                                         GValue       *value,
                                         GParamSpec   *pspec);
/**
 * GObjectSetPropertyFunc:
 * @object: a #GObject
 * @property_id: the numeric id under which the property was registered with
 *  g_object_class_install_property().
 * @value: the new value for the property
 * @pspec: the #GParamSpec describing the property
 * 
 * The type of the @set_property function of #GObjectClass. 
 */
typedef void (*GObjectSetPropertyFunc)  (GObject      *object,
                                         guint         property_id,
                                         const GValue *value,
                                         GParamSpec   *pspec);
/**
 * GObjectFinalizeFunc:
 * @object: the #GObject being finalized
 * 
 * The type of the @finalize function of #GObjectClass.
 */
typedef void (*GObjectFinalizeFunc)     (GObject      *object);
/**
 * GWeakNotify:
 * @data: data that was provided when the weak reference was established
 * @where_the_object_was: the object being finalized
 * 
 * A #GWeakNotify function can be added to an object as a callback that gets
 * triggered when the object is finalized. Since the object is already being
 * finalized when the #GWeakNotify is called, there's not much you could do 
 * with the object, apart from e.g. using its address as hash-index or the like. 
 */
typedef void (*GWeakNotify)		(gpointer      data,
					 GObject      *where_the_object_was);
/**
 * GObject:
 * 
 * All the fields in the GObject structure are private 
 * to the #GObject implementation and should never be accessed directly.
 */
struct  _GObject
{
  GTypeInstance  g_type_instance;
  
  /*< private >*/
  volatile guint ref_count;
  GData         *qdata;
};
/**
 * GObjectClass:
 * @g_type_class: the parent class
 * @constructor: the @constructor function is called by g_object_new () to 
 *  complete the object initialization after all the construction properties are
 *  set. The first thing a @constructor implementation must do is chain up to the
 *  @constructor of the parent class. Overriding @constructor should be rarely 
 *  needed, e.g. to handle construct properties, or to implement singletons.
 * @set_property: the generic setter for all properties of this type. Should be
 *  overridden for every type with properties. If implementations of
 *  @set_property don't emit property change notification explicitly, this will
 *  be done implicitly by the type system. However, if the notify signal is
 *  emitted explicitly, the type system will not emit it a second time.
 * @get_property: the generic getter for all properties of this type. Should be
 *  overridden for every type with properties.
 * @dispose: the @dispose function is supposed to drop all references to other 
 *  objects, but keep the instance otherwise intact, so that client method 
 *  invocations still work. It may be run multiple times (due to reference 
 *  loops). Before returning, @dispose should chain up to the @dispose method 
 *  of the parent class.
 * @finalize: instance finalization function, should finish the finalization of 
 *  the instance begun in @dispose and chain up to the @finalize method of the 
 *  parent class.
 * @dispatch_properties_changed: emits property change notification for a bunch
 *  of properties. Overriding @dispatch_properties_changed should be rarely 
 *  needed.
 * @notify: the class closure for the notify signal
 * @constructed: the @constructed function is called by g_object_new() as the
 *  final step of the object creation process.  At the point of the call, all
 *  construction properties have been set on the object.  The purpose of this
 *  call is to allow for object initialisation steps that can only be performed
 *  after construction properties have been set.  @constructed implementors
 *  should chain up to the @constructed call of their parent class to allow it
 *  to complete its initialisation.
 * 
 * The class structure for the GObject type.
 * 
 * |[<!-- language="C" -->
 * // Example of implementing a singleton using a constructor.
 * static MySingleton *the_singleton = NULL;
 * 
 * static GObject*
 * my_singleton_constructor (GType                  type,
 *                           guint                  n_construct_params,
 *                           GObjectConstructParam *construct_params)
 * {
 *   GObject *object;
 *   
 *   if (!the_singleton)
 *     {
 *       object = G_OBJECT_CLASS (parent_class)->constructor (type,
 *                                                            n_construct_params,
 *                                                            construct_params);
 *       the_singleton = MY_SINGLETON (object);
 *     }
 *   else
 *     object = g_object_ref (G_OBJECT (the_singleton));
 * 
 *   return object;
 * }
 * ]|
 */
struct  _GObjectClass
{
  GTypeClass   g_type_class;

  /*< private >*/
  GSList      *construct_properties;

  /*< public >*/
  /* seldom overidden */
  GObject*   (*constructor)     (GType                  type,
                                 guint                  n_construct_properties,
                                 GObjectConstructParam *construct_properties);
  /* overridable methods */
  void       (*set_property)		(GObject        *object,
                                         guint           property_id,
                                         const GValue   *value,
                                         GParamSpec     *pspec);
  void       (*get_property)		(GObject        *object,
                                         guint           property_id,
                                         GValue         *value,
                                         GParamSpec     *pspec);
  void       (*dispose)			(GObject        *object);
  void       (*finalize)		(GObject        *object);
  /* seldom overidden */
  void       (*dispatch_properties_changed) (GObject      *object,
					     guint	   n_pspecs,
					     GParamSpec  **pspecs);
  /* signals */
  void	     (*notify)			(GObject	*object,
					 GParamSpec	*pspec);

  /* called when done constructing */
  void	     (*constructed)		(GObject	*object);

  /*< private >*/
  gsize		flags;

  /* padding */
  gpointer	pdummy[6];
};
/**
 * GObjectConstructParam:
 * @pspec: the #GParamSpec of the construct parameter
 * @value: the value to set the parameter to
 * 
 * The GObjectConstructParam struct is an auxiliary 
 * structure used to hand #GParamSpec/#GValue pairs to the @constructor of
 * a #GObjectClass.
 */
struct _GObjectConstructParam
{
  GParamSpec *pspec;
  GValue     *value;
};

/**
 * GInitiallyUnowned:
 * 
 * All the fields in the GInitiallyUnowned structure 
 * are private to the #GInitiallyUnowned implementation and should never be 
 * accessed directly.
 */
/**
 * GInitiallyUnownedClass:
 * 
 * The class structure for the GInitiallyUnowned type.
 */


/* --- prototypes --- */
GLIB_AVAILABLE_IN_ALL
GType       g_initially_unowned_get_type      (void);
GLIB_AVAILABLE_IN_ALL
void        g_object_class_install_property   (GObjectClass   *oclass,
					       guint           property_id,
					       GParamSpec     *pspec);
GLIB_AVAILABLE_IN_ALL
GParamSpec* g_object_class_find_property      (GObjectClass   *oclass,
					       const gchar    *property_name);
GLIB_AVAILABLE_IN_ALL
GParamSpec**g_object_class_list_properties    (GObjectClass   *oclass,
					       guint	      *n_properties);
GLIB_AVAILABLE_IN_ALL
void        g_object_class_override_property  (GObjectClass   *oclass,
					       guint           property_id,
					       const gchar    *name);
GLIB_AVAILABLE_IN_ALL
void        g_object_class_install_properties (GObjectClass   *oclass,
                                               guint           n_pspecs,
                                               GParamSpec    **pspecs);

GLIB_AVAILABLE_IN_ALL
void        g_object_interface_install_property (gpointer     g_iface,
						 GParamSpec  *pspec);
GLIB_AVAILABLE_IN_ALL
GParamSpec* g_object_interface_find_property    (gpointer     g_iface,
						 const gchar *property_name);
GLIB_AVAILABLE_IN_ALL
GParamSpec**g_object_interface_list_properties  (gpointer     g_iface,
						 guint       *n_properties_p);

GLIB_AVAILABLE_IN_ALL
GType       g_object_get_type                 (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gpointer    g_object_new                      (GType           object_type,
					       const gchar    *first_property_name,
					       ...);
GLIB_AVAILABLE_IN_2_54
GObject*    g_object_new_with_properties      (GType           object_type,
                                               guint           n_properties,
                                               const char     *names[],
                                               const GValue    values[]);
GLIB_DEPRECATED_IN_2_54_FOR(g_object_new_with_properties)
gpointer    g_object_newv		      (GType           object_type,
					       guint	       n_parameters,
					       GParameter     *parameters);
GLIB_AVAILABLE_IN_ALL
GObject*    g_object_new_valist               (GType           object_type,
					       const gchar    *first_property_name,
					       va_list         var_args);
GLIB_AVAILABLE_IN_ALL
void	    g_object_set                      (gpointer	       object,
					       const gchar    *first_property_name,
					       ...) G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_ALL
void        g_object_get                      (gpointer        object,
					       const gchar    *first_property_name,
					       ...) G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_ALL
gpointer    g_object_connect                  (gpointer	       object,
					       const gchar    *signal_spec,
					       ...) G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_ALL
void	    g_object_disconnect               (gpointer	       object,
					       const gchar    *signal_spec,
					       ...) G_GNUC_NULL_TERMINATED;
GLIB_AVAILABLE_IN_2_54
void        g_object_setv                     (GObject        *object,
                                               guint           n_properties,
                                               const gchar    *names[],
                                               const GValue    values[]);
GLIB_AVAILABLE_IN_ALL
void        g_object_set_valist               (GObject        *object,
					       const gchar    *first_property_name,
					       va_list         var_args);
GLIB_AVAILABLE_IN_2_54
void        g_object_getv                     (GObject        *object,
                                               guint           n_properties,
                                               const gchar    *names[],
                                               GValue          values[]);
GLIB_AVAILABLE_IN_ALL
void        g_object_get_valist               (GObject        *object,
					       const gchar    *first_property_name,
					       va_list         var_args);
GLIB_AVAILABLE_IN_ALL
void        g_object_set_property             (GObject        *object,
					       const gchar    *property_name,
					       const GValue   *value);
GLIB_AVAILABLE_IN_ALL
void        g_object_get_property             (GObject        *object,
					       const gchar    *property_name,
					       GValue         *value);
GLIB_AVAILABLE_IN_ALL
void        g_object_freeze_notify            (GObject        *object);
GLIB_AVAILABLE_IN_ALL
void        g_object_notify                   (GObject        *object,
					       const gchar    *property_name);
GLIB_AVAILABLE_IN_ALL
void        g_object_notify_by_pspec          (GObject        *object,
					       GParamSpec     *pspec);
GLIB_AVAILABLE_IN_ALL
void        g_object_thaw_notify              (GObject        *object);
GLIB_AVAILABLE_IN_ALL
gboolean    g_object_is_floating    	      (gpointer        object);
GLIB_AVAILABLE_IN_ALL
gpointer    g_object_ref_sink       	      (gpointer	       object);
GLIB_AVAILABLE_IN_ALL
gpointer    g_object_ref                      (gpointer        object);
GLIB_AVAILABLE_IN_ALL
void        g_object_unref                    (gpointer        object);
GLIB_AVAILABLE_IN_ALL
void	    g_object_weak_ref		      (GObject	      *object,
					       GWeakNotify     notify,
					       gpointer	       data);
GLIB_AVAILABLE_IN_ALL
void	    g_object_weak_unref		      (GObject	      *object,
					       GWeakNotify     notify,
					       gpointer	       data);
GLIB_AVAILABLE_IN_ALL
void        g_object_add_weak_pointer         (GObject        *object, 
                                               gpointer       *weak_pointer_location);
GLIB_AVAILABLE_IN_ALL
void        g_object_remove_weak_pointer      (GObject        *object, 
                                               gpointer       *weak_pointer_location);

#if defined(g_has_typeof) && GLIB_VERSION_MAX_ALLOWED >= GLIB_VERSION_2_56
/* Make reference APIs type safe with macros */
#define g_object_ref(Obj)      ((__typeof__(Obj)) (g_object_ref) (Obj))
#define g_object_ref_sink(Obj) ((__typeof__(Obj)) (g_object_ref_sink) (Obj))
#endif

/**
 * GToggleNotify:
 * @data: Callback data passed to g_object_add_toggle_ref()
 * @object: The object on which g_object_add_toggle_ref() was called.
 * @is_last_ref: %TRUE if the toggle reference is now the
 *  last reference to the object. %FALSE if the toggle
 *  reference was the last reference and there are now other
 *  references.
 * 
 * A callback function used for notification when the state
 * of a toggle reference changes. See g_object_add_toggle_ref().
 */
typedef void (*GToggleNotify) (gpointer      data,
			       GObject      *object,
			       gboolean      is_last_ref);

GLIB_AVAILABLE_IN_ALL
void g_object_add_toggle_ref    (GObject       *object,
				 GToggleNotify  notify,
				 gpointer       data);
GLIB_AVAILABLE_IN_ALL
void g_object_remove_toggle_ref (GObject       *object,
				 GToggleNotify  notify,
				 gpointer       data);

GLIB_AVAILABLE_IN_ALL
gpointer    g_object_get_qdata                (GObject        *object,
					       GQuark          quark);
GLIB_AVAILABLE_IN_ALL
void        g_object_set_qdata                (GObject        *object,
					       GQuark          quark,
					       gpointer        data);
GLIB_AVAILABLE_IN_ALL
void        g_object_set_qdata_full           (GObject        *object,
					       GQuark          quark,
					       gpointer        data,
					       GDestroyNotify  destroy);
GLIB_AVAILABLE_IN_ALL
gpointer    g_object_steal_qdata              (GObject        *object,
					       GQuark          quark);

GLIB_AVAILABLE_IN_2_34
gpointer    g_object_dup_qdata                (GObject        *object,
                                               GQuark          quark,
                                               GDuplicateFunc  dup_func,
					       gpointer         user_data);
GLIB_AVAILABLE_IN_2_34
gboolean    g_object_replace_qdata            (GObject        *object,
                                               GQuark          quark,
                                               gpointer        oldval,
                                               gpointer        newval,
                                               GDestroyNotify  destroy,
					       GDestroyNotify *old_destroy);

GLIB_AVAILABLE_IN_ALL
gpointer    g_object_get_data                 (GObject        *object,
					       const gchar    *key);
GLIB_AVAILABLE_IN_ALL
void        g_object_set_data                 (GObject        *object,
					       const gchar    *key,
					       gpointer        data);
GLIB_AVAILABLE_IN_ALL
void        g_object_set_data_full            (GObject        *object,
					       const gchar    *key,
					       gpointer        data,
					       GDestroyNotify  destroy);
GLIB_AVAILABLE_IN_ALL
gpointer    g_object_steal_data               (GObject        *object,
					       const gchar    *key);

GLIB_AVAILABLE_IN_2_34
gpointer    g_object_dup_data                 (GObject        *object,
                                               const gchar    *key,
                                               GDuplicateFunc  dup_func,
					       gpointer         user_data);
GLIB_AVAILABLE_IN_2_34
gboolean    g_object_replace_data             (GObject        *object,
                                               const gchar    *key,
                                               gpointer        oldval,
                                               gpointer        newval,
                                               GDestroyNotify  destroy,
					       GDestroyNotify *old_destroy);


GLIB_AVAILABLE_IN_ALL
void        g_object_watch_closure            (GObject        *object,
					       GClosure       *closure);
GLIB_AVAILABLE_IN_ALL
GClosure*   g_cclosure_new_object             (GCallback       callback_func,
					       GObject	      *object);
GLIB_AVAILABLE_IN_ALL
GClosure*   g_cclosure_new_object_swap        (GCallback       callback_func,
					       GObject	      *object);
GLIB_AVAILABLE_IN_ALL
GClosure*   g_closure_new_object              (guint           sizeof_closure,
					       GObject        *object);
GLIB_AVAILABLE_IN_ALL
void        g_value_set_object                (GValue         *value,
					       gpointer        v_object);
GLIB_AVAILABLE_IN_ALL
gpointer    g_value_get_object                (const GValue   *value);
GLIB_AVAILABLE_IN_ALL
gpointer    g_value_dup_object                (const GValue   *value);
GLIB_AVAILABLE_IN_ALL
gulong	    g_signal_connect_object           (gpointer	       instance,
					       const gchar    *detailed_signal,
					       GCallback       c_handler,
					       gpointer	       gobject,
					       GConnectFlags   connect_flags);

/*< protected >*/
GLIB_AVAILABLE_IN_ALL
void        g_object_force_floating           (GObject        *object);
GLIB_AVAILABLE_IN_ALL
void        g_object_run_dispose	      (GObject	      *object);


GLIB_AVAILABLE_IN_ALL
void        g_value_take_object               (GValue         *value,
					       gpointer        v_object);
GLIB_DEPRECATED_FOR(g_value_take_object)
void        g_value_set_object_take_ownership (GValue         *value,
                                               gpointer        v_object);

GLIB_DEPRECATED
gsize	    g_object_compat_control	      (gsize	       what,
					       gpointer	       data);

/* --- implementation macros --- */
#define G_OBJECT_WARN_INVALID_PSPEC(object, pname, property_id, pspec) \
G_STMT_START { \
  GObject *_glib__object = (GObject*) (object); \
  GParamSpec *_glib__pspec = (GParamSpec*) (pspec); \
  guint _glib__property_id = (property_id); \
  g_warning ("%s:%d: invalid %s id %u for \"%s\" of type '%s' in '%s'", \
             __FILE__, __LINE__, \
             (pname), \
             _glib__property_id, \
             _glib__pspec->name, \
             g_type_name (G_PARAM_SPEC_TYPE (_glib__pspec)), \
             G_OBJECT_TYPE_NAME (_glib__object)); \
} G_STMT_END
/**
 * G_OBJECT_WARN_INVALID_PROPERTY_ID:
 * @object: the #GObject on which set_property() or get_property() was called
 * @property_id: the numeric id of the property
 * @pspec: the #GParamSpec of the property
 * 
 * This macro should be used to emit a standard warning about unexpected 
 * properties in set_property() and get_property() implementations.
 */
#define G_OBJECT_WARN_INVALID_PROPERTY_ID(object, property_id, pspec) \
    G_OBJECT_WARN_INVALID_PSPEC ((object), "property", (property_id), (pspec))

GLIB_AVAILABLE_IN_ALL
void    g_clear_object (GObject **object_ptr);
#define g_clear_object(object_ptr) g_clear_pointer ((object_ptr), g_object_unref)

/**
 * g_set_object: (skip)
 * @object_ptr: a pointer to a #GObject reference
 * @new_object: (nullable) (transfer none): a pointer to the new #GObject to
 *   assign to it, or %NULL to clear the pointer
 *
 * Updates a #GObject pointer to refer to @new_object. It increments the
 * reference count of @new_object (if non-%NULL), decrements the reference
 * count of the current value of @object_ptr (if non-%NULL), and assigns
 * @new_object to @object_ptr. The assignment is not atomic.
 *
 * @object_ptr must not be %NULL.
 *
 * A macro is also included that allows this function to be used without
 * pointer casts. The function itself is static inline, so its address may vary
 * between compilation units.
 *
 * One convenient usage of this function is in implementing property setters:
 * |[
 *   void
 *   foo_set_bar (Foo *foo,
 *                Bar *new_bar)
 *   {
 *     g_return_if_fail (IS_FOO (foo));
 *     g_return_if_fail (new_bar == NULL || IS_BAR (new_bar));
 *
 *     if (g_set_object (&foo->bar, new_bar))
 *       g_object_notify (foo, "bar");
 *   }
 * ]|
 *
 * Returns: %TRUE if the value of @object_ptr changed, %FALSE otherwise
 *
 * Since: 2.44
 */
static inline gboolean
(g_set_object) (GObject **object_ptr,
                GObject  *new_object)
{
  GObject *old_object = *object_ptr;

  /* rely on g_object_[un]ref() to check the pointers are actually GObjects;
   * elide a (object_ptr != NULL) check because most of the time we will be
   * operating on struct members with a constant offset, so a NULL check would
   * not catch bugs
   */

  if (old_object == new_object)
    return FALSE;

  if (new_object != NULL)
    g_object_ref (new_object);

  *object_ptr = new_object;

  if (old_object != NULL)
    g_object_unref (old_object);

  return TRUE;
}

#define g_set_object(object_ptr, new_object) \
 (/* Check types match. */ \
  0 ? *(object_ptr) = (new_object), FALSE : \
  (g_set_object) ((GObject **) (object_ptr), (GObject *) (new_object)) \
 )

/**
 * g_clear_weak_pointer: (skip)
 * @weak_pointer_location: The memory address of a pointer
 *
 * Clears a weak reference to a #GObject.
 *
 * @weak_pointer_location must not be %NULL.
 *
 * If the weak reference is %NULL then this function does nothing.
 * Otherwise, the weak reference to the object is removed for that location
 * and the pointer is set to %NULL.
 *
 * A macro is also included that allows this function to be used without
 * pointer casts. The function itself is static inline, so its address may vary
 * between compilation units.
 *
 * Since: 2.56
 */
static inline void
(g_clear_weak_pointer) (gpointer *weak_pointer_location)
{
  GObject *object = (GObject *) *weak_pointer_location;

  if (object != NULL)
    {
      g_object_remove_weak_pointer (object, weak_pointer_location);
      *weak_pointer_location = NULL;
    }
}

#define g_clear_weak_pointer(weak_pointer_location) \
 (/* Check types match. */ \
  (g_clear_weak_pointer) ((gpointer *) (weak_pointer_location)) \
 )

/**
 * g_set_weak_pointer: (skip)
 * @weak_pointer_location: the memory address of a pointer
 * @new_object: (nullable) (transfer none): a pointer to the new #GObject to
 *   assign to it, or %NULL to clear the pointer
 *
 * Updates a pointer to weakly refer to @new_object. It assigns @new_object
 * to @weak_pointer_location and ensures that @weak_pointer_location will
 * automaticaly be set to %NULL if @new_object gets destroyed. The assignment
 * is not atomic. The weak reference is not thread-safe, see
 * g_object_add_weak_pointer() for details.
 *
 * @weak_pointer_location must not be %NULL.
 *
 * A macro is also included that allows this function to be used without
 * pointer casts. The function itself is static inline, so its address may vary
 * between compilation units.
 *
 * One convenient usage of this function is in implementing property setters:
 * |[
 *   void
 *   foo_set_bar (Foo *foo,
 *                Bar *new_bar)
 *   {
 *     g_return_if_fail (IS_FOO (foo));
 *     g_return_if_fail (new_bar == NULL || IS_BAR (new_bar));
 *
 *     if (g_set_weak_pointer (&foo->bar, new_bar))
 *       g_object_notify (foo, "bar");
 *   }
 * ]|
 *
 * Returns: %TRUE if the value of @weak_pointer_location changed, %FALSE otherwise
 *
 * Since: 2.56
 */
static inline gboolean
(g_set_weak_pointer) (gpointer *weak_pointer_location,
                      GObject  *new_object)
{
  GObject *old_object = (GObject *) *weak_pointer_location;

  /* elide a (weak_pointer_location != NULL) check because most of the time we
   * will be operating on struct members with a constant offset, so a NULL
   * check would not catch bugs
   */

  if (old_object == new_object)
    return FALSE;

  if (old_object != NULL)
    g_object_remove_weak_pointer (old_object, weak_pointer_location);

  *weak_pointer_location = new_object;

  if (new_object != NULL)
    g_object_add_weak_pointer (new_object, weak_pointer_location);

  return TRUE;
}

#define g_set_weak_pointer(weak_pointer_location, new_object) \
 (/* Check types match. */ \
  0 ? *(weak_pointer_location) = (new_object), FALSE : \
  (g_set_weak_pointer) ((gpointer *) (weak_pointer_location), (GObject *) (new_object)) \
 )

typedef struct {
    /*<private>*/
    union { gpointer p; } priv;
} GWeakRef;

GLIB_AVAILABLE_IN_ALL
void     g_weak_ref_init       (GWeakRef *weak_ref,
                                gpointer  object);
GLIB_AVAILABLE_IN_ALL
void     g_weak_ref_clear      (GWeakRef *weak_ref);
GLIB_AVAILABLE_IN_ALL
gpointer g_weak_ref_get        (GWeakRef *weak_ref);
GLIB_AVAILABLE_IN_ALL
void     g_weak_ref_set        (GWeakRef *weak_ref,
                                gpointer  object);

G_END_DECLS

#endif /* __G_OBJECT_H__ */
