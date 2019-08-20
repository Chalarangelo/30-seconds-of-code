/*
 * Copyright (c) 1988-1997 Sam Leffler
 * Copyright (c) 1991-1997 Silicon Graphics, Inc.
 *
 * Permission to use, copy, modify, distribute, and sell this software and 
 * its documentation for any purpose is hereby granted without fee, provided
 * that (i) the above copyright notices and this permission notice appear in
 * all copies of the software and related documentation, and (ii) the names of
 * Sam Leffler and Silicon Graphics may not be used in any advertising or
 * publicity relating to the software without the specific, prior written
 * permission of Sam Leffler and Silicon Graphics.
 * 
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
 * 
 * IN NO EVENT SHALL SAM LEFFLER OR SILICON GRAPHICS BE LIABLE FOR
 * ANY SPECIAL, INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND,
 * OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 * WHETHER OR NOT ADVISED OF THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF 
 * LIABILITY, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE 
 * OF THIS SOFTWARE.
 */

#ifndef _TIFF_
#define	_TIFF_

#include "tiffconf.h"

/*
 * Tag Image File Format (TIFF)
 *
 * Based on Rev 6.0 from:
 *    Developer's Desk
 *    Aldus Corporation
 *    411 First Ave. South
 *    Suite 200
 *    Seattle, WA  98104
 *    206-622-5500
 *
 *    (http://partners.adobe.com/asn/developer/PDFS/TN/TIFF6.pdf)
 *
 * For BigTIFF design notes see the following links
 *    http://www.remotesensing.org/libtiff/bigtiffdesign.html
 *    http://www.awaresystems.be/imaging/tiff/bigtiff.html
 */

#define TIFF_VERSION_CLASSIC 42
#define TIFF_VERSION_BIG 43

#define TIFF_BIGENDIAN      0x4d4d
#define TIFF_LITTLEENDIAN   0x4949
#define MDI_LITTLEENDIAN    0x5045
#define MDI_BIGENDIAN       0x4550

/*
 * Intrinsic data types required by the file format:
 *
 * 8-bit quantities     int8/uint8
 * 16-bit quantities    int16/uint16
 * 32-bit quantities    int32/uint32
 * 64-bit quantities    int64/uint64
 * strings              unsigned char*
 */

typedef TIFF_INT8_T   int8;
typedef TIFF_UINT8_T  uint8;

typedef TIFF_INT16_T  int16;
typedef TIFF_UINT16_T uint16;

typedef TIFF_INT32_T  int32;
typedef TIFF_UINT32_T uint32;

typedef TIFF_INT64_T  int64;
typedef TIFF_UINT64_T uint64;

/*
 * Some types as promoted in a variable argument list
 * We use uint16_vap rather then directly using int, because this way
 * we document the type we actually want to pass through, conceptually,
 * rather then confusing the issue by merely stating the type it gets
 * promoted to
 */

typedef int uint16_vap;

/*
 * TIFF header.
 */
typedef struct {
	uint16 tiff_magic;      /* magic number (defines byte order) */
	uint16 tiff_version;    /* TIFF version number */
} TIFFHeaderCommon;
typedef struct {
	uint16 tiff_magic;      /* magic number (defines byte order) */
	uint16 tiff_version;    /* TIFF version number */
	uint32 tiff_diroff;     /* byte offset to first directory */
} TIFFHeaderClassic;
typedef struct {
	uint16 tiff_magic;      /* magic number (defines byte order) */
	uint16 tiff_version;    /* TIFF version number */
	uint16 tiff_offsetsize; /* size of offsets, should be 8 */
	uint16 tiff_unused;     /* unused word, should be 0 */
	uint64 tiff_diroff;     /* byte offset to first directory */
} TIFFHeaderBig;


/*
 * NB: In the comments below,
 *  - items marked with a + are obsoleted by revision 5.0,
 *  - items marked with a ! are introduced in revision 6.0.
 *  - items marked with a % are introduced post revision 6.0.
 *  - items marked with a $ are obsoleted by revision 6.0.
 *  - items marked with a & are introduced by Adobe DNG specification.
 */

/*
 * Tag data type information.
 *
 * Note: RATIONALs are the ratio of two 32-bit integer values.
 */
typedef enum {
	TIFF_NOTYPE = 0,      /* placeholder */
	TIFF_BYTE = 1,        /* 8-bit unsigned integer */
	TIFF_ASCII = 2,       /* 8-bit bytes w/ last byte null */
	TIFF_SHORT = 3,       /* 16-bit unsigned integer */
	TIFF_LONG = 4,        /* 32-bit unsigned integer */
	TIFF_RATIONAL = 5,    /* 64-bit unsigned fraction */
	TIFF_SBYTE = 6,       /* !8-bit signed integer */
	TIFF_UNDEFINED = 7,   /* !8-bit untyped data */
	TIFF_SSHORT = 8,      /* !16-bit signed integer */
	TIFF_SLONG = 9,       /* !32-bit signed integer */
	TIFF_SRATIONAL = 10,  /* !64-bit signed fraction */
	TIFF_FLOAT = 11,      /* !32-bit IEEE floating point */
	TIFF_DOUBLE = 12,     /* !64-bit IEEE floating point */
	TIFF_IFD = 13,        /* %32-bit unsigned integer (offset) */
	TIFF_LONG8 = 16,      /* BigTIFF 64-bit unsigned integer */
	TIFF_SLONG8 = 17,     /* BigTIFF 64-bit signed integer */
	TIFF_IFD8 = 18        /* BigTIFF 64-bit unsigned integer (offset) */
} TIFFDataType;

/*
 * TIFF Tag Definitions.
 */
