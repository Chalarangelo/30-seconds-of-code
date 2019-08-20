require('smoosh').config({
    "JAVASCRIPT": {
      "DIST_DIR": "./"
    , "ready": ['./src/ready.js']
  }
  , "JSHINT_OPTS": {
      "boss": true
    , "forin": false
    , "curly": false
    , "debug": false
    , "devel": false
    , "evil": false
    , "regexp": false
    , "undef": false
    , "sub": true
    , "white": false
    , "indent": 2
    , "asi": true
    , "laxbreak": true
    , "eqeqeq": false
    , "eqnull": true
    , "laxcomma": true
  }
}).run().build().analyze()
