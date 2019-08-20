OS       ?= $(shell uname -s)
CC       ?= gcc
CXX      ?= g++
RM       ?= rm -f
CP       ?= cp -a
MKDIR    ?= mkdir
RMDIR    ?= rmdir
WINDRES  ?= windres
# Solaris/Illumos flavors
# ginstall from coreutils
ifeq ($(OS),SunOS)
INSTALL  ?= ginstall
endif
INSTALL  ?= install
CFLAGS   ?= -Wall
CXXFLAGS ?= -Wall
LDFLAGS  ?= -Wall
ifeq "x$(COVERAGE)" "x"
  CFLAGS   += -O2
  CXXFLAGS += -O2
  LDFLAGS  += -O2
else
  CFLAGS   += -O1 -fno-omit-frame-pointer
  CXXFLAGS += -O1 -fno-omit-frame-pointer
  LDFLAGS  += -O1 -fno-omit-frame-pointer
endif
LDFLAGS  += -Wl,-undefined,error
CAT      ?= $(if $(filter $(OS),Windows_NT),type,cat)

ifneq (,$(findstring /cygdrive/,$(PATH)))
	UNAME := Cygwin
else
	ifneq (,$(findstring Windows_NT,$(OS)))
		UNAME := Windows
	else
		ifneq (,$(findstring mingw32,$(MAKE)))
			UNAME := Windows
		else
			ifneq (,$(findstring MINGW32,$(shell uname -s)))
				UNAME = Windows
			else
				UNAME := $(shell uname -s)
			endif
		endif
	endif
endif

ifeq ($(SASS_LIBSASS_PATH),)
	SASS_LIBSASS_PATH = $(abspath $(CURDIR))
endif

ifeq ($(LIBSASS_VERSION),)
	ifneq ($(wildcard ./.git/ ),)
		LIBSASS_VERSION ?= $(shell git describe --abbrev=4 --dirty --always --tags)
	endif
endif

ifeq ($(LIBSASS_VERSION),)
	ifneq ($(wildcard VERSION),)
		LIBSASS_VERSION ?= $(shell $(CAT) VERSION)
	endif
endif

ifneq ($(LIBSASS_VERSION),)
	CFLAGS   += -DLIBSASS_VERSION="\"$(LIBSASS_VERSION)\""
	CXXFLAGS += -DLIBSASS_VERSION="\"$(LIBSASS_VERSION)\""
endif

# enable mandatory flag
ifeq (Windows,$(UNAME))
	ifneq ($(BUILD),shared)
		STATIC_ALL     ?= 1
	endif
	STATIC_LIBGCC    ?= 1
	STATIC_LIBSTDCPP ?= 1
	CXXFLAGS += -std=gnu++0x
	LDFLAGS  += -std=gnu++0x
else
	STATIC_ALL       ?= 0
	STATIC_LIBGCC    ?= 0
	STATIC_LIBSTDCPP ?= 0
	CXXFLAGS += -std=c++0x
	LDFLAGS  += -std=c++0x
endif

ifneq ($(SASS_LIBSASS_PATH),)
	CFLAGS   += -I $(SASS_LIBSASS_PATH)/include
	CXXFLAGS += -I $(SASS_LIBSASS_PATH)/include
else
	# this is needed for mingw
	CFLAGS   += -I include
	CXXFLAGS += -I include
endif

ifneq ($(EXTRA_CFLAGS),)
	CFLAGS   += $(EXTRA_CFLAGS)
endif
ifneq ($(EXTRA_CXXFLAGS),)
	CXXFLAGS += $(EXTRA_CXXFLAGS)
endif
ifneq ($(EXTRA_LDFLAGS),)
	LDFLAGS  += $(EXTRA_LDFLAGS)
endif

LDLIBS = -lm

ifneq ($(BUILD),shared)
	LDLIBS += -lstdc++
endif

# link statically into lib
# makes it a lot more portable
# increases size by about 50KB
ifeq ($(STATIC_ALL),1)
	LDFLAGS += -static
endif
ifeq ($(STATIC_LIBGCC),1)
	LDFLAGS += -static-libgcc
endif
ifeq ($(STATIC_LIBSTDCPP),1)
	LDFLAGS += -static-libstdc++
endif

ifeq ($(UNAME),Darwin)
	CFLAGS += -stdlib=libc++
	CXXFLAGS += -stdlib=libc++
	LDFLAGS += -stdlib=libc++
endif

ifneq (Windows,$(UNAME))
	ifneq (FreeBSD,$(UNAME))
		ifneq (OpenBSD,$(UNAME))
			LDFLAGS += -ldl
			LDLIBS += -ldl
		endif
	endif
endif

ifneq ($(BUILD),shared)
	BUILD := static
