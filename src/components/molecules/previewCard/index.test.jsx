import { render, cleanup } from '@testing-library/react';
import PreviewCard from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';
import { collectionChip } from 'test/fixtures/collections';

const previewSnippet = SnippetFactory.create('PreviewSnippet');
const previewBlogSnippet = SnippetFactory.create('PreviewBlogSnippet');

describe('<PreviewCard />', () => {
  let wrapper, card, expertise, anchor;

  beforeEach(() => {
    wrapper = render(<PreviewCard contentItem={previewSnippet} />).container;
    anchor = wrapper.querySelector('a');
    card = wrapper.querySelector('.card');
    expertise = wrapper.querySelector('.expertise');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('an anchor element', () => {
      expect(wrapper.querySelectorAll('a')).toHaveLength(1);
    });

    it('a li element with the approprite classes', () => {
      expect(wrapper.querySelectorAll('li.card.list-card')).toHaveLength(1);
    });

    it('the card title', () => {
      expect(card.querySelectorAll('h3.card-title')).toHaveLength(1);
    });

    it('an Expertise component', () => {
      expect(card.querySelectorAll('.expertise')).toHaveLength(1);
    });

    it('the card description', () => {
      expect(card.querySelectorAll('.card-description')).toHaveLength(1);
    });
  });

  it('should have the correct card title', () => {
    expect(card.querySelector('h3.card-title').textContent).toBe(
      previewSnippet.title
    );
  });

  it('should pass the expertise data to the Expertise component', () => {
    expect(expertise.className).toContain(
      previewSnippet.expertise.toLowerCase()
    );
  });

  it('should pass the appropriate tags to the TagList component', () => {
    expect(card.textContent).toContain(previewSnippet.tags);
  });

  it('should render the correct description', () => {
    expect(card.querySelector('.card-description').innerHTML).toContain(
      previewSnippet.description
    );
  });

  it('should link to the correct url', () => {
    expect(anchor.href).toContain(previewSnippet.url);
  });

  describe('with a blog snippet', () => {
    beforeEach(() => {
      wrapper = render(<PreviewCard contentItem={previewBlogSnippet} />)
        .container;
    });

    it('should pass the appropriate tags to the TagList component', () => {
      expect(wrapper.textContent).toContain(previewBlogSnippet.tags);
    });
  });

  describe('with a collection', () => {
    beforeEach(() => {
      wrapper = render(
        <PreviewCard
          contentItem={{
            ...collectionChip,
            description: 'Lorem ipsum',
            tags: 'Snippet collection',
          }}
        />
      ).container;
    });

    it('should pass the appropriate tags to the TagList component', () => {
      expect(wrapper.textContent).toContain('Snippet collection');
    });
  });
});
