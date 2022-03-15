import React from 'react';
import { useSelector } from 'react-redux';
import CustomizedDialogs from './DisplayDialogue'
import LoadingProgress from '../LoadingProgress';
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
                         <div className='loading'>
                              <h2>Loading...</h2>
                              <LoadingProgress />
                         </div>
                    )
               }
               <ShowDisplay objectFromProps={store.userInfo} />
          </div>
     );
}

export default Details;