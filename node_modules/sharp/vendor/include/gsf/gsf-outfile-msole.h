/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-outfile-msole.h: interface for creating OLE files
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

#ifndef GSF_OUTFILE_MSOLE_H
#define GSF_OUTFILE_MSOLE_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-outfile.h>

G_BEGIN_DECLS

typedef struct _GsfOutfileMSOle GsfOutfileMSOle;

#define GSF_OUTFILE_MSOLE_TYPE	(gsf_outfile_msole_get_type ())
#define GSF_OUTFILE_MSOLE(o)	(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_OUTFILE_MSOLE_TYPE, GsfOutfileMSOle))
#define GSF_IS_OUTFILE_MSOLE(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_OUTFILE_MSOLE_TYPE))

GType gsf_outfile_msole_get_type      (void);
/* void  gsf_outfile_msole_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfOutfile *gsf_outfile_msole_new	   (GsfOutput *sink);
GsfOutfile *gsf_outfile_msole_new_full	   (GsfOutput *sink,
					    guint bb_size, guint sb_size);
gboolean    gsf_outfile_msole_set_class_id (GsfOutfileMSOle *ole,
					    guint8 const *clsid);

G_END_DECLS

#endif /* GSF_OUTFILE_H */
