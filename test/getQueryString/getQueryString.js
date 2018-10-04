const getQueryString = (query = window.location.search) => {
  return typeof query === 'string'
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
        const [key, value = ''] = param.split('=');
        params[key] = decodeURIComponent(value.replace(/\+/g, ' '));

        return params;
      }, {})
    : {};
};
module.exports = getQueryString;
