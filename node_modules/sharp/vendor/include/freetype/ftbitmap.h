/***************************************************************************/
/*                                                                         */
/*  ftbitmap.h                                                             */
/*                                                                         */
/*    FreeType utility functions for bitmaps (specification).              */
/*                                                                         */
/*  Copyright 2004-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTBITMAP_H_
#define FTBITMAP_H_


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
  /*    bitmap_handling                                                    */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Bitmap Handling                                                    */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Handling FT_Bitmap objects.                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains functions for handling @FT_Bitmap objects.   */
  /*    Note that none of the functions changes the bitmap's `flow' (as    */
  /*    indicated by the sign of the `pitch' field in `FT_Bitmap').        */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Bitmap_Init                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Initialize a pointer to an @FT_Bitmap structure.                   */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    abitmap :: A pointer to the bitmap structure.                      */
  /*                                                                       */
  /* <Note>                                                                */
  /*    A deprecated name for the same function is `FT_Bitmap_New'.        */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Bitmap_Init( FT_Bitmap  *abitmap );


  /* deprecated */
  FT_EXPORT( void )
  FT_Bitmap_New( FT_Bitmap  *abitmap );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Bitmap_Copy                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Copy a bitmap into another one.                                    */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library :: A handle to a library object.                           */
  /*                                                                       */
  /*    source  :: A handle to the source bitmap.                          */
  /*                                                                       */
  /* <Output>                                                              */
  /*    target  :: A handle to the target bitmap.                          */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Bitmap_Copy( FT_Library        library,
                  const FT_Bitmap  *source,
                  FT_Bitmap        *target );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Bitmap_Embolden                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Embolden a bitmap.  The new bitmap will be about `xStrength'       */
  /*    pixels wider and `yStrength' pixels higher.  The left and bottom   */
  /*    borders are kept unchanged.                                        */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library   :: A handle to a library object.                         */
  /*                                                                       */
  /*    xStrength :: How strong the glyph is emboldened horizontally.      */
  /*                 Expressed in 26.6 pixel format.                       */
  /*                                                                       */
  /*    yStrength :: How strong the glyph is emboldened vertically.        */
  /*                 Expressed in 26.6 pixel format.                       */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    bitmap    :: A handle to the target bitmap.                        */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The current implementation restricts `xStrength' to be less than   */
  /*    or equal to~8 if bitmap is of pixel_mode @FT_PIXEL_MODE_MONO.      */
  /*                                                                       */
  /*    If you want to embolden the bitmap owned by a @FT_GlyphSlotRec,    */
  /*    you should call @FT_GlyphSlot_Own_Bitmap on the slot first.        */
  /*                                                                       */
  /*    Bitmaps in @FT_PIXEL_MODE_GRAY2 and @FT_PIXEL_MODE_GRAY@ format    */
  /*    are converted to @FT_PIXEL_MODE_GRAY format (i.e., 8bpp).          */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Bitmap_Embolden( FT_Library  library,
                      FT_Bitmap*  bitmap,
                      FT_Pos      xStrength,
                      FT_Pos      yStrength );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Bitmap_Convert                                                  */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Convert a bitmap object with depth 1bpp, 2bpp, 4bpp, 8bpp or 32bpp */
  /*    to a bitmap object with depth 8bpp, making the number of used      */
  /*    bytes line (a.k.a. the `pitch') a multiple of `alignment'.         */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library   :: A handle to a library object.                         */
  /*                                                                       */
  /*    source    :: The source bitmap.                                    */
  /*                                                                       */
  /*    alignment :: The pitch of the bitmap is a multiple of this         */
  /*                 parameter.  Common values are 1, 2, or 4.             */
  /*                                                                       */
  /* <Output>                                                              */
  /*    target    :: The target bitmap.                                    */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    It is possible to call @FT_Bitmap_Convert multiple times without   */
  /*    calling @FT_Bitmap_Done (the memory is simply reallocated).        */
  /*                                                                       */
  /*    Use @FT_Bitmap_Done to finally remove the bitmap object.           */
  /*                                                                       */
  /*    The `library' argument is taken to have access to FreeType's       */
  /*    memory handling functions.                                         */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Bitmap_Convert( FT_Library        library,
                     const FT_Bitmap  *source,
                     FT_Bitmap        *target,
                     FT_Int            alignment );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_GlyphSlot_Own_Bitmap                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Make sure that a glyph slot owns `slot->bitmap'.                   */
  /*                                                                       */
  /* <Input>                                                               */
  /*    slot :: The glyph slot.                                            */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This function is to be used in combination with                    */
  /*    @FT_Bitmap_Embolden.                                               */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_GlyphSlot_Own_Bitmap( FT_GlyphSlot  slot );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Bitmap_Done                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Destroy a bitmap object initialized with @FT_Bitmap_Init.          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library :: A handle to a library object.                           */
  /*                                                                       */
  /*    bitmap  :: The bitmap object to be freed.                          */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The `library' argument is taken to have access to FreeType's       */
  /*    memory handling functions.                                         */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Bitmap_Done( FT_Library  library,
                  FT_Bitmap  *bitmap );


  /* */


FT_END_HEADER

#endif /* FTBITMAP_H_ */


/* END */
