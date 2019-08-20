/* goption.h - Option parser
 *
 *  Copyright (C) 2004  Anders Carlsson <andersca@gnome.org>
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
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef __G_OPTION_H__
#define __G_OPTION_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gerror.h>
#include <glib/gquark.h>

G_BEGIN_DECLS

/**
 * GOptionContext:
 * 
 * A `GOptionContext` struct defines which options
 * are accepted by the commandline option parser. The struct has only private 
 * fields and should not be directly accessed.
 */
typedef struct _GOptionContext GOptionContext;

/**
 * GOptionGroup:
 *
 * A `GOptionGroup` struct defines the options in a single
 * group. The struct has only private fields and should not be directly accessed.
 *
 * All options in a group share the same translation function. Libraries which
 * need to parse commandline options are expected to provide a function for
 * getting a `GOptionGroup` holding their options, which
 * the application can then add to its #GOptionContext.
 */
typedef struct _GOptionGroup   GOptionGroup;
typedef struct _GOptionEntry   GOptionEntry;

/**
 * GOptionFlags:
 * @G_OPTION_FLAG_NONE: No flags. Since: 2.42.
 * @G_OPTION_FLAG_HIDDEN: The option doesn't appear in `--help` output.
 * @G_OPTION_FLAG_IN_MAIN: The option appears in the main section of the
 *     `--help` output, even if it is defined in a group.
 * @G_OPTION_FLAG_REVERSE: For options of the %G_OPTION_ARG_NONE kind, this
 *     flag indicates that the sense of the option is reversed.
 * @G_OPTION_FLAG_NO_ARG: For options of the %G_OPTION_ARG_CALLBACK kind,
 *     this flag indicates that the callback does not take any argument
 *     (like a %G_OPTION_ARG_NONE option). Since 2.8
 * @G_OPTION_FLAG_FILENAME: For options of the %G_OPTION_ARG_CALLBACK
 *     kind, this flag indicates that the argument should be passed to the
 *     callback in the GLib filename encoding rather than UTF-8. Since 2.8
 * @G_OPTION_FLAG_OPTIONAL_ARG: For options of the %G_OPTION_ARG_CALLBACK 
 *     kind, this flag indicates that the argument supply is optional.
 *     If no argument is given then data of %GOptionParseFunc will be
 *     set to NULL. Since 2.8
 * @G_OPTION_FLAG_NOALIAS: This flag turns off the automatic conflict
 *     resolution which prefixes long option names with `groupname-` if 
 *     there is a conflict. This option should only be used in situations
 *     where aliasing is necessary to model some legacy commandline interface.
 *     It is not safe to use this option, unless all option groups are under
 *     your direct control. Since 2.8.
 *
 * Flags which modify individual options.
 */
typedef enum
{
  G_OPTION_FLAG_NONE            = 0,
  G_OPTION_FLAG_HIDDEN		= 1 << 0,
  G_OPTION_FLAG_IN_MAIN		= 1 << 1,
  G_OPTION_FLAG_REVERSE		= 1 << 2,
  G_OPTION_FLAG_NO_ARG		= 1 << 3,
  G_OPTION_FLAG_FILENAME	= 1 << 4,
  G_OPTION_FLAG_OPTIONAL_ARG    = 1 << 5,
  G_OPTION_FLAG_NOALIAS	        = 1 << 6
} GOptionFlags;

/**
 * GOptionArg:
 * @G_OPTION_ARG_NONE: No extra argument. This is useful for simple flags.
 * @G_OPTION_ARG_STRING: The option takes a string argument.
 * @G_OPTION_ARG_INT: The option takes an integer argument.
 * @G_OPTION_ARG_CALLBACK: The option provides a callback (of type
 *     #GOptionArgFunc) to parse the extra argument.
 * @G_OPTION_ARG_FILENAME: The option takes a filename as argument.
 * @G_OPTION_ARG_STRING_ARRAY: The option takes a string argument, multiple
 *     uses of the option are collected into an array of strings.
 * @G_OPTION_ARG_FILENAME_ARRAY: The option takes a filename as argument, 
 *     multiple uses of the option are collected into an array of strings.
 * @G_OPTION_ARG_DOUBLE: The option takes a double argument. The argument
 *     can be formatted either for the user's locale or for the "C" locale.
 *     Since 2.12
 * @G_OPTION_ARG_INT64: The option takes a 64-bit integer. Like
 *     %G_OPTION_ARG_INT but for larger numbers. The number can be in
 *     decimal base, or in hexadecimal (when prefixed with `0x`, for
 *     example, `0xffffffff`). Since 2.12
 * 
 * The #GOptionArg enum values determine which type of extra argument the
 * options expect to find. If an option expects an extra argument, it can
 * be specified in several ways; with a short option: `-x arg`, with a long
 * option: `--name arg` or combined in a single argument: `--name=arg`.
 */
