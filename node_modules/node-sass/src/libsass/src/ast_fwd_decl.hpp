#ifndef SASS_AST_FWD_DECL_H
#define SASS_AST_FWD_DECL_H

#include <map>
#include <set>
#include <deque>
#include <vector>
#include <typeinfo>
#include <iostream>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include "memory/SharedPtr.hpp"
#include "sass/functions.h"

/////////////////////////////////////////////
// Forward declarations for the AST visitors.
/////////////////////////////////////////////
namespace Sass {

  class AST_Node;
  typedef AST_Node* AST_Node_Ptr;
  typedef AST_Node const* AST_Node_Ptr_Const;

  class Has_Block;
  typedef Has_Block* Has_Block_Ptr;
  typedef Has_Block const* Has_Block_Ptr_Const;

  class Simple_Selector;
  typedef Simple_Selector* Simple_Selector_Ptr;
  typedef Simple_Selector const* Simple_Selector_Ptr_Const;

  class PreValue;
  typedef PreValue* PreValue_Ptr;
  typedef PreValue const* PreValue_Ptr_Const;
  class Thunk;
  typedef Thunk* Thunk_Ptr;
  typedef Thunk const* Thunk_Ptr_Const;
  class Block;
  typedef Block* Block_Ptr;
  typedef Block const* Block_Ptr_Const;
  class Expression;
  typedef Expression* Expression_Ptr;
  typedef Expression const* Expression_Ptr_Const;
  class Statement;
  typedef Statement* Statement_Ptr;
  typedef Statement const* Statement_Ptr_Const;
  class Value;
  typedef Value* Value_Ptr;
  typedef Value const* Value_Ptr_Const;
  class Declaration;
  typedef Declaration* Declaration_Ptr;
  typedef Declaration const* Declaration_Ptr_Const;
  class Ruleset;
  typedef Ruleset* Ruleset_Ptr;
  typedef Ruleset const* Ruleset_Ptr_Const;
  class Bubble;
  typedef Bubble* Bubble_Ptr;
  typedef Bubble const* Bubble_Ptr_Const;
  class Trace;
  typedef Trace* Trace_Ptr;
  typedef Trace const* Trace_Ptr_Const;

  class Media_Block;
  typedef Media_Block* Media_Block_Ptr;
  typedef Media_Block const* Media_Block_Ptr_Const;
  class Supports_Block;
  typedef Supports_Block* Supports_Block_Ptr;
  typedef Supports_Block const* Supports_Block_Ptr_Const;
  class Directive;
  typedef Directive* Directive_Ptr;
  typedef Directive const* Directive_Ptr_Const;


  class Keyframe_Rule;
  typedef Keyframe_Rule* Keyframe_Rule_Ptr;
  typedef Keyframe_Rule const* Keyframe_Rule_Ptr_Const;
  class At_Root_Block;
  typedef At_Root_Block* At_Root_Block_Ptr;
  typedef At_Root_Block const* At_Root_Block_Ptr_Const;
  class Assignment;
  typedef Assignment* Assignment_Ptr;
  typedef Assignment const* Assignment_Ptr_Const;

  class Import;
  typedef Import* Import_Ptr;
  typedef Import const* Import_Ptr_Const;
  class Import_Stub;
  typedef Import_Stub* Import_Stub_Ptr;
  typedef Import_Stub const* Import_Stub_Ptr_Const;
  class Warning;
  typedef Warning* Warning_Ptr;
  typedef Warning const* Warning_Ptr_Const;

  class Error;
  typedef Error* Error_Ptr;
  typedef Error const* Error_Ptr_Const;
  class Debug;
  typedef Debug* Debug_Ptr;
  typedef Debug const* Debug_Ptr_Const;
  class Comment;
  typedef Comment* Comment_Ptr;
  typedef Comment const* Comment_Ptr_Const;

