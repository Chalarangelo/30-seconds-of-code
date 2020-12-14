import { ContentConfig } from '.';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { setupEnv } from 'blocks/utilities/env';

describe('ContentConfig', () => {
  let configs = {};

  beforeAll(() => {
    setupEnv();
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
      expect(configs.react.featured).toBe(rawConfigs.react.featured);
      expect(configs.react.theme).toBe(rawConfigs.react.theme);
      expect(configs.react.biasPenaltyMultiplier).toBe(
        rawConfigs.react.biasPenaltyMultiplier
      );
      expect(configs.react.cardTemplate).toBe('StandardSnippetCard');
      expect(configs.blog.cardTemplate).toBe(rawConfigs.blog.cardTemplate);
    });

    it('should store langData', () => {
      expect(ContentConfig.langData.length).not.toBe(0);
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
      expect(configs.react.icon).toBe(rawConfigs.react.theme.iconName);
    });

    it('should produce the correct source directory', () => {
      expect(configs.react.sourceDir.startsWith(rawConfigs.react.dirName)).toBe(
        true
      );
      expect(
        configs.react.sourceDir.endsWith(rawConfigs.react.snippetPath)
      ).toBe(true);
    });

    it('should return the languge data from the class', () => {
      expect(configs.react.langData).toBe(ContentConfig.langData);
    });

    it('should produce the correct common data', () => {
      expect(Object.keys(configs.react.commonData)).toEqual([
        'blog',
        'language',
      ]);
    });

    it('should return the correct asset path', () => {
      expect(
        configs.blog.assetPath.endsWith(global.settings.paths.staticAssetPath)
      ).toBe(true);
    });

    it('should return the correct output path', () => {
      expect(
        configs.blog.outPath.endsWith(global.settings.paths.contentPath)
      ).toBe(true);
    });
  });
});
