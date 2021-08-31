import React from 'react';
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
`;

const Ticker = (props) => {
  const { ticker } = props;
  return (
    <StockTicker>
      <p style={{ fontWeight: 'bold' }}>{ticker.ticker}</p>
      <small>{ticker.name.slice(0, 15)}...</small>
    </StockTicker>
  );
};
export default Ticker;
