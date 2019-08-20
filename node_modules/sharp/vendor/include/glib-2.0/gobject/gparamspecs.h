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
 * gparamspecs.h: GLib default param specs
 */
#ifndef __G_PARAMSPECS_H__
#define __G_PARAMSPECS_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include        <gobject/gvalue.h>
#include        <gobject/genums.h>
#include        <gobject/gboxed.h>
#include        <gobject/gobject.h>

G_BEGIN_DECLS

/* --- type macros --- */
/**
 * G_TYPE_PARAM_CHAR:
 * 
 * The #GType of #GParamSpecChar.
 */
#define	G_TYPE_PARAM_CHAR		   (g_param_spec_types[0])
/**
 * G_IS_PARAM_SPEC_CHAR:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_CHAR.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_CHAR(pspec)        (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_CHAR))
/**
 * G_PARAM_SPEC_CHAR:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecChar.
 */
#define G_PARAM_SPEC_CHAR(pspec)           (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_CHAR, GParamSpecChar))

/**
 * G_TYPE_PARAM_UCHAR:
 * 
 * The #GType of #GParamSpecUChar.
 */
#define	G_TYPE_PARAM_UCHAR		   (g_param_spec_types[1])
/**
 * G_IS_PARAM_SPEC_UCHAR:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_UCHAR.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_UCHAR(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_UCHAR))
/**
 * G_PARAM_SPEC_UCHAR:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecUChar.
 */
#define G_PARAM_SPEC_UCHAR(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_UCHAR, GParamSpecUChar))

/**
 * G_TYPE_PARAM_BOOLEAN:
 * 
 * The #GType of #GParamSpecBoolean.
 */
#define	G_TYPE_PARAM_BOOLEAN		   (g_param_spec_types[2])
/**
 * G_IS_PARAM_SPEC_BOOLEAN:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_BOOLEAN.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_BOOLEAN(pspec)     (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_BOOLEAN))
/**
 * G_PARAM_SPEC_BOOLEAN:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecBoolean.
 */
#define G_PARAM_SPEC_BOOLEAN(pspec)        (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_BOOLEAN, GParamSpecBoolean))

/**
 * G_TYPE_PARAM_INT:
 * 
 * The #GType of #GParamSpecInt.
 */
#define	G_TYPE_PARAM_INT		   (g_param_spec_types[3])
/**
 * G_IS_PARAM_SPEC_INT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_INT.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_INT(pspec)         (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_INT))
/**
 * G_PARAM_SPEC_INT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecInt.
 */
#define G_PARAM_SPEC_INT(pspec)            (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_INT, GParamSpecInt))

/**
 * G_TYPE_PARAM_UINT:
 * 
 * The #GType of #GParamSpecUInt.
 */
#define	G_TYPE_PARAM_UINT		   (g_param_spec_types[4])
/**
 * G_IS_PARAM_SPEC_UINT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_UINT.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_UINT(pspec)        (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_UINT))
/**
 * G_PARAM_SPEC_UINT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecUInt.
 */
#define G_PARAM_SPEC_UINT(pspec)           (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_UINT, GParamSpecUInt))

/**
 * G_TYPE_PARAM_LONG:
 * 
 * The #GType of #GParamSpecLong.
 */
#define	G_TYPE_PARAM_LONG		   (g_param_spec_types[5])
/**
 * G_IS_PARAM_SPEC_LONG:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_LONG.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_LONG(pspec)        (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_LONG))
/**
 * G_PARAM_SPEC_LONG:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecLong.
 */
#define G_PARAM_SPEC_LONG(pspec)           (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_LONG, GParamSpecLong))

/**
 * G_TYPE_PARAM_ULONG:
 * 
 * The #GType of #GParamSpecULong.
 */
#define	G_TYPE_PARAM_ULONG		   (g_param_spec_types[6])
/**
 * G_IS_PARAM_SPEC_ULONG:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_ULONG.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_ULONG(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_ULONG))
/**
 * G_PARAM_SPEC_ULONG:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecULong.
 */
