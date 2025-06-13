import { keyboardButtons } from '../const/buttons';
import { getParsedUrl } from '../helpers/getParsedUrl';
import { parsePage } from '../helpers/parsePage';
import fs from 'fs/promises';

const { ContextMessageUpdate } = require('telegraf');

export const getDailyRate = async (ctx: typeof ContextMessageUpdate) => {
  const filePath = './src/storage/daily/';
  const fileExtension = '.txt';

  //KZT
  const { rate: rateKzt } = await parsePage(getParsedUrl('rub-kzt'));
  const currentRubKztRate = parseFloat(rateKzt.replace(',', '.'));
  const previousRateTextKzt = await fs.readFile(
    `${filePath}kzt${fileExtension}`,
    'utf-8'
  );
  const previousRateKzt = parseFloat(previousRateTextKzt.replace(',', '.'));

  //USD
  const { rate: rateUsd } = await parsePage(getParsedUrl('usd-rub'));
  const currentRubUsdRate = parseFloat(rateUsd.replace(',', '.'));
  const previousRateTextUsd = await fs.readFile(
    `${filePath}usd${fileExtension}`,
    'utf-8'
  );
  const previousRateUsd = parseFloat(previousRateTextUsd.replace(',', '.'));

  //EUR
  const { rate: rateEur } = await parsePage(getParsedUrl('eur-kzt'));
  const currentRubEurRate = parseFloat(rateEur.replace(',', '.'));
  const previousRateTextEur = await fs.readFile(
    `${filePath}eur${fileExtension}`,
    'utf-8'
  );
  const previousRateEur = parseFloat(previousRateTextEur.replace(',', '.'));

  //GBP
  const { rate: rateGbp } = await parsePage(getParsedUrl('gbp-rub'));
  const currentRubGbpRate = parseFloat(rateGbp.replace(',', '.'));
  const previousRateTextGbp = await fs.readFile(
    `${filePath}gbp${fileExtension}`,
    'utf-8'
  );
  const previousRateGbp = parseFloat(previousRateTextGbp.replace(',', '.'));

  //THB
  const { rate: rateThb } = await parsePage(getParsedUrl('thb-rub'));
  const currentRubThbRate = parseFloat(rateThb.replace(',', '.'));
  const previousRateTextThb = await fs.readFile(
    `${filePath}thb${fileExtension}`,
    'utf-8'
  );
  const previousRateThb = parseFloat(previousRateTextThb.replace(',', '.'));

  const text = `Утренняя сводка:\n
₽/₸:  ${rateKzt}   ${currentRubKztRate - previousRateKzt > 0 ? '+' : ''}${(
    currentRubKztRate - previousRateKzt
  ).toFixed(3)}\n
$/₽:  ${rateUsd}   ${currentRubUsdRate - previousRateUsd > 0 ? '+' : ''}${(
    currentRubUsdRate - previousRateUsd
  ).toFixed(3)}\n
€/₽:  ${rateEur}   ${currentRubEurRate - previousRateEur > 0 ? '+' : ''}${(
    currentRubEurRate - previousRateEur
  ).toFixed(3)}\n
£/₽:  ${rateGbp}   ${currentRubGbpRate - previousRateGbp > 0 ? '+' : ''}${(
    currentRubGbpRate - previousRateGbp
  ).toFixed(3)}\n
฿/₽:  ${rateThb}   ${currentRubThbRate - previousRateThb > 0 ? '+' : ''}${(
    currentRubThbRate - previousRateThb
  ).toFixed(3)}`;
  await ctx.reply(text, {
    reply_markup: {
      keyboard: keyboardButtons,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: 'Markdown',
  });
  await fs.writeFile(`${filePath}kzt${fileExtension}`, rateKzt);
  await fs.writeFile(`${filePath}usd${fileExtension}`, rateUsd);
  await fs.writeFile(`${filePath}eur${fileExtension}`, rateEur);
  await fs.writeFile(`${filePath}gbp${fileExtension}`, rateGbp);
  await fs.writeFile(`${filePath}thb${fileExtension}`, rateThb);
};
