import axios from "axios"
import swal from "sweetalert"
import { baseUrl } from "./baseUrl"
import { cancelRequest } from './requestAction'
import { makingModalClose } from "./handleModalAction"

export const adminLoggedIn = (formData, displayErrors) => {
     return (dispatch) => {
          axios.post(baseUrl + '/admin/login', formData)
               .then((response) => {
                    if (response.data.hasOwnProperty('errors')) {
                         displayErrors(response.data.errors)
                         dispatch(cancelRequest())
                    } else {
                         localStorage.setItem('tokenInfo', JSON.stringify(response.data))
                         localStorage.setItem('role', 'admin')
                         displayErrors('')
                         dispatch(cancelRequest())
                         dispatch(userLoggedIn(response.data.token))
                         dispatch(makingModalClose())
                         swal("Good job!", "successfully loggedIn!", "success", { button: "Ok!" });
                    }
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}

export const studentLoggedIn = (formData, displayErrors) => {
     return (dispatch) => {
          axios.post(baseUrl + '/students/login', formData)
               .then((response) => {
                    if (response.data.hasOwnProperty('errors')) {
                         displayErrors(response.data.errors)
                         dispatch(cancelRequest())
                    } else {
                         localStorage.setItem('tokenInfo', JSON.stringify(response.data))
                         localStorage.setItem('role', 'student')
                         displayErrors('')
                         dispatch(cancelRequest())
                         dispatch(userLoggedIn(response.data.token))
                         dispatch(makingModalClose())
                         swal("Good job!", "successfully loggedIn!", "success", { button: "Ok!" });
                    }
               })
               .catch((err) => {
                    swal((err.message), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}

export const userLoggedIn = (formData) => {
     return {
          type: "IS_LOGGED_IN",
          payload: formData
     }
}

export const userLoggedOut = () => {
     return {
          type: "IS_LOGGED_OUT"
     }
}