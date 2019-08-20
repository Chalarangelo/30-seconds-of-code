
#ifndef _ORC_RANDOM_H_
#define _ORC_RANDOM_H_

#include <orc/orcutils.h>

ORC_BEGIN_DECLS

typedef struct _OrcRandomContext OrcRandomContext;
struct _OrcRandomContext {
  unsigned int x;
};

void orc_random_init (OrcRandomContext *context, int seed);
void orc_random_bits (OrcRandomContext *context, void *data, int n_bytes);
void orc_random_floats (OrcRandomContext *context, float *data, int n);
unsigned int orc_random (OrcRandomContext *context);

ORC_END_DECLS

#endif

