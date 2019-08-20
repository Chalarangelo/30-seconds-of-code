#include "sass.hpp"
#include "ast.hpp"
#include "context.hpp"
#include "node.hpp"
#include "eval.hpp"
#include "extend.hpp"
#include "emitter.hpp"
#include "color_maps.hpp"
#include "ast_fwd_decl.hpp"
#include <set>
#include <iomanip>
#include <iostream>
#include <algorithm>
#include <functional>
#include <cctype>
#include <locale>

namespace Sass {

  static Null sass_null(ParserState("null"));

  bool Wrapped_Selector::find ( bool (*f)(AST_Node_Obj) )
  {
    // check children first
    if (selector_) {
      if (selector_->find(f)) return true;
    }
    // execute last
    return f(this);
  }

  bool Selector_List::find ( bool (*f)(AST_Node_Obj) )
  {
    // check children first
    for (Complex_Selector_Obj sel : elements()) {
      if (sel->find(f)) return true;
    }
    // execute last
    return f(this);
  }

  bool Compound_Selector::find ( bool (*f)(AST_Node_Obj) )
  {
    // check children first
    for (Simple_Selector_Obj sel : elements()) {
      if (sel->find(f)) return true;
    }
    // execute last
    return f(this);
  }

  bool Complex_Selector::find ( bool (*f)(AST_Node_Obj) )
  {
    // check children first
    if (head_ && head_->find(f)) return true;
    if (tail_ && tail_->find(f)) return true;
    // execute last
    return f(this);
  }

  bool Supports_Operator::needs_parens(Supports_Condition_Obj cond) const {
    if (Supports_Operator_Obj op = Cast<Supports_Operator>(cond)) {
      return op->operand() != operand();
    }
    return Cast<Supports_Negation>(cond) != NULL;
  }

  bool Supports_Negation::needs_parens(Supports_Condition_Obj cond) const {
    return Cast<Supports_Negation>(cond) ||
           Cast<Supports_Operator>(cond);
  }

  void str_rtrim(std::string& str, const std::string& delimiters = " \f\n\r\t\v")
  {
    str.erase( str.find_last_not_of( delimiters ) + 1 );
  }

  void String_Constant::rtrim()
  {
    str_rtrim(value_);
  }

  void String_Schema::rtrim()
  {
    if (!empty()) {
      if (String_Ptr str = Cast<String>(last())) str->rtrim();
    }
  }

  void Argument::set_delayed(bool delayed)
  {
    if (value_) value_->set_delayed(delayed);
    is_delayed(delayed);
  }

  void Arguments::set_delayed(bool delayed)
  {
    for (Argument_Obj arg : elements()) {
      if (arg) arg->set_delayed(delayed);
    }
    is_delayed(delayed);
  }


  bool At_Root_Query::exclude(std::string str)
  {
    bool with = feature() && unquote(feature()->to_string()).compare("with") == 0;
    List_Ptr l = static_cast<List_Ptr>(value().ptr());
    std::string v;

    if (with)
    {
      if (!l || l->length() == 0) return str.compare("rule") != 0;
      for (size_t i = 0, L = l->length(); i < L; ++i)
      {
        v = unquote((*l)[i]->to_string());
        if (v.compare("all") == 0 || v == str) return false;
      }
      return true;
    }
    else
    {
      if (!l || !l->length()) return str.compare("rule") == 0;
      for (size_t i = 0, L = l->length(); i < L; ++i)
      {
        v = unquote((*l)[i]->to_string());
        if (v.compare("all") == 0 || v == str) return true;
      }
      return false;
    }
  }

  void AST_Node::update_pstate(const ParserState& pstate)
  {
    pstate_.offset += pstate - pstate_ + pstate.offset;
  }

  bool Simple_Selector::is_ns_eq(const Simple_Selector& r) const
  {
    // https://github.com/sass/sass/issues/2229
    if ((has_ns_ == r.has_ns_) ||
        (has_ns_ && ns_.empty()) ||
        (r.has_ns_ && r.ns_.empty())
    ) {
      if (ns_.empty() && r.ns() == "*") return false;
      else if (r.ns().empty() && ns() == "*") return false;
      else return ns() == r.ns();
    }
    return false;
  }

  bool Compound_Selector::operator< (const Compound_Selector& rhs) const
  {
    size_t L = std::min(length(), rhs.length());
    for (size_t i = 0; i < L; ++i)
    {
      Simple_Selector_Obj l = (*this)[i];
      Simple_Selector_Obj r = rhs[i];
      if (!l && !r) return false;
      else if (!r) return false;
      else if (!l) return true;
      else if (*l != *r)
      { return *l < *r; }
    }
    // just compare the length now
    return length() < rhs.length();
  }

  bool Compound_Selector::has_parent_ref() const
  {
    for (Simple_Selector_Obj s : *this) {
      if (s && s->has_parent_ref()) return true;
    }
    return false;
  }

  bool Compound_Selector::has_real_parent_ref() const
  {
    for (Simple_Selector_Obj s : *this) {
      if (s && s->has_real_parent_ref()) return true;
    }
    return false;
  }

  bool Complex_Selector::has_parent_ref() const
  {
    return (head() && head()->has_parent_ref()) ||
           (tail() && tail()->has_parent_ref());
  }

  bool Complex_Selector::has_real_parent_ref() const
  {
    return (head() && head()->has_real_parent_ref()) ||
           (tail() && tail()->has_real_parent_ref());
  }

  bool Complex_Selector::operator< (const Complex_Selector& rhs) const
  {
    // const iterators for tails
    Complex_Selector_Ptr_Const l = this;
    Complex_Selector_Ptr_Const r = &rhs;
    Compound_Selector_Ptr l_h = NULL;
    Compound_Selector_Ptr r_h = NULL;
    if (l) l_h = l->head();
    if (r) r_h = r->head();
    // process all tails
    while (true)
    {
      #ifdef DEBUG
      // skip empty ancestor first
      if (l && l->is_empty_ancestor())
      {
        l_h = NULL;
        l = l->tail();
        if(l) l_h = l->head();
        continue;
      }
      // skip empty ancestor first
      if (r && r->is_empty_ancestor())
      {
        r_h = NULL;
        r = r->tail();
        if (r) r_h = r->head();
        continue;
      }
      #endif
      // check for valid selectors
      if (!l) return !!r;
      if (!r) return false;
      // both are null
      else if (!l_h && !r_h)
      {
        // check combinator after heads
        if (l->combinator() != r->combinator())
        { return l->combinator() < r->combinator(); }
        // advance to next tails
        l = l->tail();
        r = r->tail();
        // fetch the next headers
        l_h = NULL; r_h = NULL;
        if (l) l_h = l->head();
        if (r) r_h = r->head();
      }
      // one side is null
      else if (!r_h) return true;
      else if (!l_h) return false;
      // heads ok and equal
      else if (*l_h == *r_h)
      {
        // check combinator after heads
        if (l->combinator() != r->combinator())
        { return l->combinator() < r->combinator(); }
        // advance to next tails
        l = l->tail();
        r = r->tail();
        // fetch the next headers
        l_h = NULL; r_h = NULL;
        if (l) l_h = l->head();
        if (r) r_h = r->head();
      }
      // heads are not equal
      else return *l_h < *r_h;
    }
  }

  bool Complex_Selector::operator== (const Complex_Selector& rhs) const
  {
    // const iterators for tails
    Complex_Selector_Ptr_Const l = this;
    Complex_Selector_Ptr_Const r = &rhs;
    Compound_Selector_Ptr l_h = NULL;
    Compound_Selector_Ptr r_h = NULL;
    if (l) l_h = l->head();
    if (r) r_h = r->head();
    // process all tails
    while (true)
    {
      #ifdef DEBUG
      // skip empty ancestor first
      if (l && l->is_empty_ancestor())
      {
        l_h = NULL;
        l = l->tail();
        if (l) l_h = l->head();
        continue;
      }
      // skip empty ancestor first
      if (r && r->is_empty_ancestor())
      {
        r_h = NULL;
        r = r->tail();
        if (r) r_h = r->head();
        continue;
      }
      #endif
      // check the pointers
      if (!r) return !l;
      if (!l) return !r;
      // both are null
      if (!l_h && !r_h)
      {
        // check combinator after heads
        if (l->combinator() != r->combinator())
        { return l->combinator() < r->combinator(); }
        // advance to next tails
        l = l->tail();
        r = r->tail();
        // fetch the next heads
        l_h = NULL; r_h = NULL;
        if (l) l_h = l->head();
        if (r) r_h = r->head();
      }
      // equals if other head is empty
      else if ((!l_h && !r_h) ||
               (!l_h && r_h->empty()) ||
               (!r_h && l_h->empty()) ||
               (l_h && r_h && *l_h == *r_h))
      {
        // check combinator after heads
        if (l->combinator() != r->combinator())
        { return l->combinator() == r->combinator(); }
        // advance to next tails
        l = l->tail();
        r = r->tail();
        // fetch the next heads
        l_h = NULL; r_h = NULL;
        if (l) l_h = l->head();
        if (r) r_h = r->head();
      }
      // abort
      else break;
    }
    // unreachable
    return false;
  }

  Compound_Selector_Ptr Compound_Selector::unify_with(Compound_Selector_Ptr rhs)
  {
    if (empty()) return rhs;
    Compound_Selector_Obj unified = SASS_MEMORY_COPY(rhs);
    for (size_t i = 0, L = length(); i < L; ++i)
    {
      if (unified.isNull()) break;
      unified = at(i)->unify_with(unified);
    }
    return unified.detach();
  }

