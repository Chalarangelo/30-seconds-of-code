/* exif-data-tag.h
 *
 * Copyright (c) 2005 Lutz Mueller <lutz@users.sourceforge.net>
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

#ifndef __EXIF_DATA_TYPE_H__
#define __EXIF_DATA_TYPE_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

/*! Represents the type of image data to which the EXIF data applies.
 * The EXIF tags have different constraints depending on the type of
 * image data.
 */
typedef enum {
	EXIF_DATA_TYPE_UNCOMPRESSED_CHUNKY = 0,
	EXIF_DATA_TYPE_UNCOMPRESSED_PLANAR,
	EXIF_DATA_TYPE_UNCOMPRESSED_YCC,
	EXIF_DATA_TYPE_COMPRESSED,
	EXIF_DATA_TYPE_COUNT,

	EXIF_DATA_TYPE_UNKNOWN = EXIF_DATA_TYPE_COUNT
} ExifDataType;

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_TAG_H__ */
