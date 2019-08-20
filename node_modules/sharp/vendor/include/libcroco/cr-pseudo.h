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
 * See COPYRIGHTS file for copyright information
 */

#ifndef __CR_PSEUDO_H__
#define __CR_PSEUDO_H__

#include <stdio.h>
#include <glib.h>
#include "cr-attr-sel.h"
#include "cr-parsing-location.h"

G_BEGIN_DECLS

enum CRPseudoType
{
        IDENT_PSEUDO = 0,
        FUNCTION_PSEUDO
} ;

typedef struct _CRPseudo CRPseudo ;

/**
 *The CRPseudo Class.
 *Abstract a "pseudo" as defined by the css2 spec
 *in appendix D.1 .
 */
struct _CRPseudo
{
        enum CRPseudoType type ;
        CRString *name ;
        CRString *extra ;
        CRParsingLocation location ;
} ;

CRPseudo * cr_pseudo_new (void) ;

guchar * cr_pseudo_to_string (CRPseudo const *a_this) ;

void cr_pseudo_dump (CRPseudo const *a_this, FILE *a_fp) ;

void cr_pseudo_destroy (CRPseudo *a_this) ;

G_END_DECLS

#endif /*__CR_PSEUDO_H__*/
