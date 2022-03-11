const initialValue = []

const allStudentReducer = (store = initialValue, action) => {
     switch (action.type) {
          case "GET_ALL_STUDENTS": {
               return [...action.payload]
          }
          case "CREATE_STUDENT": {
               return [...store, { ...action.payload }]
          }
          case "UPDATE_STUDENT_INFO": {
               const result = store.map(ele => {
                    if (ele._id === action.payload._id) {
                         return { ...ele, ...{ ...action.payload } }
                    } else {
                         return ele
                    }
               })
               return result
          }
          // case "ENROLLING_STUDENT": {
          //      const allFilteredStudents = store.filter(ele => ele.courses.some(e => e.course === action.payload._id))
          // }
          case "DELETE_STUDENT_INFO": {
               const result = store.filter(ele => ele._id !== action.payload._id)
               return result
          }
          case "IS_LOGGED_OUT": {
               return initialValue
          }
          default: {
               return [...store]
          }
     }
}

export default allStudentReducer