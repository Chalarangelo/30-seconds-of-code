/***************************************************************************/
/*                                                                         */
/*  ftdriver.h                                                             */
/*                                                                         */
/*    FreeType API for controlling driver modules (specification only).    */
/*                                                                         */
/*  Copyright 2017-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


#ifndef FTDRIVER_H_
#define FTDRIVER_H_

#include <ft2build.h>
#include FT_FREETYPE_H
#include FT_PARAMETER_TAGS_H

#ifdef FREETYPE_H
#error "freetype.h of FreeType 1 has been loaded!"
#error "Please fix the directory search order for header files"
#error "so that freetype.h of FreeType 2 is found first."
#endif


FT_BEGIN_HEADER


  /**************************************************************************
   *
   * @section:
   *   auto_hinter
   *
   * @title:
   *   The auto-hinter
   *
   * @abstract:
   *   Controlling the auto-hinting module.
   *
   * @description:
   *   While FreeType's auto-hinter doesn't expose API functions by itself,
   *   it is possible to control its behaviour with @FT_Property_Set and
   *   @FT_Property_Get.  The following lists the available properties
   *   together with the necessary macros and structures.
   *
   *   Note that the auto-hinter's module name is `autofitter' for
   *   historical reasons.
   *
   *   Available properties are @increase-x-height, @no-stem-darkening
   *   (experimental), @darkening-parameters (experimental), @warping
   *   (experimental), @glyph-to-script-map (experimental), @fallback-script
   *   (experimental), and @default-script (experimental), as documented in
   *   the @properties section.
   *
   */


  /**************************************************************************
   *
   * @section:
   *   cff_driver
   *
   * @title:
   *   The CFF driver
   *
   * @abstract:
   *   Controlling the CFF driver module.
   *
   * @description:
   *   While FreeType's CFF driver doesn't expose API functions by itself,
   *   it is possible to control its behaviour with @FT_Property_Set and
   *   @FT_Property_Get.
   *
   *   The CFF driver's module name is `cff'.
   *
   *   Available properties are @hinting-engine, @no-stem-darkening,
   *   @darkening-parameters, and @random-seed, as documented in the
   *   @properties section.
   *
   *
   *   *Hinting* *and* *antialiasing* *principles* *of* *the* *new* *engine*
   *
   *   The rasterizer is positioning horizontal features (e.g., ascender
   *   height & x-height, or crossbars) on the pixel grid and minimizing the
   *   amount of antialiasing applied to them, while placing vertical
   *   features (vertical stems) on the pixel grid without hinting, thus
   *   representing the stem position and weight accurately.  Sometimes the
   *   vertical stems may be only partially black.  In this context,
   *   `antialiasing' means that stems are not positioned exactly on pixel
   *   borders, causing a fuzzy appearance.
   *
   *   There are two principles behind this approach.
   *
   *   1) No hinting in the horizontal direction: Unlike `superhinted'
   *   TrueType, which changes glyph widths to accommodate regular
   *   inter-glyph spacing, Adobe's approach is `faithful to the design' in
   *   representing both the glyph width and the inter-glyph spacing
   *   designed for the font.  This makes the screen display as close as it
   *   can be to the result one would get with infinite resolution, while
   *   preserving what is considered the key characteristics of each glyph.
   *   Note that the distances between unhinted and grid-fitted positions at
   *   small sizes are comparable to kerning values and thus would be
   *   noticeable (and distracting) while reading if hinting were applied.
   *
   *   One of the reasons to not hint horizontally is antialiasing for LCD
   *   screens: The pixel geometry of modern displays supplies three
   *   vertical subpixels as the eye moves horizontally across each visible
   *   pixel.  On devices where we can be certain this characteristic is
   *   present a rasterizer can take advantage of the subpixels to add
   *   increments of weight.  In Western writing systems this turns out to
   *   be the more critical direction anyway; the weights and spacing of
   *   vertical stems (see above) are central to Armenian, Cyrillic, Greek,
   *   and Latin type designs.  Even when the rasterizer uses greyscale
   *   antialiasing instead of color (a necessary compromise when one
   *   doesn't know the screen characteristics), the unhinted vertical
   *   features preserve the design's weight and spacing much better than
   *   aliased type would.
   *
   *   2) Alignment in the vertical direction: Weights and spacing along the
   *   y~axis are less critical; what is much more important is the visual
   *   alignment of related features (like cap-height and x-height).  The
   *   sense of alignment for these is enhanced by the sharpness of grid-fit
   *   edges, while the cruder vertical resolution (full pixels instead of
   *   1/3 pixels) is less of a problem.
   *
   *   On the technical side, horizontal alignment zones for ascender,
   *   x-height, and other important height values (traditionally called
   *   `blue zones') as defined in the font are positioned independently,
   *   each being rounded to the nearest pixel edge, taking care of
   *   overshoot suppression at small sizes, stem darkening, and scaling.
   *
   *   Hstems (this is, hint values defined in the font to help align
   *   horizontal features) that fall within a blue zone are said to be
   *   `captured' and are aligned to that zone.  Uncaptured stems are moved
   *   in one of four ways, top edge up or down, bottom edge up or down.
   *   Unless there are conflicting hstems, the smallest movement is taken
   *   to minimize distortion.
   *
   */


  /**************************************************************************
   *
   * @section:
   *   pcf_driver
   *
   * @title:
   *   The PCF driver
   *
   * @abstract:
   *   Controlling the PCF driver module.
   *
   * @description:
   *   While FreeType's PCF driver doesn't expose API functions by itself,
   *   it is possible to control its behaviour with @FT_Property_Set and
   *   @FT_Property_Get.  Right now, there is a single property
   *   @no-long-family-names available if FreeType is compiled with
   *   PCF_CONFIG_OPTION_LONG_FAMILY_NAMES.
   *
   *   The PCF driver's module name is `pcf'.
   *
   */


  /**************************************************************************
   *
   * @section:
   *   t1_cid_driver
   *
   * @title:
   *   The Type 1 and CID drivers
   *
   * @abstract:
   *   Controlling the Type~1 and CID driver modules.
   *
   * @description:
   *   It is possible to control the behaviour of FreeType's Type~1 and
   *   Type~1 CID drivers with @FT_Property_Set and @FT_Property_Get.
   *
   *   Behind the scenes, both drivers use the Adobe CFF engine for hinting;
   *   however, the used properties must be specified separately.
   *
   *   The Type~1 driver's module name is `type1'; the CID driver's module
   *   name is `t1cid'.
   *
   *   Available properties are @hinting-engine, @no-stem-darkening,
   *   @darkening-parameters, and @random-seed, as documented in the
   *   @properties section.
   *
   *   Please see the @cff_driver section for more details on the new
   *   hinting engine.
   *
   */


  /**************************************************************************
   *
   * @section:
   *   tt_driver
   *
   * @title:
   *   The TrueType driver
   *
   * @abstract:
   *   Controlling the TrueType driver module.
   *
   * @description:
   *   While FreeType's TrueType driver doesn't expose API functions by
   *   itself, it is possible to control its behaviour with @FT_Property_Set
   *   and @FT_Property_Get.  The following lists the available properties
   *   together with the necessary macros and structures.
   *
   *   The TrueType driver's module name is `truetype'.
   *
   *   A single property @interpreter-version is available, as documented in
   *   the @properties section.
   *
   *   We start with a list of definitions, kindly provided by Greg
   *   Hitchcock.
   *
   *   _Bi-Level_ _Rendering_
   *
   *   Monochromatic rendering, exclusively used in the early days of
   *   TrueType by both Apple and Microsoft.  Microsoft's GDI interface
   *   supported hinting of the right-side bearing point, such that the
   *   advance width could be non-linear.  Most often this was done to
   *   achieve some level of glyph symmetry.  To enable reasonable
   *   performance (e.g., not having to run hinting on all glyphs just to
   *   get the widths) there was a bit in the head table indicating if the
   *   side bearing was hinted, and additional tables, `hdmx' and `LTSH', to
   *   cache hinting widths across multiple sizes and device aspect ratios.
   *
   *   _Font_ _Smoothing_
   *
   *   Microsoft's GDI implementation of anti-aliasing.  Not traditional
   *   anti-aliasing as the outlines were hinted before the sampling.  The
   *   widths matched the bi-level rendering.
   *
   *   _ClearType_ _Rendering_
   *
   *   Technique that uses physical subpixels to improve rendering on LCD
   *   (and other) displays.  Because of the higher resolution, many methods
   *   of improving symmetry in glyphs through hinting the right-side
   *   bearing were no longer necessary.  This lead to what GDI calls
   *   `natural widths' ClearType, see
   *   http://www.beatstamm.com/typography/RTRCh4.htm#Sec21.  Since hinting
   *   has extra resolution, most non-linearity went away, but it is still
   *   possible for hints to change the advance widths in this mode.
   *
   *   _ClearType_ _Compatible_ _Widths_
   *
   *   One of the earliest challenges with ClearType was allowing the
   *   implementation in GDI to be selected without requiring all UI and
   *   documents to reflow.  To address this, a compatible method of
   *   rendering ClearType was added where the font hints are executed once
   *   to determine the width in bi-level rendering, and then re-run in
   *   ClearType, with the difference in widths being absorbed in the font
   *   hints for ClearType (mostly in the white space of hints); see
   *   http://www.beatstamm.com/typography/RTRCh4.htm#Sec20.  Somewhat by
   *   definition, compatible width ClearType allows for non-linear widths,
   *   but only when the bi-level version has non-linear widths.
   *
   *   _ClearType_ _Subpixel_ _Positioning_
   *
   *   One of the nice benefits of ClearType is the ability to more crisply
   *   display fractional widths; unfortunately, the GDI model of integer
   *   bitmaps did not support this.  However, the WPF and Direct Write
   *   frameworks do support fractional widths.  DWrite calls this `natural
   *   mode', not to be confused with GDI's `natural widths'.  Subpixel
   *   positioning, in the current implementation of Direct Write,
   *   unfortunately does not support hinted advance widths, see
   *   http://www.beatstamm.com/typography/RTRCh4.htm#Sec22.  Note that the
   *   TrueType interpreter fully allows the advance width to be adjusted in
   *   this mode, just the DWrite client will ignore those changes.
   *
   *   _ClearType_ _Backward_ _Compatibility_
   *
   *   This is a set of exceptions made in the TrueType interpreter to
   *   minimize hinting techniques that were problematic with the extra
   *   resolution of ClearType; see
   *   http://www.beatstamm.com/typography/RTRCh4.htm#Sec1 and
   *   https://www.microsoft.com/typography/cleartype/truetypecleartype.aspx.
   *   This technique is not to be confused with ClearType compatible
   *   widths.  ClearType backward compatibility has no direct impact on
   *   changing advance widths, but there might be an indirect impact on
   *   disabling some deltas.  This could be worked around in backward
   *   compatibility mode.
   *
   *   _Native_ _ClearType_ _Mode_
   *
   *   (Not to be confused with `natural widths'.)  This mode removes all
   *   the exceptions in the TrueType interpreter when running with
   *   ClearType.  Any issues on widths would still apply, though.
   *
   */


  /**************************************************************************
   *
   * @section:
   *   properties
   *
   * @title:
   *   Driver properties
   *
   * @abstract:
   *   Controlling driver modules.
   *
   * @description:
   *   Driver modules can be controlled by setting and unsetting properties,
   *   using the functions @FT_Property_Set and @FT_Property_Get.  This
   *   section documents the available properties, together with auxiliary
   *   macros and structures.
   *
   */


  /**************************************************************************
   *
   * @enum:
   *   FT_HINTING_XXX
   *
   * @description:
   *   A list of constants used for the @hinting-engine property to
   *   select the hinting engine for CFF, Type~1, and CID fonts.
   *
   * @values:
   *   FT_HINTING_FREETYPE ::
   *     Use the old FreeType hinting engine.
   *
   *   FT_HINTING_ADOBE ::
   *     Use the hinting engine contributed by Adobe.
   *
   * @since:
   *   2.9
   *
   */
