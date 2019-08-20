/* Pango
 * pango-attributes.h: Attributed text
 *
 * Copyright (C) 2000 Red Hat Software
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

#ifndef __PANGO_ATTRIBUTES_H__
#define __PANGO_ATTRIBUTES_H__

#include <pango/pango-font.h>
#include <glib-object.h>

G_BEGIN_DECLS

/* PangoColor */

typedef struct _PangoColor PangoColor;

/**
 * PangoColor:
 * @red: value of red component
 * @green: value of green component
 * @blue: value of blue component
 *
 * The #PangoColor structure is used to
 * represent a color in an uncalibrated RGB color-space.
 */
struct _PangoColor
{
  guint16 red;
  guint16 green;
  guint16 blue;
};

/**
 * PANGO_TYPE_COLOR:
 *
 * The #GObject type for #PangoColor.
 */
#define PANGO_TYPE_COLOR pango_color_get_type ()
PANGO_AVAILABLE_IN_ALL
GType       pango_color_get_type (void) G_GNUC_CONST;

PANGO_AVAILABLE_IN_ALL
PangoColor *pango_color_copy     (const PangoColor *src);
PANGO_AVAILABLE_IN_ALL
void        pango_color_free     (PangoColor       *color);
PANGO_AVAILABLE_IN_ALL
gboolean    pango_color_parse    (PangoColor       *color,
				  const char       *spec);
PANGO_AVAILABLE_IN_1_16
gchar      *pango_color_to_string(const PangoColor *color);


/* Attributes */

typedef struct _PangoAttribute    PangoAttribute;
typedef struct _PangoAttrClass    PangoAttrClass;

typedef struct _PangoAttrString   PangoAttrString;
typedef struct _PangoAttrLanguage PangoAttrLanguage;
typedef struct _PangoAttrInt      PangoAttrInt;
typedef struct _PangoAttrSize     PangoAttrSize;
typedef struct _PangoAttrFloat    PangoAttrFloat;
typedef struct _PangoAttrColor    PangoAttrColor;
typedef struct _PangoAttrFontDesc PangoAttrFontDesc;
typedef struct _PangoAttrShape    PangoAttrShape;
typedef struct _PangoAttrFontFeatures PangoAttrFontFeatures;

/**
 * PANGO_TYPE_ATTR_LIST:
 *
 * The #GObject type for #PangoAttrList.
 */
#define PANGO_TYPE_ATTR_LIST pango_attr_list_get_type ()
/**
 * PangoAttrIterator:
 *
 * The #PangoAttrIterator structure is used to represent an
 * iterator through a #PangoAttrList. A new iterator is created
 * with pango_attr_list_get_iterator(). Once the iterator
 * is created, it can be advanced through the style changes
 * in the text using pango_attr_iterator_next(). At each
 * style change, the range of the current style segment and the
 * attributes currently in effect can be queried.
 */
/**
 * PangoAttrList:
 *
 * The #PangoAttrList structure represents a list of attributes
 * that apply to a section of text. The attributes are, in general,
 * allowed to overlap in an arbitrary fashion, however, if the
 * attributes are manipulated only through pango_attr_list_change(),
 * the overlap between properties will meet stricter criteria.
 *
 * Since the #PangoAttrList structure is stored as a linear list,
 * it is not suitable for storing attributes for large amounts
 * of text. In general, you should not use a single #PangoAttrList
 * for more than one paragraph of text.
 */
typedef struct _PangoAttrList     PangoAttrList;
typedef struct _PangoAttrIterator PangoAttrIterator;

