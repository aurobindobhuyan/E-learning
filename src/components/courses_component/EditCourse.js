import React from 'react';
import { useDispatch } from 'react-redux'
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { makingRequest } from '../../redux/actions/requestAction';
import { asyncEditCourse } from '../../redux/actions/asyncAllCourses';
import CourseForm from './CourseForm';

const EditCourse = (props) => {
     const { _id, name, description, duration, releaseDate, isDelete, category, validity, level, author } = props.objectId
     const dispatch = useDispatch()

     const handleSubmit = (formData) => {
          dispatch(makingRequest())
          dispatch(asyncEditCourse(_id, formData))
          dispatch(makingModalClose())
     }

     return (
          <>
               <h1>Edit Course</h1>
               <CourseForm
                    handleSubmit={handleSubmit}
                    editId={_id}
                    editName={name}
                    editDescription={description}
                    editDuration={duration}
                    editReleaseDate={releaseDate}
                    editIsDelete={isDelete}
                    editCategory={category}
                    editValidity={validity}
                    editLevel={level}
                    editAuthor={author}
               />
          </>
     );
}

export default EditCourse;
