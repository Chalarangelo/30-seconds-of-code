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

#ifndef __G_HOOK_H__
#define __G_HOOK_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gmem.h>

G_BEGIN_DECLS


/* --- typedefs --- */
typedef struct _GHook		GHook;
typedef struct _GHookList	GHookList;

typedef gint		(*GHookCompareFunc)	(GHook		*new_hook,
						 GHook		*sibling);
typedef gboolean	(*GHookFindFunc)	(GHook		*hook,
						 gpointer	 data);
typedef void		(*GHookMarshaller)	(GHook		*hook,
						 gpointer	 marshal_data);
typedef gboolean	(*GHookCheckMarshaller)	(GHook		*hook,
						 gpointer	 marshal_data);
typedef void		(*GHookFunc)		(gpointer	 data);
typedef gboolean	(*GHookCheckFunc)	(gpointer	 data);
typedef void		(*GHookFinalizeFunc)	(GHookList      *hook_list,
						 GHook          *hook);
typedef enum
{
  G_HOOK_FLAG_ACTIVE	    = 1 << 0,
  G_HOOK_FLAG_IN_CALL	    = 1 << 1,
  G_HOOK_FLAG_MASK	    = 0x0f
} GHookFlagMask;
#define G_HOOK_FLAG_USER_SHIFT	(4)


/* --- structures --- */
struct _GHookList
{
  gulong	    seq_id;
  guint		    hook_size : 16;
  guint		    is_setup : 1;
  GHook		   *hooks;
  gpointer	    dummy3;
  GHookFinalizeFunc finalize_hook;
  gpointer	    dummy[2];
};
struct _GHook
{
  gpointer	 data;
  GHook		*next;
  GHook		*prev;
  guint		 ref_count;
  gulong	 hook_id;
  guint		 flags;
  gpointer	 func;
  GDestroyNotify destroy;
};


/* --- macros --- */
#define	G_HOOK(hook)			((GHook*) (hook))
#define	G_HOOK_FLAGS(hook)		(G_HOOK (hook)->flags)
#define	G_HOOK_ACTIVE(hook)		((G_HOOK_FLAGS (hook) & \
					  G_HOOK_FLAG_ACTIVE) != 0)
#define	G_HOOK_IN_CALL(hook)		((G_HOOK_FLAGS (hook) & \
					  G_HOOK_FLAG_IN_CALL) != 0)
#define G_HOOK_IS_VALID(hook)		(G_HOOK (hook)->hook_id != 0 && \
					 (G_HOOK_FLAGS (hook) & \
                                          G_HOOK_FLAG_ACTIVE))
#define G_HOOK_IS_UNLINKED(hook)	(G_HOOK (hook)->next == NULL && \
					 G_HOOK (hook)->prev == NULL && \
					 G_HOOK (hook)->hook_id == 0 && \
					 G_HOOK (hook)->ref_count == 0)


/* --- prototypes --- */
/* callback maintenance functions */
GLIB_AVAILABLE_IN_ALL
void	 g_hook_list_init		(GHookList		*hook_list,
					 guint			 hook_size);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_list_clear		(GHookList		*hook_list);
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_alloc			(GHookList		*hook_list);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_free			(GHookList		*hook_list,
					 GHook			*hook);
GLIB_AVAILABLE_IN_ALL
GHook *	 g_hook_ref			(GHookList		*hook_list,
					 GHook			*hook);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_unref			(GHookList		*hook_list,
					 GHook			*hook);
GLIB_AVAILABLE_IN_ALL
gboolean g_hook_destroy			(GHookList		*hook_list,
					 gulong			 hook_id);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_destroy_link		(GHookList		*hook_list,
					 GHook			*hook);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_prepend			(GHookList		*hook_list,
					 GHook			*hook);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_insert_before		(GHookList		*hook_list,
					 GHook			*sibling,
					 GHook			*hook);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_insert_sorted		(GHookList		*hook_list,
					 GHook			*hook,
					 GHookCompareFunc	 func);
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_get			(GHookList		*hook_list,
					 gulong			 hook_id);
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_find			(GHookList		*hook_list,
					 gboolean		 need_valids,
					 GHookFindFunc		 func,
					 gpointer		 data);
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_find_data		(GHookList		*hook_list,
					 gboolean		 need_valids,
					 gpointer		 data);
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_find_func		(GHookList		*hook_list,
					 gboolean		 need_valids,
					 gpointer		 func);
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_find_func_data		(GHookList		*hook_list,
					 gboolean		 need_valids,
					 gpointer		 func,
					 gpointer		 data);
/* return the first valid hook, and increment its reference count */
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_first_valid		(GHookList		*hook_list,
					 gboolean		 may_be_in_call);
/* return the next valid hook with incremented reference count, and
 * decrement the reference count of the original hook
 */
GLIB_AVAILABLE_IN_ALL
GHook*	 g_hook_next_valid		(GHookList		*hook_list,
					 GHook			*hook,
					 gboolean		 may_be_in_call);
/* GHookCompareFunc implementation to insert hooks sorted by their id */
GLIB_AVAILABLE_IN_ALL
gint	 g_hook_compare_ids		(GHook			*new_hook,
					 GHook			*sibling);
/* convenience macros */
#define	 g_hook_append( hook_list, hook )  \
     g_hook_insert_before ((hook_list), NULL, (hook))
/* invoke all valid hooks with the (*GHookFunc) signature.
 */
GLIB_AVAILABLE_IN_ALL
void	 g_hook_list_invoke		(GHookList		*hook_list,
					 gboolean		 may_recurse);
/* invoke all valid hooks with the (*GHookCheckFunc) signature,
 * and destroy the hook if FALSE is returned.
 */
GLIB_AVAILABLE_IN_ALL
void	 g_hook_list_invoke_check	(GHookList		*hook_list,
					 gboolean		 may_recurse);
/* invoke a marshaller on all valid hooks.
 */
GLIB_AVAILABLE_IN_ALL
void	 g_hook_list_marshal		(GHookList		*hook_list,
					 gboolean		 may_recurse,
					 GHookMarshaller	 marshaller,
					 gpointer		 marshal_data);
GLIB_AVAILABLE_IN_ALL
void	 g_hook_list_marshal_check	(GHookList		*hook_list,
					 gboolean		 may_recurse,
					 GHookCheckMarshaller	 marshaller,
					 gpointer		 marshal_data);

G_END_DECLS

#endif /* __G_HOOK_H__ */