/**
 * PangoAttrType:
 * @PANGO_ATTR_INVALID: does not happen
 * @PANGO_ATTR_LANGUAGE: language (#PangoAttrLanguage)
 * @PANGO_ATTR_FAMILY: font family name list (#PangoAttrString)
 * @PANGO_ATTR_STYLE: font slant style (#PangoAttrInt)
 * @PANGO_ATTR_WEIGHT: font weight (#PangoAttrInt)
 * @PANGO_ATTR_VARIANT: font variant (normal or small caps) (#PangoAttrInt)
 * @PANGO_ATTR_STRETCH: font stretch (#PangoAttrInt)
 * @PANGO_ATTR_SIZE: font size in points scaled by %PANGO_SCALE (#PangoAttrInt)
 * @PANGO_ATTR_FONT_DESC: font description (#PangoAttrFontDesc)
 * @PANGO_ATTR_FOREGROUND: foreground color (#PangoAttrColor)
 * @PANGO_ATTR_BACKGROUND: background color (#PangoAttrColor)
 * @PANGO_ATTR_UNDERLINE: whether the text has an underline (#PangoAttrInt)
 * @PANGO_ATTR_STRIKETHROUGH: whether the text is struck-through (#PangoAttrInt)
 * @PANGO_ATTR_RISE: baseline displacement (#PangoAttrInt)
 * @PANGO_ATTR_SHAPE: shape (#PangoAttrShape)
 * @PANGO_ATTR_SCALE: font size scale factor (#PangoAttrFloat)
 * @PANGO_ATTR_FALLBACK: whether fallback is enabled (#PangoAttrInt)
 * @PANGO_ATTR_LETTER_SPACING: letter spacing (#PangoAttrInt)
 * @PANGO_ATTR_UNDERLINE_COLOR: underline color (#PangoAttrColor)
 * @PANGO_ATTR_STRIKETHROUGH_COLOR: strikethrough color (#PangoAttrColor)
 * @PANGO_ATTR_ABSOLUTE_SIZE: font size in pixels scaled by %PANGO_SCALE (#PangoAttrInt)
 * @PANGO_ATTR_GRAVITY: base text gravity (#PangoAttrInt)
 * @PANGO_ATTR_GRAVITY_HINT: gravity hint (#PangoAttrInt)
 * @PANGO_ATTR_FONT_FEATURES: OpenType font features (#PangoAttrString). Since 1.38
 * @PANGO_ATTR_FOREGROUND_ALPHA: foreground alpha (#PangoAttrInt). Since 1.38
 * @PANGO_ATTR_BACKGROUND_ALPHA: background alpha (#PangoAttrInt). Since 1.38
 *
 * The #PangoAttrType
 * distinguishes between different types of attributes. Along with the
 * predefined values, it is possible to allocate additional values
 * for custom attributes using pango_attr_type_register(). The predefined
 * values are given below. The type of structure used to store the
 * attribute is listed in parentheses after the description.
 */
typedef enum
{
  PANGO_ATTR_INVALID,           /* 0 is an invalid attribute type */
  PANGO_ATTR_LANGUAGE,		/* PangoAttrLanguage */
  PANGO_ATTR_FAMILY,		/* PangoAttrString */
  PANGO_ATTR_STYLE,		/* PangoAttrInt */
  PANGO_ATTR_WEIGHT,		/* PangoAttrInt */
  PANGO_ATTR_VARIANT,		/* PangoAttrInt */
  PANGO_ATTR_STRETCH,		/* PangoAttrInt */
  PANGO_ATTR_SIZE,		/* PangoAttrSize */
  PANGO_ATTR_FONT_DESC,		/* PangoAttrFontDesc */
  PANGO_ATTR_FOREGROUND,	/* PangoAttrColor */
  PANGO_ATTR_BACKGROUND,	/* PangoAttrColor */
  PANGO_ATTR_UNDERLINE,		/* PangoAttrInt */
  PANGO_ATTR_STRIKETHROUGH,	/* PangoAttrInt */
  PANGO_ATTR_RISE,		/* PangoAttrInt */
  PANGO_ATTR_SHAPE,		/* PangoAttrShape */
  PANGO_ATTR_SCALE,             /* PangoAttrFloat */
  PANGO_ATTR_FALLBACK,          /* PangoAttrInt */
  PANGO_ATTR_LETTER_SPACING,    /* PangoAttrInt */
  PANGO_ATTR_UNDERLINE_COLOR,	/* PangoAttrColor */
  PANGO_ATTR_STRIKETHROUGH_COLOR,/* PangoAttrColor */
  PANGO_ATTR_ABSOLUTE_SIZE,	/* PangoAttrSize */
  PANGO_ATTR_GRAVITY,		/* PangoAttrInt */
  PANGO_ATTR_GRAVITY_HINT,	/* PangoAttrInt */
  PANGO_ATTR_FONT_FEATURES,	/* PangoAttrString */
  PANGO_ATTR_FOREGROUND_ALPHA,	/* PangoAttrInt */
  PANGO_ATTR_BACKGROUND_ALPHA	/* PangoAttrInt */
} PangoAttrType;

