/* Class autosprintf - formatted output to an ostream.
   Copyright (C) 2002, 2012-2016 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Lesser General Public License as published by
   the Free Software Foundation; either version 2.1 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Lesser General Public License for more details.

   You should have received a copy of the GNU Lesser General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

#ifndef _AUTOSPRINTF_H
#define _AUTOSPRINTF_H

/* This feature is available in gcc versions 2.5 and later.  */
#if __GNUC__ < 2 || (__GNUC__ == 2 && __GNUC_MINOR__ < 5) || __STRICT_ANSI__
# define _AUTOSPRINTF_ATTRIBUTE_FORMAT() /* empty */
#else
/* The __-protected variants of 'format' and 'printf' attributes
   are accepted by gcc versions 2.6.4 (effectively 2.7) and later.  */
# if __GNUC__ < 2 || (__GNUC__ == 2 && __GNUC_MINOR__ < 7)
#  define _AUTOSPRINTF_ATTRIBUTE_FORMAT() \
  __attribute__ ((__format__ (__printf__, 2, 3)))
# else
#  define _AUTOSPRINTF_ATTRIBUTE_FORMAT() \
  __attribute__ ((format (printf, 2, 3)))
# endif
#endif

#include <string>
#include <iostream>

namespace gnu
{
  /* A temporary object, usually allocated on the stack, representing
     the result of an asprintf() call.  */
  class autosprintf
  {
  public:
    /* Constructor: takes a format string and the printf arguments.  */
    autosprintf (const char *format, ...)
                _AUTOSPRINTF_ATTRIBUTE_FORMAT();
    /* Copy constructor.  */
    autosprintf (const autosprintf& src);
    autosprintf& operator = (autosprintf copy);
    /* Destructor: frees the temporarily allocated string.  */
    ~autosprintf ();
    /* Conversion to string.  */
    operator char * () const;
    operator std::string () const;
    /* Output to an ostream.  */
    friend inline std::ostream& operator<< (std::ostream& stream, const autosprintf& tmp)
    {
      stream << (tmp.str ? tmp.str : "(error in autosprintf)");
      return stream;
    }
  private:
    char *str;
  };
}

#endif /* _AUTOSPRINTF_H */
