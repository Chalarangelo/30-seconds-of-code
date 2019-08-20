// VIPS interpolate wrapper

/*

    This file is part of VIPS.
    
    VIPS is free software; you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
    02110-1301  USA

 */

/*

    These files are distributed with VIPS - http://www.vips.ecs.soton.ac.uk

 */

#ifndef VIPS_VINTERPOLATE_H
#define VIPS_VINTERPOLATE_H

#include <list>
#include <complex>
#include <vector>

#include <string.h>

#include <vips/vips.h>

VIPS_NAMESPACE_START

class VInterpolate : VObject
{
public:
	VInterpolate( VipsInterpolate *interpolate, VSteal steal = STEAL ) : 
		VObject( (VipsObject *) interpolate, steal )
	{
	}

	static 
	VInterpolate new_from_name( const char *name, VOption *options = 0 );

	VipsInterpolate *
	get_interpolate() const
	{
		return( (VipsInterpolate *) VObject::get_object() );
	}

};

VIPS_NAMESPACE_END

#endif /*VIPS_VIMAGE_H*/
