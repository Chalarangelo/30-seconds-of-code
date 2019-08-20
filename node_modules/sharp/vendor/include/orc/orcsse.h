
#ifndef _ORC_SSE_H_
#define _ORC_SSE_H_

#include <orc/orcx86.h>
#include <orc/orcx86insn.h>

ORC_BEGIN_DECLS

#ifdef ORC_ENABLE_UNSTABLE_API

typedef enum {
  X86_XMM0 = ORC_VEC_REG_BASE + 16,
  X86_XMM1,
  X86_XMM2,
  X86_XMM3,
  X86_XMM4,
  X86_XMM5,
  X86_XMM6,
  X86_XMM7,
  X86_XMM8,
  X86_XMM9,
  X86_XMM10,
  X86_XMM11,
  X86_XMM12,
  X86_XMM13,
  X86_XMM14,
  X86_XMM15
}OrcSSERegister;

#define ORC_SSE_SHUF(a,b,c,d) ((((a)&3)<<6)|(((b)&3)<<4)|(((c)&3)<<2)|(((d)&3)<<0))

const char * orc_x86_get_regname_sse(int i);
void orc_x86_emit_mov_memoffset_sse (OrcCompiler *compiler, int size, int offset,
    int reg1, int reg2, int is_aligned);
void orc_x86_emit_mov_memindex_sse (OrcCompiler *compiler, int size, int offset,
    int reg1, int regindex, int shift, int reg2, int is_aligned);
void orc_x86_emit_mov_sse_memoffset (OrcCompiler *compiler, int size, int reg1, int offset,
    int reg2, int aligned, int uncached);

void orc_sse_set_mxcsr (OrcCompiler *compiler);
void orc_sse_restore_mxcsr (OrcCompiler *compiler);

void orc_sse_load_constant (OrcCompiler *compiler, int reg, int size,
    orc_uint64 value);

#endif

unsigned int orc_sse_get_cpu_flags (void);

ORC_END_DECLS

#endif

