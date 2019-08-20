/*
 * gsf.h:
 *
 * Copyright (C) 2002-2006 Jody Goldberg (jody@gnome.org)
 * Copyright (C) 2013 Morten Welinder (terra@gnome.org)
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of the GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */

/*
 * Rules for header inclusion:
 *
 * 1. Applications should include gsf/gsf.h only and require libgsf 1.14.26
 *    Prior to 1.14.26 the practice was to include specific headers.   That
 *    still ought to work, but is deprecated.
 *
 * 2. gsf/gsf-foo.c should include <gsf-config.h>, then <gsf/gsf-foo.h>,
 *    then <gsf/gsf.h>.  No further gsf headers should be needed.
 *
 * 3. gsf/gsf-foo.h should include <gsf/gsf-fwd.h>.  It must not include
 *    <gsf/gsf.h> or <gsf-config.h> (which isn't even installed).  If
 *    a super-class is needed, include also the header for that class.
 *    For convenience, classes derived from Gsf{In,Out}{put,file} should
 *    include the relevant header too.
 *
 * 4. Rules 2 and 3 do not apply to headers that are not installed.
 */

#ifndef GSF_H
#define GSF_H

#include <glib.h>

#include <gsf/gsf-fwd.h>

#include <gsf/gsf-input.h>
#include <gsf/gsf-output.h>
#include <gsf/gsf-infile.h>
#include <gsf/gsf-outfile.h>

#include <gsf/gsf-impl-utils.h>
#include <gsf/gsf-input-impl.h>
#include <gsf/gsf-infile-impl.h>
#include <gsf/gsf-output-impl.h>
#include <gsf/gsf-outfile-impl.h>

#include <gsf/gsf-libxml.h>

#include <gsf/gsf-blob.h>
#include <gsf/gsf-clip-data.h>
#include <gsf/gsf-doc-meta-data.h>
#include <gsf/gsf-docprop-vector.h>
#include <gsf/gsf-infile-msole.h>
#include <gsf/gsf-infile-msvba.h>
#include <gsf/gsf-infile-stdio.h>
#include <gsf/gsf-infile-zip.h>
#include <gsf/gsf-input-bzip.h>
#include <gsf/gsf-input-gio.h>
#include <gsf/gsf-input-gzip.h>
#include <gsf/gsf-input-http.h>
#include <gsf/gsf-input-memory.h>
#include <gsf/gsf-input-proxy.h>
#include <gsf/gsf-input-stdio.h>
#include <gsf/gsf-infile-tar.h>
#include <gsf/gsf-input-textline.h>
#include <gsf/gsf-meta-names.h>
#include <gsf/gsf-msole-utils.h>
#include <gsf/gsf-opendoc-utils.h>
#include <gsf/gsf-open-pkg-utils.h>
#include <gsf/gsf-outfile-msole.h>
#include <gsf/gsf-outfile-stdio.h>
#include <gsf/gsf-outfile-zip.h>
#include <gsf/gsf-output-bzip.h>
#include <gsf/gsf-output-csv.h>
#include <gsf/gsf-output-gio.h>
#include <gsf/gsf-output-gzip.h>
#include <gsf/gsf-output-iconv.h>
#include <gsf/gsf-output-iochannel.h>
#include <gsf/gsf-output-memory.h>
#include <gsf/gsf-output-stdio.h>
#include <gsf/gsf-shared-memory.h>
#include <gsf/gsf-structured-blob.h>
#include <gsf/gsf-timestamp.h>
#include <gsf/gsf-utils.h>

#endif /* GSF_H */
