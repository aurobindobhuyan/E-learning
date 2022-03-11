import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
     '& .MuiDialogContent-root': {
          padding: theme.spacing(4),
     },
     '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
     },
}));

const BootstrapDialogTitle = (props) => {
     const { children, onClose, ...other } = props;

     return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
               {children}
               {onClose ? (
                    <IconButton
                         aria-label="close"
                         onClick={onClose}
                         sx={{
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                         }}
                    >
                         <CloseIcon />
                    </IconButton>
               ) : null}
          </DialogTitle>
     );
};

export default function CustomizedDialogs({ children }) {
     const [open, setOpen] = useState(false)

     const store = useSelector((store) => {
          return store.handleModal
     })

     useEffect(() => {
          if (!store && open) {
               setOpen(false);
          }
          return () => {
               return setOpen(false)
          }
     }, [store])

     const handleClickOpen = () => {
          setOpen(!open);
     };

     return (
          <>
               <Button variant="outlined" onClick={handleClickOpen}>
                    {children[0]}
               </Button>

               <BootstrapDialog
                    onClose={handleClickOpen}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth='xl'
               >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClickOpen}>
                         {children[0]}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                         {children[1]}
                    </DialogContent>
                    <DialogActions>
                         <Button autoFocus onClick={handleClickOpen}>
                              Close
                         </Button>
                    </DialogActions>
               </BootstrapDialog>
          </>
     );
}