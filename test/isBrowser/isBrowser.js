const isBrowser = () => ![typeof window, typeof document].includes('undefined');
module.exports = isBrowser;