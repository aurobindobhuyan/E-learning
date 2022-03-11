import React from 'react';
import { useDispatch } from 'react-redux';
import LecturesForm from './LecturesForm';
import { asyncCreateLecture } from '../../redux/actions/asyncAllLectures';
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { makingRequest } from '../../redux/actions/requestAction';

const AddLectures = (props) => {
     const { id } = props
     const dispatch = useDispatch()

     const formSubmit = (formData) => {
          dispatch(makingRequest())
          dispatch(asyncCreateLecture(id, formData))
          dispatch(makingModalClose())
     }

     return (
          <LecturesForm formSubmit={formSubmit} id={id} />
     );
}

export default AddLectures;