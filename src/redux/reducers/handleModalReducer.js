const initialValue = false

const handleModalReducer = (store = initialValue, action) => {
     switch (action.type) {
          case "MODAL_OPEN": {
               return true
          }case "IS_LOGGED_OUT":{
               return initialValue
          }
          case "MODAL_CLOSE": {
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

export default handleModalReducer