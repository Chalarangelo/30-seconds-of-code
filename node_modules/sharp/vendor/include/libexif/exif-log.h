/*! \file exif-log.h
 *  \brief Log message infrastructure
 */
/*
 * Copyright (c) 2004 Lutz Mueller <lutz@users.sourceforge.net>
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

#ifndef __EXIF_LOG_H__
#define __EXIF_LOG_H__

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */

#include <libexif/exif-mem.h>
#include <stdarg.h>

/*! State maintained by the logging interface */
typedef struct _ExifLog        ExifLog;

/*! Create a new logging instance.
 * \see exif_log_free
 *
 * \return new instance of #ExifLog
 */
ExifLog *exif_log_new     (void);
ExifLog *exif_log_new_mem (ExifMem *);
void     exif_log_ref     (ExifLog *log);
void     exif_log_unref   (ExifLog *log);

/*! Delete instance of #ExifLog.
 * \see exif_log_new
 *
 * \param[in] log #ExifLog
 * \return new instance of #ExifLog
 */
void     exif_log_free    (ExifLog *log);

typedef enum {
	EXIF_LOG_CODE_NONE,
	EXIF_LOG_CODE_DEBUG,
	EXIF_LOG_CODE_NO_MEMORY,
	EXIF_LOG_CODE_CORRUPT_DATA
} ExifLogCode;

/*! Return a textual description of the given class of error log.
 *
 * \param[in] code logging message class
 * \return textual description of the log class
 */
const char *exif_log_code_get_title   (ExifLogCode code);

/*! Return a verbose description of the given class of error log.
 *
 * \param[in] code logging message class
 * \return verbose description of the log class
 */
const char *exif_log_code_get_message (ExifLogCode code);

/*! Log callback function prototype.
 */
typedef void (* ExifLogFunc) (ExifLog *log, ExifLogCode, const char *domain,
			      const char *format, va_list args, void *data);

/*! Register log callback function.
 * Calls to the log callback function are purely for diagnostic purposes.
 *
 * \param[in] log logging state variable
 * \param[in] func callback function to set
 * \param[in] data data to pass into callback function
 */
void     exif_log_set_func (ExifLog *log, ExifLogFunc func, void *data);

#ifndef NO_VERBOSE_TAG_STRINGS
void     exif_log  (ExifLog *log, ExifLogCode, const char *domain,
		    const char *format, ...)
#ifdef __GNUC__
			__attribute__((__format__(printf,4,5)))
#endif
;
#else
#if defined(__STDC_VERSION__) &&  __STDC_VERSION__ >= 199901L
#define exif_log(...) do { } while (0)
#elif defined(__GNUC__)
#define exif_log(x...) do { } while (0)
#else
#define exif_log (void)
#endif
#endif

void     exif_logv (ExifLog *log, ExifLogCode, const char *domain,
		    const char *format, va_list args);

/* For your convenience */
#define EXIF_LOG_NO_MEMORY(l,d,s) exif_log ((l), EXIF_LOG_CODE_NO_MEMORY, (d), "Could not allocate %lu byte(s).", (unsigned long)(s))

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* __EXIF_LOG_H__ */
