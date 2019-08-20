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
 *
 * gvaluecollector.h: GValue varargs stubs
 */
/**
 * SECTION:value_collection
 * @Short_description: Converting varargs to generic values
 * @Title: Varargs Value Collection
 * 
 * The macros in this section provide the varargs parsing support needed
 * in variadic GObject functions such as g_object_new() or g_object_set().
 * They currently support the collection of integral types, floating point 
 * types and pointers.
 */
#ifndef __G_VALUE_COLLECTOR_H__
#define __G_VALUE_COLLECTOR_H__

#include <glib-object.h>

G_BEGIN_DECLS

/* we may want to add aggregate types here some day, if requested
 * by users. the basic C types are covered already, everything
 * smaller than an int is promoted to an integer and floats are
 * always promoted to doubles for varargs call constructions.
 */
enum	/*< skip >*/
{
  G_VALUE_COLLECT_INT		= 'i',
  G_VALUE_COLLECT_LONG		= 'l',
  G_VALUE_COLLECT_INT64         = 'q',
  G_VALUE_COLLECT_DOUBLE	= 'd',
  G_VALUE_COLLECT_POINTER	= 'p'
};


/* vararg union holding actual values collected
 */
/**
 * GTypeCValue:
 * @v_int: the field for holding integer values
 * @v_long: the field for holding long integer values
 * @v_int64: the field for holding 64 bit integer values
 * @v_double: the field for holding floating point values
 * @v_pointer: the field for holding pointers
 * 
 * A union holding one collected value.
 */
union _GTypeCValue
{
  gint     v_int;
  glong    v_long;
  gint64   v_int64;
  gdouble  v_double;
  gpointer v_pointer;
};

/**
 * G_VALUE_COLLECT_INIT:
 * @value: a #GValue return location. @value must contain only 0 bytes.
 * @_value_type: the #GType to use for @value.
 * @var_args: the va_list variable; it may be evaluated multiple times
 * @flags: flags which are passed on to the collect_value() function of
 *  the #GTypeValueTable of @value.
 * @__error: a #gchar** variable that will be modified to hold a g_new()
 *  allocated error messages if something fails
 * 
 * Collects a variable argument value from a va_list. We have to
 * implement the varargs collection as a macro, because on some systems
 * va_list variables cannot be passed by reference.
 *
 * Since: 2.24
 */
#define G_VALUE_COLLECT_INIT(value, _value_type, var_args, flags, __error)		\
G_STMT_START {										\
  GValue *g_vci_val = (value);								\
  guint g_vci_flags = (flags);								\
  GTypeValueTable *g_vci_vtab = g_type_value_table_peek (_value_type);			\
  const gchar *g_vci_collect_format = g_vci_vtab->collect_format;					\
  GTypeCValue g_vci_cvalues[G_VALUE_COLLECT_FORMAT_MAX_LENGTH] = { { 0, }, };		\
  guint g_vci_n_values = 0;									\
                                                                                        \
  g_vci_val->g_type = _value_type;		/* value_meminit() from gvalue.c */		\
  while (*g_vci_collect_format)								\
    {											\
      GTypeCValue *g_vci_cvalue = g_vci_cvalues + g_vci_n_values++;					\
                                                                                        \
      switch (*g_vci_collect_format++)							\
	{										\
	case G_VALUE_COLLECT_INT:							\
	  g_vci_cvalue->v_int = va_arg ((var_args), gint);					\
	  break;									\
	case G_VALUE_COLLECT_LONG:							\
	  g_vci_cvalue->v_long = va_arg ((var_args), glong);					\
	  break;									\
	case G_VALUE_COLLECT_INT64:							\
	  g_vci_cvalue->v_int64 = va_arg ((var_args), gint64);				\
	  break;									\
	case G_VALUE_COLLECT_DOUBLE:							\
	  g_vci_cvalue->v_double = va_arg ((var_args), gdouble);				\
	  break;									\
	case G_VALUE_COLLECT_POINTER:							\
	  g_vci_cvalue->v_pointer = va_arg ((var_args), gpointer);				\
	  break;									\
	default:									\
	  g_assert_not_reached ();							\
	}										\
    }											\
  *(__error) = g_vci_vtab->collect_value (g_vci_val,						\
				       g_vci_n_values,					\
				       g_vci_cvalues,					\
				       g_vci_flags);						\
} G_STMT_END

/**
 * G_VALUE_COLLECT:
 * @value: a #GValue return location. @value is supposed to be initialized
 *  according to the value type to be collected
 * @var_args: the va_list variable; it may be evaluated multiple times
 * @flags: flags which are passed on to the collect_value() function of
 *  the #GTypeValueTable of @value.
 * @__error: a #gchar** variable that will be modified to hold a g_new()
 *  allocated error messages if something fails
 *
 * Collects a variable argument value from a va_list. We have to
 * implement the varargs collection as a macro, because on some systems
 * va_list variables cannot be passed by reference.
 *
 * Note: If you are creating the @value argument just before calling this macro,
 * you should use the #G_VALUE_COLLECT_INIT variant and pass the unitialized
 * #GValue. That variant is faster than #G_VALUE_COLLECT.
 */
