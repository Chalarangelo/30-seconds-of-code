import { TransformFunction as Transform, IPartialOptions } from './out/managers/options';
import { ITask } from './out/managers/tasks';
import { Entry, EntryItem } from './out/types/entries';
import { Pattern } from './out/types/patterns';

declare namespace FastGlob {
	type Options<T = EntryItem> = IPartialOptions<T>;
	type TransformFunction<T> = Transform<T>;
	type Task = ITask;

	interface IApi {
		<T = EntryItem>(patterns: Pattern | Pattern[], options?: IPartialOptions<T>): Promise<T[]>;

		async<T = EntryItem>(patterns: Pattern | Pattern[], options?: IPartialOptions<T>): Promise<T[]>;
		sync<T = EntryItem>(patterns: Pattern | Pattern[], options?: IPartialOptions<T>): T[];
		stream(patterns: Pattern | Pattern[], options?: IPartialOptions): NodeJS.ReadableStream;
		generateTasks(patterns: Pattern | Pattern[], options?: IPartialOptions): Task[];
	}
}

declare const FastGlob: FastGlob.IApi;

export = FastGlob;
export as namespace FastGlob;
