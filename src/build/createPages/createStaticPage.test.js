import createStaticPage from './createStaticPage';

const createPageMock = jest.fn();

describe('createStaticPage', () => {
  beforeAll(() => {
    createStaticPage('my-component', createPageMock, 'test', '/static');
  });

  it('calls createPage with the correct arguments', () => {
    expect(createPageMock.mock.calls.length).toBe(1);
    expect(createPageMock).toHaveBeenCalledWith({
      path: '/static',
      component: 'my-component',
      context: 'test',
    });
  });
});
