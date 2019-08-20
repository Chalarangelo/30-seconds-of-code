```C
// Struct to hold custom function callback
struct Sass_Function {
  const char*      signature;
  Sass_Function_Fn function;
  void*            cookie;
};
```
