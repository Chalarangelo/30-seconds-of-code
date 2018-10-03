const range = (a, b, step=1) => {
    let start, stop;
    if (b !== undefined) {
        start = a;
        stop = b;
    } else {
        start = 0;
        stop = a;
    }
    let result = [];
    if (step == 0) {
        throw "Step must not be zero!";
    } else if (step > 0) {
        for (let v = start; v < stop; v += step) {
            result.push(v);
        }
    } else {
        for (let v = start; v > stop; v += step) {
            result.push(v);
        }
    }
    return result;
}
module.exports = range;
