import { parsePage } from './parsePage';

export const getDefaultExchangeText = async (
  exchangeComposition: string,
  url: string
) => {
  const { rate, update } = await parsePage(url);
  return `${exchangeComposition}:  ${rate}   ${update}\n`;
};
