import Link from 'next/link';
import Image from 'components/atoms/image';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Shell from 'components/organisms/shell';
import literals from 'lang/en/client/notFound';

/**
 * Renders a not found page.
 * Responsible for rendering the /404 page.
 */
const NotFoundPage = () => (
  <>
    <Meta title={literals.pageNotFound} />
    <Shell>
      <div className='g-c2'>
        <PageTitle>{literals.fourOhFour}</PageTitle>
        <div className='box-border f-center txt-050 my-8 py-8 px-3.5'>
          <Image
            src='/assets/splash/plane.png'
            className='br-lg'
            height='360'
            width='360'
          />
          <p className='f-center mx-auto mb-3 mt-8 fs-xl'>
            <span className='txt-150'>{literals.pageNotFound}</span>
          </p>
          <p className='my-2 mx-auto f-center px-8 mb-5'>
            {literals.notFoundDescription}
          </p>
          <Link href='/'>
            <a className='btn outline-btn icon-btn fs-md icon icon-home before:fs-md'>
              {literals.goHome}
            </a>
          </Link>
        </div>
      </div>
    </Shell>
  </>
);

export default NotFoundPage;
