/*
 * fontconfig/fontconfig/fontconfig.h
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

#ifndef _FONTCONFIG_H_
#define _FONTCONFIG_H_

#include <sys/types.h>
#include <sys/stat.h>
#include <stdarg.h>
#include <limits.h>

#if defined(__GNUC__) && (__GNUC__ >= 4)
#define FC_ATTRIBUTE_SENTINEL(x) __attribute__((__sentinel__(0)))
#else
#define FC_ATTRIBUTE_SENTINEL(x)
#endif

#ifndef FcPublic
#define FcPublic
#endif

typedef unsigned char	FcChar8;
typedef unsigned short	FcChar16;
typedef unsigned int	FcChar32;
typedef int		FcBool;

/*
 * Current Fontconfig version number.  This same number
 * must appear in the fontconfig configure.in file. Yes,
 * it'a a pain to synchronize version numbers like this.
 */

#define FC_MAJOR	2
#define FC_MINOR	13
#define FC_REVISION	1

#define FC_VERSION	((FC_MAJOR * 10000) + (FC_MINOR * 100) + (FC_REVISION))

/*
 * Current font cache file format version
 * This is appended to the cache files so that multiple
 * versions of the library will peacefully coexist
 *
 * Change this value whenever the disk format for the cache file
 * changes in any non-compatible way.  Try to avoid such changes as
 * it means multiple copies of the font information.
 */

#define FC_CACHE_VERSION_NUMBER	7
#define _FC_STRINGIFY_(s)    	#s
#define _FC_STRINGIFY(s)    	_FC_STRINGIFY_(s)
#define FC_CACHE_VERSION    	_FC_STRINGIFY(FC_CACHE_VERSION_NUMBER)

#define FcFalse		0
#define FcTrue		1
#define FcDontCare	2

#define FC_FAMILY	    "family"		/* String */
#define FC_STYLE	    "style"		/* String */
#define FC_SLANT	    "slant"		/* Int */
#define FC_WEIGHT	    "weight"		/* Int */
#define FC_SIZE		    "size"		/* Range (double) */
#define FC_ASPECT	    "aspect"		/* Double */
#define FC_PIXEL_SIZE	    "pixelsize"		/* Double */
#define FC_SPACING	    "spacing"		/* Int */
#define FC_FOUNDRY	    "foundry"		/* String */
#define FC_ANTIALIAS	    "antialias"		/* Bool (depends) */
#define FC_HINTING	    "hinting"		/* Bool (true) */
#define FC_HINT_STYLE	    "hintstyle"		/* Int */
#define FC_VERTICAL_LAYOUT  "verticallayout"	/* Bool (false) */
#define FC_AUTOHINT	    "autohint"		/* Bool (false) */
/* FC_GLOBAL_ADVANCE is deprecated. this is simply ignored on freetype 2.4.5 or later */
#define FC_GLOBAL_ADVANCE   "globaladvance"	/* Bool (true) */
#define FC_WIDTH	    "width"		/* Int */
#define FC_FILE		    "file"		/* String */
#define FC_INDEX	    "index"		/* Int */
#define FC_FT_FACE	    "ftface"		/* FT_Face */
#define FC_RASTERIZER	    "rasterizer"	/* String (deprecated) */
#define FC_OUTLINE	    "outline"		/* Bool */
#define FC_SCALABLE	    "scalable"		/* Bool */
#define FC_COLOR	    "color"		/* Bool */
#define FC_VARIABLE	    "variable"		/* Bool */
#define FC_SCALE	    "scale"		/* double (deprecated) */
#define FC_SYMBOL	    "symbol"		/* Bool */
#define FC_DPI		    "dpi"		/* double */
#define FC_RGBA		    "rgba"		/* Int */
#define FC_MINSPACE	    "minspace"		/* Bool use minimum line spacing */
#define FC_SOURCE	    "source"		/* String (deprecated) */
#define FC_CHARSET	    "charset"		/* CharSet */
#define FC_LANG		    "lang"		/* String RFC 3066 langs */
#define FC_FONTVERSION	    "fontversion"	/* Int from 'head' table */
#define FC_FULLNAME	    "fullname"		/* String */
#define FC_FAMILYLANG	    "familylang"	/* String RFC 3066 langs */
#define FC_STYLELANG	    "stylelang"		/* String RFC 3066 langs */
#define FC_FULLNAMELANG	    "fullnamelang"	/* String RFC 3066 langs */
#define FC_CAPABILITY       "capability"	/* String */
#define FC_FONTFORMAT	    "fontformat"	/* String */
#define FC_EMBOLDEN	    "embolden"		/* Bool - true if emboldening needed*/
#define FC_EMBEDDED_BITMAP  "embeddedbitmap"	/* Bool - true to enable embedded bitmaps */
#define FC_DECORATIVE	    "decorative"	/* Bool - true if style is a decorative variant */
#define FC_LCD_FILTER	    "lcdfilter"		/* Int */
#define FC_FONT_FEATURES    "fontfeatures"	/* String */
#define FC_FONT_VARIATIONS  "fontvariations"	/* String */
#define FC_NAMELANG	    "namelang"		/* String RFC 3866 langs */
#define FC_PRGNAME	    "prgname"		/* String */
#define FC_HASH		    "hash"		/* String (deprecated) */
#define FC_POSTSCRIPT_NAME  "postscriptname"	/* String */

