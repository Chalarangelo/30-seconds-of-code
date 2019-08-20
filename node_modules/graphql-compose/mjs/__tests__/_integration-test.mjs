import { schemaComposer } from '..';
beforeEach(() => {
  schemaComposer.clear();
});
describe('created types via ObjectTypeComposer.create should be avaliable in SDL', () => {
  it('simple case', () => {
    const UserTC = schemaComposer.createObjectTC(`
      type User {
        name: String
      }
    `);
    const ArticleTC = schemaComposer.createObjectTC(`
      type Article {
        text: String
        user: User
      }
    `);
    expect(ArticleTC.getFieldType('user')).toBe(UserTC.getType());
  });
  it('hoisting case', () => {
    const UserTC = schemaComposer.createObjectTC({
      name: 'User',
      fields: {
        name: 'String',
        articles: '[Article]'
      }
    });
    const ArticleTC = schemaComposer.createObjectTC({
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