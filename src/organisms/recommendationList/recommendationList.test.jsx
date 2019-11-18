import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecommendationList from './index';

configure({ adapter: new Adapter() });

describe('<RecommendationList />', () => {
  const paginator = {
    totalPages: 7,
    pageNumber: 4,
    baseUrl: '/list',
  };
  const snippetList = [
    {
      title: 'compose',
      language: 'JavaScript',
      tags: {
        primary: 'function',
        all: ['function', 'recursion'],
      },
      expertise: 'intermediate',
      html: {
        description: '<p>Performs right-to-left function composition.</p>',
      },
      url: 'snippets/compose',
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <RecommendationList
        snippetList={ snippetList }
      />
    );
  });

  it('should render a PreviewCard component', () => {
    expect(wrapper).toContainMatchingElement('PreviewCard');
  });

});
