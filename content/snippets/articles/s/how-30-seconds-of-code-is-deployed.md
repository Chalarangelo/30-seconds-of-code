---
title: How 30 seconds of code is deployed
tags: [webdev]
cover: home-office-3
excerpt: A historical run-through of how 30 seconds of code was deployed then and now.
listed: true
dateModified: 2025-07-03
---

<style>
  h2 > small {
    display: block;
    color: var(--color-text-lighter);
    font-size: var(--font-md);
    font-weight: var(--font-weight-normal);
    margin-top: var(--spacing-4);
  }

  details > p + p {
    margin-block-start: var(--layout-row-spacing)
  }
</style>

This is perhaps the longest article I've written, but I feel there's a ton of value to be had from my insights, mistakes, and the evolution of how 30 seconds of code has been deployed over the years. Grab a cup of coffee, and find a quiet spot, as we take a trip down memory lane.

> [!TIP]
>
> To view the state of the repository at a given time in history, you can visit the **Commit Reference** and **Browse files**.

<h2>
  <a id="markdown-only" href="#markdown-only">Markdown-only</a>
  <small>Early December 2017</small>
</h2>

<figure>

![Output of the initial tooling written for 30 seconds of code](/illustrations/how-30-seconds-of-code-is-deployed/markdown-only.png)

<figcaption>
  Output of the initial tooling written for 30 seconds of code
</figcaption>
</figure>

