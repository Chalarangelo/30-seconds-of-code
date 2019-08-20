/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2008-2011 Red Hat, Inc.
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

#ifndef __G_NETWORKING_H__
#define __G_NETWORKING_H__

#include <glib.h>

#ifdef G_OS_WIN32

#ifndef _WIN32_WINNT
#define _WIN32_WINNT 0x0501
#endif
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windns.h>
#include <mswsock.h>

#include <iphlpapi.h>
#undef interface

#else /* !G_OS_WIN32 */

#include <sys/types.h>

#include <netdb.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <resolv.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <net/if.h>

#include <arpa/inet.h>
#include <arpa/nameser.h>
#include <arpa/nameser_compat.h>

#ifndef T_SRV
#define T_SRV 33
#endif

#ifndef _PATH_RESCONF
#define _PATH_RESCONF "/etc/resolv.conf"
#endif

#ifndef CMSG_LEN
/* CMSG_LEN and CMSG_SPACE are defined by RFC 2292, but missing on
 * some older platforms.
 */
#define CMSG_LEN(len) ((size_t)CMSG_DATA((struct cmsghdr *)NULL) + (len))

/* CMSG_SPACE must add at least as much padding as CMSG_NXTHDR()
 * adds. We overestimate here.
 */
#define GLIB_ALIGN_TO_SIZEOF(len, obj) (((len) + sizeof (obj) - 1) & ~(sizeof (obj) - 1))
#define CMSG_SPACE(len) GLIB_ALIGN_TO_SIZEOF (CMSG_LEN (len), struct cmsghdr)
#endif
#endif

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_2_36
void g_networking_init (void);

G_END_DECLS

#endif /* __G_NETWORKING_H__ */
