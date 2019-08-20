/***************************************************************************/
/*                                                                         */
/*  ftimage.h                                                              */
/*                                                                         */
/*    FreeType glyph image formats and default raster interface            */
/*    (specification).                                                     */
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
  /* Note: A `raster' is simply a scan-line converter, used to render      */
  /*       FT_Outlines into FT_Bitmaps.                                    */
  /*                                                                       */
  /*************************************************************************/


#ifndef FTIMAGE_H_
#define FTIMAGE_H_


  /* STANDALONE_ is from ftgrays.c */
#ifndef STANDALONE_
#include <ft2build.h>
#endif


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    basic_types                                                        */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Pos                                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The type FT_Pos is used to store vectorial coordinates.  Depending */
  /*    on the context, these can represent distances in integer font      */
  /*    units, or 16.16, or 26.6 fixed-point pixel coordinates.            */
  /*                                                                       */
  typedef signed long  FT_Pos;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Vector                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple structure used to store a 2D vector; coordinates are of   */
  /*    the FT_Pos type.                                                   */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    x :: The horizontal coordinate.                                    */
  /*    y :: The vertical coordinate.                                      */
  /*                                                                       */
  typedef struct  FT_Vector_
  {
    FT_Pos  x;
    FT_Pos  y;

  } FT_Vector;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_BBox                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to hold an outline's bounding box, i.e., the      */
  /*    coordinates of its extrema in the horizontal and vertical          */
  /*    directions.                                                        */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    xMin :: The horizontal minimum (left-most).                        */
  /*                                                                       */
  /*    yMin :: The vertical minimum (bottom-most).                        */
  /*                                                                       */
  /*    xMax :: The horizontal maximum (right-most).                       */
  /*                                                                       */
  /*    yMax :: The vertical maximum (top-most).                           */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The bounding box is specified with the coordinates of the lower    */
  /*    left and the upper right corner.  In PostScript, those values are  */
  /*    often called (llx,lly) and (urx,ury), respectively.                */
  /*                                                                       */
  /*    If `yMin' is negative, this value gives the glyph's descender.     */
  /*    Otherwise, the glyph doesn't descend below the baseline.           */
  /*    Similarly, if `ymax' is positive, this value gives the glyph's     */
  /*    ascender.                                                          */
  /*                                                                       */
  /*    `xMin' gives the horizontal distance from the glyph's origin to    */
  /*    the left edge of the glyph's bounding box.  If `xMin' is negative, */
  /*    the glyph extends to the left of the origin.                       */
  /*                                                                       */
  typedef struct  FT_BBox_
  {
    FT_Pos  xMin, yMin;
    FT_Pos  xMax, yMax;

  } FT_BBox;


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    FT_Pixel_Mode                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An enumeration type used to describe the format of pixels in a     */
  /*    given bitmap.  Note that additional formats may be added in the    */
  /*    future.                                                            */
  /*                                                                       */
  /* <Values>                                                              */
  /*    FT_PIXEL_MODE_NONE ::                                              */
  /*      Value~0 is reserved.                                             */
  /*                                                                       */
  /*    FT_PIXEL_MODE_MONO ::                                              */
  /*      A monochrome bitmap, using 1~bit per pixel.  Note that pixels    */
  /*      are stored in most-significant order (MSB), which means that     */
  /*      the left-most pixel in a byte has value 128.                     */
  /*                                                                       */
  /*    FT_PIXEL_MODE_GRAY ::                                              */
  /*      An 8-bit bitmap, generally used to represent anti-aliased glyph  */
  /*      images.  Each pixel is stored in one byte.  Note that the number */
  /*      of `gray' levels is stored in the `num_grays' field of the       */
  /*      @FT_Bitmap structure (it generally is 256).                      */
  /*                                                                       */
  /*    FT_PIXEL_MODE_GRAY2 ::                                             */
  /*      A 2-bit per pixel bitmap, used to represent embedded             */
  /*      anti-aliased bitmaps in font files according to the OpenType     */
  /*      specification.  We haven't found a single font using this        */
  /*      format, however.                                                 */
  /*                                                                       */
  /*    FT_PIXEL_MODE_GRAY4 ::                                             */
  /*      A 4-bit per pixel bitmap, representing embedded anti-aliased     */
  /*      bitmaps in font files according to the OpenType specification.   */
  /*      We haven't found a single font using this format, however.       */
  /*                                                                       */
  /*    FT_PIXEL_MODE_LCD ::                                               */
  /*      An 8-bit bitmap, representing RGB or BGR decimated glyph images  */
  /*      used for display on LCD displays; the bitmap is three times      */
  /*      wider than the original glyph image.  See also                   */
  /*      @FT_RENDER_MODE_LCD.                                             */
  /*                                                                       */
  /*    FT_PIXEL_MODE_LCD_V ::                                             */
  /*      An 8-bit bitmap, representing RGB or BGR decimated glyph images  */
  /*      used for display on rotated LCD displays; the bitmap is three    */
  /*      times taller than the original glyph image.  See also            */
  /*      @FT_RENDER_MODE_LCD_V.                                           */
  /*                                                                       */
  /*    FT_PIXEL_MODE_BGRA ::                                              */
  /*      [Since 2.5] An image with four 8-bit channels per pixel,         */
  /*      representing a color image (such as emoticons) with alpha        */
  /*      channel.  For each pixel, the format is BGRA, which means, the   */
  /*      blue channel comes first in memory.  The color channels are      */
  /*      pre-multiplied and in the sRGB colorspace.  For example, full    */
  /*      red at half-translucent opacity will be represented as           */
  /*      `00,00,80,80', not `00,00,FF,80'.  See also @FT_LOAD_COLOR.      */
  /*                                                                       */
  typedef enum  FT_Pixel_Mode_
  {
    FT_PIXEL_MODE_NONE = 0,
    FT_PIXEL_MODE_MONO,
    FT_PIXEL_MODE_GRAY,
    FT_PIXEL_MODE_GRAY2,
    FT_PIXEL_MODE_GRAY4,
    FT_PIXEL_MODE_LCD,
    FT_PIXEL_MODE_LCD_V,
    FT_PIXEL_MODE_BGRA,

    FT_PIXEL_MODE_MAX      /* do not remove */

  } FT_Pixel_Mode;


  /* these constants are deprecated; use the corresponding `FT_Pixel_Mode' */
  /* values instead.                                                       */
