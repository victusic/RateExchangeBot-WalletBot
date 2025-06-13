import { keyboardButtons } from '../const/buttons';

import { getDefaultExchangeText } from '../helpers/getDefaultExchangeText';
import { getParsedUrl } from '../helpers/getParsedUrl';

const { ContextMessageUpdate } = require('telegraf');

export const getEuroRate = async (ctx: typeof ContextMessageUpdate) => {
  const text = `
${await getDefaultExchangeText('€/₸', getParsedUrl('eur-kzt'))}
${await getDefaultExchangeText('₽/€', getParsedUrl('rub-eur'))}
${await getDefaultExchangeText('$/€', getParsedUrl('usd-eur'))}
${await getDefaultExchangeText('£/€', getParsedUrl('gbp-eur'))}
${await getDefaultExchangeText('฿/€', getParsedUrl('thb-eur'))}
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
