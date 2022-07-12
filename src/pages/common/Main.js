import React, { useState } from 'react';

// Material-UI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import LoadingPaper from '../../components/common/LoadingPaper';
import ErrorPaper from '../../components/common/ErrorPaper';
import DashBoardA from '../../components/common/MainDashBoardA';
import ListTable from '../../components/common/ListTable';

import useFetch from '../../hooks/useFetch';

const stocks = [
  {key: 0, name: "KOSPI", price: "1111.45", daysRange: "1.50", daysRangePer: "-1.28%", flg: false},
  {key: 1, name: "Nikkei", price: "2222.45", daysRange: "-2.50", daysRangePer: "-2.28%", flg: false},
  {key: 2, name: "S&P 500", price: "3333.45", daysRange: "3.50", daysRangePer: "-3.28%", flg: true},
  {key: 3, name: "NASDAQ", price: "4444.45", daysRange: "-4.50", daysRangePer: "-4.28%", flg: false},
]

const exchange = [
  {key: 0, name: "KOSPI", price: "1111.45", daysRange: "-1.50", daysRangePer: "-1.28%", flg: false},
  {key: 1, name: "Nikkei", price: "2222.45", daysRange: "2.50", daysRangePer: "-2.28%", flg: false},
  {key: 2, name: "S&P 500", price: "3333.45", daysRange: "-3.50", daysRangePer: "-3.28%", flg: true},
  {key: 3, name: "NASDAQ", price: "4444.45", daysRange: "-4.50", daysRangePer: "-4.28%", flg: false},
]

const userStock = [
  {key: 0, name: "APPL", price: "1111.45", daysRange: "-1.50", daysRangePer: "-1.28%", flg: false},
  {key: 1, name: "TESLA", price: "2222.45", daysRange: "-2.50", daysRangePer: "-2.28%", flg: false},
  {key: 2, name: "MicroSoft", price: "3333.45", daysRange: "-3.50", daysRangePer: "-3.28%", flg: true},
]

const Main = () => {

  const [ stockDashBoard, setStockDashBoard ] = useState(stocks);
  const [ exchangeRateDashBoard, setExchangeRateDashBoard ] = useState(exchange);
  const [ userStockDashBoard, setUserStockDashBoard ] = useState(userStock);
  const { data: krStock, krStockLoading, krStockError } = useFetch(`${process.env.REACT_APP_API_ROOT}/stock/kr`);
  const { data: jpStock, jpStockLoading, jpStockError } = useFetch(`${process.env.REACT_APP_API_ROOT}/stock/jp`);
  const { data: notices, noticesLoading, noticesError } = useFetch(`${process.env.REACT_APP_API_ROOT}/notices`);

  const stockDashBoardOnClick = (key) => {
    setStockDashBoard((state) =>
        state.map((item) => {
          return { ...item, flg: item.key === key ? true : false };
        })
      );
  }

  const exchangeRateDashBoardOnClick = (key) => {
    setExchangeRateDashBoard((state) =>
        state.map((item) => {
          return { ...item, flg: item.key === key ? true : false };
        })
      );
  }

  const userStockDashBoardOnClick = (key) => {
    setUserStockDashBoard((state) =>
        state.map((item) => {
          return { ...item, flg: item.key === key ? true : false };
        })
      );
  }

  return (
    <Container component="main">
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* STOCK */}
              <Grid item xs={12} md={4} lg={4}>
                  <DashBoardA
                    datas={ stockDashBoard }
                    onClick={ stockDashBoardOnClick }
                  />
              </Grid>

              {/* Chart */}
              <Grid item xs={12} md={4} lg={4}>
                <DashBoardA
                  datas={ exchangeRateDashBoard }
                  onClick={ exchangeRateDashBoardOnClick }
                />
              </Grid>
              
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={4}>
                <DashBoardA
                  datas={ userStockDashBoard }
                  onClick={ userStockDashBoardOnClick }
                />
              </Grid>

              {/* お知らせリストテーブル */}
              <Grid item xs={12} md={6} lf={6}>
                {  noticesLoading && <LoadingPaper /> }
                { !noticesLoading && noticesError && <ErrorPaper /> }
                { !noticesLoading && notices && <ListTable title="お知らせ" path="/notices" data={ notices } /> }
              </Grid>

              {/* 株(日本)のリストテーブル */}
              <Grid item xs={12} md={6} lf={6}>
                {  jpStockLoading && <LoadingPaper /> }
                { !jpStockLoading && jpStockError && <ErrorPaper /> }
                { !jpStockLoading && jpStock && <ListTable title="掲示板(日本)" path="/stock/jp" data={ jpStock } /> }
              </Grid>

              {/* 株(韓国)のリストテーブル */}
              <Grid item xs={12} md={6} lf={6}>
                {  krStockLoading && <LoadingPaper /> }
                { !krStockLoading && krStockError && <ErrorPaper /> }
                { !krStockLoading && krStock && <ListTable title="掲示板(韓国)" path="/stock/kr" data={ krStock } /> }
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(Main);