#define FT_HINTING_FREETYPE  0
#define FT_HINTING_ADOBE     1

  /* these constants (introduced in 2.4.12) are deprecated */
#define FT_CFF_HINTING_FREETYPE  FT_HINTING_FREETYPE
#define FT_CFF_HINTING_ADOBE     FT_HINTING_ADOBE


  /**************************************************************************
   *
   * @property:
   *   hinting-engine
   *
   * @description:
   *   Thanks to Adobe, which contributed a new hinting (and parsing)
   *   engine, an application can select between `freetype' and `adobe' if
   *   compiled with CFF_CONFIG_OPTION_OLD_ENGINE.  If this configuration
   *   macro isn't defined, `hinting-engine' does nothing.
   *
   *   The same holds for the Type~1 and CID modules if compiled with
   *   T1_CONFIG_OPTION_OLD_ENGINE.
   *
   *   For the `cff' module, the default engine is `freetype' if
   *   CFF_CONFIG_OPTION_OLD_ENGINE is defined, and `adobe' otherwise.
   *
   *   For both the `type1' and `t1cid' modules, the default engine is
   *   `freetype' if T1_CONFIG_OPTION_OLD_ENGINE is defined, and `adobe'
   *   otherwise.
   *
   *   The following example code demonstrates how to select Adobe's hinting
   *   engine for the `cff' module (omitting the error handling).
   *
   *   {
   *     FT_Library  library;
   *     FT_UInt     hinting_engine = FT_CFF_HINTING_ADOBE;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "cff",
   *                               "hinting-engine", &hinting_engine );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable (using values `adobe' or `freetype').
   *
   * @since:
   *   2.4.12 (for `cff' module)
   *
   *   2.9 (for `type1' and `t1cid' modules)
   *
   */


  /**************************************************************************
   *
   * @property:
   *   no-stem-darkening
   *
   * @description:
   *   All glyphs that pass through the auto-hinter will be emboldened
   *   unless this property is set to TRUE.  The same is true for the CFF,
   *   Type~1, and CID font modules if the `Adobe' engine is selected (which
   *   is the default).
   *
   *   Stem darkening emboldens glyphs at smaller sizes to make them more
   *   readable on common low-DPI screens when using linear alpha blending
   *   and gamma correction, see @FT_Render_Glyph.  When not using linear
   *   alpha blending and gamma correction, glyphs will appear heavy and
   *   fuzzy!
   *
   *   Gamma correction essentially lightens fonts since shades of grey are
   *   shifted to higher pixel values (=~higher brightness) to match the
   *   original intention to the reality of our screens.  The side-effect is
   *   that glyphs `thin out'.  Mac OS~X and Adobe's proprietary font
   *   rendering library implement a counter-measure: stem darkening at
   *   smaller sizes where shades of gray dominate.  By emboldening a glyph
   *   slightly in relation to its pixel size, individual pixels get higher
   *   coverage of filled-in outlines and are therefore `blacker'.  This
   *   counteracts the `thinning out' of glyphs, making text remain readable
   *   at smaller sizes.
   *
   *   By default, the Adobe engines for CFF, Type~1, and CID fonts darken
   *   stems at smaller sizes, regardless of hinting, to enhance contrast. 
   *   Setting this property, stem darkening gets switched off.
   *
   *   For the auto-hinter, stem-darkening is experimental currently and
   *   thus switched off by default (this is, `no-stem-darkening' is set to
   *   TRUE by default).  Total consistency with the CFF driver is not
   *   achieved right now because the emboldening method differs and glyphs
   *   must be scaled down on the Y-axis to keep outline points inside their
   *   precomputed blue zones.  The smaller the size (especially 9ppem and
   *   down), the higher the loss of emboldening versus the CFF driver.
   *
   *   Note that stem darkening is never applied if @FT_LOAD_NO_SCALE is
   *   set.
   *
   *   {
   *     FT_Library  library;
   *     FT_Bool     no_stem_darkening = TRUE;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "cff",
   *                               "no-stem-darkening", &no_stem_darkening );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable (using values 1 and 0 for `on' and `off', respectively).
   *   It can also be set per face using @FT_Face_Properties with
   *   @FT_PARAM_TAG_STEM_DARKENING.
   *
   * @since:
   *   2.4.12 (for `cff' module)
   *
   *   2.6.2 (for `autofitter' module)
   *
   *   2.9 (for `type1' and `t1cid' modules)
   *
   */


  /**************************************************************************
   *
   * @property:
   *   darkening-parameters
   *
   * @description:
   *   By default, the Adobe hinting engine, as used by the CFF, Type~1, and
   *   CID font drivers, darkens stems as follows (if the
   *   `no-stem-darkening' property isn't set):
   *
   *   {
   *     stem width <= 0.5px:   darkening amount = 0.4px
   *     stem width  = 1px:     darkening amount = 0.275px
   *     stem width  = 1.667px: darkening amount = 0.275px
   *     stem width >= 2.333px: darkening amount = 0px
   *   }
   *
   *   and piecewise linear in-between.  At configuration time, these four
   *   control points can be set with the macro
   *   `CFF_CONFIG_OPTION_DARKENING_PARAMETERS'; the CFF, Type~1, and CID
   *   drivers share these values.  At runtime, the control points can be
   *   changed using the `darkening-parameters' property, as the following
   *   example demonstrates for the Type~1 driver.
   *
   *   {
   *     FT_Library  library;
   *     FT_Int      darken_params[8] = {  500, 300,   // x1, y1
   *                                      1000, 200,   // x2, y2
   *                                      1500, 100,   // x3, y3
   *                                      2000,   0 }; // x4, y4
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "type1",
   *                               "darkening-parameters", darken_params );
   *   }
   *
   *   The x~values give the stem width, and the y~values the darkening
   *   amount.  The unit is 1000th of pixels.  All coordinate values must be
   *   positive; the x~values must be monotonically increasing; the
   *   y~values must be monotonically decreasing and smaller than or
   *   equal to 500 (corresponding to half a pixel); the slope of each
   *   linear piece must be shallower than -1 (e.g., -.4).
   *
   *   The auto-hinter provides this property, too, as an experimental
   *   feature.  See @no-stem-darkening for more.
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable, using eight comma-separated integers without spaces.  Here
   *   the above example, using `\' to break the line for readability.
   *
   *   {
   *     FREETYPE_PROPERTIES=\
   *     type1:darkening-parameters=500,300,1000,200,1500,100,2000,0
   *   }
   *
   * @since:
   *   2.5.1 (for `cff' module)
   *
   *   2.6.2 (for `autofitter' module)
   *
   *   2.9 (for `type1' and `t1cid' modules)
   *
   */


  /**************************************************************************
   *
   * @property:
   *   random-seed
   *
   * @description:
   *   By default, the seed value for the CFF `random' operator and the
   *   similar `0 28 callothersubr pop' command for the Type~1 and CID
   *   drivers is set to a random value.  However, mainly for debugging
   *   purposes, it is often necessary to use a known value as a seed so
   *   that the pseudo-random number sequences generated by `random' are
   *   repeatable.
   *
   *   The `random-seed' property does that.  Its argument is a signed 32bit
   *   integer; if the value is zero or negative, the seed given by the
   *   `intitialRandomSeed' private DICT operator in a CFF file gets used
   *   (or a default value if there is no such operator).  If the value is
   *   positive, use it instead of `initialRandomSeed', which is
   *   consequently ignored.
   *
   * @note:
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable.  It can also be set per face using @FT_Face_Properties with
   *   @FT_PARAM_TAG_RANDOM_SEED.
   *
   * @since:
   *   2.8 (for `cff' module)
   *
   *   2.9 (for `type1' and `t1cid' modules)
   *
   */


  /**************************************************************************
   *
   * @property:
   *   no-long-family-names
   *
   * @description:
   *   If PCF_CONFIG_OPTION_LONG_FAMILY_NAMES is active while compiling
   *   FreeType, the PCF driver constructs long family names.
   *
   *   There are many PCF fonts just called `Fixed' which look completely
   *   different, and which have nothing to do with each other.  When
   *   selecting `Fixed' in KDE or Gnome one gets results that appear rather
   *   random, the style changes often if one changes the size and one
   *   cannot select some fonts at all.  The improve this situation, the PCF
   *   module prepends the foundry name (plus a space) to the family name.
   *   It also checks whether there are `wide' characters; all put together,
   *   family names like `Sony Fixed' or `Misc Fixed Wide' are constructed.
   *
   *   If `no-long-family-names' is set, this feature gets switched off.
   *
   *   {
   *     FT_Library  library;
   *     FT_Bool     no_long_family_names = TRUE;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "pcf",
   *                               "no-long-family-names",
   *                               &no_long_family_names );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable (using values 1 and 0 for `on' and `off', respectively).
   *
   * @since:
   *   2.8
   */


  /**************************************************************************
   *
   * @enum:
   *   TT_INTERPRETER_VERSION_XXX
   *
   * @description:
   *   A list of constants used for the @interpreter-version property to
   *   select the hinting engine for Truetype fonts.
   *
   *   The numeric value in the constant names represents the version
   *   number as returned by the `GETINFO' bytecode instruction.
   *
   * @values:
   *   TT_INTERPRETER_VERSION_35 ::
   *     Version~35 corresponds to MS rasterizer v.1.7 as used e.g. in
   *     Windows~98; only grayscale and B/W rasterizing is supported.
   *
   *   TT_INTERPRETER_VERSION_38 ::
   *     Version~38 corresponds to MS rasterizer v.1.9; it is roughly
   *     equivalent to the hinting provided by DirectWrite ClearType (as can
   *     be found, for example, in the Internet Explorer~9 running on
   *     Windows~7).  It is used in FreeType to select the `Infinality'
   *     subpixel hinting code.  The code may be removed in a future
   *     version.
   *
   *   TT_INTERPRETER_VERSION_40 ::
   *     Version~40 corresponds to MS rasterizer v.2.1; it is roughly
   *     equivalent to the hinting provided by DirectWrite ClearType (as can
   *     be found, for example, in Microsoft's Edge Browser on Windows~10).
   *     It is used in FreeType to select the `minimal' subpixel hinting
   *     code, a stripped-down and higher performance version of the
   *     `Infinality' code.
   *
   * @note:
   *   This property controls the behaviour of the bytecode interpreter
   *   and thus how outlines get hinted.  It does *not* control how glyph
   *   get rasterized!  In particular, it does not control subpixel color
   *   filtering.
   *
   *   If FreeType has not been compiled with the configuration option
   *   TT_CONFIG_OPTION_SUBPIXEL_HINTING, selecting version~38 or~40 causes
   *   an `FT_Err_Unimplemented_Feature' error.
   *
   *   Depending on the graphics framework, Microsoft uses different
   *   bytecode and rendering engines.  As a consequence, the version
   *   numbers returned by a call to the `GETINFO' bytecode instruction are
   *   more convoluted than desired.
   *
   *   Here are two tables that try to shed some light on the possible
   *   values for the MS rasterizer engine, together with the additional
   *   features introduced by it.
   *
   *   {
   *     GETINFO framework               version feature
   *     -------------------------------------------------------------------
   *         3   GDI (Win 3.1),            v1.0  16-bit, first version
   *             TrueImage
   *        33   GDI (Win NT 3.1),         v1.5  32-bit
   *             HP Laserjet
   *        34   GDI (Win 95)              v1.6  font smoothing,
   *                                             new SCANTYPE opcode
   *        35   GDI (Win 98/2000)         v1.7  (UN)SCALED_COMPONENT_OFFSET
   *                                               bits in composite glyphs
   *        36   MGDI (Win CE 2)           v1.6+ classic ClearType
   *        37   GDI (XP and later),       v1.8  ClearType
   *             GDI+ old (before Vista)
   *        38   GDI+ old (Vista, Win 7),  v1.9  subpixel ClearType,
   *             WPF                             Y-direction ClearType,
   *                                             additional error checking
   *        39   DWrite (before Win 8)     v2.0  subpixel ClearType flags
   *                                               in GETINFO opcode,
   *                                             bug fixes
   *        40   GDI+ (after Win 7),       v2.1  Y-direction ClearType flag
   *             DWrite (Win 8)                    in GETINFO opcode,
   *                                             Gray ClearType
   *   }
   *
   *   The `version' field gives a rough orientation only, since some
   *   applications provided certain features much earlier (as an example,
   *   Microsoft Reader used subpixel and Y-direction ClearType already in
   *   Windows 2000).  Similarly, updates to a given framework might include
   *   improved hinting support.
   *
   *   {
   *      version   sampling          rendering        comment
   *               x        y       x           y
   *     --------------------------------------------------------------
   *       v1.0   normal  normal  B/W           B/W    bi-level
   *       v1.6   high    high    gray          gray   grayscale
   *       v1.8   high    normal  color-filter  B/W    (GDI) ClearType
   *       v1.9   high    high    color-filter  gray   Color ClearType
   *       v2.1   high    normal  gray          B/W    Gray ClearType
   *       v2.1   high    high    gray          gray   Gray ClearType
   *   }
   *
   *   Color and Gray ClearType are the two available variants of
   *   `Y-direction ClearType', meaning grayscale rasterization along the
   *   Y-direction; the name used in the TrueType specification for this
   *   feature is `symmetric smoothing'.  `Classic ClearType' is the
   *   original algorithm used before introducing a modified version in
   *   Win~XP.  Another name for v1.6's grayscale rendering is `font
   *   smoothing', and `Color ClearType' is sometimes also called `DWrite
   *   ClearType'.  To differentiate between today's Color ClearType and the
   *   earlier ClearType variant with B/W rendering along the vertical axis,
   *   the latter is sometimes called `GDI ClearType'.
   *
   *   `Normal' and `high' sampling describe the (virtual) resolution to
   *   access the rasterized outline after the hinting process.  `Normal'
   *   means 1 sample per grid line (i.e., B/W).  In the current Microsoft
   *   implementation, `high' means an extra virtual resolution of 16x16 (or
   *   16x1) grid lines per pixel for bytecode instructions like `MIRP'.
   *   After hinting, these 16 grid lines are mapped to 6x5 (or 6x1) grid
   *   lines for color filtering if Color ClearType is activated.
   *
   *   Note that `Gray ClearType' is essentially the same as v1.6's
   *   grayscale rendering.  However, the GETINFO instruction handles it
   *   differently: v1.6 returns bit~12 (hinting for grayscale), while v2.1
   *   returns bits~13 (hinting for ClearType), 18 (symmetrical smoothing),
   *   and~19 (Gray ClearType).  Also, this mode respects bits 2 and~3 for
   *   the version~1 gasp table exclusively (like Color ClearType), while
   *   v1.6 only respects the values of version~0 (bits 0 and~1).
   *
   *   Keep in mind that the features of the above interpreter versions
   *   might not map exactly to FreeType features or behavior because it is
   *   a fundamentally different library with different internals.
   *
   */
