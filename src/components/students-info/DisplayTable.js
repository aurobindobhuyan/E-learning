import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tableCellClasses, styled, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import EditStudent from './EditStudent';
import TableForm from './TableForm';
import NestedModal from './DisplayModal'
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue';
import { asyncRemoveUser } from '../../redux/actions/asyncAllStudents';
import { makingRequest } from '../../redux/actions/requestAction';

const DisplayTable = () => {
     const [tableControl, setTableControl] = useState([]);
     const [page, setPage] = React.useState(0);
     const [rowsPerPage, setRowsPerPage] = React.useState(4);

     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     useEffect(() => {
          setTableControl(store.allStudents)
     }, [store.allStudents])

     const handleDeleteUser = (id) => {
          swal({
               title: "Are you sure?",
               text: "Once deleted, you will not be able to recover this file!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
          })
               .then((willDelete) => {
                    if (willDelete) {
                         dispatch(asyncRemoveUser(`/admin/students/${id}`))
                         dispatch(makingRequest())
                    }
               });
     }

     const handleChangePage = (event, newPage) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
     };

     const handleSearchField = (input) => {
          const result = store.allStudents.filter(ele => ele.name.toLowerCase().includes(input.toLowerCase()) || ele.email.toLowerCase().includes(input.toLowerCase()))
          setTableControl(result)
     }

     // Adding style to table
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
     // Adding style to table
     const tableRow = ["SL NO", "NAME", "EMAIL", "IS_ALLOWED", "ENROLLED_COURSES", "ACTIONS"]

     return (
          <>
               <TableForm students={tableControl.length} handleSearchField={handleSearchField} />
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   {
                                        tableRow.map(ele => {
                                             return (
                                                  <StyledTableCell align="center" key={ele}>
                                                       {ele}
                                                  </StyledTableCell>
                                             )
                                        })
                                   }
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {
                                   tableControl
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((ele, i) => {
                                             return (
                                                  <StyledTableRow key={ele._id}>
                                                       <StyledTableCell align="center">
                                                            {page * rowsPerPage + i + 1}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            {ele.name}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            {ele.email}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            {ele.isAllowed ? "Yes" : "No"}
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            <NestedModal>
                                                                 {ele}
                                                            </NestedModal>
                                                       </StyledTableCell>
                                                       <StyledTableCell align="center">
                                                            <CustomizedDialogs>
                                                                 <EditIcon />
                                                                 <EditStudent {...ele} />
                                                            </CustomizedDialogs>
                                                            <Button
                                                                 variant="outlined"
                                                                 onClick={() => { handleDeleteUser(ele._id) }}>
                                                                 <PersonRemoveIcon />
                                                            </Button>
                                                       </StyledTableCell>
                                                  </StyledTableRow>
                                             )
                                        })
                              }
                         </TableBody>
                    </Table>
                    <TablePagination
                         rowsPerPageOptions={[1, 4, 10]}
                         component="div"
                         count={tableControl.length}
                         rowsPerPage={rowsPerPage}
                         page={page}
                         onPageChange={handleChangePage}
                         onRowsPerPageChange={handleChangeRowsPerPage}
                    />
               </TableContainer>
          </>
     );
}

export default DisplayTable;