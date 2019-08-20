/* GObject - GLib Type, Object, Parameter and Signal Library
 * Copyright (C) 2000 Red Hat, Inc.
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
#ifndef __G_TYPE_PLUGIN_H__
#define __G_TYPE_PLUGIN_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include	<gobject/gtype.h>

G_BEGIN_DECLS

/* --- type macros --- */
#define G_TYPE_TYPE_PLUGIN		(g_type_plugin_get_type ())
#define G_TYPE_PLUGIN(inst)		(G_TYPE_CHECK_INSTANCE_CAST ((inst), G_TYPE_TYPE_PLUGIN, GTypePlugin))
#define G_TYPE_PLUGIN_CLASS(vtable)	(G_TYPE_CHECK_CLASS_CAST ((vtable), G_TYPE_TYPE_PLUGIN, GTypePluginClass))
#define G_IS_TYPE_PLUGIN(inst)		(G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_TYPE_PLUGIN))
#define G_IS_TYPE_PLUGIN_CLASS(vtable)	(G_TYPE_CHECK_CLASS_TYPE ((vtable), G_TYPE_TYPE_PLUGIN))
#define G_TYPE_PLUGIN_GET_CLASS(inst)	(G_TYPE_INSTANCE_GET_INTERFACE ((inst), G_TYPE_TYPE_PLUGIN, GTypePluginClass))


/* --- typedefs & structures --- */
typedef struct _GTypePluginClass		   GTypePluginClass;
/**
 * GTypePluginUse:
 * @plugin: the #GTypePlugin whose use count should be increased
 * 
 * The type of the @use_plugin function of #GTypePluginClass, which gets called
 * to increase the use count of @plugin.
 */
typedef void  (*GTypePluginUse)			  (GTypePlugin     *plugin);
/**
 * GTypePluginUnuse:
 * @plugin: the #GTypePlugin whose use count should be decreased
 * 
 * The type of the @unuse_plugin function of #GTypePluginClass.
 */
typedef void  (*GTypePluginUnuse)		  (GTypePlugin     *plugin);
/**
 * GTypePluginCompleteTypeInfo:
 * @plugin: the #GTypePlugin
 * @g_type: the #GType whose info is completed
 * @info: the #GTypeInfo struct to fill in
 * @value_table: the #GTypeValueTable to fill in
 * 
 * The type of the @complete_type_info function of #GTypePluginClass.
 */
typedef void  (*GTypePluginCompleteTypeInfo)	  (GTypePlugin     *plugin,
						   GType            g_type,
						   GTypeInfo       *info,
						   GTypeValueTable *value_table);
/**
 * GTypePluginCompleteInterfaceInfo:
 * @plugin: the #GTypePlugin
 * @instance_type: the #GType of an instantiable type to which the interface
 *  is added
 * @interface_type: the #GType of the interface whose info is completed
 * @info: the #GInterfaceInfo to fill in
 * 
 * The type of the @complete_interface_info function of #GTypePluginClass.
 */
typedef void  (*GTypePluginCompleteInterfaceInfo) (GTypePlugin     *plugin,
						   GType            instance_type,
						   GType            interface_type,
						   GInterfaceInfo  *info);
/**
 * GTypePlugin:
 * 
 * The GTypePlugin typedef is used as a placeholder 
 * for objects that implement the GTypePlugin interface.
 */
/**
 * GTypePluginClass:
 * @use_plugin: Increases the use count of the plugin.
 * @unuse_plugin: Decreases the use count of the plugin.
 * @complete_type_info: Fills in the #GTypeInfo and 
 *  #GTypeValueTable structs for the type. The structs are initialized
 *  with `memset(s, 0, sizeof (s))` before calling this function.
 * @complete_interface_info: Fills in missing parts of the #GInterfaceInfo 
 *  for the interface. The structs is initialized with
 *  `memset(s, 0, sizeof (s))` before calling this function.
 * 
 * The #GTypePlugin interface is used by the type system in order to handle
 * the lifecycle of dynamically loaded types.
 */
struct _GTypePluginClass
{
  /*< private >*/
  GTypeInterface		   base_iface;
  
  /*< public >*/
  GTypePluginUse		   use_plugin;
  GTypePluginUnuse		   unuse_plugin;
  GTypePluginCompleteTypeInfo	   complete_type_info;
  GTypePluginCompleteInterfaceInfo complete_interface_info;
};


/* --- prototypes --- */
GLIB_AVAILABLE_IN_ALL
GType	g_type_plugin_get_type			(void)	G_GNUC_CONST;
GLIB_AVAILABLE_IN_ALL
void	g_type_plugin_use			(GTypePlugin	 *plugin);
GLIB_AVAILABLE_IN_ALL
void	g_type_plugin_unuse			(GTypePlugin	 *plugin);
GLIB_AVAILABLE_IN_ALL
void	g_type_plugin_complete_type_info	(GTypePlugin     *plugin,
						 GType            g_type,
						 GTypeInfo       *info,
						 GTypeValueTable *value_table);
GLIB_AVAILABLE_IN_ALL
void	g_type_plugin_complete_interface_info	(GTypePlugin     *plugin,
						 GType            instance_type,
						 GType            interface_type,
						 GInterfaceInfo  *info);

G_END_DECLS

#endif /* __G_TYPE_PLUGIN_H__ */
