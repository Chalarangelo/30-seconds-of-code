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

#ifndef __G_BACKTRACE_H__
#define __G_BACKTRACE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>
#ifdef __sun__
#include <sys/select.h>
#endif
#include <signal.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_ALL
void g_on_error_query (const gchar *prg_name);
GLIB_AVAILABLE_IN_ALL
void g_on_error_stack_trace (const gchar *prg_name);

/**
 * G_BREAKPOINT:
 *
 * Inserts a breakpoint instruction into the code.
 *
 * On architectures which support it, this is implemented as a soft interrupt
 * and on other architectures it raises a `SIGTRAP` signal.
 *
 * `SIGTRAP` is used rather than abort() to allow breakpoints to be skipped past
 * in a debugger if they are not the desired target of debugging.
 */
#if (defined (__i386__) || defined (__x86_64__)) && defined (__GNUC__) && __GNUC__ >= 2
#  define G_BREAKPOINT()        G_STMT_START{ __asm__ __volatile__ ("int $03"); }G_STMT_END
#elif (defined (_MSC_VER) || defined (__DMC__)) && defined (_M_IX86)
#  define G_BREAKPOINT()        G_STMT_START{ __asm int 3h }G_STMT_END
#elif defined (_MSC_VER)
#  define G_BREAKPOINT()        G_STMT_START{ __debugbreak(); }G_STMT_END
#elif defined (__alpha__) && !defined(__osf__) && defined (__GNUC__) && __GNUC__ >= 2
#  define G_BREAKPOINT()        G_STMT_START{ __asm__ __volatile__ ("bpt"); }G_STMT_END
#elif defined (__APPLE__)
#  define G_BREAKPOINT()        G_STMT_START{ __builtin_trap(); }G_STMT_END
#else   /* !__i386__ && !__alpha__ */
#  define G_BREAKPOINT()        G_STMT_START{ raise (SIGTRAP); }G_STMT_END
#endif  /* __i386__ */

G_END_DECLS

#endif /* __G_BACKTRACE_H__ */
