import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TrendingDownIcon, TrendingUpIcon } from '../icons/icons';
import './table.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const StockTable = () => {
  const { coinData } = useSelector((state: any) => state.coin);
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    setRows(coinData)
  }, [coinData])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#03346E", color: 'white' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#03346E", color: 'white' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: "#03346E", color: 'white' }}>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length ?
                rows.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`${index}`}>
                    <TableCell>
                      {format(row.time, 'MM/dd/yyyy hh:mm:ss a')}
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <div className='stock-value'>
                        {row.change!=0 ? row.change: null}
                        {
                          row.change>0 ? 
                          <TrendingUpIcon/> : 
                          row.change==0 ? null :
                          <TrendingDownIcon/>
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : 
                <TableRow>
                  <TableCell colSpan={3} align={'center'}> No Data</TableCell>
                </TableRow>
              }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StockTable;
