{
  'targets': [
    {
      'target_name': 'libsass',
      'win_delay_load_hook': 'false',
      'type': 'static_library',
      'defines': [
         'LIBSASS_VERSION="<!(node -e "process.stdout.write(require(\'../package.json\').libsass)")"'
      ],
      'defines!': [
         'DEBUG'
      ],
      'sources': [
        'libsass/src/ast.cpp',
        'libsass/src/ast_fwd_decl.cpp',
        'libsass/src/backtrace.cpp',
        'libsass/src/base64vlq.cpp',
        'libsass/src/bind.cpp',
        'libsass/src/cencode.c',
        'libsass/src/check_nesting.cpp',
        'libsass/src/color_maps.cpp',
        'libsass/src/constants.cpp',
        'libsass/src/context.cpp',
        'libsass/src/cssize.cpp',
        'libsass/src/emitter.cpp',
        'libsass/src/environment.cpp',
        'libsass/src/error_handling.cpp',
        'libsass/src/eval.cpp',
        'libsass/src/expand.cpp',
        'libsass/src/extend.cpp',
        'libsass/src/file.cpp',
        'libsass/src/functions.cpp',
        'libsass/src/inspect.cpp',
        'libsass/src/json.cpp',
        'libsass/src/lexer.cpp',
        'libsass/src/listize.cpp',
        'libsass/src/memory/SharedPtr.cpp',
        'libsass/src/node.cpp',
        'libsass/src/operators.cpp',
        'libsass/src/operators.hpp',
        'libsass/src/output.cpp',
        'libsass/src/parser.cpp',
        'libsass/src/plugins.cpp',
        'libsass/src/position.cpp',
        'libsass/src/prelexer.cpp',
        'libsass/src/remove_placeholders.cpp',
        'libsass/src/sass.cpp',
        'libsass/src/sass2scss.cpp',
        'libsass/src/sass_context.cpp',
        'libsass/src/sass_functions.cpp',
        'libsass/src/sass_util.cpp',
        'libsass/src/sass_values.cpp',
        'libsass/src/source_map.cpp',
        'libsass/src/subset_map.cpp',
        'libsass/src/to_c.cpp',
        'libsass/src/to_value.cpp',
        'libsass/src/units.cpp',
        'libsass/src/utf8_string.cpp',
        'libsass/src/util.cpp',
        'libsass/src/values.cpp'
      ],
      'cflags!': [
        '-fno-rtti',
        '-fno-exceptions'
      ],
      'cflags_cc!': [
        '-fno-rtti',
        '-fno-exceptions'
      ],
      'cflags_cc': [
        '-fexceptions',
        '-frtti',
      ],
      'include_dirs': [ 'libsass/include' ],
      'direct_dependent_settings': {
        'include_dirs': [ 'libsass/include' ],
      },
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'CLANG_CXX_LANGUAGE_STANDARD': 'c++11',
            'CLANG_CXX_LIBRARY': 'libc++',
            'OTHER_LDFLAGS': [],
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'GCC_ENABLE_CPP_RTTI': 'YES',
            'MACOSX_DEPLOYMENT_TARGET': '10.7'
          }
        }],
        ['OS=="win"', {
          'msvs_settings': {
            'VCCLCompilerTool': {
              'AdditionalOptions': [
                '/GR',
                '/EHsc'
              ]
            }
          },
          'conditions': [
             ['MSVS_VERSION < "2015"', {
               'sources': [
                 'libsass/src/c99func.c'
               ]
             }]
          ]
        }],
        ['OS!="win"', {
          'cflags_cc+': [
            '-std=c++0x'
          ]
        }]
      ]
    }
  ]
}
