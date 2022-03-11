import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import CourseItem from './CourseItem';

const ListingCourses = () => {
     const store = useSelector((store) => {
          return store
     })

     return (
          <>
               {
                    store.userInfo.role === 'student' && !store.userInfo.isAllowed && (
                         <h3>You are not allowed to access the courses</h3>
                    )
               }
               {
                    store.allCourses.map(ele => {
                         if (store.userInfo.role === 'student' && !ele.isDelete || store.userInfo.role === 'admin') {
                              return (
                                   <Grid key={ele._id} item md={4} sm={6} xs={12}>
                                        <Link to={store.userInfo.role === 'admin' || store.userInfo.isAllowed ? `/courses/${ele._id}` : '/courses'}
                                        >
                                             <CourseItem {...ele} />
                                        </Link>
                                   </Grid>
                              )
                         }
                    })
               }
          </>
     );
}

export default ListingCourses;