import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Alert, AlertTitle, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import swal from 'sweetalert';
import moment from 'moment'
import LoadingProgress from '../LoadingProgress';
import ShowDetails from '../ShowDetails';
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue'
import EditCourse from './EditCourse';
import EnrollStudents from './EnrollStudents';
import UnEnrollStudents from './UnEnrollStudents';
import { asyncGetAllLectures } from '../../redux/actions/asyncAllLectures';
import { asyncEnrollingStudent, asyncUnEnrollingStudent } from '../../redux/actions/asyncEnrollingStudent';
import { makingRequest } from '../../redux/actions/requestAction';

const CourseDetails = (props) => {
     const { id } = props.match.params
     const [objectId, setobjectId] = useState({});
     const [preventingButton, setPreventingButton] = useState(null);

     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     // Finding the course data for displaying course information
     useEffect(() => {
          if (store.allCourses.length > 0) {
               const findObject = store.allCourses.find(ele => ele._id === id)
               setobjectId(findObject)
          }
     }, [store.allCourses])

     // Getting lectures data after initial loading
     useEffect(() => {
          if (store.isLoggedIn) {
               dispatch(asyncGetAllLectures(`/courses/${id}/lectures`))
          }
     }, [store.isLoggedIn])

     // Preventing the student to access the lectures and enrolling buttons.
     useEffect(() => {
          if (Object.keys(objectId).length > 0 && store.userInfo.role === 'student') {
               const findStudentId = objectId.students.some(ele => ele.student === store.userInfo._id)
               setPreventingButton(findStudentId)
          }
     }, [objectId])

     // Enrolling & UnEnrolling to the course by the student
     const handleStudentClick = (e) => {
          if (store.userInfo.role === 'student') {
               e.stopPropagation()
               swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
               })
                    .then((willDelete) => {
                         if (willDelete && !preventingButton) {
                              dispatch(asyncEnrollingStudent(`/courses/enroll?courseId=${id}`))
                              dispatch(makingRequest())
                         } else if (willDelete && preventingButton) {
                              dispatch(asyncUnEnrollingStudent(`/courses/unenroll?courseId=${id}`))
                              dispatch(makingRequest())
                         }
                    });
          }
     }

     return (
          <>
               {
                    store.request ? (
                         <LoadingProgress>
                              <h4>Loading...</h4>
                         </LoadingProgress>
                    ) : (store.allCourses.length > 0 && (
                         <>
                              <Button variant='outlined' startIcon={<KeyboardBackspaceIcon />}>
                                   <Link to='/courses'>Go Back</Link>
                              </Button>
                              {store.userInfo.role === 'admin' && (
                                   <CustomizedDialogs>
                                        <>
                                             <b>Edit Course</b>
                                             <SettingsIcon />
                                        </>
                                        <EditCourse objectId={objectId} />
                                   </CustomizedDialogs>
                              )}

                              {
                                   store.userInfo.role === 'student' && moment().format(objectId.releaseDate) > moment().format() ? (
                                        <>
                                             <Typography variant='h3' sx={{ textAlign: 'center' }}>Course will be Release on {objectId.releaseDate}</Typography>
                                        </>
                                   ) : (
                                        <>
                                             {
                                                  store.userInfo.role === 'student' && preventingButton || store.userInfo.role === 'admin' ? (
                                                       <>
                                                            <Button
                                                                 variant='outlined'
                                                                 endIcon={<ArrowForwardIcon />}>
                                                                 <Link to={`/courses/${id}/lectures`}>All Lectures</Link>
                                                            </Button>
                                                            <div style={{ display: 'inline-block' }} onClickCapture={handleStudentClick}>
                                                                 <CustomizedDialogs>
                                                                      Un_Enroll to the COurse
                                                                      <UnEnrollStudents />
                                                                 </CustomizedDialogs>
                                                            </div>
                                                       </>
                                                  ) : null
                                             }
                                             {
                                                  store.userInfo.role === 'student' && !preventingButton || store.userInfo.role === 'admin' ? (
                                                       <div style={{ display: 'inline-block' }} onClickCapture={handleStudentClick}>
                                                            <CustomizedDialogs>
                                                                 Enroll to the COurse
                                                                 <EnrollStudents />
                                                            </CustomizedDialogs>
                                                       </div>
                                                  ) : null
                                             }
                                             {
                                                  store.userInfo.role === 'student' && preventingButton ? (
                                                       <Alert sx={{ width: '40%' }} severity="success">
                                                            <AlertTitle><b>Success</b></AlertTitle>
                                                            You are already Enrolled to the course - <b>check out all the Lectures!</b>
                                                       </Alert>
                                                  ) : (
                                                       store.userInfo.role === 'student' && !preventingButton
                                                  ) && (
                                                       <Alert sx={{ width: '40%' }} severity="error">
                                                            <AlertTitle><b>Error</b></AlertTitle>
                                                            You are not Enrolled to the course - <b>You can't access the Lectures!</b>
                                                       </Alert>
                                                  )
                                             }
                                             <ShowDetails objectFromProps={objectId} />
                                        </>
                                   )
                              }
                         </>
                    ))
               }
          </>
     );
}

export default CourseDetails;