
#ifndef _ORC_X86_H_
#define _ORC_X86_H_

#include <orc/orcprogram.h>
#include <orc/orcx86insn.h>

ORC_BEGIN_DECLS

#ifdef ORC_ENABLE_UNSTABLE_API

enum {
  X86_EAX = ORC_GP_REG_BASE,
  X86_ECX,
  X86_EDX,
  X86_EBX,
  X86_ESP,
  X86_EBP,
  X86_ESI,
  X86_EDI,
  X86_R8,
  X86_R9,
  X86_R10,
  X86_R11,
  X86_R12,
  X86_R13,
  X86_R14,
  X86_R15
};

enum {
  ORC_X86_UNKNOWN,
  ORC_X86_P6,
  ORC_X86_NETBURST,
  ORC_X86_CORE,
  ORC_X86_PENRYN,
  ORC_X86_NEHALEM,
  ORC_X86_BONNELL,
  ORC_X86_WESTMERE,
  ORC_X86_SANDY_BRIDGE,
  ORC_X86_K5,
  ORC_X86_K6,
  ORC_X86_K7,
  ORC_X86_K8,
  ORC_X86_K10
};

const char * orc_x86_get_regname(int i);
int orc_x86_get_regnum(int i);
const char * orc_x86_get_regname_8(int i);
const char * orc_x86_get_regname_16(int i);
const char * orc_x86_get_regname_64(int i);
const char * orc_x86_get_regname_ptr(OrcCompiler *compiler, int i);
const char * orc_x86_get_regname_size(int i, int size);

void orc_x86_emit_push (OrcCompiler *compiler, int size, int reg);
void orc_x86_emit_pop (OrcCompiler *compiler, int size, int reg);

#define orc_x86_emit_mov_imm_reg(p,size,value,reg) \
  orc_x86_emit_cpuinsn_imm_reg (p, ORC_X86_mov_imm32_r, size, value, reg)
#define orc_x86_emit_mov_reg_reg(p,size,src,dest) \
  orc_x86_emit_cpuinsn_size (p, ORC_X86_mov_r_rm, size, src, dest)
#define orc_x86_emit_test_reg_reg(p,size,src,dest) \
  orc_x86_emit_cpuinsn_size (p, ORC_X86_test, size, src, dest)
#define orc_x86_emit_sar_imm_reg(p,size,value,reg) do { \
    if (value == 1) { \
      orc_x86_emit_cpuinsn_imm_reg (p, ORC_X86_sar, size, value, reg); \
    } else if (value > 1) { \
      orc_x86_emit_cpuinsn_imm_reg (p, ORC_X86_sar_imm, size, value, reg); \
    } \
  } while (0)
#define orc_x86_emit_and_imm_memoffset(p,size,value,offset,reg) \
  orc_x86_emit_cpuinsn_imm_memoffset (p, (value >= -128 && value < 128) ? \
      ORC_X86_and_imm8_rm : ORC_X86_and_imm32_rm, size, value, offset, reg)
#define orc_x86_emit_and_imm_reg(p,size,value,reg) do { \
  if ((value) >= -128 && (value) < 128) { \
    orc_x86_emit_cpuinsn_imm_reg (p, ORC_X86_and_imm8_rm, size, value, reg); \
  } else { \
    if ((reg) == X86_EAX) { \
      orc_x86_emit_cpuinsn_imm_reg (p, ORC_X86_and_imm32_a, size, value, reg); \
    } else { \
      orc_x86_emit_cpuinsn_imm_reg (p, ORC_X86_and_imm32_rm, size, value, reg); \
    } \
  } \
} while (0)
#define orc_x86_emit_add_imm_memoffset(p,size,value,offset,reg) \
  orc_x86_emit_cpuinsn_imm_memoffset (p, (value >= -128 && value < 128) ? \
      ORC_X86_add_imm8_rm : ORC_X86_add_imm32_rm, size, value, offset, reg)
#define orc_x86_emit_add_reg_memoffset(p,size,src,offset,dest) \
  orc_x86_emit_cpuinsn_reg_memoffset_s(p, ORC_X86_add_r_rm, size, src, offset, dest)
#define orc_x86_emit_add_reg_reg(p,size,src,dest) \
  orc_x86_emit_cpuinsn_size(p, ORC_X86_add_r_rm, size, src, dest)
#define orc_x86_emit_add_memoffset_reg(p,size,offset,src,dest) \
  orc_x86_emit_cpuinsn_memoffset_reg(p, ORC_X86_add_rm_r, size, offset, src, dest)
#define orc_x86_emit_sub_reg_reg(p,size,src,dest) \
  orc_x86_emit_cpuinsn_size(p, ORC_X86_sub_r_rm, size, src, dest)
#define orc_x86_emit_sub_memoffset_reg(p,size,offset,src,dest) \
  orc_x86_emit_cpuinsn_memoffset_reg(p, ORC_X86_sub_rm_r, size, offset, src, dest)
#define orc_x86_emit_imul_memoffset_reg(p,size,offset,src,dest) \
  orc_x86_emit_cpuinsn_memoffset_reg(p, ORC_X86_imul_rm_r, size, offset, src, dest)

#define orc_x86_emit_cmp_reg_memoffset(p,size,src,offset,dest) \
  orc_x86_emit_cpuinsn_reg_memoffset_s(p, ORC_X86_cmp_r_rm, size, src, offset, dest)

#define orc_x86_emit_jmp(p,label) \
  orc_x86_emit_cpuinsn_branch (p, ORC_X86_jmp, label)
#define orc_x86_emit_jg(p,label) \
  orc_x86_emit_cpuinsn_branch (p, ORC_X86_jg, label)
