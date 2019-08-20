
#ifndef ORC_ORC_X86_INSN_H_
#define ORC_ORC_X86_INSN_H_

#include <orc/orccpuinsn.h>

ORC_BEGIN_DECLS

#ifdef ORC_ENABLE_UNSTABLE_API

typedef enum {
  ORC_X86_INSN_TYPE_MMXM_MMX,        	/* mem/mmx, mmx */
  ORC_X86_INSN_TYPE_IMM8_MMX_SHIFT,	/* $shift, mmx.  opcode in src */
  ORC_X86_INSN_TYPE_SSEM_SSE,		/* mem/mmx, sse */
  ORC_X86_INSN_TYPE_IMM8_MMXM_MMX,
  ORC_X86_INSN_TYPE_IMM8_MMX_REG_REV,
  ORC_X86_INSN_TYPE_MMXM_MMX_REV,
  ORC_X86_INSN_TYPE_SSEM_SSE_REV,
  ORC_X86_INSN_TYPE_REGM_MMX,
  ORC_X86_INSN_TYPE_MMX_REGM_REV,
  ORC_X86_INSN_TYPE_REGM,
  ORC_X86_INSN_TYPE_MEM,
  ORC_X86_INSN_TYPE_IMM8_REGM,
  ORC_X86_INSN_TYPE_IMM32_REGM,
  ORC_X86_INSN_TYPE_REGM_REG,
  ORC_X86_INSN_TYPE_REG_REGM,
  ORC_X86_INSN_TYPE_LABEL,
  ORC_X86_INSN_TYPE_ALIGN,
  ORC_X86_INSN_TYPE_BRANCH,
  ORC_X86_INSN_TYPE_NONE,
  ORC_X86_INSN_TYPE_STACK,
  ORC_X86_INSN_TYPE_IMM32_REGM_MOV,
  ORC_X86_INSN_TYPE_REG8_REGM,
  ORC_X86_INSN_TYPE_REG16_REGM,
  ORC_X86_INSN_TYPE_IMM32_A,
  ORC_X86_INSN_TYPE_IMM8_REGM_MMX,
} OrcX86InsnType;

