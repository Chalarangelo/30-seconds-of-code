const serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

module.exports = serializeCookie;