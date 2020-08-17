import sourceNodes from './sourceNodes';
import { requirables } from 'fixtures/requirables';

const createTypesMock = jest.fn();
const createNodeMock = jest.fn();
const actions = {
  createTypes: createTypesMock,
  createNode: createNodeMock,
};

const createNodeIdMock = jest.fn(s => s);
const createContentDigestMock = jest.fn(() => null);
const getNodesByTypeMock = jest.fn().mockReturnValue([
  {fileAbsolutePath: '30code/snippets/all.md'},
  {fileAbsolutePath: '30code/snippets/allEqual.md'},
  {fileAbsolutePath: '30csharp/snippets/FindIndexOfLastBy.md'},
  {fileAbsolutePath: '30csharp/snippets/FindLastBy.md'},
]);

describe('sourceNodes', () => {
  beforeAll(() => {
    sourceNodes(requirables)({
      actions,
      createNodeId: createNodeIdMock,
      createContentDigest: createContentDigestMock,
      getNodesByType: getNodesByTypeMock,
    });
  });

  it('calls createTypes once', () => {
    expect(createTypesMock.mock.calls.length).toBe(1);
  });

  it('calls createNode, createNodeId and createContentDigest once for each snippet', () => {
    expect(createNodeMock.mock.calls.length).toBe(4);
    expect(createNodeIdMock.mock.calls.length).toBe(4);
    expect(createContentDigestMock.mock.calls.length).toBe(4);
  });
});

