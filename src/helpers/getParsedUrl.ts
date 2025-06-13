import { ExchangeParsedUrl } from '../const/urls';

export const getParsedUrl = (rates: string) => {
  return `${ExchangeParsedUrl}/${rates}`;
};
