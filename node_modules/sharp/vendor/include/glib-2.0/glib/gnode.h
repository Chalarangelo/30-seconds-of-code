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

#ifndef __G_NODE_H__
#define __G_NODE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gmem.h>

G_BEGIN_DECLS

typedef struct _GNode		GNode;

/* Tree traverse flags */
typedef enum
{
  G_TRAVERSE_LEAVES     = 1 << 0,
  G_TRAVERSE_NON_LEAVES = 1 << 1,
  G_TRAVERSE_ALL        = G_TRAVERSE_LEAVES | G_TRAVERSE_NON_LEAVES,
  G_TRAVERSE_MASK       = 0x03,
  G_TRAVERSE_LEAFS      = G_TRAVERSE_LEAVES,
  G_TRAVERSE_NON_LEAFS  = G_TRAVERSE_NON_LEAVES
} GTraverseFlags;

/* Tree traverse orders */
typedef enum
{
  G_IN_ORDER,
  G_PRE_ORDER,
  G_POST_ORDER,
  G_LEVEL_ORDER
} GTraverseType;

typedef gboolean	(*GNodeTraverseFunc)	(GNode	       *node,
						 gpointer	data);
typedef void		(*GNodeForeachFunc)	(GNode	       *node,
						 gpointer	data);

/**
 * GCopyFunc:
 * @src: (not nullable): A pointer to the data which should be copied
 * @data: Additional data
 *
 * A function of this signature is used to copy the node data 
 * when doing a deep-copy of a tree.
 *
 * Returns: (not nullable): A pointer to the copy
 *
 * Since: 2.4
 */
typedef gpointer	(*GCopyFunc)            (gconstpointer  src,
                                                 gpointer       data);

/* N-way tree implementation
 */
struct _GNode
{
  gpointer data;
  GNode	  *next;
  GNode	  *prev;
  GNode	  *parent;
  GNode	  *children;
};

/**
 * G_NODE_IS_ROOT:
 * @node: a #GNode
 *
 * Returns %TRUE if a #GNode is the root of a tree.
 *
 * Returns: %TRUE if the #GNode is the root of a tree 
 *     (i.e. it has no parent or siblings)
 */
#define	 G_NODE_IS_ROOT(node)	(((GNode*) (node))->parent == NULL && \
				 ((GNode*) (node))->prev == NULL && \
				 ((GNode*) (node))->next == NULL)

/**
 * G_NODE_IS_LEAF:
 * @node: a #GNode
 *
 * Returns %TRUE if a #GNode is a leaf node.
 *
 * Returns: %TRUE if the #GNode is a leaf node 
 *     (i.e. it has no children)
 */
#define	 G_NODE_IS_LEAF(node)	(((GNode*) (node))->children == NULL)

GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_new		(gpointer	   data);
GLIB_AVAILABLE_IN_ALL
void	 g_node_destroy		(GNode		  *root);
GLIB_AVAILABLE_IN_ALL
void	 g_node_unlink		(GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*   g_node_copy_deep       (GNode            *node,
				 GCopyFunc         copy_func,
				 gpointer          data);
GLIB_AVAILABLE_IN_ALL
GNode*   g_node_copy            (GNode            *node);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_insert		(GNode		  *parent,
				 gint		   position,
				 GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_insert_before	(GNode		  *parent,
				 GNode		  *sibling,
				 GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*   g_node_insert_after    (GNode            *parent,
				 GNode            *sibling,
				 GNode            *node); 
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_prepend		(GNode		  *parent,
				 GNode		  *node);
GLIB_AVAILABLE_IN_ALL
guint	 g_node_n_nodes		(GNode		  *root,
				 GTraverseFlags	   flags);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_get_root	(GNode		  *node);
GLIB_AVAILABLE_IN_ALL
gboolean g_node_is_ancestor	(GNode		  *node,
				 GNode		  *descendant);
GLIB_AVAILABLE_IN_ALL
guint	 g_node_depth		(GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_find		(GNode		  *root,
				 GTraverseType	   order,
				 GTraverseFlags	   flags,
				 gpointer	   data);

/* convenience macros */
/**
 * g_node_append:
 * @parent: the #GNode to place the new #GNode under
 * @node: the #GNode to insert
 *
 * Inserts a #GNode as the last child of the given parent.
 *
 * Returns: the inserted #GNode
 */
#define g_node_append(parent, node)				\
     g_node_insert_before ((parent), NULL, (node))

/**
 * g_node_insert_data:
 * @parent: the #GNode to place the new #GNode under
 * @position: the position to place the new #GNode at. If position is -1, 
 *     the new #GNode is inserted as the last child of @parent
 * @data: the data for the new #GNode
 *
 * Inserts a new #GNode at the given position.
 *
 * Returns: the new #GNode
 */
#define	g_node_insert_data(parent, position, data)		\
     g_node_insert ((parent), (position), g_node_new (data))

/**
 * g_node_insert_data_after:
 * @parent: the #GNode to place the new #GNode under
 * @sibling: the sibling #GNode to place the new #GNode after
 * @data: the data for the new #GNode
 *
 * Inserts a new #GNode after the given sibling.
 *
 * Returns: the new #GNode
 */

#define	g_node_insert_data_after(parent, sibling, data)	\
     g_node_insert_after ((parent), (sibling), g_node_new (data))
/**
 * g_node_insert_data_before:
 * @parent: the #GNode to place the new #GNode under
 * @sibling: the sibling #GNode to place the new #GNode before
 * @data: the data for the new #GNode
 *
 * Inserts a new #GNode before the given sibling.
 *
 * Returns: the new #GNode
 */
#define	g_node_insert_data_before(parent, sibling, data)	\
     g_node_insert_before ((parent), (sibling), g_node_new (data))

/**
 * g_node_prepend_data:
 * @parent: the #GNode to place the new #GNode under
 * @data: the data for the new #GNode
 *
 * Inserts a new #GNode as the first child of the given parent.
 *
 * Returns: the new #GNode
 */
#define	g_node_prepend_data(parent, data)			\
     g_node_prepend ((parent), g_node_new (data))

/**
 * g_node_append_data:
 * @parent: the #GNode to place the new #GNode under
 * @data: the data for the new #GNode
 *
 * Inserts a new #GNode as the last child of the given parent.
 *
 * Returns: the new #GNode
 */
#define	g_node_append_data(parent, data)			\
     g_node_insert_before ((parent), NULL, g_node_new (data))

/* traversal function, assumes that 'node' is root
 * (only traverses 'node' and its subtree).
 * this function is just a high level interface to
 * low level traversal functions, optimized for speed.
 */
GLIB_AVAILABLE_IN_ALL
void	 g_node_traverse	(GNode		  *root,
				 GTraverseType	   order,
				 GTraverseFlags	   flags,
				 gint		   max_depth,
				 GNodeTraverseFunc func,
				 gpointer	   data);

/* return the maximum tree height starting with 'node', this is an expensive
 * operation, since we need to visit all nodes. this could be shortened by
 * adding 'guint height' to struct _GNode, but then again, this is not very
 * often needed, and would make g_node_insert() more time consuming.
 */
GLIB_AVAILABLE_IN_ALL
guint	 g_node_max_height	 (GNode *root);

GLIB_AVAILABLE_IN_ALL
void	 g_node_children_foreach (GNode		  *node,
				  GTraverseFlags   flags,
				  GNodeForeachFunc func,
				  gpointer	   data);
GLIB_AVAILABLE_IN_ALL
void	 g_node_reverse_children (GNode		  *node);
GLIB_AVAILABLE_IN_ALL
guint	 g_node_n_children	 (GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_nth_child	 (GNode		  *node,
				  guint		   n);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_last_child	 (GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_find_child	 (GNode		  *node,
				  GTraverseFlags   flags,
				  gpointer	   data);
GLIB_AVAILABLE_IN_ALL
gint	 g_node_child_position	 (GNode		  *node,
				  GNode		  *child);
GLIB_AVAILABLE_IN_ALL
gint	 g_node_child_index	 (GNode		  *node,
				  gpointer	   data);

GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_first_sibling	 (GNode		  *node);
GLIB_AVAILABLE_IN_ALL
GNode*	 g_node_last_sibling	 (GNode		  *node);

/**
 * g_node_prev_sibling:
 * @node: a #GNode
 *
 * Gets the previous sibling of a #GNode.
 *
 * Returns: the previous sibling of @node, or %NULL if @node is the first
 *     node or %NULL
 */
#define	 g_node_prev_sibling(node)	((node) ? \
					 ((GNode*) (node))->prev : NULL)

/**
 * g_node_next_sibling:
 * @node: a #GNode
 *
 * Gets the next sibling of a #GNode.
 *
 * Returns: the next sibling of @node, or %NULL if @node is the last node
 *     or %NULL
 */
#define	 g_node_next_sibling(node)	((node) ? \
					 ((GNode*) (node))->next : NULL)

/**
 * g_node_first_child:
 * @node: a #GNode
 *
 * Gets the first child of a #GNode.
 *
 * Returns: the first child of @node, or %NULL if @node is %NULL 
 *     or has no children
 */
#define	 g_node_first_child(node)	((node) ? \
					 ((GNode*) (node))->children : NULL)

G_END_DECLS

#endif /* __G_NODE_H__ */
