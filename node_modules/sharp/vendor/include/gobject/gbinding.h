/* gbinding.h: Binding for object properties
 *
 * Copyright (C) 2010  Intel Corp.
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
 * Author: Emmanuele Bassi <ebassi@linux.intel.com>
 */

#ifndef __G_BINDING_H__
#define __G_BINDING_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include <glib.h>
#include <gobject/gobject.h>

G_BEGIN_DECLS

#define G_TYPE_BINDING_FLAGS    (g_binding_flags_get_type ())

#define G_TYPE_BINDING          (g_binding_get_type ())
#define G_BINDING(obj)          (G_TYPE_CHECK_INSTANCE_CAST ((obj), G_TYPE_BINDING, GBinding))
#define G_IS_BINDING(obj)       (G_TYPE_CHECK_INSTANCE_TYPE ((obj), G_TYPE_BINDING))

/**
 * GBinding:
 *
 * GBinding is an opaque structure whose members
 * cannot be accessed directly.
 *
 * Since: 2.26
 */
typedef struct _GBinding        GBinding;

/**
 * GBindingTransformFunc:
 * @binding: a #GBinding
 * @from_value: the #GValue containing the value to transform
 * @to_value: the #GValue in which to store the transformed value
 * @user_data: data passed to the transform function
 *
 * A function to be called to transform @from_value to @to_value. If
 * this is the @transform_to function of a binding, then @from_value
 * is the @source_property on the @source object, and @to_value is the
 * @target_property on the @target object. If this is the
 * @transform_from function of a %G_BINDING_BIDIRECTIONAL binding,
 * then those roles are reversed.
 *
 * Returns: %TRUE if the transformation was successful, and %FALSE
 *   otherwise
 *
 * Since: 2.26
 */
typedef gboolean (* GBindingTransformFunc) (GBinding     *binding,
                                            const GValue *from_value,
                                            GValue       *to_value,
                                            gpointer      user_data);

/**
 * GBindingFlags:
 * @G_BINDING_DEFAULT: The default binding; if the source property
 *   changes, the target property is updated with its value.
 * @G_BINDING_BIDIRECTIONAL: Bidirectional binding; if either the
 *   property of the source or the property of the target changes,
 *   the other is updated.
 * @G_BINDING_SYNC_CREATE: Synchronize the values of the source and
 *   target properties when creating the binding; the direction of
 *   the synchronization is always from the source to the target.
 * @G_BINDING_INVERT_BOOLEAN: If the two properties being bound are
 *   booleans, setting one to %TRUE will result in the other being
 *   set to %FALSE and vice versa. This flag will only work for
 *   boolean properties, and cannot be used when passing custom
 *   transformation functions to g_object_bind_property_full().
 *
 * Flags to be passed to g_object_bind_property() or
 * g_object_bind_property_full().
 *
 * This enumeration can be extended at later date.
 *
 * Since: 2.26
 */
typedef enum { /*< prefix=G_BINDING >*/
  G_BINDING_DEFAULT        = 0,

  G_BINDING_BIDIRECTIONAL  = 1 << 0,
  G_BINDING_SYNC_CREATE    = 1 << 1,
  G_BINDING_INVERT_BOOLEAN = 1 << 2
} GBindingFlags;

GLIB_AVAILABLE_IN_ALL
GType                 g_binding_flags_get_type      (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GType                 g_binding_get_type            (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GBindingFlags         g_binding_get_flags           (GBinding *binding);
GLIB_AVAILABLE_IN_ALL
GObject *             g_binding_get_source          (GBinding *binding);
GLIB_AVAILABLE_IN_ALL
GObject *             g_binding_get_target          (GBinding *binding);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_binding_get_source_property (GBinding *binding);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_binding_get_target_property (GBinding *binding);
GLIB_AVAILABLE_IN_2_38
void                  g_binding_unbind              (GBinding *binding);

GLIB_AVAILABLE_IN_ALL
GBinding *g_object_bind_property               (gpointer               source,
                                                const gchar           *source_property,
                                                gpointer               target,
                                                const gchar           *target_property,
                                                GBindingFlags          flags);
GLIB_AVAILABLE_IN_ALL
GBinding *g_object_bind_property_full          (gpointer               source,
                                                const gchar           *source_property,
                                                gpointer               target,
                                                const gchar           *target_property,
                                                GBindingFlags          flags,
                                                GBindingTransformFunc  transform_to,
                                                GBindingTransformFunc  transform_from,
                                                gpointer               user_data,
                                                GDestroyNotify         notify);
GLIB_AVAILABLE_IN_ALL
GBinding *g_object_bind_property_with_closures (gpointer               source,
                                                const gchar           *source_property,
                                                gpointer               target,
                                                const gchar           *target_property,
                                                GBindingFlags          flags,
                                                GClosure              *transform_to,
                                                GClosure              *transform_from);

G_END_DECLS

#endif /* __G_BINDING_H__ */
