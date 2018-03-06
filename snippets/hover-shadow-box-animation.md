### Hover Shadow Box Animation


Creates a shadow box around the text whern it is hovered.

#### HTML

```html
<h4 class = "hover-shadow-box-animation"> Box it! </h4>
```

#### CSS

```css
.hover-shadow-box-animation{
  display: inline-block;
  vertical-align: middle;
  -webkit-transform:perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  margin: 10px;
  -webkit-transition-duration : 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hover-shadow-box-animation:hover, .hover-shadow-box-animation:focus, .hover-shadow-box-animation:active{
  box-shadow: 1px 10px 10px -10px rgba(0,0,24,0.5);
  -webkit-transform: scale(1.2);
  transform: scale(1.2); 
}
```
#### Demo

<div class = "snippet-demo">
  <h4 class = "snippet-demo_hover-shadow-box-animation"> Box it! 
</h4>
</div>
                                                       
<style>
.snippet-demo_hover-shadow-box-animation{
  display: inline-block;
  color: #0087ca;
  margin: 10px;
  vertical-align: middle;
  -webkit-transform:perspective(1px) translateZ(45);
  transform: perspective(1px) translateZ(45);
  box-shadow: 0 0 1px transparent;
  -webkit-transition-duration : 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.snippet-demo_hover-shadow-box-animation:hover, .snippet-demo_hover-shadow-box-animation:focus, .snippet-demo_hover-shadow-box-animation:active{
  box-shadow: 1px 10px 10px -10px rgba(0,0,24,0.1);
  -webkit-transform: scale(1.2);
  transform: scale(1.2); 
}                                                       
</style>                                


#### Explanation 

1. `display: inline-block`  for giving width and length for `h4` element thus making it as an `inline-block`.
2. setting the `transform: perspective(1px)` for giving element a 3-D space by affecting the distance between the Z plane and the user and `translate(0)` for repositioning `h4` element along z-axis in 3-D Space.
3. `box-shadow:` for setting up the box.
4. `transparent` to make box transparent 
5.`transition-property` for enabling both box-shadow and transform
6. `:hover` to activate whole css when hovering is done  till  `active`.
7. `transform: scale(1.2)` for changing the scale to 1.2. Now text looks for 1.2 times magnified with shadow Box Effect


#### Browser Support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#feat=transforms3d
* https://caniuse.com/#feat=css-transitions
