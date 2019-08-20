/***************************************************************************/
/*                                                                         */
/*  fttypes.h                                                              */
/*                                                                         */
/*    FreeType simple types definitions (specification only).              */
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


#ifndef FTTYPES_H_
#define FTTYPES_H_


#include <ft2build.h>
#include FT_CONFIG_CONFIG_H
#include FT_SYSTEM_H
#include FT_IMAGE_H

#include <stddef.h>


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    basic_types                                                        */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Basic Data Types                                                   */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    The basic data types defined by the library.                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains the basic data types defined by FreeType~2,  */
  /*    ranging from simple scalar types to bitmap descriptors.  More      */
  /*    font-specific structures are defined in a different section.       */
  /*                                                                       */
  /* <Order>                                                               */
  /*    FT_Byte                                                            */
  /*    FT_Bytes                                                           */
  /*    FT_Char                                                            */
  /*    FT_Int                                                             */
  /*    FT_UInt                                                            */
  /*    FT_Int16                                                           */
  /*    FT_UInt16                                                          */
  /*    FT_Int32                                                           */
  /*    FT_UInt32                                                          */
  /*    FT_Int64                                                           */
  /*    FT_UInt64                                                          */
  /*    FT_Short                                                           */
  /*    FT_UShort                                                          */
  /*    FT_Long                                                            */
  /*    FT_ULong                                                           */
  /*    FT_Bool                                                            */
  /*    FT_Offset                                                          */
  /*    FT_PtrDist                                                         */
  /*    FT_String                                                          */
  /*    FT_Tag                                                             */
  /*    FT_Error                                                           */
  /*    FT_Fixed                                                           */
  /*    FT_Pointer                                                         */
  /*    FT_Pos                                                             */
  /*    FT_Vector                                                          */
  /*    FT_BBox                                                            */
  /*    FT_Matrix                                                          */
  /*    FT_FWord                                                           */
  /*    FT_UFWord                                                          */
  /*    FT_F2Dot14                                                         */
  /*    FT_UnitVector                                                      */
  /*    FT_F26Dot6                                                         */
  /*    FT_Data                                                            */
  /*                                                                       */
  /*    FT_MAKE_TAG                                                        */
  /*                                                                       */
  /*    FT_Generic                                                         */
  /*    FT_Generic_Finalizer                                               */
  /*                                                                       */
  /*    FT_Bitmap                                                          */
  /*    FT_Pixel_Mode                                                      */
  /*    FT_Palette_Mode                                                    */
  /*    FT_Glyph_Format                                                    */
  /*    FT_IMAGE_TAG                                                       */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Bool                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef of unsigned char, used for simple booleans.  As usual,   */
  /*    values 1 and~0 represent true and false, respectively.             */
  /*                                                                       */
  typedef unsigned char  FT_Bool;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_FWord                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A signed 16-bit integer used to store a distance in original font  */
  /*    units.                                                             */
  /*                                                                       */
  typedef signed short  FT_FWord;   /* distance in FUnits */


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_UFWord                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An unsigned 16-bit integer used to store a distance in original    */
  /*    font units.                                                        */
  /*                                                                       */
  typedef unsigned short  FT_UFWord;  /* unsigned distance */


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Char                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple typedef for the _signed_ char type.                       */
  /*                                                                       */
  typedef signed char  FT_Char;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Byte                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple typedef for the _unsigned_ char type.                     */
  /*                                                                       */
  typedef unsigned char  FT_Byte;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Bytes                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for constant memory areas.                               */
  /*                                                                       */
  typedef const FT_Byte*  FT_Bytes;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Tag                                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for 32-bit tags (as used in the SFNT format).            */
  /*                                                                       */
  typedef FT_UInt32  FT_Tag;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_String                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple typedef for the char type, usually used for strings.      */
  /*                                                                       */
  typedef char  FT_String;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Short                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for signed short.                                        */
  /*                                                                       */
  typedef signed short  FT_Short;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_UShort                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for unsigned short.                                      */
  /*                                                                       */
  typedef unsigned short  FT_UShort;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Int                                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for the int type.                                        */
  /*                                                                       */
  typedef signed int  FT_Int;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_UInt                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for the unsigned int type.                               */
  /*                                                                       */
  typedef unsigned int  FT_UInt;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Long                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for signed long.                                         */
  /*                                                                       */
  typedef signed long  FT_Long;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_ULong                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A typedef for unsigned long.                                       */
  /*                                                                       */
  typedef unsigned long  FT_ULong;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_F2Dot14                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A signed 2.14 fixed-point type used for unit vectors.              */
  /*                                                                       */
  typedef signed short  FT_F2Dot14;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_F26Dot6                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A signed 26.6 fixed-point type used for vectorial pixel            */
  /*    coordinates.                                                       */
  /*                                                                       */
  typedef signed long  FT_F26Dot6;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Fixed                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This type is used to store 16.16 fixed-point values, like scaling  */
  /*    values or matrix coefficients.                                     */
  /*                                                                       */
  typedef signed long  FT_Fixed;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Error                                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The FreeType error code type.  A value of~0 is always interpreted  */
  /*    as a successful operation.                                         */
  /*                                                                       */
  typedef int  FT_Error;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Pointer                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple typedef for a typeless pointer.                           */
  /*                                                                       */
  typedef void*  FT_Pointer;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_Offset                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This is equivalent to the ANSI~C `size_t' type, i.e., the largest  */
  /*    _unsigned_ integer type used to express a file size or position,   */
  /*    or a memory block size.                                            */
  /*                                                                       */
  typedef size_t  FT_Offset;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_PtrDist                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This is equivalent to the ANSI~C `ptrdiff_t' type, i.e., the       */
  /*    largest _signed_ integer type used to express the distance         */
  /*    between two pointers.                                              */
  /*                                                                       */
  typedef ft_ptrdiff_t  FT_PtrDist;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_UnitVector                                                      */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple structure used to store a 2D vector unit vector.  Uses    */
  /*    FT_F2Dot14 types.                                                  */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    x :: Horizontal coordinate.                                        */
  /*                                                                       */
  /*    y :: Vertical coordinate.                                          */
  /*                                                                       */
  typedef struct  FT_UnitVector_
  {
    FT_F2Dot14  x;
    FT_F2Dot14  y;

  } FT_UnitVector;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Matrix                                                          */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A simple structure used to store a 2x2 matrix.  Coefficients are   */
  /*    in 16.16 fixed-point format.  The computation performed is:        */
  /*                                                                       */
  /*       {                                                               */
  /*          x' = x*xx + y*xy                                             */
  /*          y' = x*yx + y*yy                                             */
  /*       }                                                               */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    xx :: Matrix coefficient.                                          */
  /*                                                                       */
  /*    xy :: Matrix coefficient.                                          */
  /*                                                                       */
  /*    yx :: Matrix coefficient.                                          */
  /*                                                                       */
  /*    yy :: Matrix coefficient.                                          */
  /*                                                                       */
  typedef struct  FT_Matrix_
  {
    FT_Fixed  xx, xy;
    FT_Fixed  yx, yy;

  } FT_Matrix;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Data                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Read-only binary data represented as a pointer and a length.       */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    pointer :: The data.                                               */
  /*                                                                       */
  /*    length  :: The length of the data in bytes.                        */
  /*                                                                       */
  typedef struct  FT_Data_
  {
    const FT_Byte*  pointer;
    FT_Int          length;

  } FT_Data;


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_Generic_Finalizer                                               */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Describe a function used to destroy the `client' data of any       */
  /*    FreeType object.  See the description of the @FT_Generic type for  */
  /*    details of usage.                                                  */
  /*                                                                       */
  /* <Input>                                                               */
  /*    The address of the FreeType object that is under finalization.     */
  /*    Its client data is accessed through its `generic' field.           */
  /*                                                                       */
  typedef void  (*FT_Generic_Finalizer)( void*  object );


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_Generic                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Client applications often need to associate their own data to a    */
  /*    variety of FreeType core objects.  For example, a text layout API  */
  /*    might want to associate a glyph cache to a given size object.      */
  /*                                                                       */
  /*    Some FreeType object contains a `generic' field, of type           */
  /*    FT_Generic, which usage is left to client applications and font    */
  /*    servers.                                                           */
  /*                                                                       */
  /*    It can be used to store a pointer to client-specific data, as well */
  /*    as the address of a `finalizer' function, which will be called by  */
  /*    FreeType when the object is destroyed (for example, the previous   */
  /*    client example would put the address of the glyph cache destructor */
  /*    in the `finalizer' field).                                         */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    data      :: A typeless pointer to any client-specified data. This */
  /*                 field is completely ignored by the FreeType library.  */
  /*                                                                       */
  /*    finalizer :: A pointer to a `generic finalizer' function, which    */
  /*                 will be called when the object is destroyed.  If this */
  /*                 field is set to NULL, no code will be called.         */
  /*                                                                       */
  typedef struct  FT_Generic_
  {
    void*                 data;
    FT_Generic_Finalizer  finalizer;

  } FT_Generic;


  /*************************************************************************/
  /*                                                                       */
  /* <Macro>                                                               */
  /*    FT_MAKE_TAG                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This macro converts four-letter tags that are used to label        */
  /*    TrueType tables into an unsigned long, to be used within FreeType. */
  /*                                                                       */
  /* <Note>                                                                */
  /*    The produced values *must* be 32-bit integers.  Don't redefine     */
  /*    this macro.                                                        */
  /*                                                                       */
