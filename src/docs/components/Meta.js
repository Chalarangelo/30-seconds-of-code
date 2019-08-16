import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
require('../styles/index.scss');
// import '../styles/index.scss';

// ===================================================
// Page metadata (using Helmet)
// ===================================================
const Meta = ({ description = '', lang = 'en', meta = [], title }) => {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        file(relativePath: { eq: "logo.png" }) {
          id
          childImageSharp {
            fluid(maxHeight: 400) {
              src
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : site.siteMetadata.title}
      titleTemplate={title ? `%s - ${site.siteMetadata.title}` : '%s'}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: site.siteMetadata.author,
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1`,
        },
        {
          name: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          name: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: file.childImageSharp.fluid.src,
        },
      ].concat(meta)}
      bodyAttributes={{
        class: 'card-page',
      }}
    />
  );
};

export default Meta;
