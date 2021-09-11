import { useState } from 'react';
import ApiService from '../services/apiservice';

export default function usePagination() {
  const [tickers, setTickers] = useState([]);

  const [nextUrl, setNextUrl] = useState('');
  const [prevNextUrl, setPrevNextUrl] = useState('');
  const [hasMore, sethasMore] = useState(true);

  const apiService = new ApiService();

  async function getStockTickers(cursor) {
    try {
      const savedLcList = localStorage.getItem('tickers');
      if (savedLcList && !cursor) {
        setTickers(JSON.parse(savedLcList));
      } else {
        const { data } = await apiService.getTickers(cursor);
        sethasMore(data.next_url !== '' || data.next_url !== null);
        localStorage.setItem('nextUrl', data.next_url);
        let newData = [...tickers, ...data.results];
        localStorage.setItem('tickers', JSON.stringify(newData));

        setTickers(newData);
        setNextUrl(data.next_url);
      }
    } catch (error) {
      sethasMore(true);
    }
  }

  const fetchMoreTickers = () => {
    if (nextUrl && nextUrl !== prevNextUrl) {
      let index = nextUrl.lastIndexOf('=') + 1;
      let cursor = nextUrl.slice(index);

      setPrevNextUrl(nextUrl);

      getStockTickers(cursor);
    }
  };

  return { tickers, hasMore, fetchMoreTickers, getStockTickers };
}
