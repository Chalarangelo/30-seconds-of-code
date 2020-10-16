
---
title:  Meadia queries (with styled-components)
tags:  css, media queries, beginner

---
We can use this snippet to have the sizes of the media queries in the same place when we are designing a web application (mobile first).

Currently we define the media queries using styled components as follows:

```js
const  CardWrapper  =  styled.div`
	display: flex;
	flex-direction: row;
	
	@media (max-width: 768px) {
	flex-direction: column;
	}
`;
```

# But now, how to make it responsive with styled-component?

1- Define the breakpoints as a Javascript objects.
2- Define the devices for each breakpoint using the usual media query syntax.
3- Apply the @media rules as usual in the styled components.

## 1- Define the breakpoints & devices
Let's create one breakpoint for each size:

```js
const  size  =  {
	mobileS:  '320px',
	mobileM:  '375px',
	mobileL:  '425px',
	tablet:  '768px',
	laptop:  '1024px',
	laptopL:  '1440px',
	desktop:  '2560px'
};
```
We can uses just plain Javascript objects for this and taking advantage of ES6 template strings & string substitution.
```js
export  const  device  =  {
	mobileS:  `(min-width: ${size.mobileS})`,
	mobileM:  `(min-width: ${size.mobileM})`,
	mobileL:  `(min-width: ${size.mobileL})`,
	tablet:  `(min-width: ${size.tablet})`,
	laptop:  `(min-width: ${size.laptop})`,
	laptopL:  `(min-width: ${size.laptopL})`,
	desktop:  `(min-width: ${size.desktop})`,
	desktopL:  `(min-width: ${size.desktop})`
};
```

## 2- Update the components to adapt based on device size

The root of the application consists of the following hierarchy:

```js

const  App  =  ()  =>  (
	<Page>
		<Hello  name="AppTest"  />
		<Card  withPictureOf="coffee"  />
	</Page>
);
```
In other to make the page responsive, two components need to be updated:

 - The Page needs to have maximum width
 - The Card needs to show the text beneath the image on small devices

For the page, this can be easily achieved by just specifing different max-width based on device:

```js
import styled from  'styled-components';
import  { device }  from  './device';

const  Page  =  styled.div`
	margin: auto;
	font-family: "sans-serif";
	text-align: center;
	
	@media ${device.laptop} {
	max-width: 800px;
	}

	@media ${device.desktop} {
	max-width: 1400px;
	}
`;
```
And for the Card, it's a matter of updating the flex-direction:

```js
import  { device }  from  './device';

const  CardWrapper  =  styled.div`
	display: flex;
	// Mobile friendly by default
	flex-direction: column;
	border: 1px solid gray;
	box-shadow: 5px 5px #ccc;
	padding: 10px;
	margin: 10px;

	// Switch to rows on large devices
	@media ${device.laptop} {
	flex-direction: row;
	}
`;
```

# And... that's it! Congratulations!

**Source:** [JavaScript Ramblings](https://jsramblings.com/how-to-use-media-queries-with-styled-components/)
