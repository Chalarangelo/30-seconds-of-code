// VIPS image wrapper

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

#ifndef VIPS_VIMAGE_H
#define VIPS_VIMAGE_H

#include <list>
#include <complex>
#include <vector>

#include <string.h>

#include <vips/vips.h>

VIPS_NAMESPACE_START

/* Small utility things.
 */

VIPS_CPLUSPLUS_API std::vector<double> to_vectorv( int n, ... );
VIPS_CPLUSPLUS_API std::vector<double> to_vector( double value );
VIPS_CPLUSPLUS_API std::vector<double> to_vector( int n, double array[] );
VIPS_CPLUSPLUS_API std::vector<double> negate( std::vector<double> value );
VIPS_CPLUSPLUS_API std::vector<double> invert( std::vector<double> value );

enum VSteal {
	NOSTEAL = 0,
	STEAL = 1
};

/* A smart VipsObject pointer class ... use g_object_ref()/_unref() for
 * lifetime management.
 */
class VObject
{
private:
	// can be NULL, see eg. VObject()
	VipsObject *vobject; 

public:
	VObject( VipsObject *new_vobject, VSteal steal = STEAL ) : 
		vobject( new_vobject )
	{
		// we allow NULL init, eg. "VImage a;"
		g_assert( !new_vobject ||
			VIPS_IS_OBJECT( new_vobject ) ); 

#ifdef VIPS_DEBUG_VERBOSE
		printf( "VObject constructor, obj = %p, steal = %d\n",
			new_vobject, steal ); 
		if( new_vobject ) { 
			printf( "   obj " ); 
			vips_object_print_name( VIPS_OBJECT( new_vobject ) );
			printf( "\n" ); 
		}
#endif /*VIPS_DEBUG_VERBOSE*/

		if( !steal ) {
#ifdef VIPS_DEBUG_VERBOSE
			printf( "   reffing object\n" ); 
#endif /*VIPS_DEBUG_VERBOSE*/
			g_object_ref( vobject ); 
		}
	}

	VObject() :
		vobject( 0 )
	{
	}

	// copy constructor 
	VObject( const VObject &a ) : 
		vobject( a.vobject )
	{
		g_assert( VIPS_IS_OBJECT( a.vobject ) ); 

#ifdef VIPS_DEBUG_VERBOSE
		printf( "VObject copy constructor, obj = %p\n", 
			vobject ); 
		printf( "   reffing object\n" ); 
#endif /*VIPS_DEBUG_VERBOSE*/
		g_object_ref( vobject );
	}

	// assignment ... we must delete the old ref
	// old can be NULL, new must not be NULL
	VObject &operator=( const VObject &a )
	{
		VipsObject *old_vobject;

#ifdef VIPS_DEBUG_VERBOSE
		printf( "VObject assignment\n" );  
		printf( "   reffing %p\n", a.vobject ); 
		printf( "   unreffing %p\n", vobject ); 
#endif /*VIPS_DEBUG_VERBOSE*/

		g_assert( !vobject ||
			VIPS_IS_OBJECT( vobject ) ); 
		g_assert( a.vobject &&
			VIPS_IS_OBJECT( a.vobject ) ); 

		// delete the old ref at the end ... otherwise "a = a;" could
		// unref before reffing again 
		old_vobject = vobject;
		vobject = a.vobject;
		g_object_ref( vobject ); 
		if( old_vobject )
			g_object_unref( old_vobject );

		return( *this ); 
	}

	// this mustn't be virtual: we want this class to only be a pointer,
	// no vtable allowed
	~VObject()
	{
#ifdef VIPS_DEBUG_VERBOSE
		printf( "VObject destructor\n" );  
		printf( "   unreffing %p\n", vobject ); 
#endif /*VIPS_DEBUG_VERBOSE*/

		g_assert( !vobject ||
			VIPS_IS_OBJECT( vobject ) ); 
		
		if( vobject ) 
			g_object_unref( vobject ); 
	}

	VipsObject *get_object() const
	{
		g_assert( !vobject ||
			VIPS_IS_OBJECT( vobject ) ); 

		return( vobject ); 
	}

};