#define FC_CACHE_SUFFIX		    ".cache-" FC_CACHE_VERSION
#define FC_DIR_CACHE_FILE	    "fonts.cache-" FC_CACHE_VERSION
#define FC_USER_CACHE_FILE	    ".fonts.cache-" FC_CACHE_VERSION

/* Adjust outline rasterizer */
#define FC_CHARWIDTH	    "charwidth"	/* Int */
#define FC_CHAR_WIDTH	    FC_CHARWIDTH
#define FC_CHAR_HEIGHT	    "charheight"/* Int */
#define FC_MATRIX	    "matrix"    /* FcMatrix */

#define FC_WEIGHT_THIN		    0
#define FC_WEIGHT_EXTRALIGHT	    40
#define FC_WEIGHT_ULTRALIGHT	    FC_WEIGHT_EXTRALIGHT
#define FC_WEIGHT_LIGHT		    50
#define FC_WEIGHT_DEMILIGHT	    55
#define FC_WEIGHT_SEMILIGHT	    FC_WEIGHT_DEMILIGHT
#define FC_WEIGHT_BOOK		    75
#define FC_WEIGHT_REGULAR	    80
#define FC_WEIGHT_NORMAL	    FC_WEIGHT_REGULAR
#define FC_WEIGHT_MEDIUM	    100
#define FC_WEIGHT_DEMIBOLD	    180
#define FC_WEIGHT_SEMIBOLD	    FC_WEIGHT_DEMIBOLD
#define FC_WEIGHT_BOLD		    200
#define FC_WEIGHT_EXTRABOLD	    205
#define FC_WEIGHT_ULTRABOLD	    FC_WEIGHT_EXTRABOLD
#define FC_WEIGHT_BLACK		    210
#define FC_WEIGHT_HEAVY		    FC_WEIGHT_BLACK
#define FC_WEIGHT_EXTRABLACK	    215
#define FC_WEIGHT_ULTRABLACK	    FC_WEIGHT_EXTRABLACK

#define FC_SLANT_ROMAN		    0
#define FC_SLANT_ITALIC		    100
#define FC_SLANT_OBLIQUE	    110

#define FC_WIDTH_ULTRACONDENSED	    50
#define FC_WIDTH_EXTRACONDENSED	    63
#define FC_WIDTH_CONDENSED	    75
#define FC_WIDTH_SEMICONDENSED	    87
#define FC_WIDTH_NORMAL		    100
#define FC_WIDTH_SEMIEXPANDED	    113
#define FC_WIDTH_EXPANDED	    125
#define FC_WIDTH_EXTRAEXPANDED	    150
#define FC_WIDTH_ULTRAEXPANDED	    200

#define FC_PROPORTIONAL		    0
#define FC_DUAL			    90
#define FC_MONO			    100
#define FC_CHARCELL		    110

/* sub-pixel order */
#define FC_RGBA_UNKNOWN	    0
#define FC_RGBA_RGB	    1
#define FC_RGBA_BGR	    2
#define FC_RGBA_VRGB	    3
#define FC_RGBA_VBGR	    4
#define FC_RGBA_NONE	    5

/* hinting style */
#define FC_HINT_NONE        0
#define FC_HINT_SLIGHT      1
#define FC_HINT_MEDIUM      2
#define FC_HINT_FULL        3

/* LCD filter */
#define FC_LCD_NONE	    0
#define FC_LCD_DEFAULT	    1
#define FC_LCD_LIGHT	    2
#define FC_LCD_LEGACY	    3

typedef enum _FcType {
    FcTypeUnknown = -1,
    FcTypeVoid,
    FcTypeInteger,
    FcTypeDouble,
    FcTypeString,
    FcTypeBool,
    FcTypeMatrix,
    FcTypeCharSet,
    FcTypeFTFace,
    FcTypeLangSet,
    FcTypeRange
} FcType;

typedef struct _FcMatrix {
    double xx, xy, yx, yy;
} FcMatrix;

