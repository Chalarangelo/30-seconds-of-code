# gatsby-plugin-netlify

Automatically generates a `_headers` file and a `_redirects` file at the root of the public folder to configure
[HTTP headers](https://www.netlify.com/docs/headers-and-basic-auth/) and [redirects](https://www.netlify.com/docs/redirects/) on Netlify.

By default, the plugin will add some basic security headers. You can easily add or replace headers through the plugin config.

## Install

`npm install --save gatsby-plugin-netlify`

## How to use

```javascript
// In your gatsby-config.js
plugins: [`gatsby-plugin-netlify`]
```

## Configuration

If you just need the critical assets, you don't need to add any additional
config. However, if you want to add headers, remove default headers, or
transform the given headers, you can use the following configuration options.

```javascript
plugins: [
  {
    resolve: `gatsby-plugin-netlify`,
    options: {
      headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
      allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      mergeSecurityHeaders: true, // boolean to turn off the default security headers
      mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      mergeCachingHeaders: true, // boolean to turn off the default caching headers
      transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
    },
  },
]
```

### Headers

The headers object represents a JS version of the
[Netlify `_headers` file format](https://www.netlify.com/docs/headers-and-basic-auth/).
You should pass in a object with string keys (representing the paths) and an
array of strings for each header.

An example:

```javascript
{
  options: {
    headers: {
      "/*": [
        "Basic-Auth: someuser:somepassword anotheruser:anotherpassword",
      ],
      "/my-page": [
        // matching headers (by type) are replaced by Netlify with more specific routes
        "Basic-Auth: differentuser:differentpassword",
      ],
    },
  }
}
```

Link paths are specially handed by this plugin. Since most files are processed
and cache-busted through Gatsby (with a file hash), the plugin will transform
any base file names to the hashed variants. If the file is not hashed, it will
ensure the path is valid relative to the output `public` folder. You should be
able to reference assets imported through javascript in the `static` folder.

Do not specify the public path in the config, as the plugin will provide it for
you.

The Netlify `_headers` file does not inherit headers, and it will replace any
matching headers it finds in more specific routes. For example, if you add a
link to the root wildcard path (`/*`), it will be replaced by any more
specific path. If you want a resource to put linked across the site, you will
have to add to every path. To make this easier, the plugin provides the
`allPageHeaders` option to inject the same headers on every path.

```javascript
{
  options: {
    allPageHeaders: [
      "Link: </static/my-logo.png>; rel=preload; as=image",
    ],
    headers: {
      "/*": [
        "Basic-Auth: someuser:somepassword anotheruser:anotherpassword",
      ],
    },
  }
}
```

You can validate the `_headers` config through the
[Netlify playground app](https://play.netlify.com/headers).

### Redirects

You can create redirects using the [`createRedirect`](https://www.gatsbyjs.org/docs/actions/#createRedirect) action.

In addition to the options provided by the Gatsby API, you can pass these options specific to this plugin:

| Attribute    | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `force`      | Overrides existing content in the path. This is particularly useful for domain alias redirects. See [the Netlify documentation for this option](https://www.netlify.com/docs/redirects/#structured-configuration).                                                                                                                                                                                               |
| `statusCode` | Overrides the HTTP status code which is set to `302` by default or `301` when [`isPermanent`](https://www.gatsbyjs.org/docs/actions/#createRedirect) is `true`. Since Netlify supports custom status codes, you can set one here. For example, `200` for rewrites, or `404` for a custom error page. See [the Netlify documentation for this option](https://www.netlify.com/docs/redirects/#http-status-codes). |

An example:

```javascript
createRedirect({ fromPath: "/old-url", toPath: "/new-url", isPermanent: true })
createRedirect({ fromPath: "/url", toPath: "/zn-CH/url", Language: "zn" })
createRedirect({
  fromPath: "/url_that_is/not_pretty",
  toPath: "/pretty/url",
  statusCode: 200,
})
```

You can also create a `_redirects` file in the `static` folder for the same effect. Any programmatically created redirects will be appended to the file.

```sh
# my manually set redirects
/home              /
/blog/my-post.php  /blog/my-post
```

You can validate the `_redirects` config through the
[Netlify playground app](https://play.netlify.com/redirects).

Redirect rules are automatically added for [client only paths](https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication). If those rules are conflicting with custom rules or if you want to have more control over them you can disable them in [configuration](#configuration) by setting `generateMatchPathRewrites` to `false`.
