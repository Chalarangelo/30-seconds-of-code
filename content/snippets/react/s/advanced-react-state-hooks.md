---
title: Advanced React state hooks
language: react
tags: [hooks,state,effect,callback]
cover: engine
excerpt: Is `useState()` too limited for you? Perhaps `useReducer()` doesn't quite cut it either? Let's explore some advanced state management hooks.
listed: true
dateModified: 2024-07-03
---

React's toolbox is intentionally quite limited, providing you some very versatile building blocks to create your own abstractions. But, if you find `useState()` too limited for your needs, and `useReducer()` doesn't quite cut it either, how do you go about creating more advanced state management hooks? Let's deep dive into some advanced state management hooks.

## `useToggler` hook

Starting off with a simple one, the `useToggler` hook provides a **boolean state variable** that can be toggled between its two states. Instead of managing the state manually, you can simply call the `toggleValue` function to toggle the state.

The implementation is rather simple, as well. You use the `useState()` hook to create the `value` state variable and its setter. Then, you create a function that toggles the value of the state variable and memoize it, using the `useCallback()` hook. Finally, you return the `value` state variable and the memoized function.

```jsx
const useToggler = initialState => {
  const [value, setValue] = React.useState(initialState);
  const toggleValue = React.useCallback(() => setValue(prev => !prev), []);

  return [value, toggleValue];
};

const Switch = () => {
  const [val, toggleVal] = useToggler(false);
  return <button onClick={toggleVal}>{val ? 'ON' : 'OFF'}</button>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Switch />
);
```

## `useMap` hook

The `Map` object is a very versatile **data structure** in JavaScript, but it's not directly supported by React's state management hooks. The `useMap` hook creates a stateful `Map` object and a set of functions to manipulate it.

Using the `useState()` hook and the `Map()` constructor, you create a new `Map` from the `initialValue`. Then, you use the `useMemo()` hook to create a set of non-mutating actions that manipulate the state variable, using the state setter to create a new `Map` every time. Finally, you return the `map` state variable and the created `actions`.

```jsx
const useMap = initialValue => {
  const [map, setMap] = React.useState(new Map(initialValue));

  const actions = React.useMemo(
    () => ({
      set: (key, value) =>
        setMap(prevMap => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key, value) =>
        setMap(prevMap => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key, value);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap]
  );

  return [map, actions];
};

const MyApp = () => {
  const [map, { set, remove, clear }] = useMap([['apples', 10]]);

  return (
    <div>
      <button onClick={() => set(Date.now(), new Date().toJSON())}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove('apples')} disabled={!map.has('apples')}>
        Remove apples
      </button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {}
          ),
          null,
          2
        )}
      </pre>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useSet` hook

Similar to `useMap`, the `useSet` hook creates a stateful `Set` object and a set of functions to manipulate it. The implementation is very similar to the previous hook, but instead of using a `Map`, you use a `Set`.

```jsx
const useSet = initialValue => {
  const [set, setSet] = React.useState(new Set(initialValue));

  const actions = React.useMemo(
    () => ({
      add: item => setSet(prevSet => new Set([...prevSet, item])),
      remove: item =>
        setSet(prevSet => new Set([...prevSet].filter(i => i !== item))),
      clear: () => setSet(new Set()),
    }),
    [setSet]
  );

  return [set, actions];
};

const MyApp = () => {
  const [set, { add, remove, clear }] = useSet(new Set(['apples']));

  return (
    <div>
      <button onClick={() => add(String(Date.now()))}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove('apples')} disabled={!set.has('apples')}>
        Remove apples
      </button>
      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useDefault` hook

Similar to the previous hook, we might also need a hook that provides a **default value** if the state is `null` or `undefined`. The `useDefault` hook does exactly that. It creates a stateful value with a default fallback if it's `null` or `undefined`, and a function to update it.

The approach is very similar to the previous hook. You use the `useState()` hook to create the stateful value. Then, you check if the value is either `null` or `undefined`. If it is, you return the `defaultState`, otherwise you return the actual `value` state, alongside the `setValue` function.

```jsx
const useDefault = (defaultState, initialState) => {
  const [value, setValue] = React.useState(initialState);
  const isValueEmpty = value === undefined || value === null;

  return [isValueEmpty ? defaultState : value, setValue];
};

const UserCard = () => {
  const [user, setUser] = useDefault({ name: 'Adam' }, { name: 'John' });

  return (
    <>
      <div>User: {user.name}</div>
      <input onChange={e => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>Clear</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserCard />
);
```

## `useGetSet` hook

Instead of returning a single state variable and its setter, you might want to return **a getter and a setter** function. This is the job of the `useGetSet` hook. It creates a stateful value, returning a getter and a setter function.

In order to implement this hook, you use the `useRef()` hook to create a ref that holds the stateful value, initializing it with `initialState`. Then, you use the `useReducer()` hook that creates a new object every time it's updated and return its dispatch.

