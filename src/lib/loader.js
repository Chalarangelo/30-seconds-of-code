import fs from 'fs';

import models from '../models/models.js';
import serializers from '../serializers/serializers.js';
import pages from '../adapters/page/page.js';
import Model from '../core/model.js';
import SearchIndex from './searchIndex.js';
import Page from '../adapters/page.js';
import AstroContent from './astroContent.js';
import Feed from './feed.js';
import Sitemap from './sitemap.js';
import Redirects from './redirects.js';
import PerformanceTracking from './performanceTracking.js';
import PreparedQueries from './preparedQueries.js';

import factories from '../../spec/factories/factories.js';

import settings from '../config/settings.js';

export default class Loader {
  static loadModules() {
    return {
      settings,
      models,
      serializers,
      pages,
      Model,
      SearchIndex,
      Page,
      AstroContent,
      Feed,
      Sitemap,
      Redirects,
      PerformanceTracking,
      PreparedQueries,
    };
  }

  static importData() {
    if (!this.importedData) {
      const data = fs.readFileSync(settings.paths.contentJSON, 'utf8');

      this.importedData = JSON.parse(data, (key, value) => {
        if (!value?.model) return value;
        return new models[value.model](value);
      });
    }

    return this.importedData;
  }

  static buildFactories() {
    return Object.entries(factories).reduce(
      (acc, [factoryName, { model, base, traits }]) => {
        acc[factoryName] = {
          create: (...desiredTraits) => {
            const data = { ...base };
            desiredTraits.forEach(trait => {
              if (typeof trait === 'string') {
                Object.assign(data, traits[trait]);
              } else {
                Object.assign(data, trait);
              }
            });
            return new models[model](data);
          },
        };
        return acc;
      },
      {}
    );
  }
}
