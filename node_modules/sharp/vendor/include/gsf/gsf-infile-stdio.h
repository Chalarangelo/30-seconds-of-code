/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-infile-stdio.h:
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

#ifndef GSF_INFILE_STDIO_H
#define GSF_INFILE_STDIO_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-infile.h>

G_BEGIN_DECLS

typedef struct _GsfInfileStdio GsfInfileStdio;

#define GSF_INFILE_STDIO_TYPE        (gsf_infile_stdio_get_type ())
#define GSF_INFILE_STDIO(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_INFILE_STDIO_TYPE, GsfInfileStdio))
#define GSF_IS_INFILE_STDIO(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_INFILE_STDIO_TYPE))

GType gsf_infile_stdio_get_type      (void);
/* void  gsf_infile_stdio_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfInfile *gsf_infile_stdio_new      (char const *root, GError **err);

G_END_DECLS

#endif /* GSF_INFILE_STDIO_H */
