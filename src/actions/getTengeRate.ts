import { keyboardButtons } from '../state/buttons';

const { ContextMessageUpdate } = require('telegraf');

export const getTengeRate = async (ctx: typeof ContextMessageUpdate) => {
  await ctx.reply('Главная', {
    reply_markup: {
      keyboard: keyboardButtons,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: 'Markdown',
  });

  await ctx.reply('Что вам хотелось бы изменить?', {
    reply_markup: {
      keyboard: keyboardButtons,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: 'Markdown',
  });
};
