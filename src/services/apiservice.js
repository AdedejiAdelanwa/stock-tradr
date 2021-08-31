import axios from 'axios';

export default class ApiService {
  constructor(market = 'stocks', apiKey = 'W50SsKxSK_lZEunq2kA5lQivYL0i5fpQ') {
    this.market = market;
    this.apiKey = apiKey;
    this.apiClient = axios.create({
      baseURL: `https://api.polygon.io/v3/reference`,
    });
  }

  getTickers = (cursor, active = true, sort = 'ticker', order = 'asc', limit = 10) => {
    let params = {
      market: this.market,
      apiKey: this.apiKey,
      active,
      sort,
      order,
      limit,
      cursor,
    };
    if (!cursor) delete params.cursor;
    return this.apiClient.get('/tickers', {
      params: params,
    });
  };
}
