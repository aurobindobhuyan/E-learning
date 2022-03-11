import axios from 'axios'
import { cancelRequest } from './requestAction'
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { successfullyCreatedSnackbar, successfullyUpdatedSnackbar, successfullyDeletedSnackbar } from './handleSnackbar';
import swal from 'sweetalert';

export const asyncAllStudents = () => {
     return (dispatch, getState) => {
          const store = getState()
          axios.get('https://dct-e-learning.herokuapp.com/api/admin/students', {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(allStudent(response.data))
                    dispatch(makingModalClose())
                    dispatch(cancelRequest())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncCreateStudent = (url, formData) => {
     return (dispatch, getState) => {
          const store = getState()
          axios.post(`https://dct-e-learning.herokuapp.com/api${url}`, formData, {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    if (response.data.hasOwnProperty('errors')) {
                         dispatch(makingModalClose())
                         dispatch(cancelRequest())
                         swal(response.data.errors)
                    } else {
                         dispatch(createStudent(response.data))
                         dispatch(makingModalClose())
                         dispatch(cancelRequest())
                         dispatch(successfullyCreatedSnackbar())
                    }
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncUpdateStudentInfo = (url, formData) => {
     return (dispatch, getState) => {
          const store = getState()
          axios.put(`https://dct-e-learning.herokuapp.com/api${url}`, formData, {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(updateStudentInfo(response.data))
                    dispatch(makingModalClose())
                    dispatch(cancelRequest())
                    dispatch(successfullyUpdatedSnackbar())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncRemoveUser = (url) => {
     return (dispatch, getState) => {
          const store = getState()
          axios.delete(`https://dct-e-learning.herokuapp.com/api${url}`, {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(deleteStudentInfo(response.data))
                    dispatch(makingModalClose())
                    dispatch(cancelRequest())
                    dispatch(successfullyDeletedSnackbar())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const allStudent = (studentData) => {
     return {
          type: "GET_ALL_STUDENTS",
          payload: studentData
     }
}

export const createStudent = (data) => {
     return {
          type: "CREATE_STUDENT",
          payload: data
     }
}

export const updateStudentInfo = (formData) => {
     return {
          type: "UPDATE_STUDENT_INFO",
          payload: formData
     }
}

export const deleteStudentInfo = (data) => {
     return {
          type: "DELETE_STUDENT_INFO",
          payload: data
     }
}