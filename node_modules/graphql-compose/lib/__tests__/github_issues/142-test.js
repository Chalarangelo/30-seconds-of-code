"use strict";

var _lodash = require("lodash");

var _2 = require("../..");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('github issue #142: Add schema definition in `graphql-tools` way', () => {
  // example data
  const authors = [{
    id: 1,
    firstName: 'Tom',
    lastName: 'Coleman'
  }, {
    id: 2,
    firstName: 'Sashko',
    lastName: 'Stubailo'
  }, {
    id: 3,
    firstName: 'Mikhail',
    lastName: 'Novikov'
  }];
  const _posts = [{
    id: 1,
    authorId: 1,
    title: 'Introduction to GraphQL',
    votes: 2
  }, {
    id: 2,
    authorId: 2,
    title: 'Welcome to Meteor',
    votes: 3
  }, {
    id: 3,
    authorId: 2,
    title: 'Advanced GraphQL',
    votes: 1
  }, {
    id: 4,
    authorId: 3,
    title: 'Launchpad is Cool',
    votes: 7
  }];
  const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;
  const resolvers = {
    Query: {
      posts: () => _posts,
      author: (_, {
        id
      }) => (0, _lodash.find)(authors, {
        id
      })
    },
    Mutation: {
      upvotePost: (_, {
        postId
      }) => {
        const post = (0, _lodash.find)(_posts, {
          id: postId
        });

        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`);
        }

        post.votes += 1;
        return post;
      }
    },
    Author: {
      posts: author => (0, _lodash.filter)(_posts, {
        authorId: author.id
      })
    },
    Post: {
      author: post => (0, _lodash.find)(authors, {
        id: post.authorId
      })
    }
  };

  _2.schemaComposer.addTypeDefs(typeDefs);

  _2.schemaComposer.addResolveMethods(resolvers);

  const schema = _2.schemaComposer.buildSchema();

  it('test graphql query',
  /*#__PURE__*/
  _asyncToGenerator(function* () {
    expect((yield _2.graphql.graphql(schema, `
          query { 
            author(id: 2) {
              id
              firstName
            }
            posts {
              title
              author {
                firstName
              }
            }
          }
        `))).toEqual({
      data: {
        author: {
          firstName: 'Sashko',
          id: 2
        },
        posts: [{
          author: {
            firstName: 'Tom'
          },
          title: 'Introduction to GraphQL'
        }, {
          author: {
            firstName: 'Sashko'
          },
          title: 'Welcome to Meteor'
        }, {
          author: {
            firstName: 'Sashko'
          },
          title: 'Advanced GraphQL'
        }, {
          author: {
            firstName: 'Mikhail'
          },
          title: 'Launchpad is Cool'
        }]
      }
    });
  }));
});