#define FcMatrixInit(m)	((m)->xx = (m)->yy = 1, \
			 (m)->xy = (m)->yx = 0)

/*
 * A data structure to represent the available glyphs in a font.
 * This is represented as a sparse boolean btree.
 */

typedef struct _FcCharSet FcCharSet;

typedef struct _FcObjectType {
    char	*object;
    FcType	type;
} FcObjectType;

typedef struct _FcConstant {
    const FcChar8  *name;
    const char	*object;
    int		value;
} FcConstant;

typedef enum _FcResult {
    FcResultMatch, FcResultNoMatch, FcResultTypeMismatch, FcResultNoId,
    FcResultOutOfMemory
} FcResult;

typedef enum _FcValueBinding {
    FcValueBindingWeak, FcValueBindingStrong, FcValueBindingSame,
    /* to make sure sizeof (FcValueBinding) == 4 even with -fshort-enums */
    FcValueBindingEnd = INT_MAX
} FcValueBinding;

typedef struct _FcPattern   FcPattern;

typedef struct _FcPatternIter {
    void *dummy1;
    void *dummy2;
} FcPatternIter;

typedef struct _FcLangSet   FcLangSet;

typedef struct _FcRange	    FcRange;

typedef struct _FcValue {
    FcType	type;
    union {
	const FcChar8	*s;
	int		i;
	FcBool		b;
	double		d;
	const FcMatrix	*m;
	const FcCharSet	*c;
	void		*f;
	const FcLangSet	*l;
	const FcRange	*r;
    } u;
} FcValue;

typedef struct _FcFontSet {
    int		nfont;
    int		sfont;
    FcPattern	**fonts;
} FcFontSet;

typedef struct _FcObjectSet {
    int		nobject;
    int		sobject;
    const char	**objects;
} FcObjectSet;
    
typedef enum _FcMatchKind {
    FcMatchPattern, FcMatchFont, FcMatchScan,
    FcMatchKindEnd,
    FcMatchKindBegin = FcMatchPattern
} FcMatchKind;

typedef enum _FcLangResult {
    FcLangEqual = 0,
    FcLangDifferentCountry = 1,
    FcLangDifferentTerritory = 1,
    FcLangDifferentLang = 2
} FcLangResult;

typedef enum _FcSetName {
    FcSetSystem = 0,
    FcSetApplication = 1
} FcSetName;

typedef struct _FcConfigFileInfoIter {
    void	*dummy1;
    void	*dummy2;
    void	*dummy3;
} FcConfigFileInfoIter;

typedef struct _FcAtomic FcAtomic;

#if defined(__cplusplus) || defined(c_plusplus) /* for C++ V2.0 */
#define _FCFUNCPROTOBEGIN extern "C" {	/* do not leave open across includes */
#define _FCFUNCPROTOEND }
#else
#define _FCFUNCPROTOBEGIN
#define _FCFUNCPROTOEND
#endif

typedef enum { FcEndianBig, FcEndianLittle } FcEndian;

typedef struct _FcConfig    FcConfig;

typedef struct _FcGlobalCache	FcFileCache;

typedef struct _FcBlanks    FcBlanks;

typedef struct _FcStrList   FcStrList;

typedef struct _FcStrSet    FcStrSet;

typedef struct _FcCache	    FcCache;

_FCFUNCPROTOBEGIN

/* fcblanks.c */
FcPublic FcBlanks *
FcBlanksCreate (void);

FcPublic void
FcBlanksDestroy (FcBlanks *b);

FcPublic FcBool
FcBlanksAdd (FcBlanks *b, FcChar32 ucs4);

FcPublic FcBool
FcBlanksIsMember (FcBlanks *b, FcChar32 ucs4);

/* fccache.c */

FcPublic const FcChar8 *
FcCacheDir(const FcCache *c);

FcPublic FcFontSet *
FcCacheCopySet(const FcCache *c);

FcPublic const FcChar8 *
FcCacheSubdir (const FcCache *c, int i);

FcPublic int
FcCacheNumSubdir (const FcCache *c);

FcPublic int
FcCacheNumFont (const FcCache *c);

FcPublic FcBool
FcDirCacheUnlink (const FcChar8 *dir, FcConfig *config);

FcPublic FcBool
FcDirCacheValid (const FcChar8 *cache_file);

FcPublic FcBool
FcDirCacheClean (const FcChar8 *cache_dir, FcBool verbose);

FcPublic void
FcCacheCreateTagFile (const FcConfig *config);

FcPublic FcBool
FcDirCacheCreateUUID (FcChar8  *dir,
		      FcBool    force,
		      FcConfig *config);

FcPublic FcBool
FcDirCacheDeleteUUID (const FcChar8  *dir,
		      FcConfig       *config);

