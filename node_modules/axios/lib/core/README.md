# axios // core

The modules found in `core/` should be modules that are specific to the domain logic of axios. These modules would most likely not make sense to be consumed outside of the axios module, as their logic is too specific. Some examples of core modules are:

- Dispatching requests
- Managing interceptors
- Handling config
