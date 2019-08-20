/* GdkPixbuf library - GdkPixbuf Macros
 *
 * Copyright (C) 2016 Chun-wei Fan
 *
 * Authors: Chun-wei Fan <fanc999@yahoo.com.tw>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#if defined(GDK_PIXBUF_DISABLE_SINGLE_INCLUDES) && !defined (GDK_PIXBUF_H_INSIDE) && !defined (GDK_PIXBUF_COMPILATION)
#error "Only <gdk-pixbuf/gdk-pixbuf.h> can be included directly."
#endif

#ifndef GDK_PIXBUF_MACROS_H
#define GDK_PIXBUF_MACROS_H

#include <glib.h>

#include <gdk-pixbuf/gdk-pixbuf-features.h>

/**
 * GDK_PIXBUF_CHECK_VERSION:
 * @major: major version (e.g. 2 for version 2.34.0)
 * @minor: minor version (e.g. 34 for version 2.34.0)
 * @micro: micro version (e.g. 0 for version 2.34.0)
 *
 * Macro to test the version of GdkPixbuf being compiled against.
 *
 * Returns: %TRUE if the version of the GdkPixbuf header files
 * is the same as or newer than the passed-in version.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_CHECK_VERSION(major, minor, micro) \
	(GDK_PIXBUF_MAJOR > (major) || \
	(GDK_PIXBUF_MAJOR == (major) && GDK_PIXBUF_MINOR > (minor)) || \
	(GDK_PIXBUF_MAJOR == (major) && GDK_PIXBUF_MINOR == (minor) && \
	 GDK_PIXBUF_MICRO >= (micro)))

/**
 * GDK_PIXBUF_VERSION_2_0:
 *
 * A macro that evaluates to the 2.0 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_0 (G_ENCODE_VERSION (2, 0))

/**
 * GDK_PIXBUF_VERSION_2_2:
 *
 * A macro that evaluates to the 2.2 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_2 (G_ENCODE_VERSION (2, 2))

/**
 * GDK_PIXBUF_VERSION_2_4:
 *
 * A macro that evaluates to the 2.4 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_4 (G_ENCODE_VERSION (2, 4))

/**
 * GDK_PIXBUF_VERSION_2_6:
 *
 * A macro that evaluates to the 2.6 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_6 (G_ENCODE_VERSION (2, 6))

/**
 * GDK_PIXBUF_VERSION_2_8:
 *
 * A macro that evaluates to the 2.8 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_8 (G_ENCODE_VERSION (2, 8))

/**
 * GDK_PIXBUF_VERSION_2_10:
 *
 * A macro that evaluates to the 2.10 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_10 (G_ENCODE_VERSION (2, 10))

/**
 * GDK_PIXBUF_VERSION_2_12:
 *
 * A macro that evaluates to the 2.12 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_12 (G_ENCODE_VERSION (2, 12))

/**
 * GDK_PIXBUF_VERSION_2_14:
 *
 * A macro that evaluates to the 2.14 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_14 (G_ENCODE_VERSION (2, 14))

/**
 * GDK_PIXBUF_VERSION_2_16:
 *
 * A macro that evaluates to the 2.16 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_16 (G_ENCODE_VERSION (2, 16))

/**
 * GDK_PIXBUF_VERSION_2_18:
 *
 * A macro that evaluates to the 2.18 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_18 (G_ENCODE_VERSION (2, 18))

/**
 * GDK_PIXBUF_VERSION_2_20:
 *
 * A macro that evaluates to the 2.20 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_20 (G_ENCODE_VERSION (2, 20))

/**
 * GDK_PIXBUF_VERSION_2_22:
 *
 * A macro that evaluates to the 2.22 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_22 (G_ENCODE_VERSION (2, 22))

/**
 * GDK_PIXBUF_VERSION_2_24:
 *
 * A macro that evaluates to the 2.24 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_24 (G_ENCODE_VERSION (2, 24))

/**
 * GDK_PIXBUF_VERSION_2_26:
 *
 * A macro that evaluates to the 2.26 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_26 (G_ENCODE_VERSION (2, 26))

/**
 * GDK_PIXBUF_VERSION_2_28:
 *
 * A macro that evaluates to the 2.28 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_28 (G_ENCODE_VERSION (2, 28))

/**
 * GDK_PIXBUF_VERSION_2_30:
 *
 * A macro that evaluates to the 2.30 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_30 (G_ENCODE_VERSION (2, 30))

/**
 * GDK_PIXBUF_VERSION_2_32:
 *
 * A macro that evaluates to the 2.32 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_32 (G_ENCODE_VERSION (2, 32))

/**
 * GDK_PIXBUF_VERSION_2_34:
 *
 * A macro that evaluates to the 2.34 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_34 (G_ENCODE_VERSION (2, 34))

/**
 * GDK_PIXBUF_VERSION_2_36:
 *
 * A macro that evaluates to the 2.36 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.36
 */
