/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-structured-blob.h:  Utility storage to blob in/out a tree of data
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

#ifndef GSF_STRUCTURED_BLOB_H
#define GSF_STRUCTURED_BLOB_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_STRUCTURED_BLOB_TYPE        (gsf_structured_blob_get_type ())
#define GSF_STRUCTURED_BLOB(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_STRUCTURED_BLOB_TYPE, GsfStructuredBlob))
#define GSF_IS_STRUCTURED_BLOB(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_STRUCTURED_BLOB_TYPE))

typedef struct _GsfStructuredBlob	GsfStructuredBlob;

/* inherits from GsfInfile */
GType gsf_structured_blob_get_type      (void);
/* void  gsf_structured_blob_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfStructuredBlob *gsf_structured_blob_read  (GsfInput *input);
gboolean	   gsf_structured_blob_write (GsfStructuredBlob *blob,
					      GsfOutfile *container);

G_END_DECLS

#endif /* GSF_STRUCTURED_BLOB_H */