/* fccfg.c */
FcPublic FcChar8 *
FcConfigHome (void);

FcPublic FcBool
FcConfigEnableHome (FcBool enable);

FcPublic FcChar8 *
FcConfigFilename (const FcChar8 *url);
    
FcPublic FcConfig *
FcConfigCreate (void);

FcPublic FcConfig *
FcConfigReference (FcConfig *config);

FcPublic void
FcConfigDestroy (FcConfig *config);

FcPublic FcBool
FcConfigSetCurrent (FcConfig *config);

FcPublic FcConfig *
FcConfigGetCurrent (void);

FcPublic FcBool
FcConfigUptoDate (FcConfig *config);
    
FcPublic FcBool
FcConfigBuildFonts (FcConfig *config);

FcPublic FcStrList *
FcConfigGetFontDirs (FcConfig   *config);

FcPublic FcStrList *
FcConfigGetConfigDirs (FcConfig   *config);

FcPublic FcStrList *
FcConfigGetConfigFiles (FcConfig    *config);

FcPublic FcChar8 *
FcConfigGetCache (FcConfig  *config);

FcPublic FcBlanks *
FcConfigGetBlanks (FcConfig *config);

FcPublic FcStrList *
FcConfigGetCacheDirs (const FcConfig	*config);

FcPublic int
FcConfigGetRescanInterval (FcConfig *config);

FcPublic FcBool
FcConfigSetRescanInterval (FcConfig *config, int rescanInterval);

FcPublic FcFontSet *
FcConfigGetFonts (FcConfig	*config,
		  FcSetName	set);

FcPublic FcBool
FcConfigAppFontAddFile (FcConfig    *config,
			const FcChar8  *file);

FcPublic FcBool
FcConfigAppFontAddDir (FcConfig	    *config,
		       const FcChar8   *dir);

FcPublic void
FcConfigAppFontClear (FcConfig	    *config);

FcPublic FcBool
FcConfigSubstituteWithPat (FcConfig	*config,
			   FcPattern	*p,
			   FcPattern	*p_pat,
			   FcMatchKind	kind);

FcPublic FcBool
FcConfigSubstitute (FcConfig	*config,
		    FcPattern	*p,
		    FcMatchKind	kind);

FcPublic const FcChar8 *
FcConfigGetSysRoot (const FcConfig *config);

FcPublic void
FcConfigSetSysRoot (FcConfig      *config,
		    const FcChar8 *sysroot);

FcPublic void
FcConfigFileInfoIterInit (FcConfig		*config,
			  FcConfigFileInfoIter	*iter);

FcPublic FcBool
FcConfigFileInfoIterNext (FcConfig		*config,
			  FcConfigFileInfoIter	*iter);

FcPublic FcBool
FcConfigFileInfoIterGet (FcConfig		*config,
			 FcConfigFileInfoIter	*iter,
			 FcChar8		**name,
			 FcChar8		**description,
			 FcBool			*enabled);

/* fccharset.c */
FcPublic FcCharSet*
FcCharSetCreate (void);

/* deprecated alias for FcCharSetCreate */
FcPublic FcCharSet *
FcCharSetNew (void);

FcPublic void
FcCharSetDestroy (FcCharSet *fcs);

FcPublic FcBool
FcCharSetAddChar (FcCharSet *fcs, FcChar32 ucs4);

FcPublic FcBool
FcCharSetDelChar (FcCharSet *fcs, FcChar32 ucs4);

FcPublic FcCharSet*
FcCharSetCopy (FcCharSet *src);

FcPublic FcBool
FcCharSetEqual (const FcCharSet *a, const FcCharSet *b);

FcPublic FcCharSet*
FcCharSetIntersect (const FcCharSet *a, const FcCharSet *b);

FcPublic FcCharSet*
FcCharSetUnion (const FcCharSet *a, const FcCharSet *b);

FcPublic FcCharSet*
FcCharSetSubtract (const FcCharSet *a, const FcCharSet *b);

FcPublic FcBool
FcCharSetMerge (FcCharSet *a, const FcCharSet *b, FcBool *changed);

FcPublic FcBool
FcCharSetHasChar (const FcCharSet *fcs, FcChar32 ucs4);

FcPublic FcChar32
FcCharSetCount (const FcCharSet *a);

FcPublic FcChar32
FcCharSetIntersectCount (const FcCharSet *a, const FcCharSet *b);

FcPublic FcChar32
FcCharSetSubtractCount (const FcCharSet *a, const FcCharSet *b);

FcPublic FcBool
FcCharSetIsSubset (const FcCharSet *a, const FcCharSet *b);

#define FC_CHARSET_MAP_SIZE (256/32)
#define FC_CHARSET_DONE	((FcChar32) -1)

