#ifndef SASS_PATHS_H
#define SASS_PATHS_H

#include <string>
#include <vector>
#include <sstream>


template<typename T>
std::string vector_to_string(std::vector<T> v)
{
  std::stringstream buffer;
  buffer << "[";

  if (!v.empty())
  {  buffer << v[0]; }
  else
  { buffer << "]"; }

  if (v.size() == 1)
  { buffer << "]"; }
  else
  {
    for (size_t i = 1, S = v.size(); i < S; ++i) buffer << ", " << v[i];
    buffer << "]";
  }

  return buffer.str();
}

namespace Sass {


  template<typename T>
  std::vector<std::vector<T> > paths(std::vector<std::vector<T> > strata, size_t from_end = 0)
  {
    if (strata.empty()) {
      return std::vector<std::vector<T> >();
    }

    size_t end = strata.size() - from_end;
    if (end <= 1) {
      std::vector<std::vector<T> > starting_points;
      starting_points.reserve(strata[0].size());
      for (size_t i = 0, S = strata[0].size(); i < S; ++i) {
        std::vector<T> starting_point;
        starting_point.push_back(strata[0][i]);
        starting_points.push_back(starting_point);
      }
      return starting_points;
    }

    std::vector<std::vector<T> > up_to_here = paths(strata, from_end + 1);
    std::vector<T>          here       = strata[end-1];

    std::vector<std::vector<T> > branches;
    branches.reserve(up_to_here.size() * here.size());
    for (size_t i = 0, S1 = up_to_here.size(); i < S1; ++i) {
      for (size_t j = 0, S2 = here.size(); j < S2; ++j) {
        std::vector<T> branch = up_to_here[i];
        branch.push_back(here[j]);
        branches.push_back(branch);
      }
    }

    return branches;
  }

}

#endif
