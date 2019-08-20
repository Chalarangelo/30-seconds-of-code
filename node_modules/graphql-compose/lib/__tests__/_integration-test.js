"use strict";

var _ = require("..");

beforeEach(() => {
  _.schemaComposer.clear();
});
describe('created types via ObjectTypeComposer.create should be avaliable in SDL', () => {
  it('simple case', () => {
    const UserTC = _.schemaComposer.createObjectTC(`
      type User {
        name: String
      }
    `);

    const ArticleTC = _.schemaComposer.createObjectTC(`
      type Article {
        text: String
        user: User
      }
    `);

    expect(ArticleTC.getFieldType('user')).toBe(UserTC.getType());
  });
  it('hoisting case', () => {
    const UserTC = _.schemaComposer.createObjectTC({
      name: 'User',
      fields: {
        name: 'String',
        articles: '[Article]'
      }
    });

    const ArticleTC = _.schemaComposer.createObjectTC({
      name: 'Article',
      fields: {
        text: 'String',
        user: 'User'
      }
    });

    expect(ArticleTC.getFieldType('user')).toBe(UserTC.getType());
    const ArticleList = UserTC.getFieldType('articles');
    expect(ArticleList.ofType).toBe(ArticleTC.getType());
  });
});