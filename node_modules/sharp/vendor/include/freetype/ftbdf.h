/***************************************************************************/
/*                                                                         */
/*  ftbdf.h                                                                */
/*                                                                         */
/*    FreeType API for accessing BDF-specific strings (specification).     */
/*                                                                         */
/*  Copyright 2002-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTBDF_H_
#define FTBDF_H_

#include <ft2build.h>
#include FT_FREETYPE_H

#ifdef FREETYPE_H
#error "freetype.h of FreeType 1 has been loaded!"
#error "Please fix the directory search order for header files"
#error "so that freetype.h of FreeType 2 is found first."
#endif


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    bdf_fonts                                                          */
  /*                                                                       */
  /* <Title>                                                               */
  /*    BDF and PCF Files                                                  */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    BDF and PCF specific API.                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains the declaration of functions specific to BDF */
  /*    and PCF fonts.                                                     */
  /*                                                                       */
  /*************************************************************************/


  /**********************************************************************
   *
   * @enum:
   *    BDF_PropertyType
   *
   * @description:
   *    A list of BDF property types.
   *
   * @values:
   *    BDF_PROPERTY_TYPE_NONE ::
   *      Value~0 is used to indicate a missing property.
   *
   *    BDF_PROPERTY_TYPE_ATOM ::
   *      Property is a string atom.
   *
   *    BDF_PROPERTY_TYPE_INTEGER ::
   *      Property is a 32-bit signed integer.
   *
   *    BDF_PROPERTY_TYPE_CARDINAL ::
   *      Property is a 32-bit unsigned integer.
   */
  typedef enum  BDF_PropertyType_
  {
    BDF_PROPERTY_TYPE_NONE     = 0,
    BDF_PROPERTY_TYPE_ATOM     = 1,
    BDF_PROPERTY_TYPE_INTEGER  = 2,
    BDF_PROPERTY_TYPE_CARDINAL = 3

  } BDF_PropertyType;


  /**********************************************************************
   *
   * @type:
   *    BDF_Property
   *
   * @description:
   *    A handle to a @BDF_PropertyRec structure to model a given
   *    BDF/PCF property.
   */
  typedef struct BDF_PropertyRec_*  BDF_Property;


 /**********************************************************************
  *
  * @struct:
  *    BDF_PropertyRec
  *
  * @description:
  *    This structure models a given BDF/PCF property.
  *
  * @fields:
  *    type ::
  *      The property type.
  *
  *    u.atom ::
  *      The atom string, if type is @BDF_PROPERTY_TYPE_ATOM.  May be
  *      NULL, indicating an empty string.
  *
  *    u.integer ::
  *      A signed integer, if type is @BDF_PROPERTY_TYPE_INTEGER.
  *
  *    u.cardinal ::
  *      An unsigned integer, if type is @BDF_PROPERTY_TYPE_CARDINAL.
  */
  typedef struct  BDF_PropertyRec_
  {
    BDF_PropertyType  type;
    union {
      const char*     atom;
      FT_Int32        integer;
      FT_UInt32       cardinal;

    } u;

  } BDF_PropertyRec;


 /**********************************************************************
  *
  * @function:
  *    FT_Get_BDF_Charset_ID
  *
  * @description:
  *    Retrieve a BDF font character set identity, according to
  *    the BDF specification.
  *
  * @input:
  *    face ::
  *       A handle to the input face.
  *
  * @output:
  *    acharset_encoding ::
  *       Charset encoding, as a C~string, owned by the face.
  *
  *    acharset_registry ::
  *       Charset registry, as a C~string, owned by the face.
  *
  * @return:
  *   FreeType error code.  0~means success.
  *
  * @note:
  *   This function only works with BDF faces, returning an error otherwise.
  */
  FT_EXPORT( FT_Error )
  FT_Get_BDF_Charset_ID( FT_Face       face,
                         const char*  *acharset_encoding,
                         const char*  *acharset_registry );


 /**********************************************************************
  *
  * @function:
  *    FT_Get_BDF_Property
  *
  * @description:
  *    Retrieve a BDF property from a BDF or PCF font file.
  *
  * @input:
  *    face :: A handle to the input face.
  *
  *    name :: The property name.
  *
  * @output:
  *    aproperty :: The property.
  *
  * @return:
  *   FreeType error code.  0~means success.
  *
  * @note:
  *   This function works with BDF _and_ PCF fonts.  It returns an error
  *   otherwise.  It also returns an error if the property is not in the
  *   font.
  *
  *   A `property' is a either key-value pair within the STARTPROPERTIES
  *   ... ENDPROPERTIES block of a BDF font or a key-value pair from the
  *   `info->props' array within a `FontRec' structure of a PCF font.
  *
  *   Integer properties are always stored as `signed' within PCF fonts;
  *   consequently, @BDF_PROPERTY_TYPE_CARDINAL is a possible return value
  *   for BDF fonts only.
  *
  *   In case of error, `aproperty->type' is always set to
  *   @BDF_PROPERTY_TYPE_NONE.
  */
  FT_EXPORT( FT_Error )
  FT_Get_BDF_Property( FT_Face           face,
                       const char*       prop_name,
                       BDF_PropertyRec  *aproperty );

  /* */

FT_END_HEADER

#endif /* FTBDF_H_ */


/* END */
