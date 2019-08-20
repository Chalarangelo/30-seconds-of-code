/***************************************************************************/
/*                                                                         */
/*  ftheader.h                                                             */
/*                                                                         */
/*    Build macros of the FreeType 2 library.                              */
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

#ifndef FTHEADER_H_
#define FTHEADER_H_


  /*@***********************************************************************/
  /*                                                                       */
  /* <Macro>                                                               */
  /*    FT_BEGIN_HEADER                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This macro is used in association with @FT_END_HEADER in header    */
  /*    files to ensure that the declarations within are properly          */
  /*    encapsulated in an `extern "C" { .. }' block when included from a  */
  /*    C++ compiler.                                                      */
  /*                                                                       */
#ifdef __cplusplus
#define FT_BEGIN_HEADER  extern "C" {
#else
#define FT_BEGIN_HEADER  /* nothing */
#endif


  /*@***********************************************************************/
  /*                                                                       */
  /* <Macro>                                                               */
  /*    FT_END_HEADER                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This macro is used in association with @FT_BEGIN_HEADER in header  */
  /*    files to ensure that the declarations within are properly          */
  /*    encapsulated in an `extern "C" { .. }' block when included from a  */
  /*    C++ compiler.                                                      */
  /*                                                                       */
#ifdef __cplusplus
#define FT_END_HEADER  }
#else
#define FT_END_HEADER  /* nothing */
#endif


  /*************************************************************************/
  /*                                                                       */
  /* Aliases for the FreeType 2 public and configuration files.            */
  /*                                                                       */
  /*************************************************************************/

  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    header_file_macros                                                 */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Header File Macros                                                 */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Macro definitions used to #include specific header files.          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The following macros are defined to the name of specific           */
  /*    FreeType~2 header files.  They can be used directly in #include    */
  /*    statements as in:                                                  */
  /*                                                                       */
  /*    {                                                                  */
  /*      #include FT_FREETYPE_H                                           */
  /*      #include FT_MULTIPLE_MASTERS_H                                   */
  /*      #include FT_GLYPH_H                                              */
  /*    }                                                                  */
  /*                                                                       */
  /*    There are several reasons why we are now using macros to name      */
  /*    public header files.  The first one is that such macros are not    */
  /*    limited to the infamous 8.3~naming rule required by DOS (and       */
  /*    `FT_MULTIPLE_MASTERS_H' is a lot more meaningful than `ftmm.h').   */
  /*                                                                       */
  /*    The second reason is that it allows for more flexibility in the    */
  /*    way FreeType~2 is installed on a given system.                     */
  /*                                                                       */
  /*************************************************************************/


  /* configuration files */

  /*************************************************************************
   *
   * @macro:
   *   FT_CONFIG_CONFIG_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   FreeType~2 configuration data.
   *
   */
#ifndef FT_CONFIG_CONFIG_H
#define FT_CONFIG_CONFIG_H  <freetype/config/ftconfig.h>
#endif


  /*************************************************************************
   *
   * @macro:
   *   FT_CONFIG_STANDARD_LIBRARY_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   FreeType~2 interface to the standard C library functions.
   *
   */
#ifndef FT_CONFIG_STANDARD_LIBRARY_H
#define FT_CONFIG_STANDARD_LIBRARY_H  <freetype/config/ftstdlib.h>
#endif


  /*************************************************************************
   *
   * @macro:
   *   FT_CONFIG_OPTIONS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   FreeType~2 project-specific configuration options.
   *
   */
#ifndef FT_CONFIG_OPTIONS_H
#define FT_CONFIG_OPTIONS_H  <freetype/config/ftoption.h>
#endif


  /*************************************************************************
   *
   * @macro:
   *   FT_CONFIG_MODULES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   list of FreeType~2 modules that are statically linked to new library
   *   instances in @FT_Init_FreeType.
   *
   */
#ifndef FT_CONFIG_MODULES_H
#define FT_CONFIG_MODULES_H  <freetype/config/ftmodule.h>
#endif

  /* */

  /* public headers */

  /*************************************************************************
   *
   * @macro:
   *   FT_FREETYPE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   base FreeType~2 API.
   *
   */
#define FT_FREETYPE_H  <freetype/freetype.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_ERRORS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   list of FreeType~2 error codes (and messages).
   *
   *   It is included by @FT_FREETYPE_H.
   *
   */
#define FT_ERRORS_H  <freetype/fterrors.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_MODULE_ERRORS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   list of FreeType~2 module error offsets (and messages).
   *
   */
#define FT_MODULE_ERRORS_H  <freetype/ftmoderr.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_SYSTEM_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 interface to low-level operations (i.e., memory management
   *   and stream i/o).
   *
   *   It is included by @FT_FREETYPE_H.
   *
   */
