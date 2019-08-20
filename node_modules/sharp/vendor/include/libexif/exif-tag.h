/*! \file exif-tag.h
 *  \brief Handling EXIF tags
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

#ifndef __EXIF_TAG_H__
#define __EXIF_TAG_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

#include <libexif/exif-ifd.h>
#include <libexif/exif-data-type.h>

/*! EXIF tags */
typedef enum {
	EXIF_TAG_INTEROPERABILITY_INDEX		= 0x0001,
	EXIF_TAG_INTEROPERABILITY_VERSION	= 0x0002,
	EXIF_TAG_NEW_SUBFILE_TYPE		= 0x00fe,
	EXIF_TAG_IMAGE_WIDTH 			= 0x0100,
	EXIF_TAG_IMAGE_LENGTH 			= 0x0101,
	EXIF_TAG_BITS_PER_SAMPLE 		= 0x0102,
	EXIF_TAG_COMPRESSION 			= 0x0103,
	EXIF_TAG_PHOTOMETRIC_INTERPRETATION 	= 0x0106,
	EXIF_TAG_FILL_ORDER 			= 0x010a,
	EXIF_TAG_DOCUMENT_NAME 			= 0x010d,
	EXIF_TAG_IMAGE_DESCRIPTION 		= 0x010e,
	EXIF_TAG_MAKE 				= 0x010f,
	EXIF_TAG_MODEL 				= 0x0110,
	EXIF_TAG_STRIP_OFFSETS 			= 0x0111,
	EXIF_TAG_ORIENTATION 			= 0x0112,
	EXIF_TAG_SAMPLES_PER_PIXEL 		= 0x0115,
	EXIF_TAG_ROWS_PER_STRIP 		= 0x0116,
	EXIF_TAG_STRIP_BYTE_COUNTS		= 0x0117,
	EXIF_TAG_X_RESOLUTION 			= 0x011a,
	EXIF_TAG_Y_RESOLUTION 			= 0x011b,
	EXIF_TAG_PLANAR_CONFIGURATION 		= 0x011c,
	EXIF_TAG_RESOLUTION_UNIT 		= 0x0128,
	EXIF_TAG_TRANSFER_FUNCTION 		= 0x012d,
	EXIF_TAG_SOFTWARE 			= 0x0131,
	EXIF_TAG_DATE_TIME			= 0x0132,
	EXIF_TAG_ARTIST				= 0x013b,
	EXIF_TAG_WHITE_POINT			= 0x013e,
	EXIF_TAG_PRIMARY_CHROMATICITIES		= 0x013f,
	EXIF_TAG_SUB_IFDS			= 0x014a,
	EXIF_TAG_TRANSFER_RANGE			= 0x0156,
	EXIF_TAG_JPEG_PROC			= 0x0200,
	EXIF_TAG_JPEG_INTERCHANGE_FORMAT	= 0x0201,
	EXIF_TAG_JPEG_INTERCHANGE_FORMAT_LENGTH	= 0x0202,
	EXIF_TAG_YCBCR_COEFFICIENTS		= 0x0211,
	EXIF_TAG_YCBCR_SUB_SAMPLING		= 0x0212,
	EXIF_TAG_YCBCR_POSITIONING		= 0x0213,
	EXIF_TAG_REFERENCE_BLACK_WHITE		= 0x0214,
	EXIF_TAG_XML_PACKET			= 0x02bc,
	EXIF_TAG_RELATED_IMAGE_FILE_FORMAT	= 0x1000,
	EXIF_TAG_RELATED_IMAGE_WIDTH		= 0x1001,
	EXIF_TAG_RELATED_IMAGE_LENGTH		= 0x1002,
	EXIF_TAG_CFA_REPEAT_PATTERN_DIM		= 0x828d,
	EXIF_TAG_CFA_PATTERN			= 0x828e,
	EXIF_TAG_BATTERY_LEVEL			= 0x828f,
	EXIF_TAG_COPYRIGHT			= 0x8298,
	EXIF_TAG_EXPOSURE_TIME			= 0x829a,
	EXIF_TAG_FNUMBER			= 0x829d,
	EXIF_TAG_IPTC_NAA			= 0x83bb,
	EXIF_TAG_IMAGE_RESOURCES		= 0x8649,
	EXIF_TAG_EXIF_IFD_POINTER		= 0x8769,
	EXIF_TAG_INTER_COLOR_PROFILE		= 0x8773,
	EXIF_TAG_EXPOSURE_PROGRAM		= 0x8822,
	EXIF_TAG_SPECTRAL_SENSITIVITY		= 0x8824,
	EXIF_TAG_GPS_INFO_IFD_POINTER		= 0x8825,
	EXIF_TAG_ISO_SPEED_RATINGS		= 0x8827,
	EXIF_TAG_OECF				= 0x8828,
	EXIF_TAG_TIME_ZONE_OFFSET		= 0x882a,
	EXIF_TAG_EXIF_VERSION			= 0x9000,
	EXIF_TAG_DATE_TIME_ORIGINAL		= 0x9003,
	EXIF_TAG_DATE_TIME_DIGITIZED		= 0x9004,
	EXIF_TAG_COMPONENTS_CONFIGURATION	= 0x9101,
	EXIF_TAG_COMPRESSED_BITS_PER_PIXEL	= 0x9102,
	EXIF_TAG_SHUTTER_SPEED_VALUE		= 0x9201,
	EXIF_TAG_APERTURE_VALUE			= 0x9202,
	EXIF_TAG_BRIGHTNESS_VALUE		= 0x9203,
	EXIF_TAG_EXPOSURE_BIAS_VALUE		= 0x9204,
	EXIF_TAG_MAX_APERTURE_VALUE		= 0x9205,
	EXIF_TAG_SUBJECT_DISTANCE		= 0x9206,
	EXIF_TAG_METERING_MODE			= 0x9207,
	EXIF_TAG_LIGHT_SOURCE			= 0x9208,
	EXIF_TAG_FLASH				= 0x9209,
	EXIF_TAG_FOCAL_LENGTH			= 0x920a,
	EXIF_TAG_SUBJECT_AREA			= 0x9214,
	EXIF_TAG_TIFF_EP_STANDARD_ID		= 0x9216,
	EXIF_TAG_MAKER_NOTE			= 0x927c,
	EXIF_TAG_USER_COMMENT			= 0x9286,
	EXIF_TAG_SUB_SEC_TIME			= 0x9290,
	EXIF_TAG_SUB_SEC_TIME_ORIGINAL		= 0x9291,
	EXIF_TAG_SUB_SEC_TIME_DIGITIZED		= 0x9292,
	EXIF_TAG_XP_TITLE			= 0x9c9b,
	EXIF_TAG_XP_COMMENT			= 0x9c9c,
	EXIF_TAG_XP_AUTHOR			= 0x9c9d,
	EXIF_TAG_XP_KEYWORDS			= 0x9c9e,
	EXIF_TAG_XP_SUBJECT			= 0x9c9f,
	EXIF_TAG_FLASH_PIX_VERSION		= 0xa000,
	EXIF_TAG_COLOR_SPACE			= 0xa001,
	EXIF_TAG_PIXEL_X_DIMENSION		= 0xa002,
	EXIF_TAG_PIXEL_Y_DIMENSION		= 0xa003,
	EXIF_TAG_RELATED_SOUND_FILE		= 0xa004,
	EXIF_TAG_INTEROPERABILITY_IFD_POINTER	= 0xa005,
	EXIF_TAG_FLASH_ENERGY			= 0xa20b,
	EXIF_TAG_SPATIAL_FREQUENCY_RESPONSE	= 0xa20c,
	EXIF_TAG_FOCAL_PLANE_X_RESOLUTION	= 0xa20e,
	EXIF_TAG_FOCAL_PLANE_Y_RESOLUTION	= 0xa20f,
	EXIF_TAG_FOCAL_PLANE_RESOLUTION_UNIT	= 0xa210,
	EXIF_TAG_SUBJECT_LOCATION		= 0xa214,
	EXIF_TAG_EXPOSURE_INDEX			= 0xa215,
	EXIF_TAG_SENSING_METHOD			= 0xa217,
	EXIF_TAG_FILE_SOURCE			= 0xa300,
	EXIF_TAG_SCENE_TYPE			= 0xa301,
	EXIF_TAG_NEW_CFA_PATTERN		= 0xa302,
	EXIF_TAG_CUSTOM_RENDERED		= 0xa401,
	EXIF_TAG_EXPOSURE_MODE			= 0xa402,
	EXIF_TAG_WHITE_BALANCE			= 0xa403,
	EXIF_TAG_DIGITAL_ZOOM_RATIO		= 0xa404,
	EXIF_TAG_FOCAL_LENGTH_IN_35MM_FILM	= 0xa405,
	EXIF_TAG_SCENE_CAPTURE_TYPE		= 0xa406,
	EXIF_TAG_GAIN_CONTROL			= 0xa407,
	EXIF_TAG_CONTRAST			= 0xa408,
	EXIF_TAG_SATURATION			= 0xa409,
	EXIF_TAG_SHARPNESS			= 0xa40a,
	EXIF_TAG_DEVICE_SETTING_DESCRIPTION	= 0xa40b,
	EXIF_TAG_SUBJECT_DISTANCE_RANGE		= 0xa40c,
	EXIF_TAG_IMAGE_UNIQUE_ID		= 0xa420,
	EXIF_TAG_GAMMA				= 0xa500,
	EXIF_TAG_PRINT_IMAGE_MATCHING		= 0xc4a5,
	EXIF_TAG_PADDING			= 0xea1c
} ExifTag;

