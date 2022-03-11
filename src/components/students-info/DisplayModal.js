import * as React from 'react';
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     pt: 2,
     px: 4,
     pb: 3,
};

function ChildModal({ chidren }) {
     const [open, setOpen] = React.useState(false);
     const allCourses = useSelector((store) => {
          return store.allCourses
     })
     const enrolledCourses = allCourses.filter(ele => chidren.courses.some(e => e.course === ele._id))

     const handleOpen = () => {
          setOpen(true);
     };
     const handleClose = () => {
          setOpen(false);
     };

     return (
          <>
               <Button variant="outlined" onClick={handleOpen}>More Info about user</Button>
               <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
               >
                    <Box sx={{ ...style, width: 200, textAlign: 'center' }}>
                         {
                              enrolledCourses.length > 0 ? (
                                   enrolledCourses.map(ele => {
                                        return (
                                             <div key={ele._id}>
                                                  <h3 id="child-modal-title">Course name & Level</h3>
                                                  <p>{ele.category} - {ele.level}</p>
                                             </div>
                                        )
                                   })
                              ) : (
                                   <>
                                        <h3>Student is not enrolled with any course</h3>
                                   </>
                              )
                         }
                         <Button variant="outlined" onClick={handleClose}>Close Child Modal</Button>
                    </Box>
               </Modal>
          </>
     );
}

export default function NestedModal({ children }) {
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => {
          setOpen(true);
     };
     const handleClose = () => {
          setOpen(false);
     };

     return (
          <div>
               <Button variant="outlined" onClick={handleOpen}>DETAILS</Button>
               <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
               >
                    <Box sx={{ ...style, width: 350, textAlign: 'center' }}>
                         <h2 id="parent-modal-title">{children.name.toUpperCase()}'s course Info</h2>
                         <h3 id="parent-modal-description">
                              Courses Enrolled - {children.courses.length}
                         </h3>
                         <ChildModal chidren={children} />
                    </Box>
               </Modal>
          </div>
     );
}