typedef enum {
  ORC_X86_punpcklbw,
  ORC_X86_punpcklwd,
  ORC_X86_punpckldq,
  ORC_X86_packsswb,
  ORC_X86_pcmpgtb,
  ORC_X86_pcmpgtw,
  ORC_X86_pcmpgtd,
  ORC_X86_packuswb,
  ORC_X86_punpckhbw,
  ORC_X86_punpckhwd,
  ORC_X86_punpckhdq,
  ORC_X86_packssdw,
  ORC_X86_punpcklqdq,
  ORC_X86_punpckhqdq,
  ORC_X86_movdqa,
  ORC_X86_psraw,
  ORC_X86_psrlw,
  ORC_X86_psllw,
  ORC_X86_psrad,
  ORC_X86_psrld,
  ORC_X86_pslld,
  ORC_X86_psrlq,
  ORC_X86_psllq,
  ORC_X86_psrldq,
  ORC_X86_pslldq,
  ORC_X86_psrlq_reg,
  ORC_X86_pcmpeqb,
  ORC_X86_pcmpeqw,
  ORC_X86_pcmpeqd,
  ORC_X86_paddq,
  ORC_X86_pmullw,
  ORC_X86_psubusb,
  ORC_X86_psubusw,
  ORC_X86_pminub,
  ORC_X86_pand,
  ORC_X86_paddusb,
  ORC_X86_paddusw,
  ORC_X86_pmaxub,
  ORC_X86_pandn,
  ORC_X86_pavgb,
  ORC_X86_pavgw,
  ORC_X86_pmulhuw,
  ORC_X86_pmulhw,
  ORC_X86_psubsb,
  ORC_X86_psubsw,
  ORC_X86_pminsw,
  ORC_X86_por,
  ORC_X86_paddsb,
  ORC_X86_paddsw,
  ORC_X86_pmaxsw,
  ORC_X86_pxor,
  ORC_X86_pmuludq,
  ORC_X86_pmaddwd,
  ORC_X86_psadbw,
  ORC_X86_psubb,
  ORC_X86_psubw,
  ORC_X86_psubd,
  ORC_X86_psubq,
  ORC_X86_paddb,
  ORC_X86_paddw,
  ORC_X86_paddd,
  ORC_X86_pshufb,
  ORC_X86_phaddw,
  ORC_X86_phaddd,
  ORC_X86_phaddsw,
  ORC_X86_pmaddubsw,
  ORC_X86_phsubw,
  ORC_X86_phsubd,
  ORC_X86_phsubsw,
  ORC_X86_psignb,
  ORC_X86_psignw,
  ORC_X86_psignd,
  ORC_X86_pmulhrsw,
  ORC_X86_pabsb,
  ORC_X86_pabsw,
  ORC_X86_pabsd,
  ORC_X86_pmovsxbw,
  ORC_X86_pmovsxbd,
  ORC_X86_pmovsxbq,
  ORC_X86_pmovsxwd,
  ORC_X86_pmovsxwq,
  ORC_X86_pmovsxdq,
  ORC_X86_pmuldq,
  ORC_X86_pcmpeqq,
  ORC_X86_packusdw,
  ORC_X86_pmovzxbw,
  ORC_X86_pmovzxbd,
  ORC_X86_pmovzxbq,
  ORC_X86_pmovzxwd,
  ORC_X86_pmovzxwq,
  ORC_X86_pmovzxdq,
  ORC_X86_pmulld,
  ORC_X86_phminposuw,
  ORC_X86_pminsb,
  ORC_X86_pminsd,
  ORC_X86_pminuw,
  ORC_X86_pminud,
  ORC_X86_pmaxsb,
  ORC_X86_pmaxsd,
  ORC_X86_pmaxuw,
  ORC_X86_pmaxud,
  ORC_X86_pcmpgtq,
  ORC_X86_addps,
  ORC_X86_subps,
  ORC_X86_mulps,
  ORC_X86_divps,
  ORC_X86_sqrtps,
  ORC_X86_addpd,
  ORC_X86_subpd,
  ORC_X86_mulpd,
  ORC_X86_divpd,
  ORC_X86_sqrtpd,
  ORC_X86_cmpeqps,
  ORC_X86_cmpeqpd,
  ORC_X86_cmpltps,
  ORC_X86_cmpltpd,
  ORC_X86_cmpleps,
  ORC_X86_cmplepd,
  ORC_X86_cvttps2dq,
  ORC_X86_cvttpd2dq,
  ORC_X86_cvtdq2ps,
  ORC_X86_cvtdq2pd,
  ORC_X86_cvtps2pd,
  ORC_X86_cvtpd2ps,
  ORC_X86_minps,
  ORC_X86_minpd,
  ORC_X86_maxps,
  ORC_X86_maxpd,
  ORC_X86_psraw_imm,
  ORC_X86_psrlw_imm,
  ORC_X86_psllw_imm,
  ORC_X86_psrad_imm,
  ORC_X86_psrld_imm,
  ORC_X86_pslld_imm,
  ORC_X86_psrlq_imm,
  ORC_X86_psllq_imm,
  ORC_X86_psrldq_imm,
  ORC_X86_pslldq_imm,
  ORC_X86_pshufd,
  ORC_X86_pshuflw,
  ORC_X86_pshufhw,
  ORC_X86_palignr,
  ORC_X86_pinsrw,
  ORC_X86_movd_load,
  ORC_X86_movq_sse_load,
  ORC_X86_movdqa_load,
  ORC_X86_movdqu_load,
  ORC_X86_movhps_load,
  ORC_X86_pextrw,
  ORC_X86_movd_store,
  ORC_X86_movq_sse_store,
  ORC_X86_movdqa_store,
  ORC_X86_movdqu_store,
  ORC_X86_movntdq_store,
  ORC_X86_ldmxcsr,
  ORC_X86_stmxcsr,
  ORC_X86_add_imm8_rm,
  ORC_X86_add_imm32_rm,
  ORC_X86_add_rm_r,
  ORC_X86_add_r_rm,
  ORC_X86_or_imm8_rm,
  ORC_X86_or_imm32_rm,
  ORC_X86_or_rm_r,
  ORC_X86_or_r_rm,
  ORC_X86_adc_imm8_rm,
  ORC_X86_adc_imm32_rm,
  ORC_X86_adc_rm_r,
  ORC_X86_adc_r_rm,
  ORC_X86_sbb_imm8_rm,
  ORC_X86_sbb_imm32_rm,
  ORC_X86_sbb_rm_r,
  ORC_X86_sbb_r_rm,
  ORC_X86_and_imm8_rm,
  ORC_X86_and_imm32_rm,
  ORC_X86_and_rm_r,
  ORC_X86_and_r_rm,
  ORC_X86_sub_imm8_rm,
  ORC_X86_sub_imm32_rm,
  ORC_X86_sub_rm_r,
  ORC_X86_sub_r_rm,
  ORC_X86_xor_imm8_rm,
  ORC_X86_xor_imm32_rm,
  ORC_X86_xor_rm_r,
  ORC_X86_xor_r_rm,
  ORC_X86_cmp_imm8_rm,
  ORC_X86_cmp_imm32_rm,
  ORC_X86_cmp_rm_r,
  ORC_X86_cmp_r_rm,
  ORC_X86_jo,
  ORC_X86_jno,
  ORC_X86_jc,
  ORC_X86_jnc,
  ORC_X86_jz,
  ORC_X86_jnz,
  ORC_X86_jbe,
  ORC_X86_ja,
  ORC_X86_js,
  ORC_X86_jns,
  ORC_X86_jp,
  ORC_X86_jnp,
  ORC_X86_jl,
  ORC_X86_jge,
  ORC_X86_jle,
  ORC_X86_jg,
  ORC_X86_jmp,
  ORC_X86_LABEL,
  ORC_X86_ret,
  ORC_X86_retq,
  ORC_X86_emms,
  ORC_X86_rdtsc,
  ORC_X86_nop,
  ORC_X86_rep_movsb,
  ORC_X86_rep_movsw,
  ORC_X86_rep_movsl,
  ORC_X86_push,
  ORC_X86_pop,
  ORC_X86_movzx_rm_r,
  ORC_X86_movw_rm_r,
  ORC_X86_movl_rm_r,
  ORC_X86_mov_rm_r,
  ORC_X86_mov_imm32_r,
  ORC_X86_movb_r_rm,
  ORC_X86_movw_r_rm,
  ORC_X86_movl_r_rm,
  ORC_X86_mov_r_rm,
  ORC_X86_test,
  ORC_X86_test_imm,
  ORC_X86_leal,
  ORC_X86_leaq,
  ORC_X86_imul_rm_r,
  ORC_X86_imul_rm,
  ORC_X86_inc,
  ORC_X86_dec,
  ORC_X86_sar_imm,
  ORC_X86_sar,
  ORC_X86_and_imm32_a,
  ORC_X86_ALIGN,
  ORC_X86_pshufw,
  ORC_X86_movq_mmx_load,
  ORC_X86_movq_mmx_store,
} OrcX86Opcode;

