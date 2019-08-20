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

#ifndef __G_GETTEXT_H__
#define __G_GETTEXT_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_ALL
const gchar *g_strip_context (const gchar *msgid,
                              const gchar *msgval) G_GNUC_FORMAT(1);

GLIB_AVAILABLE_IN_ALL
const gchar *g_dgettext      (const gchar *domain,
                              const gchar *msgid) G_GNUC_FORMAT(2);
GLIB_AVAILABLE_IN_ALL
const gchar *g_dcgettext     (const gchar *domain,
                              const gchar *msgid,
                              gint         category) G_GNUC_FORMAT(2);
GLIB_AVAILABLE_IN_ALL
const gchar *g_dngettext     (const gchar *domain,
                              const gchar *msgid,
                              const gchar *msgid_plural,
                              gulong       n) G_GNUC_FORMAT(3);
GLIB_AVAILABLE_IN_ALL
const gchar *g_dpgettext     (const gchar *domain,
                              const gchar *msgctxtid,
                              gsize        msgidoffset) G_GNUC_FORMAT(2);
GLIB_AVAILABLE_IN_ALL
const gchar *g_dpgettext2    (const gchar *domain,
                              const gchar *context,
                              const gchar *msgid) G_GNUC_FORMAT(3);

G_END_DECLS

#endif /* __G_GETTEXT_H__ */
