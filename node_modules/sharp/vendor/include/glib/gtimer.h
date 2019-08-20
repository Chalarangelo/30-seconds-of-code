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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
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

#ifndef __G_TIMER_H__
#define __G_TIMER_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

/* Timer
 */

/* microseconds per second */
typedef struct _GTimer		GTimer;

#define G_USEC_PER_SEC 1000000

GLIB_AVAILABLE_IN_ALL
GTimer*  g_timer_new	         (void);
GLIB_AVAILABLE_IN_ALL
void	 g_timer_destroy         (GTimer      *timer);
GLIB_AVAILABLE_IN_ALL
void	 g_timer_start	         (GTimer      *timer);
GLIB_AVAILABLE_IN_ALL
void	 g_timer_stop	         (GTimer      *timer);
GLIB_AVAILABLE_IN_ALL
void	 g_timer_reset	         (GTimer      *timer);
GLIB_AVAILABLE_IN_ALL
void	 g_timer_continue        (GTimer      *timer);
GLIB_AVAILABLE_IN_ALL
gdouble  g_timer_elapsed         (GTimer      *timer,
				  gulong      *microseconds);

GLIB_AVAILABLE_IN_ALL
void     g_usleep                (gulong       microseconds);

GLIB_AVAILABLE_IN_ALL
void     g_time_val_add          (GTimeVal    *time_, 
                                  glong        microseconds);
GLIB_AVAILABLE_IN_ALL
gboolean g_time_val_from_iso8601 (const gchar *iso_date,
				  GTimeVal    *time_);
GLIB_AVAILABLE_IN_ALL
gchar*   g_time_val_to_iso8601   (GTimeVal    *time_) G_GNUC_MALLOC;

G_END_DECLS

#endif /* __G_TIMER_H__ */
