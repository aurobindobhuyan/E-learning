import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getIn, useFormik } from 'formik'
import * as yup from 'yup'
import LoadingProgress from '../LoadingProgress';
import { makingModalOpen } from '../../redux/actions/handleModalAction';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
     helperText: {
          color: '#d32f2f'
     }
})

const AdminForm = (props) => {
     const classes = useStyles()
     const { formSubmit, username, email, academy, handleToggleComponent } = props
     const [showHidePassword, setShowHidePassword] = React.useState(false);
     const store = useSelector((store) => {
          return store.request
     })
     const dispatch = useDispatch()

     const handleClickShowPassword = () => {
          setShowHidePassword(!showHidePassword)
     }

     const schema = yup.object().shape({
          username: yup.string().min(4).required(),
          email: yup.string().email().required(),
          password: yup.string().min(8).max(12).required(),
          academy: yup.object({
               name: yup.string().min(4).required(),
               website: yup.string().required()
          })
     });

     const shcema2 = yup.object().shape({
          username: yup.string().min(4).required(),
          email: yup.string().email().required(),
          academy: yup.object({
               name: yup.string().min(4).required(),
               website: yup.string().required()
          }),
     });

     const formik = useFormik({
          initialValues: {
               username: username ? username : '',
               email: email ? email : '',
               password: '',
               academy: {
                    name: username ? academy.name : '',
                    website: username ? academy.website : ''
               }
          },
          validationSchema: !username ? schema : shcema2,
          onSubmit: (values) => {
               if (username) {
                    dispatch(makingModalOpen())
               }
               formSubmit(values)
          }
     })

     return (
          <>
               {
                    store && (
                         <LoadingProgress>
                              <h4>Loading...</h4>
                         </LoadingProgress>
                    )
               }
               <form className='formik' onSubmit={formik.handleSubmit}>
                    <FormControl variant='outlined'>
                         <TextField
                              id='username'
                              name='username'
                              label='Username'
                              margin='normal'
                              autoComplete='off'
                              value={formik.values.username}
                              onChange={formik.handleChange}
                              error={formik.touched.username && Boolean(formik.errors.username)}
                         />
                         <FormHelperText className={classes.helperText}>{formik.touched.username && formik.errors.username}</FormHelperText>

                         <TextField
                              id='email'
                              name='email'
                              label='Email'
                              margin='normal'
                              autoComplete='off'
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                         />
                         <FormHelperText className={classes.helperText}>{formik.touched.email && formik.errors.email}</FormHelperText>

                         {
                              !username && (
                                   <FormControl variant='outlined'>
                                        <InputLabel sx={{ color: formik.touched.password ? '#d32f2f' : '#666666' }} htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                             type={showHidePassword ? 'text' : 'password'}
                                             id='password'
                                             name='password'
                                             label='Password'
                                             margin="dense"
                                             value={formik.values.password}
                                             onChange={formik.handleChange}
                                             error={formik.touched.password && Boolean(formik.errors.password)}
                                             endAdornment={
                                                  <InputAdornment position="end">
                                                       <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleClickShowPassword}
                                                            edge="end"
                                                       >
                                                            {!showHidePassword ? <VisibilityOff /> : <Visibility />}
                                                       </IconButton>
                                                  </InputAdornment>
                                             }
                                        />
                                        <FormHelperText className={classes.helperText}>{formik.touched.password && formik.errors.password}</FormHelperText>
                                   </FormControl>
                              )
                         }

                         <TextField
                              id='name'
                              name='academy.name'
                              margin='normal'
                              label='Academy Name'
                              autoComplete='off'
                              value={formik.values.academy.name}
                              onChange={formik.handleChange}
                              error={Boolean(getIn(formik.touched, 'academy.name') && getIn(formik.errors, 'academy.name'))}
                         />
                         <FormHelperText className={classes.helperText}>{getIn(formik.touched, 'academy.name') && getIn(formik.errors, 'academy.name')}</FormHelperText>

                         <TextField
                              id='website'
                              name='academy.website'
                              margin='normal'
                              autoComplete='off'
                              label='http://www.example.com'
                              value={formik.values.academy.website}
                              onChange={formik.handleChange}
                              error={Boolean(getIn(formik.touched, 'academy.website') && getIn(formik.errors, 'academy.website'))}
                         />
                         <FormHelperText className={classes.helperText}>{getIn(formik.touched, 'academy.website') && getIn(formik.errors, 'academy.website')}</FormHelperText>
                    </FormControl>

                    <Button variant='secondary' type='submit'>
                         {username ? 'Update Info' : 'create Data'}
                    </Button>

                    {
                         !username && (
                              <h3 className='loginLink' style={{ textAlign: 'center' }} onClick={handleToggleComponent}>Already Have an account?</h3>
                         )
                    }
               </form>
          </>
     );
}

export default AdminForm;