import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../services/apiservice';

const StockDetails = () => {
  const location = useLocation();
  const { ticker } = location.state;
  const apiService = new ApiService();
  //   const [stockMetrics, setstockMetrics] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const date = new Date();
  let [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
  let dayBefore = day - 1;

  function formatNumberToTens(num) {
    if (num < 10) return '0' + num;
  }

  let formatedMonth = formatNumberToTens(month);
  let formatedDay = formatNumberToTens(dayBefore);
  const yesterday = [year, formatedMonth, formatedDay].join('-');

  function getTickerDetails(ticker) {
    return apiService
      .getTickerDetails(ticker.ticker)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log('Error:', error));
  }

  function getCloseDay(ticker, yesterday) {
    return apiService
      .getStockDetailsPreviousDay(ticker.ticker, yesterday)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getStockDetails() {
    Promise.all([getCloseDay(ticker, yesterday), getTickerDetails(ticker)]).then((values) => {
      //   setstockMetrics(values[0]);
      setCompanyInfo(values[1]);
    });
  }
  useEffect(() => {
    getStockDetails();
    console.log(companyInfo.logo);
  }, []);
  return (
    <div>
      <div>
        {companyInfo && companyInfo.logo ? (
          <img src={companyInfo.logo} alt="company logo" />
        ) : (
          <p>{companyInfo.symbol}</p>
        )}
        <p>{companyInfo.name}</p>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
export default StockDetails;
