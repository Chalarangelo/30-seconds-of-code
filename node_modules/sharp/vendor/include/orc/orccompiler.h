
#ifndef _ORC_COMPILER_H_
#define _ORC_COMPILER_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>
#include <orc/orcexecutor.h>
#include <orc/orccode.h>
#include <orc/orctarget.h>
#include <orc/orcinstruction.h>
#include <orc/orcvariable.h>
#include <orc/orcconstant.h>

ORC_BEGIN_DECLS

typedef struct _OrcFixup OrcFixup;


#define ORC_ENABLE_ASM_CODE
#ifdef ORC_ENABLE_ASM_CODE
#define ORC_ASM_CODE(compiler,...) orc_compiler_append_code(compiler, __VA_ARGS__)
#else
#define ORC_ASM_CODE(compiler,...)
#endif


#define ORC_COMPILER_ERROR(compiler, ...) do { \
  compiler->error = TRUE; \
  compiler->result = ORC_COMPILE_RESULT_UNKNOWN_PARSE; \
  orc_debug_print(ORC_DEBUG_WARNING, __FILE__, ORC_FUNCTION, __LINE__, __VA_ARGS__); \
} while (0)

#if 0
/* FIXME in orcutils.h since it's needed in orccode.h */
typedef enum {
  ORC_COMPILE_RESULT_OK = 0,

  ORC_COMPILE_RESULT_UNKNOWN_COMPILE = 0x100,
  ORC_COMPILE_RESULT_MISSING_RULE = 0x101,

  ORC_COMPILE_RESULT_UNKNOWN_PARSE = 0x200,
  ORC_COMPILE_RESULT_PARSE = 0x201,
  ORC_COMPILE_RESULT_VARIABLE = 0x202

} OrcCompileResult;
#endif

#define ORC_COMPILE_RESULT_IS_SUCCESSFUL(x) ((x) < 0x100)
#define ORC_COMPILE_RESULT_IS_FATAL(x) ((x) >= 0x200)

/**
 * OrcFixup:
 *
 * The OrcFixup structure has no public members
 */
struct _OrcFixup {
  /*< private >*/
  unsigned char *ptr;
  int type;
  int label;
};

/**
 * OrcCompiler:
 *
 * The OrcCompiler structure has no public members
 */
struct _OrcCompiler {
  /*< private >*/
  OrcProgram *program;
  OrcTarget *target;

  unsigned int target_flags;

  OrcInstruction insns[ORC_N_INSNS];
  int n_insns;

  OrcVariable vars[ORC_N_COMPILER_VARIABLES];
  int n_temp_vars;
  int n_dup_vars;

  unsigned char *code;
  unsigned char *codeptr;
  
  OrcConstant constants[ORC_N_CONSTANTS];
  int n_constants;

  OrcFixup fixups[ORC_N_FIXUPS];
  int n_fixups;
  unsigned char *labels[ORC_N_LABELS];
  int labels_int[ORC_N_LABELS];
  int n_labels;

  int error;
  char *error_msg;
  OrcCompileResult result;

  int valid_regs[ORC_N_REGS];
  int save_regs[ORC_N_REGS];
  int used_regs[ORC_N_REGS];
  int alloc_regs[ORC_N_REGS];

  int loop_shift;
  int long_jumps;
  int use_frame_pointer;

  char *asm_code;
  int asm_code_len;

  int is_64bit;
  int tmpreg;
  int tmpreg2;
  int exec_reg;
  int gp_tmpreg;

  int insn_index;
  int unroll_index;
  int need_mask_regs;
  int unroll_shift;

  int alloc_loop_counter;
  int allow_gp_on_stack;
  int loop_counter;
  int size_region;
  int has_iterator_opcode;

  int offset;
  int min_temp_reg;
  int max_used_temp_reg;

  int insn_shift; /* used when emitting rules */
  int max_var_size; /* size of largest var */
  int load_params;

  void *output_insns;
  int n_output_insns;
  int n_output_insns_alloc;
};


int orc_compiler_label_new (OrcCompiler *compiler);
int orc_compiler_get_constant (OrcCompiler *compiler, int size, int value);
int orc_compiler_get_constant_long (OrcCompiler *compiler, orc_uint32 a,
    orc_uint32 b, orc_uint32 c, orc_uint32 d);
int orc_compiler_try_get_constant_long (OrcCompiler *compiler, orc_uint32 a,
    orc_uint32 b, orc_uint32 c, orc_uint32 d);
int orc_compiler_get_temp_constant (OrcCompiler *compiler, int size, int value);
int orc_compiler_get_temp_reg (OrcCompiler *compiler);
int orc_compiler_get_constant_reg (OrcCompiler *compiler);
void orc_compiler_error (OrcCompiler *compiler, const char *fmt, ...);

void orc_compiler_append_code (OrcCompiler *p, const char *fmt, ...)
  ORC_GNU_PRINTF(2,3);
 
#ifdef ORC_ENABLE_UNSTABLE_API

int orc_compiler_flag_check (const char *flag);

extern int _orc_compiler_flag_backup;
extern int _orc_compiler_flag_emulate;
extern int _orc_compiler_flag_debug;
extern int _orc_compiler_flag_randomize;

#endif

ORC_END_DECLS

#endif