/* GPS tags overlap with above ones. */
#define EXIF_TAG_GPS_VERSION_ID        0x0000
#define EXIF_TAG_GPS_LATITUDE_REF      0x0001 /* INTEROPERABILITY_INDEX   */
#define EXIF_TAG_GPS_LATITUDE          0x0002 /* INTEROPERABILITY_VERSION */
#define EXIF_TAG_GPS_LONGITUDE_REF     0x0003
#define EXIF_TAG_GPS_LONGITUDE         0x0004
#define EXIF_TAG_GPS_ALTITUDE_REF      0x0005
#define EXIF_TAG_GPS_ALTITUDE          0x0006
#define EXIF_TAG_GPS_TIME_STAMP        0x0007
#define EXIF_TAG_GPS_SATELLITES        0x0008
#define EXIF_TAG_GPS_STATUS            0x0009
#define EXIF_TAG_GPS_MEASURE_MODE      0x000a
#define EXIF_TAG_GPS_DOP               0x000b
#define EXIF_TAG_GPS_SPEED_REF         0x000c
#define EXIF_TAG_GPS_SPEED             0x000d
#define EXIF_TAG_GPS_TRACK_REF         0x000e
#define EXIF_TAG_GPS_TRACK             0x000f
#define EXIF_TAG_GPS_IMG_DIRECTION_REF 0x0010
#define EXIF_TAG_GPS_IMG_DIRECTION     0x0011
#define EXIF_TAG_GPS_MAP_DATUM         0x0012
#define EXIF_TAG_GPS_DEST_LATITUDE_REF 0x0013
#define EXIF_TAG_GPS_DEST_LATITUDE     0x0014
#define EXIF_TAG_GPS_DEST_LONGITUDE_REF 0x0015
#define EXIF_TAG_GPS_DEST_LONGITUDE     0x0016
#define EXIF_TAG_GPS_DEST_BEARING_REF   0x0017
#define EXIF_TAG_GPS_DEST_BEARING       0x0018
#define EXIF_TAG_GPS_DEST_DISTANCE_REF  0x0019
#define EXIF_TAG_GPS_DEST_DISTANCE      0x001a
#define EXIF_TAG_GPS_PROCESSING_METHOD  0x001b
#define EXIF_TAG_GPS_AREA_INFORMATION   0x001c
#define EXIF_TAG_GPS_DATE_STAMP         0x001d
#define EXIF_TAG_GPS_DIFFERENTIAL       0x001e

