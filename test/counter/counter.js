const counter = (selector, start, end, step = 1, duration = 2000) => {
let current = start,
_step = (end - start) * step < 0 ? -step : step,
timer = setInterval(() => {
current += _step;
document.querySelector(selector).innerHTML = current;
if (current >= end) document.querySelector(selector).innerHTML = end;
if (current >= end) clearInterval(timer);
}, Math.abs(Math.floor(duration / (end - start))));
return timer;
};
module.exports = counter;