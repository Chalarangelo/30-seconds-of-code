// workaround for tty output truncation upon process.exit()
var exit = process.exit;
process.exit = function() {
    var args = [].slice.call(arguments);
    process.once("uncaughtException", function() {
        (function callback() {
            if (process.stdout.bufferSize || process.stderr.bufferSize) {
                setImmediate(callback);
            } else {
                exit.apply(process, args);
            }
        })();
    });
    throw exit;
};
