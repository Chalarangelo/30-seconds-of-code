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

#ifndef __G_COMPLETION_H__
#define __G_COMPLETION_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/glist.h>

G_BEGIN_DECLS

typedef struct _GCompletion     GCompletion;

typedef gchar*          (*GCompletionFunc)      (gpointer);

/* GCompletion
 */

typedef gint (*GCompletionStrncmpFunc) (const gchar *s1,
                                        const gchar *s2,
                                        gsize        n);

struct _GCompletion
{
  GList* items;
  GCompletionFunc func;
 
  gchar* prefix;
  GList* cache;
  GCompletionStrncmpFunc strncmp_func;
};

GLIB_DEPRECATED_IN_2_26
GCompletion* g_completion_new           (GCompletionFunc func);
GLIB_DEPRECATED_IN_2_26
void         g_completion_add_items     (GCompletion*    cmp,
                                         GList*          items);
GLIB_DEPRECATED_IN_2_26
void         g_completion_remove_items  (GCompletion*    cmp,
                                         GList*          items);
GLIB_DEPRECATED_IN_2_26
void         g_completion_clear_items   (GCompletion*    cmp);
GLIB_DEPRECATED_IN_2_26
GList*       g_completion_complete      (GCompletion*    cmp,
                                         const gchar*    prefix,
                                         gchar**         new_prefix);
GLIB_DEPRECATED_IN_2_26
GList*       g_completion_complete_utf8 (GCompletion  *cmp,
                                         const gchar*    prefix,
                                         gchar**         new_prefix);
GLIB_DEPRECATED_IN_2_26
void         g_completion_set_compare   (GCompletion *cmp,
                                         GCompletionStrncmpFunc strncmp_func);
GLIB_DEPRECATED_IN_2_26
void         g_completion_free          (GCompletion*    cmp);

G_END_DECLS

#endif /* __G_COMPLETION_H__ */
