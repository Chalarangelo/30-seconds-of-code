import { Subscriber } from '../Subscriber';
import { iterator as Symbol_iterator } from '../symbol/iterator';

export const subscribeToIterable = <T>(iterable: Iterable<T>) => (subscriber: Subscriber<T>) => {
  const iterator = iterable[Symbol_iterator]();
  do {
    const item = iterator.next();
    if (item.done) {
      subscriber.complete();
      break;
    }
    subscriber.next(item.value);
    if (subscriber.closed) {
      break;
    }
  } while (true);

  // Finalize the iterator if it happens to be a Generator
  if (typeof iterator.return === 'function') {
    subscriber.add(() => {
      if (iterator.return) {
        iterator.return();
      }
    });
  }

  return subscriber;
};
