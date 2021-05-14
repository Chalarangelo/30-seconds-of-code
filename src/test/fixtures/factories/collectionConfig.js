import FixtureFactory from '@fixture-factory/fixture-factory';
import { CollectionConfig } from 'blocks/entities/collectionConfig';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

const factory = new FixtureFactory();

factory
  .define('RawConfig', () => ({
    slug: 'c/collection',
    name: 'JavaScript Collection',
    featured: 2,
    snippetIds: ['react/s/any', 'dart/s/any'],
    iconName: 'js',
    description: 'Lorem ipsum dolor sit amet',
    shortDescription: 'Lorem ipsum',
  }))
  .trait('snippets', snippetIds => ({ snippetIds }));

factory.define(
  'CollectionConfig',
  () => new CollectionConfig(factory.create('RawConfig'))
);

let collectionConfig;

factory.define('CollectionConfigPresets', () => {
  const { snippet, unlistedSnippet } = SnippetFactory.create('SnippetPresets');

  collectionConfig = !collectionConfig
    ? factory.create('RawConfig')
    : collectionConfig;

  return {
    snippets: [snippet, unlistedSnippet],
    collectionConfig,
  };
});

export default factory.package();
