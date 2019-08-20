# LibSass smart pointer implementation

LibSass uses smart pointers very similar to `shared_ptr` known
by Boost or C++11. Implementation is a bit less modular since
it was not needed. Various compile time debug options are
available if you need to debug memory life-cycles.


## Memory Classes

### SharedObj

Base class for the actual node implementations. This ensures
that every object has a reference counter and other values.

```c++
class AST_Node : public SharedObj { ... };
```

### SharedPtr (base class for SharedImpl)

Base class that holds on to the pointer. The reference counter
is stored inside the pointer object directly (`SharedObj`).

### SharedImpl (inherits from SharedPtr)

This is the main base class for objects you use in your code. It
will make sure that the memory it points at will be deleted once
all copies to the same object/memory go out of scope.

```c++
Class* pointer = new Class(...);
SharedImpl<Class> obj(pointer);
```

To spare the developer of typing the templated class every time,
we created typedefs for each available AST Node specialization.

```c++
typedef SharedImpl<Number> Number_Obj;
Number_Obj number = SASS_MEMORY_NEW(...);
```


## Memory life-cycles

### Pointer pickups

I often use the terminology of "pickup". This means the moment when
a raw pointer not under any control is assigned to a reference counted
object (`XYZ_Obj = XYZ_Ptr`). From that point on memory will be
automatically released once the object goes out of scope (but only
if the reference counter reaches zero). Main point beeing, you don't
have to worry about memory management yourself.

### Object detach

Sometimes we can't return reference counted objects directly (see
invalid covariant return types problems below). But we often still
need to use reference objects inside a function to avoid leaks when
something throws. For this you can use `detach`, which basically
detaches the pointer memory from the reference counted object. So
when the reference counted object goes out of scope, it will not
free the attached memory. You are now again in charge of freeing
the memory (just assign it to a reference counted object again).


## Circular references

Reference counted memory implementations are prone to circular references.
This can be addressed by using a multi generation garbage collector. But
for our use-case that seems overkill. There is no way so far for users
(sass code) to create circular references. Therefore we can code around
this possible issue. But developers should be aware of this limitation.

There are AFAIR two places where circular references could happen. One is
the `sources` member on every `Selector`. The other one can happen in the
extend code (Node handling). The easy way to avoid this is to only assign
complete object clones to these members. If you know the objects lifetime
is longer than the reference you create, you can also just store the raw
pointer. Once needed this could be solved with weak pointers.


## Addressing the invalid covariant return types problems

If you are not familiar with the mentioned problem, you may want
to read up on covariant return types and virtual functions, i.e.

- http://stackoverflow.com/questions/6924754/return-type-covariance-with-smart-pointers
- http://stackoverflow.com/questions/196733/how-can-i-use-covariant-return-types-with-smart-pointers
- http://stackoverflow.com/questions/2687790/how-to-accomplish-covariant-return-types-when-returning-a-shared-ptr

We hit this issue at least with the CRTP visitor pattern (eval, expand,
listize and so forth). This means we cannot return reference counted
objects directly. We are forced to return raw pointers or we would need
to have a lot of explicit and expensive upcasts by callers/consumers.

### Simple functions that allocate new AST Nodes

In the parser step we often create new objects and can just return a
unique pointer (meaning ownership clearly shifts back to the caller).
The caller/consumer is responsible that the memory is freed.

```c++
typedef Number* Number_Ptr;
int parse_integer() {
  ... // do the parsing
  return 42;
}
Number_Ptr parse_number() {
  Number_Ptr p_nr = SASS_MEMORY_NEW(...);
  p_nr->value(parse_integer());
  return p_nr;
}
Number_Obj nr = parse_number();
```

The above would be the encouraged pattern for such simple cases.

### Allocate new AST Nodes in functions that can throw

There is a major caveat with the previous example, considering this
more real-life implementation that throws an error. The throw may
happen deep down in another function. Holding raw pointers that
we need to free would leak in this case.

```c++
int parse_integer() {
  ... // do the parsing
  if (error) throw(error);
  return 42;
}
```

With this `parse_integer` function the previous example would leak memory.
I guess it is pretty obvious, as the allocated memory will not be freed,
as it was never assigned to a SharedObj value. Therefore the above code
would better be written as:

```c++
typedef Number* Number_Ptr;
int parse_integer() {
  ... // do the parsing
  if (error) throw(error);
  return 42;
}
// this leaks due to pointer return
// should return Number_Obj instead
// though not possible for virtuals!
Number_Ptr parse_number() {
  Number_Obj nr = SASS_MEMORY_NEW(...);
  nr->value(parse_integer()); // throws
  return &nr; // Ptr from Obj
}
Number_Obj nr = parse_number();
// will now be freed automatically
```

The example above unfortunately will not work as is, since we return a
`Number_Ptr` from that function. Therefore the object allocated inside
the function is already gone when it is picked up again by the caller.
The easy fix for the given simplified use case would be to change the
return type of `parse_number` to `Number_Obj`. Indeed we do it exactly
this way in the parser. But as stated above, this will not work for
virtual functions due to invalid covariant return types!

### Return managed objects from virtual functions

The easy fix would be to just create a new copy on the heap and return
that. But this seems like a very inelegant solution to this problem. I
mean why can't we just tell the object to treat it like a newly allocated
object? And indeed we can. I've added a `detach` method that will tell
the object to survive deallocation until the next pickup. This means
that it will leak if it is not picked up by consumer.

```c++
typedef Number* Number_Ptr;
int parse_integer() {
  ... // do the parsing
  if (error) throw(error);
  return 42;
}
Number_Ptr parse_number() {
  Number_Obj nr = SASS_MEMORY_NEW(...);
  nr->value(parse_integer()); // throws
  return nr.detach();
}
Number_Obj nr = parse_number();
// will now be freed automatically
```


## Compile time debug options

To enable memory debugging you need to define `DEBUG_SHARED_PTR`.
This can i.e. be done in `include/sass/base.h`

```c++
define DEBUG_SHARED_PTR
```

This will print lost memory on exit to stderr. You can also use
`setDbg(true)` on sepecific variables to emit reference counter
increase, decrease and other events.


## Why reinvent the wheel when there is `shared_ptr` from C++11

First, implementing a smart pointer class is not really that hard. It
was indeed also a learning experience for myself. But there are more
profound advantages:

- Better GCC 4.4 compatibility (which most code still has OOTB)
- Not thread safe (give us some free performance on some compiler)
- Beeing able to track memory allocations for debugging purposes
- Adding additional features if needed (as seen in `detach`)
- Optional: optimized weak pointer implementation possible

### Thread Safety

As said above, this is not thread safe currently. But we don't need
this ATM anyway. And I guess we probably never will share AST Nodes
across different threads.