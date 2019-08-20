/*
 * Copyright © 2009, 2010 Codethink Limited
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
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_SETTINGS_H__
#define __G_SETTINGS_H__

#if !defined (__GIO_GIO_H_INSIDE__) && !defined (GIO_COMPILATION)
#error "Only <gio/gio.h> can be included directly."
#endif

#include <gio/gsettingsschema.h>
#include <gio/giotypes.h>

G_BEGIN_DECLS

#define G_TYPE_SETTINGS                                     (g_settings_get_type ())
#define G_SETTINGS(inst)                                    (G_TYPE_CHECK_INSTANCE_CAST ((inst),                     \
                                                             G_TYPE_SETTINGS, GSettings))
#define G_SETTINGS_CLASS(class)                             (G_TYPE_CHECK_CLASS_CAST ((class),                       \
                                                             G_TYPE_SETTINGS, GSettingsClass))
#define G_IS_SETTINGS(inst)                                 (G_TYPE_CHECK_INSTANCE_TYPE ((inst), G_TYPE_SETTINGS))
#define G_IS_SETTINGS_CLASS(class)                          (G_TYPE_CHECK_CLASS_TYPE ((class), G_TYPE_SETTINGS))
#define G_SETTINGS_GET_CLASS(inst)                          (G_TYPE_INSTANCE_GET_CLASS ((inst),                      \
                                                             G_TYPE_SETTINGS, GSettingsClass))

typedef struct _GSettingsPrivate                            GSettingsPrivate;
typedef struct _GSettingsClass                              GSettingsClass;

struct _GSettingsClass
{
  GObjectClass parent_class;

  /* Signals */
  void        (*writable_changed)      (GSettings    *settings,
                                        const gchar  *key);
  void        (*changed)               (GSettings    *settings,
                                        const gchar  *key);
  gboolean    (*writable_change_event) (GSettings    *settings,
                                        GQuark        key);
  gboolean    (*change_event)          (GSettings    *settings,
                                        const GQuark *keys,
                                        gint          n_keys);

  gpointer padding[20];
};

struct _GSettings
{
  GObject parent_instance;
  GSettingsPrivate *priv;
};


GLIB_AVAILABLE_IN_ALL
GType                   g_settings_get_type                             (void);

GLIB_DEPRECATED_IN_2_40_FOR(g_settings_schema_source_list_schemas)
const gchar * const *   g_settings_list_schemas                         (void);
GLIB_DEPRECATED_IN_2_40_FOR(g_settings_schema_source_list_schemas)
const gchar * const *   g_settings_list_relocatable_schemas             (void);
GLIB_AVAILABLE_IN_ALL
GSettings *             g_settings_new                                  (const gchar        *schema_id);
GLIB_AVAILABLE_IN_ALL
GSettings *             g_settings_new_with_path                        (const gchar        *schema_id,
                                                                         const gchar        *path);
GLIB_AVAILABLE_IN_ALL
GSettings *             g_settings_new_with_backend                     (const gchar        *schema_id,
                                                                         GSettingsBackend   *backend);
GLIB_AVAILABLE_IN_ALL
GSettings *             g_settings_new_with_backend_and_path            (const gchar        *schema_id,
                                                                         GSettingsBackend   *backend,
                                                                         const gchar        *path);
GLIB_AVAILABLE_IN_2_32
GSettings *             g_settings_new_full                             (GSettingsSchema    *schema,
                                                                         GSettingsBackend   *backend,
                                                                         const gchar        *path);