/*! What level of support a tag enjoys in the EXIF standard */
typedef enum {
	/*! The meaning of this tag is unknown */
	EXIF_SUPPORT_LEVEL_UNKNOWN = 0,

	/*! This tag is not allowed in the given IFD */
	EXIF_SUPPORT_LEVEL_NOT_RECORDED,

	/*! This tag is mandatory in the given IFD */
	EXIF_SUPPORT_LEVEL_MANDATORY,

	/*! This tag is optional in the given IFD */
	EXIF_SUPPORT_LEVEL_OPTIONAL
} ExifSupportLevel;

/*! Return the tag ID given its unique textual name.
 *
 * \param[in] name tag name
 * \return tag ID, or 0 if tag not found
 * \note The tag not found value cannot be distinguished from a legitimate
 *   tag number 0.
 */
ExifTag          exif_tag_from_name                (const char *name);

/*! Return a textual name of the given tag when found in the given IFD. The
 * name is a short, unique, non-localized text string containing only
 * US-ASCII alphanumeric characters.
 *
 * \param[in] tag EXIF tag
 * \param[in] ifd IFD
 * \return textual name of the tag, or NULL if the tag is unknown
 */
const char      *exif_tag_get_name_in_ifd          (ExifTag tag, ExifIfd ifd);

