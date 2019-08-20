/** PURE_IMPORTS_START _.._Observable PURE_IMPORTS_END */
import { Observable } from '../../Observable';
export function fromFetch(input, init) {
    return new Observable(function (subscriber) {
        var controller = new AbortController();
        var signal = controller.signal;
        var outerSignalHandler;
        var abortable = true;
        var unsubscribed = false;
        if (init) {
            if (init.signal) {
                outerSignalHandler = function () {
                    if (!signal.aborted) {
                        controller.abort();
                    }
                };
                init.signal.addEventListener('abort', outerSignalHandler);
            }
            init.signal = signal;
        }
        else {
            init = { signal: signal };
        }
        fetch(input, init).then(function (response) {
            abortable = false;
            subscriber.next(response);
            subscriber.complete();
        }).catch(function (err) {
            abortable = false;
            if (!unsubscribed) {
                subscriber.error(err);
            }
        });
        return function () {
            unsubscribed = true;
            if (abortable) {
                controller.abort();
            }
        };
    });
}
//# sourceMappingURL=fetch.js.map