FcPublic FcChar32
FcCharSetFirstPage (const FcCharSet *a, 
		    FcChar32	    map[FC_CHARSET_MAP_SIZE],
		    FcChar32	    *next);

FcPublic FcChar32
FcCharSetNextPage (const FcCharSet  *a, 
		   FcChar32	    map[FC_CHARSET_MAP_SIZE],
		   FcChar32	    *next);

/*
 * old coverage API, rather hard to use correctly
 */

FcPublic FcChar32
FcCharSetCoverage (const FcCharSet *a, FcChar32 page, FcChar32 *result);

/* fcdbg.c */
FcPublic void
FcValuePrint (const FcValue v);

FcPublic void
FcPatternPrint (const FcPattern *p);

FcPublic void
FcFontSetPrint (const FcFontSet *s);

/* fcdefault.c */
FcPublic FcStrSet *
FcGetDefaultLangs (void);

FcPublic void
FcDefaultSubstitute (FcPattern *pattern);

/* fcdir.c */
FcPublic FcBool
FcFileIsDir (const FcChar8 *file);

FcPublic FcBool
FcFileScan (FcFontSet	    *set,
	    FcStrSet	    *dirs,
	    FcFileCache	    *cache,
	    FcBlanks	    *blanks,
	    const FcChar8   *file,
	    FcBool	    force);

FcPublic FcBool
FcDirScan (FcFontSet	    *set,
	   FcStrSet	    *dirs,
	   FcFileCache	    *cache,
	   FcBlanks	    *blanks,
	   const FcChar8    *dir,
	   FcBool	    force);

FcPublic FcBool
FcDirSave (FcFontSet *set, FcStrSet *dirs, const FcChar8 *dir);

FcPublic FcCache *
FcDirCacheLoad (const FcChar8 *dir, FcConfig *config, FcChar8 **cache_file);

FcPublic FcCache *
FcDirCacheRescan (const FcChar8 *dir, FcConfig *config);
    
FcPublic FcCache *
FcDirCacheRead (const FcChar8 *dir, FcBool force, FcConfig *config);

FcPublic FcCache *
FcDirCacheLoadFile (const FcChar8 *cache_file, struct stat *file_stat);

FcPublic void
FcDirCacheUnload (FcCache *cache);

/* fcfreetype.c */
FcPublic FcPattern *
FcFreeTypeQuery (const FcChar8 *file, unsigned int id, FcBlanks *blanks, int *count);

FcPublic unsigned int
FcFreeTypeQueryAll(const FcChar8 *file, unsigned int id, FcBlanks *blanks, int *count, FcFontSet *set);

/* fcfs.c */

FcPublic FcFontSet *
FcFontSetCreate (void);

FcPublic void
FcFontSetDestroy (FcFontSet *s);

FcPublic FcBool
FcFontSetAdd (FcFontSet *s, FcPattern *font);

/* fcinit.c */
FcPublic FcConfig *
FcInitLoadConfig (void);

FcPublic FcConfig *
FcInitLoadConfigAndFonts (void);

FcPublic FcBool
FcInit (void);

FcPublic void
FcFini (void);

FcPublic int
FcGetVersion (void);

FcPublic FcBool
FcInitReinitialize (void);

FcPublic FcBool
FcInitBringUptoDate (void);

/* fclang.c */
FcPublic FcStrSet *
FcGetLangs (void);

FcPublic FcChar8 *
FcLangNormalize (const FcChar8 *lang);

FcPublic const FcCharSet *
FcLangGetCharSet (const FcChar8 *lang);

FcPublic FcLangSet*
FcLangSetCreate (void);

FcPublic void
FcLangSetDestroy (FcLangSet *ls);

FcPublic FcLangSet*
FcLangSetCopy (const FcLangSet *ls);

FcPublic FcBool
FcLangSetAdd (FcLangSet *ls, const FcChar8 *lang);

FcPublic FcBool
FcLangSetDel (FcLangSet *ls, const FcChar8 *lang);

FcPublic FcLangResult
FcLangSetHasLang (const FcLangSet *ls, const FcChar8 *lang);

FcPublic FcLangResult
FcLangSetCompare (const FcLangSet *lsa, const FcLangSet *lsb);

FcPublic FcBool
FcLangSetContains (const FcLangSet *lsa, const FcLangSet *lsb);

FcPublic FcBool
FcLangSetEqual (const FcLangSet *lsa, const FcLangSet *lsb);

FcPublic FcChar32
FcLangSetHash (const FcLangSet *ls);

FcPublic FcStrSet *
FcLangSetGetLangs (const FcLangSet *ls);

