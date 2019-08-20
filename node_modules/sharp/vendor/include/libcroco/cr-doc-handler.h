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
 * See the COPYRIGHTS file for copyright information.
 */

#ifndef __CR_DOC_HANDLER_H__
#define __CR_DOC_HANDLER_H__

/**
 *@file
 *The declaration of the #CRDocumentHandler class.
 *This class is actually the parsing events handler.
 */

#include <glib.h>
#include "cr-utils.h"
#include "cr-input.h"
#include "cr-stylesheet.h"

G_BEGIN_DECLS


typedef struct _CRDocHandler CRDocHandler ;

struct _CRDocHandlerPriv ;
typedef struct _CRDocHandlerPriv CRDocHandlerPriv ;


/**
 *The SAC document handler.
 *An instance of this class is to
 *be passed to a parser. Then, during the parsing
 *the parser calls the convenient function pointer
 *whenever a particular event (a css construction) occurs.
 */
struct _CRDocHandler
{
	CRDocHandlerPriv *priv ;

	/**
	 *This pointer is to be used by the application for
	 *it custom needs. It is there to extend the doc handler.
	 */
	gpointer app_data ;

	/**
	 *Is called at the beginning of the parsing of the document.
	 *@param a_this a pointer to the current instance of
	 *#CRDocHandler.
	 */
	void (*start_document) (CRDocHandler *a_this) ;

	/**
	 *Is called to notify the end of the parsing of the document.
	 *@param a_this a pointer to the current instance of
	 *#CRDocHandler.
	 */
	void (*end_document) (CRDocHandler *a_this) ;

	/**
	 *Is called to notify an at charset rule.
	 *@param a_this the document handler.
	 *@param a_charset the declared charset.
	 */
	void (*charset) (CRDocHandler *a_this, 
			 CRString *a_charset,
			 CRParsingLocation *a_charset_sym_location) ;

	/**
	 *Is called to notify an import statement in 
	 *the stylesheet.
	 *@param a_this the current instance of #CRDocHandler.
	 *@param a_media_list a doubly linked list of GString objects.
	 *Each GString object contains a string which is the
	 *destination media for style information.
	 *@param a_uri the uri of the imported style sheet.
	 *@param a_uri_default_ns the default namespace of URI
	 *@param a_location the parsing location of the '\@import' 
	 *keyword.
	 *of the imported style sheet.
	 */
	void (*import_style) (CRDocHandler *a_this,
			      GList *a_media_list,
			      CRString *a_uri,
			      CRString *a_uri_default_ns,
			      CRParsingLocation *a_location) ;

	void (*import_style_result) (CRDocHandler *a_this,
				     GList *a_media_list,
				     CRString *a_uri,
				     CRString *a_uri_default_ns,
				     CRStyleSheet *a_sheet) ;

	/**
	 *Is called to notify a namespace declaration.
	 *Not used yet.
	 *@param a_this the current instance of #CRDocHandler.
	 *@param a_prefix the prefix of the namespace.
	 *@param a_uri the uri of the namespace.
	 *@param a_location the location of the "@namespace" keyword.
	 */
	void (*namespace_declaration) (CRDocHandler *a_this,
				       CRString *a_prefix,
				       CRString *a_uri,
				       CRParsingLocation *a_location) ;
		
	/**
	 *Is called to notify a comment.
	 *@param a_this a pointer to the current instance
	 *of #CRDocHandler.
	 *@param a_comment the comment.
	 */
	void (*comment) (CRDocHandler *a_this,
			 CRString *a_comment) ;

	/**
	 *Is called to notify the beginning of a rule
	 *statement.
	 *@param a_this the current instance of #CRDocHandler.
	 *@param a_selector_list the list of selectors that precedes
	 *the rule declarations.
	 */
	void (*start_selector) (CRDocHandler * a_this,
				CRSelector *a_selector_list) ;

	/**
	 *Is called to notify the end of a rule statement.
	 *@param a_this the current instance of #CRDocHandler.
	 *@param a_selector_list the list of selectors that precedes
	 *the rule declarations. This pointer is the same as
	 *the one passed to start_selector() ;
	 */
	void (*end_selector) (CRDocHandler *a_this,
			      CRSelector *a_selector_list) ;


