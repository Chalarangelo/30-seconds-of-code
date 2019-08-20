#include "sass.hpp"
#include <stdexcept>
#include "units.hpp"
#include "error_handling.hpp"

namespace Sass {

  /* the conversion matrix can be readed the following way */
  /* if you go down, the factor is for the numerator (multiply) */
  /* if you go right, the factor is for the denominator (divide) */
  /* and yes, we actually use both, not sure why, but why not!? */

  const double size_conversion_factors[6][6] =
  {
             /*  in         cm         pc         mm         pt         px        */
    /* in   */ { 1,         2.54,      6,         25.4,      72,        96,       },
    /* cm   */ { 1.0/2.54,  1,         6.0/2.54,  10,        72.0/2.54, 96.0/2.54 },
    /* pc   */ { 1.0/6.0,   2.54/6.0,  1,         25.4/6.0,  72.0/6.0,  96.0/6.0  },
    /* mm   */ { 1.0/25.4,  1.0/10.0,  6.0/25.4,  1,         72.0/25.4, 96.0/25.4 },
    /* pt   */ { 1.0/72.0,  2.54/72.0, 6.0/72.0,  25.4/72.0, 1,         96.0/72.0 },
    /* px   */ { 1.0/96.0,  2.54/96.0, 6.0/96.0,  25.4/96.0, 72.0/96.0, 1,        }
  };

  const double angle_conversion_factors[4][4] =
  {
             /*  deg        grad       rad        turn      */
    /* deg  */ { 1,         40.0/36.0, PI/180.0,  1.0/360.0 },
    /* grad */ { 36.0/40.0, 1,         PI/200.0,  1.0/400.0 },
    /* rad  */ { 180.0/PI,  200.0/PI,  1,         0.5/PI    },
    /* turn */ { 360.0,     400.0,     2.0*PI,    1         }
  };

  const double time_conversion_factors[2][2] =
  {
             /*  s          ms        */
    /* s    */ { 1,         1000.0    },
    /* ms   */ { 1/1000.0,  1         }
  };
  const double frequency_conversion_factors[2][2] =
  {
             /*  Hz         kHz       */
    /* Hz   */ { 1,         1/1000.0  },
    /* kHz  */ { 1000.0,    1         }
  };
  const double resolution_conversion_factors[3][3] =
  {
             /*  dpi        dpcm       dppx     */
    /* dpi  */ { 1,         1/2.54,    1/96.0   },
    /* dpcm */ { 2.54,      1,         2.54/96  },
    /* dppx */ { 96,        96/2.54,   1        }
  };

  UnitClass get_unit_type(UnitType unit)
  {
    switch (unit & 0xFF00)
    {
      case UnitClass::LENGTH:      return UnitClass::LENGTH;
      case UnitClass::ANGLE:       return UnitClass::ANGLE;
      case UnitClass::TIME:        return UnitClass::TIME;
      case UnitClass::FREQUENCY:   return UnitClass::FREQUENCY;
      case UnitClass::RESOLUTION:  return UnitClass::RESOLUTION;
      default:                     return UnitClass::INCOMMENSURABLE;
    }
  };

  std::string get_unit_class(UnitType unit)
  {
    switch (unit & 0xFF00)
    {
      case UnitClass::LENGTH:      return "LENGTH";
      case UnitClass::ANGLE:       return "ANGLE";
      case UnitClass::TIME:        return "TIME";
      case UnitClass::FREQUENCY:   return "FREQUENCY";
      case UnitClass::RESOLUTION:  return "RESOLUTION";
      default:                     return "INCOMMENSURABLE";
    }
  };

  UnitType get_main_unit(const UnitClass unit)
  {
    switch (unit)
    {
      case UnitClass::LENGTH:      return UnitType::PX;
      case UnitClass::ANGLE:       return UnitType::DEG;
      case UnitClass::TIME:        return UnitType::SEC;
      case UnitClass::FREQUENCY:   return UnitType::HERTZ;
      case UnitClass::RESOLUTION:  return UnitType::DPI;
      default:                     return UnitType::UNKNOWN;
    }
  };

