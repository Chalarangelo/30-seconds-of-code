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
 * Author: Dodji Seketeli
 * See COPYRIGHTS file for copyright information.
 */

#include <stdio.h>
#include "cr-utils.h"
#include "cr-term.h"
#include "cr-selector.h"
#include "cr-declaration.h"

#ifndef __CR_STATEMENT_H__
#define __CR_STATEMENT_H__

G_BEGIN_DECLS

/**
 *@file
 *Declaration of the #CRStatement class.
 */

/*
 *forward declaration of CRStyleSheet which is defined in
 *cr-stylesheet.h
 */

struct _CRStatement ;

/*
 *typedef struct _CRStatement CRStatement ; 
 *this is forward declared in 
 *cr-declaration.h already.
 */

struct _CRAtMediaRule ;
typedef struct _CRAtMediaRule CRAtMediaRule ;

typedef struct _CRRuleSet CRRuleSet ;

/**
 *The abstraction of a css ruleset.
 *A ruleset is made of a list of selectors,
 *followed by a list of declarations.
 */
struct _CRRuleSet
{
	/**A list of instances of #CRSimpeSel*/
	CRSelector *sel_list ;

	/**A list of instances of #CRDeclaration*/
	CRDeclaration *decl_list ;
	
	/**
	 *The parent media rule, or NULL if
	 *no parent media rule exists.
	 */
	CRStatement *parent_media_rule ;
} ;

/*
 *a forward declaration of CRStylesheet.
 *CRStylesheet is actually declared in
 *cr-stylesheet.h
 */
struct _CRStyleSheet ;
typedef struct _CRStyleSheet CRStyleSheet;


/**The \@import rule abstraction.*/
typedef struct _CRAtImportRule CRAtImportRule ;
struct _CRAtImportRule
{
	/**the url of the import rule*/
	CRString *url ;

        GList *media_list ;

	/**
	 *the stylesheet fetched from the url, if any.
	 *this is not "owned" by #CRAtImportRule which means
	 *it is not destroyed by the destructor of #CRAtImportRule.
	 */
	CRStyleSheet * sheet;
};


/**abstraction of an \@media rule*/
struct _CRAtMediaRule
{
	GList *media_list ;
	CRStatement *rulesets ;	
} ;


typedef struct _CRAtPageRule CRAtPageRule ;
/**The \@page rule abstraction*/
struct _CRAtPageRule
{
	/**a list of instances of #CRDeclaration*/
	CRDeclaration *decl_list ;

	/**page selector. Is a pseudo selector*/
	CRString *name ;
	CRString *pseudo ;
} ;

/**The \@charset rule abstraction*/
typedef struct _CRAtCharsetRule CRAtCharsetRule ;
struct _CRAtCharsetRule
{
	CRString * charset ;
};

/**The abstaction of the \@font-face rule.*/
typedef struct _CRAtFontFaceRule CRAtFontFaceRule ;
struct _CRAtFontFaceRule
{
	/*a list of instanaces of #CRDeclaration*/
	CRDeclaration *decl_list ;
} ;


/**
 *The possible types of css2 statements.
 */
enum CRStatementType
{
	/**
	 *A generic css at-rule
	 *each unknown at-rule will
	 *be of this type.
	 */

        /**A css at-rule*/
	AT_RULE_STMT = 0,

	/*A css ruleset*/
	RULESET_STMT,

	/**A css2 import rule*/
	AT_IMPORT_RULE_STMT,

	/**A css2 media rule*/
	AT_MEDIA_RULE_STMT,

	/**A css2 page rule*/
	AT_PAGE_RULE_STMT,

	/**A css2 charset rule*/
	AT_CHARSET_RULE_STMT,

	/**A css2 font face rule*/
	AT_FONT_FACE_RULE_STMT
} ;


/**
 *The abstraction of css statement as defined
 *in the chapter 4 and appendix D.1 of the css2 spec.
 *A statement is actually a double chained list of
 *statements.A statement can be a ruleset, an \@import
 *rule, an \@page rule etc ...
 */
