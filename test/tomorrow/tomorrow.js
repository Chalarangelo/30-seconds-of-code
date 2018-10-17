const tomorrow = () => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  const year = t.getFullYear();
  const month = String(t.getMonth() + 1).padStart(2, '0');
  const date = String(t.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};

module.exports = tomorrow;
