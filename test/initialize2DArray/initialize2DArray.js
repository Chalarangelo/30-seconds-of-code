const initialize2DArray = (w, h, val = null) =>
  Array.from(
    { length: h },
    () => Array.from(
      { length: w },
      () => val
    )
  );
module.exports = initialize2DArray;
