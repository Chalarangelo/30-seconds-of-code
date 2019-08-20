#ifndef SASS_AST_H
#define SASS_AST_H

#include "sass.hpp"
#include <set>
#include <deque>
#include <vector>
#include <string>
#include <sstream>
#include <iostream>
#include <typeinfo>
#include <algorithm>
#include "sass/base.h"
#include "ast_fwd_decl.hpp"

#ifdef DEBUG_SHARED_PTR

#define ATTACH_VIRTUAL_AST_OPERATIONS(klass) \
  virtual klass##_Ptr copy(std::string, size_t) const = 0; \
  virtual klass##_Ptr clone(std::string, size_t) const = 0; \

#define ATTACH_AST_OPERATIONS(klass) \
  virtual klass##_Ptr copy(std::string, size_t) const; \
  virtual klass##_Ptr clone(std::string, size_t) const; \

#else

#define ATTACH_VIRTUAL_AST_OPERATIONS(klass) \
  virtual klass##_Ptr copy() const = 0; \
  virtual klass##_Ptr clone() const = 0; \

#define ATTACH_AST_OPERATIONS(klass) \
  virtual klass##_Ptr copy() const; \
  virtual klass##_Ptr clone() const; \

#endif

#ifdef __clang__

/*
 * There are some overloads used here that trigger the clang overload
 * hiding warning. Specifically:
 *
 * Type type() which hides string type() from Expression
 *
 */
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Woverloaded-virtual"

#endif

#include "util.hpp"
#include "units.hpp"
#include "context.hpp"
#include "position.hpp"
#include "constants.hpp"
#include "operation.hpp"
#include "position.hpp"
#include "inspect.hpp"
#include "source_map.hpp"
#include "environment.hpp"
#include "error_handling.hpp"
#include "ast_def_macros.hpp"
#include "ast_fwd_decl.hpp"
#include "source_map.hpp"

#include "sass.h"

namespace Sass {

  // easier to search with name
  const bool DELAYED = true;

  // ToDo: should this really be hardcoded
  // Note: most methods follow precision option
  const double NUMBER_EPSILON = 0.00000000000001;

  // macro to test if numbers are equal within a small error margin
  #define NEAR_EQUAL(lhs, rhs) std::fabs(lhs - rhs) < NUMBER_EPSILON

  // ToDo: where does this fit best?
  // We don't share this with C-API?
  class Operand {
    public:
      Operand(Sass_OP operand, bool ws_before = false, bool ws_after = false)
      : operand(operand), ws_before(ws_before), ws_after(ws_after)
      { }
    public:
      enum Sass_OP operand;
      bool ws_before;
      bool ws_after;
  };

  //////////////////////////////////////////////////////////
  // `hash_combine` comes from boost (functional/hash):
  // http://www.boost.org/doc/libs/1_35_0/doc/html/hash/combine.html
  // Boost Software License - Version 1.0
  // http://www.boost.org/users/license.html
  template <typename T>
  void hash_combine (std::size_t& seed, const T& val)
  {
    seed ^= std::hash<T>()(val) + 0x9e3779b9
             + (seed<<6) + (seed>>2);
  }
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // Abstract base class for all abstract syntax tree nodes.
  //////////////////////////////////////////////////////////
  class AST_Node : public SharedObj {
    ADD_PROPERTY(ParserState, pstate)
  public:
    AST_Node(ParserState pstate)
    : pstate_(pstate)
    { }
    AST_Node(const AST_Node* ptr)
    : pstate_(ptr->pstate_)
    { }

    // AST_Node(AST_Node& ptr) = delete;

    virtual ~AST_Node() = 0;
    virtual size_t hash() { return 0; }
    ATTACH_VIRTUAL_AST_OPERATIONS(AST_Node);
    virtual std::string inspect() const { return to_string({ INSPECT, 5 }); }
    virtual std::string to_sass() const { return to_string({ TO_SASS, 5 }); }
    virtual const std::string to_string(Sass_Inspect_Options opt) const;
    virtual const std::string to_string() const;
    virtual void cloneChildren() {};
    // generic find function (not fully implemented yet)
    // ToDo: add specific implementions to all children
    virtual bool find ( bool (*f)(AST_Node_Obj) ) { return f(this); };
  public:
    void update_pstate(const ParserState& pstate);
  public:
    Offset off() { return pstate(); }
    Position pos() { return pstate(); }
    ATTACH_OPERATIONS()
  };
  inline AST_Node::~AST_Node() { }

  //////////////////////////////////////////////////////////////////////
  // define cast template now (need complete type)
  //////////////////////////////////////////////////////////////////////

  template<class T>
  T* Cast(AST_Node* ptr) {
    return ptr && typeid(T) == typeid(*ptr) ?
           static_cast<T*>(ptr) : NULL;
  };

  template<class T>
  const T* Cast(const AST_Node* ptr) {
    return ptr && typeid(T) == typeid(*ptr) ?
           static_cast<const T*>(ptr) : NULL;
  };

  //////////////////////////////////////////////////////////////////////
  // Abstract base class for expressions. This side of the AST hierarchy
  // represents elements in value contexts, which exist primarily to be
  // evaluated and returned.
  //////////////////////////////////////////////////////////////////////
  class Expression : public AST_Node {
  public:
    enum Concrete_Type {
      NONE,
      BOOLEAN,
      NUMBER,
      COLOR,
      STRING,
      LIST,
      MAP,
      SELECTOR,
      NULL_VAL,
      FUNCTION_VAL,
      C_WARNING,
      C_ERROR,
      FUNCTION,
      VARIABLE,
      NUM_TYPES
    };
    enum Simple_Type {
      SIMPLE,
      ATTR_SEL,
      PSEUDO_SEL,
      WRAPPED_SEL,
    };
  private:
    // expressions in some contexts shouldn't be evaluated
    ADD_PROPERTY(bool, is_delayed)
    ADD_PROPERTY(bool, is_expanded)
    ADD_PROPERTY(bool, is_interpolant)
    ADD_PROPERTY(Concrete_Type, concrete_type)
  public:
    Expression(ParserState pstate,
               bool d = false, bool e = false, bool i = false, Concrete_Type ct = NONE)
    : AST_Node(pstate),
      is_delayed_(d),
      is_expanded_(e),
      is_interpolant_(i),
      concrete_type_(ct)
    { }
    Expression(const Expression* ptr)
    : AST_Node(ptr),
      is_delayed_(ptr->is_delayed_),
      is_expanded_(ptr->is_expanded_),
      is_interpolant_(ptr->is_interpolant_),
      concrete_type_(ptr->concrete_type_)
    { }
    virtual operator bool() { return true; }
    virtual ~Expression() { }
    virtual std::string type() const { return ""; /* TODO: raise an error? */ }
    virtual bool is_invisible() const { return false; }
    static std::string type_name() { return ""; }
    virtual bool is_false() { return false; }
    // virtual bool is_true() { return !is_false(); }
    virtual bool operator== (const Expression& rhs) const { return false; }
    virtual bool eq(const Expression& rhs) const { return *this == rhs; };
    virtual void set_delayed(bool delayed) { is_delayed(delayed); }
    virtual bool has_interpolant() const { return is_interpolant(); }
    virtual bool is_left_interpolant() const { return is_interpolant(); }
    virtual bool is_right_interpolant() const { return is_interpolant(); }
    virtual std::string inspect() const { return to_string({ INSPECT, 5 }); }
    virtual std::string to_sass() const { return to_string({ TO_SASS, 5 }); }
    ATTACH_VIRTUAL_AST_OPERATIONS(Expression);
    virtual size_t hash() { return 0; }
  };

  //////////////////////////////////////////////////////////////////////
  // Still just an expression, but with a to_string method
  //////////////////////////////////////////////////////////////////////
  class PreValue : public Expression {
  public:
    PreValue(ParserState pstate,
               bool d = false, bool e = false, bool i = false, Concrete_Type ct = NONE)
    : Expression(pstate, d, e, i, ct)
    { }
    PreValue(const PreValue* ptr)
    : Expression(ptr)
    { }
    ATTACH_VIRTUAL_AST_OPERATIONS(PreValue);
    virtual ~PreValue() { }
  };

  //////////////////////////////////////////////////////////////////////
  // base class for values that support operations
  //////////////////////////////////////////////////////////////////////
  class Value : public Expression {
  public:
    Value(ParserState pstate,
          bool d = false, bool e = false, bool i = false, Concrete_Type ct = NONE)
    : Expression(pstate, d, e, i, ct)
    { }
    Value(const Value* ptr)
    : Expression(ptr)
    { }
    ATTACH_VIRTUAL_AST_OPERATIONS(Value);
    virtual bool operator== (const Expression& rhs) const = 0;
  };
}

/////////////////////////////////////////////////////////////////////////////////////
// Hash method specializations for std::unordered_map to work with Sass::Expression
/////////////////////////////////////////////////////////////////////////////////////

namespace std {
  template<>
  struct hash<Sass::Expression_Obj>
  {
    size_t operator()(Sass::Expression_Obj s) const
    {
      return s->hash();
    }
  };
  template<>
  struct equal_to<Sass::Expression_Obj>
  {
    bool operator()( Sass::Expression_Obj lhs,  Sass::Expression_Obj rhs) const
    {
      return lhs->hash() == rhs->hash();
    }
  };
}

namespace Sass {

  /////////////////////////////////////////////////////////////////////////////
  // Mixin class for AST nodes that should behave like vectors. Uses the
  // "Template Method" design pattern to allow subclasses to adjust their flags
  // when certain objects are pushed.
  /////////////////////////////////////////////////////////////////////////////
  template <typename T>
  class Vectorized {
    std::vector<T> elements_;
  protected:
    size_t hash_;
    void reset_hash() { hash_ = 0; }
    virtual void adjust_after_pushing(T element) { }
  public:
    Vectorized(size_t s = 0) : elements_(std::vector<T>()), hash_(0)
    { elements_.reserve(s); }
    virtual ~Vectorized() = 0;
    size_t length() const   { return elements_.size(); }
    bool empty() const      { return elements_.empty(); }
    void clear()            { return elements_.clear(); }
    T last() const          { return elements_.back(); }
    T first() const         { return elements_.front(); }
    T& operator[](size_t i) { return elements_[i]; }
    virtual const T& at(size_t i) const { return elements_.at(i); }
    virtual T& at(size_t i) { return elements_.at(i); }
    const T& operator[](size_t i) const { return elements_[i]; }
    virtual void append(T element)
    {
      if (element) {
        reset_hash();
        elements_.push_back(element);
        adjust_after_pushing(element);
      }
    }
    virtual void concat(Vectorized* v)
    {
      for (size_t i = 0, L = v->length(); i < L; ++i) this->append((*v)[i]);
    }
    Vectorized& unshift(T element)
    {
      elements_.insert(elements_.begin(), element);
      return *this;
    }
    std::vector<T>& elements() { return elements_; }
    const std::vector<T>& elements() const { return elements_; }
    std::vector<T>& elements(std::vector<T>& e) { elements_ = e; return elements_; }

    virtual size_t hash()
    {
      if (hash_ == 0) {
        for (T& el : elements_) {
          hash_combine(hash_, el->hash());
        }
      }
      return hash_;
    }

    typename std::vector<T>::iterator end() { return elements_.end(); }
    typename std::vector<T>::iterator begin() { return elements_.begin(); }
    typename std::vector<T>::const_iterator end() const { return elements_.end(); }
    typename std::vector<T>::const_iterator begin() const { return elements_.begin(); }
    typename std::vector<T>::iterator erase(typename std::vector<T>::iterator el) { return elements_.erase(el); }
    typename std::vector<T>::const_iterator erase(typename std::vector<T>::const_iterator el) { return elements_.erase(el); }

  };
  template <typename T>
  inline Vectorized<T>::~Vectorized() { }

