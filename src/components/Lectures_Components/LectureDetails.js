import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetAllLectures } from '../../redux/actions/asyncAllLectures';
import EditLectures from './EditLectures';
import LoadingProgress from '../LoadingProgress';
import ShowDetails from '../ShowDetails';

const LectureDetails = (props) => {
     const { id } = props.match.params
     const url = props.match.url
     const [lectureInfo, setLectureInfo] = useState({});
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     // Fetching Lectures details after initial Loading
     useEffect(() => {
          if (store.isLoggedIn && store.allLectures.length === 0) {
               const result = url.split('/')[2]
               dispatch(asyncGetAllLectures(`/courses/${result}/lectures`))
          }
     }, [store.isLoggedIn])

     useEffect(() => {
          if (store.allLectures.length > 0) {
               const result = store.allLectures.find(ele => ele._id === id)
               setLectureInfo(result)
          }
     }, [store.allLectures])

     return (
          <>
               <EditLectures lectureInfo={lectureInfo} url={url} />
               {
                    store.request ? (
                         <LoadingProgress>
                              <h1>Loading...</h1>
                         </LoadingProgress>
                    ) : (
                         <ShowDetails objectFromProps={lectureInfo} />
                    )
               }
          </>
     );
}

export default LectureDetails;