/* GIO - GLib Input, Output and Streaming Library
 *
 * Copyright (C) 2006-2007 Red Hat, Inc.
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
 *
 * Author: Alexander Larsson <alexl@redhat.com>
 */

#ifndef __G_IO_H__
#define __G_IO_H__

#define __GIO_GIO_H_INSIDE__

#include <gio/giotypes.h>

#include <gio/gaction.h>
#include <gio/gactiongroup.h>
#include <gio/gactiongroupexporter.h>
#include <gio/gactionmap.h>
#include <gio/gappinfo.h>
#include <gio/gapplication.h>
#include <gio/gapplicationcommandline.h>
#include <gio/gasyncinitable.h>
#include <gio/gasyncresult.h>
#include <gio/gbufferedinputstream.h>
#include <gio/gbufferedoutputstream.h>
#include <gio/gbytesicon.h>
#include <gio/gcancellable.h>
#include <gio/gcharsetconverter.h>
#include <gio/gcontenttype.h>
#include <gio/gconverter.h>
#include <gio/gconverterinputstream.h>
#include <gio/gconverteroutputstream.h>
#include <gio/gcredentials.h>
#include <gio/gdatagrambased.h>
#include <gio/gdatainputstream.h>
#include <gio/gdataoutputstream.h>
#include <gio/gdbusaddress.h>
#include <gio/gdbusauthobserver.h>
#include <gio/gdbusconnection.h>
#include <gio/gdbuserror.h>
#include <gio/gdbusintrospection.h>
#include <gio/gdbusmessage.h>
#include <gio/gdbusmethodinvocation.h>
#include <gio/gdbusnameowning.h>
#include <gio/gdbusnamewatching.h>
#include <gio/gdbusproxy.h>
#include <gio/gdbusserver.h>
#include <gio/gdbusutils.h>
#include <gio/gdrive.h>
#include <gio/gdtlsclientconnection.h>
#include <gio/gdtlsconnection.h>
#include <gio/gdtlsserverconnection.h>
#include <gio/gemblemedicon.h>
#include <gio/gfileattribute.h>
#include <gio/gfileenumerator.h>
#include <gio/gfile.h>
#include <gio/gfileicon.h>
#include <gio/gfileinfo.h>
#include <gio/gfileinputstream.h>
#include <gio/gfileiostream.h>
#include <gio/gfilemonitor.h>
#include <gio/gfilenamecompleter.h>
#include <gio/gfileoutputstream.h>
#include <gio/gfilterinputstream.h>
#include <gio/gfilteroutputstream.h>
#include <gio/gicon.h>
#include <gio/ginetaddress.h>
#include <gio/ginetaddressmask.h>
#include <gio/ginetsocketaddress.h>
#include <gio/ginitable.h>
#include <gio/ginputstream.h>
#include <gio/gioenums.h>
#include <gio/gioenumtypes.h>
#include <gio/gioerror.h>
#include <gio/giomodule.h>
#include <gio/gioscheduler.h>
#include <gio/giostream.h>
#include <gio/gloadableicon.h>
#include <gio/gmemoryinputstream.h>
#include <gio/gmemoryoutputstream.h>
#include <gio/gmount.h>
#include <gio/gmountoperation.h>
#include <gio/gnativevolumemonitor.h>
#include <gio/gnetworkaddress.h>
#include <gio/gnetworkmonitor.h>
#include <gio/gnetworkservice.h>
#include <gio/goutputstream.h>
#include <gio/gpermission.h>
#include <gio/gpollableinputstream.h>
#include <gio/gpollableoutputstream.h>
#include <gio/gpollableutils.h>
#include <gio/gpropertyaction.h>
#include <gio/gproxy.h>
#include <gio/gproxyaddress.h>
#include <gio/gproxyaddressenumerator.h>
#include <gio/gproxyresolver.h>
#include <gio/gresolver.h>
#include <gio/gresource.h>
#include <gio/gseekable.h>
#include <gio/gsettingsschema.h>
#include <gio/gsettings.h>
#include <gio/gsimpleaction.h>
#include <gio/gsimpleactiongroup.h>
#include <gio/gsimpleasyncresult.h>
#include <gio/gsimpleiostream.h>
#include <gio/gsimplepermission.h>
#include <gio/gsocketaddressenumerator.h>
#include <gio/gsocketaddress.h>
#include <gio/gsocketclient.h>
#include <gio/gsocketconnectable.h>
#include <gio/gsocketconnection.h>
#include <gio/gsocketcontrolmessage.h>
#include <gio/gsocket.h>
#include <gio/gsocketlistener.h>
#include <gio/gsocketservice.h>
#include <gio/gsrvtarget.h>
#include <gio/gsimpleproxyresolver.h>
#include <gio/gtask.h>
#include <gio/gsubprocess.h>
#include <gio/gsubprocesslauncher.h>
#include <gio/gtcpconnection.h>
#include <gio/gtcpwrapperconnection.h>
#include <gio/gtestdbus.h>
#include <gio/gthemedicon.h>
#include <gio/gthreadedsocketservice.h>
#include <gio/gtlsbackend.h>
#include <gio/gtlscertificate.h>
#include <gio/gtlsclientconnection.h>
#include <gio/gtlsconnection.h>
#include <gio/gtlsdatabase.h>
#include <gio/gtlsfiledatabase.h>
#include <gio/gtlsinteraction.h>
#include <gio/gtlsserverconnection.h>
#include <gio/gtlspassword.h>
#include <gio/gvfs.h>
#include <gio/gvolume.h>
#include <gio/gvolumemonitor.h>
#include <gio/gzlibcompressor.h>
#include <gio/gzlibdecompressor.h>
#include <gio/gdbusinterface.h>
#include <gio/gdbusinterfaceskeleton.h>
#include <gio/gdbusobject.h>
#include <gio/gdbusobjectskeleton.h>
#include <gio/gdbusobjectproxy.h>
#include <gio/gdbusobjectmanager.h>
#include <gio/gdbusobjectmanagerclient.h>
#include <gio/gdbusobjectmanagerserver.h>
#include <gio/gdbusactiongroup.h>
#include <gio/gremoteactiongroup.h>
#include <gio/gmenumodel.h>
#include <gio/gmenu.h>
#include <gio/gmenuexporter.h>
#include <gio/gdbusmenumodel.h>
#include <gio/gnotification.h>
#include <gio/glistmodel.h>
#include <gio/gliststore.h>

#include <gio/gio-autocleanups.h>

#undef __GIO_GIO_H_INSIDE__

#endif /* __G_IO_H__ */

