import Link from 'next/link';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import PageBackdrop from 'components/atoms/pageBackdrop';
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
        backdropImage='/assets/404.svg'
        mainTextClassName='fs-xl'
        mainText={
          <>
            <strong>{literals.pageNotFound}</strong>
            <br />
          </>
        }
        subText={literals.notFoundDescription}
      >
        <Link href='/'>
          <a className='btn btn-home fs-md icon icon-home'>{literals.goHome}</a>
        </Link>
      </PageBackdrop>
    </Shell>
  </>
);

NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
