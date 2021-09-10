import axios from 'axios';

export default class ApiService {
  constructor(market = 'stocks', apiKey = 'W50SsKxSK_lZEunq2kA5lQivYL0i5fpQ') {
    this.market = market;
    this.apiKey = apiKey;
    this.apiClient = axios.create({
      baseURL: `https://api.polygon.io`,
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
    return this.apiClient.get('/v3/reference/tickers', {
      params,
    });
  };
  getTickerDetails = (tickerName) => {
    let params = {
      apiKey: this.apiKey,
    };
    return this.apiClient.get(`/v1/meta/symbols/${tickerName}/company`, {
      params,
    });
  };

  getStockDetailsPreviousDay = (tickerName, date) => {
    const params = {
      apiKey: this.apiKey,
    };
    return this.apiClient.get(`/v1/open-close/${tickerName}/${date}`, {
      params,
    });
  };
}
