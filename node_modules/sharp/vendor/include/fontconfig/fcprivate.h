/*
 * fontconfig/fontconfig/fcprivate.h
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

#ifndef _FCPRIVATE_H_
#define _FCPRIVATE_H_

/*
 * I tried this with functions that took va_list* arguments
 * but portability concerns made me change these functions
 * into macros (sigh).
 */

#define FcPatternVapBuild(result, orig, va)			    \
{								    \
    FcPattern	*__p__ = (orig);				    \
    const char	*__o__;						    \
    FcValue	__v__;						    \
								    \
    if (!__p__)							    \
    {								    \
	__p__ = FcPatternCreate ();				    \
	if (!__p__)		    				    \
	    goto _FcPatternVapBuild_bail0;			    \
    }				    				    \
    for (;;)			    				    \
    {				    				    \
	__o__ = va_arg (va, const char *);			    \
	if (!__o__)		    				    \
	    break;		    				    \
	__v__.type = va_arg (va, int);				    \
	switch (__v__.type) {	    				    \
	case FcTypeUnknown:					    \
	case FcTypeVoid:					    \
	    goto _FcPatternVapBuild_bail1;       		    \
	case FcTypeInteger:	    				    \
	    __v__.u.i = va_arg (va, int);			    \
	    break;						    \
	case FcTypeDouble:					    \
	    __v__.u.d = va_arg (va, double);			    \
	    break;						    \
	case FcTypeString:					    \
	    __v__.u.s = va_arg (va, const FcChar8 *);		    \
	    break;						    \
	case FcTypeBool:					    \
	    __v__.u.b = va_arg (va, FcBool);			    \
	    break;						    \
	case FcTypeMatrix:					    \
	    __v__.u.m = va_arg (va, const FcMatrix *);		    \
	    break;						    \
	case FcTypeCharSet:					    \
	    __v__.u.c = va_arg (va, const FcCharSet *); 	    \
	    break;						    \
	case FcTypeFTFace:					    \
	    __v__.u.f = va_arg (va, FT_Face);			    \
	    break;						    \
	case FcTypeLangSet:					    \
	    __v__.u.l = va_arg (va, const FcLangSet *);		    \
	    break;						    \
	case FcTypeRange:					    \
	    __v__.u.r = va_arg (va, const FcRange *);		    \
	    break;						    \
	}							    \
	if (!FcPatternAdd (__p__, __o__, __v__, FcTrue))	    \
	    goto _FcPatternVapBuild_bail1;			    \
    }								    \
    result = __p__;						    \
    goto _FcPatternVapBuild_return;				    \
								    \
_FcPatternVapBuild_bail1:					    \
    if (!orig)							    \
	FcPatternDestroy (__p__);				    \
_FcPatternVapBuild_bail0:					    \
    result = (void*)0;						    \
								    \
_FcPatternVapBuild_return:					    \
    ;								    \
}


#define FcObjectSetVapBuild(__ret__, __first__, __va__) 		\
{									\
    FcObjectSet    *__os__;						\
    const char	    *__ob__;						\
									\
    __ret__ = 0;						    	\
    __os__ = FcObjectSetCreate ();					\
    if (!__os__)							\
	goto _FcObjectSetVapBuild_bail0;				\
    __ob__ = __first__;							\
    while (__ob__)							\
    {									\
	if (!FcObjectSetAdd (__os__, __ob__))				\
	    goto _FcObjectSetVapBuild_bail1;				\
	__ob__ = va_arg (__va__, const char *);				\
    }									\
    __ret__ = __os__;							\
									\
_FcObjectSetVapBuild_bail1:						\
    if (!__ret__ && __os__)					    	\
	FcObjectSetDestroy (__os__);					\
_FcObjectSetVapBuild_bail0:						\
    ;									\
}

#ifndef FC_ATTRIBUTE_VISIBILITY_HIDDEN
#define FC_ATTRIBUTE_VISIBILITY_HIDDEN __attribute((visibility("hidden")))
#endif

#ifndef FC_ATTRIBUTE_VISIBILITY_EXPORT
#define FC_ATTRIBUTE_VISIBILITY_EXPORT __attribute((visibility("default")))
#endif

#endif /* _FCPRIVATE_H_ */
