#ifndef SASS_OPERATION_H
#define SASS_OPERATION_H

#include "ast_fwd_decl.hpp"

namespace Sass {

  template<typename T>
  class Operation {
  public:
    virtual T operator()(AST_Node_Ptr x)               = 0;
    virtual ~Operation()                            { }
    // statements
    virtual T operator()(Block_Ptr x)                  = 0;
    virtual T operator()(Ruleset_Ptr x)                = 0;
    virtual T operator()(Bubble_Ptr x)                 = 0;
    virtual T operator()(Trace_Ptr x)                  = 0;
    virtual T operator()(Supports_Block_Ptr x)         = 0;
    virtual T operator()(Media_Block_Ptr x)            = 0;
    virtual T operator()(At_Root_Block_Ptr x)          = 0;
    virtual T operator()(Directive_Ptr x)              = 0;
    virtual T operator()(Keyframe_Rule_Ptr x)          = 0;
    virtual T operator()(Declaration_Ptr x)            = 0;
    virtual T operator()(Assignment_Ptr x)             = 0;
    virtual T operator()(Import_Ptr x)                 = 0;
    virtual T operator()(Import_Stub_Ptr x)            = 0;
    virtual T operator()(Warning_Ptr x)                = 0;
    virtual T operator()(Error_Ptr x)                  = 0;
    virtual T operator()(Debug_Ptr x)                  = 0;
    virtual T operator()(Comment_Ptr x)                = 0;
    virtual T operator()(If_Ptr x)                     = 0;
    virtual T operator()(For_Ptr x)                    = 0;
    virtual T operator()(Each_Ptr x)                   = 0;
    virtual T operator()(While_Ptr x)                  = 0;
    virtual T operator()(Return_Ptr x)                 = 0;
    virtual T operator()(Content_Ptr x)                = 0;
    virtual T operator()(Extension_Ptr x)              = 0;
    virtual T operator()(Definition_Ptr x)             = 0;
    virtual T operator()(Mixin_Call_Ptr x)             = 0;
    // expressions
    virtual T operator()(List_Ptr x)                   = 0;
    virtual T operator()(Map_Ptr x)                    = 0;
    virtual T operator()(Function_Ptr x)               = 0;
    virtual T operator()(Binary_Expression_Ptr x)      = 0;
    virtual T operator()(Unary_Expression_Ptr x)       = 0;
    virtual T operator()(Function_Call_Ptr x)          = 0;
    virtual T operator()(Function_Call_Schema_Ptr x)   = 0;
    virtual T operator()(Custom_Warning_Ptr x)         = 0;
    virtual T operator()(Custom_Error_Ptr x)           = 0;
    virtual T operator()(Variable_Ptr x)               = 0;
    virtual T operator()(Number_Ptr x)                 = 0;
    virtual T operator()(Color_Ptr x)                  = 0;
    virtual T operator()(Boolean_Ptr x)                = 0;
    virtual T operator()(String_Schema_Ptr x)          = 0;
    virtual T operator()(String_Quoted_Ptr x)          = 0;
    virtual T operator()(String_Constant_Ptr x)        = 0;
    virtual T operator()(Supports_Condition_Ptr x)     = 0;
    virtual T operator()(Supports_Operator_Ptr x)      = 0;
    virtual T operator()(Supports_Negation_Ptr x)      = 0;
    virtual T operator()(Supports_Declaration_Ptr x)   = 0;
    virtual T operator()(Supports_Interpolation_Ptr x) = 0;
    virtual T operator()(Media_Query_Ptr x)            = 0;
    virtual T operator()(Media_Query_Expression_Ptr x) = 0;
    virtual T operator()(At_Root_Query_Ptr x)          = 0;
    virtual T operator()(Null_Ptr x)                   = 0;
    virtual T operator()(Parent_Selector_Ptr x)        = 0;
    // parameters and arguments
    virtual T operator()(Parameter_Ptr x)              = 0;
    virtual T operator()(Parameters_Ptr x)             = 0;
    virtual T operator()(Argument_Ptr x)               = 0;
    virtual T operator()(Arguments_Ptr x)              = 0;
    // selectors
    virtual T operator()(Selector_Schema_Ptr x)        = 0;
    virtual T operator()(Placeholder_Selector_Ptr x)   = 0;
    virtual T operator()(Element_Selector_Ptr x)       = 0;
    virtual T operator()(Class_Selector_Ptr x)         = 0;
    virtual T operator()(Id_Selector_Ptr x)            = 0;
    virtual T operator()(Attribute_Selector_Ptr x)     = 0;
    virtual T operator()(Pseudo_Selector_Ptr x)        = 0;
    virtual T operator()(Wrapped_Selector_Ptr x)       = 0;
    virtual T operator()(Compound_Selector_Ptr x)= 0;
    virtual T operator()(Complex_Selector_Ptr x)      = 0;
    virtual T operator()(Selector_List_Ptr x) = 0;

