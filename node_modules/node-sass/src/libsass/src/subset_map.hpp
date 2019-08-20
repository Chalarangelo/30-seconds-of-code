#ifndef SASS_SUBSET_MAP_H
#define SASS_SUBSET_MAP_H

#include <map>
#include <set>
#include <vector>
#include <algorithm>
#include <iterator>

#include "ast_fwd_decl.hpp"


// #include <iostream>
// #include <sstream>
// template<typename T>
// std::string vector_to_string(std::vector<T> v)
// {
//   std::stringstream buffer;
//   buffer << "[";

//   if (!v.empty())
//   {  buffer << v[0]; }
//   else
//   { buffer << "]"; }

//   if (v.size() == 1)
//   { buffer << "]"; }
//   else
//   {
//     for (size_t i = 1, S = v.size(); i < S; ++i) buffer << ", " << v[i];
//     buffer << "]";
//   }

//   return buffer.str();
// }

// template<typename T>
// std::string set_to_string(set<T> v)
// {
//   std::stringstream buffer;
//   buffer << "[";
//   typename std::set<T>::iterator i = v.begin();
//   if (!v.empty())
//   {  buffer << *i; }
//   else
//   { buffer << "]"; }

//   if (v.size() == 1)
//   { buffer << "]"; }
//   else
//   {
//     for (++i; i != v.end(); ++i) buffer << ", " << *i;
//     buffer << "]";
//   }

//   return buffer.str();
// }

namespace Sass {

  class Subset_Map {
  private:
    std::vector<SubSetMapPair> values_;
    std::map<Simple_Selector_Obj, std::vector<std::pair<Compound_Selector_Obj, size_t> >, OrderNodes > hash_;
  public:
    void put(const Compound_Selector_Obj& sel, const SubSetMapPair& value);
    std::vector<SubSetMapPair> get_kv(const Compound_Selector_Obj& s);
    std::vector<SubSetMapPair> get_v(const Compound_Selector_Obj& s);
    bool empty() { return values_.empty(); }
    void clear() { values_.clear(); hash_.clear(); }
    const std::vector<SubSetMapPair> values(void) { return values_; }
  };

}

#endif
