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
 * See COPYRIGHTS file for copyright information
 */


/**
 *@file
 *The declaration
 *of the #CRNum class.
 */

#ifndef __CR_NUM_H__
#define __CR_NUM_H__

#include <glib.h>
#include "cr-utils.h"
#include "cr-parsing-location.h"

G_BEGIN_DECLS

/**
 *@file
 *The declaration of the #CRNum class.
 *
 */

/**
 *The different types
 *of numbers.
 *Please, do not modify
 *the declaration order of the enum
 *members, unless you know 
 *what you are doing.
 */
enum CRNumType
{
        NUM_AUTO = 0,
        NUM_GENERIC,
        NUM_LENGTH_EM,
        NUM_LENGTH_EX,
        NUM_LENGTH_PX,
        NUM_LENGTH_IN,
        NUM_LENGTH_CM,
        NUM_LENGTH_MM,
        NUM_LENGTH_PT,
        NUM_LENGTH_PC,
        NUM_ANGLE_DEG,
        NUM_ANGLE_RAD,
        NUM_ANGLE_GRAD,
        NUM_TIME_MS,
        NUM_TIME_S,
        NUM_FREQ_HZ,
        NUM_FREQ_KHZ,
        NUM_PERCENTAGE,
	NUM_INHERIT,
        NUM_UNKNOWN_TYPE,
        NB_NUM_TYPE
} ;


/**
 *An abstraction of a number (num)
 *as defined in the css2 spec.
 */
typedef struct _CRNum CRNum ;

/**
 *An abstraction of a number (num)
 *as defined in the css2 spec.
 */
struct _CRNum
{
        enum CRNumType type ;
        gdouble val ;
        CRParsingLocation location ;
} ;

CRNum *
cr_num_new (void) ;
	
CRNum *
cr_num_new_with_val (gdouble a_val,
                     enum CRNumType a_type) ;

CRNum *
cr_num_dup (CRNum const *a_this) ;

guchar *
cr_num_to_string (CRNum const *a_this) ;

enum CRStatus
cr_num_copy (CRNum *a_dest, CRNum const *a_src) ;

enum CRStatus
cr_num_set (CRNum *a_this, gdouble a_val, 
            enum CRNumType a_type) ;

gboolean
cr_num_is_fixed_length (CRNum const *a_this) ;

void
cr_num_destroy (CRNum *a_this) ;


G_END_DECLS


#endif /*__CR_NUM_H__*/
