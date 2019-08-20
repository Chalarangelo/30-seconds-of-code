/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-msole-utils.h: various tools for handling MS OLE files
 *
 * Copyright (C) 2002-2006 Jody Goldberg (jody@gnome.org)
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
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */

#ifndef GSF_MSOLE_UTILS_H
#define GSF_MSOLE_UTILS_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

GError *gsf_doc_meta_data_read_from_msole (GsfDocMetaData *accum,
					   GsfInput *in);
gboolean gsf_doc_meta_data_write_to_msole (GsfDocMetaData const *meta_data,
                                           GsfOutput *out,
					   gboolean doc_not_component);

#ifndef GSF_DISABLE_DEPRECATED
GSF_DEPRECATED_FOR (gsf_doc_meta_data_read_from_msole)
GError	   *gsf_msole_metadata_read	  (GsfInput *in,
					   GsfDocMetaData *accum);
GSF_DEPRECATED_FOR (gsf_doc_meta_data_write_to_msole)
gboolean    gsf_msole_metadata_write	  (GsfOutput *out,
					   GsfDocMetaData const *meta_data,
					   gboolean doc_not_component);
#endif

guint	    gsf_msole_lid_for_language	  (char const *lang);
guint	    gsf_msole_codepage_to_lid	  (int codepage);
int	    gsf_msole_lid_to_codepage	  (guint lid);
gchar	   *gsf_msole_lid_to_codepage_str (guint lid);
char const *gsf_msole_language_for_lid	  (guint lid);

int	    gsf_msole_iconv_win_codepage    (void) ;
GIConv	    gsf_msole_iconv_open_for_import (int codepage) ;
GIConv	    gsf_msole_iconv_open_for_export (void) ;

GIConv	    gsf_msole_iconv_open_codepage_for_import  (char const *to, int codepage);
GIConv	    gsf_msole_iconv_open_codepages_for_export (int codepage_to, char const *from);
GIConv	    gsf_msole_iconv_open_codepage_for_export  (int codepage_to);

GByteArray *gsf_msole_inflate (GsfInput *input, gsf_off_t offset);

typedef struct GsfMSOleSortingKey_ GsfMSOleSortingKey;
GType gsf_msole_sorting_key_get_type (void);
GsfMSOleSortingKey *gsf_msole_sorting_key_new (const char *name);
void gsf_msole_sorting_key_free (GsfMSOleSortingKey *sk);
int gsf_msole_sorting_key_cmp (const GsfMSOleSortingKey *a,
			       const GsfMSOleSortingKey *b);

G_END_DECLS

#endif /* GSF_MSOLE_UTILS_H */
