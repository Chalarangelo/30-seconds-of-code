"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TimeoutErrorImpl() {
    Error.call(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    return this;
}
TimeoutErrorImpl.prototype = Object.create(Error.prototype);
exports.TimeoutError = TimeoutErrorImpl;
//# sourceMappingURL=TimeoutError.js.map