#define ft_pixel_mode_none   FT_PIXEL_MODE_NONE
#define ft_pixel_mode_mono   FT_PIXEL_MODE_MONO
#define ft_pixel_mode_grays  FT_PIXEL_MODE_GRAY
#define ft_pixel_mode_pal2   FT_PIXEL_MODE_GRAY2
#define ft_pixel_mode_pal4   FT_PIXEL_MODE_GRAY4


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Bitmap                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to describe a bitmap or pixmap to the raster.     */
  /*    Note that we now manage pixmaps of various depths through the      */
  /*    `pixel_mode' field.                                                */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    rows         :: The number of bitmap rows.                         */
  /*                                                                       */
  /*    width        :: The number of pixels in bitmap row.                */
  /*                                                                       */
  /*    pitch        :: The pitch's absolute value is the number of bytes  */
  /*                    taken by one bitmap row, including padding.        */
  /*                    However, the pitch is positive when the bitmap has */
  /*                    a `down' flow, and negative when it has an `up'    */
  /*                    flow.  In all cases, the pitch is an offset to add */
  /*                    to a bitmap pointer in order to go down one row.   */
  /*                                                                       */
  /*                    Note that `padding' means the alignment of a       */
  /*                    bitmap to a byte border, and FreeType functions    */
  /*                    normally align to the smallest possible integer    */
  /*                    value.                                             */
  /*                                                                       */
  /*                    For the B/W rasterizer, `pitch' is always an even  */
  /*                    number.                                            */
  /*                                                                       */
  /*                    To change the pitch of a bitmap (say, to make it a */
  /*                    multiple of 4), use @FT_Bitmap_Convert.            */
  /*                    Alternatively, you might use callback functions to */
  /*                    directly render to the application's surface; see  */
  /*                    the file `example2.cpp' in the tutorial for a      */
  /*                    demonstration.                                     */
  /*                                                                       */
  /*    buffer       :: A typeless pointer to the bitmap buffer.  This     */
  /*                    value should be aligned on 32-bit boundaries in    */
  /*                    most cases.                                        */
  /*                                                                       */
  /*    num_grays    :: This field is only used with                       */
  /*                    @FT_PIXEL_MODE_GRAY; it gives the number of gray   */
  /*                    levels used in the bitmap.                         */
  /*                                                                       */
  /*    pixel_mode   :: The pixel mode, i.e., how pixel bits are stored.   */
  /*                    See @FT_Pixel_Mode for possible values.            */
  /*                                                                       */
  /*    palette_mode :: This field is intended for paletted pixel modes;   */
  /*                    it indicates how the palette is stored.  Not       */
  /*                    used currently.                                    */
  /*                                                                       */
  /*    palette      :: A typeless pointer to the bitmap palette; this     */
  /*                    field is intended for paletted pixel modes.  Not   */
  /*                    used currently.                                    */
  /*                                                                       */
  typedef struct  FT_Bitmap_
  {
    unsigned int    rows;
    unsigned int    width;
    int             pitch;
    unsigned char*  buffer;
    unsigned short  num_grays;
    unsigned char   pixel_mode;
    unsigned char   palette_mode;
    void*           palette;

  } FT_Bitmap;


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    outline_processing                                                 */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Outline                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This structure is used to describe an outline to the scan-line     */
  /*    converter.                                                         */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    n_contours :: The number of contours in the outline.               */
  /*                                                                       */
  /*    n_points   :: The number of points in the outline.                 */
  /*                                                                       */
  /*    points     :: A pointer to an array of `n_points' @FT_Vector       */
  /*                  elements, giving the outline's point coordinates.    */
  /*                                                                       */
  /*    tags       :: A pointer to an array of `n_points' chars, giving    */
  /*                  each outline point's type.                           */
  /*                                                                       */
  /*                  If bit~0 is unset, the point is `off' the curve,     */
  /*                  i.e., a Bezier control point, while it is `on' if    */
  /*                  set.                                                 */
  /*                                                                       */
  /*                  Bit~1 is meaningful for `off' points only.  If set,  */
  /*                  it indicates a third-order Bezier arc control point; */
  /*                  and a second-order control point if unset.           */
  /*                                                                       */
  /*                  If bit~2 is set, bits 5-7 contain the drop-out mode  */
  /*                  (as defined in the OpenType specification; the value */
  /*                  is the same as the argument to the SCANMODE          */
  /*                  instruction).                                        */
  /*                                                                       */
  /*                  Bits 3 and~4 are reserved for internal purposes.     */
  /*                                                                       */
  /*    contours   :: An array of `n_contours' shorts, giving the end      */
  /*                  point of each contour within the outline.  For       */
  /*                  example, the first contour is defined by the points  */
  /*                  `0' to `contours[0]', the second one is defined by   */
  /*                  the points `contours[0]+1' to `contours[1]', etc.    */
  /*                                                                       */
  /*    flags      :: A set of bit flags used to characterize the outline  */
  /*                  and give hints to the scan-converter and hinter on   */
  /*                  how to convert/grid-fit it.  See @FT_OUTLINE_XXX.    */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The B/W rasterizer only checks bit~2 in the `tags' array for the   */
  /*    first point of each contour.  The drop-out mode as given with      */
  /*    @FT_OUTLINE_IGNORE_DROPOUTS, @FT_OUTLINE_SMART_DROPOUTS, and       */
  /*    @FT_OUTLINE_INCLUDE_STUBS in `flags' is then overridden.           */
  /*                                                                       */
  typedef struct  FT_Outline_
  {
    short       n_contours;      /* number of contours in glyph        */
    short       n_points;        /* number of points in the glyph      */

    FT_Vector*  points;          /* the outline's points               */
    char*       tags;            /* the points flags                   */
    short*      contours;        /* the contour end points             */

    int         flags;           /* outline masks                      */

  } FT_Outline;

  /* */

  /* Following limits must be consistent with */
  /* FT_Outline.{n_contours,n_points}         */
