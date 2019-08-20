
#ifndef _ORC_CONSTANT_H_
#define _ORC_CONSTANT_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>

ORC_BEGIN_DECLS


enum {
  ORC_CONST_ZERO,
  ORC_CONST_SPLAT_B,
  ORC_CONST_SPLAT_W,
  ORC_CONST_SPLAT_L,
  ORC_CONST_FULL
};

/**
 * OrcConstant:
 *
 * The OrcConstant structure has no public members
 */
struct _OrcConstant {
  /*< private >*/
  int type;
  int alloc_reg;
  unsigned int value;
  unsigned int full_value[4];
  int use_count;
  int is_long;
};


ORC_END_DECLS

#endif

