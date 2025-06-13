import { Update } from 'telegraf/typings/core/types/typegram';
import { getBahtRate } from '../actions/getBahtRate';
import { getDailyRate } from '../actions/getDailyRate';
import { getDollarRate } from '../actions/getDollarRate';
import { getEuroRate } from '../actions/getEuroRate';
import { getHoursRate } from '../actions/getHoursRate';
import { getPoundRate } from '../actions/getPoundRate';
import { getRubRate } from '../actions/getRubRate';
import { getTengeRate } from '../actions/getTengeRate';
import { Context, Telegraf } from 'telegraf';

export const TextController = (
  ctx: Context,
  userText: string,
  bot: Telegraf<Context<Update>>
) => {
  switch (userText) {
    case '₸':
      getTengeRate(ctx);
      break;
    case '₽':
      getRubRate(ctx);
      break;
    case '$':
      getDollarRate(ctx);
      break;
    case '€':
      getEuroRate(ctx);
      break;
    case '£':
      getPoundRate(ctx);
      break;
    case '฿':
      getBahtRate(ctx);
      break;
    case 'daily':
      getDailyRate(bot);
      break;
    case 'hours':
      getHoursRate(bot);
      break;
    default:
      break;
  }
};
