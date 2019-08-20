# gatsby-plugin-offline

Adds drop-in support for making a Gatsby site work offline and more resistant to
bad network connections. It creates a service worker for the site and loads the
service worker into the client.

If you're using this plugin with `gatsby-plugin-manifest` (recommended) this
plugin should be listed _after_ that plugin so the manifest file can be included
in the service worker.

## Install

`npm install --save gatsby-plugin-offline`

## How to use

```javascript
// In your gatsby-config.js
plugins: [`gatsby-plugin-offline`]
```

## Overriding options

When adding this plugin to your `gatsby-config.js`, you can pass in options (via the `options` key) to
override the default [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-build) config.

The default config is as follows. Warning: You can break the offline support by
changing these options, so tread carefully.

```javascript
const options = {
  importWorkboxFrom: `local`,
  globDirectory: rootDir,
  globPatterns,
  modifyUrlPrefix: {
    // If `pathPrefix` is configured by user, we should replace
    // the default prefix with `pathPrefix`.
    "/": `${pathPrefix}/`,
  },
  cacheId: `gatsby-plugin-offline`,
  // Don't cache-bust JS or CSS files, and anything in the static directory,
  // since these files have unique URLs and their contents will never change
  dontCacheBustUrlsMatching: /(\.js$|\.css$|static\/)/,
  runtimeCaching: [
    {
      // Use cacheFirst since these don't need to be revalidated (same RegExp
      // and same reason as above)
      urlPattern: /(\.js$|\.css$|static\/)/,
      handler: `cacheFirst`,
    },
    {
      // Add runtime caching of various other page resources
      urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
      handler: `staleWhileRevalidate`,
    },
    {
      // Google Fonts CSS (doesn't end in .css so we need to specify it)
      urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
      handler: `staleWhileRevalidate`,
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
}
```

## Remove

If you want to remove `gatsby-plugin-offline` from your site at a later point,
substitute it with [`gatsby-plugin-remove-serviceworker`](https://www.npmjs.com/package/gatsby-plugin-remove-serviceworker)
to safely remove the service worker. First, install the new package:

```bash
npm install gatsby-plugin-remove-serviceworker
npm uninstall gatsby-plugin-offline
```

Then, update your `gatsby-config.js`:

```diff:title=gatsby-config.js
 plugins: [
-  `gatsby-plugin-offline`,
+  `gatsby-plugin-remove-serviceworker`,
 ]
```

This will ensure that the worker is properly unregistered, instead of leaving an
outdated version registered in users' browsers.

## Notes

### Empty View Source and SEO

Gatsby offers great SEO capabilities and that is no different with `gatsby-plugin-offline`. However, you shouldn't think that Gatsby doesn't serve HTML tags anymore when looking at your source code in the browser (with `Right click` => `View source`). `View source` doesn't represent the actual HTML data since `gatsby-plugin-offline` registers and loads a service worker that will cache and handle this differently. Your site is loaded from the service worker, not from its actual source (check your `Network` tab in the DevTools for that).

To see the HTML data that crawlers will receive, run this in your terminal:

```bash
curl https://www.yourdomain.tld
```

Alternatively you can have a look at the `/public/index.html` file in your project folder.

### App shell and server logs

Server logs (like from [Netlify analytics](https://www.netlify.com/products/analytics/)) may show a large number of pageviews to a route like `/offline-plugin-app-shell-fallback/index.html`, this is a result of `gatsby-plugin-offline` adding an [app shell](https://developers.google.com/web/fundamentals/architecture/app-shell) to the page. The app shell is a minimal amount of user interface that can be cached offline for reliable performance loading on repeat visits. The shell can be loaded from the cache, and the content of the site loaded into the shell by the service worker.
