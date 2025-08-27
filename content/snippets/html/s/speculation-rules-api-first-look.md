---
title: A first look at the Speculation Rules API
shortTitle: Speculation Rules API first look
language: html
tags: [metadata,link,javascript]
cover: orange-coffee-3
excerpt: The new Speculation Rules API aims to deliver across the board performance optimizations with little developer effort. Let's see how!
listed: true
dateModified: 2025-09-20
---

If **page performance** is important to you, you may already be familiar with **resource prefetching**, using a `<link>` tag and the `rel="prefetch"` attribute. In fact, we've covered this topic in the past, so, if you're not familiar, I'd suggest starting there.

@[Quick refresher](/html/s/prefetching-resources)

## The Speculation Rules API

<baseline-support featureId="speculation-rules">
</baseline-support>

Prefetching individual links, however, is often tedious, even without the hassle of deciding which links needs prefetching. This is where the currently experimental [**Speculation Rules API**](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) comes in.

> [!WARNING]
>
> This API is, as stated, **currently experimental**. This means it's very likely to change before it becomes stable and any **information provided here may become outdated**. Always refer to the official documentation for more information.
>
> At the time of writing, the [Chrome team's blog post on the topic](https://developer.chrome.com/docs/web-platform/prerender-pages#impact_on_extensions) is the source of most of the information presented in this article.

What this API does is pretty straightforward. Instead of prefetching individual links, it allows developers to **define rules for when and how resources should be prefetched**, making the process more efficient and adaptive to the user's behavior.

### JSON directives

The Speculation Rules API consists of a simple JavaScript `<script>` tag with the `type="speculationrules"` attribute. Inside this tag, you can define your prefetching rules using a **JSON object**.

```html
<!-- Prefetch all local pages -->
<script type="speculationrules">
{
  "prefetch": [{
    "where": {
      "href_matches": "/*"
    },
    "eagerness": "moderate"
  }]
}
</script>
```

This little snippet may be just enough for many websites that want to gain a little performance boost by prefetching the next page the user may visit. It specifies that **all local pages** (`"href_matches": "/*"`) should be prefetched with a moderate eagerness level (more on that in a bit).

### When prefetching happens

In broad strokes, **when a user hovers over a link or clicks on it**, the browser can use the Speculation Rules API to determine whether to prefetch the linked resource based on the defined rules. Rules are pretty flexible, allowing you to specify specific pages or patterns to match or exclude, so that only important resources are prefetched.

On top of that, you can supply an **eagerness** value, which indicates when the speculations should fire, making it possible to fine-tune the prefetching behavior even further. The current `"eagerness"` granularity values are as follows:

* `"immediate"` - Prefetch as soon as the link is hovered over or focused.
* `"eager"` - Prefetch 5ms after the link is hovered over or focused.
* `"moderate"` - Prefetch 200ms after the link is hovered over or focused.
* `"conservative"` - Prefetch on pointer or touch down.

### Rules and patterns

<baseline-support featureId="urlpattern">
</baseline-support>

As we've already seen, you can use the [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) to match **specific URL patterns** in your speculation rules. This API is quite extensive and can help you create more sophisticated matching logic.

```html
<script type="speculationrules">
{
  "prefetch": [{
    "where": {
      "and": [
        { "href_matches": "/*" },
        { "not": {"href_matches": "/wp-admin"}},
        { "not": {"href_matches": "/*\\?*(^|&)add-to-cart=*"}},
        { "not": {"selector_matches": "[rel~=nofollow]"}}
      ]
    }
  }]
}
</script>
```

In this example, we are using a combination of `"href_matches"` and `"not"` conditions, wrapped in an `"and"` condition to create a set of rules for when to prefetch a page. The rules specify that any local page should be considered for prefetching, except for the ones **explicitly excluded**.

Apart from rules, you can also specify **exact URL matches** for prefetching:

```html
<script type="speculationrules">
{
  "prefetch": [
    {
      "urls": ["/home", "/about", "/contact"]
    }
  ]
}
</script>
```

### Prerendering

On a side note, you can also **prerender pages**. Prerendering is a more aggressive form of prefetching that not only fetches the resources for a page but also renders it in the background. This means that when the user eventually navigates to the prerendered page, it can be displayed almost instantly.

The only difference code-wise is that you specify `"prerender"` instead of `"prefetch"` in your speculation rules.

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "urls": ["/home", "/about", "/contact"]
    }
  ]
}
</script>
```

### Considerations

As usual with **prefetching**, it's important to remember that it isn't in itself free, but rather an optimization that can be beneficial when used judiciously. Overusing prefetching can lead to **increased resource consumption**, as any resource prefetch requires its own HTTP request.

This can potentially degrade performance, especially on low end devices or slow networks, so it's essential to strike a balance and **only prefetch resources that are likely to be needed**.

As a rule of thumb, prefetch pages that your users are very likely to benefit from, based on their browsing behavior and patterns. It's better to be more strict with your rules that prefetch resources too aggressively.

Additionally, **preloading** is even more expensive, as it prepares the entire page in the background, making it ready to be displayed instantly when the user navigates to it. This **requires a lot of resources**, both in terms of network bandwidth and memory usage, so it's crucial to **use it sparingly and only when necessary**. In many cases, it's better not to preload anything than to preload something that goes unused.

## Conclusion

The Speculation Rules API is a very **powerful tool**, when used in the correct way. It can remove the hassle of manual prefetching and prerendering, allowing developers to define clear rules for when and how resources should be loaded, adapting to **user behavior**.

By leveraging this API, you can significantly improve the performance and user experience of your web applications, but beware of the footguns that come with it.
