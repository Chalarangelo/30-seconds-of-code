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
 * See COPYRIGHTS file for coypyright information.
 */

/**
 *@file
 *The declaration of the #CRTknzr (tokenizer)
 *class.
 */

#ifndef __CR_TKNZR_H__
#define __CR_TKNZR_H__

#include "cr-utils.h"
#include "cr-input.h"
#include "cr-token.h"

G_BEGIN_DECLS
	
	
typedef struct _CRTknzr CRTknzr ;
typedef struct _CRTknzrPriv CRTknzrPriv ;

/**
 *The tokenizer is the class that knows
 *about all the css token. Its main job is
 *to return the next token found in the character 
 *input stream.
 */
struct _CRTknzr
{
        /*the private data of the tokenizer.*/
        CRTknzrPriv *priv ;
} ;

CRTknzr * cr_tknzr_new (CRInput *a_input) ;

CRTknzr * cr_tknzr_new_from_uri (const guchar *a_file_uri,
                                 enum CREncoding a_enc) ;

CRTknzr * cr_tknzr_new_from_buf (guchar *a_buf, gulong a_len,
                                 enum CREncoding a_enc,
                                 gboolean a_free_at_destroy) ;

gboolean cr_tknzr_unref (CRTknzr *a_this) ;
        
void cr_tknzr_ref (CRTknzr *a_this) ;

enum CRStatus cr_tknzr_read_byte (CRTknzr *a_this, guchar *a_byte) ;
        
enum CRStatus cr_tknzr_read_char (CRTknzr *a_this, guint32 *a_char);

enum CRStatus cr_tknzr_peek_char (CRTknzr *a_this, guint32 *a_char) ;

enum CRStatus cr_tknzr_peek_byte (CRTknzr *a_this, gulong a_offset, 
                                  guchar *a_byte) ;

guchar cr_tknzr_peek_byte2 (CRTknzr *a_this, gulong a_offset, 
                            gboolean *a_eof) ;

enum CRStatus cr_tknzr_set_cur_pos (CRTknzr *a_this, CRInputPos *a_pos) ;

glong cr_tknzr_get_nb_bytes_left (CRTknzr *a_this) ;

enum CRStatus cr_tknzr_get_cur_pos (CRTknzr *a_this, CRInputPos *a_pos) ;

enum CRStatus cr_tknzr_get_parsing_location (CRTknzr *a_this,
                                             CRParsingLocation *a_loc) ;

enum CRStatus cr_tknzr_seek_index (CRTknzr *a_this,
                                   enum CRSeekPos a_origin,
                                   gint a_pos) ;

enum CRStatus cr_tknzr_get_cur_byte_addr (CRTknzr *a_this, guchar **a_addr) ;


enum CRStatus cr_tknzr_consume_chars (CRTknzr *a_this, guint32 a_char,
                                      glong *a_nb_char) ;

enum CRStatus cr_tknzr_get_next_token (CRTknzr *a_this, CRToken ** a_tk) ;

enum CRStatus cr_tknzr_unget_token (CRTknzr *a_this, CRToken *a_token) ;


enum CRStatus cr_tknzr_parse_token (CRTknzr *a_this, enum CRTokenType a_type,
                                    enum CRTokenExtraType a_et, gpointer a_res,
                                    gpointer a_extra_res) ;
enum CRStatus cr_tknzr_set_input (CRTknzr *a_this, CRInput *a_input) ;

enum CRStatus cr_tknzr_get_input (CRTknzr *a_this, CRInput **a_input) ;

void cr_tknzr_destroy (CRTknzr *a_this) ;
	
G_END_DECLS

#endif /*__CR_TKZNR_H__*/
