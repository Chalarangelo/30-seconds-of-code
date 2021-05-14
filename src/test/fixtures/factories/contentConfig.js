import FixtureFactory, { Traits } from '@fixture-factory/fixture-factory';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { Env } from 'blocks/utilities/env';

const factory = new FixtureFactory();

factory
  .define('RawConfig', () => ({
    name: '30 seconds of Something',
    dirName: '30something',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-something',
    snippetPath: 'snippets',
    language: {
      short: 'Something',
      long: 'some',
    },
    slug: 'some',
    featured: true,
    iconName: 'some',
    biasPenaltyMultiplier: 1.05,
  }))
  .trait('tag data', {
    tagMetadata: {
      array: {
        name: 'Test name',
        description: 'Test description',
      },
    },
  })
  .trait('archived', { featured: false })
  .trait('blog', {
    name: '30 seconds Blog',
    dirName: '30blog',
    repoUrl: 'https://github.com/30-seconds/30-seconds-blog',
    snippetPath: 'blog_posts',
    slug: 'blog',
    isBlog: true,
    iconName: 'blog',
    biasPenaltyMultiplier: 1,
    language: undefined,
    images: {
      name: 'blog_images',
      path: 'blog_images',
    },
    cardTemplate: 'BlogSnippetCard',
  })
  .trait('css', {
    name: '30 seconds of CSS',
    dirName: '30css',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-css',
    language: {
      short: 'css',
      long: 'CSS',
    },
    secondLanguage: {
      short: 'html',
      long: 'HTML',
    },
    optionalLanguage: {
      short: 'js',
      long: 'JavaScript',
    },
    slug: 'css',
    iconName: 'css',
    cardTemplate: 'CssSnippetCard',
  })
  .trait('react', {
    name: '30 seconds of React',
    dirName: '30react',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-react',
    language: {
      short: 'jsx',
      long: 'React',
    },
    optionalLanguage: {
      short: 'css',
      long: 'CSS',
    },
    slug: 'react',
    iconName: 'react',
    biasPenaltyMultiplier: 1.25,
  })
  .trait('dart', {
    name: '30 seconds of Dart',
    dirName: '30dart',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-dart',
    language: {
      short: 'dart',
      long: 'Dart',
    },
    slug: 'dart',
    iconName: 'dart',
    biasPenaltyMultiplier: 1.3,
    description: 'Lorem ipsum dolor sit amet.',
    shortDescription: 'Lorem ipsum',
    [Traits]: ['archived', 'tag data'],
  });

factory
  .define('ContentConfig', () => new ContentConfig(factory.create('RawConfig')))
  .trait('blog', () => new ContentConfig(factory.create('RawConfig', 'blog')))
  .trait('css', () => new ContentConfig(factory.create('RawConfig', 'css')))
  .trait('react', () => new ContentConfig(factory.create('RawConfig', 'react')))
  .trait('dart', () => new ContentConfig(factory.create('RawConfig', 'dart')));

let rawConfigs, configs;

factory.define('ContentConfigPresets', () => {
  Env.setup();

  rawConfigs = !rawConfigs
    ? {
        blog: factory.create('RawConfig', 'blog'),
        css: factory.create('RawConfig', 'css'),
        react: factory.create('RawConfig', 'react'),
        dart: factory.create('RawConfig', 'dart'),
      }
    : rawConfigs;

  configs = !configs
    ? {
        blog: new ContentConfig(rawConfigs.blog),
        css: new ContentConfig(rawConfigs.css),
        react: new ContentConfig(rawConfigs.react),
        dart: new ContentConfig(rawConfigs.dart),
      }
    : configs;

  return configs;
});

export default factory.package();
