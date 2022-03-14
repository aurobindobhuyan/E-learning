import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormHelperText } from '@mui/material';
import { makingModalOpen } from '../../redux/actions/handleModalAction';

const LecturesForm = (props) => {
     const { formSubmit, title, description, assetType, assetURL, isDelete, course, id } = props
     const dispatch = useDispatch()

     const validation = yup.object().shape({
          title: yup.string().min(4).required(),
          description: yup.string().min(5).required(),
          assetType: yup.string().required(),
          assetURL: yup.string().url().required()
     })

     const formik = useFormik({
          initialValues: {
               title: title ? title : '',
               description: description ? description : '',
               assetType: assetType ? assetType : '',
               assetURL: assetURL ? assetURL : '',
               comments: '',
               students: '',
               course: course ? course : id,
               isDelete: title ? isDelete : false
          },
          validationSchema: validation,
          onSubmit: (values) => {
               dispatch(makingModalOpen())
               formSubmit(values)
          }
     })
     const assetTYpes = ["audio", "video", "text", "pdf", "img"]

     return (
          <form className='formik' onSubmit={formik.handleSubmit}>
               <TextField
                    id='title'
                    name='title'
                    margin='normal'
                    label='Title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
               />

               <TextField
                    id='description'
                    name='description'
                    autoComplete='off'
                    margin='normal'
                    label='Description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
               />

               <FormControl>
                    <InputLabel id='assetType'>assetType</InputLabel>
                    <Select
                         labelId='assetType'
                         id='assetType'
                         name='assetType'
                         value={formik.values.assetType}
                         onChange={formik.handleChange}
                         error={formik.touched.assetType && Boolean(formik.errors.assetType)}
                    >
                         <MenuItem value=''>None</MenuItem>
                         {
                              assetTYpes.map(ele => <MenuItem key={ele} value={ele}>{ele}</MenuItem>)
                         }
                    </Select>
                    <FormHelperText style={{ color: '#d32f2f' }}>{formik.touched.assetType && formik.errors.assetType}</FormHelperText>
               </FormControl>

               <TextField
                    id='assetURL'
                    name='assetURL'
                    autoComplete='off'
                    margin='normal'
                    label='assetURL'
                    value={formik.values.assetURL}
                    onChange={formik.handleChange}
                    error={formik.touched.assetURL && Boolean(formik.errors.assetURL)}
                    helperText={formik.touched.assetURL && formik.errors.assetURL}
               />

               <FormControl fullWidth>
                    <InputLabel id='isDelete'>Is Delete</InputLabel>
                    <Checkbox
                         id='isDelete'
                         name='isDelete'
                         label='Is Delete'
                         margin='normal'
                         disabled={!title}
                         checked={formik.values.isDelete}
                         value={formik.values.isDelete}
                         onChange={formik.handleChange}
                    />
               </FormControl>

               <Button type='submit'>Submit</Button>
          </form>
     );
}

export default LecturesForm;