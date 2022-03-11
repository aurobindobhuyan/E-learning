import React from 'react';
import { useDispatch } from 'react-redux'
import CourseForm from './CourseForm'
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { makingRequest } from '../../redux/actions/requestAction';
import { asyncCreateCourse } from '../../redux/actions/asyncAllCourses';

const AddCourse = () => {
     const dispatch = useDispatch()

     const handleSubmit = (formData) => {
          dispatch(makingRequest())
          dispatch(asyncCreateCourse(formData))
          dispatch(makingModalClose())
     }

     return (
          <>
               <h1>Adding a course</h1>
               <CourseForm handleSubmit={handleSubmit} />
          </>
     );
}

export default AddCourse;