#define FT_OUTLINE_CONTOURS_MAX  SHRT_MAX
#define FT_OUTLINE_POINTS_MAX    SHRT_MAX


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    FT_OUTLINE_XXX                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A list of bit-field constants use for the flags in an outline's    */
  /*    `flags' field.                                                     */
  /*                                                                       */
  /* <Values>                                                              */
  /*    FT_OUTLINE_NONE ::                                                 */
  /*      Value~0 is reserved.                                             */
  /*                                                                       */
  /*    FT_OUTLINE_OWNER ::                                                */
  /*      If set, this flag indicates that the outline's field arrays      */
  /*      (i.e., `points', `flags', and `contours') are `owned' by the     */
  /*      outline object, and should thus be freed when it is destroyed.   */
  /*                                                                       */
  /*    FT_OUTLINE_EVEN_ODD_FILL ::                                        */
  /*      By default, outlines are filled using the non-zero winding rule. */
  /*      If set to 1, the outline will be filled using the even-odd fill  */
  /*      rule (only works with the smooth rasterizer).                    */
  /*                                                                       */
  /*    FT_OUTLINE_REVERSE_FILL ::                                         */
  /*      By default, outside contours of an outline are oriented in       */
  /*      clock-wise direction, as defined in the TrueType specification.  */
  /*      This flag is set if the outline uses the opposite direction      */
  /*      (typically for Type~1 fonts).  This flag is ignored by the scan  */
  /*      converter.                                                       */
  /*                                                                       */
  /*    FT_OUTLINE_IGNORE_DROPOUTS ::                                      */
  /*      By default, the scan converter will try to detect drop-outs in   */
  /*      an outline and correct the glyph bitmap to ensure consistent     */
  /*      shape continuity.  If set, this flag hints the scan-line         */
  /*      converter to ignore such cases.  See below for more information. */
  /*                                                                       */
  /*    FT_OUTLINE_SMART_DROPOUTS ::                                       */
  /*      Select smart dropout control.  If unset, use simple dropout      */
  /*      control.  Ignored if @FT_OUTLINE_IGNORE_DROPOUTS is set.  See    */
  /*      below for more information.                                      */
  /*                                                                       */
  /*    FT_OUTLINE_INCLUDE_STUBS ::                                        */
  /*      If set, turn pixels on for `stubs', otherwise exclude them.      */
  /*      Ignored if @FT_OUTLINE_IGNORE_DROPOUTS is set.  See below for    */
  /*      more information.                                                */
  /*                                                                       */
  /*    FT_OUTLINE_HIGH_PRECISION ::                                       */
  /*      This flag indicates that the scan-line converter should try to   */
  /*      convert this outline to bitmaps with the highest possible        */
  /*      quality.  It is typically set for small character sizes.  Note   */
  /*      that this is only a hint that might be completely ignored by a   */
  /*      given scan-converter.                                            */
  /*                                                                       */
  /*    FT_OUTLINE_SINGLE_PASS ::                                          */
  /*      This flag is set to force a given scan-converter to only use a   */
  /*      single pass over the outline to render a bitmap glyph image.     */
  /*      Normally, it is set for very large character sizes.  It is only  */
  /*      a hint that might be completely ignored by a given               */
  /*      scan-converter.                                                  */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The flags @FT_OUTLINE_IGNORE_DROPOUTS, @FT_OUTLINE_SMART_DROPOUTS, */
  /*    and @FT_OUTLINE_INCLUDE_STUBS are ignored by the smooth            */
  /*    rasterizer.                                                        */
  /*                                                                       */
  /*    There exists a second mechanism to pass the drop-out mode to the   */
  /*    B/W rasterizer; see the `tags' field in @FT_Outline.               */
  /*                                                                       */
  /*    Please refer to the description of the `SCANTYPE' instruction in   */
  /*    the OpenType specification (in file `ttinst1.doc') how simple      */
  /*    drop-outs, smart drop-outs, and stubs are defined.                 */
  /*                                                                       */