#define G_PARAM_SPEC_ULONG(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_ULONG, GParamSpecULong))

/**
 * G_TYPE_PARAM_INT64:
 * 
 * The #GType of #GParamSpecInt64.
 */
#define	G_TYPE_PARAM_INT64		   (g_param_spec_types[7])
/**
 * G_IS_PARAM_SPEC_INT64:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_INT64.
 *
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_INT64(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_INT64))
/**
 * G_PARAM_SPEC_INT64:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecInt64.
 */
#define G_PARAM_SPEC_INT64(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_INT64, GParamSpecInt64))

/**
 * G_TYPE_PARAM_UINT64:
 * 
 * The #GType of #GParamSpecUInt64.
 */
#define	G_TYPE_PARAM_UINT64		   (g_param_spec_types[8])
/**
 * G_IS_PARAM_SPEC_UINT64:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_UINT64.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_UINT64(pspec)      (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_UINT64))
/**
 * G_PARAM_SPEC_UINT64:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecUInt64.
 */
#define G_PARAM_SPEC_UINT64(pspec)         (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_UINT64, GParamSpecUInt64))

/**
 * G_TYPE_PARAM_UNICHAR:
 * 
 * The #GType of #GParamSpecUnichar.
 */
#define	G_TYPE_PARAM_UNICHAR		   (g_param_spec_types[9])
/**
 * G_PARAM_SPEC_UNICHAR:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecUnichar.
 */
#define G_PARAM_SPEC_UNICHAR(pspec)        (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_UNICHAR, GParamSpecUnichar))
/**
 * G_IS_PARAM_SPEC_UNICHAR:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_UNICHAR.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_UNICHAR(pspec)     (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_UNICHAR))

/**
 * G_TYPE_PARAM_ENUM:
 * 
 * The #GType of #GParamSpecEnum.
 */
#define	G_TYPE_PARAM_ENUM		   (g_param_spec_types[10])
/**
 * G_IS_PARAM_SPEC_ENUM:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_ENUM.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_ENUM(pspec)        (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_ENUM))
/**
 * G_PARAM_SPEC_ENUM:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecEnum.
 */
#define G_PARAM_SPEC_ENUM(pspec)           (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_ENUM, GParamSpecEnum))

/**
 * G_TYPE_PARAM_FLAGS:
 * 
 * The #GType of #GParamSpecFlags.
 */
#define	G_TYPE_PARAM_FLAGS		   (g_param_spec_types[11])
/**
 * G_IS_PARAM_SPEC_FLAGS:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_FLAGS.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_FLAGS(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_FLAGS))
/**
 * G_PARAM_SPEC_FLAGS:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecFlags.
 */
#define G_PARAM_SPEC_FLAGS(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_FLAGS, GParamSpecFlags))

/**
 * G_TYPE_PARAM_FLOAT:
 * 
 * The #GType of #GParamSpecFloat.
 */
#define	G_TYPE_PARAM_FLOAT		   (g_param_spec_types[12])
/**
 * G_IS_PARAM_SPEC_FLOAT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_FLOAT.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_FLOAT(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_FLOAT))
/**
 * G_PARAM_SPEC_FLOAT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecFloat.
 */
#define G_PARAM_SPEC_FLOAT(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_FLOAT, GParamSpecFloat))

/**
 * G_TYPE_PARAM_DOUBLE:
 * 
 * The #GType of #GParamSpecDouble.
 */
#define	G_TYPE_PARAM_DOUBLE		   (g_param_spec_types[13])
/**
 * G_IS_PARAM_SPEC_DOUBLE:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_DOUBLE.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_DOUBLE(pspec)      (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_DOUBLE))
/**
 * G_PARAM_SPEC_DOUBLE:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecDouble.
 */
#define G_PARAM_SPEC_DOUBLE(pspec)         (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_DOUBLE, GParamSpecDouble))

/**
 * G_TYPE_PARAM_STRING:
 * 
 * The #GType of #GParamSpecString.
 */
