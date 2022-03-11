// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as yup from 'yup';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import PatternIcon from '@mui/icons-material/Pattern';
// import SaveIcon from '@mui/icons-material/Save';
// import LoadingButton from '@mui/lab/LoadingButton';
// import LoadingProgress from '../LoadingProgress';
// import { makingModalOpen } from '../../redux/actions/handleModalAction';

// const AdminForm = (props) => {
//   const { handleToggleComponent, adminInfo, formSubmit } = props
//   const [showHide, setShowHide] = useState(false)

//   const store = useSelector((store) => {
//     return store.request
//   })
//   const dispatch = useDispatch()

//   const handleShowHidePassword = () => {
//     setShowHide(!showHide)
//   }

//   const formInitialValues = {
//     username: adminInfo ? adminInfo.username : '',
//     email: adminInfo ? adminInfo.email : '',
//     password: '',
//     academy: {
//       name: adminInfo ? adminInfo.academy.name : '',
//       website: adminInfo ? adminInfo.academy.website : ''
//     }
//   }

//   const schema = yup.object().shape({
//     username: yup.string().min(4, 'atleast 4 characters').required('*required'),
//     email: yup.string().email("Enter valid").required('*required'),
//     password: yup.string().min(8, "Too Short").max(12, 'Too High!').required('*required'),
//     academy: yup.object({
//       name: yup.string().min(4, 'atleast 4 characters').required('*required'),
//       website: yup.string().required('*required')
//     }),
//   });

//   const shcema2 = yup.object().shape({
//     username: yup.string().min(4, 'atleast 4 characters').required('*required'),
//     email: yup.string().email("Enter valid").required('*required'),
//     academy: yup.object({
//       name: yup.string().min(4, 'atleast 4 characters').required('*required'),
//       website: yup.string().required('*required')
//     }),
//   });

//   const handleFormSubmit = (value) => {
//     if (adminInfo) {
//       dispatch(makingModalOpen())
//     }
//     formSubmit(value)
//   }

//   return (
//     <div className='parentDiv_AdminForm'>
//       <Formik
//         initialValues={formInitialValues}
//         validationSchema={!adminInfo ? schema : shcema2}
//         onSubmit={(values => handleFormSubmit(values))}
//       >
//         <Form className='form'>
//           {
//             adminInfo ? (
//               <h1>EDIT ADMIN INFO</h1>
//             ) : (
//               <div className='buttonDiv'>
//                 <PatternIcon fontSize='large' />
//               </div>
//             )
//           }
//           {
//             store && (
//               <div style={{ textAlignLast: 'center', color: 'red' }}>
//                 <h4>Loading....</h4>
//                 <LoadingProgress />
//               </div>
//             )
//           }

//           <div>
//             <label className='label'>User Name</label>
//             <Field
//               className='input'
//               type="text"
//               name='username'
//               placeholder='user name'
//               autoComplete='off'
//             />
//             <ErrorMessage name='username' />
//             <br />
//           </div>
//           <hr />

//           <div>
//             <label className='label'>Email</label>
//             <Field
//               className='input'
//               type='text'
//               name='email'
//               placeholder='email'
//               autoComplete='off'
//             />
//             <ErrorMessage name='email' />
//             <br />
//           </div>
//           <hr />

//           {
//             !adminInfo && (
//               <>
//                 <div className='parentDiv_AdminForm' style={{ display: 'flex' }}>
//                   <label className='label'>Password</label>
//                   <div className='passwordDiv'>
//                     <Field
//                       className='passwordInput'
//                       type={showHide ? 'text' : "password"}
//                       name='password'
//                       placeholder='password'
//                     />
//                     <span className="showHideIcon" onClick={handleShowHidePassword}>
//                       {
//                         showHide ? (
//                           <VisibilityIcon />
//                         ) : (
//                           <VisibilityOffIcon />
//                         )
//                       }
//                     </span>
//                   </div>
//                   <ErrorMessage name='password' />
//                   <br />
//                 </div>
//                 <hr />
//               </>)
//           }

//           <div>
//             <label className='label'>Academy Name</label>
//             <Field
//               className='input'
//               type="text"
//               name='academy.name'
//               placeholder='name'
//               autoComplete='off'
//             />
//             <ErrorMessage name='academy.name' />
//             <br />
//           </div>
//           <hr />

//           <div>
//             <label className='label'>Website</label>
//             <Field
//               className='input'
//               type="text"
//               name='academy.website'
//               placeholder='http://www.example.com'
//               autoComplete='off'
//             />
//             <ErrorMessage name='academy.website' />
//             <br />
//           </div>
//           <hr />

//           <div className='buttonDiv'>
//             <LoadingButton color="secondary" loading={store} loadingPosition="start" startIcon={<SaveIcon />} variant="contained" type='save' >
//               Save
//             </LoadingButton>
//             {
//               !adminInfo && <h3 className='loginLink' onClick={handleToggleComponent}>Already Have an account?</h3>
//             }
//           </div>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default AdminForm;