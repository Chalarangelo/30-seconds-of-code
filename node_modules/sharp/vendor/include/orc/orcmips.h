/*
  Copyright 2002 - 2009 David A. Schleef <ds@schleef.org>
  Copyright 2012 MIPS Technologies, Inc.

  Author: Guillaume Emont <guijemont@igalia.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:
  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.
  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in the
     documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
  STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
  IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
  POSSIBILITY OF SUCH DAMAGE.

*/

#ifndef _ORC_MIPS_H_
#define _ORC_MIPS_H_

#include <orc/orcutils.h>
#include <orc/orcprogram.h>

ORC_BEGIN_DECLS

#ifdef ORC_ENABLE_UNSTABLE_API

typedef enum {
  ORC_TARGET_MIPS_FRAME_POINTER = (1<<0),
} OrcTargetMipsFlags;

typedef enum {
  ORC_MIPS_ZERO = ORC_GP_REG_BASE+0,
  ORC_MIPS_AT,
  ORC_MIPS_V0,
  ORC_MIPS_V1,
  ORC_MIPS_A0,
  ORC_MIPS_A1,
  ORC_MIPS_A2,
  ORC_MIPS_A3,
  ORC_MIPS_T0,
  ORC_MIPS_T1,
  ORC_MIPS_T2,
  ORC_MIPS_T3,
  ORC_MIPS_T4,
  ORC_MIPS_T5,
  ORC_MIPS_T6,
  ORC_MIPS_T7,
  ORC_MIPS_S0,
  ORC_MIPS_S1,
  ORC_MIPS_S2,
  ORC_MIPS_S3,
  ORC_MIPS_S4,
  ORC_MIPS_S5,
  ORC_MIPS_S6,
  ORC_MIPS_S7,
  ORC_MIPS_T8,
  ORC_MIPS_T9,
  ORC_MIPS_K0,
  ORC_MIPS_K1,
  ORC_MIPS_GP,
  ORC_MIPS_SP,
  ORC_MIPS_FP,
  ORC_MIPS_RA
} OrcMipsRegister;

void orc_mips_emit_label (OrcCompiler *compiler, unsigned int label);

void orc_mips_emit_nop (OrcCompiler *compiler);

