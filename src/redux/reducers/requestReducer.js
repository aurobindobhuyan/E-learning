const initialValue = false

const requestReducer = (store = initialValue, action) => {
     switch (action.type) {
          case "MAKING_REQUEST": {
               return true
          }
          case "CANCEL_REQUEST": {
               return initialValue
          }
          case "IS_LOGGED_OUT": {
               return initialValue
          }
          default: {
               return store
          }
     }
}

export default requestReducer