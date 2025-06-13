import { adminId } from '../../config/telegram';
import { keyboardButtons } from '../const/buttons';
import { Context } from 'telegraf';

export const startText = async (ctx: Context) => {
  const userId = ctx.from?.id;
  if (userId) {
    await ctx.telegram.sendMessage(
      adminId,
      `Новый пользователь: ${ctx.from?.first_name} ${ctx.from?.last_name} - ${ctx.from?.username}`
    );

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

    await ctx.reply('Курсы валют практически в реальном времени', {
      parse_mode: 'Markdown',
    });
  }
};
