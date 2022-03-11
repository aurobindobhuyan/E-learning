const initialValue = ''

const loginReducer = (state = initialValue, action) => {
     switch (action.type) {
          case "IS_LOGGED_IN": {
               return action.payload
          }
          case "IS_LOGGED_OUT": {
               return initialValue
          }
          default: {
               return state
          }
     }
}

export default loginReducer