enum {
  ORC_X86_RM_REG,
  ORC_X86_RM_MEMOFFSET,
  ORC_X86_RM_MEMINDEX
};

typedef struct _OrcX86Insn OrcX86Insn;
struct _OrcX86Insn {
  OrcX86Opcode opcode_index;
  const OrcSysOpcode *opcode;
  int imm;
  int src;
  int dest;
  int size;
  int label;
  int type;
  int offset;
  int index_reg;
  int shift;
  int code_offset;
};

OrcX86Insn * orc_x86_get_output_insn (OrcCompiler *p);
void orc_x86_output_insns (OrcCompiler *p);
void orc_x86_calculate_offsets (OrcCompiler *p);



#define orc_sse_emit_punpcklbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpcklbw, 16, a, b)
#define orc_sse_emit_punpcklwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpcklwd, 16, a, b)
#define orc_sse_emit_punpckldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckldq, 16, a, b)
#define orc_sse_emit_packsswb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packsswb, 16, a, b)
#define orc_sse_emit_pcmpgtb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtb, 16, a, b)
#define orc_sse_emit_pcmpgtw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtw, 16, a, b)
#define orc_sse_emit_pcmpgtd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtd, 16, a, b)
#define orc_sse_emit_packuswb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packuswb, 16, a, b)
#define orc_sse_emit_punpckhbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhbw, 16, a, b)
#define orc_sse_emit_punpckhwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhwd, 16, a, b)
#define orc_sse_emit_punpckhdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhdq, 16, a, b)
#define orc_sse_emit_packssdw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packssdw, 16, a, b)
#define orc_sse_emit_punpcklqdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpcklqdq, 16, a, b)
#define orc_sse_emit_punpckhqdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhqdq, 16, a, b)
#define orc_sse_emit_movdqa(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movdqa, 16, a, b)
#define orc_sse_emit_psraw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psraw, 16, a, b)
#define orc_sse_emit_psrlw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrlw, 16, a, b)
#define orc_sse_emit_psllw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psllw, 16, a, b)
#define orc_sse_emit_psrad(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrad, 16, a, b)
#define orc_sse_emit_psrld(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrld, 16, a, b)
#define orc_sse_emit_pslld(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pslld, 16, a, b)
#define orc_sse_emit_psrlq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrlq, 16, a, b)
#define orc_sse_emit_psllq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psllq, 16, a, b)
#define orc_sse_emit_psrldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrldq, 16, a, b)
#define orc_sse_emit_pslldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pslldq, 16, a, b)
#define orc_sse_emit_psrlq_reg(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrlq_reg, 16, a, b)
#define orc_sse_emit_pcmpeqb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqb, 16, a, b)
#define orc_sse_emit_pcmpeqw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqw, 16, a, b)
#define orc_sse_emit_pcmpeqd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqd, 16, a, b)
#define orc_sse_emit_paddq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddq, 16, a, b)
#define orc_sse_emit_pmullw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmullw, 16, a, b)
#define orc_sse_emit_psubusb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubusb, 16, a, b)
#define orc_sse_emit_psubusw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubusw, 16, a, b)
#define orc_sse_emit_pminub(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminub, 16, a, b)
#define orc_sse_emit_pand(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pand, 16, a, b)
#define orc_sse_emit_paddusb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddusb, 16, a, b)
#define orc_sse_emit_paddusw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddusw, 16, a, b)
#define orc_sse_emit_pmaxub(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxub, 16, a, b)
#define orc_sse_emit_pandn(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pandn, 16, a, b)
#define orc_sse_emit_pavgb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pavgb, 16, a, b)
#define orc_sse_emit_pavgw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pavgw, 16, a, b)
#define orc_sse_emit_pmulhuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulhuw, 16, a, b)
#define orc_sse_emit_pmulhw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulhw, 16, a, b)
#define orc_sse_emit_psubsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubsb, 16, a, b)
#define orc_sse_emit_psubsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubsw, 16, a, b)
#define orc_sse_emit_pminsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminsw, 16, a, b)
#define orc_sse_emit_por(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_por, 16, a, b)
#define orc_sse_emit_paddsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddsb, 16, a, b)
#define orc_sse_emit_paddsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddsw, 16, a, b)
#define orc_sse_emit_pmaxsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxsw, 16, a, b)
#define orc_sse_emit_pxor(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pxor, 16, a, b)
#define orc_sse_emit_pmuludq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmuludq, 16, a, b)
#define orc_sse_emit_pmaddwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaddwd, 16, a, b)
#define orc_sse_emit_psadbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psadbw, 16, a, b)
#define orc_sse_emit_psubb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubb, 16, a, b)
#define orc_sse_emit_psubw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubw, 16, a, b)
#define orc_sse_emit_psubd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubd, 16, a, b)
#define orc_sse_emit_psubq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubq, 16, a, b)
#define orc_sse_emit_paddb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddb, 16, a, b)
#define orc_sse_emit_paddw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddw, 16, a, b)
#define orc_sse_emit_paddd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddd, 16, a, b)
#define orc_sse_emit_pshufb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pshufb, 16, a, b)
#define orc_sse_emit_phaddw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phaddw, 16, a, b)
#define orc_sse_emit_phaddd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phaddd, 16, a, b)
#define orc_sse_emit_phaddsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phaddsw, 16, a, b)
#define orc_sse_emit_pmaddubsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaddubsw, 16, a, b)
#define orc_sse_emit_phsubw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phsubw, 16, a, b)
#define orc_sse_emit_phsubd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phsubd, 16, a, b)
#define orc_sse_emit_phsubsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phsubsw, 16, a, b)
#define orc_sse_emit_psignb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psignb, 16, a, b)
#define orc_sse_emit_psignw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psignw, 16, a, b)
#define orc_sse_emit_psignd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psignd, 16, a, b)
#define orc_sse_emit_pmulhrsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulhrsw, 16, a, b)
#define orc_sse_emit_pabsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pabsb, 16, a, b)
#define orc_sse_emit_pabsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pabsw, 16, a, b)
#define orc_sse_emit_pabsd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pabsd, 16, a, b)
#define orc_sse_emit_pmovsxbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxbw, 16, a, b)
#define orc_sse_emit_pmovsxbd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxbd, 16, a, b)
#define orc_sse_emit_pmovsxbq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxbq, 16, a, b)
#define orc_sse_emit_pmovsxwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxwd, 16, a, b)
#define orc_sse_emit_pmovsxwq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxwq, 16, a, b)
#define orc_sse_emit_pmovsxdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxdq, 16, a, b)
#define orc_sse_emit_pmuldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmuldq, 16, a, b)
#define orc_sse_emit_pcmpeqq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqq, 16, a, b)
#define orc_sse_emit_packusdw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packusdw, 16, a, b)
#define orc_sse_emit_pmovzxbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxbw, 16, a, b)
#define orc_sse_emit_pmovzxbd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxbd, 16, a, b)
#define orc_sse_emit_pmovzxbq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxbq, 16, a, b)
#define orc_sse_emit_pmovzxwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxwd, 16, a, b)
#define orc_sse_emit_pmovzxwq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxwq, 16, a, b)
#define orc_sse_emit_pmovzxdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxdq, 16, a, b)
#define orc_sse_emit_pmulld(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulld, 16, a, b)
#define orc_sse_emit_phminposuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phminposuw, 16, a, b)
#define orc_sse_emit_pminsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminsb, 16, a, b)
#define orc_sse_emit_pminsd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminsd, 16, a, b)
#define orc_sse_emit_pminuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminuw, 16, a, b)
#define orc_sse_emit_pminud(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminud, 16, a, b)
#define orc_sse_emit_pmaxsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxsb, 16, a, b)
#define orc_sse_emit_pmaxsd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxsd, 16, a, b)
#define orc_sse_emit_pmaxuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxuw, 16, a, b)
#define orc_sse_emit_pmaxud(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxud, 16, a, b)
#define orc_sse_emit_pcmpgtq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtq, 16, a, b)
#define orc_sse_emit_addps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_addps, 16, a, b)
#define orc_sse_emit_subps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_subps, 16, a, b)
#define orc_sse_emit_mulps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_mulps, 16, a, b)
#define orc_sse_emit_divps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_divps, 16, a, b)
#define orc_sse_emit_sqrtps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_sqrtps, 16, a, b)
#define orc_sse_emit_addpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_addpd, 16, a, b)
#define orc_sse_emit_subpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_subpd, 16, a, b)
#define orc_sse_emit_mulpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_mulpd, 16, a, b)
#define orc_sse_emit_divpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_divpd, 16, a, b)
#define orc_sse_emit_sqrtpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_sqrtpd, 16, a, b)
#define orc_sse_emit_cmpeqps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpeqps, 16, a, b)
#define orc_sse_emit_cmpeqpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpeqpd, 16, a, b)
#define orc_sse_emit_cmpltps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpltps, 16, a, b)
#define orc_sse_emit_cmpltpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpltpd, 16, a, b)
#define orc_sse_emit_cmpleps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpleps, 16, a, b)
#define orc_sse_emit_cmplepd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmplepd, 16, a, b)
#define orc_sse_emit_cvttps2dq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvttps2dq, 16, a, b)
#define orc_sse_emit_cvttpd2dq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvttpd2dq, 16, a, b)
#define orc_sse_emit_cvtdq2ps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtdq2ps, 16, a, b)
#define orc_sse_emit_cvtdq2pd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtdq2pd, 16, a, b)
#define orc_sse_emit_cvtps2pd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtps2pd, 16, a, b)
#define orc_sse_emit_cvtpd2ps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtpd2ps, 16, a, b)
#define orc_sse_emit_minps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_minps, 16, a, b)
#define orc_sse_emit_minpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_minpd, 16, a, b)
#define orc_sse_emit_maxps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_maxps, 16, a, b)
#define orc_sse_emit_maxpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_maxpd, 16, a, b)
#define orc_sse_emit_psraw_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psraw_imm, imm, 0, b)
#define orc_sse_emit_psrlw_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrlw_imm, imm, 0, b)
#define orc_sse_emit_psllw_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psllw_imm, imm, 0, b)
#define orc_sse_emit_psrad_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrad_imm, imm, 0, b)
#define orc_sse_emit_psrld_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrld_imm, imm, 0, b)
#define orc_sse_emit_pslld_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pslld_imm, imm, 0, b)
#define orc_sse_emit_psrlq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrlq_imm, imm, 0, b)
#define orc_sse_emit_psllq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psllq_imm, imm, 0, b)
#define orc_sse_emit_psrldq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrldq_imm, imm, 0, b)
#define orc_sse_emit_pslldq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pslldq_imm, imm, 0, b)
#define orc_sse_emit_pshufd(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshufd, imm, a, b)
#define orc_sse_emit_pshuflw(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshuflw, imm, a, b)
#define orc_sse_emit_pshufhw(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshufhw, imm, a, b)
#define orc_sse_emit_palignr(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psalignr, imm, a, b)
#define orc_sse_emit_movdqu(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movdqu_load, 16, a, b)

