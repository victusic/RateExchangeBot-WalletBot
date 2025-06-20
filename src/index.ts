import { Message } from 'telegraf/typings/core/types/typegram';
import { adminId, telegramToken } from '../config/telegram';
import { startText } from './actions/start';
import { TextController } from './controller/TextController';

import { Telegraf, Context } from 'telegraf';
import schedule from 'node-schedule';
import { getHoursRate } from './actions/getHoursRate';
import { getDailyRate } from './actions/getDailyRate';

const bot = new Telegraf(telegramToken);

const rebootMessage = async () => {
  await bot.telegram.sendMessage(adminId, `Перезапуск`);
};

rebootMessage();

//daily
schedule.scheduleJob('59 6 * * *', () => getDailyRate(bot));

//hours
schedule.scheduleJob('0 4,8,10,12,14,16,18,20,22 * * *', () =>
  getHoursRate(bot)
);

bot.start(async (ctx: Context) => {
  startText(ctx);
});

bot.on('text', async (ctx: Context) => {
  const userId = ctx.from?.id;
  const message = ctx.message as Message.TextMessage;
  const userText = message.text;
  if (userId && userText) TextController(ctx, userText, bot);
});

bot.launch();