#define GDK_PIXBUF_VERSION_2_36 (G_ENCODE_VERSION (2, 36))

/**
 * GDK_PIXBUF_VERSION_2_38:
 *
 * A macro that evaluates to the 2.38 version of GdkPixbuf,
 * in a format that can be used by the C pre-processor.
 *
 * Since: 2.38
 */
#define GDK_PIXBUF_VERSION_2_38 (G_ENCODE_VERSION (2, 38))

#ifndef __GTK_DOC_IGNORE__
#if (GDK_PIXBUF_MINOR % 2)
#define GDK_PIXBUF_VERSION_CUR_STABLE (G_ENCODE_VERSION (GDK_PIXBUF_MAJOR, GDK_PIXBUF_MINOR + 1))
#else
#define GDK_PIXBUF_VERSION_CUR_STABLE (G_ENCODE_VERSION (GDK_PIXBUF_MAJOR, GDK_PIXBUF_MINOR))
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if (GDK_PIXBUF_MINOR % 2)
#define GDK_PIXBUF_VERSION_PREV_STABLE (G_ENCODE_VERSION (GDK_PIXBUF_MAJOR, GDK_PIXBUF_MINOR - 1))
#else
#define GDK_PIXBUF_VERSION_PREV_STABLE (G_ENCODE_VERSION (GDK_PIXBUF_MAJOR, GDK_PIXBUF_MINOR - 2))
#endif
#endif /* __GTK_DOC_IGNORE__ */

/**
 * GDK_PIXBUF_VERSION_MIN_REQUIRED:
 *
 * A macro that should be defined by the user prior to including
 * the gdk-pixbuf.h header.
 * The definition should be one of the predefined version
 * macros: %GDK_PIXBUF_VERSION_2_0, %GDK_PIXBUF_VERSION_2_2, ...
 *
 * This macro defines the lower bound for the GdkPixbuf API to use.
 *
 * If a function has been deprecated in a newer version of GdkPixbuf,
 * defining this symbol hides the compiler warnings for those functions
 * without disabling warnings for the other deprecated functions.
 *
 * <warning>
 * Warning: if you define this macro, do not forget to update it! Especially
 * when writing new code. Otherwise you can miss the new deprecations.
 * </warning>
 *
 * Since: 2.36
 */
#ifndef GDK_PIXBUF_VERSION_MIN_REQUIRED
#define GDK_PIXBUF_VERSION_MIN_REQUIRED (GDK_PIXBUF_VERSION_CUR_STABLE)
#endif

/**
 * GDK_PIXBUF_VERSION_MAX_ALLOWED:
 *
 * A macro that should be defined by the user prior to including
 * the gdk-pixbuf.h header.
 * The definition should be one of the predefined version
 * macros: %GDK_PIXBUF_VERSION_2_0, %GDK_PIXBUF_VERSION_2_2, ...
 *
 * This macro defines the upper bound for the GdkPixbuf API to use.
 *
 * If a function has been introduced in a newer version of GdkPixbuf,
 * it is possible to use this symbol to get compiler warnings when
 * trying to use that function.
 *
 * Since: 2.36
 */
#ifndef GDK_PIXBUF_VERSION_MAX_ALLOWED
#if GDK_PIXBUF_VERSION_MIN_REQUIRED > GDK_PIXBUF_VERSION_PREV_STABLE
#define GDK_PIXBUF_VERSION_MAX_ALLOWED  GDK_PIXBUF_VERSION_MIN_REQUIRED
#else
#define GDK_PIXBUF_VERSION_MAX_ALLOWED GDK_PIXBUF_VERSION_CUR_STABLE
#endif
#endif

/* sanity checks */
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_MIN_REQUIRED
#error "GDK_PIXBUF_VERSION_MAX_ALLOWED must be >= GDK_PIXBUF_VERSION_MIN_REQUIRED"
#endif
#if GDK_PIXBUF_VERSION_MIN_REQUIRED < GDK_PIXBUF_VERSION_2_0
#error "GDK_PIXBUF_VERSION_MIN_REQUIRED must be >= GDK_PIXBUF_VERSION_2_0"
#endif

#ifndef __GTK_DOC_IGNORE__
#define GDK_PIXBUF_AVAILABLE_IN_ALL _GDK_PIXBUF_EXTERN
#endif