#define	G_TYPE_PARAM_STRING		   (g_param_spec_types[14])
/**
 * G_IS_PARAM_SPEC_STRING:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_STRING.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_STRING(pspec)      (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_STRING))
/**
 * G_PARAM_SPEC_STRING:
 * @pspec: a valid #GParamSpec instance
 * 
 * Casts a #GParamSpec instance into a #GParamSpecString.
 */
#define G_PARAM_SPEC_STRING(pspec)         (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_STRING, GParamSpecString))

/**
 * G_TYPE_PARAM_PARAM:
 * 
 * The #GType of #GParamSpecParam.
 */
#define	G_TYPE_PARAM_PARAM		   (g_param_spec_types[15])
/**
 * G_IS_PARAM_SPEC_PARAM:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_PARAM.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_PARAM(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_PARAM))
/**
 * G_PARAM_SPEC_PARAM:
 * @pspec: a valid #GParamSpec instance
 * 
 * Casts a #GParamSpec instance into a #GParamSpecParam.
 */
#define G_PARAM_SPEC_PARAM(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_PARAM, GParamSpecParam))

/**
 * G_TYPE_PARAM_BOXED:
 * 
 * The #GType of #GParamSpecBoxed.
 */
#define	G_TYPE_PARAM_BOXED		   (g_param_spec_types[16])
/**
 * G_IS_PARAM_SPEC_BOXED:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_BOXED.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_BOXED(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_BOXED))
/**
 * G_PARAM_SPEC_BOXED:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecBoxed.
 */
#define G_PARAM_SPEC_BOXED(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_BOXED, GParamSpecBoxed))

/**
 * G_TYPE_PARAM_POINTER:
 * 
 * The #GType of #GParamSpecPointer.
 */
#define	G_TYPE_PARAM_POINTER		   (g_param_spec_types[17])
/**
 * G_IS_PARAM_SPEC_POINTER:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_POINTER.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_POINTER(pspec)     (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_POINTER))
/**
 * G_PARAM_SPEC_POINTER:
 * @pspec: a valid #GParamSpec instance
 * 
 * Casts a #GParamSpec instance into a #GParamSpecPointer.
 */
#define G_PARAM_SPEC_POINTER(pspec)        (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_POINTER, GParamSpecPointer))

/**
 * G_TYPE_PARAM_VALUE_ARRAY:
 * 
 * The #GType of #GParamSpecValueArray.
 *
 * Deprecated: 2.32: Use #GArray instead of #GValueArray
 */
#define	G_TYPE_PARAM_VALUE_ARRAY	   (g_param_spec_types[18])
/**
 * G_IS_PARAM_SPEC_VALUE_ARRAY:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_VALUE_ARRAY.
 * 
 * Returns: %TRUE on success.
 *
 * Deprecated: 2.32: Use #GArray instead of #GValueArray
 */
#define G_IS_PARAM_SPEC_VALUE_ARRAY(pspec) (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_VALUE_ARRAY))
/**
 * G_PARAM_SPEC_VALUE_ARRAY:
 * @pspec: a valid #GParamSpec instance
 * 
 * Cast a #GParamSpec instance into a #GParamSpecValueArray.
 *
 * Deprecated: 2.32: Use #GArray instead of #GValueArray
 */
#define G_PARAM_SPEC_VALUE_ARRAY(pspec)    (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_VALUE_ARRAY, GParamSpecValueArray))

/**
 * G_TYPE_PARAM_OBJECT:
 * 
 * The #GType of #GParamSpecObject.
 */
#define	G_TYPE_PARAM_OBJECT		   (g_param_spec_types[19])
/**
 * G_IS_PARAM_SPEC_OBJECT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_OBJECT.
 * 
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_OBJECT(pspec)      (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_OBJECT))
/**
 * G_PARAM_SPEC_OBJECT:
 * @pspec: a valid #GParamSpec instance
 * 
 * Casts a #GParamSpec instance into a #GParamSpecObject.
 */
#define G_PARAM_SPEC_OBJECT(pspec)         (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_OBJECT, GParamSpecObject))

