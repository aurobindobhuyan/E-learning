import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { makingsnackbarClose } from '../redux/actions/handleSnackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
     return <Slide {...props} direction="left" />;
}
function TransitionDown(props) {
     return <Slide {...props} direction="down" />;
}

export default function DirectionSnackbar() {
     const [open, setOpen] = React.useState(false);
     const [transition, setTransition] = React.useState(undefined);
     const snackbarMessage = useSelector((store) => {
          return store.handleSnackbar
     })
     const dispatch = useDispatch()

     useEffect(() => {
          if (Object.keys(snackbarMessage).length > 0) {
               const allDirections = [TransitionLeft, TransitionDown]
               const randomDirection = Math.floor((Math.random() * allDirections.length));
               setTransition(() => allDirections[randomDirection])
               setOpen(true)
          }
     }, [snackbarMessage])

     const handleClose = () => {
          setOpen(false);
          dispatch(makingsnackbarClose())
     };

     return (
          <>
               <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={2500}
                    TransitionComponent={transition}
                    key={transition ? transition.name : ''}
               >
                    <Alert
                         severity={Object.keys(snackbarMessage).length > 0 ? Object.keys(snackbarMessage).map(ele => ele).join('') : 'warning'}
                         sx={{ width: '100%' }}
                    >
                         {Object.keys(snackbarMessage).map(ele => snackbarMessage[ele])}
                    </Alert>
               </Snackbar>
          </>
     );
}