#define FT_OUTLINE_NONE             0x0
#define FT_OUTLINE_OWNER            0x1
#define FT_OUTLINE_EVEN_ODD_FILL    0x2
#define FT_OUTLINE_REVERSE_FILL     0x4
#define FT_OUTLINE_IGNORE_DROPOUTS  0x8
#define FT_OUTLINE_SMART_DROPOUTS   0x10
#define FT_OUTLINE_INCLUDE_STUBS    0x20

#define FT_OUTLINE_HIGH_PRECISION   0x100
#define FT_OUTLINE_SINGLE_PASS      0x200


  /* these constants are deprecated; use the corresponding */
  /* `FT_OUTLINE_XXX' values instead                       */
#define ft_outline_none             FT_OUTLINE_NONE
#define ft_outline_owner            FT_OUTLINE_OWNER
#define ft_outline_even_odd_fill    FT_OUTLINE_EVEN_ODD_FILL
#define ft_outline_reverse_fill     FT_OUTLINE_REVERSE_FILL
#define ft_outline_ignore_dropouts  FT_OUTLINE_IGNORE_DROPOUTS
#define ft_outline_high_precision   FT_OUTLINE_HIGH_PRECISION
#define ft_outline_single_pass      FT_OUTLINE_SINGLE_PASS

  /* */

#define FT_CURVE_TAG( flag )  ( flag & 3 )

#define FT_CURVE_TAG_ON            1
#define FT_CURVE_TAG_CONIC         0
#define FT_CURVE_TAG_CUBIC         2

#define FT_CURVE_TAG_HAS_SCANMODE  4

#define FT_CURVE_TAG_TOUCH_X       8  /* reserved for the TrueType hinter */
#define FT_CURVE_TAG_TOUCH_Y      16  /* reserved for the TrueType hinter */

#define FT_CURVE_TAG_TOUCH_BOTH    ( FT_CURVE_TAG_TOUCH_X | \
                                     FT_CURVE_TAG_TOUCH_Y )

#define FT_Curve_Tag_On       FT_CURVE_TAG_ON
#define FT_Curve_Tag_Conic    FT_CURVE_TAG_CONIC
#define FT_Curve_Tag_Cubic    FT_CURVE_TAG_CUBIC
#define FT_Curve_Tag_Touch_X  FT_CURVE_TAG_TOUCH_X
#define FT_Curve_Tag_Touch_Y  FT_CURVE_TAG_TOUCH_Y


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Outline_MoveToFunc                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function pointer type used to describe the signature of a `move  */
  /*    to' function during outline walking/decomposition.                 */
  /*                                                                       */
  /*    A `move to' is emitted to start a new contour in an outline.       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    to   :: A pointer to the target point of the `move to'.            */
  /*                                                                       */
  /*    user :: A typeless pointer, which is passed from the caller of the */
  /*            decomposition function.                                    */
  /*                                                                       */
  /* <Return>                                                              */
  /*    Error code.  0~means success.                                      */
  /*                                                                       */
  typedef int
  (*FT_Outline_MoveToFunc)( const FT_Vector*  to,
                            void*             user );

#define FT_Outline_MoveTo_Func  FT_Outline_MoveToFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Outline_LineToFunc                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function pointer type used to describe the signature of a `line  */
  /*    to' function during outline walking/decomposition.                 */
  /*                                                                       */
  /*    A `line to' is emitted to indicate a segment in the outline.       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    to   :: A pointer to the target point of the `line to'.            */
  /*                                                                       */
  /*    user :: A typeless pointer, which is passed from the caller of the */
  /*            decomposition function.                                    */
  /*                                                                       */
  /* <Return>                                                              */
  /*    Error code.  0~means success.                                      */
  /*                                                                       */
  typedef int
  (*FT_Outline_LineToFunc)( const FT_Vector*  to,
                            void*             user );

#define FT_Outline_LineTo_Func  FT_Outline_LineToFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Outline_ConicToFunc                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function pointer type used to describe the signature of a `conic */
  /*    to' function during outline walking or decomposition.              */
  /*                                                                       */
  /*    A `conic to' is emitted to indicate a second-order Bezier arc in   */
  /*    the outline.                                                       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    control :: An intermediate control point between the last position */
  /*               and the new target in `to'.                             */
  /*                                                                       */
  /*    to      :: A pointer to the target end point of the conic arc.     */
  /*                                                                       */
  /*    user    :: A typeless pointer, which is passed from the caller of  */
  /*               the decomposition function.                             */
  /*                                                                       */
  /* <Return>                                                              */
  /*    Error code.  0~means success.                                      */
  /*                                                                       */
  typedef int
  (*FT_Outline_ConicToFunc)( const FT_Vector*  control,
                             const FT_Vector*  to,
                             void*             user );

