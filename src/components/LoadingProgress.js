import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingProgress = () => {
     return (
          <>
               <Box sx={{ flexDirection: 'row', placeContent: 'center' }}>
                    <CircularProgress />
               </Box>
          </>
     );
}

export default LoadingProgress;