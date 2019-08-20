#ifndef SASS_MAPPING_H
#define SASS_MAPPING_H

#include "position.hpp"

namespace Sass {

  struct Mapping {
    Position original_position;
    Position generated_position;

    Mapping(const Position& original_position, const Position& generated_position)
    : original_position(original_position), generated_position(generated_position) { }
  };

}

#endif
