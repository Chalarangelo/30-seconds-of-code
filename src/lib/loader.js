import fs from 'fs';

import models from '#src/models/models.js';
import serializers from '#src/serializers/serializers.js';
import pages from '#src/adapters/page/page.js';
import Model from '#src/core/model.js';
import SearchIndex from '#src/lib/searchIndex.js';
import Page from '#src/adapters/page.js';
import AstroContent from '#src/lib/astroContent.js';
import Feed from '#src/lib/feed.js';
import Sitemap from '#src/lib/sitemap.js';
import Redirects from '#src/lib/redirects.js';
import PerformanceTracking from '#src/lib/performanceTracking.js';
import PreparedQueries from '#src/lib/preparedQueries.js';
import TimestampDump from '#src/lib/timestampDump.js';
import DocumentIndex from '#src/lib/search/documentIndex.js';

import factories from '#spec/factories/factories.js';

import settings from '#src/config/settings.js';

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
      TimestampDump,
      DocumentIndex,
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
