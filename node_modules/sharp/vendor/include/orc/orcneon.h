
#ifndef _ORC_NEON_H_
#define _ORC_NEON_H_

#include <orc/orc.h>
#include <orc/orcarm.h>

ORC_BEGIN_DECLS

#ifdef ORC_ENABLE_UNSTABLE_API

const char *orc_neon_reg_name (int reg);
const char *orc_neon_reg_name_quad (int reg);

void orc_neon_loadb (OrcCompiler *compiler, OrcVariable *var, int update);
void orc_neon_loadw (OrcCompiler *compiler, OrcVariable *var, int update);
void orc_neon_loadl (OrcCompiler *compiler, OrcVariable *var, int update);
void orc_neon_loadq (OrcCompiler *compiler, int dest, int src1, int update, int is_aligned);

void orc_neon_load_vec_aligned (OrcCompiler *compiler, OrcVariable *var, int update);
void orc_neon_load_vec_unaligned (OrcCompiler *compiler, OrcVariable *var, int update);
void orc_neon_load_halfvec_unaligned (OrcCompiler *compiler, OrcVariable *var, int update);

void orc_neon_neg (OrcCompiler *compiler, int dest);
void orc_neon_storeb (OrcCompiler *compiler, int dest, int update, int src1, int is_aligned);
void orc_neon_storew (OrcCompiler *compiler, int dest, int update, int src1, int is_aligned);
void orc_neon_storel (OrcCompiler *compiler, int dest, int update, int src1, int is_aligned);
void orc_neon_storeq (OrcCompiler *compiler, int dest, int update, int src1, int is_aligned);
void orc_neon_emit_loadib (OrcCompiler *p, int reg, int value);
void orc_neon_emit_loadiw (OrcCompiler *p, int reg, int value);
void orc_neon_emit_loadil (OrcCompiler *p, int reg, int value);
void orc_neon_emit_loadpb (OrcCompiler *p, int reg, int param);
void orc_neon_emit_loadpw (OrcCompiler *p, int reg, int param);
void orc_neon_emit_loadpl (OrcCompiler *p, int reg, int param);
void orc_neon_preload (OrcCompiler *compiler, OrcVariable *var, int write,
    int offset);

#endif

ORC_END_DECLS

#endif

