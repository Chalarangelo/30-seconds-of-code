/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-libxml.h: Utility wrappers for using gsf with libxml
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

#ifndef GSF_LIBXML_H
#define GSF_LIBXML_H

#include <gsf/gsf-fwd.h>
#include <libxml/tree.h>

G_BEGIN_DECLS

/****************************************************************************/
/* GSF wrappers for libxml2 */
xmlParserCtxt *gsf_xml_parser_context (GsfInput   *input);
#if 0
					/* this is cleaner, tack it on for 2.0 */
					xmlSAXHandlerPtr sax, gpointer user);
#endif
int	       gsf_xmlDocFormatDump   (GsfOutput  *output,
				       xmlDoc	  *cur,
				       char const *encoding,
				       gboolean    format);

typedef gboolean (*GsfXMLProbeFunc) (const xmlChar *name,
				     const xmlChar *prefix,
				     const xmlChar *URI,
				     int nb_namespaces,
				     const xmlChar **namespaces,
				     int nb_attributes,
				     int nb_defaulted,
				     const xmlChar **attributes);
gboolean gsf_xml_probe (GsfInput *input,
			GsfXMLProbeFunc func);

/****************************************************************************/
/* Simplified wrapper to SAX based xml import */

/**
 * GsfXMLContent:
 * @GSF_XML_NO_CONTENT: node has no cstr contents
 * @GSF_XML_CONTENT: node has cstr contents
 * @GSF_XML_SHARED_CONTENT: node has contents that is shared with children
 * @GSF_XML_2ND: node is second or later occurrence
 *
 * Controls the handling of character data within a parser node.
 */

typedef enum {
	GSF_XML_NO_CONTENT = FALSE,
	GSF_XML_CONTENT,
	GSF_XML_SHARED_CONTENT,
	GSF_XML_2ND                 /* Second definition */
} GsfXMLContent;
typedef gboolean (*GsfXMLInUnknownFunc) (GsfXMLIn *xin,
					 xmlChar const *elem, xmlChar const **attrs);
typedef void     (*GsfXMLInExtDtor)     (GsfXMLIn *xin, gpointer old_state);

struct _GsfXMLIn {
	/* public state : read only */
	gpointer	    user_state;
	GString		   *content;
	GsfXMLInDoc  const *doc;
	GsfXMLInNode const *node;	/* current node (not on the stack) */
	/*< private >*/
	GSList	 	   *node_stack;	/* stack of GsfXMLInNode */
};

struct _GsfXMLInNode {
	char const *id;		/* unique in the entire tree */
	int	    ns_id;
	char const *name;
	char const *parent_id;
	void (*start) (GsfXMLIn *xin, xmlChar const **attrs);
	void (*end)   (GsfXMLIn *xin, GsfXMLBlob *unknown);

	union {
		int	    v_int;
		gboolean    v_bool;
		gpointer    v_blob;
		char const *v_str;
	} user_data;
	GsfXMLContent has_content;

	unsigned int check_children_for_ns : 1;
	unsigned int share_children_with_parent : 1;
};

struct _GsfXMLInNS {
	char const *uri;
	unsigned    ns_id;
};

#define GSF_XML_IN_NS(id, uri) \
{ uri, id }
#define GSF_XML_IN_NS_END \
{ NULL, 0 }

#define GSF_XML_IN_NODE_FULL(parent_id, id, ns, name, has_content, 	\
			     share_children_with_parent, check_ns, start, end, user)	\
{									\
	#id, ns, name, #parent_id, start, end, { user }, has_content,	\
	check_ns, share_children_with_parent,				\
}

#define GSF_XML_IN_NODE(parent_id, id, ns, name, has_content, start, end) \
	GSF_XML_IN_NODE_FULL(parent_id, id, ns, name, has_content,	  \
			     FALSE, FALSE, start, end, 0)
#define GSF_XML_IN_NODE_END	\
	{ NULL, 0, NULL, NULL, NULL, NULL, { 0 }, GSF_XML_NO_CONTENT, FALSE, FALSE }

GType	     gsf_xml_in_doc_get_type (void);
GsfXMLInDoc *gsf_xml_in_doc_new	   (GsfXMLInNode const *nodes, GsfXMLInNS const *ns);
void	     gsf_xml_in_doc_free   (GsfXMLInDoc *doc);
gboolean     gsf_xml_in_doc_parse  (GsfXMLInDoc *doc, GsfInput *input,
				    gpointer user_state);
