import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StockTicker = styled.li`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-bottom: 1px solid #0991c0;
  p {
    font-weight: bold;
  }
  a,
  a:link,
  a:hover,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const Ticker = (props) => {
  const { ticker } = props;
  return (
    <StockTicker>
      <Link
        to={{
          pathname: `/stocks/${ticker.ticker}`,
          state: {
            ticker,
          },
        }}
      >
        <p style={{ fontWeight: 'bold' }}>{ticker.ticker}</p>
        <small>{ticker.name.slice(0, 15)}...</small>
      </Link>
    </StockTicker>
  );
};
export default Ticker;
