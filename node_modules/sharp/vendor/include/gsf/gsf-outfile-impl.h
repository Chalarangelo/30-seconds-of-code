/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-outfile-impl.h:
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

#ifndef GSF_OUTFILE_IMPL_H
#define GSF_OUTFILE_IMPL_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

struct _GsfOutfile {
	GsfOutput parent;
};

typedef struct {
	GsfOutputClass output_class;
	GsfOutput   *(*new_child) (GsfOutfile *outfile,
				   char const *name, gboolean is_dir,
				   char const *first_property_name,
				   va_list args);
} GsfOutfileClass;

#define GSF_OUTFILE_CLASS(k)    (G_TYPE_CHECK_CLASS_CAST ((k), GSF_OUTFILE_TYPE, GsfOutfileClass))
#define GSF_IS_OUTFILE_CLASS(k) (G_TYPE_CHECK_CLASS_TYPE ((k), GSF_OUTFILE_TYPE))

G_END_DECLS

#endif /* GSF_OUTFILE_IMPL_H */
