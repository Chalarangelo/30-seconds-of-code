export const requirables = [
  {
    data: [
      {
        'id': 'all',
        'title': 'all',
        'type': 'snippet',
        'tags': {
          'all': [
            'array',
            'function',
            'beginner',
          ],
          'primary': 'array',
        },
        'code': {
          'es6': 'const all = (arr, fn = Boolean) => arr.every(fn);',
          'es5': 'var all = function all(arr) {\n  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;\n  return arr.every(fn);\n};',
          'example': 'all([4, 2, 3], x => x > 1); // true\nall([1, 2, 3]); // true',
        },
        'text': {
          'full': 'Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.\n\nUse `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.\nOmit the second argument, `fn`, to use `Boolean` as a default.\n\n',
          'short': 'Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.',
        },
        'meta': {
          'hash': 'ba8e5f17500d1e5428f4ca7fcc8095934a7ad3aa496b35465e8f7799f1715aaa',
          'firstSeen': '1518601575',
          'lastUpdated': '1565681352',
          'updateCount': 6,
          'authorCount': 4,
        },
        'blog': false,
        'language': {
          'short': 'js',
          'long': 'JavaScript',
        },
        'icon': 'js',
        'sourceDir': '30code/snippets',
        'slugPrefix': 'js/s',
        'repoUrlPrefix': 'https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets',
        'resolver': 'stdResolver',
        'biasPenaltyMultiplier': 1.05,
      },
      {
        'id': 'allEqual',
        'title': 'allEqual',
        'type': 'snippet',
        'tags': {
          'all': [
            'function',
            'array',
            'beginner',
          ],
          'primary': 'function',
        },
        'code': {
          'es6': 'const allEqual = arr => arr.every(val => val === arr[0]);',
          'es5': 'var allEqual = function allEqual(arr) {\n  return arr.every(function (val) {\n    return val === arr[0];\n  });\n};',
          'example': 'allEqual([1, 2, 3, 4, 5, 6]); // false\nallEqual([1, 1, 1, 1]); // true',
        },
        'text': {
          'full': 'Check if all elements in an array are equal.\n\nUse `Array.prototype.every()` to check if all the elements of the array are the same as the first one.\nElements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.\n\n',
          'short': 'Check if all elements in an array are equal.',
        },
        'meta': {
          'hash': 'bda519858588ad61c9200acbb4ea5ce66630eb2ed7ceda96d12518b772b986b9',
          'firstSeen': '1533243788',
          'lastUpdated': '1565681352',
          'updateCount': 6,
          'authorCount': 4,
        },
        'blog': false,
        'language': {
          'short': 'js',
          'long': 'JavaScript',
        },
        'icon': 'js',
        'sourceDir': '30code/snippets',
        'slugPrefix': 'js/s',
        'repoUrlPrefix': 'https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets',
        'resolver': 'stdResolver',
        'biasPenaltyMultiplier': 1.05,
      },
    ],
    meta: {
      specification: 'http://jsonapi.org/format/',
      type: 'snippetArray',
      language: {
        'short': 'js',
        'long': 'JavaScript',
      },
      resolver: 'stdResolver',
      blog: false,
      slugPrefix: 'js/s',
      sourceDir: '30code/snippets',
      repoUrlPrefix:
     'https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets',
      biasPenaltyMultiplier: 1.05,
      featured: 2,
      theme: {
        'backColor': '#f6d854',
        'foreColor': '#392f31',
        'iconName': 'js',
      },
    },
  },
  {
    data: [
      {
        'id': 'FindIndexOfLastBy',
        'title': 'FindIndexOfLastBy',
        'type': 'snippet',
        'tags': {
          'all': [
            'array',
            'list',
            'lambda',
            'intermediate',
          ],
          'primary': 'array',
        },
        'code': {
          'code': 'using System.Collections.Generic;\nusing System.Linq;\n\npublic static partial class _30s \n{\n  public static int FindIndexOfLastBy<T>(IList<T> data, Predicate<T> match)\n  {\n    return Enumerable\n      .Range(0, data.Count())\n      .Where(i => match(data[i]))\n      .Last();\n  }\n}',
          'example': 'int[] nums = {1, 2, 4, 5, 2, 2, 4};\n\n_30s.FindIndexOfLastBy(nums, x => x % 2 == 0); // 6',
        },
        'text': {
          'full': 'Returns the last index in an `IList` that matches the given predicate function, `match`.\n\nUse `Enumerable.Range()` to iterate over all indices in `data`.\nUse `IEnumerable.Where()` to filter out all values in `data` for which `match` returns `false`.\nUse `IEnumerable.Last()` to return only the last matching index.\n\n',
          'short': 'Returns the last index in an `IList` that matches the given predicate function, `match`.',
        },
        'meta': {
          'hash': '3feb7197cde8bf4e7313dd12f4f0ea756c266a9457c6e4913c4ca0e33714b3f1',
          'firstSeen': '1579717142',
          'lastUpdated': '1579717142',
          'updateCount': 2,
          'authorCount': 2,
        },
        'blog': false,
        'language': {
          'short': 'csharp',
          'long': 'C#',
        },
        'icon': 'csharp',
        'sourceDir': '30csharp/snippets',
        'slugPrefix': 'c-sharp/s',
        'repoUrlPrefix': 'https://github.com/30-seconds/30-seconds-of-csharp/blob/master/snippets',
        'resolver': 'stdResolver',
        'biasPenaltyMultiplier': 1.25,
      },
      {
        'id': 'FindLastBy',
        'title': 'FindLastBy',
        'type': 'snippet',
        'tags': {
          'all': [
            'array',
            'list',
            'lambda',
            'intermediate',
          ],
          'primary': 'array',
        },
        'code': {
          'code': 'using System.Collections.Generic;\nusing System.Linq;\n\npublic static partial class _30s \n{\n  public static T FindLastBy<T>(IEnumerable<T> data, Predicate<T> match)\n  {\n    return data.Where(i => match(i)).Last();\n  }\n}',
          'example': 'int[] nums = {1, 2, 4, 5, 2, 2, 4};\n\n_30s.FindLastBy(nums, x => x % 2 == 0); // 4',
        },
        'text': {
          'full': 'Returns the last element in a collection that matches the given predicate function, `match`.\n\nUse `IEnumerable.Where()` to filter out all values in `data` for which `match` returns `false`.\nUse `IEnumerable.Last()` to return only the last matching element.\n\n',
          'short': 'Returns the last element in a collection that matches the given predicate function, `match`.',
        },
        'meta': {
          'hash': 'e10aa700d64a2b7b526a66ac2e024e1999ef8aef0409760968a8a20080f212c6',
          'firstSeen': '1579717129',
          'lastUpdated': '1579717129',
          'updateCount': 2,
          'authorCount': 2,
        },
        'blog': false,
        'language': {
          'short': 'csharp',
          'long': 'C#',
        },
        'icon': 'csharp',
        'sourceDir': '30csharp/snippets',
        'slugPrefix': 'c-sharp/s',
        'repoUrlPrefix': 'https://github.com/30-seconds/30-seconds-of-csharp/blob/master/snippets',
        'resolver': 'stdResolver',
        'biasPenaltyMultiplier': 1.25,
      },
    ],
    meta: {
      specification: 'http://jsonapi.org/format/',
      type: 'snippetArray',
      language: {
        'short': 'csharp',
        'long': 'C#',
      },
      resolver: 'stdResolver',
      blog: true,
      slugPrefix: 'c-sharp/s',
      sourceDir: '30csharp/snippets',
      repoUrlPrefix:
     'https://github.com/30-seconds/30-seconds-of-csharp/blob/master/snippets',
      biasPenaltyMultiplier: 1.25,
      featured: 7,
    },
  },
];