  class If;
  typedef If* If_Ptr;
  typedef If const* If_Ptr_Const;
  class For;
  typedef For* For_Ptr;
  typedef For const* For_Ptr_Const;
  class Each;
  typedef Each* Each_Ptr;
  typedef Each const* Each_Ptr_Const;
  class While;
  typedef While* While_Ptr;
  typedef While const* While_Ptr_Const;
  class Return;
  typedef Return* Return_Ptr;
  typedef Return const* Return_Ptr_Const;
  class Content;
  typedef Content* Content_Ptr;
  typedef Content const* Content_Ptr_Const;
  class Extension;
  typedef Extension* Extension_Ptr;
  typedef Extension const* Extension_Ptr_Const;
  class Definition;
  typedef Definition* Definition_Ptr;
  typedef Definition const* Definition_Ptr_Const;

  class List;
  typedef List* List_Ptr;
  typedef List const* List_Ptr_Const;
  class Map;
  typedef Map* Map_Ptr;
  typedef Map const* Map_Ptr_Const;
  class Function;
  typedef Function* Function_Ptr;
  typedef Function const* Function_Ptr_Const;

  class Mixin_Call;
  typedef Mixin_Call* Mixin_Call_Ptr;
  typedef Mixin_Call const* Mixin_Call_Ptr_Const;
  class Binary_Expression;
  typedef Binary_Expression* Binary_Expression_Ptr;
  typedef Binary_Expression const* Binary_Expression_Ptr_Const;
  class Unary_Expression;
  typedef Unary_Expression* Unary_Expression_Ptr;
  typedef Unary_Expression const* Unary_Expression_Ptr_Const;
  class Function_Call;
  typedef Function_Call* Function_Call_Ptr;
  typedef Function_Call const* Function_Call_Ptr_Const;
  class Function_Call_Schema;
  typedef Function_Call_Schema* Function_Call_Schema_Ptr;
  typedef Function_Call_Schema const* Function_Call_Schema_Ptr_Const;
  class Custom_Warning;
  typedef Custom_Warning* Custom_Warning_Ptr;
  typedef Custom_Warning const* Custom_Warning_Ptr_Const;
  class Custom_Error;
  typedef Custom_Error* Custom_Error_Ptr;
  typedef Custom_Error const* Custom_Error_Ptr_Const;

  class Variable;
  typedef Variable* Variable_Ptr;
  typedef Variable const* Variable_Ptr_Const;
  class Number;
  typedef Number* Number_Ptr;
  typedef Number const* Number_Ptr_Const;
  class Color;
  typedef Color* Color_Ptr;
  typedef Color const* Color_Ptr_Const;
  class Boolean;
  typedef Boolean* Boolean_Ptr;
  typedef Boolean const* Boolean_Ptr_Const;
  class String;
  typedef String* String_Ptr;
  typedef String const* String_Ptr_Const;

  class String_Schema;
  typedef String_Schema* String_Schema_Ptr;
  typedef String_Schema const* String_Schema_Ptr_Const;
  class String_Constant;
  typedef String_Constant* String_Constant_Ptr;
  typedef String_Constant const* String_Constant_Ptr_Const;
  class String_Quoted;
  typedef String_Quoted* String_Quoted_Ptr;
  typedef String_Quoted const* String_Quoted_Ptr_Const;

  class Media_Query;
  typedef Media_Query* Media_Query_Ptr;
  typedef Media_Query const* Media_Query_Ptr_Const;
  class Media_Query_Expression;
  typedef Media_Query_Expression* Media_Query_Expression_Ptr;
  typedef Media_Query_Expression const* Media_Query_Expression_Ptr_Const;
  class Supports_Condition;
  typedef Supports_Condition* Supports_Condition_Ptr;
  typedef Supports_Condition const* Supports_Condition_Ptr_Const;
  class Supports_Operator;
  typedef Supports_Operator* Supports_Operator_Ptr;
  typedef Supports_Operator const* Supports_Operator_Ptr_Const;
  class Supports_Negation;
  typedef Supports_Negation* Supports_Negation_Ptr;
  typedef Supports_Negation const* Supports_Negation_Ptr_Const;
  class Supports_Declaration;
  typedef Supports_Declaration* Supports_Declaration_Ptr;
  typedef Supports_Declaration const* Supports_Declaration_Ptr_Const;
  class Supports_Interpolation;
  typedef Supports_Interpolation* Supports_Interpolation_Ptr;
  typedef Supports_Interpolation const* Supports_Interpolation_Ptr_Const;