/**
 * G_TYPE_PARAM_OVERRIDE:
 * 
 * The #GType of #GParamSpecOverride.
 * 
 * Since: 2.4
 */
#define	G_TYPE_PARAM_OVERRIDE		   (g_param_spec_types[20])
/**
 * G_IS_PARAM_SPEC_OVERRIDE:
 * @pspec: a #GParamSpec
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_OVERRIDE.
 * 
 * Since: 2.4
 * Returns: %TRUE on success.
 */
#define G_IS_PARAM_SPEC_OVERRIDE(pspec)    (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_OVERRIDE))
/**
 * G_PARAM_SPEC_OVERRIDE:
 * @pspec: a #GParamSpec
 * 
 * Casts a #GParamSpec into a #GParamSpecOverride.
 * 
 * Since: 2.4
 */
#define G_PARAM_SPEC_OVERRIDE(pspec)       (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_OVERRIDE, GParamSpecOverride))

/**
 * G_TYPE_PARAM_GTYPE:
 * 
 * The #GType of #GParamSpecGType.
 * 
 * Since: 2.10
 */
#define	G_TYPE_PARAM_GTYPE		   (g_param_spec_types[21])
/**
 * G_IS_PARAM_SPEC_GTYPE:
 * @pspec: a #GParamSpec
 * 
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_GTYPE.
 * 
 * Since: 2.10
 * Returns: %TRUE on success. 
 */
#define G_IS_PARAM_SPEC_GTYPE(pspec)       (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_GTYPE))
/**
 * G_PARAM_SPEC_GTYPE:
 * @pspec: a #GParamSpec
 * 
 * Casts a #GParamSpec into a #GParamSpecGType.
 * 
 * Since: 2.10
 */
#define G_PARAM_SPEC_GTYPE(pspec)          (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_GTYPE, GParamSpecGType))

/**
 * G_TYPE_PARAM_VARIANT:
 *
 * The #GType of #GParamSpecVariant.
 *
 * Since: 2.26
 */
#define G_TYPE_PARAM_VARIANT                (g_param_spec_types[22])
/**
 * G_IS_PARAM_SPEC_VARIANT:
 * @pspec: a #GParamSpec
 *
 * Checks whether the given #GParamSpec is of type %G_TYPE_PARAM_VARIANT.
 *
 * Returns: %TRUE on success
 *
 * Since: 2.26
 */
#define G_IS_PARAM_SPEC_VARIANT(pspec)      (G_TYPE_CHECK_INSTANCE_TYPE ((pspec), G_TYPE_PARAM_VARIANT))
/**
 * G_PARAM_SPEC_VARIANT:
 * @pspec: a #GParamSpec
 *
 * Casts a #GParamSpec into a #GParamSpecVariant.
 *
 * Since: 2.26
 */
#define G_PARAM_SPEC_VARIANT(pspec)         (G_TYPE_CHECK_INSTANCE_CAST ((pspec), G_TYPE_PARAM_VARIANT, GParamSpecVariant))

/* --- typedefs & structures --- */
typedef struct _GParamSpecChar       GParamSpecChar;
typedef struct _GParamSpecUChar      GParamSpecUChar;
typedef struct _GParamSpecBoolean    GParamSpecBoolean;
typedef struct _GParamSpecInt        GParamSpecInt;
typedef struct _GParamSpecUInt       GParamSpecUInt;
typedef struct _GParamSpecLong       GParamSpecLong;
typedef struct _GParamSpecULong      GParamSpecULong;
typedef struct _GParamSpecInt64      GParamSpecInt64;
typedef struct _GParamSpecUInt64     GParamSpecUInt64;
typedef struct _GParamSpecUnichar    GParamSpecUnichar;
typedef struct _GParamSpecEnum       GParamSpecEnum;
typedef struct _GParamSpecFlags      GParamSpecFlags;
typedef struct _GParamSpecFloat      GParamSpecFloat;
typedef struct _GParamSpecDouble     GParamSpecDouble;
typedef struct _GParamSpecString     GParamSpecString;
typedef struct _GParamSpecParam      GParamSpecParam;
typedef struct _GParamSpecBoxed      GParamSpecBoxed;
typedef struct _GParamSpecPointer    GParamSpecPointer;
typedef struct _GParamSpecValueArray GParamSpecValueArray;
typedef struct _GParamSpecObject     GParamSpecObject;
typedef struct _GParamSpecOverride   GParamSpecOverride;
typedef struct _GParamSpecGType      GParamSpecGType;
typedef struct _GParamSpecVariant    GParamSpecVariant;

