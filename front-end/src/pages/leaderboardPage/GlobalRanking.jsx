import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { leadetboardTableData } from '../../services/utils/leaderboardServices/leadetboard';
import { Link } from 'react-router-dom';

const GlobalRanking = () => {
    const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchedTableData = async () => {
    const res = await leadetboardTableData({
      action: 'fetchLeaderboard',
      additional_params: {
        Period: 'all-time',
      },
    });
    if (res.data.length > 0) {
      setTableData(res.data);
    }
  };

  useEffect(() => {
    fetchedTableData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                zIndex: 1,
              }}
            >
              Rank
            </TableCell>
            <TableCell
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                zIndex: 1,
              }}
            >
              User
            </TableCell>
            <TableCell
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                zIndex: 1,
              }}
              className="lb-walletAddress"
            >
              Wallet Address
            </TableCell>
            <TableCell
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                zIndex: 1,
              }}
              align="right"
            >
              Total Points
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.rank}>
              <TableCell sx={{ fontWeight: 'bold' }}>{`#${row.Rank}`}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>                      
                  {row.PlayerName}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} className="lb-walletAddress">
                <Box>
                  <Link target="_blank" to={`https://sepolia.basescan.org/address/${row.LSAAddress}`}>
                    {row.LSAAddress}
                  </Link>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                {row.AllTimePoints} Points
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    sx={{display:"flex" , flexWrap:"wrap"}}
      rowsPerPageOptions={[10, 25, 50]}
      count={tableData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Box>
  )
}

export default GlobalRanking