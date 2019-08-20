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
 * Author: Dodji Seketeli
 * See COPYRIGHTS file for copyright information.
 */

#ifndef __CR_ATTR_SEL_H__
#define __CR_ATTR_SEL_H__

#include <stdio.h>
#include <glib.h>
#include "cr-utils.h"
#include "cr-parsing-location.h"
#include "cr-string.h"

G_BEGIN_DECLS


struct _CRAttrSel ;
typedef struct _CRAttrSel CRAttrSel ;

enum AttrMatchWay
{
        NO_MATCH = 0,
        SET,
        EQUALS,
        INCLUDES,
        DASHMATCH
} ;

struct _CRAttrSel
{
        CRString             *name ;
        CRString             *value ;
        enum AttrMatchWay  match_way ;
        CRAttrSel          *next ;
        CRAttrSel          *prev ;
        CRParsingLocation location ;
} ;

CRAttrSel * cr_attr_sel_new (void) ;

enum CRStatus cr_attr_sel_append_attr_sel (CRAttrSel * a_this, 
                                           CRAttrSel *a_attr_sel) ;

enum CRStatus cr_attr_sel_prepend_attr_sel (CRAttrSel *a_this, 
                                            CRAttrSel *a_attr_sel) ;
        
guchar * cr_attr_sel_to_string (CRAttrSel const *a_this) ;

void cr_attr_sel_dump (CRAttrSel const *a_this, FILE *a_fp) ;

void cr_attr_sel_destroy (CRAttrSel *a_this) ;

G_END_DECLS

#endif /*__CR_ATTR_SEL_H__*/
