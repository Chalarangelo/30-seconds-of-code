/***************************************************************************/
/*                                                                         */
/*  ftoutln.h                                                              */
/*                                                                         */
/*    Support for the FT_Outline type used to store glyph shapes of        */
/*    most scalable font formats (specification).                          */
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


#ifndef FTOUTLN_H_
#define FTOUTLN_H_


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
  /*    outline_processing                                                 */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Outline Processing                                                 */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Functions to create, transform, and render vectorial glyph images. */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains routines used to create and destroy scalable */
  /*    glyph images known as `outlines'.  These can also be measured,     */
  /*    transformed, and converted into bitmaps and pixmaps.               */
  /*                                                                       */
  /* <Order>                                                               */
  /*    FT_Outline                                                         */
  /*    FT_Outline_New                                                     */
  /*    FT_Outline_Done                                                    */
  /*    FT_Outline_Copy                                                    */
  /*    FT_Outline_Translate                                               */
  /*    FT_Outline_Transform                                               */
  /*    FT_Outline_Embolden                                                */
  /*    FT_Outline_EmboldenXY                                              */
  /*    FT_Outline_Reverse                                                 */
  /*    FT_Outline_Check                                                   */
  /*                                                                       */
  /*    FT_Outline_Get_CBox                                                */
  /*    FT_Outline_Get_BBox                                                */
  /*                                                                       */
  /*    FT_Outline_Get_Bitmap                                              */
  /*    FT_Outline_Render                                                  */
  /*    FT_Outline_Decompose                                               */
  /*    FT_Outline_Funcs                                                   */
  /*    FT_Outline_MoveToFunc                                              */
  /*    FT_Outline_LineToFunc                                              */
  /*    FT_Outline_ConicToFunc                                             */
  /*    FT_Outline_CubicToFunc                                             */
  /*                                                                       */
  /*    FT_Orientation                                                     */
  /*    FT_Outline_Get_Orientation                                         */
  /*                                                                       */
  /*    FT_OUTLINE_XXX                                                     */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Decompose                                               */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Walk over an outline's structure to decompose it into individual   */
  /*    segments and Bezier arcs.  This function also emits `move to'      */
  /*    operations to indicate the start of new contours in the outline.   */
  /*                                                                       */
  /* <Input>                                                               */
  /*    outline        :: A pointer to the source target.                  */
  /*                                                                       */
  /*    func_interface :: A table of `emitters', i.e., function pointers   */
  /*                      called during decomposition to indicate path     */
  /*                      operations.                                      */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    user           :: A typeless pointer that is passed to each        */
  /*                      emitter during the decomposition.  It can be     */
  /*                      used to store the state during the               */
  /*                      decomposition.                                   */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    A contour that contains a single point only is represented by a    */
  /*    `move to' operation followed by `line to' to the same point.  In   */
  /*    most cases, it is best to filter this out before using the         */
  /*    outline for stroking purposes (otherwise it would result in a      */
  /*    visible dot when round caps are used).                             */
  /*                                                                       */
  /*    Similarly, the function returns success for an empty outline also  */
  /*    (doing nothing, this is, not calling any emitter); if necessary,   */
  /*    you should filter this out, too.                                   */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Decompose( FT_Outline*              outline,
                        const FT_Outline_Funcs*  func_interface,
                        void*                    user );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_New                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Create a new outline of a given size.                              */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library     :: A handle to the library object from where the       */
  /*                   outline is allocated.  Note however that the new    */
  /*                   outline will *not* necessarily be *freed*, when     */
  /*                   destroying the library, by @FT_Done_FreeType.       */
  /*                                                                       */
  /*    numPoints   :: The maximum number of points within the outline.    */
  /*                   Must be smaller than or equal to 0xFFFF (65535).    */
  /*                                                                       */
  /*    numContours :: The maximum number of contours within the outline.  */
  /*                   This value must be in the range 0 to `numPoints'.   */
  /*                                                                       */
  /* <Output>                                                              */
  /*    anoutline   :: A handle to the new outline.                        */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The reason why this function takes a `library' parameter is simply */
  /*    to use the library's memory allocator.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_New( FT_Library   library,
                  FT_UInt      numPoints,
                  FT_Int       numContours,
                  FT_Outline  *anoutline );


  FT_EXPORT( FT_Error )
  FT_Outline_New_Internal( FT_Memory    memory,
                           FT_UInt      numPoints,
                           FT_Int       numContours,
                           FT_Outline  *anoutline );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Done                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Destroy an outline created with @FT_Outline_New.                   */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library :: A handle of the library object used to allocate the     */
  /*               outline.                                                */
  /*                                                                       */
  /*    outline :: A pointer to the outline object to be discarded.        */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    If the outline's `owner' field is not set, only the outline        */
  /*    descriptor will be released.                                       */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Done( FT_Library   library,
                   FT_Outline*  outline );


  FT_EXPORT( FT_Error )
  FT_Outline_Done_Internal( FT_Memory    memory,
                            FT_Outline*  outline );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Check                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Check the contents of an outline descriptor.                       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    outline :: A handle to a source outline.                           */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    An empty outline, or an outline with a single point only is also   */
  /*    valid.                                                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Check( FT_Outline*  outline );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Get_CBox                                                */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Return an outline's `control box'.  The control box encloses all   */
  /*    the outline's points, including Bezier control points.  Though it  */
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
  /*    outline :: A pointer to the source outline descriptor.             */
  /*                                                                       */
  /* <Output>                                                              */
  /*    acbox   :: The outline's control box.                              */
  /*                                                                       */
  /* <Note>                                                                */
  /*    See @FT_Glyph_Get_CBox for a discussion of tricky fonts.           */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Outline_Get_CBox( const FT_Outline*  outline,
                       FT_BBox           *acbox );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Translate                                               */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Apply a simple translation to the points of an outline.            */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    outline :: A pointer to the target outline descriptor.             */
  /*                                                                       */
  /* <Input>                                                               */
  /*    xOffset :: The horizontal offset.                                  */
  /*                                                                       */
  /*    yOffset :: The vertical offset.                                    */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Outline_Translate( const FT_Outline*  outline,
                        FT_Pos             xOffset,
                        FT_Pos             yOffset );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Copy                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Copy an outline into another one.  Both objects must have the      */
  /*    same sizes (number of points & number of contours) when this       */
  /*    function is called.                                                */
  /*                                                                       */
  /* <Input>                                                               */
  /*    source :: A handle to the source outline.                          */
  /*                                                                       */
  /* <Output>                                                              */
  /*    target :: A handle to the target outline.                          */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Copy( const FT_Outline*  source,
                   FT_Outline        *target );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Transform                                               */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Apply a simple 2x2 matrix to all of an outline's points.  Useful   */
  /*    for applying rotations, slanting, flipping, etc.                   */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    outline :: A pointer to the target outline descriptor.             */
  /*                                                                       */
  /* <Input>                                                               */
  /*    matrix  :: A pointer to the transformation matrix.                 */
  /*                                                                       */
  /* <Note>                                                                */
  /*    You can use @FT_Outline_Translate if you need to translate the     */
  /*    outline's points.                                                  */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Outline_Transform( const FT_Outline*  outline,
                        const FT_Matrix*   matrix );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Embolden                                                */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Embolden an outline.  The new outline will be at most 4~times      */
  /*    `strength' pixels wider and higher.  You may think of the left and */
  /*    bottom borders as unchanged.                                       */
  /*                                                                       */
  /*    Negative `strength' values to reduce the outline thickness are     */
  /*    possible also.                                                     */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    outline  :: A handle to the target outline.                        */
  /*                                                                       */
  /* <Input>                                                               */
  /*    strength :: How strong the glyph is emboldened.  Expressed in      */
  /*                26.6 pixel format.                                     */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The used algorithm to increase or decrease the thickness of the    */
  /*    glyph doesn't change the number of points; this means that certain */
  /*    situations like acute angles or intersections are sometimes        */
  /*    handled incorrectly.                                               */
  /*                                                                       */
  /*    If you need `better' metrics values you should call                */
  /*    @FT_Outline_Get_CBox or @FT_Outline_Get_BBox.                      */
  /*                                                                       */
  /*    Example call:                                                      */
  /*                                                                       */
  /*    {                                                                  */
  /*      FT_Load_Glyph( face, index, FT_LOAD_DEFAULT );                   */
  /*      if ( face->glyph->format == FT_GLYPH_FORMAT_OUTLINE )            */
  /*        FT_Outline_Embolden( &face->glyph->outline, strength );        */
  /*    }                                                                  */
  /*                                                                       */
  /*    To get meaningful results, font scaling values must be set with    */
  /*    functions like @FT_Set_Char_Size before calling FT_Render_Glyph.   */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Embolden( FT_Outline*  outline,
                       FT_Pos       strength );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_EmboldenXY                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Embolden an outline.  The new outline will be `xstrength' pixels   */
  /*    wider and `ystrength' pixels higher.  Otherwise, it is similar to  */
  /*    @FT_Outline_Embolden, which uses the same strength in both         */
  /*    directions.                                                        */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.4.10                                                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_EmboldenXY( FT_Outline*  outline,
                         FT_Pos       xstrength,
                         FT_Pos       ystrength );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Reverse                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Reverse the drawing direction of an outline.  This is used to      */
  /*    ensure consistent fill conventions for mirrored glyphs.            */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    outline :: A pointer to the target outline descriptor.             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This function toggles the bit flag @FT_OUTLINE_REVERSE_FILL in     */
  /*    the outline's `flags' field.                                       */
  /*                                                                       */
  /*    It shouldn't be used by a normal client application, unless it     */
  /*    knows what it is doing.                                            */
  /*                                                                       */
  FT_EXPORT( void )
  FT_Outline_Reverse( FT_Outline*  outline );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Get_Bitmap                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Render an outline within a bitmap.  The outline's image is simply  */
  /*    OR-ed to the target bitmap.                                        */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library :: A handle to a FreeType library object.                  */
  /*                                                                       */
  /*    outline :: A pointer to the source outline descriptor.             */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    abitmap :: A pointer to the target bitmap descriptor.              */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This function does NOT CREATE the bitmap, it only renders an       */
  /*    outline image within the one you pass to it!  Consequently, the    */
  /*    various fields in `abitmap' should be set accordingly.             */
  /*                                                                       */
  /*    It will use the raster corresponding to the default glyph format.  */
  /*                                                                       */
  /*    The value of the `num_grays' field in `abitmap' is ignored.  If    */
  /*    you select the gray-level rasterizer, and you want less than 256   */
  /*    gray levels, you have to use @FT_Outline_Render directly.          */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Get_Bitmap( FT_Library        library,
                         FT_Outline*       outline,
                         const FT_Bitmap  *abitmap );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Outline_Render                                                  */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Render an outline within a bitmap using the current scan-convert.  */
  /*    This function uses an @FT_Raster_Params structure as an argument,  */
  /*    allowing advanced features like direct composition, translucency,  */
  /*    etc.                                                               */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library :: A handle to a FreeType library object.                  */
  /*                                                                       */
  /*    outline :: A pointer to the source outline descriptor.             */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    params  :: A pointer to an @FT_Raster_Params structure used to     */
  /*               describe the rendering operation.                       */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    You should know what you are doing and how @FT_Raster_Params works */
  /*    to use this function.                                              */
  /*                                                                       */
  /*    The field `params.source' will be set to `outline' before the scan */
  /*    converter is called, which means that the value you give to it is  */
  /*    actually ignored.                                                  */
  /*                                                                       */
  /*    The gray-level rasterizer always uses 256 gray levels.  If you     */
  /*    want less gray levels, you have to provide your own span callback. */
  /*    See the @FT_RASTER_FLAG_DIRECT value of the `flags' field in the   */
  /*    @FT_Raster_Params structure for more details.                      */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Outline_Render( FT_Library         library,
                     FT_Outline*        outline,
                     FT_Raster_Params*  params );


 /**************************************************************************
  *
  * @enum:
  *   FT_Orientation
  *
  * @description:
  *   A list of values used to describe an outline's contour orientation.
  *
  *   The TrueType and PostScript specifications use different conventions
  *   to determine whether outline contours should be filled or unfilled.
  *
  * @values:
  *   FT_ORIENTATION_TRUETYPE ::
  *     According to the TrueType specification, clockwise contours must
  *     be filled, and counter-clockwise ones must be unfilled.
  *
  *   FT_ORIENTATION_POSTSCRIPT ::
  *     According to the PostScript specification, counter-clockwise contours
  *     must be filled, and clockwise ones must be unfilled.
  *
  *   FT_ORIENTATION_FILL_RIGHT ::
  *     This is identical to @FT_ORIENTATION_TRUETYPE, but is used to
  *     remember that in TrueType, everything that is to the right of
  *     the drawing direction of a contour must be filled.
  *
  *   FT_ORIENTATION_FILL_LEFT ::
  *     This is identical to @FT_ORIENTATION_POSTSCRIPT, but is used to
  *     remember that in PostScript, everything that is to the left of
  *     the drawing direction of a contour must be filled.
  *
  *   FT_ORIENTATION_NONE ::
  *     The orientation cannot be determined.  That is, different parts of
  *     the glyph have different orientation.
  *
  */
  typedef enum  FT_Orientation_
  {
    FT_ORIENTATION_TRUETYPE   = 0,
    FT_ORIENTATION_POSTSCRIPT = 1,
    FT_ORIENTATION_FILL_RIGHT = FT_ORIENTATION_TRUETYPE,
    FT_ORIENTATION_FILL_LEFT  = FT_ORIENTATION_POSTSCRIPT,
    FT_ORIENTATION_NONE

  } FT_Orientation;


 /**************************************************************************
  *
  * @function:
  *   FT_Outline_Get_Orientation
  *
  * @description:
  *   This function analyzes a glyph outline and tries to compute its
  *   fill orientation (see @FT_Orientation).  This is done by integrating
  *   the total area covered by the outline. The positive integral
  *   corresponds to the clockwise orientation and @FT_ORIENTATION_POSTSCRIPT
  *   is returned. The negative integral corresponds to the counter-clockwise
  *   orientation and @FT_ORIENTATION_TRUETYPE is returned.
  *
  *   Note that this will return @FT_ORIENTATION_TRUETYPE for empty
  *   outlines.
  *
  * @input:
  *   outline ::
  *     A handle to the source outline.
  *
  * @return:
  *   The orientation.
  *
  */
  FT_EXPORT( FT_Orientation )
  FT_Outline_Get_Orientation( FT_Outline*  outline );

  /* */


FT_END_HEADER

#endif /* FTOUTLN_H_ */


/* END */


/* Local Variables: */
/* coding: utf-8    */
/* End:             */
