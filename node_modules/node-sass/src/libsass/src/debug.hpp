#ifndef SASS_DEBUG_H
#define SASS_DEBUG_H

#include <stdint.h>

#ifndef UINT32_MAX
  #define UINT32_MAX 0xffffffffU
#endif

enum dbg_lvl_t : uint32_t {
  NONE = 0,
  TRIM = 1,
  CHUNKS = 2,
  SUBWEAVE = 4,
  WEAVE = 8,
  EXTEND_COMPOUND = 16,
  EXTEND_COMPLEX = 32,
  LCS = 64,
  EXTEND_OBJECT = 128,
  ALL = UINT32_MAX
};

#ifdef DEBUG

#ifndef DEBUG_LVL
const uint32_t debug_lvl = UINT32_MAX;
#else
const uint32_t debug_lvl = (DEBUG_LVL);
#endif // DEBUG_LVL

#define DEBUG_PRINT(lvl, x) if((lvl) & debug_lvl) { std::cerr << x; }
#define DEBUG_PRINTLN(lvl, x) if((lvl) & debug_lvl) { std::cerr << x << std::endl; }
#define DEBUG_EXEC(lvl, x) if((lvl) & debug_lvl) { x; }

#else // DEBUG

#define DEBUG_PRINT(lvl, x)
#define DEBUG_PRINTLN(lvl, x)
#define DEBUG_EXEC(lvl, x)

#endif // DEBUG

#endif // SASS_DEBUG
