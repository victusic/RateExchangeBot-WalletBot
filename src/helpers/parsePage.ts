import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export const parsePage = async (
  url: string
): Promise<{ rate: string; update: string }> => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const rate = await page.$eval(
    '[data-test="instrument-price-last"]',
    (el: Element) => el.textContent!.trim()
  );

  const update = await page.$eval(
    '[data-test="instrument-price-change"]',
    (el: Element) => el.textContent!.trim()
  );

  await browser.close();
  return {
    rate,
    update,
  };
};
