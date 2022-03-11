import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardActionArea, Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import swal from 'sweetalert';
import image from '../../Home_Page_Images/card.png'
import { makingRequest } from '../../redux/actions/requestAction';
import { makingModalClose } from '../../redux/actions/handleModalAction';
import { asyncDeleteCOurse } from '../../redux/actions/asyncAllCourses';
import './courses.css'

const CourseItem = (props) => {
     const { _id, author, category, level, description, validity } = props
     const store = useSelector((store) => {
          return store.userInfo
     })
     const dispatch = useDispatch()

     const handleDeleteCourse = (e) => {
          e.preventDefault()
          e.stopPropagation()
          swal({
               title: "Are you sure?",
               text: "Once deleted, you will not be able to recover this file!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
          })
               .then((willDelete) => {
                    if (willDelete) {
                         dispatch(makingModalClose())
                         dispatch(makingRequest())
                         dispatch(asyncDeleteCOurse(_id))
                    }
               });
     }

     return (
          <>
               <Card className='card'>
                    <CardActionArea>
                         <CardMedia
                              component="img"
                              height="140"
                              image={image}
                              alt="course image"
                         />
                         <CardContent>
                              <Typography variant="h6">
                                   {author.toUpperCase()}: {category}
                              </Typography>
                              <Typography variant="body2">
                                   Level - ( {level} )
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary">
                                   Description - "{description}"
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                   Validity - ( {validity} months )
                              </Typography>
                         </CardContent>
                    </CardActionArea>
                    {
                         store.role === 'admin' && (
                              <CardActions sx={{ float: 'right' }}>
                                   <Button variant='contained' onClick={handleDeleteCourse}>
                                        Delete Course
                                   </Button>
                              </CardActions>
                         )
                    }
               </Card>
          </>
     );
}

export default CourseItem;