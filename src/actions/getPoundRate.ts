import { keyboardButtons } from '../const/buttons';

import { getDefaultExchangeText } from '../helpers/getDefaultExchangeText';
import { getParsedUrl } from '../helpers/getParsedUrl';
import { Context } from 'telegraf';

export const getPoundRate = async (ctx: Context) => {
  const text = `
${await getDefaultExchangeText('£/₸', getParsedUrl('gbp-kzt'))}
${await getDefaultExchangeText('₽/£', getParsedUrl('rub-gbp'))}
${await getDefaultExchangeText('$/£', getParsedUrl('usd-gbp'))}
${await getDefaultExchangeText('€/£', getParsedUrl('eur-gbp'))}
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