GLIB_AVAILABLE_IN_ALL
gchar **                g_settings_list_children                        (GSettings          *settings);
GLIB_DEPRECATED_IN_2_46_FOR(g_settings_schema_list_keys)
gchar **                g_settings_list_keys                            (GSettings          *settings);
GLIB_DEPRECATED_IN_2_40_FOR(g_settings_schema_key_get_range)
GVariant *              g_settings_get_range                            (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_DEPRECATED_IN_2_40_FOR(g_settings_schema_key_range_check)
gboolean                g_settings_range_check                          (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         GVariant           *value);

GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_value                            (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         GVariant           *value);
GLIB_AVAILABLE_IN_ALL
GVariant *              g_settings_get_value                            (GSettings          *settings,
                                                                         const gchar        *key);

GLIB_AVAILABLE_IN_2_40
GVariant *              g_settings_get_user_value                       (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_2_40
GVariant *              g_settings_get_default_value                    (GSettings          *settings,
                                                                         const gchar        *key);

GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set                                  (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         const gchar        *format,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_get                                  (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         const gchar        *format,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_reset                                (GSettings          *settings,
                                                                         const gchar        *key);

GLIB_AVAILABLE_IN_ALL
gint                    g_settings_get_int                              (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_int                              (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         gint                value);
GLIB_AVAILABLE_IN_2_50
gint64                  g_settings_get_int64                            (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_2_50
gboolean                g_settings_set_int64                            (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         gint64              value);
GLIB_AVAILABLE_IN_2_32
guint                   g_settings_get_uint                             (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_2_32
gboolean                g_settings_set_uint                             (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         guint               value);
GLIB_AVAILABLE_IN_2_50
guint64                 g_settings_get_uint64                           (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_2_50
gboolean                g_settings_set_uint64                           (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         guint64             value);
GLIB_AVAILABLE_IN_ALL
gchar *                 g_settings_get_string                           (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_string                           (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         const gchar        *value);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_get_boolean                          (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_boolean                          (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         gboolean            value);
GLIB_AVAILABLE_IN_ALL
gdouble                 g_settings_get_double                           (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_double                           (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         gdouble             value);
GLIB_AVAILABLE_IN_ALL
gchar **                g_settings_get_strv                             (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_strv                             (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         const gchar *const *value);
GLIB_AVAILABLE_IN_ALL
gint                    g_settings_get_enum                             (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_enum                             (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         gint                value);
GLIB_AVAILABLE_IN_ALL
guint                   g_settings_get_flags                            (GSettings          *settings,
                                                                         const gchar        *key);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_set_flags                            (GSettings          *settings,
                                                                         const gchar        *key,
                                                                         guint               value);
GLIB_AVAILABLE_IN_ALL
GSettings *             g_settings_get_child                            (GSettings          *settings,
                                                                         const gchar        *name);

GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_is_writable                          (GSettings          *settings,
                                                                         const gchar        *name);

GLIB_AVAILABLE_IN_ALL
void                    g_settings_delay                                (GSettings          *settings);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_apply                                (GSettings          *settings);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_revert                               (GSettings          *settings);
GLIB_AVAILABLE_IN_ALL
gboolean                g_settings_get_has_unapplied                    (GSettings          *settings);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_sync                                 (void);

/**
 * GSettingsBindSetMapping:
 * @value: a #GValue containing the property value to map
 * @expected_type: the #GVariantType to create
 * @user_data: user data that was specified when the binding was created
 *
 * The type for the function that is used to convert an object property
 * value to a #GVariant for storing it in #GSettings.
 *
 * Returns: a new #GVariant holding the data from @value,
 *     or %NULL in case of an error
 */
typedef GVariant *    (*GSettingsBindSetMapping)                        (const GValue       *value,
                                                                         const GVariantType *expected_type,
                                                                         gpointer            user_data);

/**
 * GSettingsBindGetMapping:
 * @value: return location for the property value
 * @variant: the #GVariant
 * @user_data: user data that was specified when the binding was created
 *
 * The type for the function that is used to convert from #GSettings to
 * an object property. The @value is already initialized to hold values
 * of the appropriate type.
 *
 * Returns: %TRUE if the conversion succeeded, %FALSE in case of an error
 */
typedef gboolean      (*GSettingsBindGetMapping)                        (GValue             *value,
                                                                         GVariant           *variant,
                                                                         gpointer            user_data);

/**
 * GSettingsGetMapping:
 * @value: the #GVariant to map, or %NULL
 * @result: (out): the result of the mapping
 * @user_data: (closure): the user data that was passed to
 * g_settings_get_mapped()
 *
 * The type of the function that is used to convert from a value stored
 * in a #GSettings to a value that is useful to the application.
 *
 * If the value is successfully mapped, the result should be stored at
 * @result and %TRUE returned.  If mapping fails (for example, if @value
 * is not in the right format) then %FALSE should be returned.
 *
 * If @value is %NULL then it means that the mapping function is being
 * given a "last chance" to successfully return a valid value.  %TRUE
 * must be returned in this case.
 *
 * Returns: %TRUE if the conversion succeeded, %FALSE in case of an error
 **/
typedef gboolean      (*GSettingsGetMapping)                            (GVariant           *value,
                                                                         gpointer           *result,
                                                                         gpointer            user_data);

/**
 * GSettingsBindFlags:
 * @G_SETTINGS_BIND_DEFAULT: Equivalent to `G_SETTINGS_BIND_GET|G_SETTINGS_BIND_SET`
 * @G_SETTINGS_BIND_GET: Update the #GObject property when the setting changes.
 *     It is an error to use this flag if the property is not writable.
 * @G_SETTINGS_BIND_SET: Update the setting when the #GObject property changes.
 *     It is an error to use this flag if the property is not readable.
 * @G_SETTINGS_BIND_NO_SENSITIVITY: Do not try to bind a "sensitivity" property to the writability of the setting
 * @G_SETTINGS_BIND_GET_NO_CHANGES: When set in addition to #G_SETTINGS_BIND_GET, set the #GObject property
 *     value initially from the setting, but do not listen for changes of the setting
 * @G_SETTINGS_BIND_INVERT_BOOLEAN: When passed to g_settings_bind(), uses a pair of mapping functions that invert
 *     the boolean value when mapping between the setting and the property.  The setting and property must both
 *     be booleans.  You cannot pass this flag to g_settings_bind_with_mapping().
 *
 * Flags used when creating a binding. These flags determine in which
 * direction the binding works. The default is to synchronize in both
 * directions.
 */
typedef enum
{
  G_SETTINGS_BIND_DEFAULT,
  G_SETTINGS_BIND_GET            = (1<<0),
  G_SETTINGS_BIND_SET            = (1<<1),
  G_SETTINGS_BIND_NO_SENSITIVITY = (1<<2),
  G_SETTINGS_BIND_GET_NO_CHANGES = (1<<3),
  G_SETTINGS_BIND_INVERT_BOOLEAN = (1<<4)
} GSettingsBindFlags;

GLIB_AVAILABLE_IN_ALL
void                    g_settings_bind                                 (GSettings               *settings,
                                                                         const gchar             *key,
                                                                         gpointer                 object,
                                                                         const gchar             *property,
                                                                         GSettingsBindFlags       flags);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_bind_with_mapping                    (GSettings               *settings,
                                                                         const gchar             *key,
                                                                         gpointer                 object,
                                                                         const gchar             *property,
                                                                         GSettingsBindFlags       flags,
                                                                         GSettingsBindGetMapping  get_mapping,
                                                                         GSettingsBindSetMapping  set_mapping,
                                                                         gpointer                 user_data,
                                                                         GDestroyNotify           destroy);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_bind_writable                        (GSettings               *settings,
                                                                         const gchar             *key,
                                                                         gpointer                 object,
                                                                         const gchar             *property,
                                                                         gboolean                 inverted);
GLIB_AVAILABLE_IN_ALL
void                    g_settings_unbind                               (gpointer                 object,
                                                                         const gchar             *property);

GLIB_AVAILABLE_IN_2_32
GAction *               g_settings_create_action                        (GSettings               *settings,
                                                                         const gchar             *key);

GLIB_AVAILABLE_IN_ALL
gpointer                g_settings_get_mapped                           (GSettings               *settings,
                                                                         const gchar             *key,
                                                                         GSettingsGetMapping      mapping,
                                                                         gpointer                 user_data);

G_END_DECLS

#endif  /* __G_SETTINGS_H__ */
