module.exports = () => {
if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};