void orc_mips_emit_sw (OrcCompiler *compiler, OrcMipsRegister reg,
                       OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_swr (OrcCompiler *compiler, OrcMipsRegister reg,
                        OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_swl (OrcCompiler *compiler, OrcMipsRegister reg,
                        OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_sh (OrcCompiler *compiler, OrcMipsRegister reg,
                       OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_sb (OrcCompiler *compiler, OrcMipsRegister reg,
                       OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_lw (OrcCompiler *compiler, OrcMipsRegister dest,
                       OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_lwr (OrcCompiler *compiler, OrcMipsRegister dest,
                        OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_lwl (OrcCompiler *compiler, OrcMipsRegister dest,
                        OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_lh (OrcCompiler *compiler, OrcMipsRegister dest,
                       OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_lb (OrcCompiler *compiler, OrcMipsRegister dest,
                       OrcMipsRegister base, unsigned int offset);
void orc_mips_emit_lbu (OrcCompiler *compiler, OrcMipsRegister dest,
                       OrcMipsRegister base, unsigned int offset);

void orc_mips_emit_jr (OrcCompiler *compiler, OrcMipsRegister address_reg);
void orc_mips_emit_conditional_branch (OrcCompiler *compiler, int condition,
                                       OrcMipsRegister rs, OrcMipsRegister rt,
                                       unsigned int label);
void orc_mips_emit_conditional_branch_with_offset (OrcCompiler *compiler,
                                                   int condition,
                                                   OrcMipsRegister rs,
                                                   OrcMipsRegister rt,
                                                   int offset);

enum {
  ORC_MIPS_BEQ = 04,
  ORC_MIPS_BNE,
  ORC_MIPS_BLEZ,
  ORC_MIPS_BGTZ,

  /* instructions are encoded differently from here on*/
  ORC_MIPS_BLTZ,
  ORC_MIPS_BGEZ,
};

#define orc_mips_emit_beqz(compiler, reg, label) \
    orc_mips_emit_conditional_branch(compiler, ORC_MIPS_BEQ, reg, ORC_MIPS_ZERO, label)
#define orc_mips_emit_bnez(compiler, reg, label) \
    orc_mips_emit_conditional_branch(compiler, ORC_MIPS_BNE, reg, ORC_MIPS_ZERO, label)
#define orc_mips_emit_blez(compiler, reg, label) \
    orc_mips_emit_conditional_branch(compiler, ORC_MIPS_BLEZ, reg, ORC_MIPS_ZERO, label)
#define orc_mips_emit_beq(compiler, reg1, reg2, label) \
    orc_mips_emit_conditional_branch(compiler, ORC_MIPS_BEQ, reg1, reg2, label)

void orc_mips_emit_addiu (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_addi (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_add (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_addu (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_addu_qb (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_addu_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_addq_s_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_adduh_r_qb (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_move (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source);
void orc_mips_emit_sub (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_subu_qb (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_subq_s_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_subq_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_subu_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_srl (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_sll (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_sra (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_shll_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_shra_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_shrl_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_andi (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_or (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_and (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_ori (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int value);
void orc_mips_emit_lui (OrcCompiler *compiler, OrcMipsRegister dest, int value);
void orc_mips_emit_mul (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_mul_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);

void orc_mips_emit_append (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int shift_amount);

void orc_mips_emit_prepend (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source, int shift_amount);

void orc_mips_emit_mtlo (OrcCompiler *compiler, OrcMipsRegister source);

void orc_mips_emit_extr_s_h (OrcCompiler *compiler, OrcMipsRegister dest, int accumulator, int shift);

void orc_mips_emit_slt (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister src1, OrcMipsRegister src2);
void orc_mips_emit_movn (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister src, OrcMipsRegister condition);

void orc_mips_emit_repl_ph (OrcCompiler *compiler, OrcMipsRegister dest, int value);
void orc_mips_emit_replv_qb (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source);
void orc_mips_emit_replv_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source);
void orc_mips_emit_preceu_ph_qbr (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source);
void orc_mips_emit_precr_qb_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_precrq_qb_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_cmp_lt_ph (OrcCompiler *compiler, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_pick_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);

void orc_mips_emit_packrl_ph (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source1, OrcMipsRegister source2);
void orc_mips_emit_align (OrcCompiler *compiler, int align_shift);

void orc_mips_emit_wsbh (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source);
void orc_mips_emit_seh (OrcCompiler *compiler, OrcMipsRegister dest, OrcMipsRegister source);

void orc_mips_emit_pref (OrcCompiler *compiler, int hint, OrcMipsRegister base, int offset);

void orc_mips_do_fixups (OrcCompiler *compiler);

/* ORC_STRUCT_OFFSET doesn't work for cross-compiling, so we use that */

#define ORC_MIPS_EXECUTOR_OFFSET_PROGRAM 0
#define ORC_MIPS_EXECUTOR_OFFSET_N 4
#define ORC_MIPS_EXECUTOR_OFFSET_COUNTER1 8
#define ORC_MIPS_EXECUTOR_OFFSET_COUNTER2 12
#define ORC_MIPS_EXECUTOR_OFFSET_COUNTER3 16
#define ORC_MIPS_EXECUTOR_OFFSET_ARRAYS(i) (20 + 4 * i)
#define ORC_MIPS_EXECUTOR_OFFSET_PARAMS(i) (276 + 4 * i)
#define ORC_MIPS_EXECUTOR_OFFSET_ACCUMULATORS(i) (532 + 4 * i)

#endif /* ORC_ENABLE_UNSTABLE_API */

ORC_END_DECLS

#endif /* _ORC_MIPS_H_ */
