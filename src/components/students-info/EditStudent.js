import React from 'react';
import { useDispatch } from 'react-redux';
import FormComponent from './FormComponent';
import { makingRequest } from '../../redux/actions/requestAction';
import { asyncUpdateStudentInfo } from '../../redux/actions/asyncAllStudents';
import { makingModalClose } from '../../redux/actions/handleModalAction';

const EditStudent = (props) => {
     const { _id, name, email, isAllowed } = props
     const dispatch = useDispatch()

     const formSubmit = (formData) => {
          dispatch(makingRequest())
          dispatch(asyncUpdateStudentInfo(`/students/${_id}`, formData))
          dispatch(makingModalClose())
     }

     return (
          <FormComponent name={name} email={email} isAllowed={isAllowed} formSubmit={formSubmit} />
     );
}

export default EditStudent;