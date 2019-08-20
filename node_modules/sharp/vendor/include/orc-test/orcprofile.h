/*
 * Orc - Oil Runtime Compiler
 * Copyright (c) 2003,2004 David A. Schleef <ds@schleef.org>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef _ORC_PROFILE_H_
#define _ORC_PROFILE_H_

#include <orc/orcutils.h>

ORC_BEGIN_DECLS

/**
 * ORC_PROFILE_HIST_LENGTH
 *
 * Internal definition of the number of histogram entries in #OrcProfile.
 */
#define ORC_PROFILE_HIST_LENGTH 10

typedef struct _OrcProfile OrcProfile;
/**
 * OrcProfile:
 *
 * An opaque structure representing profiling information.
 */
struct _OrcProfile {
  /*< private >*/
  unsigned long start;
  unsigned long stop;
  unsigned long min;
  unsigned long last;
  unsigned long total;
  int n;

  int hist_n;
  unsigned long hist_time[ORC_PROFILE_HIST_LENGTH];
  int hist_count[ORC_PROFILE_HIST_LENGTH];
};

unsigned long orc_profile_stamp(void);
void orc_profile_init(OrcProfile *prof);
void orc_profile_stop_handle(OrcProfile *prof);
void orc_profile_get_ave_std (OrcProfile *prof, double *ave_p, double *std_p);

/**
 * orc_profile_start:
 * @x: a pointer to an OrcProfile structure
 *
 * Starts a profiling run by obtaining a timestamp via orc_profile_stamp()
 * and writing it into @x.
 */
#define orc_profile_start(x) do{ \
	(x)->start = orc_profile_stamp(); \
}while(0)
/**
 * orc_profile_stop:
 * @x: a pointer to an OrcProfile structure
 *
 * Stops a profiling run by obtaining a timestamp via orc_profile_stamp()
 * and writing it into @x.  It then calls orc_profile_stop_handle() to
 * handle post-processing of the profiling run.
 */
#define orc_profile_stop(x) do{ \
	(x)->stop = orc_profile_stamp(); \
        orc_profile_stop_handle(x); \
}while(0)


ORC_END_DECLS

#endif

