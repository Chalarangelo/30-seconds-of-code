"use strict";

const _ = require(`lodash`);

const prepareRegex = require(`../../utils/prepare-regex`);

const {
  getNodeTypeCollection
} = require(`./nodes`);

const {
  emitter
} = require(`../../redux`); // Cleared on DELETE_CACHE


const fieldUsages = {};
const FIELD_INDEX_THRESHOLD = 5;
emitter.on(`DELETE_CACHE`, () => {
  for (var field in fieldUsages) {
    delete fieldUsages[field];
  }
}); // Takes a raw graphql filter and converts it into a mongo-like args
// object that can be understood by loki. E.g `eq` becomes
// `$eq`. gqlFilter should be the raw graphql filter returned from
// graphql-js. e.g gqlFilter:
//
// {
//   internal: {
//     type: {
//       eq: "TestNode"
//     },
//     content: {
//       glob: "et"
//     }
//   },
//   id: {
//     glob: "12*"
//   }
// }
//
// would return
//
// {
//   internal: {
//     type: {
//       $eq: "TestNode"  // append $ to eq
//     },
//     content: {
//       $regex: new MiniMatch(v) // convert glob to regex
//     }
//   },
//   id: {
//     $regex: // as above
//   }
// }

function toMongoArgs(gqlFilter, lastFieldType) {
  const mongoArgs = {};

  _.each(gqlFilter, (v, k) => {
    if (_.isPlainObject(v)) {
      if (k === `elemMatch`) {
        const gqlFieldType = lastFieldType.ofType;
        mongoArgs[`$elemMatch`] = toMongoArgs(v, gqlFieldType);
      } else {
        const gqlFieldType = lastFieldType.getFields()[k].type;
        mongoArgs[k] = toMongoArgs(v, gqlFieldType);
      }
    } else {
      if (k === `regex`) {
        const re = prepareRegex(v); // To ensure that false is returned if a field doesn't
        // exist. E.g `{nested.field: {$regex: /.*/}}`

        mongoArgs[`$where`] = obj => !_.isUndefined(obj) && re.test(obj);
      } else if (k === `glob`) {
        const Minimatch = require(`minimatch`).Minimatch;

        const mm = new Minimatch(v);
        mongoArgs[`$regex`] = mm.makeRe();
      } else if (k === `eq` && v === null) {
        mongoArgs[`$in`] = [null, undefined];
      } else if (k === `eq` && lastFieldType && lastFieldType.constructor.name === `GraphQLList`) {
        mongoArgs[`$contains`] = v;
      } else if (k === `ne` && lastFieldType && lastFieldType.constructor.name === `GraphQLList`) {
        mongoArgs[`$containsNone`] = v;
      } else if (k === `in` && lastFieldType && lastFieldType.constructor.name === `GraphQLList`) {
        mongoArgs[`$containsAny`] = v;
      } else if (k === `nin` && lastFieldType && lastFieldType.constructor.name === `GraphQLList`) {
        mongoArgs[`$containsNone`] = v;
      } else if (k === `ne` && v === null) {
        mongoArgs[`$ne`] = undefined;
      } else if (k === `nin` && lastFieldType.name === `Boolean`) {
        mongoArgs[`$nin`] = v.concat([undefined]);
      } else {
        mongoArgs[`$${k}`] = v;
      }
    }
  });

  return mongoArgs;
} // Converts a nested mongo args object into a dotted notation. acc
// (accumulator) must be a reference to an empty object. The converted
// fields will be added to it. E.g
//
// {
//   internal: {
//     type: {
//       $eq: "TestNode"
//     },
//     content: {
//       $regex: new MiniMatch(v)
//     }
//   },
//   id: {
//     $regex: newMiniMatch(v)
//   }
// }
//
// After execution, acc would be:
//
// {
//   "internal.type": {
//     $eq: "TestNode"
//   },
//   "internal.content": {
//     $regex: new MiniMatch(v)
//   },
//   "id": {
//     $regex: // as above
//   }
// }


