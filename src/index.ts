import { startPreview } from './actions/start';
import { handleSwitchLogic } from './logic/textLogic';

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

//старт
bot.start(async (ctx: typeof ContextMessageUpdate) => {
  startPreview(ctx);
});

bot.on('text', async (ctx: typeof ContextMessageUpdate) => {
  const userId = ctx.from?.id;
  const userText = ctx.message?.text;
  if (userId && userText) handleSwitchLogic(ctx, userId, userText);
});

bot.launch();
