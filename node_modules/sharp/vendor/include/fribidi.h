/* FriBidi
 * fribidi.h - Unicode bidirectional and Arabic joining/shaping algorithms
 *
 * Author:
 *   Behdad Esfahbod, 2004
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc
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
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library, in a file named COPYING; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA
 * 
 * For licensing issues, contact <fribidi.license@gmail.com>.
 */
#ifndef _FRIBIDI_H
#define _FRIBIDI_H

#include "fribidi-common.h"

#include "fribidi-unicode.h"
#include "fribidi-types.h"
#include "fribidi-flags.h"
#include "fribidi-bidi-types.h"
#include "fribidi-bidi.h"
#include "fribidi-joining-types.h"
#include "fribidi-joining.h"
#include "fribidi-mirroring.h"
#include "fribidi-brackets.h"
#include "fribidi-arabic.h"
#include "fribidi-shape.h"
#include "fribidi-char-sets.h"


#ifdef FRIBIDI_NO_DEPRECATED
#else
# include "fribidi-deprecated.h"
#endif				/* !FRIBIDI_NO_DEPRECATED */


#include "fribidi-begindecls.h"



/* An string containing the version information of the library. */
FRIBIDI_ENTRY const char *fribidi_version_info;

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