  bool Complex_Selector::operator== (const Selector& rhs) const
  {
    if (const Selector_List* sl = Cast<Selector_List>(&rhs)) return *this == *sl;
    if (const Simple_Selector* sp = Cast<Simple_Selector>(&rhs)) return *this == *sp;
    if (const Complex_Selector* cs = Cast<Complex_Selector>(&rhs)) return *this == *cs;
    if (const Compound_Selector* ch = Cast<Compound_Selector>(&rhs)) return *this == *ch;
    throw std::runtime_error("invalid selector base classes to compare");
  }


  bool Complex_Selector::operator< (const Selector& rhs) const
  {
    if (const Selector_List* sl = Cast<Selector_List>(&rhs)) return *this < *sl;
    if (const Simple_Selector* sp = Cast<Simple_Selector>(&rhs)) return *this < *sp;
    if (const Complex_Selector* cs = Cast<Complex_Selector>(&rhs)) return *this < *cs;
    if (const Compound_Selector* ch = Cast<Compound_Selector>(&rhs)) return *this < *ch;
    throw std::runtime_error("invalid selector base classes to compare");
  }

  bool Compound_Selector::operator== (const Selector& rhs) const
  {
    if (const Selector_List* sl = Cast<Selector_List>(&rhs)) return *this == *sl;
    if (const Simple_Selector* sp = Cast<Simple_Selector>(&rhs)) return *this == *sp;
    if (const Complex_Selector* cs = Cast<Complex_Selector>(&rhs)) return *this == *cs;
    if (const Compound_Selector* ch = Cast<Compound_Selector>(&rhs)) return *this == *ch;
    throw std::runtime_error("invalid selector base classes to compare");
  }

  bool Compound_Selector::operator< (const Selector& rhs) const
  {
    if (const Selector_List* sl = Cast<Selector_List>(&rhs)) return *this < *sl;
    if (const Simple_Selector* sp = Cast<Simple_Selector>(&rhs)) return *this < *sp;
    if (const Complex_Selector* cs = Cast<Complex_Selector>(&rhs)) return *this < *cs;
    if (const Compound_Selector* ch = Cast<Compound_Selector>(&rhs)) return *this < *ch;
    throw std::runtime_error("invalid selector base classes to compare");
  }

  bool Selector_Schema::operator== (const Selector& rhs) const
  {
    if (const Selector_List* sl = Cast<Selector_List>(&rhs)) return *this == *sl;
    if (const Simple_Selector* sp = Cast<Simple_Selector>(&rhs)) return *this == *sp;
    if (const Complex_Selector* cs = Cast<Complex_Selector>(&rhs)) return *this == *cs;
    if (const Compound_Selector* ch = Cast<Compound_Selector>(&rhs)) return *this == *ch;
    throw std::runtime_error("invalid selector base classes to compare");
  }

  bool Selector_Schema::operator< (const Selector& rhs) const
  {
    if (const Selector_List* sl = Cast<Selector_List>(&rhs)) return *this < *sl;
    if (const Simple_Selector* sp = Cast<Simple_Selector>(&rhs)) return *this < *sp;
    if (const Complex_Selector* cs = Cast<Complex_Selector>(&rhs)) return *this < *cs;
    if (const Compound_Selector* ch = Cast<Compound_Selector>(&rhs)) return *this < *ch;
    throw std::runtime_error("invalid selector base classes to compare");
  }

  bool Simple_Selector::operator== (const Selector& rhs) const
  {
    if (Simple_Selector_Ptr_Const sp = Cast<Simple_Selector>(&rhs)) return *this == *sp;
    return false;
  }

  bool Simple_Selector::operator< (const Selector& rhs) const
  {
    if (Simple_Selector_Ptr_Const sp = Cast<Simple_Selector>(&rhs)) return *this < *sp;
    return false;
  }

  bool Simple_Selector::operator== (const Simple_Selector& rhs) const
  {
    // solve the double dispatch problem by using RTTI information via dynamic cast
    if (const Pseudo_Selector* lhs = Cast<Pseudo_Selector>(this)) {return *lhs == rhs; }
    else if (const Wrapped_Selector* lhs = Cast<Wrapped_Selector>(this)) {return *lhs == rhs; }
    else if (const Element_Selector* lhs = Cast<Element_Selector>(this)) {return *lhs == rhs; }
    else if (const Attribute_Selector* lhs = Cast<Attribute_Selector>(this)) {return *lhs == rhs; }
    else if (name_ == rhs.name_)
    { return is_ns_eq(rhs); }
    else return false;
  }

  bool Simple_Selector::operator< (const Simple_Selector& rhs) const
  {
    // solve the double dispatch problem by using RTTI information via dynamic cast
    if (const Pseudo_Selector* lhs = Cast<Pseudo_Selector>(this)) {return *lhs < rhs; }
    else if (const Wrapped_Selector* lhs = Cast<Wrapped_Selector>(this)) {return *lhs < rhs; }
    else if (const Element_Selector* lhs = Cast<Element_Selector>(this)) {return *lhs < rhs; }
    else if (const Attribute_Selector* lhs = Cast<Attribute_Selector>(this)) {return *lhs < rhs; }
    if (is_ns_eq(rhs))
    { return name_ < rhs.name_; }
    return ns_ < rhs.ns_;
  }

  bool Selector_List::operator== (const Selector& rhs) const
  {
    // solve the double dispatch problem by using RTTI information via dynamic cast
    if (Selector_List_Ptr_Const sl = Cast<Selector_List>(&rhs)) { return *this == *sl; }
    else if (Complex_Selector_Ptr_Const cpx = Cast<Complex_Selector>(&rhs)) { return *this == *cpx; }
    else if (Compound_Selector_Ptr_Const cpd = Cast<Compound_Selector>(&rhs)) { return *this == *cpd; }
    // no compare method
    return this == &rhs;
  }

  // Selector lists can be compared to comma lists
  bool Selector_List::operator== (const Expression& rhs) const
  {
    // solve the double dispatch problem by using RTTI information via dynamic cast
    if (List_Ptr_Const ls = Cast<List>(&rhs)) { return *ls == *this; }
    if (Selector_Ptr_Const ls = Cast<Selector>(&rhs)) { return *this == *ls; }
    // compare invalid (maybe we should error?)
    return false;
  }

  bool Selector_List::operator== (const Selector_List& rhs) const
  {
    // for array access
    size_t i = 0, n = 0;
    size_t iL = length();
    size_t nL = rhs.length();
    // create temporary vectors and sort them
    std::vector<Complex_Selector_Obj> l_lst = this->elements();
    std::vector<Complex_Selector_Obj> r_lst = rhs.elements();
    std::sort(l_lst.begin(), l_lst.end(), OrderNodes());
    std::sort(r_lst.begin(), r_lst.end(), OrderNodes());
    // process loop
    while (true)
    {
      // first check for valid index
      if (i == iL) return iL == nL;
      else if (n == nL) return iL == nL;
      // the access the vector items
      Complex_Selector_Obj l = l_lst[i];
      Complex_Selector_Obj r = r_lst[n];
      // skip nulls
      if (!l) ++i;
      else if (!r) ++n;
      // do the check
      else if (*l != *r)
      { return false; }
      // advance
      ++i; ++n;
    }
    // there is no break?!
  }

  bool Selector_List::operator< (const Selector& rhs) const
  {
    if (Selector_List_Ptr_Const sp = Cast<Selector_List>(&rhs)) return *this < *sp;
    return false;
  }

  bool Selector_List::operator< (const Selector_List& rhs) const
  {
    size_t l = rhs.length();
    if (length() < l) l = length();
    for (size_t i = 0; i < l; i ++) {
      if (*at(i) < *rhs.at(i)) return true;
    }
    return false;
  }

  Compound_Selector_Ptr Simple_Selector::unify_with(Compound_Selector_Ptr rhs)
  {
    for (size_t i = 0, L = rhs->length(); i < L; ++i)
    { if (to_string() == rhs->at(i)->to_string()) return rhs; }

    // check for pseudo elements because they are always last
    size_t i, L;
    bool found = false;
    if (typeid(*this) == typeid(Pseudo_Selector) || typeid(*this) == typeid(Wrapped_Selector) || typeid(*this) == typeid(Attribute_Selector))
    {
      for (i = 0, L = rhs->length(); i < L; ++i)
      {
        if ((Cast<Pseudo_Selector>((*rhs)[i]) || Cast<Wrapped_Selector>((*rhs)[i]) || Cast<Attribute_Selector>((*rhs)[i])) && (*rhs)[L-1]->is_pseudo_element())
        { found = true; break; }
      }
    }
    else
    {
      for (i = 0, L = rhs->length(); i < L; ++i)
      {
        if (Cast<Pseudo_Selector>((*rhs)[i]) || Cast<Wrapped_Selector>((*rhs)[i]) || Cast<Attribute_Selector>((*rhs)[i]))
        { found = true; break; }
      }
    }
    if (!found)
    {
      rhs->append(this);
    } else {
      rhs->elements().insert(rhs->elements().begin() + i, this);
    }
    return rhs;
  }

  Simple_Selector_Ptr Element_Selector::unify_with(Simple_Selector_Ptr rhs)
  {
    // check if ns can be extended
    // true for no ns or universal
    if (has_universal_ns())
    {
      // but dont extend with universal
      // true for valid ns and universal
      if (!rhs->is_universal_ns())
      {
        // overwrite the name if star is given as name
        if (this->name() == "*") { this->name(rhs->name()); }
        // now overwrite the namespace name and flag
        this->ns(rhs->ns()); this->has_ns(rhs->has_ns());
        // return copy
        return this;
      }
    }
    // namespace may changed, check the name now
    // overwrite star (but not with another star)
    if (name() == "*" && rhs->name() != "*")
    {
      // simply set the new name
      this->name(rhs->name());
      // return copy
      return this;
    }
    // return original
    return this;
  }

