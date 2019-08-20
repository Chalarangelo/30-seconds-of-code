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

#ifndef __G_DEPRECATED_THREAD_H__
#define __G_DEPRECATED_THREAD_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gthread.h>

G_BEGIN_DECLS

#ifndef G_DISABLE_DEPRECATED

typedef enum
{
  G_THREAD_PRIORITY_LOW,
  G_THREAD_PRIORITY_NORMAL,
  G_THREAD_PRIORITY_HIGH,
  G_THREAD_PRIORITY_URGENT
} GThreadPriority;

#endif

struct  _GThread
{
  /*< private >*/
  GThreadFunc func;
  gpointer data;
  gboolean joinable;
  GThreadPriority priority;
};

#ifndef G_DISABLE_DEPRECATED

typedef struct _GThreadFunctions GThreadFunctions;
struct _GThreadFunctions
{
  GMutex*  (*mutex_new)           (void);
  void     (*mutex_lock)          (GMutex               *mutex);
  gboolean (*mutex_trylock)       (GMutex               *mutex);
  void     (*mutex_unlock)        (GMutex               *mutex);
  void     (*mutex_free)          (GMutex               *mutex);
  GCond*   (*cond_new)            (void);
  void     (*cond_signal)         (GCond                *cond);
  void     (*cond_broadcast)      (GCond                *cond);
  void     (*cond_wait)           (GCond                *cond,
                                   GMutex               *mutex);
  gboolean (*cond_timed_wait)     (GCond                *cond,
                                   GMutex               *mutex,
                                   GTimeVal             *end_time);
  void      (*cond_free)          (GCond                *cond);
  GPrivate* (*private_new)        (GDestroyNotify        destructor);
  gpointer  (*private_get)        (GPrivate             *private_key);
  void      (*private_set)        (GPrivate             *private_key,
                                   gpointer              data);
  void      (*thread_create)      (GThreadFunc           func,
                                   gpointer              data,
                                   gulong                stack_size,
                                   gboolean              joinable,
                                   gboolean              bound,
                                   GThreadPriority       priority,
                                   gpointer              thread,
                                   GError              **error);
  void      (*thread_yield)       (void);
  void      (*thread_join)        (gpointer              thread);
  void      (*thread_exit)        (void);
  void      (*thread_set_priority)(gpointer              thread,
                                   GThreadPriority       priority);
  void      (*thread_self)        (gpointer              thread);
  gboolean  (*thread_equal)       (gpointer              thread1,
                                   gpointer              thread2);
};

GLIB_VAR GThreadFunctions       g_thread_functions_for_glib_use;
GLIB_VAR gboolean               g_thread_use_default_impl;

GLIB_VAR guint64   (*g_thread_gettime) (void);

GLIB_DEPRECATED_IN_2_32_FOR(g_thread_new)
GThread *g_thread_create       (GThreadFunc       func,
                                gpointer          data,
                                gboolean          joinable,
                                GError          **error);

GLIB_DEPRECATED_IN_2_32_FOR(g_thread_new)
GThread *g_thread_create_full  (GThreadFunc       func,
                                gpointer          data,
                                gulong            stack_size,
                                gboolean          joinable,
                                gboolean          bound,
                                GThreadPriority   priority,
                                GError          **error);

GLIB_DEPRECATED_IN_2_32
void     g_thread_set_priority (GThread          *thread,
                                GThreadPriority   priority);

GLIB_DEPRECATED_IN_2_32
void     g_thread_foreach      (GFunc             thread_func,
                                gpointer          user_data);

#ifndef G_OS_WIN32
#include <sys/types.h>
#include <pthread.h>
#endif

#define g_static_mutex_get_mutex g_static_mutex_get_mutex_impl
#define G_STATIC_MUTEX_INIT { NULL }
typedef struct
{
  GMutex *mutex;
#ifndef G_OS_WIN32
  /* only for ABI compatibility reasons */
  pthread_mutex_t unused;
#endif
} GStaticMutex;

#define g_static_mutex_lock(mutex) \
    g_mutex_lock (g_static_mutex_get_mutex (mutex))
#define g_static_mutex_trylock(mutex) \
    g_mutex_trylock (g_static_mutex_get_mutex (mutex))
#define g_static_mutex_unlock(mutex) \
    g_mutex_unlock (g_static_mutex_get_mutex (mutex))

GLIB_DEPRECATED_IN_2_32_FOR(g_mutex_init)
void    g_static_mutex_init           (GStaticMutex *mutex);
GLIB_DEPRECATED_IN_2_32_FOR(g_mutex_clear)
void    g_static_mutex_free           (GStaticMutex *mutex);
GLIB_DEPRECATED_IN_2_32_FOR(GMutex)
GMutex *g_static_mutex_get_mutex_impl (GStaticMutex *mutex);

