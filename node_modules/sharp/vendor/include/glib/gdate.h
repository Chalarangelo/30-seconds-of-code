/* GLIB - Library of useful routines for C programming
 * Copyright (C) 1995-1997  Peter Mattis, Spencer Kimball and Josh MacDonald
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Modified by the GLib Team and others 1997-2000.  See the AUTHORS
 * file for a list of people on the GLib Team.  See the ChangeLog
 * files for a list of changes.  These files are distributed with
 * GLib at ftp://ftp.gtk.org/pub/gtk/.
 */

#ifndef __G_DATE_H__
#define __G_DATE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <time.h>

#include <glib/gtypes.h>
#include <glib/gquark.h>

G_BEGIN_DECLS

/* GDate
 *
 * Date calculations (not time for now, to be resolved). These are a
 * mutant combination of Steffen Beyer's DateCalc routines
 * (http://www.perl.com/CPAN/authors/id/STBEY/) and Jon Trowbridge's
 * date routines (written for in-house software).  Written by Havoc
 * Pennington <hp@pobox.com>
 */

typedef gint32  GTime;
typedef guint16 GDateYear;
typedef guint8  GDateDay;   /* day of the month */
typedef struct _GDate GDate;

/* enum used to specify order of appearance in parsed date strings */
typedef enum
{
  G_DATE_DAY   = 0,
  G_DATE_MONTH = 1,
  G_DATE_YEAR  = 2
} GDateDMY;

/* actual week and month values */
typedef enum
{
  G_DATE_BAD_WEEKDAY  = 0,
  G_DATE_MONDAY       = 1,
  G_DATE_TUESDAY      = 2,
  G_DATE_WEDNESDAY    = 3,
  G_DATE_THURSDAY     = 4,
  G_DATE_FRIDAY       = 5,
  G_DATE_SATURDAY     = 6,
  G_DATE_SUNDAY       = 7
} GDateWeekday;
typedef enum
{
  G_DATE_BAD_MONTH = 0,
  G_DATE_JANUARY   = 1,
  G_DATE_FEBRUARY  = 2,
  G_DATE_MARCH     = 3,
  G_DATE_APRIL     = 4,
  G_DATE_MAY       = 5,
  G_DATE_JUNE      = 6,
  G_DATE_JULY      = 7,
  G_DATE_AUGUST    = 8,
  G_DATE_SEPTEMBER = 9,
  G_DATE_OCTOBER   = 10,
  G_DATE_NOVEMBER  = 11,
  G_DATE_DECEMBER  = 12
} GDateMonth;

#define G_DATE_BAD_JULIAN 0U
#define G_DATE_BAD_DAY    0U
#define G_DATE_BAD_YEAR   0U

/* Note: directly manipulating structs is generally a bad idea, but
 * in this case it's an *incredibly* bad idea, because all or part
 * of this struct can be invalid at any given time. Use the functions,
 * or you will get hosed, I promise.
 */
struct _GDate
{
  guint julian_days : 32; /* julian days representation - we use a
                           *  bitfield hoping that 64 bit platforms
                           *  will pack this whole struct in one big
                           *  int
                           */

  guint julian : 1;    /* julian is valid */
  guint dmy    : 1;    /* dmy is valid */

  /* DMY representation */
  guint day    : 6;
  guint month  : 4;
  guint year   : 16;
};

/* g_date_new() returns an invalid date, you then have to _set() stuff
 * to get a usable object. You can also allocate a GDate statically,
 * then call g_date_clear() to initialize.
 */
GLIB_AVAILABLE_IN_ALL
GDate*       g_date_new                   (void);
GLIB_AVAILABLE_IN_ALL
GDate*       g_date_new_dmy               (GDateDay     day,
                                           GDateMonth   month,
                                           GDateYear    year);
GLIB_AVAILABLE_IN_ALL
GDate*       g_date_new_julian            (guint32      julian_day);
GLIB_AVAILABLE_IN_ALL
void         g_date_free                  (GDate       *date);
GLIB_AVAILABLE_IN_2_56
GDate*       g_date_copy                  (const GDate *date);

/* check g_date_valid() after doing an operation that might fail, like
 * _parse.  Almost all g_date operations are undefined on invalid
 * dates (the exceptions are the mutators, since you need those to
 * return to validity).
 */
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid                 (const GDate *date);
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid_day             (GDateDay     day) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid_month           (GDateMonth month) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid_year            (GDateYear  year) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid_weekday         (GDateWeekday weekday) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid_julian          (guint32 julian_date) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_valid_dmy             (GDateDay     day,
                                           GDateMonth   month,
                                           GDateYear    year) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GDateWeekday g_date_get_weekday           (const GDate *date);
GLIB_AVAILABLE_IN_ALL
GDateMonth   g_date_get_month             (const GDate *date);
GLIB_AVAILABLE_IN_ALL
GDateYear    g_date_get_year              (const GDate *date);
GLIB_AVAILABLE_IN_ALL
GDateDay     g_date_get_day               (const GDate *date);
GLIB_AVAILABLE_IN_ALL
guint32      g_date_get_julian            (const GDate *date);
GLIB_AVAILABLE_IN_ALL
guint        g_date_get_day_of_year       (const GDate *date);
/* First monday/sunday is the start of week 1; if we haven't reached
 * that day, return 0. These are not ISO weeks of the year; that
 * routine needs to be added.
 * these functions return the number of weeks, starting on the
 * corrsponding day
 */
