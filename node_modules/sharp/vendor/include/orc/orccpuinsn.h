
#ifndef _ORC_ORC_CPUINSN_H_
#define _ORC_ORC_CPUINSN_H_

#ifdef ORC_ENABLE_UNSTABLE_API

typedef struct _OrcSysInsn OrcSysInsn;
typedef struct _OrcSysOpcode OrcSysOpcode;

struct _OrcSysInsn {
  int opcode;
  int dest_reg;
  int src1_reg;
  int src2_reg;

  int immediate;

  int mem_reg;
  int memoffset;
  int indexreg;
  int shift;
  int size;
};

struct _OrcSysOpcode {
  char name[16];
  int type;
  int flags;
  orc_uint8 prefix;
  orc_uint32 code;
  int code2;
};


#define ORC_SYS_OPCODE_FLAG_FIXED (1<<0)

#endif

#endif

