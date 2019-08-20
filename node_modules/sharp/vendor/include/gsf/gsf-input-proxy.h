/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-input-proxy.h: proxy object (with its own current position)
 *
 * Copyright (C) 2004-2006 Morten Welinder (terra@gnome.org)
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

#ifndef GSF_INPUT_PROXY_H
#define GSF_INPUT_PROXY_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-input.h>

G_BEGIN_DECLS

#define GSF_INPUT_PROXY_TYPE        (gsf_input_proxy_get_type ())
#define GSF_INPUT_PROXY(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_INPUT_PROXY_TYPE, GsfInputProxy))
#define GSF_IS_INPUT_PROXY(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_INPUT_PROXY_TYPE))

typedef struct _GsfInputProxy GsfInputProxy;

GType gsf_input_proxy_get_type      (void);
/* void  gsf_input_proxy_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfInput *gsf_input_proxy_new	    (GsfInput *source);
GsfInput *gsf_input_proxy_new_section (GsfInput *source,
				       gsf_off_t offset,
				       gsf_off_t size);

G_END_DECLS

#endif /* GSF_INPUT_PROXY_H */