#define FT_SYSTEM_H  <freetype/ftsystem.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_IMAGE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing type
   *   definitions related to glyph images (i.e., bitmaps, outlines,
   *   scan-converter parameters).
   *
   *   It is included by @FT_FREETYPE_H.
   *
   */
#define FT_IMAGE_H  <freetype/ftimage.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_TYPES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   basic data types defined by FreeType~2.
   *
   *   It is included by @FT_FREETYPE_H.
   *
   */
#define FT_TYPES_H  <freetype/fttypes.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_LIST_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   list management API of FreeType~2.
   *
   *   (Most applications will never need to include this file.)
   *
   */
#define FT_LIST_H  <freetype/ftlist.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_OUTLINE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   scalable outline management API of FreeType~2.
   *
   */
#define FT_OUTLINE_H  <freetype/ftoutln.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_SIZES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   API which manages multiple @FT_Size objects per face.
   *
   */
#define FT_SIZES_H  <freetype/ftsizes.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_MODULE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   module management API of FreeType~2.
   *
   */
#define FT_MODULE_H  <freetype/ftmodapi.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_RENDER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   renderer module management API of FreeType~2.
   *
   */
#define FT_RENDER_H  <freetype/ftrender.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_DRIVER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   structures and macros related to the driver modules.
   *
   */
#define FT_DRIVER_H  <freetype/ftdriver.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_AUTOHINTER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   structures and macros related to the auto-hinting module.
   *
   *   Deprecated since version 2.9; use @FT_DRIVER_H instead.
   *
   */
#define FT_AUTOHINTER_H  FT_DRIVER_H


  /*************************************************************************
   *
   * @macro:
   *   FT_CFF_DRIVER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   structures and macros related to the CFF driver module.
   *
   *   Deprecated since version 2.9; use @FT_DRIVER_H instead.
   *
   */
#define FT_CFF_DRIVER_H  FT_DRIVER_H


  /*************************************************************************
   *
   * @macro:
   *   FT_TRUETYPE_DRIVER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   structures and macros related to the TrueType driver module.
   *
   *   Deprecated since version 2.9; use @FT_DRIVER_H instead.
   *
   */
#define FT_TRUETYPE_DRIVER_H  FT_DRIVER_H


  /*************************************************************************
   *
   * @macro:
   *   FT_PCF_DRIVER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing
   *   structures and macros related to the PCF driver module.
   *
   *   Deprecated since version 2.9; use @FT_DRIVER_H instead.
   *
   */
#define FT_PCF_DRIVER_H  FT_DRIVER_H


  /*************************************************************************
   *
   * @macro:
   *   FT_TYPE1_TABLES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   types and API specific to the Type~1 format.
   *
   */
#define FT_TYPE1_TABLES_H  <freetype/t1tables.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_TRUETYPE_IDS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   enumeration values which identify name strings, languages, encodings,
   *   etc.  This file really contains a _large_ set of constant macro
   *   definitions, taken from the TrueType and OpenType specifications.
   *
   */
#define FT_TRUETYPE_IDS_H  <freetype/ttnameid.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_TRUETYPE_TABLES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   types and API specific to the TrueType (as well as OpenType) format.
   *
   */
#define FT_TRUETYPE_TABLES_H  <freetype/tttables.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_TRUETYPE_TAGS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of TrueType four-byte `tags' which identify blocks in
   *   SFNT-based font formats (i.e., TrueType and OpenType).
   *
   */
#define FT_TRUETYPE_TAGS_H  <freetype/tttags.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_BDF_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of an API which accesses BDF-specific strings from a
   *   face.
   *
   */
#define FT_BDF_H  <freetype/ftbdf.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_CID_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of an API which access CID font information from a
   *   face.
   *
   */
#define FT_CID_H  <freetype/ftcid.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_GZIP_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of an API which supports gzip-compressed files.
   *
   */
#define FT_GZIP_H  <freetype/ftgzip.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_LZW_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of an API which supports LZW-compressed files.
   *
   */
#define FT_LZW_H  <freetype/ftlzw.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_BZIP2_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of an API which supports bzip2-compressed files.
   *
   */
#define FT_BZIP2_H  <freetype/ftbzip2.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_WINFONTS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   definitions of an API which supports Windows FNT files.
   *
   */
#define FT_WINFONTS_H   <freetype/ftwinfnt.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_GLYPH_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   API of the optional glyph management component.
   *
   */
#define FT_GLYPH_H  <freetype/ftglyph.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_BITMAP_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   API of the optional bitmap conversion component.
   *
   */
#define FT_BITMAP_H  <freetype/ftbitmap.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_BBOX_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   API of the optional exact bounding box computation routines.
   *
   */
#define FT_BBOX_H  <freetype/ftbbox.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_CACHE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   API of the optional FreeType~2 cache sub-system.
   *
   */
