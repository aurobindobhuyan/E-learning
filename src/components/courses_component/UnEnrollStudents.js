import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EnrollForm from './EnrollForm';
import { asyncUnEnrollingStudent } from '../../redux/actions/asyncEnrollingStudent';
import { makingRequest } from '../../redux/actions/requestAction';
import { makingModalClose } from '../../redux/actions/handleModalAction';

const UnEnrollStudents = (props) => {
     const [unEnrollStudents, setunEnrollStudents] = useState([]);
     const { id } = props.match.params
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     useEffect(() => {
          if (store.allStudents.length > 0) {
               const allUnEnrollStudents = store.allStudents.filter(ele => ele.courses.some(e => e.course === id))
               setunEnrollStudents(allUnEnrollStudents)
          }
     }, [store.allStudents, store.allCourses]);

     const studentForm = (formData) => {
          const _id = formData.split(' ').pop()
          dispatch(makingRequest())
          dispatch(asyncUnEnrollingStudent(`/courses/unenroll?courseId=${id}&studentId=${_id}`))
          dispatch(makingModalClose())
     }

     return (
          <>
               <h1>Un Enrolling Students - {unEnrollStudents.length}</h1>
               <EnrollForm students={unEnrollStudents} studentForm={studentForm} />
          </>
     );
}

export default withRouter(UnEnrollStudents);