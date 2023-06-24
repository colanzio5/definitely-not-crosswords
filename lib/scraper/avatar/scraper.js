import puppeteer from 'puppeteer';

// import { getStorage, ref } from 'firebase/storage';
// import { randomUUID } from 'crypto';
// import * as chokidar from 'chokidar';
// import { initializeApp } from 'firebase/app';
// import { storage } from "../../../services/firebase/vuefire.service";

// Initialize watcher.
// const watcher = chokidar.watch('./downloads', { persistent: true });

// Add event listeners.
// watcher.on('add');

// Open the installed Chromium. We use headless: false
// to be able to inspect the browser window.
// const browser = await puppeteer.launch({
//   executablePath: 'chrome.exe',
//   headless: false,
//   defaultViewport: null,
//   args: [
//     '--no-sandbox', '--disable-setuid-sandbox',
//     '--start-maximized', // you can also use '--start-fullscreen'
//   ],
// });
const browser = await puppeteer.launch({
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
  ],
});

// Open a new page / tab in the browser.
const page = await browser.newPage();
const client = await page.target().createCDPSession();
await client.send('Page.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath: './downloads',
});
// Tell the tab to navigate to the JavaScript topic page.
await page.goto('https://itch.io/login');

const userElement = await page.waitForSelector(
  '* > form > div:nth-child(3) > label > input[type=text]'
);
await userElement.type('colanzio5@comcast.net');

const passElement = await page.waitForSelector(
  '* > form > div:nth-child(4) > label > input[type=password]'
);
await passElement.type(process.env.SCRAPE_PASS);

const buttonElement = await page.waitForSelector(
  '* > form > div.buttons > button'
);
await buttonElement.click();

await page.goto('https://donitz.itch.io/procedural-orb-generator', {
  waitUntil: 'networkidle2',
});
await page.waitForNetworkIdle();

await new Promise((r) => setTimeout(r, 5000));

await page.waitForSelector('iframe');

const elementHandle = await page.$('iframe[id="game_drop"]');
const frame = await elementHandle.contentFrame();

await new Promise(async (r) => {
  setTimeout(r, 100 * 60 * 60 * 60); // timeout eventually
  let numAvatarsToGenerate = 1000; // or exit when we generate this many
  while (numAvatarsToGenerate--) {
    await new Promise((r) => setTimeout(r, 10000));
    const maxSizeInput = await frame.waitForSelector(
      'body > div.dg.ac > div > ul > li:nth-child(3) > div > ul > li.cr.number.has-slider > div > div > div:nth-child(1) > input[type=text]'
    );
    maxSizeInput.type("10");
    const randomizeButtom = await frame.waitForSelector(
      "body > div.dg.ac > div > ul > li:nth-child(3) > div > ul > li:nth-child(2) > div > div > div"
      // 'body > div.dg.ac > div > ul > li:nth-child(3) > div > ul > li:nth-child(2) > div > span'
    );
    await randomizeButtom.click();
    await new Promise((r) => setTimeout(r, 10000));
    const exportButtom = await frame.waitForSelector(
      'body > div.dg.ac > div > ul > li:nth-child(4) > div > ul > li:nth-child(3) > div > span'
    ); 
    await exportButtom.click();
    await new Promise((r) => setTimeout(r, 10000));
  }
});

// Turn off the browser to clean up after ourselves.
await browser.close();
