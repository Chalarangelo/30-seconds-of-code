/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
import { iterator as Symbol_iterator } from '../symbol/iterator';
export var subscribeToIterable = function (iterable) {
    return function (subscriber) {
        var iterator = iterable[Symbol_iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator.return === 'function') {
            subscriber.add(function () {
                if (iterator.return) {
                    iterator.return();
                }
            });
        }
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToIterable.js.map
