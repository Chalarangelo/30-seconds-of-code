import * as opentracing from '../index';
import MockSpan from './mock_span';
/**
 * OpenTracing Context implementation designed for use in
 * unit tests.
 */
export declare class MockContext extends opentracing.SpanContext {
    private _span;
    constructor(span: MockSpan);
    span(): MockSpan;
}
export default MockContext;
//# sourceMappingURL=mock_context.d.ts.map