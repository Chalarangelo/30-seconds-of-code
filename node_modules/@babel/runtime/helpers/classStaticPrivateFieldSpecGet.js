function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }

  return descriptor.value;
}

module.exports = _classStaticPrivateFieldSpecGet;