class VIPS_CPLUSPLUS_API VImage;
class VIPS_CPLUSPLUS_API VInterpolate;
class VIPS_CPLUSPLUS_API VOption;

class VOption
{
private:
	struct Pair {
		const char *name;

		// the thing we pass to and from our caller
		GValue value; 

		// an input or output parameter ... we guess the direction
		// from the arg to set()
		bool input; 

		// the pointer we write output values to
		union {
			bool *vbool;
			int *vint;
			double *vdouble;
			VImage *vimage;
			std::vector<double> *vvector;
			VipsBlob **vblob;
		}; 

		Pair( const char *name ) : 
			name( name ), input( false ), vimage( 0 )
		{
			// argh = {0} won't work wil vanilla C++
			memset( &value, 0, sizeof( GValue ) ); 
		}

		~Pair()
		{
			g_value_unset( &value );
		}
	};

	std::list<Pair *> options;

public:
	VOption()
	{
	}

	virtual ~VOption();

	VOption *set( const char *name, bool value ); 
	VOption *set( const char *name, int value );
	VOption *set( const char *name, double value );
	VOption *set( const char *name, const char *value );
	VOption *set( const char *name, VImage value );
	VOption *set( const char *name, VInterpolate value ); 
	VOption *set( const char *name, std::vector<VImage> value );
	VOption *set( const char *name, std::vector<double> value );
	VOption *set( const char *name, std::vector<int> value );
	VOption *set( const char *name, VipsBlob *value ); 

	VOption *set( const char *name, bool *value ); 
	VOption *set( const char *name, int *value );
	VOption *set( const char *name, double *value );
	VOption *set( const char *name, VImage *value );
	VOption *set( const char *name, std::vector<double> *value );
	VOption *set( const char *name, VipsBlob **blob ); 

	void set_operation( VipsOperation *operation );
	void get_operation( VipsOperation *operation );

};

class VImage : VObject
{
public:
	VImage( VipsImage *image, VSteal steal = STEAL ) : 
		VObject( (VipsObject *) image, steal )
	{
	}

	// an empty (NULL) VImage, eg. "VImage a;"
	VImage() :
		VObject( 0 )
	{
	}

	VipsImage * 
	get_image() const
	{
		return( (VipsImage *) VObject::get_object() );
	}

	int 
	width() const
	{
		return( vips_image_get_width( get_image() ) ); 
	}

	int 
	height() const
	{
		return( vips_image_get_height( get_image() ) ); 
	}

	int 
	bands() const
	{
		return( vips_image_get_bands( get_image() ) ); 
	}

	VipsBandFormat 
	format() const
	{
		return( vips_image_get_format( get_image() ) ); 
	}

	VipsCoding 
	coding() const
	{
		return( vips_image_get_coding( get_image() ) ); 
	}

	VipsInterpretation 
	interpretation() const
	{
		return( vips_image_get_interpretation( get_image() ) ); 
	}

	VipsInterpretation 
	guess_interpretation() const
	{
		return( vips_image_guess_interpretation( get_image() ) ); 
	}

	double 
	xres() const
	{
		return( vips_image_get_xres( get_image() ) ); 
	}

	double 
	yres() const
	{
		return( vips_image_get_yres( get_image() ) ); 
	}

	int
	xoffset() const
	{
		return( vips_image_get_xoffset( get_image() ) ); 
	}

	int
	yoffset() const
	{
		return( vips_image_get_yoffset( get_image() ) ); 
	}

	const char *
	filename() const
	{
		return( vips_image_get_filename( get_image() ) ); 
	}

	const void *
	data() const
	{
		return( vips_image_get_data( get_image() ) ); 
	}

	void 
	set( const char *field, int value )
	{
		vips_image_set_int( this->get_image(), field, value ); 
	}

	void 
	set( const char *field, double value )
	{
		vips_image_set_double( this->get_image(), field, value ); 
	}

	void 
	set( const char *field, const char *value )
	{
		vips_image_set_string( this->get_image(), field, value ); 
	}

