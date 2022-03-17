import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingProgress = ({ children }) => {
     return (
          <Box sx={{ flexDirection: 'row', textAlign: 'center', color: 'red' }}>
               {children}
               <CircularProgress />
          </Box>
     );
}

export default LoadingProgress;