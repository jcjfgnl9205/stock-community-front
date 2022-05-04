import React, { useState } from 'react';
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


const columns = [
  { 
    id: 'no',
    label: 'No',
    align: 'center',
    minWidth: 30
  },
  { 
    id: 'title',
    label: 'Title', 
    align: 'left',
    minWidth: 300 
  },
  {
    id: 'writer',
    label: 'Writer',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'like',
    label: 'Like',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'views',
    label: 'Views',
    minWidth: 50,
    align: 'center',
  },
];

const formatDate = date => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const createData = (no, title, writer, like, _date, views) => {
  const date = formatDate(_date);
  return { no, title, writer, like, date, views };
}

const rows = [
  createData('1', 'Title1', "admin1234", 1, new Date(), 23),
  createData('2', 'Title2', "admin1234", 2, new Date(), 23),
  createData('3', 'Title3', "admin1234", 3, new Date(), 23),
  createData('4', 'Title4', "admin1234", 4, new Date(), 23),
  createData('5', 'Title5', "admin1234", 5, new Date(), 23),
  createData('6', 'Title6', "admin1234", 6, new Date(), 23),
  createData('7', 'Title7', "admin1234", 6, new Date(), 23),
  createData('8', 'Title8', "admin1234", 10, new Date(), 1),
  createData('9', 'Title9', "admin1234", 12, new Date(), 1),
  createData('10', 'Title10', "admin1234", 13, new Date(), 2),
  createData('11', 'Title11', "admin1234", 14, new Date(), 2),
  createData('12', 'Title12', "admin1234", 55, new Date(), 2),
  createData('13', 'Title13', "admin1234", 55, new Date(), 2),
  createData('14', 'Title14', "admin1234", 2341, new Date(), 3),
  createData('15', 'Title15', "admin1234", 23, new Date(), 3),
];

const Notices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map( row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.no }>
                      {columns.map( column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={ column.id } align={ column.align }>
                            { 
                              column.id === 'title'
                              ? <Link href={ `notices/${row.no}` } underline="hover" color="inherit">{ value }</Link>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default React.memo(Notices);
