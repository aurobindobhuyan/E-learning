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
          backgroundImage: 'linear-gradient(to top, #f4d6ec 0%, #d9e1ee 100%)'
        },
        secondary: {
          backgroundImage: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'
        },
        primary: {
          backgroundImage: 'linear-gradient(-225deg, #c6f3e5 0%, #f0d6eb 100%)'
        },
        text: {
          backgroundImage: 'linear-gradient(-225deg, #cee5df 0%, #eeeaf0 48%, #d0cde7 100%)',
          color: 'black'
        }
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#d32f2f'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        '&.Mui-error': {
          color: '#d32f2f'
        }
      }
    }
  },
});

const App = () => {
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