#ifndef SASS_KWD_ARG_MACROS_H
#define SASS_KWD_ARG_MACROS_H

// Example usage:
// KWD_ARG_SET(Args) {
//   KWD_ARG(Args, string, foo);
//   KWD_ARG(Args, int, bar);
//   ...
// };
//
// ... and later ...
//
// something(Args().foo("hey").bar(3));

#define KWD_ARG_SET(set_name) class set_name

#define KWD_ARG(set_name, type, name) \
private: \
  type name##_; \
public: \
  set_name& name(type name##__) { \
    name##_ = name##__; \
    return *this; \
  } \
  type name() { return name##_; } \
private:

#endif