#define orc_sse_emit_pinsrw_memoffset(p,imm,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_pinsrw, 4, imm, offset, a, b)
#define orc_sse_emit_movd_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movd_load, 4, 0, offset, a, b)
#define orc_sse_emit_movq_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movq_sse_load, 4, 0, offset, a, b)
#define orc_sse_emit_movdqa_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movdqa_load, 4, 0, offset, a, b)
#define orc_sse_emit_movdqu_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movdqu_load, 4, 0, offset, a, b)
#define orc_sse_emit_movhps_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movhps_load, 4, 0, offset, a, b)

#define orc_sse_emit_pextrw_memoffset(p,imm,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_pextrw, 16, imm, a, offset, b)
#define orc_sse_emit_movd_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movd_store, 16, 0, a, offset, b)
#define orc_sse_emit_movq_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movq_sse_store, 16, 0, a, offset, b)
#define orc_sse_emit_movdqa_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movdqa_store, 16, 0, a, offset, b)
#define orc_sse_emit_movdqu_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movdqu_store, 16, 0, a, offset, b)
#define orc_sse_emit_movntdq_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movntdq_store, 16, 0, a, offset, b)

#define orc_sse_emit_pinsrw_memindex(p,imm,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_pinsrw, 4, imm, offset, a, a_index, shift, b)
#define orc_sse_emit_movd_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movd_load, 4, 0, offset, a, a_index, shift, b)
#define orc_sse_emit_movq_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movq_sse_load, 4, 0, offset, a, a_index, shift, b)
#define orc_sse_emit_movdqa_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movdqa_load, 4, 0, offset, a, a_index, shift, b)
#define orc_sse_emit_movdqu_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movdqu_load, 4, 0, offset, a, a_index, shift, b)
#define orc_sse_emit_movhps_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movhps_load, 4, 0, offset, a, a_index, shift, b)

