/***************************************************************************/
/*                                                                         */
/*  ftcid.h                                                                */
/*                                                                         */
/*    FreeType API for accessing CID font information (specification).     */
/*                                                                         */
/*  Copyright 2007-2018 by                                                 */
/*  Dereg Clegg and Michael Toftdal.                                       */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTCID_H_
#define FTCID_H_

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
  /*    cid_fonts                                                          */
  /*                                                                       */
  /* <Title>                                                               */
  /*    CID Fonts                                                          */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    CID-keyed font specific API.                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains the declaration of CID-keyed font specific   */
  /*    functions.                                                         */
  /*                                                                       */
  /*************************************************************************/


  /**********************************************************************
   *
   * @function:
   *    FT_Get_CID_Registry_Ordering_Supplement
   *
   * @description:
   *    Retrieve the Registry/Ordering/Supplement triple (also known as the
   *    "R/O/S") from a CID-keyed font.
   *
   * @input:
   *    face ::
   *       A handle to the input face.
   *
   * @output:
   *    registry ::
   *       The registry, as a C~string, owned by the face.
   *
   *    ordering ::
   *       The ordering, as a C~string, owned by the face.
   *
   *    supplement ::
   *       The supplement.
   *
   * @return:
   *    FreeType error code.  0~means success.
   *
   * @note:
   *    This function only works with CID faces, returning an error
   *    otherwise.
   *
   * @since:
   *    2.3.6
   */
  FT_EXPORT( FT_Error )
  FT_Get_CID_Registry_Ordering_Supplement( FT_Face       face,
                                           const char*  *registry,
                                           const char*  *ordering,
                                           FT_Int       *supplement );


  /**********************************************************************
   *
   * @function:
   *    FT_Get_CID_Is_Internally_CID_Keyed
   *
   * @description:
   *    Retrieve the type of the input face, CID keyed or not.  In
   *    contrast to the @FT_IS_CID_KEYED macro this function returns
   *    successfully also for CID-keyed fonts in an SFNT wrapper.
   *
   * @input:
   *    face ::
   *       A handle to the input face.
   *
   * @output:
   *    is_cid ::
   *       The type of the face as an @FT_Bool.
   *
   * @return:
   *    FreeType error code.  0~means success.
   *
   * @note:
   *    This function only works with CID faces and OpenType fonts,
   *    returning an error otherwise.
   *
   * @since:
   *    2.3.9
   */
  FT_EXPORT( FT_Error )
  FT_Get_CID_Is_Internally_CID_Keyed( FT_Face   face,
                                      FT_Bool  *is_cid );


  /**********************************************************************
   *
   * @function:
   *    FT_Get_CID_From_Glyph_Index
   *
   * @description:
   *    Retrieve the CID of the input glyph index.
   *
   * @input:
   *    face ::
   *       A handle to the input face.
   *
   *    glyph_index ::
   *       The input glyph index.
   *
   * @output:
   *    cid ::
   *       The CID as an @FT_UInt.
   *
   * @return:
   *    FreeType error code.  0~means success.
   *
   * @note:
   *    This function only works with CID faces and OpenType fonts,
   *    returning an error otherwise.
   *
   * @since:
   *    2.3.9
   */
  FT_EXPORT( FT_Error )
  FT_Get_CID_From_Glyph_Index( FT_Face   face,
                               FT_UInt   glyph_index,
                               FT_UInt  *cid );

  /* */


FT_END_HEADER

#endif /* FTCID_H_ */


/* END */