/* Every new stable minor release should add a set of macros here */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_0
#define GDK_PIXBUF_DEPRECATED_IN_2_0 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_0_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_0 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_0_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_0
#define GDK_PIXBUF_AVAILABLE_IN_2_0 G_UNAVAILABLE(2, 0) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_0 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_2
#define GDK_PIXBUF_DEPRECATED_IN_2_2 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_2_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_2 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_2_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_2
#define GDK_PIXBUF_AVAILABLE_IN_2_2 G_UNAVAILABLE(2, 2) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_2 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_4
#define GDK_PIXBUF_DEPRECATED_IN_2_4 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_4_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_4 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_4_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_4
#define GDK_PIXBUF_AVAILABLE_IN_2_4 G_UNAVAILABLE(2, 4) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_4 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_6
#define GDK_PIXBUF_DEPRECATED_IN_2_6 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_6_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_6 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_6_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_6
#define GDK_PIXBUF_AVAILABLE_IN_2_6 G_UNAVAILABLE(2, 6) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_6 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_8
#define GDK_PIXBUF_DEPRECATED_IN_2_8 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_8_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_8 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_8_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_8
#define GDK_PIXBUF_AVAILABLE_IN_2_8 G_UNAVAILABLE(2, 8) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_8 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_10
#define GDK_PIXBUF_DEPRECATED_IN_2_10 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_10_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_10 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_10_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_10
#define GDK_PIXBUF_AVAILABLE_IN_2_10 G_UNAVAILABLE(2, 10) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_10 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_12
#define GDK_PIXBUF_DEPRECATED_IN_2_12 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_12_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_12 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_12_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_12
#define GDK_PIXBUF_AVAILABLE_IN_2_12 G_UNAVAILABLE(2, 12) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_12 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_14
#define GDK_PIXBUF_DEPRECATED_IN_2_14 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_14_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_14 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_14_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_14
#define GDK_PIXBUF_AVAILABLE_IN_2_14 G_UNAVAILABLE(2, 14) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_14 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_16
#define GDK_PIXBUF_DEPRECATED_IN_2_16 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_16_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_16 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_16_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_16
#define GDK_PIXBUF_AVAILABLE_IN_2_16 G_UNAVAILABLE(2, 16) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_16 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_18
#define GDK_PIXBUF_DEPRECATED_IN_2_18 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_18_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_18 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_18_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_18
#define GDK_PIXBUF_AVAILABLE_IN_2_18 G_UNAVAILABLE(2, 18) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_18 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_20
#define GDK_PIXBUF_DEPRECATED_IN_2_20 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_20_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_20 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_20_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_20
#define GDK_PIXBUF_AVAILABLE_IN_2_20 G_UNAVAILABLE(2, 20) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_20 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_22
#define GDK_PIXBUF_DEPRECATED_IN_2_22 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_22_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_22 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_22_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_22
#define GDK_PIXBUF_AVAILABLE_IN_2_22 G_UNAVAILABLE(2, 22) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_22 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_24
#define GDK_PIXBUF_DEPRECATED_IN_2_24 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_24_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_24 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_24_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_24
#define GDK_PIXBUF_AVAILABLE_IN_2_24 G_UNAVAILABLE(2, 24) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_24 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_26
#define GDK_PIXBUF_DEPRECATED_IN_2_26 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_26_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_26 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_26_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_26
#define GDK_PIXBUF_AVAILABLE_IN_2_26 G_UNAVAILABLE(2, 26) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_26 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_28
#define GDK_PIXBUF_DEPRECATED_IN_2_28 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_28_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_28 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_28_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_28
#define GDK_PIXBUF_AVAILABLE_IN_2_28 G_UNAVAILABLE(2, 28) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_28 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_30
#define GDK_PIXBUF_DEPRECATED_IN_2_30 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_30_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_30 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_30_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_30
#define GDK_PIXBUF_AVAILABLE_IN_2_30 G_UNAVAILABLE(2, 30) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_30 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_32
#define GDK_PIXBUF_DEPRECATED_IN_2_32 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_32_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_32 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_32_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_32
#define GDK_PIXBUF_AVAILABLE_IN_2_32 G_UNAVAILABLE(2, 32) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_32 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_34
#define GDK_PIXBUF_DEPRECATED_IN_2_34 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_34_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_34 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_34_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_34
#define GDK_PIXBUF_AVAILABLE_IN_2_34 G_UNAVAILABLE(2, 34) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_34 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_36
#define GDK_PIXBUF_DEPRECATED_IN_2_36 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_36_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_36 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_36_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_36
#define GDK_PIXBUF_AVAILABLE_IN_2_36 G_UNAVAILABLE(2, 36) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_36 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MIN_REQUIRED >= GDK_PIXBUF_VERSION_2_38
#define GDK_PIXBUF_DEPRECATED_IN_2_38 G_DEPRECATED _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_38_FOR(f) G_DEPRECATED_FOR(f) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_DEPRECATED_IN_2_38 _GDK_PIXBUF_EXTERN
#define GDK_PIXBUF_DEPRECATED_IN_2_38_FOR(f) _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#ifndef __GTK_DOC_IGNORE__
#if GDK_PIXBUF_VERSION_MAX_ALLOWED < GDK_PIXBUF_VERSION_2_38
#define GDK_PIXBUF_AVAILABLE_IN_2_38 G_UNAVAILABLE(2, 38) _GDK_PIXBUF_EXTERN
#else
#define GDK_PIXBUF_AVAILABLE_IN_2_38 _GDK_PIXBUF_EXTERN
#endif
#endif /* __GTK_DOC_IGNORE__ */

#endif /* GDK_PIXBUF_MACROS_H */
