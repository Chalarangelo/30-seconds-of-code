# DEPS file for gclient use in buildbot execution of gyp tests.
#
# (You don't need to use gclient for normal GYP development work.)

vars = {
  "chrome_trunk": "http://src.chromium.org/svn/trunk",
  "googlecode_url": "http://%s.googlecode.com/svn",
}

deps = {
}

deps_os = {
  "win": {
    "third_party/cygwin":
      Var("chrome_trunk") + "/deps/third_party/cygwin@66844",

    "third_party/python_26":
      Var("chrome_trunk") + "/tools/third_party/python_26@89111",

    "src/third_party/pefile":
      (Var("googlecode_url") % "pefile") + "/trunk@63",
  },
}
