
#ifndef _ORC_VARIABLE_H_
#define _ORC_VARIABLE_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>
#include <orc/orcexecutor.h>
#include <orc/orccode.h>
#include <orc/orcbytecode.h>
#include <orc/orccompiler.h>
#include <orc/orctarget.h>
#include <orc/orcrule.h>

ORC_BEGIN_DECLS

#define ORC_VAR_FLAG_VOLATILE_WORKAROUND (1<<0)

typedef struct _OrcVariable OrcVariable;

typedef enum {
  ORC_VAR_TYPE_TEMP,
  ORC_VAR_TYPE_SRC,
  ORC_VAR_TYPE_DEST,
  ORC_VAR_TYPE_CONST,
  ORC_VAR_TYPE_PARAM,
  ORC_VAR_TYPE_ACCUMULATOR
} OrcVarType;

enum {
  ORC_PARAM_TYPE_INT = 0,
  ORC_PARAM_TYPE_FLOAT,
  ORC_PARAM_TYPE_INT64,
  ORC_PARAM_TYPE_DOUBLE
};


/**
 * OrcVariable:
 *
 * The OrcVariable structure has no public members
 */
struct _OrcVariable {
  /*< private >*/
  char *name;
  char *type_name;

  int size;
  OrcVarType vartype;

  int used;
  int first_use;
  int last_use;
  int replaced;
  int replacement;

  int alloc;
  int is_chained;
  int is_aligned;
  int alignment;
  int is_uncached;

  orc_union64 value;

  int ptr_register;
  int ptr_offset;
  int mask_alloc;
  int aligned_data;
  int param_type;
  int load_dest;
  int update_type;
  int need_offset_reg;
  unsigned int flags;

  int has_parameter;
  int parameter;
};

ORC_END_DECLS

#endif

