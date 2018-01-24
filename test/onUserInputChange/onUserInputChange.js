const onUserInputChange = callback => {
let type = 'mouse',
lastTime = 0;
const mousemoveHandler = () => {
const now = performance.now();
if (now - lastTime < 20)
(type = 'mouse'), callback(type), document.removeEventListener('mousemove', mousemoveHandler);
lastTime = now;
};
document.addEventListener('touchstart', () => {
if (type === 'touch') return;
(type = 'touch'), callback(type), document.addEventListener('mousemove', mousemoveHandler);
});
};
module.exports = onUserInputChange