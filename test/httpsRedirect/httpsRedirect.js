const httpsRedirect = () => {
if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};
module.exports = httpsRedirect