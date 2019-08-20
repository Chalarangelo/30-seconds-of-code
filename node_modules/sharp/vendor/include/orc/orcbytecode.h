
#ifndef _ORC_BYTECODE_H_
#define _ORC_BYTECODE_H_

#include <orc/orcutils.h>
#include <orc/orcbytecodes.h>

ORC_BEGIN_DECLS

typedef struct _OrcBytecode OrcBytecode;

struct _OrcBytecode {
  /*< private >*/
  orc_uint8 *bytecode;
  int length;
  int alloc_len;
};


#ifdef ORC_ENABLE_UNSTABLE_API

OrcBytecode * orc_bytecode_new (void);
void orc_bytecode_free (OrcBytecode *bytecode);
OrcBytecode * orc_bytecode_from_program (OrcProgram *p);
int orc_bytecode_parse_function (OrcProgram *program, const orc_uint8 *bytecode);

#endif

ORC_END_DECLS

#endif

