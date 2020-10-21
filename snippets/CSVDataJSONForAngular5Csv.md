---
title: CSVDataJSONForAngular5Csv
tags: json,csv,angular
---

Converts a comma-separated values (CSV) string to a 2D array.

- Pass processed data of type `Array<Object>` in the parameter: `processedData`. Where each item is a row referring to the value of each column. 
- Pass a Metrics Array in the `columns` parameter. Where each metric is referenced is a column and each metric has the property name of the processedData items that is referring to the metric column.

```js
  tableToDicts(processedData: any, columns: any, dateOnly: boolean = false) {
    const list = [];
    for (const i of Object.keys(processedData)) {
      const dict = {};
      for (const column of columns) {
        let currentValue = processedData[i][column.field];
        dict[column.title] = currentValue;
      }
      list.push(dict);
    }
    return list;
  }
```

```js
var processedData = [{name: "Example", year: 2020}];
const NAME_METRICS = {
  title: 'NameExample',
  field: 'name'
};
const YEAR_METRICS = {
  title: 'YearExample',
  field: 'year'
};
var columns = [ NAME_METRICS, YEAR_METRICS ];
const dataToExport = tableToDicts(processedData, columns, false); // [{NameExample: "Example", YearExample: 2020}]

new Angular5Csv(dataToExport, Utils.generateFileName(), {
    showLabels: true,
    headers: Object.keys(dataToExport[0]), // NameExample  |  YearExample
}); 

// NameExample | YearExample
// Example     | 2020

```
