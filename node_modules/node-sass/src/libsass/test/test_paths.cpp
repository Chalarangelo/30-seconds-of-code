#include <iostream>
#include "../paths.hpp"

using namespace Sass;

template<typename T>
std::vector<T>& operator<<(std::vector<T>& v, const T& e)
{
  v.push_back(e);
  return v;
}

int main()
{
  std::vector<int> v1, v2, v3;
  v1 << 1 << 2;
  v2 << 3;
  v3 << 4 << 5 << 6;

  std::vector<std::vector<int> > ss;
  ss << v1 << v2 << v3;

  std::vector<std::vector<int> > ps = paths(ss);
  for (size_t i = 0, S = ps.size(); i < S; ++i) {
    std::cout << vector_to_string(ps[i]) << std::endl;
  }
  return 0;
}
