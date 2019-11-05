import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnippetList from './index';

configure({ adapter: new Adapter() });

describe('<SnippetList />', () => {
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
  const listingName = 'Snippet list';

  let wrapper, pageTitle, paginate;

  beforeEach(() => {
    wrapper = mount(
      <SnippetList
        snippetList={ snippetList }
        paginator={ paginator }
        listingName={ listingName }
      />
    );
    pageTitle = wrapper.find('PageTitle');
    paginate = wrapper.find('Paginator');
  });

  describe('should render', () => {
    it('a PageTitle component', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('a PageSubtitle component', () => {
      expect(wrapper).toContainMatchingElement('PageSubtitle');
    });

    it('a Paginator component', () => {
      expect(wrapper).toContainMatchingElement('Paginator');
    });

    it('a PreviewCard component', () => {
      expect(wrapper).toContainMatchingElement('PreviewCard');
    });
  });

  it('should pass the listinName to PageTitle', () => {
    expect(pageTitle.prop('children')).toBe(listingName);
  });

  it('should pass the paginator to Paginator', () => {
    expect(paginate.prop('paginator')).toEqual(paginator);
  });

});
