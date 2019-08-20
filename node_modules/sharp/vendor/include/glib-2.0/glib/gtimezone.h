/*
 * Copyright © 2010 Codethink Limited
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_TIME_ZONE_H__
#define __G_TIME_ZONE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

typedef struct _GTimeZone GTimeZone;

/**
 * GTimeType:
 * @G_TIME_TYPE_STANDARD: the time is in local standard time
 * @G_TIME_TYPE_DAYLIGHT: the time is in local daylight time
 * @G_TIME_TYPE_UNIVERSAL: the time is in UTC
 *
 * Disambiguates a given time in two ways.
 *
 * First, specifies if the given time is in universal or local time.
 *
 * Second, if the time is in local time, specifies if it is local
 * standard time or local daylight time.  This is important for the case
 * where the same local time occurs twice (during daylight savings time
 * transitions, for example).
 */
typedef enum
{
  G_TIME_TYPE_STANDARD,
  G_TIME_TYPE_DAYLIGHT,
  G_TIME_TYPE_UNIVERSAL
} GTimeType;

GLIB_AVAILABLE_IN_ALL
GTimeZone *             g_time_zone_new                                 (const gchar *identifier);
GLIB_AVAILABLE_IN_ALL
GTimeZone *             g_time_zone_new_utc                             (void);
GLIB_AVAILABLE_IN_ALL
GTimeZone *             g_time_zone_new_local                           (void);
GLIB_AVAILABLE_IN_2_58
GTimeZone *             g_time_zone_new_offset                          (gint32       seconds);

GLIB_AVAILABLE_IN_ALL
GTimeZone *             g_time_zone_ref                                 (GTimeZone   *tz);
GLIB_AVAILABLE_IN_ALL
void                    g_time_zone_unref                               (GTimeZone   *tz);

GLIB_AVAILABLE_IN_ALL
gint                    g_time_zone_find_interval                       (GTimeZone   *tz,
                                                                         GTimeType    type,
                                                                         gint64       time_);

GLIB_AVAILABLE_IN_ALL
gint                    g_time_zone_adjust_time                         (GTimeZone   *tz,
                                                                         GTimeType    type,
                                                                         gint64      *time_);

GLIB_AVAILABLE_IN_ALL
const gchar *           g_time_zone_get_abbreviation                    (GTimeZone   *tz,
                                                                         gint         interval);
GLIB_AVAILABLE_IN_ALL
gint32                  g_time_zone_get_offset                          (GTimeZone   *tz,
                                                                         gint         interval);
GLIB_AVAILABLE_IN_ALL
gboolean                g_time_zone_is_dst                              (GTimeZone   *tz,
                                                                         gint         interval);
GLIB_AVAILABLE_IN_2_58
const gchar *           g_time_zone_get_identifier                      (GTimeZone   *tz);

G_END_DECLS

#endif /* __G_TIME_ZONE_H__ */
