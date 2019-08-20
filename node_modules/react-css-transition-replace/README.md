# React CSS Transition Replace

A [React](http://facebook.github.io/react/) component to animate replacing one element with another.

While [`ReactCSSTransitionGroup`](https://facebook.github.io/react/docs/animation.html) does a great job
of animating changes to a list of components and can even be used to animate the replacement of one item
with another, proper handling of the container height in the latter case is not built in. This component 
is designed to do exactly that with an API closely following that of `ReactCSSTransitionGroup`.

Using `react-css-transition-replace` provides two distinct benefits:

 - It automatically handles the positioning of the animated components, and
 - *allows changes in the height of container to be handled and animated with ease when 
   various content heights differ, even when absolute positioning is used.*

Animations are fully configurable with CSS, including having the entering component wait to enter until 
the leaving component's animation completes. Following suit with the 
[React.js API](https://facebook.github.io/react/docs/animation.html) the one caveat is 
that the transition duration must be specified in JavaScript as well as CSS.

[Live Examples](http://marnusw.github.io/react-css-transition-replace) | 
[Change Log](/CHANGELOG.md) | 
[Upgrade Guide](/UPGRADE_GUIDE.md) 


## Installation

Install via `npm`:

```
npm install --save react-css-transition-replace
```


## Usage

A `ReactCSSTransitionReplace` component can only have a single child. Other than that, the basic usage 
follows the exact same API as `ReactCSSTransitionGroup`, with support for `transitionEnter`, `transitionLeave`
and `transitionAppear`. When the `key` of the child component changes, the previous component is animated out 
and the new component animated in. During this process:

 - All leaving components continue to be rendered; if the animation is slow there may be multiple components
   in the process of leaving.
 - The entering component is positioned on top of the leaving component(s) with `absolute` positioning.
 - The height of the container is set to that of the leaving component, and then immediately to that of the 
   entering component. If the `transitionName` is a `String` the `{animation-name}-height` class name is applied 
   to it, and if `transitionName` is an `Object` the `transitionName.height` class will be used if present.
 - The leaving component will be passed an `isLeaving` prop while transitioning out.

This provides many possibilities for animating the replacement as illustrated in the examples below.

Additionally, the boolean property `changeWidth` can be used to animate changing the width of the component. 
This change will happen at the same time as changing the height. Animating this change should be done using
the same class name as is used for animating the change in height.

It is also possible to remove the child component (i.e. leave `ReactCSSTransitionReplace` with no children)
which will animate the `height` going to zero along with the `leave` transition. Similarly, a single child 
can be added to an empty `ReactCSSTransitionReplace`, triggering the inverse animation.

By default a `span` is rendered as a wrapper of the child components. Each child is also wrapped in a `span`
used in the positioning of the actual rendered child. These can be overridden with the `component` and 
`childComponent` props respectively.

### Cross-fading two components

The `ReactCSSTransitionReplace` component is used exactly like its `ReactCSSTransitionGroup` counterpart:

```javascript
import ReactCSSTransitionReplace from 'react-css-transition-replace';

render() {
  return (
    <ReactCSSTransitionReplace transitionName="cross-fade" 
                               transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
      <SomeComponent key="uniqueValue"/>
    </ReactCSSTransitionReplace>
  );
}
```

To realize cross-fading of two components all that remains is to define the enter and leave opacity 
transitions in the associated CSS classes:

```css
.cross-fade-leave {
  opacity: 1;
}
.cross-fade-leave.cross-fade-leave-active {
  opacity: 0;
  transition: opacity 1s ease-in;
}

.cross-fade-enter {
  opacity: 0;
}
.cross-fade-enter.cross-fade-enter-active {
  opacity: 1;
  transition: opacity 1s ease-in;
}

.cross-fade-height {
  transition: height .5s ease-in-out;
}
```

Note the additional `.cross-fade-height` class. This indicates how the container height is to be
animated if the heights of the entering and leaving components are not the same. You can see this
in action [here](http://marnusw.github.io/react-css-transition-replace#cross-fade).

### Fade out, then fade in

To fade a component out and wait for its transition to complete before fading in the next, simply
add a delay to the `enter` transition.

```css
.fade-wait-leave {
  opacity: 1;
}
.fade-wait-leave.fade-wait-leave-active {
  opacity: 0;
  transition: opacity .4s ease-in;
}

.fade-wait-enter {
  opacity: 0;
}
.fade-wait-enter.fade-wait-enter-active {
  opacity: 1;
  /* Delay the enter animation until the leave completes */
  transition: opacity .4s ease-in .6s;
}

.fade-wait-height {
  transition: height .6s ease-in-out;
}
```

*Note:* The `transitionEnterTimeout` specified in the JS must be long enough to allow for the delay and 
the duration of the transition. In this case:

```javascript
<ReactCSSTransitionReplace transitionName="fade-wait" 
                           transitionEnterTimeout={1000} transitionLeaveTimeout={400}>
```

See the live example [here](http://marnusw.github.io/react-css-transition-replace#fade-wait).


### React-Router v4

Animated transitions of react-router v4 routes is supported with two caveats shown in the example below:

1. The current `location` must be applied to the `Switch` to force it to maintain the previous matched route on 
   the leaving component.
2. If the `Switch` might render `null`, i.e. there is no catch-all `"*"` route, the `Switch` must be wrapped in a 
   `div` or similar for the leave transition to work; if not the previous component will disappear instantaneously
   when there is no match.

```javascript
<Router>
  <div className="router-example">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/one">One</Link></li>
      <li><Link to="/two">Two</Link></li>
      <li><Link to="/three">Three (no match)</Link></li>
    </ul>
    <Route render={({location}) => (
      <ReactCSSTransitionReplace
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div key={location.pathname}>
          <Switch location={location}>
            <Route path="/" exact component={Home}/>
            <Route path="/one" component={One}/>
            <Route path="/two" component={Two}/>
          </Switch>
        </div>
      </ReactCSSTransitionReplace>
    )}/>
  </div>
</Router>
```

See the live example [here](http://marnusw.github.io/react-css-transition-replace#react-router-v4).


### Hardware acceleration for smoother transitions

For smoother transitions hardware acceleration, which is achieved by using translate3d instead of the 2D 
translations, should be used whenever possible. For example, to realize a mobile app transition between 
pages one might use:

```css
.page-enter, .page-leave {
  position: absolute;
  -webkit-transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
  transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
}

.page-enter {
  left: 100vw;
}

.page-enter.page-enter-active {
  -webkit-transform: translate3d(-100vw, 0, 0);
  transform: translate3d(-100vw, 0, 0);
}

.page-leave {
  left: 0;
}

.page-leave.page-leave-active {
  -webkit-transform: translate3d(-100vw, 0, 0);
  transform: translate3d(-100vw, 0, 0);
}
```

```javascript
<ReactCSSTransitionReplace transitionName="page" transitionEnterTimeout={250} transitionLeaveTimeout={250} >
  <div key="page01">
    My page 01 content
  </div>
</ReactCSSTransitionReplace>
```


## Tips

 1. In general animating `block` or `inline-block` level elements is more stable that `inline` elements. If the
    height changes in random ways ensure that there isn't a `span` or other inline element used as the outer 
    element of the components being animated.
 2. The `overflow` of the container is set to `'hidden'` automatically, which changes the behaviour of 
    [collapsing margins](https://css-tricks.com/what-you-should-know-about-collapsing-margins/) from the default 
    `'visible'`. This may cause a glitch in the height at the start or end of animations. To avoid this you can:
      - Keep the overflow hidden permanently with custom styles/classes if that will not cause undesired side-effects.
      - Only use 
        [Single-direction margin declarations](http://csswizardry.com/2012/06/single-direction-margin-declarations/)
        to avoid collapsing margins overall.
      - Turn this feature off by setting the `overflowHidden={false}` prop when hidden overflow is not needed,
        for example when transitions are in place and content is of the same height.
 3. If the `.*-height` class (or `transitionName.height`) is not specified the change in container height will not 
    be animated but instead jump to the height of the entering component instantaneously. It can, therefore, be 
    omitted if all content is known to be of the same height without any adverse side-effects, and absolute positioning
    related height issues will still be avoided.


## Contributing

PRs are welcome.


## License

This software is free to use under the MIT license.
See the [LICENSE file](/LICENSE.md) for license text and copyright information.
