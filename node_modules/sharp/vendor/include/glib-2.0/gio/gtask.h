/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright 2011 Red Hat, Inc.
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
 */

#ifndef __G_TASK_H__
#define __G_TASK_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_TASK         (g_task_get_type ())
#define G_TASK(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_TASK, GTask))
#define G_TASK_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_TASK, GTaskClass))
#define G_IS_TASK(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_TASK))
#define G_IS_TASK_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_TASK))
#define G_TASK_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_TASK, GTaskClass))

typedef struct _GTaskClass   GTaskClass;

GLIB_AVAILABLE_IN_2_36
GType         g_task_get_type              (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_36
GTask        *g_task_new                   (gpointer             source_object,
                                            GCancellable        *cancellable,
                                            GAsyncReadyCallback  callback,
                                            gpointer             callback_data);

GLIB_AVAILABLE_IN_2_36
void          g_task_report_error          (gpointer             source_object,
                                            GAsyncReadyCallback  callback,
                                            gpointer             callback_data,
                                            gpointer             source_tag,
                                            GError              *error);
GLIB_AVAILABLE_IN_2_36
void          g_task_report_new_error      (gpointer             source_object,
                                            GAsyncReadyCallback  callback,
                                            gpointer             callback_data,
                                            gpointer             source_tag,
                                            GQuark               domain,
                                            gint                 code,
                                            const char          *format,
                                            ...) G_GNUC_PRINTF(7, 8);

GLIB_AVAILABLE_IN_2_36
void          g_task_set_task_data         (GTask               *task,
                                            gpointer             task_data,
                                            GDestroyNotify       task_data_destroy);
GLIB_AVAILABLE_IN_2_36
void          g_task_set_priority          (GTask               *task,
                                            gint                 priority);
GLIB_AVAILABLE_IN_2_36
void          g_task_set_check_cancellable (GTask               *task,
                                            gboolean             check_cancellable);
GLIB_AVAILABLE_IN_2_36
void          g_task_set_source_tag        (GTask               *task,
                                            gpointer             source_tag);
GLIB_AVAILABLE_IN_2_60
void          g_task_set_name              (GTask               *task,
                                            const gchar         *name);

GLIB_AVAILABLE_IN_2_36
gpointer      g_task_get_source_object     (GTask               *task);
GLIB_AVAILABLE_IN_2_36
gpointer      g_task_get_task_data         (GTask               *task);
GLIB_AVAILABLE_IN_2_36
gint          g_task_get_priority          (GTask               *task);
GLIB_AVAILABLE_IN_2_36
GMainContext *g_task_get_context           (GTask               *task);
GLIB_AVAILABLE_IN_2_36
GCancellable *g_task_get_cancellable       (GTask               *task);
GLIB_AVAILABLE_IN_2_36
gboolean      g_task_get_check_cancellable (GTask               *task);
GLIB_AVAILABLE_IN_2_36
gpointer      g_task_get_source_tag        (GTask               *task);
GLIB_AVAILABLE_IN_2_60
const gchar  *g_task_get_name              (GTask               *task);

GLIB_AVAILABLE_IN_2_36
gboolean      g_task_is_valid              (gpointer             result,
                                            gpointer             source_object);


typedef void (*GTaskThreadFunc)           (GTask           *task,
                                           gpointer         source_object,
                                           gpointer         task_data,
                                           GCancellable    *cancellable);
GLIB_AVAILABLE_IN_2_36
void          g_task_run_in_thread        (GTask           *task,
                                           GTaskThreadFunc  task_func);
GLIB_AVAILABLE_IN_2_36
void          g_task_run_in_thread_sync   (GTask           *task,
                                           GTaskThreadFunc  task_func);
GLIB_AVAILABLE_IN_2_36
gboolean      g_task_set_return_on_cancel (GTask           *task,
                                           gboolean         return_on_cancel);
GLIB_AVAILABLE_IN_2_36
gboolean      g_task_get_return_on_cancel (GTask           *task);

GLIB_AVAILABLE_IN_2_36
void          g_task_attach_source        (GTask           *task,
                                           GSource         *source,
                                           GSourceFunc      callback);


GLIB_AVAILABLE_IN_2_36
void          g_task_return_pointer            (GTask           *task,
                                                gpointer         result,
                                                GDestroyNotify   result_destroy);
GLIB_AVAILABLE_IN_2_36
void          g_task_return_boolean            (GTask           *task,
                                                gboolean         result);
GLIB_AVAILABLE_IN_2_36
void          g_task_return_int                (GTask           *task,
                                                gssize           result);

GLIB_AVAILABLE_IN_2_36
void          g_task_return_error              (GTask           *task,
                                                GError          *error);
GLIB_AVAILABLE_IN_2_36
void          g_task_return_new_error          (GTask           *task,
                                                GQuark           domain,
                                                gint             code,
                                                const char      *format,
                                                ...) G_GNUC_PRINTF (4, 5);

GLIB_AVAILABLE_IN_2_36
gboolean      g_task_return_error_if_cancelled (GTask           *task);

GLIB_AVAILABLE_IN_2_36
gpointer      g_task_propagate_pointer         (GTask           *task,
                                                GError         **error);
GLIB_AVAILABLE_IN_2_36
gboolean      g_task_propagate_boolean         (GTask           *task,
                                                GError         **error);
GLIB_AVAILABLE_IN_2_36
gssize        g_task_propagate_int             (GTask           *task,
                                                GError         **error);
GLIB_AVAILABLE_IN_2_36
gboolean      g_task_had_error                 (GTask           *task);
GLIB_AVAILABLE_IN_2_44
gboolean      g_task_get_completed             (GTask           *task);

G_END_DECLS

#endif /* __G_TASK_H__ */
