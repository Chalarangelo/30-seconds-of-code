/***************************************************************************/
/*                                                                         */
/*  ftmm.h                                                                 */
/*                                                                         */
/*    FreeType Multiple Master font interface (specification).             */
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


#ifndef FTMM_H_
#define FTMM_H_


#include <ft2build.h>
#include FT_TYPE1_TABLES_H


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    multiple_masters                                                   */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Multiple Masters                                                   */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    How to manage Multiple Masters fonts.                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The following types and functions are used to manage Multiple      */
  /*    Master fonts, i.e., the selection of specific design instances by  */
  /*    setting design axis coordinates.                                   */
  /*                                                                       */
  /*    Besides Adobe MM fonts, the interface supports Apple's TrueType GX */
  /*    and OpenType variation fonts.  Some of the routines only work with */
  /*    Adobe MM fonts, others will work with all three types.  They are   */
  /*    similar enough that a consistent interface makes sense.            */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_MM_Axis                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to model a given axis in design space for Multiple     */
  /*    Masters fonts.                                                     */
  /*                                                                       */
  /*    This structure can't be used for TrueType GX or OpenType variation */
  /*    fonts.                                                             */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    name    :: The axis's name.                                        */
  /*                                                                       */
  /*    minimum :: The axis's minimum design coordinate.                   */
  /*                                                                       */
  /*    maximum :: The axis's maximum design coordinate.                   */
  /*                                                                       */
  typedef struct  FT_MM_Axis_
  {
    FT_String*  name;
    FT_Long     minimum;
    FT_Long     maximum;

  } FT_MM_Axis;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Multi_Master                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to model the axes and space of a Multiple Masters      */
  /*    font.                                                              */
  /*                                                                       */
  /*    This structure can't be used for TrueType GX or OpenType variation */
  /*    fonts.                                                             */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    num_axis    :: Number of axes.  Cannot exceed~4.                   */
  /*                                                                       */
  /*    num_designs :: Number of designs; should be normally 2^num_axis    */
  /*                   even though the Type~1 specification strangely      */
  /*                   allows for intermediate designs to be present.      */
  /*                   This number cannot exceed~16.                       */
  /*                                                                       */
  /*    axis        :: A table of axis descriptors.                        */
  /*                                                                       */
  typedef struct  FT_Multi_Master_
  {
    FT_UInt     num_axis;
    FT_UInt     num_designs;
    FT_MM_Axis  axis[T1_MAX_MM_AXIS];

  } FT_Multi_Master;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Var_Axis                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to model a given axis in design space for Multiple     */
  /*    Masters, TrueType GX, and OpenType variation fonts.                */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    name    :: The axis's name.                                        */
  /*               Not always meaningful for TrueType GX or OpenType       */
  /*               variation fonts.                                        */
  /*                                                                       */
  /*    minimum :: The axis's minimum design coordinate.                   */
  /*                                                                       */
  /*    def     :: The axis's default design coordinate.                   */
  /*               FreeType computes meaningful default values for Adobe   */
  /*               MM fonts.                                               */
  /*                                                                       */
  /*    maximum :: The axis's maximum design coordinate.                   */
  /*                                                                       */
  /*    tag     :: The axis's tag (the equivalent to `name' for TrueType   */
  /*               GX and OpenType variation fonts).  FreeType provides    */
  /*               default values for Adobe MM fonts if possible.          */
  /*                                                                       */
  /*    strid   :: The axis name entry in the font's `name' table.  This   */
  /*               is another (and often better) version of the `name'     */
  /*               field for TrueType GX or OpenType variation fonts.  Not */
  /*               meaningful for Adobe MM fonts.                          */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The fields `minimum', `def', and `maximum' are 16.16 fractional    */
  /*    values for TrueType GX and OpenType variation fonts.  For Adobe MM */
  /*    fonts, the values are integers.                                    */
  /*                                                                       */
  typedef struct  FT_Var_Axis_
  {
    FT_String*  name;

    FT_Fixed    minimum;
    FT_Fixed    def;
    FT_Fixed    maximum;

    FT_ULong    tag;
    FT_UInt     strid;

  } FT_Var_Axis;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Var_Named_Style                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to model a named instance in a TrueType GX or OpenType */
  /*    variation font.                                                    */
  /*                                                                       */
  /*    This structure can't be used for Adobe MM fonts.                   */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    coords :: The design coordinates for this instance.                */
  /*              This is an array with one entry for each axis.           */
  /*                                                                       */
  /*    strid  :: The entry in `name' table identifying this instance.     */
  /*                                                                       */
  /*    psid   :: The entry in `name' table identifying a PostScript name  */
  /*              for this instance.  Value 0xFFFF indicates a missing     */
  /*              entry.                                                   */
  /*                                                                       */
  typedef struct  FT_Var_Named_Style_
  {
    FT_Fixed*  coords;
    FT_UInt    strid;
    FT_UInt    psid;   /* since 2.7.1 */

  } FT_Var_Named_Style;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_MM_Var                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to model the axes and space of an Adobe MM, TrueType   */
  /*    GX, or OpenType variation font.                                    */
  /*                                                                       */
  /*    Some fields are specific to one format and not to the others.      */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    num_axis        :: The number of axes.  The maximum value is~4 for */
  /*                       Adobe MM fonts; no limit in TrueType GX or      */
  /*                       OpenType variation fonts.                       */
  /*                                                                       */
  /*    num_designs     :: The number of designs; should be normally       */
  /*                       2^num_axis for Adobe MM fonts.  Not meaningful  */
  /*                       for TrueType GX or OpenType variation fonts     */
  /*                       (where every glyph could have a different       */
  /*                       number of designs).                             */
  /*                                                                       */
  /*    num_namedstyles :: The number of named styles; a `named style' is  */
  /*                       a tuple of design coordinates that has a string */
  /*                       ID (in the `name' table) associated with it.    */
  /*                       The font can tell the user that, for example,   */
  /*                       [Weight=1.5,Width=1.1] is `Bold'.  Another name */
  /*                       for `named style' is `named instance'.          */
  /*                                                                       */
  /*                       For Adobe Multiple Masters fonts, this value is */
  /*                       always zero because the format does not support */
  /*                       named styles.                                   */
  /*                                                                       */
  /*    axis            :: An axis descriptor table.                       */
  /*                       TrueType GX and OpenType variation fonts        */
  /*                       contain slightly more data than Adobe MM fonts. */
  /*                       Memory management of this pointer is done       */
  /*                       internally by FreeType.                         */
  /*                                                                       */
  /*    namedstyle      :: A named style (instance) table.                 */
  /*                       Only meaningful for TrueType GX and OpenType    */
  /*                       variation fonts.  Memory management of this     */
  /*                       pointer is done internally by FreeType.         */
  /*                                                                       */
  typedef struct  FT_MM_Var_
  {
    FT_UInt              num_axis;
    FT_UInt              num_designs;
    FT_UInt              num_namedstyles;
    FT_Var_Axis*         axis;
    FT_Var_Named_Style*  namedstyle;

  } FT_MM_Var;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Multi_Master                                                */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Retrieve a variation descriptor of a given Adobe MM font.          */
  /*                                                                       */
  /*    This function can't be used with TrueType GX or OpenType variation */
  /*    fonts.                                                             */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face    :: A handle to the source face.                            */
  /*                                                                       */
  /* <Output>                                                              */
  /*    amaster :: The Multiple Masters descriptor.                        */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Multi_Master( FT_Face           face,
                       FT_Multi_Master  *amaster );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_MM_Var                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Retrieve a variation descriptor for a given font.                  */
  /*                                                                       */
  /*    This function works with all supported variation formats.          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face    :: A handle to the source face.                            */
  /*                                                                       */
  /* <Output>                                                              */
  /*    amaster :: The variation descriptor.                               */
  /*               Allocates a data structure, which the user must         */
  /*               deallocate with a call to @FT_Done_MM_Var after use.    */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_MM_Var( FT_Face      face,
                 FT_MM_Var*  *amaster );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Done_MM_Var                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Free the memory allocated by @FT_Get_MM_Var.                       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    library :: A handle of the face's parent library object that was   */
  /*               used in the call to @FT_Get_MM_Var to create `amaster'. */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Done_MM_Var( FT_Library   library,
                  FT_MM_Var   *amaster );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Set_MM_Design_Coordinates                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    For Adobe MM fonts, choose an interpolated font design through     */
  /*    design coordinates.                                                */
  /*                                                                       */
  /*    This function can't be used with TrueType GX or OpenType variation */
  /*    fonts.                                                             */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    face       :: A handle to the source face.                         */
  /*                                                                       */
  /* <Input>                                                               */
  /*    num_coords :: The number of available design coordinates.  If it   */
  /*                  is larger than the number of axes, ignore the excess */
  /*                  values.  If it is smaller than the number of axes,   */
  /*                  use default values for the remaining axes.           */
  /*                                                                       */
  /*    coords     :: An array of design coordinates.                      */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    [Since 2.8.1] To reset all axes to the default values, call the    */
  /*    function with `num_coords' set to zero and `coords' set to NULL.   */
  /*                                                                       */
  /*    [Since 2.9] If `num_coords' is larger than zero, this function     */
  /*    sets the @FT_FACE_FLAG_VARIATION bit in @FT_Face's `face_flags'    */
  /*    field (i.e., @FT_IS_VARIATION will return true).  If `num_coords'  */
  /*    is zero, this bit flag gets unset.                                 */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Set_MM_Design_Coordinates( FT_Face   face,
                                FT_UInt   num_coords,
                                FT_Long*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Set_Var_Design_Coordinates                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Choose an interpolated font design through design coordinates.     */
  /*                                                                       */
  /*    This function works with all supported variation formats.          */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    face       :: A handle to the source face.                         */
  /*                                                                       */
  /* <Input>                                                               */
  /*    num_coords :: The number of available design coordinates.  If it   */
  /*                  is larger than the number of axes, ignore the excess */
  /*                  values.  If it is smaller than the number of axes,   */
  /*                  use default values for the remaining axes.           */
  /*                                                                       */
  /*    coords     :: An array of design coordinates.                      */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    [Since 2.8.1] To reset all axes to the default values, call the    */
  /*    function with `num_coords' set to zero and `coords' set to NULL.   */
  /*    [Since 2.9] `Default values' means the currently selected named    */
  /*    instance (or the base font if no named instance is selected).      */
  /*                                                                       */
  /*    [Since 2.9] If `num_coords' is larger than zero, this function     */
  /*    sets the @FT_FACE_FLAG_VARIATION bit in @FT_Face's `face_flags'    */
  /*    field (i.e., @FT_IS_VARIATION will return true).  If `num_coords'  */
  /*    is zero, this bit flag gets unset.                                 */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Set_Var_Design_Coordinates( FT_Face    face,
                                 FT_UInt    num_coords,
                                 FT_Fixed*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Var_Design_Coordinates                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Get the design coordinates of the currently selected interpolated  */
  /*    font.                                                              */
  /*                                                                       */
  /*    This function works with all supported variation formats.          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face       :: A handle to the source face.                         */
  /*                                                                       */
  /*    num_coords :: The number of design coordinates to retrieve.  If it */
  /*                  is larger than the number of axes, set the excess    */
  /*                  values to~0.                                         */
  /*                                                                       */
  /* <Output>                                                              */
  /*    coords     :: The design coordinates array.                        */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.7.1                                                              */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Var_Design_Coordinates( FT_Face    face,
                                 FT_UInt    num_coords,
                                 FT_Fixed*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Set_MM_Blend_Coordinates                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Choose an interpolated font design through normalized blend        */
  /*    coordinates.                                                       */
  /*                                                                       */
  /*    This function works with all supported variation formats.          */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    face       :: A handle to the source face.                         */
  /*                                                                       */
  /* <Input>                                                               */
  /*    num_coords :: The number of available design coordinates.  If it   */
  /*                  is larger than the number of axes, ignore the excess */
  /*                  values.  If it is smaller than the number of axes,   */
  /*                  use default values for the remaining axes.           */
  /*                                                                       */
  /*    coords     :: The design coordinates array (each element must be   */
  /*                  between 0 and 1.0 for Adobe MM fonts, and between    */
  /*                  -1.0 and 1.0 for TrueType GX and OpenType variation  */
  /*                  fonts).                                              */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    [Since 2.8.1] To reset all axes to the default values, call the    */
  /*    function with `num_coords' set to zero and `coords' set to NULL.   */
  /*    [Since 2.9] `Default values' means the currently selected named    */
  /*    instance (or the base font if no named instance is selected).      */
  /*                                                                       */
  /*    [Since 2.9] If `num_coords' is larger than zero, this function     */
  /*    sets the @FT_FACE_FLAG_VARIATION bit in @FT_Face's `face_flags'    */
  /*    field (i.e., @FT_IS_VARIATION will return true).  If `num_coords'  */
  /*    is zero, this bit flag gets unset.                                 */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Set_MM_Blend_Coordinates( FT_Face    face,
                               FT_UInt    num_coords,
                               FT_Fixed*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_MM_Blend_Coordinates                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Get the normalized blend coordinates of the currently selected     */
  /*    interpolated font.                                                 */
  /*                                                                       */
  /*    This function works with all supported variation formats.          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face       :: A handle to the source face.                         */
  /*                                                                       */
  /*    num_coords :: The number of normalized blend coordinates to        */
  /*                  retrieve.  If it is larger than the number of axes,  */
  /*                  set the excess values to~0.5 for Adobe MM fonts, and */
  /*                  to~0 for TrueType GX and OpenType variation fonts.   */
  /*                                                                       */
  /* <Output>                                                              */
  /*    coords     :: The normalized blend coordinates array.              */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.7.1                                                              */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_MM_Blend_Coordinates( FT_Face    face,
                               FT_UInt    num_coords,
                               FT_Fixed*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Set_Var_Blend_Coordinates                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This is another name of @FT_Set_MM_Blend_Coordinates.              */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Set_Var_Blend_Coordinates( FT_Face    face,
                                FT_UInt    num_coords,
                                FT_Fixed*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Var_Blend_Coordinates                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This is another name of @FT_Get_MM_Blend_Coordinates.              */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.7.1                                                              */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Var_Blend_Coordinates( FT_Face    face,
                                FT_UInt    num_coords,
                                FT_Fixed*  coords );


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    FT_VAR_AXIS_FLAG_XXX                                               */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A list of bit flags used in the return value of                    */
  /*    @FT_Get_Var_Axis_Flags.                                            */
  /*                                                                       */
  /* <Values>                                                              */
  /*    FT_VAR_AXIS_FLAG_HIDDEN ::                                         */
  /*      The variation axis should not be exposed to user interfaces.     */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.8.1                                                              */
  /*                                                                       */
#define FT_VAR_AXIS_FLAG_HIDDEN  1


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Get_Var_Axis_Flags                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Get the `flags' field of an OpenType Variation Axis Record.        */
  /*                                                                       */
  /*    Not meaningful for Adobe MM fonts (`*flags' is always zero).       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    master     :: The variation descriptor.                            */
  /*                                                                       */
  /*    axis_index :: The index of the requested variation axis.           */
  /*                                                                       */
  /* <Output>                                                              */
  /*    flags      :: The `flags' field.  See @FT_VAR_AXIS_FLAG_XXX for    */
  /*                  possible values.                                     */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.8.1                                                              */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Get_Var_Axis_Flags( FT_MM_Var*  master,
                         FT_UInt     axis_index,
                         FT_UInt*    flags );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_Set_Named_Instance                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Set or change the current named instance.                          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    face           :: A handle to the source face.                     */
  /*                                                                       */
  /*    instance_index :: The index of the requested instance, starting    */
  /*                      with value 1.  If set to value 0, FreeType       */
  /*                      switches to font access without a named          */
  /*                      instance.                                        */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The function uses the value of `instance_index' to set bits 16-30  */
  /*    of the face's `face_index' field.  It also resets any variation    */
  /*    applied to the font, and the @FT_FACE_FLAG_VARIATION bit of the    */
  /*    face's `face_flags' field gets reset to zero (i.e.,                */
  /*    @FT_IS_VARIATION will return false).                               */
  /*                                                                       */
  /*    For Adobe MM fonts (which don't have named instances) this         */
  /*    function simply resets the current face to the default instance.   */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.9                                                                */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_Set_Named_Instance( FT_Face  face,
                         FT_UInt  instance_index );

  /* */


FT_END_HEADER

#endif /* FTMM_H_ */


/* END */
