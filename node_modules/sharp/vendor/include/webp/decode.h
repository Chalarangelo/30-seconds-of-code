// Copyright 2010 Google Inc. All Rights Reserved.
//
// Use of this source code is governed by a BSD-style license
// that can be found in the COPYING file in the root of the source
// tree. An additional intellectual property rights grant can be found
// in the file PATENTS. All contributing project authors may
// be found in the AUTHORS file in the root of the source tree.
// -----------------------------------------------------------------------------
//
//  Main decoding functions for WebP images.
//
// Author: Skal (pascal.massimino@gmail.com)

#ifndef WEBP_WEBP_DECODE_H_
#define WEBP_WEBP_DECODE_H_

#include "./types.h"

#ifdef __cplusplus
extern "C" {
#endif

#define WEBP_DECODER_ABI_VERSION 0x0208    // MAJOR(8b) + MINOR(8b)

// Note: forward declaring enumerations is not allowed in (strict) C and C++,
// the types are left here for reference.
// typedef enum VP8StatusCode VP8StatusCode;
// typedef enum WEBP_CSP_MODE WEBP_CSP_MODE;
typedef struct WebPRGBABuffer WebPRGBABuffer;
typedef struct WebPYUVABuffer WebPYUVABuffer;
typedef struct WebPDecBuffer WebPDecBuffer;
typedef struct WebPIDecoder WebPIDecoder;
typedef struct WebPBitstreamFeatures WebPBitstreamFeatures;
typedef struct WebPDecoderOptions WebPDecoderOptions;
typedef struct WebPDecoderConfig WebPDecoderConfig;

// Return the decoder's version number, packed in hexadecimal using 8bits for
// each of major/minor/revision. E.g: v2.5.7 is 0x020507.
WEBP_EXTERN int WebPGetDecoderVersion(void);

// Retrieve basic header information: width, height.
// This function will also validate the header, returning true on success,
// false otherwise. '*width' and '*height' are only valid on successful return.
// Pointers 'width' and 'height' can be passed NULL if deemed irrelevant.
// Note: The following chunk sequences (before the raw VP8/VP8L data) are
// considered valid by this function:
// RIFF + VP8(L)
// RIFF + VP8X + (optional chunks) + VP8(L)
// ALPH + VP8 <-- Not a valid WebP format: only allowed for internal purpose.
// VP8(L)     <-- Not a valid WebP format: only allowed for internal purpose.
WEBP_EXTERN int WebPGetInfo(const uint8_t* data, size_t data_size,
                            int* width, int* height);

// Decodes WebP images pointed to by 'data' and returns RGBA samples, along
// with the dimensions in *width and *height. The ordering of samples in
// memory is R, G, B, A, R, G, B, A... in scan order (endian-independent).
// The returned pointer should be deleted calling WebPFree().
// Returns NULL in case of error.
WEBP_EXTERN uint8_t* WebPDecodeRGBA(const uint8_t* data, size_t data_size,
                                    int* width, int* height);

// Same as WebPDecodeRGBA, but returning A, R, G, B, A, R, G, B... ordered data.
WEBP_EXTERN uint8_t* WebPDecodeARGB(const uint8_t* data, size_t data_size,
                                    int* width, int* height);

// Same as WebPDecodeRGBA, but returning B, G, R, A, B, G, R, A... ordered data.
WEBP_EXTERN uint8_t* WebPDecodeBGRA(const uint8_t* data, size_t data_size,
                                    int* width, int* height);

// Same as WebPDecodeRGBA, but returning R, G, B, R, G, B... ordered data.
// If the bitstream contains transparency, it is ignored.
WEBP_EXTERN uint8_t* WebPDecodeRGB(const uint8_t* data, size_t data_size,
                                   int* width, int* height);

// Same as WebPDecodeRGB, but returning B, G, R, B, G, R... ordered data.
WEBP_EXTERN uint8_t* WebPDecodeBGR(const uint8_t* data, size_t data_size,
                                   int* width, int* height);


// Decode WebP images pointed to by 'data' to Y'UV format(*). The pointer
// returned is the Y samples buffer. Upon return, *u and *v will point to
// the U and V chroma data. These U and V buffers need NOT be passed to
// WebPFree(), unlike the returned Y luma one. The dimension of the U and V
// planes are both (*width + 1) / 2 and (*height + 1)/ 2.
// Upon return, the Y buffer has a stride returned as '*stride', while U and V
// have a common stride returned as '*uv_stride'.
// Return NULL in case of error.
// (*) Also named Y'CbCr. See: http://en.wikipedia.org/wiki/YCbCr
WEBP_EXTERN uint8_t* WebPDecodeYUV(const uint8_t* data, size_t data_size,
                                   int* width, int* height,
                                   uint8_t** u, uint8_t** v,
                                   int* stride, int* uv_stride);

// Releases memory returned by the WebPDecode*() functions above.
WEBP_EXTERN void WebPFree(void* ptr);

// These five functions are variants of the above ones, that decode the image
// directly into a pre-allocated buffer 'output_buffer'. The maximum storage
// available in this buffer is indicated by 'output_buffer_size'. If this
// storage is not sufficient (or an error occurred), NULL is returned.
// Otherwise, output_buffer is returned, for convenience.
// The parameter 'output_stride' specifies the distance (in bytes)
// between scanlines. Hence, output_buffer_size is expected to be at least
// output_stride x picture-height.
WEBP_EXTERN uint8_t* WebPDecodeRGBAInto(
    const uint8_t* data, size_t data_size,
    uint8_t* output_buffer, size_t output_buffer_size, int output_stride);
WEBP_EXTERN uint8_t* WebPDecodeARGBInto(
    const uint8_t* data, size_t data_size,
    uint8_t* output_buffer, size_t output_buffer_size, int output_stride);
WEBP_EXTERN uint8_t* WebPDecodeBGRAInto(
    const uint8_t* data, size_t data_size,
    uint8_t* output_buffer, size_t output_buffer_size, int output_stride);

// RGB and BGR variants. Here too the transparency information, if present,
// will be dropped and ignored.
WEBP_EXTERN uint8_t* WebPDecodeRGBInto(
    const uint8_t* data, size_t data_size,
    uint8_t* output_buffer, size_t output_buffer_size, int output_stride);
WEBP_EXTERN uint8_t* WebPDecodeBGRInto(
    const uint8_t* data, size_t data_size,
    uint8_t* output_buffer, size_t output_buffer_size, int output_stride);

// WebPDecodeYUVInto() is a variant of WebPDecodeYUV() that operates directly
// into pre-allocated luma/chroma plane buffers. This function requires the
// strides to be passed: one for the luma plane and one for each of the
// chroma ones. The size of each plane buffer is passed as 'luma_size',
// 'u_size' and 'v_size' respectively.
// Pointer to the luma plane ('*luma') is returned or NULL if an error occurred
// during decoding (or because some buffers were found to be too small).
WEBP_EXTERN uint8_t* WebPDecodeYUVInto(
    const uint8_t* data, size_t data_size,
    uint8_t* luma, size_t luma_size, int luma_stride,
    uint8_t* u, size_t u_size, int u_stride,
    uint8_t* v, size_t v_size, int v_stride);

//------------------------------------------------------------------------------
// Output colorspaces and buffer

// Colorspaces
// Note: the naming describes the byte-ordering of packed samples in memory.
// For instance, MODE_BGRA relates to samples ordered as B,G,R,A,B,G,R,A,...
// Non-capital names (e.g.:MODE_Argb) relates to pre-multiplied RGB channels.
// RGBA-4444 and RGB-565 colorspaces are represented by following byte-order:
// RGBA-4444: [r3 r2 r1 r0 g3 g2 g1 g0], [b3 b2 b1 b0 a3 a2 a1 a0], ...
// RGB-565: [r4 r3 r2 r1 r0 g5 g4 g3], [g2 g1 g0 b4 b3 b2 b1 b0], ...
// In the case WEBP_SWAP_16BITS_CSP is defined, the bytes are swapped for
// these two modes:
// RGBA-4444: [b3 b2 b1 b0 a3 a2 a1 a0], [r3 r2 r1 r0 g3 g2 g1 g0], ...
// RGB-565: [g2 g1 g0 b4 b3 b2 b1 b0], [r4 r3 r2 r1 r0 g5 g4 g3], ...

typedef enum WEBP_CSP_MODE {
  MODE_RGB = 0, MODE_RGBA = 1,
  MODE_BGR = 2, MODE_BGRA = 3,
  MODE_ARGB = 4, MODE_RGBA_4444 = 5,
  MODE_RGB_565 = 6,
  // RGB-premultiplied transparent modes (alpha value is preserved)
  MODE_rgbA = 7,
  MODE_bgrA = 8,
  MODE_Argb = 9,
  MODE_rgbA_4444 = 10,
  // YUV modes must come after RGB ones.
  MODE_YUV = 11, MODE_YUVA = 12,  // yuv 4:2:0
  MODE_LAST = 13
} WEBP_CSP_MODE;

// Some useful macros:
static WEBP_INLINE int WebPIsPremultipliedMode(WEBP_CSP_MODE mode) {
  return (mode == MODE_rgbA || mode == MODE_bgrA || mode == MODE_Argb ||
          mode == MODE_rgbA_4444);
}

static WEBP_INLINE int WebPIsAlphaMode(WEBP_CSP_MODE mode) {
  return (mode == MODE_RGBA || mode == MODE_BGRA || mode == MODE_ARGB ||
          mode == MODE_RGBA_4444 || mode == MODE_YUVA ||
          WebPIsPremultipliedMode(mode));
}

static WEBP_INLINE int WebPIsRGBMode(WEBP_CSP_MODE mode) {
  return (mode < MODE_YUV);
}

//------------------------------------------------------------------------------
// WebPDecBuffer: Generic structure for describing the output sample buffer.

struct WebPRGBABuffer {    // view as RGBA
  uint8_t* rgba;    // pointer to RGBA samples
  int stride;       // stride in bytes from one scanline to the next.
  size_t size;      // total size of the *rgba buffer.
};

struct WebPYUVABuffer {              // view as YUVA
  uint8_t* y, *u, *v, *a;     // pointer to luma, chroma U/V, alpha samples
  int y_stride;               // luma stride
  int u_stride, v_stride;     // chroma strides
  int a_stride;               // alpha stride
  size_t y_size;              // luma plane size
  size_t u_size, v_size;      // chroma planes size
  size_t a_size;              // alpha-plane size
};

// Output buffer
struct WebPDecBuffer {
  WEBP_CSP_MODE colorspace;  // Colorspace.
  int width, height;         // Dimensions.
  int is_external_memory;    // If non-zero, 'internal_memory' pointer is not
                             // used. If value is '2' or more, the external
                             // memory is considered 'slow' and multiple
                             // read/write will be avoided.
  union {
    WebPRGBABuffer RGBA;
    WebPYUVABuffer YUVA;
  } u;                       // Nameless union of buffer parameters.
  uint32_t       pad[4];     // padding for later use

  uint8_t* private_memory;   // Internally allocated memory (only when
                             // is_external_memory is 0). Should not be used
                             // externally, but accessed via the buffer union.
};

// Internal, version-checked, entry point
WEBP_EXTERN int WebPInitDecBufferInternal(WebPDecBuffer*, int);

// Initialize the structure as empty. Must be called before any other use.
// Returns false in case of version mismatch
static WEBP_INLINE int WebPInitDecBuffer(WebPDecBuffer* buffer) {
  return WebPInitDecBufferInternal(buffer, WEBP_DECODER_ABI_VERSION);
}

// Free any memory associated with the buffer. Must always be called last.
// Note: doesn't free the 'buffer' structure itself.
WEBP_EXTERN void WebPFreeDecBuffer(WebPDecBuffer* buffer);

//------------------------------------------------------------------------------
// Enumeration of the status codes

typedef enum VP8StatusCode {
  VP8_STATUS_OK = 0,
  VP8_STATUS_OUT_OF_MEMORY,
  VP8_STATUS_INVALID_PARAM,
  VP8_STATUS_BITSTREAM_ERROR,
  VP8_STATUS_UNSUPPORTED_FEATURE,
  VP8_STATUS_SUSPENDED,
  VP8_STATUS_USER_ABORT,
  VP8_STATUS_NOT_ENOUGH_DATA
} VP8StatusCode;

//------------------------------------------------------------------------------
// Incremental decoding
//
// This API allows streamlined decoding of partial data.
// Picture can be incrementally decoded as data become available thanks to the
// WebPIDecoder object. This object can be left in a SUSPENDED state if the
// picture is only partially decoded, pending additional input.
// Code example:
//
//   WebPInitDecBuffer(&output_buffer);
//   output_buffer.colorspace = mode;
//   ...
//   WebPIDecoder* idec = WebPINewDecoder(&output_buffer);
//   while (additional_data_is_available) {
//     // ... (get additional data in some new_data[] buffer)
//     status = WebPIAppend(idec, new_data, new_data_size);
//     if (status != VP8_STATUS_OK && status != VP8_STATUS_SUSPENDED) {
//       break;    // an error occurred.
//     }
//
//     // The above call decodes the current available buffer.
//     // Part of the image can now be refreshed by calling
//     // WebPIDecGetRGB()/WebPIDecGetYUVA() etc.
//   }
//   WebPIDelete(idec);

// Creates a new incremental decoder with the supplied buffer parameter.
// This output_buffer can be passed NULL, in which case a default output buffer
// is used (with MODE_RGB). Otherwise, an internal reference to 'output_buffer'
// is kept, which means that the lifespan of 'output_buffer' must be larger than
// that of the returned WebPIDecoder object.
// The supplied 'output_buffer' content MUST NOT be changed between calls to
// WebPIAppend() or WebPIUpdate() unless 'output_buffer.is_external_memory' is
// not set to 0. In such a case, it is allowed to modify the pointers, size and
// stride of output_buffer.u.RGBA or output_buffer.u.YUVA, provided they remain
// within valid bounds.
// All other fields of WebPDecBuffer MUST remain constant between calls.
// Returns NULL if the allocation failed.
WEBP_EXTERN WebPIDecoder* WebPINewDecoder(WebPDecBuffer* output_buffer);

// This function allocates and initializes an incremental-decoder object, which
// will output the RGB/A samples specified by 'csp' into a preallocated
// buffer 'output_buffer'. The size of this buffer is at least
// 'output_buffer_size' and the stride (distance in bytes between two scanlines)
// is specified by 'output_stride'.
// Additionally, output_buffer can be passed NULL in which case the output
// buffer will be allocated automatically when the decoding starts. The
// colorspace 'csp' is taken into account for allocating this buffer. All other
// parameters are ignored.
// Returns NULL if the allocation failed, or if some parameters are invalid.
WEBP_EXTERN WebPIDecoder* WebPINewRGB(
    WEBP_CSP_MODE csp,
    uint8_t* output_buffer, size_t output_buffer_size, int output_stride);

// This function allocates and initializes an incremental-decoder object, which
// will output the raw luma/chroma samples into a preallocated planes if
// supplied. The luma plane is specified by its pointer 'luma', its size
// 'luma_size' and its stride 'luma_stride'. Similarly, the chroma-u plane
// is specified by the 'u', 'u_size' and 'u_stride' parameters, and the chroma-v
// plane by 'v' and 'v_size'. And same for the alpha-plane. The 'a' pointer
// can be pass NULL in case one is not interested in the transparency plane.
// Conversely, 'luma' can be passed NULL if no preallocated planes are supplied.
// In this case, the output buffer will be automatically allocated (using
// MODE_YUVA) when decoding starts. All parameters are then ignored.
// Returns NULL if the allocation failed or if a parameter is invalid.
WEBP_EXTERN WebPIDecoder* WebPINewYUVA(
    uint8_t* luma, size_t luma_size, int luma_stride,
    uint8_t* u, size_t u_size, int u_stride,
    uint8_t* v, size_t v_size, int v_stride,
    uint8_t* a, size_t a_size, int a_stride);

// Deprecated version of the above, without the alpha plane.
// Kept for backward compatibility.
WEBP_EXTERN WebPIDecoder* WebPINewYUV(
    uint8_t* luma, size_t luma_size, int luma_stride,
    uint8_t* u, size_t u_size, int u_stride,
    uint8_t* v, size_t v_size, int v_stride);

// Deletes the WebPIDecoder object and associated memory. Must always be called
// if WebPINewDecoder, WebPINewRGB or WebPINewYUV succeeded.
WEBP_EXTERN void WebPIDelete(WebPIDecoder* idec);

// Copies and decodes the next available data. Returns VP8_STATUS_OK when
// the image is successfully decoded. Returns VP8_STATUS_SUSPENDED when more
// data is expected. Returns error in other cases.
WEBP_EXTERN VP8StatusCode WebPIAppend(
    WebPIDecoder* idec, const uint8_t* data, size_t data_size);

// A variant of the above function to be used when data buffer contains
// partial data from the beginning. In this case data buffer is not copied
// to the internal memory.
// Note that the value of the 'data' pointer can change between calls to
// WebPIUpdate, for instance when the data buffer is resized to fit larger data.
WEBP_EXTERN VP8StatusCode WebPIUpdate(
    WebPIDecoder* idec, const uint8_t* data, size_t data_size);

// Returns the RGB/A image decoded so far. Returns NULL if output params
// are not initialized yet. The RGB/A output type corresponds to the colorspace
// specified during call to WebPINewDecoder() or WebPINewRGB().
// *last_y is the index of last decoded row in raster scan order. Some pointers
// (*last_y, *width etc.) can be NULL if corresponding information is not
// needed. The values in these pointers are only valid on successful (non-NULL)
// return.
WEBP_EXTERN uint8_t* WebPIDecGetRGB(
    const WebPIDecoder* idec, int* last_y,
    int* width, int* height, int* stride);

// Same as above function to get a YUVA image. Returns pointer to the luma
// plane or NULL in case of error. If there is no alpha information
// the alpha pointer '*a' will be returned NULL.
WEBP_EXTERN uint8_t* WebPIDecGetYUVA(
    const WebPIDecoder* idec, int* last_y,
    uint8_t** u, uint8_t** v, uint8_t** a,
    int* width, int* height, int* stride, int* uv_stride, int* a_stride);

// Deprecated alpha-less version of WebPIDecGetYUVA(): it will ignore the
// alpha information (if present). Kept for backward compatibility.
static WEBP_INLINE uint8_t* WebPIDecGetYUV(
    const WebPIDecoder* idec, int* last_y, uint8_t** u, uint8_t** v,
    int* width, int* height, int* stride, int* uv_stride) {
  return WebPIDecGetYUVA(idec, last_y, u, v, NULL, width, height,
                         stride, uv_stride, NULL);
}

// Generic call to retrieve information about the displayable area.
// If non NULL, the left/right/width/height pointers are filled with the visible
// rectangular area so far.
// Returns NULL in case the incremental decoder object is in an invalid state.
// Otherwise returns the pointer to the internal representation. This structure
// is read-only, tied to WebPIDecoder's lifespan and should not be modified.
WEBP_EXTERN const WebPDecBuffer* WebPIDecodedArea(
    const WebPIDecoder* idec, int* left, int* top, int* width, int* height);

//------------------------------------------------------------------------------
// Advanced decoding parametrization
//
//  Code sample for using the advanced decoding API
/*
     // A) Init a configuration object
     WebPDecoderConfig config;
     CHECK(WebPInitDecoderConfig(&config));

     // B) optional: retrieve the bitstream's features.
     CHECK(WebPGetFeatures(data, data_size, &config.input) == VP8_STATUS_OK);

     // C) Adjust 'config', if needed
     config.no_fancy_upsampling = 1;
     config.output.colorspace = MODE_BGRA;
     // etc.

     // Note that you can also make config.output point to an externally
     // supplied memory buffer, provided it's big enough to store the decoded
     // picture. Otherwise, config.output will just be used to allocate memory
     // and store the decoded picture.

     // D) Decode!
     CHECK(WebPDecode(data, data_size, &config) == VP8_STATUS_OK);

     // E) Decoded image is now in config.output (and config.output.u.RGBA)

     // F) Reclaim memory allocated in config's object. It's safe to call
     // this function even if the memory is external and wasn't allocated
     // by WebPDecode().
     WebPFreeDecBuffer(&config.output);
*/

// Features gathered from the bitstream
struct WebPBitstreamFeatures {
  int width;          // Width in pixels, as read from the bitstream.
  int height;         // Height in pixels, as read from the bitstream.
  int has_alpha;      // True if the bitstream contains an alpha channel.
  int has_animation;  // True if the bitstream is an animation.
  int format;         // 0 = undefined (/mixed), 1 = lossy, 2 = lossless

  uint32_t pad[5];    // padding for later use
};

// Internal, version-checked, entry point
WEBP_EXTERN VP8StatusCode WebPGetFeaturesInternal(
    const uint8_t*, size_t, WebPBitstreamFeatures*, int);

// Retrieve features from the bitstream. The *features structure is filled
// with information gathered from the bitstream.
// Returns VP8_STATUS_OK when the features are successfully retrieved. Returns
// VP8_STATUS_NOT_ENOUGH_DATA when more data is needed to retrieve the
// features from headers. Returns error in other cases.
// Note: The following chunk sequences (before the raw VP8/VP8L data) are
// considered valid by this function:
// RIFF + VP8(L)
// RIFF + VP8X + (optional chunks) + VP8(L)
// ALPH + VP8 <-- Not a valid WebP format: only allowed for internal purpose.
// VP8(L)     <-- Not a valid WebP format: only allowed for internal purpose.
static WEBP_INLINE VP8StatusCode WebPGetFeatures(
    const uint8_t* data, size_t data_size,
    WebPBitstreamFeatures* features) {
  return WebPGetFeaturesInternal(data, data_size, features,
                                 WEBP_DECODER_ABI_VERSION);
}

// Decoding options
struct WebPDecoderOptions {
  int bypass_filtering;               // if true, skip the in-loop filtering
  int no_fancy_upsampling;            // if true, use faster pointwise upsampler
  int use_cropping;                   // if true, cropping is applied _first_
  int crop_left, crop_top;            // top-left position for cropping.
                                      // Will be snapped to even values.
  int crop_width, crop_height;        // dimension of the cropping area
  int use_scaling;                    // if true, scaling is applied _afterward_
  int scaled_width, scaled_height;    // final resolution
  int use_threads;                    // if true, use multi-threaded decoding
  int dithering_strength;             // dithering strength (0=Off, 100=full)
  int flip;                           // flip output vertically
  int alpha_dithering_strength;       // alpha dithering strength in [0..100]

  uint32_t pad[5];                    // padding for later use
};

// Main object storing the configuration for advanced decoding.
struct WebPDecoderConfig {
  WebPBitstreamFeatures input;  // Immutable bitstream features (optional)
  WebPDecBuffer output;         // Output buffer (can point to external mem)
  WebPDecoderOptions options;   // Decoding options
};

// Internal, version-checked, entry point
WEBP_EXTERN int WebPInitDecoderConfigInternal(WebPDecoderConfig*, int);

// Initialize the configuration as empty. This function must always be
// called first, unless WebPGetFeatures() is to be called.
// Returns false in case of mismatched version.
static WEBP_INLINE int WebPInitDecoderConfig(WebPDecoderConfig* config) {
  return WebPInitDecoderConfigInternal(config, WEBP_DECODER_ABI_VERSION);
}

// Instantiate a new incremental decoder object with the requested
// configuration. The bitstream can be passed using 'data' and 'data_size'
// parameter, in which case the features will be parsed and stored into
// config->input. Otherwise, 'data' can be NULL and no parsing will occur.
// Note that 'config' can be NULL too, in which case a default configuration
// is used. If 'config' is not NULL, it must outlive the WebPIDecoder object
// as some references to its fields will be used. No internal copy of 'config'
// is made.
// The return WebPIDecoder object must always be deleted calling WebPIDelete().
// Returns NULL in case of error (and config->status will then reflect
// the error condition, if available).
WEBP_EXTERN WebPIDecoder* WebPIDecode(const uint8_t* data, size_t data_size,
                                      WebPDecoderConfig* config);

// Non-incremental version. This version decodes the full data at once, taking
// 'config' into account. Returns decoding status (which should be VP8_STATUS_OK
// if the decoding was successful). Note that 'config' cannot be NULL.
WEBP_EXTERN VP8StatusCode WebPDecode(const uint8_t* data, size_t data_size,
                                     WebPDecoderConfig* config);

#ifdef __cplusplus
}    // extern "C"
#endif

#endif  // WEBP_WEBP_DECODE_H_
