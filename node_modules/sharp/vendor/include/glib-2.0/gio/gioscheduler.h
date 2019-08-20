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

#ifndef __G_IO_SCHEDULER_H__
#define __G_IO_SCHEDULER_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS


GLIB_DEPRECATED_IN_2_36_FOR ("GThreadPool or g_task_run_in_thread")
void     g_io_scheduler_push_job                   (GIOSchedulerJobFunc  job_func,
						    gpointer             user_data,
						    GDestroyNotify       notify,
						    gint                 io_priority,
						    GCancellable        *cancellable);
GLIB_DEPRECATED_IN_2_36
void     g_io_scheduler_cancel_all_jobs            (void);
GLIB_DEPRECATED_IN_2_36_FOR (g_main_context_invoke)
gboolean g_io_scheduler_job_send_to_mainloop       (GIOSchedulerJob     *job,
						    GSourceFunc          func,
						    gpointer             user_data,
						    GDestroyNotify       notify);
GLIB_DEPRECATED_IN_2_36_FOR (g_main_context_invoke)
void     g_io_scheduler_job_send_to_mainloop_async (GIOSchedulerJob     *job,
						    GSourceFunc          func,
						    gpointer             user_data,
						    GDestroyNotify       notify);

G_END_DECLS

#endif /* __G_IO_SCHEDULER_H__ */
