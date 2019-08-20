/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-infile.h:
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

#ifndef GSF_INFILE_H
#define GSF_INFILE_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_INFILE_TYPE        (gsf_infile_get_type ())
#define GSF_INFILE(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_INFILE_TYPE, GsfInfile))
#define GSF_IS_INFILE(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_INFILE_TYPE))

GType gsf_infile_get_type      (void);
/* void  gsf_infile_register_type (GTypeModule *module); glib dynamic types are not thread safe */

int	    gsf_infile_num_children    (GsfInfile *infile);
char const *gsf_infile_name_by_index   (GsfInfile *infile, int i);
GsfInput   *gsf_infile_child_by_index  (GsfInfile *infile, int i);
GsfInput   *gsf_infile_child_by_name   (GsfInfile *infile, char const *name);
GsfInput   *gsf_infile_child_by_vname  (GsfInfile *infile, ...);
GsfInput   *gsf_infile_child_by_aname  (GsfInfile *infile, char const *names[]);
GsfInput   *gsf_infile_child_by_vaname (GsfInfile *infile, va_list names);

G_END_DECLS

#endif /* GSF_INFILE_H */
