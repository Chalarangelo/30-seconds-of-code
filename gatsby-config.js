/* eslint-disable */
const settings = require('settings/global');
const paths = require('settings/paths');

module.exports = {
  siteMetadata: {
    title: `${settings.websiteName}`,
    description: `${settings.websiteDescription}`,
    author: `@30-seconds`,
    siteUrl: `${settings.websiteUrl}`,
  },
  plugins: [
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
        name: `${settings.websiteName}`,
        short_name: `${settings.shortName}`,
        start_url: `/`,
        background_color: `#1e253d`,
        theme_color: `#1e253d`,
        display: `standalone`,
        icon: `assets/30s-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
  ],
};