FcPublic FcLangSet *
FcLangSetUnion (const FcLangSet *a, const FcLangSet *b);

FcPublic FcLangSet *
FcLangSetSubtract (const FcLangSet *a, const FcLangSet *b);

/* fclist.c */
FcPublic FcObjectSet *
FcObjectSetCreate (void);

FcPublic FcBool
FcObjectSetAdd (FcObjectSet *os, const char *object);

FcPublic void
FcObjectSetDestroy (FcObjectSet *os);

FcPublic FcObjectSet *
FcObjectSetVaBuild (const char *first, va_list va);

FcPublic FcObjectSet *
FcObjectSetBuild (const char *first, ...) FC_ATTRIBUTE_SENTINEL(0);

FcPublic FcFontSet *
FcFontSetList (FcConfig	    *config,
	       FcFontSet    **sets,
	       int	    nsets,
	       FcPattern    *p,
	       FcObjectSet  *os);

FcPublic FcFontSet *
FcFontList (FcConfig	*config,
	    FcPattern	*p,
	    FcObjectSet *os);

/* fcatomic.c */

FcPublic FcAtomic *
FcAtomicCreate (const FcChar8   *file);

FcPublic FcBool
FcAtomicLock (FcAtomic *atomic);

FcPublic FcChar8 *
FcAtomicNewFile (FcAtomic *atomic);

FcPublic FcChar8 *
FcAtomicOrigFile (FcAtomic *atomic);

FcPublic FcBool
FcAtomicReplaceOrig (FcAtomic *atomic);

FcPublic void
FcAtomicDeleteNew (FcAtomic *atomic);

FcPublic void
FcAtomicUnlock (FcAtomic *atomic);

FcPublic void
FcAtomicDestroy (FcAtomic *atomic);

/* fcmatch.c */
FcPublic FcPattern *
FcFontSetMatch (FcConfig    *config,
		FcFontSet   **sets,
		int	    nsets,
		FcPattern   *p,
		FcResult    *result);

FcPublic FcPattern *
FcFontMatch (FcConfig	*config,
	     FcPattern	*p, 
	     FcResult	*result);

FcPublic FcPattern *
FcFontRenderPrepare (FcConfig	    *config,
		     FcPattern	    *pat,
		     FcPattern	    *font);

FcPublic FcFontSet *
FcFontSetSort (FcConfig	    *config,
	       FcFontSet    **sets,
	       int	    nsets,
	       FcPattern    *p,
	       FcBool	    trim,
	       FcCharSet    **csp,
	       FcResult	    *result);

FcPublic FcFontSet *
FcFontSort (FcConfig	 *config,
	    FcPattern    *p,
	    FcBool	 trim,
	    FcCharSet    **csp,
	    FcResult	 *result);

FcPublic void
FcFontSetSortDestroy (FcFontSet *fs);

/* fcmatrix.c */
FcPublic FcMatrix *
FcMatrixCopy (const FcMatrix *mat);

FcPublic FcBool
FcMatrixEqual (const FcMatrix *mat1, const FcMatrix *mat2);

FcPublic void
FcMatrixMultiply (FcMatrix *result, const FcMatrix *a, const FcMatrix *b);

FcPublic void
FcMatrixRotate (FcMatrix *m, double c, double s);

FcPublic void
FcMatrixScale (FcMatrix *m, double sx, double sy);

FcPublic void
FcMatrixShear (FcMatrix *m, double sh, double sv);

/* fcname.c */

/* Deprecated.  Does nothing.  Returns FcFalse. */
FcPublic FcBool
FcNameRegisterObjectTypes (const FcObjectType *types, int ntype);

/* Deprecated.  Does nothing.  Returns FcFalse. */
FcPublic FcBool
FcNameUnregisterObjectTypes (const FcObjectType *types, int ntype);

FcPublic const FcObjectType *
FcNameGetObjectType (const char *object);

/* Deprecated.  Does nothing.  Returns FcFalse. */
FcPublic FcBool
FcNameRegisterConstants (const FcConstant *consts, int nconsts);

/* Deprecated.  Does nothing.  Returns FcFalse. */
FcPublic FcBool
FcNameUnregisterConstants (const FcConstant *consts, int nconsts);

FcPublic const FcConstant *
FcNameGetConstant (const FcChar8 *string);

FcPublic FcBool
FcNameConstant (const FcChar8 *string, int *result);

FcPublic FcPattern *
FcNameParse (const FcChar8 *name);

FcPublic FcChar8 *
FcNameUnparse (FcPattern *pat);

/* fcpat.c */
FcPublic FcPattern *
FcPatternCreate (void);

FcPublic FcPattern *
FcPatternDuplicate (const FcPattern *p);