#define	TIFFTAG_SUBFILETYPE		254	/* subfile data descriptor */
#define	    FILETYPE_REDUCEDIMAGE	0x1	/* reduced resolution version */
#define	    FILETYPE_PAGE		0x2	/* one page of many */
#define	    FILETYPE_MASK		0x4	/* transparency mask */
#define	TIFFTAG_OSUBFILETYPE		255	/* +kind of data in subfile */
#define	    OFILETYPE_IMAGE		1	/* full resolution image data */
#define	    OFILETYPE_REDUCEDIMAGE	2	/* reduced size image data */
#define	    OFILETYPE_PAGE		3	/* one page of many */
#define	TIFFTAG_IMAGEWIDTH		256	/* image width in pixels */
#define	TIFFTAG_IMAGELENGTH		257	/* image height in pixels */
#define	TIFFTAG_BITSPERSAMPLE		258	/* bits per channel (sample) */
#define	TIFFTAG_COMPRESSION		259	/* data compression technique */
#define	    COMPRESSION_NONE		1	/* dump mode */
#define	    COMPRESSION_CCITTRLE	2	/* CCITT modified Huffman RLE */
#define	    COMPRESSION_CCITTFAX3	3	/* CCITT Group 3 fax encoding */
#define     COMPRESSION_CCITT_T4        3       /* CCITT T.4 (TIFF 6 name) */
#define	    COMPRESSION_CCITTFAX4	4	/* CCITT Group 4 fax encoding */
#define     COMPRESSION_CCITT_T6        4       /* CCITT T.6 (TIFF 6 name) */
#define	    COMPRESSION_LZW		5       /* Lempel-Ziv  & Welch */
#define	    COMPRESSION_OJPEG		6	/* !6.0 JPEG */
#define	    COMPRESSION_JPEG		7	/* %JPEG DCT compression */
#define     COMPRESSION_T85			9	/* !TIFF/FX T.85 JBIG compression */
#define     COMPRESSION_T43			10	/* !TIFF/FX T.43 colour by layered JBIG compression */
#define	    COMPRESSION_NEXT		32766	/* NeXT 2-bit RLE */
#define	    COMPRESSION_CCITTRLEW	32771	/* #1 w/ word alignment */
#define	    COMPRESSION_PACKBITS	32773	/* Macintosh RLE */
#define	    COMPRESSION_THUNDERSCAN	32809	/* ThunderScan RLE */
/* codes 32895-32898 are reserved for ANSI IT8 TIFF/IT <dkelly@apago.com) */
#define	    COMPRESSION_IT8CTPAD	32895   /* IT8 CT w/padding */
#define	    COMPRESSION_IT8LW		32896   /* IT8 Linework RLE */
#define	    COMPRESSION_IT8MP		32897   /* IT8 Monochrome picture */
#define	    COMPRESSION_IT8BL		32898   /* IT8 Binary line art */
/* compression codes 32908-32911 are reserved for Pixar */
#define     COMPRESSION_PIXARFILM	32908   /* Pixar companded 10bit LZW */
#define	    COMPRESSION_PIXARLOG	32909   /* Pixar companded 11bit ZIP */
#define	    COMPRESSION_DEFLATE		32946	/* Deflate compression */
#define     COMPRESSION_ADOBE_DEFLATE   8       /* Deflate compression,
						   as recognized by Adobe */
