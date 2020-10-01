---
title: Get Covid Data Using NovelCovid Module
tags: array,node
---
[novelcovid](https://www.npmjs.com/package/novelcovid) is a simple module at [npm](https://www.npmjs.com/package/novelcovid) that can generate covid data all around the world in just a span of time.

- Installing the module by using npm command. `npm i novelcovid`
- Adding the module to the project. `const  api  =  require('novelcovid');`
- Setting the source for the module. `api.settings({baseUrl: 'https://disease.sh'})`
- Calling the function, Its so easy.  Most common ones are added below
```js
// prints data of all countries
api.all().then(console.log)

// prints global data of yesterday
api.yesterday.all().then(console.log)

// prints an array of all infected countries
api.countries().then(console.log)

// prints the data of a specified country
api.countries({country:'austria'}).then(console.log)

// prints an array of all infected continents
api.continents().then(console.log) 

// prints the data of a specified continents
api.continents({continent:'europe'}).then(console.log)

// prints an array of all infected US states and their data
api.states().then(console.log)

// prints a specified state and its data
api.states({state:'michigan'}).then(console.log)

// prints the global timeline
api.historical.all().then(console.log)

// prints Official Government Data for a specified country
api.gov('austria').then(console.log)
```

```js
// Example full snippet code to get the global Covid data
const api = require('novelcovid');

api.settings({ baseUrl: 'https://corona.lmao.ninja' })
api.all().then(console.log)

// Output on the console, Will Change according to time
/*{
  updated: 1601004162349,
  cases: 32411415,
  todayCases: 9692,
  deaths: 987742,
  todayDeaths: 586,
  recovered: 23925406,
  todayRecovered: 6294,
  active: 7498267,
  critical: 63338,
  casesPerOneMillion: 4158,
  deathsPerOneMillion: 126.7,
  tests: 623976071,
  testsPerOneMillion: 80245.53,
  population: 7775835900,
  oneCasePerPeople: 0,
  oneDeathPerPeople: 0,
  oneTestPerPeople: 0,
  activePerOneMillion: 964.3,
  recoveredPerOneMillion: 3076.89,
  criticalPerOneMillion: 8.15,
  affectedCountries: 215
}*/
```