/***************************************************************************/
/*                                                                         */
/*  tttags.h                                                               */
/*                                                                         */
/*    Tags for TrueType and OpenType tables (specification only).          */
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


#ifndef TTAGS_H_
#define TTAGS_H_


#include <ft2build.h>
#include FT_FREETYPE_H

#ifdef FREETYPE_H
#error "freetype.h of FreeType 1 has been loaded!"
#error "Please fix the directory search order for header files"
#error "so that freetype.h of FreeType 2 is found first."
#endif


FT_BEGIN_HEADER


#define TTAG_avar  FT_MAKE_TAG( 'a', 'v', 'a', 'r' )
#define TTAG_BASE  FT_MAKE_TAG( 'B', 'A', 'S', 'E' )
#define TTAG_bdat  FT_MAKE_TAG( 'b', 'd', 'a', 't' )
#define TTAG_BDF   FT_MAKE_TAG( 'B', 'D', 'F', ' ' )
#define TTAG_bhed  FT_MAKE_TAG( 'b', 'h', 'e', 'd' )
#define TTAG_bloc  FT_MAKE_TAG( 'b', 'l', 'o', 'c' )
#define TTAG_bsln  FT_MAKE_TAG( 'b', 's', 'l', 'n' )
#define TTAG_CBDT  FT_MAKE_TAG( 'C', 'B', 'D', 'T' )
#define TTAG_CBLC  FT_MAKE_TAG( 'C', 'B', 'L', 'C' )
#define TTAG_CFF   FT_MAKE_TAG( 'C', 'F', 'F', ' ' )
#define TTAG_CFF2  FT_MAKE_TAG( 'C', 'F', 'F', '2' )
#define TTAG_CID   FT_MAKE_TAG( 'C', 'I', 'D', ' ' )
#define TTAG_cmap  FT_MAKE_TAG( 'c', 'm', 'a', 'p' )
#define TTAG_cvar  FT_MAKE_TAG( 'c', 'v', 'a', 'r' )
#define TTAG_cvt   FT_MAKE_TAG( 'c', 'v', 't', ' ' )
#define TTAG_DSIG  FT_MAKE_TAG( 'D', 'S', 'I', 'G' )
#define TTAG_EBDT  FT_MAKE_TAG( 'E', 'B', 'D', 'T' )
#define TTAG_EBLC  FT_MAKE_TAG( 'E', 'B', 'L', 'C' )
#define TTAG_EBSC  FT_MAKE_TAG( 'E', 'B', 'S', 'C' )
#define TTAG_feat  FT_MAKE_TAG( 'f', 'e', 'a', 't' )
#define TTAG_FOND  FT_MAKE_TAG( 'F', 'O', 'N', 'D' )
#define TTAG_fpgm  FT_MAKE_TAG( 'f', 'p', 'g', 'm' )
#define TTAG_fvar  FT_MAKE_TAG( 'f', 'v', 'a', 'r' )
#define TTAG_gasp  FT_MAKE_TAG( 'g', 'a', 's', 'p' )
#define TTAG_GDEF  FT_MAKE_TAG( 'G', 'D', 'E', 'F' )
#define TTAG_glyf  FT_MAKE_TAG( 'g', 'l', 'y', 'f' )
#define TTAG_GPOS  FT_MAKE_TAG( 'G', 'P', 'O', 'S' )
#define TTAG_GSUB  FT_MAKE_TAG( 'G', 'S', 'U', 'B' )
#define TTAG_gvar  FT_MAKE_TAG( 'g', 'v', 'a', 'r' )
#define TTAG_HVAR  FT_MAKE_TAG( 'H', 'V', 'A', 'R' )
#define TTAG_hdmx  FT_MAKE_TAG( 'h', 'd', 'm', 'x' )
#define TTAG_head  FT_MAKE_TAG( 'h', 'e', 'a', 'd' )
#define TTAG_hhea  FT_MAKE_TAG( 'h', 'h', 'e', 'a' )
#define TTAG_hmtx  FT_MAKE_TAG( 'h', 'm', 't', 'x' )
#define TTAG_JSTF  FT_MAKE_TAG( 'J', 'S', 'T', 'F' )
#define TTAG_just  FT_MAKE_TAG( 'j', 'u', 's', 't' )
#define TTAG_kern  FT_MAKE_TAG( 'k', 'e', 'r', 'n' )
#define TTAG_lcar  FT_MAKE_TAG( 'l', 'c', 'a', 'r' )
#define TTAG_loca  FT_MAKE_TAG( 'l', 'o', 'c', 'a' )
#define TTAG_LTSH  FT_MAKE_TAG( 'L', 'T', 'S', 'H' )
#define TTAG_LWFN  FT_MAKE_TAG( 'L', 'W', 'F', 'N' )
#define TTAG_MATH  FT_MAKE_TAG( 'M', 'A', 'T', 'H' )
#define TTAG_maxp  FT_MAKE_TAG( 'm', 'a', 'x', 'p' )
#define TTAG_META  FT_MAKE_TAG( 'M', 'E', 'T', 'A' )
#define TTAG_MMFX  FT_MAKE_TAG( 'M', 'M', 'F', 'X' )
#define TTAG_MMSD  FT_MAKE_TAG( 'M', 'M', 'S', 'D' )
#define TTAG_mort  FT_MAKE_TAG( 'm', 'o', 'r', 't' )
#define TTAG_morx  FT_MAKE_TAG( 'm', 'o', 'r', 'x' )
#define TTAG_MVAR  FT_MAKE_TAG( 'M', 'V', 'A', 'R' )
#define TTAG_name  FT_MAKE_TAG( 'n', 'a', 'm', 'e' )
#define TTAG_opbd  FT_MAKE_TAG( 'o', 'p', 'b', 'd' )
#define TTAG_OS2   FT_MAKE_TAG( 'O', 'S', '/', '2' )
#define TTAG_OTTO  FT_MAKE_TAG( 'O', 'T', 'T', 'O' )
#define TTAG_PCLT  FT_MAKE_TAG( 'P', 'C', 'L', 'T' )
#define TTAG_POST  FT_MAKE_TAG( 'P', 'O', 'S', 'T' )
#define TTAG_post  FT_MAKE_TAG( 'p', 'o', 's', 't' )
#define TTAG_prep  FT_MAKE_TAG( 'p', 'r', 'e', 'p' )
#define TTAG_prop  FT_MAKE_TAG( 'p', 'r', 'o', 'p' )
#define TTAG_sbix  FT_MAKE_TAG( 's', 'b', 'i', 'x' )
#define TTAG_sfnt  FT_MAKE_TAG( 's', 'f', 'n', 't' )
#define TTAG_SING  FT_MAKE_TAG( 'S', 'I', 'N', 'G' )
#define TTAG_trak  FT_MAKE_TAG( 't', 'r', 'a', 'k' )
#define TTAG_true  FT_MAKE_TAG( 't', 'r', 'u', 'e' )
#define TTAG_ttc   FT_MAKE_TAG( 't', 't', 'c', ' ' )
#define TTAG_ttcf  FT_MAKE_TAG( 't', 't', 'c', 'f' )
#define TTAG_TYP1  FT_MAKE_TAG( 'T', 'Y', 'P', '1' )
#define TTAG_typ1  FT_MAKE_TAG( 't', 'y', 'p', '1' )
#define TTAG_VDMX  FT_MAKE_TAG( 'V', 'D', 'M', 'X' )
#define TTAG_vhea  FT_MAKE_TAG( 'v', 'h', 'e', 'a' )
#define TTAG_vmtx  FT_MAKE_TAG( 'v', 'm', 't', 'x' )
#define TTAG_VVAR  FT_MAKE_TAG( 'V', 'V', 'A', 'R' )
#define TTAG_wOFF  FT_MAKE_TAG( 'w', 'O', 'F', 'F' )

/* used by "Keyboard.dfont" on legacy Mac OS X */
#define TTAG_0xA5kbd  FT_MAKE_TAG( 0xA5, 'k', 'b', 'd' )

/* used by "LastResort.dfont" on legacy Mac OS X */
#define TTAG_0xA5lst  FT_MAKE_TAG( 0xA5, 'l', 's', 't' )


FT_END_HEADER

#endif /* TTAGS_H_ */


/* END */
