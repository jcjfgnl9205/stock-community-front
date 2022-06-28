import React, { useState } from 'react';

// Material-UI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import DashBoardA from '../../components/common/MainDashBoardA';
import MainList from '../../components/common/MainList';

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

const notice = [
  {id: 54, title: "TITE1"},
  {id: 2, title: "TITE2"},
  {id: 3, title: "TITE3"},
  {id: 4, title: "TITE4"}
]

const Main = () => {

  const [ stockDashBoard, setStockDashBoard ] = useState(stocks);
  const [ exchangeRateDashBoard, setExchangeRateDashBoard ] = useState(exchange);
  const [ userStockDashBoard, setUserStockDashBoard ] = useState(userStock);
  const [ notices,  ] = useState(notice);

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

              {/* Main News */}
              <Grid item xs={12}>
                <MainList
                  title="お知らせ"
                  path="/notices"
                  data={ notices }
                />
              </Grid>

              {/* Main Notice */}
              <Grid item xs={12}>
                <MainList
                  title="株"
                  path="/stock/kr"
                  data={ notices }
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(Main);