  /////////////////////////////////////////////////////////////////////////////
  // Mixin class for AST nodes that should behave like a hash table. Uses an
  // extra <std::vector> internally to maintain insertion order for interation.
  /////////////////////////////////////////////////////////////////////////////
  class Hashed {
  private:
    ExpressionMap elements_;
    std::vector<Expression_Obj> list_;
  protected:
    size_t hash_;
    Expression_Obj duplicate_key_;
    void reset_hash() { hash_ = 0; }
    void reset_duplicate_key() { duplicate_key_ = 0; }
    virtual void adjust_after_pushing(std::pair<Expression_Obj, Expression_Obj> p) { }
  public:
    Hashed(size_t s = 0)
    : elements_(ExpressionMap(s)),
      list_(std::vector<Expression_Obj>()),
      hash_(0), duplicate_key_(NULL)
    { elements_.reserve(s); list_.reserve(s); }
    virtual ~Hashed();
    size_t length() const                  { return list_.size(); }
    bool empty() const                     { return list_.empty(); }
    bool has(Expression_Obj k) const          { return elements_.count(k) == 1; }
    Expression_Obj at(Expression_Obj k) const;
    bool has_duplicate_key() const         { return duplicate_key_ != 0; }
    Expression_Obj get_duplicate_key() const  { return duplicate_key_; }
    const ExpressionMap elements() { return elements_; }
    Hashed& operator<<(std::pair<Expression_Obj, Expression_Obj> p)
    {
      reset_hash();

      if (!has(p.first)) list_.push_back(p.first);
      else if (!duplicate_key_) duplicate_key_ = p.first;

      elements_[p.first] = p.second;

      adjust_after_pushing(p);
      return *this;
    }
    Hashed& operator+=(Hashed* h)
    {
      if (length() == 0) {
        this->elements_ = h->elements_;
        this->list_ = h->list_;
        return *this;
      }

      for (auto key : h->keys()) {
        *this << std::make_pair(key, h->at(key));
      }

      reset_duplicate_key();
      return *this;
    }
    const ExpressionMap& pairs() const { return elements_; }
    const std::vector<Expression_Obj>& keys() const { return list_; }

//    std::unordered_map<Expression_Obj, Expression_Obj>::iterator end() { return elements_.end(); }
//    std::unordered_map<Expression_Obj, Expression_Obj>::iterator begin() { return elements_.begin(); }
//    std::unordered_map<Expression_Obj, Expression_Obj>::const_iterator end() const { return elements_.end(); }
//    std::unordered_map<Expression_Obj, Expression_Obj>::const_iterator begin() const { return elements_.begin(); }

  };
  inline Hashed::~Hashed() { }


  /////////////////////////////////////////////////////////////////////////
  // Abstract base class for statements. This side of the AST hierarchy
  // represents elements in expansion contexts, which exist primarily to be
  // rewritten and macro-expanded.
  /////////////////////////////////////////////////////////////////////////
  class Statement : public AST_Node {
  public:
    enum Statement_Type {
      NONE,
      RULESET,
      MEDIA,
      DIRECTIVE,
      SUPPORTS,
      ATROOT,
      BUBBLE,
      CONTENT,
      KEYFRAMERULE,
      DECLARATION,
      ASSIGNMENT,
      IMPORT_STUB,
      IMPORT,
      COMMENT,
      WARNING,
      RETURN,
      EXTEND,
      ERROR,
      DEBUGSTMT,
      WHILE,
      EACH,
      FOR,
      IF
    };
  private:
    ADD_PROPERTY(Statement_Type, statement_type)
    ADD_PROPERTY(size_t, tabs)
    ADD_PROPERTY(bool, group_end)
  public:
    Statement(ParserState pstate, Statement_Type st = NONE, size_t t = 0)
    : AST_Node(pstate), statement_type_(st), tabs_(t), group_end_(false)
     { }
    Statement(const Statement* ptr)
    : AST_Node(ptr),
      statement_type_(ptr->statement_type_),
      tabs_(ptr->tabs_),
      group_end_(ptr->group_end_)
     { }
    virtual ~Statement() = 0;
    // needed for rearranging nested rulesets during CSS emission
    virtual bool   is_invisible() const { return false; }
    virtual bool   bubbles() { return false; }
    virtual bool has_content()
    {
      return statement_type_ == CONTENT;
    }
  };
  inline Statement::~Statement() { }

  ////////////////////////
  // Blocks of statements.
  ////////////////////////
  class Block : public Statement, public Vectorized<Statement_Obj> {
    ADD_PROPERTY(bool, is_root)
    // needed for properly formatted CSS emission
  protected:
    void adjust_after_pushing(Statement_Obj s)
    {
    }
  public:
    Block(ParserState pstate, size_t s = 0, bool r = false)
    : Statement(pstate),
      Vectorized<Statement_Obj>(s),
      is_root_(r)
    { }
    Block(const Block* ptr)
    : Statement(ptr),
      Vectorized<Statement_Obj>(*ptr),
      is_root_(ptr->is_root_)
    { }
    virtual bool has_content()
    {
      for (size_t i = 0, L = elements().size(); i < L; ++i) {
        if (elements()[i]->has_content()) return true;
      }
      return Statement::has_content();
    }
    ATTACH_AST_OPERATIONS(Block)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////
  // Abstract base class for statements that contain blocks of statements.
  ////////////////////////////////////////////////////////////////////////
  class Has_Block : public Statement {
    ADD_PROPERTY(Block_Obj, block)
  public:
    Has_Block(ParserState pstate, Block_Obj b)
    : Statement(pstate), block_(b)
    { }
    Has_Block(const Has_Block* ptr)
    : Statement(ptr), block_(ptr->block_)
    { }
    virtual bool has_content()
    {
      return (block_ && block_->has_content()) || Statement::has_content();
    }
    virtual ~Has_Block() = 0;
  };
  inline Has_Block::~Has_Block() { }

  /////////////////////////////////////////////////////////////////////////////
  // Rulesets (i.e., sets of styles headed by a selector and containing a block
  // of style declarations.
  /////////////////////////////////////////////////////////////////////////////
  class Ruleset : public Has_Block {
    ADD_PROPERTY(Selector_List_Obj, selector)
    ADD_PROPERTY(bool, is_root);
  public:
    Ruleset(ParserState pstate, Selector_List_Obj s = 0, Block_Obj b = 0)
    : Has_Block(pstate, b), selector_(s), is_root_(false)
    { statement_type(RULESET); }
    Ruleset(const Ruleset* ptr)
    : Has_Block(ptr),
      selector_(ptr->selector_),
      is_root_(ptr->is_root_)
    { statement_type(RULESET); }
    bool is_invisible() const;
    ATTACH_AST_OPERATIONS(Ruleset)
    ATTACH_OPERATIONS()
  };

  /////////////////
  // Bubble.
  /////////////////
  class Bubble : public Statement {
    ADD_PROPERTY(Statement_Obj, node)
    ADD_PROPERTY(bool, group_end)
  public:
    Bubble(ParserState pstate, Statement_Obj n, Statement_Obj g = 0, size_t t = 0)
    : Statement(pstate, Statement::BUBBLE, t), node_(n), group_end_(g == 0)
    { }
    Bubble(const Bubble* ptr)
    : Statement(ptr),
      node_(ptr->node_),
      group_end_(ptr->group_end_)
    { }
    bool bubbles() { return true; }
    ATTACH_AST_OPERATIONS(Bubble)
    ATTACH_OPERATIONS()
  };

  /////////////////
  // Trace.
  /////////////////
  class Trace : public Has_Block {
    ADD_CONSTREF(char, type)
    ADD_CONSTREF(std::string, name)
  public:
    Trace(ParserState pstate, std::string n, Block_Obj b = 0, char type = 'm')
    : Has_Block(pstate, b), type_(type), name_(n)
    { }
    Trace(const Trace* ptr)
    : Has_Block(ptr),
      type_(ptr->type_),
      name_(ptr->name_)
    { }
    ATTACH_AST_OPERATIONS(Trace)
    ATTACH_OPERATIONS()
  };

  /////////////////
  // Media queries.
  /////////////////
  class Media_Block : public Has_Block {
    ADD_PROPERTY(List_Obj, media_queries)
  public:
    Media_Block(ParserState pstate, List_Obj mqs, Block_Obj b)
    : Has_Block(pstate, b), media_queries_(mqs)
    { statement_type(MEDIA); }
    Media_Block(const Media_Block* ptr)
    : Has_Block(ptr), media_queries_(ptr->media_queries_)
    { statement_type(MEDIA); }
    bool bubbles() { return true; }
    bool is_invisible() const;
    ATTACH_AST_OPERATIONS(Media_Block)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////////////////////////////
  // At-rules -- arbitrary directives beginning with "@" that may have an
  // optional statement block.
  ///////////////////////////////////////////////////////////////////////
  class Directive : public Has_Block {
    ADD_CONSTREF(std::string, keyword)
    ADD_PROPERTY(Selector_List_Obj, selector)
    ADD_PROPERTY(Expression_Obj, value)
  public:
    Directive(ParserState pstate, std::string kwd, Selector_List_Obj sel = 0, Block_Obj b = 0, Expression_Obj val = 0)
    : Has_Block(pstate, b), keyword_(kwd), selector_(sel), value_(val) // set value manually if needed
    { statement_type(DIRECTIVE); }
    Directive(const Directive* ptr)
    : Has_Block(ptr),
      keyword_(ptr->keyword_),
      selector_(ptr->selector_),
      value_(ptr->value_) // set value manually if needed
    { statement_type(DIRECTIVE); }
    bool bubbles() { return is_keyframes() || is_media(); }
    bool is_media() {
      return keyword_.compare("@-webkit-media") == 0 ||
             keyword_.compare("@-moz-media") == 0 ||
             keyword_.compare("@-o-media") == 0 ||
             keyword_.compare("@media") == 0;
    }
    bool is_keyframes() {
      return keyword_.compare("@-webkit-keyframes") == 0 ||
             keyword_.compare("@-moz-keyframes") == 0 ||
             keyword_.compare("@-o-keyframes") == 0 ||
             keyword_.compare("@keyframes") == 0;
    }
    ATTACH_AST_OPERATIONS(Directive)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////////////////////////////
  // Keyframe-rules -- the child blocks of "@keyframes" nodes.
  ///////////////////////////////////////////////////////////////////////
  class Keyframe_Rule : public Has_Block {
    // according to css spec, this should be <keyframes-name>
    // <keyframes-name> = <custom-ident> | <string>
    ADD_PROPERTY(Selector_List_Obj, name)
  public:
    Keyframe_Rule(ParserState pstate, Block_Obj b)
    : Has_Block(pstate, b), name_()
    { statement_type(KEYFRAMERULE); }
    Keyframe_Rule(const Keyframe_Rule* ptr)
    : Has_Block(ptr), name_(ptr->name_)
    { statement_type(KEYFRAMERULE); }
    ATTACH_AST_OPERATIONS(Keyframe_Rule)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////
  // Declarations -- style rules consisting of a property name and values.
  ////////////////////////////////////////////////////////////////////////
  class Declaration : public Has_Block {
    ADD_PROPERTY(String_Obj, property)
    ADD_PROPERTY(Expression_Obj, value)
    ADD_PROPERTY(bool, is_important)
    ADD_PROPERTY(bool, is_custom_property)
    ADD_PROPERTY(bool, is_indented)
  public:
    Declaration(ParserState pstate,
                String_Obj prop, Expression_Obj val, bool i = false, bool c = false, Block_Obj b = 0)
    : Has_Block(pstate, b), property_(prop), value_(val), is_important_(i), is_custom_property_(c), is_indented_(false)
    { statement_type(DECLARATION); }
    Declaration(const Declaration* ptr)
    : Has_Block(ptr),
      property_(ptr->property_),
      value_(ptr->value_),
      is_important_(ptr->is_important_),
      is_custom_property_(ptr->is_custom_property_),
      is_indented_(ptr->is_indented_)
    { statement_type(DECLARATION); }
    virtual bool is_invisible() const;
    ATTACH_AST_OPERATIONS(Declaration)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////
  // Assignments -- variable and value.
  /////////////////////////////////////
  class Assignment : public Statement {
    ADD_CONSTREF(std::string, variable)
    ADD_PROPERTY(Expression_Obj, value)
    ADD_PROPERTY(bool, is_default)
    ADD_PROPERTY(bool, is_global)
  public:
    Assignment(ParserState pstate,
               std::string var, Expression_Obj val,
               bool is_default = false,
               bool is_global = false)
    : Statement(pstate), variable_(var), value_(val), is_default_(is_default), is_global_(is_global)
    { statement_type(ASSIGNMENT); }
    Assignment(const Assignment* ptr)
    : Statement(ptr),
      variable_(ptr->variable_),
      value_(ptr->value_),
      is_default_(ptr->is_default_),
      is_global_(ptr->is_global_)
    { statement_type(ASSIGNMENT); }
    ATTACH_AST_OPERATIONS(Assignment)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////////
  // Import directives. CSS and Sass import lists can be intermingled, so it's
  // necessary to store a list of each in an Import node.
  ////////////////////////////////////////////////////////////////////////////
  class Import : public Statement {
    std::vector<Expression_Obj> urls_;
    std::vector<Include>     incs_;
    ADD_PROPERTY(List_Obj,      import_queries);
  public:
    Import(ParserState pstate)
    : Statement(pstate),
      urls_(std::vector<Expression_Obj>()),
      incs_(std::vector<Include>()),
      import_queries_()
    { statement_type(IMPORT); }
    Import(const Import* ptr)
    : Statement(ptr),
      urls_(ptr->urls_),
      incs_(ptr->incs_),
      import_queries_(ptr->import_queries_)
    { statement_type(IMPORT); }
    std::vector<Expression_Obj>& urls() { return urls_; }
    std::vector<Include>& incs() { return incs_; }
    ATTACH_AST_OPERATIONS(Import)
    ATTACH_OPERATIONS()
  };

