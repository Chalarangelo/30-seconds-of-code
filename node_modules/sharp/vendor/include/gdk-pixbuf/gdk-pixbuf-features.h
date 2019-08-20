#if defined(GDK_PIXBUF_DISABLE_SINGLE_INCLUDES) && !defined (GDK_PIXBUF_H_INSIDE) && !defined (GDK_PIXBUF_COMPILATION)
#error "Only <gdk-pixbuf/gdk-pixbuf.h> can be included directly."
#endif

#ifndef GDK_PIXBUF_FEATURES_H
#define GDK_PIXBUF_FEATURES_H 1

#include <glib.h>

/**
 * SECTION:initialization_versions
 * @Short_description: 
Library version numbers.
 * @Title: Initialization and Versions
 * 
 * These macros and variables let you check the version of gdk-pixbuf
 * you're linking against.
 */

/**
 * GDK_PIXBUF_MAJOR:
 * 
 * Major version of gdk-pixbuf library, that is the "0" in
 * "0.8.2" for example.
 */
/**
 * GDK_PIXBUF_MINOR:
 * 
 * Minor version of gdk-pixbuf library, that is the "8" in
 * "0.8.2" for example.
 */
/**
 * GDK_PIXBUF_MICRO:
 * 
 * Micro version of gdk-pixbuf library, that is the "2" in
 * "0.8.2" for example.
 */
/**
 * GDK_PIXBUF_VERSION:
 * 
 * Contains the full version of the gdk-pixbuf header as a string.
 * This is the version being compiled against; contrast with
 * #gdk_pixbuf_version.
 */

#define GDK_PIXBUF_MAJOR (2)
#define GDK_PIXBUF_MINOR (38)
#define GDK_PIXBUF_MICRO (1)
#define GDK_PIXBUF_VERSION "2.38.1"

#ifndef _GDK_PIXBUF_EXTERN
#define _GDK_PIXBUF_EXTERN extern
#endif

/* We prefix variable declarations so they can
 * properly get exported/imported from Windows DLLs.
 */
#ifdef G_PLATFORM_WIN32
#  ifdef GDK_PIXBUF_STATIC_COMPILATION
#    define GDK_PIXBUF_VAR extern
#  else /* !GDK_PIXBUF_STATIC_COMPILATION */
#    ifdef GDK_PIXBUF_C_COMPILATION
#      ifdef DLL_EXPORT
#        define GDK_PIXBUF_VAR _GDK_PIXBUF_EXTERN
#      else /* !DLL_EXPORT */
#        define GDK_PIXBUF_VAR extern
#      endif /* !DLL_EXPORT */
#    else /* !GDK_PIXBUF_C_COMPILATION */
#      define GDK_PIXBUF_VAR extern __declspec(dllimport)
#    endif /* !GDK_PIXBUF_C_COMPILATION */
#  endif /* !GDK_PIXBUF_STATIC_COMPILATION */
#else /* !G_PLATFORM_WIN32 */
#  define GDK_PIXBUF_VAR _GDK_PIXBUF_EXTERN
#endif /* !G_PLATFORM_WIN32 */

/**
 * gdk_pixbuf_major_version:
 * 
 * The major version number of the gdk-pixbuf library.  (e.g. in 
 * gdk-pixbuf version 1.2.5 this is 1.) 
 * 
 * 
 * This variable is in the library, so represents the
 * gdk-pixbuf library you have linked against. Contrast with the
 * #GDK_PIXBUF_MAJOR macro, which represents the major version of the
 * gdk-pixbuf headers you have included.
 */
/**
 * gdk_pixbuf_minor_version:
 * 
 * The minor version number of the gdk-pixbuf library.  (e.g. in 
 * gdk-pixbuf version 1.2.5 this is 2.) 
 * 
 * 
 * This variable is in the library, so represents the
 * gdk-pixbuf library you have linked against. Contrast with the
 * #GDK_PIXBUF_MINOR macro, which represents the minor version of the
 * gdk-pixbuf headers you have included.
 */
/**
 * gdk_pixbuf_micro_version:
 * 
 * The micro version number of the gdk-pixbuf library.  (e.g. in 
 * gdk-pixbuf version 1.2.5 this is 5.) 
 * 
 * 
 * This variable is in the library, so represents the
 * gdk-pixbuf library you have linked against. Contrast with the
 * #GDK_PIXBUF_MICRO macro, which represents the micro version of the
 * gdk-pixbuf headers you have included.
 */
/**
 * gdk_pixbuf_version:
 * 
 * Contains the full version of the gdk-pixbuf library as a string.
 * This is the version currently in use by a running program.
 */

GDK_PIXBUF_VAR const guint gdk_pixbuf_major_version;
GDK_PIXBUF_VAR const guint gdk_pixbuf_minor_version;
GDK_PIXBUF_VAR const guint gdk_pixbuf_micro_version;
GDK_PIXBUF_VAR const char *gdk_pixbuf_version;

#endif /* GDK_PIXBUF_FEATURES_H */