#define G_VALUE_COLLECT(value, var_args, flags, __error) G_STMT_START {			\
  GValue *g_vc_value = (value);								\
  GType g_vc_value_type = G_VALUE_TYPE (g_vc_value);						\
  GTypeValueTable *g_vc_vtable = g_type_value_table_peek (g_vc_value_type);			\
											\
  if (g_vc_vtable->value_free)								\
    g_vc_vtable->value_free (g_vc_value);							\
  memset (g_vc_value->data, 0, sizeof (g_vc_value->data));					\
											\
  G_VALUE_COLLECT_INIT(value, g_vc_value_type, var_args, flags, __error);			\
} G_STMT_END

/**
 * G_VALUE_COLLECT_SKIP:
 * @_value_type: the #GType of the value to skip
 * @var_args: the va_list variable; it may be evaluated multiple times
 *
 * Skip an argument of type @_value_type from @var_args.
 */
#define G_VALUE_COLLECT_SKIP(_value_type, var_args)					\
G_STMT_START {										\
  GTypeValueTable *g_vcs_vtable = g_type_value_table_peek (_value_type);			\
  const gchar *g_vcs_collect_format = g_vcs_vtable->collect_format;				\
                                                                                        \
  while (*g_vcs_collect_format)								\
    {											\
      switch (*g_vcs_collect_format++)							\
	{										\
	case G_VALUE_COLLECT_INT:							\
	  va_arg ((var_args), gint);							\
	  break;									\
	case G_VALUE_COLLECT_LONG:							\
	  va_arg ((var_args), glong);							\
	  break;									\
	case G_VALUE_COLLECT_INT64:							\
	  va_arg ((var_args), gint64);							\
	  break;									\
	case G_VALUE_COLLECT_DOUBLE:							\
	  va_arg ((var_args), gdouble);							\
	  break;									\
	case G_VALUE_COLLECT_POINTER:							\
	  va_arg ((var_args), gpointer);						\
	  break;									\
	default:									\
	  g_assert_not_reached ();							\
	}										\
    }											\
} G_STMT_END

/**
 * G_VALUE_LCOPY:
 * @value: a #GValue to store into the @var_args; this must be initialized
 *  and set
 * @var_args: the va_list variable; it may be evaluated multiple times
 * @flags: flags which are passed on to the lcopy_value() function of
 *  the #GTypeValueTable of @value.
 * @__error: a #gchar** variable that will be modified to hold a g_new()
 *  allocated error message if something fails
 *
 * Stores a value’s value into one or more argument locations from a va_list.
 * This is the inverse of G_VALUE_COLLECT().
 */
#define G_VALUE_LCOPY(value, var_args, flags, __error)					\
G_STMT_START {										\
  const GValue *g_vl_value = (value);							\
  guint g_vl_flags = (flags);								\
  GType g_vl_value_type = G_VALUE_TYPE (g_vl_value);						\
  GTypeValueTable *g_vl_vtable = g_type_value_table_peek (g_vl_value_type);			\
  const gchar *g_vl_lcopy_format = g_vl_vtable->lcopy_format;					\
  GTypeCValue g_vl_cvalues[G_VALUE_COLLECT_FORMAT_MAX_LENGTH] = { { 0, }, };		\
  guint g_vl_n_values = 0;									\
                                                                                        \
  while (*g_vl_lcopy_format)								\
    {											\
      GTypeCValue *g_vl_cvalue = g_vl_cvalues + g_vl_n_values++;					\
                                                                                        \
      switch (*g_vl_lcopy_format++)								\
	{										\
	case G_VALUE_COLLECT_INT:							\
	  g_vl_cvalue->v_int = va_arg ((var_args), gint);					\
	  break;									\
	case G_VALUE_COLLECT_LONG:							\
	  g_vl_cvalue->v_long = va_arg ((var_args), glong);					\
	  break;									\
	case G_VALUE_COLLECT_INT64:							\
	  g_vl_cvalue->v_int64 = va_arg ((var_args), gint64);				\
	  break;									\
	case G_VALUE_COLLECT_DOUBLE:							\
	  g_vl_cvalue->v_double = va_arg ((var_args), gdouble);				\
	  break;									\
	case G_VALUE_COLLECT_POINTER:							\
	  g_vl_cvalue->v_pointer = va_arg ((var_args), gpointer);				\
	  break;									\
	default:									\
	  g_assert_not_reached ();							\
	}										\
    }											\
  *(__error) = g_vl_vtable->lcopy_value (g_vl_value,						\
				     g_vl_n_values,						\
				     g_vl_cvalues,						\
				     g_vl_flags);						\
} G_STMT_END


/**
 * G_VALUE_COLLECT_FORMAT_MAX_LENGTH:
 * 
 * The maximal number of #GTypeCValues which can be collected for a 
 * single #GValue.
 */
#define	G_VALUE_COLLECT_FORMAT_MAX_LENGTH	(8)

G_END_DECLS

#endif /* __G_VALUE_COLLECTOR_H__ */
