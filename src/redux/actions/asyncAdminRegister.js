import axios from 'axios'
import swal from 'sweetalert'
import { cancelRequest } from './requestAction'

export const asyncAdimRegister = (formData, handleToggleComponent) => {
     return (dispatch) => {
          axios.post('https://dct-e-learning.herokuapp.com/api/admin/register', formData)
               .then((response) => {
                    swal("Good job!", `${response.data.notice}`, "success", { button: "Ok!" });
                    dispatch(cancelRequest())
                    handleToggleComponent()
               })
               .catch((err) => {
                    swal((err.message.errors), {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}