import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import settings from './settings.js';

dotenv.config();

const {
  visualViewport,
  playerSettings
} = settings;

if (!process.env.AUTH_TOKEN) {
  throw new Error('You must provide your auth token');
}

if (!process.env.BROWSER_PATH) {
  throw new Error('You must provide your browser path');
}

const cookies = [{
  'name': 'auth-token',
  'value': process.env.AUTH_TOKEN
}];

const hour = 1000 * 60 * 60;

(async () => {
	const browser = await puppeteer.launch({
    headless: false,
    executablePath: process.env.BROWSER_PATH
  });

  let reloadTimer = 0;

  const page = await browser.newPage();
	await page.goto(`https://www.twitch.com/${process.env.USER_PAGE}`);

  await page.evaluate((playerSettings) => {
    playerSettings.forEach( ([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, playerSettings);

  await page.setViewport(visualViewport);
  await page.setCookie(...cookies);
  await page.reload({
    waitUntil: ["networkidle2", "domcontentloaded"]
  });

  page.on('close', () => {
    console.log('Stopped by closing browser');
    process.exit();
  });

  console.log('Start watching at ', (new Date()).toLocaleDateString());

  const reload = () => {
    reloadTimer = setTimeout(async () => { 
      await page.reload({
        waitUntil: ["networkidle2", "domcontentloaded"]
      });
      console.log('Reloading at ', (new Date()).toLocaleDateString());
      reload();
    }, hour / process.env.RELOADING_COUNT);
  };

  const setDurationLimit = () => setTimeout(async () => { 
    clearTimeout(reloadTimer);
    console.log('Closing at ', (new Date()).toLocaleDateString());
    await browser.close();
  }, hour * process.env.DURATION);

  if (process.env.RELOADING_COUNT) reload();

  if (process.env.DURATION) setDurationLimit();
})()
  .catch((err) => console.error(err));
