import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import logo from '../assets/nasdaq-logo.png';
import ApiService from '../services/apiservice';
import { Brand } from './Home';
import Ticker from './Ticker';

const Header = styled.nav`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #0991c0;
  }
`;
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
  height: 100vh;
  overflow-y: auto;
  input {
    width: 100%;
    padding: 7px 10px;
    margin: 20px 0;
    border-radius: 16px;
    border: 1px solid grey;
  }
  a {
    text-decoration: none;
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

const scrollerSTyle = {
  height: '100vh',
  display: 'grid',
  paddingLeft: '0px',
  listStyleType: 'none',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gridGap: '10px',
};

const tickerStyle = {
  height: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const Stocks = () => {
  const [tickers, setTickers] = useState([]);
  const [filterParam, setFilterParam] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [prevNextUrl, setPrevNextUrl] = useState('');
  const [hasMore, sethasMore] = useState(true);

  const apiService = new ApiService();

  async function getStockTickers(cursor) {
    try {
      const { data } = await apiService.getTickers(cursor);
      localStorage.setItem('tickers', JSON.stringify(data.results));
      localStorage.setItem('nextUrl', data.next_url);
      let newData = [...tickers, ...data.results];

      setTickers(newData);
      setNextUrl(data.next_url);
    } catch (error) {
      alert(error);
    }
  }

  const fetchMoreTickers = () => {
    if (nextUrl && nextUrl !== prevNextUrl) {
      let index = nextUrl.lastIndexOf('=') + 1;
      let cursor = nextUrl.slice(index);

      setPrevNextUrl(nextUrl);
      sethasMore(false);
      getStockTickers(cursor);
    }
  };

  useEffect(() => {
    getStockTickers();
  }, []);
  return (
    <PageWrapper onScroll={fetchMoreTickers}>
      <Header>
        <Logo>
          <img src={logo} alt="Nasdaq logo" />
        </Logo>
        <Link to="/">&#10229;</Link>
      </Header>

      <input
        type="text"
        value={filterParam}
        onChange={(e) => setFilterParam(e.target.value)}
        placeholder="Search"
      />

      <h2>Stocks</h2>

      <InfiniteScroll
        dataLength={tickers.length}
        next={fetchMoreTickers}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={scrollerSTyle}
      >
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
            .map((ticker) => {
              return (
                <Link
                  key={ticker.ticker}
                  to={{
                    pathname: `/stocks/${ticker.ticker}`,
                    state: {
                      ticker,
                    },
                  }}
                >
                  <Ticker style={tickerStyle} ticker={ticker} />
                </Link>
              );
            })}
      </InfiniteScroll>
    </PageWrapper>
  );
};

export default Stocks;
