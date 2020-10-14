---
title: Input with Prefix
tags: visual,interactivity,intermediate
---

Creates an input with a visual, non-editable prefix.

- Create a parent element, containing the prefix and the input 
- Remove border and outline from the input, and apply it to the parent element, to give it the appearance of an input box
- Use `:focus-within` selector to change the parent element style accordingly

```html
<div class="input-box">
  <span class="prefix">R$</span>
  <input />  
</div>
```

```css
.input-box {
  display: flex;
  align-items: center;
  
  max-width: 300px;  
  border: 1px #A0AEC0 solid;
  border-radius: 4px;
  padding-left: 0.5rem;
  overflow: hidden;
  
  font-family: sans-serif;
  
  transition: border-color 0.5s ease;
}

.input-box:focus-within, .input-box:hover {
  border-color: #38B2AC;
}

.input-box .prefix {
  font-weight: 300;
  font-size: 14px;
  color: #A0AEC0;
}

.input-box:focus-within .prefix, .input-box:hover .prefix { 
  color: #38B2AC;
}


.input-box input {
  flex-grow: 1;
  
  border: none;
  outline: none;
  padding: 0.5rem;
  
} 

```