struct _CRStatement
{
	/**
	 *The type of the statement.
	 */
	enum CRStatementType type ;

	union
	{
		CRRuleSet *ruleset ;
		CRAtImportRule *import_rule ;
		CRAtMediaRule *media_rule ;
		CRAtPageRule *page_rule ;
		CRAtCharsetRule *charset_rule ;
		CRAtFontFaceRule *font_face_rule ;
	} kind ;

        /*
         *the specificity of the selector
         *that matched this statement.
         *This is only used by the cascading
         *order determination algorithm.
         */
        gulong specificity ;

        /*
         *the style sheet that contains
         *this css statement.
         */
        CRStyleSheet *parent_sheet ;
	CRStatement *next ;
	CRStatement *prev ;

        CRParsingLocation location ;

        /**
         *a custom pointer useable by
         *applications that use libcroco.
         *libcroco itself will never modify
         *this pointer.
         */        
        gpointer app_data ;

        /**
         *a custom pointer used
         *by the upper layers of libcroco.
         *application should never use this
         *pointer.
         */
        gpointer croco_data ;

} ;


gboolean
cr_statement_does_buf_parses_against_core (const guchar *a_buf,
                                           enum CREncoding a_encoding) ;
CRStatement *
cr_statement_parse_from_buf (const guchar *a_buf,
			     enum CREncoding a_encoding) ;
CRStatement*
cr_statement_new_ruleset (CRStyleSheet *a_sheet,
                          CRSelector *a_sel_list, 
			  CRDeclaration *a_decl_list,
			  CRStatement *a_media_rule) ;
CRStatement *
cr_statement_ruleset_parse_from_buf (const guchar * a_buf,
				     enum CREncoding a_enc) ;

CRStatement*
cr_statement_new_at_import_rule (CRStyleSheet *a_container_sheet,
                                 CRString *a_url,
                                 GList *a_media_list,
				 CRStyleSheet *a_imported_sheet) ;

CRStatement *
cr_statement_at_import_rule_parse_from_buf (const guchar * a_buf,
                                            enum CREncoding a_encoding) ;

CRStatement *
cr_statement_new_at_media_rule (CRStyleSheet *a_sheet,
                                CRStatement *a_ruleset,
				GList *a_media) ;
CRStatement *
cr_statement_at_media_rule_parse_from_buf (const guchar *a_buf,
					   enum CREncoding a_enc) ;

CRStatement *
cr_statement_new_at_charset_rule (CRStyleSheet *a_sheet,
                                  CRString *a_charset) ;
CRStatement *
cr_statement_at_charset_rule_parse_from_buf (const guchar *a_buf,
					     enum CREncoding a_encoding);


CRStatement *
cr_statement_new_at_font_face_rule (CRStyleSheet *a_sheet,
                                    CRDeclaration *a_font_decls) ;
CRStatement *
cr_statement_font_face_rule_parse_from_buf (const guchar *a_buf,
					    enum CREncoding a_encoding) ;

CRStatement *
cr_statement_new_at_page_rule (CRStyleSheet *a_sheet,
                               CRDeclaration *a_decl_list,
			       CRString *a_name,
			       CRString *a_pseudo) ;
CRStatement *
cr_statement_at_page_rule_parse_from_buf (const guchar *a_buf,
					  enum CREncoding a_encoding)  ;

enum CRStatus
cr_statement_set_parent_sheet (CRStatement *a_this, 
                               CRStyleSheet *a_sheet) ;

enum CRStatus
cr_statement_get_parent_sheet (CRStatement *a_this, 
                               CRStyleSheet **a_sheet) ;

CRStatement *
cr_statement_append (CRStatement *a_this,
		     CRStatement *a_new) ;

CRStatement*
cr_statement_prepend (CRStatement *a_this,
		      CRStatement *a_new) ;

CRStatement *
cr_statement_unlink (CRStatement *a_stmt) ;

enum CRStatus
cr_statement_ruleset_set_sel_list (CRStatement *a_this,
				   CRSelector *a_sel_list) ;