/* compression code 32947 is reserved for Oceana Matrix <dev@oceana.com> */
#define     COMPRESSION_DCS             32947   /* Kodak DCS encoding */
#define	    COMPRESSION_JBIG		34661	/* ISO JBIG */
#define     COMPRESSION_SGILOG		34676	/* SGI Log Luminance RLE */
#define     COMPRESSION_SGILOG24	34677	/* SGI Log 24-bit packed */
#define     COMPRESSION_JP2000          34712   /* Leadtools JPEG2000 */
#define     COMPRESSION_LERC            34887   /* ESRI Lerc codec: https://github.com/Esri/lerc */
/* compression codes 34887-34889 are reserved for ESRI */
#define	    COMPRESSION_LZMA		34925	/* LZMA2 */
#define	    COMPRESSION_ZSTD		50000	/* ZSTD: WARNING not registered in Adobe-maintained registry */
#define	    COMPRESSION_WEBP		50001	/* WEBP: WARNING not registered in Adobe-maintained registry */
#define	TIFFTAG_PHOTOMETRIC		262	/* photometric interpretation */
#define	    PHOTOMETRIC_MINISWHITE	0	/* min value is white */
#define	    PHOTOMETRIC_MINISBLACK	1	/* min value is black */
#define	    PHOTOMETRIC_RGB		2	/* RGB color model */
#define	    PHOTOMETRIC_PALETTE		3	/* color map indexed */
#define	    PHOTOMETRIC_MASK		4	/* $holdout mask */
#define	    PHOTOMETRIC_SEPARATED	5	/* !color separations */
#define	    PHOTOMETRIC_YCBCR		6	/* !CCIR 601 */
#define	    PHOTOMETRIC_CIELAB		8	/* !1976 CIE L*a*b* */
#define	    PHOTOMETRIC_ICCLAB		9	/* ICC L*a*b* [Adobe TIFF Technote 4] */
#define	    PHOTOMETRIC_ITULAB		10	/* ITU L*a*b* */
#define	    PHOTOMETRIC_CFA		32803	/* color filter array */
#define     PHOTOMETRIC_LOGL		32844	/* CIE Log2(L) */
#define     PHOTOMETRIC_LOGLUV		32845	/* CIE Log2(L) (u',v') */
#define	TIFFTAG_THRESHHOLDING		263	/* +thresholding used on data */
#define	    THRESHHOLD_BILEVEL		1	/* b&w art scan */
#define	    THRESHHOLD_HALFTONE		2	/* or dithered scan */
#define	    THRESHHOLD_ERRORDIFFUSE	3	/* usually floyd-steinberg */
#define	TIFFTAG_CELLWIDTH		264	/* +dithering matrix width */
#define	TIFFTAG_CELLLENGTH		265	/* +dithering matrix height */
#define	TIFFTAG_FILLORDER		266	/* data order within a byte */
#define	    FILLORDER_MSB2LSB		1	/* most significant -> least */
#define	    FILLORDER_LSB2MSB		2	/* least significant -> most */
#define	TIFFTAG_DOCUMENTNAME		269	/* name of doc. image is from */
#define	TIFFTAG_IMAGEDESCRIPTION	270	/* info about image */
#define	TIFFTAG_MAKE			271	/* scanner manufacturer name */
#define	TIFFTAG_MODEL			272	/* scanner model name/number */
#define	TIFFTAG_STRIPOFFSETS		273	/* offsets to data strips */
#define	TIFFTAG_ORIENTATION		274	/* +image orientation */
#define	    ORIENTATION_TOPLEFT		1	/* row 0 top, col 0 lhs */
#define	    ORIENTATION_TOPRIGHT	2	/* row 0 top, col 0 rhs */
#define	    ORIENTATION_BOTRIGHT	3	/* row 0 bottom, col 0 rhs */
#define	    ORIENTATION_BOTLEFT		4	/* row 0 bottom, col 0 lhs */
#define	    ORIENTATION_LEFTTOP		5	/* row 0 lhs, col 0 top */
#define	    ORIENTATION_RIGHTTOP	6	/* row 0 rhs, col 0 top */
#define	    ORIENTATION_RIGHTBOT	7	/* row 0 rhs, col 0 bottom */
#define	    ORIENTATION_LEFTBOT		8	/* row 0 lhs, col 0 bottom */
#define	TIFFTAG_SAMPLESPERPIXEL		277	/* samples per pixel */
#define	TIFFTAG_ROWSPERSTRIP		278	/* rows per strip of data */
#define	TIFFTAG_STRIPBYTECOUNTS		279	/* bytes counts for strips */
#define	TIFFTAG_MINSAMPLEVALUE		280	/* +minimum sample value */
#define	TIFFTAG_MAXSAMPLEVALUE		281	/* +maximum sample value */
#define	TIFFTAG_XRESOLUTION		282	/* pixels/resolution in x */
#define	TIFFTAG_YRESOLUTION		283	/* pixels/resolution in y */
#define	TIFFTAG_PLANARCONFIG		284	/* storage organization */
#define	    PLANARCONFIG_CONTIG		1	/* single image plane */
#define	    PLANARCONFIG_SEPARATE	2	/* separate planes of data */
#define	TIFFTAG_PAGENAME		285	/* page name image is from */
#define	TIFFTAG_XPOSITION		286	/* x page offset of image lhs */
#define	TIFFTAG_YPOSITION		287	/* y page offset of image lhs */
#define	TIFFTAG_FREEOFFSETS		288	/* +byte offset to free block */
#define	TIFFTAG_FREEBYTECOUNTS		289	/* +sizes of free blocks */
#define	TIFFTAG_GRAYRESPONSEUNIT	290	/* $gray scale curve accuracy */
#define	    GRAYRESPONSEUNIT_10S	1	/* tenths of a unit */
#define	    GRAYRESPONSEUNIT_100S	2	/* hundredths of a unit */
#define	    GRAYRESPONSEUNIT_1000S	3	/* thousandths of a unit */
#define	    GRAYRESPONSEUNIT_10000S	4	/* ten-thousandths of a unit */
#define	    GRAYRESPONSEUNIT_100000S	5	/* hundred-thousandths */
#define	TIFFTAG_GRAYRESPONSECURVE	291	/* $gray scale response curve */
#define	TIFFTAG_GROUP3OPTIONS		292	/* 32 flag bits */
#define	TIFFTAG_T4OPTIONS		292	/* TIFF 6.0 proper name alias */
#define	    GROUP3OPT_2DENCODING	0x1	/* 2-dimensional coding */
#define	    GROUP3OPT_UNCOMPRESSED	0x2	/* data not compressed */
#define	    GROUP3OPT_FILLBITS		0x4	/* fill to byte boundary */
#define	TIFFTAG_GROUP4OPTIONS		293	/* 32 flag bits */
#define TIFFTAG_T6OPTIONS               293     /* TIFF 6.0 proper name */
#define	    GROUP4OPT_UNCOMPRESSED	0x2	/* data not compressed */
#define	TIFFTAG_RESOLUTIONUNIT		296	/* units of resolutions */
#define	    RESUNIT_NONE		1	/* no meaningful units */
#define	    RESUNIT_INCH		2	/* english */
#define	    RESUNIT_CENTIMETER		3	/* metric */
#define	TIFFTAG_PAGENUMBER		297	/* page numbers of multi-page */
#define	TIFFTAG_COLORRESPONSEUNIT	300	/* $color curve accuracy */
#define	    COLORRESPONSEUNIT_10S	1	/* tenths of a unit */
#define	    COLORRESPONSEUNIT_100S	2	/* hundredths of a unit */
#define	    COLORRESPONSEUNIT_1000S	3	/* thousandths of a unit */
#define	    COLORRESPONSEUNIT_10000S	4	/* ten-thousandths of a unit */
#define	    COLORRESPONSEUNIT_100000S	5	/* hundred-thousandths */
#define	TIFFTAG_TRANSFERFUNCTION	301	/* !colorimetry info */
#define	TIFFTAG_SOFTWARE		305	/* name & release */
#define	TIFFTAG_DATETIME		306	/* creation date and time */
#define	TIFFTAG_ARTIST			315	/* creator of image */
#define	TIFFTAG_HOSTCOMPUTER		316	/* machine where created */
#define	TIFFTAG_PREDICTOR		317	/* prediction scheme w/ LZW */
#define     PREDICTOR_NONE		1	/* no prediction scheme used */
#define     PREDICTOR_HORIZONTAL	2	/* horizontal differencing */
#define     PREDICTOR_FLOATINGPOINT	3	/* floating point predictor */
#define	TIFFTAG_WHITEPOINT		318	/* image white point */
#define	TIFFTAG_PRIMARYCHROMATICITIES	319	/* !primary chromaticities */
#define	TIFFTAG_COLORMAP		320	/* RGB map for palette image */
#define	TIFFTAG_HALFTONEHINTS		321	/* !highlight+shadow info */
#define	TIFFTAG_TILEWIDTH		322	/* !tile width in pixels */
#define	TIFFTAG_TILELENGTH		323	/* !tile height in pixels */
#define TIFFTAG_TILEOFFSETS		324	/* !offsets to data tiles */
#define TIFFTAG_TILEBYTECOUNTS		325	/* !byte counts for tiles */
#define	TIFFTAG_BADFAXLINES		326	/* lines w/ wrong pixel count */
#define	TIFFTAG_CLEANFAXDATA		327	/* regenerated line info */
#define	    CLEANFAXDATA_CLEAN		0	/* no errors detected */
#define	    CLEANFAXDATA_REGENERATED	1	/* receiver regenerated lines */
#define	    CLEANFAXDATA_UNCLEAN	2	/* uncorrected errors exist */
#define	TIFFTAG_CONSECUTIVEBADFAXLINES	328	/* max consecutive bad lines */
#define	TIFFTAG_SUBIFD			330	/* subimage descriptors */
#define	TIFFTAG_INKSET			332	/* !inks in separated image */
#define	    INKSET_CMYK			1	/* !cyan-magenta-yellow-black color */
#define	    INKSET_MULTIINK		2	/* !multi-ink or hi-fi color */
#define	TIFFTAG_INKNAMES		333	/* !ascii names of inks */
#define	TIFFTAG_NUMBEROFINKS		334	/* !number of inks */
#define	TIFFTAG_DOTRANGE		336	/* !0% and 100% dot codes */
#define	TIFFTAG_TARGETPRINTER		337	/* !separation target */
#define	TIFFTAG_EXTRASAMPLES		338	/* !info about extra samples */
#define	    EXTRASAMPLE_UNSPECIFIED	0	/* !unspecified data */
#define	    EXTRASAMPLE_ASSOCALPHA	1	/* !associated alpha data */
#define	    EXTRASAMPLE_UNASSALPHA	2	/* !unassociated alpha data */
#define	TIFFTAG_SAMPLEFORMAT		339	/* !data sample format */
#define	    SAMPLEFORMAT_UINT		1	/* !unsigned integer data */
#define	    SAMPLEFORMAT_INT		2	/* !signed integer data */
#define	    SAMPLEFORMAT_IEEEFP		3	/* !IEEE floating point data */
#define	    SAMPLEFORMAT_VOID		4	/* !untyped data */
#define	    SAMPLEFORMAT_COMPLEXINT	5	/* !complex signed int */
#define	    SAMPLEFORMAT_COMPLEXIEEEFP	6	/* !complex ieee floating */
#define	TIFFTAG_SMINSAMPLEVALUE		340	/* !variable MinSampleValue */
#define	TIFFTAG_SMAXSAMPLEVALUE		341	/* !variable MaxSampleValue */
#define	TIFFTAG_CLIPPATH		343	/* %ClipPath
						   [Adobe TIFF technote 2] */
