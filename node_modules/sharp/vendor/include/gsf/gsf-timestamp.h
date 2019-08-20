/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-timestamp.h: A useful little type for metadata, contains a superset of
 *		 all the features it would be nice to have.
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

#ifndef GSF_TIMESTAMP_H
#define GSF_TIMESTAMP_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_TIMESTAMP_TYPE      (gsf_timestamp_get_type ())
#define VAL_IS_GSF_TIMESTAMP(v) (G_TYPE_CHECK_VALUE_TYPE((v), GSF_TIMESTAMP_TYPE))

struct _GsfTimestamp {
	GDate	  date;			/* In local timezone */
	glong     seconds;		/* time of day */
	GString	  time_zone;		/* possibly blank */

	guint32	  timet;
};

GType gsf_timestamp_get_type      (void);
/* void  gsf_timestamp_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfTimestamp *gsf_timestamp_new	(void);

GsfTimestamp *gsf_timestamp_copy	(GsfTimestamp const *stamp);
void          gsf_timestamp_free	(GsfTimestamp       *stamp);
int	      gsf_timestamp_load_from_string (GsfTimestamp *stamp, char const *spec);
char 	     *gsf_timestamp_as_string	(GsfTimestamp const *stamp);
guint         gsf_timestamp_hash	(GsfTimestamp const *stamp);
gboolean      gsf_timestamp_equal	(GsfTimestamp const *a,
					 GsfTimestamp const *b);

void          gsf_timestamp_set_time    (GsfTimestamp *stamp, guint64 t);

void gsf_timestamp_to_value (GsfTimestamp const *stamp, GValue *value);

/* Deprecated */
#ifndef GSF_DISABLE_DEPRECATED
GSF_DEPRECATED_FOR(gsf_timestamp_to_value)
void gsf_value_set_timestamp (GValue *value, GsfTimestamp const *stamp);
GSF_DEPRECATED_FOR(gsf_timestamp_load_from_string)
int	      gsf_timestamp_from_string (char const *spec, GsfTimestamp *stamp);
GSF_DEPRECATED_FOR(gsf_timestamp_load_from_string)
int           gsf_timestamp_parse	(char const *spec, GsfTimestamp *stamp);
#endif

G_END_DECLS

#endif /* GSF_TIMESTAMP_H */