endif
ifeq ($(DEBUG),1)
	BUILD := debug-$(BUILD)
endif

ifeq (,$(TRAVIS_BUILD_DIR))
	ifeq ($(OS),SunOS)
		PREFIX ?= /opt/local
	else
		PREFIX ?= /usr/local
	endif
else
	PREFIX ?= $(TRAVIS_BUILD_DIR)
endif


SASS_SASSC_PATH ?= sassc
SASS_SPEC_PATH ?= sass-spec
SASS_SPEC_SPEC_DIR ?= spec
SASSC_BIN = $(SASS_SASSC_PATH)/bin/sassc
RUBY_BIN = ruby

LIB_STATIC = $(SASS_LIBSASS_PATH)/lib/libsass.a
LIB_SHARED = $(SASS_LIBSASS_PATH)/lib/libsass.so

ifeq (Windows,$(UNAME))
	ifeq (shared,$(BUILD))
		CFLAGS     += -D ADD_EXPORTS
		CXXFLAGS   += -D ADD_EXPORTS
		LIB_SHARED  = $(SASS_LIBSASS_PATH)/lib/libsass.dll
	endif
else
	ifneq (Cygwin,$(UNAME))
		CFLAGS   += -fPIC
		CXXFLAGS += -fPIC
		LDFLAGS  += -fPIC
	endif
endif

ifeq (Windows,$(UNAME))
	SASSC_BIN = $(SASS_SASSC_PATH)/bin/sassc.exe
endif

include Makefile.conf

RESOURCES =
STATICLIB = lib/libsass.a
SHAREDLIB = lib/libsass.so
ifeq (Windows,$(UNAME))
	RESOURCES += res/resource.rc
	SHAREDLIB  = lib/libsass.dll
	ifeq (shared,$(BUILD))
		CFLAGS    += -D ADD_EXPORTS
		CXXFLAGS  += -D ADD_EXPORTS
	endif
else
	ifneq (Cygwin,$(UNAME))
		CFLAGS   += -fPIC
		CXXFLAGS += -fPIC
		LDFLAGS  += -fPIC
	endif
endif

OBJECTS = $(addprefix src/,$(SOURCES:.cpp=.o))
COBJECTS = $(addprefix src/,$(CSOURCES:.c=.o))
RCOBJECTS = $(RESOURCES:.rc=.o)

DEBUG_LVL ?= NONE

CLEANUPS ?=
CLEANUPS += $(RCOBJECTS)
CLEANUPS += $(COBJECTS)
CLEANUPS += $(OBJECTS)
CLEANUPS += $(LIBSASS_LIB)

all: $(BUILD)

debug: $(BUILD)

debug-static: LDFLAGS := -g $(filter-out -O2,$(LDFLAGS))
debug-static: CFLAGS := -g -DDEBUG -DDEBUG_LVL="$(DEBUG_LVL)" $(filter-out -O2,$(CFLAGS))
debug-static: CXXFLAGS := -g -DDEBUG -DDEBUG_LVL="$(DEBUG_LVL)" $(filter-out -O2,$(CXXFLAGS))
debug-static: static

debug-shared: LDFLAGS := -g $(filter-out -O2,$(LDFLAGS))
debug-shared: CFLAGS := -g -DDEBUG -DDEBUG_LVL="$(DEBUG_LVL)" $(filter-out -O2,$(CFLAGS))
debug-shared: CXXFLAGS := -g -DDEBUG -DDEBUG_LVL="$(DEBUG_LVL)" $(filter-out -O2,$(CXXFLAGS))
debug-shared: shared

lib:
	$(MKDIR) lib

lib/libsass.a: lib $(COBJECTS) $(OBJECTS)
	$(AR) rcvs $@ $(COBJECTS) $(OBJECTS)

lib/libsass.so: lib $(COBJECTS) $(OBJECTS)
	$(CXX) -shared $(LDFLAGS) -o $@ $(COBJECTS) $(OBJECTS) $(LDLIBS)

lib/libsass.dll: lib $(COBJECTS) $(OBJECTS) $(RCOBJECTS)
	$(CXX) -shared $(LDFLAGS) -o $@ $(COBJECTS) $(OBJECTS) $(RCOBJECTS) $(LDLIBS) -s -Wl,--subsystem,windows,--out-implib,lib/libsass.a

%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $<

%.o: %.rc
	$(WINDRES) -i $< -o $@

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c -o $@ $<

%: %.o static
	$(CXX) $(CXXFLAGS) -o $@ $+ $(LDFLAGS) $(LDLIBS)

install: install-$(BUILD)

static: $(STATICLIB)
shared: $(SHAREDLIB)

$(DESTDIR)$(PREFIX):
	$(MKDIR) $(DESTDIR)$(PREFIX)