#define FT_Outline_ConicTo_Func  FT_Outline_ConicToFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Outline_CubicToFunc                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function pointer type used to describe the signature of a `cubic */
  /*    to' function during outline walking or decomposition.              */
  /*                                                                       */
  /*    A `cubic to' is emitted to indicate a third-order Bezier arc.      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    control1 :: A pointer to the first Bezier control point.           */
  /*                                                                       */
  /*    control2 :: A pointer to the second Bezier control point.          */
  /*                                                                       */
  /*    to       :: A pointer to the target end point.                     */
  /*                                                                       */
  /*    user     :: A typeless pointer, which is passed from the caller of */
  /*                the decomposition function.                            */
  /*                                                                       */
  /* <Return>                                                              */
  /*    Error code.  0~means success.                                      */
  /*                                                                       */
  typedef int
  (*FT_Outline_CubicToFunc)( const FT_Vector*  control1,
                             const FT_Vector*  control2,
                             const FT_Vector*  to,
                             void*             user );

#define FT_Outline_CubicTo_Func  FT_Outline_CubicToFunc


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Outline_Funcs                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to hold various function pointers used during outline  */
  /*    decomposition in order to emit segments, conic, and cubic Beziers. */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    move_to  :: The `move to' emitter.                                 */
  /*                                                                       */
  /*    line_to  :: The segment emitter.                                   */
  /*                                                                       */
  /*    conic_to :: The second-order Bezier arc emitter.                   */
  /*                                                                       */
  /*    cubic_to :: The third-order Bezier arc emitter.                    */
  /*                                                                       */
  /*    shift    :: The shift that is applied to coordinates before they   */
  /*                are sent to the emitter.                               */
  /*                                                                       */
  /*    delta    :: The delta that is applied to coordinates before they   */
  /*                are sent to the emitter, but after the shift.          */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The point coordinates sent to the emitters are the transformed     */
  /*    version of the original coordinates (this is important for high    */
  /*    accuracy during scan-conversion).  The transformation is simple:   */
  /*                                                                       */
  /*    {                                                                  */
  /*      x' = (x << shift) - delta                                        */
  /*      y' = (y << shift) - delta                                        */
  /*    }                                                                  */
  /*                                                                       */
  /*    Set the values of `shift' and `delta' to~0 to get the original     */
  /*    point coordinates.                                                 */
  /*                                                                       */
  typedef struct  FT_Outline_Funcs_
  {
    FT_Outline_MoveToFunc   move_to;
    FT_Outline_LineToFunc   line_to;
    FT_Outline_ConicToFunc  conic_to;
    FT_Outline_CubicToFunc  cubic_to;

    int                     shift;
    FT_Pos                  delta;

  } FT_Outline_Funcs;


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    basic_types                                                        */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Macro>                                                               */
  /*    FT_IMAGE_TAG                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This macro converts four-letter tags to an unsigned long type.     */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Since many 16-bit compilers don't like 32-bit enumerations, you    */
  /*    should redefine this macro in case of problems to something like   */
  /*    this:                                                              */
  /*                                                                       */
  /*    {                                                                  */
  /*      #define FT_IMAGE_TAG( value, _x1, _x2, _x3, _x4 )  value         */
  /*    }                                                                  */
  /*                                                                       */
  /*    to get a simple enumeration without assigning special numbers.     */
  /*                                                                       */
#ifndef FT_IMAGE_TAG
#define FT_IMAGE_TAG( value, _x1, _x2, _x3, _x4 )  \
          value = ( ( (unsigned long)_x1 << 24 ) | \
                    ( (unsigned long)_x2 << 16 ) | \
                    ( (unsigned long)_x3 << 8  ) | \
                      (unsigned long)_x4         )
#endif /* FT_IMAGE_TAG */


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    FT_Glyph_Format                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An enumeration type used to describe the format of a given glyph   */
  /*    image.  Note that this version of FreeType only supports two image */
  /*    formats, even though future font drivers will be able to register  */
  /*    their own format.                                                  */
  /*                                                                       */
  /* <Values>                                                              */
  /*    FT_GLYPH_FORMAT_NONE ::                                            */
  /*      The value~0 is reserved.                                         */
  /*                                                                       */
  /*    FT_GLYPH_FORMAT_COMPOSITE ::                                       */
  /*      The glyph image is a composite of several other images.  This    */
  /*      format is _only_ used with @FT_LOAD_NO_RECURSE, and is used to   */
  /*      report compound glyphs (like accented characters).               */
  /*                                                                       */
  /*    FT_GLYPH_FORMAT_BITMAP ::                                          */
  /*      The glyph image is a bitmap, and can be described as an          */
  /*      @FT_Bitmap.  You generally need to access the `bitmap' field of  */
  /*      the @FT_GlyphSlotRec structure to read it.                       */
  /*                                                                       */
  /*    FT_GLYPH_FORMAT_OUTLINE ::                                         */
  /*      The glyph image is a vectorial outline made of line segments     */
  /*      and Bezier arcs; it can be described as an @FT_Outline; you      */
  /*      generally want to access the `outline' field of the              */
  /*      @FT_GlyphSlotRec structure to read it.                           */
  /*                                                                       */
  /*    FT_GLYPH_FORMAT_PLOTTER ::                                         */
  /*      The glyph image is a vectorial path with no inside and outside   */
  /*      contours.  Some Type~1 fonts, like those in the Hershey family,  */
  /*      contain glyphs in this format.  These are described as           */
  /*      @FT_Outline, but FreeType isn't currently capable of rendering   */
  /*      them correctly.                                                  */
  /*                                                                       */
  typedef enum  FT_Glyph_Format_
  {
    FT_IMAGE_TAG( FT_GLYPH_FORMAT_NONE, 0, 0, 0, 0 ),

    FT_IMAGE_TAG( FT_GLYPH_FORMAT_COMPOSITE, 'c', 'o', 'm', 'p' ),
    FT_IMAGE_TAG( FT_GLYPH_FORMAT_BITMAP,    'b', 'i', 't', 's' ),
    FT_IMAGE_TAG( FT_GLYPH_FORMAT_OUTLINE,   'o', 'u', 't', 'l' ),
    FT_IMAGE_TAG( FT_GLYPH_FORMAT_PLOTTER,   'p', 'l', 'o', 't' )

  } FT_Glyph_Format;


  /* these constants are deprecated; use the corresponding */
  /* `FT_Glyph_Format' values instead.                     */
