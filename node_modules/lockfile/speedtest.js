const path = require('path');
const async = require('async');
const lf = require('lockfile');
const fs = require('fs');

const n = +process.argv[3] || 300;
const a = Array.apply(null, {length: n}).map(function(_, i) {
  return i
})
const file = path.resolve(__dirname, 'speed-test.lock');

try{
    fs.unlinkSync(file);
}
catch(e){}


/// NOTE: this should run in about 30ms on a SSD Ubuntu 16.04, that is fast, because we are locking/unlocking 300 locks
/// *HOWEVER* if we change async.eachSeries to async.each, lockfile will barf immediately, and I can't get lockfile
/// to not barf, using any of the options {} available to lockfile#lock.


const parallel = process.argv[2] === 'parallel';

var fn, msg;

if(parallel){
    msg = 'parallel';
    fn = async.each;
}
else{
    msg = 'series';
    fn = async.eachSeries;
}


const start = Date.now();
console.log(' => locking/unlocking ' + a.length + ' times, in ' + msg);

fn(a, function (val, cb) {

    console.log('try %d', val)

    lf.lock(file, { retries: n * 3 }, function (err) {
        if (err) {
            cb(err);
        }
        else {
            console.log('complete %d', val)
            lf.unlock(file, cb);
        }
    });

}, function complete(err) {

    if (err) {
        throw err;
    }

    console.log(' => Time required for lockfile => ', Date.now() - start, 'ms');
    process.exit(0);

});
