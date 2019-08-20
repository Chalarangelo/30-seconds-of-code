//---------------------------------------------------------------------------------
//
//  Little Color Management System
//  Copyright (c) 1998-2017 Marti Maria Saguer
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the Software
// is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
// THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//---------------------------------------------------------------------------------
//
// This is the plug-in header file. Normal LittleCMS clients should not use it.
// It is provided for plug-in writters that may want to access the support
// functions to do low level operations. All plug-in related structures
// are defined here. Including this file forces to include the standard API too.

#ifndef _lcms_plugin_H

// Deal with Microsoft's attempt at deprecating C standard runtime functions
#ifdef _MSC_VER
#    if (_MSC_VER >= 1400)
#      ifndef _CRT_SECURE_NO_DEPRECATE
#        define _CRT_SECURE_NO_DEPRECATE
#      endif
#      ifndef _CRT_SECURE_NO_WARNINGS
#        define _CRT_SECURE_NO_WARNINGS
#      endif
#    endif
#endif

#ifndef _lcms2_H
#include "lcms2.h"
#endif

// We need some standard C functions.
#include <stdlib.h>
#include <math.h>
#include <stdarg.h>
#include <memory.h>
#include <string.h>


#ifndef CMS_USE_CPP_API
#   ifdef __cplusplus
extern "C" {
#   endif
#endif

// Vector & Matrix operations -----------------------------------------------------------------------

// Axis of the matrix/array. No specific meaning at all.
#define VX      0
#define VY      1
#define VZ      2

// Vectors
typedef struct {
    cmsFloat64Number n[3];

    } cmsVEC3;

// 3x3 Matrix
typedef struct {
    cmsVEC3 v[3];

    } cmsMAT3;

CMSAPI void               CMSEXPORT _cmsVEC3init(cmsVEC3* r, cmsFloat64Number x, cmsFloat64Number y, cmsFloat64Number z);
CMSAPI void               CMSEXPORT _cmsVEC3minus(cmsVEC3* r, const cmsVEC3* a, const cmsVEC3* b);
CMSAPI void               CMSEXPORT _cmsVEC3cross(cmsVEC3* r, const cmsVEC3* u, const cmsVEC3* v);
CMSAPI cmsFloat64Number   CMSEXPORT _cmsVEC3dot(const cmsVEC3* u, const cmsVEC3* v);
CMSAPI cmsFloat64Number   CMSEXPORT _cmsVEC3length(const cmsVEC3* a);
CMSAPI cmsFloat64Number   CMSEXPORT _cmsVEC3distance(const cmsVEC3* a, const cmsVEC3* b);

CMSAPI void               CMSEXPORT _cmsMAT3identity(cmsMAT3* a);
CMSAPI cmsBool            CMSEXPORT _cmsMAT3isIdentity(const cmsMAT3* a);
CMSAPI void               CMSEXPORT _cmsMAT3per(cmsMAT3* r, const cmsMAT3* a, const cmsMAT3* b);
CMSAPI cmsBool            CMSEXPORT _cmsMAT3inverse(const cmsMAT3* a, cmsMAT3* b);
CMSAPI cmsBool            CMSEXPORT _cmsMAT3solve(cmsVEC3* x, cmsMAT3* a, cmsVEC3* b);
CMSAPI void               CMSEXPORT _cmsMAT3eval(cmsVEC3* r, const cmsMAT3* a, const cmsVEC3* v);


// Error logging  -------------------------------------------------------------------------------------

CMSAPI void               CMSEXPORT  cmsSignalError(cmsContext ContextID, cmsUInt32Number ErrorCode, const char *ErrorText, ...);

// Memory management ----------------------------------------------------------------------------------

CMSAPI void*              CMSEXPORT _cmsMalloc(cmsContext ContextID, cmsUInt32Number size);
CMSAPI void*              CMSEXPORT _cmsMallocZero(cmsContext ContextID, cmsUInt32Number size);
CMSAPI void*              CMSEXPORT _cmsCalloc(cmsContext ContextID, cmsUInt32Number num, cmsUInt32Number size);
CMSAPI void*              CMSEXPORT _cmsRealloc(cmsContext ContextID, void* Ptr, cmsUInt32Number NewSize);
CMSAPI void               CMSEXPORT _cmsFree(cmsContext ContextID, void* Ptr);
CMSAPI void*              CMSEXPORT _cmsDupMem(cmsContext ContextID, const void* Org, cmsUInt32Number size);

// I/O handler ----------------------------------------------------------------------------------

struct _cms_io_handler {

    void* stream;   // Associated stream, which is implemented differently depending on media.

    cmsContext        ContextID;
    cmsUInt32Number   UsedSpace;
    cmsUInt32Number   ReportedSize;
    char              PhysicalFile[cmsMAX_PATH];

    cmsUInt32Number   (* Read)(struct _cms_io_handler* iohandler, void *Buffer,
                                                                  cmsUInt32Number size,
                                                                  cmsUInt32Number count);
    cmsBool           (* Seek)(struct _cms_io_handler* iohandler, cmsUInt32Number offset);
    cmsBool           (* Close)(struct _cms_io_handler* iohandler);
    cmsUInt32Number   (* Tell)(struct _cms_io_handler* iohandler);
    cmsBool           (* Write)(struct _cms_io_handler* iohandler, cmsUInt32Number size,
                                                                   const void* Buffer);
};

// Endianness adjust functions
CMSAPI cmsUInt16Number   CMSEXPORT  _cmsAdjustEndianess16(cmsUInt16Number Word);
CMSAPI cmsUInt32Number   CMSEXPORT  _cmsAdjustEndianess32(cmsUInt32Number Value);
CMSAPI void              CMSEXPORT  _cmsAdjustEndianess64(cmsUInt64Number* Result, cmsUInt64Number* QWord);

// Helper IO functions
CMSAPI cmsBool           CMSEXPORT  _cmsReadUInt8Number(cmsIOHANDLER* io,  cmsUInt8Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsReadUInt16Number(cmsIOHANDLER* io, cmsUInt16Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsReadUInt32Number(cmsIOHANDLER* io, cmsUInt32Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsReadFloat32Number(cmsIOHANDLER* io, cmsFloat32Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsReadUInt64Number(cmsIOHANDLER* io, cmsUInt64Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsRead15Fixed16Number(cmsIOHANDLER* io, cmsFloat64Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsReadXYZNumber(cmsIOHANDLER* io, cmsCIEXYZ* XYZ);
CMSAPI cmsBool           CMSEXPORT  _cmsReadUInt16Array(cmsIOHANDLER* io, cmsUInt32Number n, cmsUInt16Number* Array);

CMSAPI cmsBool           CMSEXPORT  _cmsWriteUInt8Number(cmsIOHANDLER* io, cmsUInt8Number n);
CMSAPI cmsBool           CMSEXPORT  _cmsWriteUInt16Number(cmsIOHANDLER* io, cmsUInt16Number n);
CMSAPI cmsBool           CMSEXPORT  _cmsWriteUInt32Number(cmsIOHANDLER* io, cmsUInt32Number n);
CMSAPI cmsBool           CMSEXPORT  _cmsWriteFloat32Number(cmsIOHANDLER* io, cmsFloat32Number n);
CMSAPI cmsBool           CMSEXPORT  _cmsWriteUInt64Number(cmsIOHANDLER* io, cmsUInt64Number* n);
CMSAPI cmsBool           CMSEXPORT  _cmsWrite15Fixed16Number(cmsIOHANDLER* io, cmsFloat64Number n);
CMSAPI cmsBool           CMSEXPORT  _cmsWriteXYZNumber(cmsIOHANDLER* io, const cmsCIEXYZ* XYZ);
CMSAPI cmsBool           CMSEXPORT  _cmsWriteUInt16Array(cmsIOHANDLER* io, cmsUInt32Number n, const cmsUInt16Number* Array);

// ICC base tag
typedef struct {
    cmsTagTypeSignature  sig;
    cmsInt8Number        reserved[4];

} _cmsTagBase;

// Type base helper functions
CMSAPI cmsTagTypeSignature  CMSEXPORT _cmsReadTypeBase(cmsIOHANDLER* io);
CMSAPI cmsBool              CMSEXPORT _cmsWriteTypeBase(cmsIOHANDLER* io, cmsTagTypeSignature sig);

// Alignment functions
CMSAPI cmsBool             CMSEXPORT _cmsReadAlignment(cmsIOHANDLER* io);
CMSAPI cmsBool             CMSEXPORT _cmsWriteAlignment(cmsIOHANDLER* io);

// To deal with text streams. 2K at most
CMSAPI cmsBool             CMSEXPORT _cmsIOPrintf(cmsIOHANDLER* io, const char* frm, ...);

// Fixed point helper functions
CMSAPI cmsFloat64Number    CMSEXPORT _cms8Fixed8toDouble(cmsUInt16Number fixed8);
CMSAPI cmsUInt16Number     CMSEXPORT _cmsDoubleTo8Fixed8(cmsFloat64Number val);

CMSAPI cmsFloat64Number    CMSEXPORT _cms15Fixed16toDouble(cmsS15Fixed16Number fix32);
CMSAPI cmsS15Fixed16Number CMSEXPORT _cmsDoubleTo15Fixed16(cmsFloat64Number v);

// Date/time helper functions
CMSAPI void                CMSEXPORT _cmsEncodeDateTimeNumber(cmsDateTimeNumber *Dest, const struct tm *Source);
CMSAPI void                CMSEXPORT _cmsDecodeDateTimeNumber(const cmsDateTimeNumber *Source, struct tm *Dest);

//----------------------------------------------------------------------------------------------------------

// Shared callbacks for user data
typedef void     (* _cmsFreeUserDataFn)(cmsContext ContextID, void* Data);
typedef void*    (* _cmsDupUserDataFn)(cmsContext ContextID, const void* Data);

//----------------------------------------------------------------------------------------------------------

// Plug-in foundation
#define cmsPluginMagicNumber                 0x61637070     // 'acpp'

#define cmsPluginMemHandlerSig               0x6D656D48     // 'memH'
#define cmsPluginInterpolationSig            0x696E7048     // 'inpH'
#define cmsPluginParametricCurveSig          0x70617248     // 'parH'
#define cmsPluginFormattersSig               0x66726D48     // 'frmH
#define cmsPluginTagTypeSig                  0x74797048     // 'typH'
#define cmsPluginTagSig                      0x74616748     // 'tagH'
#define cmsPluginRenderingIntentSig          0x696E7448     // 'intH'
#define cmsPluginMultiProcessElementSig      0x6D706548     // 'mpeH'
#define cmsPluginOptimizationSig             0x6F707448     // 'optH'
#define cmsPluginTransformSig                0x7A666D48     // 'xfmH'
#define cmsPluginMutexSig                    0x6D747A48     // 'mtxH'

typedef struct _cmsPluginBaseStruct {

        cmsUInt32Number                Magic;               // 'acpp' signature
        cmsUInt32Number                ExpectedVersion;     // Expected version of LittleCMS
        cmsUInt32Number                Type;                // Type of plug-in
        struct _cmsPluginBaseStruct*   Next;                // For multiple plugin definition. NULL for end of list.

} cmsPluginBase;

// Maximum number of types in a plugin array
#define MAX_TYPES_IN_LCMS_PLUGIN    20

//----------------------------------------------------------------------------------------------------------

// Memory handler. Each new plug-in type replaces current behaviour

typedef void* (* _cmsMallocFnPtrType)(cmsContext ContextID, cmsUInt32Number size); 
typedef void  (* _cmsFreeFnPtrType)(cmsContext ContextID, void *Ptr);
typedef void* (* _cmsReallocFnPtrType)(cmsContext ContextID, void* Ptr, cmsUInt32Number NewSize);

typedef void* (* _cmsMalloZerocFnPtrType)(cmsContext ContextID, cmsUInt32Number size); 
typedef void* (* _cmsCallocFnPtrType)(cmsContext ContextID, cmsUInt32Number num, cmsUInt32Number size);
typedef void* (* _cmsDupFnPtrType)(cmsContext ContextID, const void* Org, cmsUInt32Number size);

typedef struct {

        cmsPluginBase base;

        // Required
        _cmsMallocFnPtrType  MallocPtr;
        _cmsFreeFnPtrType    FreePtr;
        _cmsReallocFnPtrType ReallocPtr;

        // Optional
       _cmsMalloZerocFnPtrType MallocZeroPtr;
       _cmsCallocFnPtrType     CallocPtr;
       _cmsDupFnPtrType        DupPtr;

} cmsPluginMemHandler;


// ------------------------------------------------------------------------------------------------------------------

// Interpolation. 16 bits and floating point versions.
struct _cms_interp_struc;

// Interpolation callbacks

// 16 bits forward interpolation. This function performs precision-limited linear interpolation
// and is supposed to be quite fast. Implementation may be tetrahedral or trilinear, and plug-ins may
// choose to implement any other interpolation algorithm.
typedef void (* _cmsInterpFn16)(register const cmsUInt16Number Input[],
                                register cmsUInt16Number Output[],
                                register const struct _cms_interp_struc* p);

// Floating point forward interpolation. Full precision interpolation using floats. This is not a
// time critical function. Implementation may be tetrahedral or trilinear, and plug-ins may
// choose to implement any other interpolation algorithm.
typedef void (* _cmsInterpFnFloat)(cmsFloat32Number const Input[],
                                   cmsFloat32Number Output[],
                                   const struct _cms_interp_struc* p);



// This type holds a pointer to an interpolator that can be either 16 bits or float
typedef union {
    _cmsInterpFn16       Lerp16;            // Forward interpolation in 16 bits
    _cmsInterpFnFloat    LerpFloat;         // Forward interpolation in floating point
} cmsInterpFunction;

// Flags for interpolator selection
#define CMS_LERP_FLAGS_16BITS             0x0000        // The default
#define CMS_LERP_FLAGS_FLOAT              0x0001        // Requires different implementation
#define CMS_LERP_FLAGS_TRILINEAR          0x0100        // Hint only


#define MAX_INPUT_DIMENSIONS 8

typedef struct _cms_interp_struc {  // Used on all interpolations. Supplied by lcms2 when calling the interpolation function

    cmsContext ContextID;     // The calling thread

    cmsUInt32Number dwFlags;  // Keep original flags
    cmsUInt32Number nInputs;  // != 1 only in 3D interpolation
    cmsUInt32Number nOutputs; // != 1 only in 3D interpolation

    cmsUInt32Number nSamples[MAX_INPUT_DIMENSIONS];  // Valid on all kinds of tables
    cmsUInt32Number Domain[MAX_INPUT_DIMENSIONS];    // Domain = nSamples - 1

    cmsUInt32Number opta[MAX_INPUT_DIMENSIONS];     // Optimization for 3D CLUT. This is the number of nodes premultiplied for each
                                                    // dimension. For example, in 7 nodes, 7, 7^2 , 7^3, 7^4, etc. On non-regular
                                                    // Samplings may vary according of the number of nodes for each dimension.

    const void *Table;                // Points to the actual interpolation table
    cmsInterpFunction Interpolation;  // Points to the function to do the interpolation

 } cmsInterpParams;

// Interpolators factory
typedef cmsInterpFunction (* cmsInterpFnFactory)(cmsUInt32Number nInputChannels, cmsUInt32Number nOutputChannels, cmsUInt32Number dwFlags);

// The plug-in
typedef struct {
    cmsPluginBase base;

    // Points to a user-supplied function which implements the factory
    cmsInterpFnFactory InterpolatorsFactory;

} cmsPluginInterpolation;

//----------------------------------------------------------------------------------------------------------

// Parametric curves. A negative type means same function but analytically inverted. Max. number of params is 10

// Evaluator callback for user-supplied parametric curves. May implement more than one type
typedef  cmsFloat64Number (* cmsParametricCurveEvaluator)(cmsInt32Number Type, const cmsFloat64Number Params[10], cmsFloat64Number R);

// Plug-in may implement an arbitrary number of parametric curves
typedef struct {
    cmsPluginBase base;

    cmsUInt32Number nFunctions;                                     // Number of supported functions
    cmsUInt32Number FunctionTypes[MAX_TYPES_IN_LCMS_PLUGIN];        // The identification types
    cmsUInt32Number ParameterCount[MAX_TYPES_IN_LCMS_PLUGIN];       // Number of parameters for each function

    cmsParametricCurveEvaluator    Evaluator;                       // The evaluator

} cmsPluginParametricCurves;
//----------------------------------------------------------------------------------------------------------

// Formatters. This plug-in adds new handlers, replacing them if they already exist. Formatters dealing with
// cmsFloat32Number (bps = 4) or double (bps = 0) types are requested via FormatterFloat callback. Others come across
// Formatter16 callback

struct _cmstransform_struct;

typedef cmsUInt8Number* (* cmsFormatter16)(register struct _cmstransform_struct* CMMcargo,
                                           register cmsUInt16Number Values[],
                                           register cmsUInt8Number* Buffer,
                                           register cmsUInt32Number Stride);

typedef cmsUInt8Number* (* cmsFormatterFloat)(struct _cmstransform_struct* CMMcargo,
                                              cmsFloat32Number Values[],
                                              cmsUInt8Number*  Buffer,
                                              cmsUInt32Number  Stride);

// This type holds a pointer to a formatter that can be either 16 bits or cmsFloat32Number
typedef union {
    cmsFormatter16    Fmt16;
    cmsFormatterFloat FmtFloat;

} cmsFormatter;

#define CMS_PACK_FLAGS_16BITS       0x0000
#define CMS_PACK_FLAGS_FLOAT        0x0001

typedef enum { cmsFormatterInput=0, cmsFormatterOutput=1 } cmsFormatterDirection;

typedef cmsFormatter (* cmsFormatterFactory)(cmsUInt32Number Type,           // Specific type, i.e. TYPE_RGB_8
                                             cmsFormatterDirection Dir,
                                             cmsUInt32Number dwFlags);      // precision

// Plug-in may implement an arbitrary number of formatters
typedef struct {
    cmsPluginBase          base;
    cmsFormatterFactory    FormattersFactory;

} cmsPluginFormatters;

//----------------------------------------------------------------------------------------------------------

// Tag type handler. Each type is free to return anything it wants, and it is up to the caller to
// know in advance what is the type contained in the tag.
typedef struct _cms_typehandler_struct {

        cmsTagTypeSignature Signature;     // The signature of the type

        // Allocates and reads items
        void *   (* ReadPtr)(struct _cms_typehandler_struct* self,
                             cmsIOHANDLER*      io,
                             cmsUInt32Number*   nItems,
                             cmsUInt32Number    SizeOfTag);

        // Writes n Items
        cmsBool  (* WritePtr)(struct _cms_typehandler_struct* self,
                              cmsIOHANDLER*     io,
                              void*             Ptr,
                              cmsUInt32Number   nItems);

        // Duplicate an item or array of items
        void*   (* DupPtr)(struct _cms_typehandler_struct* self,
                           const void *Ptr,
                           cmsUInt32Number n);

        // Free all resources
        void    (* FreePtr)(struct _cms_typehandler_struct* self,
                            void *Ptr);

        // Additional parameters used by the calling thread
        cmsContext       ContextID;
        cmsUInt32Number  ICCVersion;

} cmsTagTypeHandler;

// Each plug-in implements a single type
typedef struct {
        cmsPluginBase      base;
        cmsTagTypeHandler  Handler;

} cmsPluginTagType;

//----------------------------------------------------------------------------------------------------------

// This is the tag plugin, which identifies tags. For writing, a pointer to function is provided.
// This function should return the desired type for this tag, given the version of profile
// and the data being serialized.
typedef struct {

    cmsUInt32Number     ElemCount;          // If this tag needs an array, how many elements should keep

    // For reading.
    cmsUInt32Number     nSupportedTypes;    // In how many types this tag can come (MAX_TYPES_IN_LCMS_PLUGIN maximum)
    cmsTagTypeSignature SupportedTypes[MAX_TYPES_IN_LCMS_PLUGIN];

    // For writing
    cmsTagTypeSignature (* DecideType)(cmsFloat64Number ICCVersion, const void *Data);

} cmsTagDescriptor;

// Plug-in implements a single tag
typedef struct {
    cmsPluginBase    base;

    cmsTagSignature  Signature;
    cmsTagDescriptor Descriptor;

} cmsPluginTag;

//----------------------------------------------------------------------------------------------------------

// Custom intents. This function should join all profiles specified in the array in
// a single LUT. Any custom intent in the chain redirects to custom function. If more than
// one custom intent is found, the one located first is invoked. Usually users should use only one
// custom intent, so mixing custom intents in same multiprofile transform is not supported.

typedef cmsPipeline* (* cmsIntentFn)( cmsContext       ContextID,
                                      cmsUInt32Number  nProfiles,
                                      cmsUInt32Number  Intents[],
                                      cmsHPROFILE      hProfiles[],
                                      cmsBool          BPC[],
                                      cmsFloat64Number AdaptationStates[],
                                      cmsUInt32Number  dwFlags);


// Each plug-in defines a single intent number.
typedef struct {
    cmsPluginBase     base;
    cmsUInt32Number   Intent;
    cmsIntentFn       Link;
    char              Description[256];

} cmsPluginRenderingIntent;


// The default ICC intents (perceptual, saturation, rel.col and abs.col)
CMSAPI cmsPipeline*  CMSEXPORT _cmsDefaultICCintents(cmsContext       ContextID,
                                                     cmsUInt32Number  nProfiles,
                                                     cmsUInt32Number  Intents[],
                                                     cmsHPROFILE      hProfiles[],
                                                     cmsBool          BPC[],
                                                     cmsFloat64Number AdaptationStates[],
                                                     cmsUInt32Number  dwFlags);


//----------------------------------------------------------------------------------------------------------

// Pipelines, Multi Process Elements.

typedef void (* _cmsStageEvalFn)     (const cmsFloat32Number In[], cmsFloat32Number Out[], const cmsStage* mpe);
typedef void*(* _cmsStageDupElemFn)  (cmsStage* mpe);
typedef void (* _cmsStageFreeElemFn) (cmsStage* mpe);


// This function allocates a generic MPE
CMSAPI cmsStage* CMSEXPORT _cmsStageAllocPlaceholder(cmsContext ContextID,
                                cmsStageSignature     Type,
                                cmsUInt32Number       InputChannels,
                                cmsUInt32Number       OutputChannels,
                                _cmsStageEvalFn       EvalPtr,            // Points to fn that evaluates the element (always in floating point)
                                _cmsStageDupElemFn    DupElemPtr,         // Points to a fn that duplicates the stage
                                _cmsStageFreeElemFn   FreePtr,            // Points to a fn that sets the element free
                                void*                 Data);              // A generic pointer to whatever memory needed by the element
typedef struct {
      cmsPluginBase     base;
      cmsTagTypeHandler Handler;

}  cmsPluginMultiProcessElement;


// Data kept in "Element" member of cmsStage

// Curves
typedef struct {
    cmsUInt32Number nCurves;
    cmsToneCurve**  TheCurves;

} _cmsStageToneCurvesData;

// Matrix
typedef struct {
    cmsFloat64Number*  Double;          // floating point for the matrix
    cmsFloat64Number*  Offset;          // The offset

} _cmsStageMatrixData;

// CLUT
typedef struct {

    union {                       // Can have only one of both representations at same time
        cmsUInt16Number*  T;      // Points to the table 16 bits table
        cmsFloat32Number* TFloat; // Points to the cmsFloat32Number table

    } Tab;

    cmsInterpParams* Params;
    cmsUInt32Number  nEntries;
    cmsBool          HasFloatValues;

} _cmsStageCLutData;


//----------------------------------------------------------------------------------------------------------
// Optimization. Using this plug-in, additional optimization strategies may be implemented.
// The function should return TRUE if any optimization is done on the LUT, this terminates
// the optimization  search. Or FALSE if it is unable to optimize and want to give a chance
// to the rest of optimizers.

typedef void     (* _cmsOPTeval16Fn)(register const cmsUInt16Number In[],
                                     register cmsUInt16Number Out[],
                                     register const void* Data);


typedef cmsBool  (* _cmsOPToptimizeFn)(cmsPipeline** Lut,
                                       cmsUInt32Number  Intent,
                                       cmsUInt32Number* InputFormat,
                                       cmsUInt32Number* OutputFormat,
                                       cmsUInt32Number* dwFlags);

// This function may be used to set the optional evaluator and a block of private data. If private data is being used, an optional
// duplicator and free functions should also be specified in order to duplicate the LUT construct. Use NULL to inhibit such functionality.

CMSAPI void CMSEXPORT _cmsPipelineSetOptimizationParameters(cmsPipeline* Lut,
                                               _cmsOPTeval16Fn Eval16,
                                               void* PrivateData,
                                               _cmsFreeUserDataFn FreePrivateDataFn,
                                               _cmsDupUserDataFn DupPrivateDataFn);

typedef struct {
      cmsPluginBase     base;

      // Optimize entry point
      _cmsOPToptimizeFn  OptimizePtr;

}  cmsPluginOptimization;

//----------------------------------------------------------------------------------------------------------
// Full xform

typedef struct {
       cmsUInt32Number BytesPerLineIn;
       cmsUInt32Number BytesPerLineOut;
       cmsUInt32Number BytesPerPlaneIn;
       cmsUInt32Number BytesPerPlaneOut;

} cmsStride;

typedef void     (* _cmsTransformFn)(struct _cmstransform_struct *CMMcargo,   // Legacy function, handles just ONE scanline.
                                     const void* InputBuffer,
                                     void* OutputBuffer,
                                     cmsUInt32Number Size,
                                     cmsUInt32Number Stride);                 // Stride in bytes to the next plana in planar formats


typedef void     (*_cmsTransform2Fn)(struct _cmstransform_struct *CMMcargo,
                                     const void* InputBuffer,
                                     void* OutputBuffer,
                                     cmsUInt32Number PixelsPerLine,     
                                     cmsUInt32Number LineCount,          
                                     const cmsStride* Stride);  

typedef cmsBool  (* _cmsTransformFactory)(_cmsTransformFn* xform,
                                         void** UserData,
                                         _cmsFreeUserDataFn* FreePrivateDataFn,
                                         cmsPipeline** Lut,
                                         cmsUInt32Number* InputFormat,
                                         cmsUInt32Number* OutputFormat,
                                         cmsUInt32Number* dwFlags);

typedef cmsBool  (* _cmsTransform2Factory)(_cmsTransform2Fn* xform,
                                         void** UserData,
                                         _cmsFreeUserDataFn* FreePrivateDataFn,
                                         cmsPipeline** Lut,
                                         cmsUInt32Number* InputFormat,
                                         cmsUInt32Number* OutputFormat,
                                         cmsUInt32Number* dwFlags);


// Retrieve user data as specified by the factory
CMSAPI void   CMSEXPORT _cmsSetTransformUserData(struct _cmstransform_struct *CMMcargo, void* ptr, _cmsFreeUserDataFn FreePrivateDataFn);
CMSAPI void * CMSEXPORT _cmsGetTransformUserData(struct _cmstransform_struct *CMMcargo);


// Retrieve formatters
CMSAPI void   CMSEXPORT _cmsGetTransformFormatters16   (struct _cmstransform_struct *CMMcargo, cmsFormatter16* FromInput, cmsFormatter16* ToOutput);
CMSAPI void   CMSEXPORT _cmsGetTransformFormattersFloat(struct _cmstransform_struct *CMMcargo, cmsFormatterFloat* FromInput, cmsFormatterFloat* ToOutput);

typedef struct {
      cmsPluginBase     base;

      // Transform entry point
      union {
             _cmsTransformFactory        legacy_xform;
             _cmsTransform2Factory       xform;
      } factories;

}  cmsPluginTransform;

//----------------------------------------------------------------------------------------------------------
// Mutex 

typedef void*    (* _cmsCreateMutexFnPtrType)(cmsContext ContextID);
typedef void     (* _cmsDestroyMutexFnPtrType)(cmsContext ContextID, void* mtx);
typedef cmsBool  (* _cmsLockMutexFnPtrType)(cmsContext ContextID, void* mtx);
typedef void     (* _cmsUnlockMutexFnPtrType)(cmsContext ContextID, void* mtx);

typedef struct {
      cmsPluginBase     base;

     _cmsCreateMutexFnPtrType  CreateMutexPtr;
     _cmsDestroyMutexFnPtrType DestroyMutexPtr;
     _cmsLockMutexFnPtrType    LockMutexPtr;
     _cmsUnlockMutexFnPtrType  UnlockMutexPtr;

}  cmsPluginMutex;

CMSAPI void*   CMSEXPORT _cmsCreateMutex(cmsContext ContextID);
CMSAPI void    CMSEXPORT _cmsDestroyMutex(cmsContext ContextID, void* mtx);
CMSAPI cmsBool CMSEXPORT _cmsLockMutex(cmsContext ContextID, void* mtx);
CMSAPI void    CMSEXPORT _cmsUnlockMutex(cmsContext ContextID, void* mtx);


#ifndef CMS_USE_CPP_API
#   ifdef __cplusplus
    }
#   endif
#endif

#define _lcms_plugin_H
#endif
