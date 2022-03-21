import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './components/NavBar'
import DirectionSnackbar from './components/snackbarMessage';
import { userLoggedIn } from './redux/actions/loginAction'
import { asyncGetUserInfo } from './redux/actions/asyncGetUserInfo'
import { asyncAllStudents } from './redux/actions/asyncAllStudents'
import { makingRequest } from './redux/actions/requestAction'
import { asyncAllCourses } from './redux/actions/asyncAllCourses';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundImage: 'linear-gradient(93deg, #e1d5e9, #f4f4f9, #e5f3f1)'
        }
      },
    },
  },
});

function App() {
  const store = useSelector((store) => {
    return store.isLoggedIn
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('tokenInfo')) {
      dispatch(userLoggedIn(JSON.parse(localStorage.getItem('tokenInfo')).token))
    }
  }, [])

  useEffect(() => {
    if (store && localStorage.getItem('role') === 'admin') {
      dispatch(asyncGetUserInfo('/admin/account'))
      dispatch(asyncAllStudents())
      dispatch(makingRequest())
      dispatch(asyncAllCourses())
    } else if (store && localStorage.getItem('role') === 'student') {
      dispatch(asyncGetUserInfo(`/students/${store}`))
      dispatch(makingRequest())
      dispatch(asyncAllCourses())
    }
  }, [store])

  return (
    <div id='appDiv2'>
      <ThemeProvider theme={theme}>
        <NavBar />
      </ThemeProvider>
      <DirectionSnackbar />
    </div>
  );
}

export default App;
