
exports.destroyQueues = function () {
  [this.q, this.q1, this.q2].forEach(function (q) {
    if (!q) return;
    setTimeout(function () {
      q.destroy();
    }, 15);
  });
};
