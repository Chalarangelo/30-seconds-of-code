
#ifndef _ORC_POWERPC_H_
#define _ORC_POWERPC_H_

#include <orc/orcprogram.h>

ORC_BEGIN_DECLS

typedef enum {
  ORC_TARGET_POWERPC_64BIT = (1<<0)
} OrcTargetPowerPCFlags;

#ifdef ORC_ENABLE_UNSTABLE_API

enum {
  POWERPC_R0 = ORC_GP_REG_BASE,
  POWERPC_R1,
  POWERPC_R2,
  POWERPC_R3,
  POWERPC_R4,
  POWERPC_R5,
  POWERPC_R6,
  POWERPC_R7,
  POWERPC_R8,
  POWERPC_R9,
  POWERPC_R10,
  POWERPC_R11,
  POWERPC_R12,
  POWERPC_R13,
  POWERPC_R14,
  POWERPC_R15,
  POWERPC_R16,
  POWERPC_R17,
  POWERPC_R18,
  POWERPC_R19,
  POWERPC_R20,
  POWERPC_R21,
  POWERPC_R22,
  POWERPC_R23,
  POWERPC_R24,
  POWERPC_R25,
  POWERPC_R26,
  POWERPC_R27,
  POWERPC_R28,
  POWERPC_R29,
  POWERPC_R30,
  POWERPC_R31,
  POWERPC_V0 = ORC_VEC_REG_BASE,
  POWERPC_V1,
  POWERPC_V2,
  POWERPC_V3,
  POWERPC_V4,
  POWERPC_V5,
  POWERPC_V6,
  POWERPC_V7,
  POWERPC_V8,
  POWERPC_V9,
  POWERPC_V10,
  POWERPC_V11,
  POWERPC_V12,
  POWERPC_V13,
  POWERPC_V14,
  POWERPC_V15,
  POWERPC_V16,
  POWERPC_V17,
  POWERPC_V18,
  POWERPC_V19,
  POWERPC_V20,
  POWERPC_V21,
  POWERPC_V22,
  POWERPC_V23,
  POWERPC_V24,
  POWERPC_V25,
  POWERPC_V26,
  POWERPC_V27,
  POWERPC_V28,
  POWERPC_V29,
  POWERPC_V30,
  POWERPC_V31
};

const char * powerpc_get_regname(int i);
int powerpc_regnum (int i);

void powerpc_emit(OrcCompiler *compiler, unsigned int insn);

void powerpc_emit_add (OrcCompiler *compiler, int regd, int rega, int regb);
void powerpc_emit_addi_rec (OrcCompiler *compiler, int regd, int rega, int imm);
void powerpc_emit_addi (OrcCompiler *compiler, int regd, int rega, int imm);
void powerpc_emit_lwz (OrcCompiler *compiler, int regd, int rega, int imm);
void powerpc_emit_stw (OrcCompiler *compiler, int regs, int rega, int offset);
void powerpc_emit_stwu (OrcCompiler *compiler, int regs, int rega, int offset);
void powerpc_emit_ld (OrcCompiler *compiler, int regd, int rega, int imm);
void powerpc_emit_std (OrcCompiler *compiler, int regs, int rega, int offset);
void powerpc_emit_stdu (OrcCompiler *compiler, int regs, int rega, int offset);

void powerpc_emit_ret (OrcCompiler *compiler);
void powerpc_emit_b (OrcCompiler *compiler, int label);
void powerpc_emit_beq (OrcCompiler *compiler, int label);
void powerpc_emit_bne (OrcCompiler *compiler, int label);
void powerpc_emit_label (OrcCompiler *compiler, int label);
void powerpc_add_fixup (OrcCompiler *compiler, int type, unsigned char *ptr, int label);
void powerpc_do_fixups (OrcCompiler *compiler);
void orc_powerpc_flush_cache (OrcCode *code);

void powerpc_emit_srawi (OrcCompiler *compiler, int regd, int rega, int shift,
    int record);
void powerpc_emit_655510 (OrcCompiler *compiler, int major, int d, int a,
    int b, int minor);
void powerpc_emit_D (OrcCompiler *compiler, const char *name,
    unsigned int insn, int regd, int rega, int imm);
void powerpc_emit_X (OrcCompiler *compiler, unsigned int insn, int d, int a,
    int b);
void powerpc_emit_VA (OrcCompiler *compiler, const char *name, unsigned int insn, int d, int a, int b,
    int c);
void powerpc_emit_VA_acb (OrcCompiler *compiler, const char *name, unsigned int insn, int d, int a, int b,
    int c);
void powerpc_emit_VX (OrcCompiler *compiler, unsigned int insn, int d, int a,
    int b);
void powerpc_emit_VX_b (OrcCompiler *p, const char *name, unsigned int insn, int a);
void powerpc_emit_VX_db (OrcCompiler *p, const char *name, unsigned int insn, int d, int b);
void powerpc_emit_VX_dbi (OrcCompiler *p, const char *name, unsigned int insn, int d, int b, int imm);
void powerpc_emit_VXR (OrcCompiler *compiler, const char *name,
    unsigned int insn, int d, int a, int b, int record);
void powerpc_emit_VX_2 (OrcCompiler *p, const char *name, unsigned int insn,
    int d, int a, int b);
void powerpc_emit_VX_3 (OrcCompiler *p, const char *name, unsigned int insn,
    int d, int a, int b, int c);
void powerpc_emit_VX_3_reg (OrcCompiler *p, const char *name, unsigned int insn,
    int d, int a, int b, int c);
