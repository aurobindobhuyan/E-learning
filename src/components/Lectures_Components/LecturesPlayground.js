import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/youtube'
import { Button } from '@mui/material';

const LecturesPlayground = (props) => {
     const { id } = props.match.params
     const { selectedLecture } = props
     const [lecture, setLecture] = useState({});
     const store = useSelector((store) => {
          return store
     })

     useEffect(() => {
          if (selectedLecture) {
               const findLecture = store.allLectures.find(ele => ele._id === selectedLecture)
               setLecture(findLecture)
          }
     }, [selectedLecture])

     return (
          <div style={{ width: '100%' }}>
               <h1>Lectures Playground</h1>
               {
                    store.allLectures.length === 0 ? (
                         <>
                              <h1>No Lectures Found</h1>
                              {
                                   store.userInfo.role === 'admin' && (
                                        <h3>Add your first Lecture by pressing ADD LECTURES Button</h3>
                                   )
                              }
                         </>
                    ) : (Object.keys(lecture).length > 0) &&
                    <>
                         {
                              store.userInfo.role === 'admin' && (
                                   <Button variant='outlined'>
                                        <Link to={`/courses/${id}/lectures/${lecture._id}`}>Details</Link>
                                   </Button>
                              )
                         }
                         <ReactPlayer width='65vw' controls url={lecture.assetURL} />
                         <h2>{lecture.description}</h2>
                    </>
               }
          </div>
     );
}

export default withRouter(LecturesPlayground);