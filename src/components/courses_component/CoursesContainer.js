import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddCourse from './AddCourse'
import ListingCourses from './ListingCourses';
import LoadingProgress from '../LoadingProgress';
import { removeLectures } from '../../redux/actions/asyncAllLectures';
import { Grid, Typography, Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  course: {
    color: theme.palette.info.dark,
    textAlign: 'center'
  }
}))

const CoursesContainer = () => {
  const classes = useStyles()
  const store = useSelector((store) => {
    return store
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(removeLectures())
  }, [])

  return (
    <div className='container'>
      {
        store.allCourses.length === 0 && store.request ? (
          <LoadingProgress>
            <h2>Loading...</h2>
          </LoadingProgress>
        ) : (
          <>
            {
              store.userInfo.role === 'admin' && (
                <Box sx={{ display: 'flex' }}>
                  <CustomizedDialogs>
                    <LibraryAddIcon fontSize='large' />
                    <AddCourse />
                  </CustomizedDialogs>
                  <h1>Add a new Course</h1>
                </Box>
              )
            }
            {
              store.allCourses.length === 0 ? (
                <>
                  <h1>No courses Found</h1>
                  <h3>Add Your First Course</h3>
                </>
              ) : (
                <>
                  {
                    store.request && (
                      <LoadingProgress>
                        <h3>Loading...</h3>
                      </LoadingProgress>
                    )
                  }
                  {
                    store.userInfo.role === 'student' && !store.userInfo.isAllowed ? (
                      <Typography variant='h3' sx={{ textAlign: 'center' }}>YOU ARE NOT ALLOWED TO THE COURSES</Typography>
                    ) : (
                      <>
                        <Typography variant='h3' className={classes.course}>ALL COURSES</Typography>
                        <Grid container rowSpacing={5} columnSpacing={{ xs: 10, sm: 14, md: 20 }}>
                          <ListingCourses />
                        </Grid>
                      </>
                    )
                  }
                </>
              )
            }
          </>
        )
      }
    </div>
  );
}

export default CoursesContainer;