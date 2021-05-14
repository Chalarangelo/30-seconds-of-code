import { CollectionConfig } from '.';
import { ArgsError } from 'blocks/utilities/error';
import { Env } from 'blocks/utilities/env';
import CollectionConfigFactory from 'test/fixtures/factories/collectionConfig';

const rawConfig = CollectionConfigFactory.create('RawConfig');

describe('ColectionConfig', () => {
  beforeAll(() => {
    Env.setup();
  });

  describe('constructor', () => {
    it('throws an error if called without all required keys', () => {
      expect(() => new CollectionConfig({})).toThrow(ArgsError);
    });
  });

  describe('constructed with valid data', () => {
    let collectionConfig;
    beforeAll(() => {
      collectionConfig = new CollectionConfig(rawConfig);
    });

    it('should contain all passed data', () => {
      expect(collectionConfig.name).toBe(rawConfig.name);
      expect(collectionConfig.description).toBe(rawConfig.description);
      expect(collectionConfig.slug).toBe(rawConfig.slug);
      expect(collectionConfig.featured).toBe(Boolean(rawConfig.featured));
      expect(collectionConfig.snippetIds).toEqual(rawConfig.snippetIds);
      expect(collectionConfig.iconName).toEqual(rawConfig.iconName);
    });

    it('should produce the correct id', () => {
      expect(collectionConfig.id).toBe(rawConfig.slug);
    });

    it('should produce the correct icon', () => {
      expect(collectionConfig.icon).toBe(rawConfig.iconName);
    });
  });
});
