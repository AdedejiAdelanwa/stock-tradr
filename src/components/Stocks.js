import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ApiService from '../services/apiservice';

const PageWrapper = styled.div`
  padding: 10px 20px;
`;

const TickerListWrapper = styled.ul`
  display: grid;
  padding-left: 0px;
  list-style-type: none;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;

  li {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-bottom: 1px solid #0991c0;
  }
`;

const Stocks = () => {
  const [tickers, setTickers] = useState([]);
  //   const [nextUrl, setNextUrl] = useState('');
  const apiService = new ApiService();
  useEffect(() => {
    let tickerList = JSON.parse(localStorage.getItem('tickers'));
    if (tickerList !== null || tickerList === []) {
      setTickers(tickerList);
    } else {
      (async () => {
        try {
          const { data } = await apiService.getTickers();
          localStorage.setItem('tickers', JSON.stringify(data.results));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);
  return (
    <PageWrapper>
      <h1>List</h1>
      <TickerListWrapper>
        {tickers.map((ticker) => (
          <li key={ticker.ticker}>
            <p>{ticker.ticker}</p>
            <small>{ticker.name.slice(0, 15)}...</small>
          </li>
        ))}
      </TickerListWrapper>
    </PageWrapper>
  );
};

export default Stocks;