typedef enum
{
  G_OPTION_ARG_NONE,
  G_OPTION_ARG_STRING,
  G_OPTION_ARG_INT,
  G_OPTION_ARG_CALLBACK,
  G_OPTION_ARG_FILENAME,
  G_OPTION_ARG_STRING_ARRAY,
  G_OPTION_ARG_FILENAME_ARRAY,
  G_OPTION_ARG_DOUBLE,
  G_OPTION_ARG_INT64
} GOptionArg;

/**
 * GOptionArgFunc:
 * @option_name: The name of the option being parsed. This will be either a 
 *  single dash followed by a single letter (for a short name) or two dashes
 *  followed by a long option name.
 * @value: The value to be parsed.
 * @data: User data added to the #GOptionGroup containing the option when it
 *  was created with g_option_group_new()
 * @error: A return location for errors. The error code %G_OPTION_ERROR_FAILED
 *  is intended to be used for errors in #GOptionArgFunc callbacks.
 * 
 * The type of function to be passed as callback for %G_OPTION_ARG_CALLBACK
 * options.
 * 
 * Returns: %TRUE if the option was successfully parsed, %FALSE if an error 
 *  occurred, in which case @error should be set with g_set_error()
 */
typedef gboolean (*GOptionArgFunc) (const gchar    *option_name,
				    const gchar    *value,
				    gpointer        data,
				    GError        **error);

/**
 * GOptionParseFunc:
 * @context: The active #GOptionContext
 * @group: The group to which the function belongs
 * @data: User data added to the #GOptionGroup containing the option when it
 *  was created with g_option_group_new()
 * @error: A return location for error details
 * 
 * The type of function that can be called before and after parsing. 
 * 
 * Returns: %TRUE if the function completed successfully, %FALSE if an error 
 *  occurred, in which case @error should be set with g_set_error()
 */
typedef gboolean (*GOptionParseFunc) (GOptionContext *context,
				      GOptionGroup   *group,
				      gpointer	      data,
				      GError        **error);

/**
 * GOptionErrorFunc:
 * @context: The active #GOptionContext
 * @group: The group to which the function belongs
 * @data: User data added to the #GOptionGroup containing the option when it
 *  was created with g_option_group_new()
 * @error: The #GError containing details about the parse error
 * 
 * The type of function to be used as callback when a parse error occurs.
 */
typedef void (*GOptionErrorFunc) (GOptionContext *context,
				  GOptionGroup   *group,
				  gpointer        data,
				  GError        **error);

/**
 * G_OPTION_ERROR:
 * 
 * Error domain for option parsing. Errors in this domain will
 * be from the #GOptionError enumeration. See #GError for information on 
 * error domains.
 */
#define G_OPTION_ERROR (g_option_error_quark ())

/**
 * GOptionError:
 * @G_OPTION_ERROR_UNKNOWN_OPTION: An option was not known to the parser.
 *  This error will only be reported, if the parser hasn't been instructed
 *  to ignore unknown options, see g_option_context_set_ignore_unknown_options().
 * @G_OPTION_ERROR_BAD_VALUE: A value couldn't be parsed.
 * @G_OPTION_ERROR_FAILED: A #GOptionArgFunc callback failed.
 * 
 * Error codes returned by option parsing.
 */
typedef enum
{
  G_OPTION_ERROR_UNKNOWN_OPTION,
  G_OPTION_ERROR_BAD_VALUE,
  G_OPTION_ERROR_FAILED
} GOptionError;

