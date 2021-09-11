import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../services/apiservice';

export default function useFetchStockDetails() {
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

  function handleImageError() {
    setImageError(true);
  }
  return {
    stockMetrics,
    companyInfo,
    tickerError,
    imageError,
    getStockDetails,
    handleImageError,
  };
}
