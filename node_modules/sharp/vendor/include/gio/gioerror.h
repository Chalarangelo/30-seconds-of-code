/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_IO_ERROR_H__
#define __G_IO_ERROR_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <glib.h>
#include <gio/gioenums.h>

G_BEGIN_DECLS

/**
 * G_IO_ERROR:
 *
 * Error domain for GIO. Errors in this domain will be from the #GIOErrorEnum enumeration.
 * See #GError for more information on error domains.
 **/
#define G_IO_ERROR g_io_error_quark()

GLIB_AVAILABLE_IN_ALL
GQuark       g_io_error_quark      (void);
GLIB_AVAILABLE_IN_ALL
GIOErrorEnum g_io_error_from_errno (gint err_no);

#ifdef G_OS_WIN32
GLIB_AVAILABLE_IN_ALL
GIOErrorEnum g_io_error_from_win32_error (gint error_code);
#endif

G_END_DECLS

#endif /* __G_IO_ERROR_H__ */
