import { keyboardButtons } from '../const/buttons';

const { ContextMessageUpdate } = require('telegraf');

export const startText = async (ctx: typeof ContextMessageUpdate) => {
  const userId = ctx.from?.id;
  if (userId) {
    await ctx.replyWithSticker(
      'https://data.chpic.su/stickers/d/duo_stick/duo_stick_051.webp?v=1710575703',
      {
        reply_markup: {
          keyboard: keyboardButtons,
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      }
    );

    await ctx.reply('Мои Курсы валют', {
      parse_mode: 'Markdown',
    });
  }
};
