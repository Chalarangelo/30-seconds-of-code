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
 * see COPYRIGHTS file for copyright information.
 */


#ifndef __CR_STYLESHEET_H__
#define __CR_STYLESHEET_H__

#include "cr-utils.h"
#include "cr-statement.h"

G_BEGIN_DECLS

/**
 *@file
 *The declaration of the #CRStyleSheet class.
 */


enum CRStyleOrigin
{
        /*Please don't change the order of
         *the values enumerated here ...
         *New values should be added at the end,
         *just before ORIGIN_END.
         */
        ORIGIN_UA = 0,
        ORIGIN_USER,
	ORIGIN_AUTHOR,	

        /*must always be the last one*/
        NB_ORIGINS 
} ;

/**
 *An abstraction of a css stylesheet as defined
 *by the css2 spec in chapter 4.
 */
struct _CRStyleSheet
{
	/**The css statements list*/
	CRStatement *statements ;

        enum CRStyleOrigin origin ;

        /*the parent import rule, if any.*/
        CRStatement *parent_import_rule ;

	/**custom data used by libcroco*/
	gpointer croco_data ;

	/**
	 *custom application data pointer
	 *Can be used by applications.
	 */
	gpointer app_data ;

	/**
	 *the reference count of this insance
	 *Please, don't never ever modify it
	 *directly. Use cr_stylesheet_ref()
	 *and cr_stylesheet_unref() instead.
	 */
	gulong ref_count ;
} ;

CRStyleSheet * cr_stylesheet_new (CRStatement *a_stmts) ;

gchar * cr_stylesheet_to_string (CRStyleSheet const *a_this) ;
void cr_stylesheet_dump (CRStyleSheet const *a_this, FILE *a_fp) ;

gint cr_stylesheet_nr_rules (CRStyleSheet const *a_this) ;

CRStatement * cr_stylesheet_statement_get_from_list (CRStyleSheet *a_this, int itemnr) ;

void cr_stylesheet_ref (CRStyleSheet *a_this) ;

gboolean cr_stylesheet_unref (CRStyleSheet *a_this) ;

void cr_stylesheet_destroy (CRStyleSheet *a_this) ;

G_END_DECLS

#endif /*__CR_STYLESHEET_H__*/
