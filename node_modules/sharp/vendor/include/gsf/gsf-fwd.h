/*
 * gsf-fwd.h:
 *
 * Copyright (C) 2002-2006 Jody Goldberg (jody@gnome.org)
 * Copyright (C) 2013 Morten Welinder (terra@gnome.org)
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

#ifndef GSF_FWD_H
#define GSF_FWD_H

#include <glib.h>
#include <glib-object.h>

G_BEGIN_DECLS

/**
 * GsfInput:
 *
 * Class representing an input stream.
 */
typedef struct _GsfInput	GsfInput;

/**
 * GsfInfil:
 *
 * Class representing an input file.
 */
typedef struct _GsfInfile	GsfInfile;

/**
 * GsfOutput:
 *
 * Class representing an output stream, counterpart to #GsfInput.
 */
typedef struct _GsfOutput	GsfOutput;

/**
 * GsfOutfile:
 *
 * Class representing an output file, counterpart to #GsfInfile.
 */
typedef struct _GsfOutfile	GsfOutfile;

/**
 * GsfDocProp:
 *
 * Class representing a properties of a document.
 */
typedef struct _GsfDocProp	GsfDocProp;

/**
 * GsfDocMetaData:
 *
 * Class representing information about a document, such as creator and time of
 * last modification.
 */
typedef struct _GsfDocMetaData	GsfDocMetaData;

/**
 * GsfTimestamp:
 * @date :	#GDate in local timezone
 * @seconds :	#glong number of seconds since @date.
 * @time_zone :	possibly blank #GString of the timezone
 * @timet : as from mktime.
 *
 * A point in time.
 */
typedef struct _GsfTimestamp	GsfTimestamp;

/**
 * gsf_off_t:
 *
 * Data type to represent offsets (positions) within a data stream.
 *
 * FIXME:
 * gsf_off_t is really supposed to be the widest type off_t can be configured
 * to on the platform
 */
typedef gint64 gsf_off_t;

/**
 * GSF_OFF_T_FORMAT:
 *
 * The printf(3) conversion specifier to be used for printing values of type
 * #gsf_off_t.
 */
#define GSF_OFF_T_FORMAT	G_GINT64_FORMAT

typedef struct _GsfXMLIn		GsfXMLIn;
typedef struct _GsfXMLInDoc		GsfXMLInDoc;
typedef struct _GsfXMLInNode		GsfXMLInNode;
typedef struct _GsfXMLInNS		GsfXMLInNS;
typedef struct _GsfXMLBlob		GsfXMLBlob;
typedef struct _GsfXMLOut		GsfXMLOut;
typedef struct GsfXMLOutClass_		GsfXMLOutClass;

typedef struct _GsfBlob GsfBlob;

#if GLIB_CHECK_VERSION(2,32,0)
#define GSF_DEPRECATED_FOR(f) G_DEPRECATED_FOR(f)
#else
#define GSF_DEPRECATED_FOR(f)
#endif

G_END_DECLS

#endif /* GSF_H */
