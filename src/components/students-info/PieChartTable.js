import React from 'react';
import { tableCellClasses, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const PieChartTable = ({ data }) => {

     const StyledTableCell = styled(TableCell)(({ theme }) => ({
          [`&.${tableCellClasses.head}`]: {
               backgroundColor: theme.palette.common.black,
               color: theme.palette.common.white,
          },
          [`&.${tableCellClasses.body}`]: {
               fontSize: 14,
          },
     }));
     const StyledTableRow = styled(TableRow)(({ theme }) => ({
          '&:nth-of-type(odd)': {
               backgroundColor: theme.palette.action.hover,
          },
          // hide last border
          '&:last-child td, &:last-child th': {
               border: 0,
          },
     }));
     return (
          <Table sx={{ width: '40%', height:100 }} aria-label="customized table">
               <TableHead>
                    <TableRow>
                         <StyledTableCell align="center">
                              Courses
                         </StyledTableCell>
                         <StyledTableCell align="center">
                              Students
                         </StyledTableCell>
                    </TableRow>
               </TableHead>
               <TableBody>
                    {
                         Object.keys(data).map((ele, i) => {
                              return (
                                   <StyledTableRow key={i}>
                                        <StyledTableCell align="center">
                                             {ele}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                             {data[ele]}
                                        </StyledTableCell>
                                   </StyledTableRow>
                              )
                         })
                    }
               </TableBody>
          </Table>
     );
}

export default PieChartTable;
