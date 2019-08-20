import {LiteralUnion} from 'type-fest';
import cliBoxes, {BoxStyle} from 'cli-boxes';

declare namespace boxen {
	/**
	Characters used for custom border.

	@example
	```
	// affffb
	// e    e
	// dffffc

	const border: CustomBorderStyle = {
		topLeft: 'a',
		topRight: 'b',
		bottomRight: 'c',
		bottomLeft: 'd',
		vertical: 'e',
		horizontal: 'f'
	};
	```
	*/
	interface CustomBorderStyle extends BoxStyle {}

	/**
	Spacing used for `padding` and `margin`.
	*/
	interface Spacing {
		readonly top: number;
		readonly right: number;
		readonly bottom: number;
		readonly left: number;
	}

	interface Options {
		/**
		Color of the box border.
		*/
		readonly borderColor?: LiteralUnion<
			| 'black'
			| 'red'
			| 'green'
			| 'yellow'
			| 'blue'
			| 'magenta'
			| 'cyan'
			| 'white'
			| 'gray'
			| 'grey'
			| 'blackBright'
			| 'redBright'
			| 'greenBright'
			| 'yellowBright'
			| 'blueBright'
			| 'magentaBright'
			| 'cyanBright'
			| 'whiteBright',
			string
		>;

		/**
		Style of the box border.

		@default BorderStyle.Single
		*/
		readonly borderStyle?: BorderStyle | CustomBorderStyle;

		/**
		Reduce opacity of the border.

		@default false
		*/
		readonly dimBorder?: boolean;

		/**
		Space between the text and box border.

		@default 0
		*/
		readonly padding?: number | Spacing;

		/**
		Space around the box.

		@default 0
		*/
		readonly margin?: number | Spacing;

		/**
		Float the box on the available terminal screen space.

		@default 'left'
		*/
		readonly float?: 'left' | 'right' | 'center';

		/**
		Color of the background.
		*/
		readonly backgroundColor?: LiteralUnion<
			| 'black'
			| 'red'
			| 'green'
			| 'yellow'
			| 'blue'
			| 'magenta'
			| 'cyan'
			| 'white'
			| 'blackBright'
			| 'redBright'
			| 'greenBright'
			| 'yellowBright'
			| 'blueBright'
			| 'magentaBright'
			| 'cyanBright'
			| 'whiteBright',
			string
		>;

		/**
		Align the text in the box based on the widest line.

		@default 'left'
		*/
		readonly align?: 'left' | 'right' | 'center';
	}
}

declare const enum BorderStyle {
	Single = 'single',
	Double = 'double',
	Round = 'round',
	Bold = 'bold',
	SingleDouble = 'singleDouble',
	DoubleSingle = 'doubleSingle',
	Classic = 'classic'
}

declare const boxen: {
	/**
	Creates a box in the terminal.

	@param text - The text inside the box.
	@returns The box.

	@example
	```
	import boxen = require('boxen');

	console.log(boxen('unicorn', {padding: 1}));
	// ┌─────────────┐
	// │             │
	// │   unicorn   │
	// │             │
	// └─────────────┘

	console.log(boxen('unicorn', {padding: 1, margin: 1, borderStyle: 'double'}));
	//
	// ╔═════════════╗
	// ║             ║
	// ║   unicorn   ║
	// ║             ║
	// ╚═════════════╝
	//
	```
	*/
	(text: string, options?: boxen.Options): string;

	/**
	Border styles from [`cli-boxes`](https://github.com/sindresorhus/cli-boxes).
	*/
	BorderStyle: typeof BorderStyle;

	// TODO: Remove this for the next major release
	default: typeof boxen;
};

export = boxen;