/**
 * GParamSpecChar:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for character properties.
 */
struct _GParamSpecChar
{
  GParamSpec    parent_instance;
  
  gint8         minimum;
  gint8         maximum;
  gint8         default_value;
};
/**
 * GParamSpecUChar:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for unsigned character properties.
 */
struct _GParamSpecUChar
{
  GParamSpec    parent_instance;
  
  guint8        minimum;
  guint8        maximum;
  guint8        default_value;
};
/**
 * GParamSpecBoolean:
 * @parent_instance: private #GParamSpec portion
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for boolean properties.
 */
struct _GParamSpecBoolean
{
  GParamSpec    parent_instance;
  
  gboolean      default_value;
};
/**
 * GParamSpecInt:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for integer properties.
 */
struct _GParamSpecInt
{
  GParamSpec    parent_instance;
  
  gint          minimum;
  gint          maximum;
  gint          default_value;
};
/**
 * GParamSpecUInt:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for unsigned integer properties.
 */
struct _GParamSpecUInt
{
  GParamSpec    parent_instance;
  
  guint         minimum;
  guint         maximum;
  guint         default_value;
};
/**
 * GParamSpecLong:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for long integer properties.
 */
struct _GParamSpecLong
{
  GParamSpec    parent_instance;
  
  glong         minimum;
  glong         maximum;
  glong         default_value;
};
/**
 * GParamSpecULong:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for unsigned long integer properties.
 */
struct _GParamSpecULong
{
  GParamSpec    parent_instance;
  
  gulong        minimum;
  gulong        maximum;
  gulong        default_value;
};
/**
 * GParamSpecInt64:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for 64bit integer properties.
 */
struct _GParamSpecInt64
{
  GParamSpec    parent_instance;
  
  gint64        minimum;
  gint64        maximum;
  gint64        default_value;
};
/**
 * GParamSpecUInt64:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for unsigned 64bit integer properties.
 */
struct _GParamSpecUInt64
{
  GParamSpec    parent_instance;
  
  guint64       minimum;
  guint64       maximum;
  guint64       default_value;
};
/**
 * GParamSpecUnichar:
 * @parent_instance: private #GParamSpec portion
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for unichar (unsigned integer) properties.
 */
struct _GParamSpecUnichar
{
  GParamSpec    parent_instance;
  
  gunichar      default_value;
};
/**
 * GParamSpecEnum:
 * @parent_instance: private #GParamSpec portion
 * @enum_class: the #GEnumClass for the enum
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for enum 
 * properties.
 */
struct _GParamSpecEnum
{
  GParamSpec    parent_instance;
  
  GEnumClass   *enum_class;
  gint          default_value;
};
/**
 * GParamSpecFlags:
 * @parent_instance: private #GParamSpec portion
 * @flags_class: the #GFlagsClass for the flags
 * @default_value: default value for the property specified
 * 
 * A #GParamSpec derived structure that contains the meta data for flags
 * properties.
 */
struct _GParamSpecFlags
{
  GParamSpec    parent_instance;
  
  GFlagsClass  *flags_class;
  guint         default_value;
};
/**
 * GParamSpecFloat:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * @epsilon: values closer than @epsilon will be considered identical
 *  by g_param_values_cmp(); the default value is 1e-30.
 * 
 * A #GParamSpec derived structure that contains the meta data for float properties.
 */
struct _GParamSpecFloat
{
  GParamSpec    parent_instance;
  
