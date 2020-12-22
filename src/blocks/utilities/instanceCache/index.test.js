import { InstanceCache } from '.';

describe('InstanceCache', () => {
  let instanceCache;
  beforeEach(() => {
    instanceCache = new InstanceCache();
  });

  afterEach(() => {
    instanceCache.clear();
  });

  describe('add', () => {
    beforeEach(() => {
      instanceCache.add('test-item', 'test');
    });

    it('adds the instance to the cache', () => {
      expect(instanceCache['test-item']).toBe('test');
    });

    it('replaces the existing instance when given the same key', () => {
      instanceCache.add('test-item', 'hey');
      expect(instanceCache['test-item']).toBe('hey');
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      instanceCache.add('test-item', 'test');
      instanceCache.add('removeme', 'remove');
    });

    it('removes the specified instance from the cache', () => {
      instanceCache.remove('removeme');
      expect(typeof instanceCache['removeme']).toBe('undefined');
      expect(instanceCache.length).toBe(1);
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      instanceCache.add('test-item', 'test');
      instanceCache.add('removeme', 'remove');
    });

    it('removes all instances from the cache', () => {
      instanceCache.clear();
      expect(instanceCache.length).toBe(0);
    });
  });

  describe('Symbol.iterator', () => {
    beforeEach(() => {
      instanceCache.add('first', 'one');
      instanceCache.add('second', 'two');
    });

    it('should be iterable', () => {
      expect([...instanceCache]).toEqual(['one', 'two']);
    });
  });

  describe('length', () => {
    beforeEach(() => {
      instanceCache.add('first', 'one');
      instanceCache.add('second', 'two');
    });

    it('should match the number of cached instances', () => {
      expect(instanceCache.length).toBe(2);
    });
  });

  describe('contains', () => {
    beforeEach(() => {
      instanceCache.add('first', 'one');
      instanceCache.add('second', 'two');
    });

    it('should return true for a stored key', () => {
      expect(instanceCache.contains('first')).toBe(true);
    });

    it('should return false for unknown keys', () => {
      expect(instanceCache.contains('third')).toBe(false);
    });
  });

  describe('find', () => {
    beforeEach(() => {
      instanceCache.add('item1', 'value1');
      instanceCache.add('item2', 'value2');
    });

    it('should return the first matching item', () => {
      expect(instanceCache.find(x => x.startsWith('v'))).toBe('value1');
    });

    it('should return undefined if there are no matching items', () => {
      expect(instanceCache.find(x => x.startsWith('x'))).toBe(undefined);
    });
  });

  describe('find', () => {
    beforeEach(() => {
      instanceCache.add('item1', 'value1');
      instanceCache.add('item2', 'value2');
    });

    it('should return all matching items', () => {
      expect(instanceCache.findAll(x => x.startsWith('v'))).toEqual([
        'value1',
        'value2',
      ]);
    });

    it('should return an empty array if there are no matching items', () => {
      expect(instanceCache.findAll(x => x.startsWith('x'))).toEqual([]);
    });
  });
});
