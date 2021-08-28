import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/nasdaq-logo.png';
import ApiService from '../services/apiservice';
import { Brand } from './Home';
import Ticker from './Ticker';

const Logo = styled(Brand)`
  img {
    width: 50px;
  }
  @media only screen and (min-width: 768px) {
    img {
      width: 70px;
    }
  }
`;

const PageWrapper = styled.div`
  padding: 10px 20px;
  input {
    width: 100%;
    padding: 7px 10px;
    margin: 20px 0;
    border-radius: 16px;
    border: 1px solid grey;
  }
  input:focus {
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  @media only screen and (min-width: 768px) {
    input {
      width: 50%;
    }
  }
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
    p {
      font-weight: bold;
    }
  }
`;

const Stocks = () => {
  const [tickers, setTickers] = useState([]);
  const [filterParam, setFilterParam] = useState('');
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
          alert(error);
        }
      })();
    }
  }, []);
  return (
    <PageWrapper>
      <Logo>
        <img src={logo} alt="Nasdaq logo" />
      </Logo>
      <input
        type="text"
        value={filterParam}
        onChange={(e) => setFilterParam(e.target.value)}
        placeholder="Search"
      />

      <h2>Stocks</h2>
      <TickerListWrapper>
        {tickers &&
          tickers
            .filter((ticker) => {
              if (filterParam === '') {
                return ticker;
              } else if (
                ticker.ticker.toLowerCase().includes(filterParam.toLowerCase()) ||
                ticker.name.toLowerCase().includes(filterParam.toLowerCase())
              ) {
                return ticker;
              }
            })
            .map((ticker) => <Ticker key={ticker.ticker} ticker={ticker} />)}
      </TickerListWrapper>
    </PageWrapper>
  );
};

export default Stocks;
