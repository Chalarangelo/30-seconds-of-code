/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-outfile-zip.h: interface for zip archive output.
 *
 * Copyright (C) 2002-2006 Jon K Hellan (hellan@acm.org)
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

#ifndef GSF_OUTFILE_ZIP_H
#define GSF_OUTFILE_ZIP_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-outfile.h>

G_BEGIN_DECLS

typedef enum {
	GSF_ZIP_STORED =          0,		/* supported for export */
	GSF_ZIP_SHRUNK =          1,
	GSF_ZIP_REDUCEDx1 =       2,
	GSF_ZIP_REDUCEDx2 =       3,
	GSF_ZIP_REDUCEDx3 =       4,
	GSF_ZIP_REDUCEDx4 =       5,
	GSF_ZIP_IMPLODED  =       6,
	GSF_ZIP_TOKENIZED =       7,
	GSF_ZIP_DEFLATED =        8,		/* supported for export */
	GSF_ZIP_DEFLATED_BETTER = 9,
	GSF_ZIP_IMPLODED_BETTER = 10
} GsfZipCompressionMethod;

typedef struct _GsfOutfileZip GsfOutfileZip;

#define GSF_OUTFILE_ZIP_TYPE	(gsf_outfile_zip_get_type ())
#define GSF_OUTFILE_ZIP(o)	(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_OUTFILE_ZIP_TYPE, GsfOutfileZip))
#define GSF_IS_OUTFILE_ZIP(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_OUTFILE_ZIP_TYPE))

GType gsf_outfile_zip_get_type	    (void);
/* void  gsf_outfile_zip_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfOutfile *gsf_outfile_zip_new		(GsfOutput *sink, GError **err);

/* Deprecated.  Has no effect.  */
gboolean    gsf_outfile_zip_set_compression_method (GsfOutfileZip *zip,
						    GsfZipCompressionMethod method);

G_END_DECLS

#endif /* GSF_OUTFILE_H */
