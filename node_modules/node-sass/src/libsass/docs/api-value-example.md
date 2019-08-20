## Example operation.c

```C
#include <stdio.h>
#include <string.h>
#include "sass/values.h"

int main( int argc, const char* argv[] )
{

  // create two new sass values to be added
  union Sass_Value* string = sass_make_string("String");
  union Sass_Value* number = sass_make_number(42, "nits");

  // invoke the add operation which returns a new sass value
  union Sass_Value* total = sass_value_op(ADD, string, number);

  // no further use for the two operands
  sass_delete_value(string);
  sass_delete_value(number);

  // this works since libsass will always return a
  // string for add operations with a string as the
  // left hand side. But you should never rely on it!
  puts(sass_string_get_value(total));

  // invoke stringification (uncompressed with precision of 5)
  union Sass_Value* result = sass_value_stringify(total, false, 5);

  // no further use for the sum
  sass_delete_value(total);

  // print the result - you may want to make
  // sure result is indeed a string, altough
  // stringify guarantees to return a string
  // if (sass_value_is_string(result)) {}
  // really depends on your level of paranoia
  puts(sass_string_get_value(result));

  // finally free result
  sass_delete_value(result);

  // exit status
  return 0;

}
```

## Compile operation.c

```bash
gcc -c operation.c -o operation.o
gcc -o operation operation.o -lsass
./operation # => String42nits
```
