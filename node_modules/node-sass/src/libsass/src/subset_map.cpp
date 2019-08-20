#include "sass.hpp"
#include "ast.hpp"
#include "subset_map.hpp"

namespace Sass {

  void Subset_Map::put(const Compound_Selector_Obj& sel, const SubSetMapPair& value)
  {
    if (sel->empty()) throw std::runtime_error("internal error: subset map keys may not be empty");
    size_t index = values_.size();
    values_.push_back(value);
    for (size_t i = 0, S = sel->length(); i < S; ++i)
    {
      hash_[(*sel)[i]].push_back(std::make_pair(sel, index));
    }
  }

  std::vector<SubSetMapPair> Subset_Map::get_kv(const Compound_Selector_Obj& sel)
  {
    SimpleSelectorDict dict(sel->begin(), sel->end()); // XXX Set
    std::vector<size_t> indices;
    for (size_t i = 0, S = sel->length(); i < S; ++i) {
      if (!hash_.count((*sel)[i])) {
        continue;
      }
      const std::vector<std::pair<Compound_Selector_Obj, size_t> >& subsets = hash_[(*sel)[i]];
      for (const std::pair<Compound_Selector_Obj, size_t>& item : subsets) {
        bool include = true;
        for (const Simple_Selector_Obj& it : item.first->elements()) {
          auto found = dict.find(it);
          if (found == dict.end()) {
            include = false;
            break;
          }
        }
        if (include) indices.push_back(item.second);
      }
    }
    sort(indices.begin(), indices.end());
    std::vector<size_t>::iterator indices_end = unique(indices.begin(), indices.end());
    indices.resize(distance(indices.begin(), indices_end));

    std::vector<SubSetMapPair> results;
    for (size_t i = 0, S = indices.size(); i < S; ++i) {
      results.push_back(values_[indices[i]]);
    }
    return results;
  }

  std::vector<SubSetMapPair> Subset_Map::get_v(const Compound_Selector_Obj& sel)
  {
    return get_kv(sel);
  }

}