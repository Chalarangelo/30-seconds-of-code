/*! \file exif-utils.h
 *  \brief EXIF data manipulation functions and types 
 */
/*
 * Copyright (c) 2001 Lutz Mueller <lutz@users.sourceforge.net>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details. 
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301  USA.
 */

#ifndef __EXIF_UTILS_H__
#define __EXIF_UTILS_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

#include <libexif/exif-byte-order.h>
#include <libexif/exif-format.h>
#include <libexif/_stdint.h>


/* If these definitions don't work for you, please let us fix the 
 * macro generating _stdint.h */
	
/*! EXIF Unsigned Byte data type */
typedef unsigned char	ExifByte;          /* 1 byte  */
	
/*! EXIF Signed Byte data type */
typedef signed char	ExifSByte;         /* 1 byte  */
	
/*! EXIF Text String data type */
typedef char *		ExifAscii;
	
/*! EXIF Unsigned Short data type */
typedef uint16_t	ExifShort;         /* 2 bytes */
	
/*! EXIF Signed Short data type */
typedef int16_t         ExifSShort;        /* 2 bytes */
	
/*! EXIF Unsigned Long data type */
typedef uint32_t	ExifLong;          /* 4 bytes */
	
/*! EXIF Signed Long data type */
typedef int32_t		ExifSLong;         /* 4 bytes */

/*! EXIF Unsigned Rational data type */
typedef struct {ExifLong numerator; ExifLong denominator;} ExifRational;

typedef char		ExifUndefined;     /* 1 byte  */

/*! EXIF Signed Rational data type */
typedef struct {ExifSLong numerator; ExifSLong denominator;} ExifSRational;


/*! Retrieve an #ExifShort value from memory.
 *
 * \param[in] b pointer to raw EXIF value in memory
 * \param[in] order byte order of raw value
 * \return value
 */
ExifShort     exif_get_short     (const unsigned char *b, ExifByteOrder order);

/*! Retrieve an #ExifSShort value from memory.
 *
 * \param[in] b pointer to raw EXIF value in memory
 * \param[in] order byte order of raw value
 * \return value
 */
ExifSShort    exif_get_sshort    (const unsigned char *b, ExifByteOrder order);

/*! Retrieve an #ExifLong value from memory.
 *
 * \param[in] b pointer to raw EXIF value in memory
 * \param[in] order byte order of raw value
 * \return value
 */
ExifLong      exif_get_long      (const unsigned char *b, ExifByteOrder order);

/*! Retrieve an #ExifSLong value from memory.
 *
 * \param[in] b pointer to raw EXIF value in memory
 * \param[in] order byte order of raw value
 * \return value
 */
ExifSLong     exif_get_slong     (const unsigned char *b, ExifByteOrder order);

/*! Retrieve an #ExifRational value from memory.
 *
 * \param[in] b pointer to raw EXIF value in memory
 * \param[in] order byte order of raw value
 * \return value
 */
ExifRational  exif_get_rational  (const unsigned char *b, ExifByteOrder order);

/*! Retrieve an #ExifSRational value from memory.
 *
 * \param[in] b pointer to raw EXIF value in memory
 * \param[in] order byte order of raw value
 * \return value
 */
ExifSRational exif_get_srational (const unsigned char *b, ExifByteOrder order);

/*! Store an ExifShort value into memory in EXIF format.
 *
 * \param[out] b buffer in which to write raw value
 * \param[in] order byte order to use
 * \param[in] value data value to store
 */
void exif_set_short     (unsigned char *b, ExifByteOrder order,
			 ExifShort value);

/*! Store an ExifSShort value into memory in EXIF format.
 *
 * \param[out] b buffer in which to write raw value
 * \param[in] order byte order to use
 * \param[in] value data value to store
 */
void exif_set_sshort    (unsigned char *b, ExifByteOrder order,
			 ExifSShort value);

/*! Store an ExifLong value into memory in EXIF format.
 *
 * \param[out] b buffer in which to write raw value
 * \param[in] order byte order to use
 * \param[in] value data value to store
 */
void exif_set_long      (unsigned char *b, ExifByteOrder order,
			 ExifLong value);

/*! Store an ExifSLong value into memory in EXIF format.
 *
 * \param[out] b buffer in which to write raw value
 * \param[in] order byte order to use
 * \param[in] value data value to store
 */
void exif_set_slong     (unsigned char *b, ExifByteOrder order,
			 ExifSLong value);

/*! Store an ExifRational value into memory in EXIF format.
 *
 * \param[out] b buffer in which to write raw value
 * \param[in] order byte order to use
 * \param[in] value data value to store
 */
void exif_set_rational  (unsigned char *b, ExifByteOrder order,
			 ExifRational value);

/*! Store an ExifSRational value into memory in EXIF format.
 *
 * \param[out] b buffer in which to write raw value
 * \param[in] order byte order to use
 * \param[in] value data value to store
 */
void exif_set_srational (unsigned char *b, ExifByteOrder order,
			 ExifSRational value);

/*! \internal */
void exif_convert_utf16_to_utf8 (char *out, const unsigned short *in, int maxlen);

/* Please do not use this function outside of the library. */

/*! \internal */
void exif_array_set_byte_order (ExifFormat, unsigned char *, unsigned int,
		ExifByteOrder o_orig, ExifByteOrder o_new);

#undef  MIN
#define MIN(a, b)  (((a) < (b)) ? (a) : (b))

#undef  MAX
#define MAX(a, b)  (((a) > (b)) ? (a) : (b))

/* For compatibility with older versions */

/*! \deprecated Use EXIF_TAG_SUB_SEC_TIME instead. */
#define EXIF_TAG_SUBSEC_TIME EXIF_TAG_SUB_SEC_TIME

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_UTILS_H__ */
