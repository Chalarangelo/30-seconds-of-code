/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-output-impl.h: interface for storing data
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

#ifndef GSF_OUTPUT_IMPL_H
#define GSF_OUTPUT_IMPL_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

/* protected */
gboolean gsf_output_set_name	  (GsfOutput *output, char const *name);
gboolean gsf_output_set_name_from_filename (GsfOutput *output, char const *filename);
gboolean gsf_output_set_container (GsfOutput *output, GsfOutfile *container);
gboolean gsf_output_set_modtime   (GsfOutput *output, GDateTime *modtime);

G_END_DECLS

#endif /* GSF_OUTPUT_IMPL_H */
