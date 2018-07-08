### dig

Return the value in a nested JSON object by the key.

Given the key name (or target), it will look up the key in the object recursively and return the first value if found.

```
const dig = (obj, target) => {
  if (!obj) return;

  if (obj[target]) return obj[target];
  else {
    return( Object.keys(obj).map(key => {
     if (typeof(obj[key]) === "object") {
        return dig(obj[key], target);
      }
    }).filter(defined => defined)[0] );
  }
};
```

```
const data = {
  name: "John Doe",
  details: {
    phone: "9876543210",
    email: "john@example.com",
    address: {
      street: "123 ABC St.",
      state: "CA",
      zip: "98765"
    },
    extra1: {
      nickName: "Johnny"
    },
    extra2: {
      nickName: "JD"
    },
    hobby: "coding",
    snacks: ["chips", 'candy', 'coke']
  },
  l1:{
    l2:{
      l3:{
        l4: "4 levels deep."
      }
    }
  }
};

dig(data, 'nickName'); // "Johnny"
dig(data, 'hobby');    // "coding"
dig(data, 'snacks');   // ["chips","candy","coke"]
dig(data, 'l4');       // "4 levels deep."
dig(data, 'blahblah')  // undefined
```