  Compound_Selector_Ptr Element_Selector::unify_with(Compound_Selector_Ptr rhs)
  {
    // TODO: handle namespaces

    // if the rhs is empty, just return a copy of this
    if (rhs->length() == 0) {
      rhs->append(this);
      return rhs;
    }

    Simple_Selector_Ptr rhs_0 = rhs->at(0);
    // otherwise, this is a tag name
    if (name() == "*")
    {
      if (typeid(*rhs_0) == typeid(Element_Selector))
      {
        // if rhs is universal, just return this tagname + rhs's qualifiers
        Element_Selector_Ptr ts = Cast<Element_Selector>(rhs_0);
        rhs->at(0) = this->unify_with(ts);
        return rhs;
      }
      else if (Cast<Class_Selector>(rhs_0) || Cast<Id_Selector>(rhs_0)) {
        // qualifier is `.class`, so we can prefix with `ns|*.class`
        if (has_ns() && !rhs_0->has_ns()) {
          if (ns() != "*") rhs->elements().insert(rhs->begin(), this);
        }
        return rhs;
      }


      return rhs;
    }

    if (typeid(*rhs_0) == typeid(Element_Selector))
    {
      // if rhs is universal, just return this tagname + rhs's qualifiers
      if (rhs_0->name() != "*" && rhs_0->ns() != "*" && rhs_0->name() != name()) return 0;
      // otherwise create new compound and unify first simple selector
      rhs->at(0) = this->unify_with(rhs_0);
      return rhs;

    }
    // else it's a tag name and a bunch of qualifiers -- just append them
    if (name() != "*") rhs->elements().insert(rhs->begin(), this);
    return rhs;
  }

  Compound_Selector_Ptr Class_Selector::unify_with(Compound_Selector_Ptr rhs)
  {
    rhs->has_line_break(has_line_break());
    return Simple_Selector::unify_with(rhs);
  }

  Compound_Selector_Ptr Id_Selector::unify_with(Compound_Selector_Ptr rhs)
  {
    for (size_t i = 0, L = rhs->length(); i < L; ++i)
    {
      if (Id_Selector_Ptr sel = Cast<Id_Selector>(rhs->at(i))) {
        if (sel->name() != name()) return 0;
      }
    }
    rhs->has_line_break(has_line_break());
    return Simple_Selector::unify_with(rhs);
  }

  Compound_Selector_Ptr Pseudo_Selector::unify_with(Compound_Selector_Ptr rhs)
  {
    if (is_pseudo_element())
    {
      for (size_t i = 0, L = rhs->length(); i < L; ++i)
      {
        if (Pseudo_Selector_Ptr sel = Cast<Pseudo_Selector>(rhs->at(i))) {
          if (sel->is_pseudo_element() && sel->name() != name()) return 0;
        }
      }
    }
    return Simple_Selector::unify_with(rhs);
  }

  bool Attribute_Selector::operator< (const Attribute_Selector& rhs) const
  {
    if (is_ns_eq(rhs)) {
      if (name() == rhs.name()) {
        if (matcher() == rhs.matcher()) {
          bool no_lhs_val = value().isNull();
          bool no_rhs_val = rhs.value().isNull();
          if (no_lhs_val && no_rhs_val) return false; // equal
          else if (no_lhs_val) return true; // lhs is null
          else if (no_rhs_val) return false; // rhs is null
          return *value() < *rhs.value(); // both are given
        } else { return matcher() < rhs.matcher(); }
      } else { return name() < rhs.name(); }
    } else { return ns() < rhs.ns(); }
  }

