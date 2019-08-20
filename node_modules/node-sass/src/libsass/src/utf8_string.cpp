#include "sass.hpp"
#include <string>
#include <vector>
#include <cstdlib>
#include <cmath>

#include "utf8.h"

namespace Sass {
  namespace UTF_8 {
    using std::string;

    // naming conventions:
    // offset: raw byte offset (0 based)
    // position: code point offset (0 based)
    // index: code point offset (1 based or negative)

    // function that will count the number of code points (utf-8 characters) from the given beginning to the given end
    size_t code_point_count(const string& str, size_t start, size_t end) {
      return utf8::distance(str.begin() + start, str.begin() + end);
    }

    size_t code_point_count(const string& str) {
      return utf8::distance(str.begin(), str.end());
    }

    // function that will return the byte offset at a code point position
    size_t offset_at_position(const string& str, size_t position) {
      string::const_iterator it = str.begin();
      utf8::advance(it, position, str.end());
      return std::distance(str.begin(), it);
    }

    // function that returns number of bytes in a character at offset
    size_t code_point_size_at_offset(const string& str, size_t offset) {
      // get iterator from string and forward by offset
      string::const_iterator stop = str.begin() + offset;
      // check if beyond boundary
      if (stop == str.end()) return 0;
      // advance by one code point
      utf8::advance(stop, 1, str.end());
      // calculate offset for code point
      return  stop - str.begin() - offset;
    }

    // function that will return a normalized index, given a crazy one
    size_t normalize_index(int index, size_t len) {
      long signed_len = static_cast<long>(len);
      // assuming the index is 1-based
      // we are returning a 0-based index
      if (index > 0 && index <= signed_len) {
        // positive and within string length
        return index-1;
      }
      else if (index > signed_len) {
        // positive and past string length
        return len;
      }
      else if (index == 0) {
        return 0;
      }
      else if (std::abs((double)index) <= signed_len) {
        // negative and within string length
        return index + signed_len;
      }
      else {
        // negative and past string length
        return 0;
      }
    }

    #ifdef _WIN32

    // utf16 functions
    using std::wstring;

    // convert from utf16/wide string to utf8 string
    string convert_from_utf16(const wstring& utf16)
    {
      string utf8;
      // pre-allocate expected memory
      utf8.reserve(sizeof(utf16)/2);
      utf8::utf16to8(utf16.begin(), utf16.end(),
                     back_inserter(utf8));
      return utf8;
    }

    // convert from utf8 string to utf16/wide string
    wstring convert_to_utf16(const string& utf8)
    {
      wstring utf16;
      // pre-allocate expected memory
      utf16.reserve(code_point_count(utf8)*2);
      utf8::utf8to16(utf8.begin(), utf8.end(),
                     back_inserter(utf16));
      return utf16;
    }

    #endif

  }
}
