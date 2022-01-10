import { Logger } from 'blocks/utilities/logger';
import { Screenshot } from 'blocks/twitterBot/screenshot';
import { TwitterBot } from 'blocks/twitterBot';

export const tweet = async () => {
  Logger.log('Twitter bot is starting up...\n');

  let snippet, image;
  await Promise.all([
    TwitterBot.getRandomSnippet(),
    Screenshot.getBackgroundImage(),
  ]).then(data => {
    snippet = data[0];
    image = data[1];
  });

  await Screenshot.capture(snippet.url, image);
  await TwitterBot.tweet(snippet.caption);
};

tweet();