const toDottedFields = (filter, acc = {}, path = []) => {
  Object.keys(filter).forEach(key => {
    const value = filter[key];
    const nextValue = _.isPlainObject(value) && value[Object.keys(value)[0]];

    if (key === `$elemMatch`) {
      acc[path.join(`.`)] = {
        [`$elemMatch`]: toDottedFields(value)
      };
    } else if (_.isPlainObject(nextValue)) {
      toDottedFields(value, acc, path.concat(key));
    } else {
      acc[path.concat(key).join(`.`)] = value;
    }
  });
  return acc;
}; // The query language that Gatsby has used since day 1 is `sift`. Both
// sift and loki are mongo-like query languages, but they have some
// subtle differences. One is that in sift, a nested filter such as
// `{foo: {bar: {ne: true} } }` will return true if the foo field
// doesn't exist, is null, or bar is null. Whereas loki will return
// false if the foo field doesn't exist or is null. This ensures that
// loki queries behave like sift


const isNeTrue = (obj, path) => {
  if (path.length) {
    const [first, ...rest] = path;
    return obj == null || obj[first] == null || isNeTrue(obj[first], rest);
  } else {
    return obj !== true;
  }
};

const fixNeTrue = filter => Object.keys(filter).reduce((acc, key) => {
  const value = filter[key];

  if (value[`$ne`] === true) {
    const [first, ...path] = key.split(`.`);
    acc[first] = {
      [`$where`]: obj => isNeTrue(obj, path)
    };
  } else {
    acc[key] = value;
  }

  return acc;
}, {}); // Converts graphQL args to a loki filter


const convertArgs = (gqlArgs, gqlType) => fixNeTrue(toDottedFields(toMongoArgs(gqlArgs.filter, gqlType))); // Converts graphql Sort args into the form expected by loki, which is
// a vector where the first value is a field name, and the second is a
// boolean `isDesc`. E.g
//
// {
//   fields: [ `frontmatter___date`, `id` ],
//   order: [`desc`]
// }
//
// would return
//
// [ [ `frontmatter.date`, true ], [ `id`, false ] ]
//


function toSortFields(sortArgs) {
  const {
    fields,
    order
  } = sortArgs;
  const lokiSortFields = [];

  for (let i = 0; i < fields.length; i++) {
    const dottedField = fields[i];
    const isDesc = order[i] && order[i].toLowerCase() === `desc`;
    lokiSortFields.push([dottedField, isDesc]);
  }

  return lokiSortFields;
} // Every time we run a query, we increment a counter for each of its
// fields, so that we can determine which fields are used the
// most. Any time a field is seen more than `FIELD_INDEX_THRESHOLD`
// times, we create a loki index so that future queries with that
// field will execute faster.


function ensureFieldIndexes(coll, lokiArgs) {
  _.forEach(lokiArgs, (v, fieldName) => {
    // Increment the usages of the field
    _.update(fieldUsages, fieldName, n => n ? n + 1 : 1); // If we have crossed the threshold, then create the index


    if (_.get(fieldUsages, fieldName) === FIELD_INDEX_THRESHOLD) {
      // Loki ensures that this is a noop if index already exists. E.g
      // if it was previously added via a sort field
      coll.ensureIndex(fieldName);
    }
  });
}
/**
 * Runs the graphql query over the loki nodes db.
 *
 * @param {Object} args. Object with:
 *
 * {Object} gqlType: A GraphQL type
 *
 * {Object} queryArgs: The raw graphql query as a js object. E.g `{
 * filter: { fields { slug: { eq: "/somepath" } } } }`
 *
 * {Object} context: The context from the QueryJob
 *
 * {boolean} firstOnly: Whether to return the first found match, or
 * all matching results
 *
 * @returns {promise} A promise that will eventually be resolved with
 * a collection of matching objects (even if `firstOnly` is true)
 */


async function runQuery({
  gqlType,
  queryArgs,
  firstOnly
}) {
  // Clone args as for some reason graphql-js removes the constructor
  // from nested objects which breaks a check in sift.js.
  const gqlArgs = JSON.parse(JSON.stringify(queryArgs));
  const lokiArgs = convertArgs(gqlArgs, gqlType);
  const coll = getNodeTypeCollection(gqlType.name);
  ensureFieldIndexes(coll, lokiArgs);
  let chain = coll.chain().find(lokiArgs, firstOnly);

  if (queryArgs.sort) {
    const sortFields = toSortFields(queryArgs.sort); // Create an index for each sort field. Indexing requires sorting
    // so we lose nothing by ensuring an index is added for each sort
    // field. Loki ensures this is a noop if the index already exists

    for (const sortField of sortFields) {
      coll.ensureIndex(sortField[0]);
    }

    chain = chain.compoundsort(sortFields);
  }

  return chain.data();
}

module.exports = runQuery;
//# sourceMappingURL=nodes-query.js.map