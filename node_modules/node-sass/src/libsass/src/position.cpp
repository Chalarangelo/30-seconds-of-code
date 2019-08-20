#include "sass.hpp"
#include "position.hpp"

namespace Sass {


  Offset::Offset(const char chr)
  : line(chr == '\n' ? 1 : 0),
    column(chr == '\n' ? 0 : 1)
  {}

  Offset::Offset(const char* string)
  : line(0), column(0)
  {
    *this = inc(string, string + strlen(string));
  }

  Offset::Offset(const std::string& text)
  : line(0), column(0)
  {
    *this = inc(text.c_str(), text.c_str() + text.size());
  }

  Offset::Offset(const size_t line, const size_t column)
  : line(line), column(column) { }

  // init/create instance from const char substring
  Offset Offset::init(const char* beg, const char* end)
  {
    Offset offset(0, 0);
    if (end == 0) {
      end += strlen(beg);
    }
    offset.add(beg, end);
    return offset;
  }

  // increase offset by given string (mostly called by lexer)
  // increase line counter and count columns on the last line
  Offset Offset::add(const char* begin, const char* end)
  {
    if (end == 0) return *this;
    while (begin < end && *begin) {
      if (*begin == '\n') {
        ++ line;
        // start new line
        column = 0;
      } else {
        // do not count any utf8 continuation bytes
        // https://stackoverflow.com/a/9356203/1550314
        // https://en.wikipedia.org/wiki/UTF-8#Description
        unsigned char chr = *begin;
        // skip over 10xxxxxx
        // is 1st bit not set
        if ((chr & 128) == 0) {
          // regular ascii char
          column += 1;
        }
        // is 2nd bit not set
        else if ((chr & 64) == 0) {
          // first utf8 byte
          column += 1;
        }
      }
      ++ begin;
    }
    return *this;
  }

  // increase offset by given string (mostly called by lexer)
  // increase line counter and count columns on the last line
  Offset Offset::inc(const char* begin, const char* end) const
  {
    Offset offset(line, column);
    offset.add(begin, end);
    return offset;
  }

  bool Offset::operator== (const Offset &pos) const
  {
    return line == pos.line && column == pos.column;
  }

  bool Offset::operator!= (const Offset &pos) const
  {
    return line != pos.line || column != pos.column;
  }

  void Offset::operator+= (const Offset &off)
  {
    *this = Offset(line + off.line, off.line > 0 ? off.column : column + off.column);
  }

  Offset Offset::operator+ (const Offset &off) const
  {
    return Offset(line + off.line, off.line > 0 ? off.column : column + off.column);
  }

  Offset Offset::operator- (const Offset &off) const
  {
    return Offset(line - off.line, off.line == line ? column - off.column : column);
  }

  Position::Position(const size_t file)
  : Offset(0, 0), file(file) { }

  Position::Position(const size_t file, const Offset& offset)
  : Offset(offset), file(file) { }

  Position::Position(const size_t line, const size_t column)
  : Offset(line, column), file(-1) { }

  Position::Position(const size_t file, const size_t line, const size_t column)
  : Offset(line, column), file(file) { }


  ParserState::ParserState(const char* path, const char* src, const size_t file)
  : Position(file, 0, 0), path(path), src(src), offset(0, 0), token() { }

  ParserState::ParserState(const char* path, const char* src, const Position& position, Offset offset)
  : Position(position), path(path), src(src), offset(offset), token() { }

  ParserState::ParserState(const char* path, const char* src, const Token& token, const Position& position, Offset offset)
  : Position(position), path(path), src(src), offset(offset), token(token) { }

  Position Position::add(const char* begin, const char* end)
  {
    Offset::add(begin, end);
    return *this;
  }

  Position Position::inc(const char* begin, const char* end) const
  {
    Offset offset(line, column);
    offset = offset.inc(begin, end);
    return Position(file, offset);
  }

  bool Position::operator== (const Position &pos) const
  {
    return file == pos.file && line == pos.line && column == pos.column;
  }

  bool Position::operator!= (const Position &pos) const
  {
    return file == pos.file || line != pos.line || column != pos.column;
  }

  void Position::operator+= (const Offset &off)
  {
    *this = Position(file, line + off.line, off.line > 0 ? off.column : column + off.column);
  }

  const Position Position::operator+ (const Offset &off) const
  {
    return Position(file, line + off.line, off.line > 0 ? off.column : column + off.column);
  }

  const Offset Position::operator- (const Offset &off) const
  {
    return Offset(line - off.line, off.line == line ? column - off.column : column);
  }

  /* not used anymore - remove?
  std::ostream& operator<<(std::ostream& strm, const Offset& off)
  {
    if (off.line == string::npos) strm << "-1:"; else strm << off.line << ":";
    if (off.column == string::npos) strm << "-1"; else strm << off.column;
    return strm;
  } */

  /* not used anymore - remove?
  std::ostream& operator<<(std::ostream& strm, const Position& pos)
  {
    if (pos.file != string::npos) strm << pos.file << ":";
    if (pos.line == string::npos) strm << "-1:"; else strm << pos.line << ":";
    if (pos.column == string::npos) strm << "-1"; else strm << pos.column;
    return strm;
  } */

}
