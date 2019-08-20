/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-outfile-stdio.h: write a directory tree
 *
 * Copyright (C) 2004-2006 Novell, Inc.
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

#ifndef GSF_OUTFILE_STDIO_H
#define GSF_OUTFILE_STDIO_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-outfile.h>

G_BEGIN_DECLS

typedef struct _GsfOutfileStdio GsfOutfileStdio;

#define GSF_OUTFILE_STDIO_TYPE	(gsf_outfile_stdio_get_type ())
#define GSF_OUTFILE_STDIO(o)	(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_OUTFILE_STDIO_TYPE, GsfOutfileStdio))
#define GSF_IS_OUTFILE_STDIO(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_OUTFILE_STDIO_TYPE))

GType gsf_outfile_stdio_get_type      (void);
/* void  gsf_outfile_stdio_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfOutfile *gsf_outfile_stdio_new	 (char const *root, GError **err);
GsfOutfile *gsf_outfile_stdio_new_full	 (char const *root, GError **err,
					  char const *first_property_name,
					  ...); /* G_GNUC_NULL_TERMINATED */
GsfOutfile *gsf_outfile_stdio_new_valist (char const *root, GError **err,
					  char const *first_property_name,
					  va_list     var_args);

G_END_DECLS

#endif /* GSF_OUTFILE_H */
