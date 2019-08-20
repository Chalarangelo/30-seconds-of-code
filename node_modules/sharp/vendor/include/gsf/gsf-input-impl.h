/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-input-impl.h: implementation details of GsfInput
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

#ifndef GSF_INPUT_IMPL_H
#define GSF_INPUT_IMPL_H

#include <sys/stat.h>

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

struct _GsfInput {
	GObject   g_object;

	gsf_off_t    size, cur_offset;
	char      *name;
	GsfInfile *container;
};

typedef struct {
	GObjectClass g_object_class;

	GsfInput     *(*Dup)  (GsfInput *input, GError **err);
	const guint8 *(*Read) (GsfInput *input, size_t num_bytes,
			       guint8 *optional_buffer);
	gboolean      (*Seek) (GsfInput *input, gsf_off_t offset,
			       GSeekType whence);
	GsfInput     *(*OpenSibling)  (GsfInput const *input,
				       char const *name, GError **err);

	/* Padding for future expansion */
	void (*_gsf_reserved0) (void);
	void (*_gsf_reserved1) (void);
	void (*_gsf_reserved2) (void);
	void (*_gsf_reserved3) (void);
} GsfInputClass;

#define GSF_INPUT_CLASS(k)    (G_TYPE_CHECK_CLASS_CAST ((k), GSF_INPUT_TYPE, GsfInputClass))
#define GSF_IS_INPUT_CLASS(k) (G_TYPE_CHECK_CLASS_TYPE ((k), GSF_INPUT_TYPE))

/* protected */
gboolean gsf_input_set_name	 (GsfInput *input, char const *name);
gboolean gsf_input_set_name_from_filename (GsfInput *input, char const *filename);
gboolean gsf_input_set_container (GsfInput *input, GsfInfile *container);
gboolean gsf_input_set_size	 (GsfInput *input, gsf_off_t size);
gboolean gsf_input_set_modtime   (GsfInput *input, GDateTime *modtime);
gboolean gsf_input_seek_emulate  (GsfInput *input, gsf_off_t pos);

gboolean gsf_input_set_modtime_from_stat (GsfInput *input,
					  const struct stat *st);

G_END_DECLS

#endif /* GSF_INPUT_IMPL_H */
