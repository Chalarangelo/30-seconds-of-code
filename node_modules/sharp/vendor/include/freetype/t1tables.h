/***************************************************************************/
/*                                                                         */
/*  t1tables.h                                                             */
/*                                                                         */
/*    Basic Type 1/Type 2 tables definitions and interface (specification  */
/*    only).                                                               */
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


#ifndef T1TABLES_H_
#define T1TABLES_H_


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
  /*    type1_tables                                                       */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Type 1 Tables                                                      */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Type~1 (PostScript) specific font tables.                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains the definition of Type 1-specific tables,    */
  /*    including structures related to other PostScript font formats.     */
  /*                                                                       */
  /* <Order>                                                               */
  /*    PS_FontInfoRec                                                     */
  /*    PS_FontInfo                                                        */
  /*    PS_PrivateRec                                                      */
  /*    PS_Private                                                         */
  /*                                                                       */
  /*    CID_FaceDictRec                                                    */
  /*    CID_FaceDict                                                       */
  /*    CID_FaceInfoRec                                                    */
  /*    CID_FaceInfo                                                       */
  /*                                                                       */
  /*    FT_Has_PS_Glyph_Names                                              */
  /*    FT_Get_PS_Font_Info                                                */
  /*    FT_Get_PS_Font_Private                                             */
  /*    FT_Get_PS_Font_Value                                               */
  /*                                                                       */
  /*    T1_Blend_Flags                                                     */
  /*    T1_EncodingType                                                    */
  /*    PS_Dict_Keys                                                       */
  /*                                                                       */
  /*************************************************************************/


  /* Note that we separate font data in PS_FontInfoRec and PS_PrivateRec */
  /* structures in order to support Multiple Master fonts.               */


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    PS_FontInfoRec                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to model a Type~1 or Type~2 FontInfo dictionary.  */
  /*    Note that for Multiple Master fonts, each instance has its own     */
  /*    FontInfo dictionary.                                               */
  /*                                                                       */
  typedef struct  PS_FontInfoRec_
  {
    FT_String*  version;
    FT_String*  notice;
    FT_String*  full_name;
    FT_String*  family_name;
    FT_String*  weight;
    FT_Long     italic_angle;
    FT_Bool     is_fixed_pitch;
    FT_Short    underline_position;
    FT_UShort   underline_thickness;

  } PS_FontInfoRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    PS_FontInfo                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to a @PS_FontInfoRec structure.                           */
  /*                                                                       */
  typedef struct PS_FontInfoRec_*  PS_FontInfo;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    T1_FontInfo                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This type is equivalent to @PS_FontInfoRec.  It is deprecated but  */
  /*    kept to maintain source compatibility between various versions of  */
  /*    FreeType.                                                          */
  /*                                                                       */
  typedef PS_FontInfoRec  T1_FontInfo;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    PS_PrivateRec                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to model a Type~1 or Type~2 private dictionary.   */
  /*    Note that for Multiple Master fonts, each instance has its own     */
  /*    Private dictionary.                                                */
  /*                                                                       */
  typedef struct  PS_PrivateRec_
  {
    FT_Int     unique_id;
    FT_Int     lenIV;

    FT_Byte    num_blue_values;
    FT_Byte    num_other_blues;
    FT_Byte    num_family_blues;
    FT_Byte    num_family_other_blues;

    FT_Short   blue_values[14];
    FT_Short   other_blues[10];

    FT_Short   family_blues      [14];
    FT_Short   family_other_blues[10];

    FT_Fixed   blue_scale;
    FT_Int     blue_shift;
    FT_Int     blue_fuzz;

    FT_UShort  standard_width[1];
    FT_UShort  standard_height[1];

    FT_Byte    num_snap_widths;
    FT_Byte    num_snap_heights;
    FT_Bool    force_bold;
    FT_Bool    round_stem_up;

    FT_Short   snap_widths [13];  /* including std width  */
    FT_Short   snap_heights[13];  /* including std height */

    FT_Fixed   expansion_factor;

    FT_Long    language_group;
    FT_Long    password;

    FT_Short   min_feature[2];

  } PS_PrivateRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    PS_Private                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to a @PS_PrivateRec structure.                            */
  /*                                                                       */
  typedef struct PS_PrivateRec_*  PS_Private;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    T1_Private                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*   This type is equivalent to @PS_PrivateRec.  It is deprecated but    */
  /*   kept to maintain source compatibility between various versions of   */
  /*   FreeType.                                                           */
  /*                                                                       */
  typedef PS_PrivateRec  T1_Private;


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    T1_Blend_Flags                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A set of flags used to indicate which fields are present in a      */
  /*    given blend dictionary (font info or private).  Used to support    */
  /*    Multiple Masters fonts.                                            */
  /*                                                                       */
  /* <Values>                                                              */
  /*    T1_BLEND_UNDERLINE_POSITION ::                                     */
  /*    T1_BLEND_UNDERLINE_THICKNESS ::                                    */
  /*    T1_BLEND_ITALIC_ANGLE ::                                           */
  /*    T1_BLEND_BLUE_VALUES ::                                            */
  /*    T1_BLEND_OTHER_BLUES ::                                            */
  /*    T1_BLEND_STANDARD_WIDTH ::                                         */
  /*    T1_BLEND_STANDARD_HEIGHT ::                                        */
  /*    T1_BLEND_STEM_SNAP_WIDTHS ::                                       */
  /*    T1_BLEND_STEM_SNAP_HEIGHTS ::                                      */
  /*    T1_BLEND_BLUE_SCALE ::                                             */
  /*    T1_BLEND_BLUE_SHIFT ::                                             */
  /*    T1_BLEND_FAMILY_BLUES ::                                           */
  /*    T1_BLEND_FAMILY_OTHER_BLUES ::                                     */
  /*    T1_BLEND_FORCE_BOLD ::                                             */
  /*                                                                       */
  typedef enum  T1_Blend_Flags_
  {
    /* required fields in a FontInfo blend dictionary */
    T1_BLEND_UNDERLINE_POSITION = 0,
    T1_BLEND_UNDERLINE_THICKNESS,
    T1_BLEND_ITALIC_ANGLE,

    /* required fields in a Private blend dictionary */
    T1_BLEND_BLUE_VALUES,
    T1_BLEND_OTHER_BLUES,
    T1_BLEND_STANDARD_WIDTH,
    T1_BLEND_STANDARD_HEIGHT,
    T1_BLEND_STEM_SNAP_WIDTHS,
    T1_BLEND_STEM_SNAP_HEIGHTS,
    T1_BLEND_BLUE_SCALE,
    T1_BLEND_BLUE_SHIFT,
    T1_BLEND_FAMILY_BLUES,
    T1_BLEND_FAMILY_OTHER_BLUES,
    T1_BLEND_FORCE_BOLD,

    T1_BLEND_MAX    /* do not remove */

  } T1_Blend_Flags;


  /* these constants are deprecated; use the corresponding */
  /* `T1_Blend_Flags' values instead                       */
