/* GObject - GLib Type, Object, Parameter and Signal Library
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
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef __G_MARSHAL_H__
#define __G_MARSHAL_H__

G_BEGIN_DECLS

/* VOID:VOID */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__VOID (GClosure     *closure,
                                    GValue       *return_value,
                                    guint         n_param_values,
                                    const GValue *param_values,
                                    gpointer      invocation_hint,
                                    gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__VOIDv (GClosure *closure,
                                     GValue   *return_value,
                                     gpointer  instance,
                                     va_list   args,
                                     gpointer  marshal_data,
                                     int       n_params,
                                     GType    *param_types);

/* VOID:BOOLEAN */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__BOOLEAN (GClosure     *closure,
                                       GValue       *return_value,
                                       guint         n_param_values,
                                       const GValue *param_values,
                                       gpointer      invocation_hint,
                                       gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__BOOLEANv (GClosure *closure,
                                        GValue   *return_value,
                                        gpointer  instance,
                                        va_list   args,
                                        gpointer  marshal_data,
                                        int       n_params,
                                        GType    *param_types);

/* VOID:CHAR */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__CHAR (GClosure     *closure,
                                    GValue       *return_value,
                                    guint         n_param_values,
                                    const GValue *param_values,
                                    gpointer      invocation_hint,
                                    gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__CHARv (GClosure *closure,
                                     GValue   *return_value,
                                     gpointer  instance,
                                     va_list   args,
                                     gpointer  marshal_data,
                                     int       n_params,
                                     GType    *param_types);

/* VOID:UCHAR */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__UCHAR (GClosure     *closure,
                                     GValue       *return_value,
                                     guint         n_param_values,
                                     const GValue *param_values,
                                     gpointer      invocation_hint,
                                     gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__UCHARv (GClosure *closure,
                                      GValue   *return_value,
                                      gpointer  instance,
                                      va_list   args,
                                      gpointer  marshal_data,
                                      int       n_params,
                                      GType    *param_types);

/* VOID:INT */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__INT (GClosure     *closure,
                                   GValue       *return_value,
                                   guint         n_param_values,
                                   const GValue *param_values,
                                   gpointer      invocation_hint,
                                   gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__INTv (GClosure *closure,
                                    GValue   *return_value,
                                    gpointer  instance,
                                    va_list   args,
                                    gpointer  marshal_data,
                                    int       n_params,
                                    GType    *param_types);

/* VOID:UINT */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__UINT (GClosure     *closure,
                                    GValue       *return_value,
                                    guint         n_param_values,
                                    const GValue *param_values,
                                    gpointer      invocation_hint,
                                    gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__UINTv (GClosure *closure,
                                     GValue   *return_value,
                                     gpointer  instance,
                                     va_list   args,
                                     gpointer  marshal_data,
                                     int       n_params,
                                     GType    *param_types);

/* VOID:LONG */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__LONG (GClosure     *closure,
                                    GValue       *return_value,
                                    guint         n_param_values,
                                    const GValue *param_values,
                                    gpointer      invocation_hint,
                                    gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__LONGv (GClosure *closure,
                                     GValue   *return_value,
                                     gpointer  instance,
                                     va_list   args,
                                     gpointer  marshal_data,
                                     int       n_params,
                                     GType    *param_types);

/* VOID:ULONG */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__ULONG (GClosure     *closure,
                                     GValue       *return_value,
                                     guint         n_param_values,
                                     const GValue *param_values,
                                     gpointer      invocation_hint,
                                     gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__ULONGv (GClosure *closure,
                                      GValue   *return_value,
                                      gpointer  instance,
                                      va_list   args,
                                      gpointer  marshal_data,
                                      int       n_params,
                                      GType    *param_types);

/* VOID:ENUM */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__ENUM (GClosure     *closure,
                                    GValue       *return_value,
                                    guint         n_param_values,
                                    const GValue *param_values,
                                    gpointer      invocation_hint,
                                    gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__ENUMv (GClosure *closure,
                                     GValue   *return_value,
                                     gpointer  instance,
                                     va_list   args,
                                     gpointer  marshal_data,
                                     int       n_params,
                                     GType    *param_types);

/* VOID:FLAGS */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__FLAGS (GClosure     *closure,
                                     GValue       *return_value,
                                     guint         n_param_values,
                                     const GValue *param_values,
                                     gpointer      invocation_hint,
                                     gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__FLAGSv (GClosure *closure,
                                      GValue   *return_value,
                                      gpointer  instance,
                                      va_list   args,
                                      gpointer  marshal_data,
                                      int       n_params,
                                      GType    *param_types);

/* VOID:FLOAT */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__FLOAT (GClosure     *closure,
                                     GValue       *return_value,
                                     guint         n_param_values,
                                     const GValue *param_values,
                                     gpointer      invocation_hint,
                                     gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__FLOATv (GClosure *closure,
                                      GValue   *return_value,
                                      gpointer  instance,
                                      va_list   args,
                                      gpointer  marshal_data,
                                      int       n_params,
                                      GType    *param_types);

/* VOID:DOUBLE */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__DOUBLE (GClosure     *closure,
                                      GValue       *return_value,
                                      guint         n_param_values,
                                      const GValue *param_values,
                                      gpointer      invocation_hint,
                                      gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__DOUBLEv (GClosure *closure,
                                       GValue   *return_value,
                                       gpointer  instance,
                                       va_list   args,
                                       gpointer  marshal_data,
                                       int       n_params,
                                       GType    *param_types);

/* VOID:STRING */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__STRING (GClosure     *closure,
                                      GValue       *return_value,
                                      guint         n_param_values,
                                      const GValue *param_values,
                                      gpointer      invocation_hint,
                                      gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__STRINGv (GClosure *closure,
                                       GValue   *return_value,
                                       gpointer  instance,
                                       va_list   args,
                                       gpointer  marshal_data,
                                       int       n_params,
                                       GType    *param_types);

/* VOID:PARAM */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__PARAM (GClosure     *closure,
                                     GValue       *return_value,
                                     guint         n_param_values,
                                     const GValue *param_values,
                                     gpointer      invocation_hint,
                                     gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__PARAMv (GClosure *closure,
                                      GValue   *return_value,
                                      gpointer  instance,
                                      va_list   args,
                                      gpointer  marshal_data,
                                      int       n_params,
                                      GType    *param_types);

/* VOID:BOXED */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__BOXED (GClosure     *closure,
                                     GValue       *return_value,
                                     guint         n_param_values,
                                     const GValue *param_values,
                                     gpointer      invocation_hint,
                                     gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__BOXEDv (GClosure *closure,
                                      GValue   *return_value,
                                      gpointer  instance,
                                      va_list   args,
                                      gpointer  marshal_data,
                                      int       n_params,
                                      GType    *param_types);

/* VOID:POINTER */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__POINTER (GClosure     *closure,
                                       GValue       *return_value,
                                       guint         n_param_values,
                                       const GValue *param_values,
                                       gpointer      invocation_hint,
                                       gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__POINTERv (GClosure *closure,
                                        GValue   *return_value,
                                        gpointer  instance,
                                        va_list   args,
                                        gpointer  marshal_data,
                                        int       n_params,
                                        GType    *param_types);

/* VOID:OBJECT */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__OBJECT (GClosure     *closure,
                                      GValue       *return_value,
                                      guint         n_param_values,
                                      const GValue *param_values,
                                      gpointer      invocation_hint,
                                      gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__OBJECTv (GClosure *closure,
                                       GValue   *return_value,
                                       gpointer  instance,
                                       va_list   args,
                                       gpointer  marshal_data,
                                       int       n_params,
                                       GType    *param_types);

/* VOID:VARIANT */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__VARIANT (GClosure     *closure,
                                       GValue       *return_value,
                                       guint         n_param_values,
                                       const GValue *param_values,
                                       gpointer      invocation_hint,
                                       gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__VARIANTv (GClosure *closure,
                                        GValue   *return_value,
                                        gpointer  instance,
                                        va_list   args,
                                        gpointer  marshal_data,
                                        int       n_params,
                                        GType    *param_types);

/* VOID:UINT,POINTER */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__UINT_POINTER (GClosure     *closure,
                                            GValue       *return_value,
                                            guint         n_param_values,
                                            const GValue *param_values,
                                            gpointer      invocation_hint,
                                            gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_VOID__UINT_POINTERv (GClosure *closure,
                                             GValue   *return_value,
                                             gpointer  instance,
                                             va_list   args,
                                             gpointer  marshal_data,
                                             int       n_params,
                                             GType    *param_types);

/* BOOL:FLAGS */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_BOOLEAN__FLAGS (GClosure     *closure,
                                        GValue       *return_value,
                                        guint         n_param_values,
                                        const GValue *param_values,
                                        gpointer      invocation_hint,
                                        gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_BOOLEAN__FLAGSv (GClosure *closure,
                                         GValue   *return_value,
                                         gpointer  instance,
                                         va_list   args,
                                         gpointer  marshal_data,
                                         int       n_params,
                                         GType    *param_types);

/**
 * g_cclosure_marshal_BOOL__FLAGS:
 * @closure: A #GClosure.
 * @return_value: A #GValue to store the return value. May be %NULL
 *   if the callback of closure doesn't return a value.
 * @n_param_values: The length of the @param_values array.
 * @param_values: An array of #GValues holding the arguments
 *   on which to invoke the callback of closure.
 * @invocation_hint: The invocation hint given as the last argument to
 *   g_closure_invoke().
 * @marshal_data: Additional data specified when registering the
 *   marshaller, see g_closure_set_marshal() and
 *   g_closure_set_meta_marshal()
 *
 * An old alias for g_cclosure_marshal_BOOLEAN__FLAGS().
 */
#define g_cclosure_marshal_BOOL__FLAGS	g_cclosure_marshal_BOOLEAN__FLAGS

/* STRING:OBJECT,POINTER */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_STRING__OBJECT_POINTER (GClosure     *closure,
                                                GValue       *return_value,
                                                guint         n_param_values,
                                                const GValue *param_values,
                                                gpointer      invocation_hint,
                                                gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_STRING__OBJECT_POINTERv (GClosure *closure,
                                                 GValue   *return_value,
                                                 gpointer  instance,
                                                 va_list   args,
                                                 gpointer  marshal_data,
                                                 int       n_params,
                                                 GType    *param_types);

/* BOOL:BOXED,BOXED */
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_BOOLEAN__BOXED_BOXED (GClosure     *closure,
                                              GValue       *return_value,
                                              guint         n_param_values,
                                              const GValue *param_values,
                                              gpointer      invocation_hint,
                                              gpointer      marshal_data);
GLIB_AVAILABLE_IN_ALL
void g_cclosure_marshal_BOOLEAN__BOXED_BOXEDv (GClosure *closure,
                                               GValue   *return_value,
                                               gpointer  instance,
                                               va_list   args,
                                               gpointer  marshal_data,
                                               int       n_params,
                                               GType    *param_types);

/**
 * g_cclosure_marshal_BOOL__BOXED_BOXED:
 * @closure: A #GClosure.
 * @return_value: A #GValue to store the return value. May be %NULL
 *   if the callback of closure doesn't return a value.
 * @n_param_values: The length of the @param_values array.
 * @param_values: An array of #GValues holding the arguments
 *   on which to invoke the callback of closure.
 * @invocation_hint: The invocation hint given as the last argument to
 *   g_closure_invoke().
 * @marshal_data: Additional data specified when registering the
 *   marshaller, see g_closure_set_marshal() and
 *   g_closure_set_meta_marshal()
 *
 * An old alias for g_cclosure_marshal_BOOLEAN__BOXED_BOXED().
 */
#define g_cclosure_marshal_BOOL__BOXED_BOXED	g_cclosure_marshal_BOOLEAN__BOXED_BOXED

G_END_DECLS

#endif /* __G_MARSHAL_H__ */
