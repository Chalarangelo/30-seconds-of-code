![alt text](https://raw.githubusercontent.com/TylerBarnes/gatsby-plugin-transition-link/master/images/gatsby-plugin-transition-link.png "Gatsby Plugin Transition Link logo")

# Gatsby Plugin Transition Link

TransitionLink provides a simple api for describing expressive transitions between pages in [Gatsbyjs](https://www.gatsbyjs.org/). Page links are used to determine which transition should fire, making page transitions flexible and easy to use.

TransitionLink is compatible with declarative react animation libraries like [react-pose](https://popmotion.io/pose/) and [react-spring](https://react-spring.surge.sh/). It's also compatible with imperative animation libraries like [gsap](https://greensock.com) and [anime.js](http://animejs.com/)

## Sites that use TransitionLink

- [incentro.com](https://www.incentro.com/en/)
- [peintagone.be](https://www.peintagone.be/)
- [strandrover.com](https://strandrover.com/)
- [hiddenwork.ca](https://www.hiddenwork.ca/)
- [Demo site](https://gatsby-plugin-transition-link.netlify.com/)
- [bare.ca](https://bare.ca/)
- [TransitionLink docs](https://transitionlink.tylerbarnes.ca/) [[source]](https://github.com/TylerBarnes/TransitionLinkDocs/)
- [Edit this file to add yours!](https://github.com/TylerBarnes/gatsby-plugin-transition-link/blob/master/readme.md)

## Features

- Per-Link transitions
- Fine control of page mounting and unmounting timing
- Function or state based transitions with `<TransitionLink />`
- Transition state and status with `<TransitionState />` and in your page & template props
- Display animation content above your pages with `<TransitionPortal />`
- Use default transitions with `<AniLink />`

## Usage

For info on using TransitionLink refer to [the docs](https://transitionlink.tylerbarnes.ca/). The source for the docs site is available [here](https://github.com/TylerBarnes/TransitionLinkDocs/).

## Contributing

0. Make sure you have `yarn` installed.
1. Create a new folder to be used as your yarn workspace. `mkdir transitionlink-workspace`
1. Inside your workspace folder, clone this repo.
1. `cd` into this repo and run `yarn && yarn watch`. Leave this terminal window open.
1. Beside this repo in your workspace folder, add a gatsby site that uses transition link for testing purposes (you can copy/paste the example site from this repo if needed).
1. In your workspace folder create a package.json and add the following:

```
{
	"private": true,
	"workspaces": [
		"example", <-- the name of your test site folder
		"gatsby-plugin-transition-link/lib"
	]
}
```

6. In a new terminal window, `cd` to your workspace folder and run `yarn && yarn workspace example run develop`.

Now when you make changes to the TransitionLink src folder, they will reflect in your project.

Please use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) specification for your commit messages.

Feature requests and PR's are welcome! If you're having a problem please leave an issue and I'll help you out asap.
