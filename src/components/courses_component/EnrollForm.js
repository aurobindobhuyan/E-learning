import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Autocomplete, Box, Button } from '@mui/material';
import { makingModalOpen } from '../../redux/actions/handleModalAction';

const EnrollForm = (props) => {
     const { studentForm, students } = props
     const [inputValue, setInputValue] = useState('');
     const dispatch = useDispatch()

     const handleSubmit = (e) => {
          e.preventDefault()
          dispatch(makingModalOpen())
          studentForm(inputValue)
     }

     return (
          <form style={{ height: '200px' }} onSubmit={handleSubmit}>
               <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={students}
                    getOptionLabel={(student) => `${student.name} ${student.email} ${student._id}`}
                    onInputChange={(event, newInputValue) => {
                         setInputValue(newInputValue);
                    }}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    noOptionsText='NO STUDENTS THERE'
                    renderOption={(props, students) => (
                         <Box component='li' {...props} key={students._id} >
                              {students.name} - {students.email}
                         </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Select Students" />}
               />
               <Button type='save' disabled={!inputValue}>Save</Button>
          </form>
     );
}

export default EnrollForm;