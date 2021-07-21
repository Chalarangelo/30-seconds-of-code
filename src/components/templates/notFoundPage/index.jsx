import Link from 'next/link';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import PageBackdrop from 'components/molecules/pageBackdrop';
import Shell from 'components/organisms/shell';
import literals from 'lang/en/client/notFound';

const propTypes = {};

/**
 * Renders a not found page.
 * Responsible for rendering the /404 page.
 */
const NotFoundPage = () => (
  <>
    <Meta title={literals.pageNotFound} />
    <Shell>
      <PageTitle>{literals.fourOhFour}</PageTitle>
      <PageBackdrop
        backdropImage='/assets/plane.png'
        mainTextClassName='fs-xl'
        subTextClassName='mb-5'
        mainText={
          <>
            <span className='txt-150'>{literals.pageNotFound}</span>
          </>
        }
        subText={literals.notFoundDescription}
      >
        <Link href='/'>
          <a className='btn outline-btn icon-btn btn-home fs-md icon icon-home before:fs-md'>
            {literals.goHome}
          </a>
        </Link>
      </PageBackdrop>
    </Shell>
  </>
);

NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