void	     gsf_xml_in_doc_add_nodes	(GsfXMLInDoc *doc,
					 GsfXMLInNode const *nodes);
void	     gsf_xml_in_doc_set_unknown_handler (GsfXMLInDoc *doc,
						 GsfXMLInUnknownFunc handler);

void	     gsf_xml_in_push_state (GsfXMLIn *xin, GsfXMLInDoc const *doc,
				    gpointer new_state, GsfXMLInExtDtor dtor,
				    xmlChar const **attrs);

GsfInput    *gsf_xml_in_get_input  (GsfXMLIn const *xin);
char const  *gsf_xml_in_check_ns   (GsfXMLIn const *xin, char const *str,
				    unsigned int ns_id);
gboolean     gsf_xml_in_namecmp	   (GsfXMLIn const *xin, char const *str,
				    unsigned int ns_id, char const *name);
void         gsf_xml_in_set_silent_unknowns (GsfXMLIn *xin, gboolean silent);

GType	     gsf_xml_in_ns_get_type (void);

/****************************************************************************/
/* Simplified GSF based xml export (does not use libxml) */

struct GsfXMLOutClass_ {
	GObjectClass  base;

	/*< private >*/
	/* Padding for future expansion */
	void (*_gsf_reserved1) (void);
	void (*_gsf_reserved2) (void);
	void (*_gsf_reserved3) (void);
	void (*_gsf_reserved4) (void);
};

struct _GsfXMLOut {
	GObject	   base;
	GsfOutput *output;

	/*< private >*/
	struct _GsfXMLOutPrivate *priv;
};

#define GSF_XML_OUT_TYPE	(gsf_xml_out_get_type ())
#define GSF_XML_OUT(o)		(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_XML_OUT_TYPE, GsfXMLOut))
#define GSF_IS_XML_OUT(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_XML_OUT_TYPE))

GType gsf_xml_out_get_type      (void);
/* void  gsf_xml_out_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfXMLOut *gsf_xml_out_new (GsfOutput *output);

void	    gsf_xml_out_set_doc_type	(GsfXMLOut *xout, char const *type);
void	    gsf_xml_out_start_element	(GsfXMLOut *xout, char const *id);
char const *gsf_xml_out_end_element	(GsfXMLOut *xout);

gboolean    gsf_xml_out_get_pretty_print (GsfXMLOut *xout);
gboolean    gsf_xml_out_set_pretty_print (GsfXMLOut *xout, gboolean pp);

void gsf_xml_out_simple_element		(GsfXMLOut *xout, char const *id,
					 char const *content);
void gsf_xml_out_simple_int_element	(GsfXMLOut *xout, char const *id,
					 int val);
void gsf_xml_out_simple_float_element	(GsfXMLOut *xout, char const *id,
					 double val, int precision);

void gsf_xml_out_add_cstr_unchecked	(GsfXMLOut *xout, char const *id,
					 char const *val_utf8);
void gsf_xml_out_add_cstr		(GsfXMLOut *xout, char const *id,
					 char const *val_utf8);
void gsf_xml_out_add_bool		(GsfXMLOut *xout, char const *id,
					 gboolean val);
void gsf_xml_out_add_int		(GsfXMLOut *xout, char const *id,
					 int val);
void gsf_xml_out_add_uint		(GsfXMLOut *xout, char const *id,
					 unsigned int val);
void gsf_xml_out_add_float		(GsfXMLOut *xout, char const *id,
					 double val, int precision);
void gsf_xml_out_add_color		(GsfXMLOut *xout, char const *id,
					 unsigned int r, unsigned int g, unsigned int b);
void gsf_xml_out_add_base64		(GsfXMLOut *xout, char const *id,
					 guint8 const *data, unsigned int len);
void gsf_xml_out_add_enum               (GsfXMLOut *xout, char const *id,
					 GType etype, gint val);
void gsf_xml_out_add_gvalue             (GsfXMLOut *xout, char const *id,
					 GValue const *val);

/****************************************************************************/
/* Some general utilities */
gboolean gsf_xml_gvalue_from_str (GValue *res, GType t, char const *str);
GsfOutput *gsf_xml_out_get_output (GsfXMLOut const *xout);

G_END_DECLS

#endif /* GSF_LIBXML_H */