$(DESTDIR)$(PREFIX)/lib: $(DESTDIR)$(PREFIX)
	$(MKDIR) $(DESTDIR)$(PREFIX)/lib

$(DESTDIR)$(PREFIX)/include: $(DESTDIR)$(PREFIX)
	$(MKDIR) $(DESTDIR)$(PREFIX)/include

$(DESTDIR)$(PREFIX)/include/sass: $(DESTDIR)$(PREFIX)/include
	$(MKDIR) $(DESTDIR)$(PREFIX)/include/sass

$(DESTDIR)$(PREFIX)/include/%.h: include/%.h \
                                 $(DESTDIR)$(PREFIX)/include \
                                 $(DESTDIR)$(PREFIX)/include/sass
	$(INSTALL) -v -m0644 "$<" "$@"

install-headers: $(DESTDIR)$(PREFIX)/include/sass.h \
                 $(DESTDIR)$(PREFIX)/include/sass2scss.h \
                 $(DESTDIR)$(PREFIX)/include/sass/base.h \
                 $(DESTDIR)$(PREFIX)/include/sass/version.h \
                 $(DESTDIR)$(PREFIX)/include/sass/values.h \
                 $(DESTDIR)$(PREFIX)/include/sass/context.h \
                 $(DESTDIR)$(PREFIX)/include/sass/functions.h

$(DESTDIR)$(PREFIX)/lib/%.a: lib/%.a \
                             $(DESTDIR)$(PREFIX)/lib
	@$(INSTALL) -v -m0755 "$<" "$@"

$(DESTDIR)$(PREFIX)/lib/%.so: lib/%.so \
                             $(DESTDIR)$(PREFIX)/lib
	@$(INSTALL) -v -m0755 "$<" "$@"

$(DESTDIR)$(PREFIX)/lib/%.dll: lib/%.dll \
                               $(DESTDIR)$(PREFIX)/lib
	@$(INSTALL) -v -m0755 "$<" "$@"

install-static: $(DESTDIR)$(PREFIX)/lib/libsass.a

install-shared: $(DESTDIR)$(PREFIX)/lib/libsass.so \
                install-headers

$(SASSC_BIN): $(BUILD)
	$(MAKE) -C $(SASS_SASSC_PATH) build-$(BUILD)-dev

sassc: $(SASSC_BIN)
	$(SASSC_BIN) -v

version: $(SASSC_BIN)
	$(SASSC_BIN) -h
	$(SASSC_BIN) -v

test: $(SASSC_BIN)
	$(RUBY_BIN) $(SASS_SPEC_PATH)/sass-spec.rb -V 3.5 -c $(SASSC_BIN) --impl libsass $(LOG_FLAGS) $(SASS_SPEC_PATH)/$(SASS_SPEC_SPEC_DIR)

test_build: $(SASSC_BIN)
	$(RUBY_BIN) $(SASS_SPEC_PATH)/sass-spec.rb -V 3.5 -c $(SASSC_BIN) --impl libsass $(LOG_FLAGS) $(SASS_SPEC_PATH)/$(SASS_SPEC_SPEC_DIR)

test_full: $(SASSC_BIN)
	$(RUBY_BIN) $(SASS_SPEC_PATH)/sass-spec.rb -V 3.5 -c $(SASSC_BIN) --impl libsass --run-todo $(LOG_FLAGS) $(SASS_SPEC_PATH)/$(SASS_SPEC_SPEC_DIR)

test_probe: $(SASSC_BIN)
	$(RUBY_BIN) $(SASS_SPEC_PATH)/sass-spec.rb -V 3.5 -c $(SASSC_BIN) --impl libsass --probe-todo $(LOG_FLAGS) $(SASS_SPEC_PATH)/$(SASS_SPEC_SPEC_DIR)

clean-objects: lib
	-$(RM) lib/*.a lib/*.so lib/*.dll lib/*.la
	-$(RMDIR) lib
clean: clean-objects
	$(RM) $(CLEANUPS)

clean-all:
	$(MAKE) -C $(SASS_SASSC_PATH) clean

lib-file: lib-file-$(BUILD)
lib-opts: lib-opts-$(BUILD)

lib-file-static:
	@echo $(LIB_STATIC)
lib-file-shared:
	@echo $(LIB_SHARED)
lib-opts-static:
	@echo -L"$(SASS_LIBSASS_PATH)/lib"
lib-opts-shared:
	@echo -L"$(SASS_LIBSASS_PATH)/lib -lsass"

.PHONY: all static shared sassc \
        version install-headers \
        clean clean-all clean-objects \
        debug debug-static debug-shared \
        install install-static install-shared \
        lib-opts lib-opts-shared lib-opts-static \
        lib-file lib-file-shared lib-file-static
.DELETE_ON_ERROR:
