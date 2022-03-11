import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Checkbox, TextField, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, IconButton, InputAdornment } from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Favorite from '@mui/icons-material/Favorite';
import * as yup from 'yup'
import { makingModalOpen } from '../../redux/actions/handleModalAction';

const FormComponent = (props) => {
     const { formSubmit, name, email, isAllowed } = props
     const [showPassword, setShowPassword] = useState(false);
     const dispatch = useDispatch()

     const validationSchema = yup.object().shape({
          name: yup.string().min(4).required(),
          email: yup.string().email().required(),
          password: yup.string().min(8).max(12).required()
     })

     const validationSchema2 = yup.object().shape({
          name: yup.string().min(4).required(),
          email: yup.string().email().required()
     })

     const formik = useFormik({
          initialValues: {
               name: name ? name : '',
               email: email ? email : '',
               isAllowed: name ? isAllowed : true,
               password: ''
          },
          onSubmit: (values) => {
               dispatch(makingModalOpen())
               formSubmit(values)
          },
          validationSchema: name ? validationSchema2 : validationSchema
     })

     return (
          <>
               {
                    name ? (
                         <h1>Edit Info</h1>
                    ) : (
                         <h1>Add Student</h1>
                    )
               }
               <form className='formik' onSubmit={formik.handleSubmit}>

                    <TextField
                         id='name'
                         name='name'
                         label='Name'
                         margin='normal'
                         value={formik.values.name}
                         onChange={formik.handleChange}
                         error={formik.touched.name && Boolean(formik.errors.name)}
                         helperText={formik.touched.name && formik.errors.name}
                         autoComplete='off'
                    />

                    <TextField
                         id='email'
                         name='email'
                         label='Email'
                         margin='normal'
                         value={formik.values.email}
                         onChange={formik.handleChange}
                         error={formik.touched.email && Boolean(formik.errors.email)}
                         helperText={formik.touched.email && formik.errors.email}
                         autoComplete='off'
                    />

                    {
                         !name && (
                              <>
                                   <FormControl variant='outlined'>
                                        <InputLabel htmlFor='password'>Password</InputLabel>
                                        <OutlinedInput
                                             type={showPassword ? 'string' : 'password'}
                                             id='password'
                                             name='password'
                                             label='Password'
                                             margin='normal'
                                             value={formik.values.password}
                                             onChange={formik.handleChange}
                                             error={formik.touched.password && Boolean(formik.errors.password)}
                                             helperText={formik.touched.name && formik.errors.password}
                                             autoComplete='off'
                                             endAdornment={
                                                  <InputAdornment position="end">
                                                       <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { setShowPassword(!showPassword) }}
                                                            edge="end"
                                                       >
                                                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                       </IconButton>
                                                  </InputAdornment>
                                             }
                                        />
                                        <FormHelperText style={{ color: '#d32f2f' }}>
                                             {formik.touched.password && formik.errors.password}
                                        </FormHelperText>
                                   </FormControl>
                              </>
                         )
                    }

                    <FormControl>
                         <InputLabel id='isAllowed'>Is Allowed</InputLabel>
                         <Checkbox
                              id='isAllowed'
                              name='isAllowed'
                              label='isAllowed'
                              disabled={!name}
                              checked={formik.values.isAllowed}
                              value={formik.values.isAllowed}
                              color='success'
                              onChange={formik.handleChange}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                         />
                    </FormControl>

                    <Button type='submit' variant='outlined'>Save</Button>
               </form>
          </>
     );
}

export default FormComponent;