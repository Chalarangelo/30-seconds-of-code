/* cairo - a vector graphics library with display and print output
 *
 * Copyright © 2008 Chris Wilson
 *
 * This library is free software; you can redistribute it and/or
 * modify it either under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 * (the "LGPL") or, at your option, under the terms of the Mozilla
 * Public License Version 1.1 (the "MPL"). If you do not alter this
 * notice, a recipient may use your version of this file under either
 * the MPL or the LGPL.
 *
 * You should have received a copy of the LGPL along with this library
 * in the file COPYING-LGPL-2.1; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Suite 500, Boston, MA 02110-1335, USA
 * You should have received a copy of the MPL along with this library
 * in the file COPYING-MPL-1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * This software is distributed on an "AS IS" basis, WITHOUT WARRANTY
 * OF ANY KIND, either express or implied. See the LGPL or the MPL for
 * the specific language governing rights and limitations.
 *
 * The Original Code is the cairo graphics library.
 *
 * The Initial Developer of the Original Code is Chris Wilson
 *
 * Contributor(s):
 *	Chris Wilson <chris@chris-wilson.co.uk>
 */

#ifndef CAIRO_SCRIPT_H
#define CAIRO_SCRIPT_H

#include "cairo.h"

#if CAIRO_HAS_SCRIPT_SURFACE

CAIRO_BEGIN_DECLS

/**
 * cairo_script_mode_t:
 * @CAIRO_SCRIPT_MODE_ASCII: the output will be in readable text (default). (Since 1.12)
 * @CAIRO_SCRIPT_MODE_BINARY: the output will use byte codes. (Since 1.12)
 *
 * A set of script output variants.
 *
 * Since: 1.12
 **/
typedef enum {
    CAIRO_SCRIPT_MODE_ASCII,
    CAIRO_SCRIPT_MODE_BINARY
} cairo_script_mode_t;

cairo_public cairo_device_t *
cairo_script_create (const char *filename);

cairo_public cairo_device_t *
cairo_script_create_for_stream (cairo_write_func_t	 write_func,
				void			*closure);

cairo_public void
cairo_script_write_comment (cairo_device_t *script,
			    const char *comment,
			    int len);

cairo_public void
cairo_script_set_mode (cairo_device_t *script,
		       cairo_script_mode_t mode);

cairo_public cairo_script_mode_t
cairo_script_get_mode (cairo_device_t *script);

cairo_public cairo_surface_t *
cairo_script_surface_create (cairo_device_t *script,
			     cairo_content_t content,
			     double width,
			     double height);

cairo_public cairo_surface_t *
cairo_script_surface_create_for_target (cairo_device_t *script,
					cairo_surface_t *target);

cairo_public cairo_status_t
cairo_script_from_recording_surface (cairo_device_t	*script,
				     cairo_surface_t	*recording_surface);

CAIRO_END_DECLS

#else  /*CAIRO_HAS_SCRIPT_SURFACE*/
# error Cairo was not compiled with support for the CairoScript backend
#endif /*CAIRO_HAS_SCRIPT_SURFACE*/

#endif /*CAIRO_SCRIPT_H*/
