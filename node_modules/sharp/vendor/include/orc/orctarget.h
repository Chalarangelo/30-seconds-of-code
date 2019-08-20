
#ifndef _ORC_TARGET_H_
#define _ORC_TARGET_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>
#include <orc/orcrule.h>

ORC_BEGIN_DECLS


enum {
  ORC_TARGET_C_C99 = (1<<0),
  ORC_TARGET_C_BARE = (1<<1),
  ORC_TARGET_C_NOEXEC = (1<<2),
  ORC_TARGET_C_OPCODE = (1<<3),
  ORC_TARGET_CLEAN_COMPILE = (1<<29),
  ORC_TARGET_FAST_NAN = (1<<30),
  ORC_TARGET_FAST_DENORMAL = (1<<31)
};

enum {
  ORC_TARGET_ALTIVEC_ALTIVEC = (1<<0)
};

enum {
  ORC_TARGET_NEON_CLEAN_COMPILE = (1<<0),
  ORC_TARGET_NEON_NEON = (1<<1),
  ORC_TARGET_NEON_EDSP = (1<<2)
};

enum {
  ORC_TARGET_ARM_EDSP = (1<<2),
  ORC_TARGET_ARM_ARM6 = (1<<3)
};

typedef enum {
  ORC_TARGET_MMX_MMX = (1<<0),
  ORC_TARGET_MMX_MMXEXT = (1<<1),
  ORC_TARGET_MMX_3DNOW = (1<<2),
  ORC_TARGET_MMX_3DNOWEXT = (1<<3),
  ORC_TARGET_MMX_SSSE3 = (1<<4),
  ORC_TARGET_MMX_SSE4_1 = (1<<5),
  ORC_TARGET_MMX_SSE4_2 = (1<<6),
  ORC_TARGET_MMX_FRAME_POINTER = (1<<7),
  ORC_TARGET_MMX_SHORT_JUMPS = (1<<8),
  ORC_TARGET_MMX_64BIT = (1<<9)
} OrcTargetMMXFlags;

typedef enum {
  ORC_TARGET_SSE_SSE2 = (1<<0),
  ORC_TARGET_SSE_SSE3 = (1<<1),
  ORC_TARGET_SSE_SSSE3 = (1<<2),
  ORC_TARGET_SSE_SSE4_1 = (1<<3),
  ORC_TARGET_SSE_SSE4_2 = (1<<4),
  ORC_TARGET_SSE_SSE4A = (1<<5),
  ORC_TARGET_SSE_SSE5 = (1<<6),
  ORC_TARGET_SSE_FRAME_POINTER = (1<<7),
  ORC_TARGET_SSE_SHORT_JUMPS = (1<<8),
  ORC_TARGET_SSE_64BIT = (1<<9)
}OrcTargetSSEFlags;


/**
 * OrcTarget:
 *
 */
struct _OrcTarget {
  const char *name;
  orc_bool executable;
  int data_register_offset;

  unsigned int (*get_default_flags)(void);
  void (*compiler_init)(OrcCompiler *compiler);
  void (*compile)(OrcCompiler *compiler);

  OrcRuleSet rule_sets[ORC_N_RULE_SETS];
  int n_rule_sets;

  const char * (*get_asm_preamble)(void);
  void (*load_constant)(OrcCompiler *compiler, int reg, int size, int value);
  const char * (*get_flag_name)(int shift);
  void (*flush_cache) (OrcCode *code);
  void (*load_constant_long)(OrcCompiler *compiler, int reg,
      OrcConstant *constant);

  void *_unused[5];
};


OrcRule * orc_target_get_rule (OrcTarget *target, OrcStaticOpcode *opcode,
    unsigned int target_flags);
OrcTarget * orc_target_get_default (void);
unsigned int orc_target_get_default_flags (OrcTarget *target);
const char * orc_target_get_name (OrcTarget *target);
const char * orc_target_get_flag_name (OrcTarget *target, int shift);

const char *orc_target_get_asm_preamble (const char *target);
const char * orc_target_get_preamble (OrcTarget *target);
const char * orc_target_c_get_typedefs (void);

void orc_target_register (OrcTarget *target);
OrcTarget *orc_target_get_by_name (const char *target_name);

ORC_END_DECLS

#endif

