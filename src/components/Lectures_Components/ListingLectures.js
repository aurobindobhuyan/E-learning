import React from 'react';
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert';
import { Divider, ListItemButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { asyncDeleteLectures } from '../../redux/actions/asyncAllLectures';
import { makingRequest } from '../../redux/actions/requestAction';

const ListingLectures = (props) => {
     const { id } = props.match.params
     const { allLectures, handleSelectedLecture, selectedLecture } = props
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     const handleDelete = (e, lectureId) => {
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
                         dispatch(makingRequest())
                         dispatch(asyncDeleteLectures(`/courses/${id}/lectures/${lectureId}`))
                    }
               });
     }

     return (
          <>
               {
                    allLectures.map(ele => {
                         if (store.userInfo.role === 'student' && !ele.isDelete || store.userInfo.role === 'admin') {
                              return (
                                   <ListItemButton
                                        style={{ justifyContent: 'space-between' }}
                                        selected={selectedLecture === ele._id}
                                        onClick={() => { handleSelectedLecture(ele._id) }}
                                        key={ele._id}
                                   >
                                        <b>{ele.title}</b>
                                        <Divider />
                                        {
                                             store.userInfo.role === 'admin' && (
                                                  <DeleteForeverIcon color='red' onClick={(e) => { handleDelete(e, ele._id) }} />
                                             )
                                        }
                                   </ListItemButton>
                              )
                         }
                    })
               }
          </>
     );
}

export default withRouter(ListingLectures);
