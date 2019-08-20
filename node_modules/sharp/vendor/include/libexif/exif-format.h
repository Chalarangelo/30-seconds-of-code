/*! \file exif-format.h
 *  \brief Handling native EXIF data types
 */
/*
 *
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

#ifndef __EXIF_FORMAT_H__
#define __EXIF_FORMAT_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

/*! EXIF tag data formats */
typedef enum {
        EXIF_FORMAT_BYTE       =  1,
        EXIF_FORMAT_ASCII      =  2,
        EXIF_FORMAT_SHORT      =  3,
        EXIF_FORMAT_LONG       =  4,
        EXIF_FORMAT_RATIONAL   =  5,
	EXIF_FORMAT_SBYTE      =  6,
        EXIF_FORMAT_UNDEFINED  =  7,
	EXIF_FORMAT_SSHORT     =  8,
        EXIF_FORMAT_SLONG      =  9,
        EXIF_FORMAT_SRATIONAL  = 10,
	EXIF_FORMAT_FLOAT      = 11,
	EXIF_FORMAT_DOUBLE     = 12
} ExifFormat;

/*! Return a textual representation of the given EXIF data type.
 *
 * \param[in] format EXIF data format
 * \return localized textual name
 */
const char   *exif_format_get_name (ExifFormat format);

/*! Return the raw size of the given EXIF data type.
 *
 * \param[in] format EXIF data format
 * \return size in bytes
 */
unsigned char exif_format_get_size (ExifFormat format);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_FORMAT_H__ */