  class Null;
  typedef Null* Null_Ptr;
  typedef Null const* Null_Ptr_Const;

  class At_Root_Query;
  typedef At_Root_Query* At_Root_Query_Ptr;
  typedef At_Root_Query const* At_Root_Query_Ptr_Const;
  class Parent_Selector;
  typedef Parent_Selector* Parent_Selector_Ptr;
  typedef Parent_Selector const* Parent_Selector_Ptr_Const;
  class Parameter;
  typedef Parameter* Parameter_Ptr;
  typedef Parameter const* Parameter_Ptr_Const;
  class Parameters;
  typedef Parameters* Parameters_Ptr;
  typedef Parameters const* Parameters_Ptr_Const;
  class Argument;
  typedef Argument* Argument_Ptr;
  typedef Argument const* Argument_Ptr_Const;
  class Arguments;
  typedef Arguments* Arguments_Ptr;
  typedef Arguments const* Arguments_Ptr_Const;
  class Selector;
  typedef Selector* Selector_Ptr;
  typedef Selector const* Selector_Ptr_Const;


  class Selector_Schema;
  typedef Selector_Schema* Selector_Schema_Ptr;
  typedef Selector_Schema const* Selector_Schema_Ptr_Const;
  class Placeholder_Selector;
  typedef Placeholder_Selector* Placeholder_Selector_Ptr;
  typedef Placeholder_Selector const* Placeholder_Selector_Ptr_Const;
  class Element_Selector;
  typedef Element_Selector* Element_Selector_Ptr;
  typedef Element_Selector const* Element_Selector_Ptr_Const;
  class Class_Selector;
  typedef Class_Selector* Class_Selector_Ptr;
  typedef Class_Selector const* Class_Selector_Ptr_Const;
  class Id_Selector;
  typedef Id_Selector* Id_Selector_Ptr;
  typedef Id_Selector const* Id_Selector_Ptr_Const;
  class Attribute_Selector;
  typedef Attribute_Selector* Attribute_Selector_Ptr;
  typedef Attribute_Selector const* Attribute_Selector_Ptr_Const;

  class Pseudo_Selector;
  typedef Pseudo_Selector* Pseudo_Selector_Ptr;
  typedef Pseudo_Selector const * Pseudo_Selector_Ptr_Const;
  class Wrapped_Selector;
  typedef Wrapped_Selector* Wrapped_Selector_Ptr;
  typedef Wrapped_Selector const * Wrapped_Selector_Ptr_Const;
  class Compound_Selector;
  typedef Compound_Selector* Compound_Selector_Ptr;
  typedef Compound_Selector const * Compound_Selector_Ptr_Const;
  class Complex_Selector;
  typedef Complex_Selector* Complex_Selector_Ptr;
  typedef Complex_Selector const * Complex_Selector_Ptr_Const;
  class Selector_List;
  typedef Selector_List* Selector_List_Ptr;
  typedef Selector_List const * Selector_List_Ptr_Const;


  // common classes
  class Context;
  class Expand;
  class Eval;

  // declare classes that are instances of memory nodes
  // #define IMPL_MEM_OBJ(type) using type##_Obj = SharedImpl<type>
  #define IMPL_MEM_OBJ(type) typedef SharedImpl<type> type##_Obj