#define orc_sse_emit_pextrw_memindex(p,imm,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_pextrw, imm, a, offset, b, b_index, shift)
#define orc_sse_emit_movd_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movd_store, 0, a, offset, b, b_index, shift)
#define orc_sse_emit_movq_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movq_sse_store, 0, a, offset, b, b_index, shift)
#define orc_sse_emit_movdqa_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movdqa_store, 0, a, offset, b, b_index, shift)
#define orc_sse_emit_movdqu_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movdqu_store, 0, a, offset, b, b_index, shift)
#define orc_sse_emit_movntdq_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movntdq_store, 0, a, offset, b, b_index, shift)

#define orc_sse_emit_pinsrw_register(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pinsrw, imm, a, b)
#define orc_sse_emit_movd_load_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movd_load, 4, a, b)
#define orc_sse_emit_movq_load_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movq_sse_load, 4, a, b)

#define orc_sse_emit_pextrw_register(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pextrw, imm, a, b)
#define orc_sse_emit_movd_store_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movd_store, 4, a, b)
#define orc_sse_emit_movq_store_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movq_sse_store, 4, a, b)




#define orc_mmx_emit_punpcklbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpcklbw, 8, a, b)
#define orc_mmx_emit_punpcklwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpcklwd, 8, a, b)
#define orc_mmx_emit_punpckldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckldq, 8, a, b)
#define orc_mmx_emit_packsswb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packsswb, 8, a, b)
#define orc_mmx_emit_pcmpgtb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtb, 8, a, b)
#define orc_mmx_emit_pcmpgtw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtw, 8, a, b)
#define orc_mmx_emit_pcmpgtd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtd, 8, a, b)
#define orc_mmx_emit_packuswb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packuswb, 8, a, b)
#define orc_mmx_emit_punpckhbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhbw, 8, a, b)
#define orc_mmx_emit_punpckhwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhwd, 8, a, b)
#define orc_mmx_emit_punpckhdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhdq, 8, a, b)
#define orc_mmx_emit_packssdw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packssdw, 8, a, b)
#define orc_mmx_emit_punpcklqdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpcklqdq, 8, a, b)
#define orc_mmx_emit_punpckhqdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_punpckhqdq, 8, a, b)
#define orc_mmx_emit_psraw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psraw, 8, a, b)
#define orc_mmx_emit_psrlw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrlw, 8, a, b)
#define orc_mmx_emit_psllw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psllw, 8, a, b)
#define orc_mmx_emit_psrad(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrad, 8, a, b)
#define orc_mmx_emit_psrld(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrld, 8, a, b)
#define orc_mmx_emit_pslld(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pslld, 8, a, b)
#define orc_mmx_emit_psrlq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrlq, 8, a, b)
#define orc_mmx_emit_psllq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psllq, 8, a, b)
#define orc_mmx_emit_psrldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrldq, 8, a, b)
#define orc_mmx_emit_pslldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pslldq, 8, a, b)
#define orc_mmx_emit_psrlq_reg(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psrlq_reg, 8, a, b)
#define orc_mmx_emit_pcmpeqb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqb, 8, a, b)
#define orc_mmx_emit_pcmpeqw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqw, 8, a, b)
#define orc_mmx_emit_pcmpeqd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqd, 8, a, b)
#define orc_mmx_emit_paddq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddq, 8, a, b)
#define orc_mmx_emit_pmullw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmullw, 8, a, b)
#define orc_mmx_emit_psubusb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubusb, 8, a, b)
#define orc_mmx_emit_psubusw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubusw, 8, a, b)
#define orc_mmx_emit_pminub(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminub, 8, a, b)
#define orc_mmx_emit_pand(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pand, 8, a, b)
#define orc_mmx_emit_paddusb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddusb, 8, a, b)
#define orc_mmx_emit_paddusw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddusw, 8, a, b)
#define orc_mmx_emit_pmaxub(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxub, 8, a, b)
#define orc_mmx_emit_pandn(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pandn, 8, a, b)
#define orc_mmx_emit_pavgb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pavgb, 8, a, b)
#define orc_mmx_emit_pavgw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pavgw, 8, a, b)
#define orc_mmx_emit_pmulhuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulhuw, 8, a, b)
#define orc_mmx_emit_pmulhw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulhw, 8, a, b)
#define orc_mmx_emit_psubsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubsb, 8, a, b)
#define orc_mmx_emit_psubsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubsw, 8, a, b)
#define orc_mmx_emit_pminsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminsw, 8, a, b)
#define orc_mmx_emit_por(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_por, 8, a, b)
#define orc_mmx_emit_paddsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddsb, 8, a, b)
#define orc_mmx_emit_paddsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddsw, 8, a, b)
#define orc_mmx_emit_pmaxsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxsw, 8, a, b)
#define orc_mmx_emit_pxor(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pxor, 8, a, b)
#define orc_mmx_emit_pmuludq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmuludq, 8, a, b)
#define orc_mmx_emit_pmaddwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaddwd, 8, a, b)
#define orc_mmx_emit_psadbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psadbw, 8, a, b)
#define orc_mmx_emit_psubb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubb, 8, a, b)
#define orc_mmx_emit_psubw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubw, 8, a, b)
#define orc_mmx_emit_psubd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubd, 8, a, b)
#define orc_mmx_emit_psubq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psubq, 8, a, b)
#define orc_mmx_emit_paddb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddb, 8, a, b)
#define orc_mmx_emit_paddw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddw, 8, a, b)
#define orc_mmx_emit_paddd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_paddd, 8, a, b)
#define orc_mmx_emit_pshufb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pshufb, 8, a, b)
#define orc_mmx_emit_phaddw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phaddw, 8, a, b)
#define orc_mmx_emit_phaddd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phaddd, 8, a, b)
#define orc_mmx_emit_phaddsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phaddsw, 8, a, b)
#define orc_mmx_emit_pmaddubsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaddubsw, 8, a, b)
#define orc_mmx_emit_phsubw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phsubw, 8, a, b)
#define orc_mmx_emit_phsubd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phsubd, 8, a, b)
#define orc_mmx_emit_phsubsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phsubsw, 8, a, b)
#define orc_mmx_emit_psignb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psignb, 8, a, b)
#define orc_mmx_emit_psignw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psignw, 8, a, b)
#define orc_mmx_emit_psignd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_psignd, 8, a, b)
#define orc_mmx_emit_pmulhrsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulhrsw, 8, a, b)
#define orc_mmx_emit_pabsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pabsb, 8, a, b)
#define orc_mmx_emit_pabsw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pabsw, 8, a, b)
#define orc_mmx_emit_pabsd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pabsd, 8, a, b)
#define orc_mmx_emit_pmovsxbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxbw, 8, a, b)
#define orc_mmx_emit_pmovsxbd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxbd, 8, a, b)
#define orc_mmx_emit_pmovsxbq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxbq, 8, a, b)
#define orc_mmx_emit_pmovsxwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxwd, 8, a, b)
#define orc_mmx_emit_pmovsxwq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxwq, 8, a, b)
#define orc_mmx_emit_pmovsxdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovsxdq, 8, a, b)
#define orc_mmx_emit_pmuldq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmuldq, 8, a, b)
#define orc_mmx_emit_pcmpeqq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpeqq, 8, a, b)
#define orc_mmx_emit_packusdw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_packusdw, 8, a, b)
#define orc_mmx_emit_pmovzxbw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxbw, 8, a, b)
#define orc_mmx_emit_pmovzxbd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxbd, 8, a, b)
#define orc_mmx_emit_pmovzxbq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxbq, 8, a, b)
#define orc_mmx_emit_pmovzxwd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxwd, 8, a, b)
#define orc_mmx_emit_pmovzxwq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxwq, 8, a, b)
#define orc_mmx_emit_pmovzxdq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmovzxdq, 8, a, b)
#define orc_mmx_emit_pmulld(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmulld, 8, a, b)
#define orc_mmx_emit_phminposuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_phminposuw, 8, a, b)
#define orc_mmx_emit_pminsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminsb, 8, a, b)
#define orc_mmx_emit_pminsd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminsd, 8, a, b)
#define orc_mmx_emit_pminuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminuw, 8, a, b)
#define orc_mmx_emit_pminud(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pminud, 8, a, b)
#define orc_mmx_emit_pmaxsb(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxsb, 8, a, b)
#define orc_mmx_emit_pmaxsd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxsd, 8, a, b)
#define orc_mmx_emit_pmaxuw(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxuw, 8, a, b)
#define orc_mmx_emit_pmaxud(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pmaxud, 8, a, b)
#define orc_mmx_emit_pcmpgtq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_pcmpgtq, 8, a, b)
#define orc_mmx_emit_addps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_addps, 8, a, b)
#define orc_mmx_emit_subps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_subps, 8, a, b)
#define orc_mmx_emit_mulps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_mulps, 8, a, b)
#define orc_mmx_emit_divps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_divps, 8, a, b)
#define orc_mmx_emit_sqrtps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_sqrtps, 8, a, b)
#define orc_mmx_emit_addpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_addpd, 8, a, b)
#define orc_mmx_emit_subpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_subpd, 8, a, b)
#define orc_mmx_emit_mulpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_mulpd, 8, a, b)
#define orc_mmx_emit_divpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_divpd, 8, a, b)
#define orc_mmx_emit_sqrtpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_sqrtpd, 8, a, b)
#define orc_mmx_emit_cmpeqps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpeqps, 8, a, b)
#define orc_mmx_emit_cmpeqpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpeqpd, 8, a, b)
#define orc_mmx_emit_cmpltps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpltps, 8, a, b)
#define orc_mmx_emit_cmpltpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpltpd, 8, a, b)
#define orc_mmx_emit_cmpleps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmpleps, 8, a, b)
#define orc_mmx_emit_cmplepd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cmplepd, 8, a, b)
#define orc_mmx_emit_cvttps2dq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvttps2dq, 8, a, b)
#define orc_mmx_emit_cvttpd2dq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvttpd2dq, 8, a, b)
#define orc_mmx_emit_cvtdq2ps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtdq2ps, 8, a, b)
#define orc_mmx_emit_cvtdq2pd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtdq2pd, 8, a, b)
#define orc_mmx_emit_cvtps2pd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtps2pd, 8, a, b)
#define orc_mmx_emit_cvtpd2ps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_cvtpd2ps, 8, a, b)
#define orc_mmx_emit_minps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_minps, 8, a, b)
#define orc_mmx_emit_minpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_minpd, 8, a, b)
#define orc_mmx_emit_maxps(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_maxps, 8, a, b)
#define orc_mmx_emit_maxpd(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_maxpd, 8, a, b)
#define orc_mmx_emit_psraw_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psraw_imm, imm, 0, b)
#define orc_mmx_emit_psrlw_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrlw_imm, imm, 0, b)
#define orc_mmx_emit_psllw_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psllw_imm, imm, 0, b)
#define orc_mmx_emit_psrad_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrad_imm, imm, 0, b)
#define orc_mmx_emit_psrld_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrld_imm, imm, 0, b)
#define orc_mmx_emit_pslld_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pslld_imm, imm, 0, b)
#define orc_mmx_emit_psrlq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrlq_imm, imm, 0, b)
#define orc_mmx_emit_psllq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psllq_imm, imm, 0, b)
#define orc_mmx_emit_psrldq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psrldq_imm, imm, 0, b)
#define orc_mmx_emit_pslldq_imm(p,imm,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pslldq_imm, imm, 0, b)
#define orc_mmx_emit_pshufd(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshufd, imm, a, b)
#define orc_mmx_emit_pshuflw(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshuflw, imm, a, b)
#define orc_mmx_emit_pshufhw(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshufhw, imm, a, b)
#define orc_mmx_emit_palignr(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_psalignr, imm, a, b)

