/* -*- Mode: C; indent-tabs-mode: nil; c-basic-offset: 8 -*- */

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
 *
 * Author: Dodji Seketeli
 * See COPYRIGHTS file for copyright information.
 */

#ifndef __CR_SELECTOR_H__
#define __CR_SELECTOR_H__

#include <stdio.h>
#include "cr-utils.h"
#include "cr-simple-sel.h"
#include "cr-parsing-location.h"

/**
 *@file
 *The declaration file of the #CRSelector file.
 */

G_BEGIN_DECLS

typedef struct _CRSelector CRSelector ;

/**
 *Abstracts a CSS2 selector as defined in the right part
 *of the 'ruleset" production in the appendix D.1 of the
 *css2 spec.
 *It is actually the abstraction of a comma separated list
 *of simple selectors list.
 *In a css2 file, a selector is a list of simple selectors
 *separated by a comma.
 *e.g: sel0, sel1, sel2 ...
 *Each seln is a simple selector
 */
struct _CRSelector
{
	/**
	 *A Selection expression.
	 *It is a list of basic selectors.
	 *Each basic selector can be either an element
	 *selector, an id selector, a class selector, an
	 *attribute selector, an universal selector etc ...
	 */
	CRSimpleSel *simple_sel ;

	/**The next selector list element*/
	CRSelector *next ;
	CRSelector *prev ;
	CRParsingLocation location ;
	glong ref_count ;
};

CRSelector* cr_selector_new (CRSimpleSel *a_sel_expr) ;

CRSelector * cr_selector_parse_from_buf (const guchar * a_char_buf,
					 enum CREncoding a_enc) ;

CRSelector* cr_selector_append (CRSelector *a_this, CRSelector *a_new) ;

CRSelector* cr_selector_append_simple_sel (CRSelector *a_this,
					   CRSimpleSel *a_simple_sel) ;

CRSelector* cr_selector_prepend (CRSelector *a_this, CRSelector *a_new) ;

guchar * cr_selector_to_string (CRSelector const *a_this) ;

void cr_selector_dump (CRSelector const *a_this, FILE *a_fp) ;

void cr_selector_ref (CRSelector *a_this) ;

gboolean cr_selector_unref (CRSelector *a_this) ;

void cr_selector_destroy (CRSelector *a_this) ;

G_END_DECLS

#endif /*__CR_SELECTOR_H__*/