**Tools:** Node.js · [Commit reference](https://github.com/30-seconds/30-seconds-of-code/commit/bf855e55e228991e864adc245504099df8342699)

The original build process involved around the generation of Markdown with all of the snippets ordered and organized as a **Markdown file** with internal links presented as a page of contents.

Some [static Markdown parts](https://github.com/30-seconds/30-seconds-of-code/tree/bf855e55e228991e864adc245504099df8342699/static-parts) were used for the file's header and footer and a [builder script](https://github.com/30-seconds/30-seconds-of-code/blob/bf855e55e228991e864adc245504099df8342699/scripts/builder.js) would read each file in order and add its contents to an output string. The final result would be **written to the repository's README**.

Additionally a [linter script](https://github.com/30-seconds/30-seconds-of-code/blob/bf855e55e228991e864adc245504099df8342699/scripts/lintSnippet.js) was also provided to apply some **predefined rules** ([Semistandard](https://github.com/standard/semistandard)) to the code in the Markdown files.

As far as automation went, it was completely non-existent, needing **manual script runs and commits for each build**.

<h2>
  <a id="earliest-website-attempts" href="#earliest-website-attempts">Earliest website attempts</a>
  <small>Late December 2017</small>
</h2>

<figure>

![30 seconds of code website circa Dec. 31st, 2017](/illustrations/how-30-seconds-of-code-is-deployed/early-website.png)

<figcaption>
  30 seconds of code website circa Dec. 31st, 2017
</figcaption>
</figure>

**Tools:** Node.js, HTML, Travis CI, GitHub Pages · [Commit reference](https://github.com/30-seconds/30-seconds-of-code/commit/ed1170168357a9716751c596816040e7b751deeb)

As time went by, the [30 seconds of code bot account](https://github.com/30secondsofcode) (_not a real bot_) was introduced. The account was used for automation tasks, such as **automated builds** via the creation of a **GitHub Token** that was then used to push commits to the repository. The following `git push` command was what allowed the bot to push new code to the repository:

```shell
git push --force --quiet "https://${GH_TOKEN}@github.com/Chalarangelo/30-seconds-of-code.git" master > /dev/null 2>&1
```

Using the token, stored in an **environment variable** on GitHub, as part of a special URL one can push code from the token authorizer's account to the repository (provided the author has sufficient access). The rest of the command is written in such a way to **prevent outputting the token into the logs** and exposing a backdoor that anyone could exploit.

<figure>

![Current GitHub UI for storing environment variables as part of GitHub Actions](/illustrations/how-30-seconds-of-code-is-deployed/github-env-variables.png)

<figcaption>
  Current GitHub UI for storing environment variables as part of GitHub Actions (old UI was not much different)
</figcaption>
</figure>

For the purpose of **automation**, [Travis CI](https://www.travis-ci.com/) was used. This allowed changes pushed to master to trigger new builds, as well as other automation tasks. The [configuration file for Travis](https://github.com/30-seconds/30-seconds-of-code/blob/ed1170168357a9716751c596816040e7b751deeb/.travis.yml) specified which tasks to run (such as linting via Semistandard and [Prettier](https://prettier.io/)) and scripts to execute.

**Tagging** was added during that time in the form of a [plaintext file](https://github.com/30-seconds/30-seconds-of-code/blob/ed1170168357a9716751c596816040e7b751deeb/tag_database), specifying a tag for each individual snippet. A [tagging script](https://github.com/30-seconds/30-seconds-of-code/blob/ed1170168357a9716751c596816040e7b751deeb/scripts/tag.js) was added as well, allowing new snippets to be added to the file as *uncategorized*, which then needed manual processing.

<figure>

![Approximation of the GitHub Pages configuration in the current GitHub UI](/illustrations/how-30-seconds-of-code-is-deployed/github-pages.png)

<figcaption>
  Approximation of the GitHub Pages configuration in the current GitHub UI
</figcaption>
</figure>

Alongside the previous build script, a new [web script](https://github.com/30-seconds/30-seconds-of-code/blob/ed1170168357a9716751c596816040e7b751deeb/scripts/web.js) was added. It followed a very similar pattern, generating an **HTML page**, clearly inspired by [Lodash's website](https://lodash.com/docs/4.17.15). The output of the web script was then stored in a directory and **deployed automatically** on [GitHub Pages](https://pages.github.com/).

<figure>

![Namecheap's current UI with some information about the website domain](/illustrations/how-30-seconds-of-code-is-deployed/namecheap.png)

<figcaption>
  Namecheap's current UI with some information about the website domain
</figcaption>
</figure>

The current domain was obtained during this time from [Namecheap](https://www.namecheap.com/), but unfortunately the configuration that was used back then is lost to time.

<details>
<summary> <h3>Trivia</h3> </summary>

Travis CI was misconfigured for a little while, resulting in Travis builds triggering new builds as soon as the pushed to master. This caused an **infinite loop** that burned through the entirety of the free credits the project was provided with. Luckily, the Travis team was kind enough to restore them after I messaged them.

GitHub Issues malfunctioned at some point, resulting in the issue counter jumping a few numbers (something like 100). To this day, no incident report has been published and GitHub has not explained what happened back then.

The bot **token** was originally **incorrectly added in plaintext** as part of the bash script where it's used. This resulted in a **security vulnerability** that was identified by someone in a chatroom. Luckily, no malicious actors took advantage of it and I generated a new token after the code was fixed. If I remember correctly, a full rewrite of the `master` branch was performed to purge the offending commits.

</details>


<h2>
  <a id="multi-page-website" href="#multi-page-website">Multi-page website</a>
  <small>Early to mid 2018</small>
</h2>

<figure>

![30 seconds of code website circa Apr. 13th, 2018](/illustrations/how-30-seconds-of-code-is-deployed/multi-page-website.png)

<figcaption>
  30 seconds of code website circa Apr. 13th, 2018
</figcaption>
</figure>

**Tools:** Node.js, HTML, Travis CI, GitHub Pages · [Commit reference](https://github.com/30-seconds/30-seconds-of-code/commit/dba34017e863a1adb150325b01a659e17e714704)

As the project grew, several new ideas were tested. Alongside website build automation, a [Rollup](https://rollupjs.org/) [script](https://github.com/30-seconds/30-seconds-of-code/blob/dba34017e863a1adb150325b01a659e17e714704/scripts/rollup.js) was used to create a **JS package** with all the code snippets and [tap](https://www.npmjs.com/package/tap) was used to add **test cases** for each snippet. These were part of the **automated workflows** running still on Travis CI. The [JS package](https://www.npmjs.com/package/30-seconds-of-code) was also released on [npm](https://www.npmjs.com/), but was discontinued at a later time.

New [static parts](https://github.com/30-seconds/30-seconds-of-code/tree/dba34017e863a1adb150325b01a659e17e714704/static-parts) were added to split the page into **multiple pages** at this point, and a redesign was implemented to make the page a little better visually, showcasing statistics and contributors. Some **dynamic content** was added, such as daily picks on the homepage and [data retrieved via GitHub's API](https://github.com/30-seconds/30-seconds-of-code/blob/dba34017e863a1adb150325b01a659e17e714704/scripts/web.js#L133-L150), using a GitHub token same as other processes.

Finally, Travis CI was set up to run using a **cron job schedule** as well as **push events** on the `master` branch, allowing for daily builds to occur at a predetermined time.

<details>
<summary> <h3>Trivia</h3> </summary>

2018 was a year of experimentation. New **side projects** came and went, such as a localization effort, a JS glossary and a snippet archive. Traces of these experiments can be found in the commit history of the repository.

At this time, the website was only comprised of the JS snippets and nothing else. Similar projects for CSS and Python were actively supported by some of the contributors, but had full autonomy to pursue their own paths. This decentralized organization put together without much planning would later come to bite me.

</details>

<h2>
  <a id="website-facelift" href="#website-facelift">Website facelift</a>
  <small>Late 2018</small>
</h2>

<figure>

![30 seconds of code website circa Dec. 19th, 2018](/illustrations/how-30-seconds-of-code-is-deployed/website-facelift.png)

<figcaption>
  30 seconds of code website circa Dec. 19th, 2018
</figcaption>
</figure>

**Tools:** Node.js, HTML, Travis CI, GitHub Pages · [Commit reference](https://github.com/30-seconds/30-seconds-of-code/commit/e89d5fab140d00e37750ad8a44eabb1cb45d3a05)

Later in 2018, the website was **redesigned** yet again. The dynamic parts were removed, the **search system** was reintroduced and the website style's were finally [completely custom](https://github.com/30-seconds/30-seconds-of-code/blob/e89d5fab140d00e37750ad8a44eabb1cb45d3a05/docs/scss/style.scss), written in [Sass](https://sass-lang.com/).

Not much had changed in the automated workflows, except for the introduction of some intermediary steps. One such step was the creation of a [JSON file](https://github.com/30-seconds/30-seconds-of-code/blob/e89d5fab140d00e37750ad8a44eabb1cb45d3a05/snippet_data/snippets.json) via the [extractor script](https://github.com/30-seconds/30-seconds-of-code/blob/e89d5fab140d00e37750ad8a44eabb1cb45d3a05/scripts/extract.js), which could then be used as the data source for other tasks. The [Travis CI configuration file](https://github.com/30-seconds/30-seconds-of-code/blob/e89d5fab140d00e37750ad8a44eabb1cb45d3a05/.travis.yml) now contained about a dozen scripts and this was a way to speed up a lot of them.

Another experiment that was running at the time was a [snippet collection for VS Code](https://marketplace.visualstudio.com/items?itemName=30-seconds.30-seconds-of-code), generated by [another script](https://github.com/30-seconds/30-seconds-of-code/blob/e89d5fab140d00e37750ad8a44eabb1cb45d3a05/scripts/vscodegen.js). Unfortunately, publishing the collection could not be automated and required a very slow process every time a new version needed to be published. This was also discontinued later down the line.

<details>
<summary> <h3>Trivia</h3> </summary>

[DigitalOcean](https://www.digitalocean.com/) **sponsored the project** back in 2018, providing a handful of cloud machines to work with. Unfortunately, this sponsorship was never utilized and the website never got the much awaited snippet API that it was expected to get. Another sponsorship from DigitalOcean came through the next year, but unfortunately it suffered the same fate.

</details>

<h2>
  <a id="gatsby-introduction" href="#gatsby-introduction">Gatsby introduction</a>
  <small>Late 2019</small>
</h2>

<figure>

![30 seconds of code website circa Oct. 31st, 2019](/illustrations/how-30-seconds-of-code-is-deployed/gatsby-website.png)

<figcaption>
  30 seconds of code website circa Oct. 31st, 2019
</figcaption>
</figure>

**Tools:** Gatsby, React, Travis CI, Netlify · [Commit reference](https://github.com/30-seconds/30-seconds-of-code/commit/f3258d4eea951690f61c42daede52c7650309909)

The first half of 2019 was mostly quiet. However, during the summer months, [Gatsby](https://www.gatsbyjs.com/) was all the rage, so naturally 30 seconds of code followed the hype. It was also a great opportunity to move towards using [React](https://react.dev/) instead of plain HTML, which was getting hard to work with.

<figure>

![Part of the current website deployment setup in the current UI of Netlify](/illustrations/how-30-seconds-of-code-is-deployed/netlify-setup.png)

<figcaption>
  Part of the current website deployment setup in the current UI of Netlify
</figcaption>
</figure>

Instead of GitHub Pages, [Netlify](https://www.netlify.com/) was now the **platform** where the website would be deployed. This proved to be a good plan, as it allowed Travis CI to [execute the other scripts](https://github.com/30-seconds/30-seconds-of-code/blob/f3258d4eea951690f61c42daede52c7650309909/.travis.yml), whereas Netlify would [run Gatsby and deploy the website](https://github.com/30-seconds/30-seconds-of-code/blob/f3258d4eea951690f61c42daede52c7650309909/netlify.toml).

At this time, most side projects about other languages were starting to fall apart. The [30-seconds organization](https://github.com/30-seconds) seemed like the way forward, allowing **consolidation of all official repositories** and proper maintenance. Some [integration tools](https://github.com/30-seconds/integration-tools) and a [repository starter](https://github.com/30-seconds/30-seconds-starter) were provided, allowing new projects to run autonomously.

<figure>

![Current DNS setup on Namecheap, showing old subdomain setup](/illustrations/how-30-seconds-of-code-is-deployed/namecheap-subdomains.png)

<figcaption>
  Current DNS setup on Namecheap, showing old subdomain setup
</figcaption>
</figure>

Each repository maintained its own website instance, all under the same domain name, but individual **subdomains** (e.g. `css.30secondsofcode.org`). The infrastructure was pretty much the same for each repository, with unique elements such as logos and styles being maintained for each project. Subdomains were configured via the **Namecheap Advanced DNS** menu, linking each Netlify project to an appropriate subdomain.

While this allowed for every project to be presented in a similar manner, it complicated maintenance to the point where a simple text change would require 5 or more commits across different repositories. This was definitely non-feasible in the long-term.

<figure>

![SSL panel in Netlify's current UI](/illustrations/how-30-seconds-of-code-is-deployed/netlify-ssl.png)

<figcaption>
  SSL panel in Netlify's current UI
</figcaption>
</figure>

At around this time, **HTTPS** was becoming mandatory for all websites to be trusted by users and browsers. I'm not 100% certain how I obtained my **SSL certificate** before this time (I think I used [Cloudflare](https://www.cloudflare.com/) at some point, but the details are lost to time), but Netlify is kind enough to provide you with SSL certificates for each website for free. Obviously, I used their service as soon as it was available to me and never looked back.

<details>
<summary> <h3>Trivia</h3> </summary>

A lot of commits during that time are from **unrelated histories** (other repositories). You can probably tell by looking at the README logo, which features a different 30 seconds stopwatch for each project.

Getting the rights to all the repositories was not easy. Some maintainers wanted to retain their autonomy, others were completely indifferent and some were nowhere to be found. One of the repositories' original owner had disappeared from GitHub and it took a lot of searching to track the down on Reddit and ask them to transfer the repository to the organization. Luckily, nobody had any issues with the transfer and the organization filled up with content.

During this time or a little while later, Travis CI was starting to move away from its free forever model, making it harder to keep using. Eventually, credits ran out and Travis CI was dropped entirely from the infrastructure.

</details>

<h2>
  <a id="website-consolidation" href="#website-consolidation">Website consolidation</a>
  <small>Early 2020</small>
</h2>

<figure>

![30 seconds of code website circa Mar. 31st, 2020](/illustrations/how-30-seconds-of-code-is-deployed/website-consolidation.png)

<figcaption>
  30 seconds of code website circa Mar. 31st, 2020
</figcaption>
</figure>

**Tools:** Gatsby, React, Travis CI, Netlify, Git submodules, GitHub Actions · [Commit reference](https://github.com/30-seconds/30-seconds-web/commit/14d4655fe5aa6e9026ac7bf033a52029354a372a)

After contacting **Netlify** in late 2019, a generous **Open Source sponsorship** was provided. This matched their [Pro plan](https://www.netlify.com/pricing/), which allowed for far greater flexibility and expanded limits.

<figure>

![30 seconds of code Open Source plan limits in current Netlify UI](/illustrations/how-30-seconds-of-code-is-deployed/netlify-open-source-plan.png)

<figcaption>
  30 seconds of code Open Source plan limits in current Netlify UI
</figcaption>
</figure>

As mentioned previously, maintaining a handful of repositories and websites was close to impossible. The decision was taken to move the website infrastructure to its own repository (30-seconds-web) and use [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to fetch the [content repositories](https://github.com/30-seconds/30-seconds-web/blob/14d4655fe5aa6e9026ac7bf033a52029354a372a/.gitmodules) at build time.

As [GitHub Actions](https://github.com/features/actions) were available at the time, it was decided that deployment to Netlify would be **triggered via pushing** to the `production` branch. This would ultimately result in the [deployment](https://github.com/30-seconds/30-seconds-web/blob/14d4655fe5aa6e9026ac7bf033a52029354a372a/.github/workflows/deploy-production.yml) action adding an **empty commit** to the branch and forcing it to update. Netlify would then trigger a build from the branch and deploy the website.

**Git submodules** were tricky to work with, but the main advantage was that updating them to the latest commit for each repository was trivial via a [script](https://github.com/30-seconds/30-seconds-web/blob/14d4655fe5aa6e9026ac7bf033a52029354a372a/src/jobs/fetch_content_sources.sh) that could run on Netlify.

```shell
git submodule update --recursive --remote
```

What this meant was that Netlify could always fetch the latest commits from [all repositories](https://github.com/30-seconds/30-seconds-web/tree/14d4655fe5aa6e9026ac7bf033a52029354a372a/content/sources) and the web infrastructure repository didn't need to do anything. Additionally, development was also pretty simple and fetching the latest snippet data was only a few keystrokes away.

In order to make this work correctly, a [`prebuild` command](https://github.com/30-seconds/30-seconds-web/blob/14d4655fe5aa6e9026ac7bf033a52029354a372a/package.json#L78) was added to `package.json`, performing the content update whenever `npm build` (the Gatsby build) was run.

Some additional utilities and functionality were introduced at this time, such as a pretty decent **search engine**, a snippet **ranker**, a **recommendation system** etc. Some of these tools are still in use today with minor changes to [their code](https://github.com/30-seconds/30-seconds-web/tree/14d4655fe5aa6e9026ac7bf033a52029354a372a/src/engines).

<details>
<summary> <h3>Trivia</h3> </summary>

Some **new JS tools** were introduced at this time, such as Storybook and Jest for testing, alongside a handful of configuration files and utilities.

Most of the structure and logic of the original setup for the web infrastructure holds true to this day. Due to framework changes, a lot of the current conventions are a jumble of different conventions, picked up from each new tool along the way.

Until the next milestone (pun intended), numerous releases and changes were made to the web infrastructure. These are far too many and complex to talk about and some of the details have faded in my memory. Feel free to browse [30-seconds-web releases](https://github.com/30-seconds/30-seconds-web/releases) prior to [v.6.0.0](https://github.com/30-seconds/30-seconds-web/releases/tag/v6.0.0) to check them out for yourself.

During this stage, I had to make some **DNS changes**, if I remember correctly. To cut a long story short, I made a mistake that meant the website would never go live on my domain. After a very long chat with Namecheap's support, I realized that it wasn't a propagation issue that kept my website down for half a day, but a typo on my part.

</details>

<h2>
  <a id="replacing-gatsby-with-nextjs" href="#replacing-gatsby-with-nextjs">Replacing Gatsby with Next.js</a>
  <small>Early 2021</small>
</h2>

<figure>

![30 seconds of code website circa Jul. 23rd, 2021](/illustrations/how-30-seconds-of-code-is-deployed/nextjs-website.png)

<figcaption>
  30 seconds of code website circa Jul. 23rd, 2021
</figcaption>
</figure>

**Tools:** Next.js, React, Netlify, Git submodules, GitHub Actions · [Commit reference](https://github.com/30-seconds/30-seconds-web/commit/e7b2b1ebfea7727a6b50add410d285ad6bc2945f)

Gatsby's issues kept on piling up for quite a while. From the inability to upgrade between minor versions to slow [GraphQL](https://graphql.org/) queries and tons of bugs and broken builds, I sought a better tool for quite some time. [Next.js](https://nextjs.org/) was quite popular at the time and was also based on top of React and supported by [Vercel](https://vercel.com/). It seemed like a match made in heaven.

The core philosophy was still almost the same - Git submodules for content fetched by Netlify for Next.js deployments triggered via the `production` branch scheduled or triggered via a GitHub Action.

Deployments were now triggered by pushes to the `master` branch or by a cron job **scheduled daily**. Additionally, a [manual trigger](https://github.com/30-seconds/30-seconds-web/blob/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/.github/workflows/deploy-production.yml) was provided to allow for emergency deploys to be made without the need of an extra commit added to .

The extraction process used at the time might be worth explaining briefly, as it ties into the next milestone. A [handful of parsers](https://github.com/30-seconds/30-seconds-web/tree/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/parsers) were created to read and parse files, converting Markdown and plaintext into **JSON objects**. The result of parsing these content files was ultimately some instances of a few JS classes, representing the [main entities](https://github.com/30-seconds/30-seconds-web/tree/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/entities) of the project. Some concepts such as [adapters](https://github.com/30-seconds/30-seconds-web/tree/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/adapters) and [decorators](https://github.com/30-seconds/30-seconds-web/tree/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/decorations/withRecommendations) were borrowed from other frameworks. Finally, [serializers](https://github.com/30-seconds/30-seconds-web/tree/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/serializers) would take the enriched data and produce pages for each snippet, along with listings and collections.

On a side note, there's a [huge list of redirects](https://github.com/30-seconds/30-seconds-web/blob/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/public/_redirects) that is used by Netlify. This is pretty important for SEO, as it **redirects old URLs to new ones**. There are lots of artifacts in there, such as language renames, listing sorting removals, snippet renames etc. Take a look for a slice of the project's history.

Another interesting addition is the [Twitter bot](https://github.com/30-seconds/30-seconds-web/blob/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/.github/workflows/tweet.yml) workflow. This GitHub Action used a JSON file that was **randomized each deployment**, generated by a [script called chirp](https://github.com/30-seconds/30-seconds-web/blob/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/serializers/chirp/index.js). This allowed only specific snippets to be eligible and made their information available to the bot that run at specific times to post on Twitter. In order to post to Twitter, certain secret environment variables were added to the repository for the [Twitter API](https://developer.twitter.com/en/docs/twitter-api) and [Unsplash API](https://unsplash.com/developers).

Finally, the website's **sitemap** was generated manually via [a script](https://github.com/30-seconds/30-seconds-web/blob/e7b2b1ebfea7727a6b50add410d285ad6bc2945f/src/blocks/serializers/sitemap/index.js). While Next.js (and possibly Gatsby) provide convenient options to do this, not being bound to the framework except for page generation would prove to be a wise decision.

<h2>
  <a id="custom-orm-like-solution" href="#custom-orm-like-solution">Custom ORM-like solution</a>
  <small>Early 2022</small>
</h2>

<figure>

![30 seconds of code website circa Mar. 29th, 2022](/illustrations/how-30-seconds-of-code-is-deployed/custom-orm.png)

<figcaption>
  30 seconds of code website circa Mar. 29th, 2022
</figcaption>
</figure>

**Tools:** Next.js, React, jsiqle, Netlify, Git submodules, GitHub Action · [Commit reference](https://github.com/30-seconds/30-seconds-web/commit/9affd679c0a71173c1bbcc40206183c3d2b11f34)

While the infrastructure was mostly stable, the build process was slow and clunky. Inspired by Object-Relational Mappings (ORMs) (mainly [Ruby on Rails](https://rubyonrails.org/)' [ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html#what-is-active-record-questionmark)), I developed [jsiqle](https://github.com/Chalarangelo/jsiqle), which somewhat resembled an **ORM** approach to what I was previously doing with Object-Oriented Programming (OOP).

While the tool's codebase is very complicated (almost unnecessarily so), the principles are simple. **Models** are used to model individual entities with specific attributes. These models can then define **relationships**, methods and derived properties and are grouped together in a schema. **Serializers** are provided to turn these models into plain JS objects that can be written into JSON files.

Using jsiqle removed a lot of the complexity from the website repository, allowing for simple [models](https://github.com/30-seconds/30-seconds-web/tree/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/blocks/models) and [relationship definitions](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/blocks/schema.js), as well as very clean [serializers](https://github.com/30-seconds/30-seconds-web/tree/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/blocks/serializers). An [extraction process](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/blocks/extractor/index.js) handles parsing Markdown files into a large JSON (stored temporarily in `.content/conten.json`) that is then used by the [application entry point](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/blocks/application.js) to [populate the in-memory dataset](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/blocks/application.js#L385). These two steps in the preparation process could be run separately and the output of the first one could also be easily inspected.

A final step is performed via the use of serializers and writers, storing all content in individual **JSON files** inside a directory. This is then used by [Next.js's helpers](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/pages/%5Blang%5D/s/%5Bsnippet%5D.jsx) to get the paths of each page to generate.

The application entry point in itself contains a lot of magic and complicated code to make development easier and faster. Models, serializers and utilities, for example, are **loaded automatically** and **exposed globally** via the `Application` object, allowing them to be accessed anywhere.

One of the conveniences afforded by jsiqle is the ability to have an interactive Node.js terminal (via the [`npm console`](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/package.json#L61) command). This allows developers to **query the extracted dataset**, much like they can do in the Ruby on Rails console.

<details>
<summary> <h3>Trivia</h3> </summary>

jsiqle originally stood for *JavaScript In-memory Query Language with Events*. The "with Events" part is no longer true, though.

Due to the way a lot of the website works, **Google Analytics** were only loaded if the user has accepted cookies. Some [complex and quirky code](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/pages/_app.jsx) had been added to send those initial page views, when appropriate.

If you look at the document template for Next.js, you will notice [this line](https://github.com/30-seconds/30-seconds-web/blob/9affd679c0a71173c1bbcc40206183c3d2b11f34/src/pages/_document.jsx#L14) (`<script>0</script>`). To this day, I have no clue why this worked or who suggested it, but it fixed some really obscure server-side rendering (SSR) problem or something similar.

</details>

<h2>
  <a id="replacing-nextjs-with-astro" href="#replacing-nextjs-with-astro">Replacing Next.js with Astro</a>
  <small>Early 2023</small>
</h2>

<figure>

![30 seconds of code website circa Apr. 10th, 2023](/illustrations/how-30-seconds-of-code-is-deployed/astro-website.png)

<figcaption>
  30 seconds of code website circa Apr. 10th, 2023
</figcaption>
</figure>

**Tools:** Astro, jsiqle, Netlify, Git submodules, GitHub Actions · [Commit reference](https://github.com/30-seconds/30-seconds-web/commit/4dbad9aa9c2cdb6267eeeb92518067e7e4d3c6be)

Next.js was starting to get in the way more so than anything else. React was also not necessary in most cases, slowing down the page. A return to **static site generation** (SSG) was justified, and [Astro](https://astro.build/) was the perfect tool, combining flexibility and simplicity.

The migration from Next.js was surprisingly easy and adapting React components to Astro ones didn't take nearly as long as I expected. This resulted in a very **similar repository structure** and build process as the one before it.

A point of relative interest at this stage would be the [omni search component](https://github.com/30-seconds/30-seconds-web/blob/4dbad9aa9c2cdb6267eeeb92518067e7e4d3c6be/src/components/Omnisearch.js), built using the Web Components standard, allowing for a very dynamic component written in plain JS, without React or other similar frameworks.

<figure>

![Website deploys in current Netlify UI](/illustrations/how-30-seconds-of-code-is-deployed/netlify-deploys.png)

<figcaption>
  Website deploys in current Netlify UI
</figcaption>
</figure>

As Astro is essentially a templating language with a static site generator built-in, builds were now running faster and the website's **performance and SEO** were improved.

Speaking of performance, both Astro and Next.js provide some asset optimization tooling, yet I chose to [roll up my own](https://github.com/30-seconds/30-seconds-web/blob/4dbad9aa9c2cdb6267eeeb92518067e7e4d3c6be/src/blocks/writers/assetWriter.js). Assets are loaded from a content repository and are then processed via [sharp](https://sharp.pixelplumbing.com/), producing lower resolution images ready for the web, as well as images in the [WebP format](https://developers.google.com/speed/webp). These are then stored in a temporary directory (`.assets`) and used for development, without being regenerated every time the `predev` command runs (already generated assets are skipped). If the build is in a **production environment** (Netlify), the assets are also copied to the `public` directory to be served as part of the website.

<details>
<summary> <h3>Trivia</h3> </summary>

Initially, I was looking into [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) as a replacement for React and Next.js. I stumbled upon Astro by accident and decided to give it a quick try. Surprisingly, I liked it far more than I expected and, due to a very **simple migration process**, I opted to use it.

</details>

<h2>
  <a id="content-repository-merge" href="#content-repository-merge">Content repository merge</a>
  <small>Mid 2023</small>
</h2>

<figure>

![30 seconds of code website circa Jul. 16th, 2023](/illustrations/how-30-seconds-of-code-is-deployed/content-repo-merge.png)

<figcaption>
  30 seconds of code website circa Jul. 16th, 2023
</figcaption>
</figure>

**Tools:** Astro, jsiqle, Netlify, Git submodules, GitHub Actions · [Commit reference](https://github.com/30-seconds/30-seconds-web/commit/01fc99181b01a8b208d06aa399e40ac2bb6551f7)

As community contributions were way lower, maintaining a handful of content repositories wasn't justified. Additionally, structural changes to how Markdown files were written required committing changes to 5 different repositories - a problem I was all too familiar with.

Merging all content repositories sounded exciting, yet I had no idea how to do so or if it was even possible. In fact, I thought it wasn't possible at all. Luckily, I found [an article](https://hacks.mozilla.org/2022/08/merging-two-github-repositories-without-losing-commit-history/) online outlining the process. What it all boils down is essentially adding the other repository as a remote locally and merging its `master` branch into the current `master` branch with the `--allow-unrelated-histories` flag.

```shell
git merge swtest/gh-pages --allow-unrelated-histories
```

After that point, the website repository's [submodules](https://github.com/30-seconds/30-seconds-web/blob/01fc99181b01a8b208d06aa399e40ac2bb6551f7/.gitmodules) were removed and only one was left in order to allow for the automated content fetching on Netlify to continue as it always did.

<details>
<summary> <h3>Trivia</h3> </summary>

**Merging unrelated histories** makes it really hard to follow changes and makes the git tree almost unusable. It also makes issue and pull request references reference the new repository instead of the original one. Don't do it, kids, it's not worth it most of the time.

</details>

<h2>
  <a id="website-and-content-repository-merge" href="#website-and-content-repository-merge">Website & content repository merge</a>
  <small>Late 2023</small>
</h2>

<figure>

![30 seconds of code website circa Sep. 25th, 2023](/illustrations/how-30-seconds-of-code-is-deployed/website-repo-merge.png)

<figcaption>
  30 seconds of code website circa Sep. 25th, 2023
</figcaption>
</figure>

**Tools:** Astro, jsiqle, Netlify, GitHub Actions · [Commit reference](https://github.com/30-seconds/30-seconds-of-code/commit/0b2b29c27948fd03112d38896776791bc2bdfc75)

After all the changes back and forth, it was starting to become clear that the separation between website infrastructure and content made little to no sense. The unrelated histories merge strategy was used once again, retaining the exact structure of the website repository. The `content` directory, previously containing git submodule references, now contained the raw content files.

This change created some new challenges, such as builds only triggering for website code changes and not for content changes. Accomplishing this required a simple revamp of the GitHub Actions I had created.

The scheduled and manual deploy workflows were [merged into one](https://github.com/30-seconds/30-seconds-of-code/blob/0b2b29c27948fd03112d38896776791bc2bdfc75/.github/workflows/deploy-production.yml). This **workflow** triggers as needed via cron or manual action and will always trigger a deployment to Netlify via a commit in the `production` branch. The [push-based workflow](https://github.com/30-seconds/30-seconds-of-code/blob/0b2b29c27948fd03112d38896776791bc2bdfc75/.github/workflows/deploy-production-push.yml), however makes use of the [Paths Changes Filter](https://github.com/marketplace/actions/paths-changes-filter), along with some **rules** to only trigger deployments if any of the website-related files have changed. This prevents minor changes in content files triggering a deployment. Finally, both workflows now output the [triggering event](https://github.com/30-seconds/30-seconds-of-code/blob/0b2b29c27948fd03112d38896776791bc2bdfc75/.github/workflows/deploy-production-push.yml#L25) as part of the commit message, so that it's easier to track what caused a deployment.

<figure>

![Changing the deployment repository in Netlify's UI](/illustrations/how-30-seconds-of-code-is-deployed/netlify-deploy-change.png)

<figcaption>
  Changing the deployment repository in Netlify's UI
</figcaption>
</figure>

Another point of interest is the changes that I had to make to the **Netlify configuration**. I was very skeptical if this would require a lot of manual work, but luckily I could change the repository I deploy from via the platform's UI. This only took a couple of minutes, caused no downtime for the website and needed no DNS changes, as everything was already configured.

<details>
<summary> <h3>Trivia</h3> </summary>

I was at the time working on some new GitHub Actions that would allow for pull request QA checking, making content curation much simpler. These would be canned later, as community contributions were put on the back burner.

Towards the end of this period, I transferred the 30-seconds-of-code repository back to my personal account. **Links to the previous URL** will link to the new one, as long as the **organization** still exists on GitHub, which is the reason why I'm not deleting it.

</details>

<h2>
  <a id="quality-of-life-improvements" href="#quality-of-life-improvements">Quality of life improvements</a>
  <small>Late 2023</small>
</h2>

<figure>

![30 seconds of code website circa Dec. 20th, 2023](/illustrations/how-30-seconds-of-code-is-deployed/qol-improvements.png)

<figcaption>
  30 seconds of code website circa Dec. 20th, 2023
</figcaption>
</figure>

**Tools:** Astro, jsiqle, Netlify, GitHub Actions · [Commit reference](https://github.com/Chalarangelo/30-seconds-of-code/commit/f7ed6b420f6c1c5984c511b813c00fe1b3b6fcda)

During the last few months of 2023, a lot of quality of life changes were made to the website, affecting end users (UI changes), authors (content creation tooling), infrastructure (content parsing and building) and development (**hot reloading** and content queries).

Some changes that were made include, but are not limited to, [an updated MarkDown parser](https://github.com/Chalarangelo/30-seconds-of-code/commit/9e4c3b62f78d4bb6c069ce0f169108322c1a568e), the addition of [automated CodePen embeds](https://github.com/Chalarangelo/30-seconds-of-code/commit/c54928cb23749ad42af3d27100d666e6f8a11539), [GitHub-style admonitions](https://github.com/Chalarangelo/30-seconds-of-code/commit/ec7fc8fed546a91613d6c2bc58cd5408ae31c17c), [watch mode for content hot reloading](https://github.com/Chalarangelo/30-seconds-of-code/commit/73165a2a767b8db4e317edbccde64e2834f998a7), and [prepared queries for the console](https://github.com/Chalarangelo/30-seconds-of-code/commit/2f63fa20ff22d6bc15dd1948466aee9fe05ed708).

Additionally, the codebase was **migrated to ESM**, while a rewrite and restructure was done to ensure everything worked as intended. Finally, some **unnecessary integrations** (Google Ads, Google Analytics) and infrastructure parts (icon font, second content font, multiple format images, executable snippet code) were removed from the codebase altogether.

<details>
<summary> <h3>Trivia</h3> </summary>

Some of the [remark](https://github.com/remarkjs/remark) **plugins** were (and still are) written in a very trial-and-error sort of way, where I try to figure out what nodes are produced by the parser and what I can do to transform them. I often resort to adding raw HTML into the output, which is not ideal and could definitely be improved.

[CodePen](https://codepen.io/) embeds needed some styling, as to not clash with the website color palette. The [documentation](https://blog.codepen.io/docs/embeds/themes/) for embedding and using them is scattered around, outdated and often incorrect. I had to delve into code and tinker a bit with them to get it right.

**Watch mode** was implemented in an arbitrary fashion, making it slow and a little fiddly. However, it provided enough utility to keep around until later iterations, where I could make it more elegant and practical for my needs.

</details>

<h2>
  <a id="rewrite-in-ruby-on-rails" href="#rewrite-in-ruby-on-rails">Rewrite in Ruby on Rails</a>
  <small>Mid 2024</small>
</h2>

<figure>

![30 seconds of code website circa Jul. 25th, 2024](/illustrations/how-30-seconds-of-code-is-deployed/ruby-on-rails.png)

<figcaption>
  30 seconds of code website circa Jul. 25th, 2024
</figcaption>
</figure>

**Tools:** Astro, Ruby on Rails, SQLite, Netlify, GitHub Actions · [Commit reference](https://github.com/Chalarangelo/30-seconds-of-code/commit/227f510a40a8e4976fa38e154435a60574dc456b)

After about 6 months of working on cleaning up and consolidating content, I decided to try an infrastructure change, namely rewriting all of the backend code in [Ruby on Rails](https://rubyonrails.org/). The idea was to create a JS - Ruby on Rails - JS (Astro) sandwich.

The first JS part would be responsible for **parsing MarkDown and highlighting content**, much like before, so I wouldn't have to replace this part of the infrastructure, which worked well. The output of this step would be a **JSON file**, same as before. Some optimizations were made to parallelize code execution and separate this logic into what was essentially a standalone module that could run, process input, finish and exit.

Ruby on Rails would then **replace the jsiqle part**, using its [ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html) and [SQLite](https://sqlite.org/) to load the JSON data into a **persistent storage**. The SQLite storage would be treated as a throwaway layer, meaning it would be regenerated on application restart. This allowed the code to interface nicely with the latest data and easily use ActiveRecord helpers.

Finally, rake tasks and serializers were used to output JSON data in the same structure as before to then feed into Astro.

<details>
<summary> <h3>Trivia</h3> </summary>

While this approach made it a lot easier to query data and optimize structures, it was relatively slow, mainly due to the **I/O overhead** needed for the additional SQLite step.

Build times with Ruby on Rails were about 3x slower than JS prior to them and about 4x slower than the optimized JS code that shipped after the next refactor.

Migrating from JS to Ruby on Rails provided a great opportunity to **separate concerns** and build steps into the initial parsing (JS), data processing for serialization (Ruby on Rails) and Static Site Generation (Astro). This allowed for further refactors, where these three steps are separate.

Due to the way the refactored codebase was set up, I never managed to crack the code of how to add a watch mode. This, however, wasn't a problem, as this setup was really short-lived.

</details>

<h2>
  <a id="rewrite-back-in-plain-js" href="#rewrite-back-in-plain-js">Rewrite back in plain JS</a>
  <small>Late 2024</small>
</h2>

<figure>

![30 seconds of code website circa Dec. 14th, 2024](/illustrations/how-30-seconds-of-code-is-deployed/back-to-js.png)

<figcaption>
  30 seconds of code website circa Dec. 14th, 2024
</figcaption>
</figure>

**Tools:** Astro, Netlify, GitHub Actions · [Commit reference](https://github.com/Chalarangelo/30-seconds-of-code/commit/1d4f3e031094a57dc7af6e02306505904ba0f6f1)

Seeing that Ruby on Rails was slow for my use case, I started migrating the Ruby code back to JS. The Ruby on Rails directory structure provided a great way of organizing files, logic and figuring out what goes where, so I kept most of the conventions and structures intact.

Porting from Ruby back to JS took about a week, right before the summer break, and it was not particularly hard, as I was relatively fluent in both languages. The **performance** improved quite a bit, even compared to the setup I had prior to the Ruby on Rails rewrite.

A notable update at this time is the **custom model system** I developed, inspired by the previous ActiveRecord implementation, which is thoroughly documented in the [Modeling complex JavaScript objects](https://www.30secondsofcode.org/js/complex-objects/p/1/) series of articles, written in late 2024. This system essentially replaced jsiqle, which was far too slow due to the usage of `Proxy` and being agnostic, while a custom-tailored built-in solution was way faster. The performance increase was only compounded by the use of **new JS features** (e.g. [static initialization blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks)) that made the code more robust, less verbose and significantly more customizable.

I kept working on small changes, while revising content, for a few months, most notably adding a **better watch mode**. The new watch mode watches all files under the `content` directory for changes. When a change is detected, the JSON data needed for Astro is recalculated on the fly, by rerunning the entire processing pipeline, skipping assets and other things that aren't important to improve response times.

<details>
<summary> <h3>Trivia</h3> </summary>

**Notifying Astro about changes** in content was tricky. To circumvent the issue, I devised a trick where a `timestamp.js` file is [generated](https://github.com/Chalarangelo/30-seconds-of-code/commit/109a3c06609807eaf88b5fb3edb0b6efb770e65d) at the end of each content rebuild. This is then [imported](https://github.com/Chalarangelo/30-seconds-of-code/commit/e450370c4e070a45fb00000647c787060646a6e5) into Astro, so that it notices a dependency change and it will reload the page.

The new watch mode delivered a **near-instant editing experience**, where switching from VS Code to Chrome (literally under a second) would be enough to rebuild the content and trigger an Astro page refresh, on a MacBook Air M1.

During this time, the **Update Logs** functionality and announcement on the home page was introduced, allowing for a more personal touch.

While the **2-step content preparation** (MarkDown parsing, serialization from models) was still made up of distinct, decoupled steps, the watch mode didn't make use of this separation. To this day, the separation of the layers is intact, yet only needed as a means to debug parts of the pipeline more easily during development of new features.

In late December, I redesigned [my personal portfolio website](https://www.chalarangelo.me/) to match the style and color palette of 30 seconds of code, as part of the greater strategic shift in the **brand narrative** (30 seconds of code now being a personal blog and all that) to feel more concise and like part of the website itself. Fun fact: My personal portfolio website also doubles as a printable CV, with custom print styles to be easily exported to PDF.

</details>

<h2>
  <a id="functionality-extensions" href="#functionality-extensions">Functionality extensions</a>
  <small>Early 2025</small>
</h2>

<figure>

![30 seconds of code website circa Jun. 11th, 2025](/illustrations/how-30-seconds-of-code-is-deployed/functionality-extensions.png)

<figcaption>
  30 seconds of code website circa Jun. 11th, 2025
</figcaption>
</figure>

**Tools:** Web Components, Astro, Cloudflare, GitHub Actions · [Commit reference](https://github.com/Chalarangelo/30-seconds-of-code/commit/dff11ff1b2658e5c54783afd5e8459281728c698)

In the months that followed, I focused more on content rather than infrastructure. However, as I focused on larger projects, I also liked tackling more challenging tasks, which also lead to some infrastructure projects that really upgraded the website.

One such project was the [complete search overhaul](https://github.com/Chalarangelo/30-seconds-of-code/commit/91e518b9861ba42ba67b2f451bd69ab674ec9d04), as the previous search system dated back to early 2020 and was **severely underpowered** for the now long-form content and the the sheer amount of articles it had to serve. I developed a new Natural Language Processing (**NLP**) solution with TF-IDF for this purpose, building a [document index](https://github.com/Chalarangelo/30-seconds-of-code/commit/3d39921715380d59e12d0fc413a2e24866794e38), inspired by [ElasticSearch](https://www.elastic.co/elasticsearch), which was later enhanced with [partial matching via n-grams](https://github.com/Chalarangelo/30-seconds-of-code/commit/a1347e49664eeadfe9da6c809a31ea094a0170b0). The new search journey is documented in [this series of articles](https://www.30secondsofcode.org/js/search/p/1/), written at around the same time as the implementation.

Another major overhaul was the removal of [PrismJS](https://prismjs.com/) in favor of [Shiki](https://shiki.style/) for code highlights. This provided better grammars and syntax highlighting, allowing for more accurate, VS Code-like highlights. It also unlocked many new features, such as [bracket pair colorization](https://github.com/Chalarangelo/30-seconds-of-code/commit/d411ae205fe12c8941dd94fd8844d408c1529b75), [line highlights](https://github.com/Chalarangelo/30-seconds-of-code/commit/dda86b50796ba07ffad03fd38edc4589c1e9a1d2), [collapsible code blocks](https://github.com/Chalarangelo/30-seconds-of-code/commit/08a2313be3d5370d4a4b5cb2a8cfdcd9cd72f39e) etc.

Moreover, another addition was support for **Web Components** to enhance the content on various pages. These include, but are not limited to, the [table of contents scroll spy](https://github.com/Chalarangelo/30-seconds-of-code/commit/7afca7cdbf3116109225cf575a2373b9266bf61a), [code tabs](https://github.com/Chalarangelo/30-seconds-of-code/commit/acbba90f58edef0ec50bc63c6c6f9f4eac0ad142), dynamic [LaTex support](https://github.com/Chalarangelo/30-seconds-of-code/commit/77c59bf72ca0caaf63b030745fa4cf9fee210042), [Baseline support](https://github.com/Chalarangelo/30-seconds-of-code/commit/b399ce4ccd0be3e1affce0666afafe4b485167d8) and [step visualization](https://github.com/Chalarangelo/30-seconds-of-code/commit/760362746933ffb01f5cd8492d76a701e2de10be). All components are [loaded dynamically](https://github.com/Chalarangelo/30-seconds-of-code/commit/244ef625fb14e873fe86864218e20c864bd2d5b0), as needed, alongside their CSS via ECMAScript Modules (ESM), while having accessible fallbacks, in case anything goes wrong. Apart from these, I also developed [a way to link to different articles and collections via custom MarkDown syntax](https://github.com/Chalarangelo/30-seconds-of-code/commit/a56818a6ce5fcc01a47c6d5b4a673c2331e0b0ad), allowing for more interesting links between articles.

Finally, I moved the website to [Cloudflare Pages](https://pages.cloudflare.com/) for hosting, as it provided a better experience and more features than Netlify (namely **integrated Web Analytics** and **AI Bot protection**). The website is now served from [Cloudflare](https://www.cloudflare.com/)'s edge network, which provides faster load times and better performance. Their bandwidth and usage limits are pretty generous, so I don't expect to run into any issues with the current traffic any time soon. The whole migration process took just one evening, with most of the issues I faced being related to DNS setup that I'm not particularly good at.

<details>
<summary> <h3>Trivia</h3> </summary>

I plan to enhance the NLP setup to later introduce topic modeling, embeddings and dynamic personalized recommendations, based on the current user session.

The search system still runs on the client, using a serialized JSON. I kept the original setup mostly intact, however I had to find a good balance between quickly setting it up on the client and minimum network load. I settled a **frequency mapping system** that makes it easier to reconstruct the document index on the client, without having to serialize huge loads of data for it (e.g. `i:2 know:2 that nothing`).

Shiki's codebase is a little tricky to browse and the documentation wasn't very accessible for my needs. I ended up reading most of the codebase to make sense of it. I also didn't like how some official transformer plugins were implemented, so I rolled up my own whenever possible ([example](https://github.com/Chalarangelo/30-seconds-of-code/commit/836f0030422cf599bee6e48d1455f064a43cb26a)).

I wanted code tabs to work in the most frictionless way possible. This meant that I had to use a `details` element to wrap them, which made me resort to some pretty clever and complicated hacks to make them work. A simplified implementation is documented [here](https://www.30secondsofcode.org/css/s/details-tabbed-content/).

[LaTex](https://www.latex-project.org/) libraries are extremely heavy, so build times, especially in watch mode are terrible. It's not optimal to **load the library on the client side**, but it only happens in the few (~10) articles that need it and is also cached by the browser.

Remember how I removed PrismJS? Well, I lied... a little! Watch mode _still_ uses it in the form of a Web Component for faster edit time page refreshes. There is [now](https://github.com/Chalarangelo/30-seconds-of-code/commit/9ce26be52b8423da550268d0b929368edb4085a9) a `watch` mode and an `observe` mode, using PrismJS and Shiki respectively.

I [updated Sass to the latest version](https://github.com/Chalarangelo/30-seconds-of-code/commit/6f172b24f542be8b64731d9711bbeff51d7fa945) at this time and I gotta say their automatic migration tools and migration guidelines are a breeze to follow.

A lot of these later updates are documented in the website's [Update Logs](https://www.30secondsofcode.org/update-logs/p/1/).

</details>

---

Phew! That was a ton of information, especially considering it's almost 8 years worth of work, mistakes, learnings and experiments. I hope you found this article interesting and that you'll take away some useful insights that you can apply to your own projects. See you in the next one! <span class="wave">👋</span>

