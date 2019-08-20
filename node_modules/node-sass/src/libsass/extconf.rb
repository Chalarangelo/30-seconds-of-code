require 'mkmf'
# .. more stuff
#$LIBPATH.push(Config::CONFIG['libdir'])
$CFLAGS << " #{ENV["CFLAGS"]}"
$LIBS << " #{ENV["LIBS"]}"
create_makefile("libsass")
