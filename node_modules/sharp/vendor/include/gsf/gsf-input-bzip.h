/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-input-bzip.h: wrapper to uncompress to bzipped output
 *
 * Copyright (C) 2003-2006 Dom Lachowicz (cinamod@hotmail.com)
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

#ifndef GSF_INPUT_BZIP_H
#define GSF_INPUT_BZIP_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-input.h>

G_BEGIN_DECLS

GsfInput *gsf_input_memory_new_from_bzip (GsfInput *source, GError **err);

G_END_DECLS

#endif /* GSF_INPUT_BZIP_H */
