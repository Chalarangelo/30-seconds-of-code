/* GObject - GLib Type, Object, Parameter and Signal Library
 * Copyright (C) 2000 Red Hat, Inc.
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
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */
#ifndef __G_TYPE_MODULE_H__
#define __G_TYPE_MODULE_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include <gobject/gobject.h>
#include <gobject/genums.h>

G_BEGIN_DECLS

typedef struct _GTypeModule      GTypeModule;
typedef struct _GTypeModuleClass GTypeModuleClass;

#define G_TYPE_TYPE_MODULE              (g_type_module_get_type ())
#define G_TYPE_MODULE(module)           (G_TYPE_CHECK_INSTANCE_CAST ((module), G_TYPE_TYPE_MODULE, GTypeModule))
#define G_TYPE_MODULE_CLASS(class)      (G_TYPE_CHECK_CLASS_CAST ((class), G_TYPE_TYPE_MODULE, GTypeModuleClass))
#define G_IS_TYPE_MODULE(module)        (G_TYPE_CHECK_INSTANCE_TYPE ((module), G_TYPE_TYPE_MODULE))
#define G_IS_TYPE_MODULE_CLASS(class)   (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_TYPE_MODULE))
#define G_TYPE_MODULE_GET_CLASS(module) (G_TYPE_INSTANCE_GET_CLASS ((module), G_TYPE_TYPE_MODULE, GTypeModuleClass))

G_DEFINE_AUTOPTR_CLEANUP_FUNC(GTypeModule, g_object_unref)

/**
 * GTypeModule:
 * @name: the name of the module
 * 
 * The members of the GTypeModule structure should not 
 * be accessed directly, except for the @name field.
 */
struct _GTypeModule 
{
  GObject parent_instance;

  guint use_count;
  GSList *type_infos;
  GSList *interface_infos;

  /*< public >*/
  gchar *name;
};

/**
 * GTypeModuleClass:
 * @parent_class: the parent class
 * @load: loads the module and registers one or more types using
 *  g_type_module_register_type().
 * @unload: unloads the module
 * 
 * In order to implement dynamic loading of types based on #GTypeModule, 
 * the @load and @unload functions in #GTypeModuleClass must be implemented.
 */
struct _GTypeModuleClass
{
  GObjectClass parent_class;

  /*< public >*/
  gboolean (* load)   (GTypeModule *module);
  void     (* unload) (GTypeModule *module);

  /*< private >*/
  /* Padding for future expansion */
  void (*reserved1) (void);
  void (*reserved2) (void);
  void (*reserved3) (void);
  void (*reserved4) (void);
};

/**
 * G_DEFINE_DYNAMIC_TYPE:
 * @TN: The name of the new type, in Camel case.
 * @t_n: The name of the new type, in lowercase, with words
 *  separated by '_'.
 * @T_P: The #GType of the parent type.
 * 
 * A convenience macro for dynamic type implementations, which declares a
 * class initialization function, an instance initialization function (see 
 * #GTypeInfo for information about these) and a static variable named 
 * `t_n`_parent_class pointing to the parent class. Furthermore,
 * it defines a `*_get_type()` and a static `*_register_type()` functions
 * for use in your `module_init()`.
 *
 * See G_DEFINE_DYNAMIC_TYPE_EXTENDED() for an example.
 * 
 * Since: 2.14
 */
#define G_DEFINE_DYNAMIC_TYPE(TN, t_n, T_P)          G_DEFINE_DYNAMIC_TYPE_EXTENDED (TN, t_n, T_P, 0, {})
/**
 * G_DEFINE_DYNAMIC_TYPE_EXTENDED:
 * @TypeName: The name of the new type, in Camel case.
 * @type_name: The name of the new type, in lowercase, with words
 *  separated by '_'.
 * @TYPE_PARENT: The #GType of the parent type.
 * @flags: #GTypeFlags to pass to g_type_module_register_type()
 * @CODE: Custom code that gets inserted in the *_get_type() function.
 * 
 * A more general version of G_DEFINE_DYNAMIC_TYPE() which
 * allows to specify #GTypeFlags and custom code.
 * 
 * |[
 * G_DEFINE_DYNAMIC_TYPE_EXTENDED (GtkGadget,
 *                                 gtk_gadget,
 *                                 GTK_TYPE_THING,
 *                                 0,
 *                                 G_IMPLEMENT_INTERFACE_DYNAMIC (TYPE_GIZMO,
 *                                                                gtk_gadget_gizmo_init));
 * ]|
 * expands to
 * |[
 * static void     gtk_gadget_init              (GtkGadget      *self);
 * static void     gtk_gadget_class_init        (GtkGadgetClass *klass);
 * static void     gtk_gadget_class_finalize    (GtkGadgetClass *klass);
 * 
 * static gpointer gtk_gadget_parent_class = NULL;
 * static GType    gtk_gadget_type_id = 0;
 * 
 * static void     gtk_gadget_class_intern_init (gpointer klass)
 * {
 *   gtk_gadget_parent_class = g_type_class_peek_parent (klass); 
 *   gtk_gadget_class_init ((GtkGadgetClass*) klass); 
 * }
 * 
 * GType
 * gtk_gadget_get_type (void)
 * {
 *   return gtk_gadget_type_id;
 * }
 * 
 * static void
 * gtk_gadget_register_type (GTypeModule *type_module)
 * {
 *   const GTypeInfo g_define_type_info = {
 *     sizeof (GtkGadgetClass),
 *     (GBaseInitFunc) NULL,
 *     (GBaseFinalizeFunc) NULL,
 *     (GClassInitFunc) gtk_gadget_class_intern_init,
 *     (GClassFinalizeFunc) gtk_gadget_class_finalize,
 *     NULL,   // class_data
 *     sizeof (GtkGadget),
 *     0,      // n_preallocs
 *     (GInstanceInitFunc) gtk_gadget_init, 
 *     NULL    // value_table
 *   };
 *   gtk_gadget_type_id = g_type_module_register_type (type_module,
 *                                                     GTK_TYPE_THING,
 *                                                     "GtkGadget",
 *                                                     &g_define_type_info,
 *                                                     (GTypeFlags) flags);
 *   {
 *     const GInterfaceInfo g_implement_interface_info = {
 *       (GInterfaceInitFunc) gtk_gadget_gizmo_init
 *     };
 *     g_type_module_add_interface (type_module, g_define_type_id, TYPE_GIZMO, &g_implement_interface_info);
 *   }
 * }
 * ]|
 * 
 * Since: 2.14
 */
