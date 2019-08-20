#ifndef SASS_INSPECT_H
#define SASS_INSPECT_H

#include "position.hpp"
#include "operation.hpp"
#include "emitter.hpp"

namespace Sass {
  class Context;

  class Inspect : public Operation_CRTP<void, Inspect>, public Emitter {
  protected:
    // import all the class-specific methods and override as desired
    using Operation_CRTP<void, Inspect>::operator();

    void fallback_impl(AST_Node_Ptr n);

  public:

    Inspect(const Emitter& emi);
    virtual ~Inspect();

    // statements
    virtual void operator()(Block_Ptr);
    virtual void operator()(Ruleset_Ptr);
    virtual void operator()(Bubble_Ptr);
    virtual void operator()(Supports_Block_Ptr);
    virtual void operator()(Media_Block_Ptr);
    virtual void operator()(At_Root_Block_Ptr);
    virtual void operator()(Directive_Ptr);
    virtual void operator()(Keyframe_Rule_Ptr);
    virtual void operator()(Declaration_Ptr);
    virtual void operator()(Assignment_Ptr);
    virtual void operator()(Import_Ptr);
    virtual void operator()(Import_Stub_Ptr);
    virtual void operator()(Warning_Ptr);
    virtual void operator()(Error_Ptr);
    virtual void operator()(Debug_Ptr);
    virtual void operator()(Comment_Ptr);
    virtual void operator()(If_Ptr);
    virtual void operator()(For_Ptr);
    virtual void operator()(Each_Ptr);
    virtual void operator()(While_Ptr);
    virtual void operator()(Return_Ptr);
    virtual void operator()(Extension_Ptr);
    virtual void operator()(Definition_Ptr);
    virtual void operator()(Mixin_Call_Ptr);
    virtual void operator()(Content_Ptr);
    // expressions
    virtual void operator()(Map_Ptr);
    virtual void operator()(Function_Ptr);
    virtual void operator()(List_Ptr);
    virtual void operator()(Binary_Expression_Ptr);
    virtual void operator()(Unary_Expression_Ptr);
    virtual void operator()(Function_Call_Ptr);
    virtual void operator()(Function_Call_Schema_Ptr);
    // virtual void operator()(Custom_Warning_Ptr);
    // virtual void operator()(Custom_Error_Ptr);
    virtual void operator()(Variable_Ptr);
    virtual void operator()(Number_Ptr);
    virtual void operator()(Color_Ptr);
    virtual void operator()(Boolean_Ptr);
    virtual void operator()(String_Schema_Ptr);
    virtual void operator()(String_Constant_Ptr);
    virtual void operator()(String_Quoted_Ptr);
    virtual void operator()(Custom_Error_Ptr);
    virtual void operator()(Custom_Warning_Ptr);
    virtual void operator()(Supports_Operator_Ptr);
    virtual void operator()(Supports_Negation_Ptr);
    virtual void operator()(Supports_Declaration_Ptr);
    virtual void operator()(Supports_Interpolation_Ptr);
    virtual void operator()(Media_Query_Ptr);
    virtual void operator()(Media_Query_Expression_Ptr);
    virtual void operator()(At_Root_Query_Ptr);
    virtual void operator()(Null_Ptr);
    virtual void operator()(Parent_Selector_Ptr p);
    // parameters and arguments
    virtual void operator()(Parameter_Ptr);
    virtual void operator()(Parameters_Ptr);
    virtual void operator()(Argument_Ptr);
    virtual void operator()(Arguments_Ptr);
    // selectors
    virtual void operator()(Selector_Schema_Ptr);
    virtual void operator()(Placeholder_Selector_Ptr);
    virtual void operator()(Element_Selector_Ptr);
    virtual void operator()(Class_Selector_Ptr);
    virtual void operator()(Id_Selector_Ptr);
    virtual void operator()(Attribute_Selector_Ptr);
    virtual void operator()(Pseudo_Selector_Ptr);
    virtual void operator()(Wrapped_Selector_Ptr);
    virtual void operator()(Compound_Selector_Ptr);
    virtual void operator()(Complex_Selector_Ptr);
    virtual void operator()(Selector_List_Ptr);

    virtual std::string lbracket(List_Ptr);
    virtual std::string rbracket(List_Ptr);

    // template <typename U>
    // void fallback(U x) { fallback_impl(reinterpret_cast<AST_Node_Ptr>(x)); }
  };

}
#endif
