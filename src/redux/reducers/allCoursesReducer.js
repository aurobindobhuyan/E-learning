const initialValue = []

const allCoursesReducer = (store = initialValue, action) => {
     switch (action.type) {
          case "ALL_COURSES": {
               return [...action.payload]
          }
          case "ADD_COURSE": {
               return [...store, { ...action.payload }]
          }
          case "EDIT_COURSE": {
               const result = store.map(ele => {
                    if (ele._id === action.payload._id) {
                         return { ...ele, ...{ ...action.payload } }
                    } else {
                         return ele
                    }
               })
               return result
          }
          case "DELETE_COURSE": {
               const result = store.filter(ele => ele._id !== action.payload._id)
               return result
          }
          case "ENROLLING_STUDENT": {
               const result = store.map(ele => {
                    if (ele._id === action.payload._id) {
                         return { ...ele, ...{ ...action.payload } }
                    } else {
                         return ele
                    }
               })
               return result
          }
          case "UN_ENROLLING_STUDENT": {
               const result = store.map(ele => {
                    if (ele._id === action.payload._id) {
                         return { ...ele, ...{ ...action.payload } }
                    } else {
                         return ele
                    }
               })
               return result
          }
          case "IS_LOGGED_OUT" :{
               return initialValue
          }
          default: {
               return [...store]
          }
     }
}

export default allCoursesReducer