#define FT_MAKE_TAG( _x1, _x2, _x3, _x4 ) \
          (FT_Tag)                        \
          ( ( (FT_ULong)_x1 << 24 ) |     \
            ( (FT_ULong)_x2 << 16 ) |     \
            ( (FT_ULong)_x3 <<  8 ) |     \
              (FT_ULong)_x4         )


  /*************************************************************************/
  /*************************************************************************/
  /*                                                                       */
  /*                    L I S T   M A N A G E M E N T                      */
  /*                                                                       */
  /*************************************************************************/
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    list_processing                                                    */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_ListNode                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*     Many elements and objects in FreeType are listed through an       */
  /*     @FT_List record (see @FT_ListRec).  As its name suggests, an      */
  /*     FT_ListNode is a handle to a single list element.                 */
  /*                                                                       */
  typedef struct FT_ListNodeRec_*  FT_ListNode;


  /*************************************************************************/
  /*                                                                       */
  /* <Type>                                                                */
  /*    FT_List                                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A handle to a list record (see @FT_ListRec).                       */
  /*                                                                       */
  typedef struct FT_ListRec_*  FT_List;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_ListNodeRec                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to hold a single list element.                    */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    prev :: The previous element in the list.  NULL if first.          */
  /*                                                                       */
  /*    next :: The next element in the list.  NULL if last.               */
  /*                                                                       */
  /*    data :: A typeless pointer to the listed object.                   */
  /*                                                                       */
  typedef struct  FT_ListNodeRec_
  {
    FT_ListNode  prev;
    FT_ListNode  next;
    void*        data;

  } FT_ListNodeRec;


  /*************************************************************************/
  /*                                                                       */
  /* <Struct>                                                              */
  /*    FT_ListRec                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    A structure used to hold a simple doubly-linked list.  These are   */
  /*    used in many parts of FreeType.                                    */
  /*                                                                       */
  /* <Fields>                                                              */
  /*    head :: The head (first element) of doubly-linked list.            */
  /*                                                                       */
  /*    tail :: The tail (last element) of doubly-linked list.             */
  /*                                                                       */
  typedef struct  FT_ListRec_
  {
    FT_ListNode  head;
    FT_ListNode  tail;

  } FT_ListRec;

  /* */


#define FT_IS_EMPTY( list )  ( (list).head == 0 )
#define FT_BOOL( x )  ( (FT_Bool)( x ) )

  /* concatenate C tokens */
#define FT_ERR_XCAT( x, y )  x ## y
#define FT_ERR_CAT( x, y )   FT_ERR_XCAT( x, y )

  /* see `ftmoderr.h' for descriptions of the following macros */

#define FT_ERR( e )  FT_ERR_CAT( FT_ERR_PREFIX, e )

#define FT_ERROR_BASE( x )    ( (x) & 0xFF )
#define FT_ERROR_MODULE( x )  ( (x) & 0xFF00U )

#define FT_ERR_EQ( x, e )                                        \
          ( FT_ERROR_BASE( x ) == FT_ERROR_BASE( FT_ERR( e ) ) )
#define FT_ERR_NEQ( x, e )                                       \
          ( FT_ERROR_BASE( x ) != FT_ERROR_BASE( FT_ERR( e ) ) )


FT_END_HEADER

#endif /* FTTYPES_H_ */


/* END */