  UnitType string_to_unit(const std::string& s)
  {
    // size units
    if      (s == "px")   return UnitType::PX;
    else if (s == "pt")   return UnitType::PT;
    else if (s == "pc")   return UnitType::PC;
    else if (s == "mm")   return UnitType::MM;
    else if (s == "cm")   return UnitType::CM;
    else if (s == "in")   return UnitType::IN;
    // angle units
    else if (s == "deg")  return UnitType::DEG;
    else if (s == "grad") return UnitType::GRAD;
    else if (s == "rad")  return UnitType::RAD;
    else if (s == "turn") return UnitType::TURN;
    // time units
    else if (s == "s")    return UnitType::SEC;
    else if (s == "ms")   return UnitType::MSEC;
    // frequency units
    else if (s == "Hz")   return UnitType::HERTZ;
    else if (s == "kHz")  return UnitType::KHERTZ;
    // resolutions units
    else if (s == "dpi")  return UnitType::DPI;
    else if (s == "dpcm") return UnitType::DPCM;
    else if (s == "dppx") return UnitType::DPPX;
    // for unknown units
    else return UnitType::UNKNOWN;
  }

  const char* unit_to_string(UnitType unit)
  {
    switch (unit) {
      // size units
      case UnitType::PX:      return "px";
      case UnitType::PT:      return "pt";
      case UnitType::PC:      return "pc";
      case UnitType::MM:      return "mm";
      case UnitType::CM:      return "cm";
      case UnitType::IN:      return "in";
      // angle units
      case UnitType::DEG:     return "deg";
      case UnitType::GRAD:    return "grad";
      case UnitType::RAD:     return "rad";
      case UnitType::TURN:    return "turn";
      // time units
      case UnitType::SEC:     return "s";
      case UnitType::MSEC:    return "ms";
      // frequency units
      case UnitType::HERTZ:   return "Hz";
      case UnitType::KHERTZ:  return "kHz";
      // resolutions units
      case UnitType::DPI:     return "dpi";
      case UnitType::DPCM:    return "dpcm";
      case UnitType::DPPX:    return "dppx";
      // for unknown units
      default:                return "";
    }
  }

  std::string unit_to_class(const std::string& s)
  {
    if      (s == "px")   return "LENGTH";
    else if (s == "pt")   return "LENGTH";
    else if (s == "pc")   return "LENGTH";
    else if (s == "mm")   return "LENGTH";
    else if (s == "cm")   return "LENGTH";
    else if (s == "in")   return "LENGTH";
    // angle units
    else if (s == "deg")  return "ANGLE";
    else if (s == "grad") return "ANGLE";
    else if (s == "rad")  return "ANGLE";
    else if (s == "turn") return "ANGLE";
    // time units
    else if (s == "s")    return "TIME";
    else if (s == "ms")   return "TIME";
    // frequency units
    else if (s == "Hz")   return "FREQUENCY";
    else if (s == "kHz")  return "FREQUENCY";
    // resolutions units
    else if (s == "dpi")  return "RESOLUTION";
    else if (s == "dpcm") return "RESOLUTION";
    else if (s == "dppx") return "RESOLUTION";
    // for unknown units
    return "CUSTOM:" + s;
  }

  // throws incompatibleUnits exceptions
  double conversion_factor(const std::string& s1, const std::string& s2)
  {
    // assert for same units
    if (s1 == s2) return 1;
    // get unit enum from string
    UnitType u1 = string_to_unit(s1);
    UnitType u2 = string_to_unit(s2);
    // query unit group types
    UnitClass t1 = get_unit_type(u1);
    UnitClass t2 = get_unit_type(u2);
    // return the conversion factor
    return conversion_factor(u1, u2, t1, t2);
  }

  // throws incompatibleUnits exceptions
  double conversion_factor(UnitType u1, UnitType u2, UnitClass t1, UnitClass t2)
  {
    // can't convert between groups
    if (t1 != t2) return 0;
    // get absolute offset
    // used for array acces
    size_t i1 = u1 - t1;
    size_t i2 = u2 - t2;
    // process known units
    switch (t1) {
      case LENGTH:
        return size_conversion_factors[i1][i2];
      case ANGLE:
        return angle_conversion_factors[i1][i2];
      case TIME:
        return time_conversion_factors[i1][i2];
      case FREQUENCY:
        return frequency_conversion_factors[i1][i2];
      case RESOLUTION:
        return resolution_conversion_factors[i1][i2];
      case INCOMMENSURABLE:
        return 0;
    }
    // fallback
    return 0;
  }