/**
 * PangoUnderline:
 * @PANGO_UNDERLINE_NONE: no underline should be drawn
 * @PANGO_UNDERLINE_SINGLE: a single underline should be drawn
 * @PANGO_UNDERLINE_DOUBLE: a double underline should be drawn
 * @PANGO_UNDERLINE_LOW: a single underline should be drawn at a position
 * beneath the ink extents of the text being
 * underlined. This should be used only for underlining
 * single characters, such as for keyboard
 * accelerators. %PANGO_UNDERLINE_SINGLE should
 * be used for extended portions of text.
 * @PANGO_UNDERLINE_ERROR: a wavy underline should be drawn below.
 * This underline is typically used to indicate
 * an error such as a possilble mispelling; in some
 * cases a contrasting color may automatically
 * be used. This type of underlining is available since Pango 1.4.
 *
 * The #PangoUnderline enumeration is used to specify
 * whether text should be underlined, and if so, the type
 * of underlining.
 */
typedef enum {
  PANGO_UNDERLINE_NONE,
  PANGO_UNDERLINE_SINGLE,
  PANGO_UNDERLINE_DOUBLE,
  PANGO_UNDERLINE_LOW,
  PANGO_UNDERLINE_ERROR
} PangoUnderline;

/**
 * PANGO_ATTR_INDEX_FROM_TEXT_BEGINNING:
 *
 * This value can be used to set the start_index member of a #PangoAttribute
 * such that the attribute covers from the beginning of the text.
 *
 * Since: 1.24
 */
/**
 * PANGO_ATTR_INDEX_TO_TEXT_END:
 *
 * This value can be used to set the end_index member of a #PangoAttribute
 * such that the attribute covers to the end of the text.
 *
 * Since: 1.24
 */
#define PANGO_ATTR_INDEX_FROM_TEXT_BEGINNING	0
#define PANGO_ATTR_INDEX_TO_TEXT_END		G_MAXUINT

/**
 * PangoAttribute:
 * @klass: the class structure holding information about the type of the attribute
 * @start_index: the start index of the range (in bytes).
 * @end_index: end index of the range (in bytes). The character at this index
 * is not included in the range.
 *
 * The #PangoAttribute structure represents the common portions of all
 * attributes. Particular types of attributes include this structure
 * as their initial portion. The common portion of the attribute holds
 * the range to which the value in the type-specific part of the attribute
 * applies and should be initialized using pango_attribute_init().
 * By default an attribute will have an all-inclusive range of [0,%G_MAXUINT].
 */
struct _PangoAttribute
{
  const PangoAttrClass *klass;
  guint start_index;	/* in bytes */
  guint end_index;	/* in bytes. The character at this index is not included */
};

/**
 * PangoAttrFilterFunc:
 * @attribute: a Pango attribute
 * @user_data: user data passed to the function
 *
 * Type of a function filtering a list of attributes.
 *
 * Return value: %TRUE if the attribute should be selected for
 * filtering, %FALSE otherwise.
 **/
typedef gboolean (*PangoAttrFilterFunc) (PangoAttribute *attribute,
					 gpointer        user_data);

