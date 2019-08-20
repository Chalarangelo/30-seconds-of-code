/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-input-http.h:
 *
 * Copyright (C) 2006 Michael Lawrence (lawremi@iastate.edu)
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

#ifndef __GSF_INPUT_HTTP_H__
#define __GSF_INPUT_HTTP_H__

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-input.h>

G_BEGIN_DECLS

#define GSF_INPUT_HTTP_TYPE	(gsf_input_http_get_type())
#define GSF_INPUT_HTTP(obj)	(G_TYPE_CHECK_INSTANCE_CAST((obj), GSF_INPUT_HTTP_TYPE, GsfInputHTTP))
#define GSF_IS_INPUT_HTTP(obj)	(G_TYPE_CHECK_INSTANCE_TYPE((obj), GSF_INPUT_HTTP_TYPE))

typedef struct _GsfInputHTTP GsfInputHTTP;

GType gsf_input_http_get_type (void);
/* void  gsf_input_http_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfInput *gsf_input_http_new (gchar const *url, GError **error);
gchar	 *gsf_input_http_get_url		(GsfInputHTTP *input);
gchar	 *gsf_input_http_get_content_type	(GsfInputHTTP *input);

G_END_DECLS

#endif /* __GSF_INPUT_HTTP_H__ */
