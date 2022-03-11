const initialValues = {}

const getUserInfoReducer = (store = initialValues, action) => {
     switch (action.type) {
          case "USER_INFO": {
               return { ...action.payload }
          }
          case "UPDATE_USER_INFO": {
               return { ...action.payload }
          }
          case "IS_LOGGED_OUT": {
               return initialValues
          }
          default: {
               return { ...store }
          }
     }
}

export default getUserInfoReducer