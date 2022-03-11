import React from 'react';
import { useDispatch } from 'react-redux';
import { makingRequest } from '../../redux/actions/requestAction'
import { asyncAdimRegister } from '../../redux/actions/asyncAdminRegister';
// import AdminForm from './AdminForm';
import AdminForm from './AdminForm'

const AdminRegister = (props) => {
  const { handleToggleComponent } = props
  const dispatch = useDispatch()

  const formSubmit = (formData) => {
    dispatch(makingRequest())
    dispatch(asyncAdimRegister(formData, handleToggleComponent))
  }

  return (
    <AdminForm handleToggleComponent={handleToggleComponent} formSubmit={formSubmit} />
  );
}

export default AdminRegister