#define FT_CACHE_H  <freetype/ftcache.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_MAC_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   Macintosh-specific FreeType~2 API.  The latter is used to access
   *   fonts embedded in resource forks.
   *
   *   This header file must be explicitly included by client applications
   *   compiled on the Mac (note that the base API still works though).
   *
   */
#define FT_MAC_H  <freetype/ftmac.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_MULTIPLE_MASTERS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   optional multiple-masters management API of FreeType~2.
   *
   */
#define FT_MULTIPLE_MASTERS_H  <freetype/ftmm.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_SFNT_NAMES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   optional FreeType~2 API which accesses embedded `name' strings in
   *   SFNT-based font formats (i.e., TrueType and OpenType).
   *
   */
#define FT_SFNT_NAMES_H  <freetype/ftsnames.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_OPENTYPE_VALIDATE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   optional FreeType~2 API which validates OpenType tables (BASE, GDEF,
   *   GPOS, GSUB, JSTF).
   *
   */
#define FT_OPENTYPE_VALIDATE_H  <freetype/ftotval.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_GX_VALIDATE_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   optional FreeType~2 API which validates TrueTypeGX/AAT tables (feat,
   *   mort, morx, bsln, just, kern, opbd, trak, prop).
   *
   */
#define FT_GX_VALIDATE_H  <freetype/ftgxval.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_PFR_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which accesses PFR-specific data.
   *
   */
#define FT_PFR_H  <freetype/ftpfr.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_STROKER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which provides functions to stroke outline paths.
   */
#define FT_STROKER_H  <freetype/ftstroke.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_SYNTHESIS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which performs artificial obliquing and emboldening.
   */
#define FT_SYNTHESIS_H  <freetype/ftsynth.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_FONT_FORMATS_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which provides functions specific to font formats.
   */
#define FT_FONT_FORMATS_H  <freetype/ftfntfmt.h>

  /* deprecated */
#define FT_XFREE86_H  FT_FONT_FORMATS_H


  /*************************************************************************
   *
   * @macro:
   *   FT_TRIGONOMETRY_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which performs trigonometric computations (e.g.,
   *   cosines and arc tangents).
   */
#define FT_TRIGONOMETRY_H  <freetype/fttrigon.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_LCD_FILTER_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which performs color filtering for subpixel rendering.
   */
#define FT_LCD_FILTER_H  <freetype/ftlcdfil.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_INCREMENTAL_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which performs incremental glyph loading.
   */
#define FT_INCREMENTAL_H  <freetype/ftincrem.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_GASP_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which returns entries from the TrueType GASP table.
   */
#define FT_GASP_H  <freetype/ftgasp.h>


  /*************************************************************************
   *
   * @macro:
   *   FT_ADVANCES_H
   *
   * @description:
   *   A macro used in #include statements to name the file containing the
   *   FreeType~2 API which returns individual and ranged glyph advances.
   */
#define FT_ADVANCES_H  <freetype/ftadvanc.h>


  /* */

  /* These header files don't need to be included by the user. */
#define FT_ERROR_DEFINITIONS_H  <freetype/fterrdef.h>
#define FT_PARAMETER_TAGS_H     <freetype/ftparams.h>

  /* Deprecated macros. */
#define FT_UNPATENTED_HINTING_H   <freetype/ftparams.h>
#define FT_TRUETYPE_UNPATENTED_H  <freetype/ftparams.h>

  /* FT_CACHE_H is the only header file needed for the cache subsystem. */
#define FT_CACHE_IMAGE_H          FT_CACHE_H
#define FT_CACHE_SMALL_BITMAPS_H  FT_CACHE_H
#define FT_CACHE_CHARMAP_H        FT_CACHE_H

  /* The internals of the cache sub-system are no longer exposed.  We */
  /* default to FT_CACHE_H at the moment just in case, but we know of */
  /* no rogue client that uses them.                                  */
  /*                                                                  */
#define FT_CACHE_MANAGER_H           FT_CACHE_H
#define FT_CACHE_INTERNAL_MRU_H      FT_CACHE_H
#define FT_CACHE_INTERNAL_MANAGER_H  FT_CACHE_H
#define FT_CACHE_INTERNAL_CACHE_H    FT_CACHE_H
#define FT_CACHE_INTERNAL_GLYPH_H    FT_CACHE_H
#define FT_CACHE_INTERNAL_IMAGE_H    FT_CACHE_H
#define FT_CACHE_INTERNAL_SBITS_H    FT_CACHE_H


  /*
   * Include internal headers definitions from <internal/...>
   * only when building the library.
   */
#ifdef FT2_BUILD_LIBRARY
#define  FT_INTERNAL_INTERNAL_H  <freetype/internal/internal.h>
#include FT_INTERNAL_INTERNAL_H
#endif /* FT2_BUILD_LIBRARY */


#endif /* FTHEADER_H_ */


/* END */
