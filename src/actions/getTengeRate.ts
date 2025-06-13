import { keyboardButtons } from '../const/buttons';
import { getDefaultExchangeText } from '../helpers/getDefaultExchangeText';
import { getParsedUrl } from '../helpers/getParsedUrl';
import { Context } from 'telegraf';

export const getTengeRate = async (ctx: Context) => {
  const text = `
${await getDefaultExchangeText('₽/₸', getParsedUrl('rub-kzt'))}
${await getDefaultExchangeText('$/₸', getParsedUrl('usd-kzt'))}
${await getDefaultExchangeText('€/₸', getParsedUrl('eur-kzt'))}
  `;
  await ctx.reply(text, {
    reply_markup: {
      keyboard: keyboardButtons,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: 'Markdown',
  });
};