	void 
	set( const char *field, 
		VipsCallbackFn free_fn, void *data, size_t length )
	{
		vips_image_set_blob( this->get_image(), field, 
			free_fn, data, length ); 
	}

	GType 
	get_typeof( const char *field ) const
	{
		return( vips_image_get_typeof( this->get_image(), field ) ); 
	}

	int 
	get_int( const char *field ) const
	{
		int value;

		if( vips_image_get_int( this->get_image(), field, &value ) )
			throw( VError() ); 

		return( value ); 
	}

	double 
	get_double( const char *field ) const
	{
		double value;

		if( vips_image_get_double( this->get_image(), field, &value ) )
			throw( VError() ); 

		return( value ); 
	}

	const char *
	get_string( const char *field ) const
	{
		const char *value; 

		if( vips_image_get_string( this->get_image(), field, &value ) )
			throw( VError() ); 

		return( value ); 
	}

	const void *
	get_blob( const char *field, size_t *length ) const
	{
		void *value; 

		if( vips_image_get_blob( this->get_image(), field, 
			&value, length ) )
			throw( VError() ); 

		return( value ); 
	}

	static VOption *
	option()
	{
		return( new VOption() );
	}

	static void call_option_string( const char *operation_name, 
		const char *option_string, VOption *options = 0 );
	static void call( const char *operation_name, VOption *options = 0 );

	static VImage 
	new_memory()
	{
		return( VImage( vips_image_new_memory() ) ); 
	}

	static VImage 
	new_temp_file( const char *file_format = ".v" )
	{
		VipsImage *image;

		if( !(image = vips_image_new_temp_file( file_format )) )
			throw( VError() ); 

		return( VImage( image ) ); 
	}

	static VImage new_from_file( const char *name, VOption *options = 0 );

	static VImage 
	new_from_memory( void *data, size_t size,
		int width, int height, int bands, VipsBandFormat format )
	{
		VipsImage *image;

		if( !(image = vips_image_new_from_memory( data, size, 
			width, height, bands, format )) )
			throw( VError() ); 

		return( VImage( image ) ); 
	}

	static VImage new_from_buffer( void *buf, size_t len,
		const char *option_string, VOption *options = 0 );

	static VImage new_matrix( int width, int height );

	static VImage 
	new_matrix( int width, int height, double *array, int size )
	{
		VipsImage *image;

		if( !(image = vips_image_new_matrix_from_array( width, height,
			array, size )) )
			throw( VError() ); 

		return( VImage( image ) ); 
	}

	static VImage new_matrixv( int width, int height, ... );

	VImage 
	new_from_image( std::vector<double> pixel ) const
	{
		VipsImage *image;

		if( !(image = vips_image_new_from_image( this->get_image(), 
			&pixel[0], static_cast<int>( pixel.size() ) )) )
			throw( VError() ); 

		return( VImage( image ) ); 
	}

	VImage 
	new_from_image( double pixel ) const
	{
		return( new_from_image( to_vectorv( 1, pixel ) ) ); 
	}

	VImage write( VImage out ) const;

	void write_to_file( const char *name, VOption *options = 0 ) const;

	void write_to_buffer( const char *suffix, void **buf, size_t *size, 
		VOption *options = 0 ) const;

	void *
	write_to_memory( size_t *size ) const
	{
		void *result;

		if( !(result = vips_image_write_to_memory( this->get_image(), 
			size )) )
			throw( VError() ); 

		return( result ); 
	}

#include "vips-operators.h"

	// a few useful things

	VImage
	linear( double a, double b, VOption *options = 0 ) const
	{
		return( this->linear( to_vector( a ), to_vector( b ), 
			options ) ); 
	}

	VImage
	linear( std::vector<double> a, double b, VOption *options = 0 ) const
	{
		return( this->linear( a, to_vector( b ), options ) ); 
	}

	VImage
	linear( double a, std::vector<double> b, VOption *options = 0 ) const
	{
		return( this->linear( to_vector( a ), b, options ) ); 
	}

	std::vector<VImage> bandsplit( VOption *options = 0 ) const;