#define ft_glyph_format_none       FT_GLYPH_FORMAT_NONE
#define ft_glyph_format_composite  FT_GLYPH_FORMAT_COMPOSITE
#define ft_glyph_format_bitmap     FT_GLYPH_FORMAT_BITMAP
#define ft_glyph_format_outline    FT_GLYPH_FORMAT_OUTLINE
#define ft_glyph_format_plotter    FT_GLYPH_FORMAT_PLOTTER


  /*************************************************************************/
  /*************************************************************************/
  /*************************************************************************/
  /*****                                                               *****/
  /*****            R A S T E R   D E F I N I T I O N S                *****/
  /*****                                                               *****/
  /*************************************************************************/
  /*************************************************************************/
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* A raster is a scan converter, in charge of rendering an outline into  */
  /* a bitmap.  This section contains the public API for rasters.          */
  /*                                                                       */
  /* Note that in FreeType 2, all rasters are now encapsulated within      */
  /* specific modules called `renderers'.  See `ftrender.h' for more       */
  /* details on renderers.                                                 */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    raster                                                             */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Scanline Converter                                                 */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    How vectorial outlines are converted into bitmaps and pixmaps.     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains technical definitions.                       */
  /*                                                                       */
  /* <Order>                                                               */
  /*    FT_Raster                                                          */
  /*    FT_Span                                                            */
  /*    FT_SpanFunc                                                        */
  /*                                                                       */
  /*    FT_Raster_Params                                                   */
  /*    FT_RASTER_FLAG_XXX                                                 */
  /*                                                                       */
  /*    FT_Raster_NewFunc                                                  */
  /*    FT_Raster_DoneFunc                                                 */
  /*    FT_Raster_ResetFunc                                                */
  /*    FT_Raster_SetModeFunc                                              */
  /*    FT_Raster_RenderFunc                                               */
  /*    FT_Raster_Funcs                                                    */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Raster                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An opaque handle (pointer) to a raster object.  Each object can be */
  /*    used independently to convert an outline into a bitmap or pixmap.  */
  /*                                                                       */
  typedef struct FT_RasterRec_*  FT_Raster;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Span                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to model a single span of gray pixels when        */
  /*    rendering an anti-aliased bitmap.                                  */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    x        :: The span's horizontal start position.                  */
  /*                                                                       */
  /*    len      :: The span's length in pixels.                           */
  /*                                                                       */
  /*    coverage :: The span color/coverage, ranging from 0 (background)   */
  /*                to 255 (foreground).                                   */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This structure is used by the span drawing callback type named     */
  /*    @FT_SpanFunc that takes the y~coordinate of the span as a          */
  /*    parameter.                                                         */
  /*                                                                       */
  /*    The coverage value is always between 0 and 255.  If you want less  */
  /*    gray values, the callback function has to reduce them.             */
  /*                                                                       */
  typedef struct  FT_Span_
  {
    short           x;
    unsigned short  len;
    unsigned char   coverage;

  } FT_Span;


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_SpanFunc                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function used as a call-back by the anti-aliased renderer in     */
  /*    order to let client applications draw themselves the gray pixel    */
  /*    spans on each scan line.                                           */
  /*                                                                       */
  /* <Input>                                                               */
  /*    y     :: The scanline's y~coordinate.                              */
  /*                                                                       */
  /*    count :: The number of spans to draw on this scanline.             */
  /*                                                                       */
  /*    spans :: A table of `count' spans to draw on the scanline.         */
  /*                                                                       */
  /*    user  :: User-supplied data that is passed to the callback.        */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This callback allows client applications to directly render the    */
  /*    gray spans of the anti-aliased bitmap to any kind of surfaces.     */
  /*                                                                       */
  /*    This can be used to write anti-aliased outlines directly to a      */
  /*    given background bitmap, and even perform translucency.            */
  /*                                                                       */
  typedef void
  (*FT_SpanFunc)( int             y,
                  int             count,
                  const FT_Span*  spans,
                  void*           user );

