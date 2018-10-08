const heronArea = (side_a, side_b, side_c) => {
    const p = (side_a + side_b + side_c) / 2
    return Math.sqrt(p * (p-side_a) * (p-side_b) * (p-side_c))
  };
module.exports = heronArea;
