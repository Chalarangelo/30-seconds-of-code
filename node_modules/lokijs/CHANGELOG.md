# Changelog

## 1.5.6
* added support for indexes on nested properties (#718)
* more robust environment detection (#717)
* precompile $regex filters recursively (#710)
* Corrected $aeq example in Query Examples (#706)
* change 'shallow-recurse-objects' clone to support deep array clone (#692)
* jsdoc fixes for compoundsort example (#691)

## 1.5.5
* fixed issue where batch removes did not update unique index (#677)

## 1.5.4
* fixes to checkIndex maintenance fn (#654, #661)
* bulk remove optimizations (#663)
* fix to meta when cloning (#666)
* AWS S3 sync adapter added (#670)
* fix for browser project: fs not found (#674)
* added comparators to default export (#672)

## 1.5.3
* simplesort can leverage binary index (via index intersect) when weakly filtered (#645)
* the simplesort 'descending' param is now multipurposed (with bw-compat) see jsdocs
* added new simplified js comparison ops for unindexed optimizations (commit bb011d)
* added collection.checkIndex() and collection.checkIndexes() for diagnostics (#654,#47)

## 1.5.2
* fixed error when transform steps have non-serializable parameters (#624)
* addCollection will return existing collection when collection named already exists (#635)
* batch updates when not cloning no longer risk invalidating adaptive binary indices (#639)
* fixed autosave race condition when using async adapter (#643)
* collection option added to disableMeta if not using changes api or ttl (#644)

## 1.5.1
* added disableDeltaChangesApi (default:true) collection option to store only differences. (#582)
* loki indexed adapter deleteDatabase method will now wait until complete before callback (#584)
* fixed clone methods correctly assigning object prototypes (#586)
* partitioning adapter and memory adapter no longer throw error when database doesn't exist (yet)
* simplesort and compoundsort now support sorting on nested properties via dot-notation (#574)
* added support for binary indices on nested properties (#574)
* fixed jsdoc syntax error causing vscode to crash (#614)
* fixed error when using partitioning adapter with nativescript adapter (#615)
* added optional 'dataOptions' to eqJoin and map (chain/transform) (see #618)

## 1.5.0
* refactored binary indices sorting order
* date values in properties with binary index will be converted to epoch time
* fix to LokiFsStructuredAdapter first time autoload error where file doesn't exist yet
* fixed simplesort descending with binary indices and no filters
* with 'clone' option collection 'insert' events no longer emit internal obj reference
* fix to clone method 'shallow'
* added 'removeMeta' option to chained data calls to shallow clone and remove $loki and meta
* added quickstart examples for node and updated loki sandbox with online web quickstarts
* fixes to async unit tests
* npm release trimmed from 5 megs to 500k (no examples, jsdocs, tests)

## 1.4.3
* added throttled saves and loads (enabled by default) to ensure no overlapping calls
* unfiltered simplesorts can leverage binary index
* collection.clear now clears indices correctly
* fix to LokiPartitioning adapter resetting maxId across saves
* meta set correctly on batch inserts
* LokiMemoryAdapter now configurable to simulate async
* fix changesApi not enabled after loading database

## 1.4.2
* added 'adaptiveBinaryIndices' option to collections (default true) to avoid rebuilds on inserts/updates/removes
* added higher performance LokiFsStructuredAdapter for node
* added destructured serialization methods for partitioning and exporting
* added 'addListener' method alias of 'on' method
* LokiFsAdapter doesn't throw exception when file doesn't exist (yet)
* fix for circular structure error when setting ttl
* fix unit testing on windows
* experimental implementation of an incremental adapter

## 1.4.1
* minor fixes
* updated jsdoc coverage

## 1.4.0
* fixes to loki indexed adapter
* added nativescript adapter
* added $aeq, $contains, $containsAny, $ne
* fix unique index update with new object
* expose persistence adapters to module export
* fix to loki-crypted-file-adapter

## 1.3.0

* UniqueIndex and `by()` method
* staging API
* count() utility method
* RethinkDB-style joins (eqJoin)
* moved testing to Karma
* moved builds and run to npm instead of gulp
* added $containsAny operator
* statistical functions: average, max, maxRecord, min, minRecord, median, mode
* extract() to extract a flat array of values for one field in each record
* extractNumerical() - same as extract() for numerical values
* pre-insert and pre-update events
