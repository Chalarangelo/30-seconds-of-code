/* grefcount.h: Reference counting
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

#ifndef __GREFCOUNT_H__
#define __GREFCOUNT_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gatomic.h>
#include <glib/gtypes.h>

G_BEGIN_DECLS

GLIB_AVAILABLE_IN_2_58
void            g_ref_count_init                (grefcount       *rc);
GLIB_AVAILABLE_IN_2_58
void            g_ref_count_inc                 (grefcount       *rc);
GLIB_AVAILABLE_IN_2_58
gboolean        g_ref_count_dec                 (grefcount       *rc);
GLIB_AVAILABLE_IN_2_58
gboolean        g_ref_count_compare             (grefcount       *rc,
                                                 gint             val);

GLIB_AVAILABLE_IN_2_58
void            g_atomic_ref_count_init         (gatomicrefcount *arc);
GLIB_AVAILABLE_IN_2_58
void            g_atomic_ref_count_inc          (gatomicrefcount *arc);
GLIB_AVAILABLE_IN_2_58
gboolean        g_atomic_ref_count_dec          (gatomicrefcount *arc);
GLIB_AVAILABLE_IN_2_58
gboolean        g_atomic_ref_count_compare      (gatomicrefcount *arc,
                                                 gint             val);

/* On GCC we can use __extension__ to inline the API without using
 * ancillary functions; we only do this when disabling checks, as
 * it disables warnings when saturating the reference counters
 */
#if defined(__GNUC__) && defined(G_DISABLE_CHECKS)

# define g_ref_count_init(rc) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (grefcount)); \
    (void) (0 ? *(rc) ^ *(rc) : 1); \
    *(rc) = -1; \
  }))

# define g_ref_count_inc(rc) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (grefcount)); \
    (void) (0 ? *(rc) ^ *(rc) : 1); \
    if (*(rc) == G_MININT) ; else { \
      *(rc) -= 1; \
    } \
  }))

# define g_ref_count_dec(rc) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (grefcount)); \
    grefcount __rc = *(rc); \
    __rc += 1; \
    if (__rc == 0) ; else { \
      *(rc) = __rc; \
    } \
    (gboolean) (__rc == 0); \
  }))

# define g_ref_count_compare(rc,val) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (grefcount)); \
    (void) (0 ? *(rc) ^ (val) : 1); \
    (gboolean) (*(rc) == -(val)); \
  }))

# define g_atomic_ref_count_init(rc) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (gatomicrefcount)); \
    (void) (0 ? *(rc) ^ *(rc) : 1); \
    *(rc) = 1; \
  }))

# define g_atomic_ref_count_inc(rc) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (gatomicrefcount)); \
    (void) (0 ? *(rc) ^ *(rc) : 1); \
    (void) (g_atomic_int_get (rc) == G_MAXINT ? 0 : g_atomic_int_inc ((rc))); \
  }))

# define g_atomic_ref_count_dec(rc) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (gatomicrefcount)); \
    (void) (0 ? *(rc) ^ *(rc) : 1); \
    g_atomic_int_dec_and_test ((rc)); \
  }))

# define g_atomic_ref_count_compare(rc,val) \
  (G_GNUC_EXTENSION ({ \
    G_STATIC_ASSERT (sizeof *(rc) == sizeof (gatomicrefcount)); \
    (void) (0 ? *(rc) ^ (val) : 1); \
    (gboolean) (g_atomic_int_get (rc) == (val)); \
  }))

#endif /* __GNUC__ && G_DISABLE_CHECKS */

G_END_DECLS

#endif /* __GREFCOUNT_H__ */
