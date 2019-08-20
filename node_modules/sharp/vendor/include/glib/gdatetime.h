/*
 * Copyright (C) 2009-2010 Christian Hergert <chris@dronelabs.com>
 * Copyright © 2010 Codethink Limited
 *
 * This library is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of the
 * licence, or (at your option) any later version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
 * License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Authors: Christian Hergert <chris@dronelabs.com>
 *          Thiago Santos <thiago.sousa.santos@collabora.co.uk>
 *          Emmanuele Bassi <ebassi@linux.intel.com>
 *          Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_DATE_TIME_H__
#define __G_DATE_TIME_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtimezone.h>

G_BEGIN_DECLS

/**
 * G_TIME_SPAN_DAY:
 *
 * Evaluates to a time span of one day.
 *
 * Since: 2.26
 */
#define G_TIME_SPAN_DAY                 (G_GINT64_CONSTANT (86400000000))

/**
 * G_TIME_SPAN_HOUR:
 *
 * Evaluates to a time span of one hour.
 *
 * Since: 2.26
 */
#define G_TIME_SPAN_HOUR                (G_GINT64_CONSTANT (3600000000))

/**
 * G_TIME_SPAN_MINUTE:
 *
 * Evaluates to a time span of one minute.
 *
 * Since: 2.26
 */
#define G_TIME_SPAN_MINUTE              (G_GINT64_CONSTANT (60000000))

/**
 * G_TIME_SPAN_SECOND:
 *
 * Evaluates to a time span of one second.
 *
 * Since: 2.26
 */
#define G_TIME_SPAN_SECOND              (G_GINT64_CONSTANT (1000000))

/**
 * G_TIME_SPAN_MILLISECOND:
 *
 * Evaluates to a time span of one millisecond.
 *
 * Since: 2.26
 */
#define G_TIME_SPAN_MILLISECOND         (G_GINT64_CONSTANT (1000))

/**
 * GTimeSpan:
 *
 * A value representing an interval of time, in microseconds.
 *
 * Since: 2.26
 */
typedef gint64 GTimeSpan;

/**
 * GDateTime:
 *
 * `GDateTime` is an opaque structure whose members
 * cannot be accessed directly.
 *
 * Since: 2.26
 */
typedef struct _GDateTime GDateTime;

GLIB_AVAILABLE_IN_ALL
void                    g_date_time_unref                               (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_ref                                 (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_now                             (GTimeZone      *tz);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_now_local                       (void);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_now_utc                         (void);

GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_from_unix_local                 (gint64          t);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_from_unix_utc                   (gint64          t);

GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_from_timeval_local              (const GTimeVal *tv);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_from_timeval_utc                (const GTimeVal *tv);

GLIB_AVAILABLE_IN_2_56
GDateTime *             g_date_time_new_from_iso8601                    (const gchar    *text,
                                                                         GTimeZone      *default_tz);

GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new                                 (GTimeZone      *tz,
                                                                         gint            year,
                                                                         gint            month,
                                                                         gint            day,
                                                                         gint            hour,
                                                                         gint            minute,
                                                                         gdouble         seconds);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_local                           (gint            year,
                                                                         gint            month,
                                                                         gint            day,
                                                                         gint            hour,
                                                                         gint            minute,
                                                                         gdouble         seconds);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_new_utc                             (gint            year,
                                                                         gint            month,
                                                                         gint            day,
                                                                         gint            hour,
                                                                         gint            minute,
                                                                         gdouble         seconds);

GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add                                 (GDateTime      *datetime,
                                                                         GTimeSpan       timespan);

GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_years                           (GDateTime      *datetime,
                                                                         gint            years);
GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_months                          (GDateTime      *datetime,
                                                                         gint            months);
GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_weeks                           (GDateTime      *datetime,
                                                                         gint            weeks);
GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_days                            (GDateTime      *datetime,
                                                                         gint            days);

GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_hours                           (GDateTime      *datetime,
                                                                         gint            hours);
GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_minutes                         (GDateTime      *datetime,
                                                                         gint            minutes);
GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_seconds                         (GDateTime      *datetime,
                                                                         gdouble         seconds);

GLIB_AVAILABLE_IN_ALL
G_GNUC_WARN_UNUSED_RESULT
GDateTime *             g_date_time_add_full                            (GDateTime      *datetime,
                                                                         gint            years,
                                                                         gint            months,
                                                                         gint            days,
                                                                         gint            hours,
                                                                         gint            minutes,
                                                                         gdouble         seconds);

GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_compare                             (gconstpointer   dt1,
                                                                         gconstpointer   dt2);
GLIB_AVAILABLE_IN_ALL
GTimeSpan               g_date_time_difference                          (GDateTime      *end,
                                                                         GDateTime      *begin);
GLIB_AVAILABLE_IN_ALL
guint                   g_date_time_hash                                (gconstpointer   datetime);
GLIB_AVAILABLE_IN_ALL
gboolean                g_date_time_equal                               (gconstpointer   dt1,
                                                                         gconstpointer   dt2);

GLIB_AVAILABLE_IN_ALL
void                    g_date_time_get_ymd                             (GDateTime      *datetime,
                                                                         gint           *year,
                                                                         gint           *month,
                                                                         gint           *day);

GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_year                            (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_month                           (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_day_of_month                    (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_week_numbering_year             (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_week_of_year                    (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_day_of_week                     (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_day_of_year                     (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_hour                            (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_minute                          (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_second                          (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gint                    g_date_time_get_microsecond                     (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gdouble                 g_date_time_get_seconds                         (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
gint64                  g_date_time_to_unix                             (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gboolean                g_date_time_to_timeval                          (GDateTime      *datetime,
                                                                         GTimeVal       *tv);

GLIB_AVAILABLE_IN_ALL
GTimeSpan               g_date_time_get_utc_offset                      (GDateTime      *datetime);
GLIB_AVAILABLE_IN_2_58
GTimeZone *             g_date_time_get_timezone                        (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
const gchar *           g_date_time_get_timezone_abbreviation           (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
gboolean                g_date_time_is_daylight_savings                 (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_to_timezone                         (GDateTime      *datetime,
                                                                         GTimeZone      *tz);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_to_local                            (GDateTime      *datetime);
GLIB_AVAILABLE_IN_ALL
GDateTime *             g_date_time_to_utc                              (GDateTime      *datetime);

GLIB_AVAILABLE_IN_ALL
gchar *                 g_date_time_format                              (GDateTime      *datetime,
                                                                         const gchar    *format) G_GNUC_MALLOC;

G_END_DECLS

#endif /* __G_DATE_TIME_H__ */