  bool Attribute_Selector::operator< (const Simple_Selector& rhs) const
  {
    if (Attribute_Selector_Ptr_Const w = Cast<Attribute_Selector>(&rhs))
    {
      return *this < *w;
    }
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Attribute_Selector::operator== (const Attribute_Selector& rhs) const
  {
    // get optional value state
    bool no_lhs_val = value().isNull();
    bool no_rhs_val = rhs.value().isNull();
    // both are null, therefore equal
    if (no_lhs_val && no_rhs_val) {
      return (name() == rhs.name())
        && (matcher() == rhs.matcher())
        && (is_ns_eq(rhs));
    }
    // both are defined, evaluate
    if (no_lhs_val == no_rhs_val) {
      return (name() == rhs.name())
        && (matcher() == rhs.matcher())
        && (is_ns_eq(rhs))
        && (*value() == *rhs.value());
    }
    // not equal
    return false;

  }

  bool Attribute_Selector::operator== (const Simple_Selector& rhs) const
  {
    if (Attribute_Selector_Ptr_Const w = Cast<Attribute_Selector>(&rhs))
    {
      return is_ns_eq(rhs) &&
             name() == rhs.name() &&
             *this == *w;
    }
    return false;
  }

  bool Element_Selector::operator< (const Element_Selector& rhs) const
  {
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Element_Selector::operator< (const Simple_Selector& rhs) const
  {
    if (Element_Selector_Ptr_Const w = Cast<Element_Selector>(&rhs))
    {
      return *this < *w;
    }
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Element_Selector::operator== (const Element_Selector& rhs) const
  {
    return is_ns_eq(rhs) &&
           name() == rhs.name();
  }

  bool Element_Selector::operator== (const Simple_Selector& rhs) const
  {
    if (Element_Selector_Ptr_Const w = Cast<Element_Selector>(&rhs))
    {
      return is_ns_eq(rhs) &&
             name() == rhs.name() &&
             *this == *w;
    }
    return false;
  }

  bool Pseudo_Selector::operator== (const Pseudo_Selector& rhs) const
  {
    if (is_ns_eq(rhs) && name() == rhs.name())
    {
      String_Obj lhs_ex = expression();
      String_Obj rhs_ex = rhs.expression();
      if (rhs_ex && lhs_ex) return *lhs_ex == *rhs_ex;
      else return lhs_ex.ptr() == rhs_ex.ptr();
    }
    else return false;
  }

  bool Pseudo_Selector::operator== (const Simple_Selector& rhs) const
  {
    if (Pseudo_Selector_Ptr_Const w = Cast<Pseudo_Selector>(&rhs))
    {
      return *this == *w;
    }
    return is_ns_eq(rhs) &&
           name() == rhs.name();
  }

  bool Pseudo_Selector::operator< (const Pseudo_Selector& rhs) const
  {
    if (is_ns_eq(rhs) && name() == rhs.name())
    {
      String_Obj lhs_ex = expression();
      String_Obj rhs_ex = rhs.expression();
      if (rhs_ex && lhs_ex) return *lhs_ex < *rhs_ex;
      else return lhs_ex.ptr() < rhs_ex.ptr();
    }
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Pseudo_Selector::operator< (const Simple_Selector& rhs) const
  {
    if (Pseudo_Selector_Ptr_Const w = Cast<Pseudo_Selector>(&rhs))
    {
      return *this < *w;
    }
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Wrapped_Selector::operator== (const Wrapped_Selector& rhs) const
  {
    if (is_ns_eq(rhs) && name() == rhs.name())
    { return *(selector()) == *(rhs.selector()); }
    else return false;
  }

  bool Wrapped_Selector::operator== (const Simple_Selector& rhs) const
  {
    if (Wrapped_Selector_Ptr_Const w = Cast<Wrapped_Selector>(&rhs))
    {
      return *this == *w;
    }
    return is_ns_eq(rhs) &&
           name() == rhs.name();
  }

  bool Wrapped_Selector::operator< (const Wrapped_Selector& rhs) const
  {
    if (is_ns_eq(rhs) && name() == rhs.name())
    { return *(selector()) < *(rhs.selector()); }
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Wrapped_Selector::operator< (const Simple_Selector& rhs) const
  {
    if (Wrapped_Selector_Ptr_Const w = Cast<Wrapped_Selector>(&rhs))
    {
      return *this < *w;
    }
    if (is_ns_eq(rhs))
    { return name() < rhs.name(); }
    return ns() < rhs.ns();
  }

  bool Wrapped_Selector::is_superselector_of(Wrapped_Selector_Obj sub)
  {
    if (this->name() != sub->name()) return false;
    if (this->name() == ":current") return false;
    if (Selector_List_Obj rhs_list = Cast<Selector_List>(sub->selector())) {
      if (Selector_List_Obj lhs_list = Cast<Selector_List>(selector())) {
        return lhs_list->is_superselector_of(rhs_list);
      }
    }
    coreError("is_superselector expected a Selector_List", sub->pstate());
    return false;
  }

  bool Compound_Selector::is_superselector_of(Selector_List_Obj rhs, std::string wrapped)
  {
    for (Complex_Selector_Obj item : rhs->elements()) {
      if (is_superselector_of(item, wrapped)) return true;
    }
    return false;
  }

  bool Compound_Selector::is_superselector_of(Complex_Selector_Obj rhs, std::string wrapped)
  {
    if (rhs->head()) return is_superselector_of(rhs->head(), wrapped);
    return false;
  }

  bool Compound_Selector::is_superselector_of(Compound_Selector_Obj rhs, std::string wrapping)
  {
    Compound_Selector_Ptr lhs = this;
    Simple_Selector_Ptr lbase = lhs->base();
    Simple_Selector_Ptr rbase = rhs->base();

    // Check if pseudo-elements are the same between the selectors

    std::set<std::string> lpsuedoset, rpsuedoset;
    for (size_t i = 0, L = length(); i < L; ++i)
    {
      if ((*this)[i]->is_pseudo_element()) {
        std::string pseudo((*this)[i]->to_string());
        pseudo = pseudo.substr(pseudo.find_first_not_of(":")); // strip off colons to ensure :after matches ::after since ruby sass is forgiving
        lpsuedoset.insert(pseudo);
      }
    }
    for (size_t i = 0, L = rhs->length(); i < L; ++i)
    {
      if ((*rhs)[i]->is_pseudo_element()) {
        std::string pseudo((*rhs)[i]->to_string());
        pseudo = pseudo.substr(pseudo.find_first_not_of(":")); // strip off colons to ensure :after matches ::after since ruby sass is forgiving
        rpsuedoset.insert(pseudo);
      }
    }
    if (lpsuedoset != rpsuedoset) {
      return false;
    }

    // would like to replace this without stringification
    // https://github.com/sass/sass/issues/2229
    // SimpleSelectorSet lset, rset;
    std::set<std::string> lset, rset;

    if (lbase && rbase)
    {
      if (lbase->to_string() == rbase->to_string()) {
        for (size_t i = 1, L = length(); i < L; ++i)
        { lset.insert((*this)[i]->to_string()); }
        for (size_t i = 1, L = rhs->length(); i < L; ++i)
        { rset.insert((*rhs)[i]->to_string()); }
        return includes(rset.begin(), rset.end(), lset.begin(), lset.end());
      }
      return false;
    }

    for (size_t i = 0, iL = length(); i < iL; ++i)
    {
      Selector_Obj wlhs = (*this)[i];
      // very special case for wrapped matches selector
      if (Wrapped_Selector_Obj wrapped = Cast<Wrapped_Selector>(wlhs)) {
        if (wrapped->name() == ":not") {
          if (Selector_List_Obj not_list = Cast<Selector_List>(wrapped->selector())) {
            if (not_list->is_superselector_of(rhs, wrapped->name())) return false;
          } else {
            throw std::runtime_error("wrapped not selector is not a list");
          }
        }
        if (wrapped->name() == ":matches" || wrapped->name() == ":-moz-any") {
          wlhs = wrapped->selector();
          if (Selector_List_Obj list = Cast<Selector_List>(wrapped->selector())) {
            if (Compound_Selector_Obj comp = Cast<Compound_Selector>(rhs)) {
              if (!wrapping.empty() && wrapping != wrapped->name()) return false;
              if (wrapping.empty() || wrapping != wrapped->name()) {;
                if (list->is_superselector_of(comp, wrapped->name())) return true;
              }
            }
          }
        }
        Simple_Selector_Ptr rhs_sel = NULL;
        if (rhs->elements().size() > i) rhs_sel = (*rhs)[i];
        if (Wrapped_Selector_Ptr wrapped_r = Cast<Wrapped_Selector>(rhs_sel)) {
          if (wrapped->name() == wrapped_r->name()) {
          if (wrapped->is_superselector_of(wrapped_r)) {
             continue;
          }}
        }
      }
      // match from here on as strings
      lset.insert(wlhs->to_string());
    }

    for (size_t n = 0, nL = rhs->length(); n < nL; ++n)
    {
      Selector_Obj r = (*rhs)[n];
      if (Wrapped_Selector_Obj wrapped = Cast<Wrapped_Selector>(r)) {
        if (wrapped->name() == ":not") {
          if (Selector_List_Obj ls = Cast<Selector_List>(wrapped->selector())) {
            ls->remove_parent_selectors();
            if (is_superselector_of(ls, wrapped->name())) return false;
          }
        }
        if (wrapped->name() == ":matches" || wrapped->name() == ":-moz-any") {
          if (!wrapping.empty()) {
            if (wrapping != wrapped->name()) return false;
          }
          if (Selector_List_Obj ls = Cast<Selector_List>(wrapped->selector())) {
            ls->remove_parent_selectors();
            return (is_superselector_of(ls, wrapped->name()));
          }
        }
      }
      rset.insert(r->to_string());
    }

    //for (auto l : lset) { cerr << "l: " << l << endl; }
    //for (auto r : rset) { cerr << "r: " << r << endl; }

    if (lset.empty()) return true;
    // return true if rset contains all the elements of lset
    return includes(rset.begin(), rset.end(), lset.begin(), lset.end());

  }

  // create complex selector (ancestor of) from compound selector
  Complex_Selector_Obj Compound_Selector::to_complex()
  {
    // create an intermediate complex selector
    return SASS_MEMORY_NEW(Complex_Selector,
                           pstate(),
                           Complex_Selector::ANCESTOR_OF,
                           this,
                           0);
  }

  Selector_List_Ptr Complex_Selector::unify_with(Complex_Selector_Ptr other)
  {

    // get last tails (on the right side)
    Complex_Selector_Obj l_last = this->last();
    Complex_Selector_Obj r_last = other->last();

    // check valid pointers (assertion)
    SASS_ASSERT(l_last, "lhs is null");
    SASS_ASSERT(r_last, "rhs is null");

    // Not sure about this check, but closest way I could check
    // was to see if this is a ruby 'SimpleSequence' equivalent.
    // It seems to do the job correctly as some specs react to this
    if (l_last->combinator() != Combinator::ANCESTOR_OF) return 0;
    if (r_last->combinator() != Combinator::ANCESTOR_OF ) return 0;

    // get the headers for the last tails
    Compound_Selector_Obj l_last_head = l_last->head();
    Compound_Selector_Obj r_last_head = r_last->head();

    // check valid head pointers (assertion)
    SASS_ASSERT(l_last_head, "lhs head is null");
    SASS_ASSERT(r_last_head, "rhs head is null");

    // get the unification of the last compound selectors
    Compound_Selector_Obj unified = r_last_head->unify_with(l_last_head);

    // abort if we could not unify heads
    if (unified == 0) return 0;

    // check for universal (star: `*`) selector
    bool is_universal = l_last_head->is_universal() ||
                        r_last_head->is_universal();

    if (is_universal)
    {
      // move the head
      l_last->head(0);
      r_last->head(unified);
    }

    // create nodes from both selectors
    Node lhsNode = complexSelectorToNode(this);
    Node rhsNode = complexSelectorToNode(other);

    // overwrite universal base
    if (!is_universal)
    {
      // create some temporaries to convert to node
      Complex_Selector_Obj fake = unified->to_complex();
      Node unified_node = complexSelectorToNode(fake);
      // add to permutate the list?
      rhsNode.plus(unified_node);
    }

    // do some magic we inherit from node and extend
    Node node = subweave(lhsNode, rhsNode);
    Selector_List_Obj result = SASS_MEMORY_NEW(Selector_List, pstate());
    NodeDequePtr col = node.collection(); // move from collection to list
    for (NodeDeque::iterator it = col->begin(), end = col->end(); it != end; it++)
    { result->append(nodeToComplexSelector(Node::naiveTrim(*it))); }

    // only return if list has some entries
    return result->length() ? result.detach() : 0;

  }

  bool Compound_Selector::operator== (const Compound_Selector& rhs) const
  {
    // for array access
    size_t i = 0, n = 0;
    size_t iL = length();
    size_t nL = rhs.length();
    // create temporary vectors and sort them
    std::vector<Simple_Selector_Obj> l_lst = this->elements();
    std::vector<Simple_Selector_Obj> r_lst = rhs.elements();
    std::sort(l_lst.begin(), l_lst.end(), OrderNodes());
    std::sort(r_lst.begin(), r_lst.end(), OrderNodes());
    // process loop
    while (true)
    {
      // first check for valid index
      if (i == iL) return iL == nL;
      else if (n == nL) return iL == nL;
      // the access the vector items
      Simple_Selector_Obj l = l_lst[i];
      Simple_Selector_Obj r = r_lst[n];
      // skip nulls
      if (!l) ++i;
      if (!r) ++n;
      // do the check now
      else if (*l != *r)
      { return false; }
      // advance now
      ++i; ++n;
    }
    // there is no break?!
  }

  bool Complex_Selector::is_superselector_of(Compound_Selector_Obj rhs, std::string wrapping)
  {
    return last()->head() && last()->head()->is_superselector_of(rhs, wrapping);
  }

  bool Complex_Selector::is_superselector_of(Complex_Selector_Obj rhs, std::string wrapping)
  {
    Complex_Selector_Ptr lhs = this;
    // check for selectors with leading or trailing combinators
    if (!lhs->head() || !rhs->head())
    { return false; }
    Complex_Selector_Obj l_innermost = lhs->innermost();
    if (l_innermost->combinator() != Complex_Selector::ANCESTOR_OF)
    { return false; }
    Complex_Selector_Obj r_innermost = rhs->innermost();
    if (r_innermost->combinator() != Complex_Selector::ANCESTOR_OF)
    { return false; }
    // more complex (i.e., longer) selectors are always more specific
    size_t l_len = lhs->length(), r_len = rhs->length();
    if (l_len > r_len)
    { return false; }

    if (l_len == 1)
    { return lhs->head()->is_superselector_of(rhs->last()->head(), wrapping); }

    // we have to look one tail deeper, since we cary the
    // combinator around for it (which is important here)
    if (rhs->tail() && lhs->tail() && combinator() != Complex_Selector::ANCESTOR_OF) {
      Complex_Selector_Obj lhs_tail = lhs->tail();
      Complex_Selector_Obj rhs_tail = rhs->tail();
      if (lhs_tail->combinator() != rhs_tail->combinator()) return false;
      if (lhs_tail->head() && !rhs_tail->head()) return false;
      if (!lhs_tail->head() && rhs_tail->head()) return false;
      if (lhs_tail->head() && rhs_tail->head()) {
        if (!lhs_tail->head()->is_superselector_of(rhs_tail->head())) return false;
      }
    }

    bool found = false;
    Complex_Selector_Obj marker = rhs;
    for (size_t i = 0, L = rhs->length(); i < L; ++i) {
      if (i == L-1)
      { return false; }
      if (lhs->head() && marker->head() && lhs->head()->is_superselector_of(marker->head(), wrapping))
      { found = true; break; }
      marker = marker->tail();
    }
    if (!found)
    { return false; }

    /*
      Hmm, I hope I have the logic right:

      if lhs has a combinator:
        if !(marker has a combinator) return false
        if !(lhs.combinator == '~' ? marker.combinator != '>' : lhs.combinator == marker.combinator) return false
        return lhs.tail-without-innermost.is_superselector_of(marker.tail-without-innermost)
      else if marker has a combinator:
        if !(marker.combinator == ">") return false
        return lhs.tail.is_superselector_of(marker.tail)
      else
        return lhs.tail.is_superselector_of(marker.tail)
    */
    if (lhs->combinator() != Complex_Selector::ANCESTOR_OF)
    {
      if (marker->combinator() == Complex_Selector::ANCESTOR_OF)
      { return false; }
      if (!(lhs->combinator() == Complex_Selector::PRECEDES ? marker->combinator() != Complex_Selector::PARENT_OF : lhs->combinator() == marker->combinator()))
      { return false; }
      return lhs->tail()->is_superselector_of(marker->tail());
    }
    else if (marker->combinator() != Complex_Selector::ANCESTOR_OF)
    {
      if (marker->combinator() != Complex_Selector::PARENT_OF)
      { return false; }
      return lhs->tail()->is_superselector_of(marker->tail());
    }
    return lhs->tail()->is_superselector_of(marker->tail());
  }

  size_t Complex_Selector::length() const
  {
    // TODO: make this iterative
    if (!tail()) return 1;
    return 1 + tail()->length();
  }

  // append another complex selector at the end
  // check if we need to append some headers
  // then we need to check for the combinator
  // only then we can safely set the new tail
  void Complex_Selector::append(Complex_Selector_Obj ss, Backtraces& traces)
  {

    Complex_Selector_Obj t = ss->tail();
    Combinator c = ss->combinator();
    String_Obj r = ss->reference();
    Compound_Selector_Obj h = ss->head();

    if (ss->has_line_feed()) has_line_feed(true);
    if (ss->has_line_break()) has_line_break(true);

    // append old headers
    if (h && h->length()) {
      if (last()->combinator() != ANCESTOR_OF && c != ANCESTOR_OF) {
        traces.push_back(Backtrace(pstate()));
        throw Exception::InvalidParent(this, traces, ss);
      } else if (last()->head_ && last()->head_->length()) {
        Compound_Selector_Obj rh = last()->head();
        size_t i;
        size_t L = h->length();
        if (Cast<Element_Selector>(h->first())) {
          if (Class_Selector_Ptr cs = Cast<Class_Selector>(rh->last())) {
            Class_Selector_Ptr sqs = SASS_MEMORY_COPY(cs);
            sqs->name(sqs->name() + (*h)[0]->name());
            sqs->pstate((*h)[0]->pstate());
            (*rh)[rh->length()-1] = sqs;
            rh->pstate(h->pstate());
            for (i = 1; i < L; ++i) rh->append((*h)[i]);
          } else if (Id_Selector_Ptr is = Cast<Id_Selector>(rh->last())) {
            Id_Selector_Ptr sqs = SASS_MEMORY_COPY(is);
            sqs->name(sqs->name() + (*h)[0]->name());
            sqs->pstate((*h)[0]->pstate());
            (*rh)[rh->length()-1] = sqs;
            rh->pstate(h->pstate());
            for (i = 1; i < L; ++i) rh->append((*h)[i]);
          } else if (Element_Selector_Ptr ts = Cast<Element_Selector>(rh->last())) {
            Element_Selector_Ptr tss = SASS_MEMORY_COPY(ts);
            tss->name(tss->name() + (*h)[0]->name());
            tss->pstate((*h)[0]->pstate());
            (*rh)[rh->length()-1] = tss;
            rh->pstate(h->pstate());
            for (i = 1; i < L; ++i) rh->append((*h)[i]);
          } else if (Placeholder_Selector_Ptr ps = Cast<Placeholder_Selector>(rh->last())) {
            Placeholder_Selector_Ptr pss = SASS_MEMORY_COPY(ps);
            pss->name(pss->name() + (*h)[0]->name());
            pss->pstate((*h)[0]->pstate());
            (*rh)[rh->length()-1] = pss;
            rh->pstate(h->pstate());
            for (i = 1; i < L; ++i) rh->append((*h)[i]);
          } else {
            last()->head_->concat(h);
          }
        } else {
          last()->head_->concat(h);
        }
      } else if (last()->head_) {
        last()->head_->concat(h);
      }
    } else {
      // std::cerr << "has no or empty head\n";
    }

    if (last()) {
      if (last()->combinator() != ANCESTOR_OF && c != ANCESTOR_OF) {
        Complex_Selector_Ptr inter = SASS_MEMORY_NEW(Complex_Selector, pstate());
        inter->reference(r);
        inter->combinator(c);
        inter->tail(t);
        last()->tail(inter);
      } else {
        if (last()->combinator() == ANCESTOR_OF) {
          last()->combinator(c);
          last()->reference(r);
        }
        last()->tail(t);
      }
    }

  }

  Selector_List_Obj Selector_List::eval(Eval& eval)
  {
    Selector_List_Obj list = schema() ?
      eval(schema()) : eval(this);
    list->schema(schema());
    return list;
  }

  Selector_List_Ptr Selector_List::resolve_parent_refs(std::vector<Selector_List_Obj>& pstack, Backtraces& traces, bool implicit_parent)
  {
    if (!this->has_parent_ref()) return this;
    Selector_List_Ptr ss = SASS_MEMORY_NEW(Selector_List, pstate());
    Selector_List_Ptr ps = pstack.back();
    for (size_t pi = 0, pL = ps->length(); pi < pL; ++pi) {
      for (size_t si = 0, sL = this->length(); si < sL; ++si) {
        Selector_List_Obj rv = at(si)->resolve_parent_refs(pstack, traces, implicit_parent);
        ss->concat(rv);
      }
    }
    return ss;
  }

  Selector_List_Ptr Complex_Selector::resolve_parent_refs(std::vector<Selector_List_Obj>& pstack, Backtraces& traces, bool implicit_parent)
  {
    Complex_Selector_Obj tail = this->tail();
    Compound_Selector_Obj head = this->head();
    Selector_List_Ptr parents = pstack.back();

    if (!this->has_real_parent_ref() && !implicit_parent) {
      Selector_List_Ptr retval = SASS_MEMORY_NEW(Selector_List, pstate());
      retval->append(this);
      return retval;
    }

    // first resolve_parent_refs the tail (which may return an expanded list)
    Selector_List_Obj tails = tail ? tail->resolve_parent_refs(pstack, traces, implicit_parent) : 0;

    if (head && head->length() > 0) {

      Selector_List_Obj retval;
      // we have a parent selector in a simple compound list
      // mix parent complex selector into the compound list
      if (Cast<Parent_Selector>((*head)[0])) {
        retval = SASS_MEMORY_NEW(Selector_List, pstate());

        // it turns out that real parent references reach
        // across @at-root rules, which comes unexpected
        if (parents == NULL && head->has_real_parent_ref()) {
          int i = pstack.size() - 1;
          while (!parents && i > -1) {
            parents = pstack.at(i--);
          }
        }

        if (parents && parents->length()) {
          if (tails && tails->length() > 0) {
            for (size_t n = 0, nL = tails->length(); n < nL; ++n) {
              for (size_t i = 0, iL = parents->length(); i < iL; ++i) {
                Complex_Selector_Obj t = (*tails)[n];
                Complex_Selector_Obj parent = (*parents)[i];
                Complex_Selector_Obj s = SASS_MEMORY_CLONE(parent);
                Complex_Selector_Obj ss = SASS_MEMORY_CLONE(this);
                ss->tail(t ? SASS_MEMORY_CLONE(t) : NULL);
                Compound_Selector_Obj h = SASS_MEMORY_COPY(head_);
                // remove parent selector from sequence
                if (h->length()) {
                  h->erase(h->begin());
                  ss->head(h);
                } else {
                  ss->head(NULL);
                }
                // adjust for parent selector (1 char)
                // if (h->length()) {
                //   ParserState state(h->at(0)->pstate());
                //   state.offset.column += 1;
                //   state.column -= 1;
                //   (*h)[0]->pstate(state);
                // }
                // keep old parser state
                s->pstate(pstate());
                // append new tail
                s->append(ss, traces);
                retval->append(s);
              }
            }
          }
          // have no tails but parents
          // loop above is inside out
          else {
            for (size_t i = 0, iL = parents->length(); i < iL; ++i) {
              Complex_Selector_Obj parent = (*parents)[i];
              Complex_Selector_Obj s = SASS_MEMORY_CLONE(parent);
              Complex_Selector_Obj ss = SASS_MEMORY_CLONE(this);
              // this is only if valid if the parent has no trailing op
              // otherwise we cannot append more simple selectors to head
              if (parent->last()->combinator() != ANCESTOR_OF) {
                traces.push_back(Backtrace(pstate()));
                throw Exception::InvalidParent(parent, traces, ss);
              }
              ss->tail(tail ? SASS_MEMORY_CLONE(tail) : NULL);
              Compound_Selector_Obj h = SASS_MEMORY_COPY(head_);
              // remove parent selector from sequence
              if (h->length()) {
                h->erase(h->begin());
                ss->head(h);
              } else {
                ss->head(NULL);
              }
              // \/ IMO ruby sass bug \/
              ss->has_line_feed(false);
              // adjust for parent selector (1 char)
              // if (h->length()) {
              //   ParserState state(h->at(0)->pstate());
              //   state.offset.column += 1;
              //   state.column -= 1;
              //   (*h)[0]->pstate(state);
              // }
              // keep old parser state
              s->pstate(pstate());
              // append new tail
              s->append(ss, traces);
              retval->append(s);
            }
          }
        }
        // have no parent but some tails
        else {
          if (tails && tails->length() > 0) {
            for (size_t n = 0, nL = tails->length(); n < nL; ++n) {
              Complex_Selector_Obj cpy = SASS_MEMORY_CLONE(this);
              cpy->tail(SASS_MEMORY_CLONE(tails->at(n)));
              cpy->head(SASS_MEMORY_NEW(Compound_Selector, head->pstate()));
              for (size_t i = 1, L = this->head()->length(); i < L; ++i)
                cpy->head()->append((*this->head())[i]);
              if (!cpy->head()->length()) cpy->head(0);
              retval->append(cpy->skip_empty_reference());
            }
          }
          // have no parent nor tails
          else {
            Complex_Selector_Obj cpy = SASS_MEMORY_CLONE(this);
            cpy->head(SASS_MEMORY_NEW(Compound_Selector, head->pstate()));
            for (size_t i = 1, L = this->head()->length(); i < L; ++i)
              cpy->head()->append((*this->head())[i]);
            if (!cpy->head()->length()) cpy->head(0);
            retval->append(cpy->skip_empty_reference());
          }
        }
      }
      // no parent selector in head
      else {
        retval = this->tails(tails);
      }

      for (Simple_Selector_Obj ss : head->elements()) {
        if (Wrapped_Selector_Ptr ws = Cast<Wrapped_Selector>(ss)) {
          if (Selector_List_Ptr sl = Cast<Selector_List>(ws->selector())) {
            if (parents) ws->selector(sl->resolve_parent_refs(pstack, traces, implicit_parent));
          }
        }
      }

      return retval.detach();

    }
    // has no head
    return this->tails(tails);
  }

  Selector_List_Ptr Complex_Selector::tails(Selector_List_Ptr tails)
  {
    Selector_List_Ptr rv = SASS_MEMORY_NEW(Selector_List, pstate_);
    if (tails && tails->length()) {
      for (size_t i = 0, iL = tails->length(); i < iL; ++i) {
        Complex_Selector_Obj pr = SASS_MEMORY_CLONE(this);
        pr->tail(tails->at(i));
        rv->append(pr);
      }
    }
    else {
      rv->append(this);
    }
    return rv;
  }

  // return the last tail that is defined
  Complex_Selector_Obj Complex_Selector::first()
  {
    // declare variables used in loop
    Complex_Selector_Obj cur = this;
    Compound_Selector_Obj head;
    // processing loop
    while (cur)
    {
      // get the head
      head = cur->head_;
      // abort (and return) if it is not a parent selector
      if (!head || head->length() != 1 || !Cast<Parent_Selector>((*head)[0])) {
        break;
      }
      // advance to next
      cur = cur->tail_;
    }
    // result
    return cur;
  }

  // return the last tail that is defined
  Complex_Selector_Obj Complex_Selector::last()
  {
    Complex_Selector_Ptr cur = this;
    Complex_Selector_Ptr nxt = cur;
    // loop until last
    while (nxt) {
      cur = nxt;
      nxt = cur->tail();
    }
    return cur;
  }

  Complex_Selector::Combinator Complex_Selector::clear_innermost()
  {
    Combinator c;
    if (!tail() || tail()->tail() == 0)
    { c = combinator(); combinator(ANCESTOR_OF); tail(0); }
    else
    { c = tail()->clear_innermost(); }
    return c;
  }

  void Complex_Selector::set_innermost(Complex_Selector_Obj val, Combinator c)
  {
    if (!tail())
    { tail(val); combinator(c); }
    else
    { tail()->set_innermost(val, c); }
  }

  void Complex_Selector::cloneChildren()
  {
    if (head()) head(SASS_MEMORY_CLONE(head()));
    if (tail()) tail(SASS_MEMORY_CLONE(tail()));
  }

  void Compound_Selector::cloneChildren()
  {
    for (size_t i = 0, l = length(); i < l; i++) {
      at(i) = SASS_MEMORY_CLONE(at(i));
    }
  }

  void Selector_List::cloneChildren()
  {
    for (size_t i = 0, l = length(); i < l; i++) {
      at(i) = SASS_MEMORY_CLONE(at(i));
    }
  }

  void Wrapped_Selector::cloneChildren()
  {
    selector(SASS_MEMORY_CLONE(selector()));
  }

  // remove parent selector references
  // basically unwraps parsed selectors
  void Selector_List::remove_parent_selectors()
  {
    // Check every rhs selector against left hand list
    for(size_t i = 0, L = length(); i < L; ++i) {
      if (!(*this)[i]->head()) continue;
      if ((*this)[i]->head()->is_empty_reference()) {
        // simply move to the next tail if we have "no" combinator
        if ((*this)[i]->combinator() == Complex_Selector::ANCESTOR_OF) {
          if ((*this)[i]->tail()) {
            if ((*this)[i]->has_line_feed()) {
              (*this)[i]->tail()->has_line_feed(true);
            }
            (*this)[i] = (*this)[i]->tail();
          }
        }
        // otherwise remove the first item from head
        else {
          (*this)[i]->head()->erase((*this)[i]->head()->begin());
        }
      }
    }
  }

  size_t Wrapped_Selector::hash()
  {
    if (hash_ == 0) {
      hash_combine(hash_, Simple_Selector::hash());
      if (selector_) hash_combine(hash_, selector_->hash());
    }
    return hash_;
  }
  bool Wrapped_Selector::has_parent_ref() const {
    // if (has_reference()) return true;
    if (!selector()) return false;
    return selector()->has_parent_ref();
  }
  bool Wrapped_Selector::has_real_parent_ref() const {
    // if (has_reference()) return true;
    if (!selector()) return false;
    return selector()->has_real_parent_ref();
  }
  unsigned long Wrapped_Selector::specificity() const
  {
    return selector_ ? selector_->specificity() : 0;
  }


  bool Selector_List::has_parent_ref() const
  {
    for (Complex_Selector_Obj s : elements()) {
      if (s && s->has_parent_ref()) return true;
    }
    return false;
  }

  bool Selector_List::has_real_parent_ref() const
  {
    for (Complex_Selector_Obj s : elements()) {
      if (s && s->has_real_parent_ref()) return true;
    }
    return false;
  }

  bool Selector_Schema::has_parent_ref() const
  {
    if (String_Schema_Obj schema = Cast<String_Schema>(contents())) {
      return schema->length() > 0 && Cast<Parent_Selector>(schema->at(0)) != NULL;
    }
    return false;
  }

  bool Selector_Schema::has_real_parent_ref() const
  {
    if (String_Schema_Obj schema = Cast<String_Schema>(contents())) {
      Parent_Selector_Obj p = Cast<Parent_Selector>(schema->at(0));
      return schema->length() > 0 && p && p->is_real_parent_ref();
    }
    return false;
  }

  void Selector_List::adjust_after_pushing(Complex_Selector_Obj c)
  {
    // if (c->has_reference())   has_reference(true);
  }

  // it's a superselector if every selector of the right side
  // list is a superselector of the given left side selector
  bool Complex_Selector::is_superselector_of(Selector_List_Obj sub, std::string wrapping)
  {
    // Check every rhs selector against left hand list
    for(size_t i = 0, L = sub->length(); i < L; ++i) {
      if (!is_superselector_of((*sub)[i], wrapping)) return false;
    }
    return true;
  }

  // it's a superselector if every selector of the right side
  // list is a superselector of the given left side selector
  bool Selector_List::is_superselector_of(Selector_List_Obj sub, std::string wrapping)
  {
    // Check every rhs selector against left hand list
    for(size_t i = 0, L = sub->length(); i < L; ++i) {
      if (!is_superselector_of((*sub)[i], wrapping)) return false;
    }
    return true;
  }

  // it's a superselector if every selector on the right side
  // is a superselector of any one of the left side selectors
  bool Selector_List::is_superselector_of(Compound_Selector_Obj sub, std::string wrapping)
  {
    // Check every lhs selector against right hand
    for(size_t i = 0, L = length(); i < L; ++i) {
      if ((*this)[i]->is_superselector_of(sub, wrapping)) return true;
    }
    return false;
  }

  // it's a superselector if every selector on the right side
  // is a superselector of any one of the left side selectors
  bool Selector_List::is_superselector_of(Complex_Selector_Obj sub, std::string wrapping)
  {
    // Check every lhs selector against right hand
    for(size_t i = 0, L = length(); i < L; ++i) {
      if ((*this)[i]->is_superselector_of(sub)) return true;
    }
    return false;
  }

  Selector_List_Ptr Selector_List::unify_with(Selector_List_Ptr rhs) {
    std::vector<Complex_Selector_Obj> unified_complex_selectors;
    // Unify all of children with RHS's children, storing the results in `unified_complex_selectors`
    for (size_t lhs_i = 0, lhs_L = length(); lhs_i < lhs_L; ++lhs_i) {
      Complex_Selector_Obj seq1 = (*this)[lhs_i];
      for(size_t rhs_i = 0, rhs_L = rhs->length(); rhs_i < rhs_L; ++rhs_i) {
        Complex_Selector_Ptr seq2 = rhs->at(rhs_i);

        Selector_List_Obj result = seq1->unify_with(seq2);
        if( result ) {
          for(size_t i = 0, L = result->length(); i < L; ++i) {
            unified_complex_selectors.push_back( (*result)[i] );
          }
        }
      }
    }

    // Creates the final Selector_List by combining all the complex selectors
    Selector_List_Ptr final_result = SASS_MEMORY_NEW(Selector_List, pstate());
    for (auto itr = unified_complex_selectors.begin(); itr != unified_complex_selectors.end(); ++itr) {
      final_result->append(*itr);
    }
    return final_result;
  }

  void Selector_List::populate_extends(Selector_List_Obj extendee, Subset_Map& extends)
  {

    Selector_List_Ptr extender = this;
    for (auto complex_sel : extendee->elements()) {
      Complex_Selector_Obj c = complex_sel;


      // Ignore any parent selectors, until we find the first non Selectorerence head
      Compound_Selector_Obj compound_sel = c->head();
      Complex_Selector_Obj pIter = complex_sel;
      while (pIter) {
        Compound_Selector_Obj pHead = pIter->head();
        if (pHead && Cast<Parent_Selector>(pHead->elements()[0]) == NULL) {
          compound_sel = pHead;
          break;
        }

        pIter = pIter->tail();
      }

      if (!pIter->head() || pIter->tail()) {
        coreError("nested selectors may not be extended", c->pstate());
      }

      compound_sel->is_optional(extendee->is_optional());

      for (size_t i = 0, L = extender->length(); i < L; ++i) {
        extends.put(compound_sel, std::make_pair((*extender)[i], compound_sel));
      }
    }
  };

  void Compound_Selector::append(Simple_Selector_Ptr element)
  {
    Vectorized<Simple_Selector_Obj>::append(element);
    pstate_.offset += element->pstate().offset;
  }

  Compound_Selector_Ptr Compound_Selector::minus(Compound_Selector_Ptr rhs)
  {
    Compound_Selector_Ptr result = SASS_MEMORY_NEW(Compound_Selector, pstate());
    // result->has_parent_reference(has_parent_reference());

    // not very efficient because it needs to preserve order
    for (size_t i = 0, L = length(); i < L; ++i)
    {
      bool found = false;
      std::string thisSelector((*this)[i]->to_string());
      for (size_t j = 0, M = rhs->length(); j < M; ++j)
      {
        if (thisSelector == (*rhs)[j]->to_string())
        {
          found = true;
          break;
        }
      }
      if (!found) result->append((*this)[i]);
    }

    return result;
  }

  void Compound_Selector::mergeSources(ComplexSelectorSet& sources)
  {
    for (ComplexSelectorSet::iterator iterator = sources.begin(), endIterator = sources.end(); iterator != endIterator; ++iterator) {
      this->sources_.insert(SASS_MEMORY_CLONE(*iterator));
    }
  }

  Argument_Obj Arguments::get_rest_argument()
  {
    if (this->has_rest_argument()) {
      for (Argument_Obj arg : this->elements()) {
        if (arg->is_rest_argument()) {
          return arg;
        }
      }
    }
    return NULL;
  }

  Argument_Obj Arguments::get_keyword_argument()
  {
    if (this->has_keyword_argument()) {
      for (Argument_Obj arg : this->elements()) {
        if (arg->is_keyword_argument()) {
          return arg;
        }
      }
    }
    return NULL;
  }

  void Arguments::adjust_after_pushing(Argument_Obj a)
  {
    if (!a->name().empty()) {
      if (has_keyword_argument()) {
        coreError("named arguments must precede variable-length argument", a->pstate());
      }
      has_named_arguments(true);
    }
    else if (a->is_rest_argument()) {
      if (has_rest_argument()) {
        coreError("functions and mixins may only be called with one variable-length argument", a->pstate());
      }
      if (has_keyword_argument_) {
        coreError("only keyword arguments may follow variable arguments", a->pstate());
      }
      has_rest_argument(true);
    }
    else if (a->is_keyword_argument()) {
      if (has_keyword_argument()) {
        coreError("functions and mixins may only be called with one keyword argument", a->pstate());
      }
      has_keyword_argument(true);
    }
    else {
      if (has_rest_argument()) {
        coreError("ordinal arguments must precede variable-length arguments", a->pstate());
      }
      if (has_named_arguments()) {
        coreError("ordinal arguments must precede named arguments", a->pstate());
      }
    }
  }

  bool Ruleset::is_invisible() const {
    if (Selector_List_Ptr sl = Cast<Selector_List>(selector())) {
      for (size_t i = 0, L = sl->length(); i < L; ++i)
        if (!(*sl)[i]->has_placeholder()) return false;
    }
    return true;
  }

  bool Media_Block::is_invisible() const {
    for (size_t i = 0, L = block()->length(); i < L; ++i) {
      Statement_Obj stm = block()->at(i);
      if (!stm->is_invisible()) return false;
    }
    return true;
  }

  Number::Number(ParserState pstate, double val, std::string u, bool zero)
  : Value(pstate),
    Units(),
    value_(val),
    zero_(zero),
    hash_(0)
  {
    size_t l = 0;
    size_t r;
    if (!u.empty()) {
      bool nominator = true;
      while (true) {
        r = u.find_first_of("*/", l);
        std::string unit(u.substr(l, r == std::string::npos ? r : r - l));
        if (!unit.empty()) {
          if (nominator) numerators.push_back(unit);
          else denominators.push_back(unit);
        }
        if (r == std::string::npos) break;
        // ToDo: should error for multiple slashes
        // if (!nominator && u[r] == '/') error(...)
        if (u[r] == '/')
          nominator = false;
        // strange math parsing?
        // else if (u[r] == '*')
        //  nominator = true;
        l = r + 1;
      }
    }
    concrete_type(NUMBER);
  }

  // cancel out unnecessary units
  void Number::reduce()
  {
    // apply conversion factor
    value_ *= this->Units::reduce();
  }

  void Number::normalize()
  {
    // apply conversion factor
    value_ *= this->Units::normalize();
  }

  bool Custom_Warning::operator== (const Expression& rhs) const
  {
    if (Custom_Warning_Ptr_Const r = Cast<Custom_Warning>(&rhs)) {
      return message() == r->message();
    }
    return false;
  }

  bool Custom_Error::operator== (const Expression& rhs) const
  {
    if (Custom_Error_Ptr_Const r = Cast<Custom_Error>(&rhs)) {
      return message() == r->message();
    }
    return false;
  }

  bool Number::operator== (const Expression& rhs) const
  {
    if (auto rhsnr = Cast<Number>(&rhs)) {
      return *this == *rhsnr;
    }
    return false;
  }

  bool Number::operator== (const Number& rhs) const
  {
    Number l(*this), r(rhs); l.reduce(); r.reduce();
    size_t lhs_units = l.numerators.size() + l.denominators.size();
    size_t rhs_units = r.numerators.size() + r.denominators.size();
    // unitless and only having one unit seems equivalent (will change in future)
    if (!lhs_units || !rhs_units) {
      return NEAR_EQUAL(l.value(), r.value());
    }
    l.normalize(); r.normalize();
    Units &lhs_unit = l, &rhs_unit = r;
    return lhs_unit == rhs_unit &&
      NEAR_EQUAL(l.value(), r.value());
  }

  bool Number::operator< (const Number& rhs) const
  {
    Number l(*this), r(rhs); l.reduce(); r.reduce();
    size_t lhs_units = l.numerators.size() + l.denominators.size();
    size_t rhs_units = r.numerators.size() + r.denominators.size();
    // unitless and only having one unit seems equivalent (will change in future)
    if (!lhs_units || !rhs_units) {
      return l.value() < r.value();
    }
    l.normalize(); r.normalize();
    Units &lhs_unit = l, &rhs_unit = r;
    if (!(lhs_unit == rhs_unit)) {
      /* ToDo: do we always get usefull backtraces? */
      throw Exception::IncompatibleUnits(rhs, *this);
    }
    return lhs_unit < rhs_unit ||
           l.value() < r.value();
  }

  bool String_Quoted::operator== (const Expression& rhs) const
  {
    if (String_Quoted_Ptr_Const qstr = Cast<String_Quoted>(&rhs)) {
      return (value() == qstr->value());
    } else if (String_Constant_Ptr_Const cstr = Cast<String_Constant>(&rhs)) {
      return (value() == cstr->value());
    }
    return false;
  }

  bool String_Constant::is_invisible() const {
    return value_.empty() && quote_mark_ == 0;
  }

  bool String_Constant::operator== (const Expression& rhs) const
  {
    if (String_Quoted_Ptr_Const qstr = Cast<String_Quoted>(&rhs)) {
      return (value() == qstr->value());
    } else if (String_Constant_Ptr_Const cstr = Cast<String_Constant>(&rhs)) {
      return (value() == cstr->value());
    }
    return false;
  }

  bool String_Schema::is_left_interpolant(void) const
  {
    return length() && first()->is_left_interpolant();
  }
  bool String_Schema::is_right_interpolant(void) const
  {
    return length() && last()->is_right_interpolant();
  }

  bool String_Schema::operator== (const Expression& rhs) const
  {
    if (String_Schema_Ptr_Const r = Cast<String_Schema>(&rhs)) {
      if (length() != r->length()) return false;
      for (size_t i = 0, L = length(); i < L; ++i) {
        Expression_Obj rv = (*r)[i];
        Expression_Obj lv = (*this)[i];
        if (!lv || !rv) return false;
        if (!(*lv == *rv)) return false;
      }
      return true;
    }
    return false;
  }

  bool Boolean::operator== (const Expression& rhs) const
  {
    if (Boolean_Ptr_Const r = Cast<Boolean>(&rhs)) {
      return (value() == r->value());
    }
    return false;
  }

  bool Color::operator== (const Expression& rhs) const
  {
    if (Color_Ptr_Const r = Cast<Color>(&rhs)) {
      return r_ == r->r() &&
             g_ == r->g() &&
             b_ == r->b() &&
             a_ == r->a();
    }
    return false;
  }

  bool List::operator== (const Expression& rhs) const
  {
    if (List_Ptr_Const r = Cast<List>(&rhs)) {
      if (length() != r->length()) return false;
      if (separator() != r->separator()) return false;
      if (is_bracketed() != r->is_bracketed()) return false;
      for (size_t i = 0, L = length(); i < L; ++i) {
        Expression_Obj rv = r->at(i);
        Expression_Obj lv = this->at(i);
        if (!lv || !rv) return false;
        if (!(*lv == *rv)) return false;
      }
      return true;
    }
    return false;
  }

  bool Map::operator== (const Expression& rhs) const
  {
    if (Map_Ptr_Const r = Cast<Map>(&rhs)) {
      if (length() != r->length()) return false;
      for (auto key : keys()) {
        Expression_Obj lv = at(key);
        Expression_Obj rv = r->at(key);
        if (!rv || !lv) return false;
        if (!(*lv == *rv)) return false;
      }
      return true;
    }
    return false;
  }

  bool Null::operator== (const Expression& rhs) const
  {
    return rhs.concrete_type() == NULL_VAL;
  }

  bool Function::operator== (const Expression& rhs) const
  {
    if (Function_Ptr_Const r = Cast<Function>(&rhs)) {
      Definition_Ptr_Const d1 = Cast<Definition>(definition());
      Definition_Ptr_Const d2 = Cast<Definition>(r->definition());
      return d1 && d2 && d1 == d2 && is_css() == r->is_css();
    }
    return false;
  }

  size_t List::size() const {
    if (!is_arglist_) return length();
    // arglist expects a list of arguments
    // so we need to break before keywords
    for (size_t i = 0, L = length(); i < L; ++i) {
      Expression_Obj obj = this->at(i);
      if (Argument_Ptr arg = Cast<Argument>(obj)) {
        if (!arg->name().empty()) return i;
      }
    }
    return length();
  }

  Expression_Obj Hashed::at(Expression_Obj k) const
  {
    if (elements_.count(k))
    { return elements_.at(k); }
    else { return NULL; }
  }

  bool Binary_Expression::is_left_interpolant(void) const
  {
    return is_interpolant() || (left() && left()->is_left_interpolant());
  }
  bool Binary_Expression::is_right_interpolant(void) const
  {
    return is_interpolant() || (right() && right()->is_right_interpolant());
  }

  const std::string AST_Node::to_string(Sass_Inspect_Options opt) const
  {
    Sass_Output_Options out(opt);
    Emitter emitter(out);
    Inspect i(emitter);
    i.in_declaration = true;
    // ToDo: inspect should be const
    const_cast<AST_Node_Ptr>(this)->perform(&i);
    return i.get_buffer();
  }

  const std::string AST_Node::to_string() const
  {
    return to_string({ NESTED, 5 });
  }

  std::string String_Quoted::inspect() const
  {
    return quote(value_, '*');
  }

  std::string String_Constant::inspect() const
  {
    return quote(value_, '*');
  }

  bool Declaration::is_invisible() const
  {
    if (is_custom_property()) return false;

    return !(value_ && value_->concrete_type() != Expression::NULL_VAL);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  // Additional method on Lists to retrieve values directly or from an encompassed Argument.
  //////////////////////////////////////////////////////////////////////////////////////////
  Expression_Obj List::value_at_index(size_t i) {
    Expression_Obj obj = this->at(i);
    if (is_arglist_) {
      if (Argument_Ptr arg = Cast<Argument>(obj)) {
        return arg->value();
      } else {
        return obj;
      }
    } else {
      return obj;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  // Convert map to (key, value) list.
  //////////////////////////////////////////////////////////////////////////////////////////
  List_Obj Map::to_list(ParserState& pstate) {
    List_Obj ret = SASS_MEMORY_NEW(List, pstate, length(), SASS_COMMA);

    for (auto key : keys()) {
      List_Obj l = SASS_MEMORY_NEW(List, pstate, 2);
      l->append(key);
      l->append(at(key));
      ret->append(l);
    }

    return ret;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  // Copy implementations
  //////////////////////////////////////////////////////////////////////////////////////////

  #ifdef DEBUG_SHARED_PTR

  #define IMPLEMENT_AST_OPERATORS(klass) \
    klass##_Ptr klass::copy(std::string file, size_t line) const { \
      klass##_Ptr cpy = new klass(this); \
      cpy->trace(file, line); \
      return cpy; \
    } \
    klass##_Ptr klass::clone(std::string file, size_t line) const { \
      klass##_Ptr cpy = copy(file, line); \
      cpy->cloneChildren(); \
      return cpy; \
    } \

  #else

  #define IMPLEMENT_AST_OPERATORS(klass) \
    klass##_Ptr klass::copy() const { \
      return new klass(this); \
    } \
    klass##_Ptr klass::clone() const { \
      klass##_Ptr cpy = copy(); \
      cpy->cloneChildren(); \
      return cpy; \
    } \

  #endif

  IMPLEMENT_AST_OPERATORS(Supports_Operator);
  IMPLEMENT_AST_OPERATORS(Supports_Negation);
  IMPLEMENT_AST_OPERATORS(Compound_Selector);
  IMPLEMENT_AST_OPERATORS(Complex_Selector);
  IMPLEMENT_AST_OPERATORS(Element_Selector);
  IMPLEMENT_AST_OPERATORS(Class_Selector);
  IMPLEMENT_AST_OPERATORS(Id_Selector);
  IMPLEMENT_AST_OPERATORS(Pseudo_Selector);
  IMPLEMENT_AST_OPERATORS(Wrapped_Selector);
  IMPLEMENT_AST_OPERATORS(Selector_List);
  IMPLEMENT_AST_OPERATORS(Ruleset);
  IMPLEMENT_AST_OPERATORS(Media_Block);
  IMPLEMENT_AST_OPERATORS(Custom_Warning);
  IMPLEMENT_AST_OPERATORS(Custom_Error);
  IMPLEMENT_AST_OPERATORS(List);
  IMPLEMENT_AST_OPERATORS(Map);
  IMPLEMENT_AST_OPERATORS(Function);
  IMPLEMENT_AST_OPERATORS(Number);
  IMPLEMENT_AST_OPERATORS(Binary_Expression);
  IMPLEMENT_AST_OPERATORS(String_Schema);
  IMPLEMENT_AST_OPERATORS(String_Constant);
  IMPLEMENT_AST_OPERATORS(String_Quoted);
  IMPLEMENT_AST_OPERATORS(Boolean);
  IMPLEMENT_AST_OPERATORS(Color);
  IMPLEMENT_AST_OPERATORS(Null);
  IMPLEMENT_AST_OPERATORS(Parent_Selector);
  IMPLEMENT_AST_OPERATORS(Import);
  IMPLEMENT_AST_OPERATORS(Import_Stub);
  IMPLEMENT_AST_OPERATORS(Function_Call);
  IMPLEMENT_AST_OPERATORS(Directive);
  IMPLEMENT_AST_OPERATORS(At_Root_Block);
  IMPLEMENT_AST_OPERATORS(Supports_Block);
  IMPLEMENT_AST_OPERATORS(While);
  IMPLEMENT_AST_OPERATORS(Each);
  IMPLEMENT_AST_OPERATORS(For);
  IMPLEMENT_AST_OPERATORS(If);
  IMPLEMENT_AST_OPERATORS(Mixin_Call);
  IMPLEMENT_AST_OPERATORS(Extension);
  IMPLEMENT_AST_OPERATORS(Media_Query);
  IMPLEMENT_AST_OPERATORS(Media_Query_Expression);
  IMPLEMENT_AST_OPERATORS(Debug);
  IMPLEMENT_AST_OPERATORS(Error);
  IMPLEMENT_AST_OPERATORS(Warning);
  IMPLEMENT_AST_OPERATORS(Assignment);
  IMPLEMENT_AST_OPERATORS(Return);
  IMPLEMENT_AST_OPERATORS(At_Root_Query);
  IMPLEMENT_AST_OPERATORS(Variable);
  IMPLEMENT_AST_OPERATORS(Comment);
  IMPLEMENT_AST_OPERATORS(Attribute_Selector);
  IMPLEMENT_AST_OPERATORS(Supports_Interpolation);
  IMPLEMENT_AST_OPERATORS(Supports_Declaration);
  IMPLEMENT_AST_OPERATORS(Supports_Condition);
  IMPLEMENT_AST_OPERATORS(Parameters);
  IMPLEMENT_AST_OPERATORS(Parameter);
  IMPLEMENT_AST_OPERATORS(Arguments);
  IMPLEMENT_AST_OPERATORS(Argument);
  IMPLEMENT_AST_OPERATORS(Unary_Expression);
  IMPLEMENT_AST_OPERATORS(Function_Call_Schema);
  IMPLEMENT_AST_OPERATORS(Block);
  IMPLEMENT_AST_OPERATORS(Content);
  IMPLEMENT_AST_OPERATORS(Trace);
  IMPLEMENT_AST_OPERATORS(Keyframe_Rule);
  IMPLEMENT_AST_OPERATORS(Bubble);
  IMPLEMENT_AST_OPERATORS(Selector_Schema);
  IMPLEMENT_AST_OPERATORS(Placeholder_Selector);
  IMPLEMENT_AST_OPERATORS(Definition);
  IMPLEMENT_AST_OPERATORS(Declaration);
}
