import Meta from 'components/organisms/meta';
import Breadcrumbs from 'components/atoms/breadcrumbs';
import Shell from 'components/organisms/shell';
import SnippetCard from 'components/organisms/snippetCard';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCardList from 'components/organisms/previewCardList';

/**
 * Renders a snippet page.
 * Used to render all snippet pages on the website.
 */
const SnippetPage = ({
  snippet,
  recommendations,
  breadcrumbs,
  pageDescription,
  structuredData,
}) => {
  return (
    <>
      <Meta
        title={structuredData ? structuredData.name : snippet.title}
        description={pageDescription}
        logoSrc={snippet.cover ? snippet.cover : undefined}
        structuredData={structuredData}
        breadcrumbsData={breadcrumbs}
        canonical={snippet.slug}
        pageType='article'
      />
      <Shell>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <SnippetCard snippet={snippet} />
        <div className='g-c3'>
          <PageTitle className='recommendation-list-title'>
            {recommendations.title}
          </PageTitle>
          <PreviewCardList contentItems={recommendations.items} />
        </div>
      </Shell>
    </>
  );
};

export default SnippetPage;
