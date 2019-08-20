#ifndef SASS_BACKTRACE_H
#define SASS_BACKTRACE_H

#include <vector>
#include <sstream>
#include "file.hpp"
#include "position.hpp"

namespace Sass {

  struct Backtrace {

    ParserState pstate;
    std::string caller;

    Backtrace(ParserState pstate, std::string c = "")
    : pstate(pstate),
      caller(c)
    { }

  };

  typedef std::vector<Backtrace> Backtraces;

  const std::string traces_to_string(Backtraces traces, std::string indent = "\t");

}

#endif
