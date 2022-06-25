import { Link as RouterLink } from "react-router-dom";

// Material-UI
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

const columns = [
  { id: 'no', label: 'No', align: 'center', minWidth: 30 },
  { id: 'title', label: 'Title',  align: 'left', minWidth: 300 },
  { id: 'writer', label: 'Writer', align: 'center', minWidth: 100 },
  { id: 'like', label: 'Like', align: 'center', minWidth: 100 },
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'views', label: 'Views', align: 'center', minWidth: 50 },
];


const PcTable = ({ data, rowsPerPage, offset }) => {
  return (
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
            {data
              ?.slice(offset, offset + rowsPerPage)
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
    </Paper>
  )
}

const MobileTable = ({ data, rowsPerPage, offset }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.filter((column, index) => index === 0 || index === 1).map( column => (
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
            {data
              ?.slice(offset, offset + rowsPerPage)
              .map( notice => {
                return (
                  <TableRow hover role="checkbox" tabIndex={ -1 } key={ notice.no }>
                    {columns.filter((column, index) => index === 0 || index === 1).map( column => {
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
    </Paper>
  )
}

// data: テーブルに表示するデータリスト
// page: 現在ページ
// rowsPerPage: １ページに表示するデータ数
const BoardTable = ({ data, page, rowsPerPage }) => {
  const offset = (page - 1) * rowsPerPage;
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <PcTable data={ data } rowsPerPage={ rowsPerPage } offset={ offset }/>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <MobileTable data={ data } rowsPerPage={ rowsPerPage } offset={ offset }/>
      </Box>
    </>
  );
}

export default BoardTable;
