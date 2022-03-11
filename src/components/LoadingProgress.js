import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingProgress = () => {
     return (
          <>
               <Box sx={{ display: 'flex', placeContent: 'center' }}>
                    <CircularProgress />
               </Box>
          </>
     );
}

export default LoadingProgress;