import { Message } from 'telegraf/typings/core/types/typegram';
import { adminId, telegramToken } from '../config/telegram';
import { startText } from './actions/start';
import { TextController } from './controller/TextController';

import { Telegraf, Context } from 'telegraf';
//const schedule = require("node-schedule");

const bot = new Telegraf(telegramToken);

const rebootMessage = async () => {
  await bot.telegram.sendMessage(adminId, `Перезапуск`);
};

rebootMessage();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//const job = schedule.scheduleJob("0 * * * *", newsletersPattern);
//для тестов
//const job = schedule.scheduleJob("* * * * *", newsletersPattern);

bot.start(async (ctx: Context) => {
  startText(ctx);
});

bot.on('text', async (ctx: Context) => {
  const userId = ctx.from?.id;
  const message = ctx.message as Message.TextMessage;
  const userText = message.text;
  if (userId && userText) TextController(ctx, userId, userText);
});

bot.launch();
