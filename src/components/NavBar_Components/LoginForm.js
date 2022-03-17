import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { TextField, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, FormHelperText, Radio } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import LoadingProgress from '../LoadingProgress';
import { studentLoggedIn } from '../../redux/actions/loginAction'
import { makingRequest } from '../../redux/actions/requestAction'
import { adminLoggedIn } from '../../redux/actions/loginAction';

const LoginForm = (props) => {
     const { handleToggleComponent } = props
     const [loginError, setLoginError] = useState('');
     const [toggleAdminStudent, setToggleAdminStudent] = useState('admin')
     const [showHidePassword, setShowHidePassword] = useState(false);

     const store = useSelector((store) => {
          return store.request
     })
     const dispatch = useDispatch()

     const handleClick = () => {
          setShowHidePassword(!showHidePassword)
     }

     const displayErrors = (data) => {
          setLoginError(data)
     }

     const handleRadioButton = (e) => {
          setToggleAdminStudent(e.target.value)
     }

     const schema = yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(8).max(12).required()
     })

     const formik = useFormik({
          initialValues: {
               email: '',
               password: ''
          },
          validationSchema: schema,
          onSubmit: function (values) {
               setLoginError('')
               if (toggleAdminStudent === 'admin') {
                    dispatch(adminLoggedIn(values, displayErrors))
                    dispatch(makingRequest())
               } else {
                    dispatch(studentLoggedIn(values, displayErrors))
                    dispatch(makingRequest())
               }
          }
     })

     return (
          <form className='form' onSubmit={formik.handleSubmit}>
               <div style={{ textAlign: 'center' }}>
                    <h3>LOG IN</h3>
                    <LockIcon fontSize='large' />
               </div>
               {
                    store && (
                         <LoadingProgress>
                              <h4>Loading...</h4>
                         </LoadingProgress>
                    )
               }
               {loginError && <h4 className='loading'>{loginError}</h4>}

               <TextField
                    id='email'
                    name='email'
                    placeholder='example@gmail.com'
                    label='Enter your Email'
                    margin='dense'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
               />

               <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                         id="password"
                         name='password'
                         label="Password"
                         margin='dense'
                         type={showHidePassword ? 'text' : 'password'}
                         value={formik.values.password}
                         onChange={formik.handleChange}
                         error={formik.touched.password && Boolean(formik.errors.password)}
                         endAdornment={
                              <InputAdornment position="end">
                                   <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClick}
                                        edge="end"
                                   >
                                        {!showHidePassword ? <VisibilityOff /> : <Visibility />}
                                   </IconButton>
                              </InputAdornment>
                         }
                    />
                    <FormHelperText style={{ color: '#d32f2f' }}>
                         {formik.touched.password && formik.errors.password}
                    </FormHelperText>
               </FormControl>

               <div>
                    <Radio
                         id='admin'
                         name='redio'
                         value='admin'
                         checked={toggleAdminStudent === 'admin'}
                         onChange={handleRadioButton}
                    />
                    <label htmlFor='admin'>Login as Admin</label>

                    <Radio
                         id='student'
                         name='redio'
                         value='student'
                         checked={toggleAdminStudent === 'student'}
                         onChange={handleRadioButton}
                    />
                    <label htmlFor='student'>Login as Student</label>
               </div>
               <br />

               <LoadingButton endIcon={<SendIcon />} loading={store} loadingPosition="end" variant="contained" size='large' type='submit' >
                    Log In
               </LoadingButton>
               <h3 className='loginLink' onClick={handleToggleComponent}>Register as an Admin </h3>
          </form>
     );
}

export default LoginForm;