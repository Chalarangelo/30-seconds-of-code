import config from '../../config';

const createWhitelistConfig = (key, storage, whitelist) => ({
  key: `${config.stateName}@${key}`,
  storage,
  whitelist,
});

const createBlacklistConfig = (key, storage, blacklist) => ({
  key: `${config.stateName}@${key}`,
  storage,
  blacklist,
});

const createPersistConfig = (config, storage) => {
  if (typeof config.blacklist !== 'undefined' && config.blacklist)
    return createBlacklistConfig(config.key, storage, config.blacklist);
  return createWhitelistConfig(config.key, storage, config.whitelist);
};

export default createPersistConfig;
