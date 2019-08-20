/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-docprop-vectors.h: A type implementing OLE Document Property vectors
 *
 * Copyright (C) 2004-2006 Frank Chiulli (fc-linux@cox.net)
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

#ifndef GSF_DOCPROP_VECTOR_H
#define GSF_DOCPROP_VECTOR_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_DOCPROP_VECTOR_TYPE	 (gsf_docprop_vector_get_type ())
#define GSF_DOCPROP_VECTOR(o)	 (G_TYPE_CHECK_INSTANCE_CAST((o), GSF_DOCPROP_VECTOR, GsfDocPropVector))
#define IS_GSF_DOCPROP_VECTOR(o) (G_TYPE_CHECK_INSTANCE_TYPE((o), GSF_DOCPROP_VECTOR_TYPE))

typedef struct _GsfDocPropVector      GsfDocPropVector;
GType gsf_docprop_vector_get_type	(void);
/* void  gsf_docprop_vector_register_type	(GTypeModule *module); glib dynamic types are not thread safe */

GsfDocPropVector *gsf_docprop_vector_new	(void);
void		  gsf_docprop_vector_append	(GsfDocPropVector *vector, GValue *value);
gchar		 *gsf_docprop_vector_as_string	(GsfDocPropVector const *vector);

#define VAL_IS_GSF_DOCPROP_VECTOR(v) (G_TYPE_CHECK_VALUE_TYPE((v), GSF_DOCPROP_VECTOR_TYPE))
GsfDocPropVector *gsf_value_get_docprop_vector	(GValue const *value);
GValueArray	 *gsf_value_get_docprop_varray	(GValue const *value);

G_END_DECLS

#endif /* GSF_DOCPROP_VECTOR_H */
