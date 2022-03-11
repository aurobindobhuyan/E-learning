import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import CustomizedDialogs from './DisplayDialogue'
import { CircularProgress } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditAdminInfo from './EditAdminInfo';
import ShowDisplay from '../ShowDetails';

const Details = () => {
     const store = useSelector((store) => {
          return store
     })

     return (
          <div className='container'>
               {
                    store.userInfo.role === 'admin' && (
                         <>
                              <h1>Details about User</h1>
                              <CustomizedDialogs>
                                   <ManageAccountsIcon fontSize='large' />
                                   <EditAdminInfo />
                              </CustomizedDialogs>
                         </>
                    )
               }
               {
                    store.request && (
                         <div style={{ textAlignLast: 'center', color: 'red' }}>
                              <h1>Loading....</h1>
                              <Box sx={{ display: 'flex', placeContent: 'center' }}>
                                   <CircularProgress />
                              </Box>
                         </div>
                    )
               }
               <ShowDisplay objectFromProps={store.userInfo} />
          </div>
     );
}

export default Details;