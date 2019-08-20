/*************************************************
*       Perl-Compatible Regular Expressions      *
*************************************************/

#ifndef _PCREPOSIX_H
#define _PCREPOSIX_H

/* This is the header for the POSIX wrapper interface to the PCRE Perl-
Compatible Regular Expression library. It defines the things POSIX says should
be there. I hope.

            Copyright (c) 1997-2012 University of Cambridge

-----------------------------------------------------------------------------
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

    * Neither the name of the University of Cambridge nor the names of its
      contributors may be used to endorse or promote products derived from
      this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
-----------------------------------------------------------------------------
*/

/* Have to include stdlib.h in order to ensure that size_t is defined. */

#include <stdlib.h>

/* Allow for C++ users */

#ifdef __cplusplus
extern "C" {
#endif

/* Options, mostly defined by POSIX, but with some extras. */

#define REG_ICASE     0x0001   /* Maps to PCRE_CASELESS */
#define REG_NEWLINE   0x0002   /* Maps to PCRE_MULTILINE */
#define REG_NOTBOL    0x0004   /* Maps to PCRE_NOTBOL */
#define REG_NOTEOL    0x0008   /* Maps to PCRE_NOTEOL */
#define REG_DOTALL    0x0010   /* NOT defined by POSIX; maps to PCRE_DOTALL */
#define REG_NOSUB     0x0020   /* Maps to PCRE_NO_AUTO_CAPTURE */
#define REG_UTF8      0x0040   /* NOT defined by POSIX; maps to PCRE_UTF8 */
#define REG_STARTEND  0x0080   /* BSD feature: pass subject string by so,eo */
#define REG_NOTEMPTY  0x0100   /* NOT defined by POSIX; maps to PCRE_NOTEMPTY */
#define REG_UNGREEDY  0x0200   /* NOT defined by POSIX; maps to PCRE_UNGREEDY */
#define REG_UCP       0x0400   /* NOT defined by POSIX; maps to PCRE_UCP */

/* This is not used by PCRE, but by defining it we make it easier
to slot PCRE into existing programs that make POSIX calls. */

#define REG_EXTENDED  0

/* Error values. Not all these are relevant or used by the wrapper. */

enum {
  REG_ASSERT = 1,  /* internal error ? */
  REG_BADBR,       /* invalid repeat counts in {} */
  REG_BADPAT,      /* pattern error */
  REG_BADRPT,      /* ? * + invalid */
  REG_EBRACE,      /* unbalanced {} */
  REG_EBRACK,      /* unbalanced [] */
  REG_ECOLLATE,    /* collation error - not relevant */
  REG_ECTYPE,      /* bad class */
  REG_EESCAPE,     /* bad escape sequence */
  REG_EMPTY,       /* empty expression */
  REG_EPAREN,      /* unbalanced () */
  REG_ERANGE,      /* bad range inside [] */
  REG_ESIZE,       /* expression too big */
  REG_ESPACE,      /* failed to get memory */
  REG_ESUBREG,     /* bad back reference */
  REG_INVARG,      /* bad argument */
  REG_NOMATCH      /* match failed */
};


/* The structure representing a compiled regular expression. */

typedef struct {
  void *re_pcre;
  size_t re_nsub;
  size_t re_erroffset;
} regex_t;

/* The structure in which a captured offset is returned. */

typedef int regoff_t;

typedef struct {
  regoff_t rm_so;
  regoff_t rm_eo;
} regmatch_t;

/* When an application links to a PCRE DLL in Windows, the symbols that are
imported have to be identified as such. When building PCRE, the appropriate
export settings are needed, and are set in pcreposix.c before including this
file. */

#if defined(_WIN32) && !defined(PCRE_STATIC) && !defined(PCREPOSIX_EXP_DECL)
#  define PCREPOSIX_EXP_DECL  extern __declspec(dllimport)
#  define PCREPOSIX_EXP_DEFN  __declspec(dllimport)
#endif

/* By default, we use the standard "extern" declarations. */

#ifndef PCREPOSIX_EXP_DECL
#  ifdef __cplusplus
#    define PCREPOSIX_EXP_DECL  extern "C"
#    define PCREPOSIX_EXP_DEFN  extern "C"
#  else
#    define PCREPOSIX_EXP_DECL  extern
#    define PCREPOSIX_EXP_DEFN  extern
#  endif
#endif

/* The functions */

PCREPOSIX_EXP_DECL int regcomp(regex_t *, const char *, int);
PCREPOSIX_EXP_DECL int regexec(const regex_t *, const char *, size_t,
                     regmatch_t *, int);
PCREPOSIX_EXP_DECL size_t regerror(int, const regex_t *, char *, size_t);
PCREPOSIX_EXP_DECL void regfree(regex_t *);

#ifdef __cplusplus
}   /* extern "C" */
#endif

#endif /* End of pcreposix.h */
