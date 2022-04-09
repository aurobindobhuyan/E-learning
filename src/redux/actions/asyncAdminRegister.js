import axios from 'axios'
import swal from 'sweetalert'
import { baseUrl } from './baseUrl'
import { cancelRequest } from './requestAction'

export const asyncAdimRegister = (formData, handleToggleComponent) => {
     return (dispatch) => {
          axios.post(baseUrl + '/admin/register', formData)
               .then((response) => {
                    swal("Good job!", `${response.data.notice}`, "success", { button: "Ok!" });
                    dispatch(cancelRequest())
                    handleToggleComponent()
               })
               .catch((err) => {
                    swal('Try different Email or Academy Name', {
                         icon: 'error'
                    })
                    dispatch(cancelRequest())
               })
     }
}