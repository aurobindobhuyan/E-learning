const initialValues = []

const allLecturesReducer = (store = initialValues, action) => {
     switch (action.type) {
          case "ALL_LECTURES": {
               return [...action.payload]
          }
          case "ADD_LECTURE": {
               return [...store, { ...action.payload }]
          }
          case "UPDATE_LECTURE": {
               const updatedLecture = store.map(ele => {
                    if (ele._id === action.payload._id) {
                         return { ...action.payload }
                    } else {
                         return ele
                    }
               })
               return updatedLecture
          }
          case "DELETE_LECTURE": {
               const result = store.filter(ele => ele._id !== action.payload._id)
               return result
          }
          case "REMOVE_LECTURES": {
               return initialValues
          }
          case "IS_LOGGED_OUT": {
               return initialValues
          }
          default: {
               return [...store]
          }
     }
}

export default allLecturesReducer