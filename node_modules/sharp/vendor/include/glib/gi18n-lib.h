/* GLIB - Library of useful routines for C programming
 * Copyright (C) 1995-1997, 2002  Peter Mattis, Red Hat, Inc.
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

#ifndef __G_I18N_LIB_H__
#define __G_I18N_LIB_H__

#include <glib.h>

#include <libintl.h>
#include <string.h>

#ifndef GETTEXT_PACKAGE
#error You must define GETTEXT_PACKAGE before including gi18n-lib.h.  Did you forget to include config.h?
#endif

#define  _(String) ((char *) g_dgettext (GETTEXT_PACKAGE, String))
#define Q_(String) g_dpgettext (GETTEXT_PACKAGE, String, 0)
#define N_(String) (String)
#define C_(Context,String) g_dpgettext (GETTEXT_PACKAGE, Context "\004" String, strlen (Context) + 1)
#define NC_(Context, String) (String)

#endif  /* __G_I18N_LIB_H__ */