  IMPL_MEM_OBJ(AST_Node);
  IMPL_MEM_OBJ(Statement);
  IMPL_MEM_OBJ(Block);
  IMPL_MEM_OBJ(Ruleset);
  IMPL_MEM_OBJ(Bubble);
  IMPL_MEM_OBJ(Trace);
  IMPL_MEM_OBJ(Media_Block);
  IMPL_MEM_OBJ(Supports_Block);
  IMPL_MEM_OBJ(Directive);
  IMPL_MEM_OBJ(Keyframe_Rule);
  IMPL_MEM_OBJ(At_Root_Block);
  IMPL_MEM_OBJ(Declaration);
  IMPL_MEM_OBJ(Assignment);
  IMPL_MEM_OBJ(Import);
  IMPL_MEM_OBJ(Import_Stub);
  IMPL_MEM_OBJ(Warning);
  IMPL_MEM_OBJ(Error);
  IMPL_MEM_OBJ(Debug);
  IMPL_MEM_OBJ(Comment);
  IMPL_MEM_OBJ(PreValue);
  IMPL_MEM_OBJ(Has_Block);
  IMPL_MEM_OBJ(Thunk);
  IMPL_MEM_OBJ(If);
  IMPL_MEM_OBJ(For);
  IMPL_MEM_OBJ(Each);
  IMPL_MEM_OBJ(While);
  IMPL_MEM_OBJ(Return);
  IMPL_MEM_OBJ(Content);
  IMPL_MEM_OBJ(Extension);
  IMPL_MEM_OBJ(Definition);
  IMPL_MEM_OBJ(Mixin_Call);
  IMPL_MEM_OBJ(Value);
  IMPL_MEM_OBJ(Expression);
  IMPL_MEM_OBJ(List);
  IMPL_MEM_OBJ(Map);
  IMPL_MEM_OBJ(Function);
  IMPL_MEM_OBJ(Binary_Expression);
  IMPL_MEM_OBJ(Unary_Expression);
  IMPL_MEM_OBJ(Function_Call);
  IMPL_MEM_OBJ(Function_Call_Schema);
  IMPL_MEM_OBJ(Custom_Warning);
  IMPL_MEM_OBJ(Custom_Error);
  IMPL_MEM_OBJ(Variable);
  IMPL_MEM_OBJ(Number);
  IMPL_MEM_OBJ(Color);
  IMPL_MEM_OBJ(Boolean);
  IMPL_MEM_OBJ(String_Schema);
  IMPL_MEM_OBJ(String);
  IMPL_MEM_OBJ(String_Constant);
  IMPL_MEM_OBJ(String_Quoted);
  IMPL_MEM_OBJ(Media_Query);
  IMPL_MEM_OBJ(Media_Query_Expression);
  IMPL_MEM_OBJ(Supports_Condition);
  IMPL_MEM_OBJ(Supports_Operator);
  IMPL_MEM_OBJ(Supports_Negation);
  IMPL_MEM_OBJ(Supports_Declaration);
  IMPL_MEM_OBJ(Supports_Interpolation);
  IMPL_MEM_OBJ(At_Root_Query);
  IMPL_MEM_OBJ(Null);
  IMPL_MEM_OBJ(Parent_Selector);
  IMPL_MEM_OBJ(Parameter);
  IMPL_MEM_OBJ(Parameters);
  IMPL_MEM_OBJ(Argument);
  IMPL_MEM_OBJ(Arguments);
  IMPL_MEM_OBJ(Selector);
  IMPL_MEM_OBJ(Selector_Schema);
  IMPL_MEM_OBJ(Simple_Selector);
  IMPL_MEM_OBJ(Placeholder_Selector);
  IMPL_MEM_OBJ(Element_Selector);
  IMPL_MEM_OBJ(Class_Selector);
  IMPL_MEM_OBJ(Id_Selector);
  IMPL_MEM_OBJ(Attribute_Selector);
  IMPL_MEM_OBJ(Pseudo_Selector);
  IMPL_MEM_OBJ(Wrapped_Selector);
  IMPL_MEM_OBJ(Compound_Selector);
  IMPL_MEM_OBJ(Complex_Selector);
  IMPL_MEM_OBJ(Selector_List);