#define orc_mmx_emit_pinsrw_memoffset(p,imm,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_pinsrw, 4, imm, offset, a, b)
#define orc_mmx_emit_movd_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movd_load, 4, 0, offset, a, b)
#define orc_mmx_emit_movq_load_memoffset(p,offset,a,b) orc_x86_emit_cpuinsn_load_memoffset(p, ORC_X86_movq_mmx_load, 4, 0, offset, a, b)

#define orc_mmx_emit_pextrw_memoffset(p,imm,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_pextrw, 8, imm, a, offset, b)
#define orc_mmx_emit_movd_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movd_store, 8, 0, a, offset, b)
#define orc_mmx_emit_movq_store_memoffset(p,a,offset,b) orc_x86_emit_cpuinsn_store_memoffset(p, ORC_X86_movq_mmx_store, 8, 0, a, offset, b)

#define orc_mmx_emit_pinsrw_memindex(p,imm,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_pinsrw, 4, imm, offset, a, a_index, shift, b)
#define orc_mmx_emit_movd_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movd_load, 4, 0, offset, a, a_index, shift, b)
#define orc_mmx_emit_movq_load_memindex(p,offset,a,a_index,shift,b) orc_x86_emit_cpuinsn_load_memindex(p, ORC_X86_movq_mmx_load, 4, 0, offset, a, a_index, shift, b)

