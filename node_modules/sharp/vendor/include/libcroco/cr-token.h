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

#ifndef __CR_TOKEN_H__
#define __CR_TOKEN_H__

#include "cr-utils.h"
#include "cr-input.h"
#include "cr-num.h"
#include "cr-rgb.h"
#include "cr-string.h"
#include "cr-parsing-location.h"

G_BEGIN_DECLS

enum CRTokenType
{
        NO_TK,
        S_TK,
        CDO_TK,
        CDC_TK,
        INCLUDES_TK,
        DASHMATCH_TK,
        COMMENT_TK,
        STRING_TK,
        IDENT_TK,
        HASH_TK,
        IMPORT_SYM_TK,
        PAGE_SYM_TK,
        MEDIA_SYM_TK,
        FONT_FACE_SYM_TK,
        CHARSET_SYM_TK,
        ATKEYWORD_TK,
        IMPORTANT_SYM_TK,
        EMS_TK,
        EXS_TK,
        LENGTH_TK,
        ANGLE_TK,
        TIME_TK,
        FREQ_TK,
        DIMEN_TK,
        PERCENTAGE_TK,
        NUMBER_TK,
        RGB_TK,
        URI_TK,
        FUNCTION_TK,
        UNICODERANGE_TK,
        SEMICOLON_TK,
        CBO_TK, /*opening curly bracket*/
        CBC_TK, /*closing curly bracket*/
        PO_TK, /*opening parenthesis*/
        PC_TK, /*closing parenthesis*/
        BO_TK, /*opening bracket*/
        BC_TK, /*closing bracket*/
        DELIM_TK
} ;

enum CRTokenExtraType
{
        NO_ET = 0,
        LENGTH_PX_ET,
        LENGTH_CM_ET,
        LENGTH_MM_ET,
        LENGTH_IN_ET,
        LENGTH_PT_ET,
        LENGTH_PC_ET,
        ANGLE_DEG_ET,
        ANGLE_RAD_ET,
        ANGLE_GRAD_ET,
        TIME_MS_ET,
        TIME_S_ET,
        FREQ_HZ_ET,
        FREQ_KHZ_ET
} ;
 
typedef struct _CRToken CRToken ;

/**
 *This class abstracts a css2 token.
 */
struct _CRToken
{
        enum CRTokenType type ;
        enum CRTokenExtraType extra_type ;
        CRInputPos pos ;

        union
        {
                CRString *str ;
                CRRgb *rgb ;
                CRNum *num ;
                guint32 unichar ;
        } u ;

        CRString * dimen ;
        CRParsingLocation location ;
} ;

CRToken* cr_token_new (void) ;

enum CRStatus cr_token_set_s (CRToken *a_this) ;

enum CRStatus cr_token_set_cdo (CRToken *a_this) ;

enum CRStatus cr_token_set_cdc (CRToken *a_this) ;

enum CRStatus cr_token_set_includes (CRToken *a_this) ;

enum CRStatus cr_token_set_dashmatch (CRToken *a_this) ;

enum CRStatus cr_token_set_comment (CRToken *a_this, CRString *a_str) ;

enum CRStatus cr_token_set_string (CRToken *a_this, CRString *a_str) ;

enum CRStatus cr_token_set_ident (CRToken *a_this, CRString * a_ident) ;

enum CRStatus cr_token_set_hash (CRToken *a_this, CRString *a_hash) ;

enum CRStatus cr_token_set_rgb (CRToken *a_this, CRRgb *a_rgb) ;
        
enum CRStatus cr_token_set_import_sym (CRToken *a_this) ;
        
enum CRStatus cr_token_set_page_sym (CRToken *a_this) ;
        
enum CRStatus cr_token_set_media_sym (CRToken *a_this) ;
        
enum CRStatus cr_token_set_font_face_sym (CRToken *a_this) ;
        
enum CRStatus cr_token_set_charset_sym (CRToken *a_this) ;
        
enum CRStatus cr_token_set_atkeyword (CRToken *a_this, CRString *a_atname) ;
        
enum CRStatus cr_token_set_important_sym (CRToken *a_this) ;
        
enum CRStatus cr_token_set_ems (CRToken *a_this, CRNum *a_num) ;
        
enum CRStatus cr_token_set_exs (CRToken *a_this, CRNum *a_num) ;
        
enum CRStatus cr_token_set_length (CRToken *a_this, CRNum *a_num,
                                   enum CRTokenExtraType a_et) ;
        
enum CRStatus cr_token_set_angle (CRToken *a_this, CRNum *a_num,
                                  enum CRTokenExtraType a_et) ;
        
enum CRStatus cr_token_set_time (CRToken *a_this, CRNum *a_num,
                                 enum CRTokenExtraType a_et) ;
        
enum CRStatus cr_token_set_freq (CRToken *a_this, CRNum *a_num,
                                 enum CRTokenExtraType a_et) ;

enum CRStatus cr_token_set_dimen (CRToken *a_this, CRNum *a_num,
                                  CRString *a_dim) ;
        
enum CRStatus cr_token_set_percentage (CRToken *a_this, CRNum *a_num) ;
        
enum CRStatus cr_token_set_number (CRToken *a_this, CRNum *a_num) ;
        
enum CRStatus cr_token_set_uri (CRToken *a_this, CRString *a_uri) ;
        
enum CRStatus cr_token_set_function (CRToken *a_this, 
                                     CRString *a_fun_name) ;
        
enum CRStatus cr_token_set_bc (CRToken *a_this) ;
        
enum CRStatus cr_token_set_bo (CRToken *a_this) ;
        
enum CRStatus cr_token_set_po (CRToken *a_this) ;

enum CRStatus cr_token_set_pc (CRToken *a_this) ;

enum CRStatus cr_token_set_cbc (CRToken *a_this) ;

enum CRStatus cr_token_set_cbo (CRToken *a_this) ;

enum CRStatus cr_token_set_semicolon (CRToken *a_this) ;

enum CRStatus cr_token_set_delim (CRToken *a_this, guint32 a_char) ;

        
/*
  enum CRStatus
  cr_token_set_unicoderange (CRToken *a_this, 
  CRUnicodeRange *a_range) ;
*/

void
cr_token_destroy (CRToken *a_this) ;
        
	
G_END_DECLS

#endif /*__CR_TOKEN_H__*/