typedef struct _GStaticRecMutex GStaticRecMutex;
struct _GStaticRecMutex
{
  /*< private >*/
  GStaticMutex mutex;
  guint depth;

  /* ABI compat only */
  union {
#ifdef G_OS_WIN32
    void *owner;
#else
    pthread_t owner;
#endif
    gdouble dummy;
  } unused;
};

#define G_STATIC_REC_MUTEX_INIT { G_STATIC_MUTEX_INIT, 0, { 0 } }
GLIB_DEPRECATED_IN_2_32_FOR(g_rec_mutex_init)
void     g_static_rec_mutex_init        (GStaticRecMutex *mutex);

GLIB_DEPRECATED_IN_2_32_FOR(g_rec_mutex_lock)
void     g_static_rec_mutex_lock        (GStaticRecMutex *mutex);

GLIB_DEPRECATED_IN_2_32_FOR(g_rec_mutex_try_lock)
gboolean g_static_rec_mutex_trylock     (GStaticRecMutex *mutex);

GLIB_DEPRECATED_IN_2_32_FOR(g_rec_mutex_unlock)
void     g_static_rec_mutex_unlock      (GStaticRecMutex *mutex);

GLIB_DEPRECATED_IN_2_32
void     g_static_rec_mutex_lock_full   (GStaticRecMutex *mutex,
                                         guint            depth);

GLIB_DEPRECATED_IN_2_32
guint    g_static_rec_mutex_unlock_full (GStaticRecMutex *mutex);

GLIB_DEPRECATED_IN_2_32_FOR(g_rec_mutex_free)
void     g_static_rec_mutex_free        (GStaticRecMutex *mutex);

typedef struct _GStaticRWLock GStaticRWLock;
struct _GStaticRWLock
{
  /*< private >*/
  GStaticMutex mutex;
  GCond *read_cond;
  GCond *write_cond;
  guint read_counter;
  gboolean have_writer;
  guint want_to_read;
  guint want_to_write;
};

#define G_STATIC_RW_LOCK_INIT { G_STATIC_MUTEX_INIT, NULL, NULL, 0, FALSE, 0, 0 }

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_init)
void      g_static_rw_lock_init           (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_reader_lock)
void      g_static_rw_lock_reader_lock    (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_reader_trylock)
gboolean  g_static_rw_lock_reader_trylock (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_reader_unlock)
void      g_static_rw_lock_reader_unlock  (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_writer_lock)
void      g_static_rw_lock_writer_lock    (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_writer_trylock)
gboolean  g_static_rw_lock_writer_trylock (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_writer_unlock)
void      g_static_rw_lock_writer_unlock  (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32_FOR(g_rw_lock_free)
void      g_static_rw_lock_free           (GStaticRWLock *lock);

GLIB_DEPRECATED_IN_2_32
GPrivate *      g_private_new             (GDestroyNotify notify);

typedef struct _GStaticPrivate  GStaticPrivate;
struct _GStaticPrivate
{
  /*< private >*/
  guint index;
};

#define G_STATIC_PRIVATE_INIT { 0 }
GLIB_DEPRECATED_IN_2_32
void     g_static_private_init           (GStaticPrivate *private_key);

GLIB_DEPRECATED_IN_2_32_FOR(g_private_get)
gpointer g_static_private_get            (GStaticPrivate *private_key);

GLIB_DEPRECATED_IN_2_32_FOR(g_private_set)
void     g_static_private_set            (GStaticPrivate *private_key,
                                          gpointer        data,
                                          GDestroyNotify  notify);

GLIB_DEPRECATED_IN_2_32
void     g_static_private_free           (GStaticPrivate *private_key);

GLIB_DEPRECATED_IN_2_32
gboolean g_once_init_enter_impl          (volatile gsize *location);

GLIB_DEPRECATED_IN_2_32
void     g_thread_init                   (gpointer vtable);
GLIB_DEPRECATED_IN_2_32
void    g_thread_init_with_errorcheck_mutexes (gpointer vtable);

GLIB_DEPRECATED_IN_2_32
gboolean g_thread_get_initialized        (void);

GLIB_VAR gboolean g_threads_got_initialized;

#define g_thread_supported()     (1)

GLIB_DEPRECATED_IN_2_32
GMutex *        g_mutex_new             (void);
GLIB_DEPRECATED_IN_2_32
void            g_mutex_free            (GMutex *mutex);
GLIB_DEPRECATED_IN_2_32
GCond *         g_cond_new              (void);
GLIB_DEPRECATED_IN_2_32
void            g_cond_free             (GCond  *cond);
GLIB_DEPRECATED_IN_2_32
gboolean        g_cond_timed_wait       (GCond          *cond,
                                         GMutex         *mutex,
                                         GTimeVal       *timeval);

#endif

G_END_DECLS

#endif /* __G_DEPRECATED_THREAD_H__ */
