import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'
import loginReducer from '../reducers/loginReducer'
import requestReducer from '../reducers/requestReducer'
import getUserInfoReducer from '../reducers/getUserInfoReducer'
import allStudentReducer from '../reducers/allStudentsReducer'
import handleModalReducer from '../reducers/handleModalReducer'
import allCoursesReducer from '../reducers/allCoursesReducer'
import allLecturesReducer from '../reducers/allLecturesReducer'
import handleSnackbarReducer from '../reducers/handleSnackbarReducer'

const configureStore = () => {
     const store = createStore(combineReducers({
          isLoggedIn: loginReducer,
          userInfo: getUserInfoReducer,
          allStudents: allStudentReducer,
          allCourses: allCoursesReducer,
          allLectures: allLecturesReducer,
          request: requestReducer,
          handleModal: handleModalReducer,
          handleSnackbar: handleSnackbarReducer
     }),composeWithDevTools(applyMiddleware(thunk)))
     return store
}

export default configureStore