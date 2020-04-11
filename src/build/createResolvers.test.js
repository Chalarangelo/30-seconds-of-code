import createResolvers from './createResolvers';

const resolvers = {
  'stdResolver': () => {},
};

const createResolversMock = jest.fn();

describe('createResolvers', () => {
  beforeAll(() => {
    createResolvers(resolvers)({ createResolvers: createResolversMock});
  });

  it('calls createResolvers', () => {
    expect(createResolversMock.mock.calls.length).toBe(1);
  });
});
