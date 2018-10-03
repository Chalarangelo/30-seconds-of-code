const tomorrow = (long = false) => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  if (long){
    return `${t}T00:00:00`;
  }
  return t;
};
module.exports = tomorrow;
