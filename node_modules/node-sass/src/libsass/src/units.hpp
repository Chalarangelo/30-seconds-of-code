#ifndef SASS_UNITS_H
#define SASS_UNITS_H

#include <cmath>
#include <string>
#include <sstream>
#include <vector>

namespace Sass {

  const double PI = std::acos(-1);

  enum UnitClass {
    LENGTH = 0x000,
    ANGLE = 0x100,
    TIME = 0x200,
    FREQUENCY = 0x300,
    RESOLUTION = 0x400,
    INCOMMENSURABLE = 0x500
  };

  enum UnitType {

    // size units
    IN = UnitClass::LENGTH,
    CM,
    PC,
    MM,
    PT,
    PX,

    // angle units
    DEG = ANGLE,
    GRAD,
    RAD,
    TURN,

    // time units
    SEC = TIME,
    MSEC,

    // frequency units
    HERTZ = FREQUENCY,
    KHERTZ,

    // resolutions units
    DPI = RESOLUTION,
    DPCM,
    DPPX,

    // for unknown units
    UNKNOWN = INCOMMENSURABLE

  };

  class Units {
  public:
    std::vector<std::string> numerators;
    std::vector<std::string> denominators;
  public:
    // default constructor
    Units() :
      numerators(),
      denominators()
    { }
    // copy constructor
    Units(const Units* ptr) :
      numerators(ptr->numerators),
      denominators(ptr->denominators)
    { }
    // convert to string
    std::string unit() const;
    // get if units are empty
    bool is_unitless() const;
    // return if valid for css
    bool is_valid_css_unit() const;
    // reduce units for output
    // returns conversion factor
    double reduce();
    // normalize units for compare
    // returns conversion factor
    double normalize();
    // compare operations
    bool operator< (const Units& rhs) const;
    bool operator== (const Units& rhs) const;
    // factor to convert into given units
    double convert_factor(const Units&) const;
  };

  extern const double size_conversion_factors[6][6];
  extern const double angle_conversion_factors[4][4];
  extern const double time_conversion_factors[2][2];
  extern const double frequency_conversion_factors[2][2];
  extern const double resolution_conversion_factors[3][3];

  UnitType get_main_unit(const UnitClass unit);
  enum Sass::UnitType string_to_unit(const std::string&);
  const char* unit_to_string(Sass::UnitType unit);
  enum Sass::UnitClass get_unit_type(Sass::UnitType unit);
  std::string get_unit_class(Sass::UnitType unit);
  std::string unit_to_class(const std::string&);
  // throws incompatibleUnits exceptions
  double conversion_factor(const std::string&, const std::string&);
  double conversion_factor(UnitType, UnitType, UnitClass, UnitClass);
  double convert_units(const std::string&, const std::string&, int&, int&);

}

#endif