/**
 * PangoAttrDataCopyFunc:
 * @user_data: user data to copy
 *
 * Type of a function that can duplicate user data for an attribute.
 *
 * Return value: new copy of @user_data.
 **/
typedef gpointer (*PangoAttrDataCopyFunc) (gconstpointer user_data);

/**
 * PangoAttrClass:
 * @type: the type ID for this attribute
 * @copy: function to duplicate an attribute of this type (see pango_attribute_copy())
 * @destroy: function to free an attribute of this type (see pango_attribute_destroy())
 * @equal: function to check two attributes of this type for equality (see pango_attribute_equal())
 *
 * The #PangoAttrClass structure stores the type and operations for
 * a particular type of attribute. The functions in this structure should
 * not be called directly. Instead, one should use the wrapper functions
 * provided for #PangoAttribute.
 */
struct _PangoAttrClass
{
  /*< public >*/
  PangoAttrType type;
  PangoAttribute * (*copy) (const PangoAttribute *attr);
  void             (*destroy) (PangoAttribute *attr);
  gboolean         (*equal) (const PangoAttribute *attr1, const PangoAttribute *attr2);
};

/**
 * PangoAttrString:
 * @attr: the common portion of the attribute
 * @value: the string which is the value of the attribute
 *
 * The #PangoAttrString structure is used to represent attributes with
 * a string value.
 */
struct _PangoAttrString
{
  PangoAttribute attr;
  char *value;
};
/**
 * PangoAttrLanguage:
 * @attr: the common portion of the attribute
 * @value: the #PangoLanguage which is the value of the attribute
 *
 * The #PangoAttrLanguage structure is used to represent attributes that
 * are languages.
 */
struct _PangoAttrLanguage
{
  PangoAttribute attr;
  PangoLanguage *value;
};
/**
 * PangoAttrInt:
 * @attr: the common portion of the attribute
 * @value: the value of the attribute
 *
 * The #PangoAttrInt structure is used to represent attributes with
 * an integer or enumeration value.
 */
struct _PangoAttrInt
{
  PangoAttribute attr;
  int value;
};
/**
 * PangoAttrFloat:
 * @attr: the common portion of the attribute
 * @value: the value of the attribute
 *
 * The #PangoAttrFloat structure is used to represent attributes with
 * a float or double value.
 */
struct _PangoAttrFloat
{
  PangoAttribute attr;
  double value;
};
/**
 * PangoAttrColor:
 * @attr: the common portion of the attribute
 * @color: the #PangoColor which is the value of the attribute
 *
 * The #PangoAttrColor structure is used to represent attributes that
 * are colors.
 */
struct _PangoAttrColor
{
  PangoAttribute attr;
  PangoColor color;
};

/**
 * PangoAttrSize:
 * @attr: the common portion of the attribute
 * @size: size of font, in units of 1/%PANGO_SCALE of a point (for
 * %PANGO_ATTR_SIZE) or of a device uni (for %PANGO_ATTR_ABSOLUTE_SIZE)
 * @absolute: whether the font size is in device units or points.
 * This field is only present for compatibility with Pango-1.8.0
 * (%PANGO_ATTR_ABSOLUTE_SIZE was added in 1.8.1); and always will
 * be %FALSE for %PANGO_ATTR_SIZE and %TRUE for %PANGO_ATTR_ABSOLUTE_SIZE.
 *
 * The #PangoAttrSize structure is used to represent attributes which
 * set font size.
 */
struct _PangoAttrSize
{
  PangoAttribute attr;
  int size;
  guint absolute : 1;
};

/**
 * PangoAttrShape:
 * @attr: the common portion of the attribute
 * @ink_rect: the ink rectangle to restrict to
 * @logical_rect: the logical rectangle to restrict to
 * @data: user data set (see pango_attr_shape_new_with_data())
 * @copy_func: copy function for the user data
 * @destroy_func: destroy function for the user data
 *
 * The #PangoAttrShape structure is used to represent attributes which
 * impose shape restrictions.
 */
