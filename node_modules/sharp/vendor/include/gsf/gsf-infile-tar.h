/*
 * gsf-infile-tar.h:
 *
 * Copyright (C) 2008 Morten Welinder (terra@gnome.org)
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

#ifndef GSF_INFILE_TAR_H
#define GSF_INFILE_TAR_H

#include <gsf/gsf-fwd.h>
#include <gsf/gsf-infile.h>

G_BEGIN_DECLS

typedef struct _GsfInfileTar GsfInfileTar;

#define GSF_INFILE_TAR_TYPE        (gsf_infile_tar_get_type ())
#define GSF_INFILE_TAR(o)          (G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_INFILE_TAR_TYPE, GsfInfileTar))
#define GSF_IS_INFILE_TAR(o)       (G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_INFILE_TAR_TYPE))

GType gsf_infile_tar_get_type      (void);
GsfInfile *gsf_infile_tar_new      (GsfInput *source, GError **err);

G_END_DECLS

#endif /* GSF_INFILE_TAR_H */
