/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-utils.h:
 *
 * Copyright (C) 2002-2006 Jody Goldberg (jody@gnome.org)
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of the GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */

#ifndef GSF_UTILS_H
#define GSF_UTILS_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

/* Do this the ugly way so that we don't have to worry about alignment */

/**
 * GSF_LE_GET_GUINT8:
 * @p: pointer to storage
 *
 * Interpret binary data as an unsigned 8-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GUINT8(p) (*(guint8 const *)(p))

/**
 * GSF_LE_GET_GUINT16:
 * @p: pointer to storage
 *
 * Interpret binary data as an unsigned 16-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GUINT16(p)				\
	(guint16)((((guint8 const *)(p))[0] << 0)  |	\
		  (((guint8 const *)(p))[1] << 8))

/**
 * GSF_LE_GET_GUINT32:
 * @p: pointer to storage
 *
 * Interpret binary data as an unsigned 32-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GUINT32(p)					\
	(guint32)(((guint32)((guint8 const *)(p))[0] << 0)  |	\
		  ((guint32)((guint8 const *)(p))[1] << 8)  |	\
		  ((guint32)((guint8 const *)(p))[2] << 16) |	\
		  ((guint32)((guint8 const *)(p))[3] << 24))

/**
 * GSF_LE_GET_GUINT64:
 * @p: pointer to storage
 *
 * Interpret binary data as an unsigned 64-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GUINT64(p) (gsf_le_get_guint64 (p))

/**
 * GSF_LE_GET_GINT8:
 * @p: pointer to storage
 *
 * Interpret binary data as a signed 8-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GINT8(p) ((gint8)GSF_LE_GET_GUINT8(p))

/**
 * GSF_LE_GET_GINT16:
 * @p: pointer to storage
 *
 * Interpret binary data as a signed 16-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GINT16(p) ((gint16)GSF_LE_GET_GUINT16(p))

/**
 * GSF_LE_GET_GINT32:
 * @p: pointer to storage
 *
 * Interpret binary data as a signed 32-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GINT32(p) ((gint32)GSF_LE_GET_GUINT32(p))

/**
 * GSF_LE_GET_GINT64:
 * @p: pointer to storage
 *
 * Interpret binary data as a signed 64-bit integer in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_GINT64(p) ((gint64)GSF_LE_GET_GUINT64(p))

/**
 * GSF_LE_GET_FLOAT:
 * @p: pointer to storage
 *
 * Interpret binary data as a float in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_FLOAT(p) (gsf_le_get_float (p))

/**
 * GSF_LE_GET_DOUBLE:
 * @p: pointer to storage
 *
 * Interpret binary data as a double in little endian order.
 *
 * Returns: interpreted data
 */
#define GSF_LE_GET_DOUBLE(p) (gsf_le_get_double (p))

guint64 gsf_le_get_guint64 (void const *p);
float   gsf_le_get_float   (void const *p);
double  gsf_le_get_double  (void const *p);

/**
 * GSF_LE_SET_GUINT8:
 * @p: pointer to storage
 * @dat: 8-bit unsigned integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GUINT8(p, dat)			\
	(*((guint8 *)(p))      = ((dat)        & 0xff))

/**
 * GSF_LE_SET_GUINT16:
 * @p: pointer to storage
 * @dat: 16-bit unsigned integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GUINT16(p, dat)					\
	((*((guint8 *)(p) + 0) = (guint8)((guint16)(dat))       & 0xff), \
	 (*((guint8 *)(p) + 1) = (guint8)((guint16)(dat) >>  8) & 0xff))

/**
 * GSF_LE_SET_GUINT32:
 * @p: pointer to storage
 * @dat: 32-bit unsigned integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GUINT32(p, dat)					\
	((*((guint8 *)(p) + 0) = (guint8)((guint32)(dat))       & 0xff), \
	 (*((guint8 *)(p) + 1) = (guint8)((guint32)(dat) >>  8) & 0xff), \
	 (*((guint8 *)(p) + 2) = (guint8)((guint32)(dat) >> 16) & 0xff), \
	 (*((guint8 *)(p) + 3) = (guint8)((guint32)(dat) >> 24) & 0xff))

/**
 * GSF_LE_SET_GUINT64:
 * @p: pointer to storage
 * @dat: 64-bit unsigned integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GUINT64(p, dat)			\
	((*((guint8 *)(p) + 0) = (guint8)((guint64)(dat))       & 0xff), \
	 (*((guint8 *)(p) + 1) = (guint8)((guint64)(dat) >>  8) & 0xff), \
	 (*((guint8 *)(p) + 2) = (guint8)((guint64)(dat) >> 16) & 0xff), \
	 (*((guint8 *)(p) + 3) = (guint8)((guint64)(dat) >> 24) & 0xff), \
	 (*((guint8 *)(p) + 4) = (guint8)((guint64)(dat) >> 32) & 0xff), \
	 (*((guint8 *)(p) + 5) = (guint8)((guint64)(dat) >> 40) & 0xff), \
	 (*((guint8 *)(p) + 6) = (guint8)((guint64)(dat) >> 48) & 0xff), \
	 (*((guint8 *)(p) + 7) = (guint8)((guint64)(dat) >> 56) & 0xff))

/**
 * GSF_LE_SET_GINT8:
 * @p: pointer to storage
 * @dat: 8-bit signed integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GINT8(p,dat) GSF_LE_SET_GUINT8((p),(dat))

/**
 * GSF_LE_SET_GINT16:
 * @p: pointer to storage
 * @dat: 16-bit signed integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GINT16(p,dat) GSF_LE_SET_GUINT16((p),(dat))

/**
 * GSF_LE_SET_GINT32:
 * @p: pointer to storage
 * @dat: 32-bit signed integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GINT32(p,dat) GSF_LE_SET_GUINT32((p),(dat))

/**
 * GSF_LE_SET_GINT64:
 * @p: pointer to storage
 * @dat: 64-bit signed integer
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_GINT64(p,dat) GSF_LE_SET_GUINT64((p),(dat))

/**
 * GSF_LE_SET_FLOAT:
 * @p: pointer to storage
 * @dat: float to be stored
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_FLOAT(p,dat) gsf_le_set_float((p),(dat))

/**
 * GSF_LE_SET_DOUBLE:
 * @p: pointer to storage
 * @dat: double to be stored
 *
 * Store @dat in little endian order in memory pointed to by @p.
 */
