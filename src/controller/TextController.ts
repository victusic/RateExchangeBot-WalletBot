import { getBahtRate } from '../actions/getBahtRate';
import { getDailyRate } from '../actions/getDailyRate';
import { getDollarRate } from '../actions/getDollarRate';
import { getEuroRate } from '../actions/getEuroRate';
import { getHoursRate } from '../actions/getHoursRate';
import { getPoundRate } from '../actions/getPoundRate';
import { getRubRate } from '../actions/getRubRate';
import { getTengeRate } from '../actions/getTengeRate';

const { ContextMessageUpdate } = require('telegraf');

export const TextController = (
  ctx: typeof ContextMessageUpdate,
  userId: number,
  userText: string
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
      getDailyRate(ctx);
      break;
    case 'hours':
      getHoursRate(ctx);
      break;
    default:
      break;
  }
};