struct _PangoAttrShape
{
  PangoAttribute attr;
  PangoRectangle ink_rect;
  PangoRectangle logical_rect;

  gpointer              data;
  PangoAttrDataCopyFunc copy_func;
  GDestroyNotify        destroy_func;
};

/**
 * PangoAttrFontDesc:
 * @attr: the common portion of the attribute
 * @desc: the font description which is the value of this attribute
 *
 * The #PangoAttrFontDesc structure is used to store an attribute that
 * sets all aspects of the font description at once.
 */
struct _PangoAttrFontDesc
{
  PangoAttribute attr;
  PangoFontDescription *desc;
};

/**
 * PangoAttrFontFeatures:
 * @attr: the common portion of the attribute
 * @features: the featues, as a string in CSS syntax
 *
 * The #PangoAttrFontFeatures structure is used to represent OpenType
 * font features as an attribute.
 *
 * Since: 1.38
 */
struct _PangoAttrFontFeatures
{
  PangoAttribute attr;
  gchar *features;
};

PANGO_AVAILABLE_IN_ALL
PangoAttrType         pango_attr_type_register (const gchar        *name);
PANGO_AVAILABLE_IN_1_22
const char *          pango_attr_type_get_name (PangoAttrType       type) G_GNUC_CONST;

PANGO_AVAILABLE_IN_1_20
void             pango_attribute_init        (PangoAttribute       *attr,
					      const PangoAttrClass *klass);
PANGO_AVAILABLE_IN_ALL
PangoAttribute * pango_attribute_copy        (const PangoAttribute *attr);
PANGO_AVAILABLE_IN_ALL
void             pango_attribute_destroy     (PangoAttribute       *attr);
PANGO_AVAILABLE_IN_ALL
gboolean         pango_attribute_equal       (const PangoAttribute *attr1,
					      const PangoAttribute *attr2) G_GNUC_PURE;

PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_language_new      (PangoLanguage              *language);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_family_new        (const char                 *family);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_foreground_new    (guint16                     red,
					      guint16                     green,
					      guint16                     blue);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_background_new    (guint16                     red,
					      guint16                     green,
					      guint16                     blue);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_size_new          (int                         size);
PANGO_AVAILABLE_IN_1_8
PangoAttribute *pango_attr_size_new_absolute (int                         size);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_style_new         (PangoStyle                  style);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_weight_new        (PangoWeight                 weight);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_variant_new       (PangoVariant                variant);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_stretch_new       (PangoStretch                stretch);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_font_desc_new     (const PangoFontDescription *desc);

PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_underline_new           (PangoUnderline underline);
PANGO_AVAILABLE_IN_1_8
PangoAttribute *pango_attr_underline_color_new     (guint16        red,
						    guint16        green,
						    guint16        blue);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_strikethrough_new       (gboolean       strikethrough);
PANGO_AVAILABLE_IN_1_8
PangoAttribute *pango_attr_strikethrough_color_new (guint16        red,
						    guint16        green,
						    guint16        blue);

PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_rise_new          (int                         rise);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_scale_new         (double                      scale_factor);
PANGO_AVAILABLE_IN_1_4
PangoAttribute *pango_attr_fallback_new      (gboolean                    enable_fallback);
PANGO_AVAILABLE_IN_1_6
PangoAttribute *pango_attr_letter_spacing_new (int                        letter_spacing);

PANGO_AVAILABLE_IN_ALL
PangoAttribute *pango_attr_shape_new           (const PangoRectangle       *ink_rect,
						const PangoRectangle       *logical_rect);
PANGO_AVAILABLE_IN_1_8
PangoAttribute *pango_attr_shape_new_with_data (const PangoRectangle       *ink_rect,
						const PangoRectangle       *logical_rect,
						gpointer                    data,
						PangoAttrDataCopyFunc       copy_func,
						GDestroyNotify              destroy_func);

