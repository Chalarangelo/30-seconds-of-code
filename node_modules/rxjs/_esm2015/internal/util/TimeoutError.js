function TimeoutErrorImpl() {
    Error.call(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    return this;
}
TimeoutErrorImpl.prototype = Object.create(Error.prototype);
export const TimeoutError = TimeoutErrorImpl;
//# sourceMappingURL=TimeoutError.js.map