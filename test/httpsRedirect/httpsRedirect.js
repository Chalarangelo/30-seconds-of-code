const httpsRedirect = () => {
if (location.protocol !== 'https:') location.replace('https:
};
module.exports = httpsRedirect;