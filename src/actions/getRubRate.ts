import { keyboardButtons } from '../const/buttons';

import { getDefaultExchangeText } from '../helpers/getDefaultExchangeText';
import { getParsedUrl } from '../helpers/getParsedUrl';

const { ContextMessageUpdate } = require('telegraf');

export const getRubRate = async (ctx: typeof ContextMessageUpdate) => {
  const text = `
${await getDefaultExchangeText('₸/₽', getParsedUrl('kzt-rub'))}
${await getDefaultExchangeText('$/₽', getParsedUrl('usd-rub'))}
${await getDefaultExchangeText('€/₽', getParsedUrl('eur-rub'))}
${await getDefaultExchangeText('£/₽', getParsedUrl('gbp-rub'))}
${await getDefaultExchangeText('฿/₽', getParsedUrl('thb-rub'))}
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
