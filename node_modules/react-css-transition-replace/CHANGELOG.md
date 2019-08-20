### Next


### v3.0.3 (25 April 2017)

* [UPGRADE] Update dependencies to latest stable versions.
* [ENHANCEMENT] Remove the `react-transition-group` dependency. (#56)

### v3.0.2 (7 October 2017)

* [BUGFIX] Fix updating children when the current child re-renders itself. (#53)

### v2.2.2 (6 October 2017)

* [UPGRADE] Support React 16 in v2. (#55 thanks @GeKrom)

### v3.0.1 (2 October 2017)

* [BUGFIX] Prevent animating child selection with CSS rather than clearing with JS so form inputs don't lose focus on each update. (#50)
* [BUGFIX] Switch the container to relative positioning on the render before the transitions start to avoid the glitch 
           in Edge without using permanent relative positioning which is not an option. (#52)
* [DOCS] Add an example where the height transition is delayed until after the leave transition. (#43)

### v3.0.0 (27 August 2017)

##### Breaking change

* [FEATURE] The `isLeaving` prop is only added to children if opted in with `notifyLeaving={true}` since it's 
            a departure from `react-transition-group` features.

##### Non-breaking changes

* [ENHANCEMENT] Treat a child rendering `null` as if there is no child; specifically helps avoid errors with RR4.
* [ENHANCEMENT] Maintain component callback refs by not overwriting with string refs similar to `react-transition-group`.
* [ENHANCEMENT] Use `requestAnimationFrame` to queue the height transition rather than a timeout.
* [ENHANCEMENT] Handle the enter and leave animation of changes due to successive child updates before the current transition ends.
* [ENHANCEMENT] Clear the selection after transitions to avoid the child being selected after multiple clicks.
* [ENHANCEMENT] Entering child renders with absolute positioning since switching from relative to abs on a premature leave cancels the active enter animation.
* [ENHANCEMENT] Fix enter animation of absolutely positioned elements in Chrome not working by skipping one animation frame in the Child component.
* [ENHANCEMENT] Fix Edge glitch when render starts by always applying container `position`, `display` (use a `div`) and `overflow` styles.

### v2.2.1 (29 April 2017)

* [UPGRADE] Add a `yarn` lock file.
* [UPGRADE] Use `prop-types` instead of `React.PropTypes` for React `15.5.0`.
* [UPGRADE] Use `react-transition-group/CSSTransitionGroup` instead of `react-addons...` (thanks @ali) (#45)

### v2.2.0 (27 February 2017)

* [FEATURE] Remove element at once when transitionLeave is false. (thanks @wifilinker) (#34)
* [FEATURE] Use next component sizes when current does not exist. (thanks @wifilinker) (#34)
* [BUGFIX] Avoid silencing transition when this.state.nextChild exists. (thanks @wifilinker) (#34)
* [FEATURE] Add class with `-height-active` suffix when transitioning. (thanks @wifilinker) (#34)
* [BUGFIX] Exclude `gh-pages` from the npm package. (#37)
* [BUGFIX] Remove comma dangle after rest property. (#39)

### v2.1.0 (6 December 2016)

* [FEATURE] Add the `changeWidth` prop to have the container width animated along with the height. (thanks @wifilinker) (#31)
* [UPGRADE] Upgrade dev dependencies to latest versions; `react-bootstrap@0.30.5` fixes the demo unknown props warnings.

### v2.0.1 (14 September 2016)

* [DOCUMENTATION] Minor grammar improvement in the README.

### v2.0.0 (14 September 2016)

* [ENHANCEMENT] Add support for IE<=11 (thanks @le0nik) (#22, #23)
* [ENHANCEMENT] Provide an `isLeaving` prop on the current child component while it is leaving. (thanks @le0nik)
* [ENHANCEMENT] Add ability to provide custom `height` className (useful for `css-modules`) (thanks @le0nik) (#20, #21)
* [BUGFIX] Fix multiple remounts of children (thanks @le0nik) (#24)
* [BUGFIX] Allow the child, that is leaving, to be `null` (thanks @le0nik)

### v1.3.0 (9 July 2016)

* [ENHANCEMENT] When removing an element just added to an empty container transitions are reset to avoid getting stuck.
* [ENHANCEMENT] When starting a height transition and the entering element hasn't rendered wait another tick. (#6,#10)
* [ENHANCEMENT] Don't pass non-standard DOM props to the component as required by `react 15.2.0`. (#17)
* [UPGRADE] Use `react@15.2.0` and upgraded dev dependencies. (Should still work with `react@0.14` with `npm` warnings)
* [ENHANCEMENT] Use the spread operator rather than `object-assign`. (#16)

### v1.2.0-beta (18 April 2016)

* [UPGRADE] Add peer dependency `react@15.0.1`.
* [ENHANCEMENT] Add a `displayName` field.

### v1.1.2 (9 April 2016)

* [UPGRADE] Use the `object-assign` lib, as [React 15 does](https://github.com/facebook/react/pull/6376), rather
            than `react/lib/Object.assign` which has been removed. (#14)

### v1.1.1 (4 April 2016)

* [BUGFIX] Corrected the file name in the `main` field of package.json. (#13)
* [BUGFIX] Allow prop `transitionName` to be of type `object`. (#9,#12)
* [DOCUMENTATION] Added a Hardware Acceleration example to the README. (#8)
* [DOCUMENTATION] Add a note that `transitionAppear` is also supported. (#7)

### v1.1.0 (24 November 2015)

* [ENHANCEMENT] The entering component, which is absolutely positioned, is not only positioned with `top:0` and `left:0`
                styles, but also `right:0` and `bottom:0` so smaller content fills the entire container.

### v1.0.1 (24 November 2015)

* [ENHANCEMENT] Support no children so the child component can be removed / added. (#4)
* [ENHANCEMENT] Added an add/remove content section to the demo and docs.

### v1.0.0 (8 November 2015)

* [ENHANCEMENT] Publish the demo page on [`gh-pages`](http://marnusw.github.io/react-css-transition-replace/).
* [ENHANCEMENT] Added a demo page; to view run `npm install` and `gulp demo`.
* [ENHANCEMENT] Allow in place transitions fully configurable in CSS.
* [ENHANCEMENT] Use `ReactCSSTransitionGroupChild` rather than defining yet another child wrapper.
* [ENHANCEMENT] More stable implementation which does not call `setState` in `componentDidUpdate` among other improvements.
 
### v0.2.1 (26 October 2015)

* [UPGRADE] Upgrade React.js to v0.14.0.
 
### v0.2.0 (28 September 2015)

* [DEPENDENCY] Removed the `classnames` dependency. 
* [ENHANCEMENT] The `${transitionName}-height` class is only added while the height transition is active.
* [ENHANCEMENT] The `ReactCSSTransitionReplace` component require `transitionEnterTimeout` etc. props like `ReactCSSTransitionGroup`.
* [UPGRADE] Upgrade React.js to v0.14.0-rc1.

### v0.1.4 (9 September 2015)

* [BUGFIX] Using React's `object.assign` method to be ES5 compatible which was the intent. (#2)

### v0.1.3 (12 August 2015)

* [BUGFIX] Added the `classnames` dependency to `package.json`. (#1)
* [ENHANCEMENT] The `style` prop rules are maintained while animating, only overriding the necessary style rules.
* [ENHANCEMENT] Stricter and fully configured linting rules.
* [DOCUMENTATION] Fixed a typo.

### v0.1.2 (10 August 2015)

Initial release.