  gfloat        minimum;
  gfloat        maximum;
  gfloat        default_value;
  gfloat        epsilon;
};
/**
 * GParamSpecDouble:
 * @parent_instance: private #GParamSpec portion
 * @minimum: minimum value for the property specified
 * @maximum: maximum value for the property specified
 * @default_value: default value for the property specified
 * @epsilon: values closer than @epsilon will be considered identical
 *  by g_param_values_cmp(); the default value is 1e-90.
 * 
 * A #GParamSpec derived structure that contains the meta data for double properties.
 */
struct _GParamSpecDouble
{
  GParamSpec    parent_instance;
  
  gdouble       minimum;
  gdouble       maximum;
  gdouble       default_value;
  gdouble       epsilon;
};
/**
 * GParamSpecString:
 * @parent_instance: private #GParamSpec portion
 * @default_value: default value for the property specified
 * @cset_first: a string containing the allowed values for the first byte
 * @cset_nth: a string containing the allowed values for the subsequent bytes
 * @substitutor: the replacement byte for bytes which don't match @cset_first or @cset_nth.
 * @null_fold_if_empty: replace empty string by %NULL
 * @ensure_non_null: replace %NULL strings by an empty string
 * 
 * A #GParamSpec derived structure that contains the meta data for string
 * properties.
 */
struct _GParamSpecString
{
  GParamSpec    parent_instance;
  
  gchar        *default_value;
  gchar        *cset_first;
  gchar        *cset_nth;
  gchar         substitutor;
  guint         null_fold_if_empty : 1;
  guint         ensure_non_null : 1;
};
/**
 * GParamSpecParam:
 * @parent_instance: private #GParamSpec portion
 * 
 * A #GParamSpec derived structure that contains the meta data for %G_TYPE_PARAM
 * properties.
 */
struct _GParamSpecParam
{
  GParamSpec    parent_instance;
};
/**
 * GParamSpecBoxed:
 * @parent_instance: private #GParamSpec portion
 * 
 * A #GParamSpec derived structure that contains the meta data for boxed properties.
 */
struct _GParamSpecBoxed
{
  GParamSpec    parent_instance;
};
/**
 * GParamSpecPointer:
 * @parent_instance: private #GParamSpec portion
 * 
 * A #GParamSpec derived structure that contains the meta data for pointer properties.
 */
struct _GParamSpecPointer
{
  GParamSpec    parent_instance;
};
/**
 * GParamSpecValueArray:
 * @parent_instance: private #GParamSpec portion
 * @element_spec: a #GParamSpec describing the elements contained in arrays of this property, may be %NULL
 * @fixed_n_elements: if greater than 0, arrays of this property will always have this many elements
 * 
 * A #GParamSpec derived structure that contains the meta data for #GValueArray properties.
 */
struct _GParamSpecValueArray
{
  GParamSpec    parent_instance;
  GParamSpec   *element_spec;
  guint		fixed_n_elements;
};
/**
 * GParamSpecObject:
 * @parent_instance: private #GParamSpec portion
 * 
 * A #GParamSpec derived structure that contains the meta data for object properties.
 */
struct _GParamSpecObject
{
  GParamSpec    parent_instance;
};
/**
 * GParamSpecOverride:
 * 
 * This is a type of #GParamSpec type that simply redirects operations to
 * another paramspec.  All operations other than getting or
 * setting the value are redirected, including accessing the nick and
 * blurb, validating a value, and so forth. See
 * g_param_spec_get_redirect_target() for retrieving the overidden
 * property. #GParamSpecOverride is used in implementing
 * g_object_class_override_property(), and will not be directly useful
 * unless you are implementing a new base type similar to GObject.
 * 
 * Since: 2.4
 */
struct _GParamSpecOverride
{
  /*< private >*/
  GParamSpec    parent_instance;
  GParamSpec   *overridden;
};
/**
 * GParamSpecGType:
 * @parent_instance: private #GParamSpec portion
 * @is_a_type: a #GType whose subtypes can occur as values
 * 
 * A #GParamSpec derived structure that contains the meta data for #GType properties.
 * 
 * Since: 2.10
 */
