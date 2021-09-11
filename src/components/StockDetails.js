import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, PageWrapper } from './Stocks';
import useFetchStockDetails from './useFetchStockdetails';

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
  const {
    stockMetrics,
    companyInfo,
    tickerError,
    imageError,
    getStockDetails,
    handleImageError,
  } = useFetchStockDetails();

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
                <p style={identityStyle}>{companyInfo.symbol || <Skeleton />}</p>
              ) : (
                (
                  <img
                    width="50"
                    height="50"
                    style={{ borderRadius: '50%' }}
                    src={companyInfo.logo}
                    onError={handleImageError}
                    alt={companyInfo.symbol}
                  />
                ) || <Skeleton />
              )}
            </div>

            <div>
              <p>{stockMetrics.symbol || <Skeleton />}</p>
              <small>{companyInfo.name || <Skeleton />}</small>
              <p>
                <sup>$</sup>
                {stockMetrics.preMarket || <Skeleton />}
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
                  {stockMetrics.open || <Skeleton />}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>Close</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.close || <Skeleton />}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>High</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.high || <Skeleton />}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>Low</small>
                <p>
                  <sup>$</sup>
                  {stockMetrics.low || <Skeleton />}
                </p>
              </StatisticsItem>
              <StatisticsItem>
                <small>Volume</small>
                <p>{stockMetrics.volume || <Skeleton />}</p>
              </StatisticsItem>
            </Statistics>
          </SectionWrapper>
          <SectionWrapper style={{ borderBottom: 'none' }}>
            <SectionBlock
              style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}
            >
              <h4>About</h4>
              {companyInfo.url
                ? (
                    <Link to={{ pathname: companyInfo.url }} target="_blank">
                      <small>Visit Website </small>
                    </Link>
                  ) || <Skeleton />
                : ''}
            </SectionBlock>
            <SectionBlock>
              <small>Industry</small>
              <p>{companyInfo.industry || <Skeleton />}</p>
            </SectionBlock>
            <SectionBlock>
              <small>Description</small>
              <p>{companyInfo.description || <Skeleton count={4} />}</p>
            </SectionBlock>
          </SectionWrapper>
        </>
      )}
    </PageWrapper>
  );
};
export default StockDetails;
