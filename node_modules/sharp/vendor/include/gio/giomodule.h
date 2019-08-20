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

#ifndef __G_IO_MODULE_H__
#define __G_IO_MODULE_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/giotypes.h>
#include <gmodule.h>

G_BEGIN_DECLS

typedef struct _GIOModuleScope GIOModuleScope;

GLIB_AVAILABLE_IN_2_30
GIOModuleScope *   g_io_module_scope_new     (GIOModuleScopeFlags  flags);
GLIB_AVAILABLE_IN_2_30
void               g_io_module_scope_free    (GIOModuleScope      *scope);
GLIB_AVAILABLE_IN_2_30
void               g_io_module_scope_block   (GIOModuleScope      *scope,
                                              const gchar         *basename);

#define G_IO_TYPE_MODULE         (g_io_module_get_type ())
#define G_IO_MODULE(o)           (G_TYPE_CHECK_INSTANCE_CAST ((o), G_IO_TYPE_MODULE, GIOModule))
#define G_IO_MODULE_CLASS(k)     (G_TYPE_CHECK_CLASS_CAST((k), G_IO_TYPE_MODULE, GIOModuleClass))
#define G_IO_IS_MODULE(o)        (G_TYPE_CHECK_INSTANCE_TYPE ((o), G_IO_TYPE_MODULE))
#define G_IO_IS_MODULE_CLASS(k)  (G_TYPE_CHECK_CLASS_TYPE ((k), G_IO_TYPE_MODULE))
#define G_IO_MODULE_GET_CLASS(o) (G_TYPE_INSTANCE_GET_CLASS ((o), G_IO_TYPE_MODULE, GIOModuleClass))

/**
 * GIOModule:
 *
 * Opaque module base class for extending GIO.
 **/
typedef struct _GIOModuleClass GIOModuleClass;

GLIB_AVAILABLE_IN_ALL
GType              g_io_module_get_type                       (void) G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
GIOModule         *g_io_module_new                            (const gchar       *filename);

GLIB_AVAILABLE_IN_ALL
void               g_io_modules_scan_all_in_directory         (const char        *dirname);
GLIB_AVAILABLE_IN_ALL
GList             *g_io_modules_load_all_in_directory         (const gchar       *dirname);

GLIB_AVAILABLE_IN_2_30
void               g_io_modules_scan_all_in_directory_with_scope   (const gchar       *dirname,
                                                                    GIOModuleScope    *scope);
GLIB_AVAILABLE_IN_2_30
GList             *g_io_modules_load_all_in_directory_with_scope   (const gchar       *dirname,
                                                                    GIOModuleScope    *scope);

GLIB_AVAILABLE_IN_ALL
GIOExtensionPoint *g_io_extension_point_register              (const char        *name);
GLIB_AVAILABLE_IN_ALL
GIOExtensionPoint *g_io_extension_point_lookup                (const char        *name);
GLIB_AVAILABLE_IN_ALL
void               g_io_extension_point_set_required_type     (GIOExtensionPoint *extension_point,
							       GType              type);
GLIB_AVAILABLE_IN_ALL
GType              g_io_extension_point_get_required_type     (GIOExtensionPoint *extension_point);
GLIB_AVAILABLE_IN_ALL
GList             *g_io_extension_point_get_extensions        (GIOExtensionPoint *extension_point);
GLIB_AVAILABLE_IN_ALL
GIOExtension *     g_io_extension_point_get_extension_by_name (GIOExtensionPoint *extension_point,
							       const char        *name);
GLIB_AVAILABLE_IN_ALL
GIOExtension *     g_io_extension_point_implement             (const char        *extension_point_name,
							       GType              type,
							       const char        *extension_name,
							       gint               priority);

GLIB_AVAILABLE_IN_ALL
GType              g_io_extension_get_type                    (GIOExtension      *extension);
GLIB_AVAILABLE_IN_ALL
const char *       g_io_extension_get_name                    (GIOExtension      *extension);
GLIB_AVAILABLE_IN_ALL
gint               g_io_extension_get_priority                (GIOExtension      *extension);
GLIB_AVAILABLE_IN_ALL
GTypeClass*        g_io_extension_ref_class                   (GIOExtension      *extension);


/* API for the modules to implement */

/**
 * g_io_module_load:
 * @module: a #GIOModule.
 *
 * Required API for GIO modules to implement.
 *
 * This function is run after the module has been loaded into GIO,
 * to initialize the module. Typically, this function will call
 * g_io_extension_point_implement().
 *
 * Since 2.56, this function should be named `g_io_<modulename>_load`, where
 * `modulename` is the plugin’s filename with the `lib` or `libgio` prefix and
 * everything after the first dot removed, and with `-` replaced with `_`
 * throughout. For example, `libgiognutls-helper.so` becomes `gnutls_helper`.
 * Using the new symbol names avoids name clashes when building modules
 * statically. The old symbol names continue to be supported, but cannot be used
 * for static builds.
 **/
GLIB_AVAILABLE_IN_ALL
void   g_io_module_load   (GIOModule *module);

/**
 * g_io_module_unload:
 * @module: a #GIOModule.
 *
 * Required API for GIO modules to implement.
 *
 * This function is run when the module is being unloaded from GIO,
 * to finalize the module.
 *
 * Since 2.56, this function should be named `g_io_<modulename>_unload`, where
 * `modulename` is the plugin’s filename with the `lib` or `libgio` prefix and
 * everything after the first dot removed, and with `-` replaced with `_`
 * throughout. For example, `libgiognutls-helper.so` becomes `gnutls_helper`.
 * Using the new symbol names avoids name clashes when building modules
 * statically. The old symbol names continue to be supported, but cannot be used
 * for static builds.
 **/
GLIB_AVAILABLE_IN_ALL
void   g_io_module_unload (GIOModule *module);

/**
 * g_io_module_query:
 *
 * Optional API for GIO modules to implement.
 *
 * Should return a list of all the extension points that may be
 * implemented in this module.
 *
 * This method will not be called in normal use, however it may be
 * called when probing existing modules and recording which extension
 * points that this model is used for. This means we won't have to
 * load and initialize this module unless its needed.
 *
 * If this function is not implemented by the module the module will
 * always be loaded, initialized and then unloaded on application
 * startup so that it can register its extension points during init.
 *
 * Note that a module need not actually implement all the extension
 * points that g_io_module_query() returns, since the exact list of
 * extension may depend on runtime issues. However all extension
 * points actually implemented must be returned by g_io_module_query()
 * (if defined).
 *
 * When installing a module that implements g_io_module_query() you must
 * run gio-querymodules in order to build the cache files required for
 * lazy loading.
 *
 * Since 2.56, this function should be named `g_io_<modulename>_query`, where
 * `modulename` is the plugin’s filename with the `lib` or `libgio` prefix and
 * everything after the first dot removed, and with `-` replaced with `_`
 * throughout. For example, `libgiognutls-helper.so` becomes `gnutls_helper`.
 * Using the new symbol names avoids name clashes when building modules
 * statically. The old symbol names continue to be supported, but cannot be used
 * for static builds.
 *
 * Returns: (transfer full): A %NULL-terminated array of strings,
 *     listing the supported extension points of the module. The array
 *     must be suitable for freeing with g_strfreev().
 *
 * Since: 2.24
 **/
GLIB_AVAILABLE_IN_ALL
char **g_io_module_query (void);

G_END_DECLS

#endif /* __G_IO_MODULE_H__ */
