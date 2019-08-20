
#ifndef _ORC_ONCE_H_
#define _ORC_ONCE_H_

#include <orc/orcutils.h>

ORC_BEGIN_DECLS

typedef struct _OrcMutex OrcMutex;

typedef struct _OrcOnce OrcOnce;

struct _OrcOnce {
  int inited;
  void *value;
};

void orc_once_mutex_lock (void);
void orc_once_mutex_unlock (void);

ORC_END_DECLS

#endif

