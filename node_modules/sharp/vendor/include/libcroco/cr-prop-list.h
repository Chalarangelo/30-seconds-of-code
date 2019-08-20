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
 * See COPYRIGHTS file for copyrights information.
 */

#ifndef __CR_PROP_LIST_H__
#define __CR_PROP_LIST_H__

#include "cr-utils.h"
#include "cr-declaration.h"
#include "cr-string.h"

G_BEGIN_DECLS

typedef struct _CRPropList CRPropList ;
typedef struct _CRPropListPriv CRPropListPriv ;

struct _CRPropList 
{
	CRPropListPriv * priv;
} ;

CRPropList * cr_prop_list_append (CRPropList *a_this,
				  CRPropList *a_to_append) ;

CRPropList * cr_prop_list_append2 (CRPropList *a_this,
				   CRString *a_prop,
				   CRDeclaration *a_decl) ;

CRPropList * cr_prop_list_prepend (CRPropList *a_this,
				   CRPropList *a_to_append) ;

CRPropList *  cr_prop_list_prepend2 (CRPropList *a_this,
				     CRString *a_prop,
				     CRDeclaration *a_decl) ;

enum CRStatus cr_prop_list_set_prop (CRPropList *a_this,
				     CRString *a_prop) ;

enum CRStatus cr_prop_list_get_prop (CRPropList const *a_this,
				     CRString **a_prop) ;

enum CRStatus cr_prop_list_lookup_prop (CRPropList *a_this,
					CRString *a_prop,
					CRPropList**a_pair) ;

CRPropList * cr_prop_list_get_next (CRPropList *a_this) ;

CRPropList * cr_prop_list_get_prev (CRPropList *a_this) ;

enum CRStatus cr_prop_list_set_decl (CRPropList *a_this,
				     CRDeclaration *a_decl);

enum CRStatus cr_prop_list_get_decl (CRPropList const *a_this,
				     CRDeclaration **a_decl) ;

CRPropList * cr_prop_list_unlink (CRPropList *a_this, 
				  CRPropList *a_pair) ;

void cr_prop_list_destroy (CRPropList *a_this) ;

G_END_DECLS

#endif /*__CR_PROP_LIST_H__*/
