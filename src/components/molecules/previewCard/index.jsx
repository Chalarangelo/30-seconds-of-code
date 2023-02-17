import Image from 'components/atoms/image';
import Link from 'next/link';
import { CardTitle, CardSubtitle, cardClassName } from 'components/atoms/card';

/**
 * General-purpose snippet/collection preview card.
 * Used in listing pages and search results.
 * Dependent on the `Card` component.
 * @param {object} contentItem - Snippet or collection object for the card.
 */
const PreviewCard = ({ contentItem }) => (
  <li className={`${cardClassName} list-card grid a-center`}>
    <Image
      className='br-md'
      src={contentItem.cover}
      alt=''
      height='144'
      width='144'
      fetchpriority='high'
    />
    <div className='flex flex-col gap-2'>
      <CardTitle isSecondary>
        <Link href={contentItem.url}>
          <a className='inherit'>{contentItem.title}</a>
        </Link>
      </CardTitle>
      <p
        className='mx-0 my-2 f-clamp'
        dangerouslySetInnerHTML={{ __html: `${contentItem.description}` }}
      />
      <CardSubtitle>
        {contentItem.tags}
        {' · '}
        <span className='inline-block'>{contentItem.extraContext}</span>
      </CardSubtitle>
    </div>
  </li>
);

export default PreviewCard;
