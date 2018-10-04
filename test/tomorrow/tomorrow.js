const tomorrow = (long = false) => {
  let t = new Date();
  t.setDate(t.getDate() + 1);

  const year = t.getFullYear();
  const month = String(t.getMonth() + 1).padStart(2, '0');
  const newDate = String(t.getDate()).padStart(2, '0');

  const ret = `${year}-${month}-${newDate}`;
  return !long ? ret : `${ret}T00:00:00`;
};
module.exports = tomorrow;
