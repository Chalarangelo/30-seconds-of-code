/*! \file exif-data.h
 * \brief Defines the ExifData type and the associated functions.
 */
/*
 * \author Lutz Mueller <lutz@users.sourceforge.net>
 * \date 2001-2005
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

#ifndef __EXIF_DATA_H__
#define __EXIF_DATA_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

#include <libexif/exif-byte-order.h>
#include <libexif/exif-data-type.h>
#include <libexif/exif-ifd.h>
#include <libexif/exif-log.h>
#include <libexif/exif-tag.h>

/*! Represents the entire EXIF data found in an image */
typedef struct _ExifData        ExifData;
typedef struct _ExifDataPrivate ExifDataPrivate;

#include <libexif/exif-content.h>
#include <libexif/exif-mnote-data.h>
#include <libexif/exif-mem.h>

/*! Represents the entire EXIF data found in an image */
struct _ExifData
{
	/*! Data for each IFD */
	ExifContent *ifd[EXIF_IFD_COUNT];

	/*! Pointer to thumbnail image, or NULL if not available */
	unsigned char *data;

	/*! Number of bytes in thumbnail image at \c data */
	unsigned int size;

	ExifDataPrivate *priv;
};

/*! Allocate a new #ExifData. The #ExifData contains an empty
 * #ExifContent for each IFD and the default set of options,
 * which has #EXIF_DATA_OPTION_IGNORE_UNKNOWN_TAGS
 * and #EXIF_DATA_OPTION_FOLLOW_SPECIFICATION set.
 *
 * \return allocated #ExifData, or NULL on error
 */
ExifData *exif_data_new           (void);

/*! Allocate a new #ExifData using the given memory allocator.
 * The #ExifData contains an empty #ExifContent for each IFD and the default
 * set of options, which has #EXIF_DATA_OPTION_IGNORE_UNKNOWN_TAGS and
 * #EXIF_DATA_OPTION_FOLLOW_SPECIFICATION set.
 *
 * \return allocated #ExifData, or NULL on error
 */
ExifData *exif_data_new_mem       (ExifMem *);

/*! Allocate a new #ExifData and load EXIF data from a JPEG file.
 * Uses an #ExifLoader internally to do the loading.
 *
 * \param[in] path filename including path
 * \return allocated #ExifData, or NULL on error
 */
ExifData *exif_data_new_from_file (const char *path);

/*! Allocate a new #ExifData and load EXIF data from a memory buffer.
 *
 * \param[in] data pointer to raw JPEG or EXIF data
 * \param[in] size number of bytes of data at data
 * \return allocated #ExifData, or NULL on error
 */
ExifData *exif_data_new_from_data (const unsigned char *data,
				   unsigned int size);

/*! Load the #ExifData structure from the raw JPEG or EXIF data in the given
 * memory buffer. If the EXIF data contains a recognized MakerNote, it is
 * loaded and stored as well for later retrieval by #exif_data_get_mnote_data.
 * If the #EXIF_DATA_OPTION_FOLLOW_SPECIFICATION option has been set on this
 * #ExifData, then the tags are automatically fixed after loading (by calling
 * #exif_data_fix).
 *
 * \param[in,out] data EXIF data
 * \param[in] d pointer to raw JPEG or EXIF data
 * \param[in] size number of bytes of data at d
 */
void      exif_data_load_data (ExifData *data, const unsigned char *d, 
			       unsigned int size);

/*! Store raw EXIF data representing the #ExifData structure into a memory
 * buffer. The buffer is allocated by this function and must subsequently be
 * freed by the caller using the matching free function as used by the #ExifMem
 * in use by this #ExifData.
 *
 * \param[in] data EXIF data
 * \param[out] d pointer to buffer pointer containing raw EXIF data on return
 * \param[out] ds pointer to variable to hold the number of bytes of
 *   data at d, or set to 0 on error
 */
void      exif_data_save_data (ExifData *data, unsigned char **d,
			       unsigned int *ds);

void      exif_data_ref   (ExifData *data);
void      exif_data_unref (ExifData *data);
void      exif_data_free  (ExifData *data);

/*! Return the byte order in use by this EXIF structure.
 *
 * \param[in] data EXIF data
 * \return byte order
 */
ExifByteOrder exif_data_get_byte_order  (ExifData *data);

/*! Set the byte order to use for this EXIF data. If any tags already exist
 * (including MakerNote tags) they are are converted to the specified byte
 * order.
 *
 * \param[in,out] data EXIF data
 * \param[in] order byte order
 */
void          exif_data_set_byte_order  (ExifData *data, ExifByteOrder order);

