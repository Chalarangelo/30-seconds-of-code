## This is proposed interface in https://github.com/sass/libsass/pull/1288

Additional debugging macros with low overhead are available, `TRACE()` and `TRACEINST()`.

Both macros simulate a string stream, so they can be used like this:

    TRACE() << "Reached.";

produces:

    [LibSass] parse_value parser.cpp:1384 Reached.

`TRACE()`
   logs function name, source filename, source file name to the standard error and the attached
   stream to the standard error.

`TRACEINST(obj)`
   logs object instance address, function name, source filename, source file name to the standard error and the attached stream to the standard error, for example:

    TRACEINST(this) << "String_Constant created " << this;

produces:

    [LibSass] 0x8031ba980:String_Constant ./ast.hpp:1371 String_Constant created (0,"auto")

The macros generate output only of `LibSass_TRACE` is set in the environment.
