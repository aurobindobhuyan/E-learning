import axios from "axios"
import swal from "sweetalert";
import { cancelRequest } from '../../redux/actions/requestAction'
import { successfullyUpdatedSnackbar } from './handleSnackbar';

export const asyncGetUserInfo = (url) => {
     return (dispatch, getState) => {
          const result = getState()
          axios.get(`https://dct-e-learning.herokuapp.com/api${url}`, {
               headers: {
                    "Authorization": result.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(getInfo(response.data))
                    dispatch(cancelRequest())
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}

export const asyncUpdateUserInfo = (formData) => {
     return (dispatch, getState) => {
          const store = getState()
          axios.put('https://dct-e-learning.herokuapp.com/api/admin', formData, {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(updateUserInfo(response.data))
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

export const getInfo = (result) => {
     return {
          type: "USER_INFO",
          payload: result
     }
}

export const updateUserInfo = (data) => {
     return {
          type: "UPDATE_USER_INFO",
          payload: data
     }
}