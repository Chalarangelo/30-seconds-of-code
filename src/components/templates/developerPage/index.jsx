import React, { useState } from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import PageBackdrop from 'components/atoms/pageBackdrop';
import Shell from 'components/organisms/shell';
import SimpleCard from 'components/molecules/simpleCard';
import literals from 'lang/en/client/developer';
// Do not change this to `import`, it's not going to work, no clue why
// Also do not move this to the general styles, as we want to keep it separate
// and not serve it in production.
require('./index.scss');

const propTypes = {
  pageContext: PropTypes.shape({
    configs: PropTypes.arrayOf(
      PropTypes.shape({
        sourceDir: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        slugPrefix: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

/**
 * Renders a developer page.
 * Responsible for rendering the /developer page in development mode.
 */
const DeveloperPage = ({ pageContext: { configs } }) => {
  const [repo, setRepo] = useState(null);
  const [title, setTitle] = useState(null);
  return (
    <>
      <Meta title={literals.devMode} />
      <Shell>
        <PageTitle>{literals.devMode}</PageTitle>
        <SimpleCard title={literals.createSnippet}>
          <form
            className='dev-form'
            onSubmit={e => {
              e.preventDefault();
              if (!repo || !title) return;
              const config = configs.find(cfg => cfg.sourceDir === repo);
              fetch('/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  dirName: repo,
                  snippetName: title,
                  slugPrefix: config.slugPrefix,
                }),
              })
                .then(res => res.json())
                .then(({ url }) => {
                  setTimeout(() => {
                    window.location.href = url;
                  }, 500);
                });
            }}
          >
            <label htmlFor='repository'>{literals.repo}</label>
            <select name='repository' onChange={e => setRepo(e.target.value)}>
              {configs.map(({ sourceDir, name, slugPrefix }) => (
                <option key={slugPrefix} value={sourceDir}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor='snippetTitle'>{literals.snippetTitle}</label>
            <input
              type='text'
              placeholder={literals.snippetTitlePlaceholder}
              onChange={e => setTitle(e.target.value)}
            />
            <button className='btn' type='submit'>
              {literals.createSnippet}
            </button>
          </form>
        </SimpleCard>
      </Shell>
    </>
  );
};

DeveloperPage.propTypes = propTypes;

export default DeveloperPage;
