## master

## 0.0.0-semantically-released (September 12, 2016)
This package publishing automated by [semantic-release](https://github.com/semantic-release/semantic-release).
[Changelog](https://github.com/nodkz/graphql-compose/releases) is generated automatically and can be found here: https://github.com/nodkz/graphql-compose/releases


## 0.0.23 (September 6, 2016)
- Update dependencies
- Update order of imported modules, due eslint warnings
- Flowtype 0.32

## 0.0.22 (August 25, 2016)
- Fix `Resolver.wrapResolve()` overwrites original resolver in TypeComposer. Double wrapResolve does not work properly.

## 0.0.21 (August 25, 2016)
- Add `getProjectionMapper` method to `TypeComposer`. More clarified variable and type names for projection in fields.

## 0.0.20 (August 22, 2016)
- fix: `TypeComposer.getByPath()` now can extract type from `GraphQLNonNull` and `GraphQLList`.
- fix: Maximum call stack size exceeded for schema build with cross referenced types.
- fix: checking `Resolver` instance in relations, improve error message.

## 0.0.19 (August 19, 2016)
- fix: Resolver now accept middlewares via options. Resolver.clone() now copy all middlewares.

## 0.0.18 (August 18, 2016)
- Add `Resolver.wrapResolve(resolveMW: ResolverMWResolve): Resolver` method
It will create new Resolver with wrapped `resolve` method.
```js
const UserFindByIdRestrictedResolver = UserTC
  .getResolver('findById')
  .wrapResolve(next => resolveParams => {
    return resolveParams.context.isAdmin
      ? next(resolveParams) // call internal resolver
      : Promise.reject('This operation permitted only for admins.');
  });
```
- fix: Catch error for `relations` and display it to the server stdout.
  - If article does not have value in `authorId`, then `findById` resolver throws error, that not provided author id. By default this error will be caught, and client will receive `null` for `author` field.
  - If `catchErrors = false`, then error will be passed to client.
```js
ArticleTC.addRelation(
  'author',
  () => ({
    resolver: UserTC.getResolver('findById'),
    args: {
      _id: (source) => `${source.authorId}`,
    },
    projection: { authorId: true },
    catchErrors: false, // true, by default
  })
);
```

## 0.0.17 (August 15, 2016)
- fix: babel build via the workaround https://phabricator.babeljs.io/T2877#78089 Huh, it's too tricky to use Map/Set in ES5.

## 0.0.16 (August 13, 2016)
- fix: babel build process

## 0.0.15 (August 10, 2016)
- Update packages, add `babel-plugin-transform-runtime` for build process. Fix [issue](https://github.com/nodkz/graphql-compose-connection/issues/2) for vanilla node.js users without babel (thanks @jacobbubu).

## 0.0.14 (August 9, 2016)
- Added `projection` argument for `TypeComposer.addField` and `TypeComposer.addField`. Sometimes, when you create relations or some tricky fields, you should have a data from additional fields, that not in a query projection. E.g. for obtaining `friendList` you also should add `friendIds` to projection. Or for `fullname` field you should request `firstname` and `lastname` from DB.
- Again was changed `TypeComposer.addRelation` declaration. Added ability to create relations for cross imported files via an anonymous function. Also added build step for converting relations to GraphQL fields, when calling schemaBuild().
- Fix `projection` from AST method. Incorrectly works `ProjectionMapper` with `GraphQLList` and `Connection` types.
- Added flow-type `ProjectionType`

## 0.0.13 (August 8, 2016)
- Change `TypeComposer.addRelation` arguments:
  - move `argsMapper` to `opts.args`
  - add `projection` to `opts` (relations may require some fields, that not described in GraphQL query)
- Add projectionMapper to Types. Now `relation` works without redundantly defining additional fields.
  - When you create relations you need query additional fields, that not in the GraphQL query. E.g. for obtaining `friendList` you also should add `friendIds` to projection. ProjectionMapper solves this problem.

## 0.0.11 (July 28, 2016)
- Add `getByPath` method to TypeComposer and InputTypeComposer for obtaining deep field type.

Eg.
```js
const recordInputTC = GQC.rootMutation().getByPath('addUser.@input.record');
const languagesTC = GQC.rootQuery().getByPath('viewer.user.languages');
const languagesTC2 = GQC.get('User').getByPath('viewer.user.languages');
const languagesTC3 = new TypeComposer(UserOutputType).getByPath('viewer.user.languages');
```

## 0.0.10 (July 21, 2016)
- Change `addRelation` method. Now it maps arguments, and strip out provided args from field config.

## 0.0.9 (July 20, 2016)
- Add method `getFlatProjectionFromAST`, which returns projection only for first level
- `toInputObjectType` now works with TypeComposer, rather than GraphQLType (if TypeComposer already has InputType, then it does not generate new one)
- Clear types' fields, if they are ObjectTypes without fields.
- Rename GQC methods:
  - `typeComposer` to `get`
  - `setType` to `add`
  - `hasType` to `has`

## 0.0.8 (July 18, 2016)
- Add export of `getProjectionFromAST` function to module
- Fix peerDependencies
- Update flow-bin till 0.29
- Fix `undefined` postfix for generated InputTypes

## 0.0.6 (July 15, 2016)
- feat: derive projection for resolverParams from fieldASTs
- fix: clone for Types

## 0.0.5 (July 08, 2016)
- ResolverMiddlewares now have access to wrapped resolver

## 0.0.4 (July 07, 2016)
- TypeComposer can manipulate the object type interfaces  
- add ability to clone types
- exports flow annotations
- some internal improvements

## 0.0.3 (July 03, 2016)
- Published for playing and testing `graphql-compose-mongoose`
- fix call resolver function with proper arguments

## 0.0.2 (July 01, 2016)
- Published for playing and testing `graphql-compose-mongoose`

## 0.0.1 (June 07, 2016)
- Initial commit with proposal