    template <typename U>
    T fallback(U x) { return T(); }
  };

  template <typename T, typename D>
  class Operation_CRTP : public Operation<T> {
  public:
    D& impl() { return static_cast<D&>(*this); }
  public:
    T operator()(AST_Node_Ptr x)               { return static_cast<D*>(this)->fallback(x); }
    // statements
    T operator()(Block_Ptr x)                  { return static_cast<D*>(this)->fallback(x); }
    T operator()(Ruleset_Ptr x)                { return static_cast<D*>(this)->fallback(x); }
    T operator()(Bubble_Ptr x)                 { return static_cast<D*>(this)->fallback(x); }
    T operator()(Trace_Ptr x)                  { return static_cast<D*>(this)->fallback(x); }
    T operator()(Supports_Block_Ptr x)         { return static_cast<D*>(this)->fallback(x); }
    T operator()(Media_Block_Ptr x)            { return static_cast<D*>(this)->fallback(x); }
    T operator()(At_Root_Block_Ptr x)          { return static_cast<D*>(this)->fallback(x); }
    T operator()(Directive_Ptr x)              { return static_cast<D*>(this)->fallback(x); }
    T operator()(Keyframe_Rule_Ptr x)          { return static_cast<D*>(this)->fallback(x); }
    T operator()(Declaration_Ptr x)            { return static_cast<D*>(this)->fallback(x); }
    T operator()(Assignment_Ptr x)             { return static_cast<D*>(this)->fallback(x); }
    T operator()(Import_Ptr x)                 { return static_cast<D*>(this)->fallback(x); }
    T operator()(Import_Stub_Ptr x)            { return static_cast<D*>(this)->fallback(x); }
    T operator()(Warning_Ptr x)                { return static_cast<D*>(this)->fallback(x); }
    T operator()(Error_Ptr x)                  { return static_cast<D*>(this)->fallback(x); }
    T operator()(Debug_Ptr x)                  { return static_cast<D*>(this)->fallback(x); }
    T operator()(Comment_Ptr x)                { return static_cast<D*>(this)->fallback(x); }
    T operator()(If_Ptr x)                     { return static_cast<D*>(this)->fallback(x); }
    T operator()(For_Ptr x)                    { return static_cast<D*>(this)->fallback(x); }
    T operator()(Each_Ptr x)                   { return static_cast<D*>(this)->fallback(x); }
    T operator()(While_Ptr x)                  { return static_cast<D*>(this)->fallback(x); }
    T operator()(Return_Ptr x)                 { return static_cast<D*>(this)->fallback(x); }
    T operator()(Content_Ptr x)                { return static_cast<D*>(this)->fallback(x); }
    T operator()(Extension_Ptr x)              { return static_cast<D*>(this)->fallback(x); }
    T operator()(Definition_Ptr x)             { return static_cast<D*>(this)->fallback(x); }
    T operator()(Mixin_Call_Ptr x)             { return static_cast<D*>(this)->fallback(x); }
    // expressions
    T operator()(List_Ptr x)                   { return static_cast<D*>(this)->fallback(x); }
    T operator()(Map_Ptr x)                    { return static_cast<D*>(this)->fallback(x); }
    T operator()(Function_Ptr x)               { return static_cast<D*>(this)->fallback(x); }
    T operator()(Binary_Expression_Ptr x)      { return static_cast<D*>(this)->fallback(x); }
    T operator()(Unary_Expression_Ptr x)       { return static_cast<D*>(this)->fallback(x); }
    T operator()(Function_Call_Ptr x)          { return static_cast<D*>(this)->fallback(x); }
    T operator()(Function_Call_Schema_Ptr x)   { return static_cast<D*>(this)->fallback(x); }
    T operator()(Custom_Warning_Ptr x)         { return static_cast<D*>(this)->fallback(x); }
    T operator()(Custom_Error_Ptr x)           { return static_cast<D*>(this)->fallback(x); }
    T operator()(Variable_Ptr x)               { return static_cast<D*>(this)->fallback(x); }
    T operator()(Number_Ptr x)                 { return static_cast<D*>(this)->fallback(x); }
    T operator()(Color_Ptr x)                  { return static_cast<D*>(this)->fallback(x); }
    T operator()(Boolean_Ptr x)                { return static_cast<D*>(this)->fallback(x); }
    T operator()(String_Schema_Ptr x)          { return static_cast<D*>(this)->fallback(x); }
    T operator()(String_Constant_Ptr x)        { return static_cast<D*>(this)->fallback(x); }
    T operator()(String_Quoted_Ptr x)          { return static_cast<D*>(this)->fallback(x); }
    T operator()(Supports_Condition_Ptr x)     { return static_cast<D*>(this)->fallback(x); }
    T operator()(Supports_Operator_Ptr x)      { return static_cast<D*>(this)->fallback(x); }
    T operator()(Supports_Negation_Ptr x)      { return static_cast<D*>(this)->fallback(x); }
    T operator()(Supports_Declaration_Ptr x)   { return static_cast<D*>(this)->fallback(x); }
    T operator()(Supports_Interpolation_Ptr x) { return static_cast<D*>(this)->fallback(x); }
    T operator()(Media_Query_Ptr x)            { return static_cast<D*>(this)->fallback(x); }
    T operator()(Media_Query_Expression_Ptr x) { return static_cast<D*>(this)->fallback(x); }
    T operator()(At_Root_Query_Ptr x)          { return static_cast<D*>(this)->fallback(x); }
    T operator()(Null_Ptr x)                   { return static_cast<D*>(this)->fallback(x); }
    T operator()(Parent_Selector_Ptr x)        { return static_cast<D*>(this)->fallback(x); }
    // parameters and arguments
    T operator()(Parameter_Ptr x)              { return static_cast<D*>(this)->fallback(x); }
    T operator()(Parameters_Ptr x)             { return static_cast<D*>(this)->fallback(x); }
    T operator()(Argument_Ptr x)               { return static_cast<D*>(this)->fallback(x); }
    T operator()(Arguments_Ptr x)              { return static_cast<D*>(this)->fallback(x); }
    // selectors
    T operator()(Selector_Schema_Ptr x)        { return static_cast<D*>(this)->fallback(x); }
    T operator()(Placeholder_Selector_Ptr x)   { return static_cast<D*>(this)->fallback(x); }
    T operator()(Element_Selector_Ptr x)       { return static_cast<D*>(this)->fallback(x); }
    T operator()(Class_Selector_Ptr x)         { return static_cast<D*>(this)->fallback(x); }
    T operator()(Id_Selector_Ptr x)            { return static_cast<D*>(this)->fallback(x); }
    T operator()(Attribute_Selector_Ptr x)     { return static_cast<D*>(this)->fallback(x); }
    T operator()(Pseudo_Selector_Ptr x)        { return static_cast<D*>(this)->fallback(x); }
    T operator()(Wrapped_Selector_Ptr x)       { return static_cast<D*>(this)->fallback(x); }
    T operator()(Compound_Selector_Ptr x){ return static_cast<D*>(this)->fallback(x); }
    T operator()(Complex_Selector_Ptr x)      { return static_cast<D*>(this)->fallback(x); }
    T operator()(Selector_List_Ptr x) { return static_cast<D*>(this)->fallback(x); }

    template <typename U>
    T fallback(U x)                         { return T(); }
  };

}

#endif