#define orc_mmx_emit_pextrw_memindex(p,imm,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_pextrw, imm, a, offset, b, b_index, shift)
#define orc_mmx_emit_movd_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movd_store, 0, a, offset, b, b_index, shift)
#define orc_mmx_emit_movq_store_memindex(p,a,offset,b,b_index,shift) orc_x86_emit_cpuinsn_store_memindex(p, ORC_X86_movq_mmx_store, 0, a, offset, b, b_index, shift)

#define orc_mmx_emit_pinsrw_register(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pinsrw, imm, a, b)
#define orc_mmx_emit_movd_load_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movd_load, 4, a, b)
#define orc_mmx_emit_movq_load_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movq_mmx_load, 4, a, b)

#define orc_mmx_emit_pextrw_register(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pextrw, imm, a, b)
#define orc_mmx_emit_movd_store_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movd_store, 4, a, b)
#define orc_mmx_emit_movq_store_register(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movq_mmx_store, 4, a, b)


#define orc_mmx_emit_pshufw(p,imm,a,b) orc_x86_emit_cpuinsn_imm(p, ORC_X86_pshufw, imm, a, b)
#define orc_mmx_emit_movq(p,a,b) orc_x86_emit_cpuinsn_size(p, ORC_X86_movq_mmx_load, 8, a, b)


#endif

ORC_END_DECLS

#endif