GLIB_AVAILABLE_IN_ALL
guint        g_date_get_monday_week_of_year (const GDate *date);
GLIB_AVAILABLE_IN_ALL
guint        g_date_get_sunday_week_of_year (const GDate *date);
GLIB_AVAILABLE_IN_ALL
guint        g_date_get_iso8601_week_of_year (const GDate *date);

/* If you create a static date struct you need to clear it to get it
 * in a sane state before use. You can clear a whole array at
 * once with the ndates argument.
 */
GLIB_AVAILABLE_IN_ALL
void         g_date_clear                 (GDate       *date,
                                           guint        n_dates);

/* The parse routine is meant for dates typed in by a user, so it
 * permits many formats but tries to catch common typos. If your data
 * needs to be strictly validated, it is not an appropriate function.
 */
GLIB_AVAILABLE_IN_ALL
void         g_date_set_parse             (GDate       *date,
                                           const gchar *str);
GLIB_AVAILABLE_IN_ALL
void         g_date_set_time_t            (GDate       *date,
					   time_t       timet);
GLIB_AVAILABLE_IN_ALL
void         g_date_set_time_val          (GDate       *date,
					   GTimeVal    *timeval);
#ifndef G_DISABLE_DEPRECATED
GLIB_DEPRECATED_FOR(g_date_set_time_t)
void         g_date_set_time              (GDate       *date,
                                           GTime        time_);
#endif
GLIB_AVAILABLE_IN_ALL
void         g_date_set_month             (GDate       *date,
                                           GDateMonth   month);
GLIB_AVAILABLE_IN_ALL
void         g_date_set_day               (GDate       *date,
                                           GDateDay     day);
GLIB_AVAILABLE_IN_ALL
void         g_date_set_year              (GDate       *date,
                                           GDateYear    year);
GLIB_AVAILABLE_IN_ALL
void         g_date_set_dmy               (GDate       *date,
                                           GDateDay     day,
                                           GDateMonth   month,
                                           GDateYear    y);
GLIB_AVAILABLE_IN_ALL
void         g_date_set_julian            (GDate       *date,
                                           guint32      julian_date);
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_is_first_of_month     (const GDate *date);
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_is_last_of_month      (const GDate *date);

/* To go forward by some number of weeks just go forward weeks*7 days */
GLIB_AVAILABLE_IN_ALL
void         g_date_add_days              (GDate       *date,
                                           guint        n_days);
GLIB_AVAILABLE_IN_ALL
void         g_date_subtract_days         (GDate       *date,
                                           guint        n_days);

/* If you add/sub months while day > 28, the day might change */
GLIB_AVAILABLE_IN_ALL
void         g_date_add_months            (GDate       *date,
                                           guint        n_months);
GLIB_AVAILABLE_IN_ALL
void         g_date_subtract_months       (GDate       *date,
                                           guint        n_months);

/* If it's feb 29, changing years can move you to the 28th */
GLIB_AVAILABLE_IN_ALL
void         g_date_add_years             (GDate       *date,
                                           guint        n_years);
GLIB_AVAILABLE_IN_ALL
void         g_date_subtract_years        (GDate       *date,
                                           guint        n_years);
GLIB_AVAILABLE_IN_ALL
gboolean     g_date_is_leap_year          (GDateYear    year) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
guint8       g_date_get_days_in_month     (GDateMonth   month,
                                           GDateYear    year) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
guint8       g_date_get_monday_weeks_in_year  (GDateYear    year) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
guint8       g_date_get_sunday_weeks_in_year  (GDateYear    year) G_GNUC_CONST;

/* Returns the number of days between the two dates.  If date2 comes
   before date1, a negative value is return. */
GLIB_AVAILABLE_IN_ALL
gint         g_date_days_between          (const GDate *date1,
					   const GDate *date2);

/* qsort-friendly (with a cast...) */
GLIB_AVAILABLE_IN_ALL
gint         g_date_compare               (const GDate *lhs,
                                           const GDate *rhs);
GLIB_AVAILABLE_IN_ALL
void         g_date_to_struct_tm          (const GDate *date,
                                           struct tm   *tm);

GLIB_AVAILABLE_IN_ALL
void         g_date_clamp                 (GDate *date,
					   const GDate *min_date,
					   const GDate *max_date);

/* Swap date1 and date2's values if date1 > date2. */
GLIB_AVAILABLE_IN_ALL
void         g_date_order                 (GDate *date1, GDate *date2);

/* Just like strftime() except you can only use date-related formats.
 *   Using a time format is undefined.
 */
GLIB_AVAILABLE_IN_ALL
gsize        g_date_strftime              (gchar       *s,
                                           gsize        slen,
                                           const gchar *format,
                                           const GDate *date);

#ifndef G_DISABLE_DEPRECATED

#define g_date_weekday 			g_date_get_weekday
#define g_date_month 			g_date_get_month
#define g_date_year 			g_date_get_year
#define g_date_day 			g_date_get_day
#define g_date_julian 			g_date_get_julian
#define g_date_day_of_year 		g_date_get_day_of_year
#define g_date_monday_week_of_year 	g_date_get_monday_week_of_year
#define g_date_sunday_week_of_year 	g_date_get_sunday_week_of_year
#define g_date_days_in_month 		g_date_get_days_in_month
#define g_date_monday_weeks_in_year 	g_date_get_monday_weeks_in_year
#define g_date_sunday_weeks_in_year	g_date_get_sunday_weeks_in_year

#endif /* G_DISABLE_DEPRECATED */

G_END_DECLS

#endif /* __G_DATE_H__ */
