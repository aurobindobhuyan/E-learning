import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { ListItemButton, Box, Divider } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
     root: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: 'auto',
          width: '60vw'
     },
     firstChild: {
          flex: '1 1 270px',
          margin: '30px',
          maxWidth: '330px'
     },
     secondChild: {
          flex: '1 1 270px',
          height: 'max-content',
          margin: '30px',
          textAlign: 'center',
          background: '#f6eaf7'
     }
}))

const ShowDetails = (props) => {
     const { objectFromProps } = props
     const [userInfoWithoutObject, setUserInfoWithoutObject] = useState([]);
     const [userInfoWithObject, setuserInfoWithObject] = useState([]);
     const [selectedText, setSelectedText] = useState('');
     const classes = useStyles()

     const store = useSelector((store) => {
          return store
     })

     useEffect(() => {
          if (objectFromProps && Object.keys(objectFromProps).length > 0) {
               const filtered = Object.keys(objectFromProps).filter(ele => typeof objectFromProps[ele] !== 'object' && !ele.includes('_') && ele !== 'user' && !ele.includes('At') && !ele.includes('validity') && !ele.includes('duration') && ele !== 'course')
               const resultWithObject = Object.keys(objectFromProps).filter(ele => typeof objectFromProps[ele] === 'object' && ele !== 'comments')
               setSelectedText(filtered[0])
               setUserInfoWithoutObject(filtered)
               setuserInfoWithObject(resultWithObject)
          }
     }, [objectFromProps])

     const handleListItemClick = (text) => {
          setSelectedText(text)
     }

     return (
          <Box className={classes.root}>
               <Box className={classes.firstChild}>
                    <Box sx={{ width: '100%', maxWidth: 330, bgcolor: 'rgb(246 234 247)' }}>
                         {
                              userInfoWithoutObject.map(ele => {
                                   return (
                                        <ListItemButton
                                             key={ele}
                                             sx={{ height: 60 }}
                                             selected={selectedText === ele}
                                             onMouseEnter={() => handleListItemClick(ele)}
                                        >
                                             <h2>{ele.toUpperCase()}</h2>
                                             <Divider />
                                        </ListItemButton>
                                   )
                              })
                         }
                         {
                              userInfoWithObject.map(ele => {
                                   return (
                                        <ListItemButton
                                             key={ele}
                                             sx={{ height: 60 }}
                                             selected={selectedText === ele}
                                             onMouseEnter={() => handleListItemClick(ele)}
                                        >
                                             <h2>{ele.toUpperCase()}</h2>
                                             <Divider />
                                        </ListItemButton>
                                   )
                              })
                         }
                    </Box>
               </Box>
               <Box className={classes.secondChild}>
                    {
                         Object.keys(objectFromProps).length > 0 && objectFromProps[selectedText] === true ? (
                              <h1>Yes</h1>
                         ) : (Object.keys(objectFromProps).length > 0 && Boolean(objectFromProps[selectedText]) === false
                         ) ? (
                              <h1>No</h1>
                         ) : (
                              Object.keys(objectFromProps).length > 0 && typeof objectFromProps[selectedText] === 'string'
                         ) ? (
                              <h1>{objectFromProps[selectedText]}</h1>
                         ) : (
                              typeof objectFromProps[selectedText] === 'object' && !Array.isArray(objectFromProps[selectedText])
                         ) ? (
                              Object.keys(objectFromProps[selectedText]).map(ele => {
                                   if (!ele.includes('academy')) {
                                        return (
                                             <h1 key={ele}>{ele} - {objectFromProps[selectedText][ele]}</h1>
                                        )
                                   }
                              })
                         ) : (
                              typeof objectFromProps[selectedText] === 'object' && Array.isArray(objectFromProps[selectedText]) && selectedText === 'courses'
                         ) ? (
                              <>
                                   <h1>Enrolled {selectedText} - {objectFromProps[selectedText].length}</h1>
                                   {objectFromProps[selectedText].map(ele => {
                                        const result = store.allCourses.find(e => ele.course === e._id)
                                        return <h2 key={result._id}>{result.name} - {result.level}</h2>
                                   })}
                              </>
                         ) : (typeof objectFromProps[selectedText] === 'object' && Array.isArray(objectFromProps[selectedText]) && selectedText === 'students'
                         ) && (
                              <>
                                   <h1>Enrolled {selectedText} - {objectFromProps[selectedText].length}</h1>
                                   {store.userInfo.role === 'admin' && (
                                        objectFromProps[selectedText].map(ele => {
                                             const result = store.allStudents.find(e => ele.student === e._id)
                                             return <h2 key={result._id}>{result.name} - {result.email}</h2>
                                        })
                                   )}
                              </>
                         )
                    }
               </Box>
          </Box>
     );
}

export default ShowDetails;