	VImage bandjoin( VImage other, VOption *options = 0 ) const;

	VImage
	bandjoin( double other, VOption *options = 0 ) const
	{
		return( bandjoin( to_vector( other ), options ) ); 
	}

	VImage
	bandjoin( std::vector<double> other, VOption *options = 0 ) const
	{
		return( bandjoin_const( other, options ) ); 
	}

	VImage composite( VImage other, VipsBlendMode mode, 
		VOption *options = 0 ) const;

	std::complex<double> minpos( VOption *options = 0 ) const;

	std::complex<double> maxpos( VOption *options = 0 ) const;

	VImage 
	fliphor( VOption *options = 0 ) const
	{
		return( flip( VIPS_DIRECTION_HORIZONTAL, options ) ); 
	}

	VImage 
	flipver( VOption *options = 0 ) const
	{
		return( flip( VIPS_DIRECTION_VERTICAL, options ) ); 
	}

	VImage 
	rot90( VOption *options = 0 ) const
	{
		return( rot( VIPS_ANGLE_D90, options ) ); 
	}

	VImage 
	rot180( VOption *options = 0 ) const
	{
		return( rot( VIPS_ANGLE_D180, options ) ); 
	}

	VImage 
	rot270( VOption *options = 0 ) const
	{
		return( rot( VIPS_ANGLE_D270, options ) ); 
	}

	VImage 
	dilate( VImage mask, VOption *options = 0 ) const
	{
		return( morph( mask, VIPS_OPERATION_MORPHOLOGY_DILATE, 
			options ) ); 
	}

	VImage 
	erode( VImage mask, VOption *options = 0 ) const
	{
		return( morph( mask, VIPS_OPERATION_MORPHOLOGY_ERODE, 
			options ) ); 
	}

	VImage 
	median( int size = 3, VOption *options = 0 ) const
	{
		return( rank( size, size, (size * size) / 2, options ) ); 
	}

	VImage 
	floor( VOption *options = 0 ) const
	{
		return( round( VIPS_OPERATION_ROUND_FLOOR, options ) ); 
	}

	VImage 
	ceil( VOption *options = 0 ) const
	{
		return( round( VIPS_OPERATION_ROUND_CEIL, options ) ); 
	}

	VImage 
	rint( VOption *options = 0 ) const
	{
		return( round( VIPS_OPERATION_ROUND_RINT, options ) ); 
	}

	VImage 
	real( VOption *options = 0 ) const
	{
		return( complexget( VIPS_OPERATION_COMPLEXGET_REAL, options ) );
	}

	VImage 
	imag( VOption *options = 0 ) const
	{
		return( complexget( VIPS_OPERATION_COMPLEXGET_IMAG, options ) );
	}

	VImage 
	polar( VOption *options = 0 ) const
	{
		return( complex( VIPS_OPERATION_COMPLEX_POLAR, options ) );
	}

	VImage 
	rect( VOption *options = 0 ) const
	{
		return( complex( VIPS_OPERATION_COMPLEX_RECT, options ) );
	}

	VImage 
	conj( VOption *options = 0 ) const
	{
		return( complex( VIPS_OPERATION_COMPLEX_CONJ, options ) );
	}

