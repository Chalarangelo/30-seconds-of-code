/// <reference types="node"/>

declare const readChunk: {
	/**
	Read a chunk from a file asyncronously.

	@param filePath - The path to the file.
	@param startPosition - Position to start reading.
	@param length - Number of bytes to read.
	@returns The read chunk.

	@example
	```
	import readChunk = require('read-chunk');

	// foo.txt => hello

	readChunk.sync('foo.txt', 1, 3);
	//=> 'ell'
	```
	*/
	(filePath: string, startPosition: number, length: number): Promise<Buffer>;

	/**
	Read a chunk from a file synchronously.

	@param filePath - The path to the file.
	@param startPosition - Position to start reading.
	@param length - Number of bytes to read.
	@returns The read chunk.
	*/
	sync(filePath: string, startPosition: number, length: number): Buffer;

	// TODO: Remove this for the next major release
	default: typeof readChunk;
};

export = readChunk;
