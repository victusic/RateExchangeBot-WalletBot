import { keyboardButtons } from '../const/buttons';
import { getDefaultExchangeText } from '../helpers/getDefaultExchangeText';
import { getParsedUrl } from '../helpers/getParsedUrl';
import { Context } from 'telegraf';

export const getDollarRate = async (ctx: Context) => {
  const text = `
${await getDefaultExchangeText('$/₸', getParsedUrl('usd-kzt'))}
${await getDefaultExchangeText('₽/$', getParsedUrl('rub-usd'))}
${await getDefaultExchangeText('€/$', getParsedUrl('eur-usd'))}
${await getDefaultExchangeText('£/$', getParsedUrl('gbp-usd'))}
${await getDefaultExchangeText('฿/$', getParsedUrl('thb-usd'))}
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
