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

#ifndef __G_MOUNT_OPERATION_H__
#define __G_MOUNT_OPERATION_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_MOUNT_OPERATION         (g_mount_operation_get_type ())
#define G_MOUNT_OPERATION(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_TYPE_MOUNT_OPERATION, GMountOperation))
#define G_MOUNT_OPERATION_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_TYPE_MOUNT_OPERATION, GMountOperationClass))
#define G_IS_MOUNT_OPERATION(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_TYPE_MOUNT_OPERATION))
#define G_IS_MOUNT_OPERATION_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_TYPE_MOUNT_OPERATION))
#define G_MOUNT_OPERATION_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_TYPE_MOUNT_OPERATION, GMountOperationClass))

/**
 * GMountOperation:
 *
 * Class for providing authentication methods for mounting operations,
 * such as mounting a file locally, or authenticating with a server.
 **/
typedef struct _GMountOperationClass   GMountOperationClass;
typedef struct _GMountOperationPrivate GMountOperationPrivate;

struct _GMountOperation
{
  GObject parent_instance;

  GMountOperationPrivate *priv;
};

struct _GMountOperationClass
{
  GObjectClass parent_class;

  /* signals: */

  void (* ask_password) (GMountOperation       *op,
			 const char            *message,
			 const char            *default_user,
			 const char            *default_domain,
			 GAskPasswordFlags      flags);

  /**
   * GMountOperationClass::ask_question:
   * @op: a #GMountOperation
   * @message: string containing a message to display to the user
   * @choices: (array zero-terminated=1) (element-type utf8): an array of
   *    strings for each possible choice
   *
   * Virtual implementation of #GMountOperation::ask-question.
   */
  void (* ask_question) (GMountOperation       *op,
			 const char            *message,
			 const char            *choices[]);

  void (* reply)        (GMountOperation       *op,
			 GMountOperationResult  result);

  void (* aborted)      (GMountOperation       *op);

  /**
   * GMountOperationClass::show_processes:
   * @op: a #GMountOperation
   * @message: string containing a message to display to the user
   * @processes: (element-type GPid): an array of #GPid for processes blocking
   *    the operation
   * @choices: (array zero-terminated=1) (element-type utf8): an array of
   *    strings for each possible choice
   *
   * Virtual implementation of #GMountOperation::show-processes.
   *
   * Since: 2.22
   */
  void (* show_processes) (GMountOperation      *op,
                           const gchar          *message,
                           GArray               *processes,
                           const gchar          *choices[]);

  void (* show_unmount_progress) (GMountOperation *op,
                                  const gchar     *message,
                                  gint64           time_left,
                                  gint64           bytes_left);

  /*< private >*/
  /* Padding for future expansion */
  void (*_g_reserved1) (void);
  void (*_g_reserved2) (void);
  void (*_g_reserved3) (void);
  void (*_g_reserved4) (void);
  void (*_g_reserved5) (void);
  void (*_g_reserved6) (void);
  void (*_g_reserved7) (void);
  void (*_g_reserved8) (void);
  void (*_g_reserved9) (void);
};

GLIB_AVAILABLE_IN_ALL
GType             g_mount_operation_get_type      (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GMountOperation * g_mount_operation_new           (void);

GLIB_AVAILABLE_IN_ALL
const char *  g_mount_operation_get_username      (GMountOperation *op);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_set_username      (GMountOperation *op,
						   const char      *username);
GLIB_AVAILABLE_IN_ALL
const char *  g_mount_operation_get_password      (GMountOperation *op);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_set_password      (GMountOperation *op,
						   const char      *password);
GLIB_AVAILABLE_IN_ALL
gboolean      g_mount_operation_get_anonymous     (GMountOperation *op);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_set_anonymous     (GMountOperation *op,
						   gboolean         anonymous);
GLIB_AVAILABLE_IN_ALL
const char *  g_mount_operation_get_domain        (GMountOperation *op);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_set_domain        (GMountOperation *op,
						   const char      *domain);
GLIB_AVAILABLE_IN_ALL
GPasswordSave g_mount_operation_get_password_save (GMountOperation *op);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_set_password_save (GMountOperation *op,
						   GPasswordSave    save);
GLIB_AVAILABLE_IN_ALL
int           g_mount_operation_get_choice        (GMountOperation *op);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_set_choice        (GMountOperation *op,
						   int              choice);
GLIB_AVAILABLE_IN_ALL
void          g_mount_operation_reply             (GMountOperation *op,
						   GMountOperationResult result);
GLIB_AVAILABLE_IN_2_58
gboolean      g_mount_operation_get_is_tcrypt_hidden_volume (GMountOperation *op);
GLIB_AVAILABLE_IN_2_58
void          g_mount_operation_set_is_tcrypt_hidden_volume (GMountOperation *op,
                                                             gboolean hidden_volume);
GLIB_AVAILABLE_IN_2_58
gboolean      g_mount_operation_get_is_tcrypt_system_volume (GMountOperation *op);
GLIB_AVAILABLE_IN_2_58
void          g_mount_operation_set_is_tcrypt_system_volume (GMountOperation *op,
                                                             gboolean system_volume);
GLIB_AVAILABLE_IN_2_58
guint  g_mount_operation_get_pim           (GMountOperation *op);
GLIB_AVAILABLE_IN_2_58
void          g_mount_operation_set_pim           (GMountOperation *op,
                                                   guint pim);

G_END_DECLS

#endif /* __G_MOUNT_OPERATION_H__ */