#define FT_Raster_Span_Func  FT_SpanFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_BitTest_Func                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Deprecated, unimplemented.                                         */
  /*                                                                       */
  typedef int
  (*FT_Raster_BitTest_Func)( int    y,
                             int    x,
                             void*  user );


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_BitSet_Func                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Deprecated, unimplemented.                                         */
  /*                                                                       */
  typedef void
  (*FT_Raster_BitSet_Func)( int    y,
                            int    x,
                            void*  user );


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    FT_RASTER_FLAG_XXX                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A list of bit flag constants as used in the `flags' field of a     */
  /*    @FT_Raster_Params structure.                                       */
  /*                                                                       */
  /* <Values>                                                              */
  /*    FT_RASTER_FLAG_DEFAULT :: This value is 0.                         */
  /*                                                                       */
  /*    FT_RASTER_FLAG_AA      :: This flag is set to indicate that an     */
  /*                              anti-aliased glyph image should be       */
  /*                              generated.  Otherwise, it will be        */
  /*                              monochrome (1-bit).                      */
  /*                                                                       */
  /*    FT_RASTER_FLAG_DIRECT  :: This flag is set to indicate direct      */
  /*                              rendering.  In this mode, client         */
  /*                              applications must provide their own span */
  /*                              callback.  This lets them directly       */
  /*                              draw or compose over an existing bitmap. */
  /*                              If this bit is not set, the target       */
  /*                              pixmap's buffer _must_ be zeroed before  */
  /*                              rendering.                               */
  /*                                                                       */
  /*                              Direct rendering is only possible with   */
  /*                              anti-aliased glyphs.                     */
  /*                                                                       */
  /*    FT_RASTER_FLAG_CLIP    :: This flag is only used in direct         */
  /*                              rendering mode.  If set, the output will */
  /*                              be clipped to a box specified in the     */
  /*                              `clip_box' field of the                  */
  /*                              @FT_Raster_Params structure.             */
  /*                                                                       */
  /*                              Note that by default, the glyph bitmap   */
  /*                              is clipped to the target pixmap, except  */
  /*                              in direct rendering mode where all spans */
  /*                              are generated if no clipping box is set. */
  /*                                                                       */
#define FT_RASTER_FLAG_DEFAULT  0x0
#define FT_RASTER_FLAG_AA       0x1
#define FT_RASTER_FLAG_DIRECT   0x2
#define FT_RASTER_FLAG_CLIP     0x4

  /* these constants are deprecated; use the corresponding */
  /* `FT_RASTER_FLAG_XXX' values instead                   */
#define ft_raster_flag_default  FT_RASTER_FLAG_DEFAULT
#define ft_raster_flag_aa       FT_RASTER_FLAG_AA
#define ft_raster_flag_direct   FT_RASTER_FLAG_DIRECT
#define ft_raster_flag_clip     FT_RASTER_FLAG_CLIP


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Raster_Params                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure to hold the arguments used by a raster's render        */
  /*    function.                                                          */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    target      :: The target bitmap.                                  */
  /*                                                                       */
  /*    source      :: A pointer to the source glyph image (e.g., an       */
  /*                   @FT_Outline).                                       */
  /*                                                                       */
  /*    flags       :: The rendering flags.                                */
  /*                                                                       */
  /*    gray_spans  :: The gray span drawing callback.                     */
  /*                                                                       */
  /*    black_spans :: Unused.                                             */
  /*                                                                       */
  /*    bit_test    :: Unused.                                             */
  /*                                                                       */
  /*    bit_set     :: Unused.                                             */
  /*                                                                       */
  /*    user        :: User-supplied data that is passed to each drawing   */
  /*                   callback.                                           */
  /*                                                                       */
  /*    clip_box    :: An optional clipping box.  It is only used in       */
  /*                   direct rendering mode.  Note that coordinates here  */
  /*                   should be expressed in _integer_ pixels (and not in */
  /*                   26.6 fixed-point units).                            */
  /*                                                                       */
  /* <Note>                                                                */
  /*    An anti-aliased glyph bitmap is drawn if the @FT_RASTER_FLAG_AA    */
  /*    bit flag is set in the `flags' field, otherwise a monochrome       */
  /*    bitmap is generated.                                               */
  /*                                                                       */
  /*    If the @FT_RASTER_FLAG_DIRECT bit flag is set in `flags', the      */
  /*    raster will call the `gray_spans' callback to draw gray pixel      */
  /*    spans.  This allows direct composition over a pre-existing bitmap  */
  /*    through user-provided callbacks to perform the span drawing and    */
  /*    composition.    Not supported by the monochrome rasterizer.        */
  /*                                                                       */
  typedef struct  FT_Raster_Params_
  {
    const FT_Bitmap*        target;
    const void*             source;
    int                     flags;
    FT_SpanFunc             gray_spans;
    FT_SpanFunc             black_spans;  /* unused */
    FT_Raster_BitTest_Func  bit_test;     /* unused */
    FT_Raster_BitSet_Func   bit_set;      /* unused */
    void*                   user;
    FT_BBox                 clip_box;

  } FT_Raster_Params;


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_NewFunc                                                  */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function used to create a new raster object.                     */
  /*                                                                       */
  /* <Input>                                                               */
  /*    memory :: A handle to the memory allocator.                        */
  /*                                                                       */
  /* <Output>                                                              */
  /*    raster :: A handle to the new raster object.                       */
  /*                                                                       */
  /* <Return>                                                              */
  /*    Error code.  0~means success.                                      */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The `memory' parameter is a typeless pointer in order to avoid     */
  /*    un-wanted dependencies on the rest of the FreeType code.  In       */
  /*    practice, it is an @FT_Memory object, i.e., a handle to the        */
  /*    standard FreeType memory allocator.  However, this field can be    */
  /*    completely ignored by a given raster implementation.               */
  /*                                                                       */
  typedef int
  (*FT_Raster_NewFunc)( void*       memory,
                        FT_Raster*  raster );

#define FT_Raster_New_Func  FT_Raster_NewFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_DoneFunc                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A function used to destroy a given raster object.                  */
  /*                                                                       */
  /* <Input>                                                               */
  /*    raster :: A handle to the raster object.                           */
  /*                                                                       */
  typedef void
  (*FT_Raster_DoneFunc)( FT_Raster  raster );

#define FT_Raster_Done_Func  FT_Raster_DoneFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_ResetFunc                                                */
  /*                                                                       */
  /* <Description>                                                         */
  /*    FreeType used to provide an area of memory called the `render      */
  /*    pool' available to all registered rasterizers.  This was not       */
  /*    thread safe, however, and now FreeType never allocates this pool.  */
  /*                                                                       */
  /*    This function is called after a new raster object is created.      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    raster    :: A handle to the new raster object.                    */
  /*                                                                       */
  /*    pool_base :: Previously, the address in memory of the render pool. */
  /*                 Set this to NULL.                                     */
  /*                                                                       */
  /*    pool_size :: Previously, the size in bytes of the render pool.     */
  /*                 Set this to 0.                                        */
  /*                                                                       */
  /* <Note>                                                                */
  /*    Rasterizers should rely on dynamic or stack allocation if they     */
  /*    want to (a handle to the memory allocator is passed to the         */
  /*    rasterizer constructor).                                           */
  /*                                                                       */
  typedef void
  (*FT_Raster_ResetFunc)( FT_Raster       raster,
                          unsigned char*  pool_base,
                          unsigned long   pool_size );

