/*
 * fontconfig/fontconfig/fcfreetype.h
 *
 * Copyright © 2001 Keith Packard
 *
 * Permission to use, copy, modify, distribute, and sell this software and its
 * documentation for any purpose is hereby granted without fee, provided that
 * the above copyright notice appear in all copies and that both that
 * copyright notice and this permission notice appear in supporting
 * documentation, and that the name of the author(s) not be used in
 * advertising or publicity pertaining to distribution of the software without
 * specific, written prior permission.  The authors make no
 * representations about the suitability of this software for any purpose.  It
 * is provided "as is" without express or implied warranty.
 *
 * THE AUTHOR(S) DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE,
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO
 * EVENT SHALL THE AUTHOR(S) BE LIABLE FOR ANY SPECIAL, INDIRECT OR
 * CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
 * DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 * TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

#ifndef _FCFREETYPE_H_
#define _FCFREETYPE_H_
#include <ft2build.h>
#include FT_FREETYPE_H

#ifndef FcPublic
#define FcPublic
#endif

_FCFUNCPROTOBEGIN

FcPublic FT_UInt
FcFreeTypeCharIndex (FT_Face face, FcChar32 ucs4);

FcPublic FcCharSet *
FcFreeTypeCharSetAndSpacing (FT_Face face, FcBlanks *blanks, int *spacing);
    
FcPublic FcCharSet *
FcFreeTypeCharSet (FT_Face face, FcBlanks *blanks);

FcPublic FcResult
FcPatternGetFTFace (const FcPattern *p, const char *object, int n, FT_Face *f);

FcPublic FcBool
FcPatternAddFTFace (FcPattern *p, const char *object, const FT_Face f);

FcPublic FcPattern *
FcFreeTypeQueryFace (const FT_Face  face,
		     const FcChar8  *file,
		     unsigned int   id,
		     FcBlanks	    *blanks);

_FCFUNCPROTOEND

#endif
