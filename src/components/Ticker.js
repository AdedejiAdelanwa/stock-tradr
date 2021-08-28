import React from 'react';

const Ticker = (props) => {
  const { ticker } = props;
  return (
    <li>
      <p>{ticker.ticker}</p>
      <small>{ticker.name.slice(0, 15)}...</small>
    </li>
  );
};
export default Ticker;
