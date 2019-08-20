/*
 * Copyright © 2010 Codethink Limited
 * Copyright © 2011 Canonical Limited
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

#ifndef __G_SETTINGS_SCHEMA_H__
#define __G_SETTINGS_SCHEMA_H__

#include <glib-object.h>

G_BEGIN_DECLS

typedef struct _GSettingsSchemaSource                       GSettingsSchemaSource;
typedef struct _GSettingsSchema                             GSettingsSchema;
typedef struct _GSettingsSchemaKey                          GSettingsSchemaKey;

#define                 G_TYPE_SETTINGS_SCHEMA_SOURCE                   (g_settings_schema_source_get_type ())
GLIB_AVAILABLE_IN_2_32
GType                   g_settings_schema_source_get_type               (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
GSettingsSchemaSource * g_settings_schema_source_get_default            (void);
GLIB_AVAILABLE_IN_2_32
GSettingsSchemaSource * g_settings_schema_source_ref                    (GSettingsSchemaSource  *source);
GLIB_AVAILABLE_IN_2_32
void                    g_settings_schema_source_unref                  (GSettingsSchemaSource  *source);

GLIB_AVAILABLE_IN_2_32
GSettingsSchemaSource * g_settings_schema_source_new_from_directory     (const gchar            *directory,
                                                                         GSettingsSchemaSource  *parent,
                                                                         gboolean                trusted,
                                                                         GError                **error);

GLIB_AVAILABLE_IN_2_32
GSettingsSchema *       g_settings_schema_source_lookup                 (GSettingsSchemaSource  *source,
                                                                         const gchar            *schema_id,
                                                                         gboolean                recursive);

GLIB_AVAILABLE_IN_2_40
void                    g_settings_schema_source_list_schemas           (GSettingsSchemaSource   *source,
                                                                         gboolean                 recursive,
                                                                         gchar                 ***non_relocatable,
                                                                         gchar                 ***relocatable);

#define                 G_TYPE_SETTINGS_SCHEMA                          (g_settings_schema_get_type ())
GLIB_AVAILABLE_IN_2_32
GType                   g_settings_schema_get_type                      (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_32
GSettingsSchema *       g_settings_schema_ref                           (GSettingsSchema        *schema);
GLIB_AVAILABLE_IN_2_32
void                    g_settings_schema_unref                         (GSettingsSchema        *schema);

GLIB_AVAILABLE_IN_2_32
const gchar *           g_settings_schema_get_id                        (GSettingsSchema        *schema);
GLIB_AVAILABLE_IN_2_32
const gchar *           g_settings_schema_get_path                      (GSettingsSchema        *schema);
GLIB_AVAILABLE_IN_2_40
GSettingsSchemaKey *    g_settings_schema_get_key                       (GSettingsSchema        *schema,
                                                                         const gchar            *name);
GLIB_AVAILABLE_IN_2_40
gboolean                g_settings_schema_has_key                       (GSettingsSchema        *schema,
                                                                         const gchar            *name);
GLIB_AVAILABLE_IN_2_46
gchar**                 g_settings_schema_list_keys                     (GSettingsSchema        *schema);


GLIB_AVAILABLE_IN_2_44
gchar **                g_settings_schema_list_children                 (GSettingsSchema        *schema);

#define                 G_TYPE_SETTINGS_SCHEMA_KEY                      (g_settings_schema_key_get_type ())
GLIB_AVAILABLE_IN_2_40
GType                   g_settings_schema_key_get_type                  (void) G_GNUC_CONST;

GLIB_AVAILABLE_IN_2_40
GSettingsSchemaKey *    g_settings_schema_key_ref                       (GSettingsSchemaKey     *key);
GLIB_AVAILABLE_IN_2_40
void                    g_settings_schema_key_unref                     (GSettingsSchemaKey     *key);

GLIB_AVAILABLE_IN_2_40
const GVariantType *    g_settings_schema_key_get_value_type            (GSettingsSchemaKey     *key);
GLIB_AVAILABLE_IN_2_40
GVariant *              g_settings_schema_key_get_default_value         (GSettingsSchemaKey     *key);
GLIB_AVAILABLE_IN_2_40
GVariant *              g_settings_schema_key_get_range                 (GSettingsSchemaKey     *key);
GLIB_AVAILABLE_IN_2_40
gboolean                g_settings_schema_key_range_check               (GSettingsSchemaKey     *key,
                                                                         GVariant               *value);

GLIB_AVAILABLE_IN_2_44
const gchar *           g_settings_schema_key_get_name                  (GSettingsSchemaKey     *key);
GLIB_AVAILABLE_IN_2_40
const gchar *           g_settings_schema_key_get_summary               (GSettingsSchemaKey     *key);
GLIB_AVAILABLE_IN_2_40
const gchar *           g_settings_schema_key_get_description           (GSettingsSchemaKey     *key);

G_END_DECLS

#endif /* __G_SETTINGS_SCHEMA_H__ */
