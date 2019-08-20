/***************************************************************************/
/*                                                                         */
/*  ftwinfnt.h                                                             */
/*                                                                         */
/*    FreeType API for accessing Windows fnt-specific data.                */
/*                                                                         */
/*  Copyright 2003-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTWINFNT_H_
#define FTWINFNT_H_

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
  /*    winfnt_fonts                                                       */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Window FNT Files                                                   */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Windows FNT specific API.                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains the declaration of Windows FNT specific      */
  /*    functions.                                                         */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************
   *
   * @enum:
   *   FT_WinFNT_ID_XXX
   *
   * @description:
   *   A list of valid values for the `charset' byte in
   *   @FT_WinFNT_HeaderRec.  Exact mapping tables for the various cpXXXX
   *   encodings (except for cp1361) can be found at
   *   ftp://ftp.unicode.org/Public in the MAPPINGS/VENDORS/MICSFT/WINDOWS
   *   subdirectory.  cp1361 is roughly a superset of
   *   MAPPINGS/OBSOLETE/EASTASIA/KSC/JOHAB.TXT.
   *
   * @values:
   *   FT_WinFNT_ID_DEFAULT ::
   *     This is used for font enumeration and font creation as a
   *     `don't care' value.  Valid font files don't contain this value.
   *     When querying for information about the character set of the font
   *     that is currently selected into a specified device context, this
   *     return value (of the related Windows API) simply denotes failure.
   *
   *   FT_WinFNT_ID_SYMBOL ::
   *     There is no known mapping table available.
   *
   *   FT_WinFNT_ID_MAC ::
   *     Mac Roman encoding.
   *
   *   FT_WinFNT_ID_OEM ::
   *     From Michael Poettgen <michael@poettgen.de>:
   *
   *       The `Windows Font Mapping' article says that FT_WinFNT_ID_OEM
   *       is used for the charset of vector fonts, like `modern.fon',
   *       `roman.fon', and `script.fon' on Windows.
   *
   *       The `CreateFont' documentation says: The FT_WinFNT_ID_OEM value
   *       specifies a character set that is operating-system dependent.
   *
   *       The `IFIMETRICS' documentation from the `Windows Driver
   *       Development Kit' says: This font supports an OEM-specific
   *       character set.  The OEM character set is system dependent.
   *
   *       In general OEM, as opposed to ANSI (i.e., cp1252), denotes the
   *       second default codepage that most international versions of
   *       Windows have.  It is one of the OEM codepages from
   *
   *         https://msdn.microsoft.com/en-us/goglobal/bb964655,
   *
   *       and is used for the `DOS boxes', to support legacy applications.
   *       A German Windows version for example usually uses ANSI codepage
   *       1252 and OEM codepage 850.
   *
   *   FT_WinFNT_ID_CP874 ::
   *     A superset of Thai TIS 620 and ISO 8859-11.
   *
   *   FT_WinFNT_ID_CP932 ::
   *     A superset of Japanese Shift-JIS (with minor deviations).
   *
   *   FT_WinFNT_ID_CP936 ::
   *     A superset of simplified Chinese GB 2312-1980 (with different
   *     ordering and minor deviations).
   *
   *   FT_WinFNT_ID_CP949 ::
   *     A superset of Korean Hangul KS~C 5601-1987 (with different
   *     ordering and minor deviations).
   *
   *   FT_WinFNT_ID_CP950 ::
   *     A superset of traditional Chinese Big~5 ETen (with different
   *     ordering and minor deviations).
   *
   *   FT_WinFNT_ID_CP1250 ::
   *     A superset of East European ISO 8859-2 (with slightly different
   *     ordering).
   *
   *   FT_WinFNT_ID_CP1251 ::
   *     A superset of Russian ISO 8859-5 (with different ordering).
   *
   *   FT_WinFNT_ID_CP1252 ::
   *     ANSI encoding.  A superset of ISO 8859-1.
   *
   *   FT_WinFNT_ID_CP1253 ::
   *     A superset of Greek ISO 8859-7 (with minor modifications).
   *
   *   FT_WinFNT_ID_CP1254 ::
   *     A superset of Turkish ISO 8859-9.
   *
   *   FT_WinFNT_ID_CP1255 ::
   *     A superset of Hebrew ISO 8859-8 (with some modifications).
   *
   *   FT_WinFNT_ID_CP1256 ::
   *     A superset of Arabic ISO 8859-6 (with different ordering).
   *
   *   FT_WinFNT_ID_CP1257 ::
   *     A superset of Baltic ISO 8859-13 (with some deviations).
   *
   *   FT_WinFNT_ID_CP1258 ::
   *     For Vietnamese.  This encoding doesn't cover all necessary
   *     characters.
   *
   *   FT_WinFNT_ID_CP1361 ::
   *     Korean (Johab).
   */

#define FT_WinFNT_ID_CP1252    0
#define FT_WinFNT_ID_DEFAULT   1
#define FT_WinFNT_ID_SYMBOL    2
#define FT_WinFNT_ID_MAC      77
#define FT_WinFNT_ID_CP932   128
#define FT_WinFNT_ID_CP949   129
#define FT_WinFNT_ID_CP1361  130
#define FT_WinFNT_ID_CP936   134
#define FT_WinFNT_ID_CP950   136
#define FT_WinFNT_ID_CP1253  161
#define FT_WinFNT_ID_CP1254  162
#define FT_WinFNT_ID_CP1258  163
#define FT_WinFNT_ID_CP1255  177
#define FT_WinFNT_ID_CP1256  178
#define FT_WinFNT_ID_CP1257  186
#define FT_WinFNT_ID_CP1251  204
#define FT_WinFNT_ID_CP874   222
#define FT_WinFNT_ID_CP1250  238
#define FT_WinFNT_ID_OEM     255


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_WinFNT_HeaderRec                                                */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Windows FNT Header info.                                           */
  /*                                                                       */
  typedef struct  FT_WinFNT_HeaderRec_
  {
    FT_UShort  version;
    FT_ULong   file_size;
    FT_Byte    copyright[60];
    FT_UShort  file_type;
    FT_UShort  nominal_point_size;
    FT_UShort  vertical_resolution;
    FT_UShort  horizontal_resolution;
    FT_UShort  ascent;
    FT_UShort  internal_leading;
    FT_UShort  external_leading;
    FT_Byte    italic;
    FT_Byte    underline;
    FT_Byte    strike_out;
    FT_UShort  weight;
    FT_Byte    charset;
    FT_UShort  pixel_width;
    FT_UShort  pixel_height;
    FT_Byte    pitch_and_family;
    FT_UShort  avg_width;
    FT_UShort  max_width;
    FT_Byte    first_char;
    FT_Byte    last_char;
    FT_Byte    default_char;
    FT_Byte    break_char;
    FT_UShort  bytes_per_row;
    FT_ULong   device_offset;
    FT_ULong   face_name_offset;
    FT_ULong   bits_pointer;
    FT_ULong   bits_offset;
    FT_Byte    reserved;
    FT_ULong   flags;
    FT_UShort  A_space;
    FT_UShort  B_space;
    FT_UShort  C_space;
    FT_UShort  color_table_offset;
    FT_ULong   reserved1[4];

  } FT_WinFNT_HeaderRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_WinFNT_Header                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to an @FT_WinFNT_HeaderRec structure.                     */
  /*                                                                       */
  typedef struct FT_WinFNT_HeaderRec_*  FT_WinFNT_Header;


  /**********************************************************************
   *
   * @function:
   *    FT_Get_WinFNT_Header
   *
   * @description:
   *    Retrieve a Windows FNT font info header.
   *
   * @input:
   *    face    :: A handle to the input face.
   *
   * @output:
   *    aheader :: The WinFNT header.
   *
   * @return:
   *   FreeType error code.  0~means success.
   *
   * @note:
   *   This function only works with Windows FNT faces, returning an error
   *   otherwise.
   */
  FT_EXPORT( FT_Error )
  FT_Get_WinFNT_Header( FT_Face               face,
                        FT_WinFNT_HeaderRec  *aheader );

  /* */


FT_END_HEADER

#endif /* FTWINFNT_H_ */


/* END */


/* Local Variables: */
/* coding: utf-8    */
/* End:             */
