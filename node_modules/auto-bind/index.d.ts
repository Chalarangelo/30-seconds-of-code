import * as react from 'react';

declare namespace autoBind {
	interface Options {
		/**
		Bind only the given methods.
		*/
		readonly include?: Array<string | RegExp>;

		/**
		Bind methods except for the given methods.
		*/
		readonly exclude?: Array<string | RegExp>;
	}
}

declare const autoBind: {
	/**
	Automatically bind methods to their class instance.

	@param self - Object with methods to bind.

	@example
	```
	import autoBind = require('auto-bind');

	class Unicorn {
		constructor(name) {
			this.name = name;
			autoBind(this);
		}

		message() {
			return `${this.name} is awesome!`;
		}
	}

	const unicorn = new Unicorn('Rainbow');

	// Grab the method off the class instance
	const message = unicorn.message;

	// Still bound to the class instance
	message();
	//=> 'Rainbow is awesome!'

	// Without `autoBind(this)`, the above would have resulted in
	message();
	//=> Error: Cannot read property 'name' of undefined
	```
	*/
	<SelfType extends {[key: string]: unknown}>(
		self: SelfType,
		options?: autoBind.Options
	): SelfType;

	/**
	Same as `autoBind`, but excludes the default [React component methods](https://reactjs.org/docs/react-component.html).

	@param self - Object with methods to bind.

	@example
	```
	import autoBind = require('auto-bind');

	class Foo extends React.Component {
		constructor(props) {
			super(props);
			autoBind.react(this);
		}

		// …
	}
	```
	*/
	react<SelfType extends react.Component>(
		self: SelfType,
		options?: autoBind.Options
	): SelfType;
};

export = autoBind;