  double convert_units(const std::string& lhs, const std::string& rhs, int& lhsexp, int& rhsexp)
  {
    double f = 0;
    // do not convert same ones
    if (lhs == rhs) return 0;
    // skip already canceled out unit
    if (lhsexp == 0) return 0;
    if (rhsexp == 0) return 0;
    // check if it can be converted
    UnitType ulhs = string_to_unit(lhs);
    UnitType urhs = string_to_unit(rhs);
    // skip units we cannot convert
    if (ulhs == UNKNOWN) return 0;
    if (urhs == UNKNOWN) return 0;
    // query unit group types
    UnitClass clhs = get_unit_type(ulhs);
    UnitClass crhs = get_unit_type(urhs);
    // skip units we cannot convert
    if (clhs != crhs) return 0;
    // if right denominator is bigger than lhs, we want to keep it in rhs unit
    if (rhsexp < 0 && lhsexp > 0 && - rhsexp > lhsexp) {
      // get the conversion factor for units
      f = conversion_factor(urhs, ulhs, clhs, crhs);
      // left hand side has been consumned
      f = std::pow(f, lhsexp);
      rhsexp += lhsexp;
      lhsexp = 0;
    }
    else {
      // get the conversion factor for units
      f = conversion_factor(ulhs, urhs, clhs, crhs);
      // right hand side has been consumned
      f = std::pow(f, rhsexp);
      lhsexp += rhsexp;
      rhsexp = 0;
    }
    return f;
  }

  bool Units::operator< (const Units& rhs) const
  {
    return (numerators < rhs.numerators) &&
           (denominators < rhs.denominators);
  }
  bool Units::operator== (const Units& rhs) const
  {
    return (numerators == rhs.numerators) &&
           (denominators == rhs.denominators);
  }

  double Units::normalize()
  {

    size_t iL = numerators.size();
    size_t nL = denominators.size();

    // the final conversion factor
    double factor = 1;

    for (size_t i = 0; i < iL; i++) {
      std::string &lhs = numerators[i];
      UnitType ulhs = string_to_unit(lhs);
      if (ulhs == UNKNOWN) continue;
      UnitClass clhs = get_unit_type(ulhs);
      UnitType umain = get_main_unit(clhs);
      if (ulhs == umain) continue;
      double f(conversion_factor(umain, ulhs, clhs, clhs));
      if (f == 0) throw std::runtime_error("INVALID");
      numerators[i] = unit_to_string(umain);
      factor /= f;
    }

    for (size_t n = 0; n < nL; n++) {
      std::string &rhs = denominators[n];
      UnitType urhs = string_to_unit(rhs);
      if (urhs == UNKNOWN) continue;
      UnitClass crhs = get_unit_type(urhs);
      UnitType umain = get_main_unit(crhs);
      if (urhs == umain) continue;
      double f(conversion_factor(umain, urhs, crhs, crhs));
      if (f == 0) throw std::runtime_error("INVALID");
      denominators[n] = unit_to_string(umain);
      factor /= f;
    }

    std::sort (numerators.begin(), numerators.end());
    std::sort (denominators.begin(), denominators.end());

    // return for conversion
    return factor;
  }

  double Units::reduce()
  {

    size_t iL = numerators.size();
    size_t nL = denominators.size();

    // have less than two units?
    if (iL + nL < 2) return 1;

    // first make sure same units cancel each other out
    // it seems that a map table will fit nicely to do this
    // we basically construct exponents for each unit
    // has the advantage that they will be pre-sorted
    std::map<std::string, int> exponents;

    // initialize by summing up occurences in unit vectors
    // this will already cancel out equivalent units (e.q. px/px)
    for (size_t i = 0; i < iL; i ++) exponents[numerators[i]] += 1;
    for (size_t n = 0; n < nL; n ++) exponents[denominators[n]] -= 1;

    // the final conversion factor
    double factor = 1;

    // convert between compatible units
    for (size_t i = 0; i < iL; i++) {
      for (size_t n = 0; n < nL; n++) {
        std::string &lhs = numerators[i], &rhs = denominators[n];
        int &lhsexp = exponents[lhs], &rhsexp = exponents[rhs];
        double f(convert_units(lhs, rhs, lhsexp, rhsexp));
        if (f == 0) continue;
        factor /= f;
      }
    }

    // now we can build up the new unit arrays
    numerators.clear();
    denominators.clear();

    // recreate sorted units vectors
    for (auto exp : exponents) {
      int &exponent = exp.second;
      while (exponent > 0 && exponent --)
        numerators.push_back(exp.first);
      while (exponent < 0 && exponent ++)
        denominators.push_back(exp.first);
    }

    // return for conversion
    return factor;

  }

