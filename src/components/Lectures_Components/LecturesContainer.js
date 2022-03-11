import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Drawer, Divider, Toolbar, Box, ListItemButton, CssBaseline, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddLectures from './AddLectures';
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue';
import LoadingProgress from '../LoadingProgress'
import LecturesPlayground from './LecturesPlayground';
import { asyncGetAllLectures } from '../../redux/actions/asyncAllLectures';
import ListingLectures from './ListingLectures';

const LecturesContainer = (props) => {
     const { id } = props.match.params
     const [selectedLecture, setSelectedLecture] = useState('');
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     useEffect(() => {
          if (store.isLoggedIn && store.allLectures.length === 0) {
               dispatch(asyncGetAllLectures(`/courses/${id}/lectures`))
          }
     }, [store.isLoggedIn])

     const handleSelectedLecture = (id) => {
          setSelectedLecture(id)
     }

     return (
          <>
               {
                    store.request && store.allCourses.length === 0 ? (
                         <>
                              <Toolbar />
                              <div style={{ textAlign: 'center', color: "red" }}>
                                   <h1>Loading....</h1>
                                   <LoadingProgress />
                              </div>
                         </>
                    ) : (
                         <div style={{ display: 'flex' }}>
                              <Box sx={{ display: 'flex' }}>
                                   <CssBaseline />
                                   <Drawer
                                        variant="permanent"
                                        sx={{
                                             width: '200px',
                                             flexShrink: 0,
                                             [`& .MuiDrawer-paper`]: { width: '190px', boxSizing: 'border-box' },
                                        }}
                                   >
                                        <Toolbar />
                                        <Box sx={{ overflow: 'auto' }}>
                                             <h1>All Lectures</h1>
                                             {
                                                  store.userInfo.role === 'admin' && (
                                                       <ListItemButton>
                                                            <CustomizedDialogs>
                                                                 <>
                                                                      Add Lectures
                                                                      <AddCircleOutlineIcon fontSize='large' />
                                                                 </>
                                                                 <AddLectures id={id} />
                                                            </CustomizedDialogs>
                                                       </ListItemButton>
                                                  )
                                             }
                                             <ListItemButton>
                                                  <Button style={{ width: '-webkit-fill-available' }} startIcon={<KeyboardBackspaceIcon />}>
                                                       <Link to={`/courses/${id}`}>Go Back</Link>
                                                  </Button>
                                             </ListItemButton>
                                             {
                                                  store.request && (
                                                       <div style={{ textAlign: 'center', color: 'red' }}>
                                                            <h6>Loading...</h6>
                                                            <LoadingProgress />
                                                       </div>
                                                  )
                                             }
                                             <Divider />

                                             <ListingLectures selectedLecture={selectedLecture} handleSelectedLecture={handleSelectedLecture} allLectures={store.allLectures} />
                                        </Box>
                                   </Drawer>
                              </Box>

                              <LecturesPlayground selectedLecture={selectedLecture} />
                         </div>
                    )
               }
          </>
     );
}

export default LecturesContainer;