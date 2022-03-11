const initialValue = {}

export default function handleSnackbarReducer(store = initialValue, action) {
     switch (action.type) {
          case "SUCCESS_MESSAGE": {
               return {...action.payload}
          }
          case "UPDATED_MESSAGE": {
               return {...action.payload}
          }
          case "DELETED_MESSAGE": {
               return {...action.payload}
          }
          case "SNACKBAR_CLOSE": {
               return initialValue
          }
          default: {
               return {...store}
          }
     }
}