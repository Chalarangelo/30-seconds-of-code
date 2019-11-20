/* eslint-disable */
const { parseConfigs } = require('functions/parsers');

const config = require('./config');

module.exports = {
  siteMetadata: {
    title: `${config.name}`,
    description: `${config.description}`,
    author: `@30-seconds`,
    siteUrl: `${config.siteUrl}`,
  },
  plugins: [
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-sitemap`,
    ...parseConfigs(`${__dirname}/content`),
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/${config.assetPath}`,
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
