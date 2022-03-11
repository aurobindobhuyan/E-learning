import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import EnrollForm from './EnrollForm';
import { makingRequest } from '../../redux/actions/requestAction';
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { asyncEnrollingStudent } from '../../redux/actions/asyncEnrollingStudent';

const EnrollStudents = (props) => {
     const [enrollStudents, setenrollStudents] = useState([]);
     const { id } = props.match.params
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     useEffect(() => {
          if (store.allStudents.length > 0) {
               const allEnrollStudents = store.allStudents.filter(ele => ele.courses.every(e => e.course !== id))
               setenrollStudents(allEnrollStudents)
          }
     }, [store.allStudents, store.allCourses]);

     const studentForm = (formData) => {
          const _id = formData.split(' ').pop()
          dispatch(makingRequest())
          dispatch(asyncEnrollingStudent(`/courses/enroll?courseId=${id}&studentId=${_id}`))
          dispatch(makingModalClose())
     }

     return (
          <>
               <h1>Enrolling Students - {enrollStudents.length}</h1>
               <EnrollForm students={enrollStudents} studentForm={studentForm} />
          </>
     );
}

export default withRouter(EnrollStudents);
