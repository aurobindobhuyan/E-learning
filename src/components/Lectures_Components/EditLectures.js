import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import ShowDetails from '../ShowDetails';
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue';
import LecturesForm from './LecturesForm';
import LoadingProgress from '../LoadingProgress'
import { asyncGetAllLectures } from '../../redux/actions/asyncAllLectures';
import { asyncUpdateLecture } from '../../redux/actions/asyncAllLectures';
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { makingRequest } from '../../redux/actions/requestAction';

const EditLectures = (props) => {
     const { id } = props.match.params
     const url = props.match.url
     const [lectureInfo, setLectureInfo] = useState({});
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     useEffect(() => {
          if (store.isLoggedIn && store.allLectures.length === 0) {
               const result = url.split('/')[2]
               dispatch(asyncGetAllLectures(`/courses/${result}/lectures`))
          }
     }, [store.isLoggedIn])

     useEffect(() => {
          if (store.allLectures.length > 0) {
               const result = store.allLectures.find(ele => ele._id === id)
               setLectureInfo(result)
          }
     }, [store.allLectures])

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
               {
                    store.request ? (
                         <div style={{ textAlign: 'center', color: "red" }}>
                              <h1>Loading....</h1>
                              <LoadingProgress />
                         </div>
                    ) : (
                         <ShowDetails objectFromProps={lectureInfo} />
                    )
               }
          </div>
     );
}

export default EditLectures;