struct _GParamSpecGType
{
  GParamSpec    parent_instance;
  GType         is_a_type;
};
/**
 * GParamSpecVariant:
 * @parent_instance: private #GParamSpec portion
 * @type: a #GVariantType, or %NULL
 * @default_value: a #GVariant, or %NULL
 *
 * A #GParamSpec derived structure that contains the meta data for #GVariant properties.
 *
 * When comparing values with g_param_values_cmp(), scalar values with the same
 * type will be compared with g_variant_compare(). Other non-%NULL variants will
 * be checked for equality with g_variant_equal(), and their sort order is
 * otherwise undefined. %NULL is ordered before non-%NULL variants. Two %NULL
 * values compare equal.
 *
 * Since: 2.26
 */
struct _GParamSpecVariant
{
  GParamSpec    parent_instance;
  GVariantType *type;
  GVariant     *default_value;

  /*< private >*/
  gpointer      padding[4];
};

/* --- GParamSpec prototypes --- */
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_char	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gint8		  minimum,
					  gint8		  maximum,
					  gint8		  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_uchar	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  guint8	  minimum,
					  guint8	  maximum,
					  guint8	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_boolean	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gboolean	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_int	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gint		  minimum,
					  gint		  maximum,
					  gint		  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_uint	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  guint		  minimum,
					  guint		  maximum,
					  guint		  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_long	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  glong		  minimum,
					  glong		  maximum,
					  glong		  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_ulong	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gulong	  minimum,
					  gulong	  maximum,
					  gulong	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_int64	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gint64       	  minimum,
					  gint64       	  maximum,
					  gint64       	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_uint64	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  guint64	  minimum,
					  guint64	  maximum,
					  guint64	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_unichar      (const gchar    *name,
				          const gchar    *nick,
				          const gchar    *blurb,
				          gunichar	  default_value,
				          GParamFlags     flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_enum	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GType		  enum_type,
					  gint		  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_flags	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GType		  flags_type,
					  guint		  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_float	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gfloat	  minimum,
					  gfloat	  maximum,
					  gfloat	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_double	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  gdouble	  minimum,
					  gdouble	  maximum,
					  gdouble	  default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_string	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  const gchar	 *default_value,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_param	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GType		  param_type,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_boxed	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GType		  boxed_type,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_pointer	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_value_array (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GParamSpec	 *element_spec,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_object	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GType		  object_type,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_override    (const gchar    *name,
					  GParamSpec     *overridden);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_gtype	 (const gchar	 *name,
					  const gchar	 *nick,
					  const gchar	 *blurb,
					  GType           is_a_type,
					  GParamFlags	  flags);
GLIB_AVAILABLE_IN_ALL
GParamSpec*	g_param_spec_variant	 (const gchar        *name,
					  const gchar        *nick,
					  const gchar	     *blurb,
					  const GVariantType *type,
					  GVariant           *default_value,
					  GParamFlags         flags);

/* --- internal --- */
/* We prefix variable declarations so they can
 * properly get exported in windows dlls.
 */
#ifndef GOBJECT_VAR
#  ifdef G_PLATFORM_WIN32
#    ifdef GOBJECT_STATIC_COMPILATION
#      define GOBJECT_VAR extern
#    else /* !GOBJECT_STATIC_COMPILATION */
#      ifdef GOBJECT_COMPILATION
#        ifdef DLL_EXPORT
#          define GOBJECT_VAR __declspec(dllexport)
#        else /* !DLL_EXPORT */
#          define GOBJECT_VAR extern
#        endif /* !DLL_EXPORT */
#      else /* !GOBJECT_COMPILATION */
#        define GOBJECT_VAR extern __declspec(dllimport)
#      endif /* !GOBJECT_COMPILATION */
#    endif /* !GOBJECT_STATIC_COMPILATION */
#  else /* !G_PLATFORM_WIN32 */
#    define GOBJECT_VAR _GLIB_EXTERN
#  endif /* !G_PLATFORM_WIN32 */
#endif /* GOBJECT_VAR */

GOBJECT_VAR GType *g_param_spec_types;

G_END_DECLS

#endif /* __G_PARAMSPECS_H__ */
