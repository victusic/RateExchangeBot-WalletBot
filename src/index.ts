import { startText } from './actions/start';
import { TextController } from './controller/TextController';

const { Telegraf, ContextMessageUpdate } = require('telegraf');
const { telegramToken, adminId } = require('../config/telegram');
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

bot.start(async (ctx: typeof ContextMessageUpdate) => {
  startText(ctx);
});

bot.on('text', async (ctx: typeof ContextMessageUpdate) => {
  const userId = ctx.from?.id;
  const userText = ctx.message?.text;
  if (userId && userText) TextController(ctx, userId, userText);
});

bot.launch();
