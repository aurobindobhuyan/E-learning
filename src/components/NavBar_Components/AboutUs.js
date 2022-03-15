import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
     about: {
          fontSize: '4rem',
          color: theme.palette.error.main,
          textAlign: 'center'
     },
     typography: {
          fontSize: '3rem',
          color: lightBlue[700],
          textAlign: 'center'
     }
}))

const AboutUs = () => {
     const classes = useStyles()
     return (
          <>
               <Typography className={classes.about}>About Me</Typography>
               <Typography className={classes.typography}>Name : Aurobindo Bhuyan</Typography>
          </>
     );
}

export default AboutUs;
