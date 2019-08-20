#ifndef SASS_OUTPUT_H
#define SASS_OUTPUT_H

#include <string>
#include <vector>

#include "util.hpp"
#include "inspect.hpp"
#include "operation.hpp"

namespace Sass {
  class Context;

  // Refactor to make it generic to find linefeed (look behind)
  inline bool ends_with(std::string const & value, std::string const & ending)
  {
    if (ending.size() > value.size()) return false;
    return std::equal(ending.rbegin(), ending.rend(), value.rbegin());
  }

  class Output : public Inspect {
  protected:
    using Inspect::operator();

  public:
    Output(Sass_Output_Options& opt);
    virtual ~Output();

  protected:
    std::string charset;
    std::vector<AST_Node_Ptr> top_nodes;

  public:
    OutputBuffer get_buffer(void);

    virtual void operator()(Map_Ptr);
    virtual void operator()(Ruleset_Ptr);
    virtual void operator()(Supports_Block_Ptr);
    virtual void operator()(Media_Block_Ptr);
    virtual void operator()(Directive_Ptr);
    virtual void operator()(Keyframe_Rule_Ptr);
    virtual void operator()(Import_Ptr);
    virtual void operator()(Comment_Ptr);
    virtual void operator()(Number_Ptr);
    virtual void operator()(String_Quoted_Ptr);
    virtual void operator()(String_Constant_Ptr);

    void fallback_impl(AST_Node_Ptr n);

  };

}

#endif
