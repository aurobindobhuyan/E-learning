import axios from 'axios'
import swal from 'sweetalert';
import { cancelRequest } from './requestAction'
import { successfullyCreatedSnackbar, successfullyUpdatedSnackbar, successfullyDeletedSnackbar } from './handleSnackbar';

export const asyncAllCourses = () => {
     return (dispatch, getState) => {
          const token = getState()
          axios.get('https://dct-e-learning.herokuapp.com/api/courses', {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(allCourses(response.data))
               })
               .catch((err) => {
                    dispatch(cancelRequest())
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncCreateCourse = (formData) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.post(`https://dct-e-learning.herokuapp.com/api/courses`, formData, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(cancelRequest())
                    dispatch(createCourse(response.data))
                    dispatch(successfullyCreatedSnackbar())
               })
               .catch((err) => {
                    dispatch(cancelRequest())
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncEditCourse = (id, formData) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.put(`https://dct-e-learning.herokuapp.com/api/courses/${id}`, formData, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(cancelRequest())
                    dispatch(editCourse(response.data))
                    dispatch(successfullyUpdatedSnackbar())
               })
               .catch((err) => {
                    dispatch(cancelRequest())
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncDeleteCOurse = (id) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${id}`, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(cancelRequest())
                    dispatch(deleteCourse(response.data))
                    dispatch(successfullyDeletedSnackbar())
               })
               .catch((err) => {
                    dispatch(cancelRequest())
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const allCourses = (data) => {
     return {
          type: "ALL_COURSES",
          payload: data
     }
}

export const createCourse = (courseData) => {
     return {
          type: "ADD_COURSE",
          payload: courseData
     }
}

export const editCourse = (courseData) => {
     return {
          type: "EDIT_COURSE",
          payload: courseData
     }
}

export const deleteCourse = (courseData) => {
     return {
          type: "DELETE_COURSE",
          payload: courseData
     }
}