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
 * Look at file COPYRIGHTS for copyright information
 */

#ifndef __CR_DEFS_H__
#define __CR_DEFS_H__

#include <stdio.h>
#include <glib.h>
#include "libcroco-config.h"

G_BEGIN_DECLS

/**
 *@file
 *The Croco library basic types definitions
 *And global definitions.
 */

/**
 *The status type returned
 *by the methods of the croco library.
 */
enum CRStatus {
        CR_OK,
        CR_BAD_PARAM_ERROR,
        CR_INSTANCIATION_FAILED_ERROR,
        CR_UNKNOWN_TYPE_ERROR,
        CR_UNKNOWN_PROP_ERROR,
        CR_UNKNOWN_PROP_VAL_ERROR,
        CR_UNEXPECTED_POSITION_SCHEME,
        CR_START_OF_INPUT_ERROR,
        CR_END_OF_INPUT_ERROR,
        CR_OUTPUT_TOO_SHORT_ERROR,
        CR_INPUT_TOO_SHORT_ERROR,
        CR_OUT_OF_BOUNDS_ERROR,
        CR_EMPTY_PARSER_INPUT_ERROR,
        CR_ENCODING_ERROR,
        CR_ENCODING_NOT_FOUND_ERROR,
        CR_PARSING_ERROR,
        CR_SYNTAX_ERROR,
        CR_NO_ROOT_NODE_ERROR,
        CR_NO_TOKEN,
        CR_OUT_OF_MEMORY_ERROR,
        CR_PSEUDO_CLASS_SEL_HANDLER_NOT_FOUND_ERROR,
        CR_BAD_PSEUDO_CLASS_SEL_HANDLER_ERROR,
        CR_ERROR,
        CR_FILE_NOT_FOUND_ERROR,
        CR_VALUE_NOT_FOUND_ERROR
} ;

/**
 *Values used by
 *cr_input_seek_position() ;
 */
enum CRSeekPos {
        CR_SEEK_CUR,
        CR_SEEK_BEGIN,
        CR_SEEK_END
} ;

/**
 *Encoding values.
 */
enum CREncoding 
{
        CR_UCS_4 = 1/*Must be not NULL*/,
        CR_UCS_1,
        CR_ISO_8859_1,
        CR_ASCII,
        CR_UTF_8,
        CR_UTF_16,
        CR_AUTO/*should be the last one*/
} ;




#define CROCO_LOG_DOMAIN "LIBCROCO"

#ifdef __GNUC__
#define cr_utils_trace(a_log_level, a_msg) \
g_log (CROCO_LOG_DOMAIN, \
       G_LOG_LEVEL_CRITICAL, \
       "file %s: line %d (%s): %s\n", \
       __FILE__, \
       __LINE__, \
       __PRETTY_FUNCTION__, \
	a_msg)
#else /*__GNUC__*/

#define cr_utils_trace(a_log_level, a_msg) \
g_log (CROCO_LOG_DOMAIN, \
       G_LOG_LEVEL_CRITICAL, \
       "file %s: line %d: %s\n", \
       __FILE__, \
       __LINE__, \
       a_msg)
#endif

/**
 *Traces an info message.
 *The file, line and enclosing function
 *of the message will be automatically 
 *added to the message.
 *@param a_msg the msg to trace.
 */
#define cr_utils_trace_info(a_msg) \
cr_utils_trace (G_LOG_LEVEL_INFO, a_msg)

/**
 *Trace a debug message.
 *The file, line and enclosing function
 *of the message will be automatically
 *added to the message.
 *@param a_msg the msg to trace.
 */
#define cr_utils_trace_debug(a_msg) \
cr_utils_trace (G_LOG_LEVEL_DEBUG, a_msg) ;


/****************************
 *Encoding transformations and
 *encoding helpers
 ****************************/

enum CRStatus
cr_utils_read_char_from_utf8_buf (const guchar * a_in, gulong a_in_len,
                                  guint32 *a_out, gulong *a_consumed) ;

enum CRStatus
cr_utils_ucs1_to_utf8 (const guchar *a_in, gulong *a_in_len,
                       guchar *a_out, gulong *a_out_len) ;

enum CRStatus
cr_utils_utf8_to_ucs1 (const guchar * a_in, gulong * a_in_len,
                       guchar *a_out, gulong *a_out_len) ;

enum CRStatus
cr_utils_ucs4_to_utf8 (const guint32 *a_in, gulong *a_in_len,
                       guchar *a_out, gulong *a_out_len) ;

enum CRStatus
cr_utils_utf8_str_len_as_ucs4 (const guchar *a_in_start,
                               const guchar *a_in_end,
                               gulong *a_len) ;
enum CRStatus
cr_utils_ucs1_str_len_as_utf8 (const guchar *a_in_start, 
                               const guchar *a_in_end,
                               gulong *a_len) ;
enum CRStatus
cr_utils_utf8_str_len_as_ucs1 (const guchar *a_in_start,
                               const guchar *a_in_end,
                               gulong *a_len) ;
enum CRStatus
cr_utils_ucs4_str_len_as_utf8 (const guint32 *a_in_start, 
                               const guint32 *a_in_end,
                               gulong *a_len) ;

enum CRStatus
cr_utils_ucs1_str_to_utf8 (const guchar *a_in_start, 
                           gulong *a_in_len,
                           guchar **a_out, 
                           gulong *a_len) ;

enum CRStatus
cr_utils_utf8_str_to_ucs1 (const guchar * a_in_start, 
                           gulong * a_in_len,
                           guchar **a_out, 
                           gulong *a_out_len) ;

enum CRStatus
cr_utils_utf8_to_ucs4 (const guchar * a_in, 
                       gulong * a_in_len,
                       guint32 *a_out, gulong *a_out_len) ;

enum CRStatus
cr_utils_ucs4_str_to_utf8 (const guint32 *a_in, 
                           gulong *a_in_len,
                           guchar **a_out, gulong *a_out_len) ;

enum CRStatus
cr_utils_utf8_str_to_ucs4 (const guchar * a_in, 
                           gulong *a_in_len,
                           guint32 **a_out, 
                           gulong *a_out_len) ;


/*****************************************
 *CSS basic types identification utilities
 *****************************************/

gboolean
cr_utils_is_newline (guint32 a_char) ;

gboolean
cr_utils_is_white_space (guint32 a_char) ;

gboolean
cr_utils_is_nonascii (guint32 a_char) ;

gboolean
cr_utils_is_hexa_char (guint32 a_char) ;


/**********************************
 *Miscellaneous utility functions
 ***********************************/

void
cr_utils_dump_n_chars (guchar a_char, 
                       FILE *a_fp, 
                       glong a_nb) ;

void
cr_utils_dump_n_chars2 (guchar a_char, 
                        GString *a_string,
                        glong a_nb) ;
GList *
cr_utils_dup_glist_of_string (GList const *a_list) ;

GList *
cr_utils_dup_glist_of_cr_string (GList const * a_list_of_strings) ;

G_END_DECLS

#endif /*__CR_DEFS_H__*/