#define t1_blend_underline_position   T1_BLEND_UNDERLINE_POSITION
#define t1_blend_underline_thickness  T1_BLEND_UNDERLINE_THICKNESS
#define t1_blend_italic_angle         T1_BLEND_ITALIC_ANGLE
#define t1_blend_blue_values          T1_BLEND_BLUE_VALUES
#define t1_blend_other_blues          T1_BLEND_OTHER_BLUES
#define t1_blend_standard_widths      T1_BLEND_STANDARD_WIDTH
#define t1_blend_standard_height      T1_BLEND_STANDARD_HEIGHT
#define t1_blend_stem_snap_widths     T1_BLEND_STEM_SNAP_WIDTHS
#define t1_blend_stem_snap_heights    T1_BLEND_STEM_SNAP_HEIGHTS
#define t1_blend_blue_scale           T1_BLEND_BLUE_SCALE
#define t1_blend_blue_shift           T1_BLEND_BLUE_SHIFT
#define t1_blend_family_blues         T1_BLEND_FAMILY_BLUES
#define t1_blend_family_other_blues   T1_BLEND_FAMILY_OTHER_BLUES
#define t1_blend_force_bold           T1_BLEND_FORCE_BOLD
#define t1_blend_max                  T1_BLEND_MAX

  /* */


  /* maximum number of Multiple Masters designs, as defined in the spec */
#define T1_MAX_MM_DESIGNS     16

  /* maximum number of Multiple Masters axes, as defined in the spec */
#define T1_MAX_MM_AXIS        4

  /* maximum number of elements in a design map */
