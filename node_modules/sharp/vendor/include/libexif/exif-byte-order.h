/*! \file exif-byte-order.h
 * \brief Defines the ExifByteOrder enum and the associated functions.
 */
/* 
 * Copyright (c) 2002 Lutz Mueller <lutz@users.sourceforge.net>
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

#ifndef __EXIF_BYTE_ORDER_H__
#define __EXIF_BYTE_ORDER_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

/*! Which byte order to use */
typedef enum {
	/*! Big-endian byte order */
	EXIF_BYTE_ORDER_MOTOROLA,
	/*! Little-endian byte order */
	EXIF_BYTE_ORDER_INTEL
} ExifByteOrder;

/*! Return a short, localized, textual name for the given byte order.
 * \param[in] order byte order
 * \return localized textual name of the byte order
 */
const char *exif_byte_order_get_name (ExifByteOrder order);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_BYTE_ORDER_H__ */