GLIB_AVAILABLE_IN_ALL
GQuark g_option_error_quark (void);

/**
 * GOptionEntry:
 * @long_name: The long name of an option can be used to specify it
 *     in a commandline as `--long_name`. Every option must have a
 *     long name. To resolve conflicts if multiple option groups contain
 *     the same long name, it is also possible to specify the option as 
 *     `--groupname-long_name`.
 * @short_name: If an option has a short name, it can be specified
 *     `-short_name` in a commandline. @short_name must be  a printable
 *     ASCII character different from '-', or zero if the option has no
 *     short name.
 * @flags: Flags from #GOptionFlags
 * @arg: The type of the option, as a #GOptionArg
 * @arg_data: If the @arg type is %G_OPTION_ARG_CALLBACK, then @arg_data
 *     must point to a #GOptionArgFunc callback function, which will be
 *     called to handle the extra argument. Otherwise, @arg_data is a
 *     pointer to a location to store the value, the required type of
 *     the location depends on the @arg type:
 *     - %G_OPTION_ARG_NONE: %gboolean
 *     - %G_OPTION_ARG_STRING: %gchar*
 *     - %G_OPTION_ARG_INT: %gint
 *     - %G_OPTION_ARG_FILENAME: %gchar*
 *     - %G_OPTION_ARG_STRING_ARRAY: %gchar**
 *     - %G_OPTION_ARG_FILENAME_ARRAY: %gchar**
 *     - %G_OPTION_ARG_DOUBLE: %gdouble
 *     If @arg type is %G_OPTION_ARG_STRING or %G_OPTION_ARG_FILENAME,
 *     the location will contain a newly allocated string if the option
 *     was given. That string needs to be freed by the callee using g_free().
 *     Likewise if @arg type is %G_OPTION_ARG_STRING_ARRAY or
 *     %G_OPTION_ARG_FILENAME_ARRAY, the data should be freed using g_strfreev().
 * @description: the description for the option in `--help`
 *     output. The @description is translated using the @translate_func
 *     of the group, see g_option_group_set_translation_domain().
 * @arg_description: The placeholder to use for the extra argument parsed
 *     by the option in `--help` output. The @arg_description is translated
 *     using the @translate_func of the group, see
 *     g_option_group_set_translation_domain().
 * 
 * A GOptionEntry struct defines a single option. To have an effect, they
 * must be added to a #GOptionGroup with g_option_context_add_main_entries()
 * or g_option_group_add_entries().
 */
struct _GOptionEntry
{
  const gchar *long_name;
  gchar        short_name;
  gint         flags;

  GOptionArg   arg;
  gpointer     arg_data;
  
  const gchar *description;
  const gchar *arg_description;
};

/**
 * G_OPTION_REMAINING:
 * 
 * If a long option in the main group has this name, it is not treated as a 
 * regular option. Instead it collects all non-option arguments which would
 * otherwise be left in `argv`. The option must be of type
 * %G_OPTION_ARG_CALLBACK, %G_OPTION_ARG_STRING_ARRAY
 * or %G_OPTION_ARG_FILENAME_ARRAY.
 * 
 * 
 * Using #G_OPTION_REMAINING instead of simply scanning `argv`
 * for leftover arguments has the advantage that GOption takes care of 
 * necessary encoding conversions for strings or filenames.
 * 
 * Since: 2.6
 */
#define G_OPTION_REMAINING ""

GLIB_AVAILABLE_IN_ALL
GOptionContext *g_option_context_new              (const gchar         *parameter_string);
GLIB_AVAILABLE_IN_ALL
void            g_option_context_set_summary      (GOptionContext      *context,
                                                   const gchar         *summary);
GLIB_AVAILABLE_IN_ALL
const gchar *   g_option_context_get_summary      (GOptionContext     *context);
GLIB_AVAILABLE_IN_ALL
void            g_option_context_set_description  (GOptionContext      *context,
                                                   const gchar         *description);
