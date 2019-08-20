/// <reference types="node"/>
import {Readable as ReadableStream} from 'stream';

declare namespace fileType {
	type FileType =
		| 'jpg'
		| 'png'
		| 'gif'
		| 'webp'
		| 'flif'
		| 'cr2'
		| 'tif'
		| 'bmp'
		| 'jxr'
		| 'psd'
		| 'zip'
		| 'tar'
		| 'rar'
		| 'gz'
		| 'bz2'
		| '7z'
		| 'dmg'
		| 'mp4'
		| 'm4v'
		| 'mid'
		| 'mkv'
		| 'webm'
		| 'mov'
		| 'avi'
		| 'wmv'
		| 'mpg'
		| 'mp2'
		| 'mp3'
		| 'm4a'
		| 'ogg'
		| 'opus'
		| 'flac'
		| 'wav'
		| 'qcp'
		| 'amr'
		| 'pdf'
		| 'epub'
		| 'mobi'
		| 'exe'
		| 'swf'
		| 'rtf'
		| 'woff'
		| 'woff2'
		| 'eot'
		| 'ttf'
		| 'otf'
		| 'ico'
		| 'flv'
		| 'ps'
		| 'xz'
		| 'sqlite'
		| 'nes'
		| 'crx'
		| 'xpi'
		| 'cab'
		| 'deb'
		| 'ar'
		| 'rpm'
		| 'Z'
		| 'lz'
		| 'msi'
		| 'mxf'
		| 'mts'
		| 'wasm'
		| 'blend'
		| 'bpg'
		| 'docx'
		| 'pptx'
		| 'xlsx'
		| '3gp'
		| 'jp2'
		| 'jpm'
		| 'jpx'
		| 'mj2'
		| 'aif'
		| 'odt'
		| 'ods'
		| 'odp'
		| 'xml'
		| 'heic'
		| 'cur'
		| 'ktx'
		| 'ape'
		| 'wv'
		| 'asf'
		| 'wma'
		| 'wmv'
		| 'dcm'
		| 'mpc'
		| 'ics'
		| 'glb'
		| 'pcap';

	interface FileTypeResult {
		/**
		One of the supported [file types](https://github.com/sindresorhus/file-type#supported-file-types).
		*/
		ext: FileType;

		/**
		The detected [MIME type](https://en.wikipedia.org/wiki/Internet_media_type).
		*/
		mime: string;
	}

	type ReadableStreamWithFileType = ReadableStream & {
		readonly fileType: FileTypeResult | null;
	};
}

declare const fileType: {
	/**
	Detect the file type of a `Buffer`/`Uint8Array`/`ArrayBuffer`. The file type is detected by checking the [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files) of the buffer.

	@param buffer - It only needs the first `.minimumBytes` bytes. The exception is detection of `docx`, `pptx`, and `xlsx` which potentially requires reading the whole file.
	@returns An object with the detected file type and MIME type or `null` when there was no match.

	@example
	```
	import readChunk = require('read-chunk');
	import fileType = require('file-type');

	const buffer = readChunk.sync('unicorn.png', 0, fileType.minimumBytes);

	fileType(buffer);
	//=> {ext: 'png', mime: 'image/png'}


	// Or from a remote location:

	import * as http from 'http';

	const url = 'https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif';

	http.get(url, response => {
		response.on('readable', () => {
			const chunk = response.read(fileType.minimumBytes);
			response.destroy();
			console.log(fileType(chunk));
			//=> {ext: 'gif', mime: 'image/gif'}
		});
	});
	```
	*/
	(buffer: Buffer | Uint8Array | ArrayBuffer): fileType.FileTypeResult | null;

	/**
	The minimum amount of bytes needed to detect a file type. Currently, it's 4100 bytes, but it can change, so don't hard-code it.
	*/
	readonly minimumBytes: number;

	/**
	Detect the file type of a readable stream.

	@param readableStream - A readable stream containing a file to examine, see: [`stream.Readable`](https://nodejs.org/api/stream.html#stream_class_stream_readable).
	@returns A `Promise` which resolves to the original readable stream argument, but with an added `fileType` property, which is an object like the one returned from `fileType()`.

	@example
	```
	import * as fs from 'fs';
	import * as crypto from 'crypto';
	import fileType = require('file-type');

	(async () => {
		const read = fs.createReadStream('encrypted.enc');
		const decipher = crypto.createDecipheriv(alg, key, iv);

		const stream = await fileType.stream(read.pipe(decipher));

		console.log(stream.fileType);
		//=> {ext: 'mov', mime: 'video/quicktime'}

		const write = fs.createWriteStream(`decrypted.${stream.fileType.ext}`);
		stream.pipe(write);
	})();
	```
	*/
	readonly stream: (
		readableStream: ReadableStream
	) => Promise<fileType.ReadableStreamWithFileType>;

	// TODO: Remove this for the next major release
	readonly default: typeof fileType;
};

export = fileType;