#define	TIFFTAG_XCLIPPATHUNITS		344	/* %XClipPathUnits
						   [Adobe TIFF technote 2] */
#define	TIFFTAG_YCLIPPATHUNITS		345	/* %YClipPathUnits
						   [Adobe TIFF technote 2] */
#define	TIFFTAG_INDEXED			346	/* %Indexed
						   [Adobe TIFF Technote 3] */
#define	TIFFTAG_JPEGTABLES		347	/* %JPEG table stream */
#define	TIFFTAG_OPIPROXY		351	/* %OPI Proxy [Adobe TIFF technote] */
/* Tags 400-435 are from the TIFF/FX spec */
#define TIFFTAG_GLOBALPARAMETERSIFD	400	/* ! */
#define TIFFTAG_PROFILETYPE			401	/* ! */
#define     PROFILETYPE_UNSPECIFIED	0	/* ! */
#define     PROFILETYPE_G3_FAX		1	/* ! */
#define TIFFTAG_FAXPROFILE			402	/* ! */
#define     FAXPROFILE_S			1	/* !TIFF/FX FAX profile S */
#define     FAXPROFILE_F			2	/* !TIFF/FX FAX profile F */
#define     FAXPROFILE_J			3	/* !TIFF/FX FAX profile J */
#define     FAXPROFILE_C			4	/* !TIFF/FX FAX profile C */
#define     FAXPROFILE_L			5	/* !TIFF/FX FAX profile L */
#define     FAXPROFILE_M			6	/* !TIFF/FX FAX profile LM */
#define TIFFTAG_CODINGMETHODS		403	/* !TIFF/FX coding methods */
#define     CODINGMETHODS_T4_1D		(1 << 1)	/* !T.4 1D */
#define     CODINGMETHODS_T4_2D		(1 << 2)	/* !T.4 2D */
#define     CODINGMETHODS_T6		(1 << 3)	/* !T.6 */
#define     CODINGMETHODS_T85 		(1 << 4)	/* !T.85 JBIG */
#define     CODINGMETHODS_T42 		(1 << 5)	/* !T.42 JPEG */
#define     CODINGMETHODS_T43		(1 << 6)	/* !T.43 colour by layered JBIG */
#define TIFFTAG_VERSIONYEAR			404	/* !TIFF/FX version year */
#define TIFFTAG_MODENUMBER			405	/* !TIFF/FX mode number */
#define TIFFTAG_DECODE				433	/* !TIFF/FX decode */
#define TIFFTAG_IMAGEBASECOLOR		434	/* !TIFF/FX image base colour */
#define TIFFTAG_T82OPTIONS			435	/* !TIFF/FX T.82 options */
/*
 * Tags 512-521 are obsoleted by Technical Note #2 which specifies a
 * revised JPEG-in-TIFF scheme.
 */
