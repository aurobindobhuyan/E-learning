import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import AdminForm from './AdminForm';
import { makingModalClose } from '../../redux/actions/handleModalAction'
import { makingRequest } from '../../redux/actions/requestAction'
import { asyncUpdateUserInfo } from '../../redux/actions/asyncGetUserInfo';
import AdminForm from './AdminForm'

const EditAdminInfo = () => {
     const userInfo = useSelector((store) => {
          return store.userInfo
     })
     const dispatch = useDispatch()

     const formSubmit = (formData) => {
          dispatch(makingModalClose())
          dispatch(makingRequest())
          dispatch(asyncUpdateUserInfo(formData))
     }

     return (
          <AdminForm {...userInfo} formSubmit={formSubmit} />
     );
}

export default EditAdminInfo;