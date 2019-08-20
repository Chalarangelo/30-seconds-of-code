/* grcbox.h: Reference counted data
 *
 * Copyright 2018  Emmanuele Bassi
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

#pragma once

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gmem.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_2_58
gpointer        g_rc_box_alloc                  (gsize           block_size) G_GNUC_MALLOC G_GNUC_ALLOC_SIZE(1);
GLIB_AVAILABLE_IN_2_58
gpointer        g_rc_box_alloc0                 (gsize           block_size) G_GNUC_MALLOC G_GNUC_ALLOC_SIZE(1);
GLIB_AVAILABLE_IN_2_58
gpointer        g_rc_box_dup                    (gsize           block_size,
                                                 gconstpointer   mem_block) G_GNUC_ALLOC_SIZE(1);
GLIB_AVAILABLE_IN_2_58
gpointer        g_rc_box_acquire                (gpointer        mem_block);
GLIB_AVAILABLE_IN_2_58
void            g_rc_box_release                (gpointer        mem_block);
GLIB_AVAILABLE_IN_2_58
void            g_rc_box_release_full           (gpointer        mem_block,
                                                 GDestroyNotify  clear_func);

GLIB_AVAILABLE_IN_2_58
gsize           g_rc_box_get_size               (gpointer        mem_block);

GLIB_AVAILABLE_IN_2_58
gpointer        g_atomic_rc_box_alloc           (gsize           block_size) G_GNUC_MALLOC G_GNUC_ALLOC_SIZE(1);
GLIB_AVAILABLE_IN_2_58
gpointer        g_atomic_rc_box_alloc0          (gsize           block_size) G_GNUC_MALLOC G_GNUC_ALLOC_SIZE(1);
GLIB_AVAILABLE_IN_2_58
gpointer        g_atomic_rc_box_dup             (gsize           block_size,
                                                 gconstpointer   mem_block) G_GNUC_ALLOC_SIZE(1);
GLIB_AVAILABLE_IN_2_58
gpointer        g_atomic_rc_box_acquire         (gpointer        mem_block);
GLIB_AVAILABLE_IN_2_58
void            g_atomic_rc_box_release         (gpointer        mem_block);
GLIB_AVAILABLE_IN_2_58
void            g_atomic_rc_box_release_full    (gpointer        mem_block,
                                                 GDestroyNotify  clear_func);

GLIB_AVAILABLE_IN_2_58
gsize           g_atomic_rc_box_get_size        (gpointer        mem_block);

#define g_rc_box_new(type) \
  ((type *) g_rc_box_alloc (sizeof (type)))
#define g_rc_box_new0(type) \
  ((type *) g_rc_box_alloc0 (sizeof (type)))
#define g_atomic_rc_box_new(type) \
  ((type *) g_atomic_rc_box_alloc (sizeof (type)))
#define g_atomic_rc_box_new0(type) \
  ((type *) g_atomic_rc_box_alloc0 (sizeof (type)))

#ifdef g_has_typeof
/* Type check to avoid assigning references to different types */
# define g_rc_box_acquire(mem_block) \
  ((__typeof__(mem_block)) (g_rc_box_acquire) (mem_block))
# define g_atomic_rc_box_acquire(mem_block) \
  ((__typeof__(mem_block)) (g_atomic_rc_box_acquire) (mem_block))

/* Type check to avoid duplicating data to different types */
# define g_rc_box_dup(block_size,mem_block) \
  ((__typeof__(mem_block)) (g_rc_box_dup) (block_size,mem_block))
# define g_atomic_rc_box_dup(block_size,mem_block) \
  ((__typeof__(mem_block)) (g_atomic_rc_box_dup) (block_size,mem_block))
#endif

G_END_DECLS