  // not yet resolved single import
  // so far we only know requested name
  class Import_Stub : public Statement {
    Include resource_;
  public:
    std::string abs_path() { return resource_.abs_path; };
    std::string imp_path() { return resource_.imp_path; };
    Include resource() { return resource_; };

    Import_Stub(ParserState pstate, Include res)
    : Statement(pstate), resource_(res)
    { statement_type(IMPORT_STUB); }
    Import_Stub(const Import_Stub* ptr)
    : Statement(ptr), resource_(ptr->resource_)
    { statement_type(IMPORT_STUB); }
    ATTACH_AST_OPERATIONS(Import_Stub)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////
  // The Sass `@warn` directive.
  //////////////////////////////
  class Warning : public Statement {
    ADD_PROPERTY(Expression_Obj, message)
  public:
    Warning(ParserState pstate, Expression_Obj msg)
    : Statement(pstate), message_(msg)
    { statement_type(WARNING); }
    Warning(const Warning* ptr)
    : Statement(ptr), message_(ptr->message_)
    { statement_type(WARNING); }
    ATTACH_AST_OPERATIONS(Warning)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////
  // The Sass `@error` directive.
  ///////////////////////////////
  class Error : public Statement {
    ADD_PROPERTY(Expression_Obj, message)
  public:
    Error(ParserState pstate, Expression_Obj msg)
    : Statement(pstate), message_(msg)
    { statement_type(ERROR); }
    Error(const Error* ptr)
    : Statement(ptr), message_(ptr->message_)
    { statement_type(ERROR); }
    ATTACH_AST_OPERATIONS(Error)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////
  // The Sass `@debug` directive.
  ///////////////////////////////
  class Debug : public Statement {
    ADD_PROPERTY(Expression_Obj, value)
  public:
    Debug(ParserState pstate, Expression_Obj val)
    : Statement(pstate), value_(val)
    { statement_type(DEBUGSTMT); }
    Debug(const Debug* ptr)
    : Statement(ptr), value_(ptr->value_)
    { statement_type(DEBUGSTMT); }
    ATTACH_AST_OPERATIONS(Debug)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////
  // CSS comments. These may be interpolated.
  ///////////////////////////////////////////
  class Comment : public Statement {
    ADD_PROPERTY(String_Obj, text)
    ADD_PROPERTY(bool, is_important)
  public:
    Comment(ParserState pstate, String_Obj txt, bool is_important)
    : Statement(pstate), text_(txt), is_important_(is_important)
    { statement_type(COMMENT); }
    Comment(const Comment* ptr)
    : Statement(ptr),
      text_(ptr->text_),
      is_important_(ptr->is_important_)
    { statement_type(COMMENT); }
    virtual bool is_invisible() const
    { return /* is_important() == */ false; }
    ATTACH_AST_OPERATIONS(Comment)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////
  // The Sass `@if` control directive.
  ////////////////////////////////////
  class If : public Has_Block {
    ADD_PROPERTY(Expression_Obj, predicate)
    ADD_PROPERTY(Block_Obj, alternative)
  public:
    If(ParserState pstate, Expression_Obj pred, Block_Obj con, Block_Obj alt = 0)
    : Has_Block(pstate, con), predicate_(pred), alternative_(alt)
    { statement_type(IF); }
    If(const If* ptr)
    : Has_Block(ptr),
      predicate_(ptr->predicate_),
      alternative_(ptr->alternative_)
    { statement_type(IF); }
    virtual bool has_content()
    {
      return Has_Block::has_content() || (alternative_ && alternative_->has_content());
    }
    ATTACH_AST_OPERATIONS(If)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////
  // The Sass `@for` control directive.
  /////////////////////////////////////
  class For : public Has_Block {
    ADD_CONSTREF(std::string, variable)
    ADD_PROPERTY(Expression_Obj, lower_bound)
    ADD_PROPERTY(Expression_Obj, upper_bound)
    ADD_PROPERTY(bool, is_inclusive)
  public:
    For(ParserState pstate,
        std::string var, Expression_Obj lo, Expression_Obj hi, Block_Obj b, bool inc)
    : Has_Block(pstate, b),
      variable_(var), lower_bound_(lo), upper_bound_(hi), is_inclusive_(inc)
    { statement_type(FOR); }
    For(const For* ptr)
    : Has_Block(ptr),
      variable_(ptr->variable_),
      lower_bound_(ptr->lower_bound_),
      upper_bound_(ptr->upper_bound_),
      is_inclusive_(ptr->is_inclusive_)
    { statement_type(FOR); }
    ATTACH_AST_OPERATIONS(For)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////////////
  // The Sass `@each` control directive.
  //////////////////////////////////////
  class Each : public Has_Block {
    ADD_PROPERTY(std::vector<std::string>, variables)
    ADD_PROPERTY(Expression_Obj, list)
  public:
    Each(ParserState pstate, std::vector<std::string> vars, Expression_Obj lst, Block_Obj b)
    : Has_Block(pstate, b), variables_(vars), list_(lst)
    { statement_type(EACH); }
    Each(const Each* ptr)
    : Has_Block(ptr), variables_(ptr->variables_), list_(ptr->list_)
    { statement_type(EACH); }
    ATTACH_AST_OPERATIONS(Each)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////
  // The Sass `@while` control directive.
  ///////////////////////////////////////
  class While : public Has_Block {
    ADD_PROPERTY(Expression_Obj, predicate)
  public:
    While(ParserState pstate, Expression_Obj pred, Block_Obj b)
    : Has_Block(pstate, b), predicate_(pred)
    { statement_type(WHILE); }
    While(const While* ptr)
    : Has_Block(ptr), predicate_(ptr->predicate_)
    { statement_type(WHILE); }
    ATTACH_AST_OPERATIONS(While)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////////////////
  // The @return directive for use inside SassScript functions.
  /////////////////////////////////////////////////////////////
  class Return : public Statement {
    ADD_PROPERTY(Expression_Obj, value)
  public:
    Return(ParserState pstate, Expression_Obj val)
    : Statement(pstate), value_(val)
    { statement_type(RETURN); }
    Return(const Return* ptr)
    : Statement(ptr), value_(ptr->value_)
    { statement_type(RETURN); }
    ATTACH_AST_OPERATIONS(Return)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////
  // The Sass `@extend` directive.
  ////////////////////////////////
  class Extension : public Statement {
    ADD_PROPERTY(Selector_List_Obj, selector)
  public:
    Extension(ParserState pstate, Selector_List_Obj s)
    : Statement(pstate), selector_(s)
    { statement_type(EXTEND); }
    Extension(const Extension* ptr)
    : Statement(ptr), selector_(ptr->selector_)
    { statement_type(EXTEND); }
    ATTACH_AST_OPERATIONS(Extension)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////////////////////////////////
  // Definitions for both mixins and functions. The two cases are distinguished
  // by a type tag.
  /////////////////////////////////////////////////////////////////////////////
  struct Backtrace;
  typedef const char* Signature;
  typedef Expression_Ptr (*Native_Function)(Env&, Env&, Context&, Signature, ParserState, Backtraces, std::vector<Selector_List_Obj>);
  class Definition : public Has_Block {
  public:
    enum Type { MIXIN, FUNCTION };
    ADD_CONSTREF(std::string, name)
    ADD_PROPERTY(Parameters_Obj, parameters)
    ADD_PROPERTY(Env*, environment)
    ADD_PROPERTY(Type, type)
    ADD_PROPERTY(Native_Function, native_function)
    ADD_PROPERTY(Sass_Function_Entry, c_function)
    ADD_PROPERTY(void*, cookie)
    ADD_PROPERTY(bool, is_overload_stub)
    ADD_PROPERTY(Signature, signature)
  public:
    Definition(const Definition* ptr)
    : Has_Block(ptr),
      name_(ptr->name_),
      parameters_(ptr->parameters_),
      environment_(ptr->environment_),
      type_(ptr->type_),
      native_function_(ptr->native_function_),
      c_function_(ptr->c_function_),
      cookie_(ptr->cookie_),
      is_overload_stub_(ptr->is_overload_stub_),
      signature_(ptr->signature_)
    { }

    Definition(ParserState pstate,
               std::string n,
               Parameters_Obj params,
               Block_Obj b,
               Type t)
    : Has_Block(pstate, b),
      name_(n),
      parameters_(params),
      environment_(0),
      type_(t),
      native_function_(0),
      c_function_(0),
      cookie_(0),
      is_overload_stub_(false),
      signature_(0)
    { }
    Definition(ParserState pstate,
               Signature sig,
               std::string n,
               Parameters_Obj params,
               Native_Function func_ptr,
               bool overload_stub = false)
    : Has_Block(pstate, 0),
      name_(n),
      parameters_(params),
      environment_(0),
      type_(FUNCTION),
      native_function_(func_ptr),
      c_function_(0),
      cookie_(0),
      is_overload_stub_(overload_stub),
      signature_(sig)
    { }
    Definition(ParserState pstate,
               Signature sig,
               std::string n,
               Parameters_Obj params,
               Sass_Function_Entry c_func,
               bool whatever,
               bool whatever2)
    : Has_Block(pstate, 0),
      name_(n),
      parameters_(params),
      environment_(0),
      type_(FUNCTION),
      native_function_(0),
      c_function_(c_func),
      cookie_(sass_function_get_cookie(c_func)),
      is_overload_stub_(false),
      signature_(sig)
    { }
    ATTACH_AST_OPERATIONS(Definition)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////////////
  // Mixin calls (i.e., `@include ...`).
  //////////////////////////////////////
  class Mixin_Call : public Has_Block {
    ADD_CONSTREF(std::string, name)
    ADD_PROPERTY(Arguments_Obj, arguments)
  public:
    Mixin_Call(ParserState pstate, std::string n, Arguments_Obj args, Block_Obj b = 0)
    : Has_Block(pstate, b), name_(n), arguments_(args)
    { }
    Mixin_Call(const Mixin_Call* ptr)
    : Has_Block(ptr),
      name_(ptr->name_),
      arguments_(ptr->arguments_)
    { }
    ATTACH_AST_OPERATIONS(Mixin_Call)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////////
  // The @content directive for mixin content blocks.
  ///////////////////////////////////////////////////
  class Content : public Statement {
    ADD_PROPERTY(Media_Block_Ptr, media_block)
  public:
    Content(ParserState pstate)
    : Statement(pstate),
      media_block_(NULL)
    { statement_type(CONTENT); }
    Content(const Content* ptr)
    : Statement(ptr),
      media_block_(ptr->media_block_)
    { statement_type(CONTENT); }
    ATTACH_AST_OPERATIONS(Content)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////////////////////////////
  // Lists of values, both comma- and space-separated (distinguished by a
  // type-tag.) Also used to represent variable-length argument lists.
  ///////////////////////////////////////////////////////////////////////
  class List : public Value, public Vectorized<Expression_Obj> {
    void adjust_after_pushing(Expression_Obj e) { is_expanded(false); }
  private:
    ADD_PROPERTY(enum Sass_Separator, separator)
    ADD_PROPERTY(bool, is_arglist)
    ADD_PROPERTY(bool, is_bracketed)
    ADD_PROPERTY(bool, from_selector)
  public:
    List(ParserState pstate,
         size_t size = 0, enum Sass_Separator sep = SASS_SPACE, bool argl = false, bool bracket = false)
    : Value(pstate),
      Vectorized<Expression_Obj>(size),
      separator_(sep),
      is_arglist_(argl),
      is_bracketed_(bracket),
      from_selector_(false)
    { concrete_type(LIST); }
    List(const List* ptr)
    : Value(ptr),
      Vectorized<Expression_Obj>(*ptr),
      separator_(ptr->separator_),
      is_arglist_(ptr->is_arglist_),
      is_bracketed_(ptr->is_bracketed_),
      from_selector_(ptr->from_selector_)
    { concrete_type(LIST); }
    std::string type() const { return is_arglist_ ? "arglist" : "list"; }
    static std::string type_name() { return "list"; }
    const char* sep_string(bool compressed = false) const {
      return separator() == SASS_SPACE ?
        " " : (compressed ? "," : ", ");
    }
    bool is_invisible() const { return empty() && !is_bracketed(); }
    Expression_Obj value_at_index(size_t i);

    virtual size_t size() const;

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<std::string>()(sep_string());
        hash_combine(hash_, std::hash<bool>()(is_bracketed()));
        for (size_t i = 0, L = length(); i < L; ++i)
          hash_combine(hash_, (elements()[i])->hash());
      }
      return hash_;
    }

    virtual void set_delayed(bool delayed)
    {
      is_delayed(delayed);
      // don't set children
    }

    virtual bool operator== (const Expression& rhs) const;