	VImage 
	sin( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_SIN, options ) );
	}

	VImage 
	cos( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_COS, options ) );
	}

	VImage 
	tan( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_TAN, options ) );
	}

	VImage 
	asin( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_ASIN, options ) );
	}

	VImage 
	acos( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_ACOS, options ) );
	}

	VImage 
	atan( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_ATAN, options ) );
	}

	VImage 
	log( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_LOG, options ) );
	}

	VImage 
	log10( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_LOG10, options ) );
	}

	VImage 
	exp( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_EXP, options ) );
	}

	VImage 
	exp10( VOption *options = 0 ) const
	{
		return( math( VIPS_OPERATION_MATH_EXP10, options ) );
	}

	VImage 
	pow( VImage other, VOption *options = 0 ) const
	{
		return( math2( other, VIPS_OPERATION_MATH2_POW, options ) );
	}

	VImage 
	pow( double other, VOption *options = 0 ) const
	{
		return( math2_const( VIPS_OPERATION_MATH2_POW, 
			to_vector( other ), options ) );
	}

	VImage 
	pow( std::vector<double> other, VOption *options = 0 ) const
	{
		return( math2_const( VIPS_OPERATION_MATH2_POW, 
			other, options ) );
	}

	VImage 
	wop( VImage other, VOption *options = 0 ) const
	{
		return( math2( other, VIPS_OPERATION_MATH2_WOP, options ) );
	}

	VImage 
	wop( double other, VOption *options = 0 ) const
	{
		return( math2_const( VIPS_OPERATION_MATH2_WOP, 
			to_vector( other ), options ) );
	}

	VImage 
	wop( std::vector<double> other, VOption *options = 0 ) const
	{
		return( math2_const( VIPS_OPERATION_MATH2_WOP, 
			other, options ) );
	}

	VImage 
	ifthenelse( std::vector<double> th, VImage el, 
		VOption *options = 0 ) const
	{
		return( ifthenelse( el.new_from_image( th ), el, options ) ); 
	}

	VImage 
	ifthenelse( VImage th, std::vector<double> el, 
		VOption *options = 0 ) const
	{
		return( ifthenelse( th, th.new_from_image( el ), options ) ); 
	}

	VImage 
	ifthenelse( std::vector<double> th, std::vector<double> el, 
		VOption *options = 0 ) const
	{
		return( ifthenelse( new_from_image( th ), new_from_image( el ),
			options ) ); 
	}

	VImage 
	ifthenelse( double th, VImage el, VOption *options = 0 ) const
	{
		return( ifthenelse( to_vector( th ), el, options ) ); 
	}

	VImage 
	ifthenelse( VImage th, double el, VOption *options = 0 ) const
	{
		return( ifthenelse( th, to_vector( el ), options ) ); 
	}

	VImage 
	ifthenelse( double th, double el, VOption *options = 0 ) const
	{
		return( ifthenelse( to_vector( th ), to_vector( el ), 
			options ) );
	}

	// Operator overloads

	VImage operator[]( int index ) const;

	std::vector<double> operator()( int x, int y ) const;

	friend VIPS_CPLUSPLUS_API VImage 
		operator+( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator+( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator+( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator+( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator+( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator+=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator+=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator+=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator-( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator-( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator-( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator-( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator-( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator-=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator-=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator-=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator-( const VImage a );

	friend VIPS_CPLUSPLUS_API VImage 
		operator*( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator*( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator*( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator*( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator*( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator*=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator*=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator*=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator/( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator/( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator/( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator/( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator/( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator/=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator/=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator/=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator%( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator%( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator%( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator%=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator%=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator%=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator<( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator<=( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<=( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<=( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<=( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<=( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator>( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator>=( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>=( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>=( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>=( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>=( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator==( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator==( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator==( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator==( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator==( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator!=( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator!=( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator!=( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator!=( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator!=( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator&( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator&( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator&( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator&( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator&( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator&=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator&=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator&=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator|( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator|( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator|( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator|( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator|( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator|=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator|=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator|=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator^( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator^( const double a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator^( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator^( const std::vector<double> a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator^( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator^=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator^=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator^=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator<<( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<<( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator<<( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator<<=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator<<=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator<<=( VImage &a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage 
		operator>>( const VImage a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>>( const VImage a, const double b );
	friend VIPS_CPLUSPLUS_API VImage 
		operator>>( const VImage a, const std::vector<double> b );

	friend VIPS_CPLUSPLUS_API VImage & 
		operator>>=( VImage &a, const VImage b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator>>=( VImage &a, const double b );
	friend VIPS_CPLUSPLUS_API VImage & 
		operator>>=( VImage &a, const std::vector<double> b );

};

VIPS_NAMESPACE_END

#endif /*VIPS_VIMAGE_H*/
