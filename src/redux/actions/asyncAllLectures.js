import axios from 'axios'
import swal from 'sweetalert';
import { cancelRequest } from './requestAction'
import { successfullyCreatedSnackbar, successfullyUpdatedSnackbar, successfullyDeletedSnackbar } from './handleSnackbar';

export const asyncGetAllLectures = (url) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.get(`https://dct-e-learning.herokuapp.com/api${url}`, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(getAllLectures(response.data))
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
               })
     }
}

export const asyncCreateLecture = (id, formData) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.post(`https://dct-e-learning.herokuapp.com/api/courses/${id}/lectures`, formData, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(createLecture(response.data))
                    dispatch(cancelRequest())
                    dispatch(successfullyCreatedSnackbar())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}

export const asyncUpdateLecture = (url, formData) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.put(`https://dct-e-learning.herokuapp.com/api${url}`, formData, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(updateLecture(response.data))
                    dispatch(cancelRequest())
                    dispatch(successfullyUpdatedSnackbar())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}

export const asyncDeleteLectures = (url) => {
     return (dispatch, getState) => {
          const token = getState()
          axios.delete(`https://dct-e-learning.herokuapp.com/api${url}`, {
               headers: {
                    "Authorization": token.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(deleteLecture(response.data))
                    dispatch(cancelRequest())
                    dispatch(successfullyDeletedSnackbar())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}

export const getAllLectures = (lectures) => {
     return {
          type: "ALL_LECTURES",
          payload: lectures
     }
}

export const createLecture = (lecture) => {
     return {
          type: "ADD_LECTURE",
          payload: lecture
     }
}

export const updateLecture = (data) => {
     return {
          type: "UPDATE_LECTURE",
          payload: data
     }
}

export const deleteLecture = (data) => {
     return {
          type: "DELETE_LECTURE",
          payload: data
     }
}

export const removeLectures = () => {
     return {
          type: "REMOVE_LECTURES"
     }
}