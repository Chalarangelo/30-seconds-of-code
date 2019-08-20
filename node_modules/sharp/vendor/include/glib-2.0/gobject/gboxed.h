/* GObject - GLib Type, Object, Parameter and Signal Library
 * Copyright (C) 2000-2001 Red Hat, Inc.
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
#ifndef __G_BOXED_H__
#define __G_BOXED_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include        <gobject/gtype.h>

#ifndef __GI_SCANNER__
#include        <gobject/glib-types.h>
#endif

G_BEGIN_DECLS

/* --- type macros --- */
#define G_TYPE_IS_BOXED(type)      (G_TYPE_FUNDAMENTAL (type) == G_TYPE_BOXED)
/**
 * G_VALUE_HOLDS_BOXED:
 * @value: a valid #GValue structure
 *
 * Checks whether the given #GValue can hold values derived
 * from type %G_TYPE_BOXED.
 *
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_BOXED(value) (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_BOXED))


/* --- typedefs --- */
/**
 * GBoxedCopyFunc:
 * @boxed: (not nullable): The boxed structure to be copied.
 *
 * This function is provided by the user and should produce a copy
 * of the passed in boxed structure.
 *
 * Returns: (not nullable): The newly created copy of the boxed structure.
 */
typedef gpointer (*GBoxedCopyFunc) (gpointer boxed);

/**
 * GBoxedFreeFunc:
 * @boxed: (not nullable): The boxed structure to be freed.
 *
 * This function is provided by the user and should free the boxed
 * structure passed.
 */
typedef void (*GBoxedFreeFunc) (gpointer boxed);


/* --- prototypes --- */
GLIB_AVAILABLE_IN_ALL
gpointer g_boxed_copy                     (GType boxed_type,
                                           gconstpointer  src_boxed);
GLIB_AVAILABLE_IN_ALL
void     g_boxed_free                     (GType          boxed_type,
                                           gpointer       boxed);
GLIB_AVAILABLE_IN_ALL
void     g_value_set_boxed                (GValue        *value,
                                           gconstpointer  v_boxed);
GLIB_AVAILABLE_IN_ALL
void     g_value_set_static_boxed         (GValue        *value,
                                           gconstpointer  v_boxed);
GLIB_AVAILABLE_IN_ALL
void     g_value_take_boxed               (GValue        *value,
                                           gconstpointer  v_boxed);
GLIB_DEPRECATED_FOR(g_value_take_boxed)
void     g_value_set_boxed_take_ownership (GValue        *value,
                                           gconstpointer  v_boxed);
GLIB_AVAILABLE_IN_ALL
gpointer g_value_get_boxed                (const GValue  *value);
GLIB_AVAILABLE_IN_ALL
gpointer g_value_dup_boxed                (const GValue  *value);


/* --- convenience --- */
GLIB_AVAILABLE_IN_ALL
GType    g_boxed_type_register_static     (const gchar   *name,
                                           GBoxedCopyFunc boxed_copy,
                                           GBoxedFreeFunc boxed_free);

/* --- GObject boxed types --- */
/**
 * G_TYPE_CLOSURE:
 *
 * The #GType for #GClosure.
 */
#define G_TYPE_CLOSURE (g_closure_get_type ())

/**
 * G_TYPE_VALUE:
 *
 * The type ID of the "GValue" type which is a boxed type,
 * used to pass around pointers to GValues.
 */
#define G_TYPE_VALUE (g_value_get_type ())

GLIB_AVAILABLE_IN_ALL
GType   g_closure_get_type         (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GType   g_value_get_type           (void) G_GNUC_CONST;

G_END_DECLS

#endif  /* __G_BOXED_H__ */