GLIB_AVAILABLE_IN_ALL
const gchar *   g_option_context_get_description  (GOptionContext     *context);
GLIB_AVAILABLE_IN_ALL
void            g_option_context_free             (GOptionContext      *context);
GLIB_AVAILABLE_IN_ALL
void		g_option_context_set_help_enabled (GOptionContext      *context,
						   gboolean		help_enabled);
GLIB_AVAILABLE_IN_ALL
gboolean	g_option_context_get_help_enabled (GOptionContext      *context);
GLIB_AVAILABLE_IN_ALL
void		g_option_context_set_ignore_unknown_options (GOptionContext *context,
							     gboolean	     ignore_unknown);
GLIB_AVAILABLE_IN_ALL
gboolean        g_option_context_get_ignore_unknown_options (GOptionContext *context);

GLIB_AVAILABLE_IN_2_44
void            g_option_context_set_strict_posix           (GOptionContext *context,
                                                             gboolean        strict_posix);
GLIB_AVAILABLE_IN_2_44
gboolean        g_option_context_get_strict_posix           (GOptionContext *context);

GLIB_AVAILABLE_IN_ALL
void            g_option_context_add_main_entries (GOptionContext      *context,
						   const GOptionEntry  *entries,
						   const gchar         *translation_domain);
GLIB_AVAILABLE_IN_ALL
gboolean        g_option_context_parse            (GOptionContext      *context,
						   gint                *argc,
						   gchar             ***argv,
						   GError             **error);
GLIB_AVAILABLE_IN_2_40
gboolean        g_option_context_parse_strv       (GOptionContext      *context,
                                                   gchar             ***arguments,
                                                   GError             **error);
GLIB_AVAILABLE_IN_ALL
void            g_option_context_set_translate_func (GOptionContext     *context,
						     GTranslateFunc      func,
						     gpointer            data,
						     GDestroyNotify      destroy_notify);
GLIB_AVAILABLE_IN_ALL
void            g_option_context_set_translation_domain (GOptionContext  *context,
							 const gchar     *domain);

GLIB_AVAILABLE_IN_ALL
void            g_option_context_add_group      (GOptionContext *context,
						 GOptionGroup   *group);
GLIB_AVAILABLE_IN_ALL
void          g_option_context_set_main_group (GOptionContext *context,
					       GOptionGroup   *group);
GLIB_AVAILABLE_IN_ALL
GOptionGroup *g_option_context_get_main_group (GOptionContext *context);
GLIB_AVAILABLE_IN_ALL
gchar        *g_option_context_get_help       (GOptionContext *context,
                                               gboolean        main_help,
                                               GOptionGroup   *group);

GLIB_AVAILABLE_IN_ALL
GOptionGroup *g_option_group_new                    (const gchar        *name,
						     const gchar        *description,
						     const gchar        *help_description,
						     gpointer            user_data,
						     GDestroyNotify      destroy);
GLIB_AVAILABLE_IN_ALL
void	      g_option_group_set_parse_hooks	    (GOptionGroup       *group,
						     GOptionParseFunc    pre_parse_func,
						     GOptionParseFunc	 post_parse_func);
GLIB_AVAILABLE_IN_ALL
void	      g_option_group_set_error_hook	    (GOptionGroup       *group,
						     GOptionErrorFunc	 error_func);
GLIB_DEPRECATED_IN_2_44
void          g_option_group_free                   (GOptionGroup       *group);
GLIB_AVAILABLE_IN_2_44
GOptionGroup *g_option_group_ref                    (GOptionGroup       *group);
GLIB_AVAILABLE_IN_2_44
void          g_option_group_unref                  (GOptionGroup       *group);
GLIB_AVAILABLE_IN_ALL
void          g_option_group_add_entries            (GOptionGroup       *group,
						     const GOptionEntry *entries);
GLIB_AVAILABLE_IN_ALL
void          g_option_group_set_translate_func     (GOptionGroup       *group,
						     GTranslateFunc      func,
						     gpointer            data,
						     GDestroyNotify      destroy_notify);
GLIB_AVAILABLE_IN_ALL
void          g_option_group_set_translation_domain (GOptionGroup       *group,
						     const gchar        *domain);

G_END_DECLS

#endif /* __G_OPTION_H__ */
