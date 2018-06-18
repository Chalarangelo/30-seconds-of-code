const recordAnimationFrames = (callback, autoStart = true) => {
let running = true,
raf;
const stop = () => {
running = false;
cancelAnimationFrame(raf);
};
const start = () => {
running = true;
run();
};
const run = () => {
raf = requestAnimationFrame(() => {
callback();
if (running) run();
});
};
if (autoStart) start();
return { start, stop };
};
module.exports = recordAnimationFrames;