#define FT_Raster_Reset_Func  FT_Raster_ResetFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_SetModeFunc                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This function is a generic facility to change modes or attributes  */
  /*    in a given raster.  This can be used for debugging purposes, or    */
  /*    simply to allow implementation-specific `features' in a given      */
  /*    raster module.                                                     */
  /*                                                                       */
  /* <Input>                                                               */
  /*    raster :: A handle to the new raster object.                       */
  /*                                                                       */
  /*    mode   :: A 4-byte tag used to name the mode or property.          */
  /*                                                                       */
  /*    args   :: A pointer to the new mode/property to use.               */
  /*                                                                       */
  typedef int
  (*FT_Raster_SetModeFunc)( FT_Raster      raster,
                            unsigned long  mode,
                            void*          args );

#define FT_Raster_Set_Mode_Func  FT_Raster_SetModeFunc


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Raster_RenderFunc                                               */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Invoke a given raster to scan-convert a given glyph image into a   */
  /*    target bitmap.                                                     */
  /*                                                                       */
  /* <Input>                                                               */
  /*    raster :: A handle to the raster object.                           */
  /*                                                                       */
  /*    params :: A pointer to an @FT_Raster_Params structure used to      */
  /*              store the rendering parameters.                          */
  /*                                                                       */
  /* <Return>                                                              */
  /*    Error code.  0~means success.                                      */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The exact format of the source image depends on the raster's glyph */
  /*    format defined in its @FT_Raster_Funcs structure.  It can be an    */
  /*    @FT_Outline or anything else in order to support a large array of  */
  /*    glyph formats.                                                     */
  /*                                                                       */
  /*    Note also that the render function can fail and return a           */
  /*    `FT_Err_Unimplemented_Feature' error code if the raster used does  */
  /*    not support direct composition.                                    */
  /*                                                                       */
  /*    XXX: For now, the standard raster doesn't support direct           */
  /*         composition but this should change for the final release (see */
  /*         the files `demos/src/ftgrays.c' and `demos/src/ftgrays2.c'    */
  /*         for examples of distinct implementations that support direct  */
  /*         composition).                                                 */
  /*                                                                       */
  typedef int
  (*FT_Raster_RenderFunc)( FT_Raster                raster,
                           const FT_Raster_Params*  params );

#define FT_Raster_Render_Func  FT_Raster_RenderFunc


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Raster_Funcs                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*   A structure used to describe a given raster class to the library.   */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    glyph_format  :: The supported glyph format for this raster.       */
  /*                                                                       */
  /*    raster_new    :: The raster constructor.                           */
  /*                                                                       */
  /*    raster_reset  :: Used to reset the render pool within the raster.  */
  /*                                                                       */
  /*    raster_render :: A function to render a glyph into a given bitmap. */
  /*                                                                       */
  /*    raster_done   :: The raster destructor.                            */
  /*                                                                       */
  typedef struct  FT_Raster_Funcs_
  {
    FT_Glyph_Format        glyph_format;

    FT_Raster_NewFunc      raster_new;
    FT_Raster_ResetFunc    raster_reset;
    FT_Raster_SetModeFunc  raster_set_mode;
    FT_Raster_RenderFunc   raster_render;
    FT_Raster_DoneFunc     raster_done;

  } FT_Raster_Funcs;

  /* */


FT_END_HEADER

#endif /* FTIMAGE_H_ */


/* END */


/* Local Variables: */
/* coding: utf-8    */
/* End:             */
