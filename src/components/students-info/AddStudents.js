import React from 'react';
import { useDispatch } from 'react-redux'
import FormComponent from './FormComponent'
import { makingRequest } from '../../redux/actions/requestAction';
import { asyncCreateStudent } from '../../redux/actions/asyncAllStudents';
import { makingModalClose } from '../../redux/actions/handleModalAction';

const AddStudents = () => {
     const dispatch = useDispatch()

     const formSubmit = (formData) => {
          dispatch(makingRequest())
          dispatch(asyncCreateStudent('/admin/students', formData))
          dispatch(makingModalClose())
     }

     return (
          <FormComponent formSubmit={formSubmit} />
     );
}

export default AddStudents;
