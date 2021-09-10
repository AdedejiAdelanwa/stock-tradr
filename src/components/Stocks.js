import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import logo from '../assets/nasdaq-logo.png';
import ApiService from '../services/apiservice';
import { Brand } from './Home';
import Ticker from './Ticker';

export const PageWrapper = styled.div`
  padding: 10px 20px;
  height: 100vh;

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
export const Header = styled.nav`
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

const scrollerSTyle = {
  height: '100vh',
  // display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gridGap: '10px',
  paddingLeft: '0px',
  overflow: 'scroll',
  listStyleType: 'none',
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

  useEffect(() => {
    getStockTickers();
  }, []);
  return (
    <PageWrapper>
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
        endMessage={<h4>End of List</h4>}
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
              return <Ticker key={ticker.ticker} style={tickerStyle} ticker={ticker} />;
            })}
      </InfiniteScroll>
    </PageWrapper>
  );
};

export default Stocks;