#define orc_x86_emit_jle(p,label) \
  orc_x86_emit_cpuinsn_branch (p, ORC_X86_jle, label)
#define orc_x86_emit_je(p,label) \
  orc_x86_emit_cpuinsn_branch (p, ORC_X86_jz, label)
#define orc_x86_emit_jne(p,label) \
  orc_x86_emit_cpuinsn_branch (p, ORC_X86_jnz, label)

#define orc_x86_emit_align(p,align_shift) \
  orc_x86_emit_cpuinsn_align (p, ORC_X86_ALIGN, align_shift)
#define orc_x86_emit_label(p,label) \
  orc_x86_emit_cpuinsn_label (p, ORC_X86_LABEL, label)

#define orc_x86_emit_emms(p) \
  orc_x86_emit_cpuinsn_none (p, ORC_X86_emms)
#define orc_x86_emit_rdtsc(p) \
  orc_x86_emit_cpuinsn_none (p, ORC_X86_rdtsc)
#define orc_x86_emit_ret(p) \
  orc_x86_emit_cpuinsn_none (p, ((p)->is_64bit) ? ORC_X86_retq : ORC_X86_ret)

#define orc_x86_emit_test_imm_memoffset(p,size,value,offset,dest) \
  orc_x86_emit_cpuinsn_imm_memoffset (p, ORC_X86_test_imm, size, value, \
      offset, dest)

void orc_x86_emit_mov_memoffset_reg (OrcCompiler *compiler, int size, int offset, int reg1, int reg2);
void orc_x86_emit_mov_reg_memoffset (OrcCompiler *compiler, int size, int reg1, int offset, int reg2);
void orc_x86_emit_dec_memoffset (OrcCompiler *compiler, int size, int offset, int reg);
void orc_x86_emit_add_imm_reg (OrcCompiler *compiler, int size, int value, int reg, orc_bool record);
void orc_x86_emit_add_reg_reg_shift (OrcCompiler *compiler, int size, int reg1, int reg2, int shift);
void orc_x86_emit_cmp_imm_memoffset (OrcCompiler *compiler, int size, int value,
    int offset, int reg);
void orc_x86_emit_cmp_imm_reg (OrcCompiler *compiler, int size, int value, int reg);
void orc_x86_emit_rep_movs (OrcCompiler *compiler, int size);
void orc_x86_emit_prologue (OrcCompiler *compiler);
void orc_x86_emit_epilogue (OrcCompiler *compiler);

void orc_x86_emit_rex (OrcCompiler *compiler, int size, int reg1, int reg2, int reg3);
void orc_x86_emit_modrm_memoffset_old (OrcCompiler *compiler, int reg1, int offset, int reg2);
void orc_x86_emit_modrm_memoffset (OrcCompiler *compiler, int offset, int reg1, int reg2);
void orc_x86_emit_modrm_reg (OrcCompiler *compiler, int reg1, int reg2);
void orc_x86_emit_modrm_memindex (OrcCompiler *compiler, int reg1, int offset,
    int reg2, int regindex, int shift);
void orc_x86_emit_modrm_memindex2 (OrcCompiler *compiler, int offset,
    int src, int src_index, int shift, int dest);

void x86_add_fixup (OrcCompiler *compiler, unsigned char *ptr, int label, int type);
void x86_add_label (OrcCompiler *compiler, unsigned char *ptr, int label);
void x86_add_label2 (OrcCompiler *compiler, int index, int label);
void orc_x86_do_fixups (OrcCompiler *compiler);

int orc_x86_assemble_copy_check (OrcCompiler *compiler);
void orc_x86_assemble_copy (OrcCompiler *compiler);

void orc_x86_emit_cpuinsn_size (OrcCompiler *p, int opcode, int size,
    int src, int dest);
void orc_x86_emit_cpuinsn_imm (OrcCompiler *p, int opcode, int imm,
    int src, int dest);
void orc_x86_emit_cpuinsn_load_memoffset (OrcCompiler *p, int size, int index,
    int offset, int src, int dest, int imm);
void orc_x86_emit_cpuinsn_store_memoffset (OrcCompiler *p, int size, int index,
    int src, int offset, int dest, int imm);
void orc_x86_emit_cpuinsn_load_memindex (OrcCompiler *p, int index, int size,
    int imm, int offset, int src, int src_index, int shift, int dest);
void orc_x86_emit_cpuinsn_load_register (OrcCompiler *p, int index, int imm,
    int src, int dest);
void orc_x86_emit_cpuinsn_imm_reg (OrcCompiler *p, int index, int size, int imm,
    int dest);
void orc_x86_emit_cpuinsn_imm_memoffset (OrcCompiler *p, int index, int size,
    int imm, int offset, int dest);
void orc_x86_emit_cpuinsn_reg_memoffset (OrcCompiler *p, int index, int src,
    int offset, int dest);
void orc_x86_emit_cpuinsn_reg_memoffset_8 (OrcCompiler *p, int index, int src,
    int offset, int dest);
void orc_x86_emit_cpuinsn_reg_memoffset_s (OrcCompiler *p, int index, int size,
    int src, int offset, int dest);
void orc_x86_emit_cpuinsn_memoffset_reg (OrcCompiler *p, int index, int size,
    int offset, int src, int dest);
void orc_x86_emit_cpuinsn_memoffset (OrcCompiler *p, int index, int size,
    int offset, int srcdest);
void orc_x86_emit_cpuinsn_branch (OrcCompiler *p, int index, int label);
void orc_x86_emit_cpuinsn_label (OrcCompiler *p, int index, int label);
void orc_x86_emit_cpuinsn_none (OrcCompiler *p, int index);
void orc_x86_emit_cpuinsn_align (OrcCompiler *p, int index, int align_shift);

#endif

ORC_END_DECLS


#endif

