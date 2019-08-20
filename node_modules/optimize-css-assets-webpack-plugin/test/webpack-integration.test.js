/* eslint-disable import/no-dynamic-require, global-require */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from '../src/';
import { readFileOrEmpty, defaultConfig, checkForWebpackErrors } from './util/helpers';

const cases = process.env.CASES ? process.env.CASES.split(',') : fs.readdirSync(path.join(__dirname, 'cases'));

describe('Webpack Integration Tests', () => {
  cases.forEach((testCase) => {
    if (/^_skip_/.test(testCase)) return;
    it(testCase, (done) => {
      const testDirectory = path.join(__dirname, 'cases', testCase);
      const outputDirectory = path.join(__dirname, 'js', testCase);
      const expectedDirectory = path.join(testDirectory, 'expected');

      const configFile = path.join(testDirectory, 'webpack.config.js');
      const config = Object.assign(
        fs.existsSync(configFile) ? require(configFile) : { entry: { test: './index.js' } },
        {
          context: testDirectory,
          output: {
            filename: '[name].js',
            path: outputDirectory
          }
        }
      );

      webpack(config, (err, stats) => {
        checkForWebpackErrors({ err, stats, done });
        fs.readdirSync(expectedDirectory).forEach((file) => {
          const expectedFile = readFileOrEmpty(path.join(expectedDirectory, file));
          const actualFile = readFileOrEmpty(path.join(outputDirectory, file));
          expect(actualFile).toEqual(expectedFile);
          expect(actualFile).toMatchSnapshot();
        });
        done();
      });
    });
  });

  it('calls cssProcessor with correct arguments', (done) => {
    const destination = 'destination.css';
    const expectedCss = readFileOrEmpty(__dirname + '/util/default.css');
    const cssProcessorOptions = { discardComments: { removeAll: true } };
    const cssProcessor = {
      process: (actualCss, options) => {
        expect(options).toEqual(expect.objectContaining(cssProcessorOptions));
        expect(actualCss).toEqual(expectedCss);
        return Promise.resolve({ css: actualCss });
      }
    };
    const plugin = new OptimizeCssAssetsPlugin({ cssProcessor, cssProcessorOptions });
    const config = Object.assign(defaultConfig, {plugins: [plugin, new ExtractTextPlugin(destination)]});

    webpack(config, (err, stats) => {
      checkForWebpackErrors({ err, stats, done });
      done();
    });
  });

  it('writes processed css to destination', (done) => {
    const destination = 'destination.css';
    const expectedCss = '.inifinity-pool{overflow:hidden;}';
    const fakeCssProcessor = {
      process: jest.fn().mockReturnValue(Promise.resolve({ css: expectedCss }))
    };
    const plugin = new OptimizeCssAssetsPlugin({ cssProcessor: fakeCssProcessor });
    const config = Object.assign(defaultConfig, {plugins: [plugin, new ExtractTextPlugin(destination)]});

    webpack(config, (err, stats) => {
      checkForWebpackErrors({ err, stats, done });
      const actualCss = readFileOrEmpty(__dirname + '/js/default-exports/destination.css');

      expect(fakeCssProcessor.process).toHaveBeenCalled();
      expect(actualCss).toEqual(expectedCss);
      done();
    });
  });
});