    ATTACH_AST_OPERATIONS(List)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////////////////////////////
  // Key value paris.
  ///////////////////////////////////////////////////////////////////////
  class Map : public Value, public Hashed {
    void adjust_after_pushing(std::pair<Expression_Obj, Expression_Obj> p) { is_expanded(false); }
  public:
    Map(ParserState pstate,
         size_t size = 0)
    : Value(pstate),
      Hashed(size)
    { concrete_type(MAP); }
    Map(const Map* ptr)
    : Value(ptr),
      Hashed(*ptr)
    { concrete_type(MAP); }
    std::string type() const { return "map"; }
    static std::string type_name() { return "map"; }
    bool is_invisible() const { return empty(); }
    List_Obj to_list(ParserState& pstate);

    virtual size_t hash()
    {
      if (hash_ == 0) {
        for (auto key : keys()) {
          hash_combine(hash_, key->hash());
          hash_combine(hash_, at(key)->hash());
        }
      }

      return hash_;
    }

    virtual bool operator== (const Expression& rhs) const;

    ATTACH_AST_OPERATIONS(Map)
    ATTACH_OPERATIONS()
  };

  inline static const std::string sass_op_to_name(enum Sass_OP op) {
    switch (op) {
      case AND: return "and";
      case OR: return "or";
      case EQ: return "eq";
      case NEQ: return "neq";
      case GT: return "gt";
      case GTE: return "gte";
      case LT: return "lt";
      case LTE: return "lte";
      case ADD: return "plus";
      case SUB: return "sub";
      case MUL: return "times";
      case DIV: return "div";
      case MOD: return "mod";
      // this is only used internally!
      case NUM_OPS: return "[OPS]";
      default: return "invalid";
    }
  }

  inline static const std::string sass_op_separator(enum Sass_OP op) {
    switch (op) {
      case AND: return "&&";
      case OR: return "||";
      case EQ: return "==";
      case NEQ: return "!=";
      case GT: return ">";
      case GTE: return ">=";
      case LT: return "<";
      case LTE: return "<=";
      case ADD: return "+";
      case SUB: return "-";
      case MUL: return "*";
      case DIV: return "/";
      case MOD: return "%";
      // this is only used internally!
      case NUM_OPS: return "[OPS]";
      default: return "invalid";
    }
  }

  //////////////////////////////////////////////////////////////////////////
  // Binary expressions. Represents logical, relational, and arithmetic
  // operations. Templatized to avoid large switch statements and repetitive
  // subclassing.
  //////////////////////////////////////////////////////////////////////////
  class Binary_Expression : public PreValue {
  private:
    HASH_PROPERTY(Operand, op)
    HASH_PROPERTY(Expression_Obj, left)
    HASH_PROPERTY(Expression_Obj, right)
    size_t hash_;
  public:
    Binary_Expression(ParserState pstate,
                      Operand op, Expression_Obj lhs, Expression_Obj rhs)
    : PreValue(pstate), op_(op), left_(lhs), right_(rhs), hash_(0)
    { }
    Binary_Expression(const Binary_Expression* ptr)
    : PreValue(ptr),
      op_(ptr->op_),
      left_(ptr->left_),
      right_(ptr->right_),
      hash_(ptr->hash_)
    { }
    const std::string type_name() {
      return sass_op_to_name(optype());
    }
    const std::string separator() {
      return sass_op_separator(optype());
    }
    bool is_left_interpolant(void) const;
    bool is_right_interpolant(void) const;
    bool has_interpolant() const
    {
      return is_left_interpolant() ||
             is_right_interpolant();
    }
    virtual void set_delayed(bool delayed)
    {
      right()->set_delayed(delayed);
      left()->set_delayed(delayed);
      is_delayed(delayed);
    }
    virtual bool operator==(const Expression& rhs) const
    {
      try
      {
        Binary_Expression_Ptr_Const m = Cast<Binary_Expression>(&rhs);
        if (m == 0) return false;
        return type() == m->type() &&
               *left() == *m->left() &&
               *right() == *m->right();
      }
      catch (std::bad_cast&)
      {
        return false;
      }
      catch (...) { throw; }
    }
    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<size_t>()(optype());
        hash_combine(hash_, left()->hash());
        hash_combine(hash_, right()->hash());
      }
      return hash_;
    }
    enum Sass_OP optype() const { return op_.operand; }
    ATTACH_AST_OPERATIONS(Binary_Expression)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////////
  // Arithmetic negation (logical negation is just an ordinary function call).
  ////////////////////////////////////////////////////////////////////////////
  class Unary_Expression : public Expression {
  public:
    enum Type { PLUS, MINUS, NOT, SLASH };
  private:
    HASH_PROPERTY(Type, optype)
    HASH_PROPERTY(Expression_Obj, operand)
    size_t hash_;
  public:
    Unary_Expression(ParserState pstate, Type t, Expression_Obj o)
    : Expression(pstate), optype_(t), operand_(o), hash_(0)
    { }
    Unary_Expression(const Unary_Expression* ptr)
    : Expression(ptr),
      optype_(ptr->optype_),
      operand_(ptr->operand_),
      hash_(ptr->hash_)
    { }
    const std::string type_name() {
      switch (optype_) {
        case PLUS: return "plus";
        case MINUS: return "minus";
        case SLASH: return "slash";
        case NOT: return "not";
        default: return "invalid";
      }
    }
    virtual bool operator==(const Expression& rhs) const
    {
      try
      {
        Unary_Expression_Ptr_Const m = Cast<Unary_Expression>(&rhs);
        if (m == 0) return false;
        return type() == m->type() &&
               *operand() == *m->operand();
      }
      catch (std::bad_cast&)
      {
        return false;
      }
      catch (...) { throw; }
    }
    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<size_t>()(optype_);
        hash_combine(hash_, operand()->hash());
      };
      return hash_;
    }
    ATTACH_AST_OPERATIONS(Unary_Expression)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////
  // Individual argument objects for mixin and function calls.
  ////////////////////////////////////////////////////////////
  class Argument : public Expression {
    HASH_PROPERTY(Expression_Obj, value)
    HASH_CONSTREF(std::string, name)
    ADD_PROPERTY(bool, is_rest_argument)
    ADD_PROPERTY(bool, is_keyword_argument)
    size_t hash_;
  public:
    Argument(ParserState pstate, Expression_Obj val, std::string n = "", bool rest = false, bool keyword = false)
    : Expression(pstate), value_(val), name_(n), is_rest_argument_(rest), is_keyword_argument_(keyword), hash_(0)
    {
      if (!name_.empty() && is_rest_argument_) {
        coreError("variable-length argument may not be passed by name", pstate_);
      }
    }
    Argument(const Argument* ptr)
    : Expression(ptr),
      value_(ptr->value_),
      name_(ptr->name_),
      is_rest_argument_(ptr->is_rest_argument_),
      is_keyword_argument_(ptr->is_keyword_argument_),
      hash_(ptr->hash_)
    {
      if (!name_.empty() && is_rest_argument_) {
        coreError("variable-length argument may not be passed by name", pstate_);
      }
    }

    virtual void set_delayed(bool delayed);
    virtual bool operator==(const Expression& rhs) const
    {
      try
      {
        Argument_Ptr_Const m = Cast<Argument>(&rhs);
        if (!(m && name() == m->name())) return false;
        return *value() == *m->value();
      }
      catch (std::bad_cast&)
      {
        return false;
      }
      catch (...) { throw; }
    }

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<std::string>()(name());
        hash_combine(hash_, value()->hash());
      }
      return hash_;
    }

    ATTACH_AST_OPERATIONS(Argument)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////
  // Argument lists -- in their own class to facilitate context-sensitive
  // error checking (e.g., ensuring that all ordinal arguments precede all
  // named arguments).
  ////////////////////////////////////////////////////////////////////////
  class Arguments : public Expression, public Vectorized<Argument_Obj> {
    ADD_PROPERTY(bool, has_named_arguments)
    ADD_PROPERTY(bool, has_rest_argument)
    ADD_PROPERTY(bool, has_keyword_argument)
  protected:
    void adjust_after_pushing(Argument_Obj a);
  public:
    Arguments(ParserState pstate)
    : Expression(pstate),
      Vectorized<Argument_Obj>(),
      has_named_arguments_(false),
      has_rest_argument_(false),
      has_keyword_argument_(false)
    { }
    Arguments(const Arguments* ptr)
    : Expression(ptr),
      Vectorized<Argument_Obj>(*ptr),
      has_named_arguments_(ptr->has_named_arguments_),
      has_rest_argument_(ptr->has_rest_argument_),
      has_keyword_argument_(ptr->has_keyword_argument_)
    { }

    virtual void set_delayed(bool delayed);

    Argument_Obj get_rest_argument();
    Argument_Obj get_keyword_argument();

    ATTACH_AST_OPERATIONS(Arguments)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////
  // Function reference.
  ////////////////////////////////////////////////////
  class Function : public Value {
  public:
    ADD_PROPERTY(Definition_Obj, definition)
    ADD_PROPERTY(bool, is_css)
  public:
    Function(ParserState pstate, Definition_Obj def, bool css)
    : Value(pstate), definition_(def), is_css_(css)
    { concrete_type(FUNCTION_VAL); }
    Function(const Function* ptr)
    : Value(ptr), definition_(ptr->definition_), is_css_(ptr->is_css_)
    { concrete_type(FUNCTION_VAL); }

    std::string type() const { return "function"; }
    static std::string type_name() { return "function"; }
    bool is_invisible() const { return true; }

    std::string name() {
      if (definition_) {
        return definition_->name();
      }
      return "";
    }

    virtual bool operator== (const Expression& rhs) const;

    ATTACH_AST_OPERATIONS(Function)
    ATTACH_OPERATIONS()
  };

  //////////////////
  // Function calls.
  //////////////////
  class Function_Call : public PreValue {
    HASH_CONSTREF(std::string, name)
    HASH_PROPERTY(Arguments_Obj, arguments)
    HASH_PROPERTY(Function_Obj, func)
    ADD_PROPERTY(bool, via_call)
    ADD_PROPERTY(void*, cookie)
    size_t hash_;
  public:
    Function_Call(ParserState pstate, std::string n, Arguments_Obj args, void* cookie)
    : PreValue(pstate), name_(n), arguments_(args), func_(0), via_call_(false), cookie_(cookie), hash_(0)
    { concrete_type(FUNCTION); }
    Function_Call(ParserState pstate, std::string n, Arguments_Obj args, Function_Obj func)
    : PreValue(pstate), name_(n), arguments_(args), func_(func), via_call_(false), cookie_(0), hash_(0)
    { concrete_type(FUNCTION); }
    Function_Call(ParserState pstate, std::string n, Arguments_Obj args)
    : PreValue(pstate), name_(n), arguments_(args), via_call_(false), cookie_(0), hash_(0)
    { concrete_type(FUNCTION); }
    Function_Call(const Function_Call* ptr)
    : PreValue(ptr),
      name_(ptr->name_),
      arguments_(ptr->arguments_),
      func_(ptr->func_),
      via_call_(ptr->via_call_),
      cookie_(ptr->cookie_),
      hash_(ptr->hash_)
    { concrete_type(FUNCTION); }

    bool is_css() {
      if (func_) return func_->is_css();
      return false;
    }

    virtual bool operator==(const Expression& rhs) const
    {
      try
      {
        Function_Call_Ptr_Const m = Cast<Function_Call>(&rhs);
        if (!(m && name() == m->name())) return false;
        if (!(m && arguments()->length() == m->arguments()->length())) return false;
        for (size_t i =0, L = arguments()->length(); i < L; ++i)
          if (!(*(*arguments())[i] == *(*m->arguments())[i])) return false;
        return true;
      }
      catch (std::bad_cast&)
      {
        return false;
      }
      catch (...) { throw; }
    }

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<std::string>()(name());
        for (auto argument : arguments()->elements())
          hash_combine(hash_, argument->hash());
      }
      return hash_;
    }
    ATTACH_AST_OPERATIONS(Function_Call)
    ATTACH_OPERATIONS()
  };

  /////////////////////////
  // Function call schemas.
  /////////////////////////
  class Function_Call_Schema : public Expression {
    ADD_PROPERTY(String_Obj, name)
    ADD_PROPERTY(Arguments_Obj, arguments)
  public:
    Function_Call_Schema(ParserState pstate, String_Obj n, Arguments_Obj args)
    : Expression(pstate), name_(n), arguments_(args)
    { concrete_type(STRING); }
    Function_Call_Schema(const Function_Call_Schema* ptr)
    : Expression(ptr),
      name_(ptr->name_),
      arguments_(ptr->arguments_)
    { concrete_type(STRING); }
    ATTACH_AST_OPERATIONS(Function_Call_Schema)
    ATTACH_OPERATIONS()
  };

  ///////////////////////
  // Variable references.
  ///////////////////////
  class Variable : public PreValue {
    ADD_CONSTREF(std::string, name)
  public:
    Variable(ParserState pstate, std::string n)
    : PreValue(pstate), name_(n)
    { concrete_type(VARIABLE); }
    Variable(const Variable* ptr)
    : PreValue(ptr), name_(ptr->name_)
    { concrete_type(VARIABLE); }

