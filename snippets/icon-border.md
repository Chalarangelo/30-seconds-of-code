### Icon Border Animation

Creates a border animation on hover.

#### HTML

```html
<a href="#" class="button ion-ios-star-outline"></a>
```

#### CSS

```css
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
.button {
  position: relative;
  overflow: hidden;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.8);
  margin: 40px;
  padding: 3px;
  display: inline-block;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
  text-decoration: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.button::before {
  background-color: #2b2b2b;
  width: 75px;
  height: 75px;
  line-height: 75px;
}
.button:after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f39c12;
  content: '';
  z-index: -1;
  display: inline-block;
  -webkit-transform: rotate(-45deg) scale(1.5) translate(0%, -100%);
  transform: rotate(-45deg) scale(1.5) translate(0%, -100%);
}
.button:before,
.button:after {
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
.button:hover,
.button:active,
.button.hover {
  color: #ffffff;
}
.button:hover:after,
.button:active:after,
.button.hover:after {
  -webkit-transform: rotate(-45deg) scale(1.5) translate(0%, 0%);
  transform: rotate(-45deg) scale(1.5) translate(0%, 0%);
}
```

#### Demo

#### Explanation

This effect is uses before and after selectors to make the border full width on hover.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: visual, interactivity -->
<!-- date: 2018-10-30 -->
