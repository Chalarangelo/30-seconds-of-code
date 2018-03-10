### Counter

Counters are, in essence, variables maintained by CSS whose values may be incremented by CSS rules to track how many times they're used.

#### HTML

```html
<section class="countable-section">
	<div class="countable-item">
		<p>Some item</p>
		<div class="countable-section">
			<p>First sub item</p>
			<p>Second sub item</p>
			<p>Third sub item</p>
		</div>
	</div>
	<div class="countable-item">
		<p>Second other item</p>
	</div>
	<div class="countable-item">
		<p>Third item</p>
	</div>
	<div class="countable-item">
		<p>Fourth item</p>
	</div>
</section>
```

#### CSS

```css
.countable-section {
	counter-reset: counter1;
}
.countable-item p {
	counter-increment: counter1;
}
.countable-item p:before {
	content: counters(counter1, '-') ' ';
	font-weight: bold; /* for better visualization on demo */
}
```

#### Demo

<div class="snippet-demo">
	<section class="snippet-demo__countable-section">
		<div class="snippet-demo__countable-item">
			<p>Some item</p>
			<div class="snippet-demo__countable-section">
					<p>First sub item</p>
					<p>Second sub item</p>
					<p>Third sub item</p>
			</div>
		</div>
		<div class="snippet-demo__countable-item">
			<p>Second other item</p>
		</div>
		<div class="snippet-demo__countable-item">
			<p>Third item</p>
		</div>
		<div class="snippet-demo__countable-item">
			<p>Fourth item</p>
		</div>
	</section>
</div>

<style>
.snippet-demo__countable-section {
  counter-reset: counter1;
}
.snippet-demo__countable-item p {
  counter-increment: counter1;
}
.snippet-demo__countable-item p:before {
  content: counters(counter1, '.') ' ';
	font-weight: bold;
}
</style>

#### Explanation

You can create a ordered list using any type of HTML.

1. `counter-reset` Initializes a counter, the value is the name of the counter. By default, the counter starts in 0. This property can also be used to change its value to any specific number.

2. `counter-increment` Used in element that will be countable. Once `counter-reset` initialized, a counter's value can be increased or decreased.

3. `counter(variable_name, style)` Displays the value of a section counter. Generally used in a `content` property. This function can recieve two parameters, the first as the name of the counter and the second one can be `decimal` or `upper-roman` (`decimal` by default).

4. `counters(variable_name, separator, style)` Displays the value of a section counter. Generally used in a `content` property. This function can recieve three parameters, the first as the name of the counter, the second one you can include a string which comes after the counter and the third one can be `decimal` or `upper-roman` (`decimal` by default).

5. A CSS counter can be especially useful for making outlined lists, because a new instance of the counter is automatically created in child elements. Using the `counters()` function, separating text can be inserted between different levels of nested counters.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#search=counters

<!-- tags: visual, other -->
