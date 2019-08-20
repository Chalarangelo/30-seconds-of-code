
#ifndef _ORC_EXECUTOR_H_
#define _ORC_EXECUTOR_H_

#include <orc/orcutils.h>
#include <orc/orclimits.h>

ORC_BEGIN_DECLS



typedef struct _OrcOpcodeExecutor OrcOpcodeExecutor;
typedef struct _OrcExecutor OrcExecutor;
typedef struct _OrcExecutorAlt OrcExecutorAlt;

typedef void (*OrcOpcodeEmulateFunc)(OrcOpcodeExecutor *ex, void *user);
typedef void (*OrcOpcodeEmulateNFunc)(OrcOpcodeExecutor *ex, int index, int n);
typedef void (*OrcOpcodeEmulate16Func)(OrcOpcodeExecutor *ex);
typedef void (*OrcExecutorFunc)(OrcExecutor *ex);

/**
 * OrcOpcodeExecutor:
 *
 * The OrcOpcodeExecutor structure has no public members
 */
struct _OrcOpcodeExecutor {
  /*< private >*/
  int src_values[ORC_STATIC_OPCODE_N_SRC];
  int dest_values[ORC_STATIC_OPCODE_N_DEST];

  OrcOpcodeEmulateNFunc emulateN;

  void *src_ptrs[ORC_STATIC_OPCODE_N_SRC];
  void *dest_ptrs[ORC_STATIC_OPCODE_N_DEST];
  int shift;
};

/**
 * OrcExecutor:
 *
 */
struct _OrcExecutor {
  /*< private >*/
  OrcProgram *program;
  int n;
  int counter1;
  int counter2;
  int counter3;

  void *arrays[ORC_N_VARIABLES];
  int params[ORC_N_VARIABLES];
  int accumulators[4];
  /* exec pointer is stored in arrays[ORC_VAR_A1] */
  /* OrcCode pointer is stored in arrays[ORC_VAR_A2] */
  /* row pointers are stored in arrays[i+ORC_VAR_C1] */
  /* the stride for arrays[x] is stored in params[x] */
  /* m is stored in params[ORC_VAR_A1] */
  /* m_index is stored in params[ORC_VAR_A2] */
  /* elapsed time is stored in params[ORC_VAR_A3] */
  /* high half of params is stored in params[ORC_VAR_T1..] */
};

/* the alternate view of OrcExecutor */
struct _OrcExecutorAlt {
  /*< private >*/
  OrcProgram *program;
  int n;
  int counter1;
  int counter2;
  int counter3;

  void *arrays[ORC_N_ARRAYS];
  OrcExecutorFunc exec;
  OrcCode *code;
  void *unused1[ORC_N_VARIABLES - ORC_N_ARRAYS - 2];
  int strides[ORC_N_ARRAYS];
  int m;
  int m_index;
  int time;
  int unused2;
  int unused4[8];
  int params[ORC_VAR_T1-ORC_VAR_P1];
  int params_hi[ORC_VAR_T1-ORC_VAR_P1];
  int unused3[ORC_N_VARIABLES - ORC_VAR_T9];
  int accumulators[4];
};
#define ORC_EXECUTOR_EXEC(ex) ((OrcExecutorFunc)((ex)->arrays[ORC_VAR_A1]))
#define ORC_EXECUTOR_M(ex) ((ex)->params[ORC_VAR_A1])
#define ORC_EXECUTOR_M_INDEX(ex) ((ex)->params[ORC_VAR_A2])
#define ORC_EXECUTOR_TIME(ex) ((ex)->params[ORC_VAR_A3])




OrcExecutor * orc_executor_new (OrcProgram *program);
void orc_executor_free (OrcExecutor *ex);
void orc_executor_set_program (OrcExecutor *ex, OrcProgram *program);
void orc_executor_set_array (OrcExecutor *ex, int var, void *ptr);
void orc_executor_set_stride (OrcExecutor *ex, int var, int stride);
void orc_executor_set_array_str (OrcExecutor *ex, const char *name, void *ptr);
void orc_executor_set_param (OrcExecutor *ex, int var, int value);
void orc_executor_set_param_str (OrcExecutor *ex, const char *name, int value);
void orc_executor_set_param_float (OrcExecutor *ex, int var, float value);
void orc_executor_set_param_int64 (OrcExecutor *ex, int var, orc_int64 value);
void orc_executor_set_param_double (OrcExecutor *ex, int var, double value);
int orc_executor_get_accumulator (OrcExecutor *ex, int var);
int orc_executor_get_accumulator_str (OrcExecutor *ex, const char *name);
void orc_executor_set_n (OrcExecutor *ex, int n);
void orc_executor_set_m (OrcExecutor *ex, int m);
void orc_executor_emulate (OrcExecutor *ex);
void orc_executor_run (OrcExecutor *ex);
void orc_executor_run_backup (OrcExecutor *ex);


ORC_END_DECLS

#endif

