/*! \file exif-entry.h
 *  \brief Handling EXIF entries
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

#ifndef __EXIF_ENTRY_H__
#define __EXIF_ENTRY_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

/*! Data found in one EXIF tag.
 * The #exif_entry_get_value function can provide access to the
 * formatted contents, or the struct members can be used directly to
 * access the raw contents.
 */
typedef struct _ExifEntry        ExifEntry;
typedef struct _ExifEntryPrivate ExifEntryPrivate;

#include <libexif/exif-content.h>
#include <libexif/exif-format.h>
#include <libexif/exif-mem.h>

/*! Data found in one EXIF tag */
struct _ExifEntry {
	/*! EXIF tag for this entry */
        ExifTag tag;
	
	/*! Type of data in this entry */
        ExifFormat format;

	/*! Number of elements in the array, if this is an array entry.
	 * Contains 1 for non-array data types. */
        unsigned long components;

	/*! Pointer to the raw EXIF data for this entry. It is allocated
	 * by #exif_entry_initialize and is NULL beforehand. Data contained
	 * here may be manipulated using the functions in exif-utils.h */
        unsigned char *data;

	/*! Number of bytes in the buffer at \c data. This must be no less
	 * than exif_format_get_size(format)*components */
        unsigned int size;

	/*! #ExifContent containing this entry. 
	 * \see exif_entry_get_ifd */
	ExifContent *parent;

	/*! Internal data to be used by libexif itself */
	ExifEntryPrivate *priv;
};

/* Lifecycle */

/*! Reserve memory for and initialize a new #ExifEntry.
 * No memory is allocated for the \c data element of the returned #ExifEntry.
 *
 * \return new allocated #ExifEntry, or NULL on error
 *
 * \see exif_entry_new_mem, exif_entry_unref
 */
ExifEntry  *exif_entry_new     (void);

/*! Reserve memory for and initialize new #ExifEntry using the specified
 * memory allocator.
 * No memory is allocated for the \c data element of the returned #ExifEntry.
 *
 * \return new allocated #ExifEntry, or NULL on error
 *
 * \see exif_entry_new, exif_entry_unref
 */
ExifEntry  *exif_entry_new_mem (ExifMem *);

/*! Increase reference counter for #ExifEntry.
 *
 * \param[in] entry #ExifEntry
 *
 * \see exif_entry_unref
 */
void        exif_entry_ref     (ExifEntry *entry);

/*! Decrease reference counter for #ExifEntry.
 * When the reference count drops to zero, free the entry.
 *
 * \param[in] entry #ExifEntry
 */
void        exif_entry_unref   (ExifEntry *entry);

/*! Actually free the #ExifEntry.
 *
 * \deprecated Should not be called directly. Use #exif_entry_ref and
 *             #exif_entry_unref instead.
 *
 * \param[in] entry EXIF entry
 */
void        exif_entry_free  (ExifEntry *entry);

/*! Initialize an empty #ExifEntry with default data in the correct format
 * for the given tag. If the entry is already initialized, this function
 * does nothing.
 * This call allocates memory for the \c data element of the given #ExifEntry.
 * That memory is freed at the same time as the #ExifEntry.
 *
 * \param[out] e entry to initialize
 * \param[in] tag tag number to initialize as
 */
void        exif_entry_initialize (ExifEntry *e, ExifTag tag);

/*! Fix the type or format of the given EXIF entry to bring it into spec.
 * If the data for this EXIF tag is in of the wrong type or is in an invalid
 * format according to the EXIF specification, then it is converted to make it
 * valid. This may involve, for example, converting an EXIF_FORMAT_LONG into a
 * EXIF_FORMAT_SHORT. If the tag is unknown, its value is untouched.
 *
 * \note Unfortunately, some conversions are to a type with a more restricted
 * range, which could have the side effect that the converted data becomes
 * invalid. This is unlikely as the range of each tag in the standard is
 * designed to encompass all likely data.
 *
 * \param[in,out] entry EXIF entry
 */
void        exif_entry_fix        (ExifEntry *entry);


/* For your convenience */

/*! Return a localized textual representation of the value of the EXIF entry.
 * This is meant for display to the user. The format of each tag is subject
 * to change between locales and in newer versions of libexif.  Users who
 * require the tag data in an unambiguous form should access the data members
 * of the #ExifEntry structure directly.
 *
 * \warning The character set of the returned string may be in
 *          the encoding of the current locale or the native encoding
 *          of the camera.
 * \bug     The EXIF_TAG_XP_* tags are currently always returned in UTF-8,
 *          regardless of locale, and code points above U+FFFF are not
 *          supported.
 *
 * \param[in] entry EXIF entry
 * \param[out] val buffer in which to store value
 * \param[in] maxlen length of the buffer val
 * \return val pointer
 */
const char *exif_entry_get_value (ExifEntry *entry, char *val,
				  unsigned int maxlen);

/*! Dump text representation of #ExifEntry to stdout.
 * This is intended for diagnostic purposes only.
 *
 * \param[in] entry EXIF tag data
 * \param[in] indent how many levels deep to indent the data
 */
void        exif_entry_dump      (ExifEntry *entry, unsigned int indent);

/*! Return the IFD number of the given #ExifEntry
 *
 * \param[in] e an #ExifEntry*
 * \return #ExifIfd, or #EXIF_IFD_COUNT on error
 */
#define exif_entry_get_ifd(e) ((e)?exif_content_get_ifd((e)->parent):EXIF_IFD_COUNT)

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_ENTRY_H__ */
