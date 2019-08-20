/* -*- Mode: C; indent-tabs-mode:nil; c-basic-offset: 8-*- */

/*
 * This file is part of The Croco Library
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of the 
 * GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the 
 * GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 *
 */

/*
 *$Id$
 */

#ifndef __CR_CASCADE_H__
#define __CR_CASCADE_H__

#include "cr-stylesheet.h"

/**
 *@file
 *the declaration of the #CRCascade class.
 */

G_BEGIN_DECLS


typedef struct _CRCascadePriv CRCascadePriv ;

/**
 *An abstraction of the "Cascade" defined
 *in the css2 spec, chapter 6.4.
 */
typedef struct _CRCascade CRCascade ;

struct _CRCascade
{
	CRCascadePriv *priv ;
};


CRCascade * cr_cascade_new (CRStyleSheet *a_author_sheet,
                            CRStyleSheet *a_user_sheet,
                            CRStyleSheet *a_ua_sheet) ;

CRStyleSheet * cr_cascade_get_sheet (CRCascade *a_this,
                                     enum CRStyleOrigin a_origin) ;

enum CRStatus cr_cascade_set_sheet (CRCascade *a_this,
                                    CRStyleSheet *a_sheet,
                                    enum CRStyleOrigin a_origin) ;

void cr_cascade_ref (CRCascade *a_this) ;

void cr_cascade_unref (CRCascade *a_this) ;

void cr_cascade_destroy (CRCascade *a_this) ;

G_END_DECLS

#endif /*__CR_CASCADE_H__*/
