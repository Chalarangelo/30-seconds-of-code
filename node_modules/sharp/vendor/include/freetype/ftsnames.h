/***************************************************************************/
/*                                                                         */
/*  ftsnames.h                                                             */
/*                                                                         */
/*    Simple interface to access SFNT `name' tables (which are used        */
/*    to hold font names, copyright info, notices, etc.) (specification).  */
/*                                                                         */
/*    This is _not_ used to retrieve glyph names!                          */
/*                                                                         */
/*  Copyright 1996-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTSNAMES_H_
#define FTSNAMES_H_


#include <ft2build.h>
#include FT_FREETYPE_H
#include FT_PARAMETER_TAGS_H

#ifdef FREETYPE_H
#error "freetype.h of FreeType 1 has been loaded!"
#error "Please fix the directory search order for header files"
#error "so that freetype.h of FreeType 2 is found first."
#endif


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    sfnt_names                                                         */
  /*                                                                       */
  /* <Title>                                                               */
  /*    SFNT Names                                                         */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Access the names embedded in TrueType and OpenType files.          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The TrueType and OpenType specifications allow the inclusion of    */
  /*    a special names table (`name') in font files.  This table contains */
  /*    textual (and internationalized) information regarding the font,    */
  /*    like family name, copyright, version, etc.                         */
  /*                                                                       */
  /*    The definitions below are used to access them if available.        */
  /*                                                                       */
  /*    Note that this has nothing to do with glyph names!                 */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_SfntName                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to model an SFNT `name' table entry.              */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    platform_id :: The platform ID for `string'.                       */
  /*                   See @TT_PLATFORM_XXX for possible values.           */
  /*                                                                       */
  /*    encoding_id :: The encoding ID for `string'.                       */
  /*                   See @TT_APPLE_ID_XXX, @TT_MAC_ID_XXX,               */
  /*                   @TT_ISO_ID_XXX, @TT_MS_ID_XXX, and @TT_ADOBE_ID_XXX */
  /*                   for possible values.                                */
  /*                                                                       */
  /*    language_id :: The language ID for `string'.                       */
  /*                   See @TT_MAC_LANGID_XXX and @TT_MS_LANGID_XXX for    */
  /*                   possible values.                                    */
  /*                                                                       */
  /*                   Registered OpenType values for `language_id' are    */
  /*                   always smaller than 0x8000; values equal or larger  */
  /*                   than 0x8000 usually indicate a language tag string  */
  /*                   (introduced in OpenType version 1.6).  Use function */
  /*                   @FT_Get_Sfnt_LangTag with `language_id' as its      */
  /*                   argument to retrieve the associated language tag.   */
  /*                                                                       */
  /*    name_id     :: An identifier for `string'.                         */
  /*                   See @TT_NAME_ID_XXX for possible values.            */
  /*                                                                       */
  /*    string      :: The `name' string.  Note that its format differs    */
  /*                   depending on the (platform,encoding) pair, being    */
  /*                   either a string of bytes (without a terminating     */
  /*                   NULL byte) or containing UTF-16BE entities.         */
  /*                                                                       */
  /*    string_len  :: The length of `string' in bytes.                    */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Please refer to the TrueType or OpenType specification for more    */
  /*    details.                                                           */
  /*                                                                       */
  typedef struct  FT_SfntName_
  {
    FT_UShort  platform_id;
    FT_UShort  encoding_id;
    FT_UShort  language_id;
    FT_UShort  name_id;

    FT_Byte*   string;      /* this string is *not* null-terminated! */
    FT_UInt    string_len;  /* in bytes                              */

  } FT_SfntName;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Sfnt_Name_Count                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Retrieve the number of name strings in the SFNT `name' table.      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face :: A handle to the source face.                               */
  /*                                                                       */
  /* <Return>                                                              */
  /*    The number of strings in the `name' table.                         */
  /*                                                                       */
  FT_EXPORT( FT_UInt )
  FT_Get_Sfnt_Name_Count( FT_Face  face );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Sfnt_Name                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Retrieve a string of the SFNT `name' table for a given index.      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face  :: A handle to the source face.                              */
  /*                                                                       */
  /*    idx   :: The index of the `name' string.                           */
  /*                                                                       */
  /* <Output>                                                              */
  /*    aname :: The indexed @FT_SfntName structure.                       */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The `string' array returned in the `aname' structure is not        */
  /*    null-terminated.  Note that you don't have to deallocate `string'  */
  /*    by yourself; FreeType takes care of it if you call @FT_Done_Face.  */
  /*                                                                       */
  /*    Use @FT_Get_Sfnt_Name_Count to get the total number of available   */
  /*    `name' table entries, then do a loop until you get the right       */
  /*    platform, encoding, and name ID.                                   */
  /*                                                                       */
  /*    `name' table format~1 entries can use language tags also, see      */
  /*    @FT_Get_Sfnt_LangTag.                                              */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Sfnt_Name( FT_Face       face,
                    FT_UInt       idx,
                    FT_SfntName  *aname );


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_SfntLangTag                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to model a language tag entry from an SFNT `name'      */
  /*    table.                                                             */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    string      :: The language tag string, encoded in UTF-16BE        */
  /*                   (without trailing NULL bytes).                      */
  /*                                                                       */
  /*    string_len  :: The length of `string' in *bytes*.                  */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Please refer to the TrueType or OpenType specification for more    */
  /*    details.                                                           */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.8                                                                */
  /*                                                                       */
  typedef struct  FT_SfntLangTag_
  {
    FT_Byte*  string;      /* this string is *not* null-terminated! */
    FT_UInt   string_len;  /* in bytes                              */

  } FT_SfntLangTag;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Sfnt_LangTag                                                */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Retrieve the language tag associated with a language ID of an SFNT */
  /*    `name' table entry.                                                */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face     :: A handle to the source face.                           */
  /*                                                                       */
  /*    langID   :: The language ID, as returned by @FT_Get_Sfnt_Name.     */
  /*                This is always a value larger than 0x8000.             */
  /*                                                                       */
  /* <Output>                                                              */
  /*    alangTag :: The language tag associated with the `name' table      */
  /*                entry's language ID.                                   */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The `string' array returned in the `alangTag' structure is not     */
  /*    null-terminated.  Note that you don't have to deallocate `string'  */
  /*    by yourself; FreeType takes care of it if you call @FT_Done_Face.  */
  /*                                                                       */
  /*    Only `name' table format~1 supports language tags.  For format~0   */
  /*    tables, this function always returns FT_Err_Invalid_Table.  For    */
  /*    invalid format~1 language ID values, FT_Err_Invalid_Argument is    */
  /*    returned.                                                          */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.8                                                                */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Sfnt_LangTag( FT_Face          face,
                       FT_UInt          langID,
                       FT_SfntLangTag  *alangTag );


  /* */


FT_END_HEADER

#endif /* FTSNAMES_H_ */


/* END */
