const config = require('./config');

module.exports = {
  siteMetadata: {
    title: `${config.name}`,
    description: `${config.description}`,
    author: `@30-seconds`,
    siteUrl: `${config.siteUrl}`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `snippets`,
        path: `${__dirname}/${config.snippetPath}`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `snippets_archive`,
        path: `${__dirname}/${config.snippetArchivePath}`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `snippet_data`,
        path: `${__dirname}/${config.snippetDataPath}`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/${config.assetPath}`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/${config.pagePath}`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-117141635-1`,
        anonymize: true, // Always set this to true, try to comply with GDPR out of the box
        respectDNT: true, // Always set to true, be respectful of people who ask not to be tracked
        cookieExpires: 0, // Always set to 0, minimum tracking for your users
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `${config.name}`,
        short_name: `${config.shortName}`,
        start_url: `/`,
        background_color: `#1e253d`,
        theme_color: `#1e253d`,
        display: `standalone`,
        icon: `assets/30s-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
  ],
};