#define TT_INTERPRETER_VERSION_35  35
#define TT_INTERPRETER_VERSION_38  38
#define TT_INTERPRETER_VERSION_40  40


  /**************************************************************************
   *
   * @property:
   *   interpreter-version
   *
   * @description:
   *   Currently, three versions are available, two representing the
   *   bytecode interpreter with subpixel hinting support (old `Infinality'
   *   code and new stripped-down and higher performance `minimal' code) and
   *   one without, respectively.  The default is subpixel support if
   *   TT_CONFIG_OPTION_SUBPIXEL_HINTING is defined, and no subpixel support
   *   otherwise (since it isn't available then).
   *
   *   If subpixel hinting is on, many TrueType bytecode instructions behave
   *   differently compared to B/W or grayscale rendering (except if `native
   *   ClearType' is selected by the font).  Microsoft's main idea is to
   *   render at a much increased horizontal resolution, then sampling down
   *   the created output to subpixel precision.  However, many older fonts
   *   are not suited to this and must be specially taken care of by
   *   applying (hardcoded) tweaks in Microsoft's interpreter.
   *
   *   Details on subpixel hinting and some of the necessary tweaks can be
   *   found in Greg Hitchcock's whitepaper at
   *   `https://www.microsoft.com/typography/cleartype/truetypecleartype.aspx'.
   *   Note that FreeType currently doesn't really `subpixel hint' (6x1, 6x2,
   *   or 6x5 supersampling) like discussed in the paper.  Depending on the
   *   chosen interpreter, it simply ignores instructions on vertical stems
   *   to arrive at very similar results.
   *
   *   The following example code demonstrates how to deactivate subpixel
   *   hinting (omitting the error handling).
   *
   *   {
   *     FT_Library  library;
   *     FT_Face     face;
   *     FT_UInt     interpreter_version = TT_INTERPRETER_VERSION_35;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "truetype",
   *                               "interpreter-version",
   *                               &interpreter_version );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable (using values `35', `38', or `40').
   *
   * @since:
   *   2.5
   */


  /**************************************************************************
   *
   * @property:
   *   glyph-to-script-map
   *
   * @description:
   *   *Experimental* *only*
   *
   *   The auto-hinter provides various script modules to hint glyphs.
   *   Examples of supported scripts are Latin or CJK.  Before a glyph is
   *   auto-hinted, the Unicode character map of the font gets examined, and
   *   the script is then determined based on Unicode character ranges, see
   *   below.
   *
   *   OpenType fonts, however, often provide much more glyphs than
   *   character codes (small caps, superscripts, ligatures, swashes, etc.),
   *   to be controlled by so-called `features'.  Handling OpenType features
   *   can be quite complicated and thus needs a separate library on top of
   *   FreeType.
   *
   *   The mapping between glyph indices and scripts (in the auto-hinter
   *   sense, see the @FT_AUTOHINTER_SCRIPT_XXX values) is stored as an
   *   array with `num_glyphs' elements, as found in the font's @FT_Face
   *   structure.  The `glyph-to-script-map' property returns a pointer to
   *   this array, which can be modified as needed.  Note that the
   *   modification should happen before the first glyph gets processed by
   *   the auto-hinter so that the global analysis of the font shapes
   *   actually uses the modified mapping.
   *
   *   The following example code demonstrates how to access it (omitting
   *   the error handling).
   *
   *   {
   *     FT_Library                library;
   *     FT_Face                   face;
   *     FT_Prop_GlyphToScriptMap  prop;
   *
   *
   *     FT_Init_FreeType( &library );
   *     FT_New_Face( library, "foo.ttf", 0, &face );
   *
   *     prop.face = face;
   *
   *     FT_Property_Get( library, "autofitter",
   *                               "glyph-to-script-map", &prop );
   *
   *     // adjust `prop.map' as needed right here
   *
   *     FT_Load_Glyph( face, ..., FT_LOAD_FORCE_AUTOHINT );
   *   }
   *
   * @since:
   *   2.4.11
   *
   */


  /**************************************************************************
   *
   * @enum:
   *   FT_AUTOHINTER_SCRIPT_XXX
   *
   * @description:
   *   *Experimental* *only*
   *
   *   A list of constants used for the @glyph-to-script-map property to
   *   specify the script submodule the auto-hinter should use for hinting a
   *   particular glyph.
   *
   * @values:
   *   FT_AUTOHINTER_SCRIPT_NONE ::
   *     Don't auto-hint this glyph.
   *
   *   FT_AUTOHINTER_SCRIPT_LATIN ::
   *     Apply the latin auto-hinter.  For the auto-hinter, `latin' is a
   *     very broad term, including Cyrillic and Greek also since characters
   *     from those scripts share the same design constraints.
   *
   *     By default, characters from the following Unicode ranges are
   *     assigned to this submodule.
   *
   *     {
   *       U+0020 - U+007F  // Basic Latin (no control characters)
   *       U+00A0 - U+00FF  // Latin-1 Supplement (no control characters)
   *       U+0100 - U+017F  // Latin Extended-A
   *       U+0180 - U+024F  // Latin Extended-B
   *       U+0250 - U+02AF  // IPA Extensions
   *       U+02B0 - U+02FF  // Spacing Modifier Letters
   *       U+0300 - U+036F  // Combining Diacritical Marks
   *       U+0370 - U+03FF  // Greek and Coptic
   *       U+0400 - U+04FF  // Cyrillic
   *       U+0500 - U+052F  // Cyrillic Supplement
   *       U+1D00 - U+1D7F  // Phonetic Extensions
   *       U+1D80 - U+1DBF  // Phonetic Extensions Supplement
   *       U+1DC0 - U+1DFF  // Combining Diacritical Marks Supplement
   *       U+1E00 - U+1EFF  // Latin Extended Additional
   *       U+1F00 - U+1FFF  // Greek Extended
   *       U+2000 - U+206F  // General Punctuation
   *       U+2070 - U+209F  // Superscripts and Subscripts
   *       U+20A0 - U+20CF  // Currency Symbols
   *       U+2150 - U+218F  // Number Forms
   *       U+2460 - U+24FF  // Enclosed Alphanumerics
   *       U+2C60 - U+2C7F  // Latin Extended-C
   *       U+2DE0 - U+2DFF  // Cyrillic Extended-A
   *       U+2E00 - U+2E7F  // Supplemental Punctuation
   *       U+A640 - U+A69F  // Cyrillic Extended-B
   *       U+A720 - U+A7FF  // Latin Extended-D
   *       U+FB00 - U+FB06  // Alphab. Present. Forms (Latin Ligatures)
   *      U+1D400 - U+1D7FF // Mathematical Alphanumeric Symbols
   *      U+1F100 - U+1F1FF // Enclosed Alphanumeric Supplement
   *     }
   *
   *   FT_AUTOHINTER_SCRIPT_CJK ::
   *     Apply the CJK auto-hinter, covering Chinese, Japanese, Korean, old
   *     Vietnamese, and some other scripts.
   *
   *     By default, characters from the following Unicode ranges are
   *     assigned to this submodule.
   *
   *     {
   *       U+1100 - U+11FF  // Hangul Jamo
   *       U+2E80 - U+2EFF  // CJK Radicals Supplement
   *       U+2F00 - U+2FDF  // Kangxi Radicals
   *       U+2FF0 - U+2FFF  // Ideographic Description Characters
   *       U+3000 - U+303F  // CJK Symbols and Punctuation
   *       U+3040 - U+309F  // Hiragana
   *       U+30A0 - U+30FF  // Katakana
   *       U+3100 - U+312F  // Bopomofo
   *       U+3130 - U+318F  // Hangul Compatibility Jamo
   *       U+3190 - U+319F  // Kanbun
   *       U+31A0 - U+31BF  // Bopomofo Extended
   *       U+31C0 - U+31EF  // CJK Strokes
   *       U+31F0 - U+31FF  // Katakana Phonetic Extensions
   *       U+3200 - U+32FF  // Enclosed CJK Letters and Months
   *       U+3300 - U+33FF  // CJK Compatibility
   *       U+3400 - U+4DBF  // CJK Unified Ideographs Extension A
   *       U+4DC0 - U+4DFF  // Yijing Hexagram Symbols
   *       U+4E00 - U+9FFF  // CJK Unified Ideographs
   *       U+A960 - U+A97F  // Hangul Jamo Extended-A
   *       U+AC00 - U+D7AF  // Hangul Syllables
   *       U+D7B0 - U+D7FF  // Hangul Jamo Extended-B
   *       U+F900 - U+FAFF  // CJK Compatibility Ideographs
   *       U+FE10 - U+FE1F  // Vertical forms
   *       U+FE30 - U+FE4F  // CJK Compatibility Forms
   *       U+FF00 - U+FFEF  // Halfwidth and Fullwidth Forms
   *      U+1B000 - U+1B0FF // Kana Supplement
   *      U+1D300 - U+1D35F // Tai Xuan Hing Symbols
   *      U+1F200 - U+1F2FF // Enclosed Ideographic Supplement
   *      U+20000 - U+2A6DF // CJK Unified Ideographs Extension B
   *      U+2A700 - U+2B73F // CJK Unified Ideographs Extension C
   *      U+2B740 - U+2B81F // CJK Unified Ideographs Extension D
   *      U+2F800 - U+2FA1F // CJK Compatibility Ideographs Supplement
   *     }
   *
   *   FT_AUTOHINTER_SCRIPT_INDIC ::
   *     Apply the indic auto-hinter, covering all major scripts from the
   *     Indian sub-continent and some other related scripts like Thai, Lao,
   *     or Tibetan.
   *
   *     By default, characters from the following Unicode ranges are
   *     assigned to this submodule.
   *
   *     {
   *       U+0900 - U+0DFF  // Indic Range
   *       U+0F00 - U+0FFF  // Tibetan
   *       U+1900 - U+194F  // Limbu
   *       U+1B80 - U+1BBF  // Sundanese
   *       U+A800 - U+A82F  // Syloti Nagri
   *       U+ABC0 - U+ABFF  // Meetei Mayek
   *      U+11800 - U+118DF // Sharada
   *     }
   *
   *     Note that currently Indic support is rudimentary only, missing blue
   *     zone support.
   *
   * @since:
   *   2.4.11
   *
   */
