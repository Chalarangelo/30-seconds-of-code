import { Observable } from '../../Observable';
export function fromFetch(input, init) {
    return new Observable(subscriber => {
        const controller = new AbortController();
        const signal = controller.signal;
        let outerSignalHandler;
        let abortable = true;
        let unsubscribed = false;
        if (init) {
            if (init.signal) {
                outerSignalHandler = () => {
                    if (!signal.aborted) {
                        controller.abort();
                    }
                };
                init.signal.addEventListener('abort', outerSignalHandler);
            }
            init.signal = signal;
        }
        else {
            init = { signal };
        }
        fetch(input, init).then(response => {
            abortable = false;
            subscriber.next(response);
            subscriber.complete();
        }).catch(err => {
            abortable = false;
            if (!unsubscribed) {
                subscriber.error(err);
            }
        });
        return () => {
            unsubscribed = true;
            if (abortable) {
                controller.abort();
            }
        };
    });
}
//# sourceMappingURL=fetch.js.map