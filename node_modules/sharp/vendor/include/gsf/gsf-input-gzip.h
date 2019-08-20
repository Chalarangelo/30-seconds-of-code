/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-input-gzip.h: wrapper to uncompress gzipped input
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

#ifndef GSF_INPUT_GZIP_H
#define GSF_INPUT_GZIP_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-input.h>

G_BEGIN_DECLS

#define GSF_INPUT_GZIP_TYPE        (gsf_input_gzip_get_type ())
#define GSF_INPUT_GZIP(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_INPUT_GZIP_TYPE, GsfInputGZip))
#define GSF_IS_INPUT_GZIP(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_INPUT_GZIP_TYPE))

typedef struct _GsfInputGZip GsfInputGZip;

GType gsf_input_gzip_get_type      (void);
/* void  gsf_input_gzip_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfInput *gsf_input_gzip_new	  (GsfInput *source, GError **err);

G_END_DECLS

#endif /* GSF_INPUT_GZIP_H */
