/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-infile-impl.h:
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

#ifndef GSF_INFILE_IMPL_H
#define GSF_INFILE_IMPL_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-input-impl.h>
#include <gsf/gsf-infile.h>

G_BEGIN_DECLS

struct _GsfInfile {
	GsfInput parent;
};

typedef struct {
	GsfInputClass input_class;
	int	    (*num_children)   (GsfInfile *infile);
	char const *(*name_by_index)  (GsfInfile *infile, int i);
	GsfInput   *(*child_by_index) (GsfInfile *infile,
				       int i, GError **err);
	GsfInput   *(*child_by_name)  (GsfInfile *infile,
				       char const *name, GError **err);
} GsfInfileClass;

#define GSF_INFILE_CLASS(k)    (G_TYPE_CHECK_CLASS_CAST ((k), GSF_INFILE_TYPE, GsfInfileClass))
#define GSF_IS_INFILE_CLASS(k) (G_TYPE_CHECK_CLASS_TYPE ((k), GSF_INFILE_TYPE))

G_END_DECLS

#endif /* GSF_INFILE_IMPL_H */
