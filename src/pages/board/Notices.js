import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link as RouterLink } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { UserContext } from '../../context/UserContext';
import * as NoticeAPI from '../../lib/NoticeAPI';
import * as config from '../../config';

import CreateForm from '../../components/board/CreateForm';

const columns = [
  { id: 'no', label: 'No', align: 'center', minWidth: 30 },
  { id: 'title', label: 'Title',  align: 'left', minWidth: 300 },
  { id: 'writer', label: 'Writer', align: 'center', minWidth: 100 },
  { id: 'like', label: 'Like', align: 'center', minWidth: 100 },
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'views', label: 'Views', align: 'center', minWidth: 50 },
];

const createData = (no, title, writer, like, _date, views) => {
  const date = config.formatDate(_date);
  return { no, title, writer, like, date, views };
}

const Notices = () => {
  const path = useLocation(); // 現在path
  const { token } = useContext(UserContext);
  const { create_notice } = NoticeAPI;

  const [ notices, setNotices ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ createFormModal, setCreateFormModal ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  useEffect(() => {
    // Notice List取得
    const notices = async () => {
      const response = await NoticeAPI.get_notices(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        const newData = data.items?.map(notice => {
          return createData(notice.id, notice.title, notice.writer, notice.views, notice.created_at, notice.views)
        });
        setNotices(newData)
      } else {
        console.log("error")
      }
    }
    notices();
  }, [path, createFormModal])

  // 掲示板投稿Modalを閉じる
  const createFormModalClose = () => {
    setCreateFormModal(false);
    setErrorMsg('');
  };

  // 掲示板投稿する
  const onSubmitCreate = async notice => {
    // 掲示板登録
    const response = await create_notice(path.pathname, token, notice);
    if (response.status === 200) {
      setErrorMsg('');
      createFormModalClose();
    } else {
      const data = await response.json();
      setErrorMsg(data.detail);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container component="main">
      <Typography component="h1" gutterBottom variant="h4" sx={{ marginTop: 10 }}>NOTICE</Typography>
      {/* 登録ボタンはログインしているユーザーのみ */}
      {
        token
        ? <Button type="button" variant="outlined" sx={{ mb: 1}} size="small" onClick={ () => setCreateFormModal(true) }>CREATE</Button>
        : null
      }

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map( column => (
                  <TableCell
                    key={ column.id }
                    align={ column.align }
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {notices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map( notice => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={ -1 } key={ notice.no }>
                      {columns.map( column => {
                        const value = notice[column.id];
                        return (
                          <TableCell key={ column.id } align={ column.align }>
                            { 
                              column.id === 'title'
                              ? <Link to={ `${notice.no}` } component={ RouterLink } underline="hover" color="inherit">{ value }</Link>
                              : value
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={ notices.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onPageChange={ handleChangePage }
          onRowsPerPageChange={ handleChangeRowsPerPage }
        />
      </Paper>

      <CreateForm
        label="NOTICE CREATE"
        open={ createFormModal }
        handleClose={ createFormModalClose }
        onSubmit={{
          btnName: "CREATE",
          color: "primary",
          onSubmit: onSubmitCreate
        }}
        errorMsg={ errorMsg }
        setErrorMsg={ setErrorMsg }
        token={ token }
      />

    </Container>
  );
}

export default React.memo(Notices);
