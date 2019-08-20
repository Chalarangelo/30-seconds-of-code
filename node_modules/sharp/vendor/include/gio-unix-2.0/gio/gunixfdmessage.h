/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2009 Codethink Limited
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
 * Authors: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_UNIX_FD_MESSAGE_H__
#define __G_UNIX_FD_MESSAGE_H__

#include <gio/gio.h>
#include <gio/gunixfdlist.h>

G_BEGIN_DECLS

#define G_TYPE_UNIX_FD_MESSAGE                              (g_unix_fd_message_get_type ())
#define G_UNIX_FD_MESSAGE(inst)                             (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_UNIX_FD_MESSAGE, GUnixFDMessage))
#define G_UNIX_FD_MESSAGE_CLASS(class)                      (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_UNIX_FD_MESSAGE, GUnixFDMessageClass))
#define G_IS_UNIX_FD_MESSAGE(inst)                          (G_TYPE_CHECK_INSTANCE_TYPE ((inst),                     \
                                                             G_TYPE_UNIX_FD_MESSAGE))
#define G_IS_UNIX_FD_MESSAGE_CLASS(class)                   (G_TYPE_CHECK_CLASS_TYPE ((class),                       \
                                                             G_TYPE_UNIX_FD_MESSAGE))
#define G_UNIX_FD_MESSAGE_GET_CLASS(inst)                   (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_UNIX_FD_MESSAGE, GUnixFDMessageClass))

typedef struct _GUnixFDMessagePrivate                       GUnixFDMessagePrivate;
typedef struct _GUnixFDMessageClass                         GUnixFDMessageClass;
typedef struct _GUnixFDMessage                              GUnixFDMessage;

G_DEFINE_AUTOPTR_CLEANUP_FUNC(GUnixFDMessage, g_object_unref)

struct _GUnixFDMessageClass
{
  GSocketControlMessageClass parent_class;

  /*< private >*/

  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
};

struct _GUnixFDMessage
{
  GSocketControlMessage parent_instance;
  GUnixFDMessagePrivate *priv;
};

GLIB_AVAILABLE_IN_ALL
GType                   g_unix_fd_message_get_type                      (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GSocketControlMessage * g_unix_fd_message_new_with_fd_list              (GUnixFDList     *fd_list);
GLIB_AVAILABLE_IN_ALL
GSocketControlMessage * g_unix_fd_message_new                           (void);

GLIB_AVAILABLE_IN_ALL
GUnixFDList *           g_unix_fd_message_get_fd_list                   (GUnixFDMessage  *message);

GLIB_AVAILABLE_IN_ALL
gint *                  g_unix_fd_message_steal_fds                     (GUnixFDMessage  *message,
                                                                         gint            *length);
GLIB_AVAILABLE_IN_ALL
gboolean                g_unix_fd_message_append_fd                     (GUnixFDMessage  *message,
                                                                         gint             fd,
                                                                         GError         **error);

G_END_DECLS

#endif /* __G_UNIX_FD_MESSAGE_H__ */
