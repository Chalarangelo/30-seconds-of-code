/***************************************************************************/
/*                                                                         */
/*  ftgasp.h                                                               */
/*                                                                         */
/*    Access of TrueType's `gasp' table (specification).                   */
/*                                                                         */
/*  Copyright 2007-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTGASP_H_
#define FTGASP_H_

#include <ft2build.h>
#include FT_FREETYPE_H

#ifdef FREETYPE_H
#error "freetype.h of FreeType 1 has been loaded!"
#error "Please fix the directory search order for header files"
#error "so that freetype.h of FreeType 2 is found first."
#endif


FT_BEGIN_HEADER


  /***************************************************************************
   *
   * @section:
   *   gasp_table
   *
   * @title:
   *   Gasp Table
   *
   * @abstract:
   *   Retrieving TrueType `gasp' table entries.
   *
   * @description:
   *   The function @FT_Get_Gasp can be used to query a TrueType or OpenType
   *   font for specific entries in its `gasp' table, if any.  This is
   *   mainly useful when implementing native TrueType hinting with the
   *   bytecode interpreter to duplicate the Windows text rendering results.
   */

  /*************************************************************************
   *
   * @enum:
   *   FT_GASP_XXX
   *
   * @description:
   *   A list of values and/or bit-flags returned by the @FT_Get_Gasp
   *   function.
   *
   * @values:
   *   FT_GASP_NO_TABLE ::
   *     This special value means that there is no GASP table in this face.
   *     It is up to the client to decide what to do.
   *
   *   FT_GASP_DO_GRIDFIT ::
   *     Grid-fitting and hinting should be performed at the specified ppem.
   *     This *really* means TrueType bytecode interpretation.  If this bit
   *     is not set, no hinting gets applied.
   *
   *   FT_GASP_DO_GRAY ::
   *     Anti-aliased rendering should be performed at the specified ppem.
   *     If not set, do monochrome rendering.
   *
   *   FT_GASP_SYMMETRIC_SMOOTHING ::
   *     If set, smoothing along multiple axes must be used with ClearType.
   *
   *   FT_GASP_SYMMETRIC_GRIDFIT ::
   *     Grid-fitting must be used with ClearType's symmetric smoothing.
   *
   * @note:
   *   The bit-flags `FT_GASP_DO_GRIDFIT' and `FT_GASP_DO_GRAY' are to be
   *   used for standard font rasterization only.  Independently of that,
   *   `FT_GASP_SYMMETRIC_SMOOTHING' and `FT_GASP_SYMMETRIC_GRIDFIT' are to
   *   be used if ClearType is enabled (and `FT_GASP_DO_GRIDFIT' and
   *   `FT_GASP_DO_GRAY' are consequently ignored).
   *
   *   `ClearType' is Microsoft's implementation of LCD rendering, partly
   *   protected by patents.
   *
   * @since:
   *   2.3.0
   */
#define FT_GASP_NO_TABLE               -1
#define FT_GASP_DO_GRIDFIT           0x01
#define FT_GASP_DO_GRAY              0x02
#define FT_GASP_SYMMETRIC_GRIDFIT    0x04
#define FT_GASP_SYMMETRIC_SMOOTHING  0x08


  /*************************************************************************
   *
   * @func:
   *   FT_Get_Gasp
   *
   * @description:
   *   For a TrueType or OpenType font file, return the rasterizer behaviour
   *   flags from the font's `gasp' table corresponding to a given
   *   character pixel size.
   *
   * @input:
   *   face :: The source face handle.
   *
   *   ppem :: The vertical character pixel size.
   *
   * @return:
   *   Bit flags (see @FT_GASP_XXX), or @FT_GASP_NO_TABLE if there is no
   *   `gasp' table in the face.
   *
   * @note:
   *   If you want to use the MM functionality of OpenType variation fonts
   *   (i.e., using @FT_Set_Var_Design_Coordinates and friends), call this
   *   function *after* setting an instance since the return values can
   *   change.
   *
   * @since:
   *   2.3.0
   */
  FT_EXPORT( FT_Int )
  FT_Get_Gasp( FT_Face  face,
               FT_UInt  ppem );

  /* */


FT_END_HEADER

#endif /* FTGASP_H_ */


/* END */
