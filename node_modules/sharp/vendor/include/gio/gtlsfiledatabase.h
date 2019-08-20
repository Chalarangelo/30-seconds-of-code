/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright © 2010 Collabora, Ltd.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * See the included COPYING file for more information.
 *
 * Author: Stef Walter <stefw@collabora.co.uk>
 */

#ifndef __G_TLS_FILE_DATABASE_H__
#define __G_TLS_FILE_DATABASE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_TLS_FILE_DATABASE                (g_tls_file_database_get_type ())
#define G_TLS_FILE_DATABASE(inst)               (G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_TLS_FILE_DATABASE, GTlsFileDatabase))
#define G_IS_TLS_FILE_DATABASE(inst)            (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_TLS_FILE_DATABASE))
#define G_TLS_FILE_DATABASE_GET_INTERFACE(inst) (G_TYPE_INSTANCE_GET_INTERFACE ((inst), G_TYPE_TLS_FILE_DATABASE, GTlsFileDatabaseInterface))

typedef struct _GTlsFileDatabaseInterface GTlsFileDatabaseInterface;

/**
 * GTlsFileDatabaseInterface:
 * @g_iface: The parent interface.
 *
 * Provides an interface for #GTlsFileDatabase implementations.
 *
 */
struct _GTlsFileDatabaseInterface
{
  GTypeInterface g_iface;

  /*< private >*/
  /* Padding for future expansion */
  gpointer padding[8];
};

GLIB_AVAILABLE_IN_ALL
GType                        g_tls_file_database_get_type              (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_ALL
GTlsDatabase*                g_tls_file_database_new                   (const gchar  *anchors,
                                                                        GError      **error);

G_END_DECLS

#endif /* __G_TLS_FILE_DATABASE_H___ */
