import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, InputLabel, Button, Select, MenuItem, FormControl, Checkbox, Box, FormHelperText } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makingModalOpen } from '../../redux/actions/handleModalAction'

const CourseForm = (props) => {
     const { handleSubmit, editId, editName, editDescription, editDuration, editReleaseDate, editIsDelete, editCategory, editValidity, editLevel, editAuthor } = props
     const dispatch = useDispatch()

     const schema = yup.object().shape({
          name: yup.string().min(4).required(),
          description: yup.string().required(),
          duration: yup.number().max(12).required(),
          category: yup.string().required(),
          validity: yup.number().max(12).required(),
          level: yup.string().required(),
          author: yup.string().min(4).required()
     })

     const formik = useFormik({
          initialValues: {
               _id: editId && editId,
               name: editName ? editName : '',
               description: editDescription ? editDescription : '',
               duration: editDuration ? editDuration : '',
               releaseDate: editReleaseDate ? editReleaseDate : null,
               isDelete: editIsDelete ? editIsDelete : false,
               category: editCategory ? editCategory : '',
               validity: editValidity ? editValidity : '',
               level: editLevel ? editLevel : '',
               author: editAuthor ? editAuthor : ''
          },
          validationSchema: schema,
          onSubmit: (values) => {
               dispatch(makingModalOpen())
               handleSubmit(values)
          }
     })
     const courseCatagories = ['HTML', 'CSS', 'javascript', 'reactjs', 'nodejs', 'expressjs', 'mongodb']

     return (
          <form className='formik' onSubmit={formik.handleSubmit}>
               <FormControl>
                    <TextField
                         id='name'
                         name='name'
                         label='Name of the course'
                         margin='normal'
                         value={formik.values.name}
                         onChange={formik.handleChange}
                         error={formik.touched.name && Boolean(formik.errors.name)}
                         autoComplete='off'
                    />
                    <FormHelperText>{formik.touched.name && formik.errors.name}</FormHelperText>

                    <TextField
                         id='description'
                         name='description'
                         label='Description'
                         margin='normal'
                         value={formik.values.description}
                         onChange={formik.handleChange}
                         error={formik.touched.description && Boolean(formik.errors.description)}
                         autoComplete='off'
                    />
                    <FormHelperText>{formik.touched.description && formik.errors.description}</FormHelperText>

                    <TextField
                         type='number'
                         id='duration'
                         name='duration'
                         label='Duration in months'
                         margin='normal'
                         value={formik.values.duration}
                         onChange={formik.handleChange}
                         error={formik.touched.duration && Boolean(formik.errors.duration)}
                         autoComplete='off'
                    />
                    <FormHelperText>{formik.touched.duration && formik.errors.duration}</FormHelperText>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                         <DatePicker
                              label="Release course"
                              format="dd/MM/yyyy"
                              value={formik.values.releaseDate}
                              onChange={(newDate => { formik.setFieldValue('releaseDate', newDate ? newDate : null) })}
                              renderInput={(params) => <TextField {...params} />}
                         />
                    </LocalizationProvider>

                    <FormControl fullWidth>
                         <InputLabel htmlFor='isDelete'>Is Delete</InputLabel>
                         <Checkbox
                              id='isDelete'
                              name='isDelete'
                              label='Is Delete'
                              margin='normal'
                              disabled={!editId}
                              checked={formik.values.isDelete}
                              value={formik.values.isDelete}
                              onChange={formik.handleChange}
                         />
                    </FormControl>

                    <FormControl>
                         <InputLabel error={Boolean(formik.touched.category && formik.errors.category)} htmlFor='category'>Category</InputLabel>
                         <Select
                              label='category'
                              id='category'
                              name='category'
                              value={formik.values.category}
                              onChange={formik.handleChange}
                              error={formik.touched.category && Boolean(formik.errors.category)}
                         >
                              <MenuItem value="">
                                   <em>None</em>
                              </MenuItem>
                              {
                                   courseCatagories.map(ele => {
                                        return <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                   })
                              }
                         </Select>
                         <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
                    </FormControl>

                    <TextField
                         type='number'
                         id='validity'
                         name='validity'
                         label='validity'
                         margin='normal'
                         value={formik.values.validity}
                         onChange={formik.handleChange}
                         error={formik.touched.validity && Boolean(formik.errors.validity)}
                         autoComplete='off'
                    />
                    <FormHelperText>{formik.touched.validity && formik.errors.validity}</FormHelperText>

                    <FormControl fullWidth>
                         <InputLabel error={Boolean(formik.touched.level && formik.errors.level)} htmlFor="level">Level</InputLabel>
                         <Select
                              id="level"
                              name='level'
                              label="Level"
                              value={formik.values.level}
                              onChange={formik.handleChange}
                              error={formik.touched.level && Boolean(formik.errors.level)}
                         >
                              <MenuItem value="">
                                   <em>None</em>
                              </MenuItem>
                              <MenuItem value='beginner'>Beginner</MenuItem>
                              <MenuItem value='intermediate'>Intermediate</MenuItem>
                              <MenuItem value='expert'>Expert</MenuItem>
                         </Select>
                         <FormHelperText>{formik.touched.level && formik.errors.level}</FormHelperText>
                    </FormControl>

                    <TextField
                         id='author'
                         name='author'
                         label='author'
                         margin='normal'
                         value={formik.values.author}
                         onChange={formik.handleChange}
                         error={formik.touched.author && Boolean(formik.errors.author)}
                         autoComplete='off'
                    />
                    <FormHelperText>{formik.touched.author && formik.errors.author}</FormHelperText>
               </FormControl>

               <Button variant='secondary' type='submit'>Save</Button>
          </form>
     );
}

export default CourseForm;