
#ifndef _ORC_INSTRUCTION_H_
#define _ORC_INSTRUCTION_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>
#include <orc/orcopcode.h>
#include <orc/orcrule.h>

ORC_BEGIN_DECLS

/**
 * OrcInstruction:
 *
 * The OrcInstruction structure has no public members
 */
struct _OrcInstruction {
  /*< private >*/
  OrcStaticOpcode *opcode;
  int dest_args[ORC_STATIC_OPCODE_N_DEST];
  int src_args[ORC_STATIC_OPCODE_N_SRC];

  OrcRule *rule;
  unsigned int flags;
  /* Source line number this instruction came from */
  int line;
};

#define ORC_INSTRUCTION_FLAG_X2 (1<<0)
#define ORC_INSTRUCTION_FLAG_X4 (1<<1)

#define ORC_INSN_FLAG_INVARIANT (1<<2)
#define ORC_INSN_FLAG_ADDED (1<<3)


ORC_END_DECLS

#endif

