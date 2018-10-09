const dropProperties = (objArr, ...propKeys) => {
  propKeys.map(propKey => objArr.forEach(obj => delete obj[propKey]));
  return objArr;
};
module.exports = dropProperties;
