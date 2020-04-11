import onCreateNode from './onCreateNode';
import { createFilePath } from 'gatsby-source-filesystem';

const node = {
  internal: {
    type: 'MarkdownRemark',
  },
};

const createNodeFieldMock = jest.fn();
const actions = {
  createNodeField: createNodeFieldMock,
};

const getNode = () => {};

jest.mock('gatsby-source-filesystem');
const createFilePathMock = jest.fn();
createFilePath.mockImplementation(createFilePathMock);

describe('onCreateNode', () => {
  beforeAll(() => {
    onCreateNode({
      node, actions, getNode,
    });
  });

  it('calls createFilePath with the appropriate values', () => {
    expect(createFilePath.mock.calls.length).toBe(1);
    expect(createFilePath).toHaveBeenCalledWith({ node, getNode });
  });

  it('calls createNodeField', () => {
    expect(createNodeFieldMock.mock.calls.length).toBe(1);
  });
});
