import fetch from 'node-fetch';
import Twitter from 'twitter';
import fs from 'fs-extra';
import { sample } from 'utils';
import { Logger } from 'blocks/utilities/logger';

const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

/* eslint-disable camelcase */
export class TwitterBot {
  static client = new Twitter({
    consumer_key: process.env['CONSUMER_KEY'],
    consumer_secret: process.env['CONSUMER_SECRET'],
    access_token_key: process.env['ACCESS_TOKEN_KEY'],
    access_token_secret: process.env['ACCESS_TOKEN_SECRET'],
  });

  /**
   * Fetches a random snippet chirp.
   * @param {string} url - chirp.json URL.
   */
  static getRandomSnippet = async (url = global.settings.tweet.chirpUrl) => {
    const boundLog = Logger.bind('utilities.screenshot.getRandomSnippet');
    boundLog('Fetching random snippet', 'info');
    const chirp = await fetch(url);
    let links = await chirp.json();
    boundLog('Finished fetching random snippet', 'success');
    return sample(links);
  };

  /**
   * Tweets a media tweet with a screenshot and a snippet caption.
   * @param {string} description - The caption of the tweet.
   */
  static tweet = promisify(description => {
    const boundLog = Logger.bind('utilities.screenshot.tweet');
    boundLog('Preparing tweet', 'info');
    // TODO: Figure out why this cannot be a parameter and fix it
    const snippetImage = fs.readFileSync(
      global.settings.tweet.screenshotFileName
    );
    TwitterBot.client.post(
      'media/upload',
      { media: snippetImage },
      function (error, media) {
        if (!error) {
          // If successful, a media object will be returned.
          boundLog('Finished uploading media', 'success');

          // Let's tweet it
          var status = {
            status: description,
            media_ids: media.media_id_string, // Pass the media id string
          };

          TwitterBot.client.post('statuses/update', status, function (error) {
            if (!error) boundLog('Tweet successful', 'success');
          });
        } else boundLog(`Error: ${error}`, 'error');
      }
    );
  });
}
