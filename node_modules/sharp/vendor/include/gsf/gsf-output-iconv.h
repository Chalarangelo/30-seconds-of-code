/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-output-iconv.h: wrapper to convert character sets.
 *
 * Copyright (C) 2005-2006 Morten Welinder (terra@gnome.org)
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

#ifndef GSF_OUTPUT_ICONV_H
#define GSF_OUTPUT_ICONV_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-output.h>

G_BEGIN_DECLS

typedef struct {
	GsfOutputClass output_class;
} GsfOutputIconvClass;

#define GSF_OUTPUT_ICONV_TYPE        (gsf_output_iconv_get_type ())
#define GSF_OUTPUT_ICONV(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_OUTPUT_ICONV_TYPE, GsfOutputIconv))
#define GSF_IS_OUTPUT_ICONV(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_OUTPUT_ICONV_TYPE))

typedef struct _GsfOutputIconv GsfOutputIconv;

GType gsf_output_iconv_get_type      (void);
/* void  gsf_output_iconv_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfOutput *gsf_output_iconv_new      (GsfOutput *sink, char const *dst, char const *src);

G_END_DECLS

#endif /* GSF_OUTPUT_ICONV_H */