/*! Return the MakerNote data out of the EXIF data.  Only certain
 * MakerNote formats that are recognized by libexif are supported.
 * The pointer references a member of the #ExifData structure and must NOT be
 * freed by the caller.
 *
 * \param[in] d EXIF data
 * \return MakerNote data, or NULL if not found or not supported
 */
ExifMnoteData *exif_data_get_mnote_data (ExifData *d);

/*! Fix the EXIF data to bring it into specification. Call #exif_content_fix
 * on each IFD to fix existing entries, create any new entries that are
 * mandatory but do not yet exist, and remove any entries that are not
 * allowed.
 *
 * \param[in,out] d EXIF data
 */
void           exif_data_fix (ExifData *d);

typedef void (* ExifDataForeachContentFunc) (ExifContent *, void *user_data);

/*! Execute a function on each IFD in turn.
 *
 * \param[in] data EXIF data over which to iterate
 * \param[in] func function to call for each entry
 * \param[in] user_data data to pass into func on each call
 */
void          exif_data_foreach_content (ExifData *data,
					 ExifDataForeachContentFunc func,
					 void *user_data);

/*! Options to configure the behaviour of #ExifData */
typedef enum {
	/*! Act as though unknown tags are not present */
	EXIF_DATA_OPTION_IGNORE_UNKNOWN_TAGS = 1 << 0,

	/*! Fix the EXIF tags to follow the spec */
	EXIF_DATA_OPTION_FOLLOW_SPECIFICATION = 1 << 1,

	/*! Leave the MakerNote alone, which could cause it to be corrupted */
	EXIF_DATA_OPTION_DONT_CHANGE_MAKER_NOTE = 1 << 2
} ExifDataOption;

/*! Return a short textual description of the given #ExifDataOption.
 *
 * \param[in] o option
 * \return localized textual description of the option
 */
const char *exif_data_option_get_name        (ExifDataOption o);

/*! Return a verbose textual description of the given #ExifDataOption.
 *
 * \param[in] o option
 * \return verbose localized textual description of the option
 */
const char *exif_data_option_get_description (ExifDataOption o);

/*! Set the given option on the given #ExifData.
 *
 * \param[in] d EXIF data
 * \param[in] o option
 */
void        exif_data_set_option             (ExifData *d, ExifDataOption o);

/*! Clear the given option on the given #ExifData.
 *
 * \param[in] d EXIF data
 * \param[in] o option
 */
void        exif_data_unset_option           (ExifData *d, ExifDataOption o);

/*! Set the data type for the given #ExifData.
 *
 * \param[in] d EXIF data
 * \param[in] dt data type
 */
void         exif_data_set_data_type (ExifData *d, ExifDataType dt);

/*! Return the data type for the given #ExifData.
 *
 * \param[in] d EXIF data
 * \return data type, or #EXIF_DATA_TYPE_UNKNOWN on error
 */
ExifDataType exif_data_get_data_type (ExifData *d);

/*! Dump all EXIF data to stdout.
 * This is intended for diagnostic purposes only.
 *
 * \param[in] data EXIF data
 */
void exif_data_dump (ExifData *data);

/*! Set the log message object for all IFDs.
 *
 * \param[in] data EXIF data
 * \param[in] log #ExifLog
 */
void exif_data_log  (ExifData *data, ExifLog *log);

/*! Return an #ExifEntry for the given tag if found in any IFD.
 * Each IFD is searched in turn and the first containing a tag with
 * this number is returned.
 *
 * \param[in] d #ExifData
 * \param[in] t #ExifTag
 * \return #ExifEntry* if found, else NULL if not found
 */
#define exif_data_get_entry(d,t)					\
	(exif_content_get_entry(d->ifd[EXIF_IFD_0],t) ?			\
	 exif_content_get_entry(d->ifd[EXIF_IFD_0],t) :			\
	 exif_content_get_entry(d->ifd[EXIF_IFD_1],t) ?			\
	 exif_content_get_entry(d->ifd[EXIF_IFD_1],t) :			\
	 exif_content_get_entry(d->ifd[EXIF_IFD_EXIF],t) ?		\
	 exif_content_get_entry(d->ifd[EXIF_IFD_EXIF],t) :		\
	 exif_content_get_entry(d->ifd[EXIF_IFD_GPS],t) ?		\
	 exif_content_get_entry(d->ifd[EXIF_IFD_GPS],t) :		\
	 exif_content_get_entry(d->ifd[EXIF_IFD_INTEROPERABILITY],t) ?	\
	 exif_content_get_entry(d->ifd[EXIF_IFD_INTEROPERABILITY],t) : NULL)

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_DATA_H__ */
