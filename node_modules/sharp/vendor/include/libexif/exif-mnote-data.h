/*! \file exif-mnote-data.h
 *  \brief Handling EXIF MakerNote tags
 */
/*
 * Copyright (c) 2003 Lutz Mueller <lutz@users.sourceforge.net>
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

#ifndef __EXIF_MNOTE_DATA_H__
#define __EXIF_MNOTE_DATA_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

#include <libexif/exif-log.h>

/*! Data found in the MakerNote tag */
typedef struct _ExifMnoteData ExifMnoteData;

void exif_mnote_data_ref   (ExifMnoteData *);
void exif_mnote_data_unref (ExifMnoteData *);

/*! Load the MakerNote data from a memory buffer.
 *
 * \param[in] d MakerNote data
 * \param[in] buf pointer to raw MakerNote tag data
 * \param[in] buf_siz number of bytes of data at buf
 */
void exif_mnote_data_load (ExifMnoteData *d, const unsigned char *buf,
			   unsigned int buf_siz);

/*!
 * Save the raw MakerNote data into a memory buffer.  The buffer is
 * allocated by this function and must subsequently be freed by the
 * caller.
 *
 * \param[in,out] d extract the data from this structure 
 * \param[out] buf pointer to buffer pointer containing MakerNote data on return
 * \param[out] buf_siz pointer to the size of the buffer
 */
void exif_mnote_data_save (ExifMnoteData *d, unsigned char **buf,
			   unsigned int *buf_siz);

/*! Return the number of tags in the MakerNote.
 *
 * \param[in] d MakerNote data
 * \return number of tags, or 0 if no MakerNote or the type is not supported
 */
unsigned int exif_mnote_data_count           (ExifMnoteData *d);

/*! Return the MakerNote tag number for the tag at the specified index within
 * the MakerNote.
 *
 * \param[in] d MakerNote data
 * \param[in] n index of the entry within the MakerNote data
 * \return MakerNote tag number
 */
unsigned int exif_mnote_data_get_id          (ExifMnoteData *d, unsigned int n);

/*! Returns textual name of the given MakerNote tag. The name is a short,
 * unique (within this type of MakerNote), non-localized text string
 * containing only US-ASCII alphanumeric characters.
 *
 * \param[in] d MakerNote data
 * \param[in] n index of the entry within the MakerNote data
 * \return textual name of the tag
 */
const char  *exif_mnote_data_get_name        (ExifMnoteData *d, unsigned int n);

/*! Returns textual title of the given MakerNote tag.
 * The title is a short, localized textual description of the tag.
 *
 * \param[in] d MakerNote data
 * \param[in] n index of the entry within the MakerNote data
 * \return textual name of the tag
 */
const char  *exif_mnote_data_get_title       (ExifMnoteData *d, unsigned int n);

/*! Returns verbose textual description of the given MakerNote tag.
 *
 * \param[in] d MakerNote data
 * \param[in] n index of the entry within the MakerNote data
 * \return textual description of the tag
 */
const char  *exif_mnote_data_get_description (ExifMnoteData *d, unsigned int n);

/*! Return a textual representation of the value of the MakerNote entry.
 *
 * \warning The character set of the returned string may be in
 *          the encoding of the current locale or the native encoding
 *          of the camera.
 *
 * \param[in] d MakerNote data
 * \param[in] n index of the entry within the MakerNote data
 * \param[out] val buffer in which to store value
 * \param[in] maxlen length of the buffer val
 * \return val pointer, or NULL on error
 */
char  *exif_mnote_data_get_value (ExifMnoteData *d, unsigned int n, char *val, unsigned int maxlen);

void exif_mnote_data_log (ExifMnoteData *, ExifLog *);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_MNOTE_DATA_H__ */
