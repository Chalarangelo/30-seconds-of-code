/* eslint-disable */
const config = require('config/global');
const paths = require('config/paths');

module.exports = {
  siteMetadata: {
    title: `${config.websiteName}`,
    description: `${config.websiteDescription}`,
    author: `@30-seconds`,
    siteUrl: `${config.websiteUrl}`,
  },
  plugins: [
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/${paths.assetPath}`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `${config.websiteName}`,
        short_name: `${config.shortName}`,
        start_url: `/`,
        background_color: `#1e253d`,
        theme_color: `#1e253d`,
        display: `standalone`,
        icon: `assets/30s-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
  ],
};
