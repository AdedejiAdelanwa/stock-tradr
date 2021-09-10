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

const StockDetails = () => {
  const location = useLocation();
  const { ticker } = location.state;
  const apiService = new ApiService();
  const [stockMetrics, setstockMetrics] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

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
      if (num < 10) return '0' + num;
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
      .catch((error) => console.log('Error:', error));
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
      <SectionWrapper style={{ height: '15%' }}>
        {/* {companyInfo && companyInfo.logo ? (
          <img src={companyInfo.logo} alt="brand" />
        ) : (
          <p>{stockMetrics.symbol}</p>
        )} */}

        <div>
          <p>{companyInfo.symbol}</p>
          <small>{companyInfo.name}</small>
          {/* <p>
            <sup>$</sup>
            {stockMetrics.preMarket}
          </p> */}
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
      <SectionWrapper style={{ borderBottom: 'none' }}></SectionWrapper>
    </PageWrapper>
  );
};
export default StockDetails;
