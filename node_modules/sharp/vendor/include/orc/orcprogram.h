
#ifndef _ORC_PROGRAM_H_
#define _ORC_PROGRAM_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>
#include <orc/orcexecutor.h>
#include <orc/orccode.h>
#include <orc/orcbytecode.h>
#include <orc/orccompiler.h>
#include <orc/orctarget.h>
#include <orc/orcrule.h>

ORC_BEGIN_DECLS


#define ORC_PROGRAM_ERROR(program, ...) do { \
  program->error = TRUE; \
  orc_debug_print(ORC_DEBUG_WARNING, __FILE__, ORC_FUNCTION, __LINE__, __VA_ARGS__); \
} while (0)

/**
 * OrcProgram:
 *
 * The OrcProgram structure has no public members
 */
struct _OrcProgram {
  /*< private >*/
  struct {
    OrcStaticOpcode *opcode;
    int dest_args[ORC_STATIC_OPCODE_N_DEST];
    int src_args[ORC_STATIC_OPCODE_N_SRC];

    OrcRule *rule;
  } _unused[ORC_N_INSNS]; /* needed for ABI compatibility */
  int n_insns;

  struct {
    char *name;
    char *type_name;

    int size;
    OrcVarType vartype;

    int used;
    int first_use;
    int last_use;
    int replaced;
    int replacement;

    int alloc;
    int is_chained;
    int is_aligned;
    int is_uncached;

    int value;

    int ptr_register;
    int ptr_offset;
    int mask_alloc;
    int aligned_data;
    int param_type;
    int load_dest;
  } _unused3[ORC_N_VARIABLES]; /* needed for ABI compatibility */

  int n_src_vars;
  int n_dest_vars;
  int n_param_vars;
  int n_const_vars;
  int n_temp_vars;
  int n_accum_vars;

  char *name;
  char *asm_code;

  unsigned char *_unused2;
  /* The offset of code_exec in this structure is part of the ABI */
  void *code_exec;

  OrcInstruction insns[ORC_N_INSNS];
  OrcVariable vars[ORC_N_VARIABLES];

  void *backup_func;
  char *backup_name;
  int is_2d;
  int constant_n;
  int n_multiple;
  int n_minimum;
  int n_maximum;
  int constant_m;

  OrcCode *orccode;

  /* Hide this here.  Belongs in a Parser object */
  char *init_function;
  char *error_msg;
  unsigned int current_line;
};

#define ORC_SRC_ARG(p,i,n) ((p)->vars[(i)->src_args[(n)]].alloc)
#define ORC_DEST_ARG(p,i,n) ((p)->vars[(i)->dest_args[(n)]].alloc)
#define ORC_SRC_TYPE(p,i,n) ((p)->vars[(i)->src_args[(n)]].vartype)
#define ORC_DEST_TYPE(p,i,n) ((p)->vars[(i)->dest_args[(n)]].vartype)
#define ORC_SRC_VAL(p,insn,n) ((p)->vars[(insn)->src_args[(n)]].value.i)
#define ORC_DEST_VAL(p,insn,n) ((p)->vars[(insn)->dest_args[(n)]].value.i)


void orc_init (void);

OrcProgram * orc_program_new (void);
OrcProgram * orc_program_new_ds (int size1, int size2);
OrcProgram * orc_program_new_dss (int size1, int size2, int size3);
OrcProgram * orc_program_new_as (int size1, int size2);
OrcProgram * orc_program_new_ass (int size1, int size2, int size3);
OrcProgram * orc_program_new_from_static_bytecode (const orc_uint8 *bytecode);

const char * orc_program_get_name (OrcProgram *program);
void orc_program_set_name (OrcProgram *program, const char *name);
void orc_program_set_line (OrcProgram *program, unsigned int line);
void orc_program_set_2d (OrcProgram *program);
void orc_program_set_constant_n (OrcProgram *program, int n);
void orc_program_set_n_multiple (OrcProgram *ex, int n);
void orc_program_set_n_minimum (OrcProgram *ex, int n);
void orc_program_set_n_maximum (OrcProgram *ex, int n);
void orc_program_set_constant_m (OrcProgram *program, int m);

void orc_program_append (OrcProgram *p, const char *opcode, int arg0, int arg1, int arg2);
void orc_program_append_2 (OrcProgram *program, const char *name,
    unsigned int flags, int arg0, int arg1, int arg2, int arg3);
void orc_program_append_str (OrcProgram *p, const char *opcode,
    const char * arg0, const char * arg1, const char * arg2);
void orc_program_append_str_2 (OrcProgram *program, const char *name,
    unsigned int flags, const char *arg1, const char *arg2, const char *arg3,
    const char *arg4);
void orc_program_append_ds (OrcProgram *program, const char *opcode, int arg0,
    int arg1);
void orc_program_append_ds_str (OrcProgram *p, const char *opcode,
    const char * arg0, const char * arg1);
void orc_program_append_dds_str (OrcProgram *program, const char *name,
    const char *arg1, const char *arg2, const char *arg3);

OrcCompileResult orc_program_compile (OrcProgram *p);
OrcCompileResult orc_program_compile_for_target (OrcProgram *p, OrcTarget *target);
OrcCompileResult orc_program_compile_full (OrcProgram *p, OrcTarget *target,
    unsigned int flags);
void orc_program_set_backup_function (OrcProgram *p, OrcExecutorFunc func);
void orc_program_set_backup_name (OrcProgram *p, const char *name);
void orc_program_free (OrcProgram *program);

int orc_program_find_var_by_name (OrcProgram *program, const char *name);

int orc_program_add_temporary (OrcProgram *program, int size, const char *name);
int orc_program_dup_temporary (OrcProgram *program, int i, int j);
int orc_program_add_source (OrcProgram *program, int size, const char *name);
int orc_program_add_source_full (OrcProgram *program, int size, const char *name,
    const char *type_name, int alignment);
int orc_program_add_destination (OrcProgram *program, int size, const char *name);
int orc_program_add_destination_full (OrcProgram *program, int size, const char *name,
    const char *type_name, int alignment);
int orc_program_add_constant (OrcProgram *program, int size, int value, const char *name);
int orc_program_add_constant_int64 (OrcProgram *program, int size, orc_int64 value, const char *name);
int orc_program_add_constant_float (OrcProgram *program, int size, float value, const char *name);
int orc_program_add_constant_double (OrcProgram *program, int size, double value, const char *name);
int orc_program_add_constant_str (OrcProgram *program, int size, const char *value, const char *name);
int orc_program_add_parameter (OrcProgram *program, int size, const char *name);
int orc_program_add_parameter_float (OrcProgram *program, int size, const char *name);
int orc_program_add_parameter_double (OrcProgram *program, int size, const char *name);
int orc_program_add_parameter_int64 (OrcProgram *program, int size, const char *name);
int orc_program_add_accumulator (OrcProgram *program, int size, const char *name);
void orc_program_set_type_name (OrcProgram *program, int var, const char *type_name);
void orc_program_set_var_alignment (OrcProgram *program, int var, int alignment);
void orc_program_set_sampling_type (OrcProgram *program, int var, int sampling_type);

int orc_program_allocate_register (OrcProgram *program, int is_data);

void orc_program_reset (OrcProgram *program);
OrcCode *orc_program_take_code (OrcProgram *program);

const char *orc_program_get_asm_code (OrcProgram *program);
const char * orc_program_get_error (OrcProgram *program);
void orc_program_set_error (OrcProgram *program, const char *error);

int orc_program_get_max_array_size (OrcProgram *program);
int orc_program_get_max_accumulator_size (OrcProgram *program);


ORC_END_DECLS

#endif