/*! Return a textual title of the given tag when found in the given IFD.
 * The title is a short, localized description of the tag.
 *
 * \param[in] tag EXIF tag
 * \param[in] ifd IFD
 * \return textual title of the tag, or NULL if the tag is unknown
 */
const char      *exif_tag_get_title_in_ifd         (ExifTag tag, ExifIfd ifd);

/*! Return a verbose textual description of the given tag when found in the
 * given IFD. The description is a verbose, localized description of the tag.
 *
 * \param[in] tag EXIF tag
 * \param[in] ifd IFD
 * \return textual description of the tag, or NULL if the tag is unknown
 */
const char      *exif_tag_get_description_in_ifd   (ExifTag tag, ExifIfd ifd);

/*! Return whether the given tag is mandatory or not in the given IFD and
 * data type according to the EXIF specification. If the IFD given is
 * EXIF_IFD_COUNT, the result is EXIF_SUPPORT_LEVEL_UNKNOWN. If the data
 * type is EXIF_DATA_TYPE_UNKNOWN, the result is
 * EXIF_SUPPORT_LEVEL_UNKNOWN unless the support level is the same for
 * all data types.
 *
 * \param[in] tag EXIF tag
 * \param[in] ifd IFD or EXIF_IFD_COUNT
 * \param[in] t data type or EXIF_DATA_TYPE_UNKNOWN
 * \return the level of support for this tag
 */
ExifSupportLevel exif_tag_get_support_level_in_ifd (ExifTag tag, ExifIfd ifd,
                                                    ExifDataType t);

/* Don't use these functions. They are here for compatibility only. */

/*! \deprecated Use #exif_tag_get_name_in_ifd instead */
const char     *exif_tag_get_name        (ExifTag tag);

/*! \deprecated Use #exif_tag_get_title_in_ifd instead */
const char     *exif_tag_get_title       (ExifTag tag);

/*! \deprecated Use #exif_tag_get_description_in_ifd instead */
const char     *exif_tag_get_description (ExifTag tag);


/* For now, do not use these functions. */

/*! \internal */
ExifTag      exif_tag_table_get_tag  (unsigned int n);

/*! \internal */
const char  *exif_tag_table_get_name (unsigned int n);

/*! \internal */
unsigned int exif_tag_table_count    (void);


/* Don't use these definitions. They are here for compatibility only. */

/*! \deprecated Use EXIF_TAG_PRINT_IMAGE_MATCHING instead. */
#define EXIF_TAG_UNKNOWN_C4A5 EXIF_TAG_PRINT_IMAGE_MATCHING

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_TAG_H__ */
