/*! \file exif-loader.h
 * \brief Defines the ExifLoader type
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

#ifndef __EXIF_LOADER_H__
#define __EXIF_LOADER_H__

#include <libexif/exif-data.h>
#include <libexif/exif-log.h>
#include <libexif/exif-mem.h>

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

/*! Data used by the loader interface */
typedef struct _ExifLoader ExifLoader;

/*! Allocate a new #ExifLoader.
 *
 *  \return allocated ExifLoader
 */
ExifLoader *exif_loader_new     (void);

/*! Allocate a new #ExifLoader using the specified memory allocator.
 *
 *  \param[in] mem the ExifMem
 *  \return allocated ExifLoader
 */
ExifLoader *exif_loader_new_mem (ExifMem *mem);

/*! Increase the refcount of the #ExifLoader.
 *
 *  \param[in] loader the ExifLoader to increase the refcount of.
 */
void        exif_loader_ref     (ExifLoader *loader);

/*! Decrease the refcount of the #ExifLoader.
 * If the refcount reaches 0, the loader is freed.
 *
 * \param[in] loader ExifLoader for which to decrease the refcount
 */
void        exif_loader_unref   (ExifLoader *loader);

/*! Load a file into the given #ExifLoader from the filesystem.
 * The relevant data is copied in raw form into the #ExifLoader.
 *
 * \param[in] loader loader to write to
 * \param[in] fname path to the file to read
 */
void        exif_loader_write_file (ExifLoader *loader, const char *fname);

/*! Load a buffer into the #ExifLoader from a memory buffer.
 * The relevant data is copied in raw form into the #ExifLoader.
 *
 * \param[in] loader loader to write to
 * \param[in] buf buffer to read from
 * \param[in] sz size of the buffer
 * \return 1 while EXIF data is read (or while there is still hope that
 *   there will be EXIF data later on), 0 otherwise.
 */
unsigned char exif_loader_write (ExifLoader *loader, unsigned char *buf, unsigned int sz);

/*! Free any data previously loaded and reset the #ExifLoader to its
 * newly-initialized state.
 *
 * \param[in] loader the loader
 */
void          exif_loader_reset (ExifLoader *loader);

/*! Create an #ExifData from the data in the loader. The loader must
 * already contain data from a previous call to #exif_loader_write_file
 * or #exif_loader_write.
 *
 * \note The #ExifData returned is created using its default options, which
 * may take effect before the data is returned. If other options are desired,
 * an #ExifData must be created explicitly and data extracted from the loader
 * using #exif_loader_get_buf instead.
 *
 * \param[in] loader the loader
 * \return allocated ExifData
 *
 * \see exif_loader_get_buf
 */
ExifData     *exif_loader_get_data (ExifLoader *loader);

/*! Return the raw data read by the loader.  The returned pointer is only
 * guaranteed to be valid until the next call to a function modifying
 * this #ExifLoader.  Either or both of buf and buf_size may be NULL on
 * entry, in which case that value is not returned.
 *
 * \param[in] loader the loader
 * \param[out] buf read-only pointer to the data read by the loader, or NULL
 *                 in case of error
 * \param[out] buf_size size of the data at buf, or 0 in case of error
 */
void exif_loader_get_buf (ExifLoader *loader, const unsigned char **buf,
						  unsigned int *buf_size);

/*! Set the log message object used by this #ExifLoader.
 * \param[in] loader the loader
 * \param[in] log #ExifLog
 */
void exif_loader_log (ExifLoader *loader, ExifLog *log);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_LOADER_H__ */