Finally, you use the `useMemo()` hook to memoize a pair of functions. The first one will return the current value of the `state` ref and the second one will update it and force a re-render.

```jsx
const useGetSet = initialState => {
  const state = React.useRef(initialState);
  const [, update] = React.useReducer(() => ({}));

  return React.useMemo(
    () => [
      () => state.current,
      newState => {
        state.current = newState;
        update();
      },
    ],
    []
  );
};

const Counter = () => {
  const [getCount, setCount] = useGetSet(0);
  const onClick = () => {
    setTimeout(() => {
      setCount(getCount() + 1);
    }, 1_000);
  };

  return <button onClick={onClick}>Count: {getCount()}</button>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Counter />
);
```

## `useMergeState` hook

Similar to the `useReducer()` hook, the `useMergeState` hook allows you to update the state by **merging the new state** provided with the existing one. It creates a stateful value and a function to update it by merging the new state provided.

All you need to do to implement it is use the `useState()` hook to create a state variable, initializing it to `initialState`. Then, create a function that will update the state variable by merging the new state provided with the existing one. If the new state is a **function**, call it with the previous state as the argument and use the result.

Omit the argument to initialize the state variable with an empty object (`{}`).

```jsx
const useMergeState = (initialState = {}) => {
  const [value, setValue] = React.useState(initialState);

  const mergeState = newState => {
    if (typeof newState === 'function') newState = newState(value);
    setValue({ ...value, ...newState });
  };

  return [value, mergeState];
};

const MyApp = () => {
  const [data, setData] = useMergeState({ name: 'John', age: 20 });

  return (
    <>
      <input
        value={data.name}
        onChange={e => setData({ name: e.target.value })}
      />
      <button onClick={() => setData(({ age }) => ({ age: age - 1 }))}>
        -
      </button>
      {data.age}
      <button onClick={() => setData(({ age }) => ({ age: age + 1 }))}>
        +
      </button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `usePrevious` hook

The `usePrevious` hook is a very useful hook that stores the **previous state** or props. It's a custom hook that takes a `value` and returns the previous value. It uses the `useRef()` hook to create a ref for the `value` and the `useEffect()` hook to remember the latest `value`.

```jsx
const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Counter = () => {
  const [value, setValue] = React.useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>
        Current: {value} - Previous: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Counter />
);
```

## `useDebounce` hook

Similar to the `usePrevious` hook, the `useDebounce` hook is a custom hook that **debounces the given value**. It takes a `value` and a `delay` and returns the debounced value. It uses the `useState()` hook to store the debounced value and the `useEffect()` hook to update the debounced value every time the `value` is updated.

Using `setTimeout()`, it creates a timeout that delays invoking the setter of the previous state variable by `delay` milliseconds. Then, it uses `clearTimeout()` to clean up when dismounting the component. This is particularly useful when dealing with user input.

```jsx
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

const Counter = () => {
  const [value, setValue] = React.useState(0);
  const lastValue = useDebounce(value, 500);

  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Counter />
);
```

## `useDelayedState` hook

Instead of creating a stateful value immediately, you might want to **delay its creation** until some condition is met. This is where the `useDelayedState` hook comes in. It creates a stateful value that is only updated if the `condition` is met.

Implementing this hook requires the use of the `useState()` and `useEffect()` hooks. You create a stateful value containing the actual `state` and a boolean, `loaded`. Then, you update the stateful value if the `condition` or `loaded` changes. Finally, you create a function, `updateState`, that only updates the `state` value if `loaded` is truthy.

```jsx
const useDelayedState = (initialState, condition) => {
  const [{ state, loaded }, setState] = React.useState({
    state: null,
    loaded: false,
  });

  React.useEffect(() => {
    if (!loaded && condition) setState({ state: initialState, loaded: true });
  }, [condition, loaded]);

  const updateState = newState => {
    if (!loaded) return;
    setState({ state: newState, loaded });
  };

  return [state, updateState];
};

const App = () => {
  const [branches, setBranches] = React.useState([]);
  const [selectedBranch, setSelectedBranch] = useDelayedState(
    branches[0],
    branches.length
  );

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setBranches(['master', 'staging', 'test', 'dev']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>Selected branch: {selectedBranch}</p>
      <select onChange={e => setSelectedBranch(e.target.value)}>
        {branches.map(branch => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```

## `useForm` hook

Last but not least, the `useForm` hook can be used to create a stateful value from the **fields in a form**. It uses the `useState()` hook to create a state variable for the values in the form and a function that will be called with an appropriate event by a form field to update the state variable accordingly.

```jsx
const useForm = initialValues => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
};

const Form = () => {
  const initialState = { email: '', password: '' };
  const [values, setValues] = useForm(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={setValues} />
      <input type="password" name="password" onChange={setValues} />
      <button type="submit">Submit</button>
    </form>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Form />
);
```
