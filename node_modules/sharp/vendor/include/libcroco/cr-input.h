/* -*- Mode: C; indent-tabs-mode:nil; c-basic-offset:8 -*- */

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
 * See the COPYRIGHTS file for copyrights information.
 */

#ifndef __CR_INPUT_SRC_H__
#define __CR_INPUT_SRC_H__


#include <glib.h>
#include "cr-utils.h"
#include "cr-parsing-location.h"

G_BEGIN_DECLS

/**
 *@file
 *The libcroco basic input stream class
 *declaration file.
 */

typedef struct _CRInput CRInput ;
typedef struct _CRInputPriv CRInputPriv ;

/**
 *The #CRInput class provides the abstraction of 
 *an utf8-encoded character stream.
 */
struct _CRInput 
{
        CRInputPriv *priv ;
} ;

typedef struct _CRInputPos CRInputPos ;

struct _CRInputPos
{
        glong line ;
        glong col ;
        gboolean end_of_file ;
        gboolean end_of_line ;
        glong next_byte_index ;
} ;

CRInput *
cr_input_new_from_buf (guchar *a_buf, gulong a_len,
                       enum CREncoding a_enc, gboolean a_free_buf) ;
CRInput *
cr_input_new_from_uri (const gchar *a_file_uri, 
                       enum CREncoding a_enc) ;

void
cr_input_destroy (CRInput *a_this) ;

void 
cr_input_ref (CRInput *a_this) ;

gboolean
cr_input_unref (CRInput *a_this) ;

enum CRStatus
cr_input_read_byte (CRInput *a_this, guchar *a_byte) ;

enum CRStatus
cr_input_read_char (CRInput *a_this, guint32 *a_char) ;

enum CRStatus
cr_input_consume_chars (CRInput *a_this, guint32 a_char, 
                        gulong *a_nb_char) ;

enum CRStatus
cr_input_consume_char (CRInput *a_this, guint32 a_char) ;

enum CRStatus
cr_input_consume_white_spaces (CRInput *a_this, gulong *a_nb_chars) ;

enum CRStatus
cr_input_peek_byte (CRInput const *a_this, enum CRSeekPos a_origin,
                    gulong a_offset, guchar *a_byte) ;

guchar 
cr_input_peek_byte2 (CRInput const *a_this, gulong a_offset,
                     gboolean *a_eof) ;

enum CRStatus
cr_input_peek_char (CRInput const *a_this, guint32 *a_char) ;

guchar *
cr_input_get_byte_addr (CRInput *a_this, 
                        gulong a_offset) ;

enum CRStatus
cr_input_get_cur_byte_addr (CRInput *a_this, guchar ** a_offset) ;

enum CRStatus
cr_input_seek_index (CRInput *a_this, 
                     enum CRSeekPos a_origin, gint a_pos) ;

enum CRStatus
cr_input_get_cur_index (CRInput const *a_this, glong *a_index) ;

enum CRStatus
cr_input_set_cur_index (CRInput *a_this, glong a_index) ;

enum CRStatus
cr_input_get_cur_pos (CRInput const *a_this, CRInputPos * a_pos) ;

enum CRStatus
cr_input_set_cur_pos (CRInput *a_this, CRInputPos const *a_pos) ;

enum CRStatus
cr_input_get_parsing_location (CRInput const *a_this,
                               CRParsingLocation *a_loc) ;

enum CRStatus
cr_input_get_end_of_line (CRInput const *a_this, gboolean *a_eol) ;

enum CRStatus
cr_input_set_end_of_line (CRInput *a_this, gboolean a_eol) ;

enum CRStatus
cr_input_get_end_of_file (CRInput const *a_this, gboolean *a_eof) ;

enum CRStatus
cr_input_set_end_of_file (CRInput *a_this, gboolean a_eof) ;

enum CRStatus
cr_input_set_line_num (CRInput *a_this, glong a_line_num) ;

enum CRStatus
cr_input_get_line_num (CRInput const *a_this, glong *a_line_num) ;

enum CRStatus
cr_input_set_column_num (CRInput *a_this, glong a_col) ;

enum CRStatus
cr_input_get_column_num (CRInput const *a_this, glong *a_col) ;

enum CRStatus
cr_input_increment_line_num (CRInput *a_this, 
                             glong a_increment) ;

enum CRStatus
cr_input_increment_col_num (CRInput *a_this,
                            glong a_increment) ;
        
glong
cr_input_get_nb_bytes_left (CRInput const *a_this) ;

enum CRStatus
cr_input_end_of_input (CRInput const *a_this, gboolean *a_end_of_input) ;

G_END_DECLS

#endif /*__CR_INPUT_SRC_H__*/