#define	TIFFTAG_JPEGPROC		512	/* !JPEG processing algorithm */
#define	    JPEGPROC_BASELINE		1	/* !baseline sequential */
#define	    JPEGPROC_LOSSLESS		14	/* !Huffman coded lossless */
#define	TIFFTAG_JPEGIFOFFSET		513	/* !pointer to SOI marker */
#define	TIFFTAG_JPEGIFBYTECOUNT		514	/* !JFIF stream length */
#define	TIFFTAG_JPEGRESTARTINTERVAL	515	/* !restart interval length */
#define	TIFFTAG_JPEGLOSSLESSPREDICTORS	517	/* !lossless proc predictor */
#define	TIFFTAG_JPEGPOINTTRANSFORM	518	/* !lossless point transform */
#define	TIFFTAG_JPEGQTABLES		519	/* !Q matrix offsets */
#define	TIFFTAG_JPEGDCTABLES		520	/* !DCT table offsets */
#define	TIFFTAG_JPEGACTABLES		521	/* !AC coefficient offsets */
#define	TIFFTAG_YCBCRCOEFFICIENTS	529	/* !RGB -> YCbCr transform */
#define	TIFFTAG_YCBCRSUBSAMPLING	530	/* !YCbCr subsampling factors */
#define	TIFFTAG_YCBCRPOSITIONING	531	/* !subsample positioning */
#define	    YCBCRPOSITION_CENTERED	1	/* !as in PostScript Level 2 */
#define	    YCBCRPOSITION_COSITED	2	/* !as in CCIR 601-1 */
#define	TIFFTAG_REFERENCEBLACKWHITE	532	/* !colorimetry info */
#define TIFFTAG_STRIPROWCOUNTS		559 /* !TIFF/FX strip row counts */
#define	TIFFTAG_XMLPACKET		700	/* %XML packet
						   [Adobe XMP Specification,
						   January 2004 */
#define TIFFTAG_OPIIMAGEID		32781	/* %OPI ImageID
						   [Adobe TIFF technote] */
/* tags 32952-32956 are private tags registered to Island Graphics */
#define TIFFTAG_REFPTS			32953	/* image reference points */
#define TIFFTAG_REGIONTACKPOINT		32954	/* region-xform tack point */
#define TIFFTAG_REGIONWARPCORNERS	32955	/* warp quadrilateral */
#define TIFFTAG_REGIONAFFINE		32956	/* affine transformation mat */
/* tags 32995-32999 are private tags registered to SGI */
#define	TIFFTAG_MATTEING		32995	/* $use ExtraSamples */
#define	TIFFTAG_DATATYPE		32996	/* $use SampleFormat */
#define	TIFFTAG_IMAGEDEPTH		32997	/* z depth of image */
#define	TIFFTAG_TILEDEPTH		32998	/* z depth/data tile */
/* tags 33300-33309 are private tags registered to Pixar */
/*
 * TIFFTAG_PIXAR_IMAGEFULLWIDTH and TIFFTAG_PIXAR_IMAGEFULLLENGTH
 * are set when an image has been cropped out of a larger image.  
 * They reflect the size of the original uncropped image.
 * The TIFFTAG_XPOSITION and TIFFTAG_YPOSITION can be used
 * to determine the position of the smaller image in the larger one.
 */
#define TIFFTAG_PIXAR_IMAGEFULLWIDTH    33300   /* full image size in x */
#define TIFFTAG_PIXAR_IMAGEFULLLENGTH   33301   /* full image size in y */
 /* Tags 33302-33306 are used to identify special image modes and data
  * used by Pixar's texture formats.
  */
#define TIFFTAG_PIXAR_TEXTUREFORMAT	33302	/* texture map format */
#define TIFFTAG_PIXAR_WRAPMODES		33303	/* s & t wrap modes */
#define TIFFTAG_PIXAR_FOVCOT		33304	/* cotan(fov) for env. maps */
#define TIFFTAG_PIXAR_MATRIX_WORLDTOSCREEN 33305
#define TIFFTAG_PIXAR_MATRIX_WORLDTOCAMERA 33306
/* tag 33405 is a private tag registered to Eastman Kodak */
#define TIFFTAG_WRITERSERIALNUMBER      33405   /* device serial number */
#define TIFFTAG_CFAREPEATPATTERNDIM	33421	/* dimensions of CFA pattern */
#define TIFFTAG_CFAPATTERN		33422	/* color filter array pattern */
/* tag 33432 is listed in the 6.0 spec w/ unknown ownership */
#define	TIFFTAG_COPYRIGHT		33432	/* copyright string */
/* IPTC TAG from RichTIFF specifications */
#define TIFFTAG_RICHTIFFIPTC		33723
/* 34016-34029 are reserved for ANSI IT8 TIFF/IT <dkelly@apago.com) */
#define TIFFTAG_IT8SITE			34016	/* site name */
#define TIFFTAG_IT8COLORSEQUENCE	34017	/* color seq. [RGB,CMYK,etc] */
#define TIFFTAG_IT8HEADER		34018	/* DDES Header */
#define TIFFTAG_IT8RASTERPADDING	34019	/* raster scanline padding */
#define TIFFTAG_IT8BITSPERRUNLENGTH	34020	/* # of bits in short run */
#define TIFFTAG_IT8BITSPEREXTENDEDRUNLENGTH 34021/* # of bits in long run */
#define TIFFTAG_IT8COLORTABLE		34022	/* LW colortable */
#define TIFFTAG_IT8IMAGECOLORINDICATOR	34023	/* BP/BL image color switch */
#define TIFFTAG_IT8BKGCOLORINDICATOR	34024	/* BP/BL bg color switch */
#define TIFFTAG_IT8IMAGECOLORVALUE	34025	/* BP/BL image color value */
#define TIFFTAG_IT8BKGCOLORVALUE	34026	/* BP/BL bg color value */
#define TIFFTAG_IT8PIXELINTENSITYRANGE	34027	/* MP pixel intensity value */
#define TIFFTAG_IT8TRANSPARENCYINDICATOR 34028	/* HC transparency switch */
#define TIFFTAG_IT8COLORCHARACTERIZATION 34029	/* color character. table */
#define TIFFTAG_IT8HCUSAGE		34030	/* HC usage indicator */
#define TIFFTAG_IT8TRAPINDICATOR	34031	/* Trapping indicator
						   (untrapped=0, trapped=1) */
#define TIFFTAG_IT8CMYKEQUIVALENT	34032	/* CMYK color equivalents */
/* tags 34232-34236 are private tags registered to Texas Instruments */
#define TIFFTAG_FRAMECOUNT              34232   /* Sequence Frame Count */
/* tag 34377 is private tag registered to Adobe for PhotoShop */
#define TIFFTAG_PHOTOSHOP		34377 
/* tags 34665, 34853 and 40965 are documented in EXIF specification */
#define TIFFTAG_EXIFIFD			34665	/* Pointer to EXIF private directory */
/* tag 34750 is a private tag registered to Adobe? */
#define TIFFTAG_ICCPROFILE		34675	/* ICC profile data */
#define TIFFTAG_IMAGELAYER		34732	/* !TIFF/FX image layer information */
/* tag 34750 is a private tag registered to Pixel Magic */
#define	TIFFTAG_JBIGOPTIONS		34750	/* JBIG options */
#define TIFFTAG_GPSIFD			34853	/* Pointer to GPS private directory */
/* tags 34908-34914 are private tags registered to SGI */
#define	TIFFTAG_FAXRECVPARAMS		34908	/* encoded Class 2 ses. parms */
#define	TIFFTAG_FAXSUBADDRESS		34909	/* received SubAddr string */
#define	TIFFTAG_FAXRECVTIME		34910	/* receive time (secs) */
#define	TIFFTAG_FAXDCS			34911	/* encoded fax ses. params, Table 2/T.30 */
/* tags 37439-37443 are registered to SGI <gregl@sgi.com> */
#define TIFFTAG_STONITS			37439	/* Sample value to Nits */
/* tag 34929 is a private tag registered to FedEx */
#define	TIFFTAG_FEDEX_EDR		34929	/* unknown use */
#define TIFFTAG_INTEROPERABILITYIFD	40965	/* Pointer to Interoperability private directory */
/* tags 50674 to 50677 are reserved for ESRI */
#define TIFFTAG_LERC_PARAMETERS         50674   /* Stores LERC version and additional compression method */
/* Adobe Digital Negative (DNG) format tags */
#define TIFFTAG_DNGVERSION		50706	/* &DNG version number */
#define TIFFTAG_DNGBACKWARDVERSION	50707	/* &DNG compatibility version */
#define TIFFTAG_UNIQUECAMERAMODEL	50708	/* &name for the camera model */
#define TIFFTAG_LOCALIZEDCAMERAMODEL	50709	/* &localized camera model
						   name */
#define TIFFTAG_CFAPLANECOLOR		50710	/* &CFAPattern->LinearRaw space
						   mapping */
#define TIFFTAG_CFALAYOUT		50711	/* &spatial layout of the CFA */
#define TIFFTAG_LINEARIZATIONTABLE	50712	/* &lookup table description */
#define TIFFTAG_BLACKLEVELREPEATDIM	50713	/* &repeat pattern size for
						   the BlackLevel tag */
#define TIFFTAG_BLACKLEVEL		50714	/* &zero light encoding level */
#define TIFFTAG_BLACKLEVELDELTAH	50715	/* &zero light encoding level
						   differences (columns) */
#define TIFFTAG_BLACKLEVELDELTAV	50716	/* &zero light encoding level
						   differences (rows) */
#define TIFFTAG_WHITELEVEL		50717	/* &fully saturated encoding
						   level */
#define TIFFTAG_DEFAULTSCALE		50718	/* &default scale factors */
#define TIFFTAG_DEFAULTCROPORIGIN	50719	/* &origin of the final image
						   area */
#define TIFFTAG_DEFAULTCROPSIZE		50720	/* &size of the final image 
						   area */
#define TIFFTAG_COLORMATRIX1		50721	/* &XYZ->reference color space
						   transformation matrix 1 */
#define TIFFTAG_COLORMATRIX2		50722	/* &XYZ->reference color space
						   transformation matrix 2 */
#define TIFFTAG_CAMERACALIBRATION1	50723	/* &calibration matrix 1 */
#define TIFFTAG_CAMERACALIBRATION2	50724	/* &calibration matrix 2 */
#define TIFFTAG_REDUCTIONMATRIX1	50725	/* &dimensionality reduction
						   matrix 1 */
#define TIFFTAG_REDUCTIONMATRIX2	50726	/* &dimensionality reduction
						   matrix 2 */
#define TIFFTAG_ANALOGBALANCE		50727	/* &gain applied the stored raw
						   values*/
#define TIFFTAG_ASSHOTNEUTRAL		50728	/* &selected white balance in
						   linear reference space */
#define TIFFTAG_ASSHOTWHITEXY		50729	/* &selected white balance in
						   x-y chromaticity
						   coordinates */
#define TIFFTAG_BASELINEEXPOSURE	50730	/* &how much to move the zero
						   point */
#define TIFFTAG_BASELINENOISE		50731	/* &relative noise level */
#define TIFFTAG_BASELINESHARPNESS	50732	/* &relative amount of
						   sharpening */
#define TIFFTAG_BAYERGREENSPLIT		50733	/* &how closely the values of
						   the green pixels in the
						   blue/green rows track the
						   values of the green pixels
						   in the red/green rows */
#define TIFFTAG_LINEARRESPONSELIMIT	50734	/* &non-linear encoding range */
#define TIFFTAG_CAMERASERIALNUMBER	50735	/* &camera's serial number */
#define TIFFTAG_LENSINFO		50736	/* info about the lens */
#define TIFFTAG_CHROMABLURRADIUS	50737	/* &chroma blur radius */
#define TIFFTAG_ANTIALIASSTRENGTH	50738	/* &relative strength of the
						   camera's anti-alias filter */
#define TIFFTAG_SHADOWSCALE		50739	/* &used by Adobe Camera Raw */
#define TIFFTAG_DNGPRIVATEDATA		50740	/* &manufacturer's private data */
#define TIFFTAG_MAKERNOTESAFETY		50741	/* &whether the EXIF MakerNote
						   tag is safe to preserve
						   along with the rest of the
						   EXIF data */
#define	TIFFTAG_CALIBRATIONILLUMINANT1	50778	/* &illuminant 1 */
#define TIFFTAG_CALIBRATIONILLUMINANT2	50779	/* &illuminant 2 */
#define TIFFTAG_BESTQUALITYSCALE	50780	/* &best quality multiplier */
#define TIFFTAG_RAWDATAUNIQUEID		50781	/* &unique identifier for
						   the raw image data */
#define TIFFTAG_ORIGINALRAWFILENAME	50827	/* &file name of the original
						   raw file */
#define TIFFTAG_ORIGINALRAWFILEDATA	50828	/* &contents of the original
						   raw file */
#define TIFFTAG_ACTIVEAREA		50829	/* &active (non-masked) pixels
						   of the sensor */
#define TIFFTAG_MASKEDAREAS		50830	/* &list of coordinates
						   of fully masked pixels */
#define TIFFTAG_ASSHOTICCPROFILE	50831	/* &these two tags used to */
#define TIFFTAG_ASSHOTPREPROFILEMATRIX	50832	/* map cameras's color space
						   into ICC profile space */
#define TIFFTAG_CURRENTICCPROFILE	50833	/* & */
#define TIFFTAG_CURRENTPREPROFILEMATRIX	50834	/* & */
/* tag 65535 is an undefined tag used by Eastman Kodak */
#define TIFFTAG_DCSHUESHIFTVALUES       65535   /* hue shift correction data */

/*
 * The following are ``pseudo tags'' that can be used to control
 * codec-specific functionality.  These tags are not written to file.
 * Note that these values start at 0xffff+1 so that they'll never
 * collide with Aldus-assigned tags.
 *
 * If you want your private pseudo tags ``registered'' (i.e. added to
 * this file), please post a bug report via the tracking system at
 * http://www.remotesensing.org/libtiff/bugs.html with the appropriate
 * C definitions to add.
 */
#define	TIFFTAG_FAXMODE			65536	/* Group 3/4 format control */
#define	    FAXMODE_CLASSIC	0x0000		/* default, include RTC */
#define	    FAXMODE_NORTC	0x0001		/* no RTC at end of data */
#define	    FAXMODE_NOEOL	0x0002		/* no EOL code at end of row */
#define	    FAXMODE_BYTEALIGN	0x0004		/* byte align row */
#define	    FAXMODE_WORDALIGN	0x0008		/* word align row */
#define	    FAXMODE_CLASSF	FAXMODE_NORTC	/* TIFF Class F */
#define	TIFFTAG_JPEGQUALITY		65537	/* Compression quality level */
/* Note: quality level is on the IJG 0-100 scale.  Default value is 75 */
#define	TIFFTAG_JPEGCOLORMODE		65538	/* Auto RGB<=>YCbCr convert? */
#define	    JPEGCOLORMODE_RAW	0x0000		/* no conversion (default) */
#define	    JPEGCOLORMODE_RGB	0x0001		/* do auto conversion */
#define	TIFFTAG_JPEGTABLESMODE		65539	/* What to put in JPEGTables */
#define	    JPEGTABLESMODE_QUANT 0x0001		/* include quantization tbls */
#define	    JPEGTABLESMODE_HUFF	0x0002		/* include Huffman tbls */
/* Note: default is JPEGTABLESMODE_QUANT | JPEGTABLESMODE_HUFF */
#define	TIFFTAG_FAXFILLFUNC		65540	/* G3/G4 fill function */
#define	TIFFTAG_PIXARLOGDATAFMT		65549	/* PixarLogCodec I/O data sz */
#define	    PIXARLOGDATAFMT_8BIT	0	/* regular u_char samples */
#define	    PIXARLOGDATAFMT_8BITABGR	1	/* ABGR-order u_chars */
#define	    PIXARLOGDATAFMT_11BITLOG	2	/* 11-bit log-encoded (raw) */
#define	    PIXARLOGDATAFMT_12BITPICIO	3	/* as per PICIO (1.0==2048) */
#define	    PIXARLOGDATAFMT_16BIT	4	/* signed short samples */
#define	    PIXARLOGDATAFMT_FLOAT	5	/* IEEE float samples */
/* 65550-65556 are allocated to Oceana Matrix <dev@oceana.com> */
#define TIFFTAG_DCSIMAGERTYPE           65550   /* imager model & filter */
#define     DCSIMAGERMODEL_M3           0       /* M3 chip (1280 x 1024) */
#define     DCSIMAGERMODEL_M5           1       /* M5 chip (1536 x 1024) */
#define     DCSIMAGERMODEL_M6           2       /* M6 chip (3072 x 2048) */
#define     DCSIMAGERFILTER_IR          0       /* infrared filter */
#define     DCSIMAGERFILTER_MONO        1       /* monochrome filter */
#define     DCSIMAGERFILTER_CFA         2       /* color filter array */
#define     DCSIMAGERFILTER_OTHER       3       /* other filter */
#define TIFFTAG_DCSINTERPMODE           65551   /* interpolation mode */
#define     DCSINTERPMODE_NORMAL        0x0     /* whole image, default */
#define     DCSINTERPMODE_PREVIEW       0x1     /* preview of image (384x256) */
#define TIFFTAG_DCSBALANCEARRAY         65552   /* color balance values */
#define TIFFTAG_DCSCORRECTMATRIX        65553   /* color correction values */
#define TIFFTAG_DCSGAMMA                65554   /* gamma value */
#define TIFFTAG_DCSTOESHOULDERPTS       65555   /* toe & shoulder points */
#define TIFFTAG_DCSCALIBRATIONFD        65556   /* calibration file desc */
/* Note: quality level is on the ZLIB 1-9 scale. Default value is -1 */
#define	TIFFTAG_ZIPQUALITY		65557	/* compression quality level */
#define	TIFFTAG_PIXARLOGQUALITY		65558	/* PixarLog uses same scale */
/* 65559 is allocated to Oceana Matrix <dev@oceana.com> */
#define TIFFTAG_DCSCLIPRECTANGLE	65559	/* area of image to acquire */
#define TIFFTAG_SGILOGDATAFMT		65560	/* SGILog user data format */
#define     SGILOGDATAFMT_FLOAT		0	/* IEEE float samples */
#define     SGILOGDATAFMT_16BIT		1	/* 16-bit samples */
#define     SGILOGDATAFMT_RAW		2	/* uninterpreted data */
#define     SGILOGDATAFMT_8BIT		3	/* 8-bit RGB monitor values */
#define TIFFTAG_SGILOGENCODE		65561 /* SGILog data encoding control*/
#define     SGILOGENCODE_NODITHER	0     /* do not dither encoded values*/
#define     SGILOGENCODE_RANDITHER	1     /* randomly dither encd values */
#define	TIFFTAG_LZMAPRESET		65562	/* LZMA2 preset (compression level) */
#define TIFFTAG_PERSAMPLE       65563	/* interface for per sample tags */
#define     PERSAMPLE_MERGED        0	/* present as a single value */
#define     PERSAMPLE_MULTI         1	/* present as multiple values */
#define TIFFTAG_ZSTD_LEVEL      65564    /* ZSTD compression level */
#define TIFFTAG_LERC_VERSION            65565 /* LERC version */
#define     LERC_VERSION_2_4            4
#define TIFFTAG_LERC_ADD_COMPRESSION    65566 /* LERC additional compression */
#define     LERC_ADD_COMPRESSION_NONE    0
#define     LERC_ADD_COMPRESSION_DEFLATE 1
#define     LERC_ADD_COMPRESSION_ZSTD    2
#define TIFFTAG_LERC_MAXZERROR          65567    /* LERC maximum error */
#define TIFFTAG_WEBP_LEVEL		  65568	/* WebP compression level: WARNING not registered in Adobe-maintained registry */
#define TIFFTAG_WEBP_LOSSLESS		65569	/* WebP lossless/lossy : WARNING not registered in Adobe-maintained registry */

/*
 * EXIF tags
 */
#define EXIFTAG_EXPOSURETIME		33434	/* Exposure time */
#define EXIFTAG_FNUMBER			33437	/* F number */
#define EXIFTAG_EXPOSUREPROGRAM		34850	/* Exposure program */
#define EXIFTAG_SPECTRALSENSITIVITY	34852	/* Spectral sensitivity */
#define EXIFTAG_ISOSPEEDRATINGS		34855	/* ISO speed rating */
#define EXIFTAG_OECF			34856	/* Optoelectric conversion
						   factor */
#define EXIFTAG_EXIFVERSION		36864	/* Exif version */
#define EXIFTAG_DATETIMEORIGINAL	36867	/* Date and time of original
						   data generation */
#define EXIFTAG_DATETIMEDIGITIZED	36868	/* Date and time of digital
						   data generation */
#define EXIFTAG_COMPONENTSCONFIGURATION	37121	/* Meaning of each component */
#define EXIFTAG_COMPRESSEDBITSPERPIXEL	37122	/* Image compression mode */
#define EXIFTAG_SHUTTERSPEEDVALUE	37377	/* Shutter speed */
#define EXIFTAG_APERTUREVALUE		37378	/* Aperture */
#define EXIFTAG_BRIGHTNESSVALUE		37379	/* Brightness */
#define EXIFTAG_EXPOSUREBIASVALUE	37380	/* Exposure bias */
#define EXIFTAG_MAXAPERTUREVALUE	37381	/* Maximum lens aperture */
#define EXIFTAG_SUBJECTDISTANCE		37382	/* Subject distance */
#define EXIFTAG_METERINGMODE		37383	/* Metering mode */
#define EXIFTAG_LIGHTSOURCE		37384	/* Light source */
#define EXIFTAG_FLASH			37385	/* Flash */
#define EXIFTAG_FOCALLENGTH		37386	/* Lens focal length */
#define EXIFTAG_SUBJECTAREA		37396	/* Subject area */
#define EXIFTAG_MAKERNOTE		37500	/* Manufacturer notes */
#define EXIFTAG_USERCOMMENT		37510	/* User comments */
#define EXIFTAG_SUBSECTIME		37520	/* DateTime subseconds */
#define EXIFTAG_SUBSECTIMEORIGINAL	37521	/* DateTimeOriginal subseconds */
#define EXIFTAG_SUBSECTIMEDIGITIZED	37522	/* DateTimeDigitized subseconds */
#define EXIFTAG_FLASHPIXVERSION		40960	/* Supported Flashpix version */
#define EXIFTAG_COLORSPACE		40961	/* Color space information */
#define EXIFTAG_PIXELXDIMENSION		40962	/* Valid image width */
#define EXIFTAG_PIXELYDIMENSION		40963	/* Valid image height */
#define EXIFTAG_RELATEDSOUNDFILE	40964	/* Related audio file */
#define EXIFTAG_FLASHENERGY		41483	/* Flash energy */
#define EXIFTAG_SPATIALFREQUENCYRESPONSE 41484	/* Spatial frequency response */
#define EXIFTAG_FOCALPLANEXRESOLUTION	41486	/* Focal plane X resolution */
#define EXIFTAG_FOCALPLANEYRESOLUTION	41487	/* Focal plane Y resolution */
#define EXIFTAG_FOCALPLANERESOLUTIONUNIT 41488	/* Focal plane resolution unit */
#define EXIFTAG_SUBJECTLOCATION		41492	/* Subject location */
#define EXIFTAG_EXPOSUREINDEX		41493	/* Exposure index */
#define EXIFTAG_SENSINGMETHOD		41495	/* Sensing method */
#define EXIFTAG_FILESOURCE		41728	/* File source */
#define EXIFTAG_SCENETYPE		41729	/* Scene type */
#define EXIFTAG_CFAPATTERN		41730	/* CFA pattern */
#define EXIFTAG_CUSTOMRENDERED		41985	/* Custom image processing */
#define EXIFTAG_EXPOSUREMODE		41986	/* Exposure mode */
#define EXIFTAG_WHITEBALANCE		41987	/* White balance */
#define EXIFTAG_DIGITALZOOMRATIO	41988	/* Digital zoom ratio */
#define EXIFTAG_FOCALLENGTHIN35MMFILM	41989	/* Focal length in 35 mm film */
#define EXIFTAG_SCENECAPTURETYPE	41990	/* Scene capture type */
#define EXIFTAG_GAINCONTROL		41991	/* Gain control */
#define EXIFTAG_CONTRAST		41992	/* Contrast */
#define EXIFTAG_SATURATION		41993	/* Saturation */
#define EXIFTAG_SHARPNESS		41994	/* Sharpness */
#define EXIFTAG_DEVICESETTINGDESCRIPTION 41995	/* Device settings description */
#define EXIFTAG_SUBJECTDISTANCERANGE	41996	/* Subject distance range */
#define EXIFTAG_GAINCONTROL		41991	/* Gain control */
#define EXIFTAG_GAINCONTROL		41991	/* Gain control */
#define EXIFTAG_IMAGEUNIQUEID		42016	/* Unique image ID */

#endif /* _TIFF_ */

/* vim: set ts=8 sts=8 sw=8 noet: */
/*
 * Local Variables:
 * mode: c
 * c-basic-offset: 8
 * fill-column: 78
 * End:
 */