  // ###########################################################################
  // Implement compare, order and hashing operations for AST Nodes
  // ###########################################################################

  struct HashNodes {
    template <class T>
    size_t operator() (const T& ex) const {
      return ex.isNull() ? 0 : ex->hash();
    }
  };
  struct OrderNodes {
    template <class T>
    bool operator() (const T& lhs, const T& rhs) const {
      return !lhs.isNull() && !rhs.isNull() && *lhs < *rhs;
    }
  };
  struct CompareNodes {
    template <class T>
    bool operator() (const T& lhs, const T& rhs) const {
      // code around sass logic issue. 1px == 1 is true
      // but both items are still different keys in maps
      if (dynamic_cast<Number*>(lhs.ptr()))
        if (dynamic_cast<Number*>(rhs.ptr()))
          return lhs->hash() == rhs->hash();
      return !lhs.isNull() && !rhs.isNull() && *lhs == *rhs;
    }
  };

  // ###########################################################################
  // some often used typedefs
  // ###########################################################################

  typedef std::unordered_map<
    Expression_Obj, // key
    Expression_Obj, // value
    HashNodes, // hasher
    CompareNodes // compare
  > ExpressionMap;
  typedef std::unordered_set<
    Expression_Obj, // value
    HashNodes, // hasher
    CompareNodes // compare
  > ExpressionSet;

  typedef std::string SubSetMapKey;
  typedef std::vector<std::string> SubSetMapKeys;

  typedef std::pair<Complex_Selector_Obj, Compound_Selector_Obj> SubSetMapPair;
  typedef std::pair<Compound_Selector_Obj, Complex_Selector_Obj> SubSetMapLookup;
  typedef std::vector<SubSetMapPair> SubSetMapPairs;
  typedef std::vector<SubSetMapLookup> SubSetMapLookups;

  typedef std::pair<Complex_Selector_Obj, SubSetMapPairs> SubSetMapResult;
  typedef std::vector<SubSetMapResult> SubSetMapResults;

  typedef std::deque<Complex_Selector_Obj> ComplexSelectorDeque;
  typedef std::set<Simple_Selector_Obj, OrderNodes> SimpleSelectorSet;
  typedef std::set<Complex_Selector_Obj, OrderNodes> ComplexSelectorSet;
  typedef std::set<Compound_Selector_Obj, OrderNodes> CompoundSelectorSet;
  typedef std::unordered_set<Simple_Selector_Obj, HashNodes, CompareNodes> SimpleSelectorDict;

  typedef std::vector<Sass_Import_Entry>* ImporterStack;

  // only to switch implementations for testing
  #define environment_map std::map

  // ###########################################################################
  // explicit type conversion functions
  // ###########################################################################

  template<class T>
  T* Cast(AST_Node* ptr);

  template<class T>
  const T* Cast(const AST_Node* ptr);

  // sometimes you know the class you want to cast to is final
  // in this case a simple typeid check is faster and safe to use

  #define DECLARE_BASE_CAST(T) \
  template<> T* Cast(AST_Node* ptr); \
  template<> const T* Cast(const AST_Node* ptr); \

  // ###########################################################################
  // implement specialization for final classes
  // ###########################################################################

  DECLARE_BASE_CAST(AST_Node)
  DECLARE_BASE_CAST(Expression)
  DECLARE_BASE_CAST(Statement)
  DECLARE_BASE_CAST(Has_Block)
  DECLARE_BASE_CAST(PreValue)
  DECLARE_BASE_CAST(Value)
  DECLARE_BASE_CAST(List)
  DECLARE_BASE_CAST(String)
  DECLARE_BASE_CAST(String_Constant)
  DECLARE_BASE_CAST(Supports_Condition)
  DECLARE_BASE_CAST(Selector)
  DECLARE_BASE_CAST(Simple_Selector)

}

#endif
