import { getTengeRate } from '../actions/getTengeRate';

const { ContextMessageUpdate } = require('telegraf');

export function handleSwitchLogic(
  ctx: typeof ContextMessageUpdate,
  userId: number,
  userText: string
) {
  switch (userText) {
    case '₸':
      getTengeRate(ctx);
      break;
    default:
      // Обработка других состояний, если необходимо
      break;
  }
}
