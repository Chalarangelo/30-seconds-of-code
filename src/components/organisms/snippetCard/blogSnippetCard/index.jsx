import { Fragment } from 'react';
import Image from 'components/atoms/image';
import Card, { CardTitle, CardSubtitle } from 'components/atoms/card';
import Actions from 'components/molecules/actions';

/**
 * Blog snippet card.
 * Used for blog posts.
 */
const SnippetCard = ({ snippet }) => (
  <Card className='snippet-card blog-card'>
    <CardTitle>{snippet.title}</CardTitle>
    <div className='mt-0 mb-4 mx-0 txt-050 fs-xs'>
      {snippet.authors.map((a, i, arr) => (
        <Fragment key={`author-fragment-${i}`}>
          <a
            className='inherit'
            href={a.profile}
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            {a.name}
          </a>
          {i !== arr.length - 1 ? ', ' : ''}
        </Fragment>
      ))}
      {' · '}
      <CardSubtitle>
        {snippet.tags}
        {' · '}
        {snippet.date}
      </CardSubtitle>
    </div>
    <Image
      className='card-cover-image card-fw-section'
      src={snippet.cover}
      alt=''
      height='232'
      width='348'
    />
    <div
      className='card-description flex flex-col'
      dangerouslySetInnerHTML={{ __html: snippet.fullDescription }}
    />
    <Actions snippet={snippet} />
  </Card>
);

export default SnippetCard;