#define GSF_LE_SET_DOUBLE(p,dat) gsf_le_set_double((p),(dat))

void gsf_le_set_float  (void *p, float f);
void gsf_le_set_double (void *p, double d);

void gsf_init (void);
void gsf_shutdown (void);
void gsf_init_dynamic	  (GTypeModule *module);
void gsf_shutdown_dynamic (GTypeModule *module);
gboolean gsf_debug_flag (const char *flag);

/* Debugging utilities */
void gsf_mem_dump   (guint8 const *ptr, size_t len);
void gsf_input_dump (GsfInput *input, gboolean dump_as_hex);

/* base64 encoding utilities */
guint8 *gsf_base64_encode_simple (guint8 const *data, size_t len);
size_t  gsf_base64_encode_close  (guint8 const *in, size_t inlen,
				  gboolean break_lines, guint8 *out,
				  int *state, guint *save);
size_t  gsf_base64_encode_step   (guint8 const *in, size_t len,
				  gboolean break_lines, guint8 *out,
				  int *state, guint *save);

size_t  gsf_base64_decode_simple (guint8 *data, size_t len);
size_t  gsf_base64_decode_step   (guint8 const *in, size_t len,
				  guint8 *out, int *state, guint *save);


/* For putting filenames into error messages.  */
char *gsf_filename_to_utf8 (char const *filename, gboolean quoted);

/* Some version checking */

/**
 * libgsf_major_version:
 *
 * Major version number of libgsf, indicating the ABI version.
 */
extern int libgsf_major_version;

/**
 * libgsf_minor_version:
 *
 * Minor (secondary) version number of libgsf, indicating the API version.
 */
extern int libgsf_minor_version;

/**
 * libgsf_micro_version:
 *
 * Micro (tertiary) version number of libgsf, indicating bug fixes.
 */
extern int libgsf_micro_version;

char const *gsf_extension_pointer (char const * path);
void	    gsf_iconv_close (GIConv handle);

void        gsf_property_settings_collect_valist (GType object_type,
						  GParameter **p_params,
						  size_t *p_n_params,
						  const gchar *first_property_name,
						  va_list var_args);
void        gsf_property_settings_collect (GType object_type,
					   GParameter **p_params,
					   size_t *p_n_params,
					   const gchar *first_property_name,
					   ...);
const GParameter *gsf_property_settings_find (const char *name,
					      const GParameter *params,
					      size_t n_params);
void        gsf_property_settings_free (GParameter *params,
					size_t n_params);



/* Errors */

#define GSF_ERROR (gsf_error_quark ())

/**
 * GsfError:
 * @GSF_ERROR_OUT_OF_MEMORY: Memory allocation failed
 * @GSF_ERROR_INVALID_DATA: Invalid data encountered (e.g. not enough data)
 */

typedef enum {
	GSF_ERROR_OUT_OF_MEMORY,
	GSF_ERROR_INVALID_DATA
} GsfError;

GQuark gsf_error_quark (void);


G_END_DECLS

#endif /* GSF_UTILS_H */
