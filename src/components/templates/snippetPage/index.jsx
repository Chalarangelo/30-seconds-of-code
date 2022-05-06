import Meta from 'components/organisms/meta';
import Breadcrumbs from 'components/atoms/breadcrumbs';
import Shell from 'components/organisms/shell';
import SnippetCard from 'components/organisms/snippetCard';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCardList from 'components/organisms/previewCardList';
import { SurveyPropmpt } from 'components/atoms/surveyPrompt';

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
        title={snippet.title}
        description={pageDescription}
        logoSrc={snippet.cover ? snippet.cover : undefined}
        structuredData={structuredData}
        breadcrumbsData={breadcrumbs}
        canonical={snippet.slug}
      />
      <Shell>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <SnippetCard snippet={snippet} />
        <SurveyPropmpt />
        <PageTitle className='recommendation-list-title f-center'>
          {recommendations.title}
        </PageTitle>
        <PreviewCardList
          contentItems={recommendations.items}
          fromParam='recommendations'
        />
      </Shell>
    </>
  );
};

export default SnippetPage;