    virtual bool operator==(const Expression& rhs) const
    {
      try
      {
        Variable_Ptr_Const e = Cast<Variable>(&rhs);
        return e && name() == e->name();
      }
      catch (std::bad_cast&)
      {
        return false;
      }
      catch (...) { throw; }
    }

    virtual size_t hash()
    {
      return std::hash<std::string>()(name());
    }

    ATTACH_AST_OPERATIONS(Variable)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////
  // Numbers, percentages, dimensions, and colors.
  ////////////////////////////////////////////////
  class Number : public Value, public Units {
    HASH_PROPERTY(double, value)
    ADD_PROPERTY(bool, zero)
    size_t hash_;
  public:
    Number(ParserState pstate, double val, std::string u = "", bool zero = true);

    Number(const Number* ptr)
    : Value(ptr),
      Units(ptr),
      value_(ptr->value_), zero_(ptr->zero_),
      hash_(ptr->hash_)
    { concrete_type(NUMBER); }

    bool zero() { return zero_; }
    std::string type() const { return "number"; }
    static std::string type_name() { return "number"; }

    void reduce();
    void normalize();

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<double>()(value_);
        for (const auto numerator : numerators)
          hash_combine(hash_, std::hash<std::string>()(numerator));
        for (const auto denominator : denominators)
          hash_combine(hash_, std::hash<std::string>()(denominator));
      }
      return hash_;
    }

    virtual bool operator< (const Number& rhs) const;
    virtual bool operator== (const Number& rhs) const;
    virtual bool operator== (const Expression& rhs) const;
    ATTACH_AST_OPERATIONS(Number)
    ATTACH_OPERATIONS()
  };

  //////////
  // Colors.
  //////////
  class Color : public Value {
    HASH_PROPERTY(double, r)
    HASH_PROPERTY(double, g)
    HASH_PROPERTY(double, b)
    HASH_PROPERTY(double, a)
    ADD_CONSTREF(std::string, disp)
    size_t hash_;
  public:
    Color(ParserState pstate, double r, double g, double b, double a = 1, const std::string disp = "")
    : Value(pstate), r_(r), g_(g), b_(b), a_(a), disp_(disp),
      hash_(0)
    { concrete_type(COLOR); }
    Color(const Color* ptr)
    : Value(ptr),
      r_(ptr->r_),
      g_(ptr->g_),
      b_(ptr->b_),
      a_(ptr->a_),
      disp_(ptr->disp_),
      hash_(ptr->hash_)
    { concrete_type(COLOR); }
    std::string type() const { return "color"; }
    static std::string type_name() { return "color"; }

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<double>()(a_);
        hash_combine(hash_, std::hash<double>()(r_));
        hash_combine(hash_, std::hash<double>()(g_));
        hash_combine(hash_, std::hash<double>()(b_));
      }
      return hash_;
    }

    virtual bool operator== (const Expression& rhs) const;

    ATTACH_AST_OPERATIONS(Color)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////
  // Errors from Sass_Values.
  //////////////////////////////
  class Custom_Error : public Value {
    ADD_CONSTREF(std::string, message)
  public:
    Custom_Error(ParserState pstate, std::string msg)
    : Value(pstate), message_(msg)
    { concrete_type(C_ERROR); }
    Custom_Error(const Custom_Error* ptr)
    : Value(ptr), message_(ptr->message_)
    { concrete_type(C_ERROR); }
    virtual bool operator== (const Expression& rhs) const;
    ATTACH_AST_OPERATIONS(Custom_Error)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////
  // Warnings from Sass_Values.
  //////////////////////////////
  class Custom_Warning : public Value {
    ADD_CONSTREF(std::string, message)
  public:
    Custom_Warning(ParserState pstate, std::string msg)
    : Value(pstate), message_(msg)
    { concrete_type(C_WARNING); }
    Custom_Warning(const Custom_Warning* ptr)
    : Value(ptr), message_(ptr->message_)
    { concrete_type(C_WARNING); }
    virtual bool operator== (const Expression& rhs) const;
    ATTACH_AST_OPERATIONS(Custom_Warning)
    ATTACH_OPERATIONS()
  };

  ////////////
  // Booleans.
  ////////////
  class Boolean : public Value {
    HASH_PROPERTY(bool, value)
    size_t hash_;
  public:
    Boolean(ParserState pstate, bool val)
    : Value(pstate), value_(val),
      hash_(0)
    { concrete_type(BOOLEAN); }
    Boolean(const Boolean* ptr)
    : Value(ptr),
      value_(ptr->value_),
      hash_(ptr->hash_)
    { concrete_type(BOOLEAN); }
    virtual operator bool() { return value_; }
    std::string type() const { return "bool"; }
    static std::string type_name() { return "bool"; }
    virtual bool is_false() { return !value_; }

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<bool>()(value_);
      }
      return hash_;
    }

    virtual bool operator== (const Expression& rhs) const;

    ATTACH_AST_OPERATIONS(Boolean)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////
  // Abstract base class for Sass string values. Includes interpolated and
  // "flat" strings.
  ////////////////////////////////////////////////////////////////////////
  class String : public Value {
  public:
    String(ParserState pstate, bool delayed = false)
    : Value(pstate, delayed)
    { concrete_type(STRING); }
    String(const String* ptr)
    : Value(ptr)
    { concrete_type(STRING); }
    static std::string type_name() { return "string"; }
    virtual ~String() = 0;
    virtual void rtrim() = 0;
    virtual bool operator==(const Expression& rhs) const = 0;
    virtual bool operator<(const Expression& rhs) const {
      return this->to_string() < rhs.to_string();
    };
    ATTACH_VIRTUAL_AST_OPERATIONS(String);
    ATTACH_OPERATIONS()
  };
  inline String::~String() { };

  ///////////////////////////////////////////////////////////////////////
  // Interpolated strings. Meant to be reduced to flat strings during the
  // evaluation phase.
  ///////////////////////////////////////////////////////////////////////
  class String_Schema : public String, public Vectorized<Expression_Obj> {
    ADD_PROPERTY(bool, css)
    size_t hash_;
  public:
    String_Schema(ParserState pstate, size_t size = 0, bool css = true)
    : String(pstate), Vectorized<Expression_Obj>(size), css_(css), hash_(0)
    { concrete_type(STRING); }
    String_Schema(const String_Schema* ptr)
    : String(ptr),
      Vectorized<Expression_Obj>(*ptr),
      css_(ptr->css_),
      hash_(ptr->hash_)
    { concrete_type(STRING); }

    std::string type() const { return "string"; }
    static std::string type_name() { return "string"; }

    bool is_left_interpolant(void) const;
    bool is_right_interpolant(void) const;
    // void has_interpolants(bool tc) { }
    bool has_interpolants() {
      for (auto el : elements()) {
        if (el->is_interpolant()) return true;
      }
      return false;
    }
    virtual void rtrim();

    virtual size_t hash()
    {
      if (hash_ == 0) {
        for (auto string : elements())
          hash_combine(hash_, string->hash());
      }
      return hash_;
    }

    virtual void set_delayed(bool delayed) {
      is_delayed(delayed);
    }

    virtual bool operator==(const Expression& rhs) const;
    ATTACH_AST_OPERATIONS(String_Schema)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////
  // Flat strings -- the lowest level of raw textual data.
  ////////////////////////////////////////////////////////
  class String_Constant : public String {
    ADD_PROPERTY(char, quote_mark)
    ADD_PROPERTY(bool, can_compress_whitespace)
    HASH_CONSTREF(std::string, value)
  protected:
    size_t hash_;
  public:
    String_Constant(const String_Constant* ptr)
    : String(ptr),
      quote_mark_(ptr->quote_mark_),
      can_compress_whitespace_(ptr->can_compress_whitespace_),
      value_(ptr->value_),
      hash_(ptr->hash_)
    { }
    String_Constant(ParserState pstate, std::string val, bool css = true)
    : String(pstate), quote_mark_(0), can_compress_whitespace_(false), value_(read_css_string(val, css)), hash_(0)
    { }
    String_Constant(ParserState pstate, const char* beg, bool css = true)
    : String(pstate), quote_mark_(0), can_compress_whitespace_(false), value_(read_css_string(std::string(beg), css)), hash_(0)
    { }
    String_Constant(ParserState pstate, const char* beg, const char* end, bool css = true)
    : String(pstate), quote_mark_(0), can_compress_whitespace_(false), value_(read_css_string(std::string(beg, end-beg), css)), hash_(0)
    { }
    String_Constant(ParserState pstate, const Token& tok, bool css = true)
    : String(pstate), quote_mark_(0), can_compress_whitespace_(false), value_(read_css_string(std::string(tok.begin, tok.end), css)), hash_(0)
    { }
    std::string type() const { return "string"; }
    static std::string type_name() { return "string"; }
    virtual bool is_invisible() const;
    virtual void rtrim();

    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_ = std::hash<std::string>()(value_);
      }
      return hash_;
    }

    virtual bool operator==(const Expression& rhs) const;
    virtual std::string inspect() const; // quotes are forced on inspection

    // static char auto_quote() { return '*'; }
    static char double_quote() { return '"'; }
    static char single_quote() { return '\''; }

    ATTACH_AST_OPERATIONS(String_Constant)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////
  // Possibly quoted string (unquote on instantiation)
  ////////////////////////////////////////////////////////
  class String_Quoted : public String_Constant {
  public:
    String_Quoted(ParserState pstate, std::string val, char q = 0,
      bool keep_utf8_escapes = false, bool skip_unquoting = false,
      bool strict_unquoting = true, bool css = true)
    : String_Constant(pstate, val, css)
    {
      if (skip_unquoting == false) {
        value_ = unquote(value_, &quote_mark_, keep_utf8_escapes, strict_unquoting);
      }
      if (q && quote_mark_) quote_mark_ = q;
    }
    String_Quoted(const String_Quoted* ptr)
    : String_Constant(ptr)
    { }
    virtual bool operator==(const Expression& rhs) const;
    virtual std::string inspect() const; // quotes are forced on inspection
    ATTACH_AST_OPERATIONS(String_Quoted)
    ATTACH_OPERATIONS()
  };

