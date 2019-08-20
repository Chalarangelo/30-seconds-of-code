/* -*- Mode: C; indent-tabs-mode:nil; c-basic-offset: 8-*- */

/*
 * This file is part of The Croco Library
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
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 * 
 * See COPYRIGHTS file for copyright information.
 */

/**
 *@file
 *Declaration file of the #CRString class.
 */

#ifndef __CR_STRING_H__
#define __CR_STRING_H__

#include <glib.h>
#include "cr-utils.h"
#include "cr-parsing-location.h"

G_BEGIN_DECLS

typedef struct _CRString CRString ;

/**
 *This is a ship implementation of string based on GString.
 *Actually, the aim of CRString is to store the parsing location
 *(line,column,byte offset) at which a given string has been parsed
 *in the input CSS.
 *So this class has a gstring field of type GString that users can
 *freely manipulate, and also a CRParginLocation type where the
 *parsing location is store. If you don't want to deal with parsing
 *location stuffs, then use GString instead. If we were in C++ for example,
 *CRString would just inherit GString and just add accessors to
 *the CRParsingLocation data ... but we are not and we still have
 *to provide the parsing location information.
 */
struct _CRString {
	/**
	 *The GString where all the string
	 *operation happen.
	 */
	GString *stryng ;
	/**
	 *The parsing location storage area.
	 */
	CRParsingLocation location ;
} ;

CRString * cr_string_new (void) ;

CRString  *cr_string_new_from_string (const gchar * a_string) ;
CRString * cr_string_new_from_gstring (GString const *a_string) ;
CRString *cr_string_dup (CRString const *a_this) ;
gchar *cr_string_dup2 (CRString const *a_this) ;
const gchar *cr_string_peek_raw_str (CRString const *a_this) ;
gint cr_string_peek_raw_str_len (CRString const *a_this) ;
void cr_string_destroy (CRString *a_this) ;

G_END_DECLS

#endif 
