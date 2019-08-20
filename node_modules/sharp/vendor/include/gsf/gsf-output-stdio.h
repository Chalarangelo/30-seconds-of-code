/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-output-stdio.h: stdio based output
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

#ifndef GSF_OUTPUT_STDIO_H
#define GSF_OUTPUT_STDIO_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-output.h>
#include <stdio.h>

G_BEGIN_DECLS

#define GSF_OUTPUT_STDIO_TYPE        (gsf_output_stdio_get_type ())
#define GSF_OUTPUT_STDIO(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_OUTPUT_STDIO_TYPE, GsfOutputStdio))
#define GSF_IS_OUTPUT_STDIO(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_OUTPUT_STDIO_TYPE))

typedef struct _GsfOutputStdio GsfOutputStdio;

GType gsf_output_stdio_get_type	     (void);
/* void  gsf_output_stdio_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfOutput *gsf_output_stdio_new        (char const *filename, GError **err);
GsfOutput *gsf_output_stdio_new_full   (char const *filename, GError **err,
					char const *first_property_name,
					...); /* G_GNUC_NULL_TERMINATED */
GsfOutput *gsf_output_stdio_new_valist (char const *filename, GError **err,
					char const *first_property_name,
					va_list     var_args);
GsfOutput *gsf_output_stdio_new_FILE   (char const *filename, FILE *file,
				        gboolean keep_open);

G_END_DECLS

#endif /* GSF_OUTPUT_STDIO_H */