#define G_DEFINE_DYNAMIC_TYPE_EXTENDED(TypeName, type_name, TYPE_PARENT, flags, CODE) \
static void     type_name##_init              (TypeName        *self); \
static void     type_name##_class_init        (TypeName##Class *klass); \
static void     type_name##_class_finalize    (TypeName##Class *klass); \
static gpointer type_name##_parent_class = NULL; \
static GType    type_name##_type_id = 0; \
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
  return type_name##_type_id; \
} \
static void \
type_name##_register_type (GTypeModule *type_module) \
{ \
  GType g_define_type_id G_GNUC_UNUSED; \
  const GTypeInfo g_define_type_info = { \
    sizeof (TypeName##Class), \
    (GBaseInitFunc) NULL, \
    (GBaseFinalizeFunc) NULL, \
    (GClassInitFunc)(void (*)(void)) type_name##_class_intern_init, \
    (GClassFinalizeFunc)(void (*)(void)) type_name##_class_finalize, \
    NULL,   /* class_data */ \
    sizeof (TypeName), \
    0,      /* n_preallocs */ \
    (GInstanceInitFunc)(void (*)(void)) type_name##_init, \
    NULL    /* value_table */ \
  }; \
  type_name##_type_id = g_type_module_register_type (type_module, \
						     TYPE_PARENT, \
						     #TypeName, \
						     &g_define_type_info, \
						     (GTypeFlags) flags); \
  g_define_type_id = type_name##_type_id; \
  { CODE ; } \
}

/**
 * G_IMPLEMENT_INTERFACE_DYNAMIC:
 * @TYPE_IFACE: The #GType of the interface to add
 * @iface_init: The interface init function
 *
 * A convenience macro to ease interface addition in the @_C_ section
 * of G_DEFINE_DYNAMIC_TYPE_EXTENDED(). See G_DEFINE_DYNAMIC_TYPE_EXTENDED()
 * for an example.
 *
 * Note that this macro can only be used together with the
 * G_DEFINE_DYNAMIC_TYPE_EXTENDED macros, since it depends on variable
 * names from that macro.
 *
 * Since: 2.24
 */
#define G_IMPLEMENT_INTERFACE_DYNAMIC(TYPE_IFACE, iface_init)       { \
  const GInterfaceInfo g_implement_interface_info = { \
    (GInterfaceInitFunc)(void (*)(void)) iface_init, NULL, NULL      \
  }; \
  g_type_module_add_interface (type_module, g_define_type_id, TYPE_IFACE, &g_implement_interface_info); \
}

/**
 * G_ADD_PRIVATE_DYNAMIC:
 * @TypeName: the name of the type in CamelCase
 *
 * A convenience macro to ease adding private data to instances of a new dynamic
 * type in the @_C_ section of G_DEFINE_DYNAMIC_TYPE_EXTENDED(). See
 * G_ADD_PRIVATE() for details, it is similar but for static types.
 *
 * Note that this macro can only be used together with the
 * G_DEFINE_DYNAMIC_TYPE_EXTENDED macros, since it depends on variable
 * names from that macro.
 *
 * Since: 2.38
 */
#define G_ADD_PRIVATE_DYNAMIC(TypeName)         { \
  TypeName##_private_offset = sizeof (TypeName##Private); \
}

GLIB_AVAILABLE_IN_ALL
GType    g_type_module_get_type       (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean g_type_module_use            (GTypeModule          *module);
GLIB_AVAILABLE_IN_ALL
void     g_type_module_unuse          (GTypeModule          *module);
GLIB_AVAILABLE_IN_ALL
void     g_type_module_set_name       (GTypeModule          *module,
                                       const gchar          *name);
GLIB_AVAILABLE_IN_ALL
GType    g_type_module_register_type  (GTypeModule          *module,
                                       GType                 parent_type,
                                       const gchar          *type_name,
                                       const GTypeInfo      *type_info,
                                       GTypeFlags            flags);
GLIB_AVAILABLE_IN_ALL
void     g_type_module_add_interface  (GTypeModule          *module,
                                       GType                 instance_type,
                                       GType                 interface_type,
                                       const GInterfaceInfo *interface_info);
GLIB_AVAILABLE_IN_ALL
GType    g_type_module_register_enum  (GTypeModule          *module,
                                       const gchar          *name,
                                       const GEnumValue     *const_static_values);
GLIB_AVAILABLE_IN_ALL
GType    g_type_module_register_flags (GTypeModule          *module,
                                       const gchar          *name,
                                       const GFlagsValue    *const_static_values);

G_END_DECLS

#endif /* __G_TYPE_MODULE_H__ */