  /////////////////
  // Media queries.
  /////////////////
  class Media_Query : public Expression,
                      public Vectorized<Media_Query_Expression_Obj> {
    ADD_PROPERTY(String_Obj, media_type)
    ADD_PROPERTY(bool, is_negated)
    ADD_PROPERTY(bool, is_restricted)
  public:
    Media_Query(ParserState pstate,
                String_Obj t = 0, size_t s = 0, bool n = false, bool r = false)
    : Expression(pstate), Vectorized<Media_Query_Expression_Obj>(s),
      media_type_(t), is_negated_(n), is_restricted_(r)
    { }
    Media_Query(const Media_Query* ptr)
    : Expression(ptr),
      Vectorized<Media_Query_Expression_Obj>(*ptr),
      media_type_(ptr->media_type_),
      is_negated_(ptr->is_negated_),
      is_restricted_(ptr->is_restricted_)
    { }
    ATTACH_AST_OPERATIONS(Media_Query)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////
  // Media expressions (for use inside media queries).
  ////////////////////////////////////////////////////
  class Media_Query_Expression : public Expression {
    ADD_PROPERTY(Expression_Obj, feature)
    ADD_PROPERTY(Expression_Obj, value)
    ADD_PROPERTY(bool, is_interpolated)
  public:
    Media_Query_Expression(ParserState pstate,
                           Expression_Obj f, Expression_Obj v, bool i = false)
    : Expression(pstate), feature_(f), value_(v), is_interpolated_(i)
    { }
    Media_Query_Expression(const Media_Query_Expression* ptr)
    : Expression(ptr),
      feature_(ptr->feature_),
      value_(ptr->value_),
      is_interpolated_(ptr->is_interpolated_)
    { }
    ATTACH_AST_OPERATIONS(Media_Query_Expression)
    ATTACH_OPERATIONS()
  };

  ////////////////////
  // `@supports` rule.
  ////////////////////
  class Supports_Block : public Has_Block {
    ADD_PROPERTY(Supports_Condition_Obj, condition)
  public:
    Supports_Block(ParserState pstate, Supports_Condition_Obj condition, Block_Obj block = 0)
    : Has_Block(pstate, block), condition_(condition)
    { statement_type(SUPPORTS); }
    Supports_Block(const Supports_Block* ptr)
    : Has_Block(ptr), condition_(ptr->condition_)
    { statement_type(SUPPORTS); }
    bool bubbles() { return true; }
    ATTACH_AST_OPERATIONS(Supports_Block)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////////////////////////////
  // The abstract superclass of all Supports conditions.
  //////////////////////////////////////////////////////
  class Supports_Condition : public Expression {
  public:
    Supports_Condition(ParserState pstate)
    : Expression(pstate)
    { }
    Supports_Condition(const Supports_Condition* ptr)
    : Expression(ptr)
    { }
    virtual bool needs_parens(Supports_Condition_Obj cond) const { return false; }
    ATTACH_AST_OPERATIONS(Supports_Condition)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////
  // An operator condition (e.g. `CONDITION1 and CONDITION2`).
  ////////////////////////////////////////////////////////////
  class Supports_Operator : public Supports_Condition {
  public:
    enum Operand { AND, OR };
  private:
    ADD_PROPERTY(Supports_Condition_Obj, left);
    ADD_PROPERTY(Supports_Condition_Obj, right);
    ADD_PROPERTY(Operand, operand);
  public:
    Supports_Operator(ParserState pstate, Supports_Condition_Obj l, Supports_Condition_Obj r, Operand o)
    : Supports_Condition(pstate), left_(l), right_(r), operand_(o)
    { }
    Supports_Operator(const Supports_Operator* ptr)
    : Supports_Condition(ptr),
      left_(ptr->left_),
      right_(ptr->right_),
      operand_(ptr->operand_)
    { }
    virtual bool needs_parens(Supports_Condition_Obj cond) const;
    ATTACH_AST_OPERATIONS(Supports_Operator)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////////////////
  // A negation condition (`not CONDITION`).
  //////////////////////////////////////////
  class Supports_Negation : public Supports_Condition {
  private:
    ADD_PROPERTY(Supports_Condition_Obj, condition);
  public:
    Supports_Negation(ParserState pstate, Supports_Condition_Obj c)
    : Supports_Condition(pstate), condition_(c)
    { }
    Supports_Negation(const Supports_Negation* ptr)
    : Supports_Condition(ptr), condition_(ptr->condition_)
    { }
    virtual bool needs_parens(Supports_Condition_Obj cond) const;
    ATTACH_AST_OPERATIONS(Supports_Negation)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////////
  // A declaration condition (e.g. `(feature: value)`).
  /////////////////////////////////////////////////////
  class Supports_Declaration : public Supports_Condition {
  private:
    ADD_PROPERTY(Expression_Obj, feature);
    ADD_PROPERTY(Expression_Obj, value);
  public:
    Supports_Declaration(ParserState pstate, Expression_Obj f, Expression_Obj v)
    : Supports_Condition(pstate), feature_(f), value_(v)
    { }
    Supports_Declaration(const Supports_Declaration* ptr)
    : Supports_Condition(ptr),
      feature_(ptr->feature_),
      value_(ptr->value_)
    { }
    virtual bool needs_parens(Supports_Condition_Obj cond) const { return false; }
    ATTACH_AST_OPERATIONS(Supports_Declaration)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////
  // An interpolation condition (e.g. `#{$var}`).
  ///////////////////////////////////////////////
  class Supports_Interpolation : public Supports_Condition {
  private:
    ADD_PROPERTY(Expression_Obj, value);
  public:
    Supports_Interpolation(ParserState pstate, Expression_Obj v)
    : Supports_Condition(pstate), value_(v)
    { }
    Supports_Interpolation(const Supports_Interpolation* ptr)
    : Supports_Condition(ptr),
      value_(ptr->value_)
    { }
    virtual bool needs_parens(Supports_Condition_Obj cond) const { return false; }
    ATTACH_AST_OPERATIONS(Supports_Interpolation)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////
  // At root expressions (for use inside @at-root).
  /////////////////////////////////////////////////
  class At_Root_Query : public Expression {
  private:
    ADD_PROPERTY(Expression_Obj, feature)
    ADD_PROPERTY(Expression_Obj, value)
  public:
    At_Root_Query(ParserState pstate, Expression_Obj f = 0, Expression_Obj v = 0, bool i = false)
    : Expression(pstate), feature_(f), value_(v)
    { }
    At_Root_Query(const At_Root_Query* ptr)
    : Expression(ptr),
      feature_(ptr->feature_),
      value_(ptr->value_)
    { }
    bool exclude(std::string str);
    ATTACH_AST_OPERATIONS(At_Root_Query)
    ATTACH_OPERATIONS()
  };

  ///////////
  // At-root.
  ///////////
  class At_Root_Block : public Has_Block {
    ADD_PROPERTY(At_Root_Query_Obj, expression)
  public:
    At_Root_Block(ParserState pstate, Block_Obj b = 0, At_Root_Query_Obj e = 0)
    : Has_Block(pstate, b), expression_(e)
    { statement_type(ATROOT); }
    At_Root_Block(const At_Root_Block* ptr)
    : Has_Block(ptr), expression_(ptr->expression_)
    { statement_type(ATROOT); }
    bool bubbles() { return true; }
    bool exclude_node(Statement_Obj s) {
      if (expression() == 0)
      {
        return s->statement_type() == Statement::RULESET;
      }

      if (s->statement_type() == Statement::DIRECTIVE)
      {
        if (Directive_Obj dir = Cast<Directive>(s))
        {
          std::string keyword(dir->keyword());
          if (keyword.length() > 0) keyword.erase(0, 1);
          return expression()->exclude(keyword);
        }
      }
      if (s->statement_type() == Statement::MEDIA)
      {
        return expression()->exclude("media");
      }
      if (s->statement_type() == Statement::RULESET)
      {
        return expression()->exclude("rule");
      }
      if (s->statement_type() == Statement::SUPPORTS)
      {
        return expression()->exclude("supports");
      }
      if (Directive_Obj dir = Cast<Directive>(s))
      {
        if (dir->is_keyframes()) return expression()->exclude("keyframes");
      }
      return false;
    }
    ATTACH_AST_OPERATIONS(At_Root_Block)
    ATTACH_OPERATIONS()
  };

  //////////////////
  // The null value.
  //////////////////
  class Null : public Value {
  public:
    Null(ParserState pstate) : Value(pstate) { concrete_type(NULL_VAL); }
    Null(const Null* ptr) : Value(ptr) { concrete_type(NULL_VAL); }
    std::string type() const { return "null"; }
    static std::string type_name() { return "null"; }
    bool is_invisible() const { return true; }
    operator bool() { return false; }
    bool is_false() { return true; }

    virtual size_t hash()
    {
      return -1;
    }

    virtual bool operator== (const Expression& rhs) const;

    ATTACH_AST_OPERATIONS(Null)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////
  // Thunks for delayed evaluation.
  /////////////////////////////////
  class Thunk : public Expression {
    ADD_PROPERTY(Expression_Obj, expression)
    ADD_PROPERTY(Env*, environment)
  public:
    Thunk(ParserState pstate, Expression_Obj exp, Env* env = 0)
    : Expression(pstate), expression_(exp), environment_(env)
    { }
  };

  /////////////////////////////////////////////////////////
  // Individual parameter objects for mixins and functions.
  /////////////////////////////////////////////////////////
  class Parameter : public AST_Node {
    ADD_CONSTREF(std::string, name)
    ADD_PROPERTY(Expression_Obj, default_value)
    ADD_PROPERTY(bool, is_rest_parameter)
  public:
    Parameter(ParserState pstate,
              std::string n, Expression_Obj def = 0, bool rest = false)
    : AST_Node(pstate), name_(n), default_value_(def), is_rest_parameter_(rest)
    {
      // tried to come up with a spec test for this, but it does no longer
      // get  past the parser (it error out earlier). A spec test was added!
      // if (default_value_ && is_rest_parameter_) {
      //   error("variable-length parameter may not have a default value", pstate_);
      // }
    }
    Parameter(const Parameter* ptr)
    : AST_Node(ptr),
      name_(ptr->name_),
      default_value_(ptr->default_value_),
      is_rest_parameter_(ptr->is_rest_parameter_)
    {
      // tried to come up with a spec test for this, but it does no longer
      // get  past the parser (it error out earlier). A spec test was added!
      // if (default_value_ && is_rest_parameter_) {
      //   error("variable-length parameter may not have a default value", pstate_);
      // }
    }
    ATTACH_AST_OPERATIONS(Parameter)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////////////////////////////
  // Parameter lists -- in their own class to facilitate context-sensitive
  // error checking (e.g., ensuring that all optional parameters follow all
  // required parameters).
  /////////////////////////////////////////////////////////////////////////
  class Parameters : public AST_Node, public Vectorized<Parameter_Obj> {
    ADD_PROPERTY(bool, has_optional_parameters)
    ADD_PROPERTY(bool, has_rest_parameter)
  protected:
    void adjust_after_pushing(Parameter_Obj p)
    {
      if (p->default_value()) {
        if (has_rest_parameter()) {
          coreError("optional parameters may not be combined with variable-length parameters", p->pstate());
        }
        has_optional_parameters(true);
      }
      else if (p->is_rest_parameter()) {
        if (has_rest_parameter()) {
          coreError("functions and mixins cannot have more than one variable-length parameter", p->pstate());
        }
        has_rest_parameter(true);
      }
      else {
        if (has_rest_parameter()) {
          coreError("required parameters must precede variable-length parameters", p->pstate());
        }
        if (has_optional_parameters()) {
          coreError("required parameters must precede optional parameters", p->pstate());
        }
      }
    }
  public:
    Parameters(ParserState pstate)
    : AST_Node(pstate),
      Vectorized<Parameter_Obj>(),
      has_optional_parameters_(false),
      has_rest_parameter_(false)
    { }
    Parameters(const Parameters* ptr)
    : AST_Node(ptr),
      Vectorized<Parameter_Obj>(*ptr),
      has_optional_parameters_(ptr->has_optional_parameters_),
      has_rest_parameter_(ptr->has_rest_parameter_)
    { }
    ATTACH_AST_OPERATIONS(Parameters)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////
  // Abstract base class for CSS selectors.
  /////////////////////////////////////////
  class Selector : public Expression {
    // ADD_PROPERTY(bool, has_reference)
    // line break before list separator
    ADD_PROPERTY(bool, has_line_feed)
    // line break after list separator
    ADD_PROPERTY(bool, has_line_break)
    // maybe we have optional flag
    ADD_PROPERTY(bool, is_optional)
    // parent block pointers

    // must not be a reference counted object
    // otherwise we create circular references
    ADD_PROPERTY(Media_Block_Ptr, media_block)
  protected:
    size_t hash_;
  public:
    Selector(ParserState pstate)
    : Expression(pstate),
      has_line_feed_(false),
      has_line_break_(false),
      is_optional_(false),
      media_block_(0),
      hash_(0)
    { concrete_type(SELECTOR); }
    Selector(const Selector* ptr)
    : Expression(ptr),
      // has_reference_(ptr->has_reference_),
      has_line_feed_(ptr->has_line_feed_),
      has_line_break_(ptr->has_line_break_),
      is_optional_(ptr->is_optional_),
      media_block_(ptr->media_block_),
      hash_(ptr->hash_)
    { concrete_type(SELECTOR); }
    virtual ~Selector() = 0;
    virtual size_t hash() = 0;
    virtual unsigned long specificity() const = 0;
    virtual void set_media_block(Media_Block_Ptr mb) {
      media_block(mb);
    }
    virtual bool has_parent_ref() const {
      return false;
    }
    virtual bool has_real_parent_ref() const {
      return false;
    }
    // dispatch to correct handlers
    virtual bool operator<(const Selector& rhs) const = 0;
    virtual bool operator==(const Selector& rhs) const = 0;
    ATTACH_VIRTUAL_AST_OPERATIONS(Selector);
  };
  inline Selector::~Selector() { }

  /////////////////////////////////////////////////////////////////////////
  // Interpolated selectors -- the interpolated String will be expanded and
  // re-parsed into a normal selector class.
  /////////////////////////////////////////////////////////////////////////
  class Selector_Schema : public AST_Node {
    ADD_PROPERTY(String_Obj, contents)
    ADD_PROPERTY(bool, connect_parent);
    // must not be a reference counted object
    // otherwise we create circular references
    ADD_PROPERTY(Media_Block_Ptr, media_block)
    // store computed hash
    size_t hash_;
  public:
    Selector_Schema(ParserState pstate, String_Obj c)
    : AST_Node(pstate),
      contents_(c),
      connect_parent_(true),
      media_block_(NULL),
      hash_(0)
    { }
    Selector_Schema(const Selector_Schema* ptr)
    : AST_Node(ptr),
      contents_(ptr->contents_),
      connect_parent_(ptr->connect_parent_),
      media_block_(ptr->media_block_),
      hash_(ptr->hash_)
    { }
    virtual bool has_parent_ref() const;
    virtual bool has_real_parent_ref() const;
    virtual bool operator<(const Selector& rhs) const;
    virtual bool operator==(const Selector& rhs) const;
    // selector schema is not yet a final selector, so we do not
    // have a specificity for it yet. We need to
    virtual unsigned long specificity() const { return 0; }
    virtual size_t hash() {
      if (hash_ == 0) {
        hash_combine(hash_, contents_->hash());
      }
      return hash_;
    }
    ATTACH_AST_OPERATIONS(Selector_Schema)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////
  // Abstract base class for simple selectors.
  ////////////////////////////////////////////
  class Simple_Selector : public Selector {
    ADD_CONSTREF(std::string, ns)
    ADD_CONSTREF(std::string, name)
    ADD_PROPERTY(Simple_Type, simple_type)
    ADD_PROPERTY(bool, has_ns)
  public:
    Simple_Selector(ParserState pstate, std::string n = "")
    : Selector(pstate), ns_(""), name_(n), has_ns_(false)
    {
      simple_type(SIMPLE);
      size_t pos = n.find('|');
      // found some namespace
      if (pos != std::string::npos) {
        has_ns_ = true;
        ns_ = n.substr(0, pos);
        name_ = n.substr(pos + 1);
      }
    }
    Simple_Selector(const Simple_Selector* ptr)
    : Selector(ptr),
      ns_(ptr->ns_),
      name_(ptr->name_),
      has_ns_(ptr->has_ns_)
    { simple_type(SIMPLE); }
    virtual std::string ns_name() const
    {
      std::string name("");
      if (has_ns_)
        name += ns_ + "|";
      return name + name_;
    }
    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_combine(hash_, std::hash<int>()(SELECTOR));
        hash_combine(hash_, std::hash<std::string>()(ns()));
        hash_combine(hash_, std::hash<std::string>()(name()));
      }
      return hash_;
    }
    // namespace compare functions
    bool is_ns_eq(const Simple_Selector& r) const;
    // namespace query functions
    bool is_universal_ns() const
    {
      return has_ns_ && ns_ == "*";
    }
    bool has_universal_ns() const
    {
      return !has_ns_ || ns_ == "*";
    }
    bool is_empty_ns() const
    {
      return !has_ns_ || ns_ == "";
    }
    bool has_empty_ns() const
    {
      return has_ns_ && ns_ == "";
    }
    bool has_qualified_ns() const
    {
      return has_ns_ && ns_ != "" && ns_ != "*";
    }
    // name query functions
    bool is_universal() const
    {
      return name_ == "*";
    }

    virtual bool has_placeholder() {
      return false;
    }

    virtual ~Simple_Selector() = 0;
    virtual Compound_Selector_Ptr unify_with(Compound_Selector_Ptr);
    virtual bool has_parent_ref() const { return false; };
    virtual bool has_real_parent_ref() const  { return false; };
    virtual bool is_pseudo_element() const { return false; }

    virtual bool is_superselector_of(Compound_Selector_Obj sub) { return false; }

    virtual bool operator==(const Selector& rhs) const;
    virtual bool operator==(const Simple_Selector& rhs) const;
    inline bool operator!=(const Simple_Selector& rhs) const { return !(*this == rhs); }

    bool operator<(const Selector& rhs) const;
    bool operator<(const Simple_Selector& rhs) const;
    // default implementation should work for most of the simple selectors (otherwise overload)
    ATTACH_VIRTUAL_AST_OPERATIONS(Simple_Selector);
    ATTACH_OPERATIONS();
  };
  inline Simple_Selector::~Simple_Selector() { }


  //////////////////////////////////
  // The Parent Selector Expression.
  //////////////////////////////////
  // parent selectors can occur in selectors but also
  // inside strings in declarations (Compound_Selector).
  // only one simple parent selector means the first case.
  class Parent_Selector : public Simple_Selector {
    ADD_PROPERTY(bool, real)
  public:
    Parent_Selector(ParserState pstate, bool r = true)
    : Simple_Selector(pstate, "&"), real_(r)
    { /* has_reference(true); */ }
    Parent_Selector(const Parent_Selector* ptr)
    : Simple_Selector(ptr), real_(ptr->real_)
    { /* has_reference(true); */ }
    bool is_real_parent_ref() const { return real(); };
    virtual bool has_parent_ref() const { return true; };
    virtual bool has_real_parent_ref() const { return is_real_parent_ref(); };
    virtual unsigned long specificity() const
    {
      return 0;
    }
    std::string type() const { return "selector"; }
    static std::string type_name() { return "selector"; }
    ATTACH_AST_OPERATIONS(Parent_Selector)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////////////////////////////
  // Placeholder selectors (e.g., "%foo") for use in extend-only selectors.
  /////////////////////////////////////////////////////////////////////////
  class Placeholder_Selector : public Simple_Selector {
  public:
    Placeholder_Selector(ParserState pstate, std::string n)
    : Simple_Selector(pstate, n)
    { }
    Placeholder_Selector(const Placeholder_Selector* ptr)
    : Simple_Selector(ptr)
    { }
    virtual unsigned long specificity() const
    {
      return Constants::Specificity_Base;
    }
    virtual bool has_placeholder() {
      return true;
    }
    virtual ~Placeholder_Selector() {};
    ATTACH_AST_OPERATIONS(Placeholder_Selector)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////////////////////////
  // Element selectors (and the universal selector) -- e.g., div, span, *.
  /////////////////////////////////////////////////////////////////////
  class Element_Selector : public Simple_Selector {
  public:
    Element_Selector(ParserState pstate, std::string n)
    : Simple_Selector(pstate, n)
    { }
    Element_Selector(const Element_Selector* ptr)
    : Simple_Selector(ptr)
    { }
    virtual unsigned long specificity() const
    {
      if (name() == "*") return 0;
      else               return Constants::Specificity_Element;
    }
    virtual Simple_Selector_Ptr unify_with(Simple_Selector_Ptr);
    virtual Compound_Selector_Ptr unify_with(Compound_Selector_Ptr);
    virtual bool operator==(const Simple_Selector& rhs) const;
    virtual bool operator==(const Element_Selector& rhs) const;
    virtual bool operator<(const Simple_Selector& rhs) const;
    virtual bool operator<(const Element_Selector& rhs) const;
    ATTACH_AST_OPERATIONS(Element_Selector)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////
  // Class selectors  -- i.e., .foo.
  ////////////////////////////////////////////////
  class Class_Selector : public Simple_Selector {
  public:
    Class_Selector(ParserState pstate, std::string n)
    : Simple_Selector(pstate, n)
    { }
    Class_Selector(const Class_Selector* ptr)
    : Simple_Selector(ptr)
    { }
    virtual unsigned long specificity() const
    {
      return Constants::Specificity_Class;
    }
    virtual Compound_Selector_Ptr unify_with(Compound_Selector_Ptr);
    ATTACH_AST_OPERATIONS(Class_Selector)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////
  // ID selectors -- i.e., #foo.
  ////////////////////////////////////////////////
  class Id_Selector : public Simple_Selector {
  public:
    Id_Selector(ParserState pstate, std::string n)
    : Simple_Selector(pstate, n)
    { }
    Id_Selector(const Id_Selector* ptr)
    : Simple_Selector(ptr)
    { }
    virtual unsigned long specificity() const
    {
      return Constants::Specificity_ID;
    }
    virtual Compound_Selector_Ptr unify_with(Compound_Selector_Ptr);
    ATTACH_AST_OPERATIONS(Id_Selector)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////////////////////
  // Attribute selectors -- e.g., [src*=".jpg"], etc.
  ///////////////////////////////////////////////////
  class Attribute_Selector : public Simple_Selector {
    ADD_CONSTREF(std::string, matcher)
    // this cannot be changed to obj atm!!!!!!????!!!!!!!
    ADD_PROPERTY(String_Obj, value) // might be interpolated
    ADD_PROPERTY(char, modifier);
  public:
    Attribute_Selector(ParserState pstate, std::string n, std::string m, String_Obj v, char o = 0)
    : Simple_Selector(pstate, n), matcher_(m), value_(v), modifier_(o)
    { simple_type(ATTR_SEL); }
    Attribute_Selector(const Attribute_Selector* ptr)
    : Simple_Selector(ptr),
      matcher_(ptr->matcher_),
      value_(ptr->value_),
      modifier_(ptr->modifier_)
    { simple_type(ATTR_SEL); }
    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_combine(hash_, Simple_Selector::hash());
        hash_combine(hash_, std::hash<std::string>()(matcher()));
        if (value_) hash_combine(hash_, value_->hash());
      }
      return hash_;
    }
    virtual unsigned long specificity() const
    {
      return Constants::Specificity_Attr;
    }
    virtual bool operator==(const Simple_Selector& rhs) const;
    virtual bool operator==(const Attribute_Selector& rhs) const;
    virtual bool operator<(const Simple_Selector& rhs) const;
    virtual bool operator<(const Attribute_Selector& rhs) const;
    ATTACH_AST_OPERATIONS(Attribute_Selector)
    ATTACH_OPERATIONS()
  };

  //////////////////////////////////////////////////////////////////
  // Pseudo selectors -- e.g., :first-child, :nth-of-type(...), etc.
  //////////////////////////////////////////////////////////////////
  /* '::' starts a pseudo-element, ':' a pseudo-class */
  /* Except :first-line, :first-letter, :before and :after */
  /* Note that pseudo-elements are restricted to one per selector */
  /* and occur only in the last simple_selector_sequence. */
  inline bool is_pseudo_class_element(const std::string& name)
  {
    return name == ":before"       ||
           name == ":after"        ||
           name == ":first-line"   ||
           name == ":first-letter";
  }

  // Pseudo Selector cannot have any namespace?
  class Pseudo_Selector : public Simple_Selector {
    ADD_PROPERTY(String_Obj, expression)
  public:
    Pseudo_Selector(ParserState pstate, std::string n, String_Obj expr = 0)
    : Simple_Selector(pstate, n), expression_(expr)
    { simple_type(PSEUDO_SEL); }
    Pseudo_Selector(const Pseudo_Selector* ptr)
    : Simple_Selector(ptr), expression_(ptr->expression_)
    { simple_type(PSEUDO_SEL); }

    // A pseudo-element is made of two colons (::) followed by the name.
    // The `::` notation is introduced by the current document in order to
    // establish a discrimination between pseudo-classes and pseudo-elements.
    // For compatibility with existing style sheets, user agents must also
    // accept the previous one-colon notation for pseudo-elements introduced
    // in CSS levels 1 and 2 (namely, :first-line, :first-letter, :before and
    // :after). This compatibility is not allowed for the new pseudo-elements
    // introduced in this specification.
    virtual bool is_pseudo_element() const
    {
      return (name_[0] == ':' && name_[1] == ':')
             || is_pseudo_class_element(name_);
    }
    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_combine(hash_, Simple_Selector::hash());
        if (expression_) hash_combine(hash_, expression_->hash());
      }
      return hash_;
    }
    virtual unsigned long specificity() const
    {
      if (is_pseudo_element())
        return Constants::Specificity_Element;
      return Constants::Specificity_Pseudo;
    }
    virtual bool operator==(const Simple_Selector& rhs) const;
    virtual bool operator==(const Pseudo_Selector& rhs) const;
    virtual bool operator<(const Simple_Selector& rhs) const;
    virtual bool operator<(const Pseudo_Selector& rhs) const;
    virtual Compound_Selector_Ptr unify_with(Compound_Selector_Ptr);
    ATTACH_AST_OPERATIONS(Pseudo_Selector)
    ATTACH_OPERATIONS()
  };

  /////////////////////////////////////////////////
  // Wrapped selector -- pseudo selector that takes a list of selectors as argument(s) e.g., :not(:first-of-type), :-moz-any(ol p.blah, ul, menu, dir)
  /////////////////////////////////////////////////
  class Wrapped_Selector : public Simple_Selector {
    ADD_PROPERTY(Selector_List_Obj, selector)
  public:
    Wrapped_Selector(ParserState pstate, std::string n, Selector_List_Obj sel)
    : Simple_Selector(pstate, n), selector_(sel)
    { simple_type(WRAPPED_SEL); }
    Wrapped_Selector(const Wrapped_Selector* ptr)
    : Simple_Selector(ptr), selector_(ptr->selector_)
    { simple_type(WRAPPED_SEL); }
    virtual bool is_superselector_of(Wrapped_Selector_Obj sub);
    // Selectors inside the negation pseudo-class are counted like any
    // other, but the negation itself does not count as a pseudo-class.
    virtual size_t hash();
    virtual bool has_parent_ref() const;
    virtual bool has_real_parent_ref() const;
    virtual unsigned long specificity() const;
    virtual bool find ( bool (*f)(AST_Node_Obj) );
    virtual bool operator==(const Simple_Selector& rhs) const;
    virtual bool operator==(const Wrapped_Selector& rhs) const;
    virtual bool operator<(const Simple_Selector& rhs) const;
    virtual bool operator<(const Wrapped_Selector& rhs) const;
    virtual void cloneChildren();
    ATTACH_AST_OPERATIONS(Wrapped_Selector)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////////
  // Simple selector sequences. Maintains flags indicating whether it contains
  // any parent references or placeholders, to simplify expansion.
  ////////////////////////////////////////////////////////////////////////////
  class Compound_Selector : public Selector, public Vectorized<Simple_Selector_Obj> {
  private:
    ComplexSelectorSet sources_;
    ADD_PROPERTY(bool, extended);
    ADD_PROPERTY(bool, has_parent_reference);
  protected:
    void adjust_after_pushing(Simple_Selector_Obj s)
    {
      // if (s->has_reference())   has_reference(true);
      // if (s->has_placeholder()) has_placeholder(true);
    }
  public:
    Compound_Selector(ParserState pstate, size_t s = 0)
    : Selector(pstate),
      Vectorized<Simple_Selector_Obj>(s),
      extended_(false),
      has_parent_reference_(false)
    { }
    Compound_Selector(const Compound_Selector* ptr)
    : Selector(ptr),
      Vectorized<Simple_Selector_Obj>(*ptr),
      extended_(ptr->extended_),
      has_parent_reference_(ptr->has_parent_reference_)
    { }
    bool contains_placeholder() {
      for (size_t i = 0, L = length(); i < L; ++i) {
        if ((*this)[i]->has_placeholder()) return true;
      }
      return false;
    };

    void append(Simple_Selector_Ptr element);

    bool is_universal() const
    {
      return length() == 1 && (*this)[0]->is_universal();
    }

    Complex_Selector_Obj to_complex();
    Compound_Selector_Ptr unify_with(Compound_Selector_Ptr rhs);
    // virtual Placeholder_Selector_Ptr find_placeholder();
    virtual bool has_parent_ref() const;
    virtual bool has_real_parent_ref() const;
    Simple_Selector_Ptr base() const {
      if (length() == 0) return 0;
      // ToDo: why is this needed?
      if (Cast<Element_Selector>((*this)[0]))
        return (*this)[0];
      return 0;
    }
    virtual bool is_superselector_of(Compound_Selector_Obj sub, std::string wrapped = "");
    virtual bool is_superselector_of(Complex_Selector_Obj sub, std::string wrapped = "");
    virtual bool is_superselector_of(Selector_List_Obj sub, std::string wrapped = "");
    virtual size_t hash()
    {
      if (Selector::hash_ == 0) {
        hash_combine(Selector::hash_, std::hash<int>()(SELECTOR));
        if (length()) hash_combine(Selector::hash_, Vectorized::hash());
      }
      return Selector::hash_;
    }
    virtual unsigned long specificity() const
    {
      int sum = 0;
      for (size_t i = 0, L = length(); i < L; ++i)
      { sum += (*this)[i]->specificity(); }
      return sum;
    }

    virtual bool has_placeholder()
    {
      if (length() == 0) return false;
      if (Simple_Selector_Obj ss = elements().front()) {
        if (ss->has_placeholder()) return true;
      }
      return false;
    }

    bool is_empty_reference()
    {
      return length() == 1 &&
             Cast<Parent_Selector>((*this)[0]);
    }

    virtual bool find ( bool (*f)(AST_Node_Obj) );
    virtual bool operator<(const Selector& rhs) const;
    virtual bool operator==(const Selector& rhs) const;
    virtual bool operator<(const Compound_Selector& rhs) const;
    virtual bool operator==(const Compound_Selector& rhs) const;
    inline bool operator!=(const Compound_Selector& rhs) const { return !(*this == rhs); }

    ComplexSelectorSet& sources() { return sources_; }
    void clearSources() { sources_.clear(); }
    void mergeSources(ComplexSelectorSet& sources);

    Compound_Selector_Ptr minus(Compound_Selector_Ptr rhs);
    virtual void cloneChildren();
    ATTACH_AST_OPERATIONS(Compound_Selector)
    ATTACH_OPERATIONS()
  };

  ////////////////////////////////////////////////////////////////////////////
  // General selectors -- i.e., simple sequences combined with one of the four
  // CSS selector combinators (">", "+", "~", and whitespace). Essentially a
  // linked list.
  ////////////////////////////////////////////////////////////////////////////
  class Complex_Selector : public Selector {
  public:
    enum Combinator { ANCESTOR_OF, PARENT_OF, PRECEDES, ADJACENT_TO, REFERENCE };
  private:
    HASH_CONSTREF(Combinator, combinator)
    HASH_PROPERTY(Compound_Selector_Obj, head)
    HASH_PROPERTY(Complex_Selector_Obj, tail)
    HASH_PROPERTY(String_Obj, reference);
  public:
    bool contains_placeholder() {
      if (head() && head()->contains_placeholder()) return true;
      if (tail() && tail()->contains_placeholder()) return true;
      return false;
    };
    Complex_Selector(ParserState pstate,
                     Combinator c = ANCESTOR_OF,
                     Compound_Selector_Obj h = 0,
                     Complex_Selector_Obj t = 0,
                     String_Obj r = 0)
    : Selector(pstate),
      combinator_(c),
      head_(h), tail_(t),
      reference_(r)
    {}
    Complex_Selector(const Complex_Selector* ptr)
    : Selector(ptr),
      combinator_(ptr->combinator_),
      head_(ptr->head_), tail_(ptr->tail_),
      reference_(ptr->reference_)
    {};
    virtual bool has_parent_ref() const;
    virtual bool has_real_parent_ref() const;

    Complex_Selector_Obj skip_empty_reference()
    {
      if ((!head_ || !head_->length() || head_->is_empty_reference()) &&
          combinator() == Combinator::ANCESTOR_OF)
      {
        if (!tail_) return 0;
        tail_->has_line_feed_ = this->has_line_feed_;
        // tail_->has_line_break_ = this->has_line_break_;
        return tail_->skip_empty_reference();
      }
      return this;
    }

    // can still have a tail
    bool is_empty_ancestor() const
    {
      return (!head() || head()->length() == 0) &&
             combinator() == Combinator::ANCESTOR_OF;
    }

    Selector_List_Ptr tails(Selector_List_Ptr tails);

    // front returns the first real tail
    // skips over parent and empty ones
    Complex_Selector_Obj first();
    // last returns the last real tail
    Complex_Selector_Obj last();

    // some shortcuts that should be removed
    Complex_Selector_Obj innermost() { return last(); };

    size_t length() const;
    Selector_List_Ptr resolve_parent_refs(std::vector<Selector_List_Obj>& pstack, Backtraces& traces, bool implicit_parent = true);
    virtual bool is_superselector_of(Compound_Selector_Obj sub, std::string wrapping = "");
    virtual bool is_superselector_of(Complex_Selector_Obj sub, std::string wrapping = "");
    virtual bool is_superselector_of(Selector_List_Obj sub, std::string wrapping = "");
    Selector_List_Ptr unify_with(Complex_Selector_Ptr rhs);
    Combinator clear_innermost();
    void append(Complex_Selector_Obj, Backtraces& traces);
    void set_innermost(Complex_Selector_Obj, Combinator);
    virtual size_t hash()
    {
      if (hash_ == 0) {
        hash_combine(hash_, std::hash<int>()(SELECTOR));
        hash_combine(hash_, std::hash<int>()(combinator_));
        if (head_) hash_combine(hash_, head_->hash());
        if (tail_) hash_combine(hash_, tail_->hash());
      }
      return hash_;
    }
    virtual unsigned long specificity() const
    {
      int sum = 0;
      if (head()) sum += head()->specificity();
      if (tail()) sum += tail()->specificity();
      return sum;
    }
    virtual void set_media_block(Media_Block_Ptr mb) {
      media_block(mb);
      if (tail_) tail_->set_media_block(mb);
      if (head_) head_->set_media_block(mb);
    }
    virtual bool has_placeholder() {
      if (head_ && head_->has_placeholder()) return true;
      if (tail_ && tail_->has_placeholder()) return true;
      return false;
    }
    virtual bool find ( bool (*f)(AST_Node_Obj) );
    virtual bool operator<(const Selector& rhs) const;
    virtual bool operator==(const Selector& rhs) const;
    virtual bool operator<(const Complex_Selector& rhs) const;
    virtual bool operator==(const Complex_Selector& rhs) const;
    inline bool operator!=(const Complex_Selector& rhs) const { return !(*this == rhs); }
    const ComplexSelectorSet sources()
    {
      //s = Set.new
      //seq.map {|sseq_or_op| s.merge sseq_or_op.sources if sseq_or_op.is_a?(SimpleSequence)}
      //s

      ComplexSelectorSet srcs;

      Compound_Selector_Obj pHead = head();
      Complex_Selector_Obj  pTail = tail();

      if (pHead) {
        const ComplexSelectorSet& headSources = pHead->sources();
        srcs.insert(headSources.begin(), headSources.end());
      }

      if (pTail) {
        const ComplexSelectorSet& tailSources = pTail->sources();
        srcs.insert(tailSources.begin(), tailSources.end());
      }

      return srcs;
    }
    void addSources(ComplexSelectorSet& sources) {
      // members.map! {|m| m.is_a?(SimpleSequence) ? m.with_more_sources(sources) : m}
      Complex_Selector_Ptr pIter = this;
      while (pIter) {
        Compound_Selector_Ptr pHead = pIter->head();

        if (pHead) {
          pHead->mergeSources(sources);
        }

        pIter = pIter->tail();
      }
    }
    void clearSources() {
      Complex_Selector_Ptr pIter = this;
      while (pIter) {
        Compound_Selector_Ptr pHead = pIter->head();

        if (pHead) {
          pHead->clearSources();
        }

        pIter = pIter->tail();
      }
    }

    virtual void cloneChildren();
    ATTACH_AST_OPERATIONS(Complex_Selector)
    ATTACH_OPERATIONS()
  };

  ///////////////////////////////////
  // Comma-separated selector groups.
  ///////////////////////////////////
  class Selector_List : public Selector, public Vectorized<Complex_Selector_Obj> {
    ADD_PROPERTY(Selector_Schema_Obj, schema)
    ADD_CONSTREF(std::vector<std::string>, wspace)
  protected:
    void adjust_after_pushing(Complex_Selector_Obj c);
  public:
    Selector_List(ParserState pstate, size_t s = 0)
    : Selector(pstate),
      Vectorized<Complex_Selector_Obj>(s),
      schema_(NULL),
      wspace_(0)
    { }
    Selector_List(const Selector_List* ptr)
    : Selector(ptr),
      Vectorized<Complex_Selector_Obj>(*ptr),
      schema_(ptr->schema_),
      wspace_(ptr->wspace_)
    { }
    std::string type() const { return "list"; }
    // remove parent selector references
    // basically unwraps parsed selectors
    virtual bool has_parent_ref() const;
    virtual bool has_real_parent_ref() const;
    void remove_parent_selectors();
    Selector_List_Ptr resolve_parent_refs(std::vector<Selector_List_Obj>& pstack, Backtraces& traces, bool implicit_parent = true);
    virtual bool is_superselector_of(Compound_Selector_Obj sub, std::string wrapping = "");
    virtual bool is_superselector_of(Complex_Selector_Obj sub, std::string wrapping = "");
    virtual bool is_superselector_of(Selector_List_Obj sub, std::string wrapping = "");
    Selector_List_Ptr unify_with(Selector_List_Ptr);
    void populate_extends(Selector_List_Obj, Subset_Map&);
    Selector_List_Obj eval(Eval& eval);
    virtual size_t hash()
    {
      if (Selector::hash_ == 0) {
        hash_combine(Selector::hash_, std::hash<int>()(SELECTOR));
        hash_combine(Selector::hash_, Vectorized::hash());
      }
      return Selector::hash_;
    }
    virtual unsigned long specificity() const
    {
      unsigned long sum = 0;
      unsigned long specificity;
      for (size_t i = 0, L = length(); i < L; ++i)
      {
        specificity = (*this)[i]->specificity();
        if (sum < specificity) sum = specificity;
      }
      return sum;
    }
    virtual void set_media_block(Media_Block_Ptr mb) {
      media_block(mb);
      for (Complex_Selector_Obj cs : elements()) {
        cs->set_media_block(mb);
      }
    }
    virtual bool has_placeholder() {
      for (Complex_Selector_Obj cs : elements()) {
        if (cs->has_placeholder()) return true;
      }
      return false;
    }
    virtual bool find ( bool (*f)(AST_Node_Obj) );
    virtual bool operator<(const Selector& rhs) const;
    virtual bool operator==(const Selector& rhs) const;
    virtual bool operator<(const Selector_List& rhs) const;
    virtual bool operator==(const Selector_List& rhs) const;
    // Selector Lists can be compared to comma lists
    virtual bool operator==(const Expression& rhs) const;
    virtual void cloneChildren();
    ATTACH_AST_OPERATIONS(Selector_List)
    ATTACH_OPERATIONS()
  };

  // compare function for sorting and probably other other uses
  struct cmp_complex_selector { inline bool operator() (const Complex_Selector_Obj l, const Complex_Selector_Obj r) { return (*l < *r); } };
  struct cmp_compound_selector { inline bool operator() (const Compound_Selector_Obj l, const Compound_Selector_Obj r) { return (*l < *r); } };
  struct cmp_simple_selector { inline bool operator() (const Simple_Selector_Obj l, const Simple_Selector_Obj r) { return (*l < *r); } };

}

#ifdef __clang__

#pragma clang diagnostic pop

#endif

#endif
