/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-doc-meta-data.h: get, set, remove custom meta properties associated with documents
 *
 * Copyright (C) 2002-2006 Dom Lachowicz (cinamod@hotmail.com)
 * 			   Jody Goldberg (jody@gnome.org)
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

#ifndef GSF_DOC_META_DATA_H
#define GSF_DOC_META_DATA_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_DOC_META_DATA_TYPE  (gsf_doc_meta_data_get_type ())
#define GSF_DOC_META_DATA(o)    (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_DOC_META_DATA_TYPE, GsfDocMetaData))
#define IS_GSF_DOC_META_DATA(o) (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_DOC_META_DATA_TYPE))

GType gsf_doc_meta_data_get_type      (void);
/* void  gsf_doc_meta_data_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfDocMetaData *gsf_doc_meta_data_new	  (void);
GsfDocProp     *gsf_doc_meta_data_lookup  (GsfDocMetaData const *meta,
					   char const *name);
void		gsf_doc_meta_data_insert  (GsfDocMetaData *meta,
					   char *name, GValue *value);
void		gsf_doc_meta_data_remove  (GsfDocMetaData *meta,
					   char const *name);
GsfDocProp     *gsf_doc_meta_data_steal   (GsfDocMetaData *meta,
					   char const *name);
void		gsf_doc_meta_data_store   (GsfDocMetaData *meta,
					   GsfDocProp     *prop);
void		gsf_doc_meta_data_foreach (GsfDocMetaData const *meta,
					   GHFunc func, gpointer user_data);
gsize		gsf_doc_meta_data_size	  (GsfDocMetaData const *meta);
void		gsf_doc_meta_dump	  (GsfDocMetaData const *meta);

GType	      gsf_doc_prop_get_type (void);
GsfDocProp   *gsf_doc_prop_new	    (char *name);
void	      gsf_doc_prop_free	    (GsfDocProp *prop);
char const   *gsf_doc_prop_get_name (GsfDocProp const *prop);
GValue const *gsf_doc_prop_get_val  (GsfDocProp const *prop);
void	      gsf_doc_prop_set_val  (GsfDocProp *prop, GValue *val);
GValue 	     *gsf_doc_prop_swap_val (GsfDocProp *prop, GValue *val);
char const   *gsf_doc_prop_get_link (GsfDocProp const *prop);
void	      gsf_doc_prop_set_link (GsfDocProp *prop, char *link);
void	      gsf_doc_prop_dump	    (GsfDocProp const *prop);

G_END_DECLS

#endif /* GSF_DOC_META_DATA_H */
