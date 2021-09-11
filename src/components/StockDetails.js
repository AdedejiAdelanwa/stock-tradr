import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ApiService from '../services/apiservice';
import { Header, PageWrapper } from './Stocks';

const SectionWrapper = styled.div`
  height: 30%;
  margin-bottom: 10px;
  border-bottom: 1px solid #0991c0;
  p {
    font-weight: bold;
    sup {
      font-weight: normal;
    }
  }
`;

const SectionBlock = styled.div`
  margin-bottom: 5px;
  p {
    font-weight: normal;
  }
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: #249cff;
    padding: 3px 5px;
    border: 1px solid #249cff;
    border-radius: 16px;
  }
`;

const Statistics = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StatisticsItem = styled.div`
  width: 100px;
  height: 50px;
  margin: 5px;
`;

const identityStyle = {
  padding: '10px',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #249cff',
  borderRadius: '50%',
  backgroundColor: '#ededed',
};

const StockDetails = () => {
  const location = useLocation();
  const { ticker } = location.state;
  const apiService = new ApiService();
  const [stockMetrics, setstockMetrics] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [tickerError, setTickerError] = useState(false);
  const [imageError, setImageError] = useState(false);

  function getYesterdayDate() {
    const date = new Date();
    let [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
    let dayBefore;
    switch (new Date().toDateString().match(/(?:[A-z]{1}[a-z]{2})/)[0]) {
      case 'Sun':
        dayBefore = day - 2;
        break;

      case 'Mon':
        dayBefore = day - 3;
        break;

      default:
        dayBefore = day - 1;
    }

    function formatNumberToTens(num) {
      if (num < 10) {
        return '0' + num;
      }
      return num;
    }

    let formatedMonth = formatNumberToTens(month);
    let formatedDay = formatNumberToTens(dayBefore);
    const yesterday = [year, formatedMonth, formatedDay].join('-');

    return yesterday;
  }

  function getTickerDetails(ticker) {
    return apiService
      .getTickerDetails(ticker.ticker)
      .then((res) => {
        return res.data;
      })
      .catch((error) => setTickerError(error));
  }

  function getCloseDay(ticker) {
    return apiService
      .getStockDetailsPreviousDay(ticker.ticker, getYesterdayDate())
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getStockDetails() {
    Promise.all([getCloseDay(ticker, getYesterdayDate()), getTickerDetails(ticker)]).then(
      (values) => {
        setstockMetrics(values[0]);
        setCompanyInfo(values[1]);
      }
    );
  }
  useEffect(() => {
    getStockDetails();
  }, []);
  return (
    <PageWrapper>
      <Header>
        <Link to="/stocks">&#10229;</Link>
      </Header>

      {tickerError ? (
        <h>Oops! Not found</h>
      ) : (
        <>
          <SectionWrapper style={{ height: '15%' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {imageError ? (
                <p style={identityStyle}>{companyInfo.symbol}</p>
              ) : (
                <img
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%' }}
                  src={companyInfo.logo}
                  onError={setImageError(true)}
                  alt={companyInfo.symbol}
                />
              )}
            </div>

            <div>
              <p>{stockMetrics.symbol}</p>
              <small>{companyInfo.name}</small>
              <p>
                <sup>$</sup>
                {stockMetrics.preMarket}
              </p>
            </div>
          </SectionWrapper>
          <SectionWrapper>
            <h3>Statistics</h3>
            <Statistics>
              <StatisticsItem>
                <small>Open</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.open}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>Close</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.close}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>High</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.high}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>Low</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.low}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>Volume</small>
                <p>{stockMetrics.volume}</p>
              </StatisticsItem>
            </Statistics>
          </SectionWrapper>
          <SectionWrapper style={{ borderBottom: 'none' }}>
            <SectionBlock
              style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}
            >
              <h4>About</h4>
              {companyInfo.url && (
                <Link to={{ pathname: companyInfo.url }} target="_blank">
                  <small>Visit Website </small>
                </Link>
              )}
            </SectionBlock>
            <SectionBlock>
              <small>Industry</small>
              <p>{companyInfo.industry}</p>
            </SectionBlock>
            <SectionBlock>
              <small>Description</small>
              <p>{companyInfo.description}</p>
            </SectionBlock>
          </SectionWrapper>
        </>
      )}
    </PageWrapper>
  );
};
export default StockDetails;