#define T1_MAX_MM_MAP_POINTS  20


  /* this structure is used to store the BlendDesignMap entry for an axis */
  typedef struct  PS_DesignMap_
  {
    FT_Byte    num_points;
    FT_Long*   design_points;
    FT_Fixed*  blend_points;

  } PS_DesignMapRec, *PS_DesignMap;

  /* backward compatible definition */
  typedef PS_DesignMapRec  T1_DesignMap;


  typedef struct  PS_BlendRec_
  {
    FT_UInt          num_designs;
    FT_UInt          num_axis;

    FT_String*       axis_names[T1_MAX_MM_AXIS];
    FT_Fixed*        design_pos[T1_MAX_MM_DESIGNS];
    PS_DesignMapRec  design_map[T1_MAX_MM_AXIS];

    FT_Fixed*        weight_vector;
    FT_Fixed*        default_weight_vector;

    PS_FontInfo      font_infos[T1_MAX_MM_DESIGNS + 1];
    PS_Private       privates  [T1_MAX_MM_DESIGNS + 1];

    FT_ULong         blend_bitflags;

    FT_BBox*         bboxes    [T1_MAX_MM_DESIGNS + 1];

    /* since 2.3.0 */

    /* undocumented, optional: the default design instance;   */
    /* corresponds to default_weight_vector --                */
    /* num_default_design_vector == 0 means it is not present */
    /* in the font and associated metrics files               */
    FT_UInt          default_design_vector[T1_MAX_MM_DESIGNS];
    FT_UInt          num_default_design_vector;

  } PS_BlendRec, *PS_Blend;


  /* backward compatible definition */
  typedef PS_BlendRec  T1_Blend;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    CID_FaceDictRec                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to represent data in a CID top-level dictionary.  */
  /*                                                                       */
  typedef struct  CID_FaceDictRec_
  {
    PS_PrivateRec  private_dict;

    FT_UInt        len_buildchar;
    FT_Fixed       forcebold_threshold;
    FT_Pos         stroke_width;
    FT_Fixed       expansion_factor;

    FT_Byte        paint_type;
    FT_Byte        font_type;
    FT_Matrix      font_matrix;
    FT_Vector      font_offset;

    FT_UInt        num_subrs;
    FT_ULong       subrmap_offset;
    FT_Int         sd_bytes;

  } CID_FaceDictRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    CID_FaceDict                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to a @CID_FaceDictRec structure.                          */
  /*                                                                       */
  typedef struct CID_FaceDictRec_*  CID_FaceDict;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    CID_FontDict                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This type is equivalent to @CID_FaceDictRec.  It is deprecated but */
  /*    kept to maintain source compatibility between various versions of  */
  /*    FreeType.                                                          */
  /*                                                                       */
  typedef CID_FaceDictRec  CID_FontDict;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    CID_FaceInfoRec                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to represent CID Face information.                */
  /*                                                                       */
  typedef struct  CID_FaceInfoRec_
  {
    FT_String*      cid_font_name;
    FT_Fixed        cid_version;
    FT_Int          cid_font_type;

    FT_String*      registry;
    FT_String*      ordering;
    FT_Int          supplement;

    PS_FontInfoRec  font_info;
    FT_BBox         font_bbox;
    FT_ULong        uid_base;

    FT_Int          num_xuid;
    FT_ULong        xuid[16];

    FT_ULong        cidmap_offset;
    FT_Int          fd_bytes;
    FT_Int          gd_bytes;
    FT_ULong        cid_count;

    FT_Int          num_dicts;
    CID_FaceDict    font_dicts;

    FT_ULong        data_offset;

  } CID_FaceInfoRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    CID_FaceInfo                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to a @CID_FaceInfoRec structure.                          */
  /*                                                                       */
  typedef struct CID_FaceInfoRec_*  CID_FaceInfo;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    CID_Info                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*   This type is equivalent to @CID_FaceInfoRec.  It is deprecated but  */
  /*   kept to maintain source compatibility between various versions of   */
  /*   FreeType.                                                           */
  /*                                                                       */
  typedef CID_FaceInfoRec  CID_Info;


  /************************************************************************
   *
   * @function:
   *    FT_Has_PS_Glyph_Names
   *
   * @description:
   *    Return true if a given face provides reliable PostScript glyph
   *    names.  This is similar to using the @FT_HAS_GLYPH_NAMES macro,
   *    except that certain fonts (mostly TrueType) contain incorrect
   *    glyph name tables.
   *
   *    When this function returns true, the caller is sure that the glyph
   *    names returned by @FT_Get_Glyph_Name are reliable.
   *
   * @input:
   *    face ::
   *       face handle
   *
   * @return:
   *    Boolean.  True if glyph names are reliable.
   *
   */
  FT_EXPORT( FT_Int )
  FT_Has_PS_Glyph_Names( FT_Face  face );


  /************************************************************************
   *
   * @function:
   *    FT_Get_PS_Font_Info
   *
   * @description:
   *    Retrieve the @PS_FontInfoRec structure corresponding to a given
   *    PostScript font.
   *
   * @input:
   *    face ::
   *       PostScript face handle.
   *
   * @output:
   *    afont_info ::
   *       Output font info structure pointer.
   *
   * @return:
   *    FreeType error code.  0~means success.
   *
   * @note:
   *    String pointers within the @PS_FontInfoRec structure are owned by
   *    the face and don't need to be freed by the caller.  Missing entries
   *    in the font's FontInfo dictionary are represented by NULL pointers.
   *
   *    If the font's format is not PostScript-based, this function will
   *    return the `FT_Err_Invalid_Argument' error code.
   *
   */
  FT_EXPORT( FT_Error )
  FT_Get_PS_Font_Info( FT_Face      face,
                       PS_FontInfo  afont_info );


  /************************************************************************
   *
   * @function:
   *    FT_Get_PS_Font_Private
   *
   * @description:
   *    Retrieve the @PS_PrivateRec structure corresponding to a given
   *    PostScript font.
   *
   * @input:
   *    face ::
   *       PostScript face handle.
   *
   * @output:
   *    afont_private ::
   *       Output private dictionary structure pointer.
   *
   * @return:
   *    FreeType error code.  0~means success.
   *
   * @note:
   *    The string pointers within the @PS_PrivateRec structure are owned by
   *    the face and don't need to be freed by the caller.
   *
   *    If the font's format is not PostScript-based, this function returns
   *    the `FT_Err_Invalid_Argument' error code.
   *
   */
  FT_EXPORT( FT_Error )
  FT_Get_PS_Font_Private( FT_Face     face,
                          PS_Private  afont_private );


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    T1_EncodingType                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An enumeration describing the `Encoding' entry in a Type 1         */
  /*    dictionary.                                                        */
  /*                                                                       */
  /* <Values>                                                              */
  /*    T1_ENCODING_TYPE_NONE ::                                           */
  /*    T1_ENCODING_TYPE_ARRAY ::                                          */
  /*    T1_ENCODING_TYPE_STANDARD ::                                       */
  /*    T1_ENCODING_TYPE_ISOLATIN1 ::                                      */
  /*    T1_ENCODING_TYPE_EXPERT ::                                         */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.4.8                                                              */
  /*                                                                       */
  typedef enum  T1_EncodingType_
  {
    T1_ENCODING_TYPE_NONE = 0,
    T1_ENCODING_TYPE_ARRAY,
    T1_ENCODING_TYPE_STANDARD,
    T1_ENCODING_TYPE_ISOLATIN1,
    T1_ENCODING_TYPE_EXPERT

  } T1_EncodingType;


  /*************************************************************************/
  /*                                                                       */
  /* <Enum>                                                                */
  /*    PS_Dict_Keys                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An enumeration used in calls to @FT_Get_PS_Font_Value to identify  */
  /*    the Type~1 dictionary entry to retrieve.                           */
  /*                                                                       */
  /* <Values>                                                              */
  /*    PS_DICT_FONT_TYPE ::                                               */
  /*    PS_DICT_FONT_MATRIX ::                                             */
  /*    PS_DICT_FONT_BBOX ::                                               */
  /*    PS_DICT_PAINT_TYPE ::                                              */
  /*    PS_DICT_FONT_NAME ::                                               */
  /*    PS_DICT_UNIQUE_ID ::                                               */
  /*    PS_DICT_NUM_CHAR_STRINGS ::                                        */
  /*    PS_DICT_CHAR_STRING_KEY ::                                         */
  /*    PS_DICT_CHAR_STRING ::                                             */
  /*    PS_DICT_ENCODING_TYPE ::                                           */
  /*    PS_DICT_ENCODING_ENTRY ::                                          */
  /*    PS_DICT_NUM_SUBRS ::                                               */
  /*    PS_DICT_SUBR ::                                                    */
  /*    PS_DICT_STD_HW ::                                                  */
  /*    PS_DICT_STD_VW ::                                                  */
  /*    PS_DICT_NUM_BLUE_VALUES ::                                         */
  /*    PS_DICT_BLUE_VALUE ::                                              */
  /*    PS_DICT_BLUE_FUZZ ::                                               */
  /*    PS_DICT_NUM_OTHER_BLUES ::                                         */
  /*    PS_DICT_OTHER_BLUE ::                                              */
  /*    PS_DICT_NUM_FAMILY_BLUES ::                                        */
  /*    PS_DICT_FAMILY_BLUE ::                                             */
  /*    PS_DICT_NUM_FAMILY_OTHER_BLUES ::                                  */
  /*    PS_DICT_FAMILY_OTHER_BLUE ::                                       */
  /*    PS_DICT_BLUE_SCALE ::                                              */
  /*    PS_DICT_BLUE_SHIFT ::                                              */
  /*    PS_DICT_NUM_STEM_SNAP_H ::                                         */
  /*    PS_DICT_STEM_SNAP_H ::                                             */
  /*    PS_DICT_NUM_STEM_SNAP_V ::                                         */
  /*    PS_DICT_STEM_SNAP_V ::                                             */
  /*    PS_DICT_FORCE_BOLD ::                                              */
  /*    PS_DICT_RND_STEM_UP ::                                             */
  /*    PS_DICT_MIN_FEATURE ::                                             */
  /*    PS_DICT_LEN_IV ::                                                  */
  /*    PS_DICT_PASSWORD ::                                                */
  /*    PS_DICT_LANGUAGE_GROUP ::                                          */
  /*    PS_DICT_VERSION ::                                                 */
  /*    PS_DICT_NOTICE ::                                                  */
  /*    PS_DICT_FULL_NAME ::                                               */
  /*    PS_DICT_FAMILY_NAME ::                                             */
  /*    PS_DICT_WEIGHT ::                                                  */
  /*    PS_DICT_IS_FIXED_PITCH ::                                          */
  /*    PS_DICT_UNDERLINE_POSITION ::                                      */
  /*    PS_DICT_UNDERLINE_THICKNESS ::                                     */
  /*    PS_DICT_FS_TYPE ::                                                 */
  /*    PS_DICT_ITALIC_ANGLE ::                                            */
  /*                                                                       */
  /* <Since>                                                               */
  /*    2.4.8                                                              */
  /*                                                                       */
  typedef enum  PS_Dict_Keys_
  {
    /* conventionally in the font dictionary */
    PS_DICT_FONT_TYPE,              /* FT_Byte         */
    PS_DICT_FONT_MATRIX,            /* FT_Fixed        */
    PS_DICT_FONT_BBOX,              /* FT_Fixed        */
    PS_DICT_PAINT_TYPE,             /* FT_Byte         */
    PS_DICT_FONT_NAME,              /* FT_String*      */
    PS_DICT_UNIQUE_ID,              /* FT_Int          */
    PS_DICT_NUM_CHAR_STRINGS,       /* FT_Int          */
    PS_DICT_CHAR_STRING_KEY,        /* FT_String*      */
    PS_DICT_CHAR_STRING,            /* FT_String*      */
    PS_DICT_ENCODING_TYPE,          /* T1_EncodingType */
    PS_DICT_ENCODING_ENTRY,         /* FT_String*      */

    /* conventionally in the font Private dictionary */
    PS_DICT_NUM_SUBRS,              /* FT_Int     */
    PS_DICT_SUBR,                   /* FT_String* */
    PS_DICT_STD_HW,                 /* FT_UShort  */
    PS_DICT_STD_VW,                 /* FT_UShort  */
    PS_DICT_NUM_BLUE_VALUES,        /* FT_Byte    */
    PS_DICT_BLUE_VALUE,             /* FT_Short   */
    PS_DICT_BLUE_FUZZ,              /* FT_Int     */
    PS_DICT_NUM_OTHER_BLUES,        /* FT_Byte    */
    PS_DICT_OTHER_BLUE,             /* FT_Short   */
    PS_DICT_NUM_FAMILY_BLUES,       /* FT_Byte    */
    PS_DICT_FAMILY_BLUE,            /* FT_Short   */
    PS_DICT_NUM_FAMILY_OTHER_BLUES, /* FT_Byte    */
    PS_DICT_FAMILY_OTHER_BLUE,      /* FT_Short   */
    PS_DICT_BLUE_SCALE,             /* FT_Fixed   */
    PS_DICT_BLUE_SHIFT,             /* FT_Int     */
    PS_DICT_NUM_STEM_SNAP_H,        /* FT_Byte    */
    PS_DICT_STEM_SNAP_H,            /* FT_Short   */
    PS_DICT_NUM_STEM_SNAP_V,        /* FT_Byte    */
    PS_DICT_STEM_SNAP_V,            /* FT_Short   */
    PS_DICT_FORCE_BOLD,             /* FT_Bool    */
    PS_DICT_RND_STEM_UP,            /* FT_Bool    */
    PS_DICT_MIN_FEATURE,            /* FT_Short   */
    PS_DICT_LEN_IV,                 /* FT_Int     */
    PS_DICT_PASSWORD,               /* FT_Long    */
    PS_DICT_LANGUAGE_GROUP,         /* FT_Long    */

    /* conventionally in the font FontInfo dictionary */
    PS_DICT_VERSION,                /* FT_String* */
    PS_DICT_NOTICE,                 /* FT_String* */
    PS_DICT_FULL_NAME,              /* FT_String* */
    PS_DICT_FAMILY_NAME,            /* FT_String* */
    PS_DICT_WEIGHT,                 /* FT_String* */
    PS_DICT_IS_FIXED_PITCH,         /* FT_Bool    */
    PS_DICT_UNDERLINE_POSITION,     /* FT_Short   */
    PS_DICT_UNDERLINE_THICKNESS,    /* FT_UShort  */
    PS_DICT_FS_TYPE,                /* FT_UShort  */
    PS_DICT_ITALIC_ANGLE,           /* FT_Long    */

    PS_DICT_MAX = PS_DICT_ITALIC_ANGLE

  } PS_Dict_Keys;


  /************************************************************************
   *
   * @function:
   *    FT_Get_PS_Font_Value
   *
   * @description:
   *    Retrieve the value for the supplied key from a PostScript font.
   *
   * @input:
   *    face ::
   *       PostScript face handle.
   *
   *    key ::
   *       An enumeration value representing the dictionary key to retrieve.
   *
   *    idx ::
   *       For array values, this specifies the index to be returned.
   *
   *    value ::
   *       A pointer to memory into which to write the value.
   *
   *    valen_len ::
   *       The size, in bytes, of the memory supplied for the value.
   *
   * @output:
   *    value ::
   *       The value matching the above key, if it exists.
   *
   * @return:
   *    The amount of memory (in bytes) required to hold the requested
   *    value (if it exists, -1 otherwise).
   *
   * @note:
   *    The values returned are not pointers into the internal structures of
   *    the face, but are `fresh' copies, so that the memory containing them
   *    belongs to the calling application.  This also enforces the
   *    `read-only' nature of these values, i.e., this function cannot be
   *    used to manipulate the face.
   *
   *    `value' is a void pointer because the values returned can be of
   *    various types.
   *
   *    If either `value' is NULL or `value_len' is too small, just the
   *    required memory size for the requested entry is returned.
   *
   *    The `idx' parameter is used, not only to retrieve elements of, for
   *    example, the FontMatrix or FontBBox, but also to retrieve name keys
   *    from the CharStrings dictionary, and the charstrings themselves.  It
   *    is ignored for atomic values.
   *
   *    PS_DICT_BLUE_SCALE returns a value that is scaled up by 1000.  To
   *    get the value as in the font stream, you need to divide by
   *    65536000.0 (to remove the FT_Fixed scale, and the x1000 scale).
   *
   *    IMPORTANT: Only key/value pairs read by the FreeType interpreter can
   *    be retrieved.  So, for example, PostScript procedures such as NP,
   *    ND, and RD are not available.  Arbitrary keys are, obviously, not be
   *    available either.
   *
   *    If the font's format is not PostScript-based, this function returns
   *    the `FT_Err_Invalid_Argument' error code.
   *
   * @since:
   *    2.4.8
   *
   */
  FT_EXPORT( FT_Long )
  FT_Get_PS_Font_Value( FT_Face       face,
                        PS_Dict_Keys  key,
                        FT_UInt       idx,
                        void         *value,
                        FT_Long       value_len );

  /* */

FT_END_HEADER

#endif /* T1TABLES_H_ */


/* END */
