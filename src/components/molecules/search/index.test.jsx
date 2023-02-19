import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import Search from './index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
useRouter.mockImplementation(() => ({
  push,
  replace: jest.fn(),
  pathname: '/',
  query: {},
  basePath: '/',
}));

describe('<Search />', () => {
  let wrapper, input;

  beforeEach(() => {
    const utils = renderWithContext(<Search />);
    wrapper = utils.container;
    input = wrapper.querySelector('input');
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    expect(wrapper.querySelectorAll('input[type="search"]')).toHaveLength(1);
  });

  it('when entering a keyphrase from non-main search should redirect to search', () => {
    fireEvent.keyPress(input, { charCode: 13 });
    expect(push.mock.calls.length).toBeGreaterThan(0);
  });

  it('when clicked and isMainSearch should push the state to history', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));

    wrapper = renderWithContext(<Search isMainSearch />, {
      initialState: {
        search: {
          searchQuery: 'tes',
          searchIndex: [],
        },
      },
    }).container;
    input = wrapper.querySelector('input');
    fireEvent.keyUp(input, { target: { value: 'test' } });
    expect(push.mock.calls.length).toBeGreaterThan(0);
  });
});