enum CRStatus
cr_statement_ruleset_get_sel_list (CRStatement const *a_this,
				   CRSelector **a_list) ;

enum CRStatus
cr_statement_ruleset_set_decl_list (CRStatement *a_this,
				    CRDeclaration *a_list) ;

enum CRStatus
cr_statement_ruleset_get_declarations (CRStatement *a_this,
                                       CRDeclaration **a_decl_list) ;

enum CRStatus
cr_statement_ruleset_append_decl2 (CRStatement *a_this,
				   CRString *a_prop, CRTerm *a_value) ;

enum CRStatus
cr_statement_ruleset_append_decl (CRStatement *a_this,
				  CRDeclaration *a_decl) ;

enum CRStatus
cr_statement_at_import_rule_set_imported_sheet (CRStatement *a_this,
                                                CRStyleSheet *a_sheet) ;

enum CRStatus
cr_statement_at_import_rule_get_imported_sheet (CRStatement *a_this,
                                                CRStyleSheet **a_sheet) ;

enum CRStatus
cr_statement_at_import_rule_set_url (CRStatement *a_this,
				     CRString *a_url) ;

enum CRStatus
cr_statement_at_import_rule_get_url (CRStatement const *a_this,
				     CRString **a_url) ;

gint
cr_statement_at_media_nr_rules (CRStatement const *a_this) ;

CRStatement *
cr_statement_at_media_get_from_list (CRStatement *a_this, int itemnr) ;

enum CRStatus
cr_statement_at_page_rule_set_sel (CRStatement *a_this,
				   CRSelector *a_sel) ;

enum CRStatus
cr_statement_at_page_rule_get_sel (CRStatement const *a_this,
				   CRSelector **a_sel) ;

enum CRStatus
cr_statement_at_page_rule_set_declarations (CRStatement *a_this,
					    CRDeclaration *a_decl_list) ;

enum CRStatus
cr_statement_at_page_rule_get_declarations (CRStatement *a_this,
					    CRDeclaration **a_decl_list) ;

enum CRStatus
cr_statement_at_charset_rule_set_charset (CRStatement *a_this,
					  CRString *a_charset) ;

enum CRStatus
cr_statement_at_charset_rule_get_charset (CRStatement const *a_this,
					  CRString **a_charset) ;

enum CRStatus
cr_statement_at_font_face_rule_set_decls (CRStatement *a_this,
					  CRDeclaration *a_decls) ;

enum CRStatus
cr_statement_at_font_face_rule_get_decls (CRStatement *a_this,
					  CRDeclaration **a_decls) ;

enum CRStatus
cr_statement_at_font_face_rule_add_decl (CRStatement *a_this,
					 CRString *a_prop,
					 CRTerm *a_value) ;

gchar *
cr_statement_to_string (CRStatement const * a_this, gulong a_indent) ;

gchar*
cr_statement_list_to_string (CRStatement const *a_this, gulong a_indent) ;

void
cr_statement_dump (CRStatement const *a_this, FILE *a_fp, gulong a_indent) ;

void
cr_statement_dump_ruleset (CRStatement const * a_this, FILE * a_fp,
                           glong a_indent) ;

void
cr_statement_dump_font_face_rule (CRStatement const * a_this,
                                  FILE * a_fp,
                                  glong a_indent) ;

void
cr_statement_dump_page (CRStatement const * a_this, FILE * a_fp,
                        gulong a_indent) ;


void
cr_statement_dump_media_rule (CRStatement const * a_this,
                              FILE * a_fp,
                              gulong a_indent) ;

void
cr_statement_dump_import_rule (CRStatement const * a_this, FILE * a_fp,
                               gulong a_indent) ; 
void
cr_statement_dump_charset (CRStatement const * a_this, FILE * a_fp,
                           gulong a_indent) ;
gint
cr_statement_nr_rules (CRStatement const *a_this) ;

CRStatement *
cr_statement_get_from_list (CRStatement *a_this, int itemnr) ;

void
cr_statement_destroy (CRStatement *a_this) ;

G_END_DECLS

#endif /*__CR_STATEMENT_H__*/