FcPublic void
FcPatternReference (FcPattern *p);

FcPublic FcPattern *
FcPatternFilter (FcPattern *p, const FcObjectSet *os);

FcPublic void
FcValueDestroy (FcValue v);

FcPublic FcBool
FcValueEqual (FcValue va, FcValue vb);

FcPublic FcValue
FcValueSave (FcValue v);

FcPublic void
FcPatternDestroy (FcPattern *p);

int
FcPatternObjectCount (const FcPattern *pat);

FcPublic FcBool
FcPatternEqual (const FcPattern *pa, const FcPattern *pb);

FcPublic FcBool
FcPatternEqualSubset (const FcPattern *pa, const FcPattern *pb, const FcObjectSet *os);

FcPublic FcChar32
FcPatternHash (const FcPattern *p);

FcPublic FcBool
FcPatternAdd (FcPattern *p, const char *object, FcValue value, FcBool append);
    
FcPublic FcBool
FcPatternAddWeak (FcPattern *p, const char *object, FcValue value, FcBool append);
    
FcPublic FcResult
FcPatternGet (const FcPattern *p, const char *object, int id, FcValue *v);

FcPublic FcResult
FcPatternGetWithBinding (const FcPattern *p, const char *object, int id, FcValue *v, FcValueBinding *b);

FcPublic FcBool
FcPatternDel (FcPattern *p, const char *object);

FcPublic FcBool
FcPatternRemove (FcPattern *p, const char *object, int id);

FcPublic FcBool
FcPatternAddInteger (FcPattern *p, const char *object, int i);

FcPublic FcBool
FcPatternAddDouble (FcPattern *p, const char *object, double d);

FcPublic FcBool
FcPatternAddString (FcPattern *p, const char *object, const FcChar8 *s);

FcPublic FcBool
FcPatternAddMatrix (FcPattern *p, const char *object, const FcMatrix *s);

FcPublic FcBool
FcPatternAddCharSet (FcPattern *p, const char *object, const FcCharSet *c);

FcPublic FcBool
FcPatternAddBool (FcPattern *p, const char *object, FcBool b);

FcPublic FcBool
FcPatternAddLangSet (FcPattern *p, const char *object, const FcLangSet *ls);

FcPublic FcBool
FcPatternAddRange (FcPattern *p, const char *object, const FcRange *r);

FcPublic FcResult
FcPatternGetInteger (const FcPattern *p, const char *object, int n, int *i);

FcPublic FcResult
FcPatternGetDouble (const FcPattern *p, const char *object, int n, double *d);

FcPublic FcResult
FcPatternGetString (const FcPattern *p, const char *object, int n, FcChar8 ** s);

FcPublic FcResult
FcPatternGetMatrix (const FcPattern *p, const char *object, int n, FcMatrix **s);

FcPublic FcResult
FcPatternGetCharSet (const FcPattern *p, const char *object, int n, FcCharSet **c);

FcPublic FcResult
FcPatternGetBool (const FcPattern *p, const char *object, int n, FcBool *b);

FcPublic FcResult
FcPatternGetLangSet (const FcPattern *p, const char *object, int n, FcLangSet **ls);

FcPublic FcResult
FcPatternGetRange (const FcPattern *p, const char *object, int id, FcRange **r);

FcPublic FcPattern *
FcPatternVaBuild (FcPattern *p, va_list va);
    
FcPublic FcPattern *
FcPatternBuild (FcPattern *p, ...) FC_ATTRIBUTE_SENTINEL(0);

FcPublic FcChar8 *
FcPatternFormat (FcPattern *pat, const FcChar8 *format);

/* fcrange.c */
FcPublic FcRange *
FcRangeCreateDouble (double begin, double end);

FcPublic FcRange *
FcRangeCreateInteger (FcChar32 begin, FcChar32 end);

FcPublic void
FcRangeDestroy (FcRange *range);

FcPublic FcRange *
FcRangeCopy (const FcRange *r);

FcPublic FcBool
FcRangeGetDouble(const FcRange *range, double *begin, double *end);

FcPublic void
FcPatternIterStart (const FcPattern *pat, FcPatternIter *iter);

FcPublic FcBool
FcPatternIterNext (const FcPattern *pat, FcPatternIter *iter);

FcPublic FcBool
FcPatternIterEqual (const FcPattern *p1, FcPatternIter *i1,
		    const FcPattern *p2, FcPatternIter *i2);

FcPublic FcBool
FcPatternFindIter (const FcPattern *pat, FcPatternIter *iter, const char *object);

FcPublic FcBool
FcPatternIterIsValid (const FcPattern *pat, FcPatternIter *iter);

FcPublic const char *
FcPatternIterGetObject (const FcPattern *pat, FcPatternIter *iter);

