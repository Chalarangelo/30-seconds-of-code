{
  'variables': {
      'libsass_ext%': '',
  },
  'targets': [
    {
      'target_name': 'binding',
      'win_delay_load_hook': 'true',
      'sources': [
        'src/binding.cpp',
        'src/create_string.cpp',
        'src/custom_function_bridge.cpp',
        'src/custom_importer_bridge.cpp',
        'src/sass_context_wrapper.cpp',
        'src/sass_types/boolean.cpp',
        'src/sass_types/color.cpp',
        'src/sass_types/error.cpp',
        'src/sass_types/factory.cpp',
        'src/sass_types/list.cpp',
        'src/sass_types/map.cpp',
        'src/sass_types/null.cpp',
        'src/sass_types/number.cpp',
        'src/sass_types/string.cpp'
      ],
      'msvs_settings': {
        'VCLinkerTool': {
           'SetChecksum': 'true'
        }
      },
      'xcode_settings': {
        'CLANG_CXX_LANGUAGE_STANDARD': 'c++11',
        'CLANG_CXX_LIBRARY': 'libc++',
        'OTHER_LDFLAGS': [],
        'GCC_ENABLE_CPP_EXCEPTIONS': 'NO',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      'include_dirs': [
        '<!(node -e "require(\'nan\')")',
      ],
      'conditions': [
        ['libsass_ext == "" or libsass_ext == "no"', {
          'dependencies': [
            'src/libsass.gyp:libsass',
          ]
        }],
        ['libsass_ext == "auto"', {
          'cflags_cc': [
            '<!(pkg-config --cflags libsass)',
          ],
          'link_settings': {
            'ldflags': [
              '<!(pkg-config --libs-only-other --libs-only-L libsass)',
            ],
            'libraries': [
              '<!(pkg-config --libs-only-l libsass)',
            ],
          }
        }],
        ['libsass_ext == "yes"', {
          'cflags_cc': [
            '<(libsass_cflags)',
          ],
          'link_settings': {
            'ldflags': [
              '<(libsass_ldflags)',
            ],
            'libraries': [
              '<(libsass_library)',
            ],
          }
        }],
        ['OS=="win" and MSVS_VERSION == "2015"', {
          'msvs_settings': {
            'VCCLCompilerTool': {
              'AdditionalOptions': [
                # disable Thread-Safe "Magic" for local static variables
                '/Zc:threadSafeInit-',
              ],
            },
          },
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
