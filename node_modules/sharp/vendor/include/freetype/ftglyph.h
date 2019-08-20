/***************************************************************************/
/*                                                                         */
/*  ftglyph.h                                                              */
/*                                                                         */
/*    FreeType convenience functions to handle glyphs (specification).     */
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


  /*************************************************************************/
  /*                                                                       */
  /* This file contains the definition of several convenience functions    */
  /* that can be used by client applications to easily retrieve glyph      */
  /* bitmaps and outlines from a given face.                               */
  /*                                                                       */
  /* These functions should be optional if you are writing a font server   */
  /* or text layout engine on top of FreeType.  However, they are pretty   */
  /* handy for many other simple uses of the library.                      */
  /*                                                                       */
  /*************************************************************************/


#ifndef FTGLYPH_H_
#define FTGLYPH_H_


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
  /*    glyph_management                                                   */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Glyph Management                                                   */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Generic interface to manage individual glyph data.                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains definitions used to manage glyph data        */
  /*    through generic FT_Glyph objects.  Each of them can contain a      */
  /*    bitmap, a vector outline, or even images in other formats.         */
  /*                                                                       */
  /*************************************************************************/


  /* forward declaration to a private type */
  typedef struct FT_Glyph_Class_  FT_Glyph_Class;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Glyph                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Handle to an object used to model generic glyph images.  It is a   */
  /*    pointer to the @FT_GlyphRec structure and can contain a glyph      */
  /*    bitmap or pointer.                                                 */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Glyph objects are not owned by the library.  You must thus release */
  /*    them manually (through @FT_Done_Glyph) _before_ calling            */
  /*    @FT_Done_FreeType.                                                 */
  /*                                                                       */
  typedef struct FT_GlyphRec_*  FT_Glyph;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_GlyphRec                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The root glyph structure contains a given glyph image plus its     */
  /*    advance width in 16.16 fixed-point format.                         */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    library :: A handle to the FreeType library object.                */
  /*                                                                       */
  /*    clazz   :: A pointer to the glyph's class.  Private.               */
  /*                                                                       */
  /*    format  :: The format of the glyph's image.                        */
  /*                                                                       */
  /*    advance :: A 16.16 vector that gives the glyph's advance width.    */
  /*                                                                       */
  typedef struct  FT_GlyphRec_
  {
    FT_Library             library;
    const FT_Glyph_Class*  clazz;
    FT_Glyph_Format        format;
    FT_Vector              advance;

  } FT_GlyphRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_BitmapGlyph                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to an object used to model a bitmap glyph image.  This is */
  /*    a sub-class of @FT_Glyph, and a pointer to @FT_BitmapGlyphRec.     */
  /*                                                                       */
  typedef struct FT_BitmapGlyphRec_*  FT_BitmapGlyph;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_BitmapGlyphRec                                                  */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used for bitmap glyph images.  This really is a        */
  /*    `sub-class' of @FT_GlyphRec.                                       */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    root   :: The root @FT_Glyph fields.                               */
  /*                                                                       */
  /*    left   :: The left-side bearing, i.e., the horizontal distance     */
  /*              from the current pen position to the left border of the  */
  /*              glyph bitmap.                                            */
  /*                                                                       */
  /*    top    :: The top-side bearing, i.e., the vertical distance from   */
  /*              the current pen position to the top border of the glyph  */
  /*              bitmap.  This distance is positive for upwards~y!        */
  /*                                                                       */
  /*    bitmap :: A descriptor for the bitmap.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    You can typecast an @FT_Glyph to @FT_BitmapGlyph if you have       */
  /*    `glyph->format == FT_GLYPH_FORMAT_BITMAP'.  This lets you access   */
  /*    the bitmap's contents easily.                                      */
  /*                                                                       */
  /*    The corresponding pixel buffer is always owned by @FT_BitmapGlyph  */
  /*    and is thus created and destroyed with it.                         */
  /*                                                                       */
  typedef struct  FT_BitmapGlyphRec_
  {
    FT_GlyphRec  root;
    FT_Int       left;
    FT_Int       top;
    FT_Bitmap    bitmap;

  } FT_BitmapGlyphRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_OutlineGlyph                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to an object used to model an outline glyph image.  This  */
  /*    is a sub-class of @FT_Glyph, and a pointer to @FT_OutlineGlyphRec. */
  /*                                                                       */
  typedef struct FT_OutlineGlyphRec_*  FT_OutlineGlyph;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_OutlineGlyphRec                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used for outline (vectorial) glyph images.  This       */
  /*    really is a `sub-class' of @FT_GlyphRec.                           */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    root    :: The root @FT_Glyph fields.                              */
  /*                                                                       */
  /*    outline :: A descriptor for the outline.                           */
  /*                                                                       */
  /* <Note>                                                                */
  /*    You can typecast an @FT_Glyph to @FT_OutlineGlyph if you have      */
  /*    `glyph->format == FT_GLYPH_FORMAT_OUTLINE'.  This lets you access  */
  /*    the outline's content easily.                                      */
  /*                                                                       */
  /*    As the outline is extracted from a glyph slot, its coordinates are */
  /*    expressed normally in 26.6 pixels, unless the flag                 */
  /*    @FT_LOAD_NO_SCALE was used in @FT_Load_Glyph() or @FT_Load_Char(). */
  /*                                                                       */
  /*    The outline's tables are always owned by the object and are        */
  /*    destroyed with it.                                                 */
  /*                                                                       */
  typedef struct  FT_OutlineGlyphRec_
  {
    FT_GlyphRec  root;
    FT_Outline   outline;

  } FT_OutlineGlyphRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Glyph                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function used to extract a glyph image from a slot.  Note that   */
  /*    the created @FT_Glyph object must be released with @FT_Done_Glyph. */
  /*                                                                       */
  /* <Input>                                                               */
  /*    slot   :: A handle to the source glyph slot.                       */
  /*                                                                       */
  /* <Output>                                                              */
  /*    aglyph :: A handle to the glyph object.                            */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Because `*aglyph->advance.x' and '*aglyph->advance.y' are 16.16    */
  /*    fixed-point numbers, `slot->advance.x' and `slot->advance.y'       */
  /*    (which are in 26.6 fixed-point format) must be in the range        */
  /*    ]-32768;32768[.                                                    */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Glyph( FT_GlyphSlot  slot,
                FT_Glyph     *aglyph );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Glyph_Copy                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function used to copy a glyph image.  Note that the created      */
  /*    @FT_Glyph object must be released with @FT_Done_Glyph.             */
  /*                                                                       */
  /* <Input>                                                               */
  /*    source :: A handle to the source glyph object.                     */
  /*                                                                       */
  /* <Output>                                                              */
  /*    target :: A handle to the target glyph object.  0~in case of       */
  /*              error.                                                   */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Glyph_Copy( FT_Glyph   source,
                 FT_Glyph  *target );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Glyph_Transform                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Transform a glyph image if its format is scalable.                 */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    glyph  :: A handle to the target glyph object.                     */
  /*                                                                       */
  /* <Input>                                                               */
  /*    matrix :: A pointer to a 2x2 matrix to apply.                      */
  /*                                                                       */
  /*    delta  :: A pointer to a 2d vector to apply.  Coordinates are      */
  /*              expressed in 1/64th of a pixel.                          */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code (if not 0, the glyph format is not scalable).  */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The 2x2 transformation matrix is also applied to the glyph's       */
  /*    advance vector.                                                    */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Glyph_Transform( FT_Glyph    glyph,
                      FT_Matrix*  matrix,
                      FT_Vector*  delta );


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    FT_Glyph_BBox_Mode                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The mode how the values of @FT_Glyph_Get_CBox are returned.        */
  /*                                                                       */
  /* <Values>                                                              */
  /*    FT_GLYPH_BBOX_UNSCALED ::                                          */
  /*      Return unscaled font units.                                      */
  /*                                                                       */
  /*    FT_GLYPH_BBOX_SUBPIXELS ::                                         */
  /*      Return unfitted 26.6 coordinates.                                */
  /*                                                                       */
  /*    FT_GLYPH_BBOX_GRIDFIT ::                                           */
  /*      Return grid-fitted 26.6 coordinates.                             */
  /*                                                                       */
  /*    FT_GLYPH_BBOX_TRUNCATE ::                                          */
  /*      Return coordinates in integer pixels.                            */
  /*                                                                       */
  /*    FT_GLYPH_BBOX_PIXELS ::                                            */
  /*      Return grid-fitted pixel coordinates.                            */
  /*                                                                       */
  typedef enum  FT_Glyph_BBox_Mode_
  {
    FT_GLYPH_BBOX_UNSCALED  = 0,
    FT_GLYPH_BBOX_SUBPIXELS = 0,
    FT_GLYPH_BBOX_GRIDFIT   = 1,
    FT_GLYPH_BBOX_TRUNCATE  = 2,
    FT_GLYPH_BBOX_PIXELS    = 3

  } FT_Glyph_BBox_Mode;


  /* these constants are deprecated; use the corresponding */
  /* `FT_Glyph_BBox_Mode' values instead                   */
