/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-shared-memory.h
 *
 * Copyright (C) 2002-2006 Morten Welinder (terra@diku.dk)
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

#ifndef GSF_SHARED_MEMORY_H
#define GSF_SHARED_MEMORY_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_SHARED_MEMORY_TYPE	(gsf_shared_memory_get_type ())
#define GSF_SHARED_MEMORY(o)	(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_SHARED_MEMORY_TYPE, GsfSharedMemory))
#define GSF_IS_SHARED_MEMORY(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_SHARED_MEMORY_TYPE))

typedef struct _GsfSharedMemory GsfSharedMemory;
struct _GsfSharedMemory {
	GObject g_object;
	void *buf;
	gsf_off_t size;

	gboolean needs_free;
	gboolean needs_unmap;
};

GType gsf_shared_memory_get_type      (void);
/* void  gsf_shared_memory_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfSharedMemory *gsf_shared_memory_new (void *buf, gsf_off_t size, gboolean needs_free);
GsfSharedMemory *gsf_shared_memory_mmapped_new (void *buf, gsf_off_t size);

G_END_DECLS

#endif /* GSF_SHARED_MEMORY_H */
