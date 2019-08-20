/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-infile-msvba.h:
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

#ifndef GSF_INFILE_MSVBA_H
#define GSF_INFILE_MSVBA_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-infile.h>

G_BEGIN_DECLS

typedef struct _GsfInfileMSVBA GsfInfileMSVBA;

#define GSF_INFILE_MSVBA_TYPE        (gsf_infile_msvba_get_type ())
#define GSF_INFILE_MSVBA(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_INFILE_MSVBA_TYPE, GsfInfileMSVBA))
#define GSF_IS_INFILE_MSVBA(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_INFILE_MSVBA_TYPE))

GType gsf_infile_msvba_get_type      (void);
/* void  gsf_infile_msvba_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfInfile  *gsf_infile_msvba_new (GsfInfile *source, GError **err);
GHashTable *gsf_infile_msvba_get_modules   (GsfInfileMSVBA const *vba_stream);
GHashTable *gsf_infile_msvba_steal_modules (GsfInfileMSVBA       *vba_stream);
guint8 *gsf_vba_inflate (GsfInput *input, gsf_off_t offset, int *size, gboolean add_null_terminator);

/* Utility */
GsfInfileMSVBA *gsf_input_find_vba (GsfInput *input, GError **err);

G_END_DECLS

#endif /* GSF_INFILE_MSVBA_H */