#define ft_glyph_bbox_unscaled   FT_GLYPH_BBOX_UNSCALED
#define ft_glyph_bbox_subpixels  FT_GLYPH_BBOX_SUBPIXELS
#define ft_glyph_bbox_gridfit    FT_GLYPH_BBOX_GRIDFIT
#define ft_glyph_bbox_truncate   FT_GLYPH_BBOX_TRUNCATE
#define ft_glyph_bbox_pixels     FT_GLYPH_BBOX_PIXELS


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Glyph_Get_CBox                                                  */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Return a glyph's `control box'.  The control box encloses all the  */
  /*    outline's points, including Bezier control points.  Though it      */
  /*    coincides with the exact bounding box for most glyphs, it can be   */
  /*    slightly larger in some situations (like when rotating an outline  */
  /*    that contains Bezier outside arcs).                                */
  /*                                                                       */
  /*    Computing the control box is very fast, while getting the bounding */
  /*    box can take much more time as it needs to walk over all segments  */
  /*    and arcs in the outline.  To get the latter, you can use the       */
  /*    `ftbbox' component, which is dedicated to this single task.        */
  /*                                                                       */
  /* <Input>                                                               */
  /*    glyph :: A handle to the source glyph object.                      */
  /*                                                                       */
  /*    mode  :: The mode that indicates how to interpret the returned     */
  /*             bounding box values.                                      */
  /*                                                                       */
  /* <Output>                                                              */
  /*    acbox :: The glyph coordinate bounding box.  Coordinates are       */
  /*             expressed in 1/64th of pixels if it is grid-fitted.       */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Coordinates are relative to the glyph origin, using the y~upwards  */
  /*    convention.                                                        */
  /*                                                                       */
  /*    If the glyph has been loaded with @FT_LOAD_NO_SCALE, `bbox_mode'   */
  /*    must be set to @FT_GLYPH_BBOX_UNSCALED to get unscaled font        */
  /*    units in 26.6 pixel format.  The value @FT_GLYPH_BBOX_SUBPIXELS    */
  /*    is another name for this constant.                                 */
  /*                                                                       */
  /*    If the font is tricky and the glyph has been loaded with           */
  /*    @FT_LOAD_NO_SCALE, the resulting CBox is meaningless.  To get      */
  /*    reasonable values for the CBox it is necessary to load the glyph   */
  /*    at a large ppem value (so that the hinting instructions can        */
  /*    properly shift and scale the subglyphs), then extracting the CBox, */
  /*    which can be eventually converted back to font units.              */
  /*                                                                       */
  /*    Note that the maximum coordinates are exclusive, which means that  */
  /*    one can compute the width and height of the glyph image (be it in  */
  /*    integer or 26.6 pixels) as:                                        */
  /*                                                                       */
  /*    {                                                                  */
  /*      width  = bbox.xMax - bbox.xMin;                                  */
  /*      height = bbox.yMax - bbox.yMin;                                  */
  /*    }                                                                  */
  /*                                                                       */
  /*    Note also that for 26.6 coordinates, if `bbox_mode' is set to      */
  /*    @FT_GLYPH_BBOX_GRIDFIT, the coordinates will also be grid-fitted,  */
  /*    which corresponds to:                                              */
  /*                                                                       */
  /*    {                                                                  */
  /*      bbox.xMin = FLOOR(bbox.xMin);                                    */
  /*      bbox.yMin = FLOOR(bbox.yMin);                                    */
  /*      bbox.xMax = CEILING(bbox.xMax);                                  */
  /*      bbox.yMax = CEILING(bbox.yMax);                                  */
  /*    }                                                                  */
  /*                                                                       */
  /*    To get the bbox in pixel coordinates, set `bbox_mode' to           */
  /*    @FT_GLYPH_BBOX_TRUNCATE.                                           */
  /*                                                                       */
  /*    To get the bbox in grid-fitted pixel coordinates, set `bbox_mode'  */
  /*    to @FT_GLYPH_BBOX_PIXELS.                                          */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Glyph_Get_CBox( FT_Glyph  glyph,
                     FT_UInt   bbox_mode,
                     FT_BBox  *acbox );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Glyph_To_Bitmap                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Convert a given glyph object to a bitmap glyph object.             */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    the_glyph   :: A pointer to a handle to the target glyph.          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    render_mode :: An enumeration that describes how the data is       */
  /*                   rendered.                                           */
  /*                                                                       */
  /*    origin      :: A pointer to a vector used to translate the glyph   */
  /*                   image before rendering.  Can be~0 (if no            */
  /*                   translation).  The origin is expressed in           */
  /*                   26.6 pixels.                                        */
  /*                                                                       */
  /*    destroy     :: A boolean that indicates that the original glyph    */
  /*                   image should be destroyed by this function.  It is  */
  /*                   never destroyed in case of error.                   */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This function does nothing if the glyph format isn't scalable.     */
  /*                                                                       */
  /*    The glyph image is translated with the `origin' vector before      */
  /*    rendering.                                                         */
  /*                                                                       */
  /*    The first parameter is a pointer to an @FT_Glyph handle, that will */
  /*    be _replaced_ by this function (with newly allocated data).        */
  /*    Typically, you would use (omitting error handling):                */
  /*                                                                       */
  /*                                                                       */
  /*      {                                                                */
  /*        FT_Glyph        glyph;                                         */
  /*        FT_BitmapGlyph  glyph_bitmap;                                  */
  /*                                                                       */
  /*                                                                       */
  /*        // load glyph                                                  */
  /*        error = FT_Load_Char( face, glyph_index, FT_LOAD_DEFAULT );    */
  /*                                                                       */
  /*        // extract glyph image                                         */
  /*        error = FT_Get_Glyph( face->glyph, &glyph );                   */
  /*                                                                       */
  /*        // convert to a bitmap (default render mode + destroying old)  */
  /*        if ( glyph->format != FT_GLYPH_FORMAT_BITMAP )                 */
  /*        {                                                              */
  /*          error = FT_Glyph_To_Bitmap( &glyph, FT_RENDER_MODE_NORMAL,   */
  /*                                      0, 1 );                          */
  /*          if ( error ) // `glyph' unchanged                            */
  /*            ...                                                        */
  /*        }                                                              */
  /*                                                                       */
  /*        // access bitmap content by typecasting                        */
  /*        glyph_bitmap = (FT_BitmapGlyph)glyph;                          */
  /*                                                                       */
  /*        // do funny stuff with it, like blitting/drawing               */
  /*        ...                                                            */
  /*                                                                       */
  /*        // discard glyph image (bitmap or not)                         */
  /*        FT_Done_Glyph( glyph );                                        */
  /*      }                                                                */
  /*                                                                       */
  /*                                                                       */
  /*    Here another example, again without error handling:                */
  /*                                                                       */
  /*                                                                       */
  /*      {                                                                */
  /*        FT_Glyph  glyphs[MAX_GLYPHS]                                   */
  /*                                                                       */
  /*                                                                       */
  /*        ...                                                            */
  /*                                                                       */
  /*        for ( idx = 0; i < MAX_GLYPHS; i++ )                           */
  /*          error = FT_Load_Glyph( face, idx, FT_LOAD_DEFAULT ) ||       */
  /*                  FT_Get_Glyph ( face->glyph, &glyph[idx] );           */
  /*                                                                       */
  /*        ...                                                            */
  /*                                                                       */
  /*        for ( idx = 0; i < MAX_GLYPHS; i++ )                           */
  /*        {                                                              */
  /*          FT_Glyph  bitmap = glyphs[idx];                              */
  /*                                                                       */
  /*                                                                       */
  /*          ...                                                          */
  /*                                                                       */
  /*          // after this call, `bitmap' no longer points into           */
  /*          // the `glyphs' array (and the old value isn't destroyed)    */
  /*          FT_Glyph_To_Bitmap( &bitmap, FT_RENDER_MODE_MONO, 0, 0 );    */
  /*                                                                       */
  /*          ...                                                          */
  /*                                                                       */
  /*          FT_Done_Glyph( bitmap );                                     */
  /*        }                                                              */
  /*                                                                       */
  /*        ...                                                            */
  /*                                                                       */
  /*        for ( idx = 0; i < MAX_GLYPHS; i++ )                           */
  /*          FT_Done_Glyph( glyphs[idx] );                                */
  /*      }                                                                */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Glyph_To_Bitmap( FT_Glyph*       the_glyph,
                      FT_Render_Mode  render_mode,
                      FT_Vector*      origin,
                      FT_Bool         destroy );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Done_Glyph                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Destroy a given glyph.                                             */
  /*                                                                       */
  /* <Input>                                                               */
  /*    glyph :: A handle to the target glyph object.                      */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Done_Glyph( FT_Glyph  glyph );

  /* */


  /* other helpful functions */

  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    computations                                                       */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Matrix_Multiply                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Perform the matrix operation `b = a*b'.                            */
  /*                                                                       */
  /* <Input>                                                               */
  /*    a :: A pointer to matrix `a'.                                      */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    b :: A pointer to matrix `b'.                                      */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The result is undefined if either `a' or `b' is zero.              */
  /*                                                                       */
  /*    Since the function uses wrap-around arithmetic, results become     */
  /*    meaningless if the arguments are very large.                       */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Matrix_Multiply( const FT_Matrix*  a,
                      FT_Matrix*        b );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Matrix_Invert                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Invert a 2x2 matrix.  Return an error if it can't be inverted.     */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    matrix :: A pointer to the target matrix.  Remains untouched in    */
  /*              case of error.                                           */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Matrix_Invert( FT_Matrix*  matrix );

  /* */


FT_END_HEADER

#endif /* FTGLYPH_H_ */


/* END */


/* Local Variables: */
/* coding: utf-8    */
/* End:             */
