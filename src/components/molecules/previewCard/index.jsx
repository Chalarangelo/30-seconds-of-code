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
  <li className={`${cardClassName} list-card grid a-center py-5 px-4 md:p-6`}>
    <Image
      className='br-md'
      src={contentItem.cover}
      alt=''
      height='144'
      width='144'
    />
    <div className='flex flex-col card-data'>
      <CardTitle isSecondary>
        <Link href={contentItem.url}>
          <a className='inherit'>{contentItem.title}</a>
        </Link>
      </CardTitle>
      <p
        className='mx-0 mt-1 mb-3 f-clamp'
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
