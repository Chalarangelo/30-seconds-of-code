/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-impl-utils.h:
 *
 * Copyright (C) 2002-2006 Jody Goldberg (jody@gnome.org)
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of the GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */

#ifndef GSF_IMPL_UTILS_H
#define GSF_IMPL_UTILS_H

#include <gsf/gsf.h>
#include <glib-object.h>

G_BEGIN_DECLS

/* We need to do this with a version check as this header gets installed.
 *
 * DEPRECATED in favour of G_PARAM_STATIC_STRINGS
 **/
#if GLIB_CHECK_VERSION(2,7,0)
#define GSF_PARAM_STATIC (G_PARAM_STATIC_NAME | G_PARAM_STATIC_NICK | G_PARAM_STATIC_BLURB)
#else
#define GSF_PARAM_STATIC 0
#endif

/*************************************************************************/

#define	GSF_CLASS_FULL(name, prefix, base_init, base_finalize, \
		       class_init, class_finalize, instance_init, parent_type, \
		       abstract, interface_decl) \
GType									\
prefix ## _get_type (void)						\
{									\
	static GType type = 0;						\
	if (G_UNLIKELY  (type == 0)) {					\
		static GTypeInfo const object_info = {			\
			sizeof (name ## Class),				\
			(GBaseInitFunc) base_init,			\
			(GBaseFinalizeFunc) base_finalize,		\
			(GClassInitFunc) class_init,			\
			(GClassFinalizeFunc) class_finalize,		\
			NULL,	/* class_data */			\
			sizeof (name),					\
			0,	/* n_preallocs */			\
			(GInstanceInitFunc) instance_init,		\
			NULL						\
		};							\
		type = g_type_register_static (parent_type, #name,	\
			&object_info, (GTypeFlags) abstract);		\
		interface_decl						\
	}								\
	return type;							\
}

/**
 * GSF_CLASS:
 * @name: Name of the class.
 * @prefix: Symbol prefix designating the namespace to be used for
 * implementing the class.
 * @class_init: Initialisation function of type #GClassInitFunc for the class.
 * @instance_init: Initialisation function of type #GInstanceInitFunc
 * for an instance of the class.
 * @parent: Parent class to this class.
 *
 * Set up a GSF class.
 *
 */
#define	GSF_CLASS(name, prefix, class_init, instance_init, parent) \
	GSF_CLASS_FULL(name, prefix, NULL, NULL, class_init, NULL, \
				instance_init, parent, 0, {})
#define	GSF_CLASS_ABSTRACT(name, prefix, class_init, instance_init, parent) \
	GSF_CLASS_FULL(name, prefix, NULL, NULL, class_init, NULL, \
		       instance_init, parent, G_TYPE_FLAG_ABSTRACT, {})

#define GSF_INTERFACE_FULL(type, init_func, iface_type) {	\
	static GInterfaceInfo const iface = {			\
		(GInterfaceInitFunc) init_func, NULL, NULL };	\
	g_type_add_interface_static (type, iface_type, &iface);	\
}

#define GSF_INTERFACE(init_func, iface_type)			\
	GSF_INTERFACE_FULL(type, init_func, iface_type)

/*************************************************************************/

#define	GSF_DYNAMIC_CLASS_FULL(name, prefix, base_init, base_finalize, \
				   class_init,  class_finalize, instance_init, parent_type, \
			       abstract, interface_decl) 		\
static GType prefix ## _type; 						\
									\
GType prefix ## _get_type (void);					\
void  prefix ## _register_type (GTypeModule *module);			\
									\
GType									\
prefix ## _get_type (void)						\
{									\
	g_return_val_if_fail (prefix ## _type != 0, 0); 		\
	return prefix ## _type;						\
}									\
void									\
prefix ## _register_type (GTypeModule *module)				\
{									\
	GTypeInfo const type_info = {					\
		sizeof (name ## Class),					\
		(GBaseInitFunc) base_init,				\
		(GBaseFinalizeFunc) base_finalize,			\
		(GClassInitFunc) class_init,				\
		(GClassFinalizeFunc) class_finalize,			\
		NULL,	/* class_data */				\
		sizeof (name),						\
		0,	/* n_preallocs */				\
		(GInstanceInitFunc) instance_init,			\
		NULL							\
	};								\
	GType type;							\
									\
	g_return_if_fail (prefix ## _type == 0); 			\
									\
	prefix ## _type = type = g_type_module_register_type (module,	\
		parent_type, #name, &type_info, (GTypeFlags) abstract);	\
	interface_decl							\
}

#define	GSF_DYNAMIC_CLASS(name, prefix, class_init, instance_init, parent)	\
	GSF_DYNAMIC_CLASS_FULL(name, prefix, NULL, NULL, class_init, NULL, 	\
				   instance_init, parent, 0, {})
#define	GSF_DYNAMIC_CLASS_ABSTRACT(name, prefix, class_init, instance_init, parent) \
	GSF_DYNAMIC_CLASS_FULL(name, prefix, NULL, NULL, class_init, NULL, 	\
		       instance_init, parent, G_TYPE_FLAG_ABSTRACT, {})

#define GSF_DYNAMIC_INTERFACE_FULL(type, init_func, iface_type, module) {	\
	GInterfaceInfo const iface = {						\
		(GInterfaceInitFunc) init_func, NULL, NULL };			\
	g_type_module_add_interface (module, type, iface_type, &iface);		\
}

#define GSF_DYNAMIC_INTERFACE(init_func, iface_type, module)			\
	GSF_DYNAMIC_INTERFACE_FULL(type, init_func, iface_type, module)

G_END_DECLS

#endif /* GSF_IMPL_UTILS_H */