  std::string Units::unit() const
  {
    std::string u;
    size_t iL = numerators.size();
    size_t nL = denominators.size();
    for (size_t i = 0; i < iL; i += 1) {
      if (i) u += '*';
      u += numerators[i];
    }
    if (nL != 0) u += '/';
    for (size_t n = 0; n < nL; n += 1) {
      if (n) u += '*';
      u += denominators[n];
    }
    return u;
  }

  bool Units::is_unitless() const
  {
    return numerators.empty() &&
           denominators.empty();
  }

  bool Units::is_valid_css_unit() const
  {
    return numerators.size() <= 1 &&
           denominators.size() == 0;
  }

  // this does not cover all cases (multiple prefered units)
  double Units::convert_factor(const Units& r) const
  {

    std::vector<std::string> miss_nums(0);
    std::vector<std::string> miss_dens(0);
    // create copy since we need these for state keeping
    std::vector<std::string> r_nums(r.numerators);
    std::vector<std::string> r_dens(r.denominators);

    auto l_num_it = numerators.begin();
    auto l_num_end = numerators.end();

    bool l_unitless = is_unitless();
    auto r_unitless = r.is_unitless();

    // overall conversion
    double factor = 1;

    // process all left numerators
    while (l_num_it != l_num_end)
    {
      // get and increment afterwards
      const std::string l_num = *(l_num_it ++);

      auto r_num_it = r_nums.begin(), r_num_end = r_nums.end();

      bool found = false;
      // search for compatible numerator
      while (r_num_it != r_num_end)
      {
        // get and increment afterwards
        const std::string r_num = *(r_num_it);
        // get possible conversion factor for units
        double conversion = conversion_factor(l_num, r_num);
        // skip incompatible numerator
        if (conversion == 0) {
          ++ r_num_it;
          continue;
        }
        // apply to global factor
        factor *= conversion;
        // remove item from vector
        r_nums.erase(r_num_it);
        // found numerator
        found = true;
        break;
      }
      // maybe we did not find any
      // left numerator is leftover
      if (!found) miss_nums.push_back(l_num);
    }

    auto l_den_it = denominators.begin();
    auto l_den_end = denominators.end();

    // process all left denominators
    while (l_den_it != l_den_end)
    {
      // get and increment afterwards
      const std::string l_den = *(l_den_it ++);

      auto r_den_it = r_dens.begin();
      auto r_den_end = r_dens.end();

      bool found = false;
      // search for compatible denominator
      while (r_den_it != r_den_end)
      {
        // get and increment afterwards
        const std::string r_den = *(r_den_it);
        // get possible converstion factor for units
        double conversion = conversion_factor(l_den, r_den);
        // skip incompatible denominator
        if (conversion == 0) {
          ++ r_den_it;
          continue;
        }
        // apply to global factor
        factor /= conversion;
        // remove item from vector
        r_dens.erase(r_den_it);
        // found denominator
        found = true;
        break;
      }
      // maybe we did not find any
      // left denominator is leftover
      if (!found) miss_dens.push_back(l_den);
    }

    // check left-overs (ToDo: might cancel out?)
    if (miss_nums.size() > 0 && !r_unitless) {
      throw Exception::IncompatibleUnits(r, *this);
    }
    else if (miss_dens.size() > 0 && !r_unitless) {
      throw Exception::IncompatibleUnits(r, *this);
    }
    else if (r_nums.size() > 0 && !l_unitless) {
      throw Exception::IncompatibleUnits(r, *this);
    }
    else if (r_dens.size() > 0 && !l_unitless) {
      throw Exception::IncompatibleUnits(r, *this);
    }

    return factor;
  }

}