PANGO_AVAILABLE_IN_1_16
PangoAttribute *pango_attr_gravity_new      (PangoGravity     gravity);
PANGO_AVAILABLE_IN_1_16
PangoAttribute *pango_attr_gravity_hint_new (PangoGravityHint hint);
PANGO_AVAILABLE_IN_1_38
PangoAttribute *pango_attr_font_features_new (const gchar *features);
PANGO_AVAILABLE_IN_1_38
PangoAttribute *pango_attr_foreground_alpha_new (guint16 alpha);
PANGO_AVAILABLE_IN_1_38
PangoAttribute *pango_attr_background_alpha_new (guint16 alpha);

PANGO_AVAILABLE_IN_ALL
GType              pango_attr_list_get_type      (void) G_GNUC_CONST;
PANGO_AVAILABLE_IN_ALL
PangoAttrList *    pango_attr_list_new           (void);
PANGO_AVAILABLE_IN_1_10
PangoAttrList *    pango_attr_list_ref           (PangoAttrList  *list);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_list_unref         (PangoAttrList  *list);
PANGO_AVAILABLE_IN_ALL
PangoAttrList *    pango_attr_list_copy          (PangoAttrList  *list);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_list_insert        (PangoAttrList  *list,
						  PangoAttribute *attr);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_list_insert_before (PangoAttrList  *list,
						  PangoAttribute *attr);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_list_change        (PangoAttrList  *list,
						  PangoAttribute *attr);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_list_splice        (PangoAttrList  *list,
						  PangoAttrList  *other,
						  gint            pos,
						  gint            len);

PANGO_AVAILABLE_IN_1_2
PangoAttrList *pango_attr_list_filter (PangoAttrList       *list,
				       PangoAttrFilterFunc  func,
				       gpointer             data);

PANGO_AVAILABLE_IN_ALL
PangoAttrIterator *pango_attr_list_get_iterator  (PangoAttrList  *list);

PANGO_AVAILABLE_IN_ALL
void               pango_attr_iterator_range    (PangoAttrIterator     *iterator,
						 gint                  *start,
						 gint                  *end);
PANGO_AVAILABLE_IN_ALL
gboolean           pango_attr_iterator_next     (PangoAttrIterator     *iterator);
PANGO_AVAILABLE_IN_ALL
PangoAttrIterator *pango_attr_iterator_copy     (PangoAttrIterator     *iterator);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_iterator_destroy  (PangoAttrIterator     *iterator);
PANGO_AVAILABLE_IN_ALL
PangoAttribute *   pango_attr_iterator_get      (PangoAttrIterator     *iterator,
						 PangoAttrType          type);
PANGO_AVAILABLE_IN_ALL
void               pango_attr_iterator_get_font (PangoAttrIterator     *iterator,
						 PangoFontDescription  *desc,
						 PangoLanguage        **language,
						 GSList               **extra_attrs);
PANGO_AVAILABLE_IN_1_2
GSList *          pango_attr_iterator_get_attrs (PangoAttrIterator     *iterator);


PANGO_AVAILABLE_IN_ALL
gboolean pango_parse_markup (const char                 *markup_text,
			     int                         length,
			     gunichar                    accel_marker,
			     PangoAttrList             **attr_list,
			     char                      **text,
			     gunichar                   *accel_char,
			     GError                    **error);

PANGO_AVAILABLE_IN_1_32
GMarkupParseContext * pango_markup_parser_new (gunichar               accel_marker);
PANGO_AVAILABLE_IN_1_32
gboolean              pango_markup_parser_finish (GMarkupParseContext   *context,
                                                  PangoAttrList        **attr_list,
                                                  char                 **text,
                                                  gunichar              *accel_char,
                                                  GError               **error);

G_END_DECLS

#endif /* __PANGO_ATTRIBUTES_H__ */
