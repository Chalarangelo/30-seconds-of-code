import { ContentConfig } from '.';
import { ArgsError } from 'blocks/utilities/error';
import { Env } from 'blocks/utilities/env';
import ContentConfigFactory from 'test/fixtures/factories/contentConfig';

describe('ContentConfig', () => {
  const rawConfigs = {
    blog: ContentConfigFactory.create('RawConfig', 'blog'),
    css: ContentConfigFactory.create('RawConfig', 'css'),
    react: ContentConfigFactory.create('RawConfig', 'react'),
    dart: ContentConfigFactory.create('RawConfig', 'dart'),
  };
  let configs = {};

  beforeAll(() => {
    Env.setup();
  });

  describe('constructor', () => {
    it('throws an error if called without any of the required keys', () => {
      expect(() => new ContentConfig({})).toThrow(ArgsError);
    });
  });

  describe('constructed with normal content config data', () => {
    beforeAll(() => {
      Object.keys(rawConfigs).forEach(name => {
        configs[name] = new ContentConfig(rawConfigs[name]);
      });
    });

    it('should contain all passed data', () => {
      expect(configs.react.name).toBe(rawConfigs.react.name);
      expect(configs.react.dirName).toBe(rawConfigs.react.dirName);
      expect(configs.react.repoUrl).toBe(rawConfigs.react.repoUrl);
      expect(configs.react.snippetPath).toBe(rawConfigs.react.snippetPath);
      expect(configs.react.slug).toBe(rawConfigs.react.slug);
      expect(configs.react.featured).toBe(Boolean(rawConfigs.react.featured));
      expect(configs.react.iconName).toBe(rawConfigs.react.iconName);
      expect(configs.react.biasPenaltyMultiplier).toBe(
        rawConfigs.react.biasPenaltyMultiplier
      );
      expect(configs.react.cardTemplate).toBe('StandardSnippetCard');
      expect(configs.blog.cardTemplate).toBe(rawConfigs.blog.cardTemplate);
    });

    it('should store languageData', () => {
      expect(ContentConfig.languageData.size).not.toBe(0);
    });

    it('should produce the correct id', () => {
      expect(configs.react.id).toBe(configs.react.dirName);
    });

    it('should produce the correct slug prefix', () => {
      expect(configs.react.slugPrefix.startsWith(rawConfigs.react.slug)).toBe(
        true
      );
    });

    it('should produce the correct url prefix', () => {
      expect(
        configs.react.repoUrlPrefix.startsWith(rawConfigs.react.repoUrl)
      ).toBe(true);
    });

    it('should produce the correct vs code url prefix', () => {
      expect(
        configs.react.vscodeUrlPrefix.endsWith(configs.react.sourceDir)
      ).toBe(true);
    });

    it('should produce the correct isBlog value', () => {
      expect(configs.react.isBlog).toBe(false);
      expect(configs.blog.isBlog).toBe(true);
    });

    it('should produce the correct isCSS value', () => {
      expect(configs.react.isCSS).toBe(false);
      expect(configs.css.isCSS).toBe(true);
    });

    it('should produce the correct optional language value', () => {
      expect(configs.react.hasOptionalLanguage).toBe(true);
      expect(configs.blog.hasOptionalLanguage).toBe(false);
      expect(configs.css.hasOptionalLanguage).toBe(false);
      expect(configs.dart.hasOptionalLanguage).toBe(false);
    });

    it('should contain authors if it is a blog', () => {
      expect(configs.blog.authors).not.toEqual([]);
      expect(configs.react.authors).toEqual([]);
    });

    it('should produce the correct icon', () => {
      expect(configs.react.icon).toBe(rawConfigs.react.iconName);
    });

    it('should produce the correct source directory', () => {
      expect(configs.react.sourceDir.startsWith(rawConfigs.react.dirName)).toBe(
        true
      );
      expect(
        configs.react.sourceDir.endsWith(rawConfigs.react.snippetPath)
      ).toBe(true);
    });

    it('should return the language data from the class', () => {
      expect(configs.react.languageData).toEqual([
        ...ContentConfig.languageData.values(),
      ]);
    });

    it('should produce the correct common data', () => {
      expect(Object.keys(configs.react.commonData)).toEqual([
        'blog',
        'language',
      ]);
    });
  });

  describe('findContentConfigFromRawSnippet', () => {
    it('returns the correct result', () => {
      expect(
        ContentConfig.findContentConfigFromRawSnippet(
          'content/sources/30code/snippets/any.md'
        ).name
      ).toBe('30 seconds of code');
    });
  });

  describe('findSlugFromRawSnippet', () => {
    it('returns the correct result', () => {
      expect(
        ContentConfig.findSlugFromRawSnippet(
          'content/sources/30code/snippets/any.md'
        )
      ).toBe('/js/s/any');
    });
  });
});
