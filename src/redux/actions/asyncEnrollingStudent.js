import axios from "axios";
import swal from "sweetalert";
import { cancelRequest } from "./requestAction";
import { asyncAllStudents } from "./asyncAllStudents";
import { asyncGetUserInfo } from "./asyncGetUserInfo";

export const asyncEnrollingStudent = (url) => {
     return (dispatch, getState) => {
          const store = getState()
          axios.patch(`https://dct-e-learning.herokuapp.com/api${url}`, null, {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(enrollingStudent(response.data))
                    if (store.userInfo.role === 'admin') {
                         dispatch(asyncAllStudents())
                    } else {
                         dispatch(asyncGetUserInfo(`/students/${store.isLoggedIn}`))
                    }
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

export const asyncUnEnrollingStudent = (url) => {
     return (dispatch, getState) => {
          const store = getState()
          axios.patch(`https://dct-e-learning.herokuapp.com/api${url}`, null, {
               headers: {
                    "Authorization": store.isLoggedIn
               }
          })
               .then((response) => {
                    dispatch(unEnrollingStudent(response.data))
                    if (store.userInfo.role === 'admin') {
                         dispatch(asyncAllStudents())
                    } else {
                         dispatch(asyncGetUserInfo(`/students/${store.isLoggedIn}`))
                    }
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

export const enrollingStudent = (data) => {
     return {
          type: "ENROLLING_STUDENT",
          payload: data
     }
}

export const unEnrollingStudent = (data) => {
     return {
          type: "UN_ENROLLING_STUDENT",
          payload: data
     }
}