void powerpc_emit_VX_4 (OrcCompiler *p, const char *name, unsigned int insn,
    int d, int a);
int powerpc_get_constant (OrcCompiler *p, int type, int value);
int powerpc_get_constant_full (OrcCompiler *p, int value0, int value1, int value2, int value3);
void powerpc_load_long_constant (OrcCompiler *p, int reg, orc_uint32 a,
    orc_uint32 b, orc_uint32 c, orc_uint32 d);

/* instructions */
#define powerpc_emit_vand(p,a,b,c)         powerpc_emit_VX_2 (p, "vand", 0x10000404, a, b, c)
#define powerpc_emit_vandc(p,a,b,c)        powerpc_emit_VX_2 (p, "vandc", 0x10000444, a, b, c)

#define powerpc_emit_vor(p,a,b,c)          powerpc_emit_VX_2 (p, "vor", 0x10000484, a, b, c)
#define powerpc_emit_vxor(p,a,b,c)         powerpc_emit_VX_2 (p, "vxor", 0x100004c4, a, b, c)

#define powerpc_emit_vmulesb(p,a,b,c)      powerpc_emit_VX_2 (p, "vmulesb", 0x10000308, a, b, c)
#define powerpc_emit_vmuleub(p,a,b,c)      powerpc_emit_VX_2 (p, "vmuleub", 0x10000208, a, b, c)
#define powerpc_emit_vmulesh(p,a,b,c)      powerpc_emit_VX_2 (p, "vmulesh", 0x10000348, a, b, c)
#define powerpc_emit_vmuleuh(p,a,b,c)      powerpc_emit_VX_2 (p, "vmuleuh", 0x10000248, a, b, c)

#define powerpc_emit_vmrghb(p,a,b,c)       powerpc_emit_VX_2 (p, "vmrghb", 0x1000000c, a, b, c)
#define powerpc_emit_vmrghh(p,a,b,c)       powerpc_emit_VX_2 (p, "vmrghh", 0x1000004c, a, b, c)

#define powerpc_emit_vpkshss(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkshss", 0x1000018e, a, b, c)
#define powerpc_emit_vpkshus(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkshus", 0x1000010e, a, b, c)
#define powerpc_emit_vpkswss(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkswss", 0x100001ce, a, b, c)
#define powerpc_emit_vpkswus(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkswus", 0x1000014e, a, b, c)
#define powerpc_emit_vpkuhus(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkuhus", 0x1000008e, a, b, c)
#define powerpc_emit_vpkuhum(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkuhum", 0x1000000e, a, b, c)
#define powerpc_emit_vpkuwus(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkuwus", 0x100000ce, a, b, c)
#define powerpc_emit_vpkuwum(p,a,b,c)      powerpc_emit_VX_2 (p, "vpkuwum", 0x1000004e, a, b, c)

#define powerpc_emit_vadduhm(p,a,b,c)      powerpc_emit_VX_2 (p, "vadduhm", 0x10000040, a, b, c)
#define powerpc_emit_vadduwm(p,a,b,c)      powerpc_emit_VX_2 (p, "vadduwm", 0x10000080, a, b, c)
#define powerpc_emit_vsububm(p,a,b,c)      powerpc_emit_VX_2 (p, "vsububm", 0x10000400, a, b, c)
#define powerpc_emit_vsum4ubs(p,a,b,c)     powerpc_emit_VX_2 (p, "vsum4ubs", 0x10000608, a, b, c)

#define powerpc_emit_vmaxub(p,a,b,c)       powerpc_emit_VX_2 (p, "vmaxub", 0x10000002, a, b, c)
#define powerpc_emit_vmaxsb(p,a,b,c)       powerpc_emit_VX_2 (p, "vmaxsb", 0x10000102, a, b, c)
#define powerpc_emit_vmaxsh(p,a,b,c)       powerpc_emit_VX_2 (p, "vmaxsh", 0x10000142, a, b, c)
#define powerpc_emit_vmaxsw(p,a,b,c)       powerpc_emit_VX_2 (p, "vmaxsw", 0x10000182, a, b, c)

#define powerpc_emit_vminub(p,a,b,c)       powerpc_emit_VX_2 (p, "vminub", 0x10000202, a, b, c)
#define powerpc_emit_vminsb(p,a,b,c)       powerpc_emit_VX_2 (p, "vminsb", 0x10000302, a, b, c)
#define powerpc_emit_vminsh(p,a,b,c)       powerpc_emit_VX_2 (p, "vminsh", 0x10000342, a, b, c)
#define powerpc_emit_vminsw(p,a,b,c)       powerpc_emit_VX_2 (p, "vminsw", 0x10000382, a, b, c)

#define powerpc_emit_vsldoi(p,a,b,c,d)     powerpc_emit_VX_3 (p, "vsldoi", 0x1000002c | (d<<6), a, b, c, d)
#define powerpc_emit_vmladduhm(p,a,b,c,d)  powerpc_emit_VA (p, "vmladduhm", 0x10000022, a, b, c, d)

#define powerpc_emit_vupkhsb(p,a,b)        powerpc_emit_VX_4 (p, "vupkhsb", 0x1000020e, a, b)
#define powerpc_emit_vupkhsh(p,a,b)        powerpc_emit_VX_4 (p, "vupkhsh", 0x1000024e, a, b)

#define powerpc_emit_vperm(p,a,b,c,d)      powerpc_emit_VA (p, "vperm", 0x1000002b, a, b, c, d)

#endif

ORC_END_DECLS

#endif

