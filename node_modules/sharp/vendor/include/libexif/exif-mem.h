/*! \file exif-mem.h
 *  \brief Define the ExifMem data type and the associated functions.
 *  ExifMem defines the memory management functions used within libexif.
 */
/* exif-mem.h
 *
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

#ifndef __EXIF_MEM_H__
#define __EXIF_MEM_H__

#include <libexif/exif-utils.h>

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

/*! Should work like calloc()
 *
 *  \param[in] s the size of the block to allocate.
 *  \return the allocated memory and initialized. 
 */
typedef void * (* ExifMemAllocFunc)   (ExifLong s);

/*! Should work like realloc()
 *
 * \param[in] p the pointer to reallocate
 * \param[in] s the size of the reallocated block
 * \return allocated memory 
 */
typedef void * (* ExifMemReallocFunc) (void *p, ExifLong s);

/*! Free method for ExifMem
 *
 * \param[in] p the pointer to free
 * \return the freed pointer
 */
typedef void   (* ExifMemFreeFunc)    (void *p);

/*! ExifMem define a memory allocator */
typedef struct _ExifMem ExifMem;

/*! Create a new ExifMem
 *
 * \param[in] a the allocator function
 * \param[in] r the reallocator function
 * \param[in] f the free function
 */
ExifMem *exif_mem_new   (ExifMemAllocFunc a, ExifMemReallocFunc r,
			 ExifMemFreeFunc f);
/*! Refcount an ExifMem
 */
void     exif_mem_ref   (ExifMem *);

/*! Unrefcount an ExifMem.
 * If the refcount reaches 0, the ExifMem is freed
 */
void     exif_mem_unref (ExifMem *);

void *exif_mem_alloc   (ExifMem *m, ExifLong s);
void *exif_mem_realloc (ExifMem *m, void *p, ExifLong s);
void  exif_mem_free    (ExifMem *m, void *p);

/*! Create a new ExifMem with default values for your convenience
 *
 * \return return a new default ExifMem
 */
ExifMem *exif_mem_new_default (void);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_MEM_H__ */
