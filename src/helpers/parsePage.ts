import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser } from 'puppeteer';

puppeteer.use(StealthPlugin());

let globalBrowser: Browser | null = null;

const getBrowser = async (): Promise<Browser> => {
  if (!globalBrowser || !globalBrowser.isConnected()) {
    globalBrowser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser', // for ubuntu server
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return globalBrowser;
};

export const parsePage = async (
  url: string
): Promise<{ rate: string; update: string }> => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    const rate = await page.$eval(
      '[data-test="instrument-price-last"]',
      (el: Element) => el.textContent!.trim()
    );

    const update = await page.$eval(
      '[data-test="instrument-price-change"]',
      (el: Element) => el.textContent!.trim()
    );

    return {
      rate,
      update,
    };
  } finally {
    await page.close();
  }
};

export const closeBrowser = async (): Promise<void> => {
  if (globalBrowser && globalBrowser.isConnected()) {
    await globalBrowser.close();
    globalBrowser = null;
  }
};
