/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_FILENAME_COMPLETER_H__
#define __G_FILENAME_COMPLETER_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_FILENAME_COMPLETER         (g_filename_completer_get_type ())
#define G_FILENAME_COMPLETER(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_FILENAME_COMPLETER, GFilenameCompleter))
#define G_FILENAME_COMPLETER_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_FILENAME_COMPLETER, GFilenameCompleterClass))
#define G_FILENAME_COMPLETER_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_FILENAME_COMPLETER, GFilenameCompleterClass))
#define G_IS_FILENAME_COMPLETER(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_FILENAME_COMPLETER))
#define G_IS_FILENAME_COMPLETER_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_FILENAME_COMPLETER))

/**
 * GFilenameCompleter:
 *
 * Completes filenames based on files that exist within the file system.
 **/
typedef struct _GFilenameCompleterClass GFilenameCompleterClass;

struct _GFilenameCompleterClass
{
  GObjectClass parent_class;

  /*< public >*/
  /* signals */
  void (* got_completion_data) (GFilenameCompleter *filename_completer);

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
};

GLIB_AVAILABLE_IN_ALL
GType               g_filename_completer_get_type              (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GFilenameCompleter *g_filename_completer_new                   (void);

GLIB_AVAILABLE_IN_ALL
char *              g_filename_completer_get_completion_suffix (GFilenameCompleter *completer,
                                                                const char *initial_text);
GLIB_AVAILABLE_IN_ALL
char **             g_filename_completer_get_completions       (GFilenameCompleter *completer,
                                                                const char *initial_text);
GLIB_AVAILABLE_IN_ALL
void                g_filename_completer_set_dirs_only         (GFilenameCompleter *completer,
                                                                gboolean dirs_only);

G_END_DECLS

#endif /* __G_FILENAME_COMPLETER_H__ */
