import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import Twitter from 'twitter';
import fs from 'fs-extra';
import { sample } from 'utils';
import { Logger } from 'blocks/utilities/logger';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
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
  static getRandomSnippet = async () => {
    const url = 'https://www.30secondsofcode.org/chirp.json';
    const logger = new Logger('TwitterBot.getRandomSnippet');
    logger.log('Fetching random snippet');
    const chirp = await fetch(url);
    let links = await chirp.json();
    logger.success('Finished fetching random snippet');
    return sample(links);
  };

  /**
   * Captures a screenshot of the specified snippet.
   * @param {string} url - Live URL of the snippet.
   */
  static capture = async url => {
    const path = 'snippet.png';
    const logger = new Logger('TwitterBot.capture');
    logger.log(`Capturing screenshot for ${url}`);
    // Open the browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 3000,
    });

    // Go to the specified URL
    await page.goto(url);
    await sleep(1000);
    await page.evaluate(() => {
      // Remove card actions
      const cardActions = document.querySelector('.card-actions');
      cardActions.remove();

      // Style card
      const card = document.querySelector('.snippet-card');
      card.classList.remove('srfc-02dp');
      card.classList.add('srfc-02db');
      card.style.maxWidth = '800px';
      card.style.zIndex = '8';
      // Add logo inside the card
      const logo = document.querySelector('.nav-website-logo');
      logo.style.position = 'absolute';
      logo.style.top = '32px';
      logo.style.right = '24px';
      logo.style.width = '52px';
      logo.style.height = '52px';
      card.prepend(logo);

      // Add wrapper around the card
      const {
        width: cardWidth,
        height: cardHeight,
      } = card.getBoundingClientRect();
      const wrapperSize = Math.max(cardWidth, cardHeight, 900);
      const wrapper = document.createElement('div');
      card.parentNode.insertBefore(wrapper, card);
      wrapper.appendChild(card);
      wrapper.id = 'custom-card';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'center';
      wrapper.style.width = `${wrapperSize}px`;
      wrapper.style.height = `${wrapperSize}px`;
      wrapper.style.padding = '40px 20px';
      wrapper.style.position = 'relative';
    });
    // Capture screenshot
    await sleep(5000);
    const element = await page.$('#custom-card');
    await element.screenshot({ path });
    await sleep(3000);
    logger.success(`Captured screenshot stored in ${path}`);

    // Close the browser
    await browser.close();
  };

  /**
   * Tweets a media tweet with a screenshot and a snippet caption.
   * @param {string} description - The caption of the tweet.
   */
  static tweet = promisify(description => {
    const logger = new Logger('TwitterBot.tweet');
    logger.log('Preparing tweet');
    const snippetImage = fs.readFileSync('snippet.png');
    TwitterBot.client.post(
      'media/upload',
      { media: snippetImage },
      function (error, media) {
        if (!error) {
          // If successful, a media object will be returned.
          logger.success('Finished uploading media');

          // Let's tweet it
          var status = {
            status: description,
            media_ids: media.media_id_string, // Pass the media id string
          };

          TwitterBot.client.post('statuses/update', status, function (error) {
            if (!error) logger.success('Tweet successful');
          });
        } else logger.error(`Error: ${error}`);
      }
    );
  });

  /**
   * Prepares a tweet and sends it to the world.
   */
  static prepareAndTweet = async () => {
    const logger = new Logger('TwitterBot.prepareAndTweet');
    logger.log('Twitter bot is starting up...\n');

    let snippet, image;
    await Promise.all([TwitterBot.getRandomSnippet()]).then(data => {
      snippet = data[0];
      image = data[1];
    });

    await TwitterBot.capture(snippet.url, image);
    await TwitterBot.tweet(snippet.caption);
    logger.success('Twitter bot has finished tweeting...\n');
  };
}
