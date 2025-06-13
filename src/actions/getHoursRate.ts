import { keyboardButtons } from '../const/buttons';
import { getParsedUrl } from '../helpers/getParsedUrl';
import fs from 'fs/promises';
import { parsePage } from '../helpers/parsePage';
import { Context, Telegraf } from 'telegraf';
import { adminId } from '../../config/telegram';
import { Update } from 'telegraf/typings/core/types/typegram';

export const getHoursRate = async (bot: Telegraf<Context<Update>>) => {
  const kztFilePath = './src/storage/hours/kzt.txt';
  const { rate } = await parsePage(getParsedUrl('rub-kzt'));
  const currentRubKztRate = parseFloat(rate.replace(',', '.'));
  const previousRateText = await fs.readFile(kztFilePath, 'utf-8');
  const previousRate = parseFloat(previousRateText.replace(',', '.'));

  let sendMessage = false;
  if (Math.abs(currentRubKztRate - previousRate) > 0.1) {
    sendMessage = true;
  }

  if (sendMessage) {
    await bot.telegram.sendMessage(
      adminId,
      `₽/₸:  ${rate}   ${currentRubKztRate - previousRate > 0 ? '+' : ''}${(
        currentRubKztRate - previousRate
      ).toFixed(3)}`,
      {
        reply_markup: {
          keyboard: keyboardButtons,
          resize_keyboard: true,
          one_time_keyboard: false,
        },
        parse_mode: 'Markdown',
      }
    );
  }

  await fs.writeFile(kztFilePath, rate);
};
