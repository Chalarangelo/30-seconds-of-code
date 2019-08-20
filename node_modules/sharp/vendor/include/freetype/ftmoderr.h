/***************************************************************************/
/*                                                                         */
/*  ftmoderr.h                                                             */
/*                                                                         */
/*    FreeType module error offsets (specification).                       */
/*                                                                         */
/*  Copyright 2001-2018 by                                                 */
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
  /* This file is used to define the FreeType module error codes.          */
  /*                                                                       */
  /* If the macro FT_CONFIG_OPTION_USE_MODULE_ERRORS in `ftoption.h' is    */
  /* set, the lower byte of an error value identifies the error code as    */
  /* usual.  In addition, the higher byte identifies the module.  For      */
  /* example, the error `FT_Err_Invalid_File_Format' has value 0x0003, the */
  /* error `TT_Err_Invalid_File_Format' has value 0x1303, the error        */
  /* `T1_Err_Invalid_File_Format' has value 0x1403, etc.                   */
  /*                                                                       */
  /* Note that `FT_Err_Ok', `TT_Err_Ok', etc. are always equal to zero,    */
  /* including the high byte.                                              */
  /*                                                                       */
  /* If FT_CONFIG_OPTION_USE_MODULE_ERRORS isn't set, the higher byte of   */
  /* an error value is set to zero.                                        */
  /*                                                                       */
  /* To hide the various `XXX_Err_' prefixes in the source code, FreeType  */
  /* provides some macros in `fttypes.h'.                                  */
  /*                                                                       */
  /*   FT_ERR( err )                                                       */
  /*     Add current error module prefix (as defined with the              */
  /*     `FT_ERR_PREFIX' macro) to `err'.  For example, in the BDF module  */
  /*     the line                                                          */
  /*                                                                       */
  /*       error = FT_ERR( Invalid_Outline );                              */
  /*                                                                       */
  /*     expands to                                                        */
  /*                                                                       */
  /*       error = BDF_Err_Invalid_Outline;                                */
  /*                                                                       */
  /*     For simplicity, you can always use `FT_Err_Ok' directly instead   */
  /*     of `FT_ERR( Ok )'.                                                */
  /*                                                                       */
  /*   FT_ERR_EQ( errcode, err )                                           */
  /*   FT_ERR_NEQ( errcode, err )                                          */
  /*     Compare error code `errcode' with the error `err' for equality    */
  /*     and inequality, respectively.  Example:                           */
  /*                                                                       */
  /*       if ( FT_ERR_EQ( error, Invalid_Outline ) )                      */
  /*         ...                                                           */
  /*                                                                       */
  /*     Using this macro you don't have to think about error prefixes.    */
  /*     Of course, if module errors are not active, the above example is  */
  /*     the same as                                                       */
  /*                                                                       */
  /*       if ( error == FT_Err_Invalid_Outline )                          */
  /*         ...                                                           */
  /*                                                                       */
  /*   FT_ERROR_BASE( errcode )                                            */
  /*   FT_ERROR_MODULE( errcode )                                          */
  /*     Get base error and module error code, respectively.               */
  /*                                                                       */
  /*                                                                       */
  /* It can also be used to create a module error message table easily     */
  /* with something like                                                   */
  /*                                                                       */
  /*   {                                                                   */
  /*     #undef FTMODERR_H_                                                */
  /*     #define FT_MODERRDEF( e, v, s )  { FT_Mod_Err_ ## e, s },         */
  /*     #define FT_MODERR_START_LIST     {                                */
  /*     #define FT_MODERR_END_LIST       { 0, 0 } };                      */
  /*                                                                       */
  /*     const struct                                                      */
  /*     {                                                                 */
  /*       int          mod_err_offset;                                    */
  /*       const char*  mod_err_msg                                        */
  /*     } ft_mod_errors[] =                                               */
  /*                                                                       */
  /*     #include FT_MODULE_ERRORS_H                                       */
  /*   }                                                                   */
  /*                                                                       */
  /*************************************************************************/


#ifndef FTMODERR_H_
#define FTMODERR_H_


  /*******************************************************************/
  /*******************************************************************/
  /*****                                                         *****/
  /*****                       SETUP MACROS                      *****/
  /*****                                                         *****/
  /*******************************************************************/
  /*******************************************************************/


#undef  FT_NEED_EXTERN_C

#ifndef FT_MODERRDEF

#ifdef FT_CONFIG_OPTION_USE_MODULE_ERRORS
#define FT_MODERRDEF( e, v, s )  FT_Mod_Err_ ## e = v,
#else
#define FT_MODERRDEF( e, v, s )  FT_Mod_Err_ ## e = 0,
#endif

#define FT_MODERR_START_LIST  enum {
#define FT_MODERR_END_LIST    FT_Mod_Err_Max };

#ifdef __cplusplus
#define FT_NEED_EXTERN_C
  extern "C" {
#endif

#endif /* !FT_MODERRDEF */


  /*******************************************************************/
  /*******************************************************************/
  /*****                                                         *****/
  /*****               LIST MODULE ERROR BASES                   *****/
  /*****                                                         *****/
  /*******************************************************************/
  /*******************************************************************/


#ifdef FT_MODERR_START_LIST
  FT_MODERR_START_LIST
#endif


  FT_MODERRDEF( Base,      0x000, "base module" )
  FT_MODERRDEF( Autofit,   0x100, "autofitter module" )
  FT_MODERRDEF( BDF,       0x200, "BDF module" )
  FT_MODERRDEF( Bzip2,     0x300, "Bzip2 module" )
  FT_MODERRDEF( Cache,     0x400, "cache module" )
  FT_MODERRDEF( CFF,       0x500, "CFF module" )
  FT_MODERRDEF( CID,       0x600, "CID module" )
  FT_MODERRDEF( Gzip,      0x700, "Gzip module" )
  FT_MODERRDEF( LZW,       0x800, "LZW module" )
  FT_MODERRDEF( OTvalid,   0x900, "OpenType validation module" )
  FT_MODERRDEF( PCF,       0xA00, "PCF module" )
  FT_MODERRDEF( PFR,       0xB00, "PFR module" )
  FT_MODERRDEF( PSaux,     0xC00, "PS auxiliary module" )
  FT_MODERRDEF( PShinter,  0xD00, "PS hinter module" )
  FT_MODERRDEF( PSnames,   0xE00, "PS names module" )
  FT_MODERRDEF( Raster,    0xF00, "raster module" )
  FT_MODERRDEF( SFNT,     0x1000, "SFNT module" )
  FT_MODERRDEF( Smooth,   0x1100, "smooth raster module" )
  FT_MODERRDEF( TrueType, 0x1200, "TrueType module" )
  FT_MODERRDEF( Type1,    0x1300, "Type 1 module" )
  FT_MODERRDEF( Type42,   0x1400, "Type 42 module" )
  FT_MODERRDEF( Winfonts, 0x1500, "Windows FON/FNT module" )
  FT_MODERRDEF( GXvalid,  0x1600, "GX validation module" )


#ifdef FT_MODERR_END_LIST
  FT_MODERR_END_LIST
#endif


  /*******************************************************************/
  /*******************************************************************/
  /*****                                                         *****/
  /*****                      CLEANUP                            *****/
  /*****                                                         *****/
  /*******************************************************************/
  /*******************************************************************/


#ifdef FT_NEED_EXTERN_C
  }
#endif

#undef FT_MODERR_START_LIST
#undef FT_MODERR_END_LIST
#undef FT_MODERRDEF
#undef FT_NEED_EXTERN_C


#endif /* FTMODERR_H_ */


/* END */