	/**
	 *Is called to notify a declaration.
	 *@param a_this a pointer to the current instance
	 *of #CRDocHandler.
	 *@param a_name the name of the parsed property.
	 *@param a_expression a css expression that represents
	 *the value of the property. A css expression is
	 *actually a linked list of 'terms'. Each term can
	 *be linked to other using operators.
	 *
	 */
	void (*property) (CRDocHandler *a_this,
			  CRString *a_name,
			  CRTerm *a_expression,
			  gboolean a_is_important) ;
	/**
	 *Is called to notify the start of a font face statement.
	 *The parser invokes this method at the beginning of every
	 *font face statement in the style sheet. There will
	 *be a corresponding end_font_face () event for every
	 *start_font_face () event.
	 *
	 *@param a_this a pointer to the current instance of
	 *#CRDocHandler.
	 *@param a_location the parsing location of the "\@font-face"
	 *keyword.
	 */
	void (*start_font_face) (CRDocHandler *a_this,
				 CRParsingLocation *a_location) ;

	/**
	 *Is called to notify the end of a font face statement.
	 *@param a_this a pointer to the current instance of
	 *#CRDocHandler.
	 */
	void (*end_font_face) (CRDocHandler *a_this) ;


	/**
	 *Is called to notify the beginning of a media statement.
	 *The parser will invoke this method at the beginning of
	 *every media statement in the style sheet. There will be
	 *a corresponding end_media() event for every start_media()
	 *event.
	 *@param a_this a pointer to the current instance of 
	 *#CRDocHandler.
	 *@param a_media_list a double linked list of 
	 #CRString * objects.
	 *Each CRString objects is actually a destination media for
	 *the style information.
	 */
	void (*start_media) (CRDocHandler *a_this,
			     GList *a_media_list,
			     CRParsingLocation *a_location) ;

	/**
	 *Is called to notify the end of a media statement.
	 *@param a_this a pointer to the current instance
	 *of #CRDocHandler.
	 *@param a_media_list a double linked list of GString * objects.
	 *Each GString objects is actually a destination media for
	 *the style information.
	 */
	void (*end_media) (CRDocHandler *a_this,
			   GList *a_media_list) ;

	/**
	 *Is called to notify the beginning of a page statement.
	 *The parser invokes this function at the beginning of
	 *every page statement in the style sheet. There will be
	 *a corresponding end_page() event for every single 
	 *start_page() event.
	 *@param a_this a pointer to the current instance of
	 *#CRDocHandler.
	 *@param a_name the name of the page (if any, null otherwise).
	 *@param a_pseudo_page the pseudo page (if any, null otherwise).
	 *@param a_location the parsing location of the "\@page" keyword.
	 */
	void (*start_page) (CRDocHandler *a_this,
			    CRString *a_name, 
			    CRString *a_pseudo_page,
			    CRParsingLocation *a_location) ;

	/**
	 *Is called to notify the end of a page statement.
	 *@param a_this a pointer to the current instance of
	 *#CRDocHandler.
	 *@param a_name the name of the page (if any, null otherwise).
	 *@param a_pseudo_page the pseudo page (if any, null otherwise).
	 */
	void (*end_page) (CRDocHandler *a_this,
			  CRString *a_name,
			  CRString *pseudo_page) ;
		
	/**
	 *Is Called to notify an unknown at-rule not supported
	 *by this parser.
	 */
	void (*ignorable_at_rule) (CRDocHandler *a_this,
				   CRString *a_name) ;

	/**
	 *Is called to notify a parsing error. After this error
	 *the application must ignore the rule being parsed, if
	 *any. After completion of this callback, 
	 *the parser will then try to resume the parsing,
	 *ignoring the current error.
	 */
	void (*error) (CRDocHandler *a_this) ;

	/**
	 *Is called to notify an unrecoverable parsing error.
	 *This is the place to put emergency routines that free allocated
	 *resources.
	 */
	void (*unrecoverable_error) (CRDocHandler *a_this) ;

	gboolean resolve_import ;
	gulong ref_count ;
} ;

CRDocHandler * cr_doc_handler_new (void) ;

enum CRStatus cr_doc_handler_set_result (CRDocHandler *a_this, gpointer a_result) ;

enum CRStatus cr_doc_handler_get_result (CRDocHandler const *a_this, gpointer * a_result) ;

enum CRStatus cr_doc_handler_set_ctxt (CRDocHandler *a_this, gpointer a_ctxt) ;

enum CRStatus cr_doc_handler_get_ctxt (CRDocHandler const *a_this, gpointer * a_ctxt) ;

enum CRStatus cr_doc_handler_set_default_sac_handler (CRDocHandler *a_this) ;

void cr_doc_handler_associate_a_parser (CRDocHandler *a_this,
					gpointer a_parser) ;

void cr_doc_handler_ref (CRDocHandler *a_this) ;

gboolean cr_doc_handler_unref (CRDocHandler *a_this) ;

void cr_doc_handler_destroy (CRDocHandler *a_this) ;

G_END_DECLS

#endif /*__CR_DOC_HANDLER_H__*/
