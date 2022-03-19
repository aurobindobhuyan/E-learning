import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue';
import LecturesForm from './LecturesForm';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { asyncUpdateLecture } from '../../redux/actions/asyncAllLectures';
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { makingRequest } from '../../redux/actions/requestAction';

const EditLectures = (props) => {
     const {url} = props
     const { lectureInfo } = props
     const dispatch = useDispatch()

     const formSubmit = (formData) => {
          dispatch(makingRequest())
          dispatch(asyncUpdateLecture(`/courses/${lectureInfo.course}/lectures/${lectureInfo._id}`, formData))
          dispatch(makingModalClose())
     }

     return (
          <div className='container'>
               <h1>Lecture Details</h1>
               <Button variant='outlined' startIcon={<KeyboardBackspaceIcon />}>
                    <Link to={`/courses/${url.split('/')[2]}/lectures`}>Go Back</Link>
               </Button>
               <CustomizedDialogs>
                    <>
                         EditCourse
                         <EditIcon />
                    </>
                    <LecturesForm formSubmit={formSubmit} {...lectureInfo} />
               </CustomizedDialogs>
          </div>
     );
}

export default EditLectures;