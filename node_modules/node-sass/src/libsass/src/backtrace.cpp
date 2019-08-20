#include "backtrace.hpp"

namespace Sass {

  const std::string traces_to_string(Backtraces traces, std::string indent) {

    std::stringstream ss;
    std::string cwd(File::get_cwd());

    bool first = true;
    size_t i_beg = traces.size() - 1;
    size_t i_end = std::string::npos;
    for (size_t i = i_beg; i != i_end; i --) {

      const Backtrace& trace = traces[i];

      // make path relative to the current directory
      std::string rel_path(File::abs2rel(trace.pstate.path, cwd, cwd));

      // skip functions on error cases (unsure why ruby sass does this)
      // if (trace.caller.substr(0, 6) == ", in f") continue;

      if (first) {
        ss << indent;
        ss << "on line ";
        ss << trace.pstate.line + 1;
        ss << " of " << rel_path;
        // ss << trace.caller;
        first = false;
      } else {
        ss << trace.caller;
        ss << std::endl;
        ss << indent;
        ss << "from line ";
        ss << trace.pstate.line + 1;
        ss << " of " << rel_path;
      }

    }

    ss << std::endl;
    return ss.str();

  }

};
