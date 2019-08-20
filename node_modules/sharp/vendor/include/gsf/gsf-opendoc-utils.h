/*
 * gsf-opendoc-utils.h:  Handle the application neutral portions of OpenDocument
 *
 * Author:  Luciano Wolf (luciano.wolf@indt.org.br)
 *
 * Copyright (C) 2005-2006 INdT - Instituto Nokia de Tecnologia
 * http://www.indt.org.br
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

#ifndef GSF_OPENDOC_UTILS_H
#define GSF_OPENDOC_UTILS_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-libxml.h>

G_BEGIN_DECLS

/****************************************************************************/

typedef struct {
	GsfXMLOutClass base;

	/*< private >*/
	/* Padding for future expansion */
	void (*_gsf_reserved1) (void);
	void (*_gsf_reserved2) (void);
	void (*_gsf_reserved3) (void);
	void (*_gsf_reserved4) (void);
} GsfODFOutClass;

typedef struct _GsfODFOut GsfODFOut;
struct _GsfODFOut {
	GsfXMLOut base;
	/*< private >*/
	struct _GsfODFOutPrivate *priv;
};

#define GSF_ODF_OUT_TYPE	(gsf_odf_out_get_type ())
#define GSF_ODF_OUT(o)		(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_ODF_OUT_TYPE, GsfODFOut))
#define GSF_IS_ODF_OUT(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_ODF_OUT_TYPE))

GType gsf_odf_out_get_type      (void);

int gsf_odf_out_get_version     (GsfODFOut *oout);
char *gsf_odf_out_get_version_string (GsfODFOut *oout);

/****************************************************************************/

enum {
	OO_NS_OFFICE,
	OO_NS_STYLE,
	OO_NS_TEXT,
	OO_NS_TABLE,
	OO_NS_DRAW,
	OO_NS_NUMBER,
	OO_NS_CHART,
	OO_NS_DR3D,
	OO_NS_FORM,
	OO_NS_SCRIPT,
	OO_NS_CONFIG,
	OO_NS_MATH,
	OO_NS_FO,
	OO_NS_DC,
	OO_NS_META,
	OO_NS_XLINK,
	OO_NS_SVG,

	/* new in 2.0 */
	OO_NS_OOO,
	OO_NS_OOOW,
	OO_NS_OOOC,
	OO_NS_DOM,
	OO_NS_XFORMS,
	OO_NS_XSD,
	OO_NS_XSI,

	OO_NS_PRESENT,	/* added in gsf-1.14.8 */

	/* new in 3.0 */
	OO_NS_RPT,
	OO_NS_OF,
	OO_NS_RDFA,
	OO_NS_FIELD,
	OO_NS_FORMX,

	/* Other OpenDocument 1.1 */
	OO_NS_ANIM,
	OO_NS_DATASTYLE,
	OO_NS_MANIFEST,
	OO_NS_SMIL,

	/* Symphony 1.3 */
	OO_LOTUS_NS_PRODTOOLS,

	/* KOffice 1.6.3 */
	OO_KDE_NS_KOFFICE,

	/*CleverAge ODF Add-in for Microsoft Office 3.0.5224.0 (11.0.8302)*/
	OO_CLEVERAGE_NS_DC,

	/* Microsoft Excel Formulas */
	OO_MS_NS_MSOXL,

	/* Gnumeric ODF extensions */
	OO_GNUM_NS_EXT,

	/* New in ODF 3.2 */
	OO_NS_GRDDL,
	OO_NS_XHTML,
	OO_NS_TABLE_OOO,

	/* New in ODF 3.3 */
	OO_NS_CHART_OOO,

	/* New in LOCALC */
	OO_NS_LOCALC_EXT,
	OO_NS_LOCALC_EXT2
};

GsfXMLInNS const *gsf_odf_get_ns (void);
char const *gsf_odf_get_version_string (void);
short gsf_odf_get_version (void);

GError	*gsf_doc_meta_data_read_from_odf (GsfDocMetaData *md, GsfInput *input);
void	 gsf_doc_meta_data_odf_subtree   (GsfDocMetaData *md, GsfXMLIn *doc);
gboolean gsf_doc_meta_data_write_to_odf  (GsfDocMetaData const *md, gpointer output);


/* For 1.15.x s/opendoc/odf/ and s/ooo/odf/ */
#ifndef GSF_DISABLE_DEPRECATED
extern GsfXMLInNS gsf_ooo_ns[]; /* use get_gsf_ooo_ns instead */
GSF_DEPRECATED_FOR (gsf_odf_get_ns)
GsfXMLInNS *get_gsf_ooo_ns (void);
GSF_DEPRECATED_FOR (gsf_odf_get_version_string)
char const *get_gsf_odf_version_string (void);
GSF_DEPRECATED_FOR (gsf_odf_get_version)
short get_gsf_odf_version (void);
GSF_DEPRECATED_FOR (gsf_doc_meta_data_read_from_odf)
GError	*gsf_opendoc_metadata_read    (GsfInput *input, GsfDocMetaData *md);
GSF_DEPRECATED_FOR (gsf_doc_meta_data_odf_subtree)
void	 gsf_opendoc_metadata_subtree (GsfXMLIn *doc,   GsfDocMetaData *md);
GSF_DEPRECATED_FOR (gsf_doc_meta_data_write_to_odf)
gboolean gsf_opendoc_metadata_write   (gpointer output, GsfDocMetaData const *md);
#endif

G_END_DECLS

#endif /* GSF_OPENDOC_UTILS_H */
