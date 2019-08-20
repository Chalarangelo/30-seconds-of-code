import { InnerSubscriber } from '../InnerSubscriber';
import { subscribeTo } from './subscribeTo';
import { Observable } from '../Observable';
export function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex)) {
    if (destination.closed) {
        return undefined;
    }
    if (result instanceof Observable) {
        return result.subscribe(destination);
    }
    return subscribeTo(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map