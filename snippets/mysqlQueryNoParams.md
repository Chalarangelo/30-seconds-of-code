---
title: mysqlQueryNoParams
tags: mysql,advanced
---

It makes a query to the Mysql database without external parameters.

- The function receives the query in string format and the connection obtained by the `mysql` library. It performs a query against the database and it returns a `promise` with the data or with the errors.
- Use `mysql` library to interact with Mysql database.
- Use `then` and `catch` to handle the `promise`.

```js
const queryNoParams = (query, connection) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });

    return promise;
}
```

```js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.log('There was an error in the connection');
    }
});

queryNoParams('SELECT * FROM MyTable', connection);
```