#define FT_AUTOHINTER_SCRIPT_NONE   0
#define FT_AUTOHINTER_SCRIPT_LATIN  1
#define FT_AUTOHINTER_SCRIPT_CJK    2
#define FT_AUTOHINTER_SCRIPT_INDIC  3


  /**************************************************************************
   *
   * @struct:
   *   FT_Prop_GlyphToScriptMap
   *
   * @description:
   *   *Experimental* *only*
   *
   *   The data exchange structure for the @glyph-to-script-map property.
   *
   * @since:
   *   2.4.11
   *
   */
  typedef struct  FT_Prop_GlyphToScriptMap_
  {
    FT_Face     face;
    FT_UShort*  map;

  } FT_Prop_GlyphToScriptMap;


  /**************************************************************************
   *
   * @property:
   *   fallback-script
   *
   * @description:
   *   *Experimental* *only*
   *
   *   If no auto-hinter script module can be assigned to a glyph, a
   *   fallback script gets assigned to it (see also the
   *   @glyph-to-script-map property).  By default, this is
   *   @FT_AUTOHINTER_SCRIPT_CJK.  Using the `fallback-script' property,
   *   this fallback value can be changed.
   *
   *   {
   *     FT_Library  library;
   *     FT_UInt     fallback_script = FT_AUTOHINTER_SCRIPT_NONE;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "autofitter",
   *                               "fallback-script", &fallback_script );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   It's important to use the right timing for changing this value: The
   *   creation of the glyph-to-script map that eventually uses the
   *   fallback script value gets triggered either by setting or reading a
   *   face-specific property like @glyph-to-script-map, or by auto-hinting
   *   any glyph from that face.  In particular, if you have already created
   *   an @FT_Face structure but not loaded any glyph (using the
   *   auto-hinter), a change of the fallback script will affect this face.
   *
   * @since:
   *   2.4.11
   *
   */


  /**************************************************************************
   *
   * @property:
   *   default-script
   *
   * @description:
   *   *Experimental* *only*
   *
   *   If FreeType gets compiled with FT_CONFIG_OPTION_USE_HARFBUZZ to make
   *   the HarfBuzz library access OpenType features for getting better
   *   glyph coverages, this property sets the (auto-fitter) script to be
   *   used for the default (OpenType) script data of a font's GSUB table.
   *   Features for the default script are intended for all scripts not
   *   explicitly handled in GSUB; an example is a `dlig' feature,
   *   containing the combination of the characters `T', `E', and `L' to
   *   form a `TEL' ligature.
   *
   *   By default, this is @FT_AUTOHINTER_SCRIPT_LATIN.  Using the
   *   `default-script' property, this default value can be changed.
   *
   *   {
   *     FT_Library  library;
   *     FT_UInt     default_script = FT_AUTOHINTER_SCRIPT_NONE;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "autofitter",
   *                               "default-script", &default_script );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   It's important to use the right timing for changing this value: The
   *   creation of the glyph-to-script map that eventually uses the
   *   default script value gets triggered either by setting or reading a
   *   face-specific property like @glyph-to-script-map, or by auto-hinting
   *   any glyph from that face.  In particular, if you have already created
   *   an @FT_Face structure but not loaded any glyph (using the
   *   auto-hinter), a change of the default script will affect this face.
   *
   * @since:
   *   2.5.3
   *
   */


  /**************************************************************************
   *
   * @property:
   *   increase-x-height
   *
   * @description:
   *   For ppem values in the range 6~<= ppem <= `increase-x-height', round
   *   up the font's x~height much more often than normally.  If the value
   *   is set to~0, which is the default, this feature is switched off.  Use
   *   this property to improve the legibility of small font sizes if
   *   necessary.
   *
   *   {
   *     FT_Library               library;
   *     FT_Face                  face;
   *     FT_Prop_IncreaseXHeight  prop;
   *
   *
   *     FT_Init_FreeType( &library );
   *     FT_New_Face( library, "foo.ttf", 0, &face );
   *     FT_Set_Char_Size( face, 10 * 64, 0, 72, 0 );
   *
   *     prop.face  = face;
   *     prop.limit = 14;
   *
   *     FT_Property_Set( library, "autofitter",
   *                               "increase-x-height", &prop );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   Set this value right after calling @FT_Set_Char_Size, but before
   *   loading any glyph (using the auto-hinter).
   *
   * @since:
   *   2.4.11
   *
   */


  /**************************************************************************
   *
   * @struct:
   *   FT_Prop_IncreaseXHeight
   *
   * @description:
   *   The data exchange structure for the @increase-x-height property.
   *
   */
  typedef struct  FT_Prop_IncreaseXHeight_
  {
    FT_Face  face;
    FT_UInt  limit;

  } FT_Prop_IncreaseXHeight;


  /**************************************************************************
   *
   * @property:
   *   warping
   *
   * @description:
   *   *Experimental* *only*
   *
   *   If FreeType gets compiled with option AF_CONFIG_OPTION_USE_WARPER to
   *   activate the warp hinting code in the auto-hinter, this property
   *   switches warping on and off.
   *
   *   Warping only works in `normal' auto-hinting mode replacing it.
   *   The idea of the code is to slightly scale and shift a glyph along
   *   the non-hinted dimension (which is usually the horizontal axis) so
   *   that as much of its segments are aligned (more or less) to the grid.
   *   To find out a glyph's optimal scaling and shifting value, various
   *   parameter combinations are tried and scored.
   *
   *   By default, warping is off.  The example below shows how to switch on
   *   warping (omitting the error handling).
   *
   *   {
   *     FT_Library  library;
   *     FT_Bool     warping = 1;
   *
   *
   *     FT_Init_FreeType( &library );
   *
   *     FT_Property_Set( library, "autofitter",
   *                               "warping", &warping );
   *   }
   *
   * @note:
   *   This property can be used with @FT_Property_Get also.
   *
   *   This property can be set via the `FREETYPE_PROPERTIES' environment
   *   variable (using values 1 and 0 for `on' and `off', respectively).
   *
   *   The warping code can also change advance widths.  Have a look at the
   *   `lsb_delta' and `rsb_delta' fields in the @FT_GlyphSlotRec structure
   *   for details on improving inter-glyph distances while rendering.
   *
   *   Since warping is a global property of the auto-hinter it is best to
   *   change its value before rendering any face.  Otherwise, you should
   *   reload all faces that get auto-hinted in `normal' hinting mode.
   *
   * @since:
   *   2.6
   *
   */


 /* */


FT_END_HEADER


#endif /* FTDRIVER_H_ */


/* END */
