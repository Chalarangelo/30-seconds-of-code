/* exif-ifd.h
 *
 * Copyright (c) 2002 Lutz Mueller <lutz@users.sourceforge.net>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
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

#ifndef __EXIF_IFD_H__
#define __EXIF_IFD_H__

/*! Possible EXIF Image File Directories */
typedef enum {
	EXIF_IFD_0 = 0,                /*!< */
	EXIF_IFD_1,                    /*!< */
	EXIF_IFD_EXIF,                 /*!< */
	EXIF_IFD_GPS,                  /*!< */
	EXIF_IFD_INTEROPERABILITY,     /*!< */
	EXIF_IFD_COUNT                 /*!< Not a real value, just (max_value + 1). */
} ExifIfd;

/*! Return a textual name of the given IFD. The name is a short, unique,
 * non-localized text string containing only US-ASCII alphanumeric
 * characters.
 *
 * \param[in] ifd IFD
 * \return textual name of the IFD
 */
const char *exif_ifd_get_name (ExifIfd ifd);

#endif /* __EXIF_IFD_H__ */
