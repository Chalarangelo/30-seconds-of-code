import { Subscription } from '../Subscription';
import { OuterSubscriber } from '../OuterSubscriber';
import { Subscriber } from '../Subscriber';
export declare function subscribeToResult<T, R>(outerSubscriber: OuterSubscriber<T, R>, result: any, outerValue?: T, outerIndex?: number, destination?: Subscriber<any>): Subscription;
