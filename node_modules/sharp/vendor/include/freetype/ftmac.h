/***************************************************************************/
/*                                                                         */
/*  ftmac.h                                                                */
/*                                                                         */
/*    Additional Mac-specific API.                                         */
/*                                                                         */
/*  Copyright 1996-2018 by                                                 */
/*  Just van Rossum, David Turner, Robert Wilhelm, and Werner Lemberg.     */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


/***************************************************************************/
/*                                                                         */
/* NOTE: Include this file after FT_FREETYPE_H and after any               */
/*       Mac-specific headers (because this header uses Mac types such as  */
/*       Handle, FSSpec, FSRef, etc.)                                      */
/*                                                                         */
/***************************************************************************/


#ifndef FTMAC_H_
#define FTMAC_H_


#include <ft2build.h>


FT_BEGIN_HEADER


  /* gcc-3.1 and later can warn about functions tagged as deprecated */
#ifndef FT_DEPRECATED_ATTRIBUTE
#if defined( __GNUC__ )                                     && \
    ( ( __GNUC__ >= 4 )                                  ||    \
      ( ( __GNUC__ == 3 ) && ( __GNUC_MINOR__ >= 1 ) ) )
#define FT_DEPRECATED_ATTRIBUTE  __attribute__(( deprecated ))
#else
#define FT_DEPRECATED_ATTRIBUTE
#endif
#endif


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    mac_specific                                                       */
  /*                                                                       */
  /* <Title>                                                               */
  /*    Mac Specific Interface                                             */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Only available on the Macintosh.                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    The following definitions are only available if FreeType is        */
  /*    compiled on a Macintosh.                                           */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_New_Face_From_FOND                                              */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Create a new face object from a FOND resource.                     */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    library    :: A handle to the library resource.                    */
  /*                                                                       */
  /* <Input>                                                               */
  /*    fond       :: A FOND resource.                                     */
  /*                                                                       */
  /*    face_index :: Only supported for the -1 `sanity check' special     */
  /*                  case.                                                */
  /*                                                                       */
  /* <Output>                                                              */
  /*    aface      :: A handle to a new face object.                       */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Notes>                                                               */
  /*    This function can be used to create @FT_Face objects from fonts    */
  /*    that are installed in the system as follows.                       */
  /*                                                                       */
  /*    {                                                                  */
  /*      fond = GetResource( 'FOND', fontName );                          */
  /*      error = FT_New_Face_From_FOND( library, fond, 0, &face );        */
  /*    }                                                                  */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_New_Face_From_FOND( FT_Library  library,
                         Handle      fond,
                         FT_Long     face_index,
                         FT_Face    *aface )
                       FT_DEPRECATED_ATTRIBUTE;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_GetFile_From_Mac_Name                                           */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Return an FSSpec for the disk file containing the named font.      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    fontName   :: Mac OS name of the font (e.g., Times New Roman       */
  /*                  Bold).                                               */
  /*                                                                       */
  /* <Output>                                                              */
  /*    pathSpec   :: FSSpec to the file.  For passing to                  */
  /*                  @FT_New_Face_From_FSSpec.                            */
  /*                                                                       */
  /*    face_index :: Index of the face.  For passing to                   */
  /*                  @FT_New_Face_From_FSSpec.                            */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_GetFile_From_Mac_Name( const char*  fontName,
                            FSSpec*      pathSpec,
                            FT_Long*     face_index )
                          FT_DEPRECATED_ATTRIBUTE;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_GetFile_From_Mac_ATS_Name                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Return an FSSpec for the disk file containing the named font.      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    fontName   :: Mac OS name of the font in ATS framework.            */
  /*                                                                       */
  /* <Output>                                                              */
  /*    pathSpec   :: FSSpec to the file. For passing to                   */
  /*                  @FT_New_Face_From_FSSpec.                            */
  /*                                                                       */
  /*    face_index :: Index of the face. For passing to                    */
  /*                  @FT_New_Face_From_FSSpec.                            */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_GetFile_From_Mac_ATS_Name( const char*  fontName,
                                FSSpec*      pathSpec,
                                FT_Long*     face_index )
                              FT_DEPRECATED_ATTRIBUTE;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_GetFilePath_From_Mac_ATS_Name                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Return a pathname of the disk file and face index for given font   */
  /*    name that is handled by ATS framework.                             */
  /*                                                                       */
  /* <Input>                                                               */
  /*    fontName    :: Mac OS name of the font in ATS framework.           */
  /*                                                                       */
  /* <Output>                                                              */
  /*    path        :: Buffer to store pathname of the file.  For passing  */
  /*                   to @FT_New_Face.  The client must allocate this     */
  /*                   buffer before calling this function.                */
  /*                                                                       */
  /*    maxPathSize :: Lengths of the buffer `path' that client allocated. */
  /*                                                                       */
  /*    face_index  :: Index of the face.  For passing to @FT_New_Face.    */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_GetFilePath_From_Mac_ATS_Name( const char*  fontName,
                                    UInt8*       path,
                                    UInt32       maxPathSize,
                                    FT_Long*     face_index )
                                  FT_DEPRECATED_ATTRIBUTE;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_New_Face_From_FSSpec                                            */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Create a new face object from a given resource and typeface index  */
  /*    using an FSSpec to the font file.                                  */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    library    :: A handle to the library resource.                    */
  /*                                                                       */
  /* <Input>                                                               */
  /*    spec       :: FSSpec to the font file.                             */
  /*                                                                       */
  /*    face_index :: The index of the face within the resource.  The      */
  /*                  first face has index~0.                              */
  /* <Output>                                                              */
  /*    aface      :: A handle to a new face object.                       */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    @FT_New_Face_From_FSSpec is identical to @FT_New_Face except       */
  /*    it accepts an FSSpec instead of a path.                            */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_New_Face_From_FSSpec( FT_Library     library,
                           const FSSpec  *spec,
                           FT_Long        face_index,
                           FT_Face       *aface )
                         FT_DEPRECATED_ATTRIBUTE;


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_New_Face_From_FSRef                                             */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Create a new face object from a given resource and typeface index  */
  /*    using an FSRef to the font file.                                   */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    library    :: A handle to the library resource.                    */
  /*                                                                       */
  /* <Input>                                                               */
  /*    spec       :: FSRef to the font file.                              */
  /*                                                                       */
  /*    face_index :: The index of the face within the resource.  The      */
  /*                  first face has index~0.                              */
  /* <Output>                                                              */
  /*    aface      :: A handle to a new face object.                       */
  /*                                                                       */
  /* <Return>                                                              */
  /*    FreeType error code.  0~means success.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    @FT_New_Face_From_FSRef is identical to @FT_New_Face except        */
  /*    it accepts an FSRef instead of a path.                             */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_New_Face_From_FSRef( FT_Library    library,
                          const FSRef  *ref,
                          FT_Long       face_index,
                          FT_Face      *aface )
                        FT_DEPRECATED_ATTRIBUTE;

  /* */


FT_END_HEADER


#endif /* FTMAC_H_ */


/* END */
