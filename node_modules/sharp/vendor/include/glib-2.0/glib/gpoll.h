/* gpoll.h - poll(2) support
 * Copyright (C) 2008 Red Hat, Inc.
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
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef __G_POLL_H__
#define __G_POLL_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (__G_MAIN_H__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glibconfig.h>
#include <glib/gtypes.h>

G_BEGIN_DECLS

/* Any definitions using GPollFD or GPollFunc are primarily
 * for Unix and not guaranteed to be the compatible on all
 * operating systems on which GLib runs. Right now, the
 * GLib does use these functions on Win32 as well, but interprets
 * them in a fairly different way than on Unix. If you use
 * these definitions, you are should be prepared to recode
 * for different operating systems.
 *
 * Note that on systems with a working poll(2), that function is used
 * in place of g_poll(). Thus g_poll() must have the same signature as
 * poll(), meaning GPollFD must have the same layout as struct pollfd.
 *
 * On Win32, the fd in a GPollFD should be Win32 HANDLE (*not* a file
 * descriptor as provided by the C runtime) that can be used by
 * MsgWaitForMultipleObjects. This does *not* include file handles
 * from CreateFile, SOCKETs, nor pipe handles. (But you can use
 * WSAEventSelect to signal events when a SOCKET is readable).
 *
 * On Win32, fd can also be the special value G_WIN32_MSG_HANDLE to
 * indicate polling for messages.
 *
 * But note that G_WIN32_MSG_HANDLE GPollFDs should not be used by GDK
 * (GTK) programs, as GDK itself wants to read messages and convert them
 * to GDK events.
 *
 * So, unless you really know what you are doing, it's best not to try
 * to use the main loop polling stuff for your own needs on
 * Windows.
 */
typedef struct _GPollFD GPollFD;

/**
 * GPollFunc:
 * @ufds: an array of #GPollFD elements
 * @nfsd: the number of elements in @ufds
 * @timeout_: the maximum time to wait for an event of the file descriptors.
 *     A negative value indicates an infinite timeout.
 *
 * Specifies the type of function passed to g_main_context_set_poll_func().
 * The semantics of the function should match those of the poll() system call.
 *
 * Returns: the number of #GPollFD elements which have events or errors
 *     reported, or -1 if an error occurred.
 */
typedef gint    (*GPollFunc)    (GPollFD *ufds,
                                 guint    nfsd,
                                 gint     timeout_);

/**
 * GPollFD:
 * @fd: the file descriptor to poll (or a HANDLE on Win32)
 * @events: a bitwise combination from #GIOCondition, specifying which
 *     events should be polled for. Typically for reading from a file
 *     descriptor you would use %G_IO_IN | %G_IO_HUP | %G_IO_ERR, and
 *     for writing you would use %G_IO_OUT | %G_IO_ERR.
 * @revents: a bitwise combination of flags from #GIOCondition, returned
 *     from the poll() function to indicate which events occurred.
 *
 * Represents a file descriptor, which events to poll for, and which events
 * occurred.
 */
struct _GPollFD
{
#if defined (G_OS_WIN32) && GLIB_SIZEOF_VOID_P == 8
#ifndef __GTK_DOC_IGNORE__
  gint64	fd;
#endif
#else
  gint		fd;
#endif
  gushort 	events;
  gushort 	revents;
};

/**
 * G_POLLFD_FORMAT:
 *
 * A format specifier that can be used in printf()-style format strings
 * when printing the @fd member of a #GPollFD.
 */
/* defined in glibconfig.h */

GLIB_AVAILABLE_IN_ALL
gint
g_poll (GPollFD *fds,
	guint    nfds,
	gint     timeout);

G_END_DECLS

#endif /* __G_POLL_H__ */
