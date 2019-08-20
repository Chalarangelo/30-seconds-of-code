
# flat-cache - Changelog
## v2.0.1
- **Refactoring**
  - upgrade node modules to latest versions - [6402ed3]( https://github.com/royriojas/flat-cache/commit/6402ed3 ), [Roy Riojas](https://github.com/Roy Riojas), 08/01/2019 21:47:05

    
## v2.0.0
- **Bug Fixes**
  - upgrade package.json lock file - [8d21c7b]( https://github.com/royriojas/flat-cache/commit/8d21c7b ), [Roy Riojas](https://github.com/Roy Riojas), 08/01/2019 20:03:13

    
  - Use the same versions of node_js that eslint use - [8d23379]( https://github.com/royriojas/flat-cache/commit/8d23379 ), [Roy Riojas](https://github.com/Roy Riojas), 08/01/2019 19:25:11

    
- **Other changes**
  - Replace circular-json with flatted ([#36](https://github.com/royriojas/flat-cache/issues/36)) - [b93aced]( https://github.com/royriojas/flat-cache/commit/b93aced ), [C. K. Tang](https://github.com/C. K. Tang), 08/01/2019 20:03:01

    
  - Change JSON parser from circular-json to flatted & 1 more changes ([#37](https://github.com/royriojas/flat-cache/issues/37)) - [745e65a]( https://github.com/royriojas/flat-cache/commit/745e65a ), [Andy Chen](https://github.com/Andy Chen), 08/01/2019 19:17:20

    * Change JSON parser from circular-json to flatted & 1 more changes
    
    * Change JSON parser from circular-json
    * Audited 2 vulnerabilities
    
    * Update package.json
    
    * Update Engine require
    
    * There's a bunch of dependencies in this pkg requires node >=4, so I changed it to 4
    
    * Remove and add node versions
    
    * I have seen this pkg is not available with node 0.12 so I removed it
    * I have added a popular used LTS version of node - 10
    
## v1.3.4
- **Refactoring**
  - Add del.js and utils.js to the list of files to be beautified - [9d0ca9b]( https://github.com/royriojas/flat-cache/commit/9d0ca9b ), [Roy Riojas](https://github.com/Roy Riojas), 14/11/2018 15:19:02

    
## v1.3.3
- **Refactoring**
  - Make sure package-lock.json is up to date - [a7d2598]( https://github.com/royriojas/flat-cache/commit/a7d2598 ), [Roy Riojas](https://github.com/Roy Riojas), 14/11/2018 14:36:08

    
- **Other changes**
  - Removed the need for del ([#33](https://github.com/royriojas/flat-cache/issues/33)) - [c429012]( https://github.com/royriojas/flat-cache/commit/c429012 ), [S. Gilroy](https://github.com/S. Gilroy), 13/11/2018 16:56:37

    * Removed the need for del
    
    Removed the need for del as newer versions have broken backwards
    compatibility. del mainly uses rimraf for deleting folders
    and files, replaceing it with rimraf only is a minimal change.
    
    * Disable glob on rimraf calls
    
    * Added glob disable to wrong call
    
    * Wrapped rimraf to simplify solution
    
## v1.3.2
- **Refactoring**
  - remove yarn.lock file - [704c6c4]( https://github.com/royriojas/flat-cache/commit/704c6c4 ), [Roy Riojas](https://github.com/Roy Riojas), 07/11/2018 18:41:08

    
- **undefined**
  - replace circular-json with flatted ([#23](https://github.com/royriojas/flat-cache/issues/23))" - [db12d74]( https://github.com/royriojas/flat-cache/commit/db12d74 ), [Roy Riojas](https://github.com/Roy Riojas), 07/11/2018 18:40:39

    This reverts commit 00f689277a75e85fef28e6a048fad227afc525e6.
    
## v1.3.1
- **Refactoring**
  - upgrade deps to remove some security warnings - [f405719]( https://github.com/royriojas/flat-cache/commit/f405719 ), [Roy Riojas](https://github.com/Roy Riojas), 06/11/2018 15:07:31

    
- **Bug Fixes**
  - replace circular-json with flatted ([#23](https://github.com/royriojas/flat-cache/issues/23)) - [00f6892]( https://github.com/royriojas/flat-cache/commit/00f6892 ), [Terry](https://github.com/Terry), 05/11/2018 21:44:16

    
- **undefined**
  - update del to v3.0.0 ([#26](https://github.com/royriojas/flat-cache/issues/26)) - [d42883f]( https://github.com/royriojas/flat-cache/commit/d42883f ), [Patrick Silva](https://github.com/Patrick Silva), 03/11/2018 03:00:44

    Closes <a target="_blank" class="info-link" href="https://github.com/royriojas/flat-cache/issues/25"><span>#25</span></a>
## v1.3.0
- **Other changes**
  - Added #all method ([#16](https://github.com/royriojas/flat-cache/issues/16)) - [12293be]( https://github.com/royriojas/flat-cache/commit/12293be ), [Ozair Patel](https://github.com/Ozair Patel), 25/09/2017 16:46:38

    * Added #all method
    
    * Added #all method test
    
    * Updated readme
    
    * Added yarn.lock
    
    * Added more keys for #all test
    
    * Beautified file
    
  - fix changelog title style ([#14](https://github.com/royriojas/flat-cache/issues/14)) - [af8338a]( https://github.com/royriojas/flat-cache/commit/af8338a ), [前端小武](https://github.com/前端小武), 19/12/2016 23:34:48

    
## v1.2.2
- **Bug Fixes**
  - Do not crash if cache file is invalid JSON. ([#13](https://github.com/royriojas/flat-cache/issues/13)) - [87beaa6]( https://github.com/royriojas/flat-cache/commit/87beaa6 ), [Roy Riojas](https://github.com/Roy Riojas), 19/12/2016 21:03:35

    Fixes <a target="_blank" class="info-link" href="https://github.com/royriojas/flat-cache/issues/12"><span>#12</span></a>
    
    Not sure under which situations a cache file might exist that does
    not contain a valid JSON structure, but just in case to cover
    the possibility of this happening a try catch block has been added
    
    If the cache is somehow not valid the cache will be discarded an a
    a new cache will be stored instead
- **Other changes**
  - Added travis ci support for modern node versions ([#11](https://github.com/royriojas/flat-cache/issues/11)) - [1c2b1f7]( https://github.com/royriojas/flat-cache/commit/1c2b1f7 ), [Amila Welihinda](https://github.com/Amila Welihinda), 11/11/2016 02:47:52

    
  - Bumping `circular-son` version ([#10](https://github.com/royriojas/flat-cache/issues/10)) - [4d5e861]( https://github.com/royriojas/flat-cache/commit/4d5e861 ), [Andrea Giammarchi](https://github.com/Andrea Giammarchi), 02/08/2016 09:13:52

    As mentioned in https://github.com/WebReflection/circular-json/issues/25 `circular-json` wan't rightly implementing the license field.
    
    Latest version bump changed only that bit so that ESLint should now be happy.
## v1.2.1
- **Bug Fixes**
  - Add missing utils.js file to the package. closes [#8](https://github.com/royriojas/flat-cache/issues/8) - [ec10cf2]( https://github.com/royriojas/flat-cache/commit/ec10cf2 ), [Roy Riojas](https://github.com/Roy Riojas), 01/08/2016 04:18:57

    
## v1.2.0
- **Documentation**
  - Add documentation about noPrune option - [23e11f9]( https://github.com/royriojas/flat-cache/commit/23e11f9 ), [Roy Riojas](https://github.com/Roy Riojas), 01/08/2016 04:06:49

    
## v1.1.0
- **Features**
  - Add noPrune option to cache.save() method. closes [#7](https://github.com/royriojas/flat-cache/issues/7) - [2c8016a]( https://github.com/royriojas/flat-cache/commit/2c8016a ), [Roy Riojas](https://github.com/Roy Riojas), 01/08/2016 04:00:29

    
  - Add json read and write utility based on circular-json - [c31081e]( https://github.com/royriojas/flat-cache/commit/c31081e ), [Jean Ponchon](https://github.com/Jean Ponchon), 28/07/2016 10:58:17

    
- **Bug Fixes**
  - Remove UTF16 BOM stripping - [4a41e22]( https://github.com/royriojas/flat-cache/commit/4a41e22 ), [Jean Ponchon](https://github.com/Jean Ponchon), 29/07/2016 04:18:06

    Since we control both writing and reading of JSON stream, there no needs 
    to handle unicode BOM.
  - Use circular-json to handle circular references (fix [#5](https://github.com/royriojas/flat-cache/issues/5)) - [cd7aeed]( https://github.com/royriojas/flat-cache/commit/cd7aeed ), [Jean Ponchon](https://github.com/Jean Ponchon), 25/07/2016 13:11:59

    
- **Tests Related fixes**
  - Add missing file from eslint test - [d6fa3c3]( https://github.com/royriojas/flat-cache/commit/d6fa3c3 ), [Jean Ponchon](https://github.com/Jean Ponchon), 29/07/2016 04:15:51

    
  - Add test for circular json serialization / deserialization - [07d2ddd]( https://github.com/royriojas/flat-cache/commit/07d2ddd ), [Jean Ponchon](https://github.com/Jean Ponchon), 28/07/2016 10:59:36

    
- **Refactoring**
  - Remove unused read-json-sync - [2be1c24]( https://github.com/royriojas/flat-cache/commit/2be1c24 ), [Jean Ponchon](https://github.com/Jean Ponchon), 28/07/2016 10:59:18

    
- **Build Scripts Changes**
  - travis tests on 0.12 and 4x - [3a613fd]( https://github.com/royriojas/flat-cache/commit/3a613fd ), [royriojas](https://github.com/royriojas), 15/11/2015 17:34:40

    
  - add eslint-fix task - [fd29e52]( https://github.com/royriojas/flat-cache/commit/fd29e52 ), [royriojas](https://github.com/royriojas), 01/11/2015 18:04:08

    
  - make sure the test script also verify beautification and linting of files before running tests - [e94e176]( https://github.com/royriojas/flat-cache/commit/e94e176 ), [royriojas](https://github.com/royriojas), 01/11/2015 14:54:48

    
- **Other changes**
  - add clearAll for cacheDir - [97383d9]( https://github.com/royriojas/flat-cache/commit/97383d9 ), [xieyaowu](https://github.com/xieyaowu), 31/10/2015 23:02:18

    
## v1.0.9
- **Bug Fixes**
  - wrong default values for changelogx user repo name - [7bb52d1]( https://github.com/royriojas/flat-cache/commit/7bb52d1 ), [royriojas](https://github.com/royriojas), 11/09/2015 17:59:30

    
## v1.0.8
- **Build Scripts Changes**
  - test against node 4 - [c395b66]( https://github.com/royriojas/flat-cache/commit/c395b66 ), [royriojas](https://github.com/royriojas), 11/09/2015 17:51:39

    
## v1.0.7
- **Other changes**
  - Move dependencies into devDep - [7e47099]( https://github.com/royriojas/flat-cache/commit/7e47099 ), [Bogdan Chadkin](https://github.com/Bogdan Chadkin), 11/09/2015 17:10:57

    
- **Documentation**
  - Add missing changelog link - [f51197a]( https://github.com/royriojas/flat-cache/commit/f51197a ), [royriojas](https://github.com/royriojas), 11/09/2015 16:48:05

    
## v1.0.6
- **Build Scripts Changes**
  - Add helpers/code check scripts - [bdb82f3]( https://github.com/royriojas/flat-cache/commit/bdb82f3 ), [royriojas](https://github.com/royriojas), 11/09/2015 16:44:31

    
## v1.0.5
- **Documentation**
  - better description for the module - [436817f]( https://github.com/royriojas/flat-cache/commit/436817f ), [royriojas](https://github.com/royriojas), 11/09/2015 16:35:33

    
- **Other changes**
  - Update dependencies - [be88aa3]( https://github.com/royriojas/flat-cache/commit/be88aa3 ), [Bogdan Chadkin](https://github.com/Bogdan Chadkin), 11/09/2015 15:47:41

    
## v1.0.11
- **Features**
  - Add noPrune option to cache.save() method. closes [#7](https://github.com/royriojas/flat-cache/issues/7) - [2c8016a]( https://github.com/royriojas/flat-cache/commit/2c8016a ), [Roy Riojas](https://github.com/Roy Riojas), 01/08/2016 04:00:29

    
  - Add json read and write utility based on circular-json - [c31081e]( https://github.com/royriojas/flat-cache/commit/c31081e ), [Jean Ponchon](https://github.com/Jean Ponchon), 28/07/2016 10:58:17

    
- **Bug Fixes**
  - Remove UTF16 BOM stripping - [4a41e22]( https://github.com/royriojas/flat-cache/commit/4a41e22 ), [Jean Ponchon](https://github.com/Jean Ponchon), 29/07/2016 04:18:06

    Since we control both writing and reading of JSON stream, there no needs 
    to handle unicode BOM.
  - Use circular-json to handle circular references (fix [#5](https://github.com/royriojas/flat-cache/issues/5)) - [cd7aeed]( https://github.com/royriojas/flat-cache/commit/cd7aeed ), [Jean Ponchon](https://github.com/Jean Ponchon), 25/07/2016 13:11:59

    
- **Tests Related fixes**
  - Add missing file from eslint test - [d6fa3c3]( https://github.com/royriojas/flat-cache/commit/d6fa3c3 ), [Jean Ponchon](https://github.com/Jean Ponchon), 29/07/2016 04:15:51

    
  - Add test for circular json serialization / deserialization - [07d2ddd]( https://github.com/royriojas/flat-cache/commit/07d2ddd ), [Jean Ponchon](https://github.com/Jean Ponchon), 28/07/2016 10:59:36

    
- **Refactoring**
  - Remove unused read-json-sync - [2be1c24]( https://github.com/royriojas/flat-cache/commit/2be1c24 ), [Jean Ponchon](https://github.com/Jean Ponchon), 28/07/2016 10:59:18

    
- **Build Scripts Changes**
  - travis tests on 0.12 and 4x - [3a613fd]( https://github.com/royriojas/flat-cache/commit/3a613fd ), [royriojas](https://github.com/royriojas), 15/11/2015 17:34:40

    
## v1.0.10
- **Build Scripts Changes**
  - add eslint-fix task - [fd29e52]( https://github.com/royriojas/flat-cache/commit/fd29e52 ), [royriojas](https://github.com/royriojas), 01/11/2015 18:04:08

    
  - make sure the test script also verify beautification and linting of files before running tests - [e94e176]( https://github.com/royriojas/flat-cache/commit/e94e176 ), [royriojas](https://github.com/royriojas), 01/11/2015 14:54:48

    
  - test against node 4 - [c395b66]( https://github.com/royriojas/flat-cache/commit/c395b66 ), [royriojas](https://github.com/royriojas), 11/09/2015 17:51:39

    
  - Add helpers/code check scripts - [bdb82f3]( https://github.com/royriojas/flat-cache/commit/bdb82f3 ), [royriojas](https://github.com/royriojas), 11/09/2015 16:44:31

    
- **Other changes**
  - add clearAll for cacheDir - [97383d9]( https://github.com/royriojas/flat-cache/commit/97383d9 ), [xieyaowu](https://github.com/xieyaowu), 31/10/2015 23:02:18

    
  - Move dependencies into devDep - [7e47099]( https://github.com/royriojas/flat-cache/commit/7e47099 ), [Bogdan Chadkin](https://github.com/Bogdan Chadkin), 11/09/2015 17:10:57

    
  - Update dependencies - [be88aa3]( https://github.com/royriojas/flat-cache/commit/be88aa3 ), [Bogdan Chadkin](https://github.com/Bogdan Chadkin), 11/09/2015 15:47:41

    
- **Bug Fixes**
  - wrong default values for changelogx user repo name - [7bb52d1]( https://github.com/royriojas/flat-cache/commit/7bb52d1 ), [royriojas](https://github.com/royriojas), 11/09/2015 17:59:30

    
- **Documentation**
  - Add missing changelog link - [f51197a]( https://github.com/royriojas/flat-cache/commit/f51197a ), [royriojas](https://github.com/royriojas), 11/09/2015 16:48:05

    
  - better description for the module - [436817f]( https://github.com/royriojas/flat-cache/commit/436817f ), [royriojas](https://github.com/royriojas), 11/09/2015 16:35:33

    
  - Add documentation about `clearAll` and `clearCacheById` - [13947c1]( https://github.com/royriojas/flat-cache/commit/13947c1 ), [Roy Riojas](https://github.com/Roy Riojas), 02/03/2015 02:44:05

    
- **Refactoring**
  - load a cache file using the full filepath - [b8f68c2]( https://github.com/royriojas/flat-cache/commit/b8f68c2 ), [Roy Riojas](https://github.com/Roy Riojas), 30/08/2015 06:19:14

    
- **Features**
  - Add methods to remove the cache documents created - [af40443]( https://github.com/royriojas/flat-cache/commit/af40443 ), [Roy Riojas](https://github.com/Roy Riojas), 02/03/2015 02:39:27

    
## v1.0.1
- **Other changes**
  - Update README.md - [c2b6805]( https://github.com/royriojas/flat-cache/commit/c2b6805 ), [Roy Riojas](https://github.com/Roy Riojas), 26/02/2015 07:28:07

    
## v1.0.0
- **Refactoring**
  - flat-cache v.1.0.0 - [c984274]( https://github.com/royriojas/flat-cache/commit/c984274 ), [Roy Riojas](https://github.com/Roy Riojas), 26/02/2015 07:11:50

    
- **Other changes**
  - Initial commit - [d43cccf]( https://github.com/royriojas/flat-cache/commit/d43cccf ), [Roy Riojas](https://github.com/Roy Riojas), 26/02/2015 04:12:16

    