FcPublic int
FcPatternIterValueCount (const FcPattern *pat, FcPatternIter *iter);

FcPublic FcResult
FcPatternIterGetValue (const FcPattern *pat, FcPatternIter *iter, int id, FcValue *v, FcValueBinding *b);

/* fcweight.c */

FcPublic int
FcWeightFromOpenType (int ot_weight);

FcPublic double
FcWeightFromOpenTypeDouble (double ot_weight);

FcPublic int
FcWeightToOpenType (int fc_weight);

FcPublic double
FcWeightToOpenTypeDouble (double fc_weight);

/* fcstr.c */

FcPublic FcChar8 *
FcStrCopy (const FcChar8 *s);

FcPublic FcChar8 *
FcStrCopyFilename (const FcChar8 *s);
    
FcPublic FcChar8 *
FcStrPlus (const FcChar8 *s1, const FcChar8 *s2);
    
FcPublic void
FcStrFree (FcChar8 *s);

/* These are ASCII only, suitable only for pattern element names */
#define FcIsUpper(c)	((0101 <= (c) && (c) <= 0132))
#define FcIsLower(c)	((0141 <= (c) && (c) <= 0172))
#define FcToLower(c)	(FcIsUpper(c) ? (c) - 0101 + 0141 : (c))

FcPublic FcChar8 *
FcStrDowncase (const FcChar8 *s);

FcPublic int
FcStrCmpIgnoreCase (const FcChar8 *s1, const FcChar8 *s2);

FcPublic int
FcStrCmp (const FcChar8 *s1, const FcChar8 *s2);

FcPublic const FcChar8 *
FcStrStrIgnoreCase (const FcChar8 *s1, const FcChar8 *s2);

FcPublic const FcChar8 *
FcStrStr (const FcChar8 *s1, const FcChar8 *s2);

FcPublic int
FcUtf8ToUcs4 (const FcChar8 *src_orig,
	      FcChar32	    *dst,
	      int	    len);

FcPublic FcBool
FcUtf8Len (const FcChar8    *string,
	   int		    len,
	   int		    *nchar,
	   int		    *wchar);

#define FC_UTF8_MAX_LEN	6

FcPublic int
FcUcs4ToUtf8 (FcChar32	ucs4,
	      FcChar8	dest[FC_UTF8_MAX_LEN]);

FcPublic int
FcUtf16ToUcs4 (const FcChar8	*src_orig,
	       FcEndian		endian,
	       FcChar32		*dst,
	       int		len);	    /* in bytes */

FcPublic FcBool
FcUtf16Len (const FcChar8   *string,
	    FcEndian	    endian,
	    int		    len,	    /* in bytes */
	    int		    *nchar,
	    int		    *wchar);

FcPublic FcChar8 *
FcStrDirname (const FcChar8 *file);

FcPublic FcChar8 *
FcStrBasename (const FcChar8 *file);

FcPublic FcStrSet *
FcStrSetCreate (void);

FcPublic FcBool
FcStrSetMember (FcStrSet *set, const FcChar8 *s);

FcPublic FcBool
FcStrSetEqual (FcStrSet *sa, FcStrSet *sb);

FcPublic FcBool
FcStrSetAdd (FcStrSet *set, const FcChar8 *s);

FcPublic FcBool
FcStrSetAddFilename (FcStrSet *set, const FcChar8 *s);

FcPublic FcBool
FcStrSetDel (FcStrSet *set, const FcChar8 *s);

FcPublic void
FcStrSetDestroy (FcStrSet *set);

FcPublic FcStrList *
FcStrListCreate (FcStrSet *set);

FcPublic void
FcStrListFirst (FcStrList *list);

FcPublic FcChar8 *
FcStrListNext (FcStrList *list);

FcPublic void
FcStrListDone (FcStrList *list);

/* fcxml.c */
FcPublic FcBool
FcConfigParseAndLoad (FcConfig *config, const FcChar8 *file, FcBool complain);

FcPublic FcBool
FcConfigParseAndLoadFromMemory (FcConfig       *config,
				const FcChar8  *buffer,
				FcBool         complain);

_FCFUNCPROTOEND

#undef FC_ATTRIBUTE_SENTINEL


#ifndef _FCINT_H_

/*
 * Deprecated functions are placed here to help users fix their code without
 * digging through documentation
 */
 
#define FcConfigGetRescanInverval   FcConfigGetRescanInverval_REPLACE_BY_FcConfigGetRescanInterval
#define FcConfigSetRescanInverval   FcConfigSetRescanInverval_REPLACE_BY_FcConfigSetRescanInterval

#endif

#endif /* _FONTCONFIG_H_ */
