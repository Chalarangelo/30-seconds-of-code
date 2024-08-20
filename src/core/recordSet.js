export default class RecordSet extends Array {
  where(query) {
    return RecordSet.from(
      this.filter(record => {
        return Object.keys(query).every(key => {
          // If function use it to determine matches
          if (typeof query[key] === 'function') return query[key](record[key]);

          // If array, use it to determine matches
          if (Array.isArray(query[key]))
            return query[key].includes(record[key]);

          // If single value, use strict equality
          return record[key] === query[key];
        });
      })
    );
  }

  order(comparator) {
    return RecordSet.from(this.sort(comparator));
  }

  pluck(key) {
    return super.map(record => record[key]);
  }

  map(fn) {
    return RecordSet.from(super.map(fn));
  }

  shuffle() {
    const arr = [...this];
    let m = arr.length;

    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }

    return RecordSet.from(arr);
  }

  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }
}
