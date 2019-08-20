/* -*- Mode: C; indent-tabs-mode:nil; c-basic-offset: 8-*- */

/*
 * This file is part of The Croco Library
 *
 * Copyright (C) 2002-2003 Dodji Seketeli <dodji@seketeli.org>
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
 * You should have received a copy of the 
 * GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 */

/*
 *$Id$
 */

#ifndef __CR_OM_PARSER_H__
#define __CR_OM_PARSER_H__

#include "cr-parser.h"
#include "cr-cascade.h"


/**
 *@file
 *The definition of the CSS Object Model Parser.
 *This parser uses (and sits) the SAC api of libcroco defined
 *in cr-parser.h and cr-doc-handler.h
 */

G_BEGIN_DECLS

typedef struct _CROMParser CROMParser ;
typedef struct _CROMParserPriv CROMParserPriv ;

/**
 *The Object model parser.
 *Can parse a css file and build a css object model.
 *This parser uses an instance of #CRParser and defines
 *a set of SAC callbacks to build the Object Model.
 */
struct _CROMParser
{
        CROMParserPriv *priv ;
} ;

CROMParser * cr_om_parser_new (CRInput *a_input) ;


enum CRStatus cr_om_parser_simply_parse_file (const guchar *a_file_path,
                                              enum CREncoding a_enc,
                                              CRStyleSheet **a_result) ;

enum CRStatus cr_om_parser_parse_file (CROMParser *a_this,
                                       const guchar *a_file_uri,
                                       enum CREncoding a_enc,
                                       CRStyleSheet **a_result) ;

enum CRStatus cr_om_parser_simply_parse_buf (const guchar *a_buf,
                                             gulong a_len,
                                             enum CREncoding a_enc,
                                             CRStyleSheet **a_result) ;

enum CRStatus cr_om_parser_parse_buf (CROMParser *a_this,
                                      const guchar *a_buf,
                                      gulong a_len,
                                      enum CREncoding a_enc,
                                      CRStyleSheet **a_result) ;

enum CRStatus cr_om_parser_parse_paths_to_cascade (CROMParser *a_this,
                                                   const guchar *a_author_path,
                                                   const guchar *a_user_path,
                                                   const guchar *a_ua_path,
                                                   enum CREncoding a_encoding,
                                                   CRCascade ** a_result) ;

enum CRStatus cr_om_parser_simply_parse_paths_to_cascade (const guchar *a_author_path,
                                                          const guchar *a_user_path,
                                                          const guchar *a_ua_path,
                                                          enum CREncoding a_encoding,
                                                          CRCascade ** a_result) ;

void cr_om_parser_destroy (CROMParser *a_this) ;

G_END_DECLS

#endif /*__CR_OM_PARSER_H__*/
