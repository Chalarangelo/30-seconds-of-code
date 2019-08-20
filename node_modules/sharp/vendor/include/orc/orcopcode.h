
#ifndef _ORC_OPCODE_H_
#define _ORC_OPCODE_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>

ORC_BEGIN_DECLS

typedef struct _OrcOpcodeSet OrcOpcodeSet;
typedef struct _OrcStaticOpcode OrcStaticOpcode;


/**
 * OrcOpcodeSet:
 *
 * The OrcOpcodeSet structure has no public members
 */
struct _OrcOpcodeSet {
  /*< private >*/
  int opcode_major;
  char prefix[8];

  int n_opcodes;
  OrcStaticOpcode *opcodes;
};

#define ORC_STATIC_OPCODE_ACCUMULATOR (1<<0)
#define ORC_STATIC_OPCODE_FLOAT_SRC (1<<1)
#define ORC_STATIC_OPCODE_FLOAT_DEST (1<<2)
#define ORC_STATIC_OPCODE_FLOAT (ORC_STATIC_OPCODE_FLOAT_SRC|ORC_STATIC_OPCODE_FLOAT_DEST)
#define ORC_STATIC_OPCODE_SCALAR (1<<3)
#define ORC_STATIC_OPCODE_LOAD (1<<4)
#define ORC_STATIC_OPCODE_STORE (1<<5)
#define ORC_STATIC_OPCODE_INVARIANT (1<<6)
#define ORC_STATIC_OPCODE_ITERATOR (1<<7)
#define ORC_STATIC_OPCODE_COPY (1<<8)


struct _OrcStaticOpcode {
  char name[16];
  unsigned int flags;
  int dest_size[ORC_STATIC_OPCODE_N_DEST];
  int src_size[ORC_STATIC_OPCODE_N_SRC];
  OrcOpcodeEmulateNFunc emulateN;
};

OrcStaticOpcode * orc_opcode_find_by_name (const char *name);
void orc_opcode_init (void);
OrcOpcodeSet *orc_opcode_set_get (const char *name);
OrcOpcodeSet *orc_opcode_set_get_nth (int opcode_major);
int orc_opcode_set_find_by_name (OrcOpcodeSet *opcode_set, const char *name);
int orc_opcode_register_static (OrcStaticOpcode *sopcode, char *prefix);

ORC_END_DECLS

#endif

