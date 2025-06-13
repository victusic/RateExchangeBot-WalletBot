import { keyboardButtons } from '../const/buttons';
import { Context } from 'telegraf';

export const startText = async (ctx: Context) => {
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
