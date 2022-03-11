import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function BackgroundLetterAvatars({children}) {

     const result = children.split(' ').reduce((x, y) => {
          x += y[0].toUpperCase()
          return x
     }, '')

     return (
          <Stack direction="row" spacing={2}>
               <Avatar children={result} />
          </Stack>
     );
}